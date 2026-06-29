import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = '', glow = false, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-3xl
        bg-white/5 border border-white/10
        backdrop-blur-xl
        ${glow ? 'shadow-[0_0_30px_rgba(196,181,253,0.15)]' : ''}
        ${onClick ? 'cursor-pointer hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
