import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePublicFAQ } from '../../hooks/useSupabaseData';

const defaultFAQs = [
  {
    question: 'Cât costă o coroană dentară?',
    answer: 'Prețul unei coroane depinde de materialul ales (ceramică, zirconiu, metalo-ceramică) și de complexitatea cazului. În consultație îți prezentăm toate opțiunile cu avantaje și costuri pentru a alege ce ți se potrivește.',
  },
  {
    question: 'Oferiți rate pentru tratamentele dentare?',
    answer: 'Da, înțelegem că tratamentele dentare pot fi o investiție semnificativă. Oferim posibilitatea de plată în rate prin partenerii noștri financiari, pentru ca tu să poți începe tratamentul fără griji.',
  },
  {
    question: 'Cât de des trebuie să merg la control?',
    answer: 'Recomandăm controale de rutină la fiecare 6 luni pentru prevenție. Dacă ai un tratament în desfășurare sau probleme speciale, medicul îți va recomanda intervalul potrivit pentru tine.',
  },
  {
    question: 'Cât durează un tratament de implant dentar?',
    answer: 'Durata depinde de complexitatea cazului. În consultație îți explicăm etapele și un interval realist pentru cazul tău.',
  },
  {
    question: 'Este dureroasă procedura de implant dentar?',
    answer: 'Lucrăm cu anestezie locală și cu explicații pas cu pas. Scopul este să te simți în siguranță pe tot parcursul tratamentului.',
  },
];

export function MobileFAQ() {
  // Prima întrebare deschisă by default
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { data: supabaseFAQ } = usePublicFAQ();

  const faqs = useMemo(() => {
    if (supabaseFAQ.length > 0) {
      return supabaseFAQ.map((item) => ({
        question: item.question,
        answer: item.answer,
      }));
    }
    return defaultFAQs;
  }, [supabaseFAQ]);

  return (
    <section id="faq" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-4 text-center">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Întrebări frecvente</h2>
        </div>

        {/* FAQ List - separator doar prin linie */}
        <div className="border-t border-slate-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={`${faq.question}-${index}`}
                className="border-b border-slate-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left transition-colors active:bg-slate-50"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[15px] transition-colors ${isOpen ? 'font-semibold text-[#0B1E32]' : 'font-medium text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-[#0B1E32]' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>

                {/* Animație smooth pentru deschidere */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA - buton verde WhatsApp */}
        <div className="mt-6 text-center">
          <p className="text-[14px] text-slate-600">Nu ai găsit răspunsul căutat?</p>
          <a
            href="https://wa.me/40770220110"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] transition-all active:scale-[0.98] hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Scrie-ne pe WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
