-- QatraSol — Rhamna Data Matrix Seed v3
-- Sources: Wikipedia, Nature SR 2021, Briak & Kebede 2021, Acta Horticulturae, Mubawab, Avito, FDA CRI

-- ============================================================
-- 23 RURAL COMMUNES + 2 MUNICIPALITIES
-- ============================================================
INSERT INTO rhamna_communes (name, name_arabic, cercle, caidat, is_municipality) VALUES
  ('Benguerir', 'بن جرير', 'Benguerir', 'Benguerir', 1),
  ('Sidi Bou Othmane', 'سيدي بوعثمان', 'Sidi Bou Othmane', 'Sidi Bou Othmane', 1),
  ('Skhour Rehamna', 'صخور الرحامنة', 'Rehamna', 'Skhour', 0),
  ('Sidi Ghanem', 'سيدي غانم', 'Rehamna', 'Skhour', 0),
  ('Sidi Mansour', 'سيدي منصور', 'Rehamna', 'Skhour', 0),
  ('Jaafra', 'جعفرة', 'Rehamna', 'Oulad Tmim', 0),
  ('Sidi Abdallah', 'سيدي عبد الله', 'Rehamna', 'Oulad Tmim', 0),
  ('Skoura Lhadra', 'صكورة الحدرة', 'Rehamna', 'Oulad Tmim', 0),
  ('Sidi Ali Labrahla', 'سيدي علي لبراحلة', 'Rehamna', 'Labrikiyne', 0),
  ('Oulad Hassoune Hamri', 'أولاد حسون حمري', 'Rehamna', 'Labrikiyne', 0),
  ('Labrikiyne', 'لبريكيين', 'Rehamna', 'Labrikiyne', 0),
  ('Oulad Aamer Tizmarine', 'أولاد عامر تيزمارين', 'Rehamna', 'Tnine Bouchane', 0),
  ('Ait Hammou', 'أيت حمو', 'Rehamna', 'Tnine Bouchane', 0),
  ('Bouchane', 'بوشان', 'Rehamna', 'Tnine Bouchane', 0),
  ('Ait Taleb', 'أيت الطالب', 'Rehamna', 'Tnine Bouchane', 0),
  ('Bourrous', 'بوروس', 'Sidi Bou Othmane', 'Sidi Bou Othmane', 0),
  ('Sidi Boubker', 'سيدي بوبكر', 'Sidi Bou Othmane', 'Sidi Bou Othmane', 0),
  ('Jbilate', 'جبيلات', 'Sidi Bou Othmane', 'Sidi Bou Othmane', 0),
  ('Nzalat Laadam', 'نزالة العظام', 'Sidi Bou Othmane', 'Louta', 0),
  ('Lamharra', 'لمحرة', 'Sidi Bou Othmane', 'Louta', 0),
  ('Oulad Imloul', 'أولاد إملول', 'Sidi Bou Othmane', 'Louta', 0),
  ('Akarma', 'أكارمة', 'Sidi Bou Othmane', 'Ras El Ain', 0),
  ('Tlauh', 'تلوح', 'Sidi Bou Othmane', 'Ras El Ain', 0),
  ('Jaidate', 'جيدات', 'Sidi Bou Othmane', 'Ras El Ain', 0),
  ('Ras Ain Rhamna', 'رأس العين', 'Sidi Bou Othmane', 'Ras El Ain', 0);

