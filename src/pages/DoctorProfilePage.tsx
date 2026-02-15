import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Award, Stethoscope, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

const doctors = [
  {
    id: 'suciu',
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    coverImage: '/hero-clinic.jpg',
    description: 'Medic stomatolog cu competență în ortodonție, implantologie și tratamente minim invazive.',
    badge: 'Fondator',
    patients: '2.500+',
    experience: '15+ ani',
    education: [
      'UMF Carol Davila, București',
      'Specializare Implantologie, Germania',
      'Certificare Ortodonție, SUA',
    ],
    specializations: ['Implantologie', 'Ortodonție', 'Chirurgie orală'],
    schedule: 'L-J: 9:00 - 18:00',
  },
  {
    id: 'popescu',
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/services_overview_smile.jpg',
    coverImage: '/hero-clinic.jpg',
    description: 'Specialist în ortodonție cu peste 12 ani de experiență. Certificată Invisalign Diamond.',
    badge: 'Invisalign Expert',
    patients: '1.800+',
    experience: '12+ ani',
    education: ['UMF Cluj-Napoca', 'Certificare Invisalign Diamond'],
    specializations: ['Aparate fixe', 'Invisalign', 'Ortodonție pediatrică'],
    schedule: 'L, Mi, V: 9:00 - 17:00',
  },
];

const DoctorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === id);

  useEffect(() => {
    if (!doctor) navigate('/');
    window.scrollTo(0, 0);
  }, [doctor, navigate]);

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-48">
        <img
          src={doctor.coverImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Profile Image - Overlapping */}
        <div className="absolute -bottom-12 left-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-lg">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#1e3a5f] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" />
              {doctor.badge}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-14 px-4 pb-6">
        {/* Header Info */}
        <div className="mb-6">
          <h1 className="text-title-1 text-gray-900">{doctor.name}</h1>
          <p className="text-[#0d9488] font-medium text-[15px]">{doctor.title}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-6 pb-6 border-b border-gray-200">
          <div>
            <p className="text-[24px] font-bold text-[#1e3a5f]">{doctor.patients}</p>
            <p className="text-[12px] text-gray-500">Pacienți</p>
          </div>
          <div className="border-l border-gray-200 pl-6">
            <p className="text-[24px] font-bold text-[#1e3a5f]">{doctor.experience}</p>
            <p className="text-[12px] text-gray-500">Experiență</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
          {doctor.description}
        </p>

        {/* Specializations */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="w-5 h-5 text-[#1e3a5f]" />
            <h3 className="font-bold text-[16px] text-gray-900">Specializări</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.specializations.map((spec, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-full text-[13px] font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h3 className="font-bold text-[16px] text-gray-900 mb-3">Educație</h3>
          <ul className="space-y-2">
            {doctor.education.map((edu, idx) => (
              <li key={idx} className="flex items-start gap-2 text-[14px] text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-[#0d9488] mt-0.5 flex-shrink-0" />
                {edu}
              </li>
            ))}
          </ul>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-[12px] text-gray-400">Program</p>
              <p className="font-semibold text-[15px] text-gray-900">{doctor.schedule}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#1e3a5f]" />
            </div>
            <div>
              <p className="text-[12px] text-gray-400">Locație</p>
              <p className="font-semibold text-[15px] text-gray-900">Calea Domnească 234</p>
              <p className="text-[13px] text-gray-500">Târgoviște</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link 
            to="/contact"
            className="btn-mobile-primary"
          >
            <Calendar className="w-5 h-5" />
            Programează consultație
          </Link>
          
          <a 
            href="tel:+40770220110"
            className="btn-mobile-secondary"
          >
            <Phone className="w-5 h-5" />
            Sună pentru informații
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
