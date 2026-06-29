'use client';

import { motion } from 'framer-motion';

interface GradientOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-80 h-80',
};

export default function GradientOrb({ size = 'lg', className = '' }: GradientOrbProps) {
  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 blur-3xl animate-orb-pulse" />

      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-600/40 via-purple-600/30 to-fuchsia-600/40 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-400/60 via-purple-400/50 to-pink-400/60"
        animate={{
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-4 h-4 rounded-full bg-[#6EE7B7]/80 blur-sm"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 10, 0],
          opacity: [0.8, 1, 0.6, 0.8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ top: '20%', left: '20%' }}
      />

      <motion.div
        className="absolute w-3 h-3 rounded-full bg-pink-300/80 blur-sm"
        animate={{
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0],
          opacity: [0.6, 1, 0.6, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{ bottom: '25%', right: '20%' }}
      />
    </div>
  );
}
