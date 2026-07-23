import type { Stats } from '../data/types';

// ── Ranks ──────────────────────────────────────────────────────────────
export interface Rank {
  id: string;
  name: string;
  zh?: string;
  emoji: string;
  minXp: number;
}

export const RANKS: Rank[] = [
  { id: 'seeker', name: 'Seeker', zh: '求道者', emoji: '🔦', minXp: 0 },
  { id: 'explorer', name: 'Explorer', zh: '探索者', emoji: '🧭', minXp: 100 },
  { id: 'learner', name: 'Learner', zh: '学者', emoji: '📖', minXp: 250 },
  { id: 'practitioner', name: 'Practitioner', zh: '修行者', emoji: '🥋', minXp: 500 },
  { id: 'cultivator', name: 'Cultivator', zh: '耕耘者', emoji: '🌱', minXp: 900 },
  { id: 'contributor', name: 'Contributor', zh: '贡献者', emoji: '🤝', minXp: 1400 },
  { id: 'harmony-builder', name: 'Harmony Builder', zh: '大同建设者', emoji: '🌉', minXp: 2100 },
  { id: 'wisdom-keeper', name: 'Wisdom Keeper', zh: '守智者', emoji: '🏮', minXp: 3000 },
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

// ── Reward values ──────────────────────────────────────────────────────
export const XP_FOR = {
  lesson: 20,
  quizCorrect: 5,
  timelinePoint: 15,
  challenge: 15,
  intention: 5,
  reflection: 10,
  encouragement: 2,
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
} as const;

// ── Virtue Forest ──────────────────────────────────────────────────────
export interface ForestStage {
  id: string;
  name: string;
  emoji: string;
  threshold: number; // growth score required
}

export const FOREST_STAGES: ForestStage[] = [
  { id: 'seed', name: 'Seed', emoji: '🌰', threshold: 0 },
  { id: 'sprout', name: 'Sprout', emoji: '🌱', threshold: 10 },
  { id: 'tree', name: 'Tree', emoji: '🌳', threshold: 30 },
  { id: 'forest', name: 'Forest', emoji: '🌲', threshold: 70 },
  { id: 'garden', name: 'Garden', emoji: '🌷', threshold: 130 },
  { id: 'sanctuary', name: 'Sanctuary', emoji: '⛩️', threshold: 220 },
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
  return h >>> 0;
}

/** Deterministic float in [0, 1) for a given seed string. */
export function seededRandom(seed: string): number {
  return hashString(seed) / 4294967296;
}
