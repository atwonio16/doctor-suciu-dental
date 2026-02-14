import { ArrowRight, CirclePlus, AlignCenter, Sparkles, Smile, Baby, AlertCircle } from 'lucide-react';

const services = [
  {
    id: 'implanturi',
    icon: CirclePlus,
    title: 'Implant dentar',
    description: 'Soluții permanente pentru dinți lipsă. Tehnologie modernă, garanție 10 ani.',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'ortodontie',
    icon: AlignCenter,
    title: 'Ortodonție',
    description: 'Aparate fixe și Invisalign. Îndreptăm dinții pentru un zâmbet perfect.',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    id: 'albire',
    icon: Sparkles,
    title: 'Albire dentară',
    description: 'Zâmbet mai alb cu până la 8 nuanțe. Rezultate imediate, fără durere.',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'estetica',
    icon: Smile,
    title: 'Estetică dentară',
    description: 'Fațete, coroane și redesign de zâmbet. Transformări vizibile instant.',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    id: 'copii',
    icon: Baby,
    title: 'Stomatologie copii',
    description: 'Atmosferă prietenoasă pentru cei mici. Pedodonție cu răbdare și blândețe.',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'urgente',
    icon: AlertCircle,
    title: 'Urgențe stomatologice',
    description: 'Durere de dinți, fracturi, infecții. Te ajutăm rapid în situații urgente.',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {services.map((service) => (
              <a 
                key={service.id}
                href={`/servicii#${service.id}`}
                className="group p-6 rounded-2xl bg-white border border-[#e2e8f0] transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-medical-navy/20"
              >
                {/* Icon - Colorful soft background */}
                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} strokeWidth={1.5} />
                </div>

                <h3 className="font-semibold text-[#0f172a] mb-2 text-lg group-hover:text-medical-navy transition-colors">{service.title}</h3>

                <p className="text-sm text-[#222222] mb-4 leading-relaxed">{service.description}</p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-medical-teal group-hover:text-medical-navy transition-colors">
                  Vezi prețuri
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
