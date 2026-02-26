import { Routes, Route } from 'react-router-dom';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import HomePage from '../pages/HomePage';
import ServicesPage from '../pages/ServicesPage';
import ContactPage from '../pages/ContactPage';
import DoctorProfilePage from '../pages/DoctorProfilePage';

/**
 * DesktopApp - Desktop-only entry component
 * Contains all desktop routes, layout, and components
 * NO mobile code imported here
 */
export function DesktopApp() {
  return (
    <div className="relative bg-white min-h-screen">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicii" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/medici/:id" element={<DoctorProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
