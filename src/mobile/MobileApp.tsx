import { Routes, Route } from 'react-router-dom';
import { MobileNavigation } from './sections/MobileNavigation';
import { MobileFooter } from './sections/MobileFooter';
import { MobileHomePage } from './MobileHomePage';
import { MobileServices } from './sections/MobileServices';
import { MobileContact } from './sections/MobileContact';
import { MobileBottomBar } from './sections/MobileBottomBar';

/**
 * MobileApp - Mobile-only entry component
 * Contains all mobile routes, layout, and components
 * NO desktop code imported here (except shared data hooks)
 */
export function MobileApp() {
  return (
    <div className="mobile-shell relative min-h-screen overflow-x-clip text-slate-900">
      <MobileNavigation />
      <main className="relative">
        <Routes>
          <Route path="/" element={<MobileHomePage />} />
          <Route path="/servicii" element={<MobileServices />} />
          <Route path="/contact" element={<MobileContact />} />
          <Route path="/medici/:id" element={<MobileHomePage />} />
        </Routes>
      </main>
      <MobileFooter />
      <MobileBottomBar />
    </div>
  );
}
