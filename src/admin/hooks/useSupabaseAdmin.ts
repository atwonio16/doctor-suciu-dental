import { useState, useEffect, useCallback } from 'react';
import {
  servicesApi,
  doctorsApi,
  beforeAfterApi,
  galleryApi,
  reviewsApi,
  faqApi,
  blogApi,
  appointmentsApi,
} from '../../lib/cms';
import type {
  Service,
  Doctor,
  BeforeAfter,
  GalleryImage,
  Review,
  FAQ,
  BlogPost,
  Appointment,
} from '../../lib/supabase';

// Generic admin hook with CRUD operations
export function useAdminCMS<T extends { id: string }>(
  api: {
    getAll: () => Promise<T[]>;
    create: (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => Promise<T | null>;
    update: (id: string, updates: Partial<T>) => Promise<T | null>;
    remove: (id: string) => Promise<boolean>;
    reorder?: (ids: string[]) => Promise<boolean>;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.getAll();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = useCallback(async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newItem = await api.create(item);
      if (newItem) {
        setData(prev => [newItem, ...prev]);
      }
      return newItem;
    } catch (err) {
      console.error('Create error:', err);
      return null;
    }
  }, [api]);

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    const updated = await api.update(id, updates);
    if (updated) {
      setData(prev =>
        prev.map(item => (item.id === id ? updated : item))
      );
    }
    return updated;
  }, [api]);

  const remove = useCallback(async (id: string) => {
    const success = await api.remove(id);
    if (success) {
      setData(prev => prev.filter(item => item.id !== id));
    }
    return success;
  }, [api]);

  const reorder = useCallback(async (ids: string[]) => {
    if (api.reorder) {
      const success = await api.reorder(ids);
      if (success) {
        await fetchData();
      }
      return success;
    }
    return false;
  }, [api, fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    create,
    update,
    remove,
    reorder,
    count: data.length,
  };
}

// Specific admin hooks
export function useAdminServices() {
  return useAdminCMS<Service>(servicesApi);
}

export function useAdminDoctors() {
  return useAdminCMS<Doctor>(doctorsApi);
}

export function useAdminBeforeAfter() {
  return useAdminCMS<BeforeAfter>(beforeAfterApi);
}

export function useAdminGallery() {
  return useAdminCMS<GalleryImage>(galleryApi);
}

export function useAdminReviews() {
  return useAdminCMS<Review>(reviewsApi);
}

export function useAdminFAQ() {
  return useAdminCMS<FAQ>(faqApi);
}

export function useAdminBlog() {
  return useAdminCMS<BlogPost>(blogApi);
}

export function useAdminAppointments() {
  return useAdminCMS<Appointment>(appointmentsApi);
}
