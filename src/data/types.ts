// Shared content types for all modules.

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index into options
}

export interface TimelinePoint {
  id: string;
  title: string;
  years: string;
  emoji: string;
  background: string;
  figures: string[];
  teachings: string[];
  concepts: string[];
  quiz: QuizQuestion[];
  cardId?: string;
}

export interface TimelineEra {
  id: string;
  name: string;
  emoji: string;
  period: string;
  points: TimelinePoint[];
  badgeTitle: string; // era badge earned when all points are complete
}

export interface Lesson {
  id: string;
  title: string;
  reading: string;
  question: QuizQuestion;
  reflection: string;
}

export interface Topic {
  id: string;
  name: string;
  zh?: string;
  emoji: string;
  branch: 'root' | 'compassion' | 'character' | 'understanding';
  parentId: string | null; // topic that must be completed to unlock this one
  intro: string;
  lessons: Lesson[];
  cardId?: string;
}

export interface Challenge {
  id: string;
  text: string;
  virtue: string;
  emoji: string;
}

export interface Quote {
  text: string;
  author: string;
  zh?: string;
}

export type CardRarity = 'common' | 'rare' | 'legendary';

export interface WisdomCard {
  id: string;
  title: string;
  zh?: string;
  emoji: string;
  rarity: CardRarity;
  category: 'figure' | 'teaching' | 'virtue' | 'story';
  text: string;
  unlockHint: string;
}

export interface Stats {
  xp: number;
  lessons: number;
  topicsCompleted: number;
  timelinePoints: number;
  erasCompleted: number;
  challengesDone: number;
  reflections: number;
  intentions: number;
  streakCurrent: number;
  streakBest: number;
  encouragementsSent: number;
  harmonyPoints: number;
  regionsCompleted: number;
  daysActive: number;
  quizCorrect: number;
}

export interface Badge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  check: (s: Stats) => boolean;
}

export interface MapRegion {
  id: string;
  name: string;
  emoji: string;
  unlockXp: number;
  tagline: string;
  story: string;
  challenge: string;
  rewardXp: number;
}

export interface WorldBuilding {
  id: string;
  name: string;
  emoji: string;
  threshold: number; // total harmony points required
  description: string;
}

export interface Peer {
  id: string;
  name: string;
  emoji: string;
  motto: string;
  pace: number; // relative daily progress speed, ~0.6–1.4
}
