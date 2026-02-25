import { supabase } from './supabase';
import type { Service, Doctor, BeforeAfter, GalleryImage, Review, FAQ, BlogPost, Appointment } from './supabase';

// Generic CRUD operations
export async function getAll<T>(table: string, options?: { active?: boolean; orderBy?: string }): Promise<T[]> {
  let query = supabase.from(table).select('*');
  
  if (options?.active !== undefined) {
    query = query.eq('is_active', options.active);
  }
  
  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: true });
  } else {
    query = query.order('order_index', { ascending: true });
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    return [];
  }
  
  return data || [];
}

export async function getById<T>(table: string, id: string): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    return null;
  }
  
  return data;
}

export async function create<T extends { id?: string; created_at?: string; updated_at?: string }>(
  table: string, 
  item: Omit<T, 'id' | 'created_at' | 'updated_at'>
): Promise<T | null> {
  console.log(`Creating in ${table}:`, item);
  const { data, error } = await supabase
    .from(table)
    .insert(item)
    .select()
    .single();
  
  if (error) {
    console.error(`Error creating in ${table}:`, error);
    alert(`Eroare Supabase: ${error.message}`);
    return null;
  }
  
  return data;
}

export async function update<T>(table: string, id: string, updates: Partial<T>): Promise<T | null> {
  const { data, error } = await supabase
    .from(table)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating in ${table}:`, error);
    return null;
  }
  
  return data;
}

export async function remove(table: string, id: string): Promise<boolean> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    return false;
  }
  
  return true;
}

export async function reorder(table: string, ids: string[]): Promise<boolean> {
  try {
    for (let i = 0; i < ids.length; i++) {
      await supabase
        .from(table)
        .update({ order_index: i })
        .eq('id', ids[i]);
    }
    return true;
  } catch (error) {
    console.error(`Error reordering ${table}:`, error);
    return false;
  }
}

// Services API
export const servicesApi = {
  getAll: () => getAll<Service>('services', { orderBy: 'order_index' }),
  getById: (id: string) => getById<Service>('services', id),
  create: (item: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => create<Service>('services', item),
  update: (id: string, updates: Partial<Service>) => update<Service>('services', id, updates),
  remove: (id: string) => remove('services', id),
  reorder: (ids: string[]) => reorder('services', ids),
};

export const doctorsApi = {
  getAll: () => getAll<Doctor>('doctors', { orderBy: 'order_index' }),
  getById: (id: string) => getById<Doctor>('doctors', id),
  create: (item: Omit<Doctor, 'id' | 'created_at' | 'updated_at'>) => create<Doctor>('doctors', item),
  update: (id: string, updates: Partial<Doctor>) => update<Doctor>('doctors', id, updates),
  remove: (id: string) => remove('doctors', id),
  reorder: (ids: string[]) => reorder('doctors', ids),
};

export const beforeAfterApi = {
  getAll: () => getAll<BeforeAfter>('before_after', { orderBy: 'order_index' }),
  getById: (id: string) => getById<BeforeAfter>('before_after', id),
  create: (item: Omit<BeforeAfter, 'id' | 'created_at' | 'updated_at'>) => create<BeforeAfter>('before_after', item),
  update: (id: string, updates: Partial<BeforeAfter>) => update<BeforeAfter>('before_after', id, updates),
  remove: (id: string) => remove('before_after', id),
  reorder: (ids: string[]) => reorder('before_after', ids),
};

export const galleryApi = {
  getAll: () => getAll<GalleryImage>('gallery', { orderBy: 'order_index' }),
  getById: (id: string) => getById<GalleryImage>('gallery', id),
  create: (item: Omit<GalleryImage, 'id' | 'created_at' | 'updated_at'>) => create<GalleryImage>('gallery', item),
  update: (id: string, updates: Partial<GalleryImage>) => update<GalleryImage>('gallery', id, updates),
  remove: (id: string) => remove('gallery', id),
  reorder: (ids: string[]) => reorder('gallery', ids),
};

export const reviewsApi = {
  getAll: () => getAll<Review>('reviews', { orderBy: 'order_index' }),
  getPublished: () => getAll<Review>('reviews', { orderBy: 'order_index' }).then(reviews => reviews.filter(r => r.is_published)),
  getFeatured: () => getAll<Review>('reviews', { orderBy: 'order_index' }).then(reviews => reviews.filter(r => r.is_featured && r.is_published)),
  getById: (id: string) => getById<Review>('reviews', id),
  create: (item: Omit<Review, 'id' | 'created_at' | 'updated_at'>) => create<Review>('reviews', item),
  update: (id: string, updates: Partial<Review>) => update<Review>('reviews', id, updates),
  remove: (id: string) => remove('reviews', id),
  reorder: (ids: string[]) => reorder('reviews', ids),
};

export const faqApi = {
  getAll: () => getAll<FAQ>('faq', { orderBy: 'order_index' }),
  getById: (id: string) => getById<FAQ>('faq', id),
  create: (item: Omit<FAQ, 'id' | 'created_at' | 'updated_at'>) => create<FAQ>('faq', item),
  update: (id: string, updates: Partial<FAQ>) => update<FAQ>('faq', id, updates),
  remove: (id: string) => remove('faq', id),
  reorder: (ids: string[]) => reorder('faq', ids),
};

export const blogApi = {
  getAll: () => getAll<BlogPost>('blog_posts', { orderBy: 'created_at' }),
  getPublished: () => getAll<BlogPost>('blog_posts', { orderBy: 'published_at' }).then(posts => posts.filter(p => p.is_published)),
  getBySlug: (slug: string) => supabase.from('blog_posts').select('*').eq('slug', slug).single().then(({ data }) => data),
  getById: (id: string) => getById<BlogPost>('blog_posts', id),
  create: (item: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => create<BlogPost>('blog_posts', item),
  update: (id: string, updates: Partial<BlogPost>) => update<BlogPost>('blog_posts', id, updates),
  remove: (id: string) => remove('blog_posts', id),
};

export const appointmentsApi = {
  getAll: () => getAll<Appointment>('appointments', { orderBy: 'created_at' }),
  getById: (id: string) => getById<Appointment>('appointments', id),
  create: (item: Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'status'>) => 
    create<Appointment>('appointments', { ...item, status: 'pending' }),
  update: (id: string, updates: Partial<Appointment>) => update<Appointment>('appointments', id, updates),
  remove: (id: string) => remove('appointments', id),
};

// Settings API
export const settingsApi = {
  async get(key: string): Promise<any> {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();
    
    if (error) return null;
    return data?.value;
  },
  
  async set(key: string, value: any): Promise<boolean> {
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value });
    
    if (error) {
      console.error('Error saving setting:', error);
      return false;
    }
    return true;
  },
};
