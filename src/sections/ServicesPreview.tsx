import { 
  CirclePlus, 
  AlignCenter, 
  Sparkles, 
  Smile, 
  Baby, 
  AlertCircle,
  ChevronRight 
} from 'lucide-react';

const services = [
  {
    id: 'implanturi',
    icon: CirclePlus,
    title: 'Implant dentar',
    description: 'Soluții permanente pentru dinți lipsă',
    price: 'de la 2.800 RON',
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-50',
  },
  {
    id: 'ortodontie',
    icon: AlignCenter,
    title: 'Ortodonție',
    description: 'Aparate fixe și Invisalign',
    price: 'de la 8.000 RON',
    color: 'bg-cyan-500',
    lightColor: 'bg-cyan-50',
  },
  {
    id: 'albire',
    icon: Sparkles,
    title: 'Albire dentară',
    description: 'Zâmbet mai alb cu 8 nuanțe',
    price: 'de la 350 RON',
    color: 'bg-sky-500',
    lightColor: 'bg-sky-50',
  },
  {
    id: 'estetica',
    icon: Smile,
    title: 'Estetică dentară',
    description: 'Fațete și redesign de zâmbet',
    price: 'de la 1.200 RON',
    color: 'bg-rose-500',
    lightColor: 'bg-rose-50',
  },
  {
    id: 'copii',
    icon: Baby,
    title: 'Pentru copii',
    description: 'Atmosferă prietenoasă',
    price: 'Consultație gratuită',
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
  },
  {
    id: 'urgente',
    icon: AlertCircle,
    title: 'Urgențe',
    description: 'Programare rapidă 24/7',
    price: 'Sună acum',
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-8 bg-gray-50">
      {/* Section Header */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
              Serviciile noastre
            </span>
            <h2 className="text-title-1 text-gray-900 mt-1">
              Cu ce te putem ajuta?
            </h2>
          </div>
          <a 
            href="/servicii" 
            className="flex items-center gap-1 text-[14px] font-medium text-[#1e3a5f]"
          >
            Toate
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="horizontal-scroll">
        {services.map((service) => (
          <a 
            key={service.id}
            href={`/servicii#${service.id}`}
            className="scroll-item w-[160px] press-effect"
          >
            <div className={`${service.lightColor} rounded-2xl p-4 h-full`}>
              {/* Icon */}
              <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-3`}>
                <service.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              
              {/* Content */}
              <h3 className="font-semibold text-[15px] text-gray-900 mb-1">
                {service.title}
              </h3>
              <p className="text-[12px] text-gray-500 mb-2 line-clamp-2">
                {service.description}
              </p>
              <p className="text-[12px] font-semibold text-[#0d9488]">
                {service.price}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Action Banner */}
      <div className="px-4 mt-5">
        <a 
          href="/servicii" 
          className="flex items-center justify-between bg-[#1e3a5f] rounded-2xl p-4 press-effect"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-[15px] text-white">Vezi toate serviciile</p>
              <p className="text-[12px] text-white/70">Prețuri transparente</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/70" />
        </a>
      </div>
    </section>
  );
};

export default ServicesPreview;
