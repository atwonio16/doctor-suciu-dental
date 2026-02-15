import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const transformations = [
  {
    id: 1,
    beforeImage: '/before-1.jpg',
    afterImage: '/after-1.jpg',
    title: 'Albire Profesională',
    description: '8 nuanțe mai deschis',
    duration: '60 minute',
  },
  {
    id: 2,
    beforeImage: '/before-2.jpg',
    afterImage: '/after-2.jpg',
    title: 'Fațete Ceramice',
    description: 'Zâmbet perfect natural',
    duration: '2 ședințe',
  },
  {
    id: 3,
    beforeImage: '/before-3.jpg',
    afterImage: '/after-3.jpg',
    title: 'Ortodonție',
    description: 'Dinți aliniați',
    duration: '6 luni',
  },
];

const BeforeAfterSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const current = transformations[currentIndex];

  return (
    <section id="transformari" className="py-10 bg-gray-50">
      {/* Section Header */}
      <div className="px-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#0d9488]" />
          <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
            Transformări reale
          </span>
        </div>
        <h2 className="text-title-1 text-gray-900">
          Rezultate care vorbesc<br />de la sine
        </h2>
      </div>

      {/* Before/After Card */}
      <div className="px-4">
        <div 
          className="bg-white rounded-2xl overflow-hidden shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-0.5">
            {/* Before */}
            <div className="relative aspect-square">
              <img
                src={current.beforeImage}
                alt="Înainte"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                ÎNAINTE
              </div>
            </div>
            
            {/* After */}
            <div className="relative aspect-square">
              <img
                src={current.afterImage}
                alt="După"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-[#0d9488] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                DUPĂ
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-[17px] text-gray-900">{current.title}</h3>
                <p className="text-[13px] text-gray-500">{current.description}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-gray-400 uppercase tracking-wide">Durată</p>
                <p className="font-semibold text-[14px] text-[#0d9488]">{current.duration}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {transformations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-5 bg-[#1e3a5f]' 
                        : 'w-2 bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center active:bg-[#152a45] transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-gray-100">
          <div className="flex -space-x-2">
            {['AM', 'MD', 'EP'].map((initials, i) => (
              <div 
                key={i}
                className="w-8 h-8 rounded-full bg-[#1e3a5f] border-2 border-white flex items-center justify-center text-white text-[10px] font-semibold"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-[13px] text-gray-600">
            <span className="font-semibold text-gray-900">+500</span> de transformări reușite
          </p>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
