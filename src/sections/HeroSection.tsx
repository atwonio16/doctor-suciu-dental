import { ArrowRight, Phone, ChevronDown, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSSettings } from '../hooks/useCMSSettings';

// Google logo component for social proof
const GoogleLogo = () => (
  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

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

              {/* Subtitle - Mobile: shorter, lighter, one line */}
              <p 
                className="text-[15px] sm:text-base lg:text-[17px] mb-4 sm:mb-8 leading-relaxed max-w-[480px] mx-auto lg:mx-0"
                style={{ color: '#475569' }}
              >
                <span className="sm:hidden">Grijă blândă pentru zâmbetul tău</span>
                <span className="hidden sm:inline">Știm că nu îți place la dentist. De asta facem lucrurile altfel.</span>
              </p>

              {/* CTAs - Desktop only (shown in original order) */}
              <div className="hidden sm:flex flex-col items-stretch gap-2 sm:mb-6">
                {/* Primary CTA - Dominant */}
                <Link
                  to="/contact"
                  className="cta-primary inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-7 py-3.5 rounded-xl text-white hover:opacity-90 transition-opacity active:scale-[0.98]"
                  style={{ 
                    backgroundColor: '#0F2A44',
                    boxShadow: '0 4px 14px rgba(15, 42, 68, 0.25)'
                  }}
                >
                  Hai să vorbim
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </Link>

                {/* Secondary CTA - Subtle */}
                <a
                  href="tel:+40770220110"
                  className="cta-secondary inline-flex items-center justify-center gap-2 font-medium text-[14px] px-6 py-2.5 rounded-lg transition-all active:scale-[0.98]"
                  style={{ 
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#475569'
                  }}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#64748B' }} />
                  <span className="whitespace-nowrap">Sună fără obligații</span>
                </a>
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
            <div className="hero-image relative w-full flex items-center justify-center lg:justify-end order-2 mt-4 lg:mt-0">
              <div 
                className="relative w-full max-w-[280px] sm:max-w-[440px] lg:max-w-[540px] aspect-[16/10] sm:aspect-square overflow-hidden"
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

          {/* Mobile Layout - Reordered: Program/Location → CTAs → Social Proof */}
          <div className="sm:hidden mt-4">
            
            {/* Program + Location */}
            <div className="flex items-center justify-center gap-4 text-[12px] mb-4">
              <div className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
                <Clock className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                <span>L–J: 9–18 | V: 9–15</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                <span>Târgoviște</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col items-stretch gap-2 mb-4">
              {/* Primary CTA */}
              <Link
                to="/contact"
                className="cta-primary inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-7 py-3.5 rounded-xl text-white active:scale-[0.98]"
                style={{ 
                  backgroundColor: '#0F2A44',
                  boxShadow: '0 4px 14px rgba(15, 42, 68, 0.25)'
                }}
              >
                Hai să vorbim
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>

              {/* Secondary CTA */}
              <a
                href="tel:+40770220110"
                className="cta-secondary inline-flex items-center justify-center gap-2 font-medium text-[14px] px-6 py-2.5 rounded-lg active:scale-[0.98]"
                style={{ 
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  color: '#475569'
                }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#64748B' }} />
                <span className="whitespace-nowrap">Sună fără obligații</span>
              </a>
            </div>

            {/* Social Proof - Mobile: Google reviews only, clean row */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] pt-3 border-t border-gray-100">
              <GoogleLogo />
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" fill="#FABB05">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <span className="font-medium" style={{ color: '#0F172A' }}>{googleReviews.rating.toFixed(1)}</span>
              <span style={{ color: '#64748B' }}>({googleReviews.reviewCount} recenzii)</span>
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
