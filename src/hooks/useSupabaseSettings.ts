import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { CMSSettings } from '../admin/types';

const defaultSettings: CMSSettings = {
  siteName: 'Doctor Suciu Dental Clinic',
  siteDescription: 'Clinică stomatologică modernă în Târgoviște',
  contactEmail: 'contact@doctorsuciu.ro',
  contactPhone: '0770 220 110',
  address: 'Calea Domnească 234, Târgoviște',
  workingHours: {
    monday: '09:00 - 18:00',
    tuesday: '09:00 - 18:00',
    wednesday: '09:00 - 18:00',
    thursday: '09:00 - 18:00',
    friday: '09:00 - 15:00',
    saturday: 'Închis',
    sunday: 'Închis',
  },
  socialLinks: {
    facebook: '',
    instagram: '',
    whatsapp: '40770220110',
  },
  seo: {
    title: 'Doctor Suciu Dental Clinic - Stomatologie Târgoviște',
    description: 'Clinică stomatologică modernă în Târgoviște. Implant dentar, ortodonție, estetică dentară.',
    keywords: 'stomatolog târgoviște, implant dentar, dentist, clinică dentară',
  },
  googleReviews: {
    rating: 5.0,
    reviewCount: 53,
    url: 'https://www.google.com/search?q=DOCTOR+SUCIU+Dental+Clinic+Reviews',
  },
};

// Convert CMSSettings to key-value pairs for Supabase
const settingsToKeyValue = (settings: CMSSettings): Array<{ key: string; value: any }> => {
  return [
    { key: 'site_name', value: settings.siteName },
    { key: 'site_description', value: settings.siteDescription },
    { key: 'contact_email', value: settings.contactEmail },
    { key: 'contact_phone', value: settings.contactPhone },
    { key: 'address', value: settings.address },
    { key: 'working_hours', value: settings.workingHours },
    { key: 'social_links', value: settings.socialLinks },
    { key: 'seo', value: settings.seo },
    { key: 'google_reviews', value: settings.googleReviews },
  ];
};

// Convert key-value pairs from Supabase to CMSSettings
const keyValueToSettings = (data: Array<{ key: string; value: any }>): CMSSettings => {
  const settings = { ...defaultSettings };
  
  for (const row of data) {
    switch (row.key) {
      case 'site_name':
        settings.siteName = row.value || defaultSettings.siteName;
        break;
      case 'site_description':
        settings.siteDescription = row.value || defaultSettings.siteDescription;
        break;
      case 'contact_email':
        settings.contactEmail = row.value || defaultSettings.contactEmail;
        break;
      case 'contact_phone':
        settings.contactPhone = row.value || defaultSettings.contactPhone;
        break;
      case 'address':
        settings.address = row.value || defaultSettings.address;
        break;
      case 'working_hours':
        settings.workingHours = row.value || defaultSettings.workingHours;
        break;
      case 'social_links':
        settings.socialLinks = row.value || defaultSettings.socialLinks;
        break;
      case 'seo':
        settings.seo = row.value || defaultSettings.seo;
        break;
      case 'google_reviews':
        settings.googleReviews = row.value || defaultSettings.googleReviews;
        break;
    }
  }
  
  return settings;
};

// Hook for PUBLIC site to read settings from Supabase
export function useSupabaseSettings() {
  const [settings, setSettings] = useState<CMSSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase not configured');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: err } = await supabase
        .from('site_settings')
        .select('key, value');

      if (err) {
        console.error('Error fetching settings:', err);
        setError(err.message);
      } else if (data && data.length > 0) {
        setSettings(keyValueToSettings(data));
      }
    } catch (e) {
      console.error('Error fetching settings:', e);
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    // Subscribe to realtime changes
    if (isSupabaseConfigured) {
      const channel = supabase
        .channel('site_settings_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'site_settings',
          },
          () => {
            // Refetch all settings when any key changes
            fetchSettings();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [fetchSettings]);

  return { settings, loading, error, refetch: fetchSettings };
}

// Hook for ADMIN to read and save settings
export function useAdminSettings() {
  const [settings, setSettings] = useState<CMSSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase not configured');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from('site_settings')
        .select('key, value');

      if (err) {
        throw err;
      } else if (data && data.length > 0) {
        setSettings(keyValueToSettings(data));
      }
    } catch (e) {
      console.error('Error fetching settings:', e);
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const saveSettings = useCallback(async (newSettings: CMSSettings) => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured');
    }

    setSaving(true);
    setError(null);

    try {
      const keyValues = settingsToKeyValue(newSettings);
      
      // Upsert all settings
      const { error: err } = await supabase
        .from('site_settings')
        .upsert(
          keyValues.map(kv => ({
            key: kv.key,
            value: kv.value,
            updated_at: new Date().toISOString(),
          }))
        );

      if (err) {
        throw err;
      }

      setSettings(newSettings);
      return true;
    } catch (e) {
      console.error('Error saving settings:', e);
      setError(e instanceof Error ? e.message : 'Unknown error');
      throw e;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    settings,
    loading,
    saving,
    error,
    saveSettings,
    refetch: fetchSettings,
  };
}
