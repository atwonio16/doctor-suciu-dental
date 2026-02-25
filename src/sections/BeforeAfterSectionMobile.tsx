import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BeforeAfterCase } from '../admin/types';
import { usePublicBeforeAfter } from '../hooks/useSupabaseData';

// Default cases - 3 maximum
const defaultCases: BeforeAfterCase[] = [
  {
    id: 'default-1',
    title: 'Fațete ceramice',
    description: 'Zâmbet refăcut după uzură și fracturi',
    beforeImage: '',
    afterImage: '',
    duration: '',
    testimonial: '',
    patientName: '',
    serviceType: '',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'default-2',
    title: 'Albire profesională',
    description: 'Pete de cafea și nicotină eliminate',
    beforeImage: '',
    afterImage: '',
    duration: '',
    testimonial: '',
    patientName: '',
    serviceType: '',
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'default-3',
    title: 'Ortodonție',
    description: 'Dinți îndreptați fără extracții',
    beforeImage: '',
    afterImage: '',
    duration: '',
    testimonial: '',
    patientName: '',
    serviceType: '',
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

const BeforeAfterSectionMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { data: supabaseCases } = usePublicBeforeAfter();

  const cmsCases: BeforeAfterCase[] = useMemo(() => {
    return supabaseCases.map((c, idx) => ({
      id: c.id,
      title: c.title,
      description: c.description || '',
      beforeImage: c.before_image_url,
      afterImage: c.after_image_url,
      duration: '',
      testimonial: '',
      patientName: '',
      serviceType: c.category || '',
      order: c.order_index ?? idx,
      isActive: c.is_active,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }));
  }, [supabaseCases]);

  const activeCmsCases = cmsCases.filter(c => c.isActive !== false);
  const displayCases = useMemo(() => {
    const cases = activeCmsCases.length >= 1
      ? activeCmsCases.sort((a, b) => a.order - b.order).slice(0, 3)
      : defaultCases.slice(0, 3);
    return cases;
  }, [activeCmsCases]);

  // Auto-slide every 7 seconds
  useEffect(() => {
    if (isPaused || displayCases.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === displayCases.length - 1 ? 0 : prev + 1));
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isPaused, displayCases.length]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === 0 ? displayCases.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === displayCases.length - 1 ? 0 : prev + 1));
  };

  const getPlaceholder = (type: 'before' | 'after', title: string) => {
    const bgColor = type === 'before' ? 'f1f5f9' : 'ffffff';
    const textColor = type === 'before' ? '94a3b8' : '64748b';
    const label = type === 'before' ? 'Înainte' : 'După';

    return `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#${bgColor}"/>
        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#${textColor}" font-size="14" font-family="system-ui" font-weight="500">${label}</text>
        <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#${textColor}" font-size="11" font-family="system-ui" opacity="0.7">${title}</text>
      </svg>`
    )}`;
  };

  return (
    <section className="py-12 pb-16 bg-white lg:hidden">
      {/* Header */}
      <div className="px-5 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cazuri reale
        </h2>
        <p className="text-sm text-gray-500">
          Aceeași persoană. Înainte și după tratament.
        </p>
      </div>

      {/* Case Display */}
      <div className="px-5">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 active:text-gray-800 transition-colors"
            aria-label="Cazul anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {displayCases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPaused(true);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx === currentIndex ? 'w-5 bg-gray-700' : 'w-1.5 bg-gray-300'
                }`}
                aria-label={`Cazul ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 active:text-gray-800 transition-colors"
            aria-label="Cazul următor"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel */}
        <div 
          className="overflow-hidden"
          onTouchStart={() => setIsPaused(true)}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayCases.map((caseItem) => (
              <div key={caseItem.id} className="w-full flex-shrink-0">
                {/* Before/After Images */}
                <div className="grid grid-cols-2 gap-2">
                  {/* BEFORE */}
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-block px-1.5 py-0.5 bg-black/50 text-white text-[9px] font-medium uppercase tracking-wider rounded-sm">
                        Înainte
                      </span>
                    </div>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={caseItem.beforeImage || getPlaceholder('before', caseItem.title)}
                        alt={`Înainte - ${caseItem.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* AFTER */}
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <span className="inline-block px-1.5 py-0.5 bg-gray-800/80 text-white text-[9px] font-medium uppercase tracking-wider rounded-sm">
                        După
                      </span>
                    </div>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={caseItem.afterImage || getPlaceholder('after', caseItem.title)}
                        alt={`După - ${caseItem.title}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Context */}
                <div className="text-center mt-5">
                  <h3 className="text-base font-medium text-gray-900">
                    {caseItem.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {caseItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSectionMobile;
