import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlmLFfxYhvS_6MRgeY1_hIG6jCgMX5ygOalhlpa6RxjVl3AZtPYc50ihpC6TmHMKDO5w/exec';

const services = [
  'Implant dentar',
  'Ortodonție / Invisalign',
  'Albire dentară',
  'Estetică dentară',
  'Consultație generală',
];

const ContactPage = () => {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    const navState = location.state as { service?: string } | null;
    if (navState?.service) {
      setSelectedService(navState.service);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          service: selectedService || 'Consultație generală',
        }),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      });
      setIsSubmitted(true);
    } catch {
      alert('Eroare la trimitere');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-14 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#0d9488]" />
          </div>
          <h2 className="text-title-1 text-gray-900 mb-2">Mulțumim!</h2>
          <p className="text-body-small text-gray-500 mb-6">
            Te contactăm în maxim 30 de minute pentru confirmare.
          </p>
          <a 
            href="/"
            className="inline-flex items-center justify-center w-full h-[52px] bg-[#1e3a5f] text-white rounded-full font-semibold"
          >
            Înapoi la pagina principală
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* Header */}
      <div className="px-4 py-6 bg-gray-50">
        <h1 className="text-display text-gray-900 mb-2">
          Programează-te
        </h1>
        <p className="text-body-small text-gray-500">
          Consultație gratuită, fără obligații
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="px-4 py-4 space-y-3">
        <a href="tel:+40770220110" className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
          <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-[#0d9488]" />
          </div>
          <div>
            <p className="text-[12px] text-gray-400">Sună acum</p>
            <p className="font-bold text-[17px] text-gray-900">0770 220 110</p>
          </div>
        </a>

        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
          <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-[#1e3a5f]" />
          </div>
          <div>
            <p className="text-[12px] text-gray-400">Adresă</p>
            <p className="font-bold text-[16px] text-gray-900">Calea Domnească 234</p>
            <p className="text-[13px] text-gray-500">Târgoviște</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-[12px] text-gray-400">Program</p>
            <p className="font-bold text-[16px] text-gray-900">L-J: 9-18 | V: 9-15</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6">
        <h2 className="text-title-2 text-gray-900 mb-4">Sau completează formularul</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[13px] font-medium text-gray-700 mb-2 block">
              Numele tău *
            </label>
            <Input
              required
              placeholder="Ex: Maria Popescu"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-mobile"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-gray-700 mb-2 block">
              Telefon *
            </label>
            <Input
              type="tel"
              required
              placeholder="Ex: 0770 220 110"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-mobile"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-gray-700 mb-2 block">
              Serviciu (opțional)
            </label>
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => setSelectedService(service === selectedService ? '' : service)}
                  className={`px-4 py-2.5 rounded-full text-[13px] font-medium transition-all ${
                    selectedService === service
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-mobile-primary mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Se trimite...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Trimite cererea
              </>
            )}
          </button>

          <p className="text-center text-[12px] text-gray-400">
            Te contactăm în maxim 30 de minute
          </p>
        </form>
      </div>

      {/* Map */}
      <div className="px-4 pb-8">
        <div className="rounded-2xl overflow-hidden h-[200px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.745365495854!2d25.4493!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sCalea%20Domneasc%C4%83%20234%2C%20T%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro!4v1640000000000!5m2!1sro!2sro"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
