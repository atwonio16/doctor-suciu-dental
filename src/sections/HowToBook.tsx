import { Phone, ClipboardCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'Ne contactezi',
    description: 'Sună la 0770 220 110 sau completează formularul online. Îți răspundem în maxim 30 de minute.',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: ClipboardCheck,
    number: '02',
    title: 'Consultație',
    description: 'Vii la clinică pentru o evaluare completă și gratuită. Discutăm opțiunile și stabilim planul de tratament.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Tratament',
    description: 'Începem tratamentul în termen de 24-48h. Te ținem la curent cu fiecare pas și ne asigurăm că ești mulțumit.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
];

const HowToBook = () => {
  return (
    <section id="cum-te-programezi" className="relative w-full py-20 overflow-hidden bg-[#f8fafc]">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-100 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Cum Funcționăm
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Cum te programezi
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              Trei pași simpli până la zâmbetul dorit. Fără birocrație, fără așteptări.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-[#e2e8f0]" />
                )}
                
                <div className="bg-white rounded-2xl p-8 border border-[#e2e8f0] h-full hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                  {/* Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-[#e2e8f0]">{step.number}</span>
                    <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center`}>
                      <step.icon className={`w-7 h-7 ${step.iconColor}`} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-[#0f172a] text-xl mb-3">{step.title}</h3>
                  <p className="text-[#64748b] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-transparent hover:text-[#1e3a5f]"
            >
              Începe acum
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToBook;
