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
    <section id="echipa" className="w-full py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <FadeText delay={0} direction="up">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
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

          {/* Doctor Carousel - Wider */}
          <FadeText delay={0.3} direction="up">
            <div className="relative px-16 lg:px-20">
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
                <CarouselPrevious className="absolute -left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500 shadow-md w-12 h-12" />
                
                <CarouselContent className="-ml-6">
                  {doctors.map((doctor) => (
                    <CarouselItem key={doctor.id} className="pl-6 md:basis-1/2">
                      <div className="bg-white rounded-3xl p-6 lg:p-8 h-full shadow-sm hover:shadow-lg transition-shadow">
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Image - Larger */}
                          <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                            <div className="w-36 h-44 sm:w-40 sm:h-52 rounded-2xl overflow-hidden shadow-md">
                              <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 bg-white rounded-lg shadow-md px-3 py-1.5 flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-amber-500" />
                              <span className="font-bold text-slate-900 text-sm">{doctor.experience}</span>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 text-center sm:text-left">
                            <h3 className="font-bold text-xl lg:text-2xl text-slate-900 mb-1">
                              {doctor.name}
                            </h3>
                            <p className="text-sky-500 font-medium text-base mb-4">{doctor.title}</p>

                            {/* Specializations */}
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                              {doctor.specializations.map((spec, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>

                            {/* Education */}
                            <ul className="space-y-2 mb-6">
                              {doctor.education.map((edu, index) => (
                                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 flex-shrink-0" />
                                  <span>{edu}</span>
                                </li>
                              ))}
                            </ul>

                            <Button
                              asChild
                              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6"
                            >
                              <a href="/contact">
                                <Calendar className="w-4 h-4 mr-2" />
                                Programează
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselNext className="absolute -right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 hover:bg-slate-50 hover:border-sky-500 shadow-md w-12 h-12" />
              </Carousel>

              {/* Progress Lines Indicator */}
              <div className="flex justify-center items-center gap-2 mt-8">
                {doctors.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-sky-500'
                        : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </FadeText>

          {/* View All Link */}
          <FadeText delay={0.4} direction="up">
            <div className="text-center mt-10">
              <a 
                href="/medici" 
                className="inline-flex items-center gap-2 text-sky-500 font-semibold hover:underline"
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
