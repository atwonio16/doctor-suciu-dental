import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const phoneNumber = '40770220110';
  const message = encodeURIComponent('Bună! Aș dori să fac o programare la Doctor Suciu Dental Clinic.');

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed right-4 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ bottom: 'max(90px, env(safe-area-inset-bottom) + 80px)' }}
    >
      {/* Popover */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden mb-2">
          <div className="bg-[#1e3a5f] p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-[14px]">Discută cu noi</p>
                <p className="text-[11px] text-white/70">Răspundem rapid</p>
              </div>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <a 
              href={`https://wa.me/${phoneNumber}?text=${message}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-[13px]">WhatsApp</p>
                <p className="text-[11px] text-gray-500">Mesaj rapid</p>
              </div>
            </a>

            <a 
              href={`tel:+${phoneNumber}`}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-[13px]">Sună acum</p>
                <p className="text-[11px] text-gray-500">0770 220 110</p>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isOpen ? 'bg-gray-600 rotate-90' : 'bg-[#25D366]'
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <WhatsAppIcon className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
