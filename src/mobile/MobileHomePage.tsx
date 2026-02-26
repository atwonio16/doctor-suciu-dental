import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MobileHero } from './sections/MobileHero';
import { MobileBeforeAfter } from './sections/MobileBeforeAfter';
import { MobileServicesPreview } from './sections/MobileServicesPreview';
import { MobileWhyChoose } from './sections/MobileWhyChoose';
import { MobileReviews } from './sections/MobileReviews';
import { MobileTeam } from './sections/MobileTeam';
import { MobileGallery } from './sections/MobileGallery';
import { MobileContact } from './sections/MobileContact';

export function MobileHomePage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = decodeURIComponent(location.hash.slice(1));
    const timer = window.setTimeout(() => {
      const element = document.getElementById(targetId);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <div className="overflow-x-clip">
      <MobileHero />
      <MobileBeforeAfter />
      <MobileServicesPreview />
      <MobileWhyChoose />
      <MobileReviews />
      <MobileTeam />
      <MobileGallery />
      <MobileContact />
    </div>
  );
}
