import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Sparkles, AlignCenter, CirclePlus } from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Consultație gratuită',
    description: 'Prima vizită este gratuită. Evaluare completă fără durere.',
    price: '0 RON',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    priceColor: 'text-emerald-600',
  },
  {
    icon: Sparkles,
    title: 'Albire profesională',
    description: 'Zâmbet mai alb cu până la 8 nuanțe într-o singură ședință.',
    price: 'de la 600 RON',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    priceColor: 'text-sky-600',
  },
  {
    icon: AlignCenter,
    title: 'Invisalign',
    description: 'Aparate invizibile pentru îndreptarea dinților. Discret și confortabil.',
    price: 'de la 8.000 RON',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    priceColor: 'text-cyan-600',
  },
  {
    icon: CirclePlus,
    title: 'Implanturi dentare',
    description: 'Soluții permanente pentru dinți lipsă. Garanție 10 ani.',
    price: 'de la 2.800 RON',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    priceColor: 'text-indigo-600',
  },
];

const ServicesPreview = () => {
  return (
    <section id="servicii" className="relative w-full py-20 overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-50/30 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Serviciile Noastre
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Soluții complete pentru zâmbetul tău
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              De la consultații simple la tratamente complexe, suntem aici să te ajutăm.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-6 rounded-2xl bg-white border border-[#e2e8f0] transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#cbd5e1]"
              >
                {/* Icon - Colorful soft background */}
                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} strokeWidth={1.5} />
                </div>

                <h3 className="font-semibold text-[#0f172a] mb-2 text-lg">{service.title}</h3>

                <p className="text-sm text-[#222222] mb-4 leading-relaxed">{service.description}</p>

                <p className={`text-sm font-bold ${service.priceColor}`}>{service.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/servicii" 
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-transparent hover:text-[#1e3a5f]"
            >
              VEZI TOATE SERVICIILE ȘI PREȚURILE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
