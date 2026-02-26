import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Implanturi dentare', to: '/servicii' },
    { label: 'Ortodonție', to: '/servicii' },
    { label: 'Estetică dentară', to: '/servicii' },
    { label: 'Pedodonție', to: '/servicii' },
    { label: 'Profilaxie', to: '/servicii' },
  ];

  const navLinks = [
    { label: 'Acasă', to: '/' },
    { label: 'Servicii', to: '/servicii' },
    { label: 'Echipa', to: '/#medici' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto pt-10 sm:pt-16 pb-6 sm:pb-8">
          
          {/* Main Footer Content */}
          <div className="footer-grid flex flex-col lg:flex-row lg:justify-between gap-8 sm:gap-10 lg:gap-8 lg:items-start">
            
            {/* Brand Section */}
            <div className="footer-section lg:w-[280px] lg:flex-shrink-0 text-center lg:text-left">
              <Link to="/" className="inline-block mb-4 sm:mb-5">
                <span className="font-bold text-xl tracking-tight text-gray-900">DOCTOR SUCIU</span>
                <span className="block text-[10px] tracking-[0.2em] text-gray-500 mt-1 font-medium uppercase">Dental Clinic</span>
              </Link>
              <p className="text-gray-500 text-sm leading-7 mb-5 sm:mb-6">
                Clinică stomatologică modernă în Târgoviște. Tratamente de înaltă calitate într-un mediu confortabil.
              </p>
              {/* Social Links */}
              <div className="social-links flex gap-3 justify-center lg:justify-start">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 sm:w-4 sm:h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-300 active:scale-95"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-section lg:w-[140px] text-center lg:text-left">
              <h4 className="footer-heading text-sm font-semibold uppercase tracking-[0.1em] text-gray-900 mb-4 sm:mb-5">
                Navigare
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.to} 
                      className="footer-link text-gray-500 text-[15px] sm:text-sm leading-6 hover:text-blue-600 transition-colors inline-block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section lg:w-[160px] text-center lg:text-left">
              <h4 className="footer-heading text-sm font-semibold uppercase tracking-[0.1em] text-gray-900 mb-4 sm:mb-5">
                Servicii
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link 
                      to={service.to} 
                      className="footer-link text-gray-500 text-[15px] sm:text-sm leading-6 hover:text-blue-600 transition-colors inline-block py-1"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section lg:w-[280px] text-center lg:text-left">
              <h4 className="footer-heading text-sm font-semibold uppercase tracking-[0.1em] text-gray-900 mb-4 sm:mb-5">
                Contact
              </h4>
              <div className="space-y-2 sm:space-y-4">
                <a href="tel:+40770220110" className="footer-contact-item flex items-center justify-center lg:justify-start gap-3 text-gray-500 hover:text-blue-600 transition-colors group py-2 sm:py-1">
                  <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="footer-contact-text text-[15px] sm:text-sm font-medium">0770 220 110</span>
                </a>
                <a href="mailto:contact@doctorsuciu.ro" className="footer-contact-item flex items-center justify-center lg:justify-start gap-3 text-gray-500 hover:text-blue-600 transition-colors group py-2 sm:py-1">
                  <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="footer-contact-text text-[15px] sm:text-sm font-medium">contact@doctorsuciu.ro</span>
                </a>
                <div className="footer-contact-item flex items-center justify-center lg:justify-start gap-3 text-gray-500 group py-2 sm:py-1">
                  <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="footer-contact-text text-[15px] sm:text-sm font-medium">Calea Domnească 234, Târgoviște</span>
                </div>
                <div className="footer-contact-item flex items-center justify-center lg:justify-start gap-3 text-gray-500 group py-2 sm:py-1">
                  <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <span className="footer-contact-text text-[15px] sm:text-sm font-medium">L-J: 9-18 | V: 9-15</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="copyright mt-10 sm:mt-12 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center tracking-wide">
              © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
