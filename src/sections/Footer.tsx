import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white pt-10 pb-24">
      {/* Main Content */}
      <div className="px-4">
        {/* Logo & Description */}
        <div className="mb-8">
          <div className="mb-3">
            <span className="font-bold text-[18px] tracking-tight">DOCTOR SUCIU</span>
            <span className="block text-[10px] tracking-[0.2em] text-white/60 font-medium mt-0.5">
              DENTAL CLINIC
            </span>
          </div>
          <p className="text-[13px] text-white/60 leading-relaxed">
            Clinică stomatologică modernă în Târgoviște. 
            Tratamente de înaltă calitate într-un mediu confortabil.
          </p>
        </div>

        {/* Quick Contact */}
        <div className="space-y-4 mb-8">
          <a 
            href="tel:+40770220110"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#0d9488]" />
            </div>
            <div>
              <p className="text-[11px] text-white/50">Sună acum</p>
              <p className="font-semibold text-[15px]">0770 220 110</p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#0d9488]" />
            </div>
            <div>
              <p className="text-[11px] text-white/50">Adresă</p>
              <p className="font-semibold text-[14px]">Calea Domnească 234</p>
              <p className="text-[12px] text-white/60">Târgoviște</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#0d9488]" />
            </div>
            <div>
              <p className="text-[11px] text-white/50">Program</p>
              <p className="font-semibold text-[14px]">L-J: 9-18 | V: 9-15</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-semibold text-[13px] mb-3 text-white/80">Navigare</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Acasă
                </Link>
              </li>
              <li>
                <Link to="/servicii" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Servicii
                </Link>
              </li>
              <li>
                <Link to="/#medici" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Medici
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[13px] mb-3 text-white/80">Servicii</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/servicii" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Implanturi
                </Link>
              </li>
              <li>
                <Link to="/servicii" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Ortodonție
                </Link>
              </li>
              <li>
                <Link to="/servicii" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Estetică
                </Link>
              </li>
              <li>
                <Link to="/servicii" className="text-[13px] text-white/60 hover:text-white transition-colors">
                  Urgențe
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Legal */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0d9488] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0d9488] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <p className="text-[11px] text-white/40 text-center">
            © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
