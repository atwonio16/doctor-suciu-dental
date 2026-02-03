import { ArrowRight, Calendar, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/animations/FadeText';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 lg:pt-28 overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <FadeText delay={0.1} direction="up" distance={40}>
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight mb-6">
                Zâmbetul tău <br />
                <span className="text-sky-500">începe aici</span>
              </h1>
            </FadeText>

            <FadeText delay={0.2} direction="up" distance={30}>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Tratamente stomatologice moderne, explicate clar și realizate cu 
                grijă de către Dr. Suciu Sebastian și echipa din Târgoviște.
              </p>
            </FadeText>

            <FadeText delay={0.3} direction="up" distance={30}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 h-12"
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
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-8 h-12"
                >
                  <a href="/servicii">
                    Vezi serviciile
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </FadeText>

            <FadeText delay={0.4} direction="up" distance={20}>
              <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-500" />
                  <span>0770 220 110</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <span>Târgoviște</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-500" />
                  <span>L-V: 09:00-18:00</span>
                </div>
              </div>
            </FadeText>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <FadeText delay={0.2} direction="left" distance={50} duration={0.8}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/hero_dental_chair.jpg"
                    alt="Cabinet stomatologic modern"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <span className="font-bold text-sky-500">15+</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Ani experiență</p>
                      <p className="text-xs text-slate-500">În stomatologie</p>
                    </div>
                  </div>
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
