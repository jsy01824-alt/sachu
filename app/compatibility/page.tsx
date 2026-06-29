'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import AppShell from '@/components/AppShell';
import GlassCard from '@/components/GlassCard';
import CompatibilityCard from '@/components/CompatibilityCard';
import { getUserProfile } from '@/lib/utils';

const mockCompatibility = {
  score: 81,
  summary: '서로를 성장시키는 이상적인 파트너',
  strengths: [
    '목(木)과 화(火)의 상생으로 서로를 키워주는 관계',
    '창의력과 열정이 시너지를 일으킵니다',
    '함께 있을 때 에너지가 상승하는 조합',
  ],
  cautions: [
    '금(金) 기운 차이로 의사결정 속도 충돌 가능',
    '너무 많은 에너지로 쉽게 지칠 수 있어요',
  ],
  communication: '직접적이고 솔직한 대화를 선호하지만, 상대방은 조용한 공감을 원할 수 있습니다. 서로의 표현 방식을 이해하고 맞춰가는 연습이 필요합니다.',
  elementOverlap: { person1: [], person2: [] },
};

export default function CompatibilityPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: '', birthDate: '', gender: '' });
  const [result, setResult] = useState<typeof mockCompatibility | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getUserProfile();
    if (!p) router.replace('/onboarding');
    else setProfile(p);
  }, [router]);

  const handleAnalyze = async () => {
    if (!form.name || !form.birthDate) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult(mockCompatibility);
    setLoading(false);
  };

  if (!mounted || !profile) return null;

  return (
    <AppShell>
      <div className="px-4 pt-14">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">궁합 분석</h1>
          <p className="text-xs text-white/40 mt-1">상대방의 정보를 입력해 궁합을 확인하세요</p>
        </div>

        <GlassCard className="p-4 mb-4">
          <p className="text-xs text-white/40 mb-2">나</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500/30 to-purple-600/30 border border-violet-500/20 flex items-center justify-center text-sm font-bold text-[#C4B5FD]">
              {profile.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{profile.name}</p>
              <p className="text-xs text-white/40">{profile.birthDate}</p>
            </div>
          </div>
        </GlassCard>

        <div className="flex items-center justify-center my-2 mb-4">
          <Heart size={20} className="text-pink-300/60" />
        </div>

        <GlassCard className="p-4 mb-6">
          <p className="text-xs text-white/40 mb-3">상대방</p>
          <div className="space-y-3">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="이름"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C4B5FD]/40 transition-all"
            />
            <input
              type="date"
              value={form.birthDate}
              onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C4B5FD]/40 transition-all"
              style={{ colorScheme: 'dark' }}
            />
            <div className="grid grid-cols-3 gap-2">
              {['male', 'female', 'other'].map((g) => (
                <button
                  key={g}
                  onClick={() => setForm({ ...form, gender: g })}
                  className={`py-2.5 rounded-xl text-xs font-medium transition-all ${
                    form.gender === g
                      ? 'bg-pink-300/15 border border-pink-300/30 text-pink-300'
                      : 'bg-white/5 border border-white/10 text-white/50'
                  }`}
                >
                  {g === 'male' ? '남성' : g === 'female' ? '여성' : '선택 안함'}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {!result ? (
          <button
            onClick={handleAnalyze}
            disabled={!form.name || !form.birthDate || loading}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-white transition-all duration-300 ${
              form.name && form.birthDate && !loading
                ? 'bg-gradient-to-r from-pink-500/60 to-rose-500/60 border border-pink-400/30 hover:from-pink-500/80 hover:to-rose-500/80'
                : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Heart size={16} />
                궁합 분석하기
              </>
            )}
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">분석 결과</h2>
                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  다시 입력
                </button>
              </div>
              <CompatibilityCard {...result} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </AppShell>
  );
}
