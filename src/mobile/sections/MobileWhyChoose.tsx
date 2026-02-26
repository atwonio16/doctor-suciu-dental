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
    <section className="mobile-safe-x py-4" aria-labelledby="mobile-faq-title">
      <div className="mx-auto max-w-[560px]">
        <div className="mobile-panel p-4">
          <div className="mb-4">
            <p className="mobile-kicker">De ce noi</p>
            <h2 id="mobile-faq-title" className="mobile-title mt-1 text-[23px]">
              Vii mai linistit la consultatie
            </h2>
            <p className="mobile-body mt-1 text-[13px]">
              Inainte de tratament, pacientii au nevoie de claritate. Raspundem simplu si sincer.
            </p>
          </div>

          <div className="mb-4 grid gap-2">
            <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-[#f8fafc] px-3 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-white border border-slate-100">
                <ShieldCheck className="h-4 w-4 text-[#0F2A44]" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-slate-900">Explicatii clare</p>
                <p className="text-[12px] text-slate-600">Fara termeni complicati si fara graba.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-white px-3 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f8fafc] border border-slate-100">
                <Clock3 className="h-4 w-4 text-[#0f6e8a]" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-slate-900">Programari rapide</p>
                <p className="text-[12px] text-slate-600">Te orientam repede catre pasul potrivit.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[14px] border border-slate-200 bg-white px-3 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f4fbf6] border border-slate-100">
                <Sparkles className="h-4 w-4 text-[#0f6e3b]" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-slate-900">Rezultat natural</p>
                <p className="text-[12px] text-slate-600">Punem accent pe echilibru, nu pe exces.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={`${faq.question}-${index}`}
                  className="overflow-hidden rounded-[14px] border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left active:bg-slate-50"
                    aria-expanded={isOpen}
                    aria-controls={`mobile-faq-panel-${index}`}
                  >
                    <span className="text-[14px] font-medium leading-snug text-slate-900">{faq.question}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div id={`mobile-faq-panel-${index}`} className="px-4 pb-4">
                      <p className="rounded-[12px] border border-slate-100 bg-slate-50 px-3 py-3 text-[13px] leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
