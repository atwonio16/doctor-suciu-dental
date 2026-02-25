import { useEffect } from 'react';
import HeroSectionMobile from '../sections/HeroSectionMobile';
import ServicesPreviewMobile from '../sections/ServicesPreviewMobile';
import TeamSectionMobile from '../sections/TeamSectionMobile';
import ReviewsSectionMobile from '../sections/ReviewsSectionMobile';
import BeforeAfterSectionMobile from '../sections/BeforeAfterSectionMobile';
import ClinicGalleryMobile from '../sections/ClinicGalleryMobile';
import WhyChooseSectionMobile from '../sections/WhyChooseSectionMobile';
import ContactSectionMobile from '../sections/ContactSectionMobile';

const HomePageMobile = () => {
  useEffect(() => {
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
};

export default HomePageMobile;
