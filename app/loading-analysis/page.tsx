"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GradientOrb from "@/components/GradientOrb";

const MESSAGES = [
  "당신의 기운을 읽고 있어요",
  "사주와 오늘의 흐름을 연결하는 중…",
  "오행 에너지를 분석하고 있어요",
  "당신만의 운명 지도를 그리는 중…",
];

export default function LoadingPage() {
  const router = useRouter();
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIdx((i) => (i + 1) % MESSAGES.length);
    }, 900);

    const progInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 2;
      });
    }, 60);

    const redirect = setTimeout(() => router.push("/home"), 3400);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#08090D] flex flex-col items-center justify-center relative overflow-hidden">
      {/* BG glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        {/* Orb */}
        <div className="relative">
          {/* Spinning ring */}
          <div
            className="absolute inset-0 rounded-full animate-orb-rotate"
            style={{
              border: "1px solid transparent",
              background: "linear-gradient(#08090D, #08090D) padding-box, linear-gradient(135deg, rgba(196,181,253,0.4), transparent, rgba(249,168,212,0.4)) border-box",
            }}
          />
          <GradientOrb size="xl" />
        </div>

        {/* Element dots */}
        <div className="flex gap-3">
          {[
            { color: "#86EFAC", label: "목" },
            { color: "#FCA5A5", label: "화" },
            { color: "#FCD34D", label: "토" },
            { color: "#E5E7EB", label: "금" },
            { color: "#93C5FD", label: "수" },
          ].map((el, i) => (
            <div key={el.label} className="flex flex-col items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full animate-orb-pulse"
                style={{
                  background: el.color,
                  boxShadow: `0 0 8px ${el.color}`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
              <span className="text-[10px] text-white/40">{el.label}</span>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="h-8 flex items-center">
          <p
            key={msgIdx}
            className="text-base text-white/80 font-medium animate-fade-in"
          >
            {MESSAGES[msgIdx]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7C3AED, #EC4899)",
              boxShadow: "0 0 8px rgba(124,58,237,0.5)",
            }}
          />
        </div>

        <p className="text-xs text-white/25">shachu</p>
      </div>
    </div>
  );
}
