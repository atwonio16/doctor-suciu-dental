import { useState } from 'react';
import { Search, Calculator, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeText } from '@/components/animations/FadeText';
import { AnimatedCard } from '@/components/animations/AnimatedCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Category = 'all' | 'consultatii' | 'implanturi' | 'estetica' | 'ortodontie' | 'protetica' | 'chirurgie';

interface Service {
  id: string;
  name: string;
  category: Category;
  price: number;
  priceTo?: number;
  description: string;
  popular?: boolean;
}

const services: Service[] = [
  // Consultații și Diagnostic
  { id: '1', name: 'Consultație inițială', category: 'consultatii', price: 150, description: 'Evaluare completă a sănătății dentare și plan de tratament' },
  { id: '2', name: 'Control periodic', category: 'consultatii', price: 100, description: 'Verificare de rutină a stării dentare' },
  { id: '3', name: 'Radiografie panoramică', category: 'consultatii', price: 120, description: 'Radiografie digitală panoramică' },
  { id: '4', name: 'Radiografie retroalveolară', category: 'consultatii', price: 50, description: 'Radiografie individuală per dinte' },
  { id: '5', name: 'CT Cone Beam', category: 'consultatii', price: 450, description: 'Tomografie computerizată 3D' },
  
  // Implanturi Dentare
  { id: '6', name: 'Implant dentar premium', category: 'implanturi', price: 2800, description: 'Implant din titan de înaltă calitate', popular: true },
  { id: '7', name: 'Implant dentar standard', category: 'implanturi', price: 2200, description: 'Implant dentar calitate standard' },
  { id: '8', name: 'Lifting sinus bilateral', category: 'implanturi', price: 3500, description: 'Adiție de os în zona superioară' },
  { id: '9', name: 'Grefă osoasă', category: 'implanturi', price: 800, priceTo: 1500, description: 'Reconstrucție osoasă locală' },
  { id: '10', name: 'Bont protetic', category: 'implanturi', price: 400, description: 'Element de legătură implant-coroniță' },
  
  // Estetică Dentară
  { id: '11', name: 'Albire dentară în cabinet', category: 'estetica', price: 1200, description: 'Albire profesională cu lampă LED', popular: true },
  { id: '12', name: 'Albire dentară acasă', category: 'estetica', price: 600, description: 'Kit personalizat pentru acasă' },
  { id: '13', name: 'Fațetă ceramică E-max', category: 'estetica', price: 1800, description: 'Fațetă din ceramică de ultimă generație', popular: true },
  { id: '14', name: 'Fațetă compozit', category: 'estetica', price: 600, description: 'Fațetă din compozit direct' },
  { id: '15', name: 'Restaurație estetică compozit', category: 'estetica', price: 350, priceTo: 500, description: 'Plombă estetică frontală' },
  { id: '16', name: 'Corecție gingivală laser', category: 'estetica', price: 800, description: ' Remodelare contur gingival' },
  
  // Ortodonție
  { id: '17', name: 'Aparat fix metalic', category: 'ortodontie', price: 4500, description: 'Brackets metalici tradiționali' },
  { id: '18', name: 'Aparat fix ceramic', category: 'ortodontie', price: 5500, description: 'Brackets estetici din ceramică' },
  { id: '19', name: 'Invisalign Full', category: 'ortodontie', price: 15000, description: 'Alignere transparente - caz complex', popular: true },
  { id: '20', name: 'Invisalign Lite', category: 'ortodontie', price: 8000, description: 'Alignere transparente - caz ușor/moderat' },
  { id: '21', name: 'Invisalign i7', category: 'ortodontie', price: 5000, description: 'Alignere - caz minor' },
  { id: '22', name: 'Retainer fix', category: 'ortodontie', price: 800, description: 'Retainer lingual după tratament' },
  { id: '23', name: 'Gutieră mobilă', category: 'ortodontie', price: 400, description: 'Gutieră de contenție' },
  
  // Protetică
  { id: '24', name: 'Coroană ceramică integrală', category: 'protetica', price: 1800, description: 'Coroană din ceramică 100%', popular: true },
  { id: '25', name: 'Coroană zirconiu', category: 'protetica', price: 1500, description: 'Coroană din zirconiu multi-strat' },
  { id: '26', name: 'Coroană ceramică pe metal', category: 'protetica', price: 800, description: 'Coroană metalo-ceramică' },
  { id: '27', name: 'Coroană pe implant', category: 'protetica', price: 2000, description: 'Coroană ceramică pe implant' },
  { id: '28', name: 'Proteză mobilă totală', category: 'protetica', price: 2500, description: 'Proteză completă acrylic' },
  { id: '29', name: 'Proteză mobilă parțială', category: 'protetica', price: 1500, description: 'Proteză cu cârlige' },
  { id: '30', name: 'Proteză scheletată', category: 'protetica', price: 3500, description: 'Proteză cu schelet din crom-cobalt' },
  { id: '31', name: 'Proteză flexibilă', category: 'protetica', price: 2800, description: 'Proteză din nylon' },
  { id: '32', name: 'Lucrare provizorie', category: 'protetica', price: 200, description: 'Coroană/ fațetă provizorie' },
  
  // Chirurgie și Endodonție
  { id: '33', name: 'Extracție simplă', category: 'chirurgie', price: 200, description: 'Extracție dinte monoradicular' },
  { id: '34', name: 'Extracție molar', category: 'chirurgie', price: 350, description: 'Extracție dinte pluriradicular' },
  { id: '35', name: 'Extracție chirurgicală', category: 'chirurgie', price: 600, description: 'Extracție cu flap și osteotomie' },
  { id: '36', name: 'Tratament endodontic (canal)', category: 'chirurgie', price: 400, priceTo: 800, description: 'Tratament canal monoradicular/multiradicular', popular: true },
  { id: '37', name: 'Rețipire endodontică', category: 'chirurgie', price: 600, priceTo: 1000, description: 'Retratament canal' },
  { id: '38', name: 'Incizie abces', category: 'chirurgie', price: 300, description: 'Drenaj și tratament abces' },
  { id: '39', name: 'Regularizare alveolară', category: 'chirurgie', price: 500, description: 'Pregătire crestă pentru proteză' },
];

