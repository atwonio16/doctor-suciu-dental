import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const cases = [
  {
    id: 1,
    title: 'Albire Profesională',
    description: 'Rezultat vizibil după o singură ședință',
    beforeLabel: 'Înainte',
    afterLabel: 'După',
    color: 'from-amber-100 to-amber-50',
  },
  {
    id: 2,
    title: 'Ortodonție Invisible',
    description: 'Zâmbet perfect în 6 luni',
    beforeLabel: 'Înainte',
    afterLabel: 'După',
    color: 'from-teal-100 to-teal-50',
  },
  {
    id: 3,
    title: 'Fațete Dentare',
    description: 'Transformare completă a zâmbetului',
    beforeLabel: 'Înainte',
    afterLabel: 'După',
    color: 'from-sky-100 to-sky-50',
  },
];

const BeforeAfterSection = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-px bg-[#1e3a5f]" />
                <span className="text-sm font-semibold tracking-wider text-[#1e3a5f] uppercase">
                  Rezultate Reale
                </span>
              </div>
              
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-[#0f172a] leading-tight tracking-tight">
                Transformări care<br className="hidden sm:block" /> vorbesc de la sine
              </h2>
            </div>
            
            {/* CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 bg-[#0f172a] text-white hover:bg-[#1e3a5f] active:scale-95 self-start lg:self-auto"
            >
              <Sparkles className="w-4 h-4" />
              PROGRAMEAZĂ O CONSULTAȚIE
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cases Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-xl hover:shadow-[#0f172a]/5 transition-all duration-300"
              >
                {/* Images Container */}
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${caseItem.color} p-4`}>
                  <div className="absolute inset-4 flex gap-3">
                    {/* Before Image */}
                    <div className="flex-1 relative rounded-xl overflow-hidden bg-white shadow-lg">
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center p-4">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-2xl">😁</span>
                          </div>
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            {caseItem.beforeLabel}
                          </span>
                        </div>
                      </div>
                      {/* Label */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-semibold text-white">ÎNAINTE</span>
                      </div>
                    </div>
                    
                    {/* After Image */}
                    <div className="flex-1 relative rounded-xl overflow-hidden bg-white shadow-lg ring-2 ring-[#0d9488]/20">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
                        <div className="text-center p-4">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-[#0d9488]/10 flex items-center justify-center">
                            <span className="text-2xl">✨</span>
                          </div>
                          <span className="text-xs font-medium text-[#0d9488] uppercase tracking-wider">
                            {caseItem.afterLabel}
                          </span>
                        </div>
                      </div>
                      {/* Label */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0d9488] rounded-full">
                        <span className="text-xs font-semibold text-white">DUPĂ</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-1">
                    {caseItem.title}
                  </h3>
                  <p className="text-sm text-[#64748b]">
                    {caseItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-12 pt-8 border-t border-[#e2e8f0]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#0d9488]">500+</div>
                <div className="text-sm text-[#64748b] mt-1">Zâmbete transformate</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#0d9488]">98%</div>
                <div className="text-sm text-[#64748b] mt-1">Pacienți mulțumiți</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#0d9488]">15+</div>
                <div className="text-sm text-[#64748b] mt-1">Ani experiență</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-[#0d9488]">5.0★</div>
                <div className="text-sm text-[#64748b] mt-1">Rating Google</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
