import { ReactNode } from 'react';
import BottomNav from './BottomNav';

interface AppShellProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function AppShell({ children, showNav = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#08090D] text-white">
      <div className="max-w-md mx-auto relative min-h-screen">
        <main className={`${showNav ? 'pb-28' : ''}`}>
          {children}
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
