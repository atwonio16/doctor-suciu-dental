import { useSupabaseSettings } from './useSupabaseSettings';
import type { CMSSettings, GoogleReviewsStats } from '../admin/types';

const defaultGoogleReviews: GoogleReviewsStats = {
  rating: 5.0,
  reviewCount: 53,
  url: 'https://www.google.com/search?q=DOCTOR+SUCIU+Dental+Clinic+Reviews',
};

// Re-export with same interface for backward compatibility
export const useCMSSettings = () => {
  const { settings, loading, error, refetch } = useSupabaseSettings();

  return {
    settings,
    googleReviews: settings?.googleReviews || defaultGoogleReviews,
    loading,
    error,
    refetch,
  };
};

export default useCMSSettings;

// Re-export types
export type { CMSSettings, GoogleReviewsStats };
