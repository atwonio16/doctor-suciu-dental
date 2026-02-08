import { ArrowRight, Award, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const doctors = [
  {
    id: 'suciu',
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    description: 'Expert în implantologie și ortodonție. Peste 15 ani de experiență transformând zâmbete.',
    badge: 'Fondator',
    patients: '2.500+',
  },
  {
    id: 'popescu',
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    description: 'Specialist Invisalign Diamond Provider. Creează zâmbete perfect aliniate, discret.',
    badge: 'Invisalign Expert',
    patients: '1.800+',
  },
  {
    id: 'ionescu',
    name: 'Dr. Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/implant_detail_work.jpg',
    description: 'Salvează dinți cu precizie microscopică. Expert în tratamente de canal complexe.',
    badge: 'Microscopie',
    patients: '1.200+',
  },
  {
    id: 'dumitrescu',
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/testimonial_patient.jpg',
    description: 'Transformă frica în încredere. Copiii o adoră, părinții o recomandă.',
    badge: 'Pedodonție',
    patients: '3.000+',
  },
];

const TeamSection = () => {
  return (
    <section id="medici" className="relative w-full py-24 overflow-hidden bg-[#f8fafc]">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-40" />
      </div>
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header - More catchy */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Echipa Noastră
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Cunoaște-ți medicii
            </h2>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto">
              Profesioniști dedicați care transformă vizita la dentist într-o experiență plăcută. 
              <span className="text-medical-navy font-medium"> Peste 8.500 de pacienți mulțumiți.</span>
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id}
                className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-medical-navy/20 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/team_portrait.jpg';
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-medical-navy shadow-sm">
                      <Award className="w-3 h-3" />
                      {doctor.badge}
                    </span>
                  </div>

                  {/* Patient count on hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-sm font-medium">{doctor.patients} pacienți tratați</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-[#0f172a] text-lg mb-1 group-hover:text-medical-navy transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-[#0891b2] font-medium text-sm mb-3">{doctor.title}</p>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                    {doctor.description}
                  </p>
                  
                  {/* CTA Link - "Vezi profilul" */}
                  <Link 
                    to={`/medici/${doctor.id}`} 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-medical-navy hover:text-medical-teal transition-colors group/link"
                  >
                    <span>Vezi profilul</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link 
              to="/#medici" 
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-medical-navy text-white border-2 border-medical-navy hover:bg-transparent hover:text-medical-navy"
            >
              Vezi toată echipa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
