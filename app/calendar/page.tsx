'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from '@/components/AppShell';
import GlassCard from '@/components/GlassCard';
import CalendarView from '@/components/CalendarView';
import { getUserProfile } from '@/lib/utils';
import { generateCalendarFortunes } from '@/data/mockData';

const categories = ['전체', '면접', '계약', '연애', '이사', '휴식'];

const fortuneMessages: Record<string, string[]> = {
  great: ['매우 좋은 날입니다. 중요한 결정을 내리기 좋아요', '모든 일이 순조롭게 풀리는 최상의 기운'],
  good: ['전반적으로 좋은 에너지가 흐르는 날', '활발한 활동과 만남에 적합한 날'],
  neutral: ['평범하지만 꾸준히 나아가기 좋은 날', '작은 것에 집중하며 기반을 다지는 날'],
  caution: ['에너지가 약해 중요한 결정은 미루는 것이 좋아요', '휴식과 재충전에 집중하세요'],
};

export default function CalendarPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [fortunes] = useState(generateCalendarFortunes);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeCategory, setActiveCategory] = useState('전체');

  useEffect(() => {
    setMounted(true);
    const p = getUserProfile();
    if (!p) router.replace('/onboarding');
    else setProfile(p);
  }, [router]);

  if (!mounted || !profile) return null;

  const selectedFortune = fortunes.find((f) => f.date === selectedDate);

  return (
    <AppShell>
      <div className="px-4 pt-14">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">운세 달력</h1>
          <p className="text-xs text-white/40 mt-1">날짜별 기운을 확인하세요</p>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#C4B5FD]/20 border border-[#C4B5FD]/30 text-[#C4B5FD]'
                  : 'bg-white/5 border border-white/10 text-white/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <GlassCard className="p-5 mb-4">
          <CalendarView
            fortunes={fortunes}
            selectedDate={selectedDate}
            onSelectDay={setSelectedDate}
          />
        </GlassCard>

        <div className="flex gap-4 mb-4 justify-center">
          {[
            { type: 'great', label: '최고', color: 'bg-[#6EE7B7]' },
            { type: 'good', label: '좋음', color: 'bg-[#C4B5FD]' },
            { type: 'neutral', label: '보통', color: 'bg-white/30' },
            { type: 'caution', label: '주의', color: 'bg-pink-300' },
          ].map(({ type, label, color }) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-xs text-white/40">{label}</span>
            </div>
          ))}
        </div>

        {selectedFortune && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDate}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">{selectedDate}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedFortune.type === 'great' ? 'bg-[#6EE7B7]/15 text-[#6EE7B7]' :
                    selectedFortune.type === 'good' ? 'bg-[#C4B5FD]/15 text-[#C4B5FD]' :
                    selectedFortune.type === 'caution' ? 'bg-pink-300/15 text-pink-300' :
                    'bg-white/10 text-white/50'
                  }`}>
                    {selectedFortune.type === 'great' ? '최고' : selectedFortune.type === 'good' ? '좋음' : selectedFortune.type === 'caution' ? '주의' : '보통'}
                  </span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {fortuneMessages[selectedFortune.type][0]}
                </p>
                {selectedFortune.categories.length > 0 && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {selectedFortune.categories.map((cat) => (
                      <span key={cat} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                        {cat}에 좋은 날
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </AppShell>
  );
}
