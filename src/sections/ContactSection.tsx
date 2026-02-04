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
    <section id="contact" className="relative w-full py-20 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header - Premium category style */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Programare
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Începe transformarea acum
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              Completează formularul și îți răspundem în maxim 30 de minute. 
              Prima consultație este <strong className="text-[#0891b2]">gratuită</strong>!
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden mb-10">
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
                    <div className="w-20 h-20 rounded-full bg-[#0891b2]/10 flex items-center justify-center mb-4">
                      <CheckCircle className="w-10 h-10 text-[#0891b2]" />
                    </div>
                    <h3 className="font-semibold text-2xl mb-2 text-[#0f172a]">Mulțumim!</h3>
                    <p className="text-[#64748b]">Te contactăm în maxim 30 de minute.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                          Numele tău <span className="text-[#ef4444]">*</span>
                        </label>
                        <Input
                          name="name"
                          placeholder="Ex: Maria Popescu"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          disabled={isLoading}
                          className="h-12 bg-[#f8fafc] border-[#e2e8f0] focus:bg-white focus:border-[#0891b2] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                          Telefon <span className="text-[#ef4444]">*</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Ex: 0770 220 110"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          disabled={isLoading}
                          className="h-12 bg-[#f8fafc] border-[#e2e8f0] focus:bg-white focus:border-[#0891b2] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                        Ce serviciu te interesează?
                      </label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="h-12 bg-[#f8fafc] border-[#e2e8f0] focus:bg-white">
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
                      <label className="block text-sm font-semibold text-[#0f172a] mb-2">
                        Mesajul tău (opțional)
                      </label>
                      <Textarea
                        name="message"
                        placeholder="Spune-ne pe scurt ce te preocupă sau ce dorești să afli..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        disabled={isLoading}
                        className="bg-[#f8fafc] border-[#e2e8f0] focus:bg-white focus:border-[#0891b2] transition-colors resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading} 
                      className="w-full flex items-center justify-center gap-2 py-4 text-base font-semibold px-6 rounded-full transition-all duration-300 bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-transparent hover:text-[#1e3a5f]"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {isLoading ? 'Se trimite...' : 'PROGRAMEAZĂ CONSULTAȚIA GRATUITĂ'}
                    </button>

                    <div className="flex items-center justify-center gap-6 pt-2 text-xs text-[#64748b]">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-[#0891b2]" />
                        Răspuns în 30 min
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-[#0891b2]" />
                        Consultație gratuită
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-[#0891b2]" />
                        Fără obligații
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Quick Info Bar - Sub formular, în ordinea: Program, Adresă, Telefon */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Program */}
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0]">
              <div className="w-10 h-10 rounded-full bg-[#0891b2]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#0891b2]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#64748b] uppercase tracking-wider">Program</p>
                <p className="font-semibold text-[#0f172a]">L-J: 9-18 | V: 9-15</p>
              </div>
            </div>

            {/* Adresă */}
            <a 
              href="https://maps.google.com/?q=Calea+Domnească+234+Târgoviște"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#1e3a5f] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#64748b] uppercase tracking-wider">Adresă</p>
                <p className="font-semibold text-[#0f172a]">Calea Domnească 234</p>
              </div>
            </a>

            {/* Telefon */}
            <a 
              href="tel:+40770220110" 
              className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#1e3a5f] transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#0891b2]/10 flex items-center justify-center group-hover:bg-[#0891b2] transition-colors">
                <Phone className="w-5 h-5 text-[#0891b2] group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-xs text-[#64748b] uppercase tracking-wider">Telefon</p>
                <p className="font-semibold text-[#0f172a]">0770 220 110</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
