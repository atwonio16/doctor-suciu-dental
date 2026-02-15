import { useState, useEffect, useCallback } from 'react';
import { Star, Quote } from 'lucide-react';
import { useGoogleReviews } from '../hooks/useGoogleReviews';

const reviews = [
  {
    id: 1,
    name: 'Andreea M.',
    avatar: 'AM',
    rating: 5,
    text: 'Am avut emoții înainte de prima vizită, dar totul a fost mult mai ușor decât mă așteptam. Echipa este foarte atentă!',
    treatment: 'Consultație',
  },
  {
    id: 2,
    name: 'Mihai D.',
    avatar: 'MD',
    rating: 5,
    text: 'Profesionalism la cel mai înalt nivel. Am făcut implanturi și procesul a fost explicat pas cu pas.',
    treatment: 'Implant dentar',
  },
  {
    id: 3,
    name: 'Elena P.',
    avatar: 'EP',
    rating: 5,
    text: 'Am ales Invisalign și nu regret. Alignerele sunt atât de discrete! Rezultate excelente într-un timp record.',
    treatment: 'Ortodonție',
  },
  {
    id: 4,
    name: 'Maria L.',
    avatar: 'ML',
    rating: 5,
    text: 'Copilul meu avea frică de dentist, dar aici l-au primit cu atâta căldură încât acum vine fără să plângă.',
    treatment: 'Pedodonție',
  },
];

const ReviewsSection = () => {
  const { data: googleData } = useGoogleReviews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-10 bg-[#1e3a5f]">
      {/* Section Header */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[12px] font-semibold text-[#0d9488] uppercase tracking-wide">
              Recenzii Google
            </span>
            <h2 className="text-title-1 text-white mt-1">
              Ce spun pacienții
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[14px] text-white">{googleData?.rating.toFixed(1) || '5.0'}</span>
          </div>
        </div>
      </div>

      {/* Review Card */}
      <div className="px-4">
        <div 
          className="bg-white rounded-2xl p-5 shadow-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Quote Icon */}
          <div className="mb-4">
            <Quote className="w-8 h-8 text-[#0d9488]/20" />
          </div>

          {/* Review Text */}
          <p className="text-[16px] text-gray-700 leading-relaxed mb-5">
            "{currentReview.text}"
          </p>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-semibold text-[14px]">
                {currentReview.avatar}
              </div>
              <div>
                <p className="font-semibold text-[15px] text-gray-900">{currentReview.name}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
            <span className="text-[12px] text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {currentReview.treatment}
            </span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-6 bg-white' 
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Total Reviews */}
      <p className="text-center text-[13px] text-white/60 mt-5">
        Din {googleData?.userRatingsTotal || '53'} recenzii verificate pe Google
      </p>
    </section>
  );
};

export default ReviewsSection;
