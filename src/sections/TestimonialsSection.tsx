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
    text: 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă și drăguță.',
    service: 'Fațete dentare',
  },
  {
    id: 2,
    name: 'Mihai D.',
    location: 'Dâmbovița',
    rating: 5,
    text: 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas. Acum pot zâmbi fără griji!',
    service: 'Implanturi dentare',
  },
  {
    id: 3,
    name: 'Elena P.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am ales Invisalign și nu regret deloc. Alignerele sunt atât de discrete că prietenii nici nu au observat că port aparat.',
    service: 'Ortodonție Invisalign',
  },
  {
    id: 4,
    name: 'Cristian S.',
    location: 'Ploiești',
    rating: 5,
    text: 'Merită deplasarea de la Ploiești! Am făcut albire și rezultatul a fost imediat vizibil. Prețuri corecte pentru calitate.',
    service: 'Albire dentară',
  },
  {
    id: 5,
    name: 'Maria L.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă.',
    service: 'Stomatologie pediatrică',
  },
  {
    id: 6,
    name: 'Adrian K.',
    location: 'București',
    rating: 5,
    text: 'Deși locuiesc în București, vin aici pentru tratamente complexe. Atmosfera calmă și profesionalismul fac diferența.',
    service: 'Coroane dentare',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="recenzii" className="w-full py-20 lg:py-24 bg-slate-50 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <FadeText delay={0} direction="up">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold mb-4">
                Părerile Pacienților
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
                Experiențe reale, zâmbete fericite
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Descoperă ce spun pacienții noștri despre experiența la clinica noastră
              </p>
            </FadeText>
          </div>

          {/* Carousel with side navigation */}
          <FadeText delay={0.3} direction="up" distance={50}>
            <div className="relative px-12 lg:px-16">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                {/* Navigation Left */}
                <CarouselPrevious className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500 hover:border-sky-500 shadow-sm" />
                
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

                {/* Navigation Right */}
                <CarouselNext className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500 hover:border-sky-500 shadow-sm" />
              </Carousel>
            </div>
          </FadeText>

          {/* View All Link */}
          <FadeText delay={0.4} direction="up">
            <div className="text-center mt-10">
              <a 
                href="/pareri" 
                className="inline-flex items-center gap-2 text-sky-500 font-semibold hover:underline"
              >
                Vezi toate părerile
                <span>→</span>
              </a>
            </div>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
