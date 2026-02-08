import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const doctors = [
  {
    id: 1,
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive.',
  },
  {
    id: 2,
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    description: 'Specialist în ortodonție cu peste 12 ani de experiență. Certificată Invisalign Diamond Provider.',
  },
  {
    id: 3,
    name: 'Dr. Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/implant_detail_work.jpg',
    description: 'Expert în tratamente de canal și salvarea dinților naturali. Microscopie dentară avansată.',
  },
  {
    id: 4,
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/testimonial_patient.jpg',
    description: 'Pasionată de stomatologia pediatrică. Creează o atmosferă prietenoasă pentru cei mici.',
  },
];

const TeamSection = () => {
  return (
    <section id="medici" className="relative w-full py-20 overflow-hidden bg-[#f8fafc]">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-40" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Echipa Noastră
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Medici cu suflet și experiență
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              Profesioniști dedicați care transformă fiecare vizită într-o experiență plăcută pentru tine și familia ta.
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id}
                className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-[#cbd5e1]"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/team_portrait.jpg';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-[#0f172a] text-lg mb-1">{doctor.name}</h3>
                  <p className="text-[#0891b2] font-medium text-sm mb-3">{doctor.title}</p>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                    {doctor.description}
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e3a5f] hover:text-[#0891b2] transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Programează-te
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
