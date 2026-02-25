import { ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const scrollToContent = () => {
    const nextSection = document.getElementById('before-after');
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
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left - Text */}
            <div className="text-center lg:text-left">
              
              {/* Headline - single line, no period, font-weight 800, tracking tight */}
              <h1 
                className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem] leading-[1.1] mb-10 whitespace-nowrap"
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
                className="text-base lg:text-[17px] mb-14 leading-relaxed max-w-[560px] mx-auto lg:mx-0"
                style={{ color: '#475569' }}
              >
                Știm că nu îți place la dentist. De asta facem lucrurile altfel.
              </p>

              {/* CTAs - Relaxed, no pressure */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-12">
                {/* CTA Primary - gentle invitation */}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-[15px] px-7 py-3 rounded-lg text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#0F2A44' }}
                >
                  Hai să vorbim
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* CTA Secondary - reassurance, no commitment */}
                <a
                  href="tel:+40770220110"
                  className="inline-flex items-center justify-center gap-2 font-medium text-[15px] px-6 py-3 rounded-lg transition-all"
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
                  <Phone className="w-4 h-4" />
                  Sună fără obligații
                </a>
              </div>

              {/* Reassurances + Rating - same row, calm validation */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-[12px]" style={{ color: '#94A3B8' }}>
                {/* Reassurances - whisper */}
                <span>Fără durere</span>
                <span className="text-gray-300">·</span>
                <span>Medici specializați</span>
                
                {/* Separator */}
                <span className="text-gray-300">|</span>
                
                {/* Rating - validation */}
                <div className="flex items-center gap-1.5" style={{ color: '#64748B' }}>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#FABB05">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="font-medium" style={{ color: '#0F172A' }}>5.0</span>
                  <span>din 53 recenzii Google</span>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative w-full flex items-center justify-center lg:justify-end">
              <div 
                className="relative w-full max-w-[540px] aspect-square overflow-hidden"
                style={{ borderRadius: '24px' }}
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

      {/* Scroll indicator - CTA color, subtle bounce */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity hover:opacity-70 cursor-pointer"
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
