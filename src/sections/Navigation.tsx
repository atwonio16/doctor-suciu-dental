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
    { label: 'SERVICII', href: '/servicii' },
    { label: 'BLOG', href: '/blog' },
    { label: 'PĂRERI', href: '/pareri' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 transition-shadow duration-200 ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto flex items-center h-16 lg:h-20">
            {/* Logo - Left */}
            <Link to="/" className="flex flex-col leading-none flex-shrink-0">
              <span className="font-bold text-lg tracking-tight text-slate-900">DOCTOR SUCIU</span>
              <span className="text-[10px] tracking-[0.2em] text-sky-500 font-semibold">DENTAL CLINIC</span>
            </Link>

            {/* Navigation - Center */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-xs font-semibold tracking-wider transition-colors ${isActive(link.href) ? 'text-sky-500' : 'text-slate-600 hover:text-sky-500'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side - Phone + CTA */}
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
              <a href="tel:+40770220110" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-500 transition-colors">
                <Phone className="w-4 h-4" />
                0770 220 110
              </a>
              <Link to="/contact" className="btn-primary text-sm py-2.5 px-5">
                PROGRAMEAZĂ-TE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-slate-900 ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/20" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg p-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-2 ${isActive(link.href) ? 'text-sky-500' : 'text-slate-700'}`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <a href="tel:+40770220110" className="flex items-center gap-2 text-slate-700 py-2">
                <Phone className="w-5 h-5" />
                0770 220 110
              </a>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary text-center mt-2">
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
