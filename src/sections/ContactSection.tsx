import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FadeText } from '@/components/animations/FadeText';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzlmLFfxYhvS_6MRgeY1_hIG6jCgMX5ygOalhlpa6RxjVl3AZtPYc50ihpC6TmHMKDO5w/exec';

const services = [
  'Consultație',
  'Implant dentar',
  'Albire dentară',
  'Fațete dentare',
  'Ortodonție / Invisalign',
  'Coroane dentare',
  'Proteză dentară',
  'Alt serviciu',
];

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
      });

      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: '',
        });
      }, 5000);
    } catch (err) {
      setError('A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi telefonic.');
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="w-full py-20 lg:py-28 bg-white overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-sky-500 uppercase mb-3">
                Contact
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
                Programează-te acum
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Completează formularul și te contactăm în cel mai scurt timp
              </p>
            </FadeText>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              <FadeText delay={0.2} direction="right" distance={30}>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Adresă</p>
                      <a
                        href="https://maps.google.com/?q=Târgoviște"
                        className="text-slate-900 hover:text-sky-500 transition-colors"
                      >
                        Strada Calea Domnească, Nr. 234<br />
                        Târgoviște, Dâmbovița
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Telefon</p>
                      <a
                        href="tel:+40770220110"
                        className="text-slate-900 hover:text-sky-500 transition-colors font-medium"
                      >
                        0770 220 110
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Email</p>
                      <a
                        href="mailto:contact@doctorsuciu.ro"
                        className="text-slate-900 hover:text-sky-500 transition-colors"
                      >
                        contact@doctorsuciu.ro
                      </a>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Program</p>
                      <p className="text-slate-900">
                        Luni – Vineri: 09:00 – 18:00
                      </p>
                    </div>
                  </div>
                </div>
              </FadeText>

              {/* Map */}
              <FadeText delay={0.4} direction="up" distance={30}>
                <div className="rounded-2xl overflow-hidden h-64 lg:h-72 bg-slate-100">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11146.704852654434!2d25.4473!3d44.9311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b2c5e0f7c3b0e7%3A0x7e7c7e7c7e7c7e7c!2sT%C3%A2rgovi%C8%99te!5e0!3m2!1sro!2sro!4v1600000000000!5m2!1sro!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Locație Doctor Suciu Dental Clinic"
                  />
                </div>
              </FadeText>
            </div>

            {/* Form - Right Side */}
            <div className="lg:col-span-3">
              <FadeText delay={0.3} direction="left" distance={40}>
                <div className="bg-slate-50 rounded-3xl p-6 lg:p-10">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h4 className="font-bold text-2xl text-slate-900 mb-2">
                        Mulțumim!
                      </h4>
                      <p className="text-slate-600">
                        Am primit mesajul tău și te contactăm în curând.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nume complet *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Ion Popescu"
                            required
                            disabled={isLoading}
                            className="h-12 bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Telefon *
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Ex: 0770 220 110"
                            required
                            disabled={isLoading}
                            className="h-12 bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: ion@email.com"
                          disabled={isLoading}
                          className="h-12 bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Serviciu dorit
                        </label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, service: value }))
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="h-12 bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500">
                            <SelectValue placeholder="Selectează un serviciu" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Mesaj (opțional)
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Spune-ne cum te putem ajuta..."
                          rows={4}
                          disabled={isLoading}
                          className="bg-white border-slate-200 focus:border-sky-500 focus:ring-sky-500 resize-none"
                        />
                      </div>

                      {error && (
                        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold h-12"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Se trimite...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Trimite cererea
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-slate-500">
                        Prin trimiterea formularului, ești de acord cu{' '}
                        <a href="#" className="text-sky-500 hover:underline">
                          politica de confidențialitate
                        </a>
                        .
                      </p>
                    </form>
                  )}
                </div>
              </FadeText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
