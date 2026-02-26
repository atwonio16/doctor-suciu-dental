import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
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
    date: 'acum 2 saptamani',
    text: 'Am venit cu emotii si am plecat mult mai relaxata. Totul a fost explicat clar, iar echipa a avut multa rabdare.',
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
    date: 'acum o luna',
    text: 'Tratamentul a fost bine planificat si comunicat pas cu pas. Profesionalism si atmosfera calma.',
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
    date: 'acum 3 saptamani',
    text: 'Mi-a placut atentia la detalii si faptul ca rezultatul a ramas natural. Recomand cu incredere.',
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
        date: review.date_text || 'recenzie verificata',
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

  useEffect(() => {
    if (reviews.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [reviews.length]);

  useEffect(() => {
    if (currentIndex >= reviews.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, reviews.length]);

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
    <section id="reviews" className="mobile-safe-x py-4" aria-labelledby="mobile-reviews-title">
      <div className="mx-auto max-w-[560px]">
        <div className="rounded-[26px] bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123455]">Recenzii</p>
            <h2 id="mobile-reviews-title" className="mt-1 text-[22px] font-semibold tracking-tight text-slate-900">
              Ce spun pacientii
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
              Experiente reale de la oameni care au trecut prin tratamente in clinica noastra.
            </p>
          </div>

          <a
            href={googleReviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-[#eef5fb] px-3 py-3"
          >
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#4b6b8b]">Google Reviews</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[18px] font-semibold text-[#123455]">{googleReviews.rating.toFixed(1)}</span>
                <div className="flex items-center gap-0.5" aria-hidden>
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-[#f5b400] text-[#f5b400]" />
                  ))}
                </div>
                <span className="truncate text-[12px] text-slate-600">{googleReviews.reviewCount} recenzii</span>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 shrink-0 text-[#4b6b8b]" />
          </a>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full shrink-0">
                  <article className="rounded-2xl bg-[#fbfcfe] p-4 shadow-[0_8px_20px_rgba(15,23,42,0.04)]">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.authorName}
                          className="h-11 w-11 shrink-0 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-semibold text-slate-900">{review.authorName}</p>
                          <p className="truncate text-[12px] text-slate-500">{review.date}</p>
                        </div>
                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                        <Quote className="h-4 w-4 text-slate-400" />
                      </span>
                    </div>

                    <div className="mb-3 flex items-center gap-0.5" aria-label={`Scor ${review.rating} din 5`}>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating ? 'fill-[#f5b400] text-[#f5b400]' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-[14px] leading-relaxed text-slate-700">"{review.text}"</p>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="mobile-scrollbar-hide flex items-center gap-1.5 overflow-x-auto pr-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`rounded-full transition-all ${
                    index === currentIndex ? 'h-1.5 w-5 bg-[#123455]' : 'h-1.5 w-1.5 bg-slate-300'
                  }`}
                  aria-label={`Recenzia ${index + 1}`}
                />
              ))}
            </div>
            <span className="text-[12px] text-slate-500">Swipe</span>
          </div>
        </div>
      </div>
    </section>
  );
}
