-- Land listings from verified sources (May 2026)
INSERT INTO land_listings (region, commune, surface_ha, price_mad, bour_irrigue, has_well, has_electricity, has_fence, source_url, source_name, notes)
VALUES
  ('Rabat-Sale-Kenitra', 'Tifelt', 2, 90000, 'bour', 1, 0, 0, 'https://www.kensingtonmorocco.com/en_gb/sale/kenitra/2-hectare-farmland-tifelt/', 'Kensington Morocco', 'Puits fonctionnel, systeme goutte-a-goutte'),
  ('Marrakech-Safi', 'Khatazakan, pres Sebt Gzoula', 8, 800000, 'bour', 0, 0, 0, 'https://www.prestigeimmo.ma/en/product/307-agricultural-land-of-8-hectares-safi-region.html', 'Prestige Immo Marrakech', 'Terre fertile attifasse, cultures + elevage'),
  ('Marrakech-Safi', 'Sid Zouine', 4, 500000, 'bour', 0, 1, 1, 'https://www.mubawab.ma/en/st/sid-zouine/farms-for-sale', 'Mubawab', 'Cloture, route goudronnee, eau + electricite'),
  ('Rabat-Sale-Kenitra', 'Tifelt', 1.2, 590000, 'bour', 0, 0, 0, 'https://aykana.ma/en/property/vente-terrain-agricole-de-12-hectares-a-tifelt-ref-3990/', 'Aykana Immobilier', 'Cereales, maraichage, elevage'),
  ('Marrakech-Safi', 'Route de Fes Km 38', 5, 3500000, 'irrigue', 1, 0, 0, 'https://www.mubawab.ma/en/a/8320962/prestigious-agricultural-land-on-the-fes-road', 'Mubawab', 'Oliveraie, puits, construction'),
  ('Rabat-Sale-Kenitra', 'Route Rabat-Rommani', 32, 19200000, 'bour', 0, 0, 0, 'https://360annonces.com/annonce/field-agricole-andre-32-hectares-600-000-madhectare', '360Annonces', 'Route principale, terre fertile');

-- Hydrogel suppliers
INSERT INTO hydrogel_suppliers (supplier_name, country, product_name, grade, min_order_kg, contact_url, notes)
VALUES
  ('Qingdao Soco New Material', 'Chine', 'Potassium Polyacrylate SAP', 'agricole', 25, 'https://www.tradewheel.com/p/potassium-polyacrylate-degradable-agricultural-absorbent-hydrogel-2848110/', 'SAP agricole biodegradable'),
  ('SX Shandong', 'Chine', 'SAP Agricultural Potassium Polyacrylate', 'agricole', 18, 'https://cn.diytrade.com/china/pd/21211743/Sap_Agricultural_Potassium_Polyacrylate_Best_Price.html', 'WhatsApp: +86-15511360268, Min 18 unites'),
  ('WELLDONE', 'Chine', 'Biodegradable Hydrogel Powder', 'agricole', NULL, 'https://korean.tradechina.com/WELLDONE-Biodegradable-Hydrogel-Powder-de-Potassium_235822335.html', 'Hydrogel biodegradable'),
  ('Jasontechcn', 'Chine', 'Biodegradable Hydrogel Powder SAP', 'agricole', NULL, 'https://www.jasontechcn.com/sale-13167614-biodegradable-hydrogel-powder-acrylic-potassium-sap-super-absorbent-polymer-9003-04-7.html', 'Poudre hydrogel biodegradable'),
  ('Alquera', 'Espagne', 'Poliacrilato de Potasio', 'agricole', 0.2, 'https://www.alquera.com/en/poliacrilato-de-potasio/', 'Expedition Europe, 200g-20kg, prix sur selection'),
  ('Makhro (Aquafix)', 'Afrique du Sud', 'Makhro Aquafix 6x500g', 'agricole', 3, 'https://groplus.co.za/products/makhro-aquafix-6-x-500g', 'R 765 pour 3kg retail, ~130 MAD/kg');

-- Funding programs
INSERT INTO funding_programs (program_name, type, max_amount_mad, interest_rate, status, notes)
VALUES
  ('Intilaka Al Qarawi', 'loan', 1200000, 1.75, 'researching', 'CRI Marrakech-Safi. Entrepreneurs ruraux, agriculteurs. Dossier via comite IESFP.'),
  ('Start-VSE (Intilaka)', 'loan', 50000, 0, 'researching', 'Pret gratuit 0%, 20% du pret investissement. Attache a Intilaka.'),
  ('INDH Programme 3', 'grant', 300000, NULL, 'researching', 'Amelioration revenu jeunes ruraux. Depot au bureau INDH Province.'),
  ('Forsa', 'loan', 100000, 0, 'researching', 'Programme gouvernemental entrepreneurship. Plateforme en ligne.'),
  ('ADA Subvention Jeunes', 'subsidy', 150000, NULL, 'researching', 'Aide installation jeunes agriculteurs. Depot DPA Rhamna.'),
  ('TAMWILCOM Garantie', 'loan', NULL, NULL, 'researching', 'Garantie 60-80% du pret bancaire. Via banques partenaires (CAM, BP).');
