CREATE TABLE IF NOT EXISTS land_listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region TEXT NOT NULL,
  commune TEXT,
  surface_ha REAL NOT NULL,
  price_mad REAL NOT NULL,
  price_per_ha REAL GENERATED ALWAYS AS (price_mad / surface_ha) STORED,
  bour_irrigue TEXT CHECK(bour_irrigue IN ('bour', 'irrigue', 'mixte', 'inconnu')) DEFAULT 'inconnu',
  has_well INTEGER DEFAULT 0,
  has_electricity INTEGER DEFAULT 0,
  has_fence INTEGER DEFAULT 0,
  source_url TEXT,
  source_name TEXT,
  date_listed TEXT,
  date_scraped TEXT DEFAULT (datetime('now')),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS hydrogel_suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_name TEXT NOT NULL,
  country TEXT,
  product_name TEXT,
  grade TEXT CHECK(grade IN ('agricole', 'industriel', 'medical', 'inconnu')) DEFAULT 'inconnu',
  price_per_kg_mad REAL,
  min_order_kg REAL,
  fob_price_usd REAL,
  shipping_est_mad REAL,
  contact_url TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  date_checked TEXT DEFAULT (datetime('now')),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS funding_programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_name TEXT NOT NULL,
  type TEXT CHECK(type IN ('grant', 'loan', 'subsidy', 'equity', 'competition', 'incubation')),
  max_amount_mad REAL,
  interest_rate REAL,
  eligibility TEXT,
  application_url TEXT,
  deadline TEXT,
  status TEXT CHECK(status IN ('open', 'closed', 'applied', 'approved', 'rejected', 'researching')) DEFAULT 'researching',
  date_added TEXT DEFAULT (datetime('now')),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS price_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_type TEXT CHECK(item_type IN ('hydrogel', 'land', 'other')) NOT NULL,
  item_name TEXT NOT NULL,
  price_mad REAL,
  quantity REAL,
  unit TEXT,
  source TEXT,
  date_recorded TEXT DEFAULT (datetime('now'))
);
