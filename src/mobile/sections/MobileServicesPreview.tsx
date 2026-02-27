import { ArrowRight, CirclePlus, AlignCenter, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { usePublicServices } from '../../hooks/useSupabaseData';

type ServicePreviewItem = {
  id: string;
  title: string;
  description: string;
  Icon: typeof CirclePlus;
  bg: string;
  iconColor: string;
};

// Servicii diverse - fără duplicate
const defaultServices: ServicePreviewItem[] = [
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
  const { data: supabaseServices } = usePublicServices();

  const services = useMemo<ServicePreviewItem[]>(() => {
    if (supabaseServices.length > 0) {
      // Luăm primele 3 servicii diverse (fără duplicate de categorii)
      const uniqueServices: ServicePreviewItem[] = [];
      const usedCategories = new Set<string>();
      
      for (const service of supabaseServices) {
        const category = service.category?.toLowerCase() || '';
        const title = service.title.toLowerCase();
        
        // Determinăm categoria generală
        let generalCategory = 'other';
        if (title.includes('implant') || category.includes('implant')) generalCategory = 'implant';
        else if (title.includes('ortodon') || title.includes('invisalign') || category.includes('ortodon')) generalCategory = 'ortodontie';
        else if (title.includes('estetic') || title.includes('fatet') || title.includes('coroan') || category.includes('estetic')) generalCategory = 'estetica';
        else if (title.includes('chirurg') || category.includes('chirurg')) generalCategory = 'chirurgie';
        else if (title.includes('pedo') || title.includes('copil') || category.includes('pedo')) generalCategory = 'pedo';
        
        // Adăugăm doar dacă nu avem deja această categorie
        if (!usedCategories.has(generalCategory) && uniqueServices.length < 3) {
          usedCategories.add(generalCategory);
          
          // Alegem icon și culori în funcție de categorie
          let Icon = CirclePlus;
          let bg = 'bg-slate-100';
          let iconColor = 'text-slate-600';
          
          if (generalCategory === 'implant') {
            Icon = CirclePlus;
            bg = 'bg-slate-100';
            iconColor = 'text-slate-600';
          } else if (generalCategory === 'ortodontie') {
            Icon = AlignCenter;
            bg = 'bg-sky-50';
            iconColor = 'text-sky-600';
          } else if (generalCategory === 'estetica') {
            Icon = Smile;
            bg = 'bg-teal-50';
            iconColor = 'text-teal-600';
          } else if (generalCategory === 'chirurgie') {
            Icon = CirclePlus;
            bg = 'bg-amber-50';
            iconColor = 'text-amber-600';
          } else if (generalCategory === 'pedo') {
            Icon = Smile;
            bg = 'bg-rose-50';
            iconColor = 'text-rose-600';
          }
          
          uniqueServices.push({
            id: service.id,
            title: service.title,
            description: service.description || 'Tratament personalizat în funcție de nevoile tale.',
            Icon,
            bg,
            iconColor,
          });
        }
      }
      
      // Dacă nu avem destule servicii unice, completăm cu fallback
      if (uniqueServices.length < 3) {
        for (const fallback of defaultServices) {
          if (uniqueServices.length >= 3) break;
          if (!uniqueServices.some(s => s.title.toLowerCase().includes(fallback.id))) {
            uniqueServices.push(fallback);
          }
        }
      }
      
      return uniqueServices.slice(0, 3);
    }

    return defaultServices;
  }, [supabaseServices]);

  return (
    <section id="servicii" className="py-10" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header - inspirat din desktop */}
        <div className="mb-6 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">
            Serviciile noastre
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-500">
            De la consultații simple la tratamente complexe — suntem aici pentru tine.
          </p>
        </div>

        {/* Services Cards - design inspirat din desktop */}
        <div className="space-y-3">
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/servicii#${service.id}`}
              className="group block rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] transition-all active:scale-[0.98] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.06)] hover:border-slate-300"
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
                  
                  {/* Vezi detalii link */}
                  <div className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-slate-400 group-hover:text-[#0B1E32] transition-colors">
                    <span>Vezi detalii</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Link - stil text ca pe desktop */}
        <div className="mt-6 text-center">
          <Link
            to="/servicii"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-slate-600 hover:text-[#0B1E32] transition-colors"
          >
            Vezi toate serviciile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
