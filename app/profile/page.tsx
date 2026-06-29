"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import { getUserProfile, clearUser } from "@/lib/utils";
import { Flame, BookOpen, MessageSquare, RotateCcw } from "lucide-react";

const DIARY_ENTRIES = [
  { date: "6월 28일", mood: "좋음", note: "오늘 AI 상담에서 이직 관련 조언을 받았다. 생각보다 맞는 부분이 많았다.", tag: "이직" },
  { date: "6월 25일", mood: "보통", note: "재물운이 좋지 않다고 해서 충동구매를 참았다. 오늘 좋은 선택이었다.", tag: "재물" },
  { date: "6월 21일", mood: "최고", note: "대운이 상승하는 시기라고 하니 마음이 편해졌다.", tag: "대운" },
];

const RECENT_CONSULTATIONS = [
  { question: "이직할까요?", date: "오늘", category: "커리어" },
  { question: "지금 투자해도 될까요?", date: "3일 전", category: "재물" },
  { question: "이 사람과 계속 만나도 될까요?", date: "1주일 전", category: "연애" },
];

const CONCERN_CATEGORIES = [
  { label: "커리어·이직", count: 12, color: "#C4B5FD" },
  { label: "연애·관계", count: 8, color: "#F9A8D4" },
  { label: "재물·투자", count: 6, color: "#FCD34D" },
  { label: "건강", count: 3, color: "#6EE7B7" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; birthDate: string } | null>(null);

  useEffect(() => {
    const u = getUserProfile();
    if (!u) { router.replace("/onboarding"); return; }
    setUser(u);
  }, [router]);

  const handleReset = () => {
    clearUser();
    router.replace("/onboarding");
  };

  if (!user) return null;

  return (
    <div className="relative min-h-screen bg-[#08090D] pb-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-violet-700/12 blur-3xl" />
      </div>

      <div className="relative z-10 pt-14 px-5">
        <div className="mb-6">
          <p className="text-xs tracking-[0.25em] text-violet-300/60 uppercase mb-1">기록</p>
          <h1 className="text-2xl font-bold text-white">{user.name}님의 기록</h1>
        </div>

        {/* Streak */}
        <GlassCard className="p-5 mb-5" glow>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-orange-400" />
              <p className="font-semibold text-white">체크인 스트릭</p>
            </div>
            <span className="text-2xl font-bold text-orange-400">7일</span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-2 rounded-full"
                style={{
                  background: i < 7 ? "#FB923C" : "rgba(255,255,255,0.08)",
                  boxShadow: i < 7 ? "0 0 4px rgba(251,146,60,0.5)" : "none",
                }}
              />
            ))}
          </div>
          <p className="text-xs text-white/40 mt-2">최근 14일 기록</p>
        </GlassCard>

        {/* Concern categories */}
        <GlassCard className="p-5 mb-4">
          <p className="text-xs text-white/40 mb-4">자주 묻는 고민</p>
          <div className="space-y-3">
            {CONCERN_CATEGORIES.map((c) => {
              const max = Math.max(...CONCERN_CATEGORIES.map((x) => x.count));
              return (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="text-xs text-white/60 w-24 flex-shrink-0">{c.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(c.count / max) * 100}%`,
                        background: c.color,
                        boxShadow: `0 0 6px ${c.color}60`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-white/40 w-4 text-right">{c.count}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>

        {/* Recent consultations */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={14} className="text-white/40" />
            <p className="text-xs text-white/40 uppercase tracking-widest">최근 상담</p>
          </div>
          <div className="space-y-2">
            {RECENT_CONSULTATIONS.map((c, i) => (
              <GlassCard key={i} className="p-4 flex items-center justify-between" onClick={() => router.push("/chat")}>
                <div>
                  <p className="text-sm text-white">{c.question}</p>
                  <p className="text-xs text-white/40 mt-0.5">{c.date}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/15 border border-violet-400/20 text-violet-300">
                  {c.category}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Diary */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-white/40" />
            <p className="text-xs text-white/40 uppercase tracking-widest">사주 일기</p>
          </div>
          <div className="space-y-2">
            {DIARY_ENTRIES.map((e, i) => (
              <GlassCard key={i} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-white/40">{e.date}</p>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/8 text-white/50 border border-white/10">
                    #{e.tag}
                  </span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{e.note}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full py-3.5 rounded-2xl text-sm text-white/40 flex items-center justify-center gap-2 glass-card border border-white/8 hover:border-white/15 transition-all"
        >
          <RotateCcw size={14} />
          사주 정보 초기화
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
