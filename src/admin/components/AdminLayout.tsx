import { useState } from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Images,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  Bell,
  Search,
  GitCompare,
  HelpCircle,
  BarChart3,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
  { icon: Stethoscope, label: 'Servicii', path: '/admin/servicii' },
  { icon: Users, label: 'Echipa', path: '/admin/doctors' },
  { icon: GitCompare, label: 'Before/After', path: '/admin/before-after' },
  { icon: HelpCircle, label: 'FAQ', path: '/admin/faq' },
  { icon: Images, label: 'Galerie', path: '/admin/galerie' },
  { icon: FileText, label: 'Blog', path: '/admin/blog' },
  { icon: Calendar, label: 'Programări', path: '/admin/programari' },
  { icon: Settings, label: 'Setări', path: '/admin/setari' },
];

const AdminLayout = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a5f]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#1e3a5f] text-white transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (location.pathname !== '/admin') {
                window.location.href = '/admin';
              }
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-lg text-white">DS</span>
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden text-left">
                <p className="font-semibold text-sm whitespace-nowrap">Doctor Suciu</p>
                <p className="text-xs text-white/60 whitespace-nowrap">Admin Panel</p>
              </div>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isActive(item.path)
                  ? 'bg-[#0d9488] text-white shadow-lg shadow-[#0d9488]/30'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex w-full items-center gap-3 px-3 py-3 rounded-xl text-white/70 hover:bg-white/10 transition-all"
          >
            <ChevronRight
              className={`w-5 h-5 flex-shrink-0 transition-transform ${
                isSidebarOpen ? 'rotate-180' : ''
              }`}
            />
            {isSidebarOpen && <span className="text-sm font-medium">Colapsare</span>}
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Deconectare</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Caută..."
                className="bg-transparent text-sm outline-none w-48 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] flex items-center justify-center">
                <span className="font-semibold text-white">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;
