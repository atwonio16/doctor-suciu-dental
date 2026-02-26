import { Link } from 'react-router-dom';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function MobileFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mobile-safe-x relative overflow-hidden border-t border-white/30 bg-[#0b1320] pt-8 text-white">
      <div className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full bg-[#1d3f63]/30 blur-2xl" aria-hidden />
      <div className="pointer-events-none absolute -left-12 bottom-20 h-36 w-36 rounded-full bg-[#0f6e8a]/15 blur-2xl" aria-hidden />

      <div className="relative mx-auto max-w-[560px] pb-6">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
          <Link to="/" className="inline-block">
            <span className="block text-[18px] font-semibold tracking-tight">DOCTOR SUCIU</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/60">Dental Clinic</span>
          </Link>

          <p className="mt-3 text-[13px] leading-relaxed text-white/75">
            Clinica stomatologica moderna in Targoviste, cu accent pe confort, claritate si rezultate naturale.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <Link
              to="/"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[12px] font-medium text-white/90 active:scale-[0.985] transition-transform"
            >
              Acasa
            </Link>
            <Link
              to="/servicii"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[12px] font-medium text-white/90 active:scale-[0.985] transition-transform"
            >
              Servicii
            </Link>
            <Link
              to="/contact"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[12px] font-medium text-white/90 active:scale-[0.985] transition-transform"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-3 grid gap-2">
          <a
            href="tel:+40770220110"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 active:scale-[0.99] transition-transform"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Phone className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.14em] text-white/55">Telefon</span>
              <span className="block text-[14px] font-semibold">0770 220 110</span>
            </span>
          </a>

          <a
            href="mailto:contact@doctorsuciu.ro"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 active:scale-[0.99] transition-transform"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Mail className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.14em] text-white/55">Email</span>
              <span className="block truncate text-[14px] font-semibold">contact@doctorsuciu.ro</span>
            </span>
          </a>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-white/55">Adresa</span>
                <span className="block text-[14px] font-semibold">Calea Domneasca 234, Targoviste</span>
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Clock className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-white/55">Program</span>
                <span className="block text-[14px] font-semibold">Luni - Joi 9:00 - 18:00 | Vineri 9:00 - 15:00</span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12px] text-white/55">Ne gasesti si pe social media</p>
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 active:scale-[0.96] transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 active:scale-[0.96] transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 text-center">
          <p className="text-[12px] text-white/50">
            © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
