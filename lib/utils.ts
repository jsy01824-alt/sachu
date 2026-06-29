export function getUserProfile() {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('shachu_user');
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveUserProfile(profile: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('shachu_user', JSON.stringify(profile));
}

export function clearUserProfile() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('shachu_user');
}

export function getTodayKorean(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  return now.toLocaleDateString('ko-KR', options);
}

export function getLuckyColor(): { name: string; hex: string } {
  const colors = [
    { name: '라벤더', hex: '#C4B5FD' },
    { name: '민트', hex: '#6EE7B7' },
    { name: '소프트 핑크', hex: '#F9A8D4' },
    { name: '스카이 블루', hex: '#93C5FD' },
    { name: '골드', hex: '#FCD34D' },
  ];
  const day = new Date().getDay();
  return colors[day % colors.length];
}

export function getLuckyTime(): string {
  const times = ['오전 9-11시', '오후 2-4시', '오전 10-12시', '오후 3-5시', '오후 1-3시'];
  const day = new Date().getDay();
  return times[day % times.length];
}

export function getDailyFortune(): string {
  const fortunes = [
    '오늘은 오래된 인연이 다시 연결되는 날입니다',
    '새로운 아이디어가 빛을 발하는 하루입니다',
    '작은 친절이 큰 행운으로 돌아오는 날이에요',
    '직관을 믿으세요. 오늘만큼은 맞습니다',
    '뜻밖의 소식이 기쁨을 가져다줄 것입니다',
    '에너지가 충만한 날, 중요한 일을 시작하기 좋아요',
  ];
  const day = new Date().getDate();
  return fortunes[day % fortunes.length];
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Alias for compatibility
export const getUser = getUserProfile;
export const saveUser = saveUserProfile;
export const clearUser = clearUserProfile;
