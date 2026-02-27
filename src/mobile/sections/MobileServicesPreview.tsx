import { ArrowRight, CirclePlus, AlignCenter, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

// 3 servicii reprezentative - fără duplicate, mereu aceleași
const services = [
  {
    id: 'implanturi',
    title: 'Implant dentar',
    description: 'Soluții permanente pentru dinți lipsă cu tehnologie modernă și garanție.',
    Icon: CirclePlus,
    bg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
  {
    id: 'ortodontie',
    title: 'Ortodonție',
    description: 'Aparate fixe și Invisalign pentru alinierea perfectă a dinților la orice vârstă.',
    Icon: AlignCenter,
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    id: 'estetica',
    title: 'Estetică dentară',
    description: 'Fațete, coroane și redesign de zâmbet pentru transformări vizibile.',
    Icon: Smile,
    bg: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];

export function MobileServicesPreview() {
  return (
    <section id="servicii" className="py-10" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">
            Serviciile noastre
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
            De la consultații simple la tratamente complexe — suntem aici pentru tine.
          </p>
        </div>

        {/* Services Cards */}
        <div className="space-y-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/servicii#${service.id}`}
              className="group block rounded-xl bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all active:scale-[0.98] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-lg ${service.bg} transition-transform group-hover:scale-105`}>
                  <service.Icon className={`h-5 w-5 ${service.iconColor}`} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-[16px] font-semibold text-slate-900 group-hover:text-[#0B1E32] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-500 line-clamp-2">
                    {service.description}
                  </p>
                  
                  {/* Vezi preturi */}
                  <div className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-slate-400 group-hover:text-[#0B1E32] transition-colors">
                    <span>Vezi prețuri</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA - buton mare navy */}
        <div className="mt-6">
          <Link
            to="/servicii"
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0B1E32] text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(11,30,50,0.25)] transition-all active:scale-[0.98] hover:shadow-[0_6px_20px_rgba(11,30,50,0.35)]"
          >
            Vezi toate serviciile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
