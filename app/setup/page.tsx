'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { saveUserProfile } from '@/lib/utils';

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    gender: '',
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!form.name || !form.birthDate) return;
    saveUserProfile(form);
    router.push('/loading-analysis');
  };

  const inputClass = (field: string) =>
    `w-full bg-white/5 border rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all duration-200 ${
      focused === field
        ? 'border-[#C4B5FD]/50 bg-white/[0.08]'
        : 'border-white/10 placeholder-white/30'
    }`;

  return (
    <div className="relative min-h-screen bg-[#08090D] overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 bg-violet-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 bg-pink-500" />

      <div className="relative max-w-md mx-auto px-6 py-14">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-white/50 hover:text-white/80 mb-8 transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="text-sm">돌아가기</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/30 to-purple-600/30 border border-violet-500/20 flex items-center justify-center mb-4">
              <Sparkles size={20} className="text-[#C4B5FD]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">나의 정보 입력</h1>
            <p className="text-sm text-white/50">정확한 사주 분석을 위해 생년월일시가 필요합니다</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">이름 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                placeholder="이름을 입력하세요"
                className={inputClass('name')}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">생년월일 *</label>
              <input
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                onFocus={() => setFocused('birthDate')}
                onBlur={() => setFocused(null)}
                className={inputClass('birthDate')}
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">태어난 시간 (선택)</label>
              <select
                value={form.birthTime}
                onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                onFocus={() => setFocused('birthTime')}
                onBlur={() => setFocused(null)}
                className={inputClass('birthTime') + ' text-white/70'}
                style={{ colorScheme: 'dark' }}
              >
                <option value="">모르는 경우 선택하지 않아도 됩니다</option>
                <option value="자시">자시 (23:00 - 01:00)</option>
                <option value="축시">축시 (01:00 - 03:00)</option>
                <option value="인시">인시 (03:00 - 05:00)</option>
                <option value="묘시">묘시 (05:00 - 07:00)</option>
                <option value="진시">진시 (07:00 - 09:00)</option>
                <option value="사시">사시 (09:00 - 11:00)</option>
                <option value="오시">오시 (11:00 - 13:00)</option>
                <option value="미시">미시 (13:00 - 15:00)</option>
                <option value="신시">신시 (15:00 - 17:00)</option>
                <option value="유시">유시 (17:00 - 19:00)</option>
                <option value="술시">술시 (19:00 - 21:00)</option>
                <option value="해시">해시 (21:00 - 23:00)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-white/50 mb-2 block">성별</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'male', label: '남성' },
                  { value: 'female', label: '여성' },
                  { value: 'other', label: '선택 안함' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setForm({ ...form, gender: value })}
                    className={`py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                      form.gender === value
                        ? 'bg-[#C4B5FD]/20 border border-[#C4B5FD]/40 text-[#C4B5FD]'
                        : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/[0.08]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!form.name || !form.birthDate}
            className={`mt-8 w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 ${
              form.name && form.birthDate
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/20'
                : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            내 사주 분석하기 ✦
          </button>

          <p className="text-xs text-white/30 text-center mt-4">
            입력하신 정보는 기기에만 저장되며 외부로 전송되지 않습니다
          </p>
        </motion.div>
      </div>
    </div>
  );
}
