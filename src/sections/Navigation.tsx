import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Acasă', href: '/' },
    { label: 'Servicii', href: '/servicii' },
    { label: 'Echipa', href: isHome ? '#echipa' : '/#echipa' },
    { label: 'Păreri', href: isHome ? '#recenzii' : '/#recenzii' },
    { label: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-clinic-teal flex items-center justify-center transition-transform group-hover:scale-110">
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
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 rounded-full text-sm font-medium text-clinic-navy/80 hover:text-clinic-teal hover:bg-clinic-teal/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+40770220110"
                className="flex items-center gap-2 text-sm font-medium text-clinic-navy/80 hover:text-clinic-teal transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>0770 220 110</span>
              </a>
              <Button
                asChild
                className="bg-clinic-navy hover:bg-clinic-navy/90 text-white font-medium px-6 rounded-full"
              >
                <Link to={isHome ? '#contact' : '/#contact'}>Programează-te</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-clinic-navy rounded-full hover:bg-slate-100 transition-colors"
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
          className={`absolute top-16 left-4 right-4 bg-white rounded-3xl shadow-xl transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavClick}
                className="text-lg font-medium text-clinic-navy hover:text-clinic-teal transition-colors py-3 px-4 rounded-xl hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-100 my-2" />
            <a
              href="tel:+40770220110"
              className="flex items-center gap-2 text-clinic-navy hover:text-clinic-teal transition-colors py-3 px-4"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">0770 220 110</span>
            </a>
            <Button
              asChild
              className="bg-clinic-navy hover:bg-clinic-navy/90 text-white font-medium w-full mt-2 rounded-full h-12"
            >
              <Link to={isHome ? '#contact' : '/#contact'} onClick={handleNavClick}>
                Programează-te
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
