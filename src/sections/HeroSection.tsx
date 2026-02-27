import { ArrowRight, ChevronDown, MapPin, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSSettings } from '../hooks/useCMSSettings';

const HeroSection = () => {
  const { googleReviews } = useCMSSettings();
  const scrollToContent = () => {
    const nextSection = document.getElementById('transformari');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full bg-white flex items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-12 sm:pt-16 pb-8 sm:pb-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left - Text */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              
              {/* Headline - single line, no period, font-weight 800, tracking tight */}
              <h1 
                className="text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem] leading-[1.15] mb-5 sm:mb-6 lg:whitespace-nowrap"
                style={{ 
                  color: '#0F172A',
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                Zâmbetul tău începe aici
              </h1>

              {/* Subheadline - empathetic, human tone, single line on desktop */}
              <p 
                className="text-[15px] sm:text-base lg:text-[17px] mb-6 sm:mb-8 leading-relaxed max-w-[560px] mx-auto lg:mx-0 px-1 sm:px-0"
                style={{ color: '#475569' }}
              >
                Știm că nu îți place la dentist. De asta facem lucrurile altfel.
              </p>

              {/* CTAs - Mobile: stacked full width, Desktop: side by side */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-6">
                {/* CTA Primary - gentle invitation */}
                <Link
                  to="/contact"
                  className="cta-primary inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-7 py-4 sm:py-3 rounded-lg text-white hover:opacity-90 transition-opacity active:scale-[0.98]"
                  style={{ backgroundColor: '#0F2A44' }}
                >
                  Hai să vorbim
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </Link>

                {/* CTA Secondary - reassurance, no commitment */}
                <a
                  href="tel:+40770220110"
                  className="cta-secondary inline-flex items-center justify-center gap-2 font-medium text-[15px] px-6 py-4 sm:py-3 rounded-lg transition-all active:scale-[0.98]"
                  style={{ 
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(15, 42, 68, 0.18)',
                    color: '#0F2A44'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(15, 42, 68, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">Sună fără obligații</span>
                </a>
              </div>

              {/* Contact Info - Mobile: vertical stack, Desktop: horizontal */}
              <div 
                className="contact-info flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-x-5 sm:gap-y-2 text-[13px] sm:text-[13px] mb-5 sm:mb-6" 
                style={{ color: '#64748B' }}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#94A3B8' }} />
                  <span>Târgoviște, Calea Domnească 234</span>
                </div>
                <span className="hidden sm:inline text-gray-300">|</span>
                <div className="flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#94A3B8' }} />
                  <span>L-J: 9-18 | V: 9-15</span>
                </div>
              </div>

              {/* Reassurances + Rating - Mobile: wrapped, Desktop: same row */}
              <div 
                className="reassurances flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 text-[12px] sm:text-[12px]" 
                style={{ color: '#94A3B8' }}
              >
                {/* Reassurances - whisper */}
                <span>Fără durere</span>
                <span className="text-gray-300">·</span>
                <span>Medici specializați</span>
                
                {/* Separator - hidden on very small screens */}
                <span className="text-gray-300 hidden sm:inline">|</span>
                
                {/* Rating - validation */}
                <div className="flex items-center gap-1" style={{ color: '#64748B' }}>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="#FABB05">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="font-medium" style={{ color: '#0F172A' }}>{googleReviews.rating.toFixed(1)}</span>
                  <span className="hidden sm:inline">din {googleReviews.reviewCount} recenzii Google</span>
                  <span className="sm:hidden">({googleReviews.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="hero-image relative w-full flex items-center justify-center lg:justify-end order-1 lg:order-2">
              <div 
                className="relative w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[540px] aspect-[4/3] sm:aspect-square overflow-hidden"
                style={{ borderRadius: '16px' }}
              >
                <img
                  src="/poza-hero.jpg"
                  alt="Recepție clinică stomatologică modernă în Târgoviște"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center center' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/hero-family1.png';
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator - CTA color, subtle bounce - hidden on mobile */}
      <button 
        onClick={scrollToContent}
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity hover:opacity-70 cursor-pointer"
        style={{ color: '#0F2A44' }}
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" style={{ animation: 'subtleBounce 2s infinite' }} />
      </button>

      <style>{`
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
