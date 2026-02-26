import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      navigate('/');
      setTimeout(scrollToTop, 100);
    }
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path || (path === '/' && location.pathname === '/')) {
        setTimeout(() => scrollToSection(hash), 100);
      } else {
        navigate(path);
        setTimeout(() => scrollToSection(hash), 300);
      }
    } else {
      navigate(href);
    }
  };

  const navLinks = [
    { label: 'Vezi Servicii', href: '/servicii' },
    { label: 'Echipa Noastră', href: '/#medici' },
    { label: 'Contactează-ne', href: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="header-inner max-w-7xl mx-auto flex items-center" style={{ height: '64px' }}>
            {/* Logo */}
            <button 
              onClick={handleHomeClick} 
              className="flex flex-col leading-none flex-shrink-0 cursor-pointer active:opacity-70"
              aria-label="Acasă"
            >
              <span className="font-bold text-lg tracking-tight" style={{ color: '#0F172A' }}>DOCTOR SUCIU</span>
              <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: '#64748B' }}>DENTAL CLINIC</span>
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => {
                const isActiveLink = location.pathname === link.href || 
                  (link.href !== '/' && location.pathname.startsWith(link.href));
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`
                      group relative text-[14px] cursor-pointer whitespace-nowrap 
                      transition-colors duration-200 outline-none
                      focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:rounded-sm
                      ${isActiveLink 
                        ? 'font-medium text-gray-900' 
                        : 'font-normal text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {link.label}
                    {/* Indicator line - active or hover */}
                    <span 
                      className={`
                        absolute -bottom-1 left-0 right-0 h-px transition-all duration-200
                        ${isActiveLink 
                          ? 'bg-gray-900 opacity-100' 
                          : 'bg-gray-400 opacity-0 group-hover:opacity-100'
                        }
                      `}
                    />
                  </button>
                );
              })}
            </nav>

            {/* Right Side - Phone + CTA - Desktop */}
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
              <a 
                href="tel:+40770220110" 
                className="flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:text-gray-700"
                style={{ color: '#64748B' }}
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                0770 220 110
              </a>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 font-medium text-[14px] px-5 py-2.5 rounded-lg transition-all hover:bg-gray-50 active:scale-95"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '1px solid #94A3B8',
                  color: '#0F172A'
                }}
              >
                Programează-te
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 ml-auto min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={{ color: '#0F172A' }}
              aria-label={isMobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay lg:hidden">
          <div className="mobile-menu-overlay absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="mobile-menu absolute top-[64px] left-0 right-0 bg-white border-b border-gray-100 max-h-[calc(100vh-64px)] overflow-y-auto">
            <nav className="flex flex-col p-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="mobile-menu-item text-left text-lg font-medium py-4 px-2 border-b border-gray-100 active:bg-gray-50"
                  style={{ color: '#0F172A' }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+40770220110"
                className="mobile-menu-phone flex items-center gap-3 mt-4 p-4 bg-[#f8fafc] rounded-xl text-[#0F2A44] active:bg-[#f1f5f9]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-[#0F2A44]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0F2A44]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Sună acum</p>
                  <p className="text-lg font-semibold">0770 220 110</p>
                </div>
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
