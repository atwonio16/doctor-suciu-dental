import { useState, useEffect } from 'react';

interface GooglePlaceData {
  rating: number;
  userRatingsTotal: number;
  reviews?: GoogleReview[];
}

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface UseGoogleReviewsReturn {
  data: GooglePlaceData | null;
  loading: boolean;
  error: string | null;
}

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY || '';
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID || '';

export const useGoogleReviews = (): UseGoogleReviewsReturn => {
  const [data, setData] = useState<GooglePlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dacă nu avem API key, folosim date fallback
    if (!GOOGLE_API_KEY || !PLACE_ID) {
      console.warn('Google Places API Key sau Place ID lipsă. Se folosesc date statice.');
      setData({
        rating: 5.0,
        userRatingsTotal: 53,
      });
      setLoading(false);
      return;
    }

    const fetchPlaceData = async () => {
      try {
        // Folosim proxy CORS sau backend pentru request
        // Alternativ, putem folosi direct API-ul dacă avem CORS configurat
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?` +
          `place_id=${PLACE_ID}&` +
          `fields=rating,user_ratings_total,reviews&` +
          `language=ro&` +
          `key=${GOOGLE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Eroare la preluarea datelor');
        }

        const result = await response.json();

        if (result.status !== 'OK') {
          throw new Error(`API Error: ${result.status}`);
        }

        setData({
          rating: result.result.rating || 0,
          userRatingsTotal: result.result.user_ratings_total || 0,
          reviews: result.result.reviews || [],
        });
      } catch (err) {
        console.error('Eroare Google Places API:', err);
        setError('Nu s-au putut încărca recenziile');
        // Fallback la date statice în caz de eroare
        setData({
          rating: 5.0,
          userRatingsTotal: 127,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, []);

  return { data, loading, error };
};

export default useGoogleReviews;
