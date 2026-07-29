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
  /** Optional formative hint shown on a wrong answer — never reveals the correct option. */
  nudge?: Localized<string>;
}

/**
 * One depth tier of a TimelinePoint. Every point has exactly 3: a
 * foundation everyone starts with, a deeper study unlocked by finishing
 * the previous level, and a mastery tier with the hardest quiz — see
 * `RARITY_LEVEL_REQUIRED` in data/cards.ts, which ties how many levels a
 * point needs for its rarer wisdom cards to unlock.
 */
export interface TimelineLevel {
  label: Localized<string>;
  background: Localized<string>;
  figures: Localized<string[]>;
  teachings: Localized<string[]>;
  concepts: Localized<string[]>;
  quiz: QuizQuestion[];
}

export interface TimelinePoint {
  id: string;
  title: Localized<string>;
  years: Localized<string>;
  emoji: string;
  levels: [TimelineLevel, TimelineLevel, TimelineLevel];
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

/** One chronological chapter in a sage's life (Lives mode on Timeline). */
export interface SageChapter {
  id: string;
  title: Localized<string>;
  /** Brief historical framing — what was happening in the world. */
  historicalSetting: Localized<string>;
  /** Narrative of this stretch of the sage's life. */
  lifeStory: Localized<string>;
  quiz: QuizQuestion[];
  /** Optional Still Waters anecdote that deep-links here. */
  relatedTurningPointId?: string;
  /** Optional Ages-mode Timeline point for cross-navigation. */
  relatedTimelinePointId?: string;
}

/** A sage biography track — separate from TIMELINE / ALL_POINTS progress. */
export interface Sage {
  id: string;
  name: Localized<string>;
  years: Localized<string>;
  emoji: string;
  summary: Localized<string>;
  badgeTitle: Localized<string>;
  chapters: SageChapter[];
  relatedTimelinePointIds?: string[];
  relatedTopicIds?: string[];
  /** Wisdom card unlocked when every chapter of this life is complete. */
  cardId?: string;
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
  /**
   * Path depth. 1 = foundation virtues (default), 2 = second-walk virtues,
   * 3 = branch mastery. Depth N unlocks only after every same-branch topic
   * at depth N−1 is complete (see `isTopicUnlocked`).
   */
  depth?: 1 | 2 | 3;
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
  /** A quick, plain-language summary — no embedded quote. */
  summary: Localized<string>;
  /** A well-known quote by the figure, or one fitting the virtue/story/teaching. Rendered already quoted — don't include quotation marks in the text itself. */
  quote: Localized<string>;
  unlockHint: Localized<string>;
  /** An extra fact or bit of lore shown in the full-screen card modal. */
  didYouKnow: Localized<string>;
}

export interface Stats {
  xp: number;
  lessons: number;
  topicsCompleted: number;
  timelinePoints: number;
  /** Count of Wisdom Timeline points that have reached level 2 (deepened past foundation). */
  timelinePointsLevel2: number;
  /** Count of eras where every point has reached full 3/3 mastery — not just foundation. */
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
  /** Cleared beginner Virtue Glyphs (of BEGINNER_GLYPHS.length). */
  glyphsBeginnerCleared: number;
  /** Cleared intermediate Virtue Glyphs. */
  glyphsIntermediateCleared: number;
  /** Cleared advanced Virtue Totems. */
  glyphsAdvancedCleared: number;
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
  /** A closing reflection shown only once the region's challenge is complete. */
  epilogue: Localized<string>;
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
  /** How often this traveller shows up in the feed/leaderboard/world. */
  tier: 'active' | 'normal' | 'occasional';
  /** Community-age day (see communityAge()) this peer becomes visible. 0 = present from the start. */
  joinDay: number;
  /** Community-age day this peer stops appearing, simulating them moving on. Only ever set for 'occasional' peers. */
  departDay?: number;
}
