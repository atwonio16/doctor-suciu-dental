import { 
  Stethoscope, 
  Sparkles, 
  AlignCenter, 
  Crown, 
  Smile, 
  ShieldCheck,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Stethoscope,
    title: 'Consultații',
    description: 'Evaluare completă a sănătății dentare cu diagnostic precis și plan de tratament personalizat.',
    price: 'de la 150 RON',
  },
  {
    icon: Crown,
    title: 'Implanturi Dentare',
    description: 'Soluții permanente pentru dinți lipsă cu implanturi de ultimă generație și garanție extinsă.',
    price: 'de la 2.800 RON',
  },
  {
    icon: Sparkles,
    title: 'Estetică Dentară',
    description: 'Albire profesională, fațete din ceramică și remodelare pentru un zâmbet perfect.',
    price: 'de la 350 RON',
  },
  {
    icon: AlignCenter,
    title: 'Ortodonție / Invisalign',
    description: 'Îndreptare discretă cu alignere transparente pentru adulți și adolescenți.',
    price: 'de la 8.000 RON',
  },
  {
    icon: Smile,
    title: 'Coroane Dentare',
    description: 'Restaurări estetice și funcționale cu coroane din ceramică sau zirconiu.',
    price: 'de la 1.200 RON',
  },
  {
    icon: ShieldCheck,
    title: 'Proteze Dentare',
    description: 'Proteze fixe și mobile personalizate pentru o funcționalitate optimă.',
    price: 'de la 1.500 RON',
  },
];

const ServicesSection = () => {
  return (
    <section id="servicii" className="w-full py-12 sm:py-16 lg:py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="category-pill mb-3 sm:mb-4 text-[10px] sm:text-xs">SERVICIILE NOASTRE</span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Tratamente complete pentru <span className="text-[#0d9488] font-semibold">zâmbetul tău</span>
            </h2>
          </div>

          {/* Mobile: Horizontal scroll | Desktop: Grid */}
          <div className="sm:hidden -mx-4 px-4 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-4 w-max">
              {services.map((service, index) => (
                <div key={index} className="w-[280px] flex-shrink-0 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-3">
                    <service.icon className="w-5 h-5 text-sky-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1.5 text-base">{service.title}</h3>
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2">{service.description}</p>
                  <p className="text-xs font-semibold text-sky-500">{service.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div key={index} className="group p-5 sm:p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 hover:border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
                  <service.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-base sm:text-lg">{service.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{service.description}</p>
                <p className="text-sm font-semibold text-sky-500">{service.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10">
            <Link to="/servicii" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base">
              VEZI TOATE SERVICIILE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
