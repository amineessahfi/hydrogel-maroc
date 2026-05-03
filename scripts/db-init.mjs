// Initialize/reset the HydroGel tracking database
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'hydrogel.db');
const schemaPath = join(__dirname, '..', 'data', 'schema_v2.sql');
const seedPath = join(__dirname, '..', 'data', 'seed_v2.sql');

if (!existsSync(dirname(dbPath))) mkdirSync(dirname(dbPath));

const db = new DatabaseSync(dbPath);

console.log('Applying schema...');
db.exec(readFileSync(schemaPath, 'utf8'));

console.log('Seeding data...');
db.exec(readFileSync(seedPath, 'utf8'));

const counts = {
  lands: db.prepare('SELECT COUNT(*) as c FROM land_listings').get().c,
  suppliers: db.prepare('SELECT COUNT(*) as c FROM hydrogel_suppliers').get().c,
  programs: db.prepare('SELECT COUNT(*) as c FROM funding_programs').get().c,
};

console.log(`\nDatabase ready: ${dbPath}`);
console.log(`  ${counts.lands} land listings`);
console.log(`  ${counts.suppliers} hydrogel suppliers`);
console.log(`  ${counts.programs} funding programs`);

db.close();
