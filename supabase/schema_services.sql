-- ============================================
-- SCRIPT SQL PENTRU CREAREA TABELELOR DE SERVICII
-- Doctor Suciu Dental Clinic
-- ============================================

-- 1. Creare tabelă pentru CATEGORII DE SERVICII
-- Această tabelă stochează categoriile dinamice (Implanturi, Ortodonție, etc.)
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT DEFAULT 'Folder',
    color TEXT DEFAULT 'from-blue-500 to-blue-600',
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Creare tabelă pentru SERVICII
-- Această tabelă stochează serviciile individuale, fiecare legat de o categorie
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    price TEXT,
    duration TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Activare RLS (Row Level Security) - necesar pentru Supabase
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 4. Politici de acces pentru service_categories (citire publică, modificare doar admin)
CREATE POLICY "Allow public read access" ON service_categories
    FOR SELECT USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON service_categories
    FOR ALL USING (auth.role() = 'authenticated');

-- 5. Politici de acces pentru services (citire publică, modificare doar admin)
CREATE POLICY "Allow public read access" ON services
    FOR SELECT USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON services
    FOR ALL USING (auth.role() = 'authenticated');

-- 6. Trigger pentru actualizare automată a updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_service_categories_updated_at
    BEFORE UPDATE ON service_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATE DE TEST (OPȚIONAL)
-- Poți rula aceste INSERT-uri pentru a avea date inițiale
-- ============================================

-- Inserare categorii de bază
INSERT INTO service_categories (name, slug, description, order_index, is_active) VALUES
('Implanturi Dentare', 'implanturi', 'Soluții permanente pentru înlocuirea dinților lipsă', 1, true),
('Ortodonție', 'ortodontie', 'Corectarea poziției dinților și a ocluziei', 2, true),
('Albire Dentară', 'albire', 'Tratamente pentru un zâmbet mai alb și radiant', 3, true),
('Estetică Dentară', 'estetica', 'Fațete, coroane și alte tratamente estetice', 4, true),
('Protetică Dentară', 'protetica', 'Proteze și lucrări protetice', 5, true),
('Urgențe Stomatologice', 'urgente', 'Tratament de urgență pentru dureri și accidente', 6, true),
('Servicii Generale', 'general', 'Consultații, igienizare și tratamente generale', 7, true)
ON CONFLICT (slug) DO NOTHING;

-- Inserare servicii de test (doar dacă vrei date inițiale)
-- Notă: Acestea vor fi legate de categoriile de mai sus
INSERT INTO services (title, description, long_description, price, duration, category_id, order_index, is_active)
SELECT 
    'Implant Dentar Alpha Bio',
    'Implant israelian de înaltă calitate',
    'Implant dentar Alpha Bio cu coroană ceramică inclusă. Soluție permanentă pentru înlocuirea dinților lipsă.',
    'de la 2.800 lei',
    '3-6 luni',
    id,
    1,
    true
FROM service_categories WHERE slug = 'implanturi'
ON CONFLICT DO NOTHING;

INSERT INTO services (title, description, long_description, price, duration, category_id, order_index, is_active)
SELECT 
    'Invisalign',
    'Aparat dentar invizibil',
    'Tratament ortodontic cu aliniere transparentă. Gutiere invizibile și detașabile.',
    'de la 15.000 lei',
    '6-18 luni',
    id,
    1,
    true
FROM service_categories WHERE slug = 'ortodontie'
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICARE
-- ============================================
SELECT 'Tabele create cu succes!' as status;
SELECT * FROM service_categories;
SELECT * FROM services;
