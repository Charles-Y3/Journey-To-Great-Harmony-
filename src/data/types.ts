// Shared content types for all modules.
// Human-readable prose is `Localized<T>` (English + Simplified Chinese
// authored by hand; Traditional Chinese derived at build time — see
// src/i18n/L.ts). Ids, emoji, numbers, and enum-like tags stay plain since
// they are not language-dependent.

import type { Localized } from '../i18n/types';

export interface QuizQuestion {
  q: Localized<string>;
  options: Localized<string[]>;
  answer: number; // index into options
}

export interface TimelinePoint {
  id: string;
  title: Localized<string>;
  years: Localized<string>;
  emoji: string;
  background: Localized<string>;
  figures: Localized<string[]>;
  teachings: Localized<string[]>;
  concepts: Localized<string[]>;
  quiz: QuizQuestion[];
  cardId?: string;
}

export interface TimelineEra {
  id: string;
  name: Localized<string>;
  emoji: string;
  period: Localized<string>;
  points: TimelinePoint[];
  badgeTitle: Localized<string>; // era badge earned when all points are complete
}

export interface Lesson {
  id: string;
  title: Localized<string>;
  reading: Localized<string>;
  question: QuizQuestion;
  reflection: Localized<string>;
}

export interface Topic {
  id: string;
  name: Localized<string>;
  accent?: string; // decorative Chinese glyph shown next to the name in any locale, e.g. 仁
  emoji: string;
  branch: 'root' | 'compassion' | 'character' | 'understanding';
  parentId: string | null; // topic that must be completed to unlock this one
  intro: Localized<string>;
  lessons: Lesson[];
  cardId?: string;
}

export interface Challenge {
  id: string;
  text: Localized<string>;
  virtue: Localized<string>;
  emoji: string;
  /** 1 = everyday/gentle, 2 = moderate, 3 = deep — gated by rank, see engine/progression.ts. */
  tier: 1 | 2 | 3;
}

export interface Quote {
  text: Localized<string>;
  author: Localized<string>;
  /** Original classical Chinese source text, for quotes originally written in Chinese.
   *  Shown as a decorative flourish only in English locale (redundant otherwise). */
  originalZh?: string;
}

export type CardRarity = 'common' | 'rare' | 'legendary';

export interface WisdomCard {
  id: string;
  title: Localized<string>;
  accent?: string; // decorative Chinese glyph, shown in any locale
  emoji: string;
  rarity: CardRarity;
  category: 'figure' | 'teaching' | 'virtue' | 'story';
  text: Localized<string>;
  unlockHint: Localized<string>;
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
  title: Localized<string>;
  emoji: string;
  description: Localized<string>;
  check: (s: Stats) => boolean;
}

export interface MapRegion {
  id: string;
  name: Localized<string>;
  emoji: string;
  unlockXp: number;
  tagline: Localized<string>;
  story: Localized<string>;
  challenge: Localized<string>;
  rewardXp: number;
}

export interface WorldBuilding {
  id: string;
  name: Localized<string>;
  emoji: string;
  threshold: number; // total harmony points required
  description: Localized<string>;
}

export interface Peer {
  id: string;
  name: Localized<string>;
  emoji: string;
  motto: Localized<string>;
  pace: number; // relative daily progress speed, ~0.6–1.4
}
