import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Heart, 
  Smile, 
  Shield,
  ArrowLeft,
  CheckCircle2,
  Info
} from 'lucide-react';
import { FadeText } from '@/components/animations/FadeText';

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  services: {
    name: string;
    price: string;
    description: string;
    duration?: string;
  }[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'consultatii',
    title: 'Consultații & Diagnostic',
    icon: Heart,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    description: 'Primul pas către un zâmbet sănătos - evaluare completă fără durere',
    services: [
      { name: 'Consultație de bun venit', price: 'Gratuit', description: 'Prima vizită pentru a ne cunoaște', duration: '30 min' },
      { name: 'Consultație completă', price: '150 RON', description: 'Evaluare detaliată cu plan personalizat', duration: '45 min' },
      { name: 'Control de rutină', price: '100 RON', description: 'Verificare periodică a sănătății dentare', duration: '20 min' },
      { name: 'Radiografie panoramică digitală', price: '120 RON', description: 'Vizualizare completă, doză minimă de radiații', duration: '5 min' },
      { name: 'CT 3D (Cone Beam)', price: '450 RON', description: 'Imagistică 3D avansată pentru planificare', duration: '15 min' },
    ]
  },
  {
    id: 'prevenire',
    title: 'Prevenire & Igienă',
    icon: Shield,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    description: 'Îngrijire blândă pentru zâmbete strălucitoare',
    services: [
      { name: 'Igienizare profesională', price: '350 RON', description: 'Curățare în profunzime, netedă și delicată', duration: '45 min' },
      { name: 'Air Flow - periaj profesional', price: '200 RON', description: 'Curățare cu apă, aer și pulbere fină', duration: '30 min' },
      { name: 'Fluorizare preventivă', price: '80 RON', description: 'Protecție pentru dinți sensibili', duration: '15 min' },
      { name: 'Sigilare dinți', price: '100 RON/dinte', description: 'Protecție pentru dinții copiilor', duration: '20 min/dinte' },
    ]
  },
  {
    id: 'albire',
    title: 'Estetică & Albire',
    icon: Sparkles,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    description: 'Zâmbetul la care ai visat, în deplină siguranță',
    services: [
      { name: 'Albire Zoom în cabinet', price: '1.200 RON', description: 'Rezultat imediat, cu 8 nuanțe mai alb', duration: '90 min' },
      { name: 'Albire acasă - kit personalizat', price: '600 RON', description: 'Program gradual, confortul casei tale', duration: '7-14 zile' },
      { name: 'Fațete din ceramică', price: '1.800 RON/dinte', description: 'Transformare completă, naturală', duration: '2 ședințe' },
      { name: 'Fațete compozit', price: '600 RON/dinte', description: 'Rezultat rapid și accesibil', duration: '1 ședință' },
      { name: 'Corecție gingivală', price: '800 RON', description: 'Contur armonios pentru zâmbet', duration: '45 min' },
    ]
  },
  {
    id: 'ortodontie',
    title: 'Îndreptare Discretă',
    icon: Smile,
    color: 'text-sky-500',
    bgColor: 'bg-sky-50',
    description: 'Alignere transparente pentru zâmbete încrezătoare',
    services: [
      { name: 'Invisalign Lite', price: '8.000 RON', description: 'Până la 14 alignere, cazuri ușoare', duration: '3-6 luni' },
      { name: 'Invisalign Full', price: '15.000 RON', description: 'Tratament complet, orice complexitate', duration: '12-18 luni' },
      { name: 'Aparat ceramic estetic', price: '5.500 RON', description: 'Brackets discreți, eficiență maximă', duration: '12-24 luni' },
      { name: 'Retenție după tratament', price: '400 RON', description: 'Gutieră pentru menținere rezultat', duration: 'pe viață' },
    ]
  },
  {
    id: 'implanturi',
    title: 'Soluții Permanente',
    icon: Heart,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50',
    description: 'Zâmbet complet, funcțional și frumos',
    services: [
      { name: 'Implant dentar premium', price: '2.800 RON', description: 'Calitate elvețiană, garanție 10 ani', duration: '3-6 luni' },
      { name: 'Coroană pe implant ceramică', price: '2.000 RON', description: 'Aspect 100% natural', duration: '2 săptămâni' },
      { name: 'Reconstrucție osoasă', price: '800-1.500 RON', description: 'Pregătire blândă pentru implant', duration: '4-6 luni' },
      { name: 'Proteză pe implante', price: 'de la 12.000 RON', description: 'Stabilitate completă, confort maxim', duration: '3-6 luni' },
    ]
  },
  {
    id: 'copii',
    title: 'Copii & Familie',
    icon: Smile,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    description: 'Experiențe plăcute pentru cei mici, încă de la prima vizită',
    services: [
      { name: 'Prima vizită (0-3 ani)', price: 'Gratuit', description: 'Cunoaștere blândă cu dentistul', duration: '15 min' },
      { name: 'Control copii', price: '100 RON', description: 'Verificare joacă, fără stres', duration: '20 min' },
      { name: 'Tratament carie copii', price: '200-400 RON', description: 'Tehnici blânde, fără durere', duration: '30 min' },
      { name: 'Extracție dinți de lapte', price: '150 RON', description: 'Rapid și fără frică', duration: '10 min' },
    ]
  },
];

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('consultatii');
  
  const currentCategory = serviceCategories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <section className="w-full pt-32 pb-16 px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <FadeText direction="up">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-clinic-navy/70 hover:text-clinic-teal transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi acasă
            </Link>
          </FadeText>
          
          <div className="text-center max-w-3xl mx-auto">
            <FadeText delay={0.1} direction="up">
              <span className="inline-block px-4 py-2 rounded-full bg-clinic-teal/10 text-clinic-teal text-sm font-medium mb-6">
                Serviciile Noastre
              </span>
            </FadeText>
            
            <FadeText delay={0.2} direction="up">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-clinic-navy mb-6">
                Îngrijire <span className="text-clinic-teal">blândă</span> pentru toată familia
              </h1>
            </FadeText>
            
            <FadeText delay={0.3} direction="up">
              <p className="text-lg text-clinic-gray leading-relaxed">
                Fiecare zâmbet este unic. De aceea, adaptăm fiecare tratament pentru a fi 
                cât mai confortabil și eficient pentru tine și cei dragi.
              </p>
            </FadeText>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeText delay={0.4} direction="up">
            <div className="flex flex-wrap justify-center gap-3">
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300
                      ${isActive 
                        ? `${category.bgColor} ${category.color} shadow-lg scale-105` 
                        : 'bg-white text-clinic-gray hover:bg-slate-100 shadow-sm'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{category.title}</span>
                  </button>
                );
              })}
            </div>
          </FadeText>
        </div>
      </section>

      {/* Active Category Content */}
      {currentCategory && (
        <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-24">
          <div className="max-w-5xl mx-auto">
            <FadeText direction="up">
              <div className={`${currentCategory.bgColor} rounded-3xl p-8 lg:p-12 mb-12`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center ${currentCategory.color}`}>
                    <currentCategory.icon className="w-7 h-7" />
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-clinic-navy">
                    {currentCategory.title}
                  </h2>
                </div>
                <p className="text-clinic-gray text-lg max-w-2xl">
                  {currentCategory.description}
                </p>
              </div>
            </FadeText>

            <div className="space-y-4">
              {currentCategory.services.map((service, index) => (
                <FadeText key={service.name} delay={0.1 * index} direction="up">
                  <div className="group bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-clinic-teal/20">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <CheckCircle2 className={`w-5 h-5 mt-1 ${currentCategory.color} flex-shrink-0`} />
                          <div>
                            <h3 className="font-serif text-xl text-clinic-navy group-hover:text-clinic-teal transition-colors">
                              {service.name}
                            </h3>
                            <p className="text-clinic-gray mt-1">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        {service.duration && (
                          <span className="inline-block mt-2 text-sm text-clinic-gray/70 bg-slate-100 px-3 py-1 rounded-full">
                            ⏱ {service.duration}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 lg:text-right">
                        <span className="text-2xl lg:text-3xl font-bold text-clinic-teal">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeText>
              ))}
            </div>

            {/* Note */}
            <FadeText delay={0.6} direction="up">
              <div className="mt-12 flex items-start gap-3 p-6 bg-amber-50 rounded-2xl">
                <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">
                  <strong>Notă importantă:</strong> Prețurile sunt orientative și pot varia în funcție de complexitatea 
                  cazului individual. O consultație inițială este întotdeauna necesară pentru un plan de tratament 
                  personalizat și o estimare exactă. Oferim și opțiuni de plată în rate.
                </p>
              </div>
            </FadeText>

            {/* CTA */}
            <FadeText delay={0.7} direction="up">
              <div className="mt-12 text-center">
                <Link 
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-clinic-navy text-white rounded-full font-medium hover:bg-clinic-navy/90 transition-all hover:scale-105 hover:shadow-lg"
                >
                  Programează o consultație gratuită
                  <span className="text-xl">→</span>
                </Link>
                <p className="mt-4 text-clinic-gray">
                  Prima vizită de cunoaștere este gratuită, fără obligații
                </p>
              </div>
            </FadeText>
          </div>
        </section>
      )}

      {/* Trust Section */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeText direction="up">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-100 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="font-serif text-xl text-clinic-navy mb-2">Abordare blândă</h3>
                <p className="text-clinic-gray">Tehnică modernă, fără durere și anxietate</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-serif text-xl text-clinic-navy mb-2">Transparență totală</h3>
                <p className="text-clinic-gray">Prețuri clare, fără costuri ascunse</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sky-100 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="font-serif text-xl text-clinic-navy mb-2">Rezultate naturale</h3>
                <p className="text-clinic-gray">Zâmbete frumoase, care par că au fost mereu acolo</p>
              </div>
            </div>
          </FadeText>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
