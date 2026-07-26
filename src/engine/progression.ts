import type { Stats } from '../data/types';
import { localized, type Localized } from '../i18n/types';
import { PACING_FOREST_THRESHOLDS, PACING_RANK_MIN_XP } from './pacingBudget';

export { XP_FOR, HARMONY_FOR } from './rewards';

// ── Ranks ──────────────────────────────────────────────────────────────
export interface Rank {
  id: string;
  name: Localized<string>;
  emoji: string;
  minXp: number;
  /** Short portrait shown when the user taps the rank in the rank list. */
  blurb: Localized<string>;
}

// minXp comes from pacingBudget.ts — run `npm run check:pacing` after content changes.
// Top ranks require months of practice beyond finishing all finite study content.
export const RANKS: Rank[] = [
  {
    id: 'seeker',
    name: localized('Seeker', '求道者'),
    emoji: '🔦',
    minXp: PACING_RANK_MIN_XP.seeker,
    blurb: localized(
      'You have lit the lamp. The path is still mostly questions — and that is exactly where wisdom begins.',
      '你已点燃灯火。路上多为疑问 — 而这正是智慧开始的地方。',
    ),
  },
  {
    id: 'explorer',
    name: localized('Explorer', '探索者'),
    emoji: '🧭',
    minXp: PACING_RANK_MIN_XP.explorer,
    blurb: localized(
      'Curiosity has become a habit. You are mapping the first landmarks of compassion, character, and understanding.',
      '好奇已成为习惯。你正在标出慈悲、品格与理解的第一批地标。',
    ),
  },
  {
    id: 'learner',
    name: localized('Learner', '学者'),
    emoji: '📖',
    minXp: PACING_RANK_MIN_XP.learner,
    blurb: localized(
      'Study is taking root. You return to teachings not only to know them, but to let them change how you live.',
      '学问正在生根。你重读教导，不只为知晓，更为让它们改变你如何生活。',
    ),
  },
  {
    id: 'practitioner',
    name: localized('Practitioner', '实行者'),
    emoji: '🥋',
    minXp: PACING_RANK_MIN_XP.practitioner,
    blurb: localized(
      'Knowing and doing begin to meet. Daily practice — intention, challenge, reflection — is becoming your shape.',
      '知与行开始相遇。每日的践行 — 立愿、挑战、反思 — 正在成为你的形状。',
    ),
  },
  {
    id: 'cultivator',
    name: localized('Cultivator', '修行者'),
    emoji: '🌱',
    minXp: PACING_RANK_MIN_XP.cultivator,
    blurb: localized(
      'You tend the inner field with patience. Growth is slower, deeper — measured in seasons of effort, not bursts.',
      '你以耐心照料内心的田地。成长更慢、更深 — 以努力的季节衡量，而非爆发。',
    ),
  },
  {
    id: 'contributor',
    name: localized('Contributor', '贡献者'),
    emoji: '🤝',
    minXp: PACING_RANK_MIN_XP.contributor,
    blurb: localized(
      'Your practice overflows toward others. Encouragement, service, and shared harmony become part of the path.',
      '你的修习向他人溢出。鼓励、服务与共享的和谐，成为道路的一部分。',
    ),
  },
  {
    id: 'harmony-builder',
    name: localized('Harmony Builder', '大同建设者'),
    emoji: '🌉',
    minXp: PACING_RANK_MIN_XP.harmonyBuilder,
    blurb: localized(
      'You help lay planks others will cross. Great Harmony is no longer only a vision — it is work you take part in.',
      '你帮助铺设他人将跨越的木板。大同不再只是愿景 — 它是你参与其中的工作。',
    ),
  },
  {
    id: 'wisdom-keeper',
    name: localized('Wisdom Keeper', '守智者'),
    emoji: '🏮',
    minXp: PACING_RANK_MIN_XP.wisdomKeeper,
    blurb: localized(
      'You hold the lantern steady for those still climbing. Mastery here means guarding what you have learned by living it.',
      '你为仍在攀登的人稳稳举起灯笼。此处的圆满，意味着以活出来的方式守护所学。',
    ),
  },
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

// Reward values: XP_FOR / HARMONY_FOR re-exported from ./rewards above.

// ── Virtue Forest ──────────────────────────────────────────────────────
export interface ForestStage {
  id: string;
  name: Localized<string>;
  emoji: string;
  threshold: number; // growth score required
}

// Growth score spans Knowledge Depth I–III, Timeline, map, and daily
// practice — Sanctuary should feel like a late-journey place.
export const FOREST_STAGES: ForestStage[] = [
  { id: 'seed', name: localized('Seed', '种子'), emoji: '🌰', threshold: PACING_FOREST_THRESHOLDS.seed },
  { id: 'sprout', name: localized('Sprout', '幼苗'), emoji: '🌱', threshold: PACING_FOREST_THRESHOLDS.sprout },
  { id: 'tree', name: localized('Tree', '树木'), emoji: '🌳', threshold: PACING_FOREST_THRESHOLDS.tree },
  { id: 'forest', name: localized('Forest', '树林'), emoji: '🌲', threshold: PACING_FOREST_THRESHOLDS.forest },
  { id: 'oasis', name: localized('Oasis', '绿洲'), emoji: '🌴', threshold: PACING_FOREST_THRESHOLDS.oasis },
  { id: 'sanctuary', name: localized('Sanctuary', '圣境'), emoji: '⛩️', threshold: PACING_FOREST_THRESHOLDS.sanctuary },
];

export function growthScore(s: Stats): number {
  return (
    s.lessons * 2 +
    s.topicsCompleted * 3 +
    s.challengesDone * 2 +
    s.reflections * 2 +
    s.intentions +
    s.timelinePoints * 4 +
    s.erasCompleted * 6 +
    s.streakBest +
    s.regionsCompleted * 5
  );
}

export function forestStageIndex(score: number): number {
  let idx = 0;
  for (let i = 0; i < FOREST_STAGES.length; i++) {
    if (score >= FOREST_STAGES[i].threshold) idx = i;
  }
  return idx;
}

// Evening reflection (and the streak-at-risk nudge) only opens from 5pm
// local time — a look back on the day that's actually happened, not
// something to front-load in the morning.
export const EVENING_OPEN_HOUR = 17;

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
