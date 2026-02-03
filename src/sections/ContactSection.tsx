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
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { AnimatedCard } from '@/components/animations/AnimatedCard';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyfKxwckZ2PVurCuCupOmVpeI8NzcqHYyhym3BfaD8UpL8JhluFkKGkPK4nqpr7ao76CA/exec';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adresă',
    value: 'Strada Calea Domnească, Nr. 234, Târgoviște, Dâmbovița',
    href: 'https://maps.google.com/?q=Târgoviște',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '0770 220 110',
    href: 'tel:+40770220110',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@doctorsuciu.ro',
    href: 'mailto:contact@doctorsuciu.ro',
  },
  {
    icon: Clock,
    label: 'Program',
    value: 'Luni – Vineri: 09:00 – 18:00',
    href: null,
  },
];

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
        mode: 'no-cors', // Required for Google Apps Script
      });

      // Since we're using no-cors, we can't check response.ok
      // But the request should have been sent
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
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
    <section id="contact" className="w-full py-20 lg:py-28 bg-clinic-gray-bg overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <FadeText delay={0} direction="up">
              <span className="inline-block text-sm font-semibold tracking-wider text-clinic-teal uppercase mb-3">
                Contact
              </span>
            </FadeText>
            <FadeText delay={0.1} direction="up" distance={40}>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl lg:text-5xl text-clinic-navy mb-4">
                Programează-te <span className="text-clinic-teal">acum</span>
              </h2>
            </FadeText>
            <FadeText delay={0.2} direction="up">
              <p className="text-lg text-clinic-gray max-w-2xl mx-auto">
                Completează formularul și te contactăm în cel mai scurt timp pentru 
                a confirma programarea.
              </p>
            </FadeText>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Info */}
            <div>
              <FadeText delay={0.2} direction="right" distance={30}>
                <h3 className="font-serif font-medium text-xl text-clinic-navy mb-6">
                  Date de contact
                </h3>
              </FadeText>

              {/* Info Cards */}
              <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.1} initialDelay={0.3}>
                {contactInfo.map((item) => (
                  <AnimatedCard
                    key={item.label}
                    hoverScale={1.02}
                    enableGlow={false}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-card hover:shadow-float transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-clinic-navy flex items-center justify-center flex-shrink-0 group-hover:bg-clinic-teal transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-clinic-gray mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-clinic-navy hover:text-clinic-teal transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-clinic-navy">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </AnimatedCard>
                ))}
              </StaggerContainer>

              {/* Map */}
              <FadeText delay={0.6} direction="up" distance={30}>
                <div className="rounded-2xl overflow-hidden shadow-float h-64 lg:h-80 bg-gray-100 hover:shadow-2xl transition-shadow duration-500">
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

            {/* Form */}
            <div>
              <FadeText delay={0.3} direction="left" distance={30}>
                <h3 className="font-serif font-medium text-xl text-clinic-navy mb-6">
                  Formular de programare
                </h3>
              </FadeText>

              <FadeText delay={0.4} direction="left" distance={40}>
                <div className="p-6 lg:p-8 rounded-2xl bg-white shadow-float hover:shadow-2xl transition-shadow duration-500">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-20 h-20 rounded-full bg-clinic-teal/10 flex items-center justify-center mb-6 animate-bounce">
                        <CheckCircle className="w-10 h-10 text-clinic-teal" />
                      </div>
                      <h4 className="font-serif font-medium text-2xl text-clinic-navy mb-2">
                        Mulțumim!
                      </h4>
                      <p className="text-clinic-gray mb-4">
                        Am primit mesajul tău și te contactăm în curând.
                      </p>
                      <p className="text-sm text-clinic-teal">
                        Verifică email-ul pentru confirmare (dacă ai completat adresa).
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="group">
                          <label className="block text-sm font-medium text-clinic-navy mb-2 transition-colors group-focus-within:text-clinic-teal">
                            Nume complet *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Ion Popescu"
                            required
                            disabled={isLoading}
                            className="h-12 transition-all duration-300 focus:ring-2 focus:ring-clinic-teal/20 disabled:opacity-50"
                          />
                        </div>
                        <div className="group">
                          <label className="block text-sm font-medium text-clinic-navy mb-2 transition-colors group-focus-within:text-clinic-teal">
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
                            className="h-12 transition-all duration-300 focus:ring-2 focus:ring-clinic-teal/20 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-clinic-navy mb-2 transition-colors group-focus-within:text-clinic-teal">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Ex: ion@email.com"
                          disabled={isLoading}
                          className="h-12 transition-all duration-300 focus:ring-2 focus:ring-clinic-teal/20 disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-clinic-navy mb-2">
                          Serviciu dorit
                        </label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, service: value }))
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="h-12 transition-all duration-300 focus:ring-2 focus:ring-clinic-teal/20 disabled:opacity-50">
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

                      <div className="group">
                        <label className="block text-sm font-medium text-clinic-navy mb-2 transition-colors group-focus-within:text-clinic-teal">
                          Mesaj (opțional)
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Spune-ne cum te putem ajuta..."
                          rows={4}
                          disabled={isLoading}
                          className="resize-none transition-all duration-300 focus:ring-2 focus:ring-clinic-teal/20 disabled:opacity-50"
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
                        className="w-full bg-clinic-navy hover:bg-clinic-navy-light text-white font-semibold h-14 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Se trimite...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                            Trimite cererea
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-clinic-gray">
                        Prin trimiterea formularului, ești de acord cu{' '}
                        <a href="#" className="text-clinic-teal hover:underline transition-colors hover:text-clinic-navy">
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
