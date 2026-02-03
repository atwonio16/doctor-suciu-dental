import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  Smile, 
  Shield,
  ArrowRight 
} from 'lucide-react';
import { FadeText } from '@/components/animations/FadeText';

const services = [
  {
    icon: Heart,
    title: 'Primul pas',
    description: 'Consultație blândă și evaluare completă, fără grabă și fără durere.',
    price: 'Gratuit prima vizită'
  },
  {
    icon: Sparkles,
    title: 'Zâmbet luminos',
    description: 'Albire profesională și fațete pentru zâmbetul la care ai visat.',
    price: 'de la 600 RON'
  },
  {
    icon: Smile,
    title: 'Alignere transparente',
    description: 'Îndreptare discretă cu Invisalign - invizibil și confortabil.',
    price: 'de la 8.000 RON'
  },
  {
    icon: Shield,
    title: 'Soluții permanente',
    description: 'Implanturi și coroane care arată și funcționează natural.',
    price: 'de la 2.800 RON'
  },
];

const ServicesPreview = () => {
  return (
    <section id="servicii" className="w-full py-16 lg:py-20 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Cum te putem ajuta
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                Servicii create pentru confortul tău
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Fie că este vorba de o simplă igienizare sau un plan de tratament complex
              </p>
            </FadeText>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <FadeText key={index} delay={0.1 * index} direction="up">
                <div className="group h-full p-6 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-lg transition-all duration-300">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>

                  {/* Price */}
                  <p className="text-sm font-medium text-sky-500 mb-3">
                    {service.price}
                  </p>

                  {/* Link */}
                  <Link 
                    to="/servicii"
                    className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-sky-500 transition-colors"
                  >
                    Detalii
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeText>
            ))}
          </div>

          {/* CTA */}
          <FadeText delay={0.6} direction="up" className="text-center mt-10">
            <Link
              to="/servicii"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-all hover:scale-105 hover:shadow-lg"
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
