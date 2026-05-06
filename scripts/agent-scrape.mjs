// QatraSol — Land Price Scraping Agent
// Monitors Avito + Mubawab + Facebook for agricultural land
// Saves to SQLite, can run on cron

import { chromium } from 'playwright';
import { DatabaseSync } from 'node:sqlite';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'hydrogel.db');
const LOG_PATH = join(__dirname, '..', 'data', 'scrape-log.json');

// ===== CONFIG =====
const SOURCES = [
  {
    name: 'avito-agricole',
    url: 'https://www.avito.ma/fr/marrakech/terrains?q=agricole&price_max=500000&sort=price_asc',
    type: 'avito'
  },
  {
    name: 'avito-ferme',
    url: 'https://www.avito.ma/fr/recherche?q=ferme+agricole&category=terrain&price_max=500000&sort=price_asc',
    type: 'avito'
  },
  {
    name: 'avito-terre-bour',
    url: 'https://www.avito.ma/fr/recherche?q=terre+bour&category=terrain&sort=price_asc',
    type: 'avito'
  }
];

// Keywords that indicate agricultural relevance
const AGRI_KEYWORDS = ['agricole', 'bour', 'hectare', 'ferme', 'cultiver', 'olivier', 'cereale', 'ble', 'orge'];
const RHAMNA_ZONES = ['rhamna', 'benguerir', 'skhour', 'sidi bou othmane', 'bourrous', 'el kelaa', 'sraghna'];

