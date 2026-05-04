// QatraSol — Rhamna Decision Matrix
// Usage: node scripts/db-matrix.mjs <command> [filter]

import { DatabaseSync } from 'node:sqlite';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new DatabaseSync(join(__dirname, '..', 'data', 'hydrogel.db'));

const cmd = process.argv[2];
const arg = process.argv[3];

switch (cmd) {
  // ============================================================
  // FULL MATRIX: Commune + Soil + Hydrogel + Price
  // ============================================================
  case 'matrix': {
    console.log('\n═══════════════════════════════════════════════════════════════════════════');
    console.log('  RHAMNA DATA MATRIX — Communes, Sols, Hydrogel, Prix');
    console.log('═══════════════════════════════════════════════════════════════════════════\n');

    // Join communes with soil data and hydrogel suitability
    const rows = db.prepare(`
      SELECT rc.name as commune, rc.caidat,
             COALESCE(sp.soil_type, 'inconnu') as soil,
             COALESCE(sp.water_holding_capacity_mm_per_m, 0) as whc,
             COALESCE(sp.erosion_risk, '-') as erosion,
             COALESCE(hs.application_rate_kg_ha, 50) as hydrogel_kg_ha,
             COALESCE(hs.suitability_score, 5) as score,
             COALESCE(hs.estimated_water_savings_pct, 35) as water_save,
             COALESCE(hs.estimated_yield_increase_pct, 20) as yield_gain,
             (SELECT printf('%.0f', AVG(price_per_ha)) FROM land_listings ll
              WHERE (ll.commune = rc.name OR ll.commune LIKE '%' || rc.name || '%') AND ll.listing_type='achat') as buy_ha,
             (SELECT printf('%.0f', AVG(price_per_ha)) FROM land_listings ll
              WHERE (ll.commune = rc.name OR ll.commune LIKE '%' || rc.name || '%') AND ll.listing_type='location') as lease_ha
      FROM rhamna_communes rc
      LEFT JOIN soil_profiles sp ON sp.commune_id = rc.id
      LEFT JOIN hydrogel_suitability hs ON hs.soil_type = sp.soil_type
      ORDER BY score DESC, buy_ha ASC
    `).all();

    console.log('Commune              | Caidat         | Sol              | WHC  | Erosion | Gel/ha | Score | Eau- | Rend+ | Achat/ha | Lease/ha');
    console.log('-'.repeat(120));

    rows.forEach(r => {
      const name = (r.commune || '-').padEnd(20);
      const caidat = (r.caidat || '-').padEnd(15);
      const soil = (r.soil || '-').padEnd(16);
      const whc = String(r.whc || '-').padEnd(5);
      const erosion = (r.erosion || '-').padEnd(7);
      const gel = String(r.hydrogel_kg_ha || '-').padEnd(7);
      const score = String(r.score || '-').padEnd(5);
      const ws = String(r.water_save || '-').padEnd(4);
      const yg = String(r.yield_gain || '-').padEnd(6);
      const buy = (r.buy_ha || '-').padEnd(9);
      const lease = (r.lease_ha || '-').padEnd(0);
      console.log(`${name} | ${caidat} | ${soil} | ${whc} | ${erosion} | ${gel} | ${score} | ${ws} | ${yg} | ${buy} | ${lease}`);
    });
    break;
  }

  // ============================================================
  // BEST PARCELS for hydrogel
  // ============================================================
  case 'best': {
    console.log('\n═══ BEST LOCATIONS FOR HYDROGEL IN RHAMNA ═══\n');
    const rows = db.prepare(`
      SELECT rc.name, rc.caidat,
             COALESCE(sp.soil_type, 'inconnu') as soil,
             COALESCE(hs.suitability_score, 5) as score,
             COALESCE(hs.application_rate_kg_ha, 50) as rate,
             ROUND(COALESCE(hs.application_rate_kg_ha, 50) * 180 / 1.0) as cost_mad_ha,
             COALESCE(hs.water_savings_pct, 35) as save_pct,
             (SELECT cd.crop_name_fr FROM crop_data cd WHERE cd.hydrogel_benefit = 'eleve' LIMIT 1) as best_crop
      FROM rhamna_communes rc
      LEFT JOIN soil_profiles sp ON sp.commune_id = rc.id
      LEFT JOIN hydrogel_suitability hs ON hs.soil_type = sp.soil_type
      WHERE hs.suitability_score >= 6
      ORDER BY score DESC
    `).all();

    console.log('Commune              | Sol              | Score | kg/ha | MAD/ha | Eau-  | Meilleure culture');
    console.log('-'.repeat(100));

    rows.forEach(r => {
      console.log(`${(r.name||'-').padEnd(20)} | ${(r.soil||'-').padEnd(16)} | ${String(r.score).padEnd(5)} | ${String(r.rate).padEnd(5)} | ${String(r.cost_mad_ha).padEnd(6)} | ${String(r.save_pct)+'%'.padEnd(5)} | ${r.best_crop||'-'}`);
    });
    break;
  }

  // ============================================================
  // HYDROGEL COST CALCULATOR
  // ============================================================
  case 'calc': {
    const ha = parseFloat(arg) || 1;
    const soilType = process.argv[4] || 'sablo-limoneux';

    const soil = db.prepare('SELECT * FROM hydrogel_suitability WHERE soil_type = ?').get(soilType);
    if (!soil) { console.log(`Soil type '${soilType}' not found. Available: sableux, sablo-limoneux, limoneux, limono-argileux, argileux, salin, caillouteux`); break; }

    const supplier = db.prepare('SELECT * FROM hydrogel_suppliers WHERE sample_available = 1 ORDER BY fob_price_usd ASC LIMIT 1').get();

    const gelKg = soil.application_rate_kg_ha * ha;
    const gelCostLow = gelKg * 40;   // bulk import
    const gelCostHigh = gelKg * 130; // retail
    const waterSaving = soil.water_savings_pct;
    const yieldGain = soil.yield_increase_pct_est;

    console.log(`\n═══ HYDROGEL COST CALCULATOR — ${ha} ha, ${soilType} ═══\n`);
    console.log(`Application rate:      ${soil.application_rate_kg_ha} kg/ha (${soil.application_rate_low}-${soil.application_rate_high})`);
    console.log(`Total hydrogel needed: ${gelKg} kg`);
    console.log(`Cost (import bulk):    ${gelCostLow.toLocaleString()} MAD (@ ~40 MAD/kg)`);
    console.log(`Cost (retail/local):   ${gelCostHigh.toLocaleString()} MAD (@ ~130 MAD/kg)`);
    console.log(`Estimated water saved: ${waterSaving}%`);
    console.log(`Estimated yield gain:  ${yieldGain}%`);
    console.log(`Soil suitability:      ${soil.suitability_score}/10`);
    console.log(`\nBest supplier (sample available): ${supplier ? supplier.supplier_name + ' — ' + supplier.country + ' — Min ' + supplier.min_order_kg + ' kg' : 'None with samples'}`);
    break;
  }

  // ============================================================
  // SOIL PROFILE SUMMARY
  // ============================================================
  case 'soils': {
    console.log('\n═══ RHAMNA SOIL PROFILES ═══\n');
    const rows = db.prepare(`
      SELECT sp.soil_type, sp.texture_class, sp.organic_matter_pct, sp.ph, sp.depth_cm,
             sp.water_holding_capacity_mm_per_m, sp.erosion_risk,
             hs.application_rate_kg_ha, hs.suitability_score
      FROM soil_profiles sp
      JOIN hydrogel_suitability hs ON hs.soil_type = sp.soil_type
      ORDER BY hs.suitability_score DESC
    `).all();

    console.log('Soil Type        | Texture      | OM%  | pH   | Depth | WHC  | Erosion  | Gel/ha | Score');
    console.log('-'.repeat(100));
    rows.forEach(r => {
      console.log(`${(r.soil_type||'-').padEnd(16)} | ${(r.texture_class||'-').padEnd(12)} | ${String(r.organic_matter_pct||'-').padEnd(4)} | ${String(r.ph||'-').padEnd(4)} | ${String(r.depth_cm||'-').padEnd(5)} | ${String(r.water_holding_capacity_mm_per_m||'-').padEnd(4)} | ${(r.erosion_risk||'-').padEnd(8)} | ${String(r.application_rate_kg_ha||'-').padEnd(6)} | ${r.suitability_score}/10`);
    });
    break;
  }

  // ============================================================
  // CROP SUITABILITY
  // ============================================================
  case 'crops': {
    console.log('\n═══ CROPS + HYDROGEL BENEFIT ═══\n');
    const rows = db.prepare('SELECT * FROM crop_data ORDER BY CASE hydrogel_benefit WHEN \'eleve\' THEN 1 WHEN \'moyen\' THEN 2 WHEN \'faible\' THEN 3 ELSE 4 END').all();
    console.log('Crop (FR)     | Area (ha) | Yield (t/ha)  | Water (mm) | Season   | Gel Benefit');
    console.log('-'.repeat(95));
    rows.forEach(r => {
      const area = r.area_ha_est ? r.area_ha_est.toLocaleString() : '-';
      const yieldRange = r.yield_t_ha_low ? `${r.yield_t_ha_low}-${r.yield_t_ha_high}` : '-';
      const water = r.water_requirement_mm || '-';
      console.log(`${(r.crop_name_fr||r.crop_name).padEnd(13)} | ${area.padEnd(9)} | ${yieldRange.padEnd(13)} | ${String(water).padEnd(9)} | ${(r.growing_season||'-').padEnd(8)} | ${r.hydrogel_benefit||'-'}`);
    });
    break;
  }

  // ============================================================
  // FUNDING MATRIX
  // ============================================================
  case 'funding': {
    console.log('\n═══ AVAILABLE FUNDING ═══\n');
    const rows = db.prepare('SELECT * FROM funding_programs ORDER BY type').all();
    console.log('Program                          | Type     | Max MAD    | Rate     | Status');
    console.log('-'.repeat(95));
    rows.forEach(r => {
      console.log(`${(r.program_name||'-').padEnd(32)} | ${(r.type||'-').padEnd(8)} | ${String(r.max_amount_mad ? r.max_amount_mad.toLocaleString() : '-').padEnd(9)} | ${String(r.interest_rate ? r.interest_rate+'%' : r.coverage_pct ? r.coverage_pct+'% cov' : '-').padEnd(8)} | ${r.status}`);
    });
    break;
  }

  // ============================================================
  // FULL REPORT — everything
  // ============================================================
  case 'report': {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║   QatraSol — RHAMNA FULL DATA REPORT       ║');
    console.log('╚══════════════════════════════════════════════╝\n');

    console.log('REGION: Rhamna Province, Marrakech-Safi, Morocco');
    console.log('CAPITAL: Benguerir');
    console.log('AREA: ~20,986 km²');
    console.log('POPULATION: ~346,000 (2024)');
    console.log('COMMUNES: 23 rural + 2 municipalities');
    console.log('ANNUAL RAINFALL: 200-300 mm');
    console.log('MAIN CROPS: Barley, wheat, olives, cactus, cumin');
    console.log('LIVESTOCK: Sheep, goats');
    console.log('FARMING: 85% rain-fed (bour), 15% irrigated');
    console.log('AVG FARM SIZE: <5 ha (60%+ under 3 ha)');
    console.log('WATER TABLE: Declining 1-2 m/year (Haouz aquifer)');
    console.log('SOIL: Dominant sandy loam, shallow, stony, high erosion');
    console.log('LAND PRICE (bour): 45,000-125,000 MAD/ha');
    console.log('LAND LEASE (bour): ~2,000 MAD/ha/year');
    console.log('HYDROGEL APPLICATION: 30-75 kg/ha depending on soil');
    console.log('HYDROGEL COST: 40-130 MAD/kg depending on source');
    console.log('FDA IRRIGATION: 80-100% subsidized, up to 23,000 MAD/ha');
    console.log('BEST HYDROGEL SOILS: Sandy > Sandy Loam > Saline');
    console.log('BEST HYDROGEL CROPS: Barley, wheat, onion, cumin');
    console.log();
    break;
  }

  default:
    console.log(`
QatraSol — Rhamna Decision Matrix

Commands:
  node scripts/db-matrix.mjs matrix       Full commune/soil/hydrogel/price matrix
  node scripts/db-matrix.mjs best         Best locations for hydrogel
  node scripts/db-matrix.mjs calc <ha> [soil]  Cost calculator
  node scripts/db-matrix.mjs soils        Soil profiles + hydrogel suitability
  node scripts/db-matrix.mjs crops        Crop data + hydrogel benefit
  node scripts/db-matrix.mjs funding      Available funding programs
  node scripts/db-matrix.mjs report       Full Rhamna data report
`);
}

db.close();
