import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: '/clinic-reception.jpg',
    alt: 'Recepție clinică stomatologică',
    title: 'Recepție',
  },
  {
    src: '/clinic-chair.jpg',
    alt: 'Scaun stomatologic modern',
    title: 'Cabinet tratament',
  },
  {
    src: '/clinic-equipment.jpg',
    alt: 'Echipament stomatologic modern',
    title: 'Tehnologie',
  },
  {
    src: '/clinic-waiting.jpg',
    alt: 'Zonă de așteptare',
    title: 'Zonă așteptare',
  },
  {
    src: '/clinic-sterilization.jpg',
    alt: 'Zonă sterilizare',
    title: 'Sterilizare',
  },
  {
    src: '/clinic-xray.jpg',
    alt: 'Echipament radiografie',
    title: 'Radiografie digitală',
  },
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
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section id="clinica" className="relative w-full py-24 overflow-hidden bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-14 h-px bg-[#1e3a5f]"></div>
              <span className="text-sm font-semibold tracking-[0.2em] text-[#1e3a5f] uppercase">
                Clinica Noastră
              </span>
              <div className="w-14 h-px bg-[#1e3a5f]"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Modern, curat, primitor
            </h2>

            <p className="text-lg text-[#64748b] max-w-3xl mx-auto whitespace-nowrap">
              Un spațiu real, creat pentru siguranța și confortul tău. Fără poze stock.
            </p>
          </div>

          {/* Gallery - Creative Asymmetric Layout */}
          <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[500px] lg:h-[600px]">
            {/* Main large image - left */}
            <button
              onClick={() => openLightbox(0)}
              className="group relative overflow-hidden rounded-2xl col-span-12 lg:col-span-6 row-span-2"
            >
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/faq-clinic.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-lg">{galleryImages[0].title}</p>
                <p className="text-white/70 text-sm mt-1">Click pentru a vedea</p>
              </div>
            </button>

            {/* Top right - 2 images */}
            <button
              onClick={() => openLightbox(1)}
              className="group relative overflow-hidden rounded-2xl col-span-6 lg:col-span-3"
            >
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/faq-clinic.png';
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">{galleryImages[1].title}</span>
              </div>
            </button>

            <button
              onClick={() => openLightbox(2)}
              className="group relative overflow-hidden rounded-2xl col-span-6 lg:col-span-3"
            >
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/faq-clinic.png';
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">{galleryImages[2].title}</span>
              </div>
            </button>

            {/* Bottom right - 3 smaller images */}
            <button
              onClick={() => openLightbox(3)}
              className="group relative overflow-hidden rounded-2xl col-span-4 lg:col-span-2"
            >
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/faq-clinic.png';
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium text-center px-2">{galleryImages[3].title}</span>
              </div>
            </button>

            <button
              onClick={() => openLightbox(4)}
              className="group relative overflow-hidden rounded-2xl col-span-4 lg:col-span-2"
            >
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/faq-clinic.png';
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium text-center px-2">{galleryImages[4].title}</span>
              </div>
            </button>

            <button
              onClick={() => openLightbox(5)}
              className="group relative overflow-hidden rounded-2xl col-span-4 lg:col-span-2"
            >
              <img
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/faq-clinic.png';
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium text-center px-2">{galleryImages[5].title}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <img
            src={galleryImages[currentImage].src}
            alt={galleryImages[currentImage].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/faq-clinic.png';
            }}
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="font-medium">{galleryImages[currentImage].title}</p>
            <p className="text-sm text-white/60 mt-1">
              {currentImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicGallery;
