import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import NavigationMobile from './NavigationMobile';

const Navigation = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
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
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path || (path === '/' && location.pathname === '/')) {
        scrollToSection(hash);
      } else {
        navigate(path);
        setTimeout(() => scrollToSection(hash), 300);
      }
    } else {
      navigate(href);
    }
  };

  if (isMobile) {
    return <NavigationMobile />;
  }

  const navLinks = [
    { label: 'Vezi Servicii', href: '/servicii' },
    { label: 'Echipa Noastră', href: '/#medici' },
    { label: 'Contactează-ne', href: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto flex items-center" style={{ height: '64px' }}>
            {/* Logo */}
            <button onClick={handleHomeClick} className="flex flex-col leading-none flex-shrink-0 cursor-pointer">
              <span className="font-bold text-lg tracking-tight" style={{ color: '#0F172A' }}>DOCTOR SUCIU</span>
              <span className="text-[10px] tracking-[0.18em] font-medium" style={{ color: '#64748B' }}>DENTAL CLINIC</span>
            </button>

            {/* Navigation - Designed links with subtle states */}
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

            {/* Right Side - Phone (calm reassurance) + CTA (dominant) */}
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
              <a 
                href="tel:+40770220110" 
                className="flex items-center gap-1.5 text-[13px] font-medium transition-colors hover:text-gray-700"
                style={{ color: '#64748B' }}
              >
                <Phone className="w-3.5 h-3.5" />
                0770 220 110
              </a>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 font-medium text-[14px] px-5 py-2 rounded-lg transition-all hover:bg-gray-50"
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
            <button className="lg:hidden p-2 ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: '#0F172A' }}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-[68px] left-0 right-0 bg-white p-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleNavClick(link.href);
                  }}
                  className="text-left text-lg font-medium py-2"
                  style={{ color: '#0F172A' }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="tel:+40770220110"
                className="flex items-center gap-2 text-lg font-medium py-2"
                style={{ color: '#0F2A44' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                0770 220 110
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
