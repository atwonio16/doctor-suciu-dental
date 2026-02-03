import { useState, ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  glowColor?: string;
  enableGlow?: boolean;
}

export const AnimatedCard = ({
  children,
  className = '',
  hoverScale = 1.02,
  hoverRotate = 0,
  glowColor = 'rgba(45, 212, 191, 0.3)',
  enableGlow = true,
}: AnimatedCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? `scale(${hoverScale}) ${hoverRotate ? `rotate(${hoverRotate}deg)` : ''}`
          : 'scale(1) rotate(0deg)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered && enableGlow
          ? `0 25px 50px -12px ${glowColor}, 0 0 ${isHovered ? '30px' : '0px'} ${glowColor}`
          : undefined,
      }}
    >
      {/* Spotlight effect */}
      {enableGlow && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor}, transparent 50%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default AnimatedCard;
