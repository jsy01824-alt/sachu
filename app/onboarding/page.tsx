'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import GradientOrb from '@/components/GradientOrb';

const slides = [
  {
    title: '사주를 보는 것이 아니라,',
    subtitle: '나를 이해하는 시간',
    description: '수천 년의 지혜와 AI가 만나 당신의 본질을 들여다봅니다',
    accentColor: '#C4B5FD',
  },
  {
    title: '당신의 사주와',
    subtitle: '고민을 AI가 기억합니다',
    description: '단순한 운세가 아닌, 당신의 맥락을 이해하는 깊은 대화',
    accentColor: '#F9A8D4',
  },
  {
    title: '오늘의 기운부터',
    subtitle: '인생의 선택까지 함께 물어보세요',
    description: '매일의 에너지부터 중요한 결정까지, 사주가 길을 비춥니다',
    accentColor: '#6EE7B7',
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push('/setup');
    }
  };

  const slide = slides[current];

  return (
    <div className="relative min-h-screen bg-[#08090D] flex flex-col overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{ background: `radial-gradient(circle, ${slide.accentColor}50, transparent)` }}
      />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ background: `radial-gradient(circle, ${slide.accentColor}30, transparent)` }}
      />

      <div className="relative flex flex-col min-h-screen max-w-md mx-auto w-full px-6">
        <div className="flex justify-end pt-14">
          <button
            onClick={() => router.push('/setup')}
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            건너뛰기
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <GradientOrb size="xl" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-white/60 mb-2">{slide.title}</p>
              <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{slide.subtitle}</h1>
              <p className="text-sm text-white/50 leading-relaxed mb-10">{slide.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2 mb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-white transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${slide.accentColor}40, ${slide.accentColor}20)`,
              border: `1px solid ${slide.accentColor}40`,
            }}
          >
            {current < slides.length - 1 ? '다음' : '시작하기'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
