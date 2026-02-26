import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import type { BeforeAfterCase } from '../../admin/types';
import { usePublicBeforeAfter } from '../../hooks/useSupabaseData';

const defaultCases: BeforeAfterCase[] = [
  {
    id: 'default-1',
    title: 'Fatete ceramice',
    description: 'Refacere estetica naturala pentru dinti uzati sau fracturati.',
    beforeImage: '',
    afterImage: '',
    duration: 'Plan personalizat',
    testimonial: '',
    patientName: '',
    serviceType: 'Estetica dentara',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'default-2',
    title: 'Albire profesionala',
    description: 'Rezultate vizibile, cu nuanta potrivita fizionomiei pacientului.',
    beforeImage: '',
    afterImage: '',
    duration: 'Sedinta in clinica',
    testimonial: '',
    patientName: '',
    serviceType: 'Albire',
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getPlaceholder = (type: 'before' | 'after', title: string) => {
  const background = type === 'before' ? 'edf2f7' : 'f8fafc';
  const accent = type === 'before' ? '64748b' : '123455';
  const label = type === 'before' ? 'Inainte' : 'Dupa';

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#${background}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(#g)"/>
      <circle cx="300" cy="180" r="54" fill="#ffffff" opacity="0.75"/>
      <text x="300" y="178" dominant-baseline="middle" text-anchor="middle" fill="#${accent}" font-size="20" font-family="Arial, sans-serif" font-weight="700">${label}</text>
      <text x="300" y="232" dominant-baseline="middle" text-anchor="middle" fill="#${accent}" font-size="14" font-family="Arial, sans-serif" opacity="0.75">${title}</text>
    </svg>`
  )}`;
};

export function MobileBeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: supabaseCases } = usePublicBeforeAfter();
  const touchStartX = useRef(0);

  const displayCases = useMemo(() => {
    if (supabaseCases.length > 0) {
      return supabaseCases
        .filter((item) => item.is_active)
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
        .map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description || 'Transformare realizata cu un plan personalizat.',
          beforeImage: item.before_image_url,
          afterImage: item.after_image_url,
          duration: '',
          testimonial: '',
          patientName: '',
          serviceType: item.category || 'Tratament complex',
          order: item.order_index ?? 0,
          isActive: item.is_active,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
    }

    return defaultCases;
  }, [supabaseCases]);

  useEffect(() => {
    if (currentIndex >= displayCases.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, displayCases.length]);

  const goTo = (index: number) => {
    const count = displayCases.length;
    if (!count) return;
    setCurrentIndex((index + count) % count);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (displayCases.length <= 1) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const distance = touchStartX.current - touchEndX;

    if (distance > 40) {
      goTo(currentIndex + 1);
    } else if (distance < -40) {
      goTo(currentIndex - 1);
    }
  };

  return (
    <section id="transformari" className="mobile-safe-x py-4">
      <div className="mx-auto max-w-[560px]">
        <div className="mobile-panel overflow-hidden p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="mobile-kicker">Cazuri reale</p>
              <h2 className="mobile-title mt-1 text-[23px]">
                Transformari naturale
              </h2>
              <p className="mobile-body mt-1 text-[13px]">
                Exemple reale, gandite estetic si functional. Fiecare caz are ritmul lui.
              </p>
            </div>

            <p className="mobile-muted-chip shrink-0">
              Swipe
            </p>
          </div>

          <div
            className="overflow-hidden rounded-[18px] border border-[rgba(18,24,38,0.08)] bg-[#f7f5f0]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="mobile-carousel-track flex"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {displayCases.map((caseItem) => (
                <div key={caseItem.id} className="w-full shrink-0 p-3">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[rgba(23,56,81,0.14)] bg-[#e8edf3] px-2.5 py-1 text-[11px] font-medium text-[#173851]">
                      {caseItem.serviceType || 'Tratament'}
                    </span>
                    <span className="rounded-full border border-[rgba(18,24,38,0.08)] bg-white/80 px-2.5 py-1 text-[11px] text-slate-600">
                      Rezultat personalizat
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="overflow-hidden rounded-[16px] border border-[rgba(18,24,38,0.08)] bg-white">
                      <div className="border-b border-[rgba(18,24,38,0.07)] bg-[#f4efe7] px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Inainte</p>
                      </div>
                      <div className="aspect-[16/10] bg-slate-100">
                        <img
                          src={caseItem.beforeImage || getPlaceholder('before', caseItem.title)}
                          alt={`Inainte - ${caseItem.title}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[16px] border border-[rgba(18,24,38,0.08)] bg-white">
                      <div className="border-b border-[rgba(18,24,38,0.07)] bg-[#eaf0f5] px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#173851]">Dupa</p>
                      </div>
                      <div className="aspect-[16/10] bg-slate-100">
                        <img
                          src={caseItem.afterImage || getPlaceholder('after', caseItem.title)}
                          alt={`Dupa - ${caseItem.title}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[14px] border border-[rgba(18,24,38,0.07)] bg-white/75 p-3">
                    <h3 className="text-[16px] font-semibold text-slate-900">{caseItem.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{caseItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <div className="mobile-scrollbar-hide mobile-dot-nav overflow-x-auto">
              {displayCases.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  data-active={index === currentIndex ? 'true' : 'false'}
                  aria-label={`Cazul ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
