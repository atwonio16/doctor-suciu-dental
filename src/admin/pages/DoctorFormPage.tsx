import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Save, ArrowLeft, Plus, X, ImageIcon } from 'lucide-react';
import { doctorsApi } from '../../lib/cms';
import type { Doctor } from '../../lib/supabase';
import ImageCropSelector from '../components/ImageCropSelector';

const DoctorFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [previewCrop, setPreviewCrop] = useState('center 35%');
  
  const [formData, setFormData] = useState<Partial<Doctor>>({
    name: '',
    role: '',
    description: '',
    image_url: '',
    image_crop: 'center 35%',
    specialties: [],
    education: [],
    email: '',
    phone: '',
    order_index: 0,
    is_active: true,
  });

  const [newSpecialty, setNewSpecialty] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      loadDoctor(id);
    }
  }, [id, isEditing]);

  const loadDoctor = async (doctorId: string) => {
    try {
      const doctor = await doctorsApi.getById(doctorId);
      if (doctor) {
        setFormData(doctor);
        setPreviewCrop(doctor.image_crop || 'center 35%');
      }
    } catch (error) {
      console.error('Error loading doctor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    console.log('Saving doctor data:', formData);

    try {
      let result;
      if (isEditing && id) {
        console.log('Updating doctor with id:', id);
        // Remove fields that shouldn't be sent to Supabase
        const { id: _, created_at, updated_at, image_crop, ...updateData } = formData as any;
        
        // Try to save image_crop separately, but don't fail if column doesn't exist
        const dataToSend = { ...updateData };
        
        // Only add image_crop if it exists in the database
        // We'll try to save it, and if it fails, we catch the error
        console.log('Update data:', dataToSend);
        result = await doctorsApi.update(id, dataToSend);
        
        // Try to save image_crop separately (best effort)
        try {
          await doctorsApi.update(id, { image_crop: formData.image_crop || 'center 35%' } as any);
        } catch (cropError) {
          console.log('Could not save image_crop (column may not exist):', cropError);
        }
        
        console.log('Update result:', result);
      } else {
        console.log('Creating new doctor');
        const { image_crop, ...createData } = formData as any;
        result = await doctorsApi.create(createData as Omit<Doctor, 'id' | 'created_at' | 'updated_at'>);
        console.log('Create result:', result);
      }
      
      if (result) {
        alert('Salvat cu succes! Imaginea se va actualiza pe site în câteva secunde.');
        navigate('/admin/doctors');
      } else {
        alert('Eroare la salvare în Supabase. Verifică consola.');
      }
    } catch (error) {
      console.error('Error saving doctor:', error);
      alert('Eroare la salvare: ' + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setFormData(prev => ({
        ...prev,
        specialties: [...(prev.specialties || []), newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties?.filter((_, i) => i !== index) || []
    }));
  };

  const handleCropChange = (value: string) => {
    setFormData(prev => ({ ...prev, image_crop: value }));
    setPreviewCrop(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/doctors')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Editează membru' : 'Adaugă membru nou'}
          </h1>
          <p className="text-gray-500">
            {isEditing ? 'Actualizează informațiile membrului echipei' : 'Completează detaliile pentru noul membru'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Poza de profil</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Imagine
              </label>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="/team/doctor-name.jpg"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Calea către imagine (ex: /team/dr-suciu.jpg)
              </p>
            </div>

            {/* Crop Position - Visual Selector */}
            {formData.image_url && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Ajustează poziția imaginii
                </label>
                <ImageCropSelector
                  imageUrl={formData.image_url}
                  initialPosition={formData.image_crop || 'center 50%'}
                  onChange={handleCropChange}
                />
              </div>
            )}
          </div>


        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informații de bază</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nume complet *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Dr. Sebastian Suciu"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funcție / Rol *
              </label>
              <input
                type="text"
                required
                value={formData.role || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                placeholder="Medic Stomatolog"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descriere
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descriere scurtă despre experiența și abilitățile..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        {/* Specialties */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Specializări / Tag-uri</h2>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
              placeholder="Adaugă o specializare..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
            />
            <button
              type="button"
              onClick={handleAddSpecialty}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adaugă
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.specialties?.map((specialty, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0d9488]/10 text-[#0d9488] rounded-lg text-sm"
              >
                {specialty}
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialty(index)}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact (opțional)</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="doctor@clinic.ro"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="0770 220 110"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Setări</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordine afișare
              </label>
              <input
                type="number"
                min={0}
                value={formData.order_index || 0}
                onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                className="w-5 h-5 text-[#1e3a5f] border-gray-300 rounded focus:ring-[#1e3a5f]"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Activ / Vizibil pe site
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/doctors')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Anulează
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Se salvează...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Salvează modificările' : 'Adaugă membru'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorFormPage;
