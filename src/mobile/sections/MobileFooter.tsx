import { Link } from 'react-router-dom';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function MobileFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mobile-safe-x relative overflow-hidden border-t border-[#0F2A44]/10 bg-[#0F172A] pt-8 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/8" aria-hidden />

      <div className="relative mx-auto max-w-[560px] pb-6">
        <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4">
          <Link to="/" className="inline-block">
            <span className="block text-[18px] font-semibold tracking-tight">DOCTOR SUCIU</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/60">DENTAL CLINIC</span>
          </Link>

          <p className="mt-3 text-[13px] leading-relaxed text-white/75">
            Clinica stomatologica moderna in Targoviste, cu accent pe confort, claritate si rezultate naturale.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <Link
              to="/"
              className="flex h-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.02] text-[12px] font-medium text-white/90 active:scale-[0.985] transition-transform"
            >
              Acasa
            </Link>
            <Link
              to="/servicii"
              className="flex h-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.02] text-[12px] font-medium text-white/90 active:scale-[0.985] transition-transform"
            >
              Servicii
            </Link>
            <Link
              to="/contact"
              className="flex h-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.02] text-[12px] font-medium text-white/90 active:scale-[0.985] transition-transform"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-3 grid gap-2">
          <a
            href="tel:+40770220110"
            className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 active:scale-[0.99] transition-transform"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/6">
              <Phone className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.14em] text-white/55">Telefon</span>
              <span className="block text-[14px] font-semibold">0770 220 110</span>
            </span>
          </a>

          <a
            href="mailto:contact@doctorsuciu.ro"
            className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90 active:scale-[0.99] transition-transform"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/6">
              <Mail className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.14em] text-white/55">Email</span>
              <span className="block truncate text-[14px] font-semibold">contact@doctorsuciu.ro</span>
            </span>
          </a>

          <div className="rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-3 text-white/90">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/6">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-white/55">Adresa</span>
                <span className="block text-[14px] font-semibold">Calea Domneasca 234, Targoviste</span>
              </span>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/6">
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
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.02] text-white/80 active:scale-[0.96] transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.02] text-white/80 active:scale-[0.96] transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-4 text-center">
          <p className="text-[12px] text-white/50">(c) {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}

