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
    <footer className="bg-white text-gray-800 lg:pb-0 pb-[60px] border-t border-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto pt-16 pb-8">
          
          {/* Main Footer Content - 4 equal columns */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-8">
            
            {/* Brand Section */}
            <div className="lg:w-[280px] lg:flex-shrink-0">
              <Link to="/" className="inline-block mb-4">
                <span className="font-bold text-xl tracking-tight text-gray-900">DOCTOR SUCIU</span>
                <span className="block text-[10px] tracking-[0.2em] text-gray-500 mt-0.5 font-medium uppercase">Dental Clinic</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Clinică stomatologică modernă în Târgoviște. Tratamente de înaltă calitate într-un mediu confortabil.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-pink-600 hover:text-white transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:w-[140px]">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                Navigare
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.to} 
                      className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:w-[160px]">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                Servicii
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link 
                      to={service.to} 
                      className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:w-[280px]">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                Contact
              </h4>
              <div className="space-y-4">
                <a href="tel:+40770220110" className="flex items-center gap-3 text-gray-500 hover:text-blue-600 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Phone className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium">0770 220 110</span>
                </a>
                <a href="mailto:contact@doctorsuciu.ro" className="flex items-center gap-3 text-gray-500 hover:text-blue-600 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Mail className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-medium">contact@doctorsuciu.ro</span>
                </a>
                <div className="flex items-start gap-3 text-gray-500 group">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Calea Domnească 234, Târgoviște</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 group">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">L-J: 9-18 | V: 9-15</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
