import { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import ServicesPreview from '../sections/ServicesPreview';
import TeamSection from '../sections/TeamSection';
import WhyChooseSection from '../sections/WhyChooseSection';
import ReviewsSection from '../sections/ReviewsSection';
import ContactSection from '../sections/ContactSection';

const HomePage = () => {
  useEffect(() => {
    // Handle scroll on page load if hash is present
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <TeamSection />
      <WhyChooseSection />
      <ReviewsSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
