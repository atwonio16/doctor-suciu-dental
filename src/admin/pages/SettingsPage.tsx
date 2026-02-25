import { useState } from 'react';
import { Save, Lock, Globe, Clock, MapPin, Loader2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CMSSettings } from '../types';

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
};

const SettingsPage = () => {
  const [settings, setSettings] = useLocalStorage<CMSSettings>('cms_settings', defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'hours' | 'seo'>('general');

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
  };

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    setSettings(prev => {
      const newSettings = { ...prev };
      let current: any = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact', icon: MapPin },
    { id: 'hours', label: 'Program', icon: Clock },
    { id: 'seo', label: 'SEO', icon: Lock },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Setări</h1>
          <p className="text-gray-500">Configurează setările site-ului</p>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg disabled:opacity-50">
          {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Se salvează...</> : <><Save className="w-4 h-4" /> Salvează</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#1e3a5f] text-[#1e3a5f]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Numele Site-ului</label>
              <input type="text" value={settings.siteName} onChange={(e) => updateSetting('siteName', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descriere Site</label>
              <textarea rows={3} value={settings.siteDescription} onChange={(e) => updateSetting('siteDescription', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none" />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Contact</label>
                <input type="email" value={settings.contactEmail} onChange={(e) => updateSetting('contactEmail', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input type="text" value={settings.contactPhone} onChange={(e) => updateSetting('contactPhone', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresă</label>
              <textarea rows={2} value={settings.address} onChange={(e) => updateSetting('address', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input type="text" value={settings.socialLinks.facebook} onChange={(e) => updateSetting('socialLinks.facebook', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input type="text" value={settings.socialLinks.instagram} onChange={(e) => updateSetting('socialLinks.instagram', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                <input type="text" value={settings.socialLinks.whatsapp} onChange={(e) => updateSetting('socialLinks.whatsapp', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="407xxxxxxxx" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hours' && (
          <div className="space-y-4">
            {Object.entries(settings.workingHours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-medium capitalize">{day === 'monday' ? 'Luni' : day === 'tuesday' ? 'Marți' : day === 'wednesday' ? 'Miercuri' : day === 'thursday' ? 'Joi' : day === 'friday' ? 'Vineri' : day === 'saturday' ? 'Sâmbătă' : 'Duminică'}</span>
                </div>
                <input type="text" value={hours} onChange={(e) => updateSetting(`workingHours.${day}`, e.target.value)} className="px-4 py-2 border border-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input type="text" value={settings.seo.title} onChange={(e) => updateSetting('seo.title', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea rows={3} value={settings.seo.description} onChange={(e) => updateSetting('seo.description', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
              <input type="text" value={settings.seo.keywords} onChange={(e) => updateSetting('seo.keywords', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
              <p className="text-xs text-gray-500 mt-1">Separate prin virgulă</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
