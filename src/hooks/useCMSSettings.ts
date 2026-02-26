import { useState, useEffect } from 'react';
import type { CMSSettings, GoogleReviewsStats } from '../admin/types';

const defaultGoogleReviews: GoogleReviewsStats = {
  rating: 5.0,
  reviewCount: 53,
  url: 'https://www.google.com/search?sa=X&sca_esv=3e8b06acf992d999&rlz=1C1FHFK_enES1096ES1096&sxsrf=ANbL-n7_67OaB8qcRYwA5rO2L62mVrOQng:1770685897789&q=DOCTOR+SUCIU+Dental+Clinic+Reviews',
};

export const useCMSSettings = () => {
  const [settings, setSettings] = useState<CMSSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const stored = localStorage.getItem('cms_settings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
      } catch {
        setSettings(null);
      }
    }
    setLoading(false);
  }, []);

  const googleReviews = settings?.googleReviews || defaultGoogleReviews;

  return {
    settings,
    googleReviews,
    loading,
  };
};

export default useCMSSettings;
