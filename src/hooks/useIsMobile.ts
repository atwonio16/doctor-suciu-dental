import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;
const MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT}px)`;

/**
 * useIsMobile - Stable viewport detection using matchMedia
 * Only updates state when crossing the breakpoint (768px)
 * No resize polling, no continuous re-renders
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(MEDIA_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(MEDIA_QUERY);

    // Update state only when match changes (breakpoint crossing)
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Set initial state
    setIsMobile(mediaQueryList.matches);

    // Modern API (addEventListener)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
      return () => mediaQueryList.removeEventListener('change', handleChange);
    }

    // Legacy API fallback (addListener for older browsers)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mediaQueryList as any).addListener(handleChange);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mediaQueryList as any).removeListener(handleChange);
    };
  }, []);

  return isMobile;
}
