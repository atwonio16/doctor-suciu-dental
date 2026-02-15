import { Phone, ClipboardCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Contactează-ne',
    description: 'Sună la 0770 220 110 sau completează formularul online',
    action: 'tel:+40770220110',
    actionText: 'Sună acum',
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Consultație gratuită',
    description: 'Vii la clinică pentru evaluare și plan de tratament personalizat',
    action: '/contact',
    actionText: 'Programează-te',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Începe tratamentul',
    description: 'Începem în 24-48h. Te ținem la curent cu fiecare pas',
    action: '/servicii',
    actionText: 'Vezi servicii',
  },
];

const HowToBook = () => {
  return (
    <section id="cum-te-programezi" className="py-10 bg-white">
      {/* Section Header */}
      <div className="px-4 mb-6">
        <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
          Cum funcționăm
        </span>
        <h2 className="text-title-1 text-gray-900 mt-1">
          3 pași simpli
        </h2>
      </div>

      {/* Steps Timeline */}
      <div className="px-4 space-y-0">
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Timeline Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-[19px] top-[48px] w-0.5 h-[calc(100%-32px)] bg-gray-100" />
            )}
            
            {/* Step Number & Icon */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center">
                <step.icon className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0d9488] rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">{step.number}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-[17px] text-gray-900 mb-1">
                {step.title}
              </h3>
              <p className="text-[14px] text-gray-500 mb-3 leading-relaxed">
                {step.description}
              </p>
              
              {step.action.startsWith('tel:') ? (
                <a 
                  href={step.action}
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#0d9488]"
                >
                  {step.actionText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link 
                  to={step.action}
                  className="inline-flex items-center gap-1 text-[14px] font-semibold text-[#0d9488]"
                >
                  {step.actionText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="px-4 mt-8">
        <div className="bg-[#1e3a5f] rounded-2xl p-5">
          <p className="text-white/80 text-[14px] mb-1">Ai întrebări?</p>
          <h3 className="text-white font-bold text-[18px] mb-4">
            Sună-ne pentru o evaluare gratuită
          </h3>
          <a 
            href="tel:+40770220110"
            className="flex items-center justify-center gap-2 w-full h-[48px] bg-white rounded-full text-[16px] font-semibold text-[#1e3a5f] press-effect"
          >
            <Phone className="w-5 h-5" />
            0770 220 110
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowToBook;
