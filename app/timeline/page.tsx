"use client";

import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";

const DAEWUN = [
  { startAge: 3, endAge: 13, gan: "甲", ji: "子", theme: "배움과 기초", desc: "지식과 기초 역량을 다지는 시기", score: 72, isCurrent: false },
  { startAge: 13, endAge: 23, gan: "乙", ji: "丑", theme: "성장과 탐색", desc: "자신의 가능성을 넓히며 다양한 경험을 쌓는 시기", score: 78, isCurrent: false },
  { startAge: 23, endAge: 33, gan: "丙", ji: "寅", theme: "도전과 확장", desc: "사회적 기반을 다지고 커리어를 구축하는 활발한 시기", score: 88, isCurrent: true },
  { startAge: 33, endAge: 43, gan: "丁", ji: "卯", theme: "성숙과 수확", desc: "이전의 노력이 결실을 맺기 시작하는 시기", score: 92, isCurrent: false },
  { startAge: 43, endAge: 53, gan: "戊", ji: "辰", theme: "전환과 지혜", desc: "내면의 성숙이 깊어지고 새로운 방향을 모색하는 시기", score: 80, isCurrent: false },
  { startAge: 53, endAge: 63, gan: "己", ji: "巳", theme: "안정과 완성", desc: "삶의 균형을 찾고 주변과 조화를 이루는 시기", score: 75, isCurrent: false },
];

const MAX_SCORE = 92;

export default function TimelinePage() {
  return (
    <div className="relative min-h-screen bg-[#08090D] pb-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-violet-700/12 blur-3xl" />
        <div className="absolute bottom-40 left-0 w-48 h-48 rounded-full bg-pink-700/8 blur-3xl" />
      </div>

      <div className="relative z-10 pt-14 px-5">
        <div className="mb-6">
          <p className="text-xs tracking-[0.25em] text-violet-300/60 uppercase mb-1">대운·세운</p>
          <h1 className="text-2xl font-bold text-white">인생의 흐름</h1>
          <p className="text-sm text-white/40 mt-1">10년 단위 대운 타임라인</p>
        </div>

        {/* Graph */}
        <GlassCard className="p-5 mb-5">
          <p className="text-xs text-white/40 mb-4">에너지 흐름 그래프</p>
          <div className="relative h-24">
            <svg viewBox="0 0 320 80" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#C4B5FD" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
              </defs>

              {(() => {
                const points = DAEWUN.map((d, i) => {
                  const x = (i / (DAEWUN.length - 1)) * 300 + 10;
                  const y = 70 - ((d.score - 60) / (MAX_SCORE - 60)) * 60;
                  return { x, y };
                });

                const pathD = points.reduce((acc, p, i) => {
                  if (i === 0) return `M ${p.x} ${p.y}`;
                  const prev = points[i - 1];
                  const cpX = (prev.x + p.x) / 2;
                  return `${acc} C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
                }, "");

                const fillD = `${pathD} L ${points[points.length - 1].x} 75 L ${points[0].x} 75 Z`;

                return (
                  <>
                    <path d={fillD} fill="url(#fillGrad)" />
                    <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                    {points.map((p, i) => (
                      <circle
                        key={i}
                        cx={p.x} cy={p.y} r={DAEWUN[i].isCurrent ? 5 : 3}
                        fill={DAEWUN[i].isCurrent ? "#C4B5FD" : "rgba(255,255,255,0.4)"}
                        stroke={DAEWUN[i].isCurrent ? "white" : "none"}
                        strokeWidth="1.5"
                      />
                    ))}
                  </>
                );
              })()}
            </svg>

            {/* Age labels */}
            <div className="flex justify-between mt-1">
              {DAEWUN.map((d) => (
                <span key={d.startAge} className="text-[9px] text-white/30">{d.startAge}</span>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Current highlight */}
        {DAEWUN.filter((d) => d.isCurrent).map((d) => (
          <GlassCard key={d.startAge} className="p-5 mb-5" glow>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-orb-pulse" />
              <span className="text-xs text-violet-300 font-medium">현재 대운</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-2">
                <span className="text-2xl font-bold text-violet-300">{d.gan}</span>
                <span className="text-2xl font-bold text-violet-300/70">{d.ji}</span>
              </div>
              <div>
                <p className="font-semibold text-white">{d.theme}</p>
                <p className="text-xs text-white/50">{d.startAge}세 – {d.endAge}세</p>
              </div>
            </div>
            <p className="text-sm text-white/65 leading-relaxed">{d.desc}</p>
          </GlassCard>
        ))}

        {/* All periods */}
        <div className="space-y-3">
          <p className="text-xs text-white/40 uppercase tracking-widest">전체 대운</p>
          {DAEWUN.map((d, i) => (
            <GlassCard key={i} className={`p-4 ${d.isCurrent ? "border-violet-400/30" : ""}`}>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center w-10">
                  <span className="text-lg font-bold text-white/70">{d.gan}</span>
                  <span className="text-base font-bold text-white/40">{d.ji}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white">{d.theme}</p>
                    <span className="text-xs text-white/40">{d.startAge}–{d.endAge}세</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(d.score / MAX_SCORE) * 100}%`,
                        background: d.isCurrent
                          ? "linear-gradient(90deg, #7C3AED, #C4B5FD)"
                          : "rgba(255,255,255,0.2)",
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold text-white/50 w-8 text-right">{d.score}</span>
              </div>
            </GlassCard>
          ))}
        </div>

        <button
          className="mt-5 w-full py-4 rounded-3xl font-semibold text-white text-sm"
          style={{
            background: "linear-gradient(135deg, #7C3AED40, #EC489940)",
            border: "1px solid rgba(196,181,253,0.25)",
          }}
        >
          10년 흐름 자세히 보기
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
