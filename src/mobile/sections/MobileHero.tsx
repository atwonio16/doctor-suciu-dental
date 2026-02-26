import { ArrowRight, ChevronRight, Clock, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSSettings } from '../../hooks/useCMSSettings';

const GoogleMark = () => (
  <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export function MobileHero() {
  const { googleReviews } = useCMSSettings();

  return (
    <section
      id="hero"
      className="mobile-safe-x pb-4"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 84px)' }}
    >
      <div className="mx-auto max-w-[560px]">
        <div className="mobile-panel relative overflow-hidden p-[14px]">
          <div className="relative z-10">
            <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[12px] text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#0F2A44]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Tratament bland, explicat clar
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#1e7a44]" />
                Clinica moderna in Targoviste
              </span>
            </div>

            <h1
              className="mobile-title whitespace-nowrap text-slate-950"
              style={{ fontSize: 'clamp(1.6rem, 6.95vw, 2.08rem)', letterSpacing: '-0.04em', fontWeight: 800 }}
            >
              Zambetul tau incepe aici
            </h1>
            <p className="mobile-body mt-3 text-[14px]">
              Daca ai emotii la dentist, esti in locul potrivit. Lucram calm, cu rabdare si un plan clar pentru fiecare pas.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
              <div className="mobile-tile p-3">
                <div className="mb-1 flex items-center gap-1.5 text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Program</span>
                </div>
                <p className="font-semibold text-slate-900">Luni - Joi 9-18</p>
                <p className="text-slate-500">Vineri 9-15</p>
              </div>
              <a
                href="https://maps.google.com/?q=Calea+Domneasca+234+Targoviste"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-tile p-3 active:scale-[0.99] transition-transform"
              >
                <div className="mb-1 flex items-center gap-1.5 text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Locatie</span>
                </div>
                <p className="font-semibold text-slate-900">Calea Domneasca 234</p>
                <p className="inline-flex items-center gap-1 text-[#0F2A44]">
                  Targoviste
                  <ChevronRight className="h-3.5 w-3.5" />
                </p>
              </a>
            </div>

            <div className="mt-4 overflow-hidden rounded-[16px] border border-slate-200 bg-white p-1">
              <div className="relative aspect-[16/10.8] overflow-hidden rounded-[14px] bg-slate-100">
                <img
                  src="/poza-hero.jpg"
                  alt="Interiorul clinicii Doctor Suciu"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 58%' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero-family1.png';
                  }}
                />

                <div className="absolute left-2 top-2 max-w-[92%] rounded-[9px] border border-slate-200 bg-white px-2.5 py-1.5 shadow-[0_4px_12px_rgba(15,23,42,0.07)]">
                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-700 whitespace-nowrap">
                    <GoogleMark />
                    <span className="text-slate-500">Google</span>
                    <span className="font-semibold text-slate-900">{googleReviews.rating.toFixed(1)}</span>
                    <div className="flex shrink-0 items-center gap-0.5" aria-hidden>
                      {[...Array(5)].map((_, index) => (
                        <svg key={index} className="h-3 w-3" viewBox="0 0 24 24" fill="#FABB05" aria-hidden>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="truncate text-slate-600">din {googleReviews.reviewCount} recenzii</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <Link
                to="/contact"
                className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-[#0F2A44] bg-[#0F2A44] px-4 text-[15px] font-semibold text-white shadow-none active:scale-[0.985] transition-transform"
              >
                Programeaza o discutie
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="tel:+40770220110"
                className="flex h-12 items-center justify-center gap-2 rounded-[12px] border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-800 active:scale-[0.985] transition-transform"
              >
                <Phone className="h-4 w-4 text-[#0F2A44]" />
                Suna acum
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
