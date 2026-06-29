'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import ChatInterface from '@/components/ChatInterface';
import { getUserProfile } from '@/lib/utils';

export default function ChatPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = getUserProfile();
    if (!p) {
      router.replace('/onboarding');
    } else {
      setProfile(p);
    }
  }, [router]);

  if (!mounted || !profile) return null;

  return (
    <AppShell>
      <div className="flex flex-col" style={{ height: 'calc(100vh - 7rem)' }}>
        <div className="px-4 pt-14 pb-4 border-b border-white/5">
          <h1 className="text-xl font-bold text-white">AI 상담</h1>
          <p className="text-xs text-white/40 mt-1">사주를 기반으로 고민을 풀어드립니다</p>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden py-4">
          <ChatInterface userName={profile.name} />
        </div>
      </div>
    </AppShell>
  );
}
