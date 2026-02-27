import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import type { BeforeAfterCase } from '../../admin/types';
import { usePublicBeforeAfter } from '../../hooks/useSupabaseData';

const defaultCases: BeforeAfterCase[] = [
  {
    id: 'default-1',
    title: 'Fațete ceramice',
    description: 'Refacere estetică naturală pentru dinți uzati sau fracturați.',
    beforeImage: '',
    afterImage: '',
    duration: 'Plan personalizat',
    testimonial: '',
    patientName: '',
    serviceType: 'Estetică dentară',
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'default-2',
    title: 'Albire profesională',
    description: 'Rezultate vizibile, cu nuanța potrivită fizionomiei pacientului.',
    beforeImage: '',
    afterImage: '',
    duration: 'Sedinta în clinică',
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
  const label = type === 'before' ? 'Înainte' : 'După';

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
          description: item.description || 'Transformare realizată cu un plan personalizat.',
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
    <section id="transformari" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Transformări naturale</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Exemple reale, gândite estetic și funcțional.
          </p>
        </div>

        {/* Carousel - fără card */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayCases.map((caseItem) => (
              <div key={caseItem.id} className="w-full shrink-0">
                {/* Before/After Images - fără card, badge fine */}
                <div className="space-y-2">
                  {/* Before */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="aspect-[16/10] bg-slate-100">
                      <img
                        src={caseItem.beforeImage || getPlaceholder('before', caseItem.title)}
                        alt={`Înainte - ${caseItem.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Badge fin - text alb pe navy */}
                    <div className="absolute left-3 top-3 rounded-md bg-[#0B1E32]/90 px-2.5 py-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white">Înainte</p>
                    </div>
                  </div>

                  {/* After */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="aspect-[16/10] bg-slate-100">
                      <img
                        src={caseItem.afterImage || getPlaceholder('after', caseItem.title)}
                        alt={`După - ${caseItem.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Badge fin - text alb pe navy */}
                    <div className="absolute left-3 top-3 rounded-md bg-[#0B1E32]/90 px-2.5 py-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-white">După</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-[16px] font-semibold text-slate-900">{caseItem.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{caseItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {displayCases.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-6 bg-[#0B1E32]' 
                  : 'w-2 bg-slate-300'
              }`}
              aria-label={`Cazul ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
