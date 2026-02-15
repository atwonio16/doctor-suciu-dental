import { Star, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-white">
      {/* Main Content */}
      <div className="px-4 pt-2 pb-6">
        {/* Rating Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[14px] text-gray-900">5.0</span>
            <span className="text-[12px] text-gray-500">(53 recenzii)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="text-[13px]">Târgoviște</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-display text-center text-gray-900 mb-3">
          Zâmbetul perfect<br />
          <span className="text-[#0d9488]">începe aici</span>
        </h1>

        {/* Subheadline */}
        <p className="text-body-small text-center text-gray-500 mb-6 max-w-[280px] mx-auto">
          Clinică stomatologică modernă în Târgoviște. Tratamente premium, fără durere.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-3 mb-6">
          <Link to="/contact" className="btn-mobile-primary">
            Programează-te acum
          </Link>
          <a 
            href="tel:+40770220110" 
            className="btn-mobile-secondary"
          >
            <Phone className="w-5 h-5" />
            Sună la 0770 220 110
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 text-[12px] text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
            Fără durere
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
            15+ ani experiență
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
            Programare rapidă
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative mx-4 rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/hero-clinic.jpg"
          alt="Clinică stomatologică modernă"
          className="w-full aspect-[4/3] object-cover"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/hero-family1.png';
          }}
        />
        {/* Floating Card */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0d9488]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-[#0d9488]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[14px] text-gray-900">Consultație gratuită</p>
              <p className="text-[12px] text-gray-500">Evaluare + plan de tratament</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-[24px] font-bold text-[#1e3a5f]">2.5k+</p>
            <p className="text-[12px] text-gray-500">Pacienți fericiți</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-[24px] font-bold text-[#1e3a5f]">15+</p>
            <p className="text-[12px] text-gray-500">Ani experiență</p>
          </div>
          <div className="text-center">
            <p className="text-[24px] font-bold text-[#1e3a5f]">50+</p>
            <p className="text-[12px] text-gray-500">Recenzii 5★</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