const categories = [
  { id: 'all', name: 'Toate serviciile' },
  { id: 'consultatii', name: 'Consultații' },
  { id: 'implanturi', name: 'Implanturi' },
  { id: 'estetica', name: 'Estetică' },
  { id: 'ortodontie', name: 'Ortodonție' },
  { id: 'protetica', name: 'Protetică' },
  { id: 'chirurgie', name: 'Chirurgie' },
];

const PricingSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [estimatorServices, setEstimatorServices] = useState<string[]>([]);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleServiceInEstimator = (serviceId: string) => {
    setEstimatorServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return estimatorServices.reduce((total, id) => {
      const service = services.find(s => s.id === id);
      if (service) {
        return total + (service.priceTo ? (service.price + service.priceTo) / 2 : service.price);
      }
      return total;
    }, 0);
  };

  const formatPrice = (price: number, priceTo?: number) => {
    if (priceTo) {
      return `${price.toLocaleString('ro-RO')} - ${priceTo.toLocaleString('ro-RO')} RON`;
    }
    return `${price.toLocaleString('ro-RO')} RON`;
  };

  return (
    <section id="preturi" className="w-full py-20 lg:py-28 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-clinic-teal uppercase mb-3">
                Tarife
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-clinic-navy mb-4">
                Lista completă de <span className="text-clinic-teal">prețuri</span>
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-clinic-gray max-w-2xl mx-auto">
                Prețuri transparente pentru toate serviciile noastre. Folosește estimatorul de costuri 
                pentru a calcula bugetul necesar.
              </p>
            </FadeText>
          </div>

          {/* Estimator CTA */}
          <FadeText delay={0.3} direction="up">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Dialog open={isEstimatorOpen} onOpenChange={setIsEstimatorOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-clinic-teal hover:bg-clinic-teal/90 text-white font-semibold px-8 h-14"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Estimator de costuri
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-clinic-navy">
                      Estimator de costuri
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="text-clinic-gray mb-6">
                      Selectează serviciile de care ai nevoie pentru a estima costul total:
                    </p>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => toggleServiceInEstimator(service.id)}
                          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                            estimatorServices.includes(service.id)
                              ? 'border-clinic-teal bg-clinic-teal/5'
                              : 'border-gray-200 hover:border-clinic-teal/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                              estimatorServices.includes(service.id)
                                ? 'bg-clinic-teal border-clinic-teal'
                                : 'border-gray-300'
                            }`}>
                              {estimatorServices.includes(service.id) && (
                                <Check className="w-3.5 h-3.5 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-clinic-navy">{service.name}</p>
                              <p className="text-sm text-clinic-gray">{service.description}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-clinic-teal">
                            {formatPrice(service.price, service.priceTo)}
                          </span>
                        </div>
                      ))}
                    </div>
                    {estimatorServices.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg text-clinic-gray">Servicii selectate:</span>
                          <span className="text-clinic-navy font-medium">{estimatorServices.length}</span>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xl font-serif font-medium text-clinic-navy">Estimare total:</span>
                          <span className="text-3xl font-bold text-clinic-teal">
                            {calculateTotal().toLocaleString('ro-RO')} RON
                          </span>
                        </div>
                        <p className="text-sm text-clinic-gray mb-4">
                          * Prețurile sunt orientative. Consultația inițială este necesară pentru un plan de tratament exact.
                        </p>
                        <Button 
                          className="w-full bg-clinic-navy hover:bg-clinic-navy/90 text-white h-12"
                          onClick={() => {
                            setIsEstimatorOpen(false);
                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          Programează consultație
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </FadeText>

          {/* Search & Filter */}
          <FadeText delay={0.4} direction="up">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-clinic-gray" />
                <Input
                  type="text"
                  placeholder="Caută serviciu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-gray-200 focus:border-clinic-teal focus:ring-clinic-teal"
                />
              </div>
              
              {/* Category Filter - Mobile */}
              <div className="md:hidden">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value as Category)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:border-clinic-teal focus:ring-1 focus:ring-clinic-teal"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </FadeText>

          {/* Category Tabs - Desktop */}
          <FadeText delay={0.5} direction="up">
            <div className="hidden md:flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as Category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-clinic-navy text-white shadow-lg'
                      : 'bg-gray-100 text-clinic-gray hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </FadeText>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service, index) => (
              <FadeText key={service.id} delay={0.1 * (index % 6)} direction="up">
                <AnimatedCard
                  hoverScale={1.02}
                  enableGlow={service.popular}
                  glowColor="rgba(45, 212, 191, 0.2)"
                  className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                    service.popular 
                      ? 'border-clinic-teal/30 bg-clinic-teal/5' 
                      : 'border-gray-100 bg-white hover:border-clinic-teal/20'
                  }`}
                >
                  {service.popular && (
                    <span className="absolute -top-3 left-6 px-3 py-1 bg-clinic-teal text-white text-xs font-semibold rounded-full">
                      Popular
                    </span>
                  )}
                  
                  <h3 className="font-serif font-medium text-lg text-clinic-navy mb-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-sm text-clinic-gray mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-clinic-teal">
                      {formatPrice(service.price, service.priceTo)}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEstimatorServices([service.id]);
                        setIsEstimatorOpen(true);
                      }}
                      className="text-clinic-navy hover:text-clinic-teal hover:bg-clinic-teal/10"
                    >
                      <Calculator className="w-4 h-4 mr-1" />
                      Estimare
                    </Button>
                  </div>
                </AnimatedCard>
              </FadeText>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16">
              <p className="text-clinic-gray text-lg">Nu am găsit servicii care să corespundă căutării.</p>
              <Button 
                variant="outline" 
                onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                className="mt-4"
              >
                Resetează filtrele
              </Button>
            </div>
          )}

          {/* Note */}
          <FadeText delay={0.6} direction="up">
            <div className="mt-12 p-6 bg-clinic-gray-bg rounded-2xl">
              <h4 className="font-serif font-medium text-lg text-clinic-navy mb-4">
                Informații importante
              </h4>
              <ul className="space-y-2 text-sm text-clinic-gray">
                <li className="flex items-start gap-2">
                  <span className="text-clinic-teal mt-0.5">•</span>
                  Prețurile afișate sunt orientative și pot varia în funcție de complexitatea cazului
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-clinic-teal mt-0.5">•</span>
                  O consultație inițială este necesară pentru un plan de tratament exact și o estimare corectă
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-clinic-teal mt-0.5">•</span>
                  Oferim opțiuni de plată în rate fără dobândă pentru tratamente complexe
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-clinic-teal mt-0.5">•</span>
                  Prețurile includ materialele și manopera
                </li>
              </ul>
            </div>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
