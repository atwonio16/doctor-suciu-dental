import { Link } from 'react-router-dom';
import { Heart, Sparkles, Smile, Shield, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Consultație gratuită',
    description: 'Prima vizită este gratuită. Evaluare completă fără durere.',
    price: '0 RON',
  },
  {
    icon: Sparkles,
    title: 'Albire profesională',
    description: 'Zâmbet mai alb cu până la 8 nuanțe într-o singură ședință.',
    price: 'de la 600 RON',
  },
  {
    icon: Smile,
    title: 'Invisalign',
    description: 'Aparate invizibile pentru îndreptarea dinților. Discret și confortabil.',
    price: 'de la 8.000 RON',
  },
  {
    icon: Shield,
    title: 'Implanturi dentare',
    description: 'Soluții permanente pentru dinți lipsă. Garanție 10 ani.',
    price: 'de la 2.800 RON',
  },
];

const ServicesPreview = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-pill mb-4">SERVICIILE NOASTRE</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Soluții complete pentru <span className="gradient-text">zâmbetul tău</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              De la consultații simple la tratamente complexe, suntem aici să te ajutăm.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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

          <div className="text-center">
            <Link to="/servicii" className="btn-primary inline-flex items-center gap-2">
              VEZI TOATE SERVICIILE ȘI PREȚURILE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
