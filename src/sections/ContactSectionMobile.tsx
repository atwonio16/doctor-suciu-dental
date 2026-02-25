import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, ArrowRight } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Telefon',
    value: '0770 220 110',
    action: 'tel:+40770220110',
  },
  {
    icon: MapPin,
    label: 'Adresă',
    value: 'Str. Alexandru Ioan Cuza 15, Târgoviște',
    action: 'https://maps.google.com/?q=Doctor+Suciu+Dental+Clinic+Targoviste',
  },
  {
    icon: Clock,
    label: 'Program',
    value: 'L-V: 09:00 - 18:00',
    action: null,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@doctorsuciu.ro',
    action: 'mailto:contact@doctorsuciu.ro',
  },
];

const ContactSectionMobile = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', phone: '', message: '' });
      alert('Mulțumim! Vă contactăm în curând.');
    }, 1000);
  };

  return (
    <section className="py-10 bg-white lg:hidden">
      {/* Header */}
      <div className="px-5 mb-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          Contact
        </p>
        <h2 className="text-2xl font-bold text-gray-900">
          Hai să ne cunoaștem
        </h2>
      </div>

      {/* Contact Cards - Simplified */}
      <div className="px-5 space-y-2 mb-6">
        {contactInfo.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-[#1e3a5f]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
              <p className="text-sm font-medium text-gray-900 truncate">{item.value}</p>
            </div>
            {item.action && (
              <a
                href={item.action}
                className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Quick Form */}
      <div className="px-5">
        <div className="bg-slate-50 rounded-xl p-5">
          <h3 className="font-semibold text-base text-gray-900 mb-4">
            Solicită o programare
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Numele tău
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ex: Maria Popescu"
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1e3a5f] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="ex: 0770 220 110"
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1e3a5f] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Mesaj (opțional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Cu ce te putem ajuta?"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#1e3a5f] transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#1e3a5f] text-white font-semibold rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
            >
              {isSubmitting ? 'Se trimite...' : 'Trimite solicitarea'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionMobile;
