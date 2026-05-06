// Scrape Avito.ma for agricultural land listings in Rhamna
import { chromium } from 'playwright';

const searches = [
  { label: 'Rhamna - location', url: 'https://www.avito.ma/fr/recherche?q=location+terre+agricole+rhamna&category=terrain' },
  { label: 'Benguerir - location', url: 'https://www.avito.ma/fr/recherche?q=location+terrain+agricole+benguerir&category=terrain' },
  { label: 'Marrakech - location agricole', url: 'https://www.avito.ma/fr/marrakech/terrains?q=location+terre+agricole' },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const search of searches) {
  console.log(`\n=== ${search.label} ===`);
  try {
    const page = await browser.newPage();
    await page.goto(search.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);

    // Try to get listings
    const items = await page.evaluate(() => {
      const listings = [];
      // Avito card selectors
      const cards = document.querySelectorAll('[class*="sc-"]');
      cards.forEach(card => {
        const text = card.innerText?.trim();
        if (text && (text.includes('ha') || text.includes('hectare') || text.includes('m²') || text.includes('DH') || text.includes('agricole'))) {
          listings.push(text.substring(0, 300));
        }
      });
      return listings.slice(0, 10);
    });

    // Also try getting all visible text
    const pageText = await page.evaluate(() => document.body.innerText?.substring(0, 3000) || 'No text found');

    console.log('Page content preview:');
    console.log(pageText.substring(0, 1500));

    if (items.length > 0) {
      console.log(`\nFound ${items.length} potential listings:`);
      items.forEach((item, i) => console.log(`\n--- Listing ${i+1} ---\n${item}`));
    }

    results.push({ label: search.label, items, text: pageText });
    await page.close();
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

// Also try Facebook Marketplace
console.log('\n=== Facebook Marketplace - Benguerir ===');
try {
  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/marketplace/benguerir/search?query=terre%20agricole', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(3000);
  const fbText = await page.evaluate(() => document.body.innerText?.substring(0, 2000) || 'No text');
  console.log(fbText.substring(0, 1000));
  await page.close();
} catch (err) {
  console.log(`Facebook error: ${err.message}`);
}

await browser.close();

// Write results to file for the database
import { writeFileSync } from 'fs';
writeFileSync('data/scrape-results.json', JSON.stringify(results, null, 2));
console.log('\nResults saved to data/scrape-results.json');
