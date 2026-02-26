import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { usePublicServices } from '../hooks/useSupabaseData';

// Configurație categorii cu subtitluri - pregătit pentru administrare din DB
interface CategoryConfig {
  name: string;
  subtitle: string;
  order: number;
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  'implanturi': { 
    name: 'Implantologie', 
    subtitle: 'Soluții durabile pentru înlocuirea dinților pierduți, cu aspect și funcționalitate naturală.',
    order: 1 
  },
  'ortodontie': { 
    name: 'Ortodonție', 
    subtitle: 'Aliniere dentară discretă și confortabilă, pentru un zâmbet echilibrat și sănătos.',
    order: 2 
  },
  'albire': { 
    name: 'Albire Dentară', 
    subtitle: 'Proceduri sigure pentru un zâmbet mai luminos, realizate sub supraveghere medicală.',
    order: 3 
  },
  'estetica': { 
    name: 'Estetică Dentară', 
    subtitle: 'Pentru un zâmbet natural, echilibrat și adaptat fizionomiei tale.',
    order: 4 
  },
  'protetica': { 
    name: 'Protetică', 
    subtitle: 'Restaurarea funcționalității și esteticii cu coroane, punți și proteze de calitate.',
    order: 5 
  },
  'urgente': { 
    name: 'Urgențe Stomatologice', 
    subtitle: 'Intervenții rapide pentru durere, traumatisme sau alte situații care necesită atenție imediată.',
    order: 6 
  },
  'copii': { 
    name: 'Stomatologie Copii', 
    subtitle: 'Îngrijire dentară blândă și prietenoasă, special adaptată pentru cei mici.',
    order: 7 
  },
  'general': { 
    name: 'Servicii Generale', 
    subtitle: 'Prevenție, igienizare și tratamente pentru menținerea sănătății dentare de zi cu zi.',
    order: 8 
  },
  'radiologie': { 
    name: 'Radiologie', 
    subtitle: 'Diagnostic precis cu echipament modern și doze minime de radiație.',
    order: 9 
  },
};

const ServicesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

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
        ...CATEGORY_CONFIG[slug],
      }))
      .sort((a, b) => a.order - b.order);
    return cats;
  }, [groupedServices]);

  // Intersection Observer pentru a detecta categoria vizibilă la scroll
  useEffect(() => {
    if (categoriesWithServices.length === 0 || isManualScrolling) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling) return; // Nu actualiza dacă e scroll manual
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    // Observă toate secțiunile de categorii
    categoriesWithServices.forEach((category) => {
      const element = document.getElementById(category.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [categoriesWithServices, isManualScrolling]);

  // Gestionează hash-ul URL-ului pentru scroll la categorie
  useEffect(() => {
    if (categoriesWithServices.length === 0) return;
    
    const hash = location.hash.replace('#', '');
    if (hash && categoriesWithServices.find(c => c.slug === hash)) {
      setActiveCategory(hash);
      // Folosim requestAnimationFrame pentru a ne asigura că DOM-ul e gata
      setIsManualScrolling(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 140; // Offset optim pentru sticky header
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'auto' });
          }
          setTimeout(() => setIsManualScrolling(false), 100);
        }, 50);
      });
    } else if (!activeCategory) {
      setActiveCategory(categoriesWithServices[0].slug);
    }
  }, [categoriesWithServices]); // Dependență doar de categoriesWithServices, nu și de hash sau activeCategory

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
      {/* Header */}
      <section className="w-full pb-8">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-3">
                Servicii dentare, explicate clar
              </h1>
              <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Tratamentele noastre sunt organizate pe categorii, cu informații clare și prețuri orientative, 
                ca să știi exact la ce să te aștepți încă de la început.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation - Sticky */}
      {categoriesWithServices.length > 0 && (
        <div className="sticky top-[56px] sm:top-[60px] lg:top-[64px] z-40 bg-white py-3 border-b border-gray-100 shadow-sm">
          <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {categoriesWithServices.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => {
                      setIsManualScrolling(true);
                      setActiveCategory(category.slug);
                      const element = document.getElementById(category.slug);
                      if (element) {
                        const offset = 140; // Offset optim pentru sticky header
                        const top = element.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                      // Actualizăm URL-ul fără să reîncărcăm pagina
                      window.history.replaceState(null, '', `#${category.slug}`);
                      // Re-activăm Intersection Observer după ce s-a terminat scroll-ul
                      setTimeout(() => setIsManualScrolling(false), 800);
                    }}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      activeCategory === category.slug
                        ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Categories */}
      {categoriesWithServices.length > 0 ? (
        <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-16 pt-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {categoriesWithServices.map((category) => {
              const categoryServices = groupedServices[category.slug] || [];

              return (
                <div key={category.slug} id={category.slug} className="scroll-mt-28">
                  {/* Category Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-500">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Services List */}
                  <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
                    {categoryServices.map((service, index) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceClick(service)}
                        className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors group ${
                          index !== categoryServices.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="font-medium text-gray-900 group-hover:text-[#1e3a5f] transition-colors mb-1">
                            {service.title}
                          </h3>
                          {service.description && (
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {service.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {service.price && (
                            <span className="text-sm font-medium text-gray-900">
                              {service.price}
                            </span>
                          )}
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a5f] group-hover:translate-x-0.5 transition-all" />
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

      {/* Price Note */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-sm text-gray-400">
            Prețurile sunt orientative și pot varia în funcție de complexitatea cazului. 
            Pentru o estimare exactă, programează o primă vizită.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-16">
        <div className="max-w-3xl mx-auto bg-[#f8fafc] rounded-2xl p-8 lg:p-10 text-center border border-[#e2e8f0]">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
            Vrei să discutăm despre cazul tău?
          </h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto leading-relaxed">
            O primă consultație ne ajută să înțelegem exact ce ai nevoie și să îți propunem soluția potrivită.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 font-medium text-sm px-6 py-2.5 rounded-lg border border-[#94a3b8] text-[#0f172a] hover:bg-gray-50 transition-colors"
          >
            Programează-te
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
