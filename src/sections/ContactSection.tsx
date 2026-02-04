import { useState } from 'react';
import { Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlmLFfxYhvS_6MRgeY1_hIG6jCgMX5ygOalhlpa6RxjVl3AZtPYc50ihpC6TmHMKDO5w/exec';

const services = [
  'Consultație gratuită',
  'Implant dentar',
  'Albire dentară',
  'Fațete dentare',
  'Ortodonție / Invisalign',
  'Coroane dentare',
  'Proteză dentară',
  'Tratament carie',
  'Alt serviciu',
];

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', service: '', message: '' });
      }, 5000);
    } catch {
      alert('Eroare la trimitere');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-navy-soft rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-teal-soft rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="category-pill mb-4">PROGRAMARE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-navy mb-4">
              Începe transformarea <span className="text-medical-teal">acum</span>
            </h2>
            <p className="text-medical-gray max-w-2xl mx-auto text-lg">
              Completează formularul și îți răspundem în maxim 30 de minute. 
              Prima consultație este <strong className="text-medical-teal">gratuită</strong>!
            </p>
          </div>

          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <a 
              href="tel:+40770220110" 
              className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-md border border-medical-warm hover:shadow-lg hover:border-medical-teal transition-all group"
            >
              <div className="w-10 h-10 rounded-full icon-teal flex items-center justify-center group-hover:bg-medical-teal transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-medical-gray uppercase tracking-wider">Telefon</p>
                <p className="font-semibold text-medical-navy">0770 220 110</p>
              </div>
            </a>

            <a 
              href="https://maps.google.com/?q=Calea+Domnească+234+Târgoviște"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-md border border-medical-warm hover:shadow-lg hover:border-medical-teal transition-all group"
            >
              <div className="w-10 h-10 rounded-full icon-navy flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-medical-gray uppercase tracking-wider">Adresă</p>
                <p className="font-semibold text-medical-navy">Calea Domnească 234</p>
              </div>
            </a>

            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-md border border-medical-warm">
              <div className="w-10 h-10 rounded-full icon-teal flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs text-medical-gray uppercase tracking-wider">Program</p>
                <p className="font-semibold text-medical-navy">L-J: 9-18 | V: 9-15</p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-medical-navy/5 border border-medical-warm overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[550px]">
              {/* Left - Map */}
              <div className="relative h-64 lg:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.745365495854!2d25.4493!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sCalea%20Domneasc%C4%83%20234%2C%20T%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro!4v1640000000000!5m2!1sro!2sro"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Doctor Suciu Dental Clinic - Calea Domnească 234, Târgoviște"
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none hidden lg:block" />
              </div>

              {/* Right - Form */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-medical-teal-soft flex items-center justify-center mb-4">
                      <CheckCircle className="w-10 h-10 text-medical-teal" />
                    </div>
                    <h3 className="font-bold text-2xl mb-2 text-medical-navy">Mulțumim!</h3>
                    <p className="text-medical-gray">Te contactăm în maxim 30 de minute.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-medical-navy mb-2">
                          Numele tău <span className="text-medical-coral">*</span>
                        </label>
                        <Input
                          name="name"
                          placeholder="Ex: Maria Popescu"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          disabled={isLoading}
                          className="h-12 bg-medical-sand border-medical-warm focus:bg-white focus:border-medical-teal transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-medical-navy mb-2">
                          Telefon <span className="text-medical-coral">*</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Ex: 0770 220 110"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          disabled={isLoading}
                          className="h-12 bg-medical-sand border-medical-warm focus:bg-white focus:border-medical-teal transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-medical-navy mb-2">
                        Ce serviciu te interesează?
                      </label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="h-12 bg-medical-sand border-medical-warm focus:bg-white">
                          <SelectValue placeholder="Alege un serviciu din listă..." />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-medical-navy mb-2">
                        Mesajul tău (opțional)
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Spune-ne pe scurt ce te preocupă sau ce dorești să afli..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        disabled={isLoading}
                        className="bg-medical-sand border-medical-warm focus:bg-white focus:border-medical-teal transition-colors resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {isLoading ? 'Se trimite...' : 'PROGRAMEAZĂ CONSULTAȚIA GRATUITĂ'}
                    </button>

                    <div className="flex items-center justify-center gap-6 pt-2 text-xs text-medical-gray">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-medical-teal" />
                        Răspuns în 30 min
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-medical-teal" />
                        Consultație gratuită
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-medical-teal" />
                        Fără obligații
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
