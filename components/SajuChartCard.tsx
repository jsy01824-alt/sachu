'use client';

import GlassCard from './GlassCard';

interface Pillar {
  pillar: string;
  heavenly: string;
  earthly: string;
  element: string;
  color: string;
}

interface SajuChartCardProps {
  pillars: Pillar[];
}

export default function SajuChartCard({ pillars }: SajuChartCardProps) {
  return (
    <GlassCard className="p-5">
      <h3 className="text-sm font-medium text-white/60 mb-4">사주팔자</h3>
      <div className="grid grid-cols-4 gap-3">
        {pillars.map((pillar) => (
          <div key={pillar.pillar} className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/40">{pillar.pillar}</span>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: `${pillar.color}20`, border: `1px solid ${pillar.color}40` }}
            >
              <span style={{ color: pillar.color }}>{pillar.heavenly}</span>
            </div>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: `${pillar.color}10`, border: `1px solid ${pillar.color}30` }}
            >
              <span style={{ color: `${pillar.color}CC` }}>{pillar.earthly}</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}>
              {pillar.element}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
