import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive. Cu o experiență solidă și formare continuă, Dr. Suciu oferă pacienților planuri de tratament personalizate.',
    tags: ['Expertiză', 'Experiență', 'Calitate', 'Tehnologie modernă'],
  },
  {
    id: 2,
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    description: 'Specialist în ortodonție cu peste 12 ani de experiență. Certificată Invisalign Diamond Provider, Dr. Popescu transformă zâmbete cu precizie și grijă.',
    tags: ['Ortodonție', 'Invisalign', 'Pedodonție', 'Estetică'],
  },
  {
    id: 3,
    name: 'Dr. Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/implant_detail_work.jpg',
    description: 'Expert în tratamente de canal și salvarea dinților naturali. Cu ajutorul microscopului dentar și a tehnologiilor moderne, realizează proceduri precise.',
    tags: ['Endodonție', 'Microscopie', 'Re-tratamente', 'Chirurgie'],
  },
  {
    id: 4,
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/testimonial_patient.jpg',
    description: 'Pasionată de stomatologia pediatrică, creează o atmosferă prietenoasă pentru cei mici. Cu răbdare și tehnici blânde, transformă vizita la dentist într-o experiență plăcută.',
    tags: ['Pedodonție', 'Comportament', 'Prevenție', 'Copii'],
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const changeDoctor = (newIndex: number, direction: 'left' | 'right') => {
    if (newIndex === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection(direction);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsTransitioning(false);
    }, 200);
  };

  const nextDoctor = () => {
    changeDoctor((activeIndex + 1) % doctors.length, 'right');
  };

  const prevDoctor = () => {
    changeDoctor((activeIndex - 1 + doctors.length) % doctors.length, 'left');
  };

  const activeDoctor = doctors[activeIndex];

  const slideClass = isTransitioning 
    ? slideDirection === 'right' 
      ? '-translate-x-4 opacity-0' 
      : 'translate-x-4 opacity-0'
    : 'translate-x-0 opacity-100';

  return (
    <section id="medici" className="relative w-full py-20 overflow-hidden bg-[#f8fafc]">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-40" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header - Premium category style */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Echipa Noastră
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Profesioniști dedicați,<br />
              oameni de încredere
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              Medici cu suflet și experiență, care transformă fiecare vizită 
              într-o experiență plăcută pentru tine și familia ta.
            </p>
          </div>

          {/* Carousel */}
          <div className="flex items-center justify-center gap-4">
            {/* Left Arrow */}
            <button 
              onClick={prevDoctor}
              disabled={isTransitioning}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#1e3a5f] hover:border-[#1e3a5f] transition-all disabled:opacity-50"
              aria-label="Previous doctor"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Card */}
            <div className="flex-1 w-full bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden">
              <div className="grid lg:grid-cols-2 h-[500px]">
                {/* Left - Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-200 ${slideClass}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/team_portrait.jpg';
                    }}
                  />
                </div>

                {/* Right - Info */}
                <div className="p-8 lg:p-10 flex items-center">
                  <div className={`w-full transition-all duration-200 ${slideClass}`}>
                    <div className="mb-4">
                      <h3 className="text-2xl lg:text-3xl font-semibold text-[#0f172a] mb-2">{activeDoctor.name}</h3>
                      <p className="text-[#0891b2] font-medium text-lg">{activeDoctor.title}</p>
                    </div>
                    
                    <p className="text-[#222222] leading-relaxed mb-6">
                      {activeDoctor.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeDoctor.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1.5 rounded-full bg-[#f1f5f9] text-[#475569] text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                      {doctors.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => changeDoctor(index, index > activeIndex ? 'right' : 'left')}
                          disabled={isTransitioning}
                          className={`h-2 rounded-full transition-all disabled:cursor-not-allowed ${
                            index === activeIndex 
                              ? 'w-8 bg-[#1e3a5f]' 
                              : 'w-2 bg-[#e2e8f0] hover:bg-[#cbd5e1]'
                          }`}
                          aria-label={`Go to doctor ${index + 1}`}
                        />
                      ))}
                    </div>

                    <Link 
                      to="/contact" 
                      className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-transparent hover:text-[#1e3a5f]"
                    >
                      <Calendar className="w-4 h-4" />
                      PROGRAMEAZĂ O CONSULTAȚIE
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button 
              onClick={nextDoctor}
              disabled={isTransitioning}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white hover:bg-[#152a45] transition-all disabled:opacity-50"
              aria-label="Next doctor"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