-- ============================================================
-- SOIL PROFILES — Rhamna region (from Briak 2021, Nature SR, ISHS)
-- ============================================================
INSERT INTO soil_profiles (location_name, soil_type, texture_class, organic_matter_pct, ph, depth_cm, water_holding_capacity_mm_per_m, stoniness, erosion_risk, source) VALUES
  ('Rhamna — zone bour cerealiere (Sidi Bou Othmane)', 'sablo-limoneux', 'Sandy Loam', 0.8, 7.8, 60, 80, 'moyen', 'eleve', 'Briak & Kebede 2021'),
  ('Rhamna — zone pastorale (Skhour)', 'sableux', 'Loamy Sand', 0.5, 8.0, 45, 55, 'eleve', 'tres_eleve', 'ISHS Cactus Study'),
  ('Rhamna — depressions (Benguerir periphery)', 'limono-argileux', 'Clay Loam', 1.2, 7.5, 80, 130, 'faible', 'moyen', 'Nature SR 2021 extrapolated'),
  ('Sehb El Mesjoune (Rhamna sud)', 'salin', 'Silty Clay', 0.6, 8.3, 55, 90, 'moyen', 'eleve', 'UM6P SELMAS Project'),
  ('Rhamna — zone olivier (El Kelaa border)', 'limoneux', 'Silt Loam', 1.0, 7.6, 70, 110, 'faible', 'moyen', 'Estimated from regional data'),
  ('Rhamna — general bour plateau', 'sablo-limoneux', 'Sandy Loam', 0.7, 7.9, 50, 70, 'eleve', 'eleve', 'General Rhamna literature');

-- ============================================================
-- HYDROGEL SUITABILITY per soil type
-- ============================================================
INSERT INTO hydrogel_suitability (soil_type, application_rate_kg_ha, application_rate_low, application_rate_high, water_savings_pct, yield_increase_pct_est, lifespan_years, depth_mixing_cm, suitability_score, notes) VALUES
  ('sableux', 75, 60, 90, 55, 35, 3, 25, 9, 'Sols sableux: meilleur benefice hydrogel. Faible retention naturelle = gain maximal.'),
  ('sablo-limoneux', 50, 40, 65, 45, 25, 4, 20, 8, 'Sol dominant a Rhamna. Bon compromis cout/bénéfice.'),
  ('limoneux', 40, 30, 50, 35, 20, 4, 15, 7, 'Bonne retention naturelle. Hydrogel utile pour saisons seches.'),
  ('limono-argileux', 35, 25, 45, 25, 15, 5, 15, 6, 'Argiles retiennent deja bien l''eau. Benefice plus faible.'),
  ('argileux', 30, 20, 40, 20, 10, 5, 12, 5, 'Fissures de retrait. Hydrogel aide a maintenir structure.'),
  ('salin', 55, 45, 70, 40, 30, 3, 20, 7, 'Sels reduisent absorption hydrogel. Formule speciale necessaire.'),
  ('caillouteux', 60, 50, 80, 50, 30, 3, 15, 6, 'Pierres reduisent volume effectif. Application localisee recommandee.');

-- ============================================================
-- CROP DATA — Rhamna
-- ============================================================
INSERT INTO crop_data (crop_name, crop_name_fr, area_ha_est, yield_t_ha_low, yield_t_ha_high, water_requirement_mm, growing_season, hydrogel_benefit, notes) VALUES
  ('barley', 'Orge', 120000, 0.6, 1.8, 300, 'Nov-Mai', 'eleve', 'Culture principale de Rhamna. Tres sensible au stress hydrique.'),
  ('wheat', 'Ble tendre', 90000, 0.8, 2.3, 350, 'Nov-Mai', 'eleve', 'Rendement 0-2.33 t/ha selon Briak 2021. Marzak = variete locale.'),
  ('olive', 'Olivier', 15000, 0.5, 1.5, 500, 'Perenne', 'moyen', 'En expansion. Goutte-a-goutte + hydrogel = bonne synergie.'),
  ('cactus', 'Cactus figuier', 8000, 3.0, 8.0, 250, 'Perenne', 'faible', 'Deja adapte a la secheresse. Hydrogel marginal sauf plantation.'),
  ('sheep', 'Ovin', NULL, NULL, NULL, NULL, 'Annuel', NULL, 'Principal elevage. Paturage depend de la pluie.'),
  ('goat', 'Caprin', NULL, NULL, NULL, NULL, 'Annuel', NULL, 'Adapte aux zones arides.'),
  ('cumin', 'Cumin', 3000, 0.3, 0.8, 200, 'Oct-Mar', 'eleve', 'Culture de rente. Prix eleve au marche.'),
  ('onion', 'Oignon', 1500, 15.0, 30.0, 400, 'Sep-Feb', 'eleve', 'Etude hydrogel-oignon MDPI Water 2023. 48% eau en moins.');

