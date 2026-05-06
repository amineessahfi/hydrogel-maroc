// Scrape with stealth — Avito + Mubawab
import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
});

const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  viewport: { width: 1920, height: 1080 },
  locale: 'fr-FR'
});

const page = await context.newPage();

// ===== Mubawab — agricultural land for sale/rent =====
console.log('=== MUBAWAB — Terrain Agricole ===\n');

try {
  await page.goto('https://www.mubawab.ma/fr/recherche?q=terrain+agricole&category=terrain', {
    waitUntil: 'networkidle',
    timeout: 20000
  });
  await page.waitForTimeout(4000);

  // Accept cookies if present
  const cookieBtn = page.locator('button:has-text("Accepter"), button:has-text("OK"), button:has-text("Tout accepter")').first();
  if (await cookieBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await cookieBtn.click();
    await page.waitForTimeout(1000);
  }

  // Scroll to load lazy content
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(2000);

  const mubawabListings = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('[class*="listing"], [class*="card"], [class*="property"], article, .search-results li').forEach(el => {
      const price = el.querySelector('[class*="price"]')?.innerText?.trim() || '';
      const title = el.querySelector('h2, h3, [class*="title"]')?.innerText?.trim() || '';
      const surface = el.innerText.match(/(\d+[\s,.]*\d*)\s*(ha|hectare|m²|m2)/i);
      const priceMatch = el.innerText.match(/(\d+[\s,.]*\d*)\s*(DH|MAD)/i);
      const text = el.innerText?.substring(0, 300);
      if (text && text.length > 30 && (price || title || surface)) {
        items.push({ title, price, surface: surface ? surface[0] : null, priceVal: priceMatch ? priceMatch[0] : null, text });
      }
    });
    return items.slice(0, 15);
  });

  console.log(`Mubawab found: ${mubawabListings.length} items`);
  mubawabListings.forEach((item, i) => {
    console.log(`\n--- ${i+1} ---`);
    console.log(`Title: ${item.title || '-'}`);
    console.log(`Price: ${item.price || item.priceVal || '-'}`);
    console.log(`Surface: ${item.surface || '-'}`);
    console.log(item.text.substring(0, 200));
  });

  await page.screenshot({ path: 'data/mubawab-search.png' });
  console.log('\nScreenshot: data/mubawab-search.png');
} catch (err) {
  console.log(`Mubawab error: ${err.message}`);
}

// ===== Avito with cookies accepted =====
console.log('\n\n=== AVITO — Second attempt ===\n');

try {
  const page2 = await context.newPage();
  await page2.goto('https://www.avito.ma/fr/marrakech/terrains?q=agricole', {
    waitUntil: 'networkidle',
    timeout: 20000
  });
  await page2.waitForTimeout(5000);

  // Try to accept cookies
  const avitoCookieBtn = page2.locator('button:has-text("Accepter"), button:has-text("OK"), button:has-text("Tout accepter"), [id*="cookie"] button').first();
  if (await avitoCookieBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await avitoCookieBtn.click();
    await page2.waitForTimeout(2000);
  }

  // Try scrolling
  await page2.evaluate(() => window.scrollTo(0, 800));
  await page2.waitForTimeout(3000);

  const avitoListings = await page2.evaluate(() => {
    const items = [];
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const text = el.innerText?.trim();
      if (text && text.includes('DH') && (text.includes('ha') || text.includes('hectare') || text.includes('m²') || text.includes('agricole') || text.includes('terrain') || text.includes('ferme')) && text.length < 500 && text.length > 30) {
        // Check if this element doesn't contain its parent's full text (avoid duplicates)
        const parent = el.parentElement;
        if (!parent || parent.innerText?.trim() !== text) {
          items.push(text);
        }
      }
    });
    // Deduplicate
    return [...new Set(items)].slice(0, 15);
  });

  console.log(`Avito agricultural listings: ${avitoListings.length}`);
  avitoListings.forEach((item, i) => {
    console.log(`\n--- ${i+1} ---`);
    console.log(item.substring(0, 400));
  });

  await page2.screenshot({ path: 'data/avito-search-v2.png' });
  await page2.close();
} catch (err) {
  console.log(`Avito error: ${err.message}`);
}

await browser.close();
console.log('\nDone.');
