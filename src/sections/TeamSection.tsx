import { useState } from 'react';
import { Award, Stethoscope, GraduationCap, Calendar } from 'lucide-react';
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

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="echipa" className="w-full py-20 lg:py-24 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Echipa Noastră
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
                Cunoaște medicii noștri
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                O echipă dedicată sănătății și frumuseții zâmbetului tău
              </p>
            </FadeText>
          </div>

          {/* Doctor Carousel */}
          <FadeText delay={0.3} direction="up">
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
              <div className="relative">
                {/* Navigation Left */}
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500" />
                
                <CarouselContent className="-ml-4">
                  {doctors.map((doctor) => (
                    <CarouselItem key={doctor.id} className="pl-4 md:basis-full lg:basis-full">
                      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center bg-slate-50 rounded-3xl p-6 lg:p-12">
                        {/* Image */}
                        <div className="relative">
                          <div className="aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Experience badge */}
                          <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                              <Award className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{doctor.experience}</p>
                              <p className="text-xs text-slate-500">experiență</p>
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div>
                          <h3 className="font-bold text-2xl lg:text-3xl text-slate-900 mb-2">
                            {doctor.name}
                          </h3>
                          <p className="text-sky-500 font-medium text-lg mb-4">{doctor.title}</p>
                          
                          <p className="text-slate-600 mb-6">
                            {doctor.description}
                          </p>

                          {/* Specializations */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <Stethoscope className="w-5 h-5 text-sky-500" />
                              Specializări
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {doctor.specializations.map((spec, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Education */}
                          <div className="mb-8">
                            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                              <GraduationCap className="w-5 h-5 text-sky-500" />
                              Educație
                            </h4>
                            <ul className="space-y-2">
                              {doctor.education.map((edu, index) => (
                                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                                  <span>{edu}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* CTA */}
                          <Button
                            asChild
                            size="lg"
                            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8"
                          >
                            <a href="#contact">
                              <Calendar className="w-5 h-5 mr-2" />
                              Programează o consultație
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation Right */}
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500" />
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {doctors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-sky-500'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Doctor ${index + 1}`}
                  />
                ))}
              </div>
            </Carousel>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
