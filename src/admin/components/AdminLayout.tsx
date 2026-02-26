import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Images,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  Bell,
  Search,
  GitCompare,
  HelpCircle,
  Home,
} from 'lucide-react';

// Logo component
const AdminLogo = () => (
  <div className="flex flex-col leading-none">
    <span className="font-semibold text-sm tracking-tight text-gray-900">Admin Panel</span>
    <span className="text-[10px] text-gray-500">doctorsuciu.ro</span>
  </div>
);

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Stethoscope, label: 'Servicii', path: '/admin/servicii' },
  { icon: Users, label: 'Echipa', path: '/admin/doctors' },
  { icon: GitCompare, label: 'Before/After', path: '/admin/before-after' },
  { icon: HelpCircle, label: 'FAQ', path: '/admin/faq' },
  { icon: Images, label: 'Galerie', path: '/admin/galerie' },
  { icon: Calendar, label: 'Programări', path: '/admin/programari' },
  { icon: Settings, label: 'Setări', path: '/admin/setari' },
];

const AdminLayout = () => {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-lg">
            <AdminLogo />
          </div>
          <div className="w-6 h-6 border-2 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
        </div>
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
    <div className="min-h-screen bg-[#F5F5F7] flex">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 transition-all duration-300 ease-out ${
          isSidebarOpen ? 'w-72' : 'w-24'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (location.pathname !== '/admin') {
                window.location.href = '/admin';
              }
            }}
            className="flex items-center cursor-pointer group"
          >
            {isSidebarOpen && (
              <div className="overflow-hidden text-left">
                <p className="font-semibold text-gray-900 whitespace-nowrap tracking-tight text-sm">Admin Panel</p>
                <p className="text-xs text-gray-400 whitespace-nowrap font-medium">doctorsuciu.ro</p>
              </div>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <div className={`mb-6 ${isSidebarOpen ? 'px-3' : 'px-1'}`}>
            <p className={`text-xs font-semibold text-gray-400 uppercase tracking-wider ${isSidebarOpen ? '' : 'text-center'}`}>
              {isSidebarOpen ? 'Meniu principal' : '...'}
            </p>
          </div>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden ${
                  isSidebarOpen ? '' : 'justify-center'
                } ${
                  active
                    ? 'bg-[#1e3a5f] text-white shadow-lg shadow-[#1e3a5f]/25'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform ${active ? '' : 'group-hover:scale-110'}`} />
                {isSidebarOpen && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
                {active && (
                  <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex w-full items-center justify-center gap-3 px-3 py-3 rounded-2xl text-gray-500 hover:bg-gray-100 transition-all mb-2"
          >
            <ChevronLeft
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                isSidebarOpen ? '' : 'rotate-180'
              }`}
            />
            {isSidebarOpen && <span className="text-sm font-medium">Restrânge</span>}
          </button>
          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all ${isSidebarOpen ? '' : 'justify-center'}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Deconectare</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header 
          className={`h-20 flex items-center justify-between px-6 sticky top-0 z-30 transition-all duration-300 ${
            scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Search */}
            <div className="hidden md:flex items-center gap-3 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100 focus-within:shadow-md focus-within:border-gray-200 transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Caută în admin..."
                className="bg-transparent text-sm outline-none w-56 placeholder:text-gray-400 text-gray-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Back to site */}
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-2xl text-gray-600 hover:bg-white hover:shadow-sm transition-all text-sm font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Vezi site-ul</span>
            </Link>

            {/* Notifications */}
            <button className="relative w-10 h-10 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* User */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500 font-medium capitalize">{user?.role}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#0d9488] flex items-center justify-center shadow-lg shadow-[#1e3a5f]/20">
                <span className="font-semibold text-white text-lg">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
