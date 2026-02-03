import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    servicii: [
      { label: 'Consultații', href: '#servicii' },
      { label: 'Implanturi dentare', href: '#servicii' },
      { label: 'Estetică dentară', href: '#servicii' },
      { label: 'Ortodonție', href: '#servicii' },
    ],
    informatii: [
      { label: 'Despre noi', href: '#echipa' },
      { label: 'Echipa medicală', href: '#echipa' },
      { label: 'Recenzii', href: '#recenzii' },
      { label: 'Contact', href: '#contact' },
    ],
    legal: [
      { label: 'Politica de confidențialitate', href: '#' },
      { label: 'Termeni și condiții', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  };

  return (
    <footer className="bg-clinic-navy text-white">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="font-serif font-bold text-lg text-clinic-navy">S</span>
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white leading-tight block">
                  Doctor Suciu
                </span>
                <span className="text-[10px] text-clinic-teal tracking-[0.15em] uppercase">
                  Dental Clinic
                </span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-xs">
              Clinică stomatologică modernă în Târgoviște, specializată în
              tratamente premium și îngrijire de calitate.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-clinic-teal transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-clinic-teal transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-clinic-teal">
              Servicii
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.servicii.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-clinic-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-clinic-teal">
              Informații
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.informatii.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-clinic-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide mb-4 text-clinic-teal">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://maps.google.com/?q=Târgoviște"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-white/70 hover:text-clinic-teal transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Strada Calea Domnească, Nr. 234, Târgoviște</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+40770220110"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-clinic-teal transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>0770 220 110</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@doctorsuciu.ro"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-clinic-teal transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contact@doctorsuciu.ro</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
            <p className="text-xs text-white/50 text-center sm:text-left">
              © {currentYear} Doctor Suciu Dental Clinic. Toate drepturile rezervate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-white/50 hover:text-clinic-teal transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
