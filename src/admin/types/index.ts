// Admin User Types
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: string;
  lastLogin: string;
}

// Service Types - Categoriile sunt doar stringuri, nu tabele separate
export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: string;
  duration: string;
  features: string[];
  icon: string;
  category: string;      // ex: "Implanturi Dentare"
  categorySlug: string;  // ex: "implanturi"
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Categorii predefinite pentru dropdown
export const PREDEFINED_CATEGORIES = [
  { name: 'Implanturi Dentare', slug: 'implanturi' },
  { name: 'Ortodonție', slug: 'ortodontie' },
  { name: 'Albire Dentară', slug: 'albire' },
  { name: 'Estetică Dentară', slug: 'estetica' },
  { name: 'Protetică Dentară', slug: 'protetica' },
  { name: 'Urgențe Stomatologice', slug: 'urgente' },
  { name: 'Stomatologie Copii', slug: 'copii' },
  { name: 'Servicii Generale', slug: 'general' },
  { name: 'Radiologie', slug: 'radiologie' },
] as const;

// Doctor Types
export interface Doctor {
  id: string;
  name: string;
  role: string;
  image: string;
  specialties: string[];
  experience: string;
  education: string;
  description: string;
  email?: string;
  phone?: string;
  tags: string[]; // Pentru tag-uri precum "Expertiză", "Experiență", etc.
  imageCrop?: string; // Poziția crop-ului imaginii (ex: "center 30%")
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Before/After Cases
export interface BeforeAfterCase {
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

// FAQ Item
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Gallery Image Types
export interface GalleryImage {
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

// Hero Section
export interface HeroSection {
  id: string;
  headline: string;
  subheadline: string;
  description: string;
  ctaText: string;
  ctaPhone: string;
  backgroundImage: string;
  stats: {
    label: string;
    value: string;
  }[];
}

// Review Types
export interface Review {
  id: string;
  authorName: string;
  authorEmail?: string;
  avatar: string; // URL to avatar image
  rating: number; // 1-5 stars
  text: string;
  date: string; // Display date (e.g., "acum 2 săptămâni")
  service?: string;
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Blog Article Types
export interface Article {
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

// Appointment Types
export interface Appointment {
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

// Activity Log
export interface ActivityLog {
  id: string;
  userId: string;
  username: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout';
  entityType: string;
  entityId?: string;
  details: string;
  timestamp: string;
}

// CMS Settings
export interface CMSSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}
