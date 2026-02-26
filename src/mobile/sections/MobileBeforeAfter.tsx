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
    <section id="transformari" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Transformari naturale</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Exemple reale, gandite estetic si functional.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayCases.map((caseItem) => (
              <div key={caseItem.id} className="w-full shrink-0 p-4">
                {/* Before/After Images */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="overflow-hidden rounded-xl border border-slate-100">
                    <div className="bg-slate-50 px-3 py-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Inainte</p>
                    </div>
                    <div className="aspect-[4/3] bg-slate-100">
                      <img
                        src={caseItem.beforeImage || getPlaceholder('before', caseItem.title)}
                        alt={`Inainte - ${caseItem.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-slate-100">
                    <div className="bg-[#f7fbff] px-3 py-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#0B1E32]">Dupa</p>
                    </div>
                    <div className="aspect-[4/3] bg-slate-100">
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

                {/* Content */}
                <div className="mt-4">
                  {caseItem.serviceType && (
                    <p className="mb-1 text-[12px] font-medium text-[#0B1E32]">{caseItem.serviceType}</p>
                  )}
                  <h3 className="text-[16px] font-semibold text-slate-900">{caseItem.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{caseItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="mt-4 flex items-center justify-center gap-2">
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
