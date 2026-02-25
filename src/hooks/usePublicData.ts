import { useState, useEffect } from 'react';
import {
  servicesApi,
  doctorsApi,
  beforeAfterApi,
  galleryApi,
  reviewsApi,
  faqApi,
  blogApi,
} from '../lib/cms';
import type {
  Service,
  Doctor,
  BeforeAfter,
  GalleryImage,
  Review,
  FAQ,
  BlogPost,
} from '../lib/supabase';

interface UseDataReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

// Services
export function useServices(): UseDataReturn<Service> {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    servicesApi.getAll(true)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Doctors
export function useDoctors(): UseDataReturn<Doctor> {
  const [data, setData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    doctorsApi.getAll(true)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Before/After
export function useBeforeAfter(): UseDataReturn<BeforeAfter> {
  const [data, setData] = useState<BeforeAfter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    beforeAfterApi.getAll(true)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Gallery
export function useGallery(): UseDataReturn<GalleryImage> {
  const [data, setData] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    galleryApi.getAll(true)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Reviews - published only
export function useReviews(): UseDataReturn<Review> {
  const [data, setData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    reviewsApi.getPublished()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// FAQ
export function useFAQ(): UseDataReturn<FAQ> {
  const [data, setData] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    faqApi.getAll(true)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// Blog - published only
export function useBlogPosts(): UseDataReturn<BlogPost> {
  const [data, setData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    blogApi.getPublished()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
