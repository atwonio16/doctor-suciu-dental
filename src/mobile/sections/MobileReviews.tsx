import { useMemo, useRef, useState, type TouchEvent } from 'react';
import { ExternalLink, Quote, Star } from 'lucide-react';
import type { Review } from '../../admin/types';
import { usePublicReviews } from '../../hooks/useSupabaseData';
import { useCMSSettings } from '../../hooks/useCMSSettings';

const defaultReviews: Review[] = [
  {
    id: '1',
    authorName: 'Andreea M.',
    avatar: '/reviews/brooke-balentine-7LuPlRljfmM-unsplash.jpg',
    rating: 5,
    date: 'acum 2 săptămâni',
    text: 'Am venit cu emoții și am plecat mult mai relaxată. Totul a fost explicat clar, iar echipa a avut multă răbdare.',
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
    text: 'Tratamentul a fost bine planificat și comunicat pas cu pas. Profesionalism și atmosferă calmă.',
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
    text: 'Mi-a plăcut atenția la detalii și faptul că rezultatul a rămas natural. Recomand cu încredere.',
    isPublished: true,
    isFeatured: false,
    order: 2,
    createdAt: '',
    updatedAt: '',
  },
];

export function MobileReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: supabaseReviews } = usePublicReviews();
  const { googleReviews } = useCMSSettings();
  const touchStartX = useRef(0);

  const reviews = useMemo(() => {
    if (supabaseReviews.length > 0) {
      return supabaseReviews.map((review) => ({
        id: review.id,
        authorName: review.author_name,
        avatar:
          review.avatar_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=123455&color=ffffff&size=128`,
        rating: review.rating,
        date: review.date_text || 'recenzie verificată',
        text: review.content,
        isPublished: review.is_published,
        isFeatured: review.is_featured,
        order: review.order_index ?? 0,
        createdAt: review.created_at,
        updatedAt: review.updated_at,
      }));
    }
    return defaultReviews;
  }, [supabaseReviews]);

  const goTo = (index: number) => {
    const count = reviews.length;
    if (!count) return;
    setCurrentIndex((index + count) % count);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (reviews.length <= 1) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const distance = touchStartX.current - touchEndX;

    if (distance > 40) goTo(currentIndex + 1);
    if (distance < -40) goTo(currentIndex - 1);
  };

  return (
    <section id="reviews" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Ce spun pacienții</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Experiențe reale de la oameni care ne-au trecut pragul.
          </p>
        </div>

        {/* Google Reviews Card */}
        <a
          href={googleReviews.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all active:scale-[0.98]"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Google Reviews</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[18px] font-bold text-[#0B1E32]">{googleReviews.rating.toFixed(1)}</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-[13px] text-slate-500">{googleReviews.reviewCount} recenzii</span>
            </div>
          </div>
          <ExternalLink className="h-5 w-5 shrink-0 text-slate-400" />
        </a>

        {/* Reviews Carousel - optimizat */}
        <div
          className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex will-change-transform"
            style={{ 
              transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
              transition: 'transform 300ms ease-out'
            }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full shrink-0 p-4">
                <article>
                  {/* Author */}
                  <div className="mb-3 flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.authorName}
                      className="h-11 w-11 shrink-0 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold text-slate-900">{review.authorName}</p>
                      <p className="text-[12px] text-slate-500">{review.date}</p>
                    </div>
                    <Quote className="h-5 w-5 shrink-0 text-slate-300" />
                  </div>

                  {/* Rating */}
                  <div className="mb-3 flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-[14px] leading-relaxed text-slate-700">"{review.text}"</p>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Bullets Navigation - 6x6px perfect circles */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              style={{ width: '6px', height: '6px' }}
              className={`rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-[#0B1E32]' 
                  : 'bg-slate-300'
              }`}
              aria-label={`Recenzia ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
