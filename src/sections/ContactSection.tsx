import { useState, useCallback } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlmLFfxYhvS_6MRgeY1_hIG6jCgMX5ygOalhlpa6RxjVl3AZtPYc50ihpC6TmHMKDO5w/exec';

const quickServices = [
  'Implant dentar',
  'Ortodonție / Invisalign',
  'Albire dentară',
  'Consultație generală',
];

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          service: selectedService || 'Consultație generală',
          type: 'quick_contact',
        }),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '' });
        setSelectedService('');
      }, 4000);
    } catch {
      alert('Eroare la trimitere. Încearcă din nou.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, selectedService]);

  if (isSubmitted) {
    return (
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-sm mx-auto text-center">
          <div className="w-20 h-20 bg-[#0d9488]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#0d9488]" />
          </div>
          <h3 className="text-title-1 text-gray-900 mb-2">Mulțumim!</h3>
          <p className="text-body-small text-gray-500">
            Te contactăm în maxim 30 de minute pentru confirmare.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-10 bg-gray-50">
      {/* Section Header */}
      <div className="px-4 mb-6">
        <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
          Programare
        </span>
        <h2 className="text-title-1 text-gray-900 mt-1">
          Hai să ne cunoaștem
        </h2>
        <p className="text-body-small text-gray-500 mt-2">
          Completează formularul și primești un răspuns în 30 de minute
        </p>
      </div>

      {/* Quick Service Selector */}
      <div className="px-4 mb-5">
        <p className="text-[13px] font-medium text-gray-700 mb-3">Ce te interesează?</p>
        <div className="flex flex-wrap gap-2">
          {quickServices.map((service) => (
            <button
              key={service}
              onClick={() => setSelectedService(service === selectedService ? '' : service)}
              className={`px-4 py-2.5 rounded-full text-[13px] font-medium transition-all ${
                selectedService === service
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 space-y-4">
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
            Număr de telefon *
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

        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-mobile-primary mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Se trimite...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Programează consultația
            </>
          )}
        </button>

        <p className="text-center text-[12px] text-gray-400">
          Consultația inițială este gratuită și fără obligații
        </p>
      </form>

      {/* Contact Info Cards */}
      <div className="px-4 mt-8 space-y-3">
        <a 
          href="tel:+40770220110"
          className="flex items-center gap-4 p-4 bg-white rounded-xl press-effect"
        >
          <div className="w-12 h-12 bg-[#0d9488]/10 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-[#0d9488]" />
          </div>
          <div className="flex-1">
            <p className="text-[12px] text-gray-400 mb-0.5">Sună acum</p>
            <p className="font-semibold text-[16px] text-gray-900">0770 220 110</p>
          </div>
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Send className="w-4 h-4 text-gray-600" />
          </div>
        </a>

        <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
          <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-[#1e3a5f]" />
          </div>
          <div className="flex-1">
            <p className="text-[12px] text-gray-400 mb-0.5">Adresă</p>
            <p className="font-semibold text-[15px] text-gray-900">Calea Domnească 234</p>
            <p className="text-[13px] text-gray-500">Târgoviște</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-[12px] text-gray-400 mb-0.5">Program</p>
            <p className="font-semibold text-[15px] text-gray-900">Luni - Joi: 9-18</p>
            <p className="text-[13px] text-gray-500">Vineri: 9-15</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="px-4 mt-6">
        <div className="rounded-2xl overflow-hidden h-[200px] bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.745365495854!2d25.4493!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sCalea%20Domneasc%C4%83%20234%2C%20T%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro!4v1640000000000!5m2!1sro!2sro"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Locație clinică"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
