import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    if (displayCases.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayCases.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [displayCases.length]);

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
        <div className="overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-b from-[#f8fbff] to-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123455]">Cazuri reale</p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-tight text-slate-900">
                Transformari naturale
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                Exemple reale, gandite estetic si functional. Fiecare caz are ritmul lui.
              </p>
            </div>

            <p className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-500">
              Swipe
            </p>
          </div>

          <div
            className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {displayCases.map((caseItem) => (
                <div key={caseItem.id} className="w-full shrink-0 p-3">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#d8e7f5] bg-[#eef5fb] px-2.5 py-1 text-[11px] font-medium text-[#123455]">
                      {caseItem.serviceType || 'Tratament'}
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600">
                      Rezultat personalizat
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                      <div className="border-b border-slate-100 px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Inainte</p>
                      </div>
                      <div className="aspect-[16/10]">
                        <img
                          src={caseItem.beforeImage || getPlaceholder('before', caseItem.title)}
                          alt={`Inainte - ${caseItem.title}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                      <div className="border-b border-slate-100 px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#123455]">Dupa</p>
                      </div>
                      <div className="aspect-[16/10]">
                        <img
                          src={caseItem.afterImage || getPlaceholder('after', caseItem.title)}
                          alt={`Dupa - ${caseItem.title}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-[16px] font-semibold text-slate-900">{caseItem.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{caseItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="mobile-scrollbar-hide flex items-center gap-2 overflow-x-auto pr-2">
              {displayCases.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`rounded-full transition-all ${
                    index === currentIndex ? 'h-1.5 w-5 bg-[#123455]' : 'h-1.5 w-1.5 bg-slate-300'
                  }`}
                  aria-label={`Cazul ${index + 1}`}
                />
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 active:scale-[0.98] transition-transform"
            >
              Vreau evaluare
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
