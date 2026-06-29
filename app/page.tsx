'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/lib/utils';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const profile = getUserProfile();
    if (profile) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#08090D] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#C4B5FD]/30 border-t-[#C4B5FD] animate-spin" />
    </div>
  );
}
