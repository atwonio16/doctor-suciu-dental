import { 
  CirclePlus, 
  AlignCenter, 
  Sparkles, 
  Smile, 
  Baby, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { 
    id: 'implanturi', 
    icon: CirclePlus, 
    title: 'Implant dentar', 
    description: 'Soluții permanente pentru dinți lipsă cu tehnologie modernă.',
    bg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
  { 
    id: 'ortodontie', 
    icon: AlignCenter, 
    title: 'Ortodonție', 
    description: 'Aparate fixe și Invisalign pentru alinierea dinților.',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  { 
    id: 'albire', 
    icon: Sparkles, 
    title: 'Albire dentară', 
    description: 'Zâmbet mai alb cu până la 8 nuanțe.',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  { 
    id: 'estetica', 
    icon: Smile, 
    title: 'Estetică dentară', 
    description: 'Fațete ceramică și coroane zirconiu.',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  { 
    id: 'copii', 
    icon: Baby, 
    title: 'Pentru copii', 
    description: 'Tratament stomatologic într-un mediu prietenos.',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  { 
    id: 'urgente', 
    icon: AlertCircle, 
    title: 'Urgențe', 
    description: 'Disponibili rapid pentru situații care nu așteaptă.',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

const ServicesPreviewMobile = () => {
  return (
    <section className="py-12 pb-16 bg-white lg:hidden">
      {/* Header - aligned with "Cazuri reale" */}
      <div className="px-5 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Serviciile noastre
        </h2>
        <p className="text-sm text-gray-500">
          De la consultații simple la tratamente complexe.
        </p>
      </div>

      {/* Services Grid - cards */}
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-4"
          >
            {/* Icon - colored, slightly smaller */}
            <div className={`w-9 h-9 rounded-lg ${service.bg} flex items-center justify-center mb-3.5`}>
              <service.icon className={`w-[18px] h-[18px] ${service.iconColor}`} strokeWidth={1.5} />
            </div>

            {/* Content */}
            <h3 className="text-[15px] font-medium text-gray-900 mb-1.5">
              {service.title}
            </h3>
            
            <p className="text-[13px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
              {service.description}
            </p>

            {/* CTA */}
            <Link 
              to={`/servicii#${service.id}`}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              <span>Vezi detalii</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-5 mt-8 text-center">
        <Link
          to="/servicii"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Vezi toate serviciile
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default ServicesPreviewMobile;
