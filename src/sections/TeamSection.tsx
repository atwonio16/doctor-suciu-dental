import { Award, GraduationCap, Stethoscope, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeText } from '@/components/animations/FadeText';
import { FloatingElement } from '@/components/animations/FloatingElement';
import { AnimatedCard } from '@/components/animations/AnimatedCard';
import { StaggerContainer } from '@/components/animations/StaggerContainer';

const doctor = {
  name: 'Dr. Suciu Sebastian',
  title: 'Medic Stomatolog',
  image: '/team_portrait.jpg',
  experience: '15+ ani experiență',
  specializations: ['Implantologie', 'Estetică dentară', 'Chirurgie orală'],
  education: [
    'Universitatea de Medicină și Farmacie Carol Davila',
    'Specializare în Implantologie - Germania',
    'Cursuri de perfecționare în Estetică Dentară',
  ],
};

const TeamSection = () => {
  return (
    <section id="echipa" className="w-full py-20 lg:py-28 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-clinic-teal uppercase mb-3">
                Echipa Noastră
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-clinic-navy mb-4">
                Cunoaște <span className="text-clinic-teal">medicul tău</span> stomatolog
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-clinic-gray max-w-2xl mx-auto">
                Dr. Suciu Sebastian este dedicat oferirii celor mai bune tratamente 
                stomatologice cu grijă și profesionalism.
              </p>
            </FadeText>
          </div>

          {/* Doctor Card */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <FadeText delay={0.2} direction="right" distance={50}>
              <div className="relative">
                <div className="aspect-[3/4] max-w-md mx-auto rounded-3xl overflow-hidden shadow-float hover:shadow-2xl transition-shadow duration-500">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                {/* Experience badge */}
                <FloatingElement amplitude={8} duration={4} delay={0.5}>
                  <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-float p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-clinic-gold/20 flex items-center justify-center">
                        <Award className="w-5 h-5 text-clinic-navy" />
                      </div>
                      <div>
                        <p className="font-serif font-semibold text-clinic-navy">{doctor.experience}</p>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </FadeText>

            {/* Content */}
            <div>
              <FadeText delay={0.3} direction="left" distance={30}>
                <h3 className="font-serif font-medium text-2xl lg:text-3xl text-clinic-navy mb-2">
                  {doctor.name}
                </h3>
              </FadeText>
              <FadeText delay={0.35} direction="left" distance={30}>
                <p className="text-lg text-clinic-teal mb-6">{doctor.title}</p>
              </FadeText>

              {/* Specializations */}
              <FadeText delay={0.4} direction="left" distance={30}>
                <div className="mb-8">
                  <h4 className="font-semibold text-clinic-navy mb-3 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-clinic-teal" />
                    Specializări
                  </h4>
                  <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.1} initialDelay={0.5}>
                    {doctor.specializations.map((spec, index) => (
                      <AnimatedCard
                        key={index}
                        hoverScale={1.1}
                        enableGlow={false}
                        className="px-4 py-2 rounded-full bg-clinic-navy text-sm font-medium text-white cursor-default"
                      >
                        {spec}
                      </AnimatedCard>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeText>

              {/* Education */}
              <FadeText delay={0.5} direction="left" distance={30}>
                <div className="mb-8">
                  <h4 className="font-semibold text-clinic-navy mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-clinic-teal" />
                    Educație și formare
                  </h4>
                  <StaggerContainer className="space-y-2" staggerDelay={0.1} initialDelay={0.6}>
                    {doctor.education.map((edu, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-clinic-gray group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-clinic-teal mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                        <span className="group-hover:text-clinic-navy transition-colors duration-300">{edu}</span>
                      </div>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeText>

              {/* CTA */}
              <FadeText delay={0.6} direction="up" distance={20}>
                <Button
                  asChild
                  size="lg"
                  className="bg-clinic-navy hover:bg-clinic-navy-light text-white font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <a href="#contact">
                    <Calendar className="w-5 h-5 mr-2" />
                    Programează o consultație
                  </a>
                </Button>
              </FadeText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
