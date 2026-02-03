import { Link } from 'react-router-dom';
import { Star, Quote, ArrowLeft } from 'lucide-react';
import { FadeText } from '@/components/animations/FadeText';

const testimonials = [
  {
    id: 1,
    name: 'Andreea M.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă și drăguță. Rezultatul final m-a uimit!',
    service: 'Fațete dentare',
  },
  {
    id: 2,
    name: 'Mihai D.',
    location: 'Dâmbovița',
    rating: 5,
    text: 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas. Acum pot zâmbi fără griji. Mulțumesc!',
    service: 'Implanturi dentare',
  },
  {
    id: 3,
    name: 'Elena P.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am ales Invisalign și nu regret deloc. Alignerele sunt atât de discrete că prietenii nici nu au observat că port aparat. Rezultate excelente!',
    service: 'Ortodonție Invisalign',
  },
  {
    id: 4,
    name: 'Cristian S.',
    location: 'Ploiești',
    rating: 5,
    text: 'Merită deplasarea de la Ploiești! Am făcut albire și rezultatul a fost imediat vizibil. Prețuri corecte pentru calitatea oferită.',
    service: 'Albire dentară',
  },
  {
    id: 5,
    name: 'Maria L.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă. Recomand cu căldură!',
    service: 'Stomatologie pediatrică',
  },
  {
    id: 6,
    name: 'Adrian K.',
    location: 'București',
    rating: 5,
    text: 'Deși locuiesc în București, vin aici pentru tratamente complexe. Atmosfera calmă și profesionalismul echipei fac diferența.',
    service: 'Coroane dentare',
  },
  {
    id: 7,
    name: 'Ioana R.',
    location: 'Pitești',
    rating: 5,
    text: 'După ani de teamă de dentist, am găsit în sfârșit o clinică unde mă simt în siguranță. Recomand din toată inima!',
    service: 'Tratament canal',
  },
  {
    id: 8,
    name: 'George P.',
    location: 'Târgoviște',
    rating: 5,
    text: 'Am făcut o igienizare profesională și am plecat cu dinții perfect curați. Personal amabil, echipamente moderne.',
    service: 'Igienizare profesională',
  },
  {
    id: 9,
    name: 'Diana M.',
    location: 'Moreni',
    rating: 5,
    text: 'Programarea online a fost foarte ușoară, iar consultația a fost amănunțită. Doctorul a avut răbdare să-mi explice tot.',
    service: 'Consultație',
  },
];

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <FadeText direction="up">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Înapoi acasă
            </Link>
          </FadeText>
          
          <div className="text-center max-w-3xl mx-auto">
            <FadeText delay={0.1} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Părerile Pacienților
              </span>
            </FadeText>
            
            <FadeText delay={0.2} direction="up">
              <h1 className="font-bold text-4xl sm:text-5xl text-slate-900 mb-4">
                Experiențe reale, zâmbete fericite
              </h1>
            </FadeText>
            
            <FadeText delay={0.3} direction="up">
              <p className="text-lg text-slate-600 leading-relaxed">
                Descoperă ce spun pacienții noștri despre experiența la clinica noastră. 
                Fiecare poveste este unică și ne motivează să oferim cele mai bune servicii.
              </p>
            </FadeText>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <FadeText key={testimonial.id} delay={0.05 * index} direction="up">
                <div className="h-full bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6">
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
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="pt-4 border-t border-slate-100">
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.location} • {testimonial.service}
                    </p>
                  </div>
                </div>
              </FadeText>
            ))}
          </div>

          {/* CTA */}
          <FadeText delay={0.5} direction="up">
            <div className="text-center mt-12">
              <p className="text-slate-600 mb-4">
                Vrei să faci parte din poveștile noastre de succes?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-all hover:scale-105"
              >
                Programează-te acum
              </Link>
            </div>
          </FadeText>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
