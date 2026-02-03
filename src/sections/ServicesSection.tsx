import { 
  Stethoscope, 
  Sparkles, 
  AlignCenter, 
  Crown, 
  Smile, 
  ShieldCheck,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/animations/FadeText';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { AnimatedCard } from '@/components/animations/AnimatedCard';

const services = [
  {
    icon: Stethoscope,
    title: 'Consultații',
    description: 'Evaluare completă a sănătății dentare cu diagnostic precis și plan de tratament personalizat.',
    price: 'de la 150 RON',
  },
  {
    icon: Crown,
    title: 'Implanturi Dentare',
    description: 'Soluții permanente pentru dinți lipsă cu implanturi de ultimă generație și garanție extinsă.',
    price: 'de la 2.800 RON',
  },
  {
    icon: Sparkles,
    title: 'Estetică Dentară',
    description: 'Albire profesională, fațete din ceramică și remodelare pentru un zâmbet perfect.',
    price: 'de la 350 RON',
  },
  {
    icon: AlignCenter,
    title: 'Ortodonție / Invisalign',
    description: 'Îndreptare discretă cu alignere transparente pentru adulți și adolescenți.',
    price: 'de la 8.000 RON',
  },
  {
    icon: Smile,
    title: 'Coroane Dentare',
    description: 'Restaurări estetice și funcționale cu coroane din ceramică sau zirconiu.',
    price: 'de la 1.200 RON',
  },
  {
    icon: ShieldCheck,
    title: 'Proteze Dentare',
    description: 'Proteze fixe și mobile personalizate pentru o funcționalitate optimă.',
    price: 'de la 1.500 RON',
  },
];

const ServicesSection = () => {
  return (
    <section id="servicii" className="w-full py-20 lg:py-28 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Serviciile Noastre
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
                Tratamente complete pentru <span className="text-sky-500">zâmbetul tău</span>
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Oferim o gamă completă de servicii stomatologice, de la consultații 
                de rutină până la proceduri complexe de implantologie.
              </p>
            </FadeText>
          </div>

          {/* Services Grid */}
          <StaggerContainer 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            staggerDelay={0.1}
            initialDelay={0.2}
          >
            {services.map((service, index) => (
              <AnimatedCard
                key={index}
                hoverScale={1.03}
                enableGlow={true}
                glowColor="rgba(45, 212, 191, 0.15)"
                className="group p-6 lg:p-8 rounded-2xl bg-slate-50 border border-gray-100 hover:border-sky-500/30 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center mb-5 group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-serif font-medium text-xl text-slate-900 mb-3 group-hover:text-sky-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm font-semibold text-sky-500">
                    {service.price}
                  </span>
                  <a
                    href="#contact"
                    className="flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-sky-500 transition-colors group/link"
                  >
                    Detalii
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </AnimatedCard>
            ))}
          </StaggerContainer>

          {/* Bottom CTA */}
          <FadeText delay={0.6} direction="up" className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-slate-900 hover:bg-slate-900-light text-white font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <a href="#contact">
                Programează o consultație
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
