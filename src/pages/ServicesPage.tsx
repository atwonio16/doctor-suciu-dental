import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import { usePublicServices } from '../hooks/useSupabaseData';

// Categoriile predefinite pentru grupare și afișare
const CATEGORY_CONFIG: Record<string, { name: string; order: number }> = {
  'implanturi': { name: 'Implanturi Dentare', order: 1 },
  'ortodontie': { name: 'Ortodonție', order: 2 },
  'albire': { name: 'Albire Dentară', order: 3 },
  'estetica': { name: 'Estetică Dentară', order: 4 },
  'protetica': { name: 'Protetică Dentară', order: 5 },
  'urgente': { name: 'Urgențe Stomatologice', order: 6 },
  'copii': { name: 'Stomatologie Copii', order: 7 },
  'general': { name: 'Servicii Generale', order: 8 },
  'radiologie': { name: 'Radiologie', order: 9 },
};

const ServicesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  // Obține categoriile care au servicii, sortate după ordinea definită
  const categoriesWithServices = useMemo(() => {
    const cats = Object.keys(groupedServices)
      .filter(slug => groupedServices[slug]?.length > 0)
      .map(slug => ({
        slug,
        name: CATEGORY_CONFIG[slug]?.name || slug,
        order: CATEGORY_CONFIG[slug]?.order || 99,
      }))
      .sort((a, b) => a.order - b.order);
    return cats;
  }, [groupedServices]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && categoriesWithServices.find(c => c.slug === hash)) {
      setActiveCategory(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash, categoriesWithServices]);

  const handleServiceClick = (service: typeof services[0]) => {
    navigate('/contact', {
      state: {
        service: service.title,
        category: service.category,
        fromServices: true
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 lg:pt-28">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* Hero Header */}
      <section className="w-full pb-10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black mb-4 tracking-tight">
                Servicii și prețuri
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Prețuri transparente, fără costuri ascunse. Garanție scrisă pentru toate tratamentele.
              </p>
            </div>

            {/* Category Quick Navigation */}
            {categoriesWithServices.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categoriesWithServices.map((category) => (
                  <a
                    key={category.slug}
                    href={`#${category.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(category.slug);
                      document.getElementById(category.slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.slug
                        ? 'bg-[#1e3a5f] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {categoriesWithServices.length > 0 ? (
        <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12">
          <div className="max-w-4xl mx-auto space-y-16">
            {categoriesWithServices.map((category) => {
              const categoryServices = groupedServices[category.slug] || [];

              return (
                <div key={category.slug} id={category.slug} className="scroll-mt-32">
                  {/* Category Header */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <span className="text-xl font-bold text-[#1e3a5f]">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl lg:text-2xl font-semibold text-black">{category.name}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="space-y-3">
                    {categoryServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceClick(service)}
                        className="w-full flex items-center justify-between p-4 lg:p-5 bg-white rounded-xl border border-gray-200 text-left hover:border-[#1e3a5f] hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h3 className="font-medium text-black group-hover:text-[#1e3a5f] transition-colors">
                              {service.title}
                            </h3>
                            {service.duration && (
                              <span className="text-xs text-gray-500">{service.duration}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-black text-lg">{service.price || 'La cerere'}</span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a5f] group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500">Nu există servicii disponibile momentan.</p>
          </div>
        </section>
      )}

      {/* Note */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3 border border-amber-200">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
              <span className="text-amber-700 text-sm">ℹ</span>
            </div>
            <p className="text-sm text-amber-800">
              Prețurile sunt orientative și pot varia în funcție de complexitatea cazului.
              Pentru o estimare exactă, programează o primă vizită.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="max-w-4xl mx-auto bg-[#1e3a5f] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Gata să începi transformarea?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Programează o primă vizită și împreună vom găsi soluția ideală pentru zâmbetul tău.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full bg-white text-black border border-white hover:bg-gray-100"
          >
            PROGRAMEAZĂ-TE
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
