'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Star, MessageCircle, Heart, BookOpen } from 'lucide-react';

const navItems = [
  { href: '/home', label: '오늘', icon: Home },
  { href: '/saju', label: '사주', icon: Star },
  { href: '/chat', label: '상담', icon: MessageCircle },
  { href: '/compatibility', label: '궁합', icon: Heart },
  { href: '/profile', label: '기록', icon: BookOpen },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
      <div className="mx-4 mb-4 glass-card px-2 py-3">
        <div className="flex items-center justify-around">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'text-[#C4B5FD]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
