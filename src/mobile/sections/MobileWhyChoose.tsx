import { useMemo, useState } from 'react';
import { ChevronDown, Clock3, ShieldCheck, Sparkles } from 'lucide-react';
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

export function MobileWhyChoose() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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
    <section className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Vii mai linistit la consultatie</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Inainte de tratament, pacientii au nevoie de claritate.
          </p>
        </div>

        {/* Features */}
        <div className="mb-5 grid gap-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50">
              <ShieldCheck className="h-5 w-5 text-[#0B1E32]" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Explicatii clare</p>
              <p className="text-[13px] text-slate-500">Fara termeni complicati si fara graba.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50">
              <Clock3 className="h-5 w-5 text-[#0B1E32]" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Programari rapide</p>
              <p className="text-[13px] text-slate-500">Te orientam repede catre pasul potrivit.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50">
              <Sparkles className="h-5 w-5 text-[#0B1E32]" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-slate-900">Rezultat natural</p>
              <p className="text-[13px] text-slate-500">Punem accent pe echilibru, nu pe exces.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={`${faq.question}-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left active:bg-slate-50"
                  aria-expanded={isOpen}
                >
                  <span className="text-[14px] font-medium text-slate-900">{faq.question}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 transition-transform ${
                      isOpen ? 'rotate-180' : ''
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
      </div>
    </section>
  );
}
