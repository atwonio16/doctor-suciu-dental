import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Clock, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';

const navItems = [
  { label: 'Acasa', href: '/' },
  { label: 'Servicii', href: '/servicii' },
  { label: 'Echipa', href: '/#medici' },
  { label: 'Contact', href: '/contact' },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogoClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 120);
  };

  const activeHref = useMemo(() => {
    if (location.pathname === '/' && location.hash) {
      return `/${location.hash}`;
    }
    return location.pathname;
  }, [location.hash, location.pathname]);

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
      <header className="fixed inset-x-0 top-0 z-50 shadow-sm shadow-slate-200/50">
        <div
          className="mx-auto mt-0 max-w-[480px] bg-white"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="flex h-[70px] items-center gap-3 px-5">
            <Link
              to="/"
              className="flex min-w-0 flex-1 flex-col justify-center rounded-md px-3 py-1"
              aria-label="Doctor Suciu Dental Clinic"
              onClick={handleLogoClick}
            >
              <span className="truncate text-[15px] font-black tracking-tight text-slate-900 leading-none" style={{ fontWeight: 900 }}>
                DOCTOR SUCIU
              </span>
              <span className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500 leading-none" style={{ fontWeight: 800 }}>
                DENTAL CLINIC
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-transparent text-slate-900 active:scale-[0.96] active:bg-slate-100 transition-transform"
              aria-expanded={isOpen}
              aria-controls="mobile-menu-panel"
              aria-label={isOpen ? 'Inchide meniul' : 'Deschide meniul'}
            >
              <span className="relative h-6 w-6">
                <Menu
                  className={`absolute inset-0 h-6 w-6 transition-all duration-200 ${
                    isOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
                />
                <X
                  className={`absolute inset-0 h-6 w-6 transition-all duration-200 ${
                    isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40">
          <button type="button" className="absolute inset-0 bg-slate-950/18" onClick={() => setIsOpen(false)} aria-label="Inchide meniul" />

          <div
            id="mobile-menu-panel"
            className="absolute inset-x-0 top-0 mobile-safe-x mobile-safe-bottom"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 66px)' }}
          >
            <div className="mx-auto max-w-[560px] overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
              <nav className="px-4 pb-4 pt-3" aria-label="Meniu mobil">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeHref === item.href;

                    return (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between rounded-[12px] border px-4 py-3 text-[15px] font-medium transition-colors ${
                            isActive
                              ? 'border-[rgba(15,42,68,0.12)] bg-[#f8fafc] text-[#0F2A44]'
                              : 'border-slate-100 bg-white text-slate-700 active:bg-slate-50'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isActive ? 'bg-[#0F2A44]' : 'bg-slate-300'
                              }`}
                              aria-hidden
                            />
                            {item.label}
                          </span>
                          <ChevronRight className={`h-4 w-4 ${isActive ? 'text-[#0F2A44]' : 'text-slate-300'}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 grid gap-2">
                  <a
                    href="tel:+40770220110"
                    className="flex items-center gap-3 rounded-[12px] border border-slate-100 bg-[#f8fafc] px-4 py-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
                      <Phone className="h-4 w-4 text-[#0F2A44]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-slate-500">Programari</span>
                      <span className="block text-[15px] font-semibold text-slate-900">0770 220 110</span>
                    </span>
                  </a>

                  <a
                    href="https://wa.me/40770220110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-[12px] border border-[#dceee3] bg-[#f3fbf6] px-4 py-3 text-[#1f6c43]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      <span className="text-[15px] font-semibold">Scrie pe WhatsApp</span>
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-4 rounded-[12px] border border-slate-100 bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-[13px] text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>Calea Domneasca 234, Targoviste</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[13px] text-slate-600">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>Luni - Joi 9:00 - 18:00 | Vineri 9:00 - 15:00</span>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
