'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AppShell from '@/components/AppShell';
import GlassCard from '@/components/GlassCard';
import { getUserProfile } from '@/lib/utils';
import { mockDaeWun } from '@/data/mockData';

const elementColors: Record<string, string> = {
  수: '#93C5FD',
  목: '#6EE7B7',
  화: '#FB923C',
  토: '#FCD34D',
  금: '#E2E8F0',
};

const energyLabels: Record<string, { label: string; color: string }> = {
  rising: { label: '상승', color: '#6EE7B7' },
  peak: { label: '최고', color: '#FCD34D' },
  stable: { label: '안정', color: '#C4B5FD' },
  falling: { label: '하강', color: '#F9A8D4' },
};

export default function TimelinePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getUserProfile();
    if (!p) router.replace('/onboarding');
    else setProfile(p);
  }, [router]);

  if (!mounted || !profile) return null;

  const birthYear = profile.birthDate ? parseInt(profile.birthDate.split('-')[0]) : 1995;
  const currentAge = new Date().getFullYear() - birthYear;
  const currentDaeWun = mockDaeWun.find(d => currentAge >= d.startAge && currentAge < d.endAge);

  return (
    <AppShell>
      <div className="px-4 pt-14">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">10년 대운</h1>
          <p className="text-xs text-white/40 mt-1">인생의 큰 흐름을 확인하세요</p>
        </div>

        {currentDaeWun && (
          <GlassCard glow className="p-5 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-purple-900/20" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#C4B5FD]/20 text-[#C4B5FD] border border-[#C4B5FD]/20">현재 대운</span>
                <span className="text-xs text-white/40">{currentDaeWun.startAge}~{currentDaeWun.endAge}세</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{currentDaeWun.summary}</h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex gap-2">
                  <span className="text-sm font-bold px-3 py-1.5 rounded-xl"
                    style={{ backgroundColor: `${elementColors[currentDaeWun.element]}20`, color: elementColors[currentDaeWun.element] }}>
                    {currentDaeWun.heavenlyStem}
                  </span>
                  <span className="text-sm font-bold px-3 py-1.5 rounded-xl"
                    style={{ backgroundColor: `${elementColors[currentDaeWun.element]}10`, color: `${elementColors[currentDaeWun.element]}CC` }}>
                    {currentDaeWun.earthlyBranch}
                  </span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${energyLabels[currentDaeWun.energy].color}15`, color: energyLabels[currentDaeWun.energy].color }}>
                  {energyLabels[currentDaeWun.energy].label}기
                </span>
              </div>
            </div>
          </GlassCard>
        )}

        <GlassCard className="p-5 mb-6">
          <h3 className="text-sm font-medium text-white/60 mb-4">인생 흐름 그래프</h3>
          <div className="relative h-20">
            <svg viewBox="0 0 300 60" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="30%" stopColor="#6EE7B7" />
                  <stop offset="50%" stopColor="#FCD34D" />
                  <stop offset="70%" stopColor="#C4B5FD" />
                  <stop offset="100%" stopColor="#F9A8D4" />
                </linearGradient>
              </defs>
              <path
                d="M0 50 C20 45, 40 30, 75 20 C100 12, 130 8, 150 5 C170 8, 200 15, 225 22 C250 28, 275 35, 300 40 L300 60 L0 60 Z"
                fill="url(#lineGrad)"
                fillOpacity="0.1"
              />
              <path
                d="M0 50 C20 45, 40 30, 75 20 C100 12, 130 8, 150 5 C170 8, 200 15, 225 22 C250 28, 275 35, 300 40"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="150" cy="5" r="4" fill="#FCD34D" />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
              {mockDaeWun.slice(0, 4).map((d) => (
                <span key={d.startAge} className="text-xs text-white/30">{d.startAge}</span>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="space-y-3">
          {mockDaeWun.map((daeWun, i) => {
            const isCurrent = currentAge >= daeWun.startAge && currentAge < daeWun.endAge;
            const color = elementColors[daeWun.element] || '#C4B5FD';

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <GlassCard className={`p-4 ${isCurrent ? 'border-[#C4B5FD]/30' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                      <span className="text-xs font-bold" style={{ color }}>{daeWun.heavenlyStem}</span>
                      <span className="text-xs" style={{ color: `${color}80` }}>{daeWun.earthlyBranch}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/40">{daeWun.startAge}~{daeWun.endAge}세</span>
                        {isCurrent && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#C4B5FD]/15 text-[#C4B5FD] border border-[#C4B5FD]/20">현재</span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-white truncate">{daeWun.summary}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-bold" style={{ color }}>{daeWun.score}</span>
                      <p className="text-xs text-white/30">{energyLabels[daeWun.energy].label}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
