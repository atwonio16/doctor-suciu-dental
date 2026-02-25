import { useRef, useEffect, useState, type ReactNode } from 'react';

interface FadeTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

export const FadeText = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  once = true,
  as: Component = 'div',
}: FadeTextProps) => {
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

  const getTransform = () => {
    if (direction === 'none') return 'none';
    const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
    const sign = direction === 'down' || direction === 'right' ? '' : '-';
    return `translate${axis}(${sign}${distance}px)`;
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getTransform(),
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    willChange: 'opacity, transform',
  };

  return (
    <Component
      ref={ref as any}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
};

export default FadeText;
