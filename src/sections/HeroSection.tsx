import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full py-24 overflow-hidden bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
            {/* Left - Text Content */}
            <div className="text-left">
              {/* Title - Clear headline -->
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-[#0f172a] leading-[1.15] mb-6 tracking-tight">
                Clinică dentară modernă<br />
                în Târgoviște
              </h1>

              {/* Subtitle - Benefits */}
              <p className="text-lg text-[#222222] mb-8 max-w-lg leading-relaxed">
                <span className="inline-flex items-center gap-2 mr-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                  Fără durere
                </span>
                <span className="inline-flex items-center gap-2 mr-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                  Medici specializați
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                  Programări rapide
                </span>
              </p>

              {/* CTAs - Primary and Secondary */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-medical-navy text-white border-2 border-medical-navy hover:bg-transparent hover:text-medical-navy"
                >
                  PROGRAMEAZĂ-TE
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+40770220110"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-white text-medical-navy border-2 border-medical-warm hover:border-medical-navy"
                >
                  <Phone className="w-4 h-4" />
                  SUNĂ ACUM
                </a>
              </div>

              {/* Info - Light blue transparent circles */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
                {/* Phone */}
                <a href="tel:+40770220110" className="flex items-center gap-2.5 text-[#222222] hover:text-[#1e3a5f] transition-colors group">
                  <span className="w-10 h-10 rounded-full bg-[#e0f2fe]/60 border border-[#bae6fd]/50 flex items-center justify-center text-[#0284c7]">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="font-medium">0770 220 110</span>
                </a>

                {/* Location */}
                <a href="https://maps.google.com/?q=Calea+Domnească+234+Târgoviște" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[#222222] hover:text-[#1e3a5f] transition-colors group">
                  <span className="w-10 h-10 rounded-full bg-[#e0f2fe]/60 border border-[#bae6fd]/50 flex items-center justify-center text-[#0284c7]">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="font-medium">Târgoviște, Dâmbovița</span>
                </a>

                {/* Schedule */}
                <div className="flex items-center gap-2.5 text-[#222222]">
                  <span className="w-10 h-10 rounded-full bg-[#e0f2fe]/60 border border-[#bae6fd]/50 flex items-center justify-center text-[#0284c7]">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="font-medium">L-J: 9-18 | V: 9-15</span>
                </div>
              </div>
            </div>

            {/* Right - Real clinic image */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden border border-[#e2e8f0]">
                <img
                  src="/hero-clinic.jpg"
                  alt="Clinică stomatologică modernă în Târgoviște"
                  className="w-full h-auto lg:h-[580px] object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero-family1.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Same color as CTAs (navy) */}
      <a 
        href="#servicii" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
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
