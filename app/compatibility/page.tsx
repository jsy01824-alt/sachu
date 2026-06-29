"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import CompatibilityCard from "@/components/CompatibilityCard";
import { ArrowRight, Sparkles } from "lucide-react";

const TIME_OPTIONS = ["모름","자시","축시","인시","묘시","진시","사시","오시","미시","신시","유시","술시","해시"];

export default function CompatibilityPage() {
  const [form, setForm] = useState({ name: "", birthDate: "", birthTime: "", gender: "" });
  const [showResult, setShowResult] = useState(false);

  const analyze = () => {
    if (!form.name || !form.birthDate) return;
    setShowResult(true);
  };

  return (
    <div className="relative min-h-screen bg-[#08090D] pb-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-pink-700/12 blur-3xl" />
        <div className="absolute bottom-40 left-0 w-48 h-48 rounded-full bg-violet-700/8 blur-3xl" />
      </div>

      <div className="relative z-10 pt-14 px-5">
        <div className="mb-6">
          <p className="text-xs tracking-[0.25em] text-pink-300/60 uppercase mb-1">궁합</p>
          <h1 className="text-2xl font-bold text-white">두 사람의 에너지</h1>
          <p className="text-sm text-white/40 mt-1">상대방의 정보를 입력하면 궁합을 분석해드립니다</p>
        </div>

        {!showResult ? (
          <div className="space-y-5 animate-fade-in">
            {/* My card */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-sm">나</div>
                <p className="text-sm font-medium text-white/70">나의 정보</p>
              </div>
              <p className="text-xs text-white/40 mt-1">이미 입력된 사주 정보를 사용합니다</p>
            </GlassCard>

            <div className="flex justify-center">
              <ArrowRight size={16} className="text-white/30" />
            </div>

            {/* Partner card */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-sm">♡</div>
                <p className="text-sm font-medium text-white/70">상대방 정보</p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="이름"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setForm((f) => ({ ...f, birthDate: e.target.value }))}
                />
                <select
                  value={form.birthTime}
                  onChange={(e) => setForm((f) => ({ ...f, birthTime: e.target.value }))}
                >
                  <option value="">태어난 시간 (선택)</option>
                  {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="grid grid-cols-3 gap-2">
                  {["여성", "남성", "기타"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setForm((f) => ({ ...f, gender: g }))}
                      className={`py-2.5 rounded-2xl text-sm border transition-all ${
                        form.gender === g
                          ? "bg-pink-500/20 border-pink-400/40 text-pink-300"
                          : "glass border-white/10 text-white/50"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>

            <button
              onClick={analyze}
              disabled={!form.name || !form.birthDate}
              className="w-full py-4 rounded-3xl font-semibold text-white text-base flex items-center justify-center gap-2 disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                boxShadow: "0 8px 32px rgba(236,72,153,0.3)",
              }}
            >
              <Sparkles size={18} />
              궁합 분석하기
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-sm font-bold text-violet-300">나</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-px bg-white/20" />
                  <span className="text-pink-300 text-base">♡</span>
                  <div className="w-6 h-px bg-white/20" />
                </div>
                <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-sm font-bold text-pink-300">
                  {form.name[0]}
                </div>
              </div>
              <button
                onClick={() => setShowResult(false)}
                className="text-xs text-white/40 hover:text-white/70"
              >
                다시 입력
              </button>
            </div>

            <CompatibilityCard
              score={78}
              summary={`${form.name}님과의 에너지는 서로를 보완합니다. 목 에너지와 금 에너지는 처음엔 마찰이 있지만 시간이 지날수록 깊은 신뢰로 발전합니다.`}
              strengths={[
                "서로 다른 강점으로 상대방을 성장시킴",
                "함께할 때 더 큰 성과를 만들어내는 파트너십",
                "위기 상황에서 서로가 든든한 버팀목이 됨",
              ]}
              cautions={[
                "의사소통 방식이 달라 오해가 생길 수 있음",
                "우선순위가 달라 가끔 충돌 가능성",
              ]}
              communication="직접적인 표현보다는 서로의 감정을 먼저 공감해주는 방식이 효과적입니다. '나는 이렇게 느꼈어'로 시작하는 대화법을 추천합니다."
            />
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
