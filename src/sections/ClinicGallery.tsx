import { useState } from 'react';
import { X, Grid3X3, Maximize2 } from 'lucide-react';

const galleryImages = [
  { src: '/hero_dental_chair.jpg', alt: 'Cabinet modern', category: 'Cabinet' },
  { src: '/technology_equipment.jpg', alt: 'Tehnologie avansată', category: 'Echipamente' },
  { src: '/faq-clinic.png', alt: 'Consultație', category: 'Consultație' },
  { src: '/implant_detail_work.jpg', alt: 'Procedură', category: 'Tratament' },
  { src: '/orthodontic_aligners.jpg', alt: 'Aparate ortodontice', category: 'Ortodonție' },
  { src: '/services_overview_smile.jpg', alt: 'Rezultate', category: 'Rezultate' },
];

const ClinicGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <section id="clinica" className="py-10 bg-white">
      {/* Section Header */}
      <div className="px-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Grid3X3 className="w-5 h-5 text-[#0d9488]" />
          <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
            Clinica noastră
          </span>
        </div>
        <h2 className="text-title-1 text-gray-900">
          Modern, curat, primitor
        </h2>
      </div>

      {/* Masonry-style Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-2">
          {/* Large First Image */}
          <button 
            onClick={() => openLightbox(0)}
            className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden press-effect"
          >
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-white font-semibold text-[15px]">{galleryImages[0].category}</span>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </button>

          {/* Smaller Images */}
          {galleryImages.slice(1, 5).map((image, index) => (
            <button 
              key={index + 1}
              onClick={() => openLightbox(index + 1)}
              className="relative aspect-square rounded-xl overflow-hidden press-effect"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-2 left-2 text-white font-medium text-[12px]">
                {image.category}
              </span>
            </button>
          ))}
        </div>

        {/* View All Button */}
        <button 
          onClick={() => openLightbox(0)}
          className="w-full mt-3 h-[48px] bg-gray-100 rounded-xl flex items-center justify-center gap-2 text-[14px] font-semibold text-gray-700 press-effect"
        >
          <Grid3X3 className="w-4 h-4" />
          Vezi toate fotografiile
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-[14px] font-medium">
              {currentImage + 1} / {galleryImages.length}
            </span>
          </div>

          {/* Image */}
          <div className="h-full flex items-center justify-center p-4">
            <img
              src={galleryImages[currentImage].src}
              alt={galleryImages[currentImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-0 right-0 px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImage(index); }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImage ? 'border-white' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicGallery;
