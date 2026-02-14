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

  return (
    <footer className="bg-[#0f172a] text-white relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a5f]/20 to-transparent pointer-events-none" />
      
      {/* Main Footer Content */}
      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-20 pb-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Section - 3 Columns */}
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-16 pb-12 border-b border-white/10">
            
            {/* Brand Column */}
            <div className="lg:w-[260px] flex-shrink-0">
              <Link to="/" className="inline-block mb-6">
                <span className="font-bold text-2xl tracking-tight">DOCTOR SUCIU</span>
                <span className="block text-[11px] tracking-[0.25em] text-white mt-1 font-medium">DENTAL CLINIC</span>
              </Link>
              <p className="text-white leading-relaxed mb-6 text-sm">
                Clinică stomatologică modernă în Târgoviște. Oferim tratamente de înaltă calitate într-un mediu confortabil.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#0891b2] transition-all duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-[#0891b2] transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="lg:w-[140px] flex-shrink-0">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white mb-6">
                Navigare
              </h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-white hover:text-white/80 transition-colors duration-200 text-sm">Acasă</Link></li>
                <li><Link to="/servicii" className="text-white hover:text-white/80 transition-colors duration-200 text-sm">Servicii</Link></li>
                <li><Link to="/#medici" className="text-white hover:text-white/80 transition-colors duration-200 text-sm">Medici</Link></li>
                <li><Link to="/blog" className="text-white hover:text-white/80 transition-colors duration-200 text-sm">Blog</Link></li>
                <li><Link to="/contact" className="text-white hover:text-white/80 transition-colors duration-200 text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:w-[160px] flex-shrink-0">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white mb-6">
                Servicii
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <Link 
                      to={service.to} 
                      className="text-white hover:text-white/80 transition-colors duration-200 text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:w-[220px] flex-shrink-0">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white mb-6">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="tel:+40770220110" 
                    className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">0770 220 110</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:contact@doctorsuciu.ro" 
                    className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">contact@doctorsuciu.ro</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white">
                    <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Calea Domnească 234, Târgoviște</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-3 text-white">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">L-J: 9-18 | V: 9-15</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                Politica de confidențialitate
              </a>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <a 
                href="#" 
                className="text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                Termeni și condiții
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
