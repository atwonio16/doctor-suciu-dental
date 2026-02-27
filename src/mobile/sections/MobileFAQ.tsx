import { useMemo, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { usePublicFAQ } from '../../hooks/useSupabaseData';

const defaultFAQs = [
  {
    question: 'Cat dureaza un tratament de implant dentar?',
    answer: 'Durata depinde de complexitatea cazului. In consultatie iti explicam etapele si un interval realist pentru cazul tau.',
  },
  {
    question: 'Este dureroasa procedura?',
    answer: 'Lucram cu anestezie locala si cu explicatii pas cu pas. Scopul este sa te simti in siguranta pe tot parcursul tratamentului.',
  },
  {
    question: 'Cum aflu costul unui tratament?',
    answer: 'Pretul exact se stabileste dupa evaluare. Iti prezentam optiuni si prioritizam tratamentele, ca sa ai claritate de la inceput.',
  },
  {
    question: 'Pot face programare pentru o discutie initiala?',
    answer: 'Da. Poti suna, scrie pe WhatsApp sau trimite formularul, iar noi revenim rapid cu o varianta potrivita.',
  },
];

export function MobileFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1E32]/5">
            <MessageCircle className="h-6 w-6 text-[#0B1E32]" />
          </div>
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Intrebari frecvente</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Raspunsuri la cele mai comune intrebari ale pacientilor.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={`${faq.question}-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left active:bg-slate-50"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-medium text-slate-900 pr-2">{faq.question}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-transform ${
                      isOpen ? 'rotate-180 bg-slate-50' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="rounded-xl bg-slate-50 p-3 text-[14px] leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-5 text-center">
          <p className="text-[14px] text-slate-600">Nu ai gasit raspunsul cautat?</p>
          <a
            href="https://wa.me/40770220110"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex h-[48px] items-center justify-center gap-2 rounded-full bg-[#0B1E32] px-6 text-[15px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" />
            Scrie-ne pe WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
