import { useState } from 'react';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzlmLFfxYhvS_6MRgeY1_hIG6jCgMX5ygOalhlpa6RxjVl3AZtPYc50ihpC6TmHMKDO5w/exec';

const services = [
  'Implant dentar',
  'Albire dentara',
  'Fatete dentare',
  'Ortodontie / Invisalign',
  'Coroane dentare',
  'Proteza dentara',
  'Tratament carie',
  'Alt serviciu',
];

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

export function MobileContact() {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/contact';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.replace(/\s+/g, '');

    if (cleanName.length < 2) {
      alert('Te rugam sa completezi numele.');
      return;
    }

    if (!/^[0-9+]{8,15}$/.test(cleanPhone)) {
      alert('Te rugam sa introduci un numar de telefon valid.');
      return;
    }

    setIsLoading(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ ...formData, name: cleanName, phone: cleanPhone }),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      });

      setIsSubmitted(true);
      window.setTimeout(() => {
        setIsSubmitted(false);
        setFormData(initialFormData);
      }, 5000);
    } catch {
      alert('A aparut o eroare la trimitere. Incearca din nou sau suna-ne direct.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-6"
      style={{ 
        paddingTop: isStandalonePage ? 'calc(env(safe-area-inset-top) + 80px)' : '24px',
        scrollMarginTop: '88px'
      }}
    >
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Hai să ne cunoaștem</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Spune-ne ce te preocupă și îți răspundem rapid.
          </p>
        </div>

        {/* Formular - primul */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-[18px] font-semibold text-slate-900">Mesaj trimis</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                Mulțumim! Revenim în cel mai scurt timp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="contact-name">
                  Nume *
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Ex: Maria Popescu"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-xl border-slate-200 bg-white px-4"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="contact-phone">
                    Telefon *
                  </label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Ex: 0770 220 110"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                    disabled={isLoading}
                    className="h-12 rounded-xl border-slate-200 bg-white px-4"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="contact-email">
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Ex: maria@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={isLoading}
                    className="h-12 rounded-xl border-slate-200 bg-white px-4"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
                  Serviciu (opțional)
                </label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white px-4">
                    <SelectValue placeholder="Ce te interesează?" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="contact-message">
                  Mesaj
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Spune-ne pe scurt ce te preocupă..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  disabled={isLoading}
                  className="resize-none rounded-xl border-slate-200 bg-white px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0B1E32] text-white text-[15px] font-semibold transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isLoading ? 'Se trimite...' : 'Trimite mesajul'}
              </button>

              <p className="text-center text-[12px] text-slate-500">
                Dacă e urgent, sună-ne direct pentru răspuns mai rapid.
              </p>
            </form>
          )}
        </div>

        {/* Hartă Google Maps -->
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.745365495854!2d25.4493!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sCalea%20Domneasc%C4%83%20234%2C%20T%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro!4v1640000000000!5m2!1sro!2sro"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Doctor Suciu Dental Clinic - Harta"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
