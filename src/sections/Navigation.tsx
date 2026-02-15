import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronLeft, Home, Stethoscope, Users, FileText } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: 'Acasă', href: '/', icon: Home },
    { label: 'Servicii', href: '/servicii', icon: Stethoscope },
    { label: 'Medici', href: '/#medici', icon: Users },
    { label: 'Blog', href: '/blog', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.substring(1);
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.querySelector(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* Top Header - Minimal */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="h-14 flex items-center justify-between px-4 safe-area-top">
          {/* Left - Back or Menu */}
          {isHome ? (
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
              aria-label="Meniu"
            >
              <Menu className="w-6 h-6 text-[#1e3a5f]" />
            </button>
          ) : (
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
              aria-label="Înapoi"
            >
              <ChevronLeft className="w-6 h-6 text-[#1e3a5f]" />
            </button>
          )}

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center leading-none">
              <span className="font-bold text-[15px] tracking-tight text-[#1e3a5f]">DOCTOR SUCIU</span>
              <span className="text-[8px] tracking-[0.2em] text-gray-500 font-medium">DENTAL CLINIC</span>
            </div>
          </Link>

          {/* Right - Phone */}
          <a 
            href="tel:+40770220110"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0d9488]/10 active:bg-[#0d9488]/20 transition-colors"
            aria-label="Sună"
          >
            <Phone className="w-5 h-5 text-[#0d9488]" />
          </a>
        </div>
      </header>

      {/* Spacer for header */}
      <div className="h-14" />

      {/* Full Screen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl">
            {/* Menu Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 safe-area-top">
              <span className="font-semibold text-[17px] text-[#1e3a5f]">Meniu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${
                    isActive(link.href) 
                      ? 'bg-[#1e3a5f] text-white' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className={`w-6 h-6 ${isActive(link.href) ? 'text-white' : 'text-gray-400'}`} />
                  <span className="font-medium text-[16px]">{link.label}</span>
                </button>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 safe-area-bottom">
              <a 
                href="tel:+40770220110"
                className="flex items-center gap-3 p-4 rounded-xl bg-[#0d9488]/10 text-[#0d9488]"
              >
                <Phone className="w-6 h-6" />
                <div>
                  <p className="text-[12px] opacity-70">Sună acum</p>
                  <p className="font-semibold text-[16px]">0770 220 110</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Home Only */}
      {isHome && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-bottom">
          <div className="flex items-center justify-around h-[64px]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`mobile-nav-item ${isActive(link.href) ? 'active' : ''}`}
              >
                <link.icon className={`w-6 h-6 ${isActive(link.href) ? 'text-[#1e3a5f]' : 'text-gray-400'}`} />
                <span className="text-[11px] font-medium">{link.label}</span>
                {isActive(link.href) && (
                  <div className="absolute -bottom-0 w-1 h-1 rounded-full bg-[#1e3a5f]" />
                )}
              </button>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navigation;
