import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, CheckCircle, XCircle, Loader2, GripVertical } from 'lucide-react';
import { useAdminCMS } from '../hooks/useSupabaseAdmin';
import { doctorsApi } from '../../lib/cms';
import type { Doctor } from '../../lib/supabase';

const DoctorsPage = () => {
  const { data: doctors, remove, update, loading, error } = useAdminCMS<Doctor>(doctorsApi);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Debug logging
  useEffect(() => {
    console.log('DoctorsPage - loading:', loading);
    console.log('DoctorsPage - error:', error);
    console.log('DoctorsPage - doctors count:', doctors?.length);
    console.log('DoctorsPage - doctors:', doctors);
  }, [doctors, loading, error]);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    update(id, { is_active: !currentStatus });
  };

  const handleDelete = (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi acest membru al echipei?')) {
      remove(id);
    }
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
      <div className="p-8 text-center">
        <div className="text-red-600 font-semibold mb-2">Eroare la încărcarea datelor</div>
        <div className="text-gray-600 text-sm">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg"
        >
          Reîncearcă
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Echipa Noastră</h1>
          <p className="text-gray-500">Gestionează medicii și asistentele clinicii</p>
        </div>
        <Link
          to="/admin/doctors/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#1e3a5f]/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adaugă membru
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Caută după nume sau funcție..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredDoctors.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Niciun membru găsit</p>
            {doctors.length === 0 && (
              <div className="mt-4">
                <p className="text-sm mb-2">Nu există membri în echipă. Adaugă primul membru acum.</p>
                <Link
                  to="/admin/doctors/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0d9488] text-white rounded-lg hover:bg-[#0d9488]/90"
                >
                  <Plus className="w-4 h-4" />
                  Adaugă primul membru
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                {/* Image */}
                <div className="w-14 h-14 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                  {doctor.image_url ? (
                    <img 
                      src={doctor.image_url} 
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: doctor.image_crop || 'center 25%' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0d9488] text-white font-bold">
                      {doctor.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{doctor.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{doctor.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {doctor.specialties?.slice(0, 3).map((spec, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <button
                  onClick={() => handleToggleActive(doctor.id, doctor.is_active)}
                  className={`p-2 rounded-lg transition-colors ${
                    doctor.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {doctor.is_active ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </button>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Link
                    to={`/admin/doctors/edit/${doctor.id}`}
                    className="p-2 text-gray-600 hover:text-[#1e3a5f] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(doctor.id)}
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
    </div>
  );
};

export default DoctorsPage;
