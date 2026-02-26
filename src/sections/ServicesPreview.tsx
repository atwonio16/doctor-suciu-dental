import { ArrowRight, CirclePlus, AlignCenter, Smile } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const services = [
  {
    id: 'implanturi',
    icon: CirclePlus,
    title: 'Implant dentar',
    description: 'Soluții permanente pentru dinți lipsă cu tehnologie modernă și garanție.',
    bg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
  {
    id: 'ortodontie',
    icon: AlignCenter,
    title: 'Ortodonție',
    description: 'Aparate fixe și Invisalign pentru alinierea perfectă a dinților la orice vârstă.',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'estetica',
    icon: Smile,
    title: 'Estetică dentară',
    description: 'Fațete, coroane și redesign de zâmbet pentru transformări vizibile.',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];

const ServicesPreview = () => {
  const navigate = useNavigate();
  return (
    <section id="servicii" className="w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header - aligned with "Cazuri reale" */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-[1.75rem] sm:text-3xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-3 sm:mb-4">
              Serviciile noastre
            </h2>
            <p className="text-[15px] sm:text-base text-gray-500 max-w-2xl mx-auto px-4 sm:px-0">
              De la consultații simple la tratamente complexe — suntem aici pentru tine.
            </p>
          </div>

          {/* Services Grid - cards with subtle shadow */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => navigate(`/servicii#${service.id}`)}
                className="group bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-5 sm:p-6 lg:p-7 transition-all hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.06)] hover:border-gray-300 cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/servicii#${service.id}`);
                  }
                }}
              >
                {/* Icon - colored, slightly smaller */}
                <div className={`w-11 h-11 rounded-lg ${service.bg} flex items-center justify-center mb-5 transition-transform group-hover:scale-105`}>
                  <service.icon className={`w-5 h-5 ${service.iconColor}`} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-[1.0625rem] font-medium text-gray-900 mb-2.5 group-hover:text-[#1e3a5f] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[13px] text-gray-500 leading-relaxed mb-5 line-clamp-2">
                  {service.description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 group-hover:text-gray-800 transition-colors">
                  <span>Vezi detalii</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="text-center mt-12 sm:mt-16 lg:mt-20">
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

export default ServicesPreview;
