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
    text: 'Cel mai relaxat m-am simțit la dentist. Totul a fost explicat pas cu pas, iar rezultatul a depășit așteptările. Recomand cu căldură!',
    service: 'Fațete dentare',
  },
  {
    id: 2,
    name: 'Mihai D.',
    location: 'Dâmbovița',
    rating: 5,
    text: 'Profesionalism și curățenie exemplare. Dr. Suciu este un medic dedicat care își iubește meseria. Am făcut implanturi și sunt extrem de mulțumit.',
    service: 'Implanturi dentare',
  },
  {
    id: 3,
    name: 'Elena P.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am făcut tratament Invisalign și rezultatele sunt uimitoare. Procesul a fost simplu și discret, exact ce îmi doream.',
    service: 'Ortodonție Invisalign',
  },
  {
    id: 4,
    name: 'Cristian S.',
    location: 'Ploiești',
    rating: 5,
    text: 'Am venit special de la Ploiești pentru tratament și a meritat pe deplin. Echipa este foarte prietenoasă și profesionistă.',
    service: 'Albire dentară',
  },
  {
    id: 5,
    name: 'Maria L.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am scăpat de teama de dentist datorită acestei clinici. Atmosfera calmă și profesionalismul echipei m-au cucerit.',
    service: 'Tratament canal',
  },
  {
    id: 6,
    name: 'Adrian K.',
    location: 'București',
    rating: 5,
    text: 'Deși am venit din București, distanța a meritat. Rezultate excelente la prețuri corecte. Voi reveni cu siguranță!',
    service: 'Coroane dentare',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="recenzii" className="w-full py-20 lg:py-28 bg-clinic-navy overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-clinic-teal uppercase mb-3">
                Recenzii
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                Ce spun <span className="text-clinic-teal">pacienții noștri</span>
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Părerile sincere ale pacienților noștri sunt cea mai bună recomandare 
                pentru calitatea serviciilor noastre.
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
                    <Card className="h-full bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6 lg:p-8 flex flex-col h-full">
                        {/* Quote icon */}
                        <Quote className="w-10 h-10 text-clinic-teal/20 mb-4" />

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-clinic-gold text-clinic-gold"
                            />
                          ))}
                        </div>

                        {/* Text */}
                        <p className="text-clinic-navy/90 leading-relaxed mb-6 flex-grow">
                          "{testimonial.text}"
                        </p>

                        {/* Author */}
                        <div className="pt-4 border-t border-gray-100">
                          <p className="font-serif font-medium text-clinic-navy">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-clinic-gray">
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
                <CarouselPrevious className="static translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white hover:text-clinic-navy" />
                <CarouselNext className="static translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white hover:text-clinic-navy" />
              </div>
            </Carousel>
          </FadeText>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
