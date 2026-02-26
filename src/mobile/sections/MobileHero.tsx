import { ArrowRight, CalendarDays, ChevronRight, Clock, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
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

const heroStats = [
  { value: '100%', label: 'empatie' },
  { value: 'plan', label: 'clar' },
  { value: 'fara', label: 'presiune' },
];

export function MobileHero() {
  const { googleReviews } = useCMSSettings();

  return (
    <section
      id="hero"
      className="mobile-safe-x pb-4"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 84px)' }}
    >
      <div className="mx-auto max-w-[560px]">
        <div className="mobile-panel relative overflow-hidden p-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[12px] text-slate-600">
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

            <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white p-1">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[14px] bg-slate-100">
                <img
                  src="/poza-hero.jpg"
                  alt="Interiorul clinicii Doctor Suciu"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 58%' }}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onError={(event) => {
                    (event.target as HTMLImageElement).src = '/hero-family1.png';
                  }}
                />

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900/25 to-transparent" aria-hidden />

                <div className="absolute left-2 top-2 max-w-[calc(100%-16px)] rounded-[10px] border border-slate-200 bg-white px-2.5 py-1.5 shadow-[0_4px_12px_rgba(15,23,42,0.07)]">
                  <div className="mobile-scrollbar-hide flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[11px] leading-none text-slate-700">
                    <GoogleMark />
                    <span className="font-semibold text-slate-900">{googleReviews.rating.toFixed(1)}</span>
                    <div className="flex shrink-0 items-center gap-0.5" aria-hidden>
                      {[...Array(5)].map((_, index) => (
                        <svg key={index} className="h-3 w-3" viewBox="0 0 24 24" fill="#FABB05" aria-hidden>
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-slate-600">din {googleReviews.reviewCount} recenzii</span>
                  </div>
                </div>

                <div className="absolute inset-x-2 bottom-2">
                  <div className="rounded-[10px] border border-white/70 bg-white/92 px-3 py-2">
                    <p className="text-[11px] font-medium text-slate-900">Atmosfera calma. Comunicare clara. Fara graba.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h1
                className="mobile-title text-slate-950"
                style={{ fontSize: 'clamp(1.95rem, 8.9vw, 2.55rem)', lineHeight: 0.98, letterSpacing: '-0.05em', fontWeight: 800 }}
              >
                Zambetul tau incepe aici
              </h1>
              <p className="mobile-body mt-3 text-[15px] leading-relaxed">
                Daca ai emotii la dentist, esti in locul potrivit. Lucram calm, cu rabdare si un plan clar pentru fiecare pas.
              </p>
            </div>

            <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-[#f8fafc]">
              <div className="grid grid-cols-3 divide-x divide-slate-200">
                {heroStats.map((item) => (
                  <div key={`${item.value}-${item.label}`} className="px-2 py-3 text-center">
                    <p className="text-[17px] font-semibold leading-none text-[#0F2A44]">{item.value}</p>
                    <p className="mt-1 text-[11px] leading-none text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="mobile-primary-btn flex h-14 items-center gap-3 px-3 shadow-[0_10px_18px_rgba(15,42,68,0.14)] active:scale-[0.985] transition-transform"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-white/14">
                <CalendarDays className="h-4 w-4 text-white" />
              </span>
              <span className="min-w-0 flex-1 text-left">
                <span className="block text-[15px] font-semibold leading-none text-white">Vreau sa ma programez</span>
                <span className="mt-1 block truncate text-[11px] leading-none text-white/75">
                  Iti raspundem rapid si stabilim pasul potrivit
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-white" />
            </Link>

            <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white">
              <div className="grid grid-cols-2 divide-x divide-slate-200 text-[12px]">
                <div className="px-3 py-3">
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
                  className="px-3 py-3 active:bg-slate-50"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
