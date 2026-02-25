import { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { usePublicGallery } from '../hooks/useSupabaseData';

// Default images fallback
const defaultImages = [
  { id: '1', src: '/gallery-1.jpg', alt: 'Recepție clinică' },
  { id: '2', src: '/gallery-2.jpg', alt: 'Cabinet stomatologic' },
  { id: '3', src: '/gallery-3.jpg', alt: 'Echipament modern' },
  { id: '4', src: '/gallery-4.jpg', alt: 'Zonă de așteptare' },
  { id: '5', src: '/gallery-5.jpg', alt: 'Tratament' },
  { id: '6', src: '/gallery-6.jpg', alt: 'Consultație' },
];

const ClinicGalleryMobile = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const { data: supabaseGallery } = usePublicGallery();

  const galleryImages = useMemo(() => {
    if (supabaseGallery.length === 0) return defaultImages;
    return supabaseGallery
      .filter(img => img.is_active)
      .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
      .map(img => ({
        id: img.id,
        src: img.image_url,
        alt: img.title,
      }));
  }, [supabaseGallery]);

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Layout: 1 large + 2 medium + 3 small
  const largeImage = galleryImages[0];
  const mediumImages = galleryImages.slice(1, 3);
  const smallImages = galleryImages.slice(3, 6);

  return (
    <section className="py-12 bg-white lg:hidden">
      {/* Header */}
      <div className="px-5 mb-6">
        <h2 className="text-2xl font-bold text-black">
          Modern, curat, primitor
        </h2>
        <p className="text-[#64748b] mt-1">
          Clinica noastră din Târgoviște
        </p>
      </div>

      {/* Gallery Layout */}
      <div className="px-4 space-y-3">
        {/* Large Image */}
        {largeImage && (
          <button
            onClick={() => setSelectedImage(0)}
            className="relative w-full overflow-hidden rounded-xl aspect-[16/10]"
          >
            <img
              src={largeImage.src}
              alt={largeImage.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml,${encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
                    <rect width="400" height="250" fill="#f1f5f9"/>
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-size="14">${largeImage.alt}</text>
                  </svg>`
                )}`;
              }}
            />
          </button>
        )}

        {/* 2 Medium Images */}
        {mediumImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {mediumImages.map((image, idx) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(idx + 1)}
                className="relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,${encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
                        <rect width="200" height="200" fill="#f1f5f9"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-size="12">${image.alt}</text>
                      </svg>`
                    )}`;
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {/* 3 Small Images */}
        {smallImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {smallImages.map((image, idx) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(idx + 3)}
                className="relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,${encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="112" viewBox="0 0 150 112">
                        <rect width="150" height="112" fill="#f1f5f9"/>
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-size="10">${image.alt}</text>
                      </svg>`
                    )}`;
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Navigation */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={galleryImages[selectedImage]?.src}
            alt={galleryImages[selectedImage]?.alt}
            className="max-w-[90%] max-h-[70vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white text-sm">{galleryImages[selectedImage]?.alt}</p>
            <p className="text-white/50 text-xs mt-1">
              {selectedImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicGalleryMobile;
