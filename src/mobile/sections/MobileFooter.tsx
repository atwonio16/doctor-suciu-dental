import { Link } from 'react-router-dom';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function MobileFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0B1E32] pt-8 text-white">
      <div className="mx-auto max-w-[480px] px-5 pb-8">
        {/* Logo Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <Link to="/" className="inline-block">
            <span className="block text-[18px] font-bold tracking-tight">DOCTOR SUCIU</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">DENTAL CLINIC</span>
          </Link>

          <p className="mt-3 text-[13px] leading-relaxed text-white/75">
            Clinica stomatologica moderna in Targoviste, cu accent pe confort, claritate si rezultate naturale.
          </p>

          {/* Nav Links */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Link
              to="/"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-[12px] font-medium text-white/90 transition-transform active:scale-95"
            >
              Acasa
            </Link>
            <Link
              to="/servicii"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-[12px] font-medium text-white/90 transition-transform active:scale-95"
            >
              Servicii
            </Link>
            <Link
              to="/contact"
              className="flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-[12px] font-medium text-white/90 transition-transform active:scale-95"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 space-y-3">
          <a
            href="tel:+40770220110"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/90 transition-transform active:scale-95"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Telefon</p>
              <p className="text-[15px] font-semibold">0770 220 110</p>
            </div>
          </a>

          <a
            href="mailto:contact@doctorsuciu.ro"
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/90 transition-transform active:scale-95"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Email</p>
              <p className="truncate text-[15px] font-semibold">contact@doctorsuciu.ro</p>
            </div>
          </a>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Adresa</p>
                <p className="text-[15px] font-semibold">Calea Domneasca 234, Targoviste</p>
              </div>
            </div>

            <div className="mt-3 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">Program</p>
                <p className="text-[14px] font-semibold">Luni - Joi 9:00 - 18:00</p>
                <p className="text-[14px] text-white/70">Vineri 9:00 - 15:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-[12px] text-white/50">Ne gasesti si pe social media</p>
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/80 transition-transform active:scale-95"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/80 transition-transform active:scale-95"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-5 pt-5 text-center">
          <p className="text-[12px] text-white/40">© {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
