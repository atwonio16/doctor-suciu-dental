import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CirclePlus, 
  AlignCenter, 
  Sparkles, 
  Smile, 
  Baby, 
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Stethoscope,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const services = [
  {
    id: 'implanturi',
    icon: CirclePlus,
    title: 'Implant dentar',
    shortDesc: 'Soluții permanente pentru dinți lipsă. Tehnologie modernă, garanție 10 ani.',
    description: 'Implanturile dentare sunt soluția cea mai avansată pentru înlocuirea dinților lipsă. Folosim sisteme premium de implanturi cu rată de succes de 98%.',
    features: [
      'Implanturi premium cu garanție 10 ani',
      'Tehnologie computer ghidată',
      'Procedură minim invazivă',
      'Coroane personalizate digital',
    ],
    price: 'de la 2.800 RON',
    duration: '3-6 luni',
    bg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    borderColor: 'border-indigo-100',
  },
  {
    id: 'ortodontie',
    icon: AlignCenter,
    title: 'Ortodonție',
    shortDesc: 'Aparate fixe și Invisalign. Îndreptăm dinții pentru un zâmbet perfect.',
    description: 'Indiferent de vârstă, putem corecta alinierea dinților tăi. Oferim atât aparate tradiționale, cât și soluții invizibile Invisalign.',
    features: [
      'Invisalign (toate nivelele)',
      'Aparate fixe metalice/ceramice',
      'Consultație ortodontică gratuită',
      'Plan de tratament digital 3D',
    ],
    price: 'de la 8.000 RON',
    duration: '6-24 luni',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-100',
  },
  {
    id: 'albire',
    icon: Sparkles,
    title: 'Albire dentară',
    shortDesc: 'Zâmbet mai alb cu până la 8 nuanțe. Rezultate imediate, fără durere.',
    description: 'Albirea profesională în cabinet oferă rezultate vizibile imediat. Folosim sisteme testate care protejează smalțul.',
    features: [
      'Albire Zoom în cabinet',
      'Kituri pentru acasă personalizate',
      'Rezultate de lungă durată',
      'Fără sensibilitate post-tratament',
    ],
    price: 'de la 600 RON',
    duration: '1-2 ședințe',
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    borderColor: 'border-sky-100',
  },
  {
    id: 'estetica',
    icon: Smile,
    title: 'Estetică dentară',
    shortDesc: 'Fațete, coroane și redesign de zâmbet. Transformări vizibile instant.',
    description: 'Transformă-ți zâmbetul cu tratamente estetice personalizate. De la fațete din ceramică la coroane all-ceramic.',
    features: [
      'Fațete din ceramică E-max',
      'Coroane zirconiu/ceramică',
      'Design digital de zâmbet',
      'Rezultate naturale garantate',
    ],
    price: 'de la 1.500 RON',
    duration: '1-2 săptămâni',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-100',
  },
  {
    id: 'copii',
    icon: Baby,
    title: 'Stomatologie copii',
    shortDesc: 'Atmosferă prietenoasă pentru cei mici. Pedodonție cu răbdare și blândețe.',
    description: 'Clinica noastră este prietenoasă cu copiii. Dr. Elena Dumitrescu creează o experiență pozitivă pentru cei mici.',
    features: [
      'Primă vizită gratuită (până la 3 ani)',
      'Tratamente fără durere',
      'Sigilări preventive gratuite',
      'Programări dimineața devreme',
    ],
    price: 'de la 100 RON',
    duration: '20-45 min',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-100',
  },
  {
    id: 'urgente',
    icon: AlertCircle,
    title: 'Urgențe stomatologice',
    shortDesc: 'Durere de dinți, fracturi, infecții. Te ajutăm rapid în situații urgente.',
    description: 'Programări de urgență în aceeași zi pentru durere acută, traume sau complicații. Sună-ne și îți găsim un slot rapid.',
    features: [
      'Programare în aceeași zi',
      'Disponibil și în weekend',
      'Tratament salvator de dinți',
      'Anestezie eficientă',
    ],
    price: 'de la 200 RON',
    duration: '30-60 min',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-red-100',
  },
];

