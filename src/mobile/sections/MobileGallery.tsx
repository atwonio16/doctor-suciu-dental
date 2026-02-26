import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { usePublicGallery } from '../../hooks/useSupabaseData';

export function MobileGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { data: galleryImages } = usePublicGallery();
  const touchStartX = useRef(0);
  const previousBodyOverflow = useRef<string>('');

  const activeImages = useMemo(
    () =>
      galleryImages
        .filter((image) => image.is_active)
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)),
    [galleryImages]
  );

  const visibleGridImages = activeImages.slice(0, 5);

  useEffect(() => {
    if (!lightboxOpen) return;

    previousBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow.current;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (currentImage >= activeImages.length && activeImages.length > 0) {
      setCurrentImage(0);
    }
  }, [activeImages.length, currentImage]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowRight') {
        setCurrentImage((prev) => (activeImages.length ? (prev + 1) % activeImages.length : prev));
      }
      if (event.key === 'ArrowLeft') {
        setCurrentImage((prev) =>
          activeImages.length ? (prev - 1 + activeImages.length) % activeImages.length : prev
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImages.length, lightboxOpen]);

  const openLightbox = (index: number) => {
    if (!activeImages.length) return;
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const goTo = (index: number) => {
    if (!activeImages.length) return;
    setCurrentImage((index + activeImages.length) % activeImages.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (activeImages.length <= 1) return;
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const distance = touchStartX.current - endX;
    if (distance > 40) goTo(currentImage + 1);
    if (distance < -40) goTo(currentImage - 1);
  };

  return (
    <section id="clinica" className="mobile-safe-x py-4" aria-labelledby="mobile-gallery-title">
      <div className="mx-auto max-w-[560px]">
        <div className="rounded-[26px] bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123455]">Clinica</p>
              <h2 id="mobile-gallery-title" className="mt-1 text-[22px] font-semibold tracking-tight text-slate-900">
                Un spatiu curat si primitor
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                Fotografii reale din clinica. Apasa pe imagine pentru vizualizare full screen.
              </p>
            </div>

            {activeImages.length > 0 && (
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-700 active:scale-[0.98] transition-transform"
              >
                <Expand className="h-4 w-4" />
                Deschide
              </button>
            )}
          </div>

          {activeImages.length === 0 ? (
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 row-span-2 aspect-square rounded-2xl bg-slate-100" />
              <div className="aspect-square rounded-2xl bg-slate-100" />
              <div className="aspect-square rounded-2xl bg-slate-100" />
              <div className="col-span-3 h-12 rounded-2xl bg-slate-100" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                {visibleGridImages.map((image, index) => {
                  const layoutClass =
                    index === 0
                      ? 'col-span-2 aspect-[16/10]'
                      : index === 3
                        ? 'col-span-2 aspect-[16/10]'
                        : 'aspect-square';

                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => openLightbox(index)}
                      className={`relative overflow-hidden rounded-2xl bg-slate-100 active:scale-[0.99] transition-transform ${layoutClass}`}
                    >
                      <img
                        src={image.image_url}
                        alt={image.title || 'Imagine din clinica'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />

                      {index === visibleGridImages.length - 1 && activeImages.length > visibleGridImages.length && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50">
                          <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                            +{activeImages.length - visibleGridImages.length} imagini
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openLightbox(0)}
                  className="flex h-11 flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[14px] font-medium text-slate-700 active:scale-[0.985] transition-transform"
                >
                  Vezi galeria completa
                </button>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] text-slate-600">
                  {activeImages.length} imagini
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {lightboxOpen && activeImages.length > 0 && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/95"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie imagini clinica"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="flex h-full flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="mobile-safe-x flex items-center justify-between py-3 text-white"
              style={{ paddingTop: 'calc(env(safe-area-inset-top) + 10px)' }}
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Galerie</p>
                <p className="text-[13px] font-medium">
                  {currentImage + 1} / {activeImages.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white active:scale-[0.96] transition-transform"
                aria-label="Inchide galeria"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1">
              {activeImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => goTo(currentImage - 1)}
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white active:scale-[0.96] transition-transform"
                  aria-label="Imagine anterioara"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <div className="flex h-full items-center justify-center px-4">
                <img
                  src={activeImages[currentImage].image_url}
                  alt={activeImages[currentImage].title || 'Imagine din clinica'}
                  className="max-h-full max-w-full rounded-2xl object-contain"
                />
              </div>

              {activeImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => goTo(currentImage + 1)}
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white active:scale-[0.96] transition-transform"
                  aria-label="Imagine urmatoare"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            <div
              className="mobile-safe-x py-3 text-white"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 14px)' }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
                <p className="text-[13px] font-medium">
                  {activeImages[currentImage].title || 'Doctor Suciu Dental Clinic'}
                </p>
                <p className="mt-0.5 text-[12px] text-white/70">Swipe stanga/dreapta pentru urmatoarea imagine</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
