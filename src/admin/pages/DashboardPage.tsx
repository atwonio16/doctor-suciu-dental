import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Users,
  Calendar,
  Activity,
  Clock,
  ArrowRight,
  Plus,
  Sparkles,
  Image,
  HelpCircle,
} from 'lucide-react';
import { 
  useAdminServices, 
  useAdminDoctors, 
  useAdminAppointments,
  useAdminGallery,
  useAdminFAQ,
} from '../hooks/useSupabaseAdmin';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  to: string;
}

const StatCard = ({ icon: Icon, label, value, color, to }: StatCardProps) => (
  <Link
    to={to}
    className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-5">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{value}</h3>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
  </Link>
);

const WelcomeCard = () => {
  const hour = new Date().getHours();
  let greeting = 'Bună dimineața';
  if (hour >= 12 && hour < 17) greeting = 'Bună ziua';
  if (hour >= 17) greeting = 'Bună seara';

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] rounded-3xl p-8 text-white shadow-2xl shadow-[#1e3a5f]/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-white/80" />
          <span className="text-sm font-medium text-white/80">Doctor Suciu Admin</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-tight">{greeting}! 👋</h1>
        <p className="text-white/80 text-lg max-w-lg">
          Bine ai revenit în panoul de administrare. Iată o privire rapidă asupra activității din clinica ta.
        </p>
      </div>
    </div>
  );
};

const RecentActivity = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('admin_activity_logs') || '[]');
    setLogs(storedLogs.slice(0, 8));
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <div className="w-2 h-2 rounded-full bg-green-500" />;
      case 'update':
        return <div className="w-2 h-2 rounded-full bg-blue-500" />;
      case 'delete':
        return <div className="w-2 h-2 rounded-full bg-red-500" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-400" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Acum';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}z`;
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Activitate recentă</h3>
            <p className="text-xs text-gray-500">Ultimele acțiuni în sistem</p>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-50">
        {logs.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">Nicio activitate recentă</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-50/50 transition-colors flex items-center gap-4">
              {getActionIcon(log.action)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{log.username}</span>
                  <span className="text-gray-500"> {log.details}</span>
                </p>
              </div>
              <span className="text-xs text-gray-400 font-medium">{formatTime(log.timestamp)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const QuickActions = () => (
  <div className="space-y-4">
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Acțiuni rapide
      </h3>
      <div className="space-y-3">
        <Link
          to="/admin/servicii/new"
          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#1e3a5f] flex items-center justify-center shadow-lg shadow-[#1e3a5f]/20">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Adaugă serviciu</p>
            <p className="text-xs text-gray-500">Creează un serviciu nou</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </Link>
        
        <Link
          to="/admin/doctors/new"
          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#0d9488] flex items-center justify-center shadow-lg shadow-[#0d9488]/20">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Adaugă membru</p>
            <p className="text-xs text-gray-500">Crește echipa</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </Link>
        
        <Link
          to="/admin/programari"
          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Vezi programări</p>
            <p className="text-xs text-gray-500">Gestionează cererile</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </Link>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { count: servicesCount, isLoading: servicesLoading } = useAdminServices();
  const { count: doctorsCount, isLoading: doctorsLoading } = useAdminDoctors();
  const { data: appointments, isLoading: appointmentsLoading } = useAdminAppointments();
  const { count: galleryCount, isLoading: galleryLoading } = useAdminGallery();
  const { count: faqCount, isLoading: faqLoading } = useAdminFAQ();

  const displayValue = (value: number | undefined, loading: boolean) => {
    if (loading || value === undefined) return '-';
    return value;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <WelcomeCard />

      {/* Stats Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Statistici</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Actualizat acum</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <StatCard
            icon={Stethoscope}
            label="Servicii active"
            value={displayValue(servicesCount, servicesLoading)}
            color="bg-[#1e3a5f]"
            to="/admin/servicii"
          />
          <StatCard
            icon={Users}
            label="Membri echipă"
            value={displayValue(doctorsCount, doctorsLoading)}
            color="bg-[#0d9488]"
            to="/admin/doctors"
          />
          <StatCard
            icon={Image}
            label="Imagini galerie"
            value={displayValue(galleryCount, galleryLoading)}
            color="bg-blue-500"
            to="/admin/galerie"
          />
          <StatCard
            icon={HelpCircle}
            label="Întrebări FAQ"
            value={displayValue(faqCount, faqLoading)}
            color="bg-purple-500"
            to="/admin/faq"
          />
          <StatCard
            icon={Calendar}
            label="Programări noi"
            value={displayValue(appointments?.filter(a => a.status === 'pending').length, appointmentsLoading)}
            color="bg-amber-500"
            to="/admin/programari"
          />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
