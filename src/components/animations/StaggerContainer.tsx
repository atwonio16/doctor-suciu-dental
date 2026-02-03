import { useRef, useEffect, useState, ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
}

export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0,
  once = true,
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [once]);

  // Clone children with stagger delay
  const childrenWithDelay = Array.isArray(children)
    ? children.map((child, index) => {
        if (!child) return null;
        return (
          <div
            key={index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.6s ease-out ${initialDelay + index * staggerDelay}s, transform 0.6s ease-out ${initialDelay + index * staggerDelay}s`,
              willChange: 'opacity, transform',
            }}
          >
            {child}
          </div>
        );
      })
    : children;

  return (
    <div ref={ref} className={className}>
      {childrenWithDelay}
    </div>
  );
};

export default StaggerContainer;
