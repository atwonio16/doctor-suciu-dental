import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export const FloatingElement = ({
  children,
  className = '',
  amplitude = 15,
  duration = 3,
  delay = 0,
}: FloatingElementProps) => {
  return (
    <div
      className={className}
      style={{
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        ['--float-amplitude' as string]: `${amplitude}px`,
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(var(--float-amplitude, 15px));
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default FloatingElement;
