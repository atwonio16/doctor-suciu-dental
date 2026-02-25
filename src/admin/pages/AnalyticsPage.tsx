import { useState } from 'react';
import { TrendingUp, Calendar, Eye, MessageSquare, ArrowUp } from 'lucide-react';
import { useAdminAppointments, useAdminServices } from '../hooks/useSupabaseAdmin';
import type { Appointment, Service } from '../types';

const AnalyticsPage = () => {
  const { data: appointments } = useAdminAppointments();
  const { data: services } = useAdminServices();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  // Calculate stats
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;

  const activeServices = services.filter(s => s.isActive).length;
  const totalServices = services.length;

  // Group appointments by status for chart
  const appointmentStats = [
    { label: 'În așteptare', value: pendingAppointments, color: 'bg-amber-500' },
    { label: 'Confirmate', value: confirmedAppointments, color: 'bg-blue-500' },
    { label: 'Finalizate', value: completedAppointments, color: 'bg-green-500' },
    { label: 'Anulate', value: cancelledAppointments, color: 'bg-red-500' },
  ];

  const maxAppointments = Math.max(...appointmentStats.map(s => s.value), 1);

  // Recent activity (last 5 items)
  const recentActivity = [
    ...appointments.map(a => ({
      type: 'appointment' as const,
      title: `Programare nouă - ${a.name}`,
      subtitle: a.service,
      date: new Date(a.createdAt),
      status: a.status,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Statistici și date despre activitatea site-ului</p>
        </div>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
        >
          <option value="7d">Ultimele 7 zile</option>
          <option value="30d">Ultimele 30 de zile</option>
          <option value="90d">Ultimele 90 de zile</option>
          <option value="all">Tot timpul</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Programări */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> Total
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalAppointments}</p>
          <p className="text-sm text-gray-500">Programări totale</p>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="text-amber-600">{pendingAppointments} în așteptare</span>
            <span className="text-gray-300">|</span>
            <span className="text-green-600">{confirmedAppointments} confirmate</span>
          </div>
        </div>

        {/* Servicii */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeServices}</p>
          <p className="text-sm text-gray-500">Servicii active</p>
          <div className="mt-3 text-xs text-gray-500">
            Din {totalServices} servicii totale
          </div>
        </div>

        {/* Vizualizări (placeholder) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">1,247</p>
          <p className="text-sm text-gray-500">Vizualizări pagină</p>
          <div className="mt-3 text-xs text-gray-500">
            În ultimele 30 de zile
          </div>
        </div>

        {/* Programări noi (placeholder) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Noi
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{pendingAppointments}</p>
          <p className="text-sm text-gray-500">Programări noi</p>
          <div className="mt-3 text-xs text-gray-500">
            Așteaptă confirmare
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Programări Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Status Programări</h3>
          <div className="space-y-4">
            {appointmentStats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.color} transition-all duration-500`}
                    style={{ width: `${(stat.value / maxAppointments) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informații</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              <strong>Programări finalizate:</strong> {completedAppointments}
            </p>
            <p>
              <strong>Programări anulate:</strong> {cancelledAppointments}
            </p>
            <p>
              <strong>Servicii inactive:</strong> {totalServices - activeServices}
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700">
                <strong>Sfat:</strong> Monitorizează periodic programările în așteptare și răspunde rapid pentru a îmbunătăți experiența pacienților.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Activitate Recentă</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Nicio activitate recentă</p>
            </div>
          ) : (
            recentActivity.map((activity, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {activity.status === 'pending' && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">În așteptare</span>
                  )}
                  {activity.status === 'confirmed' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Confirmată</span>
                  )}
                  {activity.status === 'completed' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Finalizată</span>
                  )}
                  {activity.status === 'cancelled' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Anulată</span>
                  )}
                  <span className="text-sm text-gray-400">
                    {activity.date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
