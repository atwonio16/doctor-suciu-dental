import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// Generic hook for admin CRUD operations
function useAdminTable<T extends { id: string }>(
  table: string,
  options?: {
    orderBy?: string;
    ascending?: boolean;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error: err } = await supabase
        .from(table)
        .select('*')
        .order(options?.orderBy || 'order_index', { ascending: options?.ascending ?? true });

      if (err) {
        console.error(`Error fetching ${table}:`, err);
        setError(err.message);
        setData([]);
      } else {
        setData((result as T[]) || []);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      console.error(`Error fetching ${table}:`, msg);
      setError(msg);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [table, options?.orderBy, options?.ascending]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = useCallback(async (item: Omit<T, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: result, error: err } = await supabase
        .from(table)
        .insert([{ ...item, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
        .select()
        .single();

      if (err) {
        console.error(`Error creating ${table}:`, err);
        throw err;
      }
      
      setData(prev => [...prev, result as T]);
      return result as T;
    } catch (e) {
      console.error(`Error creating ${table}:`, e);
      throw e;
    }
  }, [table]);

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    console.log(`Base update called for table ${table}, id:`, id, 'updates:', updates);
    try {
      const { data: result, error: err } = await supabase
        .from(table)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      console.log('Supabase response:', { result, error: err });

      if (err) {
        console.error(`Error updating ${table}:`, err);
        throw err;
      }

      setData(prev => prev.map(item => item.id === id ? { ...item, ...result } as T : item));
      return result as T;
    } catch (e) {
      console.error(`Error updating ${table}:`, e);
      throw e;
    }
  }, [table]);

  const remove = useCallback(async (id: string) => {
    try {
      const { error: err } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (err) {
        console.error(`Error deleting ${table}:`, err);
        throw err;
      }

      setData(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error(`Error deleting ${table}:`, e);
      throw e;
    }
  }, [table]);

  return { data, loading, error, create, update, remove, refetch: fetchData };
}

// Types for admin use
interface AdminDoctor {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  specialties: string[];
  experience: string;
  education: string;
  email?: string;
  phone?: string;
  tags: string[];
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminService {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: string;
  duration: string;
  features: string[];
  icon: string;
  color: string;
  lightColor: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminBeforeAfter {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  testimonial: string;
  patientName: string;
  serviceType: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminGalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminReview {
  id: string;
  authorName: string;
  authorEmail?: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  readTime: string;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminAppointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Admin hooks using the generic hook with mapping
export function useAdminDoctors() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('doctors');
  
  const mappedData: AdminDoctor[] = rawData.map(d => ({
    id: d.id,
    name: d.name,
    role: d.role,
    description: d.description || '',
    image: d.image_url || '/team_portrait.jpg',
    specialties: d.specialties || [],
    experience: '', // not in database
    education: Array.isArray(d.education) ? d.education.join(', ') : (d.education || ''),
    email: d.email,
    phone: d.phone,
    tags: d.specialties || [], // folosim specialties ca tags pentru compatibilitate
    order: d.order_index || 0,
    isActive: d.is_active ?? true,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
  }));

  const mappedCreate = async (doctor: Omit<AdminDoctor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await create({
      name: doctor.name,
      role: doctor.role,
      description: doctor.description,
      image_url: doctor.image,
      specialties: doctor.specialties,
      // education: convert string to array (split by comma)
      education: doctor.education 
        ? doctor.education.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      email: doctor.email,
      phone: doctor.phone,
      order_index: doctor.order,
      is_active: doctor.isActive,
    });
    return result;
  };

  const mappedUpdate = async (id: string, doctor: Partial<AdminDoctor>) => {
    console.log('mappedUpdate called with id:', id, 'doctor:', doctor);
    const updates: any = {};
    if (doctor.name !== undefined) updates.name = doctor.name;
    if (doctor.role !== undefined) updates.role = doctor.role;
    if (doctor.description !== undefined) updates.description = doctor.description;
    if (doctor.image !== undefined) updates.image_url = doctor.image;
    if (doctor.specialties !== undefined) updates.specialties = doctor.specialties;
    // education: convert string to array (split by comma)
    if (doctor.education !== undefined) {
      updates.education = doctor.education 
        ? doctor.education.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];
    }
    if (doctor.email !== undefined) updates.email = doctor.email;
    if (doctor.phone !== undefined) updates.phone = doctor.phone;
    if (doctor.order !== undefined) updates.order_index = doctor.order;
    if (doctor.isActive !== undefined) updates.is_active = doctor.isActive;
    
    console.log('Sending updates to Supabase:', updates);
    const result = await update(id, updates);
    console.log('Supabase update result:', result);
    return result;
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}

export function useAdminServices() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('services');
  
  const mappedData: AdminService[] = rawData.map(s => ({
    id: s.id,
    title: s.title,
    slug: s.slug || s.title.toLowerCase().replace(/\s+/g, '-'),
    description: s.description || '',
    shortDescription: s.short_description || s.description || '',
    price: s.price || '',
    duration: s.duration || '',
    features: s.features || [],
    icon: s.icon || 'CirclePlus',
    color: s.color || 'bg-blue-500',
    lightColor: s.light_color || 'bg-blue-50',
    order: s.order_index || 0,
    isActive: s.is_active ?? true,
    createdAt: s.created_at,
    updatedAt: s.updated_at,
  }));

  const mappedCreate = async (service: Omit<AdminService, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await create({
      title: service.title,
      slug: service.slug,
      description: service.description,
      short_description: service.shortDescription,
      price: service.price,
      duration: service.duration,
      features: service.features,
      icon: service.icon,
      color: service.color,
      light_color: service.lightColor,
      order_index: service.order,
      is_active: service.isActive,
    });
  };

  const mappedUpdate = async (id: string, service: Partial<AdminService>) => {
    const updates: any = {};
    if (service.title !== undefined) updates.title = service.title;
    if (service.slug !== undefined) updates.slug = service.slug;
    if (service.description !== undefined) updates.description = service.description;
    if (service.shortDescription !== undefined) updates.short_description = service.shortDescription;
    if (service.price !== undefined) updates.price = service.price;
    if (service.duration !== undefined) updates.duration = service.duration;
    if (service.features !== undefined) updates.features = service.features;
    if (service.icon !== undefined) updates.icon = service.icon;
    if (service.color !== undefined) updates.color = service.color;
    if (service.lightColor !== undefined) updates.light_color = service.lightColor;
    if (service.order !== undefined) updates.order_index = service.order;
    if (service.isActive !== undefined) updates.is_active = service.isActive;
    
    return await update(id, updates);
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}

export function useAdminBeforeAfter() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('before_after');
  
  const mappedData: AdminBeforeAfter[] = rawData.map(b => ({
    id: b.id,
    title: b.title,
    description: b.description || '',
    beforeImage: b.before_image_url,
    afterImage: b.after_image_url,
    duration: b.duration || '',
    testimonial: b.testimonial || '',
    patientName: b.patient_name || '',
    serviceType: b.category || '',
    order: b.order_index || 0,
    isActive: b.is_active ?? true,
    createdAt: b.created_at,
    updatedAt: b.updated_at,
  }));

  const mappedCreate = async (item: Omit<AdminBeforeAfter, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await create({
      title: item.title,
      description: item.description,
      before_image_url: item.beforeImage,
      after_image_url: item.afterImage,
      duration: item.duration,
      testimonial: item.testimonial,
      patient_name: item.patientName,
      category: item.serviceType,
      order_index: item.order,
      is_active: item.isActive,
    });
  };

  const mappedUpdate = async (id: string, item: Partial<AdminBeforeAfter>) => {
    const updates: any = {};
    if (item.title !== undefined) updates.title = item.title;
    if (item.description !== undefined) updates.description = item.description;
    if (item.beforeImage !== undefined) updates.before_image_url = item.beforeImage;
    if (item.afterImage !== undefined) updates.after_image_url = item.afterImage;
    if (item.duration !== undefined) updates.duration = item.duration;
    if (item.testimonial !== undefined) updates.testimonial = item.testimonial;
    if (item.patientName !== undefined) updates.patient_name = item.patientName;
    if (item.serviceType !== undefined) updates.category = item.serviceType;
    if (item.order !== undefined) updates.order_index = item.order;
    if (item.isActive !== undefined) updates.is_active = item.isActive;
    
    return await update(id, updates);
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}

export function useAdminFAQ() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('faq');
  
  const mappedData: AdminFAQ[] = rawData.map(f => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category || 'general',
    order: f.order_index || 0,
    isActive: f.is_active ?? true,
    createdAt: f.created_at,
    updatedAt: f.updated_at,
  }));

  const mappedCreate = async (faq: Omit<AdminFAQ, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await create({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order_index: faq.order,
      is_active: faq.isActive,
    });
  };

  const mappedUpdate = async (id: string, faq: Partial<AdminFAQ>) => {
    const updates: any = {};
    if (faq.question !== undefined) updates.question = faq.question;
    if (faq.answer !== undefined) updates.answer = faq.answer;
    if (faq.category !== undefined) updates.category = faq.category;
    if (faq.order !== undefined) updates.order_index = faq.order;
    if (faq.isActive !== undefined) updates.is_active = faq.isActive;
    
    return await update(id, updates);
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}

export function useAdminGallery() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('gallery');
  
  const mappedData: AdminGalleryImage[] = rawData.map(g => ({
    id: g.id,
    title: g.title,
    description: g.description || '',
    url: g.image_url,
    thumbnail: g.thumbnail_url || g.image_url,
    category: g.category || 'general',
    order: g.order_index || 0,
    isActive: g.is_active ?? true,
    createdAt: g.created_at,
    updatedAt: g.updated_at,
  }));

  const mappedCreate = async (image: Omit<AdminGalleryImage, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await create({
      title: image.title,
      description: image.description,
      image_url: image.url,
      thumbnail_url: image.thumbnail,
      category: image.category,
      order_index: image.order,
      is_active: image.isActive,
    });
  };

  const mappedUpdate = async (id: string, image: Partial<AdminGalleryImage>) => {
    const updates: any = {};
    if (image.title !== undefined) updates.title = image.title;
    if (image.description !== undefined) updates.description = image.description;
    if (image.url !== undefined) updates.image_url = image.url;
    if (image.thumbnail !== undefined) updates.thumbnail_url = image.thumbnail;
    if (image.category !== undefined) updates.category = image.category;
    if (image.order !== undefined) updates.order_index = image.order;
    if (image.isActive !== undefined) updates.is_active = image.isActive;
    
    return await update(id, updates);
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}

export function useAdminReviews() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('reviews');
  
  const mappedData: AdminReview[] = rawData.map(r => ({
    id: r.id,
    authorName: r.author_name,
    authorEmail: r.author_email,
    avatar: r.avatar_url || '',
    rating: r.rating || 5,
    text: r.content,
    date: r.date_text || new Date(r.created_at).toLocaleDateString('ro-RO'),
    service: r.service,
    isPublished: r.is_published ?? true,
    isFeatured: r.is_featured ?? false,
    order: r.order_index || 0,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  }));

  const mappedCreate = async (review: Omit<AdminReview, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await create({
      author_name: review.authorName,
      author_email: review.authorEmail,
      avatar_url: review.avatar,
      rating: review.rating,
      content: review.text,
      date_text: review.date,
      service: review.service,
      is_published: review.isPublished,
      is_featured: review.isFeatured,
      order_index: review.order,
    });
  };

  const mappedUpdate = async (id: string, review: Partial<AdminReview>) => {
    const updates: any = {};
    if (review.authorName !== undefined) updates.author_name = review.authorName;
    if (review.authorEmail !== undefined) updates.author_email = review.authorEmail;
    if (review.avatar !== undefined) updates.avatar_url = review.avatar;
    if (review.rating !== undefined) updates.rating = review.rating;
    if (review.text !== undefined) updates.content = review.text;
    if (review.date !== undefined) updates.date_text = review.date;
    if (review.service !== undefined) updates.service = review.service;
    if (review.isPublished !== undefined) updates.is_published = review.isPublished;
    if (review.isFeatured !== undefined) updates.is_featured = review.isFeatured;
    if (review.order !== undefined) updates.order_index = review.order;
    
    return await update(id, updates);
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}

export function useAdminBlog() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('blog_posts');
  
  const mappedData: AdminBlogPost[] = rawData.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || '',
    content: p.content,
    featuredImage: p.image_url || '',
    category: p.category || 'General',
    tags: p.tags || [],
    author: p.author || 'Doctor Suciu',
    readTime: p.read_time || '5 min',
    isPublished: p.is_published ?? false,
    isFeatured: p.is_featured ?? false,
    viewCount: p.view_count || 0,
    publishedAt: p.published_at,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }));

  const mappedCreate = async (post: Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await create({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: post.featuredImage,
      category: post.category,
      tags: post.tags,
      author: post.author,
      read_time: post.readTime,
      is_published: post.isPublished,
      is_featured: post.isFeatured,
      view_count: post.viewCount,
      published_at: post.publishedAt,
    });
  };

  const mappedUpdate = async (id: string, post: Partial<AdminBlogPost>) => {
    const updates: any = {};
    if (post.title !== undefined) updates.title = post.title;
    if (post.slug !== undefined) updates.slug = post.slug;
    if (post.excerpt !== undefined) updates.excerpt = post.excerpt;
    if (post.content !== undefined) updates.content = post.content;
    if (post.featuredImage !== undefined) updates.image_url = post.featuredImage;
    if (post.category !== undefined) updates.category = post.category;
    if (post.tags !== undefined) updates.tags = post.tags;
    if (post.author !== undefined) updates.author = post.author;
    if (post.readTime !== undefined) updates.read_time = post.readTime;
    if (post.isPublished !== undefined) updates.is_published = post.isPublished;
    if (post.isFeatured !== undefined) updates.is_featured = post.isFeatured;
    if (post.viewCount !== undefined) updates.view_count = post.viewCount;
    if (post.publishedAt !== undefined) updates.published_at = post.publishedAt;
    
    return await update(id, updates);
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}

