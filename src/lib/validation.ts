// Input validation utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Email validation - strict RFC 5322 compliant
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Emailul este obligatoriu' };
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Adresa de email nu este validă' };
  }
  
  if (email.length > 254) {
    return { isValid: false, error: 'Emailul este prea lung' };
  }
  
  return { isValid: true };
}

// Phone validation - Romanian and international formats
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Numărul de telefon este obligatoriu' };
  }
  
  // Remove spaces, dashes, and parentheses for validation
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
  
  // Romanian mobile: 07xxxxxxxx or +407xxxxxxxx
  // Romanian landline: 02xxxxxxxx, 03xxxxxxxx
  // International: + followed by 7-15 digits
  const phoneRegex = /^(\+?40|0)[0-9]{8,9}$|^\+[1-9][0-9]{6,14}$/;
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Numărul de telefon nu este valid' };
  }
  
  return { isValid: true };
}

// Name validation
export function validateName(name: string): ValidationResult {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Numele este obligatoriu' };
  }
  
  // Min 2 chars, max 100 chars
  // Allow letters, spaces, hyphens, apostrophes (for names like O'Connor, Ana-Maria)
  if (name.length < 2) {
    return { isValid: false, error: 'Numele trebuie să aibă cel puțin 2 caractere' };
  }
  
  if (name.length > 100) {
    return { isValid: false, error: 'Numele este prea lung (maxim 100 caractere)' };
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[\p{L}\s\-'']+$/u;
  if (!nameRegex.test(name)) {
    return { isValid: false, error: 'Numele conține caractere nepermise' };
  }
  
  // Check for at least 2 words (first and last name)
  const words = name.trim().split(/\s+/).filter(w => w.length > 0);
  if (words.length < 2) {
    return { isValid: false, error: 'Te rugăm să introduci numele complet' };
  }
  
  return { isValid: true };
}

// Message validation
export function validateMessage(message: string, required: boolean = false): ValidationResult {
  if (required && (!message || message.trim() === '')) {
    return { isValid: false, error: 'Mesajul este obligatoriu' };
  }
  
  if (message && message.length > 2000) {
    return { isValid: false, error: 'Mesajul este prea lung (maxim 2000 caractere)' };
  }
  
  // Check for potential XSS patterns
  const xssPattern = /<script|javascript:|on\w+\s*=|<iframe|<object|<embed/i;
  if (xssPattern.test(message)) {
    return { isValid: false, error: 'Mesajul conține caractere nepermise' };
  }
  
  return { isValid: true };
}

// Sanitize HTML - remove all HTML tags
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Validate all contact form fields
export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
}

export function validateContactForm(data: ContactFormData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error!;
  }
  
  const phoneValidation = validatePhone(data.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.error!;
  }
  
  if (data.email) {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }
  }
  
  if (data.message) {
    const messageValidation = validateMessage(data.message);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.error!;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Rate limiting helper
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;
  
  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }
  
  canProceed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    return recentAttempts.length < this.maxAttempts;
  }
  
  recordAttempt(key: string): void {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    attempts.push(now);
    this.attempts.set(key, attempts);
  }
  
  getRemainingTime(key: string): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const remaining = this.windowMs - (Date.now() - oldestAttempt);
    return Math.max(0, remaining);
  }
}

// Create singleton rate limiter for contact form
export const contactFormRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute
