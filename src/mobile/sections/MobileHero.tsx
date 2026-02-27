import { ArrowRight, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSSettings } from '../../hooks/useCMSSettings';

const GoogleMark = () => (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
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
      className="relative overflow-hidden pb-8"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 80px)' }}
      aria-labelledby="mobile-hero-title"
    >
      {/* Decorativ: gradient blur */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-[480px] px-5">
        {/* Headline Section */}
        <div className="text-center">
          {/* Headline cu font bold și personalitate */}
          <h1
            id="mobile-hero-title"
            className="text-[#0B1E32]"
            style={{
              fontSize: 'clamp(2.25rem, 10vw, 2.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              fontWeight: 800,
              fontFamily: '"Montserrat", "Inter", system-ui, sans-serif',
            }}
          >
            Zâmbetul tău
            <br />
            începe aici!
          </h1>

          {/* Subheadline creativ, 2 rânduri, culoare mai închisă */}
          <p className="mx-auto mt-4 max-w-[320px] text-[16px] leading-[1.5] text-slate-700">
            O echipă calmă, care ascultă și explică tot. 
            Fără durere, doar zâmbete cu încredere.
          </p>
        </div>

        {/* Google Reviews - deasupra CTA, putin mai mare */}
        <a 
          href="https://www.google.com/search?q=doctor+suciu+dental+clinic+targoviste"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 text-center"
        >
          <GoogleMark />
          <span className="text-[16px] font-bold text-slate-900">{googleReviews.rating.toFixed(1)}</span>
          <span className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
          <span className="text-[15px] font-semibold text-[#2563EB]">din {googleReviews.reviewCount} recenzii</span>
        </a>

        {/* CTA Principal */}
        <div className="mt-5">
          <Link
            to="/contact"
            className="group flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0B1E32] text-white shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all"
          >
            <span className="text-[16px] font-semibold leading-none">
              Vreau să mă programez
            </span>
            <ArrowRight className="h-5 w-5 leading-none transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Hero Image */}
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src="/poza-hero.jpg"
                alt="Clinica Doctor Suciu Dental Clinic - Interior modern și primitor"
                className="h-full w-full object-cover"
                style={{ objectPosition: 'center 35%' }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={(event) => {
                  (event.target as HTMLImageElement).src = '/hero-family1.png';
                }}
              />
            </div>
          </div>
        </div>

        {/* Locatie si Orar - sub poza */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[13px]">
          <a
            href="https://maps.google.com/?q=Calea+Domneasca+234+Targoviste"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-[#2563EB] font-medium hover:underline"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Târgoviște</span>
            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </a>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1 text-slate-600">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>L-J: 9-18 | V: 9-15</span>
          </div>
        </div>
      </div>
    </section>
  );
}
