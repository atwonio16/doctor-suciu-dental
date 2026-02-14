import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Case {
  id: number;
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

const cases: Case[][] = [
  [
    {
      id: 1,
      beforeImage: '/before-1.jpg',
      afterImage: '/after-1.jpg',
      title: 'Albire Profesională',
      description: '8 nuanțe mai deschis în 60 minute',
    },
    {
      id: 2,
      beforeImage: '/before-2.jpg',
      afterImage: '/after-2.jpg',
      title: 'Fațete Ceramice',
      description: 'Zâmbet perfect și natural',
    },
    {
      id: 3,
      beforeImage: '/before-3.jpg',
      afterImage: '/after-3.jpg',
      title: 'Ortodonție',
      description: 'Dinți aliniați în 6 luni',
    },
  ],
  [
    {
      id: 4,
      beforeImage: '/before-4.jpg',
      afterImage: '/after-4.jpg',
      title: 'Coroane Dentare',
      description: 'Restaurare estetică completă',
    },
    {
      id: 5,
      beforeImage: '/before-5.jpg',
      afterImage: '/after-5.jpg',
      title: 'Implant Dentar',
      description: 'Recuperare funcțională totală',
    },
    {
      id: 6,
      beforeImage: '/before-6.jpg',
      afterImage: '/after-6.jpg',
      title: 'Estetică Dentară',
      description: 'Transformare vizibilă',
    },
  ],
];

const BeforeAfterSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % cases.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cases.length) % cases.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const currentCases = cases[currentSlide];

  return (
    <section 
      id="transformari"
      className="w-full py-16 sm:py-20 bg-[#f8fafc]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Section Label */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-[#1e3a5f]" />
              <span className="text-sm font-semibold tracking-wider text-[#1e3a5f] uppercase">
                Rezultate Reale
              </span>
              <span className="w-12 h-px bg-[#1e3a5f]" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#0f172a] tracking-tight mb-4">
              Transformări care vorbesc de la sine
            </h2>
            <p className="text-lg text-[#64748b] max-w-2xl mx-auto">
              Vezi cum am transformat zâmbetele pacienților noștri
            </p>
          </div>

          {/* Cases Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentCases.map((caseItem) => (
                <div 
                  key={caseItem.id} 
                  className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-sm hover:shadow-lg hover:shadow-[#1e3a5f]/5 transition-all duration-300"
                >
                  {/* Images Stack */}
                  <div className="space-y-3 mb-4">
                    {/* Before */}
                    <div className="relative group overflow-hidden rounded-xl bg-[#f1f5f9]">
                      <div className="aspect-[16/10]">
                        <img
                          src={caseItem.beforeImage}
                          alt={`Înainte - ${caseItem.title}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-smile.jpg';
                          }}
                        />
                      </div>
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#0f172a]/90 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-semibold text-white tracking-wide">ÎNAINTE</span>
                      </div>
                    </div>

                    {/* After */}
                    <div className="relative group overflow-hidden rounded-xl bg-[#f1f5f9] ring-2 ring-[#0d9488]/20">
                      <div className="aspect-[16/10]">
                        <img
                          src={caseItem.afterImage}
                          alt={`După - ${caseItem.title}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-smile.jpg';
                          }}
                        />
                      </div>
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#0d9488] rounded-full">
                        <span className="text-xs font-semibold text-white tracking-wide">DUPĂ</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center pt-2 border-t border-[#f1f5f9]">
                    <h3 className="text-lg font-semibold text-[#0f172a] mb-1">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-[#64748b]">
                      {caseItem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 w-10 h-10 rounded-full bg-white border border-[#e2e8f0] shadow-md hover:shadow-lg hover:border-[#0d9488] flex items-center justify-center text-[#0f172a] hover:text-[#0d9488] transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 w-10 h-10 rounded-full bg-white border border-[#e2e8f0] shadow-md hover:shadow-lg hover:border-[#0d9488] flex items-center justify-center text-[#0f172a] hover:text-[#0d9488] transition-all"
              aria-label="Următor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-[#0d9488]'
                    : 'w-2 bg-[#cbd5e1] hover:bg-[#94a3b8]'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
