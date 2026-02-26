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
          className="mx-auto mt-2 rounded-[18px] border border-slate-200/80 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.06)]"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <div className="flex h-14 items-center gap-2 px-3">
            <Link
              to="/"
              className="flex min-w-0 flex-1 flex-col justify-center rounded-xl px-2 py-1"
              aria-label="Doctor Suciu Dental Clinic"
            >
              <span className="truncate text-[13px] font-semibold tracking-tight text-slate-900 leading-none">
                DOCTOR SUCIU
              </span>
              <span className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-slate-500 leading-none">
                Dental Clinic
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 active:scale-[0.96] transition-transform"
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
            className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
            aria-label="Inchide meniul"
          />

          <div
            id="mobile-menu-panel"
            className="absolute inset-x-0 top-0 mobile-safe-x mobile-safe-bottom"
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 76px)' }}
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
              <nav className="px-4 pb-4 pt-3" aria-label="Meniu mobil">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = activeHref === item.href;

                    return (
                      <li key={item.label}>
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-[15px] font-medium transition-colors ${
                            isActive
                              ? 'border-[#c8d9ea] bg-[#eef5fb] text-[#123455]'
                              : 'border-slate-100 bg-white text-slate-700 active:bg-slate-50'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronRight className={`h-4 w-4 ${isActive ? 'text-[#123455]' : 'text-slate-300'}`} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 grid gap-2">
                  <a
                    href="tel:+40770220110"
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Phone className="h-4 w-4 text-[#123455]" />
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
                    className="flex items-center justify-between rounded-2xl border border-[#d4f5df] bg-[#edfdf2] px-4 py-3 text-[#0f6e3b]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        <MessageCircle className="h-4 w-4" />
                      </span>
                      <span className="text-[15px] font-semibold">Scrie pe WhatsApp</span>
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-100 bg-white px-4 py-3">
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
