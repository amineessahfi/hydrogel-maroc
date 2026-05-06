// Targeted agricultural land scraper — Rhamna + cheap bour
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
  viewport: { width: 1920, height: 1080 },
  locale: 'fr-FR'
});

// Search 1: Avito — "terre agricole" across Morocco, sort by cheapest
console.log('=== AVITO — "terre agricole" — cheapest first ===\n');
const page1 = await context.newPage();
try {
  await page1.goto('https://www.avito.ma/fr/recherche?q=terre+agricole&category=terrain&sort=price_asc', {
    waitUntil: 'networkidle', timeout: 20000
  });
  await page1.waitForTimeout(4000);
  await page1.evaluate(() => window.scrollTo(0, 600));
  await page1.waitForTimeout(2000);

  const listings = await page1.evaluate(() => {
    const items = [];
    document.querySelectorAll('*').forEach(el => {
      const text = el.innerText?.trim();
      if (text && text.includes('DH') && (text.includes('agricole') || text.includes('bour') || text.includes('hectare') || text.includes('ferme')) && text.length > 40 && text.length < 600) {
        const parent = el.parentElement;
        if (!parent || parent.innerText?.trim() !== text) {
          items.push(text);
        }
      }
    });
    return [...new Set(items)].slice(0, 20);
  });

  listings.forEach((item, i) => {
    console.log(`--- ${i+1} ---`);
    console.log(item.substring(0, 400));
    console.log();
  });
  await page1.close();
} catch (err) {
  console.log(`Error: ${err.message}`);
}

// Search 2: Try to find listings with "Rhamna" or "Benguerir" or "bour"
console.log('\n=== AVITO — "terrain agricole bour" ===\n');
const page2 = await context.newPage();
try {
  await page2.goto('https://www.avito.ma/fr/recherche?q=terrain+agricole+bour&category=terrain', {
    waitUntil: 'networkidle', timeout: 20000
  });
  await page2.waitForTimeout(4000);
  await page2.evaluate(() => window.scrollTo(0, 500));
  await page2.waitForTimeout(2000);

  const listings = await page2.evaluate(() => {
    const items = [];
    document.querySelectorAll('[class*="sc-"]').forEach(el => {
      const text = el.innerText?.trim();
      if (text && text.includes('DH') && text.length > 40 && text.length < 500) {
        items.push(text);
      }
    });
    return [...new Set(items)].slice(0, 10);
  });

  if (listings.length === 0) {
    const bodySample = await page2.evaluate(() => document.body.innerText?.substring(0, 1500));
    console.log('No structured results. Page text:');
    console.log(bodySample);
  } else {
    listings.forEach((item, i) => {
      console.log(`--- ${i+1} ---`);
      console.log(item.substring(0, 400));
    });
  }
  await page2.close();
} catch (err) {
  console.log(`Error: ${err.message}`);
}

// Search 3: Get all cheap land listings from Marrakech, filter for agricultural
console.log('\n=== AVITO Marrakech — Terrains < 500k MAD ===\n');
const page3 = await context.newPage();
try {
  await page3.goto('https://www.avito.ma/fr/marrakech/terrains?price_max=500000&sort=price_asc', {
    waitUntil: 'networkidle', timeout: 20000
  });
  await page3.waitForTimeout(4000);
  await page3.evaluate(() => window.scrollTo(0, 800));
  await page3.waitForTimeout(2000);

  const listings = await page3.evaluate(() => {
    const items = [];
    document.querySelectorAll('*').forEach(el => {
      const text = el.innerText?.trim();
      if (text && text.includes('DH') && (text.includes('ha') || text.includes('hectare') || text.includes('agricole') || text.includes('m²')) && text.length > 40 && text.length < 500) {
        const parent = el.parentElement;
        if (!parent || parent.innerText?.trim() !== text) {
          items.push(text);
        }
      }
    });
    return [...new Set(items)].slice(0, 20);
  });

  listings.forEach((item, i) => {
    // Filter for ones that look agricultural (large surface, lower price)
    const hasHectare = item.match(/(\d+)\s*(ha|hectare)/i);
    const hasLargeM2 = item.match(/(\d[\s\d]*)\s*m²/);
    const priceMatch = item.match(/(\d[\s\d]*)\s*DH/);
    if (hasHectare || (hasLargeM2 && parseInt(hasLargeM2[1].replace(/\s/g, '')) > 5000)) {
      console.log(`--- ${i+1} [AGRI] ---`);
    } else {
      console.log(`--- ${i+1} ---`);
    }
    console.log(item.substring(0, 350));
    if (priceMatch) console.log(`  >> Price: ${priceMatch[1]} DH`);
    if (hasHectare) console.log(`  >> Size: ${hasHectare[0]}`);
    console.log();
  });
  await page3.close();
} catch (err) {
  console.log(`Error: ${err.message}`);
}

await browser.close();
console.log('Done.');