-- ============================================================
-- HYDROGEL SUPPLIERS
-- ============================================================
INSERT INTO hydrogel_suppliers (supplier_name, country, product_name, fob_price_usd, min_order_kg, shipping_est_mad, delivery_time_days, sample_available, contact_url) VALUES
  ('Qingdao Soco New Material', 'Chine', 'Potassium Polyacrylate SAP', 2.50, 25, 4000, 30, 1, 'https://www.tradewheel.com/p/potassium-polyacrylate-degradable-agricultural-absorbent-hydrogel-2848110/'),
  ('SX Shandong', 'Chine', 'SAP Agricultural Potassium Polyacrylate', 2.00, 18, 3500, 35, 1, 'https://cn.diytrade.com/china/pd/21211743/'),
  ('Alquera', 'Espagne', 'Poliacrilato de Potasio', NULL, 0.2, 800, 7, 1, 'https://www.alquera.com/en/poliacrilato-de-potasio/'),
  ('Makhro (Aquafix)', 'Afrique du Sud', 'Makhro Aquafix 6x500g', NULL, 3, 600, 14, 0, 'https://groplus.co.za/products/makhro-aquafix-6-x-500g'),
  ('Jasontechcn', 'Chine', 'Biodegradable Hydrogel Powder SAP', 3.00, 10, 2500, 21, 1, 'https://www.jasontechcn.com/sale-13167614-biodegradable-hydrogel-powder.html'),
  ('WELLDONE', 'Chine', 'Biodegradable Hydrogel Powder', 2.80, 25, 4000, 28, 1, 'https://korean.tradechina.com/WELLDONE-Biodegradable-Hydrogel-Powder_235822335.html');

-- ============================================================
-- FUNDING PROGRAMS
-- ============================================================
INSERT INTO funding_programs (program_name, type, max_amount_mad, coverage_pct, interest_rate, office_address, status, notes) VALUES
  ('FDA — Irrigation Localisee', 'subsidy', 23000, 80, NULL, 'DPA Rhamna, Benguerir', 'researching', '80-100% du cout. Plafond 23 000 DH/ha. Cumulable.'),
  ('FDA — Pompage Solaire', 'subsidy', NULL, 30, NULL, 'DPA Rhamna', 'researching', '30% du cout equipement + install. Depuis fev 2024.'),
  ('FDA — Stockage Eau', 'subsidy', 12000, NULL, NULL, 'DPA Rhamna', 'researching', '50 DH/m3. Plafond 12 000 DH/ha.'),
  ('Intilaka Al Qarawi', 'loan', 1200000, NULL, 1.75, 'CRI Marrakech-Safi', 'researching', 'Pret garanti Etat. 1.2M MAD max. Entrepreneurs ruraux.'),
  ('Start-VSE', 'loan', 50000, 20, 0, 'CRI Marrakech-Safi', 'researching', 'Pret 0%. Attache a Intilaka.'),
  ('INDH Programme 3', 'grant', 300000, NULL, NULL, 'INDH Province Rhamna, Benguerir', 'researching', 'Subvention equipement + fonds roulement.'),
  ('ADA — Jeunes Agriculteurs', 'subsidy', 150000, NULL, NULL, 'DPA Rhamna', 'researching', 'Aide installation <40 ans.'),
  ('TAMWILCOM', 'loan', NULL, 60, NULL, 'Banques partenaires', 'researching', 'Garantie 60-80% du pret bancaire.');
