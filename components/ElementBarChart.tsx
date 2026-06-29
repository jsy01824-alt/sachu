'use client';

import { motion } from 'framer-motion';
import { SajuElement } from '@/types';

interface ElementBarChartProps {
  elements: SajuElement[];
}

export default function ElementBarChart({ elements }: ElementBarChartProps) {
  return (
    <div className="space-y-3">
      {elements.map((element, index) => (
        <div key={element.name} className="flex items-center gap-3">
          <div className="w-8 text-sm font-semibold text-white/70">{element.korean}</div>
          <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: element.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(element.count / 8) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="w-8 text-sm text-white/50 text-right">{element.count}</div>
          <div className="w-16 text-xs text-white/40">{element.meaning}</div>
        </div>
      ))}
    </div>
  );
}
