import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2, ChevronDown, Search, X } from 'lucide-react';
import { usePublicServices } from '../hooks/useSupabaseData';

// Configurație categorii
interface CategoryConfig {
  name: string;
  subtitle: string;
  order: number;
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  'implanturi': { 
    name: 'Implantologie', 
    subtitle: 'Soluții durabile pentru înlocuirea dinților pierduți.',
    order: 1 
  },
  'ortodontie': { 
    name: 'Ortodonție', 
    subtitle: 'Aliniere dentară discretă și confortabilă.',
    order: 2 
  },
  'albire': { 
    name: 'Albire Dentară', 
    subtitle: 'Proceduri sigure pentru un zâmbet mai luminos.',
    order: 3 
  },
  'estetica': { 
    name: 'Estetică Dentară', 
    subtitle: 'Zâmbet natural și echilibrat.',
    order: 4 
  },
  'protetica': { 
    name: 'Protetică', 
    subtitle: 'Restaurarea funcționalității cu coroane și punți.',
    order: 5 
  },
  'urgente': { 
    name: 'Urgențe', 
    subtitle: 'Intervenții rapide pentru durere sau traumatisme.',
    order: 6 
  },
  'copii': { 
    name: 'Stomatologie Copii', 
    subtitle: 'Îngrijire blândă și prietenoasă pentru cei mici.',
    order: 7 
  },
  'general': { 
    name: 'Servicii Generale', 
    subtitle: 'Prevenție și igienizare dentară.',
    order: 8 
  },
  'radiologie': { 
    name: 'Radiologie', 
    subtitle: 'Diagnostic precis cu echipament modern.',
    order: 9 
  },
};

export function MobileServicesPage() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  // Fetch services din Supabase
  const { data: services, loading } = usePublicServices();

  // Grupează serviciile pe categorii
  const groupedServices = useMemo(() => {
    const groups: Record<string, typeof services> = {};
    services.forEach(service => {
      const catSlug = service.category_slug || 'general';
      if (!groups[catSlug]) {
        groups[catSlug] = [];
      }
      groups[catSlug].push(service);
    });
    return groups;
  }, [services]);

  // Categoriile sortate
  const categoriesWithServices = useMemo(() => {
    const cats = Object.keys(groupedServices)
      .filter(slug => groupedServices[slug]?.length > 0)
      .map(slug => ({
        slug,
        ...CATEGORY_CONFIG[slug],
      }))
      .sort((a, b) => a.order - b.order);
    return cats;
  }, [groupedServices]);

  // Filtrează serviciile după căutare
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return categoriesWithServices.map(cat => ({
        ...cat,
        services: groupedServices[cat.slug] || []
      }));
    }

    const query = searchQuery.toLowerCase();
    const results: Array<typeof categoriesWithServices[0] & { services: typeof services }> = [];

    categoriesWithServices.forEach(category => {
      const matchingServices = (groupedServices[category.slug] || []).filter(service =>
        service.title.toLowerCase().includes(query) ||
        (service.description && service.description.toLowerCase().includes(query))
      );
      
      if (matchingServices.length > 0) {
        results.push({
          ...category,
          services: matchingServices
        });
      }
    });

    return results;
  }, [searchQuery, categoriesWithServices, groupedServices]);

  // Gestionează hash URL
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#0B1E32]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-[88px] pb-8">
      {/* Header */}
      <section className="px-5 pb-4">
        <div className="max-w-[480px] mx-auto">
          <h1 className="text-[26px] font-bold text-[#0B1E32] tracking-tight mb-2">
            Servicii dentare
          </h1>
          <p className="text-[15px] text-slate-500 leading-relaxed">
            Găsește rapid tratamentul de care ai nevoie.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-5 pb-4 sticky top-[70px] z-40 bg-white border-b border-slate-100 py-3">
        <div className="max-w-[480px] mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Caută un serviciu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-10 rounded-full bg-slate-100 border-0 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B1E32]/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full bg-slate-300 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-5 pt-4">
        <div className="max-w-[480px] mx-auto space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((category) => (
              <div 
                key={category.slug} 
                id={category.slug}
                className="bg-slate-50 rounded-2xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="p-4 border-b border-slate-100">
                  <h2 className="text-[17px] font-semibold text-[#0B1E32]">
                    {category.name}
                  </h2>
                  <p className="text-[13px] text-slate-500 mt-0.5">
                    {category.subtitle}
                  </p>
                </div>

                {/* Services List */}
                <div className="p-3 space-y-2">
                  {category.services.map((service) => {
                    const isExpanded = expandedService === service.id;
                    return (
                      <div
                        key={service.id}
                        className="bg-white rounded-xl overflow-hidden"
                      >
                        {/* Service Header */}
                        <button
                          onClick={() => toggleService(service.id)}
                          className="w-full flex items-center justify-between p-3 text-left"
                        >
                          <div className="flex-1 pr-3">
                            <h3 className="font-medium text-[14px] text-slate-900">
                              {service.title}
                            </h3>
                            {!isExpanded && service.description && (
                              <p className="text-[12px] text-slate-500 line-clamp-1 mt-0.5">
                                {service.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {service.price && (
                              <span className="text-[13px] font-semibold text-[#0B1E32]">
                                {service.price}
                              </span>
                            )}
                            <ChevronDown 
                              className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        </button>
                        
                        {/* Expanded Content */}
                        <div className={`grid transition-all duration-300 ${
                          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}>
                          <div className="overflow-hidden">
                            <div className="px-3 pb-3">
                              {service.description && (
                                <p className="text-[13px] text-slate-600 leading-relaxed mb-3">
                                  {service.description}
                                </p>
                              )}
                              <Link
                                to="/contact"
                                state={{ service: service.title, category: service.category }}
                                className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-[#0B1E32] text-white text-[13px] font-medium"
                              >
                                Programează-te
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Nu am găsit servicii pentru "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-[#0B1E32] font-medium"
              >
                Vezi toate serviciile
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Price Note */}
      <section className="px-5 mt-6">
        <div className="max-w-[480px] mx-auto">
          <p className="text-center text-[12px] text-slate-400">
            Prețurile sunt orientative și pot varia în funcție de complexitatea cazului.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 mt-8">
        <div className="max-w-[480px] mx-auto bg-slate-50 rounded-2xl p-6 text-center">
          <h2 className="text-[18px] font-semibold text-[#0B1E32] mb-2">
            Vrei să discutăm?
          </h2>
          <p className="text-[14px] text-slate-500 mb-4">
            Programează o primă consultație și află ce soluție ți se potrivește.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 h-[46px] px-6 rounded-full bg-[#0B1E32] text-white text-[14px] font-semibold active:scale-[0.98] transition-all"
          >
            Programează-te
          </Link>
        </div>
      </section>
    </div>
  );
}
