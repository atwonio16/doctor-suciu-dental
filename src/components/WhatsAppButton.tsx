import { useState } from 'react';
import { MessageCircle, X, Phone, Clock } from 'lucide-react';

// WhatsApp Brand Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = '40770220110';
  const message = encodeURIComponent('Bună! Aș dori să fac o programare la Doctor Suciu Dental Clinic.');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover */}
      <div className={`absolute bottom-16 right-0 w-72 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-200 ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-medical-navy p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Discută cu noi</p>
              <p className="text-xs text-white/80">Răspundem rapid</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-slate-600 mb-4">
            Ai întrebări? Scrie-ne pe WhatsApp.
          </p>

          <div className="space-y-3">
            <a href={`https://wa.me/${phoneNumber}?text=${message}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900">WhatsApp</p>
                <p className="text-xs text-slate-600">Mesaj rapid</p>
              </div>
            </a>

            <a href={`tel:+${phoneNumber}`} className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Sună acum</p>
                <p className="text-xs text-slate-600">0770 220 110</p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
            <Clock className="w-4 h-4 text-slate-600" />
            <p className="text-xs text-slate-600">Program: L-V 09:00-18:00</p>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          isOpen ? 'bg-medical-gray rotate-90' : 'bg-medical-navy hover:bg-medical-navy-dark'
        }`}
        style={{ 
          boxShadow: isOpen ? '0 4px 14px rgba(107, 114, 128, 0.4)' : '0 4px 14px rgba(30, 58, 95, 0.4)'
        }}
        aria-label={isOpen ? 'Închide' : 'Deschide'}>
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>
    </div>
  );
};

export default WhatsAppButton;
