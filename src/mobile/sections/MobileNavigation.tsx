import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Acasă', href: '/' },
  { label: 'Vezi Servicii', href: '/servicii' },
  { label: 'Echipa Noastră', href: '/#medici' },
  { label: 'Contactează-ne', href: '/contact' },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm shadow-slate-200/50">
        <div
          className="mx-auto max-w-[480px]"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="flex h-[70px] items-center justify-between px-5">
            <Link
              to="/"
              className="flex flex-col justify-center px-3 py-1"
              aria-label="Doctor Suciu Dental Clinic"
              onClick={handleLogoClick}
            >
              <span className="text-[15px] font-black tracking-tight text-slate-900" style={{ fontWeight: 900 }}>
                DOCTOR SUCIU
              </span>
              <span className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500" style={{ fontWeight: 800 }}>
                DENTAL CLINIC
              </span>
            </Link>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-12 w-12 items-center justify-center rounded-full text-slate-900 active:bg-slate-100 transition-colors"
              aria-label="Deschide meniul"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop with blur */}
        <div
          className="absolute inset-0 bg-[#0B1E32]/95 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel - slides from right */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-[480px] bg-[#0B1E32] transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          {/* Close Button */}
          <div className="flex h-[70px] items-center justify-end px-5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-12 w-12 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
              aria-label="Închide meniul"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="px-8 pt-8" aria-label="Meniu mobil">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li
                  key={item.label}
                  className={`transform transition-all duration-300 ${
                    isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                  style={{ transitionDelay: isOpen ? `${index * 75}ms` : '0ms' }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-[24px] font-semibold text-white/90 hover:text-white transition-colors border-b border-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div
            className={`absolute bottom-0 left-0 right-0 px-8 pb-8 pt-4 transition-all duration-500 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '300ms' : '0ms', paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)' }}
          >
            <div className="border-t border-white/20 pt-6">
              <a
                href="tel:+40770220110"
                className="block text-[20px] font-bold text-white mb-2"
              >
                0770 220 110
              </a>
              <p className="text-[14px] text-white/60">
                Calea Domnească 234, Târgoviște
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
