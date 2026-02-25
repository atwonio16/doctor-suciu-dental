import { useState } from 'react';
import { Calendar, Search, CheckCircle, XCircle, Clock, Phone, Mail, MessageSquare } from 'lucide-react';
import { useAdminAppointments } from '../hooks/useSupabaseAdmin';
import type { Appointment } from '../types';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

const statusLabels = {
  pending: 'În așteptare',
  confirmed: 'Confirmată',
  cancelled: 'Anulată',
  completed: 'Finalizată',
};

const AppointmentsPage = () => {
  const { data: appointments, update, loading } = useAdminAppointments();
  const [filter, setFilter] = useState<Appointment['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAppointments = appointments.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (id: string, status: Appointment['status']) => {
    update(id, { status });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programări</h1>
          <p className="text-gray-500">Gestionează cererile de programare</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
            {appointments.filter(a => a.status === 'pending').length} în așteptare
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Caută după nume sau serviciu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
          <option value="all">Toate statusurile</option>
          <option value="pending">În așteptare</option>
          <option value="confirmed">Confirmate</option>
          <option value="completed">Finalizate</option>
          <option value="cancelled">Anulate</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Nicio programare găsită</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAppointments.map((app) => (
              <div key={app.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{app.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[app.status]}`}>
                        {statusLabels[app.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{app.service}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <a href={`tel:${app.phone}`} className="flex items-center gap-1 hover:text-[#1e3a5f]"><Phone className="w-4 h-4" /> {app.phone}</a>
                      {app.email && <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-[#1e3a5f]"><Mail className="w-4 h-4" /> {app.email}</a>}
                      {app.preferredDate && <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {app.preferredDate}</span>}
                      {app.preferredTime && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {app.preferredTime}</span>}
                    </div>
                    {app.message && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        {app.message}
                      </div>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {app.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusChange(app.id, 'confirmed')} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                          <CheckCircle className="w-4 h-4" /> Confirmă
                        </button>
                        <button onClick={() => handleStatusChange(app.id, 'cancelled')} className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">
                          <XCircle className="w-4 h-4" /> Respinge
                        </button>
                      </>
                    )}
                    {app.status === 'confirmed' && (
                      <button onClick={() => handleStatusChange(app.id, 'completed')} className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                        <CheckCircle className="w-4 h-4" /> Finalizează
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
