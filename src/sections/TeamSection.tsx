import { Award, Stethoscope, GraduationCap, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const doctor = {
  name: 'Dr. Suciu Sebastian',
  title: 'Medic Stomatolog',
  image: '/team_portrait.jpg',
  experience: '15+ ani experiență',
  specializations: ['Implantologie', 'Estetică dentară', 'Chirurgie orală'],
  education: [
    'Universitatea de Medicină și Farmacie Carol Davila',
    'Specializare în Implantologie - Germania',
  ],
  description: 'Fondatorul clinicii, pasionat de rezultate naturale și abordare blândă a pacienților.',
};

const TeamSection = () => {
  return (
    <section className="w-full py-20 bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="category-pill mb-4">ECHIPA NOASTRĂ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Cunoaște <span className="gradient-text">medicul</span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Dedicație, experiență și pasiune pentru sănătatea zâmbetului tău.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                />
                <div className="absolute bottom-4 left-4 bg-sky-500 text-white rounded-lg px-4 py-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span className="font-semibold text-sm">{doctor.experience}</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                <p className="text-sky-500 font-medium mb-4">{doctor.title}</p>
                
                <p className="text-slate-600 mb-6">{doctor.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-sky-500" />
                    Specializări
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.map((spec, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-sky-500" />
                    Educație
                  </h4>
                  <ul className="space-y-2">
                    {doctor.education.map((edu, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  PROGRAMEAZĂ O CONSULTAȚIE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
