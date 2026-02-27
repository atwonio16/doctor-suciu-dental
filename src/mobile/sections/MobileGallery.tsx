import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePublicGallery } from '../../hooks/useSupabaseData';
import { SwipeHint } from '../components/SwipeHint';

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

  const openFullscreen = () => {
    setLightboxOpen(true);
  };

  return (
    <section id="clinica" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Un spațiu curat și primitor</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Fotografii reale din clinica noastră.
          </p>
        </div>

        {/* Gallery Carousel - o singură imagine pătrată */}
        {activeImages.length === 0 ? (
          <div className="aspect-square rounded-2xl bg-slate-100" />
        ) : (
          <>
            <div 
              className="relative overflow-hidden rounded-2xl bg-slate-100"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              {/* Imagine pătrată cu carousel */}
              <div
                className="flex will-change-transform"
                style={{ 
                  transform: `translate3d(-${currentImage * 100}%, 0, 0)`,
                  transition: 'transform 300ms ease-out'
                }}
              >
                {activeImages.map((image) => (
                  <div key={image.id} className="w-full shrink-0 aspect-square">
                    <img
                      src={image.image_url}
                      alt={image.title || 'Imagine din clinică'}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              {/* Buton fullscreen în colțul dreapta-sus */}
              <button
                type="button"
                onClick={openFullscreen}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all active:scale-95 hover:bg-black/60"
                aria-label="Vezi imaginea pe tot ecranul"
              >
                <Maximize2 className="h-5 w-5" />
              </button>

              {/* Counter în colțul stânga-sus */}
              <div className="absolute left-3 top-3 z-10 rounded-full bg-black/40 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-sm">
                {currentImage + 1} / {activeImages.length}
              </div>
            </div>

            {/* Swipe Hint */}
            <div className="mt-3">
              <SwipeHint />
            </div>

            {/* Bullets Navigation - cercuri perfecte 6x6px */}
            <div className="mt-3 flex items-center justify-center" style={{ gap: '8px' }}>
              {activeImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`rounded-full transition-colors ${
                    index === currentIndex 
                      ? 'bg-[#0B1E32]' 
                      : 'bg-slate-300'
                  }`}
                  style={{ 
                    width: '6px !important', 
                    height: '6px !important',
                    minWidth: '6px',
                    minHeight: '6px',
                    padding: 0,
                    border: 'none',
                    flexShrink: 0
                  }}
                  aria-label={`Imaginea ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && activeImages.length > 0 && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950"
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-transform active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image cu navigare */}
            <div className="relative flex-1">
              {activeImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => goTo(currentImage - 1)}
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-transform active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <div className="flex h-full items-center justify-center px-4">
                <img
                  src={activeImages[currentImage].image_url}
                  alt={activeImages[currentImage].title || 'Imagine din clinică'}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {activeImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => goTo(currentImage + 1)}
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-transform active:scale-95"
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
