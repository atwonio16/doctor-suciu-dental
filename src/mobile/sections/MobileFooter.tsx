import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export function MobileFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 pt-6 pb-24">
      <div className="mx-auto max-w-[480px] px-5">
        {/* Logo */}
        <Link to="/" className="inline-block mb-4">
          <span className="block text-[17px] font-bold tracking-tight text-[#0B1E32]">DOCTOR SUCIU</span>
          <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">DENTAL CLINIC</span>
        </Link>

        {/* Contact Compact */}
        <div className="space-y-2 mb-4">
          <a href="tel:+40770220110" className="block text-[15px] font-semibold text-[#0B1E32]">
            0770 220 110
          </a>
          <p className="text-[13px] text-slate-600">
            L-J: 9-18 | V: 9-15
          </p>
          <a 
            href="https://maps.google.com/?q=Calea+Domneasca+234+Targoviste" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-[13px] text-slate-600 hover:text-[#0B1E32]"
          >
            Calea Domnească 234, Târgoviște
          </a>
        </div>

        {/* Social Links - doar Instagram si Facebook */}
        <div className="flex items-center gap-3 mb-4">
          <a
            href="https://instagram.com/doctorsuciu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com/doctorsuciu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>

        {/* Links rapide */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-[12px]">
          <Link to="/servicii" className="text-slate-500 hover:text-[#0B1E32]">Servicii</Link>
          <Link to="/despre" className="text-slate-500 hover:text-[#0B1E32]">Echipa</Link>
          <Link to="/contact" className="text-slate-500 hover:text-[#0B1E32]">Contact</Link>
          <Link to="/blog" className="text-slate-500 hover:text-[#0B1E32]">Blog</Link>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-slate-200">
          <p className="text-[11px] text-slate-400 text-center">
            © {currentYear} Doctor Suciu Dental Clinic
          </p>
        </div>
      </div>
    </footer>
  );
}
