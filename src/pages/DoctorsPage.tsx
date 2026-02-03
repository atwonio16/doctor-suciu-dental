import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Stethoscope, GraduationCap, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/animations/FadeText';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const doctors = [
  {
    id: 1,
    name: 'Dr. Suciu Sebastian',
    title: 'Medic Stomatolog',
    image: '/team_portrait.jpg',
    experience: '15+ ani',
    specializations: ['Implantologie', 'Estetică dentară', 'Chirurgie orală'],
    education: [
      'Universitatea de Medicină și Farmacie Carol Davila',
      'Specializare în Implantologie - Germania',
      'Cursuri de perfecționare în Estetică Dentară',
    ],
    description: 'Fondatorul clinicii, pasionat de rezultate naturale și abordare blândă a pacienților.',
  },
  {
    id: 2,
    name: 'Dr. Maria Popescu',
    title: 'Ortodont',
    image: '/team_portrait.jpg',
    experience: '12+ ani',
    specializations: ['Ortodonție', 'Invisalign', 'Aparate dentare'],
    education: [
      'Universitatea de Medicină și Farmacie Târgu Mureș',
      'Certificare Invisalign Diamond Provider',
      'Master în Ortodonție Estetică',
    ],
    description: 'Specialist în aliniere discretă, dedicată zâmbetelor perfecte pentru adulți și copii.',
  },
  {
    id: 3,
    name: 'Dr. Andrei Ionescu',
    title: 'Medic Endodont',
    image: '/team_portrait.jpg',
    experience: '10+ ani',
    specializations: ['Endodonție', 'Re-tratamente', 'Microscopie'],
    education: [
      'Universitatea de Medicină și Farmacie Craiova',
      'Curs postuniversitar Endodonție',
      'Tehnici avansate în tratamentul canalului',
    ],
    description: 'Expert în salvarea dinților naturali prin tratamente precise și blânde.',
  },
  {
    id: 4,
    name: 'Dr. Elena Dumitrescu',
    title: 'Stomatolog Pediatru',
    image: '/team_portrait.jpg',
    experience: '8+ ani',
    specializations: ['Pedodonție', 'Prevenție', 'Comportament copii'],
    education: [
      'Universitatea de Medicină și Farmacie București',
      'Certificare în managementul anxietății copiilor',
      'Terapie comportamentală pentru pacienți mici',
    ],
    description: 'Creată pentru a transforma vizita la dentist în experiență plăcută pentru cei mici.',
  },
];

const DoctorsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <FadeText direction="up">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi acasă
            </Link>
          </FadeText>
          
          <div className="text-center max-w-3xl mx-auto">
            <FadeText delay={0.1} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Echipa Noastră
              </span>
            </FadeText>
            
            <FadeText delay={0.2} direction="up">
              <h1 className="font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
                Medicii noștri
              </h1>
            </FadeText>
            
            <FadeText delay={0.3} direction="up">
              <p className="text-lg text-slate-600 leading-relaxed">
                O echipă dedicată sănătății și frumuseții zâmbetului tău. Fiecare medic aduce expertiză 
                și pasiune în tratarea pacienților noștri.
              </p>
            </FadeText>
          </div>
        </div>
      </section>

      {/* Doctors Carousel */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-20">
        <div className="max-w-6xl mx-auto">
          <FadeText delay={0.4} direction="up">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
              setApi={(api) => {
                if (api) {
                  api.on('select', () => {
                    setActiveIndex(api.selectedScrollSnap());
                  });
                }
              }}
            >
              <div className="relative px-12 lg:px-16">
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500 shadow-sm" />
                
                <CarouselContent className="-ml-4">
                  {doctors.map((doctor) => (
                    <CarouselItem key={doctor.id} className="pl-4">
                      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-slate-50 rounded-3xl p-6 lg:p-10">
                        {/* Image */}
                        <div className="relative max-w-sm mx-auto lg:max-w-none">
                          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-md px-4 py-2 flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span className="font-semibold text-slate-900 text-sm">{doctor.experience}</span>
                          </div>
                        </div>

                        {/* Info */}
                        <div>
                          <h2 className="font-bold text-2xl lg:text-3xl text-slate-900 mb-1">
                            {doctor.name}
                          </h2>
                          <p className="text-sky-500 font-medium text-lg mb-4">{doctor.title}</p>
                          
                          <p className="text-slate-600 mb-6">
                            {doctor.description}
                          </p>

                          <div className="mb-6">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Stethoscope className="w-5 h-5 text-sky-500" />
                              Specializări
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {doctor.specializations.map((spec, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-sm"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-8">
                            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <GraduationCap className="w-5 h-5 text-sky-500" />
                              Educație
                            </h3>
                            <ul className="space-y-2">
                              {doctor.education.map((edu, index) => (
                                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                                  <span>{edu}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button
                            asChild
                            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6"
                          >
                            <Link to="/contact">
                              <Calendar className="w-4 h-4 mr-2" />
                              Programează o consultație
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500 shadow-sm" />
              </div>

              {/* Progress Bar Indicator */}
              <div className="flex justify-center items-center gap-1 mt-8">
                {doctors.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-sky-500'
                        : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </Carousel>
          </FadeText>
        </div>
      </section>

      {/* Team Stats */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeText direction="up">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-sky-500 mb-1">4</p>
                <p className="text-slate-600">Medici specializați</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sky-500 mb-1">45+</p>
                <p className="text-slate-600">Ani experiență totală</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sky-500 mb-1">5000+</p>
                <p className="text-slate-600">Pacienți tratați</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sky-500 mb-1">100%</p>
                <p className="text-slate-600">Dedicare</p>
              </div>
            </div>
          </FadeText>
        </div>
      </section>
    </div>
  );
};

export default DoctorsPage;
