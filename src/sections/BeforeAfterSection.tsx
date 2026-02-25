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

const BeforeAfterSection = () => {
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
    <section
      id="transformari"
      className="w-full py-24 sm:py-28 lg:py-32 bg-white"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
              Cazuri reale
            </h2>
            <p className="text-base text-gray-500 max-w-lg mx-auto">
              Aceeași persoană. Același zâmbet. Înainte și după tratament.
            </p>
          </div>

          {/* Case Display - carousel style */}
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-6 lg:-left-16 top-[calc(50%-2.5rem)] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              aria-label="Cazul anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-3 sm:-right-6 lg:-right-16 top-[calc(50%-2.5rem)] -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              aria-label="Cazul următor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel container */}
            <div 
              className="overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {displayCases.map((caseItem) => (
                  <div key={caseItem.id} className="w-full flex-shrink-0 px-1">
                    {/* Before/After Images */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {/* BEFORE */}
                      <div className="relative">
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-block px-2 py-1 bg-black/50 text-white text-[10px] font-medium uppercase tracking-wider rounded-sm">
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
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-block px-2 py-1 bg-gray-800/80 text-white text-[10px] font-medium uppercase tracking-wider rounded-sm">
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
                    <div className="text-center mt-8">
                      <h3 className="text-lg font-medium text-gray-900">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1.5">
                        {caseItem.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {displayCases.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPaused(true);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1 rounded-full transition-all duration-200 ${
                    idx === currentIndex ? 'w-5 bg-gray-700' : 'w-1 bg-gray-300'
                  }`}
                  aria-label={`Cazul ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