const faqs = [
  {
    question: 'Cât costă o consultație inițială?',
    answer: 'Prima consultație este gratuită! Evaluăm situația ta dentară, discutăm opțiunile și îți prezentăm un plan de tratament personalizat cu costuri transparente.',
  },
  {
    question: 'Ce metode de plată acceptați?',
    answer: 'Acceptăm plata cash, card, transfer bancar și rate fără dobândă prin cardurile de credit participante. Pentru tratamentele complexe oferim și opțiuni de plată în rate.',
  },
  {
    question: 'Oferiți garanție pentru tratamente?',
    answer: 'Da, oferim garanție pentru toate tratamentele. Implanturile dentare au garanție de 10 ani, coroanele și fațetele au garanție de 5 ani, iar ortodonția include retenție post-tratament.',
  },
  {
    question: 'Cât durează un implant dentar?',
    answer: 'Procesul complet durează între 3 și 6 luni. Inserarea implantului durează 30-60 minute, apoi urmează o perioadă de vindecare de 2-3 luni, după care se montează coroana definitivă.',
  },
];

const ServicesPage = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* Hero Header */}
      <section className="relative w-full py-16 lg:py-20 bg-[#f8fafc] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-40" />
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Serviciile Noastre
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Soluții complete pentru zâmbetul tău
            </h1>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto mb-10">
              De la consultații simple la tratamente complexe, suntem aici să te ajutăm.
              <span className="text-medical-navy font-medium"> Toate serviciile cu garanție.</span>
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <Shield className="w-4 h-4 text-medical-navy" />
                <span>Garanție 10 ani implanturi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <Stethoscope className="w-4 h-4 text-medical-navy" />
                <span>Consultație gratuită</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <Clock className="w-4 h-4 text-medical-navy" />
                <span>Programare rapidă</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`group bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 ${service.borderColor} hover:border-medical-navy/20`}
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105`}>
                    <service.icon className={`w-7 h-7 ${service.iconColor}`} strokeWidth={1.5} />
                  </div>

                  <h2 className="font-semibold text-[#0f172a] text-xl mb-2 group-hover:text-medical-navy transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-[#64748b] text-sm leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Quick Info */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-medical-navy font-semibold">{service.price}</span>
                    <span className="text-[#cbd5e1]">|</span>
                    <span className="text-[#64748b]">{service.duration}</span>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleService(service.id)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-medical-teal hover:text-medical-navy transition-colors"
                  >
                    {expandedService === service.id ? (
                      <>
                        Mai puține detalii
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Vezi detalii complete
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedService === service.id && (
                  <div className="px-6 pb-6 border-t border-[#e2e8f0] pt-4">
                    <p className="text-[#64748b] text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-[#0f172a]">
                          <CheckCircle2 className="w-4 h-4 text-medical-teal flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 bg-medical-navy text-white border-2 border-medical-navy hover:bg-transparent hover:text-medical-navy"
                    >
                      PROGRAMEAZĂ CONSULTAȚIE
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 bg-[#f8fafc]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Întrebări Frecvente
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">
              Informații utile despre servicii
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#f8fafc] transition-colors"
                >
                  <span className="font-medium text-[#0f172a] pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-medical-teal flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-medical-teal flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-[#64748b] text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="max-w-4xl mx-auto bg-medical-navy rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Nu știi ce serviciu ți se potrivește?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Programează o consultație gratuită și împreună vom găsi soluția ideală pentru zâmbetul tău.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-white text-medical-navy border-2 border-white hover:bg-transparent hover:text-white"
            >
              PROGRAMEAZĂ CONSULTAȚIE GRATUITĂ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
