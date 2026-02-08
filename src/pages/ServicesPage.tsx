import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Sparkles, Smile, CheckCircle2, ArrowRight } from 'lucide-react';

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

const ServicesPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>('implanturi');

  // Scroll to category if hash is present
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

  const currentCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* Hero Header */}
      <section className="relative w-full py-16 lg:py-20 bg-[#f8fafc] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-40" />
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Back Link */}
            <Link to="/" className="inline-flex items-center gap-2 text-[#64748b] hover:text-medical-navy transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Înapoi
            </Link>
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#94a3b8]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                  Serviciile Noastre
                </span>
                <span className="w-8 h-[2px] bg-[#94a3b8]" />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
                Soluții complete pentru zâmbetul tău
              </h1>

              <p className="text-lg text-[#222222]">
                Prețuri transparente, fără costuri ascunse. 
                <span className="text-medical-navy font-medium">Toate serviciile cu garanție.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-8 sticky top-16 lg:top-20 bg-white border-b border-[#e2e8f0] z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    isActive 
                      ? 'bg-medical-navy text-white shadow-lg shadow-medical-navy/25' 
                      : 'bg-[#f8fafc] text-[#64748b] hover:bg-[#e2e8f0] border border-[#e2e8f0]'
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

      {/* Services Content */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Active Category Header */}
          {currentCategory && (
            <div id={currentCategory.id} className="mb-8 scroll-mt-40">
              <div className={`${currentCategory.color} rounded-2xl p-6 lg:p-8 border ${currentCategory.borderColor}`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${currentCategory.iconColor}`}>
                    <currentCategory.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-semibold text-[#0f172a]">{currentCategory.title}</h2>
                    <p className="text-[#64748b] text-sm">{currentCategory.desc}</p>
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div className="mt-4 space-y-3">
                {currentCategory.services.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-4 lg:p-5 bg-white rounded-xl border border-[#e2e8f0] hover:border-medical-navy/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${currentCategory.color} flex items-center justify-center flex-shrink-0`}>
                        <CheckCircle2 className={`w-5 h-5 ${currentCategory.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#0f172a]">{service.name}</h3>
                        {service.duration && (
                          <span className="text-xs text-[#94a3b8]">{service.duration}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold text-medical-navy text-lg">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Categories */}
          {categories.filter(c => c.id !== activeCategory).map((category) => (
            <div key={category.id} id={category.id} className="mb-8 scroll-mt-40">
              <div className={`${category.color} rounded-2xl p-6 lg:p-8 border ${category.borderColor}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${category.iconColor}`}>
                      <category.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-[#0f172a]">{category.title}</h2>
                      <p className="text-[#64748b] text-sm">{category.desc}</p>
                    </div>
                  </div>
                  <a 
                    href={`#${category.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(category.id);
                    }}
                    className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-[#64748b] hover:text-medical-navy transition-colors"
                  >
                    Vezi prețuri
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Quick Preview (first 2 services) */}
              <div className="mt-4 space-y-3">
                {category.services.slice(0, 2).map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#e2e8f0]"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}>
                        <CheckCircle2 className={`w-4 h-4 ${category.iconColor}`} />
                      </div>
                      <span className="text-[#0f172a] text-sm">{service.name}</span>
                    </div>
                    <span className="font-semibold text-medical-navy">{service.price}</span>
                  </div>
                ))}
                {category.services.length > 2 && (
                  <button
                    onClick={() => {
                      setActiveCategory(category.id);
                      const element = document.getElementById(category.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="w-full py-3 text-sm font-medium text-[#64748b] hover:text-medical-navy transition-colors"
                  >
                    + {category.services.length - 2} servicii mai multe
                  </button>
                )}
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
        <div className="max-w-4xl mx-auto bg-medical-navy rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Gata să începi transformarea?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Programează o consultație gratuită și împreună vom găsi soluția ideală pentru zâmbetul tău.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-white text-medical-navy border-2 border-white hover:bg-transparent hover:text-white"
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
