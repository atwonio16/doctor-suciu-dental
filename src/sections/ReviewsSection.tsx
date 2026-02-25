import { useState, useMemo, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { Review } from '../admin/types';
import { usePublicReviews } from '../hooks/useSupabaseData';
import type { Review as SupabaseReview } from '../lib/supabase';

// Default reviews with real profile images from UI Avatars
const defaultReviews: Review[] = [
  {
    id: '1',
    authorName: 'Andreea M.',
    avatar: 'https://ui-avatars.com/api/?name=Andreea+M&background=0d9488&color=fff&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Mihai+D&background=1e3a5f&color=fff&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Elena+P&background=059669&color=fff&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Cristian+S&background=d97706&color=fff&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Maria+L&background=db2777&color=fff&size=128',
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
    avatar: 'https://ui-avatars.com/api/?name=Adrian+K&background=7c3aed&color=fff&size=128',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: supabaseReviews } = usePublicReviews();

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

  // Create infinite array by tripling the reviews
  const infiniteReviews = useMemo(() => {
    return [...allReviews, ...allReviews, ...allReviews];
  }, [allReviews]);

  const totalSets = 3;
  const itemsPerView = 3;
  const middleSetStart = allReviews.length;

  // Initialize at middle set for smooth infinite scroll
  useEffect(() => {
    setCurrentIndex(middleSetStart);
  }, [middleSetStart]);

  // Auto-rotate every 7 seconds
  useEffect(() => {
    if (isPaused || allReviews.length <= itemsPerView) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // If we're near the end, jump back to start of middle set
        if (next >= allReviews.length * 2 - 2) {
          return middleSetStart;
        }
        return next;
      });
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isPaused, allReviews.length, middleSetStart]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => {
      const next = prev - 1;
      // If we're near the beginning, jump to end of middle set
      if (next < middleSetStart) {
        return allReviews.length * 2 - 3;
      }
      return next;
    });
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => {
      const next = prev + 1;
      // If we're near the end, jump back to start of middle set
      if (next >= allReviews.length * 2 - 2) {
        return middleSetStart;
      }
      return next;
    });
  };

  // Calculate visible reviews based on current index
  const visibleIndices = useMemo(() => {
    return [0, 1, 2].map((offset) => (currentIndex + offset) % infiniteReviews.length);
  }, [currentIndex, infiniteReviews.length]);

  return (
    <section className="w-full py-24 sm:py-28 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
              Ce spun pacienții noștri
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              Povești de la oameni care și-au transformat zâmbetul alături de noi.
            </p>
          </div>

          {/* Reviews Grid - Desktop shows 3 cards with content swap animation */}
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-6 lg:-left-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Recenzia anterioară"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute -right-3 sm:-right-6 lg:-right-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Recenzia următoare"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Cards Container - Grid layout with 3 visible cards */}
            <div 
              ref={containerRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {visibleIndices.map((reviewIndex, position) => {
                const review = infiniteReviews[reviewIndex];
                return (
                  <div
                    key={`${review.id}-${currentIndex}-${position}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 h-[260px] flex flex-col transition-opacity duration-500"
                  >
                    {/* Header - Avatar + Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={review.avatar}
                        alt={review.authorName}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {review.authorName}
                        </p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
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

                    {/* Review text */}
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">
                      "{review.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Google Reviews Link */}
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/search?sa=X&sca_esv=3e8b06acf992d999&rlz=1C1FHFK_enES1096ES1096&sxsrf=ANbL-n7_67OaB8qcRYwA5rO2L62mVrOQng:1770685897789&q=DOCTOR+SUCIU+Dental+Clinic+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {/* Google G icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-medium">5.0</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-gray-400">·</span>
              <span>53 recenzii Google</span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
