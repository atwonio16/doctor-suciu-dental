import { useState } from 'react';
import { Clock, Loader2, MapPin, Phone, Send, CheckCircle, MessageCircle } from 'lucide-react';
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
      className="mobile-safe-x pb-4"
      style={{ paddingTop: isStandalonePage ? 'calc(env(safe-area-inset-top) + 86px)' : '16px' }}
      aria-labelledby="mobile-contact-title"
    >
      <div className="mx-auto max-w-[560px] space-y-4">
        <div className="rounded-[28px] border border-white/80 bg-gradient-to-b from-white to-[#f5f8fc] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123455]">Contact</p>
          <h2 id="mobile-contact-title" className="mt-1 text-[22px] font-semibold tracking-tight text-slate-900">
            Hai sa ne cunoastem
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Spune-ne ce te preocupa si iti raspundem cat mai repede, fara obligatii.
          </p>

          <div className="mt-4 grid gap-2">
            <a
              href="tel:+40770220110"
              className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-3 active:scale-[0.99] transition-transform"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef5fb] text-[#123455]">
                <Phone className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.14em] text-slate-500">Programari</span>
                <span className="block text-[15px] font-semibold text-slate-900">0770 220 110</span>
              </span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://maps.google.com/?q=Calea+Domneasca+234+Targoviste"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[76px] flex-col items-start justify-center rounded-2xl border border-slate-100 bg-white px-3 py-3"
              >
                <MapPin className="mb-2 h-4 w-4 text-[#123455]" />
                <span className="text-[13px] font-medium text-slate-900">Calea Domneasca 234</span>
                <span className="text-[12px] text-slate-500">Targoviste</span>
              </a>

              <div className="flex min-h-[76px] flex-col items-start justify-center rounded-2xl border border-slate-100 bg-white px-3 py-3">
                <Clock className="mb-2 h-4 w-4 text-[#0f6e8a]" />
                <span className="text-[13px] font-medium text-slate-900">Program</span>
                <span className="text-[12px] text-slate-500">L-J: 9-18 | V: 9-15</span>
              </div>
            </div>

            <a
              href="https://wa.me/40770220110"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#c9f1d7] bg-[#ecfbf2] text-[13px] font-semibold text-[#0f6e3b]"
            >
              <MessageCircle className="h-4 w-4" />
              Scrie pe WhatsApp
            </a>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/80 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          {isSubmitted ? (
            <div className="py-8 text-center" aria-live="polite">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ecfbf2]">
                <CheckCircle className="h-8 w-8 text-[#0f6e3b]" />
              </div>
              <h3 className="text-[18px] font-semibold text-slate-900">Mesaj trimis</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                Multumim! Revenim in cel mai scurt timp, de obicei in aceeasi zi.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="mobile-contact-name">
                  Nume *
                </label>
                <Input
                  id="mobile-contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="Ex: Maria Popescu"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  required
                  disabled={isLoading}
                  className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="mobile-contact-phone">
                    Telefon *
                  </label>
                  <Input
                    id="mobile-contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Ex: 0770 220 110"
                    value={formData.phone}
                    onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                    required
                    disabled={isLoading}
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="mobile-contact-email">
                    Email
                  </label>
                  <Input
                    id="mobile-contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Ex: maria@email.com"
                    value={formData.email}
                    onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                    disabled={isLoading}
                    className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
                  Serviciu (optional)
                </label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
                  disabled={isLoading}
                >
                  <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4">
                    <SelectValue placeholder="Ce te intereseaza?" />
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
                <label className="mb-1.5 block text-[13px] font-semibold text-slate-700" htmlFor="mobile-contact-message">
                  Mesaj
                </label>
                <Textarea
                  id="mobile-contact-message"
                  name="message"
                  placeholder="Spune-ne pe scurt ce te preocupa..."
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  rows={4}
                  disabled={isLoading}
                  className="resize-none rounded-2xl border-slate-200 bg-slate-50 px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123455] px-4 text-[15px] font-semibold text-white shadow-[0_10px_22px_rgba(18,52,85,0.2)] active:scale-[0.985] transition-transform disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {isLoading ? 'Se trimite...' : 'Trimite mesajul'}
              </button>

              <p className="text-center text-[12px] text-slate-500">
                Daca e urgent, suna-ne direct pentru raspuns mai rapid.
              </p>
            </form>
          )}
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white p-2 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.745365495854!2d25.4493!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sCalea%20Domneasc%C4%83%20234%2C%20T%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro!4v1640000000000!5m2!1sro!2sro"
              width="100%"
              height="240"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Doctor Suciu Dental Clinic - Harta"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
