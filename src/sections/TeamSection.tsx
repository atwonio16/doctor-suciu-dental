import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const doctors = [
  {
    id: 'suciu',
    name: 'Doctor Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive. Cu o experiență solidă și formare continuă, Dr. Suciu oferă pacienților planuri de tratament personalizate.',
    tags: ['Expertiză', 'Experiență', 'Calitate', 'Tehnologie modernă'],
  },
  {
    id: 'popescu',
    name: 'Doctor Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    description: 'Specialist Invisalign Diamond Provider cu peste 10 ani de experiență în alinierea zâmbetelor. Creează planuri de tratament personalizate pentru adulți și adolescenți.',
    tags: ['Invisalign', 'Ortodonție', 'Estetică', 'Pediatrie'],
  },
  {
    id: 'ionescu',
    name: 'Doctor Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/implant_detail_work.jpg',
    description: 'Expert în tratamente de canal cu microscop dentar. Salvează dinți compromiși cu precizie milimetrică și tehnici avansate.',
    tags: ['Microscopie', 'Endodonție', 'Precizie', 'Tehnologie'],
  },
  {
    id: 'dumitrescu',
    name: 'Doctor Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/testimonial_patient.jpg',
    description: 'Transformă frica în încredere la cei mai mici pacienți. Cu blândețe și răbdare, creează experiențe pozitive la dentist pentru copii.',
    tags: ['Pedodonție', 'Copii', 'Blândețe', 'Prevenție'],
  },
  {
    id: 'marin',
    name: 'Doctor Ioana Marin',
    title: 'Chirurg Maxilo-Facial',
    image: '/clinic_gallery_interior2.jpg',
    description: 'Specialist în intervenții chirurgicale orale complexe și reconstrucție facială. Utilizează tehnici minim invazive pentru recuperare rapidă.',
    tags: ['Chirurgie', 'Implantologie', 'Reconstrucție', 'Expertiză'],
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % doctors.length);
  };

  const doctor = doctors[activeIndex];

  return (
    <section id="medici" className="relative w-full py-16 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            {/* Label */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-12 h-[1px] bg-[#94a3b8]" />
              <span className="text-xs font-semibold tracking-[0.15em] text-[#64748b] uppercase">
                Echipa Noastră
              </span>
              <span className="w-12 h-[1px] bg-[#94a3b8]" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-[#1e293b] mb-3">
              Medici specialiști
            </h2>
            <p className="text-[#64748b] text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Medici dedicați care pun pe primul loc siguranța, confortul și rezultatele tale.
            </p>
          </div>

          {/* Card - Vertical on mobile, horizontal on md+ */}
          <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
            <div className="flex flex-col md:grid md:grid-cols-[2fr_3fr] md:h-[420px]">
              {/* Image - Full width on mobile */}
              <div className="relative h-64 sm:h-72 md:h-full overflow-hidden bg-[#f1f5f9]">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top transition-opacity duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1e293b] mb-1 sm:mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-[#1e3a5f] font-semibold mb-4 sm:mb-5 text-sm sm:text-base md:text-lg">
                    {doctor.title}
                  </p>
                  <p className="text-[#64748b] leading-relaxed text-sm sm:text-base md:text-lg">
                    {doctor.description}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
                    {doctor.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 sm:px-4 py-1 sm:py-1.5 bg-[#f0f9ff] text-[#0284c7] text-xs sm:text-sm font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    {/* Dots */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {doctors.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`rounded-full transition-all duration-300 ${
                            index === activeIndex
                              ? 'w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#1e3a5f]'
                              : 'w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#cbd5e1] hover:bg-[#94a3b8]'
                          }`}
                          aria-label={`Go to doctor ${index + 1}`}
                        />
                      ))}
                    </div>

                    {/* Next Arrow */}
                    <button
                      onClick={nextSlide}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white hover:bg-[#152a45] transition-colors shadow-md active:scale-95"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
