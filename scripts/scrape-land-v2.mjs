// Scrape Avito agricultural land listings — v2 with API interception
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

// Listen for API responses that contain listing data
const apiResults = [];
page.on('response', async (response) => {
  const url = response.url();
  if (url.includes('api') || url.includes('graphql') || url.includes('search')) {
    try {
      const json = await response.json();
      apiResults.push({ url: url.substring(0, 100), data: JSON.stringify(json).substring(0, 500) });
    } catch {}
  }
});

// Direct search for "terre agricole" in Marrakech region — location=marrakech
console.log('Searching Avito for agricultural land...\n');

await page.goto('https://www.avito.ma/fr/marrakech/terrains?q=agricole', {
  waitUntil: 'networkidle',
  timeout: 20000
});
await page.waitForTimeout(3000);

// Get the actual listing links
const links = await page.evaluate(() => {
  const items = [];
  // Avito listing cards have specific data attributes
  document.querySelectorAll('a[href*="/ad/"]').forEach(a => {
    const href = a.getAttribute('href');
    const text = a.closest('div')?.innerText?.trim() || a.innerText?.trim();
    if (text && text.length > 20 && text.length < 500) {
      items.push({ href, text: text.substring(0, 300) });
    }
  });
  return items.slice(0, 20);
});

console.log(`Found ${links.length} listing links:\n`);
links.forEach((item, i) => {
  console.log(`--- Listing ${i+1} ---`);
  console.log(`URL: https://www.avito.ma${item.href}`);
  console.log(`${item.text}\n`);
});

// Take screenshot for debugging
await page.screenshot({ path: 'data/avito-search.png', fullPage: false });
console.log('Screenshot saved to data/avito-search.png');

// If no results from links, try getting all visible listing text
if (links.length === 0) {
  console.log('\nNo links found. Page body sample:');
  const bodyText = await page.evaluate(() => {
    // Try to find listing containers
    const containers = document.querySelectorAll('[data-testid], [class*="listing"], [class*="card"], [class*="item"]');
    if (containers.length > 0) {
      return Array.from(containers).slice(0, 5).map(c => c.innerText?.substring(0, 200)).join('\n---\n');
    }
    return 'No listing containers found. Body text: ' + document.body.innerText?.substring(0, 1000);
  });
  console.log(bodyText);
}

await browser.close();

// Print any API data captured
if (apiResults.length > 0) {
  console.log(`\n\nCaptured ${apiResults.length} API responses:`);
  apiResults.slice(0, 3).forEach(r => {
    console.log(`\nURL: ${r.url}`);
    console.log(r.data.substring(0, 500));
  });
}
