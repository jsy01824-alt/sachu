import type { Metadata } from 'next';
import DinehillHome from '@/components/dinehill/DinehillHome';

export const metadata: Metadata = {
  title: 'GEN KOREAN BBQ | 젠코리안바베큐',
  description: 'GEN KOREAN BBQ · KAN SUSHI',
};

export default function DinehillPage() {
  return <DinehillHome />;
}