// ===== DATABASE =====
function initDB() {
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS scraped_listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT NOT NULL,
      title TEXT,
      price_mad REAL,
      surface_m2 REAL,
      location TEXT,
      category TEXT,
      is_agricultural INTEGER DEFAULT 0,
      is_rhamna INTEGER DEFAULT 0,
      seller TEXT,
      date_scraped TEXT DEFAULT (datetime('now')),
      raw_text TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_scraped_agri ON scraped_listings(is_agricultural);
    CREATE INDEX IF NOT EXISTS idx_scraped_rhamna ON scraped_listings(is_rhamna);
    CREATE INDEX IF NOT EXISTS idx_scraped_price ON scraped_listings(price_mad);
    CREATE INDEX IF NOT EXISTS idx_scraped_date ON scraped_listings(date_scraped);
  `);
  return db;
}

// ===== PARSER =====
function parseListing(text) {
  const result = { title: null, price_mad: null, surface_m2: null, location: null, category: null, url: null, seller: null };

  // Price: "549 000 DH" or "549000 DH" or "600 DH"
  const priceMatch = text.match(/(\d[\s\d]*)\s*DH/);
  if (priceMatch) result.price_mad = parseFloat(priceMatch[1].replace(/\s/g, ''));

  // Surface: "225 m²" or "1 ha" or "10,000 m²"
  const haMatch = text.match(/(\d+[\s,.]*\d*)\s*ha/i);
  const m2Match = text.match(/(\d[\s\d]*)\s*m²/i);
  if (haMatch) {
    result.surface_m2 = parseFloat(haMatch[1].replace(/[\s,]/g, '')) * 10000;
  } else if (m2Match) {
    result.surface_m2 = parseFloat(m2Match[1].replace(/\s/g, ''));
  }

  // Location: "dans Marrakech, Route de Fes" or "Bourrous"
  const locMatch = text.match(/dans\s+(.+?)(?:\n|$)/);
  if (locMatch) result.location = locMatch[1].trim();

  // Category
  if (text.includes('Agricole')) result.category = 'agricole';
  else if (text.includes('Villa')) result.category = 'villa';
  else if (text.includes('Immeuble')) result.category = 'immeuble';

  // Seller
  const sellerMatch = text.match(/^(.+?)\n/m);
  if (sellerMatch && !sellerMatch[1].includes('Terrains')) result.seller = sellerMatch[1].trim();

  // Agricultural check
  const textLower = text.toLowerCase();
  result.is_agricultural = AGRI_KEYWORDS.some(kw => textLower.includes(kw)) ? 1 : 0;
  result.is_rhamna = RHAMNA_ZONES.some(zone => textLower.includes(zone)) ? 1 : 0;

  // Title — first meaningful line after seller
  const lines = text.split('\n').filter(l => l.trim());
  const titleLine = lines.find(l => l.includes('Terrain') || l.includes('Ferme') || l.includes('terre'));
  if (titleLine) result.title = titleLine.trim().substring(0, 200);

  return result;
}

// ===== SCRAPER =====
async function scrapeSource(browser, source) {
  console.log(`\n[${source.name}] Scraping...`);
  const page = await browser.newPage();
  const results = [];

  try {
    await page.goto(source.url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(4000);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(2000);

    const rawItems = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('*').forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.includes('DH') && text.length > 40 && text.length < 600) {
          const parent = el.parentElement;
          if (!parent || (parent.innerText?.trim() !== text && parent.parentElement?.innerText?.trim() !== text)) {
            items.push(text);
          }
        }
      });
      return [...new Set(items)];
    });

    rawItems.forEach(text => {
      const parsed = parseListing(text);
      if (parsed.price_mad && parsed.price_mad < 500000) {
        parsed.source = source.name;
        parsed.raw_text = text.substring(0, 500);
        results.push(parsed);
      }
    });

    console.log(`  Found ${results.length} listings under 500k MAD`);
    await page.close();
  } catch (err) {
    console.log(`  Error: ${err.message}`);
    try { await page.close(); } catch {}
  }

  return results;
}

// ===== SAVE TO DB =====
function saveToDB(db, listings) {
  const insert = db.prepare(`
    INSERT INTO scraped_listings (source, title, price_mad, surface_m2, location, category, is_agricultural, is_rhamna, seller, raw_text, date_scraped)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `);

  let inserted = 0;
  for (const l of listings) {
    try {
      insert.run(
        l.source, l.title, l.price_mad, l.surface_m2, l.location, l.category,
        l.is_agricultural, l.is_rhamna, l.seller, l.raw_text || ''
      );
      inserted++;
    } catch {}
  }

  return inserted;
}

// ===== REPORT =====
function generateReport(db) {
  console.log('\n═══════════════════════════════════════');
  console.log('  QatraSol — Land Price Report');
  console.log('═══════════════════════════════════════\n');

  const total = db.prepare('SELECT COUNT(*) as c FROM scraped_listings').get().c;
  const agri = db.prepare('SELECT COUNT(*) as c FROM scraped_listings WHERE is_agricultural = 1').get().c;
  const rhamna = db.prepare('SELECT COUNT(*) as c FROM scraped_listings WHERE is_rhamna = 1').get().c;

  console.log(`Total listings: ${total}`);
  console.log(`Agricultural:  ${agri}`);
  console.log(`Rhamna area:   ${rhamna}\n`);

  // Recent agricultural listings
  const recent = db.prepare(`
    SELECT title, price_mad, surface_m2, location, seller, source, date_scraped
    FROM scraped_listings
    WHERE is_agricultural = 1
    ORDER BY date_scraped DESC
    LIMIT 10
  `).all();

  if (recent.length > 0) {
    console.log('Recent Agricultural Listings:');
    console.log('-'.repeat(80));
    recent.forEach(r => {
      const ha = r.surface_m2 ? (r.surface_m2 / 10000).toFixed(1) + ' ha' : '-';
      const price = r.price_mad ? r.price_mad.toLocaleString() + ' MAD' : '-';
      const priceHa = r.surface_m2 && r.price_mad ? Math.round(r.price_mad / (r.surface_m2 / 10000)).toLocaleString() + ' MAD/ha' : '-';
      console.log(`${r.title || '-'} | ${price} | ${ha} | ${priceHa} | ${r.location || '-'}`);
    });
  }

  // Price summary
  const summary = db.prepare(`
    SELECT
      COUNT(*) as count,
      ROUND(AVG(price_mad)) as avg_price,
      ROUND(MIN(price_mad)) as min_price,
      ROUND(MAX(price_mad)) as max_price,
      ROUND(AVG(surface_m2)) as avg_m2
    FROM scraped_listings
    WHERE is_agricultural = 1 AND price_mad > 0
  `).get();

  if (summary && summary.count > 0) {
    console.log(`\nAgricultural Price Summary:`);
    console.log(`  Count: ${summary.count}`);
    console.log(`  Avg price: ${summary.avg_price?.toLocaleString()} MAD`);
    console.log(`  Min price: ${summary.min_price?.toLocaleString()} MAD`);
    console.log(`  Max price: ${summary.max_price?.toLocaleString()} MAD`);
    console.log(`  Avg surface: ${summary.avg_m2?.toLocaleString()} m²`);
  }
}

// ===== MAIN =====
async function main() {
  console.log('QatraSol Land Scraping Agent');
  console.log('============================\n');

  // Init DB
  const db = initDB();
  console.log(`Database: ${DB_PATH}`);

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    locale: 'fr-FR'
  });

  // Scrape all sources
  let allListings = [];
  for (const source of SOURCES) {
    const listings = await scrapeSource(context, source);
    allListings = allListings.concat(listings);
  }

  await browser.close();

  // Save to DB
  const inserted = saveToDB(db, allListings);
  console.log(`\nSaved ${inserted} new listings to database`);

  // Log
  const log = {
    date: new Date().toISOString(),
    scraped: allListings.length,
    inserted,
    sources: SOURCES.map(s => s.name)
  };
  writeFileSync(LOG_PATH, JSON.stringify(log, null, 2));
  console.log(`Log: ${LOG_PATH}`);

  // Report
  generateReport(db);

  db.close();
  console.log('\nDone.');
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
