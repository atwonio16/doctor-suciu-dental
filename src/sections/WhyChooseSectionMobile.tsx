import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePublicFAQ } from '../hooks/useSupabaseData';

interface FAQItemProps {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ faq, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg bg-white overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-medium text-gray-900 text-[15px] pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-[13px] text-gray-500 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const defaultFAQs = [
  {
    question: 'Cât durează un tratament de implant dentar?',
    answer: 'Durata variază în funcție de complexitatea cazului. În general, procesul complet durează între 3 și 6 luni.',
  },
  {
    question: 'Este dureroasă procedura?',
    answer: 'Nu. Procedura se realizează sub anestezie locală, astfel încât pacientul nu simte durere în timpul intervenției.',
  },
  {
    question: 'Cât costă o coroană dentară?',
    answer: 'Costul depinde de materialul ales. Vă invităm la o primă vizită pentru o evaluare personalizată.',
  },
  {
    question: 'Oferiți rate pentru tratamente?',
    answer: 'Da. Oferim posibilitatea de plată în rate fără dobândă prin partenerii noștri.',
  },
];

const WhyChooseSectionMobile = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { data: supabaseFAQ } = usePublicFAQ();

  const faqs = useMemo(() => {
    if (supabaseFAQ.length > 0) {
      return supabaseFAQ.slice(0, 4).map(item => ({
        question: item.question,
        answer: item.answer,
      }));
    }
    return defaultFAQs;
  }, [supabaseFAQ]);

  return (
    <section className="py-12 pb-16 bg-white lg:hidden">
      {/* Header */}
      <div className="px-5 mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Înainte să ajungi la noi
        </h2>
        <p className="text-sm text-gray-500">
          Răspunsuri la cele mai frecvente întrebări, ca să știi dinainte la ce să te aștepți și să vii liniștit.
        </p>
      </div>

      {/* FAQ List */}
      <div className="px-5 space-y-3">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSectionMobile;
