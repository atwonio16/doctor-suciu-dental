import { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

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

  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        const next = (currentPage + 1) % totalPages;
        goToPage(next);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentPage, isDragging, totalPages]);

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-medical-cream">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-medical-navy-soft rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-medical-teal-soft rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="category-pill mb-4">RECENZII GOOGLE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-navy mb-4">
              Ce spun <span className="text-medical-teal">pacienții</span> noștri
            </h2>
            <p className="text-medical-gray max-w-2xl mx-auto text-lg">
              Povești reale de la oameni care și-au transformat zâmbetul alături de noi.
            </p>
          </div>

          {/* Google Rating Badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-lg border border-medical-warm">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-medical-navy">Google</span>
                <span className="text-medical-warm">|</span>
                <span className="text-sm text-medical-gray">Reviews</span>
              </div>
              
              <div className="h-8 w-px bg-medical-warm" />
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-medical-navy">5.0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="h-8 w-px bg-medical-warm" />
              
              <span className="text-sm text-medical-gray">
                pe baza a <strong>51 de recenzii</strong>
              </span>
            </div>
          </div>

          {/* Reviews Carousel */}
          <div className="relative mb-6">
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
                        className="bg-white rounded-2xl p-6 shadow-lg border border-medical-warm h-full"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-medical-navy flex items-center justify-center text-white font-semibold text-sm">
                              {review.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-medical-navy text-sm">{review.name}</p>
                              <p className="text-xs text-medical-gray">Târgoviște</p>
                            </div>
                          </div>
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>

                        {/* Stars and date */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-xs text-medical-gray-light">{review.date}</span>
                        </div>

                        {/* Review text */}
                        <p className="text-medical-gray text-sm leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 0 || isAnimating}
              className="w-12 h-12 rounded-full bg-white shadow-lg border border-medical-warm flex items-center justify-center text-medical-gray hover:text-medical-teal hover:shadow-xl transition-all disabled:opacity-40"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPage
                      ? 'w-6 bg-medical-teal'
                      : 'w-2 bg-medical-warm hover:bg-medical-gray-light'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1 || isAnimating}
              className="w-12 h-12 rounded-full bg-medical-teal shadow-lg shadow-medical-teal/30 flex items-center justify-center text-white hover:bg-medical-teal-dark hover:shadow-xl transition-all disabled:opacity-40"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* CTA Link */}
          <div className="text-center">
            <a
              href="https://g.page/r/DoctorSuciuDental/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-medical-teal hover:text-medical-teal-dark font-medium transition-colors group"
            >
              <span>Vezi toate recenziile pe Google</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
