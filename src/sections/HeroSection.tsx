import { ArrowRight, Calendar, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/animations/FadeText';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full min-h-[90vh] bg-gradient-to-br from-sky-50 via-white to-slate-50 pt-20 lg:pt-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-1/3 h-2/3 bg-gradient-to-bl from-sky-100/50 to-transparent rounded-l-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100/50 rounded-tr-full" />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <FadeText delay={0.1} direction="up" distance={30}>
              <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-4">
                Clinică Stomatologică Târgoviște
              </span>
            </FadeText>

            <FadeText delay={0.2} direction="up" distance={30}>
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight mb-4">
                Zâmbetul tău <br />
                <span className="text-sky-500">merită ce e mai bun</span>
              </h1>
            </FadeText>

            <FadeText delay={0.3} direction="up" distance={20}>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 max-w-lg">
                Tratamente stomatologice moderne, într-o atmosferă relaxantă. 
                Echipa noastră de medici experimentați îți oferă îngrijirea pe care o meriți.
              </p>
            </FadeText>

            <FadeText delay={0.4} direction="up" distance={20}>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 h-12 rounded-full"
                >
                  <a href="#contact">
                    <Calendar className="w-5 h-5 mr-2" />
                    Programează-te
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-slate-300 text-slate-700 hover:bg-white hover:border-sky-500 hover:text-sky-500 font-medium px-8 h-12 rounded-full"
                >
                  <a href="/servicii">
                    Vezi serviciile
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </FadeText>

            <FadeText delay={0.5} direction="up" distance={20}>
              <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Phone className="w-4 h-4 text-sky-500" />
                  </div>
                  <span>0770 220 110</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <MapPin className="w-4 h-4 text-sky-500" />
                  </div>
                  <span>Târgoviște</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Clock className="w-4 h-4 text-sky-500" />
                  </div>
                  <span>L-V: 09:00-18:00</span>
                </div>
              </div>
            </FadeText>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <FadeText delay={0.2} direction="left" distance={40} duration={0.8}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/hero_dental_chair.jpg"
                    alt="Cabinet stomatologic modern"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="font-bold text-amber-600 text-sm">15+</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Ani experiență</p>
                    <p className="text-xs text-slate-500">În stomatologie</p>
                  </div>
                </div>
                {/* Another floating element */}
                <div className="absolute -top-4 -right-4 bg-sky-500 text-white rounded-xl shadow-lg px-4 py-2 text-sm font-medium">
                  Prima consultație gratuită
                </div>
              </div>
            </FadeText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
