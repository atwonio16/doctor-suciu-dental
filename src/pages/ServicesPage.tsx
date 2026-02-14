import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Shield, Sparkles, Smile, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';

const categories = [
  {
    id: 'implanturi',
    title: 'IMPLANT DENTAR',
    icon: CheckCircle2,
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-100',
    desc: 'Soluții permanente pentru dinți lipsă cu garanție 10 ani',
    services: [
      { name: 'Consultație implant', price: 'Gratuit', duration: '30 min' },
      { name: 'Implant dentar premium', price: '2.800 RON', duration: '3-6 luni' },
      { name: 'Coroană pe implant', price: '2.000 RON', duration: '2 săptămâni' },
      { name: 'Reconstrucție osoasă', price: '800-1.500 RON', duration: '4-6 luni' },
      { name: 'Proteză pe implante', price: 'de la 12.000 RON', duration: '3-6 luni' },
    ]
  },
  {
    id: 'ortodontie',
    title: 'ORTODONȚIE',
    icon: Sparkles,
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-100',
    desc: 'Îndreptarea dinților cu aparate fixe sau Invisalign',
    services: [
      { name: 'Consultație ortodontică', price: 'Gratuit', duration: '45 min' },
      { name: 'Invisalign Lite', price: '8.000 RON', duration: '3-6 luni' },
      { name: 'Invisalign Full', price: '15.000 RON', duration: '12-18 luni' },
      { name: 'Aparat ceramic', price: '5.500 RON', duration: '12-24 luni' },
      { name: 'Gutieră retenție', price: '400 RON', duration: 'pe viață' },
    ]
  },
  {
    id: 'albire',
    title: 'ALBIRE DENTARĂ',
    icon: Sparkles,
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderColor: 'border-sky-100',
    desc: 'Zâmbet mai alb cu până la 8 nuanțe',
    services: [
      { name: 'Albire Zoom în cabinet', price: '1.200 RON', duration: '90 min' },
      { name: 'Albire acasă - kit', price: '600 RON', duration: '7-14 zile' },
      { name: 'Combo albire cabinet + acasă', price: '1.500 RON', duration: 'variabil' },
    ]
  },
  {
    id: 'estetica',
    title: 'ESTETICĂ DENTARĂ',
    icon: Smile,
    color: 'bg-rose-50',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-100',
    desc: 'Fațete, coroane și redesign de zâmbet',
    services: [
      { name: 'Consultație estetică', price: 'Gratuit', duration: '30 min' },
      { name: 'Fațete ceramică E-max', price: '1.800 RON/dinte', duration: '2 ședințe' },
      { name: 'Fațete compozit', price: '600 RON/dinte', duration: '1 ședință' },
      { name: 'Coroană zirconiu/ceramică', price: '1.500 RON', duration: '1-2 săptămâni' },
    ]
  },
  {
    id: 'copii',
    title: 'STOMATOLOGIE COPII',
    icon: Heart,
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100',
    desc: 'Atmosferă prietenoasă pentru cei mici',
    services: [
      { name: 'Prima vizită (0-3 ani)', price: 'Gratuit', duration: '15 min' },
      { name: 'Control copii', price: '100 RON', duration: '20 min' },
      { name: 'Tratament carie copii', price: '200-400 RON', duration: '30 min' },
      { name: 'Extracție dinți lapte', price: '150 RON', duration: '10 min' },
      { name: 'Sigilare preventivă', price: 'Gratuit', duration: '15 min' },
    ]
  },
  {
    id: 'urgente',
    title: 'URGENȚE STOMATOLOGICE',
    icon: Shield,
    color: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-100',
    desc: 'Durere, fracturi, infecții - programare rapidă',
    services: [
      { name: 'Consultație urgență', price: '150 RON', duration: 'evaluare' },
      { name: 'Tratament durere acută', price: 'de la 200 RON', duration: '30 min' },
      { name: 'Extracție urgență', price: '300-500 RON', duration: '20 min' },
      { name: 'Medicamentație urgență', price: '100 RON', duration: '10 min' },
    ]
  },
];

const categoryMap: Record<string, string> = {
  'implanturi': 'Implant dentar',
  'ortodontie': 'Ortodonție / Invisalign',
  'albire': 'Albire dentară',
  'estetica': 'Estetică dentară',
  'copii': 'Stomatologie copii',
  'urgente': 'Urgențe stomatologice',
};

const ServicesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('implanturi');

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveCategory(hash);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    window.scrollTo(0, 0);
  }, [location.hash]);

  const handleServiceClick = (categoryId: string) => {
    const serviceName = categoryMap[categoryId] || 'Consultație gratuită';
    
    navigate('/contact', {
      state: {
        service: serviceName,
        fromServices: true
      }
    });
  };

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* Hero Header */}
      <section className="w-full py-16">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
                Servicii și prețuri
              </h1>

              <p className="text-lg text-[#64748b] max-w-2xl mx-auto whitespace-nowrap">
                Prețuri transparente, fără costuri ascunse. Garanție scrisă pentru toate tratamentele.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-4 sticky top-16 lg:top-20 bg-white/95 backdrop-blur-sm border-y border-[#e2e8f0] z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(cat.id);
                    const element = document.getElementById(cat.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-[#1e3a5f] text-white shadow-md'
                      : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#e2e8f0]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{cat.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-32">
              {/* Category Header */}
              <div className={`${category.color} rounded-2xl p-6 mb-6 border ${category.borderColor}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${category.iconColor}`}>
                    <category.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-semibold text-[#0f172a]">{category.title}</h2>
                    <p className="text-[#64748b] text-sm">{category.desc}</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-3">
                {category.services.map((service, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleServiceClick(category.id)}
                    className="w-full flex items-center justify-between p-4 lg:p-5 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#1e3a5f]/30 hover:shadow-md text-left group"
                    style={{ transition: 'all 0.2s ease' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center flex-shrink-0`}>
                        <Calendar className={`w-5 h-5 ${category.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0f172a] group-hover:text-[#1e3a5f]">{service.name}</h3>
                        {service.duration && (
                          <span className="text-xs text-[#94a3b8]">{service.duration}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 relative">
                      <span className="font-semibold text-[#1e3a5f] text-lg group-hover:opacity-0 transition-opacity duration-200">{service.price}</span>
                      <span className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 inline-flex items-center gap-1 text-sm font-semibold text-[#0891b2] whitespace-nowrap">
                        Programează-te
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3 border border-amber-100">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-600 text-sm">ℹ</span>
            </div>
            <p className="text-sm text-amber-700">
              Prețurile sunt orientative și pot varia în funcție de complexitatea cazului. 
              Pentru o estimare exactă, programează o consultație gratuită.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="max-w-4xl mx-auto bg-[#1e3a5f] rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Gata să începi transformarea?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Programează o consultație gratuită și împreună vom găsi soluția ideală pentru zâmbetul tău.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full bg-white text-[#1e3a5f] border-2 border-white hover:bg-transparent hover:text-white"
            style={{ transition: 'all 0.2s ease' }}
          >
            PROGRAMEAZĂ CONSULTAȚIE GRATUITĂ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
