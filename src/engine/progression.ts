import type { Stats } from '../data/types';
import { localized, type Localized } from '../i18n/types';

// ── Ranks ──────────────────────────────────────────────────────────────
export interface Rank {
  id: string;
  name: Localized<string>;
  emoji: string;
  minXp: number;
}

// Thresholds climb more steeply from Cultivator onward — the top ranks are
// meant to be a long-term aspiration (weeks to months of real daily
// practice), not something a single binge session can reach.
export const RANKS: Rank[] = [
  { id: 'seeker', name: localized('Seeker', '求道者'), emoji: '🔦', minXp: 0 },
  { id: 'explorer', name: localized('Explorer', '探索者'), emoji: '🧭', minXp: 100 },
  { id: 'learner', name: localized('Learner', '学者'), emoji: '📖', minXp: 280 },
  { id: 'practitioner', name: localized('Practitioner', '实行者'), emoji: '🥋', minXp: 600 },
  { id: 'cultivator', name: localized('Cultivator', '修行者'), emoji: '🌱', minXp: 1100 },
  { id: 'contributor', name: localized('Contributor', '贡献者'), emoji: '🤝', minXp: 1800 },
  { id: 'harmony-builder', name: localized('Harmony Builder', '大同建设者'), emoji: '🌉', minXp: 2800 },
  { id: 'wisdom-keeper', name: localized('Wisdom Keeper', '守智者'), emoji: '🏮', minXp: 4200 },
];

export function rankIndexForXp(xp: number): number {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].minXp) idx = i;
  }
  return idx;
}

export function rankForXp(xp: number): Rank {
  return RANKS[rankIndexForXp(xp)];
}

export function nextRankForXp(xp: number): Rank | null {
  const idx = rankIndexForXp(xp);
  return idx + 1 < RANKS.length ? RANKS[idx + 1] : null;
}

/**
 * Which daily-challenge tiers a rank has unlocked (see Challenge.tier in
 * data/challenges.ts): Seeker–Learner see only gentle tier-1 challenges,
 * Practitioner–Contributor add moderate tier-2, and only Harmony Builder
 * and Wisdom Keeper see the deep tier-3 challenges.
 */
export function maxChallengeTierForRankIndex(rankIndex: number): 1 | 2 | 3 {
  if (rankIndex >= 6) return 3;
  if (rankIndex >= 3) return 2;
  return 1;
}

// ── Reward values ──────────────────────────────────────────────────────
export const XP_FOR = {
  lesson: 20,
  quizCorrect: 5,
  timelinePoint: 15,
  challenge: 15,
  intention: 5,
  reflection: 10,
  encouragement: 2,
  capstone: 40,
} as const;

// Harmony points: the user's contribution to the shared Great Harmony World.
export const HARMONY_FOR = {
  lesson: 10,
  quizCorrect: 2,
  timelinePoint: 8,
  challenge: 12,
  intention: 3,
  reflection: 8,
  encouragement: 5,
  region: 20,
  capstone: 25,
} as const;

// ── Virtue Forest ──────────────────────────────────────────────────────
export interface ForestStage {
  id: string;
  name: Localized<string>;
  emoji: string;
  threshold: number; // growth score required
}

export const FOREST_STAGES: ForestStage[] = [
  { id: 'seed', name: localized('Seed', '种子'), emoji: '🌰', threshold: 0 },
  { id: 'sprout', name: localized('Sprout', '幼苗'), emoji: '🌱', threshold: 10 },
  { id: 'tree', name: localized('Tree', '树木'), emoji: '🌳', threshold: 30 },
  { id: 'forest', name: localized('Forest', '树林'), emoji: '🌲', threshold: 70 },
  { id: 'oasis', name: localized('Oasis', '绿洲'), emoji: '🌷', threshold: 130 },
  { id: 'sanctuary', name: localized('Sanctuary', '圣境'), emoji: '⛩️', threshold: 220 },
];

export function growthScore(s: Stats): number {
  return (
    s.lessons * 3 +
    s.challengesDone * 2 +
    s.reflections * 2 +
    s.intentions +
    s.timelinePoints * 2 +
    s.streakBest +
    s.regionsCompleted * 3
  );
}

export function forestStageIndex(score: number): number {
  let idx = 0;
  for (let i = 0; i < FOREST_STAGES.length; i++) {
    if (score >= FOREST_STAGES[i].threshold) idx = i;
  }
  return idx;
}

// ── Day helpers ────────────────────────────────────────────────────────
// Day keys are local-date strings "YYYY-MM-DD".
export function dayKeyFromDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayKey(dayOffset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return dayKeyFromDate(d);
}

export function addDaysToKey(key: string, n: number): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + n);
  return dayKeyFromDate(date);
}

export function daysBetweenKeys(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const da = new Date(ay, am - 1, ad).getTime();
  const db = new Date(by, bm - 1, bd).getTime();
  return Math.round((db - da) / 86_400_000);
}

// ── Deterministic pseudo-randomness (for daily rotation & the community sim) ──
export function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // A plain FNV-1a hash has weak avalanche behaviour for near-identical
  // inputs — every seed in this codebase is shaped like `${label}-${i}`
  // for i in a loop (tree/house/sprout/flower positions, walker layouts,
  // peer stats…), so without a proper finalizer, sequential seeds like
  // "tree-x-0".."tree-x-5" hashed to near-identical floats and everything
  // seeded that way clustered in one spot instead of spreading out. This
  // is the standard murmur3 fmix32 finalizer, which fixes that.
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Deterministic float in [0, 1) for a given seed string. */
export function seededRandom(seed: string): number {
  return hashString(seed) / 4294967296;
}
