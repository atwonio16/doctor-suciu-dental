import { Link } from 'react-router-dom';
import { ArrowRight, Award, Stethoscope, Star, MapPin } from 'lucide-react';

const doctors = [
  {
    id: 'suciu',
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    shortDesc: 'Expert în implantologie și ortodonție. Fondatorul clinicii.',
    description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive. Cu o experiență solidă și formare continuă, Dr. Suciu oferă pacienților planuri de tratament personalizate.',
    badge: 'Fondator',
    patients: '2.500+',
    experience: '15+ ani',
    reviews: 127,
    rating: 5.0,
  },
  {
    id: 'popescu',
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    shortDesc: 'Specialist Invisalign Diamond Provider. Zâmbete perfecte.',
    description: 'Specialist în ortodonție cu peste 12 ani de experiență. Certificată Invisalign Diamond Provider, Dr. Popescu transformă zâmbete cu precizie și grijă.',
    badge: 'Invisalign Expert',
    patients: '1.800+',
    experience: '12+ ani',
    reviews: 98,
    rating: 5.0,
  },
  {
    id: 'ionescu',
    name: 'Dr. Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/implant_detail_work.jpg',
    shortDesc: 'Salvează dinți cu microscopie avansată. Precizie de 98%.',
    description: 'Expert în tratamente de canal și salvarea dinților naturali. Cu ajutorul microscopului dentar și a tehnologiilor moderne, realizează proceduri precise.',
    badge: 'Microscopie',
    patients: '1.200+',
    experience: '10+ ani',
    reviews: 85,
    rating: 5.0,
  },
  {
    id: 'dumitrescu',
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/testimonial_patient.jpg',
    shortDesc: 'Copiii o adoră! Transformă vizita la dentist în joacă.',
    description: 'Pasionată de stomatologia pediatrică, creează o atmosferă prietenoasă pentru cei mici. Cu răbdare și tehnici blânde, transformă vizita la dentist într-o experiență plăcută.',
    badge: 'Pedodonție',
    patients: '3.000+',
    experience: '8+ ani',
    reviews: 156,
    rating: 5.0,
  },
];

const DoctorsPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative w-full py-16 lg:py-20 bg-[#f8fafc] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-slate-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl opacity-40" />
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748b]">
                Echipa Noastră
              </span>
              <span className="w-8 h-[2px] bg-[#94a3b8]" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">
              Cunoaște-ți medicii
            </h1>

            <p className="text-lg text-[#222222] max-w-2xl mx-auto mb-6">
              Profesioniști dedicați care transformă vizita la dentist într-o experiență plăcută.
              <span className="text-medical-navy font-medium"> Peste 8.500 de pacienți mulțumiți.</span>
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-medical-navy mb-1">4</div>
                <div className="text-sm text-[#64748b]">Medici specializați</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-medical-navy mb-1">45+</div>
                <div className="text-sm text-[#64748b]">Ani de experiență</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-medical-navy mb-1">8.5k+</div>
                <div className="text-sm text-[#64748b]">Pacienți tratați</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-medical-navy mb-1">5.0</div>
                <div className="text-sm text-[#64748b]">Rating mediu</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {doctors.map((doctor) => (
              <div 
                key={doctor.id}
                className="group bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-medical-navy/20"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/team_portrait.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-medical-navy shadow-sm">
                        <Award className="w-3 h-3" />
                        {doctor.badge}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="font-semibold text-[#0f172a] text-xl group-hover:text-medical-navy transition-colors">
                          {doctor.name}
                        </h2>
                      </div>
                      <p className="text-[#0891b2] font-medium text-sm mb-4">{doctor.title}</p>
                      
                      <p className="text-[#64748b] leading-relaxed mb-4">
                        {doctor.shortDesc}
                      </p>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-1.5 text-sm text-[#64748b]">
                          <Stethoscope className="w-4 h-4 text-medical-navy" />
                          <span>{doctor.patients} pacienți</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[#64748b]">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{doctor.rating} ({doctor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-[#64748b]">
                          <MapPin className="w-4 h-4 text-medical-navy" />
                          <span>{doctor.experience}</span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                      <Link 
                        to={`/medici/${doctor.id}`}
                        className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 bg-medical-navy text-white border-2 border-medical-navy hover:bg-transparent hover:text-medical-navy"
                      >
                        Vezi profilul complet
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-4xl mx-auto bg-medical-navy rounded-3xl p-8 lg:p-12 text-center text-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
            Găsește medicul potrivit pentru tine
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Fiecare medic din echipa noastră este specializat pe anumite tratamente. 
            Programează o consultație și descoperă care ți se potrivește cel mai bine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-white text-medical-navy border-2 border-white hover:bg-transparent hover:text-white"
            >
              PROGRAMEAZĂ CONSULTAȚIE
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="tel:+40770220110"
              className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-transparent text-white border-2 border-white/30 hover:border-white"
            >
              Sună pentru informații
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
