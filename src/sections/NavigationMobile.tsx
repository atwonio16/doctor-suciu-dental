import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronLeft, Home, Stethoscope, Users, FileText, Calendar } from 'lucide-react';

const NavigationMobile = () => {
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
    { label: 'Echipa', href: '/#medici', icon: Users },
    { label: 'Contact', href: '/contact', icon: Calendar },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.substring(1);
    return location.pathname === href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href === '/') {
      if (location.pathname === '/') {
        scrollToTop();
      } else {
        navigate('/');
        setTimeout(scrollToTop, 100);
      }
    } else if (href.startsWith('/#')) {
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
      {/* Top Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="h-14 flex items-center justify-between px-4">
          {isHome ? (
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
              aria-label="Deschide meniul"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          ) : (
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
              aria-label="Înapoi"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          <button 
            onClick={() => handleNavClick('/')}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <div className="flex flex-col items-center leading-none">
              <span className="font-bold text-base tracking-tight text-gray-900">DOCTOR SUCIU</span>
              <span className="text-[9px] tracking-[0.2em] text-gray-400 font-medium uppercase">Dental Clinic</span>
            </div>
          </button>

          <a 
            href="tel:+40770220110" 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e3a5f]/5 active:bg-[#1e3a5f]/10 transition-colors"
            aria-label="Sună acum"
          >
            <Phone className="w-4 h-4 text-[#1e3a5f]" />
          </a>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14 lg:hidden" />

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => setIsMenuOpen(false)} 
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 left-0 bottom-0 w-[80%] max-w-[300px] bg-white shadow-2xl">
            {/* Menu Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100">
              <span className="font-bold text-lg text-gray-900">Meniu</span>
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full active:bg-gray-100 transition-colors"
                aria-label="Închide meniul"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors active:scale-[0.98] ${
                    isActive(link.href) 
                      ? 'bg-[#1e3a5f] text-white' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isActive(link.href) ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    <link.icon className={`w-4 h-4 ${isActive(link.href) ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <span className="font-medium text-sm">{link.label}</span>
                </button>
              ))}
            </nav>

            {/* Contact Card */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 bg-gray-50">
              <a 
                href="tel:+40770220110" 
                className="flex items-center gap-3 p-3 rounded-xl bg-[#1e3a5f] text-white active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-80">Sună acum</p>
                  <p className="font-bold text-base">0770 220 110</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tab Bar - Only on homepage */}
      {isHome && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe lg:hidden">
          <div className="flex items-center justify-around h-[60px]">
            {navLinks.slice(0, 4).map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`flex flex-col items-center gap-1 py-2 px-3 min-w-[60px] transition-colors ${
                  isActive(link.href) ? 'text-[#1e3a5f]' : 'text-gray-400'
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive(link.href) ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className="text-[10px] font-medium">{link.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default NavigationMobile;
