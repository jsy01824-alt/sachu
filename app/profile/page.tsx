'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, Flame, BookOpen, TrendingUp } from 'lucide-react';
import AppShell from '@/components/AppShell';
import GlassCard from '@/components/GlassCard';
import { getUserProfile, clearUserProfile } from '@/lib/utils';

const recentConsultations = [
  { question: '이직할까요?', date: '3일 전', category: '직업' },
  { question: '이 사람과 계속 만나도 될까요?', date: '1주 전', category: '연애' },
  { question: '올해 해외에 나가도 될까요?', date: '2주 전', category: '기타' },
];

const frequentCategories = [
  { label: '직업·커리어', count: 8, color: '#6EE7B7' },
  { label: '연애·관계', count: 6, color: '#F9A8D4' },
  { label: '재물·투자', count: 4, color: '#FCD34D' },
  { label: '건강', count: 2, color: '#93C5FD' },
];

const diaryEntries = [
  { date: '오늘', content: '목(木) 기운이 강한 날. 새 아이디어가 떠올랐다.', mood: '✦' },
  { date: '어제', content: '수(水) 에너지 주의 - 감정 기복이 있었지만 잘 넘겼다.', mood: '◐' },
  { date: '3일 전', content: '화(火) 기운으로 활발했던 하루. 좋은 만남이 있었다.', mood: '◉' },
];

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getUserProfile();
    if (!p) router.replace('/onboarding');
    else setProfile(p);
  }, [router]);

  const handleLogout = () => {
    clearUserProfile();
    router.replace('/onboarding');
  };

  if (!mounted || !profile) return null;

  return (
    <AppShell>
      <div className="px-4 pt-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-violet-500/40 to-purple-600/40 border border-violet-500/20 flex items-center justify-center text-xl font-bold text-[#C4B5FD]">
              {profile.name[0]}
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{profile.name}님</h1>
              <p className="text-xs text-white/40">{profile.birthDate}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
          >
            <LogOut size={18} />
          </button>
        </div>

        <GlassCard className="p-5 mb-4" glow>
          <div className="flex items-center gap-3 mb-3">
            <Flame size={18} className="text-orange-400" />
            <h3 className="text-sm font-semibold text-white">연속 체크인</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-orange-400">7</span>
            <span className="text-sm text-white/40">일 연속</span>
          </div>
          <div className="flex gap-1.5 mt-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-2 rounded-full bg-orange-400/60"
              />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[#C4B5FD]" />
            <h3 className="text-sm font-semibold text-white">자주 물어보는 주제</h3>
          </div>
          <div className="space-y-2.5">
            {frequentCategories.map((cat) => {
              const maxCount = frequentCategories[0].count;
              return (
                <div key={cat.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/50 w-20">{cat.label}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-1.5">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <span className="text-xs text-white/30 w-6 text-right">{cat.count}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-[#6EE7B7]" />
            <h3 className="text-sm font-semibold text-white">최근 상담 기록</h3>
          </div>
          <div className="space-y-3">
            {recentConsultations.map((c, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 flex-shrink-0">
                  {c.category}
                </span>
                <p className="text-sm text-white/70 flex-1 truncate">{c.question}</p>
                <span className="text-xs text-white/30 flex-shrink-0">{c.date}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 mb-4">
          <h3 className="text-sm font-semibold text-white mb-4">사주 다이어리</h3>
          <div className="space-y-3">
            {diaryEntries.map((entry, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm flex-shrink-0">
                  {entry.mood}
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">{entry.date}</p>
                  <p className="text-sm text-white/70 leading-relaxed">{entry.content}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
