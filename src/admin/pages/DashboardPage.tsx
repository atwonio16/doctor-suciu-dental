import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  ArrowRight,
  MoreHorizontal,
} from 'lucide-react';
import { 
  useAdminServices, 
  useAdminDoctors, 
  useAdminBlog, 
  useAdminAppointments 
} from '../hooks/useSupabaseAdmin';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean };
  color: string;
  to: string;
}

const StatCard = ({ icon: Icon, label, value, trend, color, to }: StatCardProps) => (
  <Link
    to={to}
    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend.value}%
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-sm text-gray-500">{label}</p>
  </Link>
);

const RecentActivity = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('admin_activity_logs') || '[]');
    setLogs(storedLogs.slice(0, 10));
  }, []);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-700';
      case 'update':
        return 'bg-blue-100 text-blue-700';
      case 'delete':
        return 'bg-red-100 text-red-700';
      case 'login':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Chiar acum';
    if (minutes < 60) return `${minutes} minute în urmă`;
    if (hours < 24) return `${hours} ore în urmă`;
    return `${days} zile în urmă`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-gray-400" />
          <h3 className="font-semibold text-gray-900">Activitate Recentă</h3>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>
      
      <div className="divide-y divide-gray-50">
        {logs.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nicio activitate recentă</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getActionColor(log.action)}`}>
                  {log.action}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{log.username}</span>{' '}
                    <span className="text-gray-500">{log.details}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{formatTime(log.timestamp)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const QuickActions = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6">
    <h3 className="font-semibold text-gray-900 mb-4">Acțiuni Rapide</h3>
    <div className="space-y-2">
      <Link
        to="/admin/servicii/new"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
      >
        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
          <Stethoscope className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Adaugă serviciu</p>
          <p className="text-xs text-gray-500">Creează un serviciu nou</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
      </Link>
      
      <Link
        to="/admin/blog/new"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
      >
        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
          <FileText className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Scrie articol</p>
          <p className="text-xs text-gray-500">Publică pe blog</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
      </Link>
      
      <Link
        to="/admin/programari"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
      >
        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">Vezi programări</p>
          <p className="text-xs text-gray-500">Gestionează cererile</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
      </Link>
    </div>
  </div>
);

const DashboardPage = () => {
  const { count: servicesCount } = useAdminServices();
  const { count: doctorsCount } = useAdminDoctors();
  const { count: articlesCount } = useAdminBlog();
  const { data: appointments } = useAdminAppointments();

  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;

  // Calculate trends (mock for now)
  const getTrend = (_count: number) => ({
    value: Math.floor(Math.random() * 20) + 5,
    isPositive: true,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Bine ai revenit! Iată ce s-a întâmplat recent.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString('ro-RO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          icon={Stethoscope}
          label="Servicii"
          value={servicesCount}
          trend={getTrend(servicesCount)}
          color="bg-indigo-500"
          to="/admin/servicii"
        />
        <StatCard
          icon={Users}
          label="Doctori"
          value={doctorsCount}
          trend={getTrend(doctorsCount)}
          color="bg-blue-500"
          to="/admin/doctori"
        />
        <StatCard
          icon={FileText}
          label="Articole"
          value={articlesCount}
          trend={getTrend(articlesCount)}
          color="bg-emerald-500"
          to="/admin/blog"
        />
        <StatCard
          icon={Calendar}
          label="Programări"
          value={appointments.length}
          trend={getTrend(appointments.length)}
          color="bg-rose-500"
          to="/admin/programari"
        />
        <StatCard
          icon={Clock}
          label="În așteptare"
          value={pendingAppointments}
          color="bg-purple-500"
          to="/admin/programari"
        />
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Pending Appointments Preview */}
      {pendingAppointments > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {pendingAppointments} programări în așteptare
                </h3>
                <p className="text-sm text-gray-500">
                  Ai {pendingAppointments} cereri noi care necesită confirmare
                </p>
              </div>
            </div>
            <Link
              to="/admin/programari"
              className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              Vezi toate
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
