import { ArrowRight, Phone, MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Image - First on mobile */}
            <div className="relative w-full flex items-center justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[600px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#e2e8f0]">
                <img
                  src="/hero-clinic.jpg"
                  alt="Clinică stomatologică modernă în Târgoviște"
                  className="w-full h-56 sm:h-72 lg:h-[520px] object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero-family1.png';
                  }}
                />
              </div>
            </div>

            {/* Left - Text Content */}
            <div className="text-center lg:text-left order-last lg:order-first">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#0f172a] leading-[1.1] mb-4 tracking-tight">
                Zâmbetul tău începe aici !
              </h1>

              {/* Subheadline - exact 2 rânduri */}
              <p className="text-lg sm:text-xl text-[#334155] mb-5 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Clinică dentară modernă în Târgoviște.<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Îngrijire premium, fără durere, cu rezultate garantate.
              </p>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-[#0f172a] text-sm sm:text-base">5.0</span>
                <span className="text-[#64748b] text-sm sm:text-base">din 53 recenzii Google</span>
              </div>

              {/* Benefits - Inline */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-6 text-sm sm:text-base text-[#475569]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] flex-shrink-0" />
                  Fără durere
                </span>
                <span className="hidden sm:inline text-[#cbd5e1]">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] flex-shrink-0" />
                  Medici specializați
                </span>
                <span className="hidden sm:inline text-[#cbd5e1]">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] flex-shrink-0" />
                  Programări rapide
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 sm:px-8 py-4 rounded-full transition-all duration-300 bg-medical-navy text-white border-2 border-medical-navy hover:bg-transparent hover:text-medical-navy active:scale-95"
                >
                  PROGRAMEAZĂ-TE
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+40770220110"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 sm:px-8 py-4 rounded-full transition-all duration-300 bg-white text-medical-navy border-2 border-medical-warm hover:border-medical-navy active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  SUNĂ ACUM
                </a>
              </div>

              {/* Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6 text-sm">
                <a href="tel:+40770220110" className="flex items-center gap-2 text-[#334155] hover:text-[#1e3a5f] transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">0770 220 110</span>
                </a>

                <a href="https://maps.google.com/?q=Calea+Domnească+234+Târgoviște" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-[#334155] hover:text-[#1e3a5f] transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">Târgoviște</span>
                </a>

                <div className="hidden lg:flex items-center gap-2 text-[#334155]">
                  <span className="w-8 h-8 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7]">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">L-J: 9-18 | V: 9-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
