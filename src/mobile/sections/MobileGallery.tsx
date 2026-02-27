import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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
    <section id="clinica" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Un spatiu curat si primitor</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Fotografii reale din clinica noastra.
          </p>
        </div>

        {/* Gallery Grid */}
        {activeImages.length === 0 ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 aspect-[2/1] rounded-2xl bg-slate-100" />
            <div className="aspect-square rounded-2xl bg-slate-100" />
            <div className="aspect-square rounded-2xl bg-slate-100" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              {activeImages.slice(0, 4).map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className={`relative overflow-hidden rounded-2xl bg-slate-100 active:scale-[0.98] transition-transform ${
                    index === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={image.title || 'Imagine din clinica'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {index === 3 && activeImages.length > 4 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0B1E32]/60">
                      <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[14px] font-semibold text-white">
                        +{activeImages.length - 4} imagini
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="mt-4 flex h-[48px] w-full items-center justify-center rounded-full border border-slate-200 bg-white text-[15px] font-semibold text-slate-900 transition-all active:scale-[0.98] active:bg-slate-50"
            >
              Vezi galeria completa ({activeImages.length} imagini)
            </button>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && activeImages.length > 0 && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/95"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="flex h-full flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 text-white"
              style={{ paddingTop: 'calc(env(safe-area-inset-top) + 16px)' }}
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/60">Galerie</p>
                <p className="text-[15px] font-semibold">
                  {currentImage + 1} / {activeImages.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image */}
            <div className="relative flex-1">
              {activeImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => goTo(currentImage - 1)}
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform active:scale-95"
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
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
              <p className="text-center text-[14px] text-white">
                {activeImages[currentImage].title || 'Doctor Suciu Dental Clinic'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
