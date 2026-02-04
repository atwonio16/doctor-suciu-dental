import { Link } from 'react-router-dom';
import { Heart, Sparkles, Smile, Shield, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Heart,
    title: 'Consultație gratuită',
    description: 'Prima vizită este gratuită. Evaluare completă fără durere.',
    price: '0 RON',
    color: 'navy',
  },
  {
    icon: Sparkles,
    title: 'Albire profesională',
    description: 'Zâmbet mai alb cu până la 8 nuanțe într-o singură ședință.',
    price: 'de la 600 RON',
    color: 'teal',
  },
  {
    icon: Smile,
    title: 'Invisalign',
    description: 'Aparate invizibile pentru îndreptarea dinților. Discret și confortabil.',
    price: 'de la 8.000 RON',
    color: 'coral',
  },
  {
    icon: Shield,
    title: 'Implanturi dentare',
    description: 'Soluții permanente pentru dinți lipsă. Garanție 10 ani.',
    price: 'de la 2.800 RON',
    color: 'navy',
  },
];

const colorStyles = {
  navy: {
    icon: 'icon-navy',
    price: 'text-medical-navy',
  },
  teal: {
    icon: 'icon-teal',
    price: 'text-medical-teal',
  },
  coral: {
    icon: 'icon-coral',
    price: 'text-medical-coral',
  },
};

const ServicesPreview = () => {
  return (
    <section id="servicii" className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-teal-soft rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-pill mb-4">SERVICIILE NOASTRE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-navy mb-4">
              Soluții complete pentru <span className="text-medical-teal">zâmbetul tău</span>
            </h2>
            <p className="text-medical-gray max-w-2xl mx-auto text-lg">
              De la consultații simple la tratamente complexe, suntem aici să te ajutăm.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {services.map((service, index) => {
              const colors = colorStyles[service.color as keyof typeof colorStyles];
              return (
                <div 
                  key={index} 
                  className="group p-6 rounded-2xl bg-white border border-medical-warm card-hover"
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-medical-navy mb-2">{service.title}</h3>
                  <p className="text-sm text-medical-gray mb-3">{service.description}</p>
                  <p className={`text-sm font-semibold ${colors.price}`}>{service.price}</p>
                </div>
              );
            })}
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
