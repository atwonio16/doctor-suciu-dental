import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Smile,
  CheckCircle2, 
  ArrowRight, 
  CirclePlus,
  AlignCenter,
  Baby,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const categories = [
  {
    id: 'implanturi',
    title: 'Implant dentar',
    icon: CirclePlus,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
    desc: 'Soluții permanente pentru dinți lipsă',
    services: [
      { name: 'Consultație implant', price: 'Gratuit' },
      { name: 'Implant dentar premium', price: '2.800 RON' },
      { name: 'Coroană pe implant', price: '2.000 RON' },
    ]
  },
  {
    id: 'ortodontie',
    title: 'Ortodonție',
    icon: AlignCenter,
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
    desc: 'Aparate fixe și Invisalign',
    services: [
      { name: 'Consultație ortodontică', price: 'Gratuit' },
      { name: 'Invisalign Full', price: '15.000 RON' },
      { name: 'Aparat ceramic', price: '5.500 RON' },
    ]
  },
  {
    id: 'albire',
    title: 'Albire dentară',
    icon: Sparkles,
    color: 'bg-sky-500',
    lightColor: 'bg-sky-50',
    desc: 'Zâmbet mai alb cu 8 nuanțe',
    services: [
      { name: 'Albire Zoom cabinet', price: '1.200 RON' },
      { name: 'Kit albire acasă', price: '600 RON' },
    ]
  },
  {
    id: 'estetica',
    title: 'Estetică dentară',
    icon: Smile,
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
    desc: 'Fațete și redesign de zâmbet',
    services: [
      { name: 'Consultație estetică', price: 'Gratuit' },
      { name: 'Fațete ceramică E-max', price: '1.800 RON/dinte' },
    ]
  },
  {
    id: 'copii',
    title: 'Stomatologie copii',
    icon: Baby,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    desc: 'Atmosferă prietenoasă pentru cei mici',
    services: [
      { name: 'Prima vizită (0-3 ani)', price: 'Gratuit' },
      { name: 'Control copii', price: '100 RON' },
    ]
  },
  {
    id: 'urgente',
    title: 'Urgențe',
    icon: AlertCircle,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    desc: 'Programare rapidă 24/7',
    services: [
      { name: 'Consultație urgență', price: '150 RON' },
      { name: 'Tratament durere', price: 'de la 200 RON' },
    ]
  },
];

const ServicesPage = () => {
  useLocation();
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('implanturi');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookService = (categoryTitle: string, serviceName: string) => {
    navigate('/contact', {
      state: { service: `${categoryTitle} - ${serviceName}`, fromServices: true }
    });
  };

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* Header */}
      <div className="px-4 py-6 bg-gray-50">
        <h1 className="text-display text-gray-900 mb-2">
          Servicii și prețuri
        </h1>
        <p className="text-body-small text-gray-500">
          Prețuri transparente, fără costuri ascunse
        </p>
      </div>

      {/* Services Accordion */}
      <div className="px-4 py-6 space-y-3">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
              className="w-full flex items-center gap-3 p-4"
            >
              <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-[17px] text-gray-900">{category.title}</h3>
                <p className="text-[13px] text-gray-500">{category.desc}</p>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Services List */}
            {expandedCategory === category.id && (
              <div className="px-4 pb-4">
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  {category.services.map((service, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleBookService(category.title, service.name)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl press-effect"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${category.lightColor} rounded-lg flex items-center justify-center`}>
                          <CheckCircle2 className={`w-4 h-4 ${category.color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className="font-medium text-[14px] text-gray-700">{service.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px] text-[#1e3a5f]">{service.price}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="px-4 mb-6">
        <div className="bg-amber-50 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-amber-600 text-[14px]">ℹ</span>
          </div>
          <p className="text-[13px] text-amber-800 leading-relaxed">
            Prețurile sunt orientative. Pentru o estimare exactă, programează o consultație gratuită.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-8">
        <div className="bg-[#1e3a5f] rounded-2xl p-6 text-center">
          <h3 className="text-white font-bold text-[20px] mb-2">
            Gata să începi?
          </h3>
          <p className="text-white/80 text-[14px] mb-5">
            Consultație gratuită cu evaluare completă
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center gap-2 w-full h-[52px] bg-white rounded-full text-[16px] font-semibold text-[#1e3a5f] press-effect"
          >
            Programează-te acum
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
