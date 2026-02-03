import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/animations/FadeText';

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero_dental_chair.jpg"
          alt="Cabinet stomatologic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <FadeText delay={0} direction="up">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              Clinică Stomatologică Târgoviște
            </span>
          </FadeText>

          <FadeText delay={0.15} direction="up" distance={30}>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Zâmbetul perfect <br />
              <span className="text-sky-400">începe aici</span>
            </h1>
          </FadeText>

          <FadeText delay={0.3} direction="up" distance={20}>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
              Echipă de medici experimentați, tehnologie modernă și tratamente personalizate 
              pentru sănătatea și frumusețea dinților tăi.
            </p>
          </FadeText>

          <FadeText delay={0.45} direction="up" distance={20}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-10 h-14 text-base rounded-full"
              >
                <a href="/contact">
                  Programează-te acum
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-medium px-10 h-14 text-base rounded-full backdrop-blur-sm"
              >
                <a href="/servicii">
                  Vezi serviciile
                </a>
              </Button>
            </div>
          </FadeText>

          {/* Info pills */}
          <FadeText delay={0.6} direction="up">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm">
                <Phone className="w-4 h-4 text-sky-400" />
                <span>0770 220 110</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Târgoviște, Dâmbovița</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-sm">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>L-J: 9-18 | V: 9-15</span>
              </div>
            </div>
          </FadeText>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
