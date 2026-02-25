import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useAdminBlog } from '../hooks/useSupabaseAdmin';
import type { Article } from '../types';

const BlogPage = () => {
  const { data: articles, remove, update, loading } = useAdminBlog();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTogglePublish = (id: string, currentStatus: boolean) => {
    update(id, { isPublished: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi acest articol?')) {
      remove(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-500">Gestionează articolele</p>
        </div>
        <Link to="/admin/blog/new" className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90">
          <Plus className="w-4 h-4" />
          Articol nou
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" placeholder="Caută articole..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Niciun articol găsit</p>
            <Link to="/admin/blog/new" className="text-[#1e3a5f] hover:underline mt-2 inline-block">Scrie primul articol</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <div key={article.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                <div className="w-16 h-16 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                  {article.featuredImage ? (
                    <img src={article.featuredImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Fără imagine</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{article.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{article.excerpt}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${article.isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {article.isPublished ? 'Publicat' : 'Draft'}
                    </span>
                    <span className="text-xs text-gray-400">{new Date(article.createdAt).toLocaleDateString('ro-RO')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleTogglePublish(article.id, article.isPublished)} className="p-2 text-gray-600 hover:text-green-600 rounded-lg">
                    {article.isPublished ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  </button>
                  <Link to={`/admin/blog/edit/${article.id}`} className="p-2 text-gray-600 hover:text-[#1e3a5f] rounded-lg"><Edit2 className="w-4 h-4" /></Link>
                  <button onClick={() => handleDelete(article.id)} className="p-2 text-gray-600 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
