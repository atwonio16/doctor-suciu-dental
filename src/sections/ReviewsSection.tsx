import { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useGoogleReviews } from '../hooks/useGoogleReviews';

const reviews = [
  {
    id: 1,
    name: 'Andreea M.',
    avatar: 'AM',
    rating: 5,
    date: 'acum 2 săptămâni',
    text: 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă și drăguță. Recomand cu încredere!',
  },
  {
    id: 2,
    name: 'Mihai D.',
    avatar: 'MD',
    rating: 5,
    date: 'acum o lună',
    text: 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas. Acum pot zâmbi fără griji. Mulțumesc Dr. Suciu!',
  },
  {
    id: 3,
    name: 'Elena P.',
    avatar: 'EP',
    rating: 5,
    date: 'acum 3 săptămâni',
    text: 'Am ales Invisalign și nu regret. Alignerele sunt atât de discrete că prietenii nici nu au observat. Rezultate excelente într-un timp record!',
  },
  {
    id: 4,
    name: 'Cristian S.',
    avatar: 'CS',
    rating: 5,
    date: 'acum 2 luni',
    text: 'Merită deplasarea de la Ploiești! Am făcut albire și rezultatul a fost imediat vizibil. Prețuri corecte și personal amabil.',
  },
  {
    id: 5,
    name: 'Maria L.',
    avatar: 'ML',
    rating: 5,
    date: 'acum o săptămână',
    text: 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă. Locul perfect pentru familii!',
  },
  {
    id: 6,
    name: 'Adrian K.',
    avatar: 'AK',
    rating: 5,
    date: 'acum 3 luni',
    text: 'Deși locuiesc în București, vin aici pentru tratamente complexe. Atmosfera calmă și profesionalismul fac diferența. Cel mai bun dentist din zonă!',
  },
];

const ReviewsSection = () => {
  const { data: googleData } = useGoogleReviews();
  const [currentPage, setCurrentPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const goToPage = (index: number) => {
    if (isAnimating) return;
    const newIndex = Math.max(0, Math.min(index, totalPages - 1));
    setIsAnimating(true);
    setCurrentPage(newIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50;
    
    if (translateX < -threshold) {
      nextPage();
    } else if (translateX > threshold) {
      prevPage();
    }
    setTranslateX(0);
  };

  // Auto-advance - 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && !isAnimating) {
        const next = (currentPage + 1) % totalPages;
        goToPage(next);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage, isDragging, isAnimating, totalPages]);

  return (
    <section className="relative w-full py-16 overflow-hidden bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-12 h-[1px] bg-[#94a3b8]" />
              <span className="text-xs font-semibold tracking-[0.15em] text-[#64748b] uppercase">
                Recenzii Google
              </span>
              <span className="w-12 h-[1px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-3 tracking-tight">
              Ce spun pacienții noștri
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              Povești reale de la oameni care și-au transformat zâmbetul alături de noi.
            </p>
          </div>

          {/* Reviews Carousel with Side Navigation */}
          <div className="relative mb-8 px-4 sm:px-12 lg:px-16">
            {/* Left Arrow - positioned outside */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0 || isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#e2e8f0] shadow-sm flex items-center justify-center text-[#64748b] hover:text-[#1e3a5f] hover:border-[#1e3a5f] hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Carousel */}
            <div
              ref={containerRef}
              className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={() => isDragging && handleDragEnd()}
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${currentPage * 100}% + ${translateX}px))`,
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0 grid md:grid-cols-3 gap-6 px-1">
                    {reviews.slice(pageIndex * reviewsPerPage, (pageIndex + 1) * reviewsPerPage).map((review) => (
                      <div
                        key={review.id}
                        className="bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-sm h-full flex flex-col"
                      >
                        {/* Header - Avatar + Name */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-11 h-11 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            {review.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-[#0f172a] text-sm truncate">{review.name}</p>
                            <p className="text-xs text-[#64748b]">Târgoviște</p>
                          </div>
                        </div>

                        {/* Stars and Date */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs text-[#94a3b8]">{review.date}</span>
                        </div>

                        {/* Review text */}
                        <p className="text-[#374151] text-sm leading-relaxed flex-1">
                          "{review.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow - positioned outside */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1e3a5f] shadow-sm flex items-center justify-center text-white hover:bg-[#152a45] hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentPage
                    ? 'w-5 bg-[#1e3a5f]'
                    : 'w-1.5 bg-[#e2e8f0] hover:bg-[#cbd5e1]'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Google Reviews Badge + Link - Below cards */}
          <div className="text-center">
            <a 
              href="https://www.google.com/search?sa=X&sca_esv=3e8b06acf992d999&rlz=1C1FHFK_enES1096ES1096&sxsrf=ANbL-n7_67OaB8qcRYwA5rO2L62mVrOQng:1770685897789&q=DOCTOR+SUCIU+Dental+Clinic+Reviews&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIyNja1NDQ2NDQ3MrI0NDI2MDPawMj4ilHJxd85xD9IITjU2TNUwSU1ryQxR8E5JzMvM1khKLUsM7W8eBErEYoAkWUiJmMAAAA&rldimm=335913117229123062&tbm=lcl&hl=en-RO&ved=2ahUKEwjr-8j_3s2SAxUtgv0HHZ-FG_8Q9fQKegQIRRAG&biw=1365&bih=655&dpr=1.88#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#64748b] hover:text-[#1e3a5f] transition-colors group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{googleData?.rating.toFixed(1) || '5.0'}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>din {googleData?.userRatingsTotal || '53'} recenzii pe Google</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
