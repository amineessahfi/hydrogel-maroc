-- HydroGel Maroc — Seed Data v2
-- Sources: Mubawab, Avito, Prestige Immo, Kensington Morocco, FDA CRI Fes-Meknes, MDPI Water 2023

-- ============================================================
-- LAND LISTINGS (Rhamna + nearby for comparison)
-- ============================================================

INSERT INTO land_listings (region, commune, surface_ha, price_mad, listing_type, title_status, road_access_km, has_well, fda_irrigation_eligible, fda_solar_eligible, source_url, source_name, notes)
VALUES
  -- Rhamna listings (from FDA report)
  ('Rhamna', 'Skhour Rhamna', 3, 180000, 'achat', 'titre_foncier', 2, 0, 1, 1, NULL, 'Avito.ma (est. report FDA)', 'Terre bour titre. ~60 000 DH/ha. Terrain sec de base.'),
  ('Rhamna', 'Sidi Bou Othmane', 4, 260000, 'achat', 'titre_foncier', 1.5, 0, 1, 1, NULL, 'Avito.ma (est. report FDA)', 'Mieux positionne, ~65 000 DH/ha effectif.'),
  ('Rhamna', 'Sidi Bou Othmane', 16.75, 1460000, 'achat', 'titre_foncier', 0.5, 0, 1, 1, NULL, 'Listing public Rehamna', '87 000 DH/ha. Bien place, acces strategique.'),

  -- Marrakech-Safi comparison listings
  ('Marrakech-Safi', 'Khatazakan, Safi', 8, 800000, 'achat', 'titre_foncier', 3, 0, 1, 0, 'https://www.prestigeimmo.ma/en/product/307-agricultural-land-of-8-hectares-safi-region.html', 'Prestige Immo Marrakech', '100 000 DH/ha. Terre fertile attifasse.'),
  ('Marrakech-Safi', 'Sid Zouine', 4, 500000, 'achat', 'titre_foncier', 0.2, 0, 1, 1, 'https://www.mubawab.ma/en/st/sid-zouine/farms-for-sale', 'Mubawab', '125 000 DH/ha. Cloture, eau + electricite.'),
  ('Marrakech-Safi', 'Route Fes Km 38', 5, 3500000, 'achat', 'titre_foncier', 0.1, 1, 0, 0, 'https://www.mubawab.ma/en/a/8320962/prestigious-agricultural-land-on-the-fes-road', 'Mubawab', '700 000 DH/ha. Oliveraie, puits existant.'),

  -- Tifelt (cheapest verified — for comparison)
  ('Rabat-Sale-Kenitra', 'Tifelt', 2, 90000, 'achat', 'titre_foncier', 1, 1, 1, 0, 'https://www.kensingtonmorocco.com/en_gb/sale/kenitra/2-hectare-farmland-tifelt/', 'Kensington Morocco', '45 000 DH/ha. Puits + goutte-a-goutte. Moins cher trouve.'),
  ('Rabat-Sale-Kenitra', 'Tifelt', 1.2, 590000, 'achat', 'titre_foncier', 0.3, 0, 1, 1, 'https://aykana.ma/en/property/vente-terrain-agricole-de-12-hectares-a-tifelt-ref-3990/', 'Aykana Immobilier', '492 000 DH/ha. Terrain amenage.');

-- ============================================================
-- HYDROGEL SUPPLIERS
-- ============================================================

INSERT INTO hydrogel_suppliers (supplier_name, country, product_name, grade, min_order_kg, fob_price_usd, shipping_est_mad, delivery_time_days, sample_available, contact_url, contact_phone, notes)
VALUES
  ('Qingdao Soco New Material', 'Chine', 'Potassium Polyacrylate SAP', 'agricole', 25, 2.50, 4000, 30, 1, 'https://www.tradewheel.com/p/potassium-polyacrylate-degradable-agricultural-absorbent-hydrogel-2848110/', NULL, 'Contact pour echantillon DHL. Prix FOB estime ~$2.5/kg pour 100kg+.'),
  ('SX Shandong', 'Chine', 'SAP Agricultural Potassium Polyacrylate', 'agricole', 18, 2.00, 3500, 35, 1, 'https://cn.diytrade.com/china/pd/21211743/Sap_Agricultural_Potassium_Polyacrylate_Best_Price.html', '+86-15511360268', 'WhatsApp dispo. Min 18 unites. Paiement TT/LC/DP.'),
  ('WELLDONE', 'Chine', 'Biodegradable Hydrogel Powder', 'agricole', 25, 2.80, 4000, 28, 1, 'https://korean.tradechina.com/WELLDONE-Biodegradable-Hydrogel-Powder-de-Potassium_235822335.html', NULL, 'Hydrogel biodegradable.'),
  ('Jasontechcn', 'Chine', 'Biodegradable Hydrogel Powder SAP', 'agricole', 10, 3.00, 2500, 21, 1, 'https://www.jasontechcn.com/sale-13167614-biodegradable-hydrogel-powder-acrylic-potassium-sap-super-absorbent-polymer-9003-04-7.html', NULL, 'Petites quantites possibles.'),
  ('Alquera', 'Espagne', 'Poliacrilato de Potasio', 'agricole', 0.2, NULL, 800, 7, 1, 'https://www.alquera.com/en/poliacrilato-de-potasio/', NULL, 'Expedition rapide vers Maroc. 200g-20kg. Prix sur selection.'),
  ('Makhro (Aquafix)', 'Afrique du Sud', 'Makhro Aquafix 6x500g', 'agricole', 3, NULL, 600, 14, 0, 'https://groplus.co.za/products/makhro-aquafix-6-x-500g', NULL, 'R 765/3kg retail = ~130 MAD/kg. Produit emballe.');

