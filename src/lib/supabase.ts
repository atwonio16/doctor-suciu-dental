import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const fallbackSupabaseUrl = 'https://placeholder-project.supabase.co';
const fallbackSupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.placeholder';

// Debug info (development only)
if (import.meta.env.DEV) {
  console.log('Supabase URL:', supabaseUrl ? 'Set' : 'NOT SET');
  console.log('Supabase Key:', supabaseKey ? 'Set' : 'NOT SET');
}

if (!isSupabaseConfigured) {
  console.error('Missing Supabase environment variables.');
  console.error('VITE_SUPABASE_URL:', supabaseUrl || 'MISSING');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'SET (hidden)' : 'MISSING');
  console.warn('Continuing in fallback mode (Supabase disabled).');
}

export const supabase = createClient(supabaseUrl || fallbackSupabaseUrl, supabaseKey || fallbackSupabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Test connection function
export async function testSupabaseConnection(): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  try {
    const { error } = await supabase.from('services').select('count', { count: 'exact', head: true });
    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (err) {
    console.error('Supabase connection test error:', err);
    return false;
  }
}
// Tipuri pentru tabele
export interface Service {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  icon?: string;
  image_url?: string;
  features?: string[];
  price?: string;
  duration?: string;
  category: string;
  category_slug: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string;
  image_crop?: string; // Poziția crop-ului imaginii (ex: "center 30%")
  specialties?: string[];
  education?: string[];
  email?: string;
  phone?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BeforeAfter {
  id: string;
  title: string;
  description?: string;
  before_image_url: string;
  after_image_url: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  content: string;
  avatar_url?: string;
  date_text?: string;
  is_featured: boolean;
  is_published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  author?: string;
  tags?: string[];
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service_id?: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
}
