import { Award, Cpu, Heart, ShieldCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FadeText } from '@/components/animations/FadeText';

const benefits = [
  {
    icon: Award,
    title: 'Medici cu experiență',
    description: 'Peste 15 ani de experiență în stomatologie cu sute de cazuri rezolvate cu succes.',
  },
  {
    icon: Cpu,
    title: 'Tehnologie modernă',
    description: 'Echipamente de ultimă generație pentru diagnostic precis și tratamente eficiente.',
  },
  {
    icon: Heart,
    title: 'Abordare personalizată',
    description: 'Fiecare pacient primește un plan de tratament adaptat nevoilor sale specifice.',
  },
  {
    icon: ShieldCheck,
    title: 'Rezultate naturale',
    description: 'Ne concentrăm pe estetică și funcționalitate pentru un zâmbet care arată natural.',
  },
];

const faqs = [
  {
    question: 'Ce avantaje oferă clinica noastră?',
    answer: 'Oferim tratamente stomatologice complete cu tehnologie modernă, medici experimentați și o abordare personalizată pentru fiecare pacient. Clinica noastră din Târgoviște este echipată cu aparatură de ultimă generație și respectăm cele mai stricte standarde de igienă.',
  },
  {
    question: 'Serviciile voastre sunt garantate?',
    answer: 'Da, oferim garanție pentru toate tratamentele noastre. Implanturile dentare beneficiază de garanție extinsă de până la 10 ani, iar pentru alte proceduri oferim garanție conform standardelor internaționale.',
  },
  {
    question: 'Cum știu ce tratament mi se potrivește?',
    answer: 'În cadrul consultației inițiale, efectuăm o evaluare completă și îți prezentăm toate opțiunile disponibile. Împreună vom decide cel mai bun plan de tratament pentru nevoile și bugetul tău.',
  },
  {
    question: 'Aparatura din clinică este modernă?',
    answer: 'Da, investim constant în echipamente de ultimă generație. Folosim radiologie digitală cu doză redusă, scanere intraorale, și tehnologie CAD/CAM pentru restaurări precise.',
  },
  {
    question: 'Cât durează un tratament?',
    answer: 'Durata tratamentului variază în funcție de complexitatea cazului. O consultație durează aproximativ 30-45 minute, iar tratamentele complexe precum implanturile pot necesita mai multe ședințe pe parcursul câtorva luni.',
  },
];

const WhyChooseSection = () => {
  return (
    <section id="avantaje" className="w-full py-20 lg:py-24 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                De Ce Să Ne Alegi
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
                Experiență, tehnologie și grijă
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Ne dedicăm fiecărui pacient cu aceeași pasiune și profesionalism
              </p>
            </FadeText>
          </div>

          {/* Benefits Grid */}
          <FadeText delay={0.3} direction="up">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-sky-50 transition-colors duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500 transition-colors duration-300">
                    <benefit.icon className="w-7 h-7 text-sky-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeText>

          {/* FAQ Section */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* FAQ Content */}
            <FadeText delay={0.4} direction="right" distance={40}>
              <div>
                <h3 className="font-bold text-2xl lg:text-3xl text-slate-900 mb-6">
                  Întrebări frecvente
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`} 
                      className="border-b border-slate-200"
                    >
                      <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-sky-500 py-4 text-base">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 pb-4 text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </FadeText>

            {/* Image */}
            <FadeText delay={0.5} direction="left" distance={40}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/technology_equipment.jpg"
                    alt="Echipament stomatologic modern"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
