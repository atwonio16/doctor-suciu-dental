import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Baby,
  CirclePlus,
  Clock,
  Sparkles,
  Smile,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { usePublicServices } from '../../hooks/useSupabaseData';
import type { Service } from '../../lib/supabase';

type MobileServiceCard = {
  id: string;
  anchorId: string;
  title: string;
  description: string;
  category?: string;
  Icon: LucideIcon;
  accent: string;
  softBg: string;
  price?: string;
  duration?: string;
  features: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getIconForService = (title: string, category?: string): LucideIcon => {
  const text = `${title} ${category || ''}`.toLowerCase();
  if (text.includes('implant')) return CirclePlus;
  if (text.includes('estetic') || text.includes('albire') || text.includes('fatet')) return Sparkles;
  if (text.includes('ortodon') || text.includes('invisalign') || text.includes('aparat')) return Smile;
  if (text.includes('chirurg') || text.includes('extract')) return Stethoscope;
  if (text.includes('copil') || text.includes('pedo')) return Baby;
  if (text.includes('urg') || text.includes('durere')) return AlertCircle;
  return Stethoscope;
};

const paletteByIndex = (index: number) =>
  [
    { accent: '#123455', softBg: '#eef5fb' },
    { accent: '#0f6e8a', softBg: '#ebfbff' },
    { accent: '#0f6e3b', softBg: '#ecfbf2' },
    { accent: '#7c3b0f', softBg: '#fff3ea' },
    { accent: '#6d28d9', softBg: '#f5efff' },
    { accent: '#be123c', softBg: '#fff1f4' },
  ][index % 6];

const fallbackServices: MobileServiceCard[] = [
  {
    id: 'implantologie',
    anchorId: 'implantologie',
    title: 'Implantologie',
    description: 'Solutii durabile pentru inlocuirea dintilor lipsa, cu evaluare completa si plan etapizat.',
    category: 'Implanturi dentare',
    Icon: CirclePlus,
    accent: '#123455',
    softBg: '#eef5fb',
    price: '',
    duration: 'Plan in etape',
    features: ['Consultatie', 'Plan personalizat', 'Monitorizare'],
  },
  {
    id: 'ortodontie',
    anchorId: 'ortodontie',
    title: 'Ortodontie / Invisalign',
    description: 'Aparate dentare si alignere pentru aliniere corecta si confort pe termen lung.',
    category: 'Ortodontie',
    Icon: Smile,
    accent: '#0f6e8a',
    softBg: '#ebfbff',
    price: '',
    duration: 'In functie de caz',
    features: ['Evaluare', 'Plan digital', 'Controale periodice'],
  },
  {
    id: 'estetica-dentara',
    anchorId: 'estetica-dentara',
    title: 'Estetica dentara',
    description: 'Fatete, coroane si ajustari fine pentru un zambet natural, nu artificial.',
    category: 'Estetica',
    Icon: Sparkles,
    accent: '#0f6e3b',
    softBg: '#ecfbf2',
    price: '',
    duration: 'Evaluare initiala',
    features: ['Design estetic', 'Simulare', 'Finisaj natural'],
  },
];

function mapServiceToCard(service: Service, index: number): MobileServiceCard {
  const colors = paletteByIndex(index);

  return {
    id: service.id,
    anchorId: slugify(service.title),
    title: service.title,
    description: service.description || 'Tratament personalizat in functie de nevoile tale.',
    category: service.category,
    Icon: getIconForService(service.title, service.category),
    accent: colors.accent,
    softBg: colors.softBg,
    price: service.price,
    duration: service.duration,
    features: (service.features || []).slice(0, 3),
  };
}

export function MobileServices() {
  const location = useLocation();
  const { data: supabaseServices, loading, error } = usePublicServices();
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);

  const services = useMemo(() => {
    if (supabaseServices.length > 0) {
      return supabaseServices.slice(0, 3).map(mapServiceToCard);
    }
    return fallbackServices.slice(0, 3);
  }, [supabaseServices]);

  useEffect(() => {
    if (!location.hash || services.length === 0) return;

    const targetId = decodeURIComponent(location.hash.slice(1));

    const timer = window.setTimeout(() => {
      const element = document.getElementById(targetId);
      if (!element) return;

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightedCard(targetId);
    }, 140);

    return () => window.clearTimeout(timer);
  }, [location.hash, services.length]);

  useEffect(() => {
    if (!highlightedCard) return;

    const timer = window.setTimeout(() => setHighlightedCard(null), 1800);
    return () => window.clearTimeout(timer);
  }, [highlightedCard]);

  return (
    <section
      className="mobile-safe-x pb-8"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 86px)' }}
      aria-labelledby="mobile-services-title"
    >
      <div className="mx-auto max-w-[560px] space-y-4">
        <div className="rounded-[28px] border border-white/80 bg-gradient-to-b from-white to-[#f5f8fc] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#123455]">Pagina servicii</p>
          <h1 id="mobile-services-title" className="mt-1 text-[24px] font-semibold tracking-tight text-slate-900">
            Serviciile clinicii
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Am lasat pe mobil cele mai cautate 3 servicii, ca sa ajungi rapid unde ai nevoie. Restul le discutam la consultatie.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-[12px]">
            <a
              href="tel:+40770220110"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-800 active:scale-[0.985] transition-transform"
            >
              <ArrowRight className="h-4 w-4 text-[#123455]" />
              Suna pentru orientare
            </a>
            <Link
              to="/contact"
              className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#123455] px-3 font-semibold text-white active:scale-[0.985] transition-transform"
            >
              Programare
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {error && (
            <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
              Nu am putut incarca lista completa din baza de date. Afisam o selectie de fallback.
            </p>
          )}
        </div>

        {loading && supabaseServices.length === 0 ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse rounded-3xl border border-white/80 bg-white p-4">
                <div className="mb-3 flex items-start gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 rounded bg-slate-100" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-4/5 rounded bg-slate-100" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-24 rounded-full bg-slate-100" />
                  <div className="h-7 w-20 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => {
              const isHighlighted = highlightedCard === service.anchorId;

              return (
                <article
                  key={service.id}
                  id={service.anchorId}
                  className={`scroll-mt-24 rounded-3xl border bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.05)] transition-all ${
                    isHighlighted
                      ? 'border-[#c8d9ea] ring-2 ring-[#dfeefa]'
                      : 'border-white/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: service.softBg, color: service.accent }}
                    >
                      <service.Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-2">
                        {service.category && (
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                            {service.category}
                          </span>
                        )}
                        {service.duration && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600">
                            <Clock className="h-3 w-3" />
                            {service.duration}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-2 text-[17px] font-semibold leading-snug text-slate-900">{service.title}</h2>
                      <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{service.description}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.features.length > 0 ? (
                          service.features.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700"
                            >
                              {feature}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600">
                            Consultatie si plan personalizat
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">Orientare rapida</p>
                          <p className="truncate text-[13px] font-medium text-slate-700">
                            {service.price || 'Pretul exact se stabileste dupa evaluare'}
                          </p>
                        </div>

                        <Link
                          to="/contact"
                          className="inline-flex h-10 items-center justify-center rounded-xl bg-[#123455] px-3 text-[12px] font-semibold text-white active:scale-[0.985] transition-transform"
                        >
                          Programeaza
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
