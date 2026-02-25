import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
// WhatsApp button removed
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';

import ContactPage from './pages/ContactPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import AdminRoutes from './admin';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        {/* Admin Routes - No Navigation/Footer */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Public Routes - With Navigation/Footer */}
        <Route
          path="/*"
          element={
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
              {/* WhatsApp button removed */}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
