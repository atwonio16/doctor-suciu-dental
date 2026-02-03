import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="relative bg-clinic-white min-h-screen">
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicii" element={<ServicesPage />} />
          </Routes>
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
