import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useAdminBlog } from '../hooks/useSupabaseAdmin';
import type { Article } from '../types';

const ArticleFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: articles, create, update, loading } = useAdminBlog();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    author: '',
    isPublished: false,
    isFeatured: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const article = articles.find(a => a.id === id);
      if (article) {
        setFormData({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          content: article.content,
          category: article.category,
          tags: article.tags.join(', '),
          author: article.author,
          isPublished: article.isPublished,
          isFeatured: article.isFeatured,
        });
      }
    }
  }, [isEditing, id, articles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      featuredImage: '',
      viewCount: 0,
      readTime: '5 min',
    };

    if (isEditing && id) {
      update(id, articleData);
    } else {
      create(articleData);
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin/blog');
    }, 500);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/blog')} className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Editează Articol' : 'Articol Nou'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Titlu *</label>
            <input type="text" required value={formData.title} onChange={(e) => {
              handleChange('title', e.target.value);
              if (!isEditing) handleChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'));
            }} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input type="text" value={formData.slug} onChange={(e) => handleChange('slug', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
            <input type="text" value={formData.author} onChange={(e) => handleChange('author', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
            <input type="text" value={formData.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="Scurtă descriere..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Conținut *</label>
            <textarea rows={12} required value={formData.content} onChange={(e) => handleChange('content', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg resize-none font-mono text-sm" placeholder="Scrie articolul aici..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categorie</label>
            <input type="text" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Taguri (separate prin virgulă)</label>
            <input type="text" value={formData.tags} onChange={(e) => handleChange('tags', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isPublished} onChange={(e) => handleChange('isPublished', e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Publicat</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isFeatured} onChange={(e) => handleChange('isFeatured', e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button type="button" onClick={() => navigate('/admin/blog')} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Anulează</button>
          <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-[#1e3a5f] text-white rounded-lg disabled:opacity-50">
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Se salvează...</> : <><Save className="w-4 h-4" /> Salvează</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleFormPage;
