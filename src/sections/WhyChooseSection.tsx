import { Award, Cpu, Heart, ShieldCheck, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const benefits = [
  {
    icon: Award,
    title: 'Experiență dovedită',
    description: 'Peste 15 ani de practică și mii de pacienți mulțumiți.',
  },
  {
    icon: Cpu,
    title: 'Tehnologie modernă',
    description: 'Echipamente de ultimă generație pentru tratamente precise.',
  },
  {
    icon: Heart,
    title: 'Abordare personalizată',
    description: 'Fiecare pacient primește atenție și plan de tratament individual.',
  },
  {
    icon: ShieldCheck,
    title: 'Garanție reală',
    description: 'Oferim garanție pentru toate tratamentele efectuate.',
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
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white/60 backdrop-blur-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/80 transition-colors duration-300"
      >
        <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-500 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <div 
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={contentRef} className="px-4 pb-4">
          <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const WhyChooseSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Warm background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-white">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-100/30 via-sky-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-pink-100/25 via-amber-100/15 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Benefits */}
          <div className="text-center mb-16">
            <span className="category-pill mb-4">DE CE SĂ NE ALEGI</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Profesionalism <span className="gradient-text">autentic</span>,<br />
              rezultate <span className="gradient-text">convingătoare</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Descoperă de ce peste 1.500 de pacienți ne aleg anual pentru zâmbetul lor perfect.
              Tehnologie premium, prețuri accesibile, garanție reală.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-sky-500" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="category-pill mb-4">ÎNTREBĂRI FRECVENTE</span>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Răspunsuri la <span className="gradient-text">întrebările tale</span>
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

            {/* Image with fixed height - no badge */}
            <div className="relative h-[500px] rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/faq-clinic.png"
                alt="Echipament stomatologic modern"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to existing image if new one doesn't exist yet
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
