import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { Review } from '../admin/types';
import { usePublicReviews } from '../hooks/useSupabaseData';
import type { Review as SupabaseReview } from '../lib/supabase';
import { useCMSSettings } from '../hooks/useCMSSettings';

// Default reviews with real profile images from local files
const defaultReviews: Review[] = [
  {
    id: '1',
    authorName: 'Andreea M.',
    avatar: '/reviews/brooke-balentine-7LuPlRljfmM-unsplash.jpg',
    rating: 5,
    date: 'acum 2 săptămâni',
    text: 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă și drăguță. Recomand cu încredere!',
    isPublished: true,
    isFeatured: false,
    order: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '2',
    authorName: 'Mihai D.',
    avatar: '/reviews/michael-dagonakis-KE4bV4dKlwk-unsplash.jpg',
    rating: 5,
    date: 'acum o lună',
    text: 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas. Acum pot zâmbi fără griji. Mulțumesc Dr. Suciu!',
    isPublished: true,
    isFeatured: false,
    order: 1,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '3',
    authorName: 'Elena P.',
    avatar: '/reviews/caroline-badran-K4Y7oLEpiZU-unsplash.jpg',
    rating: 5,
    date: 'acum 3 săptămâni',
    text: 'Am ales Invisalign și nu regret. Alignerele sunt atât de discrete că prietenii nici nu au observat. Rezultate excelente într-un timp record!',
    isPublished: true,
    isFeatured: false,
    order: 2,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '4',
    authorName: 'Cristian S.',
    avatar: '/reviews/daniel-lincoln-i1N2fzke8OI-unsplash.jpg',
    rating: 5,
    date: 'acum 2 luni',
    text: 'Merită deplasarea de la Ploiești! Am făcut albire și rezultatul a fost imediat vizibil. Prețuri corecte și personal amabil.',
    isPublished: true,
    isFeatured: false,
    order: 3,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '5',
    authorName: 'Maria L.',
    avatar: '/reviews/tanya-prodaan-Mp2Dtg3FRuY-unsplash.jpg',
    rating: 5,
    date: 'acum o săptămână',
    text: 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă. Locul perfect pentru familii!',
    isPublished: true,
    isFeatured: false,
    order: 4,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: '6',
    authorName: 'Adrian K.',
    avatar: '/reviews/vitaliy-shevchenko-djoZc69XK6k-unsplash.jpg',
    rating: 5,
    date: 'acum 3 luni',
    text: 'Deși locuiesc în București, vin aici pentru tratamente complexe. Atmosfera calmă și profesionalismul fac diferența. Cel mai bun dentist din zonă!',
    isPublished: true,
    isFeatured: false,
    order: 5,
    createdAt: '',
    updatedAt: '',
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: supabaseReviews } = usePublicReviews();
  const { googleReviews } = useCMSSettings();
  
  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const cmsReviews: Review[] = useMemo(() => {
    return supabaseReviews.map((r: SupabaseReview, idx: number) => ({
      id: r.id,
      authorName: r.author_name,
      avatar: r.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.author_name)}&background=random&color=fff&size=128`,
      rating: r.rating,
      date: r.date_text || '',
      text: r.content,
      isPublished: r.is_published,
      isFeatured: r.is_featured,
      order: r.order_index ?? idx,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  }, [supabaseReviews]);

  const allReviews = useMemo(() => {
    if (cmsReviews.length > 0) return cmsReviews;
    return defaultReviews;
  }, [cmsReviews]);

  // Create extended array for seamless infinite loop (5 sets for smooth transition)
  const duplicatedReviews = useMemo(() => {
    return [...allReviews, ...allReviews, ...allReviews, ...allReviews, ...allReviews];
  }, [allReviews]);

  const totalReviews = allReviews.length;
  // Start at set 3 (index 12 for 6 reviews) to allow scrolling both directions
  const startIndex = totalReviews * 2;

  // Initialize
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  // Reset current index when itemsPerView changes to prevent visual issues
  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [itemsPerView, startIndex]);

  // Handle seamless loop
  useEffect(() => {
    // If we've scrolled past set 4, jump back to set 2 (same visual position)
    if (currentIndex >= totalReviews * 4) {
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - totalReviews * 2);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 50);
    }
    // If we've scrolled before set 2, jump forward to set 4
    else if (currentIndex < totalReviews) {
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + totalReviews * 2);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 50);
    }
  }, [currentIndex, totalReviews]);

  // Auto-scroll animation with seamless loop
  useEffect(() => {
    if (isPaused || totalReviews <= itemsPerView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPaused, totalReviews, itemsPerView]);

  const handlePrev = useCallback(() => {
    setIsPaused(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleNext = useCallback(() => {
    setIsPaused(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section id="reviews" className="w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-[1.75rem] sm:text-3xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-3 sm:mb-4">
              Ce spun pacienții noștri
            </h2>
            <p className="text-[15px] sm:text-base text-gray-500 max-w-2xl mx-auto px-4 sm:px-0">
              Povești de la oameni care și-au transformat zâmbetul alături de noi.
            </p>
          </div>

          {/* Reviews Grid - Desktop shows 3 cards with content swap animation */}
          <div className="relative">
            {/* Navigation arrows - hidden on mobile */}
            <button
              onClick={handlePrev}
              className="nav-arrow hidden sm:flex absolute -left-3 lg:-left-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-400 hover:text-gray-700 transition-colors active:scale-95"
              aria-label="Recenzia anterioară"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="nav-arrow hidden sm:flex absolute -right-3 lg:-right-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-400 hover:text-gray-700 transition-colors active:scale-95"
              aria-label="Recenzia următoare"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards Container - Carousel with sliding animation */}
            <div 
              className="overflow-hidden touch-pan-x"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                ref={containerRef}
                className="flex"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
                }}
              >
                {duplicatedReviews.map((review, index) => (
                  <div
                    key={`${review.id}-${index}`}
                    className="w-full flex-shrink-0 px-2 sm:px-4"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="review-card bg-white rounded-lg border border-gray-200 p-5 sm:p-6 lg:py-8 h-full">
                      {/* Header - Avatar + Name */}
                      <div className="flex items-center gap-3 mb-5">
                        <img
                          src={review.avatar}
                          alt={review.authorName}
                          className="review-avatar w-12 h-12 rounded-full object-cover flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="reviewer-name font-medium text-gray-900 truncate">
                            {review.authorName}
                          </p>
                          <p className="text-xs text-gray-400">{review.date}</p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-200'
                              }`}
                          />
                        ))}
                      </div>

                      {/* Review text - no truncation on mobile */}
                      <p className="review-text text-gray-600 leading-7 text-sm sm:line-clamp-4">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* Google Reviews Link */}
          <div className="text-center mt-10 sm:mt-12">
            <a
              href={googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 min-h-[44px]"
            >
              {/* Google G icon */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-medium">{googleReviews.rating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-gray-400">·</span>
              <span>{googleReviews.reviewCount} recenzii Google</span>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
