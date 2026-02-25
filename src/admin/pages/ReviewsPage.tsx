import { useState, useRef } from 'react';
import { Star, CheckCircle, XCircle, Trash2, Filter, Plus, X, Upload, User, Loader2 } from 'lucide-react';
import { useAdminReviews } from '../hooks/useSupabaseAdmin';
import type { Review } from '../../lib/supabase';

const ReviewsPage = () => {
  const { data: reviews, loading, error, create, update, remove, reorder } = useAdminReviews();
  const [filter, setFilter] = useState<'all' | 'pending' | 'published'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    author_name: '',
    rating: 5,
    content: '',
    date_text: 'acum o săptămână',
    avatar_url: '',
    is_published: true,
    is_featured: false,
  });

  const filteredReviews = reviews.filter(review => {
    if (filter === 'pending') return !review.is_published;
    if (filter === 'published') return review.is_published;
    return true;
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const resetForm = () => {
    setFormData({
      author_name: '',
      rating: 5,
      content: '',
      date_text: 'acum o săptămână',
      avatar_url: '',
      is_published: true,
      is_featured: false,
    });
    setEditingId(null);
  };

  const handleOpenModal = (review?: Review) => {
    if (review) {
      setEditingId(review.id);
      setFormData({
        author_name: review.author_name,
        rating: review.rating,
        content: review.content,
        date_text: review.date_text || 'acum o săptămână',
        avatar_url: review.avatar_url || '',
        is_published: review.is_published,
        is_featured: review.is_featured,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, avatar_url: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      update(editingId, formData);
    } else {
      create({
        ...formData,
        order_index: reviews.length,
      });
    }
    
    handleCloseModal();
  };

  const handleTogglePublish = (id: string, currentStatus: boolean) => {
    update(id, { is_published: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi această recenzie?')) {
      remove(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newReviews = [...reviews];
    [newReviews[index - 1], newReviews[index]] = [newReviews[index], newReviews[index - 1]];
    reorder(newReviews.map(r => r.id));
  };

  const handleMoveDown = (index: number) => {
    if (index === reviews.length - 1) return;
    const newReviews = [...reviews];
    [newReviews[index], newReviews[index + 1]] = [newReviews[index + 1], newReviews[index]];
    reorder(newReviews.map(r => r.id));
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
        <p>Eroare la încărcarea recenziilor: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recenzii</h1>
          <p className="text-gray-500">Gestionează recenziile pacienților</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-lg">{averageRating}</span>
            <span className="text-gray-500">({reviews.length} recenzii)</span>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#1e3a5f] text-white px-4 py-2 rounded-lg hover:bg-[#152a45] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adaugă recenzie
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400" />
        {(['all', 'pending', 'published'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {f === 'all' ? 'Toate' : f === 'pending' ? 'În așteptare' : 'Publicate'}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredReviews.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Nicio recenzie găsită</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredReviews
              .sort((a, b) => a.order_index - b.order_index)
              .map((review, index) => (
              <div key={review.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {/* Avatar */}
                      {review.avatar_url ? (
                        <img 
                          src={review.avatar_url} 
                          alt={review.author_name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-semibold text-sm">
                          {review.author_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.author_name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{review.date_text}</span>
                        </div>
                      </div>
                      {!review.is_published && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">În așteptare</span>
                      )}
                      {review.is_featured && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Featured</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{review.content}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30"
                      title="Mută sus"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === filteredReviews.length - 1}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-30"
                      title="Mută jos"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleOpenModal(review)}
                      className="p-2 text-gray-600 hover:text-[#1e3a5f] hover:bg-blue-50 rounded-lg"
                      title="Editează"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleTogglePublish(review.id, review.is_published)}
                      className={`p-2 rounded-lg ${review.is_published ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                      title={review.is_published ? 'Publicată' : 'Nepublicată'}
                    >
                      {review.is_published ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(review.id)} 
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Șterge"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingId ? 'Editează recenzie' : 'Adaugă recenzie nouă'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poză profil</label>
                <div className="flex items-center gap-4">
                  {formData.avatar_url ? (
                    <img 
                      src={formData.avatar_url} 
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Încarcă imagine
                    </button>
                    {formData.avatar_url && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, avatar_url: '' }))}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                      >
                        Șterge
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nume pacient *</label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                  placeholder="Ex: Maria P."
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`w-8 h-8 ${star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{formData.rating} din 5 stele</span>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data afișată</label>
                <input
                  type="text"
                  value={formData.date_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, date_text: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent"
                  placeholder="Ex: acum 2 săptămâni"
                />
                <p className="text-xs text-gray-500 mt-1">Textul care va apărea sub nume (ex: acum o lună, acum 3 zile)</p>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recenzie *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent min-h-[100px] resize-none"
                  placeholder="Scrie recenzia aici..."
                  required
                />
              </div>

              {/* Settings */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="w-4 h-4 text-[#1e3a5f] rounded focus:ring-[#1e3a5f]"
                  />
                  <span className="text-sm text-gray-700">Publicată</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                    className="w-4 h-4 text-[#1e3a5f] rounded focus:ring-[#1e3a5f]"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  Anulează
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#152a45] transition-colors"
                >
                  {editingId ? 'Salvează modificări' : 'Adaugă recenzie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
