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
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-medical-sand">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-medical-navy-soft rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-medical-teal-soft rounded-full blur-3xl opacity-30" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="category-pill mb-4">ECHIPA NOASTRĂ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-medical-navy mb-4">
              Profesioniști <span className="text-medical-teal">dedicați</span>,<br />
              oameni <span className="text-medical-teal">de încredere</span>
            </h2>
            <p className="text-medical-gray max-w-2xl mx-auto text-lg">
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
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg border border-medical-warm flex items-center justify-center text-medical-gray hover:text-medical-teal hover:shadow-xl transition-all disabled:opacity-50"
              aria-label="Previous doctor"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Card */}
            <div className="flex-1 w-full bg-white rounded-3xl shadow-xl shadow-medical-navy/5 border border-medical-warm overflow-hidden">
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
                      <h3 className="text-2xl lg:text-3xl font-bold text-medical-navy mb-2">{activeDoctor.name}</h3>
                      <p className="text-medical-teal font-medium text-lg">{activeDoctor.title}</p>
                    </div>
                    
                    <p className="text-medical-gray leading-relaxed mb-6">
                      {activeDoctor.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {activeDoctor.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1.5 rounded-full bg-medical-sand text-medical-navy text-sm"
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
                              ? 'w-8 bg-medical-teal' 
                              : 'w-2 bg-medical-warm hover:bg-medical-gray-light'
                          }`}
                          aria-label={`Go to doctor ${index + 1}`}
                        />
                      ))}
                    </div>

                    <Link 
                      to="/contact" 
                      className="btn-primary inline-flex items-center justify-center gap-2"
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
              className="flex-shrink-0 w-12 h-12 rounded-full bg-medical-teal shadow-lg shadow-medical-teal/30 flex items-center justify-center text-white hover:bg-medical-teal-dark hover:shadow-xl transition-all disabled:opacity-50"
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
