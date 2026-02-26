import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './admin';
import { DesktopApp } from './desktop/DesktopApp';
import { MobileApp } from './mobile/MobileApp';
import { useIsMobile } from './hooks/useIsMobile';
import './App.css';

/**
 * ViewportSwitch - Switches between Mobile and Desktop apps
 * Mobile breakpoint: 768px
 */
function ViewportSwitch() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileApp /> : <DesktopApp />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - No viewport switch */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Public Routes - Viewport switch */}
        <Route path="/*" element={<ViewportSwitch />} />
      </Routes>
    </Router>
  );
}

export default App;
