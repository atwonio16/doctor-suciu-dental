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
    <section id="servicii" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Ce putem face pentru tine</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Alege ce te intereseaza sau vezi lista completa.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <Link
              key={item.anchorId}
              to={`/servicii#${item.anchorId}`}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all active:scale-[0.98] active:bg-slate-50"
            >
              {/* Icon */}
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: item.softBg, color: item.accent }}
              >
                <item.Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-[15px] font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-5">
          <Link
            to="/servicii"
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0B1E32] text-white text-[15px] font-semibold transition-transform active:scale-[0.98]"
          >
            Vezi toate serviciile
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