-- ============================================================
-- FUNDING PROGRAMS (updated with FDA data)
-- ============================================================

INSERT INTO funding_programs (program_name, type, max_amount_mad, coverage_pct, interest_rate, eligibility, required_docs, office_address, status, notes)
VALUES
  ('FDA — Irrigation Localisee', 'subsidy', 23000, 80, NULL, 'Exploitants agricoles, terres titre ou location documentee. Projet irrigation localisee.', 'Dossier technique (plan parcellaire, devis installateur agree, fiche projet), titre foncier ou contrat de location, CIN, attestation fiscale.', 'DPA Rhamna (Direction Provinciale d''Agriculture)', 'researching', 'Couvre 80-100% du cout eligible. Plafond: 23 000 DH/ha equipe. Certains projets collectifs: jusqu''a 38 000 DH/ha. Depot via la DPA.'),
  ('FDA — Pompage Solaire', 'subsidy', NULL, 30, NULL, 'Exploitants avec irrigation localisee. Equipement certifie + installateur agree.', 'Devis equipement certifie, contrat installateur agree, attestation irrigation localisee en place ou prevue.', 'DPA Rhamna', 'researching', '30% du cout d''acquisition et installation. En vigueur depuis 19 fevrier 2024. Combine avec subvention irrigation.'),
  ('FDA — Stockage Eau', 'subsidy', 12000, NULL, NULL, 'Projets avec irrigation localisee. Bassin de stockage dimensionne.', 'Plan de dimensionnement, devis construction.', 'DPA Rhamna', 'researching', '50 DH/m3 de stockage. Plafond: 12 000 DH/ha equipe.'),
  ('Intilaka Al Qarawi', 'loan', 1200000, NULL, 1.75, 'Entrepreneurs ruraux, agriculteurs individuels, cooperatives. Projet ≤5 ans. CA ≤10M MAD/an.', 'Business plan, CIN, statut auto-entrepreneur ou RC, releve bancaire.', 'CRI Marrakech-Safi, Comite IESFP', 'researching', 'Pret bancaire garanti par l''Etat. Taux 1.75%. Jusqu''a 1.2M MAD. Depot via le CRI.'),
  ('Start-VSE (Intilaka)', 'loan', 50000, 20, 0, 'Attache a un pret Intilaka. Couvre 20% du pret investissement.', 'Meme dossier qu''Intilaka.', 'CRI Marrakech-Safi', 'researching', 'Pret gratuit 0%. Plafonne a 50 000 MAD.'),
  ('INDH Programme 3', 'grant', 300000, NULL, NULL, 'Jeunes ruraux, cooperatives, TPE. Projet generant du revenu.', 'Fiche projet, CIN, attestation de residence, devis.', 'Bureau INDH, Province de Rhamna, Benguerir', 'researching', 'Subvention pour equipement et fonds de roulement. Montant moyen par projet: 80 000-300 000 MAD. Decision par comite local.'),
  ('ADA — Aide Jeunes Agriculteurs', 'subsidy', 150000, NULL, NULL, 'Jeunes agriculteurs (<40 ans). Installation en agriculture.', 'Dossier d''installation, formation agricole ou experience, projet d''exploitation.', 'DPA Rhamna', 'researching', 'Aide a l''installation. Cumulable avec FDA.'),
  ('TAMWILCOM — Garantie', 'loan', NULL, 60, NULL, 'TPE/PME marocaines. Pret bancaire avec garantie partielle de l''Etat.', 'Via banque partenaire (CAM, BP, etc.).', 'Banques partenaires (CAM Benguerir)', 'researching', 'Garantie 60-80% du pret. Reduit l''exigence de garanties personnelles.');
