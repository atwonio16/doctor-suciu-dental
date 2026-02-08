import { Microscope, HeartPulse, Award, MapPin, Star, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const benefits = [
  {
    icon: Microscope,
    title: 'Tehnologie modernă',
    description: 'Echipamente de ultimă generație pentru diagnostic precis și tratamente minim invazive.',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: HeartPulse,
    title: 'Fără durere',
    description: 'Tehnici moderne și anestezie eficientă pentru proceduri confortabile, fără stres.',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: Award,
    title: 'Medici cu experiență',
    description: 'Peste 15 ani de practică și mii de pacienți mulțumiți. Formare continuă.',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: MapPin,
    title: 'Locație centrală Târgoviște',
    description: 'Acces ușor în centrul orașului, pe Calea Domnească. Parcare disponibilă.',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Star,
    title: 'Recenzii excelente',
    description: '5.0 stele pe Google din 51+ recenzii. Peste 1.500 de pacienți mulțumiți anual.',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
];

const faqs = [
  {
    question: 'Ce avantaje oferă clinica?',
    answer: 'Oferim tratamente complete cu tehnologie modernă, medici experimentați și abordare personalizată. Clinica este echipată cu aparatură de ultimă generație și respectăm cele mai stricte standarde de igienă.',
  },
  {
    question: 'Serviciile sunt garantate?',
    answer: 'Da, oferim garanție pentru toate tratamentele. Implanturile dentare beneficiază de garanție extinsă de până la 10 ani.',
  },
  {
    question: 'Cum știu ce tratament mi se potrivește?',
    answer: 'În cadrul consultației inițiale efectuăm o evaluare completă și îți prezentăm toate opțiunile disponibile. Împreună vom decide cel mai bun plan de tratament.',
  },
  {
    question: 'Este dureroasă procedura?',
    answer: 'Utilizăm tehnici moderne și anestezie eficientă pentru ca toate procedurile să fie cât mai confortabile posibil. Majoritatea pacienților raportează disconfort minim.',
  },
  {
    question: 'Cât durează un tratament?',
    answer: 'Durata variază în funcție de complexitate. O consultație durează 30-45 minute, iar tratamentele complexe pot necesita mai multe ședințe.',
  },
];

interface FAQItemProps {
  faq: { question: string; answer: string };
  index: number;
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
    <div className="border border-[#e2e8f0] rounded-xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f8fafc] transition-colors duration-300"
      >
        <span className="font-medium text-[#0f172a] pr-4">{faq.question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-[#0891b2] flex-shrink-0 transition-transform duration-500 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <div 
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={contentRef} className="px-4 pb-4">
          <p className="text-[#222222] text-sm leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="relative w-full py-20 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Benefits - Premium category style */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                De Ce Să Ne Alegi
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Diferența care contează
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              Descoperă de ce peste 1.500 de pacienți ne aleg anual pentru zâmbetul lor perfect.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group text-center p-6 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#cbd5e1] transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50"
              >
                <div className={`w-14 h-14 rounded-2xl ${benefit.bg} flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-105`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-[#0f172a] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#64748b]">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ - Premium category style */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#94a3b8]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                  Întrebări Frecvente
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] mb-6 tracking-tight">
                Răspunsuri la întrebările tale
              </h3>
              
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                  />
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[500px] rounded-2xl border border-[#e2e8f0] overflow-hidden">
              <img
                src="/faq-clinic.png"
                alt="Echipament stomatologic modern"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/technology_equipment.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
