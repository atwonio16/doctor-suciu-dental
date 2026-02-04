import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full pt-24 pb-16 overflow-hidden">
      {/* Background - Clean medical texture */}
      <div className="absolute inset-0 bg-medical-cream">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-medical-navy-soft rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-teal-soft rounded-full blur-3xl opacity-40" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
            {/* Left - Text Content */}
            <div className="text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 bg-white border border-medical-teal text-medical-teal">
                <span className="w-1.5 h-1.5 rounded-full bg-medical-teal animate-pulse" />
                CLINICĂ STOMATOLOGICĂ TÂRGOVIȘTE
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-medical-navy leading-[1.1] mb-6">
                Îngrijire dentară<br />
                cu <span className="text-medical-teal">blândețe</span>
              </h1>

              <p className="text-lg text-medical-gray mb-8 max-w-lg leading-relaxed">
                De la cei mici la cei mari, fiecare zâmbet merită atenție. 
                Tehnologie modernă, atmosferă relaxantă, zero stres și griji.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 btn-primary px-8 py-4 text-base"
                >
                  PROGRAMEAZĂ-TE
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/servicii"
                  className="inline-flex items-center justify-center gap-2 btn-outline px-8 py-4 text-base"
                >
                  DESCOPERĂ SERVICIILE
                </Link>
              </div>

              {/* Contact Info with icons */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-medical-gray">
                <a href="tel:+40770220110" className="flex items-center gap-1.5 hover:text-medical-teal transition-colors group">
                  <span className="w-7 h-7 rounded-full icon-teal flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  0770 220 110
                </a>
                <span className="text-medical-warm">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-7 h-7 rounded-full icon-navy flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Târgoviște, Dâmbovița
                </span>
                <span className="text-medical-warm">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-7 h-7 rounded-full icon-teal flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  L-J: 9-18 | V: 9-15
                </span>
              </div>
            </div>

            {/* Right - Large Image */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden shadow-2xl shadow-medical-navy/10">
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
        <div className="w-6 h-10 rounded-full border-2 border-medical-teal/40 flex justify-center pt-2 hover:border-medical-teal transition-colors bg-white/80 backdrop-blur-sm">
          <div className="w-1.5 h-3 rounded-full bg-medical-teal" />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
