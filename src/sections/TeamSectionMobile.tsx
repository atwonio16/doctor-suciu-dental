import { useState, useEffect, useRef } from 'react';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  specialties: string[];
}

const doctors: Doctor[] = [
  {
    id: 'dr-suciu',
    name: 'Dr. Sebastian Iacob Suciu',
    role: 'Fondator & Medic Stomatolog',
    image: '/team/dr-suciu.jpg',
    experience: 'Fondator',
    specialties: ['Implantologie', 'Ortodonție', 'Estetică'],
  },
  {
    id: 'dr-mitache',
    name: 'Dr. Vlad Mitache',
    role: 'Medic Specialist Protetică',
    image: '/team/dr-mitache.jpg',
    experience: 'Specialist',
    specialties: ['Protetică', 'Coroane', 'Fațete'],
  },
  {
    id: 'dr-paduraru',
    name: 'Dr. Cosmin Păduraru',
    role: 'Medic Specialist Chirurgie',
    image: '/team/dr-paduraru.jpg',
    experience: 'Chirurg',
    specialties: ['Implanturi', 'Chirurgie', 'International'],
  },
  {
    id: 'dr-ungureanu',
    name: 'Dr. Ungureanu Bogdan',
    role: 'Medic Stomatolog Generalist',
    image: '/team/dr-ungureanu.jpg',
    experience: 'Generalist',
    specialties: ['Stomatologie Generală', 'Precizie'],
  },
  {
    id: 'dr-tiganus',
    name: 'Dr. Emilia Țigănuș',
    role: 'Medic Specialist Ortodont',
    image: '/team/dr-tiganus.jpg',
    experience: 'Ortodont',
    specialties: ['Ortodonție', 'Invisalign', 'Copii'],
  },
  {
    id: 'alexandra-soare',
    name: 'Alexandra Soare',
    role: 'Asistentă ATI',
    image: '/team/alexandra-soare.jpg',
    experience: 'ATI',
    specialties: ['Siguranță', 'Chirurgie', 'Monitorizare'],
  },
  {
    id: 'sara-suciu',
    name: 'Sara Suciu',
    role: 'Organizare & Marketing',
    image: '/team/sara-suciu.jpg',
    experience: 'Admin',
    specialties: ['Organizare', 'Marketing', 'Asistență'],
  },
  {
    id: 'andreea-vasile',
    name: 'Andreea Vasile',
    role: 'Asistentă Medicală',
    image: '/team/andreea-vasile.jpg',
    experience: 'Asistentă',
    specialties: ['Asistență', 'Empatie', 'Profesionalism'],
  },
];

const TeamSectionMobile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = 240;
      const gap = 12;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(Math.max(newIndex, 0), doctors.length - 1));
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="medici" className="py-10 bg-white lg:hidden">
      {/* Header */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
              Echipa noastră
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              Echipa Noastră
            </h2>
          </div>
          <Link 
            to="/medici" 
            className="text-sm font-medium text-[#1e3a5f] bg-gray-50 px-3 py-2 rounded-lg"
          >
            Vezi toți
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Medici experimentați dedicați sănătății zâmbetului tău.
        </p>
      </div>

      {/* Doctors Carousel */}
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {doctors.map((doctor) => (
          <Link
            key={doctor.id}
            to={`/medici/${doctor.id}`}
            className="flex-shrink-0 snap-start w-[240px]"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="320" viewBox="0 0 240 320">
                      <rect width="240" height="320" fill="#e2e8f0"/>
                      <circle cx="120" cy="110" r="45" fill="#94a3b8"/>
                      <ellipse cx="120" cy="220" rx="60" ry="70" fill="#94a3b8"/>
                    </svg>`
                  )}`;
                }}
              />
              
              {/* Experience Badge */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-1 rounded-full">
                <span className="text-xs font-medium text-gray-700">{doctor.experience}</span>
              </div>
            </div>

            {/* Info */}
            <div>
              <h3 className="font-semibold text-base text-gray-900 mb-0.5">{doctor.name}</h3>
              <p className="text-sm text-[#0d9488] font-medium mb-2">{doctor.role}</p>
              
              {/* Specialties */}
              <div className="flex flex-wrap gap-1">
                {doctor.specialties.map((specialty) => (
                  <span 
                    key={specialty}
                    className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {doctors.map((_, index) => (
          <div 
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-5 bg-[#1e3a5f]' : 'w-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamSectionMobile;
