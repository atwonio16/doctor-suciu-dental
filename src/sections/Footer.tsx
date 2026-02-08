import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, ExternalLink, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e3a5f] text-white">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - 4 coloane egale */}
          <div className="grid grid-cols-4 gap-8 pb-12 border-b border-white/30">
            {/* Logo */}
            <div>
              <Link to="/" className="inline-block mb-5">
                <span className="font-bold text-xl tracking-tight">DOCTOR SUCIU</span>
                <span className="block text-[10px] tracking-[0.3em] text-white mt-1">DENTAL CLINIC</span>
              </Link>
              <p className="text-sm text-white leading-relaxed mb-5">
                Clinică stomatologică în Târgoviște. Tratamente moderne și tehnologie premium.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#0891b2] hover:text-[#0891b2] hover:bg-[#0891b2]/10 transition-all duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-[#0891b2] hover:text-[#0891b2] hover:bg-[#0891b2]/10 transition-all duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white mb-5">Navigare</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Acasă', to: '/' },
                  { label: 'Servicii', to: '/servicii' },
                  { label: 'Medici', to: '/#medici' },
                  { label: 'Blog', to: '/blog' },
                  { label: 'Contact', to: '/contact' },
                ].map((item) => (
                  <li key={item.to}>
                    <Link 
                      to={item.to} 
                      className="text-sm text-white hover:text-[#0891b2] transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {item.label}
                      <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white mb-5">Servicii</h4>
              <ul className="space-y-3">
                {['Implanturi', 'Ortodonție', 'Estetică', 'Copii', 'Profilaxie'].map((service) => (
                  <li key={service}>
                    <Link 
                      to="/servicii" 
                      className="text-sm text-white hover:text-[#0891b2] transition-colors duration-200"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact - o singură coloană cu grid 2x2 în interior */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white mb-5">Contact</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {/* Phone */}
                <a 
                  href="tel:+40770220110" 
                  className="flex items-start gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0891b2] transition-colors flex-shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Telefon</p>
                    <p className="text-sm text-white group-hover:text-[#0891b2] transition-colors">0770 220 110</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:contact@doctorsuciu.ro" 
                  className="flex items-start gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0891b2] transition-colors flex-shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Email</p>
                    <p className="text-sm text-white group-hover:text-[#0891b2] transition-colors">contact@doctorsuciu.ro</p>
                  </div>
                </a>

                {/* Program */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Program</p>
                    <p className="text-sm text-white">L-J: 9-18 | V: 9-15</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">Adresă</p>
                    <p className="text-sm text-white leading-tight">Str. Calea Domnească 234,</p>
                    <p className="text-sm text-white">Târgoviște</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#" 
                className="text-xs text-gray-400 hover:text-white/80 transition-colors duration-200"
              >
                Politica de confidențialitate
              </a>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <a 
                href="#" 
                className="text-xs text-gray-400 hover:text-white/80 transition-colors duration-200"
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
