"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import CalendarView from "@/components/CalendarView";
import { generateCalendarFortunes } from "@/data/mockData";

const CATEGORIES = ["전체", "면접", "계약", "연애", "이사", "휴식"];

const FORTUNE_MSGS: Record<string, { title: string; desc: string }> = {
  great: { title: "최고의 날", desc: "에너지가 최고조에 달하는 날이에요. 중요한 결정이나 새로운 시작에 매우 좋습니다." },
  good: { title: "좋은 날", desc: "전반적으로 좋은 흐름이 이어집니다. 계획한 일을 차분히 진행하면 좋은 결과가 있을 거예요." },
  neutral: { title: "평온한 날", desc: "무리하지 않고 일상적인 흐름을 유지하세요. 쉬어가기 좋은 하루입니다." },
  caution: { title: "신중한 날", desc: "오늘은 조금 신중한 하루입니다. 중요한 결정은 내일로 미루는 게 좋을 수 있어요." },
};

const COLORS: Record<string, string> = {
  great: "#6EE7B7",
  good: "#C4B5FD",
  neutral: "rgba(255,255,255,0.3)",
  caution: "#F9A8D4",
};

export default function CalendarPage() {
  const today = new Date().toISOString().split("T")[0];
  const [selected, setSelected] = useState(today);
  const [category, setCategory] = useState("전체");
  const fortunes = generateCalendarFortunes();

  const selectedFortune = fortunes.find((f) => f.date === selected);

  return (
    <div className="relative min-h-screen bg-[#08090D] pb-28">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-teal-700/12 blur-3xl" />
      </div>

      <div className="relative z-10 pt-14 px-5">
        <div className="mb-6">
          <p className="text-xs tracking-[0.25em] text-mint-300/60 uppercase mb-1" style={{ color: "rgba(110,231,183,0.6)" }}>운세 캘린더</p>
          <h1 className="text-2xl font-bold text-white">좋은 날 찾기</h1>
        </div>

        {/* Category */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex-shrink-0 text-xs px-4 py-1.5 rounded-full border transition-all ${
                category === c
                  ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                  : "glass-card border-white/10 text-white/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4">
          {Object.entries(COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-[10px] text-white/40">
                {type === "great" ? "최고" : type === "good" ? "좋음" : type === "neutral" ? "평온" : "주의"}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar */}
        <GlassCard className="p-5 mb-4">
          <CalendarView
            fortunes={fortunes}
            onSelectDay={setSelected}
            selectedDate={selected}
          />
        </GlassCard>

        {/* Selected day detail */}
        {selectedFortune && (
          <GlassCard className="p-5 animate-fade-in" glow>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-white/40">
                  {new Date(selected + "T00:00:00").toLocaleDateString("ko-KR", {
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                  })}
                </p>
                <p className="font-semibold text-white mt-0.5">
                  {FORTUNE_MSGS[selectedFortune.type].title}
                </p>
              </div>
              <span
                className="text-2xl font-bold"
                style={{ color: COLORS[selectedFortune.type] }}
              >
                {selectedFortune.score}
              </span>
            </div>
            <p className="text-sm text-white/65 leading-relaxed">
              {FORTUNE_MSGS[selectedFortune.type].desc}
            </p>
            {selectedFortune.categories.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {selectedFortune.categories.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/8 border border-white/10 text-white/60"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </GlassCard>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
