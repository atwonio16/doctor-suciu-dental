import { ArrowRight, Calendar, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/animations/FadeText';
import { FloatingElement } from '@/components/animations/FloatingElement';

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-gradient-to-br from-clinic-gray-bg via-white to-clinic-cream pt-20 lg:pt-24 overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement amplitude={20} duration={6} delay={0} className="absolute top-20 left-10">
          <div className="w-32 h-32 rounded-full bg-clinic-teal/5" />
        </FloatingElement>
        <FloatingElement amplitude={25} duration={7} delay={1} className="absolute top-40 right-20">
          <div className="w-24 h-24 rounded-full bg-clinic-gold/10" />
        </FloatingElement>
        <FloatingElement amplitude={15} duration={5} delay={2} className="absolute bottom-40 left-1/4">
          <div className="w-16 h-16 rounded-full bg-clinic-navy/5" />
        </FloatingElement>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="order-2 lg:order-1">
            {/* Headline with serif font */}
            <FadeText delay={0.1} direction="up" distance={40}>
              <h1 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-clinic-navy leading-[1.1] mb-6">
                Zâmbetul tău
                <span className="block text-clinic-teal">începe aici</span>
              </h1>
            </FadeText>

            {/* Description */}
            <FadeText delay={0.2} direction="up" distance={30}>
              <p className="text-lg text-clinic-gray leading-relaxed mb-8 max-w-lg">
                Tratamente stomatologice moderne, explicate clar și realizate cu 
                grijă de către Dr. Suciu Sebastian și echipa sa din Târgoviște.
              </p>
            </FadeText>

            {/* CTAs */}
            <FadeText delay={0.3} direction="up" distance={30}>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-clinic-navy hover:bg-clinic-navy-light text-white font-semibold px-8 h-14 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <a href="#contact">
                    <Calendar className="w-5 h-5 mr-2" />
                    Programează-te acum
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-clinic-navy/30 text-clinic-navy hover:bg-clinic-navy/5 font-medium px-8 h-14 transition-all duration-300 hover:scale-105"
                >
                  <a href="#servicii">
                    Vezi serviciile
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </FadeText>

            {/* Trust indicators */}
            <FadeText delay={0.4} direction="up" distance={20}>
              <div className="flex flex-wrap gap-6 text-sm text-clinic-gray">
                <div className="flex items-center gap-2 hover:text-clinic-navy transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-clinic-teal/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <Phone className="w-4 h-4 text-clinic-teal" />
                  </div>
                  <span>0770 220 110</span>
                </div>
                <div className="flex items-center gap-2 hover:text-clinic-navy transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-clinic-teal/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <MapPin className="w-4 h-4 text-clinic-teal" />
                  </div>
                  <span>Târgoviște, Dâmbovița</span>
                </div>
                <div className="flex items-center gap-2 hover:text-clinic-navy transition-colors duration-300">
                  <div className="w-8 h-8 rounded-full bg-clinic-teal/10 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <Clock className="w-4 h-4 text-clinic-teal" />
                  </div>
                  <span>L-V: 09:00-18:00</span>
                </div>
              </div>
            </FadeText>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <FadeText delay={0.2} direction="left" distance={50} duration={0.8}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-float hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src="/hero_dental_chair.jpg"
                    alt="Cabinet stomatologic modern Doctor Suciu"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Floating card */}
                <FloatingElement amplitude={10} duration={4} delay={0.5}>
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-float p-5 hidden sm:block border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-clinic-gold/20 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                        <span className="text-2xl font-serif font-bold text-clinic-navy">15+</span>
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-clinic-navy text-lg">Ani experiență</p>
                        <p className="text-sm text-clinic-gray">În stomatologie</p>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
                {/* Decorative elements */}
                <FloatingElement amplitude={15} duration={5} delay={0}>
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-clinic-teal/10 -z-10" />
                </FloatingElement>
                <FloatingElement amplitude={12} duration={4} delay={1}>
                  <div className="absolute -bottom-8 right-20 w-16 h-16 rounded-full bg-clinic-gold/20 -z-10" />
                </FloatingElement>
              </div>
            </FadeText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
