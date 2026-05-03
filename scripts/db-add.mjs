// Add a new land listing or supplier to the database manually
import { DatabaseSync } from 'node:sqlite';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'hydrogel.db');
const db = new DatabaseSync(dbPath);

const cmd = process.argv[2];

if (cmd === 'land') {
  const [,,, commune, surfaceHa, priceMad, listingType, titleStatus, source, notes] = process.argv;

  if (!commune || !surfaceHa || !priceMad) {
    console.log('Usage: node scripts/db-add.mjs land <commune> <ha> <prix_mad> <achat|location> <titre_foncier|melkia|inconnu> <source> <notes>');
    console.log('Example: node scripts/db-add.mjs land "Benguerir" 2.5 150000 achat titre_foncier "Avito" "Pres route, sans puits"');
    process.exit(1);
  }

  const result = db.prepare(`
    INSERT INTO land_listings (region, commune, surface_ha, price_mad, listing_type, title_status, source_name, notes, date_listed)
    VALUES ('Rhamna', ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(commune, parseFloat(surfaceHa), parseFloat(priceMad), listingType || 'achat', titleStatus || 'inconnu', source || 'Manuel', notes || '');

  console.log(`Land listing added. ID: ${result.lastInsertRowid}`);
}

else if (cmd === 'supplier') {
  const [,,, name, country, product, minOrder, fobUsd, contactUrl, notes] = process.argv;

  if (!name || !country) {
    console.log('Usage: node scripts/db-add.mjs supplier <nom> <pays> <produit> <min_order_kg> <fob_usd> <url> <notes>');
    process.exit(1);
  }

  const result = db.prepare(`
    INSERT INTO hydrogel_suppliers (supplier_name, country, product_name, min_order_kg, fob_price_usd, contact_url, notes, date_checked)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(name, country, product || null, minOrder ? parseFloat(minOrder) : null, fobUsd ? parseFloat(fobUsd) : null, contactUrl || null, notes || '');

  console.log(`Supplier added. ID: ${result.lastInsertRowid}`);
}

else if (cmd === 'price') {
  const [,,, listingId, priceMad] = process.argv;

  if (!listingId || !priceMad) {
    console.log('Usage: node scripts/db-add.mjs price <listing_id> <nouveau_prix_mad>');
    console.log('Records a price snapshot for tracking changes over time.');
    process.exit(1);
  }

  const listing = db.prepare('SELECT commune, surface_ha, price_mad FROM land_listings WHERE id = ?').get(parseInt(listingId));
  if (!listing) { console.log(`Listing ${listingId} not found.`); process.exit(1); }

  db.prepare(`INSERT INTO price_snapshots (listing_id, item_type, item_name, price_mad, quantity, unit, date_recorded)
              VALUES (?, 'land', ?, ?, ?, 'ha', datetime('now'))`)
    .run(parseInt(listingId), `${listing.commune} - ${listing.surface_ha}ha`, parseFloat(priceMad), listing.surface_ha);

  db.prepare('UPDATE land_listings SET price_mad = ?, date_updated = datetime(\'now\') WHERE id = ?')
    .run(parseFloat(priceMad), parseInt(listingId));

  console.log(`Price updated: ${listing.commune} ${listing.surface_ha}ha: ${listing.price_mad} -> ${priceMad} MAD`);
  console.log(`New price/ha: ${Math.round(parseFloat(priceMad) / listing.surface_ha).toLocaleString()} MAD`);
}

else if (cmd === 'status') {
  const [,,, listingId, newStatus] = process.argv;

  if (!listingId || !newStatus) {
    console.log('Usage: node scripts/db-add.mjs status <listing_id> <active|sold|expired|contacted|visited|negotiating>');
    process.exit(1);
  }

  const validStatuses = ['active', 'sold', 'expired', 'contacted', 'visited', 'negotiating'];
  if (!validStatuses.includes(newStatus)) {
    console.log(`Invalid status. Valid: ${validStatuses.join(', ')}`);
    process.exit(1);
  }

  db.prepare('UPDATE land_listings SET status = ?, date_updated = datetime(\'now\') WHERE id = ?')
    .run(newStatus, parseInt(listingId));
  console.log(`Listing ${listingId} status updated to: ${newStatus}`);
}

else {
  console.log(`
HydroGel Database — Add/Update Tool

Usage:
  node scripts/db-add.mjs land <commune> <ha> <prix_mad> <achat|location> <titre> <source> <notes>
  node scripts/db-add.mjs supplier <nom> <pays> <produit> <min_kg> <fob_usd> <url> <notes>
  node scripts/db-add.mjs price <listing_id> <nouveau_prix>
  node scripts/db-add.mjs status <listing_id> <active|sold|expired|contacted|visited|negotiating>

Examples:
  node scripts/db-add.mjs land "Sidi Bou Othmane" 3 195000 achat titre_foncier "Facebook Marketplace" "A 2km de la route, vue sur champ"
  node scripts/db-add.mjs supplier "ChemiPharm Casa" "Maroc" "SAP agricole importe" 5 3.50 "www.chemipharm.ma" "Contact: 06xx"
  node scripts/db-add.mjs price 1 175000
  node scripts/db-add.mjs status 3 contacted
`);
}

db.close();
