import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { usePublicFAQ } from '../hooks/useSupabaseData';

interface FAQItemProps {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ faq, isOpen, onToggle }: FAQItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [faq.answer]);

  return (
    <div 
      className="border border-gray-200 rounded-lg bg-white overflow-hidden transition-colors hover:border-gray-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-200 ease-linear"
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={contentRef} className="px-5 pb-5">
          <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const defaultFAQs = [
  {
    question: 'Cât durează un tratament de implant dentar?',
    answer: 'Durata variază în funcție de complexitatea cazului. În general, procesul complet durează între 3 și 6 luni, incluzând perioada de vindecare esențială pentru succesul pe termen lung.',
  },
  {
    question: 'Este dureroasă procedura de implant dentar?',
    answer: 'Nu. Procedura se realizează sub anestezie locală, astfel încât pacientul nu simte durere în timpul intervenției. După procedură, pot apărea ușoare disconforturi gestionabile cu medicamente.',
  },
  {
    question: 'Cât costă o coroană dentară?',
    answer: 'Costul depinde de materialul ales (ceramică, zirconiu, metalo-ceramică) și complexitatea cazului. Vă invităm la o primă vizită pentru o evaluare personalizată și o ofertă exactă.',
  },
  {
    question: 'Oferiți rate pentru tratamentele dentare?',
    answer: 'Da. Înțelegem că tratamentele dentare reprezintă o investiție importantă. Oferim posibilitatea de plată în rate fără dobândă prin partenerii noștri.',
  },
  {
    question: 'Cât de des trebuie să merg la control?',
    answer: 'Recomandăm controale stomatologice de rutină la fiecare 6 luni. Pacienții cu tratamente complexe pot necesita vizite mai frecvente, conform recomandărilor medicului.',
  },
];

const WhyChooseSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const { data: supabaseFAQ } = usePublicFAQ();

  const faqs = useMemo(() => {
    if (supabaseFAQ.length > 0) {
      return supabaseFAQ.map(item => ({
        question: item.question,
        answer: item.answer,
      }));
    }
    return defaultFAQs;
  }, [supabaseFAQ]);

  return (
    <section className="w-full py-24 sm:py-28 lg:py-32 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
              Înainte să ajungi la noi
            </h2>
            <p className="text-base text-gray-500 mx-auto" style={{ whiteSpace: 'nowrap' }}>
              Răspunsuri la cele mai frecvente întrebări, ca să știi dinainte la ce să te aștepți și să vii liniștit.
            </p>
          </div>

          {/* FAQ Content - Grid with image, equal height */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-start">
            {/* FAQ List - takes 3 columns */}
            <div className="lg:col-span-3 space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>

            {/* Image - equal height with accordion, secondary */}
            <div className="lg:col-span-2 h-full">
              <div className="relative rounded-lg overflow-hidden bg-gray-100 h-full">
                <img
                  src="/faq-clinic.png"
                  alt="Echipament stomatologic modern"
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/technology_equipment.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