export function useAdminAppointments() {
  const { data: rawData, loading, error, create, update, remove, refetch } = useAdminTable<any>('appointments');
  
  const mappedData: AdminAppointment[] = rawData.map(a => ({
    id: a.id,
    name: a.patient_name,
    email: a.patient_email,
    phone: a.patient_phone,
    service: a.service_id || '',
    message: a.message,
    preferredDate: a.preferred_date,
    preferredTime: a.preferred_time,
    status: a.status || 'pending',
    notes: a.notes,
    createdAt: a.created_at,
    updatedAt: a.updated_at,
  }));

  const mappedCreate = async (apt: Omit<AdminAppointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await create({
      patient_name: apt.name,
      patient_email: apt.email,
      patient_phone: apt.phone,
      service_id: apt.service,
      message: apt.message,
      preferred_date: apt.preferredDate,
      preferred_time: apt.preferredTime,
      status: apt.status,
      notes: apt.notes,
    });
  };

  const mappedUpdate = async (id: string, apt: Partial<AdminAppointment>) => {
    const updates: any = {};
    if (apt.name !== undefined) updates.patient_name = apt.name;
    if (apt.email !== undefined) updates.patient_email = apt.email;
    if (apt.phone !== undefined) updates.patient_phone = apt.phone;
    if (apt.service !== undefined) updates.service_id = apt.service;
    if (apt.message !== undefined) updates.message = apt.message;
    if (apt.preferredDate !== undefined) updates.preferred_date = apt.preferredDate;
    if (apt.preferredTime !== undefined) updates.preferred_time = apt.preferredTime;
    if (apt.status !== undefined) updates.status = apt.status;
    if (apt.notes !== undefined) updates.notes = apt.notes;
    
    return await update(id, updates);
  };

  return { data: mappedData, loading, error, create: mappedCreate, update: mappedUpdate, remove, refetch };
}
