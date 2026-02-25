import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: 'Andreea M.',
    rating: 5,
    text: 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă și drăguță. Recomand cu încredere!',
    date: 'acum 2 săptămâni',
    avatar: 'https://ui-avatars.com/api/?name=Andreea+M&background=0d9488&color=fff&size=128',
  },
  {
    id: 2,
    author: 'Mihai D.',
    rating: 5,
    text: 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas. Acum pot zâmbi fără griji. Mulțumesc Dr. Suciu!',
    date: 'acum o lună',
    avatar: 'https://ui-avatars.com/api/?name=Mihai+D&background=1e3a5f&color=fff&size=128',
  },
  {
    id: 3,
    author: 'Elena P.',
    rating: 5,
    text: 'Am ales Invisalign și nu regret. Alignerele sunt atât de discrete că prietenii nici nu au observat. Rezultate excelente într-un timp record!',
    date: 'acum 3 săptămâni',
    avatar: 'https://ui-avatars.com/api/?name=Elena+P&background=059669&color=fff&size=128',
  },
  {
    id: 4,
    author: 'Cristian S.',
    rating: 5,
    text: 'Merită deplasarea de la Ploiești! Am făcut albire și rezultatul a fost imediat vizibil. Prețuri corecte și personal amabil.',
    date: 'acum 2 luni',
    avatar: 'https://ui-avatars.com/api/?name=Cristian+S&background=d97706&color=fff&size=128',
  },
  {
    id: 5,
    author: 'Maria L.',
    rating: 5,
    text: 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă. Locul perfect pentru familii!',
    date: 'acum o săptămână',
    avatar: 'https://ui-avatars.com/api/?name=Maria+L&background=db2777&color=fff&size=128',
  },
  {
    id: 6,
    author: 'Adrian K.',
    rating: 5,
    text: 'Deși locuiesc în București, vin aici pentru tratamente complexe. Atmosfera calmă și profesionalismul fac diferența. Cel mai bun dentist din zonă!',
    date: 'acum 3 luni',
    avatar: 'https://ui-avatars.com/api/?name=Adrian+K&background=7c3aed&color=fff&size=128',
  },
];

const ReviewsSectionMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-12 pb-16 bg-white lg:hidden">
      {/* Header */}
      <div className="px-5 mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ce spun pacienții noștri
        </h2>
        <p className="text-sm text-gray-500">
          Povești de la oameni care și-au transformat zâmbetul.
        </p>
      </div>

      {/* Carousel */}
      <div className="px-5">
        <div 
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full flex-shrink-0 px-1"
              >
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{review.author}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPaused(true);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-4 bg-gray-700' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Google Link */}
      <div className="text-center mt-6">
        <a
          href="https://www.google.com/search?sa=X&sca_esv=3e8b06acf992d999&rlz=1C1FHFK_enES1096ES1096&sxsrf=ANbL-n7_67OaB8qcRYwA5rO2L62mVrOQng:1770685897789&q=DOCTOR+SUCIU+Dental+Clinic+Reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-gray-600"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="font-medium">5.0</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-gray-400">·</span>
          <span>53 recenzii</span>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </a>
      </div>
    </section>
  );
};

export default ReviewsSectionMobile;
