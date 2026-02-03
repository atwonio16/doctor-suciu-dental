import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  Smile, 
  Shield,
  ArrowRight 
} from 'lucide-react';
import { FadeText } from '@/components/animations/FadeText';
import { AnimatedCard } from '@/components/animations/AnimatedCard';

const services = [
  {
    icon: Heart,
    title: 'Primul pas',
    description: 'Consultație blândă și evaluare completă, fără grabă și fără durere.',
    color: 'bg-rose-100',
    iconColor: 'text-rose-500',
    price: 'Gratuit prima vizită'
  },
  {
    icon: Sparkles,
    title: 'Zâmbet luminos',
    description: 'Albire profesională și fațete pentru zâmbetul la care ai visat.',
    color: 'bg-amber-100',
    iconColor: 'text-amber-500',
    price: 'de la 600 RON'
  },
  {
    icon: Smile,
    title: 'Alignere transparente',
    description: 'Îndreptare discretă cu Invisalign - invizibil și confortabil.',
    color: 'bg-sky-100',
    iconColor: 'text-sky-500',
    price: 'de la 8.000 RON'
  },
  {
    icon: Shield,
    title: 'Soluții permanente',
    description: 'Implanturi și coroane care arată și funcționează natural.',
    color: 'bg-violet-100',
    iconColor: 'text-violet-500',
    price: 'de la 2.800 RON'
  },
];

const ServicesPreview = () => {
  return (
    <section id="servicii" className="w-full py-20 lg:py-28 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-clinic-teal uppercase mb-3">
                Cum te putem ajuta
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-clinic-navy mb-4">
                Servicii create pentru <span className="text-clinic-teal">confortul tău</span>
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-clinic-gray max-w-2xl mx-auto">
                Fie că este vorba de o simplă igienizare sau un plan de tratament complex, 
                suntem aici să te sprijinim la fiecare pas.
              </p>
            </FadeText>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <FadeText key={index} delay={0.1 * index} direction="up">
                <AnimatedCard
                  hoverScale={1.03}
                  enableGlow={false}
                  className="group h-full p-6 lg:p-8 rounded-3xl bg-slate-50 border-0 hover:shadow-xl transition-all duration-300"
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif font-medium text-xl text-clinic-navy mb-3 group-hover:text-clinic-teal transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-clinic-gray leading-relaxed mb-4 text-sm">
                    {service.description}
                  </p>

                  {/* Price */}
                  <p className="text-sm font-medium text-clinic-teal mb-4">
                    {service.price}
                  </p>

                  {/* Link */}
                  <Link 
                    to="/servicii"
                    className="inline-flex items-center gap-1 text-sm font-medium text-clinic-navy hover:text-clinic-teal transition-colors group/link"
                  >
                    Detalii
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </AnimatedCard>
              </FadeText>
            ))}
          </div>

          {/* CTA */}
          <FadeText delay={0.6} direction="up" className="text-center mt-12">
            <Link
              to="/servicii"
              className="inline-flex items-center gap-2 px-8 py-4 bg-clinic-navy text-white rounded-full font-medium hover:bg-clinic-navy/90 transition-all hover:scale-105 hover:shadow-lg"
            >
              Vezi toate serviciile și prețurile
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
