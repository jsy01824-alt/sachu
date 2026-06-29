'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, Shield } from 'lucide-react';
import AppShell from '@/components/AppShell';
import GradientOrb from '@/components/GradientOrb';
import GlassCard from '@/components/GlassCard';
import { getUserProfile, getTodayKorean, getLuckyColor, getLuckyTime, getDailyFortune } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getUserProfile();
    if (!p) {
      router.replace('/onboarding');
    } else {
      setProfile(p);
    }
  }, [router]);

  if (!mounted || !profile) return null;

  const luckyColor = getLuckyColor();
  const luckyTime = getLuckyTime();
  const dailyFortune = getDailyFortune();

  return (
    <AppShell>
      <div className="px-4 pt-14">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm text-white/50 mb-1">{getTodayKorean()}</p>
          <h1 className="text-2xl font-bold text-white">
            안녕하세요, <span className="text-[#C4B5FD]">{profile.name}</span>님
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard glow className="p-6 mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-pink-900/20" />

            <div className="relative flex items-center gap-4 mb-4">
              <GradientOrb size="md" />
              <div>
                <p className="text-xs text-white/50 mb-1">오늘의 기운</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">78</span>
                  <span className="text-sm text-white/40">/ 100</span>
                </div>
                <p className="text-xs text-[#6EE7B7] mt-1">좋은 흐름</p>
              </div>
            </div>

            <p className="relative text-sm text-white/80 leading-relaxed">
              ✦ {dailyFortune}
            </p>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              icon: <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: luckyColor.hex, backgroundColor: `${luckyColor.hex}20` }} />,
              label: '행운의 색',
              value: luckyColor.name,
            },
            {
              icon: <Clock size={16} className="text-[#FCD34D]" />,
              label: '행운의 시간',
              value: luckyTime,
            },
            {
              icon: <Shield size={16} className="text-pink-300" />,
              label: '주의',
              value: '성급한 결정',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <GlassCard className="p-3 text-center">
                <div className="flex justify-center mb-2">{item.icon}</div>
                <p className="text-xs text-white/40 mb-1">{item.label}</p>
                <p className="text-xs font-semibold text-white">{item.value}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-white mb-4">오늘의 운세</h3>
            <div className="space-y-3">
              {[
                { label: '직업·성취', score: 82, color: '#6EE7B7' },
                { label: '재물', score: 65, color: '#FCD34D' },
                { label: '연애·관계', score: 76, color: '#F9A8D4' },
                { label: '건강', score: 71, color: '#93C5FD' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/50 w-16">{item.label}</span>
                  <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-white/40 w-6 text-right">{item.score}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.push('/chat')}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r from-violet-600/80 to-purple-600/80 border border-violet-500/30 hover:from-violet-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-violet-500/10"
        >
          <MessageCircle size={18} />
          AI에게 물어보기
        </motion.button>
      </div>
    </AppShell>
  );
}
