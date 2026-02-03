import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <span className="font-bold text-lg tracking-tight text-slate-900 block">
                  DOCTOR SUCIU
                </span>
                <span className="text-xs tracking-[0.2em] text-sky-500 font-medium">
                  DENTAL CLINIC
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Clinică stomatologică modernă în Târgoviște, dedicată sănătății și frumuseții zâmbetului tău.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-500 hover:border-sky-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-sky-500 hover:border-sky-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-slate-900">
                Servicii
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="/servicii" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Consultații
                  </a>
                </li>
                <li>
                  <a href="/servicii" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Implanturi dentare
                  </a>
                </li>
                <li>
                  <a href="/servicii" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Estetică dentară
                  </a>
                </li>
                <li>
                  <a href="/servicii" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Ortodonție
                  </a>
                </li>
              </ul>
            </div>

            {/* Info Column */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-slate-900">
                Informații
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#echipa" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Echipa medicală
                  </a>
                </li>
                <li>
                  <a href="#recenzii" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Păreri pacienți
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    Politica de confidențialitate
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-slate-900">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600">
                    Strada Calea Domnească, Nr. 234<br />
                    Târgoviște, Dâmbovița
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <a href="tel:+40770220110" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    0770 220 110
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <a href="mailto:contact@doctorsuciu.ro" className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    contact@doctorsuciu.ro
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <a href="#" className="hover:text-sky-500 transition-colors">Termeni și condiții</a>
              <a href="#" className="hover:text-sky-500 transition-colors">GDPR</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
