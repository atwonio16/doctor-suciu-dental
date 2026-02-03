import { useState } from 'react';
import { Award, Calendar } from 'lucide-react';
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
    ],
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
    ],
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
    ],
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
    ],
  },
];

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="echipa" className="w-full py-16 lg:py-20 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Echipa Noastră
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                Cunoaște medicii noștri
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                O echipă dedicată sănătății și frumuseții zâmbetului tău
              </p>
            </FadeText>
          </div>

          {/* Compact Doctor Carousel */}
          <FadeText delay={0.3} direction="up">
            <div className="relative px-14">
              <Carousel
                opts={{
                  align: "start",
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
                <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500 shadow-sm w-10 h-10" />
                
                <CarouselContent className="-ml-4">
                  {doctors.map((doctor) => (
                    <CarouselItem key={doctor.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                      <div className="bg-slate-50 rounded-2xl p-5 h-full">
                        <div className="flex gap-5">
                          {/* Image - smaller */}
                          <div className="relative flex-shrink-0">
                            <div className="w-28 h-36 rounded-xl overflow-hidden shadow-md">
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-white rounded-lg shadow-md px-2 py-1 flex items-center gap-1">
                              <Award className="w-3 h-3 text-amber-500" />
                              <span className="font-semibold text-slate-900 text-xs">{doctor.experience}</span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-slate-900 mb-0.5">
                              {doctor.name}
                            </h3>
                            <p className="text-sky-500 font-medium text-sm mb-3">{doctor.title}</p>

                            {/* Specializations */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {doctor.specializations.slice(0, 2).map((spec, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-xs"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>

                            {/* Education - shortened */}
                            <ul className="space-y-1 mb-4">
                              {doctor.education.map((edu, index) => (
                                <li key={index} className="flex items-start gap-1.5 text-slate-600 text-xs">
                                  <span className="w-1 h-1 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                                  <span className="line-clamp-1">{edu}</span>
                                </li>
                              ))}
                            </ul>

                            <Button
                              asChild
                              size="sm"
                              className="bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs h-8"
                            >
                              <a href="/contact">
                                <Calendar className="w-3 h-3 mr-1" />
                                Programează
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500 shadow-sm w-10 h-10" />
              </Carousel>

              {/* Progress Lines Indicator */}
              <div className="flex justify-center items-center gap-2 mt-6">
                {doctors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {}}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-6 bg-sky-500'
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Doctor ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </FadeText>

          {/* View All Link */}
          <FadeText delay={0.4} direction="up">
            <div className="text-center mt-8">
              <a 
                href="/medici" 
                className="inline-flex items-center gap-2 text-sky-500 font-medium hover:underline"
              >
                Vezi toată echipa
                <span>→</span>
              </a>
            </div>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
