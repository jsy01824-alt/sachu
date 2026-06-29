'use client';

import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

interface CompatibilityCardProps {
  score: number;
  summary: string;
  strengths: string[];
  cautions: string[];
  communication: string;
}

export default function CompatibilityCard({
  score,
  summary,
  strengths,
  cautions,
  communication,
}: CompatibilityCardProps) {
  const scoreColor = score >= 80 ? '#6EE7B7' : score >= 65 ? '#C4B5FD' : '#F9A8D4';
  const circumference = 2 * Math.PI * 40;

  return (
    <div className="space-y-4">
      <GlassCard className="p-6 text-center" glow>
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${circumference}`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - score / 100) }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{score}</span>
            <span className="text-xs text-white/40">/ 100</span>
          </div>
        </div>
        <h3 className="text-base font-semibold text-white">{summary}</h3>
      </GlassCard>

      <GlassCard className="p-4">
        <h4 className="text-xs font-medium text-[#6EE7B7] mb-3">잘 맞는 점</h4>
        <div className="space-y-2">
          {strengths.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] flex-shrink-0" />
              {s}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <h4 className="text-xs font-medium text-pink-300 mb-3">주의할 점</h4>
        <div className="space-y-2">
          {cautions.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-300 flex-shrink-0" />
              {c}
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <h4 className="text-xs font-medium text-[#C4B5FD] mb-2">소통 스타일</h4>
        <p className="text-sm text-white/70 leading-relaxed">{communication}</p>
      </GlassCard>
    </div>
  );
}
