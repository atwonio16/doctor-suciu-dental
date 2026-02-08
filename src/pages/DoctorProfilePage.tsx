import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Award, Stethoscope, GraduationCap, Clock, MapPin, Phone, Star, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

const doctors = [
  {
    id: 'suciu',
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    coverImage: '/hero-clinic.jpg',
    description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive. Cu o experiență solidă și formare continuă, Dr. Suciu oferă pacienților planuri de tratament personalizate.',
    badge: 'Fondator',
    patients: '2.500+',
    experience: '15+ ani',
    education: [
      'Universitatea de Medicină și Farmacie Carol Davila, București',
      'Specializare în Implantologie, Germania',
      'Certificare Ortodonție Avansată, SUA',
    ],
    specializations: [
      'Implantologie orală',
      'Ortodonție',
      'Chirurgie orală',
      'Estetică dentară',
    ],
    schedule: 'L-J: 9:00 - 18:00, V: 9:00 - 15:00',
    reviews: 127,
    rating: 5.0,
  },
  {
    id: 'popescu',
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    coverImage: '/hero-clinic.jpg',
    description: 'Specialist în ortodonție cu peste 12 ani de experiență. Certificată Invisalign Diamond Provider, Dr. Popescu transformă zâmbete cu precizie și grijă.',
    badge: 'Invisalign Expert',
    patients: '1.800+',
    experience: '12+ ani',
    education: [
      'Universitatea de Medicină și Farmacie Cluj-Napoca',
      'Certificare Invisalign Diamond Provider',
      'Master Ortodonție Estetică, Marea Britanie',
    ],
    specializations: [
      'Aparate fixe metalice/ceramice',
      'Invisalign (toate nivelele)',
      'Ortodonție pediatrică',
      'Corecții ocluzale',
    ],
    schedule: 'L, Mi, V: 9:00 - 17:00',
    reviews: 98,
    rating: 5.0,
  },
  {
    id: 'ionescu',
    name: 'Dr. Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/implant_detail_work.jpg',
    coverImage: '/hero-clinic.jpg',
    description: 'Expert în tratamente de canal și salvarea dinților naturali. Cu ajutorul microscopului dentar și a tehnologiilor moderne, realizează proceduri precise cu rata de succes de 98%.',
    badge: 'Microscopie',
    patients: '1.200+',
    experience: '10+ ani',
    education: [
      'Universitatea de Medicină și Farmacie Timișoara',
      'Specializare Endodonție Microscopică, Elveția',
      'Certificare Re-tratamente Complexe',
    ],
    specializations: [
      'Tratamente de canal cu microscop',
      'Re-tratamente endodontice',
      'Chirurgie endodontică',
      'Salvarea dinților fracturați',
    ],
    schedule: 'L-J: 10:00 - 18:00',
    reviews: 85,
    rating: 5.0,
  },
  {
    id: 'dumitrescu',
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/testimonial_patient.jpg',
    coverImage: '/hero-clinic.jpg',
    description: 'Pasionată de stomatologia pediatrică, creează o atmosferă prietenoasă pentru cei mici. Cu răbdare și tehnici blânde, transformă vizita la dentist într-o experiență plăcută.',
    badge: 'Pedodonție',
    patients: '3.000+',
    experience: '8+ ani',
    education: [
      'Universitatea de Medicină și Farmacie Carol Davila, București',
      'Specializare Pedodonție, Franța',
      'Certificare Comportament Pediatric',
    ],
    specializations: [
      'Stomatologie pediatrică',
      'Prevenție și fluorizare',
      'Sigilări dentare',
      'Tratamente pentru copii anxioși',
    ],
    schedule: 'Ma, Joi, V: 9:00 - 16:00',
    reviews: 156,
    rating: 5.0,
  },
];

const DoctorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === id);

  useEffect(() => {
    if (!doctor) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [doctor, navigate]);

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28 pb-16">
      {/* Cover Image */}
      <div className="relative h-48 lg:h-64 w-full overflow-hidden">
        <img
          src={doctor.coverImage}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/faq-clinic.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link 
            to="/medici" 
            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la echipă
          </Link>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-xl shadow-slate-200/50 p-6 lg:p-8 mb-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/team_portrait.jpg';
                    }}
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-medical-navy text-white text-xs font-semibold rounded-full shadow-sm">
                    <Award className="w-3 h-3" />
                    {doctor.badge}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-2xl lg:text-3xl font-semibold text-[#0f172a] mb-1">
                  {doctor.name}
                </h1>
                <p className="text-[#0891b2] font-medium mb-4">{doctor.title}</p>
                
                <p className="text-[#64748b] leading-relaxed mb-6 max-w-2xl">
                  {doctor.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-full bg-medical-navy/10 flex items-center justify-center">
                      <Stethoscope className="w-4 h-4 text-medical-navy" />
                    </div>
                    <span className="text-[#0f172a] font-medium">{doctor.patients} pacienți</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-full bg-medical-navy/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-medical-navy" />
                    </div>
                    <span className="text-[#0f172a] font-medium">{doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="text-[#0f172a] font-medium">{doctor.rating} ({doctor.reviews} recenzii)</span>
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 bg-medical-navy text-white border-2 border-medical-navy hover:bg-transparent hover:text-medical-navy"
                >
                  <Calendar className="w-4 h-4" />
                  PROGRAMEAZĂ CONSULTAȚIE
                </Link>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-medical-navy/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-medical-navy" />
                </div>
                <h2 className="font-semibold text-[#0f172a] text-lg">Educație și Certificări</h2>
              </div>
              <ul className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-[#64748b]">
                    <CheckCircle2 className="w-4 h-4 text-medical-teal flex-shrink-0 mt-0.5" />
                    {edu}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specializations */}
            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-medical-navy/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-medical-navy" />
                </div>
                <h2 className="font-semibold text-[#0f172a] text-lg">Specializări</h2>
              </div>
              <ul className="space-y-3">
                {doctor.specializations.map((spec, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-[#64748b]">
                    <CheckCircle2 className="w-4 h-4 text-medical-teal flex-shrink-0 mt-0.5" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Schedule & Location */}
          <div className="mt-6 bg-white rounded-2xl p-6 border border-[#e2e8f0]">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-medical-navy/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-medical-navy" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b] uppercase tracking-wider mb-1">Program</p>
                  <p className="font-medium text-[#0f172a]">{doctor.schedule}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-medical-navy/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-medical-navy" />
                </div>
                <div>
                  <p className="text-xs text-[#64748b] uppercase tracking-wider mb-1">Locație</p>
                  <p className="font-medium text-[#0f172a]">Calea Domnească 234, Târgoviște</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="mt-6 text-center">
            <p className="text-[#64748b] mb-4">Ai întrebări despre tratamentele oferite de {doctor.name.split(' ')[1]}?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+40770220110"
                className="inline-flex items-center gap-2 text-medical-navy hover:text-medical-teal transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">0770 220 110</span>
              </a>
              <span className="hidden sm:block text-[#cbd5e1]">|</span>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 text-medical-navy hover:text-medical-teal transition-colors font-medium"
              >
                Sau trimite un mesaj online
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
