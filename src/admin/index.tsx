import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Lazy load other pages for better performance
import { lazy, Suspense } from 'react';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceFormPage = lazy(() => import('./pages/ServiceFormPage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const DoctorFormPage = lazy(() => import('./pages/DoctorFormPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ArticleFormPage = lazy(() => import('./pages/ArticleFormPage'));
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const BeforeAfterPage = lazy(() => import('./pages/BeforeAfterPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));

const PageLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e3a5f]"></div>
  </div>
);

const AdminRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          
          <Route path="servicii" element={
            <Suspense fallback={<PageLoader />}>
              <ServicesPage />
            </Suspense>
          } />
          <Route path="servicii/new" element={
            <Suspense fallback={<PageLoader />}>
              <ServiceFormPage />
            </Suspense>
          } />
          <Route path="servicii/edit/:id" element={
            <Suspense fallback={<PageLoader />}>
              <ServiceFormPage />
            </Suspense>
          } />

          
          <Route path="doctors" element={
            <Suspense fallback={<PageLoader />}>
              <DoctorsPage />
            </Suspense>
          } />
          <Route path="doctors/new" element={
            <Suspense fallback={<PageLoader />}>
              <DoctorFormPage />
            </Suspense>
          } />
          <Route path="doctors/edit/:id" element={
            <Suspense fallback={<PageLoader />}>
              <DoctorFormPage />
            </Suspense>
          } />
          
          <Route path="galerie" element={
            <Suspense fallback={<PageLoader />}>
              <GalleryPage />
            </Suspense>
          } />
          
          <Route path="blog" element={
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          } />
          <Route path="blog/new" element={
            <Suspense fallback={<PageLoader />}>
              <ArticleFormPage />
            </Suspense>
          } />
          <Route path="blog/edit/:id" element={
            <Suspense fallback={<PageLoader />}>
              <ArticleFormPage />
            </Suspense>
          } />
          
          <Route path="programari" element={
            <Suspense fallback={<PageLoader />}>
              <AppointmentsPage />
            </Suspense>
          } />
          
          <Route path="before-after" element={
            <Suspense fallback={<PageLoader />}>
              <BeforeAfterPage />
            </Suspense>
          } />
          
          <Route path="faq" element={
            <Suspense fallback={<PageLoader />}>
              <FAQPage />
            </Suspense>
          } />
          
          <Route path="setari" element={
            <Suspense fallback={<PageLoader />}>
              <SettingsPage />
            </Suspense>
          } />
          
          <Route path="analytics" element={
            <Suspense fallback={<PageLoader />}>
              <AnalyticsPage />
            </Suspense>
          } />
        </Route>
        
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminRoutes;
