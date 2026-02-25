import { useState, useEffect } from 'react';
import { Star, MapPin, Phone, ArrowRight, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSectionMobile = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative bg-white lg:hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

      <div className="relative px-5 pt-4 pb-8">
        {/* Location Bar - Simple, non-competing */}
        <div 
          className={`flex items-center justify-center mb-5 transition-all duration-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Târgoviște</span>
          </div>
        </div>

        {/* Main Title - Cleaner hierarchy */}
        <div className="text-center mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Clinică Stomatologică
          </p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
            Doctor Suciu
            <span className="block text-[#1e3a5f]">Dental Clinic</span>
          </h1>
          <p className="text-base text-gray-600 font-medium max-w-[320px] mx-auto leading-relaxed">
            Știm că nu îți place la dentist. De asta facem lucrurile altfel.
          </p>
        </div>

        {/* Trust Pills - Horizontal scroll for better fit */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-5 px-5 scrollbar-hide">
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full flex-shrink-0">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">Fără durere</span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">15+ ani experiență</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full flex-shrink-0">
            <span className="text-xs font-medium text-amber-700">Programare rapidă</span>
          </div>
        </div>

        {/* Hero Image - Optimized aspect ratio */}
        <div className="relative mb-6">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10]">
            <img
              src="/hero-clinic.jpg"
              alt="Clinică stomatologică modernă în Târgoviște"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Badge */}
            <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-700">✓ Tehnologie modernă</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Gentle, no pressure */}
        <div className="space-y-3 mb-10">
          <Link 
            to="/contact" 
            className="flex items-center justify-center gap-2 w-full h-14 bg-[#1e3a5f] text-white font-semibold text-base rounded-xl active:scale-[0.98] transition-transform"
          >
            <span>Hai să vorbim</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <a 
            href="tel:+40770220110" 
            className="flex items-center justify-center gap-2 w-full h-14 bg-white text-[#1e3a5f] font-semibold text-base rounded-xl border-2 border-gray-200 active:scale-[0.98] transition-transform"
          >
            <Phone className="w-5 h-5" />
            <span>Sună fără obligații</span>
          </a>
        </div>

        {/* Reassurances + Rating - same row, calm validation */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
          {/* Reassurances */}
          <span>Fără durere</span>
          <span className="text-gray-300">·</span>
          <span>Medici specializați</span>
          
          {/* Separator */}
          <span className="text-gray-300">|</span>
          
          {/* Rating */}
          <div className="flex items-center gap-1 text-gray-500">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-medium text-gray-700">5.0</span>
            <span>Google</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile;
