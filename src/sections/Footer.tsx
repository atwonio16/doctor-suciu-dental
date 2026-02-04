import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-medical-navy text-white">
      {/* CTA */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 border-b border-medical-navy-light/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Pregătit pentru un zâmbet nou?</h2>
            <p className="text-medical-sand">Programează o consultație gratuită.</p>
          </div>
          <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
            PROGRAMEAZĂ-TE
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="block mb-4">
              <span className="font-bold text-lg">DOCTOR SUCIU</span>
              <span className="block text-[10px] tracking-[0.2em] text-medical-teal-light">DENTAL CLINIC</span>
            </Link>
            <p className="text-sm text-medical-sand mb-4">
              Clinică stomatologică în Târgoviște. Tratamente moderne, echipă dedicată.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-medical-navy-light flex items-center justify-center text-medical-sand hover:bg-medical-teal hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-medical-navy-light flex items-center justify-center text-medical-sand hover:bg-medical-teal hover:text-white transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-medical-teal">Navigare</h4>
            <ul className="space-y-2 text-sm text-medical-sand">
              <li><Link to="/" className="hover:text-white transition-colors">Acasă</Link></li>
              <li><Link to="/servicii" className="hover:text-white transition-colors">Servicii</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/pareri" className="hover:text-white transition-colors">Păreri</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-medical-teal">Servicii</h4>
            <ul className="space-y-2 text-sm text-medical-sand">
              <li><Link to="/servicii" className="hover:text-white transition-colors">Implanturi</Link></li>
              <li><Link to="/servicii" className="hover:text-white transition-colors">Ortodonție</Link></li>
              <li><Link to="/servicii" className="hover:text-white transition-colors">Estetică</Link></li>
              <li><Link to="/servicii" className="hover:text-white transition-colors">Copii</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-medical-teal">Contact</h4>
            <ul className="space-y-3 text-sm text-medical-sand">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-medical-teal" />
                Str. Calea Domnească 234, Târgoviște
              </li>
              <li>
                <a href="tel:+40770220110" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-medical-teal" />
                  0770 220 110
                </a>
              </li>
              <li>
                <a href="mailto:contact@doctorsuciu.ro" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-medical-teal" />
                  contact@doctorsuciu.ro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-medical-navy-light/30">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-medical-sand/60">
            <p>© {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Politica de confidențialitate</a>
              <a href="#" className="hover:text-white transition-colors">Termeni și condiții</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
