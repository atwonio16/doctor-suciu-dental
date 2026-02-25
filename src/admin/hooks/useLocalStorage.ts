import { useState, useEffect, useCallback, useRef } from 'react';

const BROADCAST_CHANNEL = 'cms-sync';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(() => readValue());
  const bcRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Setup BroadcastChannel for cross-tab sync
    try {
      bcRef.current = new BroadcastChannel(BROADCAST_CHANNEL);
      bcRef.current.onmessage = (event) => {
        if (event.data?.key === key) {
          setStoredValue(readValue());
        }
      };
    } catch (e) {
      console.log('BroadcastChannel not supported');
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue));
      }
    };

    const handleCustomEvent = (event: CustomEvent<{ key: string }>) => {
      if (event.detail.key === key) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-change' as any, handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-change' as any, handleCustomEvent);
      bcRef.current?.close();
    };
  }, [key, readValue]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        if (typeof window !== 'undefined') {
          const jsonString = JSON.stringify(valueToStore);
          window.localStorage.setItem(key, jsonString);
          
          // Notify via BroadcastChannel
          bcRef.current?.postMessage({ key: key, timestamp: Date.now() });
          
          // Dispatch events
          window.dispatchEvent(new CustomEvent('local-storage-change', { detail: { key: key } }));
          window.dispatchEvent(new CustomEvent('cms-update', { detail: { key: key } }));
        }
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

export function useCMSData<T extends { id: string; createdAt: string; updatedAt: string }>(
  key: string
) {
  const [data, setData] = useLocalStorage<T[]>(`cms_${key}`, []);

  const create = useCallback((item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T;
    setData(prev => [newItem, ...prev]);
    return newItem;
  }, [setData]);

  const update = useCallback((id: string, updates: Partial<T>) => {
    setData(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    );
  }, [setData]);

  const remove = useCallback((id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  }, [setData]);

  const getById = useCallback((id: string) => {
    return data.find(item => item.id === id);
  }, [data]);

  const reorder = useCallback((orderedIds: string[]) => {
    setData(prev => {
      const itemsMap = new Map(prev.map(item => [item.id, item]));
      return orderedIds
        .map(id => itemsMap.get(id))
        .filter((item): item is T => item !== undefined);
    });
  }, [setData]);

  const clearAll = useCallback(() => {
    setData([] as T[]);
  }, [setData]);

  return {
    data,
    create,
    update,
    remove,
    getById,
    reorder,
    clearAll,
    count: data.length,
  };
}

export default useLocalStorage;
