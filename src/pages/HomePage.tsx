import { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import ServicesPreview from '../sections/ServicesPreview';
import WhyChooseSection from '../sections/WhyChooseSection';
import ReviewsSection from '../sections/ReviewsSection';
import TeamSection from '../sections/TeamSection';
import ClinicGallery from '../sections/ClinicGallery';
import HowToBook from '../sections/HowToBook';
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
      {/* 1. Hero - Prima secțiune, critică */}
      <HeroSection />
      
      {/* 2. Servicii principale - Overview rapid */}
      <ServicesPreview />
      
      {/* 3. De ce noi - Diferențiatori */}
      <WhyChooseSection />
      
      {/* 4. Recenzii pacienți - Social proof */}
      <ReviewsSection />
      
      {/* 5. Echipa / Medicii - Umanizare */}
      <TeamSection />
      
      {/* 6. Clinica - Poze reale */}
      <ClinicGallery />
      
      {/* 7. Cum te programezi - 3 pași simpli */}
      <HowToBook />
      
      {/* 8. CTA final - Conversie */}
      <ContactSection />
    </>
  );
};

export default HomePage;
