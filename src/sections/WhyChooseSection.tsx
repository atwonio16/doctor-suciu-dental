import { useState } from 'react';
import { Microscope, HeartPulse, Award, MapPin, ChevronDown, Shield, Clock, ThumbsUp } from 'lucide-react';

const benefits = [
  {
    icon: Microscope,
    title: 'Tehnologie modernă',
    description: 'Echipamente de ultimă generație',
    color: 'bg-sky-500',
  },
  {
    icon: HeartPulse,
    title: 'Fără durere',
    description: 'Proceduri confortabile',
    color: 'bg-rose-500',
  },
  {
    icon: Award,
    title: 'Experiență vastă',
    description: 'Peste 15 ani în domeniu',
    color: 'bg-amber-500',
  },
  {
    icon: MapPin,
    title: 'Locație centrală',
    description: 'Parcare disponibilă',
    color: 'bg-emerald-500',
  },
];

const faqs = [
  {
    question: 'Cât durează o consultație?',
    answer: 'O consultație inițială durează aproximativ 30-45 minute. Include examinarea completă, radiografie dacă este necesar și stabilirea planului de tratament.',
    icon: Clock,
  },
  {
    question: 'Oferiți garanție pentru tratamente?',
    answer: 'Da, oferim garanție pentru toate tratamentele. Implanturile dentare beneficiază de garanție extinsă de până la 10 ani.',
    icon: Shield,
  },
  {
    question: 'Este dureroasă procedura?',
    answer: 'Utilizăm tehnici moderne și anestezie eficientă pentru ca toate procedurile să fie cât mai confortabile posibil. Majoritatea pacienților raportează disconfort minim sau deloc.',
    icon: ThumbsUp,
  },
];

const WhyChooseSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-10 bg-gray-50">
      {/* Benefits Grid */}
      <div className="px-4 mb-8">
        <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
          De ce să ne alegi
        </span>
        <h2 className="text-title-1 text-gray-900 mt-1 mb-5">
          Diferența care contează
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl p-4">
              <div className={`w-10 h-10 ${benefit.color} rounded-lg flex items-center justify-center mb-3`}>
                <benefit.icon className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-[14px] text-gray-900 mb-0.5">
                {benefit.title}
              </h3>
              <p className="text-[12px] text-gray-500">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4">
        <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
          Întrebări frecvente
        </span>
        <h2 className="text-title-1 text-gray-900 mt-1 mb-5">
          Răspunsuri la întrebările tale
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-10 h-10 bg-[#0d9488]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <faq.icon className="w-5 h-5 text-[#0d9488]" />
                </div>
                <span className="flex-1 font-semibold text-[15px] text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openFaq === index && (
                <div className="px-4 pb-4 pl-[68px]">
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
