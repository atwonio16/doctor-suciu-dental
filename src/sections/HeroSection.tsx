import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full pt-24 pb-16 overflow-hidden">
      {/* Background - Soft warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-200/20 via-pink-200/15 to-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-200/15 via-cyan-200/15 to-blue-200/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
            {/* Left - Text Content */}
            <div className="text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-white to-sky-50 border border-sky-100 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                CLINICĂ STOMATOLOGICĂ TÂRGOVIȘTE
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.1] mb-6">
                Îngrijire dentară<br />
                cu <span className="text-sky-500">blândețe</span>
              </h1>

              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                De la cei mici la cei mari, fiecare zâmbet merită atenție. 
                Tehnologie modernă, atmosferă relaxantă, zero stres și griji.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-400 hover:from-sky-400 hover:to-sky-300 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30"
                >
                  PROGRAMEAZĂ-TE
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/servicii"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gradient-to-r hover:from-white hover:to-sky-50 text-slate-700 font-medium px-8 py-4 rounded-full border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-sky-200"
                >
                  DESCOPERĂ SERVICIILE
                </Link>
              </div>

              {/* Contact Info with icons */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <a href="tel:+40770220110" className="flex items-center gap-1.5 hover:text-sky-500 transition-colors group">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center group-hover:from-sky-200 group-hover:to-sky-100 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-sky-500" />
                  </span>
                  0770 220 110
                </a>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                  Târgoviște, Dâmbovița
                </span>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                  L-J: 9-18 | V: 9-15
                </span>
              </div>
            </div>

            {/* Right - Large Image */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-full max-w-[600px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                {/* Warm overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/5 via-transparent to-pink-500/5 z-10 pointer-events-none" />
                <img
                  src="/hero-family1.png"
                  alt="Moment familial fericit la dentist"
                  className="w-full h-auto lg:h-[580px] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a 
        href="#servicii" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2 hover:border-sky-400 transition-colors bg-white/50 backdrop-blur-sm">
          <div className="w-1.5 h-3 rounded-full bg-slate-400" />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
