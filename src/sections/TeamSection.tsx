import { useState } from 'react';
import { ChevronRight, Award, MapPin } from 'lucide-react';

const doctors = [
  {
    id: 'suciu',
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    badge: 'Fondator',
    experience: '15+ ani',
    specialty: 'Implantologie & Ortodonție',
  },
  {
    id: 'popescu',
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    badge: 'Invisalign Expert',
    experience: '12+ ani',
    specialty: 'Aparate invisible',
  },
  {
    id: 'ionescu',
    name: 'Dr. Andrei Ionescu',
    title: 'Endodont',
    image: '/implant_detail_work.jpg',
    badge: 'Microscopie',
    experience: '10+ ani',
    specialty: 'Tratamente canal',
  },
  {
    id: 'dumitrescu',
    name: 'Dr. Elena Dumitrescu',
    title: 'Pedodont',
    image: '/testimonial_patient.jpg',
    badge: 'Pedodonție',
    experience: '8+ ani',
    specialty: 'Copii & adolescenți',
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDoctor = doctors[activeIndex];

  return (
    <section id="medici" className="py-10 bg-white">
      {/* Section Header */}
      <div className="px-4 mb-5">
        <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
          Echipa noastră
        </span>
        <h2 className="text-title-1 text-gray-900 mt-1">
          Medici specialiști
        </h2>
      </div>

      {/* Featured Doctor Card */}
      <div className="px-4 mb-5">
        <div className="card-mobile-elevated overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3]">
            <img
              src={activeDoctor.image}
              alt={activeDoctor.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 gradient-overlay" />
            
            {/* Badge */}
            <div className="absolute top-3 left-3">
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Award className="w-3.5 h-3.5 text-[#0d9488]" />
                <span className="text-[11px] font-semibold text-gray-900">{activeDoctor.badge}</span>
              </div>
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-[20px] text-white mb-1">
                {activeDoctor.name}
              </h3>
              <p className="text-[14px] text-white/90">{activeDoctor.title}</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-[12px] text-gray-400 mb-0.5">Experiență</p>
                <p className="font-semibold text-[14px] text-gray-900">{activeDoctor.experience}</p>
              </div>
              <div className="flex-1 border-l border-gray-100 pl-4">
                <p className="text-[12px] text-gray-400 mb-0.5">Specialitate</p>
                <p className="font-semibold text-[14px] text-gray-900">{activeDoctor.specialty}</p>
              </div>
            </div>
            
            <a 
              href={`/medici/${activeDoctor.id}`}
              className="flex items-center justify-center gap-2 w-full h-[44px] bg-gray-50 rounded-xl text-[14px] font-semibold text-[#1e3a5f] press-effect"
            >
              Vezi profil complet
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Doctor Selector Dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {doctors.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex 
                ? 'w-6 bg-[#1e3a5f]' 
                : 'w-2 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Location Info */}
      <div className="px-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 bg-[#0d9488]/10 rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-[#0d9488]" />
          </div>
          <div>
            <p className="font-semibold text-[14px] text-gray-900">Calea Domnească 234</p>
            <p className="text-[12px] text-gray-500">Târgoviște, Dâmbovița</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
