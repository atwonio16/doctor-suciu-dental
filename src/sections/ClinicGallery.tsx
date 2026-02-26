import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ImageOff } from 'lucide-react';
import { usePublicGallery } from '../hooks/useSupabaseData';

const ClinicGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const { data: galleryImages, loading } = usePublicGallery();

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Filter active images and sort by order
  const activeImages = galleryImages
    .filter(img => img.is_active)
    .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));

  // Don't show section if no images (and not loading)
  if (!loading && activeImages.length === 0) {
    return (
      <section id="clinica" className="w-full py-16 sm:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="w-12 h-[1px] bg-[#94a3b8]" />
                <span className="text-xs font-semibold tracking-[0.15em] text-[#64748b] uppercase">
                  Clinica Noastră
                </span>
                <span className="w-12 h-[1px] bg-[#94a3b8]" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black mb-4">
                Un spațiu în care te poți relaxa
              </h2>
              <p className="text-base sm:text-lg text-[#64748b] max-w-2xl mx-auto leading-relaxed px-4">
                Am creat un mediu calm și primitor, pentru ca fiecare vizită să fie cât mai confortabilă
              </p>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <ImageOff className="w-16 h-16 mb-4" />
              <p className="text-lg">Nu există imagini în galerie</p>
              <p className="text-sm mt-2">Imaginile vor apărea aici după ce sunt adăugate din admin</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show loading state while data is loading
  if (loading) {
    return (
      <section id="clinica" className="w-full py-16 sm:py-20 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
                Un spațiu în care te poți relaxa
              </h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
                Am creat un mediu calm și primitor, pentru ca fiecare vizită să fie cât mai confortabilă
              </p>
            </div>

            {/* Loading skeleton */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4 lg:h-[500px]">
              <div className="row-span-2 bg-gray-200 rounded-2xl animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 rounded-xl animate-pulse" />
                <div className="bg-gray-200 rounded-xl animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-200 rounded-lg animate-pulse" />
                <div className="bg-gray-200 rounded-lg animate-pulse" />
                <div className="bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
            {/* Mobile loading skeleton */}
            <div className="lg:hidden space-y-3">
              <div className="h-[200px] sm:h-[300px] bg-gray-200 rounded-2xl animate-pulse" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-[150px] sm:h-[200px] bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-[150px] sm:h-[200px] bg-gray-200 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const img = (i: number) => activeImages[i];

  return (
    <section id="clinica" className="w-full py-16 sm:py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
              Un spațiu în care te poți relaxa
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
              Am creat un mediu calm și primitor, pentru ca fiecare vizită să fie cât mai confortabilă
            </p>
          </div>

          {/* Layout: 1 large left + 5 right (2 top + 3 bottom) */}
          {activeImages.length >= 6 ? (
            <>
            {/* Mobile layout - stacked */}
            <div className="gallery-grid lg:hidden space-y-3">
              <button
                onClick={() => openLightbox(0)}
                className="group relative w-full aspect-[16/10] overflow-hidden rounded-xl block"
              >
                <img 
                  src={img(0).image_url} 
                  alt={img(0).title} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => openLightbox(1)}
                  className="group relative aspect-square overflow-hidden rounded-lg block"
                >
                  <img src={img(1).image_url} alt={img(1).title} className="w-full h-full object-cover" loading="lazy" />
                </button>
                <button
                  onClick={() => openLightbox(2)}
                  className="group relative aspect-square overflow-hidden rounded-lg block"
                >
                  <img src={img(2).image_url} alt={img(2).title} className="w-full h-full object-cover" loading="lazy" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => openLightbox(3)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg block"
                >
                  <img src={img(3).image_url} alt={img(3).title} className="w-full h-full object-cover" loading="lazy" />
                </button>
                <button
                  onClick={() => openLightbox(4)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg block"
                >
                  <img src={img(4).image_url} alt={img(4).title} className="w-full h-full object-cover" loading="lazy" />
                </button>
                <button
                  onClick={() => openLightbox(5)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg block"
                >
                  <img src={img(5).image_url} alt={img(5).title} className="w-full h-full object-cover" loading="lazy" />
                </button>
              </div>
            </div>
            {/* Desktop layout */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4 lg:h-[500px]">
              {/* Left - Large Image (spans 2 rows) */}
              <button
                onClick={() => openLightbox(0)}
                className="group relative row-span-2 overflow-hidden rounded-2xl block"
              >
                <img 
                  src={img(0).image_url} 
                  alt={img(0).title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-white" />
                </div>
              </button>

              {/* Top right - 2 images */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => openLightbox(1)}
                  className="group relative overflow-hidden rounded-xl block"
                >
                  <img 
                    src={img(1).image_url} 
                    alt={img(1).title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </button>
                <button
                  onClick={() => openLightbox(2)}
                  className="group relative overflow-hidden rounded-xl block"
                >
                  <img 
                    src={img(2).image_url} 
                    alt={img(2).title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </button>
              </div>

              {/* Bottom right - 3 images */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => openLightbox(3)}
                  className="group relative overflow-hidden rounded-lg block"
                >
                  <img 
                    src={img(3).image_url} 
                    alt={img(3).title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </button>
                <button
                  onClick={() => openLightbox(4)}
                  className="group relative overflow-hidden rounded-lg block"
                >
                  <img 
                    src={img(4).image_url} 
                    alt={img(4).title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </button>
                <button
                  onClick={() => openLightbox(5)}
                  className="group relative overflow-hidden rounded-lg block"
                >
                  <img 
                    src={img(5).image_url} 
                    alt={img(5).title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </button>
              </div>
            </div>
            </>
          ) : (
            // Simple grid for less than 6 images
            <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {activeImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square overflow-hidden rounded-xl block"
                >
                  <img 
                    src={image.image_url} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && activeImages[currentImage] && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" 
          onClick={closeLightbox}
        >
          <button 
            onClick={closeLightbox} 
            className="lightbox-close absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); prevImage(); }} 
            className="lightbox-nav absolute left-4 sm:left-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextImage(); }} 
            className="lightbox-nav absolute right-4 sm:right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img 
            src={activeImages[currentImage].image_url} 
            alt={activeImages[currentImage].title} 
            className="max-w-[90vw] max-h-[80vh] sm:max-h-[85vh] object-contain rounded-lg" 
          />
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-sm text-white/60">{currentImage + 1} / {activeImages.length}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicGallery;
