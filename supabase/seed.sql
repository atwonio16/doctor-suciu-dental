-- ============================================
-- Doctor Suciu Dental Clinic - Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- SERVICES
INSERT INTO services (title, description, long_description, icon, features, price, duration, order_index, is_active)
VALUES
  ('Implant Dentar', 'Soluții permanente pentru dinți lipsă cu garanție 10 ani', 'Implanturile dentare sunt cea mai modernă soluție pentru înlocuirea dinților lipsă. Folosim implanturi premium cu garanție 10 ani.', 'CirclePlus', ARRAY['Garanție 10 ani', 'Materiale premium', 'Durată minimă', 'Rezultate naturale'], 'de la 2.800 RON', '3-6 luni', 1, true),
  ('Ortodonție', 'Îndreptarea dinților cu aparate fixe sau Invisalign', 'Oferim soluții complete de ortodonție, de la aparate fixe tradiționale până la aliniere invizibilă Invisalign.', 'AlignCenter', ARRAY['Aparat fix', 'Invisalign', 'Aparat ceramic', 'Gutiere retenție'], 'de la 8.000 RON', '12-18 luni', 2, true),
  ('Albire Dentară', 'Zâmbet mai alb cu până la 8 nuanțe în 90 minute', 'Albire profesională în cabinet cu tehnologia Zoom Philips pentru rezultate imediate și de lungă durată.', 'Sparkles', ARRAY['Rezultate imediate', 'Fără durere', 'Până la 8 nuanțe', 'Sigur pentru smalț'], 'de la 350 RON', '90 min', 3, true),
  ('Estetică Dentară', 'Fațete ceramică E-max și coroane zirconiu', 'Transformă-ți zâmbetul cu fațete din ceramică E-max sau coroane din zirconiu pentru un look natural.', 'Smile', ARRAY['Fațete E-max', 'Coroane zirconiu', 'Redesign zâmbet', 'Rezultate naturale'], 'de la 1.200 RON', '1-2 săptămâni', 4, true),
  ('Stomatologie Copii', 'Atmosferă prietenoasă și tratament fără frică', 'Clinica noastră este prietenoasă cu copiii. Prima vizită este gratuită pentru copiii 0-3 ani.', 'Baby', ARRAY['Primă vizită free', 'Atmosferă relaxată', 'Echipă prietenoasă', 'Sigilare preventivă'], 'Gratuit prima vizită', '15-30 min', 5, true),
  ('Urgențe Stomatologice', 'Disponibili pentru durere, fracturi, infecții', 'Oferim servicii de urgență pentru durere dentară acută, fracturi, infecții și alte situații critice.', 'AlertCircle', ARRAY['24/7 disponibil', 'Programare rapidă', 'Tratament durere', 'Extracție urgență'], 'de la 150 RON', 'evaluare', 6, true)
ON CONFLICT DO NOTHING;

