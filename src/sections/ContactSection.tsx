import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
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
  'Consultație',
  'Implant dentar',
  'Albire dentară',
  'Fațete dentare',
  'Ortodonție / Invisalign',
  'Coroane dentare',
  'Proteză dentară',
  'Alt serviciu',
];

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
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
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      }, 5000);
    } catch {
      alert('Eroare la trimitere');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 overflow-hidden">
      {/* Warm background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-sky-100/30 via-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-100/25 via-cyan-100/20 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-pill mb-4">CONTACT</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Hai să <span className="gradient-text">vorbim</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Programează o consultație sau contactează-ne pentru orice întrebare.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Telefon</p>
                  <a href="tel:+40770220110" className="font-semibold text-slate-900 hover:text-sky-500 transition-colors">
                    0770 220 110
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:contact@doctorsuciu.ro" className="font-semibold text-slate-900 hover:text-sky-500 transition-colors">
                    contact@doctorsuciu.ro
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Adresă</p>
                  <p className="font-semibold text-slate-900">
                    Str. Calea Domnească 234<br />Târgoviște, Dâmbovița
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Program</p>
                  <p className="font-semibold text-slate-900">
                    Luni - Joi: 09:00 - 18:00<br />Vineri: 09:00 - 15:00
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden h-48 bg-slate-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11146.704852654434!2d25.4473!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sT%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Locație clinică"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-slate-100 shadow-sm">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Mulțumim!</h3>
                    <p className="text-slate-600">Te contactăm în curând.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nume *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          disabled={isLoading}
                          className="h-11 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Telefon *</label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          disabled={isLoading}
                          className="h-11 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isLoading}
                        className="h-11 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Serviciu dorit</label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="h-11 bg-white">
                          <SelectValue placeholder="Selectează un serviciu" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mesaj</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        disabled={isLoading}
                        className="bg-white"
                      />
                    </div>

                    <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {isLoading ? 'Se trimite...' : 'TRIMITE CEREREA'}
                    </button>
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
