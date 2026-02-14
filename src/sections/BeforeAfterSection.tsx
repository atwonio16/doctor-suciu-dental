import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Case {
  id: number;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const cases: Case[][] = [
  // Slide 1
  [
    {
      id: 1,
      beforeImage: '/before-1.jpg',
      afterImage: '/after-1.jpg',
      description: 'Albire profesională - 8 nuanțe mai deschis',
    },
    {
      id: 2,
      beforeImage: '/before-2.jpg',
      afterImage: '/after-2.jpg',
      description: 'Fațete ceramice - transformare completă',
    },
    {
      id: 3,
      beforeImage: '/before-3.jpg',
      afterImage: '/after-3.jpg',
      description: 'Ortodonție invisible - 6 luni tratament',
    },
  ],
  // Slide 2
  [
    {
      id: 4,
      beforeImage: '/before-4.jpg',
      afterImage: '/after-4.jpg',
      description: 'Coroane ceramice - estetică perfectă',
    },
    {
      id: 5,
      beforeImage: '/before-5.jpg',
      afterImage: '/after-5.jpg',
      description: 'Implant dentar - recuperare totală',
    },
    {
      id: 6,
      beforeImage: '/before-6.jpg',
      afterImage: '/after-6.jpg',
      description: 'Restaurare estetică - zâmbet nou',
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

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const currentCases = cases[currentSlide];

  return (
    <section 
      className="w-full py-16 sm:py-20 bg-[#0a0a0a]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-wide">
              Mii de <span className="text-[#0d9488] font-normal">zâmbete transformate</span>
            </h2>
          </div>

          {/* Cases Grid - 3 Columns */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {currentCases.map((caseItem) => (
                <div key={caseItem.id} className="space-y-4">
                  {/* Before Image */}
                  <div className="relative group">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={caseItem.beforeImage}
                        alt={`Înainte - ${caseItem.description}`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-before.jpg';
                        }}
                      />
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <span className="text-white/80 text-sm font-light tracking-[0.2em] uppercase">
                        Before
                      </span>
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="relative group">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={caseItem.afterImage}
                        alt={`După - ${caseItem.description}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-after.jpg';
                        }}
                      />
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <span className="text-white/80 text-sm font-light tracking-[0.2em] uppercase">
                        After
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-center text-gray-400 text-sm leading-relaxed px-2">
                    {caseItem.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              aria-label="Cazul anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              aria-label="Cazul următor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-[#0d9488]'
                    : 'w-2 bg-white/30 hover:bg-white/50'
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
