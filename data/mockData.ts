import { SajuElement, FortuneCard, DayFortune, DaeWun } from '@/types';

export const mockElements: SajuElement[] = [
  { name: 'wood', korean: '목', count: 3, color: '#6EE7B7', meaning: '성장과 도전' },
  { name: 'fire', korean: '화', count: 2, color: '#FB923C', meaning: '표현과 열정' },
  { name: 'earth', korean: '토', count: 1, color: '#FCD34D', meaning: '안정과 신뢰' },
  { name: 'metal', korean: '금', count: 1, color: '#E2E8F0', meaning: '정리와 결단' },
  { name: 'water', korean: '수', count: 1, color: '#93C5FD', meaning: '감정과 지혜' },
];

export const mockFortuneCards: FortuneCard[] = [
  {
    category: '직업',
    score: 82,
    summary: '새로운 기회가 열리는 시기',
    detail: '목(木) 기운이 강해 창의적인 분야에서 두각을 나타낼 수 있습니다. 기획, 창작, 교육 분야가 특히 잘 맞습니다.',
    advice: '지금은 새 프로젝트를 시작하기 좋은 때입니다. 단, 계획을 충분히 세운 후 실행하세요.',
  },
  {
    category: '재물',
    score: 68,
    summary: '수입보다 지출을 주의해야 할 때',
    detail: '금(金) 기운이 약해 재물 관리에 세심함이 필요합니다. 투자보다는 저축에 집중하세요.',
    advice: '충동 구매를 피하고, 작은 수입원을 꾸준히 만들어가는 것이 좋습니다.',
  },
  {
    category: '연애',
    score: 76,
    summary: '감정 표현이 관계를 풍요롭게 합니다',
    detail: '화(火) 기운이 적당해 감정 표현이 자연스러워지는 시기입니다. 새로운 만남의 가능성이 있습니다.',
    advice: '솔직한 감정 표현이 오히려 상대방에게 매력으로 다가갑니다.',
  },
  {
    category: '건강',
    score: 71,
    summary: '수면과 소화 관리에 집중하세요',
    detail: '수(水) 기운이 약해 피로가 빨리 쌓일 수 있습니다. 충분한 수분 섭취와 규칙적인 수면이 중요합니다.',
    advice: '밤 11시 이전 취침, 하루 8컵 이상의 물 섭취를 목표로 하세요.',
  },
];

export const mockDaeWun: DaeWun[] = [
  { startAge: 3, endAge: 13, heavenlyStem: '甲', earthlyBranch: '子', element: '수', energy: 'rising', summary: '호기심과 학습의 시기', score: 72 },
  { startAge: 13, endAge: 23, heavenlyStem: '乙', earthlyBranch: '丑', element: '목', energy: 'rising', summary: '성장과 자기발견', score: 78 },
  { startAge: 23, endAge: 33, heavenlyStem: '丙', earthlyBranch: '寅', element: '화', energy: 'peak', summary: '열정과 도전의 전성기', score: 88 },
  { startAge: 33, endAge: 43, heavenlyStem: '丁', earthlyBranch: '卯', element: '목', energy: 'peak', summary: '커리어 황금기', score: 92 },
  { startAge: 43, endAge: 53, heavenlyStem: '戊', earthlyBranch: '辰', element: '토', energy: 'stable', summary: '안정과 성숙', score: 85 },
  { startAge: 53, endAge: 63, heavenlyStem: '己', earthlyBranch: '巳', element: '화', energy: 'stable', summary: '지혜와 여유', score: 80 },
  { startAge: 63, endAge: 73, heavenlyStem: '庚', earthlyBranch: '午', element: '금', energy: 'falling', summary: '정리와 전달', score: 73 },
  { startAge: 73, endAge: 83, heavenlyStem: '辛', earthlyBranch: '未', element: '토', energy: 'falling', summary: '가족과 함께하는 시간', score: 70 },
];

export const generateCalendarFortunes = (): DayFortune[] => {
  const fortunes: DayFortune[] = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const categoryOptions = ['면접', '계약', '연애', '이사', '휴식'];

  for (let i = 1; i <= daysInMonth; i++) {
    const score = Math.floor(Math.random() * 40) + 60;
    const type: 'great' | 'good' | 'neutral' | 'caution' = score >= 90 ? 'great' : score >= 75 ? 'good' : score >= 65 ? 'neutral' : 'caution';
    const numCategories = Math.floor(Math.random() * 3) + 1;
    const categories = [...categoryOptions].sort(() => 0.5 - Math.random()).slice(0, numCategories);

    fortunes.push({
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      score,
      type,
      categories,
    });
  }

  return fortunes;
};

export const mockChatResponses: Record<string, string> = {
  '이직할까요?': '당신의 사주에서 목(木) 기운이 강하게 작용하고 있어 변화와 성장을 원하는 마음이 자연스럽습니다. 올해 하반기, 특히 8월~10월 사이에 새로운 기회가 찾아올 가능성이 높습니다. 단, 이직 후 3개월간은 적응 기간이 필요하니 충분한 준비 후에 결정하시는 것을 추천드립니다.',
  '창업해도 될까요?': '화(火)와 목(木) 기운이 창업에 유리한 에너지를 만들고 있습니다. 특히 창의적이고 사람과 소통하는 업종에서 강점을 발휘할 수 있습니다. 다만 금(金) 기운이 약해 자금 관리에 세심한 주의가 필요합니다. 2025년 이후가 더 좋은 타이밍입니다.',
  '이 사람과 계속 만나도 될까요?': '두 분의 궁합을 정확히 보려면 상대방의 생년월일도 필요하지만, 현재 당신의 사주에서 연애운은 긍정적인 흐름입니다. 수(水) 기운의 상대라면 특히 잘 맞을 수 있어요. 감정에 솔직하되, 서로의 속도를 맞춰가는 것이 중요합니다.',
  '올해 해외에 나가도 될까요?': '올해 목(木) 기운의 확장성으로 인해 해외 활동이 긍정적인 결과를 가져올 가능성이 높습니다. 특히 동남아, 유럽 방면이 유리합니다. 3월, 6월, 9월이 이동에 좋은 달입니다. 건강 관리에만 유의하세요.',
  '지금 투자해도 될까요?': '현재 금(金) 기운이 약해 투자보다는 안정적인 자산 관리가 더 맞는 시기입니다. 단기 투자보다는 3년 이상의 장기 관점으로 접근하는 것이 유리합니다. 부동산보다는 자기 계발에 투자하는 것이 사주상 더 큰 수익을 가져올 수 있습니다.',
};

export const sajuPillars = [
  { pillar: '년주', heavenly: '甲', earthly: '子', element: '수', color: '#93C5FD' },
  { pillar: '월주', heavenly: '丙', earthly: '寅', element: '목', color: '#6EE7B7' },
  { pillar: '일주', heavenly: '戊', earthly: '午', element: '화', color: '#FB923C' },
  { pillar: '시주', heavenly: '庚', earthly: '申', element: '금', color: '#E2E8F0' },
];

export const personalityTraits = [
  { trait: '창의성', score: 88 },
  { trait: '사교성', score: 72 },
  { trait: '리더십', score: 79 },
  { trait: '직관력', score: 85 },
  { trait: '끈기', score: 68 },
];
