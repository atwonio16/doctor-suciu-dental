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
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
          <div className="relative z-10">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d8e7f5] bg-[#eef5fb] px-3 py-1 text-[11px] font-semibold text-[#123455]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Tratament bland, explicat clar
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600">
                <Sparkles className="h-3.5 w-3.5 text-[#0f6e3b]" />
                Clinica moderna in Targoviste
              </span>
            </div>

            <h1 className="whitespace-nowrap text-[22px] leading-tight tracking-[-0.03em] text-slate-950 sm:text-[24px]">
              Zambetul tau incepe aici
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Daca ai emotii la dentist, esti in locul potrivit. Lucram calm, cu rabdare si un plan clar pentru fiecare pas.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] text-slate-600">
              <div className="rounded-2xl border border-white/80 bg-white/85 p-3 shadow-sm">
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
                className="rounded-2xl border border-white/80 bg-white/85 p-3 shadow-sm active:scale-[0.99] transition-transform"
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

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/80 bg-white p-1 shadow-sm">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[14px] bg-slate-100">
                <img
                  src="/poza-hero.jpg"
                  alt="Interiorul clinicii Doctor Suciu"
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 58%' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero-family1.png';
                  }}
                />

                <div className="absolute left-2 top-2 rounded-xl border border-white/70 bg-white/90 px-2.5 py-1.5 shadow-sm backdrop-blur">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#FABB05" aria-hidden>
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mt-1 text-[12px] text-slate-700">
                    <span className="font-semibold text-slate-900">{googleReviews.rating.toFixed(1)}</span>{' '}
                    din {googleReviews.reviewCount} recenzii Google
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <Link
                to="/contact"
                className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#123455] px-4 text-[15px] font-semibold text-white shadow-[0_10px_20px_rgba(18,52,85,0.22)] active:scale-[0.985] transition-transform"
              >
                Programeaza o discutie
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="grid grid-cols-[1.1fr_1fr] gap-2">
                <a
                  href="tel:+40770220110"
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-[14px] font-semibold text-slate-800 active:scale-[0.985] transition-transform"
                >
                  <Phone className="h-4 w-4 text-[#123455]" />
                  Suna acum
                </a>
                <button
                  type="button"
                  onClick={scrollToCases}
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-700 active:scale-[0.985] transition-transform"
                >
                  Vezi cazuri
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[12px] text-slate-600">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Fara presiune</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Plan personalizat</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Atmosfera calma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
