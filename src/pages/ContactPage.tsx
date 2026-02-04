import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
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
  'Consultație',
  'Implant dentar',
  'Albire dentară',
  'Fațete dentare',
  'Ortodonție',
  'Coroane dentare',
  'Alt serviciu',
];

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });

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
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      }, 5000);
    } catch {
      alert('Eroare la trimitere');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-28">
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Înapoi
          </Link>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="category-pill mb-4">CONTACT</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Hai să <span className="gradient-text">vorbim</span>
            </h1>
            <p className="text-slate-600">Suntem aici să te ajutăm</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 mb-1">
                  <Phone className="w-5 h-5 text-sky-500" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Telefon</span>
                </div>
                <a href="tel:+40770220110" className="text-lg font-semibold text-slate-900 hover:text-sky-500">0770 220 110</a>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 mb-1">
                  <Mail className="w-5 h-5 text-sky-500" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Email</span>
                </div>
                <a href="mailto:contact@doctorsuciu.ro" className="text-lg font-semibold text-slate-900 hover:text-sky-500">contact@doctorsuciu.ro</a>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 mb-1">
                  <MapPin className="w-5 h-5 text-sky-500" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Adresă</span>
                </div>
                <p className="text-lg font-semibold text-slate-900">Str. Calea Domnească 234, Târgoviște</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3 mb-1">
                  <Clock className="w-5 h-5 text-sky-500" />
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Program</span>
                </div>
                <p className="text-lg font-semibold text-slate-900">L-J: 09:00 - 18:00<br/>V: 09:00 - 15:00</p>
              </div>

              <div className="rounded-xl overflow-hidden h-48 bg-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11146.704852654434!2d25.4473!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sT%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                />
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-50 rounded-2xl p-6 lg:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Mulțumim!</h3>
                  <p className="text-slate-600">Te contactăm în curând.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nume *</label>
                      <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-11" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Telefon *</label>
                      <Input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="h-11" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                    <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="h-11" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Serviciu dorit</label>
                    <Select value={formData.service} onValueChange={v => setFormData({...formData, service: v})}>
                      <SelectTrigger className="h-11"><SelectValue placeholder="Alege un serviciu" /></SelectTrigger>
                      <SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Mesaj</label>
                    <Textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={4} />
                  </div>

                  <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isLoading ? 'Se trimite...' : 'TRIMITE'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
