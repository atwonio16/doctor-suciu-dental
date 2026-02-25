import { useState, useEffect } from 'react';

// Hook pentru partea PUBLICĂ a site-ului - citește datele din CMS
export function usePublicCMSData<T>(key: string): T[] {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`cms_${key}`);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData([]);
      }
    }
  }, [key]);

  // Listen for changes from admin or other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `cms_${key}`) {
        if (e.newValue) {
          setData(JSON.parse(e.newValue));
        } else {
          setData([]);
        }
      }
    };

    const handleCMSUpdate = (e: CustomEvent<{ key: string }>) => {
      if (e.detail.key === `cms_${key}`) {
        const stored = localStorage.getItem(`cms_${key}`);
        if (stored) {
          setData(JSON.parse(stored));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cms-update' as any, handleCMSUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cms-update' as any, handleCMSUpdate);
    };
  }, [key]);

  return data;
}

// Hook pentru setări CMS
export function usePublicCMSSettings() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cms_settings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {
        setSettings(null);
      }
    }
  }, []);

  return settings;
}

// Funcție pentru a popula datele inițiale (se apelează o singură dată)
export function initializeCMSData() {
  const initialized = localStorage.getItem('cms_initialized_v2');
  if (initialized) return;

  // Verificăm dacă există deja date pentru fiecare cheie
  // Dacă există, NU le suprascriem - doar le lăsăm așa cum sunt
  const existingServices = localStorage.getItem('cms_services');
  const existingDoctors = localStorage.getItem('cms_doctors');
  const existingBeforeAfter = localStorage.getItem('cms_beforeafter');
  const existingFAQ = localStorage.getItem('cms_faq');
  const existingGallery = localStorage.getItem('cms_gallery');
  const existingArticles = localStorage.getItem('cms_articles');
  const existingSettings = localStorage.getItem('cms_settings');

  // Servicii default
  const defaultServices = [
    {
      id: '1',
      title: 'Implant Dentar',
      slug: 'implant-dentar',
      shortDescription: 'Soluții permanente pentru dinți lipsă cu garanție 10 ani',
      description: 'Implanturile dentare sunt cea mai modernă soluție pentru înlocuirea dinților lipsă. Folosim implanturi premium cu garanție 10 ani.',
      price: 'de la 2.800 RON',
      duration: '3-6 luni',
      features: ['Garanție 10 ani', 'Materiale premium', 'Durată minimă', 'Rezultate naturale'],
      icon: 'CirclePlus',
      color: 'from-indigo-500 to-indigo-600',
      lightColor: 'bg-indigo-50',
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Ortodonție',
      slug: 'ortodontie',
      shortDescription: 'Îndreptarea dinților cu aparate fixe sau Invisalign',
      description: 'Oferim soluții complete de ortodonție, de la aparate fixe tradiționale până la aliniere invizibilă Invisalign.',
      price: 'de la 8.000 RON',
      duration: '12-18 luni',
      features: ['Aparat fix', 'Invisalign', 'Aparat ceramic', 'Gutiere retenție'],
      icon: 'AlignCenter',
      color: 'from-cyan-500 to-cyan-600',
      lightColor: 'bg-cyan-50',
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Albire Dentară',
      slug: 'albire-dentara',
      shortDescription: 'Zâmbet mai alb cu până la 8 nuanțe în 90 minute',
      description: 'Albire profesională în cabinet cu tehnologia Zoom Philips pentru rezultate imediate și de lungă durată.',
      price: 'de la 350 RON',
      duration: '90 min',
      features: ['Rezultate imediate', 'Fără durere', 'Până la 8 nuanțe', 'Sigur pentru smalț'],
      icon: 'Sparkles',
      color: 'from-sky-500 to-sky-600',
      lightColor: 'bg-sky-50',
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Estetică Dentară',
      slug: 'estetica-dentara',
      shortDescription: 'Fațete ceramică E-max și coroane zirconiu',
      description: 'Transformă-ți zâmbetul cu fațete din ceramică E-max sau coroane din zirconiu pentru un look natural.',
      price: 'de la 1.200 RON',
      duration: '1-2 săptămâni',
      features: ['Fațete E-max', 'Coroane zirconiu', 'Redesign zâmbet', 'Rezultate naturale'],
      icon: 'Smile',
      color: 'from-rose-500 to-rose-600',
      lightColor: 'bg-rose-50',
      order: 4,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Stomatologie Copii',
      slug: 'stomatologie-copii',
      shortDescription: 'Atmosferă prietenoasă și tratament fără frică',
      description: 'Clinica noastră este prietenoasă cu copiii. Prima vizită este gratuită pentru copiii 0-3 ani.',
      price: 'Gratuit prima vizită',
      duration: '15-30 min',
      features: ['Primă vizită free', 'Atmosferă relaxată', 'Echipă prietenoasă', 'Sigilare preventivă'],
      icon: 'Baby',
      color: 'from-amber-500 to-amber-600',
      lightColor: 'bg-amber-50',
      order: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Urgențe Stomatologice',
      slug: 'urgente',
      shortDescription: 'Disponibili pentru durere, fracturi, infecții',
      description: 'Oferim servicii de urgență pentru durere dentară acută, fracturi, infecții și alte situații critice.',
      price: 'de la 150 RON',
      duration: 'evaluare',
      features: ['24/7 disponibil', 'Programare rapidă', 'Tratament durere', 'Extracție urgență'],
      icon: 'AlertCircle',
      color: 'from-red-500 to-red-600',
      lightColor: 'bg-red-50',
      order: 6,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Doctori default - Dr. Suciu Sebastian
  const defaultDoctors = [
    {
      id: '1',
      name: 'Dr. Suciu Sebastian',
      role: 'Medic Stomatolog',
      image: '/team_portrait.jpg',
      specialties: ['Ortodonție', 'Implantologie', 'Tratamente minim invazive'],
      experience: '15+ ani',
      education: 'UMF Carol Davila București',
      description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive. Cu o experiență solidă și formare continuă, Dr. Suciu oferă pacienților planuri de tratament personalizate.',
      email: 'dr.suciu@doctorsuciu.ro',
      phone: '0770220110',
      tags: ['Expertiză', 'Experiență', 'Calitate', 'Tehnologie modernă'],
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Before/After cases
  const defaultBeforeAfter = [
    {
      id: '1',
      title: 'Albire Profesională',
      description: '8 nuanțe mai deschis în 60 minute',
      beforeImage: '/before-after/albire-before.jpg',
      afterImage: '/before-after/albire-after.jpg',
      duration: '60 minute',
      testimonial: 'Rezultatul a depășit așteptările! Zâmbetul meu este acum mult mai alb și natural.',
      patientName: 'Maria P.',
      serviceType: 'Albire',
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Fațete Ceramice',
      description: 'Zâmbet perfect și natural',
      beforeImage: '/before-after/fatete-before.jpg',
      afterImage: '/before-after/fatete-after.jpg',
      duration: '2 săptămâni',
      testimonial: 'Am primit complimente de la toți prietenii! Fațetele arată complet natural.',
      patientName: 'Andrei M.',
      serviceType: 'Estetică',
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Ortodonție',
      description: 'Dinți aliniați în 6 luni',
      beforeImage: '/before-after/orto-before.jpg',
      afterImage: '/before-after/orto-after.jpg',
      duration: '6 luni',
      testimonial: 'Nu credeam că pot avea un zâmbet atât de frumos într-un timp atât de scurt!',
      patientName: 'Elena D.',
      serviceType: 'Ortodonție',
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // FAQ items
  const defaultFAQ = [
    {
      id: '1',
      question: 'Ce avantaje oferă clinica?',
      answer: 'Oferim tratamente complete cu tehnologie modernă, medici experimentați și abordare personalizată. Clinica este echipată cu aparatură de ultimă generație și respectăm cele mai stricte standarde de igienă.',
      category: 'general',
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      question: 'Serviciile sunt garantate?',
      answer: 'Da, oferim garanție scrisă pentru toate tratamentele. Implanturile dentare au garanție de 10 ani, iar coroanele și fațetele au garanție de 5 ani.',
      category: 'general',
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      question: 'Cum știu ce tratament mi se potrivește?',
      answer: 'În cadrul consultației gratuite, medicul nostru va evalua situația dentară și îți va recomanda cel mai potrivit plan de tratament, explicând toate opțiunile disponibile.',
      category: 'tratamente',
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      question: 'Este dureroasă procedura?',
      answer: 'Folosim tehnici moderne de anestezie și echipamente de ultimă generație pentru a minimiza disconfortul. Majoritatea pacienților ne spun că au simțit foarte puțin sau deloc durere.',
      category: 'tratamente',
      order: 4,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      question: 'Cât durează un tratament?',
      answer: 'Durata tratamentului variază în funcție de complexitatea cazului. O consultație durează 30-45 minute, o albire 60-90 minute, iar tratamentele complexe precum implanturile pot dura 3-6 luni.',
      category: 'programare',
      order: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      question: 'Cum mă pot programa?',
      answer: 'Te poți programa online prin formularul de contact, telefonic la 0770 220 110, sau direct pe WhatsApp. Programările online sunt confirmate în maximum 30 de minute.',
      category: 'programare',
      order: 6,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Galerie default
  const defaultGallery = [
    {
      id: '1',
      title: 'Cabinet modern',
      description: 'Echipament de ultimă generație',
      url: '/hero_dental_chair.jpg',
      thumbnail: '/hero_dental_chair.jpg',
      category: 'clinică',
      order: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Dr. Suciu Sebastian',
      description: 'Medic stomatolog principal',
      url: '/team_portrait.jpg',
      thumbnail: '/team_portrait.jpg',
      category: 'echipă',
      order: 2,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Tehnologie avansată',
      description: 'Echipamente moderne',
      url: '/technology_equipment.jpg',
      thumbnail: '/technology_equipment.jpg',
      category: 'tehnologie',
      order: 3,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Rezultate implante',
      description: 'Zâmbete transformate',
      url: '/implant_detail_work.jpg',
      thumbnail: '/implant_detail_work.jpg',
      category: 'lucrări',
      order: 4,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Ortodonție',
      description: 'Aligneri și aparate',
      url: '/orthodontic_aligners.jpg',
      thumbnail: '/orthodontic_aligners.jpg',
      category: 'lucrări',
      order: 5,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Estetică dentară',
      description: 'Fațete și coroane',
      url: '/cosmetic_smile_lifestyle.jpg',
      thumbnail: '/cosmetic_smile_lifestyle.jpg',
      category: 'lucrări',
      order: 6,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Articole blog default
  const defaultArticles = [
    {
      id: '1',
      title: 'Cum să îți îngrijești dinții corect acasă',
      slug: 'ingrijire-dinti-acasa',
      excerpt: 'Descoperă tehnici simple de periaj și folosirea aței dentare pentru o igienă orală perfectă.',
      content: 'Conținut complet aici...',
      featuredImage: '/hero_dental_chair.jpg',
      category: 'Igienă',
      tags: ['igienă', 'periaj', 'sfaturi'],
      author: 'Dr. Suciu Sebastian',
      readTime: '5 min',
      isPublished: true,
      isFeatured: true,
      viewCount: 0,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Totul despre Invisalign: Ghid complet',
      slug: 'ghid-invisalign',
      excerpt: 'Cum funcționează alinierele transparente și ce rezultate poți aștepta.',
      content: 'Conținut complet aici...',
      featuredImage: '/orthodontic_aligners.jpg',
      category: 'Ortodonție',
      tags: ['invisalign', 'ortodonție', 'aliniere'],
      author: 'Dr. Suciu Sebastian',
      readTime: '7 min',
      isPublished: true,
      isFeatured: false,
      viewCount: 0,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Implanturi dentare: Mituri și adevăruri',
      slug: 'implanturi-mituri',
      excerpt: 'Demistificăm cele mai comune concepții greșite despre implanturile dentare.',
      content: 'Conținut complet aici...',
      featuredImage: '/implant_detail_work.jpg',
      category: 'Implantologie',
      tags: ['implanturi', 'mituri', 'educație'],
      author: 'Dr. Suciu Sebastian',
      readTime: '6 min',
      isPublished: true,
      isFeatured: false,
      viewCount: 0,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Setări default
  const defaultSettings = {
    siteName: 'Doctor Suciu Dental Clinic',
    siteDescription: 'Clinică stomatologică modernă în Târgoviște',
    contactEmail: 'contact@doctorsuciu.ro',
    contactPhone: '0770 220 110',
    address: 'Calea Domnească 234, Târgoviște',
    workingHours: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 15:00',
      saturday: 'Închis',
      sunday: 'Închis',
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      whatsapp: '40770220110',
    },
    seo: {
      title: 'Doctor Suciu Dental Clinic - Stomatologie Târgoviște',
      description: 'Clinică stomatologică modernă în Târgoviște. Implant dentar, ortodonție, estetică dentară.',
      keywords: 'stomatolog târgoviște, implant dentar, dentist, clinică dentară',
    },
  };

  // Setăm doar datele care nu există deja (pentru a nu suprascrie datele utilizatorului)
  if (!existingServices) localStorage.setItem('cms_services', JSON.stringify(defaultServices));
  if (!existingDoctors) localStorage.setItem('cms_doctors', JSON.stringify(defaultDoctors));
  if (!existingBeforeAfter) localStorage.setItem('cms_beforeafter', JSON.stringify(defaultBeforeAfter));
  if (!existingFAQ) localStorage.setItem('cms_faq', JSON.stringify(defaultFAQ));
  if (!existingGallery) localStorage.setItem('cms_gallery', JSON.stringify(defaultGallery));
  if (!existingArticles) localStorage.setItem('cms_articles', JSON.stringify(defaultArticles));
  if (!existingSettings) localStorage.setItem('cms_settings', JSON.stringify(defaultSettings));
  
  // Marcăm că initializarea s-a făcut
  localStorage.setItem('cms_initialized_v2', 'true');

  // Dispatch event to notify all components
  window.dispatchEvent(new CustomEvent('cms-data-initialized'));
}

export default usePublicCMSData;
