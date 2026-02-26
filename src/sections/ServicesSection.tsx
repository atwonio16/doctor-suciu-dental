import { Link, useNavigate } from 'react-router-dom';
import { 
  Stethoscope, Sparkles, Smile, CirclePlus, 
  Baby, AlertCircle, ArrowRight, type LucideIcon 
} from 'lucide-react';
import { usePublicServices } from '../hooks/useSupabaseData';
import type { Service } from '../lib/supabase';
import { useMemo } from 'react';

// Icon mapping based on service category or title
const getIconForService = (title: string, category?: string): LucideIcon => {
  const text = (title + ' ' + (category || '')).toLowerCase();
  
  if (text.includes('implant')) return CirclePlus;
  if (text.includes('estetic') || text.includes('albire') || text.includes('fațet')) return Sparkles;
  if (text.includes('ortodon') || text.includes('invisalign') || text.includes('aparat')) return Smile;
  if (text.includes('chirurg') || text.includes('extrac')) return Stethoscope;
  if (text.includes('pedo') || text.includes('copil')) return Baby;
  if (text.includes('urgen') || text.includes('durere')) return AlertCircle;
  
  // Default icon
  return Stethoscope;
};

// Color scheme mapping based on service category
const getColorScheme = (title: string, category?: string, index: number = 0) => {
  const text = (title + ' ' + (category || '')).toLowerCase();
  
  if (text.includes('implant')) {
    return { bg: 'bg-slate-100', iconColor: 'text-slate-600' };
  }
  if (text.includes('estetic') || text.includes('albire') || text.includes('fațet')) {
    return { bg: 'bg-teal-50', iconColor: 'text-teal-600' };
  }
  if (text.includes('ortodon') || text.includes('invisalign') || text.includes('aparat')) {
    return { bg: 'bg-sky-50', iconColor: 'text-sky-600' };
  }
  if (text.includes('chirurg') || text.includes('extrac')) {
    return { bg: 'bg-indigo-50', iconColor: 'text-indigo-600' };
  }
  if (text.includes('pedo') || text.includes('copil')) {
    return { bg: 'bg-amber-50', iconColor: 'text-amber-600' };
  }
  if (text.includes('urgen') || text.includes('durere')) {
    return { bg: 'bg-rose-50', iconColor: 'text-rose-600' };
  }
  
  // Fallback colors based on index
  const colors = [
    { bg: 'bg-slate-100', iconColor: 'text-slate-600' },
    { bg: 'bg-teal-50', iconColor: 'text-teal-600' },
    { bg: 'bg-sky-50', iconColor: 'text-sky-600' },
    { bg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { bg: 'bg-amber-50', iconColor: 'text-amber-600' },
    { bg: 'bg-rose-50', iconColor: 'text-rose-600' },
  ];
  return colors[index % colors.length];
};

// Default services as fallback
const defaultServices = [
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

interface ServiceDisplay {
  id?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bg: string;
  iconColor: string;
}

const ServicesSection = () => {
  const { data: supabaseServices, loading } = usePublicServices();
  const navigate = useNavigate();

  const services: ServiceDisplay[] = useMemo(() => {
    // If we have Supabase data, use it
    if (supabaseServices.length > 0) {
      return supabaseServices.map((service: Service, index: number) => {
        const colors = getColorScheme(service.title, service.category, index);
        return {
          id: service.id,
          icon: getIconForService(service.title, service.category),
          title: service.title,
          description: service.description,
          bg: colors.bg,
          iconColor: colors.iconColor,
        };
      });
    }
    
    // Fallback to default services
    return defaultServices;
  }, [supabaseServices]);

  const handleCardClick = (service: ServiceDisplay) => {
    console.log('Card clicked:', service.title);
    navigate('/servicii');
  };

  return (
    <section id="servicii" className="w-full py-24 sm:py-28 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header - aligned with "Cazuri reale" */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
              Serviciile noastre
            </h2>
            <p className="text-base text-gray-500 mx-auto px-4 sm:px-0" style={{ maxWidth: '480px' }}>
              De la consultații simple la tratamente complexe — suntem aici pentru tine.
            </p>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="service-card bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-5 sm:p-6 lg:p-7 animate-pulse">
                  <div className="service-icon w-11 h-11 rounded-lg bg-gray-200 mb-5" />
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2.5" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            /* Services Grid - cards with subtle shadow for clarity */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id || index}
                  onClick={() => handleCardClick(service)}
                  className="service-card group bg-white rounded-lg border border-gray-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-5 sm:p-6 lg:p-7 transition-all hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.06)] hover:border-gray-300 cursor-pointer relative z-10 active:scale-[0.98]"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(service);
                    }
                  }}
                >
                  {/* Icon - colored, slightly smaller for hierarchy */}
                  <div className={`service-icon w-11 h-11 rounded-lg ${service.bg} flex items-center justify-center mb-5 transition-transform group-hover:scale-105`}>
                    <service.icon className={`w-5 h-5 ${service.iconColor}`} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="service-title text-[1.0625rem] font-medium text-gray-900 mb-2.5 group-hover:text-[#1e3a5f] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="service-description text-[14px] sm:text-[13px] text-gray-500 leading-relaxed mb-5 line-clamp-2">
                    {service.description}
                  </p>

                  {/* CTA - secondary link */}
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 group-hover:text-gray-800 transition-colors">
                    <span>Vezi detalii</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Main CTA - text link */}
          <div className="text-center mt-16 sm:mt-20">
            <Link
              to="/servicii"
              className="inline-flex items-center justify-center gap-2 text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 min-h-[44px]"
            >
              Vezi toate serviciile
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
