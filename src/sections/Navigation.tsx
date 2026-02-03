import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicii', href: '#servicii' },
    { label: 'Avantaje', href: '#avantaje' },
    { label: 'Echipa', href: '#echipa' },
    { label: 'Recenzii', href: '#recenzii' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-card'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-clinic-navy flex items-center justify-center">
                <span className="font-serif font-bold text-lg text-white">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg text-clinic-navy leading-tight">
                  Doctor Suciu
                </span>
                <span className="text-[10px] text-clinic-teal tracking-[0.15em] uppercase">
                  Dental Clinic
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-clinic-navy hover:text-clinic-teal transition-colors link-underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+40770220110"
                className="flex items-center gap-2 text-sm font-medium text-clinic-navy hover:text-clinic-teal transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>0770 220 110</span>
              </a>
              <Button
                asChild
                className="bg-clinic-navy hover:bg-clinic-navy-light text-white font-semibold px-6"
              >
                <a href="#contact">Programează-te</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-clinic-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Meniu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-clinic-navy/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-clinic-navy hover:text-clinic-teal transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-gray-200 my-2" />
            <a
              href="tel:+40770220110"
              className="flex items-center gap-2 text-clinic-navy hover:text-clinic-teal transition-colors py-2"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">0770 220 110</span>
            </a>
            <Button
              asChild
              className="bg-clinic-navy hover:bg-clinic-navy-light text-white font-semibold w-full mt-2"
            >
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Programează-te
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
