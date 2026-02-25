import { useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import HeroSection from '../sections/HeroSection';
import BeforeAfterSection from '../sections/BeforeAfterSection';
import ServicesPreview from '../sections/ServicesPreview';
import WhyChooseSection from '../sections/WhyChooseSection';
import ReviewsSection from '../sections/ReviewsSection';
import TeamSection from '../sections/TeamSection';
import ClinicGallery from '../sections/ClinicGallery';
import ContactSection from '../sections/ContactSection';
// Mobile imports
import HeroSectionMobile from '../sections/HeroSectionMobile';
import ServicesPreviewMobile from '../sections/ServicesPreviewMobile';
import TeamSectionMobile from '../sections/TeamSectionMobile';
import ReviewsSectionMobile from '../sections/ReviewsSectionMobile';
import BeforeAfterSectionMobile from '../sections/BeforeAfterSectionMobile';
import ClinicGalleryMobile from '../sections/ClinicGalleryMobile';
import WhyChooseSectionMobile from '../sections/WhyChooseSectionMobile';

import ContactSectionMobile from '../sections/ContactSectionMobile';

const HomePage = () => {
  const isMobile = useIsMobile();
  
  // IMPORTANT: All hooks must be called before any conditional return
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

  // Show mobile version on small screens (after all hooks are called)
  if (isMobile) {
    return (
      <main className="pb-20">
        <HeroSectionMobile />
        <ServicesPreviewMobile />
        <BeforeAfterSectionMobile />
        <WhyChooseSectionMobile />
        <ReviewsSectionMobile />
        <TeamSectionMobile />
        <ClinicGalleryMobile />
        <ContactSectionMobile />
      </main>
    );
  }

  // Desktop version
  return (
    <>
      {/* 1. Hero - Prima secțiune, critică */}
      <HeroSection />
      
      {/* 2. Before & After - Transformări reale */}
      <BeforeAfterSection />
      
      {/* 3. Servicii principale - Overview rapid */}
      <ServicesPreview />
      
      {/* 3. De ce noi - Diferențiatori */}
      <WhyChooseSection />
      
      {/* 4. Recenzii pacienți - Social proof */}
      <ReviewsSection />
      
      {/* 5. Echipa / Medicii - Umanizare */}
      <TeamSection />
      
      {/* 6. Clinica - Poze reale */}
      <ClinicGallery />
      
      {/* 7. Cum te programezi */}
      {/* 7. CTA final - Conversie */}
      <ContactSection />
    </>
  );
};

export default HomePage;
