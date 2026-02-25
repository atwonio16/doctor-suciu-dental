-- ============================================
-- MIGRARE SIMPLĂ - Adaugă doar coloanele necesare
-- ============================================

-- Adaugă coloana 'category' dacă nu există
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'services' AND column_name = 'category') THEN
        ALTER TABLE services ADD COLUMN category TEXT DEFAULT 'Servicii Generale';
    END IF;
END $$;

-- Adaugă coloana 'category_slug' dacă nu există
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'services' AND column_name = 'category_slug') THEN
        ALTER TABLE services ADD COLUMN category_slug TEXT DEFAULT 'general';
    END IF;
END $$;

-- Verificare
SELECT 'Coloanele au fost adăugate cu succes!' as status;
SELECT column_name FROM information_schema.columns WHERE table_name = 'services' ORDER BY ordinal_position;
