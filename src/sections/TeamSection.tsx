import { useState } from 'react';
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
    image: '/team_portrait.jpg',
    description: 'Specialist în ortodonție cu peste 12 ani de experiență. Certificată Invisalign Diamond Provider, Dr. Popescu transformă zâmbete cu precizie și grijă, folosind cele mai moderne tehnici de aliniere dentară.',
    tags: ['Ortodonție', 'Invisalign', 'Pedodonție', 'Estetică'],
  },
  {
    id: 3,
    name: 'Dr. Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/team_portrait.jpg',
    description: 'Expert în tratamente de canal și salvarea dinților naturali. Cu ajutorul microscopului dentar și a tehnologiilor moderne, Dr. Ionescu realizează proceduri precise și blânde, cu rate de succes de peste 98%.',
    tags: ['Endodonție', 'Microscopie', 'Re-tratamente', 'Chirurgie'],
  },
  {
    id: 4,
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/team_portrait.jpg',
    description: 'Pasionată de stomatologia pediatrică, Dr. Dumitrescu creează o atmosferă prietenoasă pentru cei mici. Cu răbdare și tehnici blânde, transformă vizita la dentist într-o experiență plăcută pentru întreaga familie.',
    tags: ['Pedodonție', 'Comportament', 'Prevenție', 'Copii'],
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDoctor = doctors[activeIndex];

  const nextDoctor = () => {
    setActiveIndex((prev) => (prev + 1) % doctors.length);
  };

  const prevDoctor = () => {
    setActiveIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

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
              className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:shadow-xl transition-all"
              aria-label="Previous doctor"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Doctor Card - Full width matching other sections */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="grid lg:grid-cols-2 min-h-[450px]">
                {/* Left - Image filling entire height */}
                <div className="relative h-[300px] lg:h-auto">
                  <img
                    src={activeDoctor.image}
                    alt={activeDoctor.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Right - Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">{activeDoctor.name}</h3>
                  <p className="text-sky-500 font-medium text-lg mb-6">{activeDoctor.title}</p>
                  
                  <p className="text-slate-600 leading-relaxed mb-8">
                    {activeDoctor.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeDoctor.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-sky-50 to-white border border-sky-100 text-slate-700 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dots indicator */}
                  <div className="flex items-center gap-2 mb-8">
                    {doctors.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === activeIndex 
                            ? 'w-8 bg-sky-500' 
                            : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        aria-label={`Go to doctor ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Link 
                    to="/contact" 
                    className="btn-primary inline-flex items-center justify-center gap-2 w-fit"
                  >
                    <Calendar className="w-4 h-4" />
                    PROGRAMEAZĂ O CONSULTAȚIE
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Arrow - Outside card */}
            <button 
              onClick={nextDoctor}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-500 shadow-lg shadow-sky-500/30 flex items-center justify-center text-white hover:bg-sky-400 hover:shadow-xl transition-all"
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
