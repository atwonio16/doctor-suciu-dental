import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Acasă', href: '/' },
    { label: 'Servicii', href: '/servicii' },
    { label: 'Medici', href: '/#medici' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href.includes('#')) {
      return location.pathname === href.split('#')[0] && location.hash === '#' + href.split('#')[1];
    }
    return location.pathname === href;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-medical-warm transition-shadow duration-200 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto flex items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none flex-shrink-0">
              <span className="font-bold text-lg tracking-tight text-medical-navy">DOCTOR SUCIU</span>
              <span className="text-[10px] tracking-[0.2em] text-[#222222] font-semibold">DENTAL CLINIC</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-medical-navy' : 'text-[#222222] hover:text-medical-navy'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
              <a href="tel:+40770220110" className="flex items-center gap-2 text-sm font-medium text-medical-navy hover:text-medical-teal transition-colors">
                <Phone className="w-4 h-4" />
                0770 220 110
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-medical-navy text-white font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-medical-navy-dark transition-colors">
                PROGRAMEAZĂ-TE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-medical-navy ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-medical-navy/20" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-xl p-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 ${isActive(link.href) ? 'text-medical-navy' : 'text-[#222222]'}`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-medical-warm" />
              <a href="tel:+40770220110" className="flex items-center gap-2 text-medical-navy py-2">
                <Phone className="w-5 h-5 text-medical-teal" />
                0770 220 110
              </a>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="inline-flex items-center justify-center w-full bg-medical-navy text-white font-semibold py-3 rounded-full hover:bg-medical-navy-dark transition-colors mt-2">
                PROGRAMEAZĂ-TE
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
