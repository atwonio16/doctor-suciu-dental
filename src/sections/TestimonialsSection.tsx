import { Star, Quote } from 'lucide-react';
import { FadeText } from '@/components/animations/FadeText';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Andreea M.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Cel mai relaxat m-am simțit la dentist. Totul a fost explicat pas cu pas, iar rezultatul a depășit așteptările.',
    service: 'Fațete dentare',
  },
  {
    id: 2,
    name: 'Mihai D.',
    location: 'Dâmbovița',
    rating: 5,
    text: 'Profesionalism și curățenie exemplare. Dr. Suciu este un medic dedicat care își iubește meseria.',
    service: 'Implanturi dentare',
  },
  {
    id: 3,
    name: 'Elena P.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am făcut tratament Invisalign și rezultatele sunt uimitoare. Procesul a fost simplu și discret.',
    service: 'Ortodonție Invisalign',
  },
  {
    id: 4,
    name: 'Cristian S.',
    location: 'Ploiești',
    rating: 5,
    text: 'Am venit special de la Ploiești pentru tratament și a meritat pe deplin. Echipa este foarte prietenoasă.',
    service: 'Albire dentară',
  },
  {
    id: 5,
    name: 'Maria L.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am scăpat de teama de dentist datorită acestei clinici. Atmosfera calmă m-a cucerit.',
    service: 'Tratament canal',
  },
  {
    id: 6,
    name: 'Adrian K.',
    location: 'București',
    rating: 5,
    text: 'Deși am venit din București, distanța a meritat. Rezultate excelente la prețuri corecte.',
    service: 'Coroane dentare',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="recenzii" className="w-full py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Părerile pacienților
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-bold text-3xl sm:text-4xl text-slate-900 mb-4">
                Ce spun despre noi
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Experiențele reale ale pacienților noștri
              </p>
            </FadeText>
          </div>

          {/* Carousel */}
          <FadeText delay={0.3} direction="up" distance={50}>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem 
                    key={testimonial.id} 
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="h-full bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <CardContent className="p-5 flex flex-col h-full">
                        {/* Quote icon */}
                        <Quote className="w-8 h-8 text-sky-200 mb-3" />

                        {/* Stars */}
                        <div className="flex gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>

                        {/* Text */}
                        <p className="text-slate-700 text-sm leading-relaxed mb-4 flex-grow">
                          "{testimonial.text}"
                        </p>

                        {/* Author */}
                        <div className="pt-3 border-t border-slate-100">
                          <p className="font-semibold text-slate-900 text-sm">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {testimonial.location} • {testimonial.service}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation Buttons */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500" />
                <CarouselNext className="static translate-y-0 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500" />
              </div>
            </Carousel>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
