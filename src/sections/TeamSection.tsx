import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Doctor } from '../admin/types';
import { usePublicDoctors } from '../hooks/useSupabaseData';

// Default doctors as fallback - Echipa completă Doctor Suciu
const defaultDoctors: Doctor[] = [
  {
    id: 'dr-suciu',
    name: 'Dr. Sebastian Iacob Suciu',
    role: 'Fondator & Medic Stomatolog',
    image: '/team/dr-suciu.jpg',
    imageCrop: 'center 35%',
    description: 'A pus bazele Doctor Suciu Dental Clinic, un loc unde standardele medicale ridicate și respectul pentru pacient definesc fiecare tratament. "Am vrut să pot deține clinica mea, să funcționeze după viziunea mea, după standardele mele de calitate."',
    tags: ['Fondator', 'Implantologie', 'Ortodonție', 'Estetică'],
    specialties: [],
    experience: '',
    education: '',
    order: 0,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'dr-mitache',
    name: 'Dr. Vlad Mitache',
    role: 'Medic Specialist Protetică',
    image: '/team/dr-mitache.jpg',
    imageCrop: 'center 35%',
    description: 'Medic specialist în protetică dentară, dedicat fiecărui zâmbet și fiecărui pacient. "În viață nu ai nevoie de multe, dar sigur ai nevoie de un medic bun."',
    tags: ['Protetică', 'Coroane', 'Fațete', 'Estetică'],
    specialties: [],
    experience: '',
    education: '',
    order: 1,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'dr-paduraru',
    name: 'Dr. Cosmin Păduraru',
    role: 'Medic Specialist Chirurgie',
    image: '/team/dr-paduraru.jpg',
    imageCrop: 'center 35%',
    description: 'Medic specialist în chirurgie dento-alveolară, cu pregătire internațională în New York, Bologna, Barcelona, Budapesta și București. "În chirurgie, detaliile fac diferența."',
    tags: ['Chirurgie', 'Implanturi', 'Formare Internațională', 'Precizie'],
    specialties: [],
    experience: '',
    education: '',
    order: 2,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'dr-ungureanu',
    name: 'Dr. Ungureanu Bogdan',
    role: 'Medic Stomatolog Generalist',
    image: '/team/dr-ungureanu.jpg',
    imageCrop: 'center 35%',
    description: 'Medic stomatolog generalist, tânăr, atent și răbdător. "Precizia cere timp. Și eu îl dau. Lucrul bine făcut nu se negociază cu viteză."',
    tags: ['Stomatologie Generală', 'Răbdare', 'Precizie', 'Grijă'],
    specialties: [],
    experience: '',
    education: '',
    order: 3,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'dr-tiganus',
    name: 'Dr. Emilia Țigănuș',
    role: 'Medic Specialist Ortodont',
    image: '/team/dr-tiganus.jpg',
    imageCrop: 'center 35%',
    description: 'Medic specialist ortodont, cu experiență în tratamente pentru copii și adulți. "Ortodonția înseamnă sănătate, echilibru și încrederea de a zâmbi cu adevărat."',
    tags: ['Ortodonție', 'Invisalign', 'Aparat Dentar', 'Copii & Adulți'],
    specialties: [],
    experience: '',
    education: '',
    order: 4,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'alexandra-soare',
    name: 'Alexandra Soare',
    role: 'Asistentă ATI',
    image: '/team/alexandra-soare.jpg',
    imageCrop: 'center 35%',
    description: 'Asistentă ATI în spital, prezentă în cadrul intervențiilor chirurgicale complexe. Experiența sa în terapia intensivă aduce un nivel suplimentar de siguranță pacienților noștri.',
    tags: ['ATI', 'Siguranță', 'Chirurgie', 'Monitorizare'],
    specialties: [],
    experience: '',
    education: '',
    order: 5,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'sara-suciu',
    name: 'Sara Suciu',
    role: 'Organizare & Marketing',
    image: '/team/sara-suciu.jpg',
    imageCrop: 'center 35%',
    description: 'Se ocupă de organizare și marketing, iar în paralel se specializează în asistență medicală. Succesul unei clinici începe cu oameni calzi, organizați și dedicați.',
    tags: ['Organizare', 'Marketing', 'Asistență', 'Dedicare'],
    specialties: [],
    experience: '',
    education: '',
    order: 6,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'andreea-vasile',
    name: 'Andreea Vasile',
    role: 'Asistentă Medicală',
    image: '/team/andreea-vasile.jpg',
    imageCrop: 'center 35%',
    description: 'Asistentă dedicată care ne arată zi de zi ce înseamnă grijă, empatie și profesionalism. Fără ea, echipa nu ar fi completă!',
    tags: ['Asistență', 'Empatie', 'Profesionalism', 'Grijă'],
    specialties: [],
    experience: '',
    education: '',
    order: 7,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'andra-radu',
    name: 'Andra Radu',
    role: 'Asistentă Medicală',
    image: '/team/andra-radu.jpg',
    imageCrop: 'center 35%',
    description: 'Dincolo de aparate și tratamente, contează oamenii. Andra este dovada că profesionalismul și empatia merg mână în mână, oferind pacienților siguranță și încredere la fiecare vizită.',
    tags: ['Profesionalism', 'Empatie', 'Siguranță', 'Încredere'],
    specialties: [],
    experience: '',
    education: '',
    order: 8,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
];

const TeamSection = () => {
  const { data: supabaseDoctors } = usePublicDoctors();

  // Map Supabase fields to component format
  const cmsDoctors: Doctor[] = useMemo(() => {
    if (!supabaseDoctors) return [];
    return supabaseDoctors.map((d, idx) => ({
      id: d.id,
      name: d.name,
      role: d.role,
      image: d.image_url,
      imageCrop: d.image_crop || 'center 50%',
      description: d.description,
      tags: d.specialties || [],
      specialties: d.specialties || [],
      experience: '',
      education: Array.isArray(d.education) ? d.education.join(', ') : (d.education || ''),
      order: d.order_index ?? idx,
      isActive: d.is_active,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
    }));
  }, [supabaseDoctors]);

  // Use doctors from Supabase (CMS), fallback to default if empty
  const doctors = useMemo(() => {
    if (cmsDoctors.length > 0) return cmsDoctors;
    return [...defaultDoctors].sort(() => Math.random() - 0.5);
  }, [cmsDoctors]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  // Create infinite scroll array with clones
  const infiniteDoctors = useMemo(() => {
    if (doctors.length <= 1) return doctors;
    return [
      doctors[doctors.length - 1],
      ...doctors,
      doctors[0]
    ];
  }, [doctors]);

  const startIndex = 1;

  const handleNext = useCallback(() => {
    if (doctors.length <= 1) return;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev + 1);
    setActiveIndex((prev) => (prev + 1) % doctors.length);
  }, [doctors.length]);

  const handlePrev = useCallback(() => {
    if (doctors.length <= 1) return;
    setIsTransitioning(true);
    setDisplayIndex((prev) => prev - 1);
    setActiveIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
  }, [doctors.length]);

  const handleTransitionEnd = () => {
    if (displayIndex >= startIndex + doctors.length) {
      setIsTransitioning(false);
      setDisplayIndex(startIndex);
    } else if (displayIndex < startIndex) {
      setIsTransitioning(false);
      setDisplayIndex(startIndex + doctors.length - 1);
    }
  };

  // Pagination dots click handler
  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setDisplayIndex(startIndex + index);
    setActiveIndex(index);
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const doctor = infiniteDoctors[displayIndex] || doctors[0];

  return (
    <section id="medici" className="relative w-full py-16 sm:py-20 lg:py-28 bg-white overflow-hidden">
      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-gray-900 tracking-tight mb-4">
              Echipa Noastră
            </h2>
            <p className="text-base text-gray-500 mx-auto px-4 sm:px-0">
              Oameni reali, care te ascultă, îți explică și au grijă de tine la fiecare vizită.
            </p>
          </div>

          {/* Card with Navigation Buttons in Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-3 items-center">
            {/* Left Arrow - hidden on mobile */}
            <button
              onClick={handlePrev}
              className="nav-arrow hidden sm:flex w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-400 hover:text-gray-700 transition-colors active:scale-95"
              aria-label="Previous doctor"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Card Container with Slide Animation */}
            <div 
              className="overflow-hidden touch-pan-x"
              ref={containerRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(-${displayIndex * 100}%)`,
                  transition: isTransitioning ? 'transform 700ms cubic-bezier(0.25, 0.4, 0.25, 1)' : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {infiniteDoctors.map((doc, idx) => {
                  const objectPosition = (doc as { imageCrop?: string }).imageCrop || 'center 35%';
                  
                  return (
                    <div
                      key={`${doc.id}-${idx}`}
                      className="w-full flex-shrink-0 px-0"
                    >
                      <div className="team-card bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="flex flex-col md:grid md:grid-cols-[2fr_3fr] md:h-[340px]">
                          {/* Image with custom crop */}
                          <div className="team-image relative h-64 sm:h-72 md:h-full overflow-hidden bg-gray-100">
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-full h-full object-cover"
                              style={{ objectPosition }}
                              loading="lazy"
                            />
                          </div>

                          {/* Content */}
                          <div className="team-content py-6 px-4 sm:px-6 md:px-8 flex flex-col justify-between">
                            <div>
                              <h3 className="team-name text-lg font-semibold text-gray-900 mb-2">
                                {doc.name}
                              </h3>

                              <p className="text-gray-400 font-normal mb-4 text-sm tracking-wide">
                                {doc.role}
                              </p>

                              <p className="team-description text-gray-600 leading-[1.8] text-sm sm:text-[15px]">
                                {doc.description}
                              </p>
                            </div>

                            <div className="mt-6">
                              {/* Tags - max 3 displayed, subtle meta style */}
                              <div className="team-tags flex flex-wrap gap-1.5">
                                {doc.tags?.slice(0, 3).map((tag, tagIdx) => (
                                  <span
                                    key={tagIdx}
                                    className="team-tag px-2 py-1 bg-gray-50 text-gray-400 text-[11px] font-normal rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow - hidden on mobile */}
            <button
              onClick={handleNext}
              className="nav-arrow hidden sm:flex w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-400 hover:text-gray-700 transition-colors active:scale-95"
              aria-label="Next doctor"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Pagination Dots - larger touch targets on mobile */}
          <div className="flex items-center justify-center gap-1 mt-8">
            {doctors.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="pagination-dot p-3 flex items-center justify-center"
                aria-label={`Go to doctor ${index + 1}`}
              >
                <span 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-[#1e3a5f]' 
                      : 'w-2 bg-[#cbd5e1]'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Swipe hint for mobile */}
          <p className="mobile-only text-center text-xs text-gray-400 mt-4">
            Glisează pentru a vedea mai multe
          </p>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;
