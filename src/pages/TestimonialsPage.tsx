import { Link } from 'react-router-dom';
import { Star, ArrowLeft, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Andreea M.',
    location: 'Târgoviște',
    text: 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă și drăguță.',
    service: 'Fațete dentare',
  },
  {
    id: 2,
    name: 'Mihai D.',
    location: 'Dâmbovița',
    text: 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas. Acum pot zâmbi fără griji.',
    service: 'Implanturi dentare',
  },
  {
    id: 3,
    name: 'Elena P.',
    location: 'Târgoviște',
    text: 'Am ales Invisalign și nu regret. Alignerele sunt atât de discrete că prietenii nici nu au observat. Rezultate excelente!',
    service: 'Ortodonție Invisalign',
  },
  {
    id: 4,
    name: 'Cristian S.',
    location: 'Ploiești',
    text: 'Merită deplasarea de la Ploiești! Am făcut albire și rezultatul a fost imediat vizibil. Prețuri corecte.',
    service: 'Albire dentară',
  },
  {
    id: 5,
    name: 'Maria L.',
    location: 'Târgoviște',
    text: 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă.',
    service: 'Stomatologie pediatrică',
  },
  {
    id: 6,
    name: 'Adrian K.',
    location: 'București',
    text: 'Deși locuiesc în București, vin aici pentru tratamente complexe. Atmosfera calmă și profesionalismul fac diferența.',
    service: 'Coroane dentare',
  },
];

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </Link>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="category-pill mb-4">PĂRERILE PACIENȚILOR</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Experiențe <span className="gradient-text">reale</span>
            </h1>
            <p className="text-slate-600">Ce spun pacienții noștri despre vizita la clinică</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-slate-50 rounded-2xl p-6">
                <Quote className="w-8 h-8 text-sky-200 mb-3" />
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">"{t.text}"</p>
                <div className="pt-4 border-t border-slate-200">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.location} • {t.service}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Vrei să faci parte din poveștile noastre?</p>
            <Link to="/contact" className="btn-primary">PROGRAMEAZĂ-TE ACUM</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
