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
} from '../lib/cms';
import type {
  Service,
  Doctor,
  BeforeAfter,
  GalleryImage,
  Review,
  FAQ,
  BlogPost,
  Appointment,
} from '../lib/supabase';

// Generic hook for fetching data
function useSupabaseData<T>(
  fetchFn: () => Promise<T[]>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh, setData };
}

// Services hook
export function useServices(activeOnly = true) {
  return useSupabaseData<Service>(() => servicesApi.getAll(activeOnly), [activeOnly]);
}

// Doctors hook
export function useDoctors(activeOnly = true) {
  return useSupabaseData<Doctor>(() => doctorsApi.getAll(activeOnly), [activeOnly]);
}

// Before/After hook
export function useBeforeAfter(activeOnly = true) {
  return useSupabaseData<BeforeAfter>(() => beforeAfterApi.getAll(activeOnly), [activeOnly]);
}

// Gallery hook
export function useGallery(activeOnly = true) {
  return useSupabaseData<GalleryImage>(() => galleryApi.getAll(activeOnly), [activeOnly]);
}

// Reviews hook
export function useReviews() {
  return useSupabaseData<Review>(() => reviewsApi.getAll(), []);
}

export function usePublishedReviews() {
  return useSupabaseData<Review>(() => reviewsApi.getPublished(), []);
}

export function useFeaturedReviews() {
  return useSupabaseData<Review>(() => reviewsApi.getFeatured(), []);
}

// FAQ hook
export function useFAQ(activeOnly = true) {
  return useSupabaseData<FAQ>(() => faqApi.getAll(activeOnly), [activeOnly]);
}

// Blog hook
export function useBlogPosts() {
  return useSupabaseData<BlogPost>(() => blogApi.getAll(), []);
}

export function usePublishedBlogPosts() {
  return useSupabaseData<BlogPost>(() => blogApi.getPublished(), []);
}

// Appointments hook
export function useAppointments() {
  return useSupabaseData<Appointment>(() => appointmentsApi.getAll(), []);
}

// Admin hook with CRUD operations
export function useAdminCMS<T extends { id: string }>(
  _tableName: string,
  api: {
    getAll: () => Promise<T[]>;
    create: (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => Promise<T | null>;
    update: (id: string, updates: Partial<T>) => Promise<T | null>;
    remove: (id: string) => Promise<boolean>;
    reorder?: (ids: string[]) => Promise<boolean>;
  }
) {
  const { data, loading, error, refresh, setData } = useSupabaseData<T>(api.getAll, []);

  const create = useCallback(async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    const newItem = await api.create(item);
    if (newItem) {
      setData(prev => [newItem, ...prev]);
    }
    return newItem;
  }, [api, setData]);

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    const updated = await api.update(id, updates);
    if (updated) {
      setData(prev =>
        prev.map(item => (item.id === id ? updated : item))
      );
    }
    return updated;
  }, [api, setData]);

  const remove = useCallback(async (id: string) => {
    const success = await api.remove(id);
    if (success) {
      setData(prev => prev.filter(item => item.id !== id));
    }
    return success;
  }, [api, setData]);

  const reorder = useCallback(async (ids: string[]) => {
    if (api.reorder) {
      const success = await api.reorder(ids);
      if (success) {
        await refresh();
      }
      return success;
    }
    return false;
  }, [api, refresh]);

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
  return useAdminCMS<Service>('services', servicesApi);
}

export function useAdminDoctors() {
  return useAdminCMS<Doctor>('doctors', doctorsApi);
}

export function useAdminBeforeAfter() {
  return useAdminCMS<BeforeAfter>('before_after', beforeAfterApi);
}

export function useAdminGallery() {
  return useAdminCMS<GalleryImage>('gallery', galleryApi);
}

export function useAdminReviews() {
  return useAdminCMS<Review>('reviews', reviewsApi);
}

export function useAdminFAQ() {
  return useAdminCMS<FAQ>('faq', faqApi);
}

export function useAdminBlog() {
  return useAdminCMS<BlogPost>('blog_posts', blogApi);
}

export function useAdminAppointments() {
  return useAdminCMS<Appointment>('appointments', appointmentsApi);
}
