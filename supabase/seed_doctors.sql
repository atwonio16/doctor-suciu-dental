-- Seed doctors data for Doctor Suciu Dental Clinic
-- Run this in Supabase SQL Editor

INSERT INTO doctors (id, name, role, description, image_url, image_crop, specialties, order_index, is_active)
VALUES 
(
  'dr-suciu',
  'Dr. Sebastian Iacob Suciu',
  'Fondator & Medic Stomatolog',
  'A pus bazele Doctor Suciu Dental Clinic, un loc unde standardele medicale ridicate și respectul pentru pacient definesc fiecare tratament. "Am vrut să pot deține clinica mea, să funcționeze după viziunea mea, după standardele mele de calitate."',
  '/team/dr-suciu.jpg',
  'center 25%',
  ARRAY['Fondator', 'Implantologie', 'Ortodonție', 'Estetică'],
  0,
  true
),
(
  'dr-mitache',
  'Dr. Vlad Mitache',
  'Medic Specialist Protetică',
  'Medic specialist în protetică dentară, dedicat fiecărui zâmbet și fiecărui pacient. "În viață nu ai nevoie de multe, dar sigur ai nevoie de un medic bun."',
  '/team/dr-mitache.jpg',
  'center 25%',
  ARRAY['Protetică', 'Coroane', 'Fațete', 'Estetică'],
  1,
  true
),
(
  'dr-paduraru',
  'Dr. Cosmin Păduraru',
  'Medic Specialist Chirurgie',
  'Medic specialist în chirurgie dento-alveolară, cu pregătire internațională în New York, Bologna, Barcelona, Budapesta și București. "În chirurgie, detaliile fac diferența."',
  '/team/dr-paduraru.jpg',
  'center 25%',
  ARRAY['Chirurgie', 'Implanturi', 'Formare Internațională', 'Precizie'],
  2,
  true
),
(
  'dr-ungureanu',
  'Dr. Ungureanu Bogdan',
  'Medic Stomatolog Generalist',
  'Medic stomatolog generalist, tânăr, atent și răbdător. "Precizia cere timp. Și eu îl dau. Lucrul bine făcut nu se negociază cu viteză."',
  '/team/dr-ungureanu.jpg',
  'center 25%',
  ARRAY['Stomatologie Generală', 'Răbdare', 'Precizie', 'Grijă'],
  3,
  true
),
(
  'dr-tiganus',
  'Dr. Emilia Țigănuș',
  'Medic Specialist Ortodont',
  'Medic specialist ortodont, cu experiență în tratamente pentru copii și adulți. "Ortodonția înseamnă sănătate, echilibru și încrederea de a zâmbi cu adevărat."',
  '/team/dr-tiganus.jpg',
  'center 25%',
  ARRAY['Ortodonție', 'Invisalign', 'Aparat Dentar', 'Copii & Adulți'],
  4,
  true
),
(
  'alexandra-soare',
  'Alexandra Soare',
  'Asistentă ATI',
  'Asistentă ATI în spital, prezentă în cadrul intervențiilor chirurgicale complexe. Experiența sa în terapia intensivă aduce un nivel suplimentar de siguranță pacienților noștri.',
  '/team/alexandra-soare.jpg',
  'center 25%',
  ARRAY['ATI', 'Siguranță', 'Chirurgie', 'Monitorizare'],
  5,
  true
),
(
  'sara-suciu',
  'Sara Suciu',
  'Organizare & Marketing',
  'Se ocupă de organizare și marketing, iar în paralel se specializează în asistență medicală. Succesul unei clinici începe cu oameni calzi, organizați și dedicați.',
  '/team/sara-suciu.jpg',
  'center 25%',
  ARRAY['Organizare', 'Marketing', 'Asistență', 'Dedicare'],
  6,
  true
),
(
  'andreea-vasile',
  'Andreea Vasile',
  'Asistentă Medicală',
  'Asistentă dedicată care ne arată zi de zi ce înseamnă grijă, empatie și profesionalism. Fără ea, echipa nu ar fi completă!',
  '/team/andreea-vasile.jpg',
  'center 25%',
  ARRAY['Asistență', 'Empatie', 'Profesionalism', 'Grijă'],
  7,
  true
),
(
  'andra-radu',
  'Andra Radu',
  'Asistentă Medicală',
  'Dincolo de aparate și tratamente, contează oamenii. Andra este dovada că profesionalismul și empatia merg mână în mână, oferind pacienților siguranță și încredere la fiecare vizită.',
  '/team/andra-radu.jpg',
  'center 25%',
  ARRAY['Profesionalism', 'Empatie', 'Siguranță', 'Încredere'],
  8,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  image_crop = EXCLUDED.image_crop,
  specialties = EXCLUDED.specialties,
  order_index = EXCLUDED.order_index,
  is_active = EXCLUDED.is_active;
