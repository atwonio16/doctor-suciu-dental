import { useState } from 'react';
import { MessageCircle, X, Phone, Clock } from 'lucide-react';

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
        <div className="bg-slate-900 p-4">
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
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
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
          isOpen ? 'bg-slate-500 rotate-90' : 'bg-sky-500 hover:bg-sky-600'
        }`}
        aria-label={isOpen ? 'Închide' : 'Deschide'}>
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>
    </div>
  );
};

export default WhatsAppButton;
