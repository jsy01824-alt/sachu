'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayFortune } from '@/types';

interface CalendarViewProps {
  fortunes: DayFortune[];
  onSelectDay: (date: string) => void;
  selectedDate: string;
}

const typeColors: Record<string, string> = {
  great: 'bg-[#6EE7B7]',
  good: 'bg-[#C4B5FD]',
  neutral: 'bg-white/30',
  caution: 'bg-pink-300',
};

export default function CalendarView({ fortunes, onSelectDay, selectedDate }: CalendarViewProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const fortuneMap = fortunes.reduce<Record<string, DayFortune>>((acc, f) => {
    acc[f.date] = f;
    return acc;
  }, {});

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const monthStr = viewDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
          <ChevronLeft size={18} className="text-white/60" />
        </button>
        <span className="text-sm font-semibold text-white">{monthStr}</span>
        <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
          <ChevronRight size={18} className="text-white/60" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div key={d} className="text-center text-xs text-white/30 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const fortune = fortuneMap[dateStr];
          const isToday = dateStr === today.toISOString().split('T')[0];
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={day}
              onClick={() => onSelectDay(dateStr)}
              className={`relative flex flex-col items-center py-2 rounded-xl transition-all duration-200 ${
                isSelected ? 'bg-[#C4B5FD]/20 border border-[#C4B5FD]/30' : 'hover:bg-white/5'
              }`}
            >
              <span
                className={`text-xs ${
                  isToday
                    ? 'text-[#C4B5FD] font-bold'
                    : isSelected
                    ? 'text-white font-semibold'
                    : 'text-white/60'
                }`}
              >
                {day}
              </span>
              {fortune && (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${typeColors[fortune.type]}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
