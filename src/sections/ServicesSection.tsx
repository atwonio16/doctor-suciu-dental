import { 
  Stethoscope, 
  Sparkles, 
  AlignCenter, 
  Crown, 
  Smile, 
  ShieldCheck,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section id="servicii" className="w-full py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-pill mb-4">SERVICIILE NOASTRE</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Tratamente complete pentru <span className="gradient-text">zâmbetul tău</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-slate-50 card-hover">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
                  <service.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{service.description}</p>
                <p className="text-sm font-semibold text-sky-500">{service.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/servicii" className="btn-primary inline-flex items-center gap-2">
              VEZI TOATE SERVICIILE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
