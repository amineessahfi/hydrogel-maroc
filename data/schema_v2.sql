-- HydroGel Maroc — Land & Price Tracking System v2
-- Enhanced schema with FDA subsidy tracking and parcel comparison

-- Drop old tables for clean migration (data will be re-seeded)
DROP TABLE IF EXISTS price_snapshots;
DROP TABLE IF EXISTS funding_programs;
DROP TABLE IF EXISTS hydrogel_suppliers;
DROP TABLE IF EXISTS parcel_comparisons;
DROP TABLE IF EXISTS land_listings;

CREATE TABLE land_listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region TEXT NOT NULL DEFAULT 'Rhamna',
  commune TEXT,
  surface_ha REAL NOT NULL,
  price_mad REAL NOT NULL,
  price_per_ha REAL GENERATED ALWAYS AS (price_mad / NULLIF(surface_ha, 0)) STORED,

  -- Title & legal
  title_status TEXT CHECK(title_status IN ('titre_foncier', 'melkia', 'en_cours', 'location', 'inconnu')) DEFAULT 'inconnu',
  listing_type TEXT CHECK(listing_type IN ('achat', 'location', 'encheres')) DEFAULT 'achat',

  -- Access & infrastructure
  road_access_km REAL,
  has_well INTEGER DEFAULT 0,
  has_electricity INTEGER DEFAULT 0,
  has_fence INTEGER DEFAULT 0,
  water_depth_m REAL,

  -- FDA eligibility flags
  fda_irrigation_eligible INTEGER DEFAULT 0,
  fda_solar_eligible INTEGER DEFAULT 0,
  fda_storage_eligible INTEGER DEFAULT 0,

  -- Scoring (calculated manually after review)
  parcel_score INTEGER CHECK(parcel_score BETWEEN 0 AND 100),

  -- Source tracking
  source_url TEXT,
  source_name TEXT,
  contact_phone TEXT,
  contact_name TEXT,
  date_listed TEXT,
  date_scraped TEXT DEFAULT (datetime('now')),
  date_updated TEXT DEFAULT (datetime('now')),
  status TEXT CHECK(status IN ('active', 'sold', 'expired', 'contacted', 'visited', 'negotiating')) DEFAULT 'active',
  notes TEXT
);

CREATE TABLE hydrogel_suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_name TEXT NOT NULL,
  country TEXT,
  product_name TEXT,
  grade TEXT CHECK(grade IN ('agricole', 'industriel', 'medical', 'inconnu')) DEFAULT 'inconnu',
  price_per_kg_mad REAL,
  min_order_kg REAL,
  fob_price_usd REAL,
  shipping_est_mad REAL,
  delivery_time_days INTEGER,
  contact_url TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  sample_available INTEGER DEFAULT 0,
  sample_cost_mad REAL,
  date_checked TEXT DEFAULT (datetime('now')),
  notes TEXT
);

CREATE TABLE funding_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_name TEXT NOT NULL,
  type TEXT CHECK(type IN ('grant', 'loan', 'subsidy', 'equity', 'competition', 'incubation')),
  max_amount_mad REAL,
  coverage_pct REAL,
  interest_rate REAL,
  eligibility TEXT,
  required_docs TEXT,
  application_url TEXT,
  office_address TEXT,
  deadline TEXT,
  status TEXT CHECK(status IN ('open', 'closed', 'applied', 'approved', 'rejected', 'researching')) DEFAULT 'researching',
  date_added TEXT DEFAULT (datetime('now')),
  notes TEXT
);

CREATE TABLE price_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER REFERENCES land_listings(id),
  supplier_id INTEGER REFERENCES hydrogel_suppliers(id),
  item_type TEXT CHECK(item_type IN ('hydrogel', 'land', 'other')) NOT NULL,
  item_name TEXT NOT NULL,
  price_mad REAL,
  quantity REAL,
  unit TEXT,
  source TEXT,
  date_recorded TEXT DEFAULT (datetime('now'))
);

CREATE TABLE parcel_comparisons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  parcel_ids TEXT NOT NULL,
  notes TEXT,
  date_created TEXT DEFAULT (datetime('now'))
);

-- Indexes for common queries
CREATE INDEX idx_land_region ON land_listings(region);
CREATE INDEX idx_land_price_ha ON land_listings(price_per_ha);
CREATE INDEX idx_land_status ON land_listings(status);
CREATE INDEX idx_land_listing_type ON land_listings(listing_type);
CREATE INDEX idx_suppliers_country ON hydrogel_suppliers(country);
CREATE INDEX idx_snapshots_date ON price_snapshots(date_recorded);
