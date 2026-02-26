import { ArrowRight, Phone, ChevronDown, MapPin, Clock } from 'lucide-react';
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
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20 sm:pt-16 pb-6 sm:pb-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            
            {/* Left - Text Content */}
            <div className="text-center lg:text-left order-1">
              
              {/* Headline */}
              <h1 
                className="text-[1.625rem] sm:text-[2.25rem] lg:text-[3rem] leading-[1.1] mb-2 sm:mb-6 lg:whitespace-nowrap"
                style={{ 
                  color: '#0F172A',
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                Zâmbetul tău începe aici
              </h1>

              {/* Subtitle */}
              <p 
                className="text-[15px] sm:text-base lg:text-[17px] mb-4 sm:mb-8 leading-relaxed max-w-[480px] mx-auto lg:mx-0"
                style={{ color: '#475569' }}
              >
                Știm că nu îți place la dentist. De asta facem lucrurile altfel.
              </p>

              {/* CTAs - Stacked on mobile */}
              <div className="flex flex-col items-stretch gap-1.5 sm:gap-2 sm:mb-6">
                {/* Primary CTA */}
                <Link
                  to="/contact"
                  className="cta-primary inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-7 py-3 rounded-lg text-white hover:opacity-90 transition-opacity active:scale-[0.98]"
                  style={{ backgroundColor: '#0F2A44' }}
                >
                  Hai să vorbim
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </Link>

                {/* Secondary CTA */}
                <a
                  href="tel:+40770220110"
                  className="cta-secondary inline-flex items-center justify-center gap-2 font-medium text-[15px] px-6 py-3 rounded-lg transition-all active:scale-[0.98]"
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

                {/* Program + Location - Mobile only */}
                <div className="sm:hidden flex items-center justify-center gap-4 text-[12px] py-1">
                  <div className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
                    <Clock className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                    <span>L–J: 9–18 | V: 9–15</span>
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                    <span>Târgoviște</span>
                  </div>
                </div>
              </div>

              {/* Contact Info - Desktop only */}
              <div 
                className="hidden sm:flex items-center justify-center lg:justify-start gap-5 text-[13px] mb-3" 
                style={{ color: '#64748B' }}
              >
                <a 
                  href="tel:+40770220110" 
                  className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#64748B' }} />
                  <span>0770 220 110</span>
                </a>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#64748B' }} />
                  <span>Târgoviște</span>
                </div>
              </div>

              {/* Trust Line - Desktop only */}
              <div 
                className="hidden sm:flex items-center justify-center lg:justify-start gap-1 text-[12px] mt-4" 
                style={{ color: '#94A3B8' }}
              >
                <span>Fără durere</span>
                <span className="text-gray-300">·</span>
                <span>Medici specializați</span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1" style={{ color: '#64748B' }}>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#FABB05">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="font-medium" style={{ color: '#0F172A' }}>{googleReviews.rating.toFixed(1)}</span>
                  <span>din {googleReviews.reviewCount} recenzii</span>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="hero-image relative w-full flex items-center justify-center lg:justify-end order-2 mt-1 lg:mt-0">
              <div 
                className="relative w-full max-w-[260px] sm:max-w-[440px] lg:max-w-[540px] aspect-[16/10] sm:aspect-square overflow-hidden"
                style={{ borderRadius: '12px' }}
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

          {/* Trust Line - Mobile only (below image) - Two rows layout */}
          <div className="sm:hidden mt-3">
            {/* Row 1: Trust badges */}
            <div 
              className="flex items-center justify-center gap-2 text-[11px] mb-1.5" 
              style={{ color: '#64748B' }}
            >
              <span>Fără durere</span>
              <span className="text-gray-300">·</span>
              <span>Medici specializați</span>
            </div>
            {/* Row 2: Rating */}
            <div 
              className="flex items-center justify-center gap-1.5 text-[11px]" 
              style={{ color: '#64748B' }}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" fill="#FABB05">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <span className="font-medium" style={{ color: '#0F172A' }}>{googleReviews.rating.toFixed(1)}</span>
              <span style={{ color: '#94A3B8' }}>({googleReviews.reviewCount} recenzii)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator - Desktop only */}
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
