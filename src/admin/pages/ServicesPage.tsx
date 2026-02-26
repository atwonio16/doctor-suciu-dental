import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, CheckCircle, XCircle, Loader2, FolderOpen } from 'lucide-react';
import { useAdminServices } from '../hooks/useSupabaseAdmin';
import { PREDEFINED_CATEGORIES } from '../types';

const ServicesPage = () => {
  const { data: services, remove, update, loading } = useAdminServices();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category_slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Grupează serviciile pe categorii pentru afișare
  const groupedByCategory = useMemo(() => {
    const groups: Record<string, typeof services> = {};
    PREDEFINED_CATEGORIES.forEach(cat => {
      const catServices = filteredServices.filter(s => s.category_slug === cat.slug);
      if (catServices.length > 0) {
        groups[cat.slug] = catServices;
      }
    });
    return groups;
  }, [filteredServices]);

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    update(id, { is_active: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi acest serviciu?')) {
      remove(id);
    }
  };

  const getCategoryName = (categorySlug: string) => {
    const category = PREDEFINED_CATEGORIES.find(c => c.slug === categorySlug);
    return category?.name || 'Fără categorie';
  };

  const getCategorySubtitle = (categorySlug: string) => {
    const category = PREDEFINED_CATEGORIES.find(c => c.slug === categorySlug);
    return category?.subtitle || '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0d9488]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Servicii</h1>
          <p className="text-gray-500">Gestionează serviciile și prețurile clinicii</p>
        </div>
        <Link
          to="/admin/servicii/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adaugă serviciu
        </Link>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PREDEFINED_CATEGORIES.map((cat) => {
          const count = services.filter(s => s.category_slug === cat.slug).length;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(selectedCategory === cat.slug ? 'all' : cat.slug)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <FolderOpen className={`w-5 h-5 ${selectedCategory === cat.slug ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-medium">{cat.name}</span>
                <span className={`ml-auto text-sm px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.slug ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </div>
              <p className={`text-sm ${selectedCategory === cat.slug ? 'text-white/80' : 'text-gray-500'} line-clamp-2`}>
                {cat.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Caută servicii..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] outline-none"
        >
          <option value="all">Toate categoriile</option>
          {PREDEFINED_CATEGORIES.map(cat => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Services List by Category */}
      {selectedCategory === 'all' ? (
        // Afișare grupată pe categorii
        <div className="space-y-8">
          {Object.keys(groupedByCategory).length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Niciun serviciu găsit</p>
              {services.length === 0 && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Nu există servicii. Adaugă primul serviciu acum.</p>
                  <Link
                    to="/admin/servicii/new"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white rounded-lg hover:bg-[#0d9488]/90"
                  >
                    <Plus className="w-4 h-4" />
                    Adaugă primul serviciu
                  </Link>
                </div>
              )}
            </div>
          ) : (
            PREDEFINED_CATEGORIES.map((cat) => {
              const catServices = groupedByCategory[cat.slug];
              if (!catServices || catServices.length === 0) return null;

              return (
                <div key={cat.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Category Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                        <p className="text-sm text-gray-500">{cat.subtitle}</p>
                      </div>
                      <span className="text-sm text-gray-400">{catServices.length} servicii</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="divide-y divide-gray-100">
                    {catServices.map((service) => (
                      <div key={service.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0d9488] to-[#1e3a5f] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">{service.title.charAt(0)}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{service.title}</h3>
                          <p className="text-sm text-gray-500 truncate">{service.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {service.price && (
                              <span className="text-sm font-medium text-[#0d9488]">{service.price}</span>
                            )}
                            {service.duration && (
                              <>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{service.duration}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Status */}
                        <button
                          onClick={() => handleToggleActive(service.id, service.is_active)}
                          className={`p-2 rounded-lg transition-colors ${
                            service.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          {service.is_active ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </button>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <Link
                            to={`/admin/servicii/edit/${service.id}`}
                            className="p-2 text-gray-600 hover:text-[#1e3a5f] hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        // Afișare doar pentru categoria selectată
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredServices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>Niciun serviciu găsit în această categorie</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Category Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">{getCategoryName(selectedCategory)}</h3>
                <p className="text-sm text-gray-500">{getCategorySubtitle(selectedCategory)}</p>
              </div>

              {filteredServices.map((service) => (
                <div key={service.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0d9488] to-[#1e3a5f] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{service.title.charAt(0)}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{service.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{service.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {service.price && (
                        <span className="text-sm font-medium text-[#0d9488]">{service.price}</span>
                      )}
                      {service.duration && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{service.duration}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <button
                    onClick={() => handleToggleActive(service.id, service.is_active)}
                    className={`p-2 rounded-lg transition-colors ${
                      service.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {service.is_active ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </button>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/admin/servicii/edit/${service.id}`}
                      className="p-2 text-gray-600 hover:text-[#1e3a5f] hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
