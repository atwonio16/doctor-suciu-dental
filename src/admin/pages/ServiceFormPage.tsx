import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useAdminServices } from '../hooks/useSupabaseAdmin';
import { PREDEFINED_CATEGORIES } from '../types';

const ServiceFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: services, create, update, loading: servicesLoading } = useAdminServices();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    long_description: '',
    price: '',
    duration: '',
    features: [''] as string[],
    category: PREDEFINED_CATEGORIES[0].name,
    categorySlug: PREDEFINED_CATEGORIES[0].slug,
    icon: 'Stethoscope',
    order_index: 0,
    is_active: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const service = services.find(s => s.id === id);
      if (service) {
        setFormData({
          title: service.title || '',
          description: service.description || '',
          long_description: service.long_description || '',
          price: service.price || '',
          duration: service.duration || '',
          features: service.features?.length > 0 ? service.features : [''],
          category: service.category || PREDEFINED_CATEGORIES[0].name,
          categorySlug: service.category_slug || PREDEFINED_CATEGORIES[0].slug,
          icon: service.icon || 'Stethoscope',
          order_index: service.order_index || 0,
          is_active: service.is_active ?? true,
        });
      }
    }
  }, [isEditing, id, services]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mapare corectă către tipul Supabase Service
    const serviceData = {
      title: formData.title,
      description: formData.description,
      long_description: formData.long_description,
      price: formData.price,
      duration: formData.duration,
      features: formData.features.filter(f => f.trim() !== ''),
      icon: formData.icon,
      category: formData.category,
      category_slug: formData.categorySlug,
      order_index: formData.order_index,
      is_active: formData.is_active,
    };

    console.log('Saving service:', serviceData);

    let result;
    if (isEditing && id) {
      result = await update(id, serviceData);
    } else {
      result = await create(serviceData);
    }

    console.log('Save result:', result);

    setIsLoading(false);
    
    if (result) {
      navigate('/admin/servicii');
    } else {
      alert('Eroare la salvare: ' + (result === null ? 'Nu s-a putut salva în baza de date' : JSON.stringify(result)));
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (slug: string) => {
    const category = PREDEFINED_CATEGORIES.find(c => c.slug === slug);
    if (category) {
      setFormData(prev => ({
        ...prev,
        categorySlug: category.slug,
        category: category.name,
      }));
    }
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f),
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  if (servicesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/servicii')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Editează Serviciu' : 'Serviciu Nou'}
          </h1>
          <p className="text-gray-500">
            {isEditing ? 'Actualizează informațiile serviciului' : 'Completează detaliile noului serviciu'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Categorie *</label>
            <select
              required
              value={formData.categorySlug}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
            >
              {PREDEFINED_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Titlu *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              placeholder="Ex: Implant Dentar"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preț</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              placeholder="de la 2.800 RON"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durată</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              placeholder="3-6 luni"
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Descriere Scurtă *</label>
            <input
              type="text"
              required
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
              placeholder="Scurtă descriere pentru listări"
            />
          </div>

          {/* Full Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Descriere Completă</label>
            <textarea
              rows={4}
              value={formData.long_description}
              onChange={(e) => handleChange('long_description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none resize-none"
              placeholder="Descriere detaliată a serviciului..."
            />
          </div>

          {/* Features */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Beneficii / Caracteristici</label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
                    placeholder={`Caracteristică ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Șterge
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-2 text-sm text-[#1e3a5f] hover:underline"
            >
              + Adaugă caracteristică
            </button>
          </div>

          {/* Active */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => handleChange('is_active', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
              />
              <span className="text-sm text-gray-700">Serviciu activ (vizibil pe site)</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate('/admin/servicii')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Anulează
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Se salvează...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvează
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceFormPage;
