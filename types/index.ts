export interface UserProfile {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female' | 'other';
}

export interface SajuElement {
  name: string;
  korean: string;
  count: number;
  color: string;
  meaning: string;
}

export interface FortuneCard {
  category: string;
  score: number;
  summary: string;
  detail: string;
  advice: string;
}

export interface DayFortune {
  date: string;
  score: number;
  type: 'great' | 'good' | 'neutral' | 'caution';
  categories: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface CompatibilityResult {
  score: number;
  summary: string;
  strengths: string[];
  cautions: string[];
  communication: string;
  elementOverlap: {
    person1: SajuElement[];
    person2: SajuElement[];
  };
}

export interface DaeWun {
  startAge: number;
  endAge: number;
  heavenlyStem: string;
  earthlyBranch: string;
  element: string;
  energy: 'rising' | 'peak' | 'falling' | 'stable';
  summary: string;
  score: number;
}
