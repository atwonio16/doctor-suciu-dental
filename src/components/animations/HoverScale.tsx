import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
  shadow?: boolean;
}

export function HoverScale({
  children,
  scale = 1.02,
  className = '',
  shadow = true,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        boxShadow: shadow
          ? '0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 10px 20px -10px rgba(0, 0, 0, 0.1)'
          : undefined,
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default HoverScale;
