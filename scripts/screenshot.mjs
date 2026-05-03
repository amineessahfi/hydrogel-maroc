import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:5173');
await page.waitForTimeout(2000);
await page.screenshot({ path: 'screenshot-hero.png', fullPage: false });
console.log('Hero screenshot saved');

await page.goto('http://localhost:5173/products');
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshot-products.png', fullPage: false });
console.log('Products screenshot saved');

await page.goto('http://localhost:5173/contact');
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshot-contact.png', fullPage: false });
console.log('Contact screenshot saved');

await browser.close();
console.log('Done — all screenshots captured');
