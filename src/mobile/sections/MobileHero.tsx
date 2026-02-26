import { ArrowRight, ChevronRight, Clock, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSSettings } from '../../hooks/useCMSSettings';

export function MobileHero() {
  const { googleReviews } = useCMSSettings();

  const scrollToCases = () => {
    document.getElementById('transformari')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      className="mobile-safe-x pb-4"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 84px)' }}
    >
      <div className="mx-auto max-w-[560px]">
        <div className="mobile-panel relative overflow-hidden p-[14px]">
          <div
            className="pointer-events-none absolute right-[-28px] top-[-18px] h-24 w-24 rounded-full bg-[#e6eef5]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-[-20px] top-20 h-20 w-20 rounded-full bg-[#f2eadf]/70"
            aria-hidden
          />
          <div className="relative z-10">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#173851]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Tratament bland, explicat clar
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden />
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#1f7a46]" />
                Clinica moderna in Targoviste
              </span>
            </div>

            <h1
              className="mobile-title whitespace-nowrap text-slate-950"
              style={{ fontSize: 'clamp(1.56rem, 6.7vw, 2rem)', letterSpacing: '-0.055em' }}
            >
              Zambetul tau incepe aici
            </h1>
            <p className="mobile-body mt-3 text-[14px]">
              Daca ai emotii la dentist, esti in locul potrivit. Lucram calm, cu rabdare si un plan clar pentru fiecare pas.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
              <div className="mobile-tile bg-[#f6f2ea] p-3">
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
                className="mobile-tile bg-[#eef2f5] p-3 active:scale-[0.99] transition-transform"
              >
                <div className="mb-1 flex items-center gap-1.5 text-slate-500">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Locatie</span>
                </div>
                <p className="font-semibold text-slate-900">Calea Domneasca 234</p>
                <p className="inline-flex items-center gap-1 text-[#123455]">
                  Targoviste
                  <ChevronRight className="h-3.5 w-3.5" />
                </p>
              </a>
            </div>

            <div className="mt-4 overflow-hidden rounded-[18px] border border-[rgba(18,24,38,0.08)] bg-white p-1">
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

                <div className="absolute inset-x-2 bottom-2 rounded-[12px] border border-white/70 bg-white/92 px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Google Reviews</p>
                      <div className="mt-0.5 text-[12px] text-slate-700">
                        <span className="font-semibold text-slate-900">{googleReviews.rating.toFixed(1)}</span>{' '}
                        din {googleReviews.reviewCount} recenzii
                      </div>
                    </div>
                    <div className="flex items-center gap-1" aria-hidden>
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#FABB05" aria-hidden>
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <Link
                to="/contact"
                className="flex h-12 items-center justify-center gap-2 rounded-[14px] border border-[#173851] bg-[#173851] px-4 text-[15px] font-semibold text-white shadow-[0_8px_16px_rgba(23,56,81,0.16)] active:scale-[0.985] transition-transform"
              >
                Programeaza o discutie
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="grid grid-cols-[1.1fr_1fr] gap-2">
                <a
                  href="tel:+40770220110"
                  className="flex h-12 items-center justify-center gap-2 rounded-[14px] border border-[rgba(18,24,38,0.1)] bg-[#f7f4ef] px-4 text-[14px] font-semibold text-slate-800 active:scale-[0.985] transition-transform"
                >
                  <Phone className="h-4 w-4 text-[#173851]" />
                  Suna acum
                </a>
                <button
                  type="button"
                  onClick={scrollToCases}
                  className="flex h-12 items-center justify-center gap-2 rounded-[14px] border border-[rgba(18,24,38,0.1)] bg-white px-4 text-[14px] font-medium text-slate-700 active:scale-[0.985] transition-transform"
                >
                  Vezi cazuri
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
