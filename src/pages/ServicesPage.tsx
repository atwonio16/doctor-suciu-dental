import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Sparkles, Smile, CheckCircle2, Info, ArrowLeft } from 'lucide-react';

const categories = [
  {
    id: 'consultatii',
    title: 'CONSULTAȚII ȘI DIAGNOSTIC',
    icon: Heart,
    color: 'bg-rose-50 text-rose-600',
    desc: 'Evaluare completă și plan de tratament personalizat',
    services: [
      { name: 'Consultație de bun venit', price: 'Gratuit', duration: '30 min' },
      { name: 'Consultație completă', price: '150 RON', duration: '45 min' },
      { name: 'Control periodic', price: '100 RON', duration: '20 min' },
      { name: 'Radiografie panoramică', price: '120 RON', duration: '5 min' },
      { name: 'CT 3D (Cone Beam)', price: '450 RON', duration: '15 min' },
    ]
  },
  {
    id: 'preventie',
    title: 'PREVENIRE ȘI IGIENĂ',
    icon: Shield,
    color: 'bg-emerald-50 text-emerald-600',
    desc: 'Îngrijire profesională pentru sănătatea dinților',
    services: [
      { name: 'Igienizare profesională', price: '350 RON', duration: '45 min' },
      { name: 'Air Flow periaj', price: '200 RON', duration: '30 min' },
      { name: 'Fluorizare preventivă', price: '80 RON', duration: '15 min' },
      { name: 'Sigilare dinți', price: '100 RON/dinte', duration: '20 min' },
    ]
  },
  {
    id: 'estetica',
    title: 'ESTETICĂ DENTARĂ',
    icon: Sparkles,
    color: 'bg-amber-50 text-amber-600',
    desc: 'Zâmbet frumos, rezultate naturale',
    services: [
      { name: 'Albire Zoom în cabinet', price: '1.200 RON', duration: '90 min' },
      { name: 'Albire acasă - kit', price: '600 RON', duration: '7-14 zile' },
      { name: 'Fațete ceramică', price: '1.800 RON/dinte', duration: '2 ședințe' },
      { name: 'Fațete compozit', price: '600 RON/dinte', duration: '1 ședință' },
    ]
  },
  {
    id: 'ortodontie',
    title: 'ORTODONȚIE',
    icon: Smile,
    color: 'bg-sky-50 text-sky-600',
    desc: 'Îndreptare discretă a dinților',
    services: [
      { name: 'Invisalign Lite', price: '8.000 RON', duration: '3-6 luni' },
      { name: 'Invisalign Full', price: '15.000 RON', duration: '12-18 luni' },
      { name: 'Aparat ceramic', price: '5.500 RON', duration: '12-24 luni' },
      { name: 'Gutieră retenție', price: '400 RON', duration: 'pe viață' },
    ]
  },
  {
    id: 'implanturi',
    title: 'IMPLANTURI ȘI CHIRURGIE',
    icon: Heart,
    color: 'bg-violet-50 text-violet-600',
    desc: 'Soluții permanente pentru dinți lipsă',
    services: [
      { name: 'Implant dentar premium', price: '2.800 RON', duration: '3-6 luni' },
      { name: 'Coroană pe implant', price: '2.000 RON', duration: '2 săptămâni' },
      { name: 'Reconstrucție osoasă', price: '800-1.500 RON', duration: '4-6 luni' },
      { name: 'Proteză pe implante', price: 'de la 12.000 RON', duration: '3-6 luni' },
    ]
  },
  {
    id: 'copii',
    title: 'COPII ȘI FAMILIE',
    icon: Smile,
    color: 'bg-pink-50 text-pink-600',
    desc: 'Experiență plăcută pentru cei mici',
    services: [
      { name: 'Prima vizită (0-3 ani)', price: 'Gratuit', duration: '15 min' },
      { name: 'Control copii', price: '100 RON', duration: '20 min' },
      { name: 'Tratament carie', price: '200-400 RON', duration: '30 min' },
      { name: 'Extracție dinți lapte', price: '150 RON', duration: '10 min' },
    ]
  },
];

const ServicesPage = () => {
  const [active, setActive] = useState('consultatii');
  const current = categories.find(c => c.id === active);

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </Link>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="category-pill mb-4">SERVICIILE NOASTRE</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Tratamente <span className="gradient-text">complete</span>
            </h1>
            <p className="text-slate-600">Prețuri transparente, fără costuri ascunse</p>
          </div>

          {/* Category buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{cat.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active category content */}
          {current && (
            <div className="max-w-4xl mx-auto">
              <div className={`${current.color.split(' ')[0]} rounded-2xl p-6 mb-8`}>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{current.title}</h2>
                <p className="text-slate-600">{current.desc}</p>
              </div>

              <div className="space-y-3 mb-8">
                {current.services.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${current.color.split(' ')[1]}`} />
                      <div>
                        <h3 className="font-medium text-slate-900">{service.name}</h3>
                        {service.duration && (
                          <span className="text-xs text-slate-500">{service.duration}</span>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-sky-500">{service.price}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3 mb-8">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">
                  Prețurile sunt orientative. Consultația inițială este necesară pentru o estimare exactă.
                </p>
              </div>

              <div className="text-center">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  PROGRAMEAZĂ O CONSULTAȚIE
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
