-- QatraSol — Rhamna Data Matrix v3
-- Comprehensive land, soil, water, and hydrogel suitability database

-- Communes of Rhamna Province
CREATE TABLE rhamna_communes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_arabic TEXT,
  cercle TEXT NOT NULL,
  caidat TEXT NOT NULL,
  population_est INTEGER,
  area_km2_est REAL,
  is_municipality INTEGER DEFAULT 0
);

-- Soil profiles by location
CREATE TABLE soil_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  commune_id INTEGER REFERENCES rhamna_communes(id),
  location_name TEXT,
  soil_type TEXT CHECK(soil_type IN ('sableux','limoneux','argileux','sablo-limoneux','limono-argileux','salin','caillouteux','inconnu')),
  texture_class TEXT,
  organic_matter_pct REAL,
  ph REAL,
  depth_cm REAL,
  water_holding_capacity_mm_per_m REAL,
  salinity_ds_m REAL,
  stoniness TEXT CHECK(stoniness IN ('faible','moyen','eleve','tres_eleve')),
  erosion_risk TEXT CHECK(erosion_risk IN ('faible','moyen','eleve','tres_eleve')),
  source TEXT
);

-- Hydrogel suitability matrix per soil type
CREATE TABLE hydrogel_suitability (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  soil_type TEXT UNIQUE NOT NULL,
  application_rate_kg_ha REAL,
  application_rate_low REAL,
  application_rate_high REAL,
  water_savings_pct REAL,
  yield_increase_pct_est REAL,
  lifespan_years REAL,
  depth_mixing_cm INTEGER,
  suitability_score INTEGER CHECK(suitability_score BETWEEN 1 AND 10),
  notes TEXT
);

-- Land listings with new columns
CREATE TABLE land_listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  commune_id INTEGER REFERENCES rhamna_communes(id),
  region TEXT NOT NULL DEFAULT 'Rhamna',
  commune TEXT,
  surface_ha REAL NOT NULL,
  price_mad REAL NOT NULL,
  price_per_ha REAL GENERATED ALWAYS AS (price_mad / NULLIF(surface_ha, 0)) STORED,
  listing_type TEXT CHECK(listing_type IN ('achat','location','encheres')),
  title_status TEXT CHECK(title_status IN ('titre_foncier','melkia','en_cours','location','inconnu')),
  soil_type TEXT,
  has_well INTEGER DEFAULT 0,
  water_depth_m REAL,
  road_access_km REAL,
  has_electricity INTEGER DEFAULT 0,
  fda_irrigation_eligible INTEGER DEFAULT 0,
  fda_solar_eligible INTEGER DEFAULT 0,
  hydrogel_suitability_score INTEGER,
  estimated_hydrogel_kg REAL GENERATED ALWAYS AS (surface_ha * 50) STORED,
  source_url TEXT,
  source_name TEXT,
  contact_phone TEXT,
  date_listed TEXT,
  date_scraped TEXT DEFAULT (datetime('now')),
  status TEXT DEFAULT 'active',
  notes TEXT
);

-- Hydrogel suppliers
CREATE TABLE hydrogel_suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_name TEXT NOT NULL,
  country TEXT,
  product_name TEXT,
  price_per_kg_mad REAL,
  min_order_kg REAL,
  fob_price_usd REAL,
  shipping_est_mad REAL,
  delivery_time_days INTEGER,
  sample_available INTEGER DEFAULT 0,
  contact_url TEXT,
  contact_phone TEXT,
  date_checked TEXT DEFAULT (datetime('now'))
);

-- Funding programs
CREATE TABLE funding_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_name TEXT NOT NULL,
  type TEXT,
  max_amount_mad REAL,
  coverage_pct REAL,
  interest_rate REAL,
  eligibility TEXT,
  office_address TEXT,
  status TEXT DEFAULT 'researching',
  notes TEXT
);

-- Crop data for Rhamna
CREATE TABLE crop_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  crop_name TEXT NOT NULL,
  crop_name_fr TEXT,
  area_ha_est INTEGER,
  yield_t_ha_low REAL,
  yield_t_ha_high REAL,
  water_requirement_mm REAL,
  growing_season TEXT,
  hydrogel_benefit TEXT CHECK(hydrogel_benefit IN ('eleve','moyen','faible','inconnu')),
  notes TEXT
);

-- Price snapshots for tracking changes
CREATE TABLE price_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER REFERENCES land_listings(id),
  supplier_id INTEGER REFERENCES hydrogel_suppliers(id),
  item_type TEXT NOT NULL,
  item_name TEXT NOT NULL,
  price_mad REAL,
  quantity REAL,
  unit TEXT,
  date_recorded TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_communes_cercle ON rhamna_communes(cercle);
CREATE INDEX idx_soil_commune ON soil_profiles(commune_id);
CREATE INDEX idx_land_commune ON land_listings(commune_id);
CREATE INDEX idx_land_price ON land_listings(price_per_ha);
CREATE INDEX idx_land_hydrogel ON land_listings(hydrogel_suitability_score);
