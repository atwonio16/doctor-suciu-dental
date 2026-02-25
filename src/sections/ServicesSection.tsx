import { Link } from 'react-router-dom';
import { 
  Stethoscope, Sparkles, Smile, CirclePlus, 
  Baby, AlertCircle, ArrowRight 
} from 'lucide-react';

const services = [
  {
    icon: CirclePlus,
    title: 'Implantologie',
    description: 'Implante dentare premium cu garanție. Recuperează-ți zâmbetul complet.',
    bg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
  {
    icon: Sparkles,
    title: 'Estetică dentară',
    description: 'Albire profesională, fațete ceramice și coroane pentru un zâmbet natural.',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    icon: Smile,
    title: 'Ortodonție',
    description: 'Aparate dentare clasice și Invisalign pentru alinierea perfectă a dinților.',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: Stethoscope,
    title: 'Chirurgie orală',
    description: 'Extracții și intervenții chirurgicale cu tehnici minim invazive.',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: Baby,
    title: 'Pedodonție',
    description: 'Tratamente stomatologice pentru copii într-un mediu prietenos și sigur.',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: AlertCircle,
    title: 'Urgențe stomatologice',
    description: 'Disponibili pentru urgențe dentare cu programare rapidă în aceeași zi.',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

const ServicesSection = () => {
  return (
    <section id="servicii" className="w-full py-24 sm:py-28 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header - aligned with "Cazuri reale" */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
              Serviciile noastre
            </h2>
            <p className="text-base text-gray-500 mx-auto" style={{ maxWidth: '480px' }}>
              De la consultații simple la tratamente complexe — suntem aici pentru tine.
            </p>
          </div>

          {/* Services Grid - cards with subtle shadow for clarity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-6 lg:p-7 transition-shadow hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.06)]"
              >
                {/* Icon - colored, slightly smaller for hierarchy */}
                <div className={`w-11 h-11 rounded-lg ${service.bg} flex items-center justify-center mb-5`}>
                  <service.icon className={`w-5 h-5 ${service.iconColor}`} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-[1.0625rem] font-medium text-gray-900 mb-2.5">
                  {service.title}
                </h3>
                
                <p className="text-[13px] text-gray-500 leading-relaxed mb-5 line-clamp-2">
                  {service.description}
                </p>

                {/* CTA - secondary link */}
                <Link 
                  to="/servicii" 
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <span>Vezi detalii</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* Main CTA - text link */}
          <div className="text-center mt-16 sm:mt-20">
            <Link
              to="/servicii"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Vezi toate serviciile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