-- DOCTORS
INSERT INTO doctors (name, role, description, image_url, specialties, education, order_index, is_active)
VALUES
  ('Dr. Suciu Sebastian', 'Medic Stomatolog', 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive. Cu o experiență solidă și formare continuă, Dr. Suciu oferă pacienților planuri de tratament personalizate.', '/team_portrait.jpg', ARRAY['Ortodonție', 'Implantologie', 'Tratamente minim invazive'], ARRAY['UMF Carol Davila București'], 1, true)
ON CONFLICT DO NOTHING;

-- REVIEWS
INSERT INTO reviews (author_name, rating, content, date_text, is_featured, is_published, order_index)
VALUES
  ('Andreea M.', 5, 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă și drăguță. Recomand cu încredere!', 'acum 2 săptămâni', false, true, 0),
  ('Mihai D.', 5, 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas. Acum pot zâmbi fără griji. Mulțumesc Dr. Suciu!', 'acum o lună', false, true, 1),
  ('Elena P.', 5, 'Am ales Invisalign și nu regret. Alignerele sunt atât de discrete că prietenii nici nu au observat. Rezultate excelente într-un timp record!', 'acum 3 săptămâni', false, true, 2),
  ('Cristian S.', 5, 'Merită deplasarea de la Ploiești! Am făcut albire și rezultatul a fost imediat vizibil. Prețuri corecte și personal amabil.', 'acum 2 luni', false, true, 3),
  ('Maria L.', 5, 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă. Locul perfect pentru familii!', 'acum o săptămână', false, true, 4),
  ('Adrian K.', 5, 'Deși locuiesc în București, vin aici pentru tratamente complexe. Atmosfera calmă și profesionalismul fac diferența. Cel mai bun dentist din zonă!', 'acum 3 luni', false, true, 5)
ON CONFLICT DO NOTHING;

-- FAQ
INSERT INTO faq (question, answer, category, order_index, is_active)
VALUES
  ('Ce avantaje oferă clinica?', 'Oferim tratamente complete cu tehnologie modernă, medici experimentați și abordare personalizată. Clinica este echipată cu aparatură de ultimă generație și respectăm cele mai stricte standarde de igienă.', 'general', 1, true),
  ('Serviciile sunt garantate?', 'Da, oferim garanție scrisă pentru toate tratamentele. Implanturile dentare au garanție de 10 ani, iar coroanele și fațetele au garanție de 5 ani.', 'general', 2, true),
  ('Cum știu ce tratament mi se potrivește?', 'În cadrul consultației gratuite, medicul nostru va evalua situația dentară și îți va recomanda cel mai potrivit plan de tratament, explicând toate opțiunile disponibile.', 'tratamente', 3, true),
  ('Este dureroasă procedura?', 'Folosim tehnici moderne de anestezie și echipamente de ultimă generație pentru a minimiza disconfortul. Majoritatea pacienților ne spun că au simțit foarte puțin sau deloc durere.', 'tratamente', 4, true),
  ('Cât durează un tratament?', 'Durata tratamentului variază în funcție de complexitatea cazului. O consultație durează 30-45 minute, o albire 60-90 minute, iar tratamentele complexe precum implanturile pot dura 3-6 luni.', 'programare', 5, true),
  ('Cum mă pot programa?', 'Te poți programa online prin formularul de contact, telefonic la 0770 220 110, sau direct pe WhatsApp. Programările online sunt confirmate în maximum 30 de minute.', 'programare', 6, true)
ON CONFLICT DO NOTHING;

-- GALLERY
INSERT INTO gallery (title, image_url, category, order_index, is_active)
VALUES
  ('Cabinet modern', '/hero_dental_chair.jpg', 'clinică', 1, true),
  ('Dr. Suciu Sebastian', '/team_portrait.jpg', 'echipă', 2, true),
  ('Tehnologie avansată', '/technology_equipment.jpg', 'tehnologie', 3, true),
  ('Rezultate implante', '/implant_detail_work.jpg', 'lucrări', 4, true),
  ('Ortodonție', '/orthodontic_aligners.jpg', 'lucrări', 5, true),
  ('Estetică dentară', '/cosmetic_smile_lifestyle.jpg', 'lucrări', 6, true)
ON CONFLICT DO NOTHING;

-- BLOG POSTS
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author, tags, is_published, published_at)
VALUES
  ('Cum să îți îngrijești dinții corect acasă', 'ingrijire-dinti-acasa', 'Descoperă tehnici simple de periaj și folosirea aței dentare pentru o igienă orală perfectă.', 'Conținut complet aici...', '/hero_dental_chair.jpg', 'Dr. Suciu Sebastian', ARRAY['igienă', 'periaj', 'sfaturi'], true, NOW()),
  ('Totul despre Invisalign: Ghid complet', 'ghid-invisalign', 'Cum funcționează alinierele transparente și ce rezultate poți aștepta.', 'Conținut complet aici...', '/orthodontic_aligners.jpg', 'Dr. Suciu Sebastian', ARRAY['invisalign', 'ortodonție', 'aliniere'], true, NOW()),
  ('Implanturi dentare: Mituri și adevăruri', 'implanturi-mituri', 'Demistificăm cele mai comune concepții greșite despre implanturile dentare.', 'Conținut complet aici...', '/implant_detail_work.jpg', 'Dr. Suciu Sebastian', ARRAY['implanturi', 'mituri', 'educație'], true, NOW())
ON CONFLICT DO NOTHING;

-- SITE SETTINGS
INSERT INTO site_settings (key, value)
VALUES
  ('general', '{"siteName": "Doctor Suciu Dental Clinic", "siteDescription": "Clinică stomatologică modernă în Târgoviște", "contactEmail": "contact@doctorsuciu.ro", "contactPhone": "0770 220 110", "address": "Calea Domnească 234, Târgoviște"}'::jsonb),
  ('working_hours', '{"monday": "09:00 - 18:00", "tuesday": "09:00 - 18:00", "wednesday": "09:00 - 18:00", "thursday": "09:00 - 18:00", "friday": "09:00 - 15:00", "saturday": "Închis", "sunday": "Închis"}'::jsonb),
  ('social', '{"facebook": "", "instagram": "", "whatsapp": "40770220110"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
