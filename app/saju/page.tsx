'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AppShell from '@/components/AppShell';
import GlassCard from '@/components/GlassCard';
import SajuChartCard from '@/components/SajuChartCard';
import ElementBarChart from '@/components/ElementBarChart';
import FortuneCard from '@/components/FortuneCard';
import { getUserProfile } from '@/lib/utils';
import { mockElements, mockFortuneCards, sajuPillars, personalityTraits } from '@/data/mockData';
import { FortuneCard as FortuneCardType } from '@/types';

const tabs = ['사주팔자', '오행', '성격', '직업', '재물', '연애', '건강'];

export default function SajuPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getUserProfile();
    if (!p) router.replace('/onboarding');
    else setProfile(p);
  }, [router]);

  if (!mounted || !profile) return null;

  const fortunes: Record<string, FortuneCardType> = {
    직업: mockFortuneCards[0],
    재물: mockFortuneCards[1],
    연애: mockFortuneCards[2],
    건강: mockFortuneCards[3],
  };

  return (
    <AppShell>
      <div className="pt-14 pb-4">
        <div className="px-4 mb-6">
          <h1 className="text-xl font-bold text-white">{profile.name}님의 사주</h1>
          <p className="text-xs text-white/40 mt-1">
            {profile.birthDate} · {profile.birthTime || '시간 미입력'}
          </p>
        </div>

        <div className="flex gap-2 px-4 overflow-x-auto scrollbar-hide mb-6 pb-1">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === i
                  ? 'bg-[#C4B5FD]/20 border border-[#C4B5FD]/40 text-[#C4B5FD]'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-4 space-y-4">
          {activeTab === 0 && (
            <motion.div key="sajupaljat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <SajuChartCard pillars={sajuPillars} />
              <GlassCard className="p-5">
                <h3 className="text-sm font-medium text-white/60 mb-3">나의 일주</h3>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-400">戊午</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">무오일주</p>
                    <p className="text-xs text-white/50 mt-1">땅 위의 태양, 강한 화(火) 에너지</p>
                    <p className="text-xs text-white/40 mt-1">열정적이고 리더십이 강한 성격</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div key="ohaeng" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <GlassCard className="p-5">
                <h3 className="text-sm font-medium text-white/60 mb-4">오행 분포</h3>
                <ElementBarChart elements={mockElements} />
              </GlassCard>
              <GlassCard className="p-5">
                <h3 className="text-sm font-medium text-white/60 mb-3">주요 오행 해석</h3>
                <div className="space-y-3">
                  {mockElements.map((el) => (
                    <div key={el.name} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ backgroundColor: `${el.color}20`, color: el.color }}>
                        {el.korean}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{el.meaning}</p>
                        <p className="text-xs text-white/40">{el.count}개 · {el.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div key="personality" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <GlassCard className="p-5">
                <h3 className="text-sm font-medium text-white/60 mb-4">성격 특성</h3>
                <div className="space-y-3">
                  {personalityTraits.map((trait, i) => (
                    <div key={trait.trait} className="flex items-center gap-3">
                      <span className="text-sm text-white/60 w-14">{trait.trait}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-[#C4B5FD]"
                          initial={{ width: 0 }}
                          animate={{ width: `${trait.score}%` }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-xs text-white/40 w-6">{trait.score}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <h3 className="text-sm font-medium text-white/60 mb-3">핵심 성격</h3>
                <div className="flex flex-wrap gap-2">
                  {['창의적', '열정적', '독립적', '직관력 높음', '리더십', '솔직함'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-xs bg-violet-500/15 border border-violet-500/20 text-[#C4B5FD]">
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {['직업', '재물', '연애', '건강'].map((cat, i) =>
            activeTab === i + 3 ? (
              <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <FortuneCard fortune={fortunes[cat]} />
              </motion.div>
            ) : null
          )}
        </div>
      </div>
    </AppShell>
  );
}
