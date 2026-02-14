import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlmLFfxYhvS_6MRgeY1_hIG6jCgMX5ygOalhlpa6RxjVl3AZtPYc50ihpC6TmHMKDO5w/exec';

const services = [
  'Consultație gratuită',
  'Implant dentar',
  'Ortodonție / Invisalign',
  'Albire dentară',
  'Fațete dentare',
  'Estetică dentară',
  'Stomatologie copii',
  'Urgențe stomatologice',
  'Alt serviciu',
];

// EmailModal
const EmailModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ ...formData, type: 'email_contact' }),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      });
      setEmailSent(true);
      setTimeout(() => { setEmailSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); onClose(); }, 2000);
    } catch { alert('Eroare la trimitere'); } finally { setIsLoading(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
          <div><h3 className="text-xl font-semibold text-[#0f172a]">Trimite-ne un email</h3><p className="text-sm text-[#64748b]">Răspundem în cel mai scurt timp</p></div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#f8fafc] hover:bg-[#e2e8f0] flex items-center justify-center"><X className="w-5 h-5 text-[#64748b]" /></button>
        </div>
        <div className="p-6">
          {emailSent ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#0891b2]/10 flex items-center justify-center mb-4"><CheckCircle className="w-8 h-8 text-[#0891b2]" /></div>
              <h4 className="font-semibold text-lg mb-2">Mesaj trimis!</h4><p className="text-[#64748b]">Îți răspundem în curând.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Numele tău <span className="text-red-500">*</span></label><Input required placeholder="Ex: Maria Popescu" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 bg-[#f8fafc] border-[#e2e8f0] rounded-xl" /></div>
              <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Emailul tău <span className="text-red-500">*</span></label><Input type="email" required placeholder="Ex: maria@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 bg-[#f8fafc] border-[#e2e8f0] rounded-xl" /></div>
              <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Subiect</label><Input placeholder="Cu ce te putem ajuta?" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="h-12 bg-[#f8fafc] border-[#e2e8f0] rounded-xl" /></div>
              <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Mesaj <span className="text-red-500">*</span></label><Textarea required placeholder="Scrie-ne mesajul tău aici..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="bg-[#f8fafc] border-[#e2e8f0] rounded-xl resize-none" /></div>
              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-4 text-base font-semibold px-6 rounded-xl bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-transparent hover:text-[#1e3a5f] disabled:opacity-70" style={{ transition: 'all 0.15s ease' }}>{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}{isLoading ? 'Se trimite...' : 'TRIMITE EMAIL'}</button>
              <p className="text-center text-xs text-[#64748b]">Sau scrie-ne direct la <a href="mailto:contact@doctorsuciu.ro" className="text-[#0891b2] hover:underline">contact@doctorsuciu.ro</a></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectKey, setSelectKey] = useState(0); // Pentru a forța re-render la Select
  
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Primirea datelor de la ServicesPage
  useEffect(() => {
    const navState = location.state as { service?: string; fromServices?: boolean } | null;
    console.log('ContactPage state primit:', navState);
    
    if (navState?.service) {
      console.log('Setez serviciul:', navState.service);
      
      // Actualizăm formData
      setFormData({ name: '', phone: '', email: '', service: navState.service, message: '' });
      
      // Forțăm re-render la Select
      setSelectKey(prev => prev + 1);
      
      // Scroll la formular
      setTimeout(() => {
        const formElement = document.getElementById('contact-form');
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
      
      // Curățăm state-ul
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
      });
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setFormData({ name: '', phone: '', email: '', service: '', message: '' }); }, 5000);
    } catch { alert('Eroare la trimitere'); } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      <section className="relative w-full pb-10 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-sky-50/10" />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f172a] mb-4 tracking-tight">Primul pas către zâmbetul visat</h1>
              <p className="text-lg text-[#64748b] max-w-3xl mx-auto whitespace-nowrap">Completează formularul și primești un plan personalizat în 30 de minute, fără costuri</p>
            </div>

            <div id="contact-form" className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden shadow-xl shadow-slate-200/50 mb-10">
              <div className="grid lg:grid-cols-2 min-h-[550px]">
                <div className="relative h-64 lg:h-full">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.745365495854!2d25.4493!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sCalea%20Domneasc%C4%83%20234%2C%20T%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro!4v1640000000000!5m2!1sro!2sro" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Doctor Suciu Dental Clinic" className="absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 pointer-events-none hidden lg:block" />
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-20 h-20 rounded-full bg-[#0891b2]/10 flex items-center justify-center mb-4"><CheckCircle className="w-10 h-10 text-[#0891b2]" /></div>
                      <h3 className="font-semibold text-2xl mb-2 text-[#0f172a]">Mulțumim!</h3><p className="text-[#64748b]">Te contactăm în maxim 30 de minute.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Numele tău <span className="text-red-500">*</span></label><Input required placeholder="Ex: Maria Popescu" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 bg-[#f8fafc] border-[#e2e8f0] rounded-xl" /></div>
                        <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Telefon <span className="text-red-500">*</span></label><Input type="tel" required placeholder="Ex: 0770 220 110" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12 bg-[#f8fafc] border-[#e2e8f0] rounded-xl" /></div>
                      </div>

                      <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Email</label><Input type="email" placeholder="Ex: maria@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 bg-[#f8fafc] border-[#e2e8f0] rounded-xl" /></div>

                      <div>
                        <label className="block text-sm font-semibold text-[#0f172a] mb-2">Ce serviciu te interesează?</label>
                        <Select 
                          key={selectKey}
                          value={formData.service || undefined} 
                          onValueChange={(v) => setFormData({ ...formData, service: v })}
                        >
                          <SelectTrigger className="h-12 bg-[#f8fafc] border-[#e2e8f0] rounded-xl">
                            <SelectValue placeholder="Alege un serviciu din listă..." />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>

                      <div><label className="block text-sm font-semibold text-[#0f172a] mb-2">Mesajul tău (opțional)</label><Textarea placeholder="Spune-ne pe scurt ce te preocupă..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="bg-[#f8fafc] border-[#e2e8f0] rounded-xl resize-none" /></div>

                      <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-4 text-base font-semibold px-6 rounded-full bg-[#1e3a5f] text-white border-2 border-[#1e3a5f] hover:bg-transparent hover:text-[#1e3a5f] disabled:opacity-70" style={{ transition: 'all 0.15s ease' }}>{isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}{isLoading ? 'Se trimite...' : 'PROGRAMEAZĂ CONSULTAȚIA GRATUITĂ'}</button>

                      <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-[#64748b]">
                        <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#0891b2]" />Răspuns în 30 min</span>
                        <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#0891b2]" />Consultație gratuită</span>
                        <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#0891b2]" />Fără obligații</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0]"><div className="w-10 h-10 rounded-full bg-[#0891b2]/10 flex items-center justify-center"><Clock className="w-5 h-5 text-[#0891b2]" /></div><div className="text-left"><p className="text-xs text-[#64748b] uppercase tracking-wider">Program</p><p className="font-semibold text-[#0f172a]">L-J: 9-18 | V: 9-15</p></div></div>
              <a href="https://maps.google.com/?q=Calea+Domnească+234+Târgoviște" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#1e3a5f]" style={{ transition: 'border-color 0.15s ease' }}><div className="w-10 h-10 rounded-full bg-[#1e3a5f]/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-[#1e3a5f]" /></div><div className="text-left"><p className="text-xs text-[#64748b] uppercase tracking-wider">Adresă</p><p className="font-semibold text-[#0f172a]">Calea Domnească 234</p></div></a>
              <button onClick={() => setShowEmailModal(true)} className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#1e3a5f] text-left w-full" style={{ transition: 'border-color 0.15s ease' }}><div className="w-10 h-10 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center"><Mail className="w-5 h-5 text-[#8b5cf6]" /></div><div className="text-left"><p className="text-xs text-[#64748b] uppercase tracking-wider">Email</p><p className="font-semibold text-[#0f172a] text-sm">contact@doctorsuciu.ro</p></div></button>
              <a href="tel:+40770220110" className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#e2e8f0] hover:border-[#1e3a5f]" style={{ transition: 'border-color 0.15s ease' }}><div className="w-10 h-10 rounded-full bg-[#0891b2]/10 flex items-center justify-center"><Phone className="w-5 h-5 text-[#0891b2]" /></div><div className="text-left"><p className="text-xs text-[#64748b] uppercase tracking-wider">Telefon</p><p className="font-semibold text-[#0f172a]">0770 220 110</p></div></a>
            </div>
          </div>
        </div>
      </section>

      {showEmailModal && <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />}
    </div>
  );
};

export default ContactPage;
