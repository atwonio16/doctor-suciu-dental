import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive. Cu o experiență solidă și formare continuă, Dr. Suciu oferă pacienților planuri de tratament personalizate, soluții durabile și o abordare centrată pe confortul și siguranța fiecărei persoane.',
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
    description: 'Expert în tratamente de canal și salvarea dinților naturali. Cu ajutorul microscopului dentar și a tehnologiilor moderne, Dr. Ionescu realizează proceduri precise și blânde, cu rate de succes de peste 98%.',
    tags: ['Endodonție', 'Microscopie', 'Re-tratamente', 'Chirurgie'],
  },
  {
    id: 4,
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/testimonial_patient.jpg',
    description: 'Pasionată de stomatologia pediatrică, Dr. Dumitrescu creează o atmosferă prietenoasă pentru cei mici. Cu răbdare și tehnici blânde, transformă vizita la dentist într-o experiență plăcută pentru întreaga familie.',
    tags: ['Pedodonție', 'Comportament', 'Prevenție', 'Copii'],
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const changeDoctor = (newIndex: number, direction: 'left' | 'right') => {
    if (newIndex === activeIndex || isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection(direction);
    
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsAnimating(false);
    }, 200);
  };

  const nextDoctor = () => {
    const newIndex = (activeIndex + 1) % doctors.length;
    changeDoctor(newIndex, 'right');
  };

  const prevDoctor = () => {
    const newIndex = (activeIndex - 1 + doctors.length) % doctors.length;
    changeDoctor(newIndex, 'left');
  };

  const activeDoctor = doctors[activeIndex];

  const slideClass = isAnimating 
    ? slideDirection === 'right' 
      ? '-translate-x-4 opacity-0' 
      : 'translate-x-4 opacity-0'
    : 'translate-x-0 opacity-100';

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Warm background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-100/30 via-purple-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-pink-100/25 via-amber-100/15 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header - Catchy */}
          <div className="text-center mb-12">
            <span className="category-pill mb-4">ECHIPA NOASTRĂ</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Oameni <span className="gradient-text">de încredere</span>,<br />
              zâmbete <span className="gradient-text">fericite</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Medici dedicați, cu suflet și experiență, care transformă fiecare vizită 
              într-o experiență plăcută pentru tine și familia ta.
            </p>
          </div>

          {/* Carousel Container with Navigation */}
          <div className="flex items-center justify-center gap-4">
            {/* Left Arrow - Outside card */}
            <button 
              onClick={prevDoctor}
              disabled={isAnimating}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:shadow-xl transition-all disabled:opacity-50"
              aria-label="Previous doctor"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Doctor Card */}
            <div className="flex-1 w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="grid lg:grid-cols-2 h-[500px]">
                {/* Left - Image with slide transition */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-200 ease-out ${slideClass}`}
                  />
                </div>

                {/* Right - Info with fixed layout and slide transition */}
                <div 
                  ref={contentRef}
                  className="p-8 lg:p-10 flex flex-col h-full"
                >
                  {/* Content wrapper with slide animation */}
                  <div className={`flex flex-col h-full transition-all duration-200 ease-out ${slideClass}`}>
                    {/* Header - fixed at top */}
                    <div className="flex-shrink-0 mb-4">
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{activeDoctor.name}</h3>
                      <p className="text-sky-500 font-medium text-lg">{activeDoctor.title}</p>
                    </div>
                    
                    {/* Description - scrollable if too long */}
                    <div className="flex-1 overflow-y-auto mb-4">
                      <p className="text-slate-600 leading-relaxed">
                        {activeDoctor.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex-shrink-0 flex flex-wrap gap-2 mb-4">
                      {activeDoctor.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-white border border-sky-100 text-slate-700 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Dots indicator - fixed position */}
                    <div className="flex-shrink-0 flex items-center gap-2 mb-4">
                      {doctors.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            const direction = index > activeIndex ? 'right' : 'left';
                            changeDoctor(index, direction);
                          }}
                          disabled={isAnimating}
                          className={`h-2 rounded-full transition-all disabled:cursor-not-allowed ${
                            index === activeIndex 
                              ? 'w-8 bg-sky-500' 
                              : 'w-2 bg-slate-200 hover:bg-slate-300'
                          }`}
                          aria-label={`Go to doctor ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Button - fixed at bottom */}
                    <div className="flex-shrink-0">
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
            </div>

            {/* Right Arrow - Outside card */}
            <button 
              onClick={nextDoctor}
              disabled={isAnimating}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-500 shadow-lg shadow-sky-500/30 flex items-center justify-center text-white hover:bg-sky-400 hover:shadow-xl transition-all disabled:opacity-50"
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
