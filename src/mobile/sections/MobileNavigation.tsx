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
      <header className="fixed inset-x-0 top-0 z-50 mobile-safe-x">
        <div
          className="mx-auto mt-0 max-w-[560px] border-b border-[rgba(18,24,38,0.08)] bg-[rgba(244,241,235,0.94)] shadow-[0_6px_18px_rgba(18,24,38,0.04)]"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="flex h-14 items-center gap-2 px-1">
            <Link
              to="/"
              className="flex min-w-0 flex-1 flex-col justify-center rounded-md px-3 py-1"
              aria-label="Doctor Suciu Dental Clinic"
              onClick={handleLogoClick}
            >
              <span className="truncate text-[13px] font-semibold tracking-[0.01em] text-slate-900 leading-none">
                DOCTOR SUCIU
              </span>
              <span className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-slate-500 leading-none">
                Dental Clinic
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[rgba(18,24,38,0.1)] bg-[rgba(255,255,255,0.72)] text-slate-900 active:scale-[0.96] transition-transform"
              aria-expanded={isOpen}
              aria-controls="mobile-menu-panel"
              aria-label={isOpen ? 'Inchide meniul' : 'Deschide meniul'}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/28"
            onClick={() => setIsOpen(false)}
            aria-label="Inchide meniul"
          />

          <div
            id="mobile-menu-panel"
            className="absolute inset-x-0 top-0 mobile-safe-x mobile-safe-bottom"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 66px)' }}
          >
            <div className="mx-auto max-w-[560px] overflow-hidden rounded-[20px] border border-[rgba(18,24,38,0.1)] bg-[#fbfaf7] shadow-[0_20px_34px_rgba(18,24,38,0.1)]">
              <nav className="px-4 pb-4 pt-3" aria-label="Meniu mobil">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeHref === item.href;

                    return (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between rounded-[14px] border px-4 py-3 text-[15px] font-medium transition-colors ${
                            isActive
                              ? 'border-[rgba(23,56,81,0.14)] bg-[#eef2f5] text-[#173851]'
                              : 'border-[rgba(18,24,38,0.06)] bg-white/70 text-slate-700 active:bg-white'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isActive ? 'bg-[#173851]' : 'bg-slate-300'
                              }`}
                              aria-hidden
                            />
                            {item.label}
                          </span>
                          <ChevronRight className={`h-4 w-4 ${isActive ? 'text-[#173851]' : 'text-slate-300'}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 grid gap-2">
                  <a
                    href="tel:+40770220110"
                    className="flex items-center gap-3 rounded-[14px] border border-[rgba(18,24,38,0.08)] bg-white/75 px-4 py-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#eef2f5]">
                      <Phone className="h-4 w-4 text-[#173851]" />
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
                    className="flex items-center justify-between rounded-[14px] border border-[#d7eadf] bg-[#edf5f0] px-4 py-3 text-[#1f6c43]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      <span className="text-[15px] font-semibold">Scrie pe WhatsApp</span>
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-4 rounded-[14px] border border-[rgba(18,24,38,0.08)] bg-white/75 px-4 py-3">
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
