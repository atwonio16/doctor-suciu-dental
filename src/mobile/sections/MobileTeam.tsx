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
    <section id="medici" className="mobile-safe-x py-4" aria-labelledby="mobile-team-title">
      <div className="mx-auto max-w-[560px]">
        <div className="mobile-panel p-4">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 id="mobile-team-title" className="mobile-title text-[23px]">Oameni care te asculta</h2>
              <p className="mobile-body mt-2 text-[13px]">
                Medici si asistenti cu experienta, comunicare buna si grija pentru confort.
              </p>
            </div>

            <p className="mobile-muted-chip shrink-0">
              Swipe
            </p>
          </div>

          <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="overflow-hidden" style={{ touchAction: 'pan-y' }}>
            <div
              className="mobile-carousel-track flex"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {doctors.map((doctor) => (
                <article key={doctor.id} className="w-full shrink-0">
                  <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-white">
                    <div className="relative h-72 overflow-hidden bg-slate-100">
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

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-4">
                        <div className="inline-flex items-center rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[11px] font-medium text-white">
                          {doctor.role}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-[18px] font-semibold leading-tight tracking-tight text-slate-900">
                        {doctor.name}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{doctor.description}</p>

                      {doctor.tags && doctor.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {doctor.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <div className="mobile-scrollbar-hide mobile-dot-nav overflow-x-auto">
              {doctors.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  data-active={index === activeIndex ? 'true' : 'false'}
                  aria-label={`Membrul ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
