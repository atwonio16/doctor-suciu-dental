import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

import ContactPage from './pages/ContactPage';

import DoctorProfilePage from './pages/DoctorProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="relative bg-white min-h-screen">
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicii" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/medici/:id" element={<DoctorProfilePage />} />
          </Routes>
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
