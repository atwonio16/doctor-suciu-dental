import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Servicii', href: '/servicii' },
    { label: 'Medici', href: '/medici' },
    { label: 'Păreri', href: '/pareri' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight text-slate-900">
                DOCTOR SUCIU
              </span>
              <span className="text-xs tracking-[0.2em] text-sky-500 font-medium">
                DENTAL CLINIC
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-sky-500'
                      : 'text-slate-600 hover:text-sky-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+40770220110"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>0770 220 110</span>
              </a>
              <Button
                asChild
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-6"
              >
                <Link to="/contact">Programează-te</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-slate-900"
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
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={handleNavClick}
                className={`text-lg font-medium py-2 transition-colors ${
                  isActive(link.href)
                    ? 'text-sky-500'
                    : 'text-slate-900 hover:text-sky-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-slate-100 my-2" />
            <a
              href="tel:+40770220110"
              className="flex items-center gap-2 text-slate-900 hover:text-sky-500 transition-colors py-2"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">0770 220 110</span>
            </a>
            <Button
              asChild
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium w-full mt-2"
            >
              <Link to="/contact" onClick={handleNavClick}>
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
