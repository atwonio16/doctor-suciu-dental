import { useState, useEffect } from 'react';
import { Save, Lock, Globe, Clock, MapPin, Loader2, Star, RefreshCw } from 'lucide-react';
import { useAdminSettings } from '../../hooks/useSupabaseSettings';
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
  googleReviews: {
    rating: 5.0,
    reviewCount: 53,
    url: 'https://www.google.com/search?q=DOCTOR+SUCIU+Dental+Clinic+Reviews',
  },
};

const SettingsPage = () => {
  const { settings: dbSettings, loading, saving, error, saveSettings, refetch } = useAdminSettings();
  const [localSettings, setLocalSettings] = useState<CMSSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'hours' | 'seo' | 'reviews'>('general');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Sync local state with database
  useEffect(() => {
    if (dbSettings) {
      setLocalSettings(dbSettings);
    }
  }, [dbSettings]);

  const handleSave = async () => {
    setSaveMessage(null);
    try {
      await saveSettings(localSettings);
      setSaveMessage('Setările au fost salvate cu succes!');
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      setSaveMessage('Eroare la salvare. Încearcă din nou.');
    }
  };

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    setLocalSettings(prev => {
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
    { id: 'reviews', label: 'Google Reviews', icon: Star },
    { id: 'seo', label: 'SEO', icon: Lock },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Setări</h1>
          <p className="text-gray-500">Configurează setările site-ului</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={refetch} 
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Reîmprospătează</span>
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg disabled:opacity-50 hover:bg-[#152a45] transition-colors"
          >
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Se salvează...</> : <><Save className="w-4 h-4" /> Salvează</>}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {saveMessage && (
        <div className={`rounded-lg p-4 ${saveMessage.includes('succes') ? 'bg-green-50 border border-green-200 text-green-600' : 'bg-red-50 border border-red-200 text-red-600'}`}>
          <p className="text-sm">{saveMessage}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
              <input 
                type="text" 
                value={localSettings.siteName} 
                onChange={(e) => updateSetting('siteName', e.target.value)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descriere Site</label>
              <textarea 
                rows={3} 
                value={localSettings.siteDescription} 
                onChange={(e) => updateSetting('siteDescription', e.target.value)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
              />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Contact</label>
                <input 
                  type="email" 
                  value={localSettings.contactEmail} 
                  onChange={(e) => updateSetting('contactEmail', e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input 
                  type="text" 
                  value={localSettings.contactPhone} 
                  onChange={(e) => updateSetting('contactPhone', e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresă</label>
              <textarea 
                rows={2} 
                value={localSettings.address} 
                onChange={(e) => updateSetting('address', e.target.value)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input 
                  type="text" 
                  value={localSettings.socialLinks.facebook} 
                  onChange={(e) => updateSetting('socialLinks.facebook', e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                  placeholder="https://facebook.com/..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input 
                  type="text" 
                  value={localSettings.socialLinks.instagram} 
                  onChange={(e) => updateSetting('socialLinks.instagram', e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                  placeholder="https://instagram.com/..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                <input 
                  type="text" 
                  value={localSettings.socialLinks.whatsapp} 
                  onChange={(e) => updateSetting('socialLinks.whatsapp', e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                  placeholder="407xxxxxxxx" 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hours' && (
          <div className="space-y-4">
            {Object.entries(localSettings.workingHours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-medium capitalize">{day === 'monday' ? 'Luni' : day === 'tuesday' ? 'Marți' : day === 'wednesday' ? 'Miercuri' : day === 'thursday' ? 'Joi' : day === 'friday' ? 'Vineri' : day === 'saturday' ? 'Sâmbătă' : 'Duminică'}</span>
                </div>
                <input 
                  type="text" 
                  value={hours} 
                  onChange={(e) => updateSetting(`workingHours.${day}`, e.target.value)} 
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-amber-800">
                <strong>Notă:</strong> Aceste valori sunt afișate pe site în secțiunea de recenzii. 
                Poți modifica rating-ul și numărul de recenzii fără să fie nevoie de API-ul Google.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating Google (0-5)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="5" 
                  step="0.1"
                  value={localSettings.googleReviews?.rating || 5.0} 
                  onChange={(e) => updateSetting('googleReviews.rating', parseFloat(e.target.value))} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                />
                <p className="text-xs text-gray-500 mt-1">Ex: 4.8, 5.0</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Număr Recenzii</label>
                <input 
                  type="number" 
                  min="0" 
                  value={localSettings.googleReviews?.reviewCount || 0} 
                  onChange={(e) => updateSetting('googleReviews.reviewCount', parseInt(e.target.value))} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                />
                <p className="text-xs text-gray-500 mt-1">Ex: 53, 128</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Google Reviews</label>
              <input 
                type="url" 
                value={localSettings.googleReviews?.url || ''} 
                onChange={(e) => updateSetting('googleReviews.url', e.target.value)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
                placeholder="https://www.google.com/search?q=..." 
              />
              <p className="text-xs text-gray-500 mt-1">Link-ul către pagina de recenzii Google</p>
            </div>

            {/* Preview */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-3">Previzualizare:</label>
              <div className="flex items-center gap-2">
                {/* Google G icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="font-medium">{(localSettings.googleReviews?.rating || 5.0).toFixed(1)}</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-400">·</span>
                <span>{localSettings.googleReviews?.reviewCount || 0} recenzii Google</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input 
                type="text" 
                value={localSettings.seo.title} 
                onChange={(e) => updateSetting('seo.title', e.target.value)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea 
                rows={3} 
                value={localSettings.seo.description} 
                onChange={(e) => updateSetting('seo.description', e.target.value)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
              <input 
                type="text" 
                value={localSettings.seo.keywords} 
                onChange={(e) => updateSetting('seo.keywords', e.target.value)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none" 
              />
              <p className="text-xs text-gray-500 mt-1">Separate prin virgulă</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
