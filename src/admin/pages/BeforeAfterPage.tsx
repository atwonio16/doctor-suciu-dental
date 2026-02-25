import { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Upload, X, Pencil, Loader2 } from 'lucide-react';
import { useAdminBeforeAfter } from '../hooks/useSupabaseAdmin';
import ImageCropper from '../components/ImageCropper';
import type { BeforeAfter } from '../../lib/supabase';

export default function BeforeAfterPage() {
  const { data: cases, loading, error, create, update, remove } = useAdminBeforeAfter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputBefore = useRef<HTMLInputElement>(null);
  const fileInputAfter = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    before_image_url: '',
    after_image_url: '',
  });

  // State pentru cropper
  const [cropper, setCropper] = useState<{
    isOpen: boolean;
    imageSrc: string;
    type: 'before' | 'after' | null;
  }>({
    isOpen: false,
    imageSrc: '',
    type: null,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      before_image_url: '',
      after_image_url: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Titlul este obligatoriu');
      return;
    }

    setSaving(true);
    
    try {
      if (editingId) {
        const existingCase = cases.find(c => c.id === editingId);
        if (existingCase) {
          update(editingId, { 
            title: formData.title,
            before_image_url: formData.before_image_url,
            after_image_url: formData.after_image_url,
            order_index: existingCase.order_index ?? cases.length 
          });
        }
        alert('Caz actualizat!');
      } else {
        create({ 
          title: formData.title,
          before_image_url: formData.before_image_url,
          after_image_url: formData.after_image_url,
          category: 'general',
          order_index: cases.length + 1,
          is_active: true,
        });
        alert('Caz adăugat!');
      }
      resetForm();
    } catch (err) {
      console.error('Error:', err);
      alert('Eroare: ' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: BeforeAfter) => {
    setFormData({
      title: item.title || '',
      before_image_url: item.before_image_url || '',
      after_image_url: item.after_image_url || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sigur vrei să ștergi acest caz?')) {
      remove(id);
    }
  };

  const handleImageUpload = (type: 'before' | 'after', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCropper({
        isOpen: true,
        imageSrc: result,
        type: type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    if (cropper.type === 'before') {
      setFormData(prev => ({ ...prev, before_image_url: croppedImage }));
    } else if (cropper.type === 'after') {
      setFormData(prev => ({ ...prev, after_image_url: croppedImage }));
    }
    setCropper({ isOpen: false, imageSrc: '', type: null });
  };

  const handleCropCancel = () => {
    setCropper({ isOpen: false, imageSrc: '', type: null });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Eroare la încărcarea cazurilor: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Before & After</h1>
          <p className="text-gray-500">{cases?.length || 0} cazuri</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Vezi pe site
          </button>
          <button
            onClick={() => {
              if (showForm) resetForm();
              else setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Anulează' : 'Adaugă caz'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 mb-6 space-y-4">
          <h3 className="font-semibold text-lg">{editingId ? 'Editează' : 'Caz nou'}</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Titlu *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Ex: Albire Profesională"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Poza Înainte</label>
              <div
                onClick={() => fileInputBefore.current?.click()}
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 h-32 flex items-center justify-center"
              >
                {formData.before_image_url ? (
                  <img src={formData.before_image_url} alt="Before" className="h-full object-contain" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
                <input
                  ref={fileInputBefore}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('before', e.target.files[0])}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Poza După</label>
              <div
                onClick={() => fileInputAfter.current?.click()}
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 h-32 flex items-center justify-center"
              >
                {formData.after_image_url ? (
                  <img src={formData.after_image_url} alt="After" className="h-full object-contain" />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
                <input
                  ref={fileInputAfter}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload('after', e.target.files[0])}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              type="submit" 
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {saving ? 'Se salvează...' : (editingId ? 'Salvează' : 'Adaugă')}
            </button>
            <button 
              type="button" 
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Anulează
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {Array.isArray(cases) && cases.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow h-[280px] flex flex-col"
          >
            {/* Pozele - click pentru edit */}
            <div 
              onClick={() => handleEdit(item)}
              className="grid grid-cols-2 h-36 relative cursor-pointer group shrink-0"
            >
              {/* Overlay edit pe hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <Pencil className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="relative bg-gray-100">
                {item.before_image_url ? (
                  <img src={item.before_image_url} alt="Before" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Fără imagine</div>
                )}
                <span className="absolute top-1 left-1 bg-gray-800 text-white text-xs px-1.5 py-0.5 rounded z-20">ÎNAINTE</span>
              </div>
              <div className="relative bg-gray-100">
                {item.after_image_url ? (
                  <img src={item.after_image_url} alt="After" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Fără imagine</div>
                )}
                <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded z-20">DUPĂ</span>
              </div>
            </div>
            
            {/* Info și butoane */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <h3 
                onClick={() => handleEdit(item)}
                className="font-semibold text-sm truncate cursor-pointer hover:text-blue-600 leading-tight"
              >
                {item.title?.trim() || 'Fără titlu'}
              </h3>
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => handleEdit(item)} 
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Editează
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Șterge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!cases || cases.length === 0) && (
        <div className="text-center py-12 text-gray-500">
          Nu există cazuri. Adaugă primul caz.
        </div>
      )}

      {/* Image Cropper Modal */}
      {cropper.isOpen && (
        <ImageCropper
          imageSrc={cropper.imageSrc}
          onCrop={handleCropComplete}
          onCancel={handleCropCancel}
          aspectRatio={4/3}
        />
      )}
    </div>
  );
}
