import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-bold text-2xl lg:text-3xl mb-2">
                Pregătit pentru un zâmbet nou?
              </h2>
              <p className="text-slate-400">
                Programează o consultație gratuită și descoperă cum te putem ajuta.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 rounded-full"
            >
              <Link to="/contact">
                Programează-te acum
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-6">
                <span className="font-bold text-xl tracking-tight block">
                  DOCTOR SUCIU
                </span>
                <span className="text-xs tracking-[0.2em] text-sky-400 font-medium">
                  DENTAL CLINIC
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Clinică stomatologică în Târgoviște. Tratamente moderne, 
                echipă dedicată, rezultate exceptionale.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-5 text-white">
                Navigare
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Acasă
                  </Link>
                </li>
                <li>
                  <Link to="/servicii" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Servicii
                  </Link>
                </li>
                <li>
                  <Link to="/medici" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Medici
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/pareri" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Păreri
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-5 text-white">
                Servicii
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/servicii" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Implanturi
                  </Link>
                </li>
                <li>
                  <Link to="/servicii" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Ortodonție
                  </Link>
                </li>
                <li>
                  <Link to="/servicii" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Estetică dentară
                  </Link>
                </li>
                <li>
                  <Link to="/servicii" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    Stomatologie copii
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-5 text-white">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    Str. Calea Domnească 234<br />
                    Târgoviște, DB
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <a href="tel:+40770220110" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    0770 220 110
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <a href="mailto:contact@doctorsuciu.ro" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    contact@doctorsuciu.ro
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-400">
                    L-J: 9:00-18:00<br />
                    V: 9:00-15:00
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
              <a href="#" className="hover:text-sky-400 transition-colors">Politica de confidențialitate</a>
              <a href="#" className="hover:text-sky-400 transition-colors">Termeni și condiții</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
