import { ArrowRight, CirclePlus, Smile, Sparkles, Stethoscope, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { usePublicServices } from '../../hooks/useSupabaseData';

type ServicePreviewItem = {
  anchorId: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
  softBg: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getIconForTitle = (title: string, category?: string): LucideIcon => {
  const text = `${title} ${category || ''}`.toLowerCase();
  if (text.includes('implant')) return CirclePlus;
  if (text.includes('ortodon') || text.includes('invisalign') || text.includes('aparat')) return Smile;
  if (text.includes('albire') || text.includes('estetic') || text.includes('fatet')) return Sparkles;
  return Stethoscope;
};

const defaultItems: ServicePreviewItem[] = [
  {
    anchorId: 'implantologie',
    title: 'Implant dentar',
    description: 'Solutie durabila pentru dinti lipsa, cu plan clar si explicatii pe inteles.',
    Icon: CirclePlus,
    accent: '#123455',
    softBg: '#eef5fb',
  },
  {
    anchorId: 'ortodontie',
    title: 'Ortodontie / Invisalign',
    description: 'Aliniere discreta, confortabila si adaptata ritmului tau.',
    Icon: Smile,
    accent: '#0f6e8a',
    softBg: '#ebfbff',
  },
  {
    anchorId: 'estetica-dentara',
    title: 'Estetica dentara',
    description: 'Fatete, coroane si detalii estetice care pastreaza naturaletea.',
    Icon: Sparkles,
    accent: '#0f6e3b',
    softBg: '#ecfbf2',
  },
];

export function MobileServicesPreview() {
  const { data: supabaseServices } = usePublicServices();

  const items = useMemo<ServicePreviewItem[]>(() => {
    if (supabaseServices.length > 0) {
      return supabaseServices.slice(0, 3).map((service, index) => {
        const icon = getIconForTitle(service.title, service.category);

        const palette = [
          { accent: '#123455', softBg: '#eef5fb' },
          { accent: '#0f6e8a', softBg: '#ebfbff' },
          { accent: '#0f6e3b', softBg: '#ecfbf2' },
          { accent: '#7c3b0f', softBg: '#fff3ea' },
        ][index % 4];

        return {
          anchorId: slugify(service.title),
          title: service.title,
          description: service.description || 'Tratament personalizat in functie de nevoile tale.',
          Icon: icon,
          accent: palette.accent,
          softBg: palette.softBg,
        };
      });
    }

    return defaultItems;
  }, [supabaseServices]);

  return (
    <section id="servicii" className="mobile-safe-x py-4">
      <div className="mx-auto max-w-[560px]">
        <div className="mobile-panel p-4">
          <div className="mb-4">
            <p className="mobile-kicker">Servicii</p>
            <h2 className="mobile-title mt-1 text-[23px]">
              Ce putem face pentru tine
            </h2>
            <p className="mobile-body mt-1 text-[13px]">
              Alege direct ce te intereseaza sau intra pe pagina de servicii pentru lista completa.
            </p>
          </div>

          <div className="space-y-2.5">
            {items.map((item, index) => (
              <Link
                key={item.anchorId}
                to={`/servicii#${item.anchorId}`}
                className="group relative flex items-start gap-3 rounded-[14px] border border-slate-200 bg-white p-3 active:scale-[0.99] transition-transform"
              >
                <span
                  className="absolute bottom-2 left-2 top-2 w-[3px] rounded-full"
                  style={{ backgroundColor: item.accent }}
                  aria-hidden
                />
                <span
                  className="mt-0.5 ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-slate-100"
                  style={{ backgroundColor: item.softBg, color: item.accent }}
                >
                  <item.Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="block text-[15px] font-semibold text-slate-900">{item.title}</span>
                    <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">
                      0{index + 1}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-slate-600">
                    {item.description}
                  </span>
                </span>

                <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-slate-300 transition-transform group-active:translate-x-0.5" />
              </Link>
            ))}
          </div>

          <div className="mt-4">
            <Link
              to="/servicii"
              className="mobile-primary-btn flex h-12 items-center justify-center gap-2 px-4 text-[14px] font-semibold active:scale-[0.985] transition-transform"
            >
              Vezi toate serviciile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
