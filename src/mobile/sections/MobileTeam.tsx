import { useEffect, useMemo, useRef, useState, type TouchEvent } from 'react';
import { Stethoscope } from 'lucide-react';
import type { Doctor } from '../../admin/types';
import { usePublicDoctors } from '../../hooks/useSupabaseData';

const defaultDoctors: Doctor[] = [
  {
    id: 'dr-suciu',
    name: 'Dr. Sebastian Iacob Suciu',
    role: 'Fondator & Medic Stomatolog',
    image: '/team/dr-suciu.jpg',
    imageCrop: 'center 35%',
    description: 'Coordoneaza directia medicala a clinicii si planurile complexe de tratament.',
    tags: ['Implantologie', 'Ortodontie', 'Plan complex'],
    specialties: [],
    experience: '',
    education: '',
    order: 0,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 'dr-mitache',
    name: 'Dr. Vlad Mitache',
    role: 'Medic Specialist Protetica',
    image: '/team/dr-mitache.jpg',
    imageCrop: 'center 35%',
    description: 'Atent la detalii functionale si estetice pentru lucrari cu aspect natural.',
    tags: ['Protetica', 'Coroane', 'Fatete'],
    specialties: [],
    experience: '',
    education: '',
    order: 1,
    isActive: true,
    createdAt: '',
    updatedAt: '',
  },
];

export function MobileTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: supabaseDoctors } = usePublicDoctors();
  const touchStartX = useRef(0);

  const doctors = useMemo(() => {
    if (supabaseDoctors.length > 0) {
      return supabaseDoctors
        .filter((doctor) => doctor.is_active)
        .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
        .map((doctor) => ({
          id: doctor.id,
          name: doctor.name,
          role: doctor.role,
          image: doctor.image_url,
          imageCrop: doctor.image_crop || 'center 35%',
          description: doctor.description || 'Medic dedicat, cu focus pe confort si rezultat natural.',
          tags: (doctor.specialties || []).slice(0, 3),
          specialties: doctor.specialties || [],
          experience: '',
          education: '',
          order: doctor.order_index ?? 0,
          isActive: doctor.is_active,
          createdAt: doctor.created_at,
          updatedAt: doctor.updated_at,
        }));
    }

    return defaultDoctors;
  }, [supabaseDoctors]);

  useEffect(() => {
    if (activeIndex >= doctors.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, doctors.length]);

  const goTo = (index: number) => {
    const count = doctors.length;
    if (!count) return;
    setActiveIndex((index + count) % count);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.targetTouches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (doctors.length <= 1) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const distance = touchStartX.current - touchEndX;

    if (distance > 40) goTo(activeIndex + 1);
    if (distance < -40) goTo(activeIndex - 1);
  };

  return (
    <section id="medici" className="py-6" style={{ scrollMarginTop: '88px' }}>
      <div className="mx-auto max-w-[480px] px-5">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[22px] font-bold text-[#0B1E32] tracking-tight">Oameni care te asculta</h2>
          <p className="mt-1 text-[14px] leading-[1.5] text-slate-500">
            Medici cu experienta, comunicare buna si grija pentru confort.
          </p>
        </div>

        {/* Carousel */}
        <div 
          onTouchStart={handleTouchStart} 
          onTouchEnd={handleTouchEnd} 
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {doctors.map((doctor) => (
              <article key={doctor.id} className="w-full shrink-0">
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                      style={{ objectPosition: doctor.imageCrop || 'center 35%' }}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <Stethoscope className="h-8 w-8" />
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
                      {doctor.role}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-[18px] font-semibold text-slate-900">{doctor.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{doctor.description}</p>

                  {doctor.tags && doctor.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {doctor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[12px] text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {doctors.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex 
                  ? 'w-6 bg-[#0B1E32]' 
                  : 'w-2 bg-slate-300'
              }`}
              aria-label={`Membrul ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
