import { ArrowRight, Phone, MapPin, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full py-20 sm:py-28 overflow-hidden bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)]">
            
            {/* Image - First on mobile */}
            <div className="relative w-full flex items-center justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[600px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#e2e8f0]">
                <img
                  src="/hero-clinic.jpg"
                  alt="Clinică stomatologică modernă în Târgoviște"
                  className="w-full h-64 sm:h-80 lg:h-[580px] object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero-family1.png';
                  }}
                />
              </div>
            </div>

            {/* Left - Text Content */}
            <div className="text-center lg:text-left order-last lg:order-first">
              {/* Title - Larger on mobile for impact */}
              <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-semibold text-[#0f172a] leading-[1.1] sm:leading-[1.15] mb-4 tracking-tight">
                Clinică dentară modernă
                <span className="block mt-1 sm:mt-0">în Târgoviște</span>
              </h1>

              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-5 sm:mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-[#0f172a] text-sm sm:text-base">5.0</span>
                <span className="text-[#64748b] text-sm sm:text-base">din 53 recenzii Google</span>
              </div>

              {/* Subtitle - Benefits - Stacked on mobile */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8 text-base sm:text-lg text-[#222222]">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] flex-shrink-0" />
                  Fără durere
                </span>
                <span className="hidden sm:inline text-[#cbd5e1]">|</span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] flex-shrink-0" />
                  Medici specializați
                </span>
                <span className="hidden sm:inline text-[#cbd5e1]">|</span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] flex-shrink-0" />
                  Programări rapide
                </span>
              </div>

              {/* CTAs - Full width on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
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

              {/* Info - Simplified on mobile */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-8 sm:gap-y-4 text-sm">
                {/* Phone */}
                <a href="tel:+40770220110" className="flex items-center gap-2.5 text-[#222222] hover:text-[#1e3a5f] transition-colors group">
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#e0f2fe]/60 border border-[#bae6fd]/50 flex items-center justify-center text-[#0284c7]">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="font-medium">0770 220 110</span>
                </a>

                {/* Location - Hidden on small mobile */}
                <a href="https://maps.google.com/?q=Calea+Domnească+234+Târgoviște" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2.5 text-[#222222] hover:text-[#1e3a5f] transition-colors group">
                  <span className="w-10 h-10 rounded-full bg-[#e0f2fe]/60 border border-[#bae6fd]/50 flex items-center justify-center text-[#0284c7]">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="font-medium">Târgoviște</span>
                </a>

                {/* Schedule - Hidden on mobile */}
                <div className="hidden lg:flex items-center gap-2.5 text-[#222222]">
                  <span className="w-10 h-10 rounded-full bg-[#e0f2fe]/60 border border-[#bae6fd]/50 flex items-center justify-center text-[#0284c7]">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="font-medium">L-J: 9-18 | V: 9-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <a 
        href="#servicii" 
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#1e3a5f] flex justify-center pt-2 hover:bg-[#1e3a5f]/5 transition-colors">
          <div className="w-1.5 h-3 rounded-full bg-[#1e3a5f]" />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
