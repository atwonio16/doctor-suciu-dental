import { useState, useEffect } from 'react';

// Hook pentru a citi date în site-ul public
// Deoarece admin-ul salvează date per sesiune, site-ul public folosește:
// 1. Date hardcoded (default) - pentru vizitatori
// 2. Sau poate citi dintr-o cheie publică dacă există

export function usePublicCMSData<T>(key: string): T[] {
  const [data, setData] = useState<T[]>([]);
  
  useEffect(() => {
    // Site-ul public nu are acces la datele salvate în sesiunile admin
    // Folosim datele default sau o cheie publică specială
    // Pentru moment, returnăm array gol și lăsăm componentele să folosească defaults
    setData([]);
  }, [key]);
  
  return data;
}

// Hook pentru a citi date dintr-o sesiune specifică (doar dacă știm ID-ul)
export function useSessionCMSData<T>(key: string, sessionId: string | null): T[] {
  const [data, setData] = useState<T[]>([]);
  
  useEffect(() => {
    if (!sessionId || typeof window === 'undefined') {
      setData([]);
      return;
    }
    
    const sessionKey = `${sessionId}_cms_${key}`;
    const stored = localStorage.getItem(sessionKey);
    
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing session data:', e);
        setData([]);
      }
    } else {
      setData([]);
    }
  }, [key, sessionId]);
  
  return data;
}

export default usePublicCMSData;
