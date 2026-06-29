'use client';

import { motion } from 'framer-motion';
import { FortuneCard as FortuneCardType } from '@/types';
import GlassCard from './GlassCard';

interface FortuneCardProps {
  fortune: FortuneCardType;
  index?: number;
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-[#6EE7B7]';
  if (score >= 65) return 'text-[#FCD34D]';
  return 'text-pink-300';
}

function getScoreLabel(score: number) {
  if (score >= 85) return '매우 좋음';
  if (score >= 75) return '좋음';
  if (score >= 65) return '보통';
  return '주의';
}

export default function FortuneCard({ fortune, index = 0 }: FortuneCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <GlassCard className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-sm font-medium text-white/60 bg-white/10 px-3 py-1 rounded-full">
            {fortune.category}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold ${getScoreColor(fortune.score)}`}>
              {fortune.score}
            </span>
            <span className="text-xs text-white/40">{getScoreLabel(fortune.score)}</span>
          </div>
        </div>

        <h3 className="text-base font-semibold text-white mb-2">{fortune.summary}</h3>
        <p className="text-sm text-white/60 leading-relaxed mb-3">{fortune.detail}</p>

        <div className="bg-white/5 rounded-2xl p-3">
          <span className="text-xs text-[#C4B5FD] font-medium">조언 · </span>
          <span className="text-xs text-white/60">{fortune.advice}</span>
        </div>
      </GlassCard>
    </motion.div>
  );
}
