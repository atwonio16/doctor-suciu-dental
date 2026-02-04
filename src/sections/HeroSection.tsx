import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full pt-24 pb-16 overflow-hidden bg-white">
      {/* Background - Pure white with very subtle hints */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-50/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-50/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
            {/* Left - Text Content */}
            <div className="text-left">
              {/* Category - Simple text with line */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#94a3b8]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                  Clinică Stomatologică Târgoviște
                </span>
              </div>

              {/* Title - Premium slate-900, single color, professional weight */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-[#0f172a] leading-[1.15] mb-6 tracking-tight">
                Îngrijire dentară<br />
                cu blândețe
              </h1>

              {/* Body text - #222222 */}
              <p className="text-lg text-[#222222] mb-8 max-w-lg leading-relaxed">
                De la cei mici la cei mari, fiecare zâmbet merită atenție. 
                Tehnologie modernă, atmosferă relaxantă, zero stres și griji.
              </p>

              {/* CTAs - Original order, Pill buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-transparent hover:text-[#1e3a5f]"
                >
                  PROGRAMEAZĂ-TE
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/servicii"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-white text-[#1e3a5f] border-2 border-[#cbd5e1] hover:border-[#1e3a5f]"
                >
                  DESCOPERĂ SERVICIILE
                </Link>
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

            {/* Right - Image */}
            <div className="relative h-full flex items-center justify-center">
              <div className="relative w-full max-w-[600px] rounded-2xl overflow-hidden border border-[#e2e8f0]">
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
