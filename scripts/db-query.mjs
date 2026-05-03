// Query the HydroGel tracking database
import { DatabaseSync } from 'node:sqlite';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'hydrogel.db');
const db = new DatabaseSync(dbPath);

const cmd = process.argv[2];
const arg = process.argv[3];

switch (cmd) {
  case 'lands': {
    let query = 'SELECT id, commune, surface_ha, price_mad, price_per_ha, listing_type, title_status, status, date_listed FROM land_listings WHERE 1=1';
    const params = [];
    if (arg === 'active') { query += ' AND status = \'active\''; }
    if (arg === 'rhamna') { query += ' AND region = \'Rhamna\''; }
    if (arg === 'lease') { query += ' AND listing_type = \'location\''; }
    if (arg === 'buy') { query += ' AND listing_type = \'achat\''; }
    query += ' ORDER BY price_per_ha ASC';
    const rows = db.prepare(query).all();
    console.log(`\nLand Listings (${rows.length}):\n`);
    console.log('ID  | Commune              | Ha   | Prix Total  | Prix/ha   | Type     | Statut');
    console.log('-'.repeat(100));
    rows.forEach(r => {
      console.log(`${String(r.id).padEnd(3)} | ${(r.commune || '-').padEnd(20)} | ${String(r.surface_ha).padEnd(4)} | ${r.price_mad.toLocaleString().padEnd(10)} | ${Math.round(r.price_per_ha).toLocaleString().padEnd(9)} | ${r.listing_type.padEnd(8)} | ${r.status}`);
    });
    break;
  }

  case 'suppliers': {
    const rows = db.prepare('SELECT id, supplier_name, country, min_order_kg, fob_price_usd, sample_available FROM hydrogel_suppliers ORDER BY country, supplier_name').all();
    console.log(`\nHydrogel Suppliers (${rows.length}):\n`);
    console.log('ID | Supplier                          | Country      | Min Order | FOB/kg USD | Sample');
    console.log('-'.repeat(90));
    rows.forEach(r => {
      console.log(`${String(r.id).padEnd(2)} | ${(r.supplier_name || '-').padEnd(32)} | ${(r.country || '-').padEnd(12)} | ${String(r.min_order_kg || '-').padEnd(9)} | ${String(r.fob_price_usd || '-').padEnd(10)} | ${r.sample_available ? 'Yes' : 'No'}`);
    });
    break;
  }

  case 'funding': {
    const rows = db.prepare('SELECT program_name, type, max_amount_mad, coverage_pct, status FROM funding_programs ORDER BY type, program_name').all();
    console.log(`\nFunding Programs (${rows.length}):\n`);
    console.log('Program                                    | Type      | Max (MAD)  | Coverage | Status');
    console.log('-'.repeat(90));
    rows.forEach(r => {
      console.log(`${(r.program_name || '-').padEnd(42)} | ${r.type.padEnd(9)} | ${String(r.max_amount_mad || '-').padEnd(9)} | ${r.coverage_pct ? r.coverage_pct + '%' : '-'} | ${r.status}`);
    });
    break;
  }

  case 'compare': {
    // Parcel comparison — best value for money
    console.log('\n=== PARCEL COMPARISON — Best Value ===\n');
    const rows = db.prepare(`
      SELECT commune, surface_ha, price_per_ha, price_mad,
             fda_irrigation_eligible, fda_solar_eligible,
             road_access_km, title_status, status, source_name
      FROM land_listings
      WHERE listing_type = 'achat' AND status = 'active'
      ORDER BY price_per_ha ASC
    `).all();

    rows.forEach((r, i) => {
      const fdaTags = [];
      if (r.fda_irrigation_eligible) fdaTags.push('Irrigation');
      if (r.fda_solar_eligible) fdaTags.push('Solaire');
      console.log(`${i + 1}. ${r.commune} — ${r.surface_ha} ha`);
      console.log(`   ${r.price_per_ha.toLocaleString()} MAD/ha | Total: ${r.price_mad.toLocaleString()} MAD | ${r.title_status}`);
      if (fdaTags.length) console.log(`   FDA eligible: ${fdaTags.join(', ')}`);
      console.log(`   Source: ${r.source_name || 'Non specifie'}`);
      console.log();
    });
    break;
  }

  case 'fda-calc': {
    // FDA subsidy calculator for a given surface area
    const ha = parseFloat(arg) || 1;
    console.log(`\n=== FDA SUBSIDY ESTIMATE — ${ha} ha ===\n`);

    const dripCost = 30000 * ha;
    const dripFda = Math.min(23000 * ha, dripCost * 0.8);
    const solarCost = 40000;
    const solarFda = solarCost * 0.3;
    const storageCost = 12000 * ha;
    const storageFda = Math.min(12000 * ha, storageCost);
    const landLease = 2000 * ha;

    console.log(`Item                  | Your Cost    | FDA Pays    | Total`);
    console.log('-'.repeat(65));
    console.log(`Drip irrigation       | ${(dripCost - dripFda).toLocaleString().padEnd(12)} | ${dripFda.toLocaleString().padEnd(11)} | ${dripCost.toLocaleString()}`);
    console.log(`Solar pump            | ${(solarCost - solarFda).toLocaleString().padEnd(12)} | ${solarFda.toLocaleString().padEnd(11)} | ${solarCost.toLocaleString()}`);
    console.log(`Water storage         | ${(storageCost - storageFda).toLocaleString().padEnd(12)} | ${storageFda.toLocaleString().padEnd(11)} | ${storageCost.toLocaleString()}`);
    console.log(`Land lease (1 yr)     | ${landLease.toLocaleString().padEnd(12)} | 0           | ${landLease.toLocaleString()}`);
    console.log('-'.repeat(65));
    const yourTotal = (dripCost - dripFda) + (solarCost - solarFda) + (storageCost - storageFda) + landLease;
    const fdaTotal = dripFda + solarFda + storageFda;
    console.log(`TOTAL                 | ${yourTotal.toLocaleString().padEnd(12)} | ${fdaTotal.toLocaleString().padEnd(11)} | ${(yourTotal + fdaTotal).toLocaleString()}`);
    console.log(`\nYour out-of-pocket for infrastructure: ${yourTotal.toLocaleString()} MAD`);
    console.log(`Add ~15,000 MAD/ha for hydrogel + operations`);
    console.log(`All-in per hectare (with FDA): ~${(yourTotal / ha + 15000).toLocaleString()} MAD`);
    break;
  }

  default:
    console.log(`
HydroGel Database Query Tool
Usage: node scripts/db-query.mjs <command> [arg]

Commands:
  lands [active|rhamna|lease|buy]  — List land parcels
  suppliers                         — List hydrogel suppliers
  funding                           — List funding programs
  compare                           — Compare parcels by value
  fda-calc <hectares>              — Calculate FDA subsidies for N hectares

Examples:
  node scripts/db-query.mjs lands rhamna
  node scripts/db-query.mjs lands active
  node scripts/db-query.mjs compare
  node scripts/db-query.mjs fda-calc 3
`);
}

db.close();
