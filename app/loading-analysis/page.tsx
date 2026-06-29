'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GradientOrb from '@/components/GradientOrb';

const messages = [
  '당신의 기운을 읽고 있어요',
  '사주와 오늘의 흐름을 연결하는 중…',
  '오행의 균형을 분석하고 있어요',
  '당신만의 에너지 패턴을 찾는 중…',
  '분석이 거의 완료되었어요',
];

export default function LoadingAnalysisPage() {
  const router = useRouter();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 600);

    const timeout = setTimeout(() => {
      router.replace('/home');
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#08090D] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl animate-orb-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl animate-orb-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex flex-col items-center gap-10 max-w-sm mx-auto px-6 text-center">
        <div className="relative">
          <GradientOrb size="xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border border-[#C4B5FD]/10 animate-spin-slow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border border-pink-300/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '14s' }} />
          </div>
        </div>

        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-white/70 font-medium"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </div>

        <div className="flex gap-4">
          {['목', '화', '토', '금', '수'].map((el, i) => (
            <motion.div
              key={el}
              className="text-xs text-white/30 font-medium"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              {el}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
