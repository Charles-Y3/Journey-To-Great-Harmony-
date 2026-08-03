/**
 * Single source of truth for endgame / ladder thresholds.
 *
 * When you add lessons, sage chapters, glyphs, timeline levels, map regions,
 * or capstone keys: run `npm run check:pacing`. Prefer adjusting the *ratios*
 * below (relative to finite content XP) rather than hand-editing every ladder
 * in isolation.
 *
 * Meters:
 * - XP → ranks + map unlockXp
 * - growthScore → Virtue Forest (includes sages / glyphs / capstones)
 * - harmony (user + community) → World stages & civic buildings
 * - Daily caps (DAILY_LESSON_CAP / DAILY_TIMELINE_CAP) stay in selectors.ts
 */

import { ALL_LESSONS } from '../data/knowledgeTree';
import { ALL_POINTS, TIMELINE } from '../data/timeline';
import { SAGES } from '../data/sages';
import { GLYPHS } from '../data/glyphs';
import { REGIONS } from '../data/journeyMap';
import { MASTERABLE_BRANCHES } from '../data/badges';
import { XP_FOR } from './rewards';

// ── Ratios vs finite content XP (perfect quizzes + all map rewards) ─────
// Harmony Builder ≈ just above finishing all finite content.
// Wisdom Keeper ≈ finite × 1.5 so practice is required for the top rank.
export const RANK_RATIO = {
  seeker: 0,
  explorer: 0.028,
  learner: 0.085,
  practitioner: 0.19,
  cultivator: 0.38,
  contributor: 0.66,
  harmonyBuilder: 1.04,
  wisdomKeeper: 1.51,
} as const;

/** Locked ladder numbers for this content generation (also the check baseline). */
export const PACING_RANK_MIN_XP = {
  seeker: 0,
  explorer: 150,
  learner: 450,
  practitioner: 1000,
  cultivator: 2000,
  contributor: 3500,
  harmonyBuilder: 5500,
  wisdomKeeper: 8000,
} as const;

export const PACING_FOREST_THRESHOLDS = {
  seed: 0,
  sprout: 40,
  tree: 110,
  forest: 220,
  oasis: 400,
  sanctuary: 700,
} as const;

export const PACING_MAP_UNLOCK_XP: Record<string, number> = {
  valley: 0,
  forest: 200,
  mountain: 550,
  garden: 1100,
  river: 1600,
  bridge: 2400,
  scrolls: 3400,
  horizon: 4600,
  sanctuary: 6200,
  city: 5500,
};

export const PACING_WORLD_STAGE_THRESHOLD = {
  village: 0,
  town: 2500,
  city: 7000,
  harmony: 14000,
} as const;

export const PACING_BUILDING_THRESHOLD = {
  school: 450,
  library: 1600,
  garden: 3200,
  care: 5200,
  bridge: 8000,
  hall: 12000,
} as const;

export interface FiniteBudget {
  lessons: number;
  timelineLevels: number;
  sageChapters: number;
  glyphs: number;
  mapRewardXp: number;
  capstones: number;
  lessonXp: number;
  timelineXp: number;
  sageXp: number;
  glyphXp: number;
  capstoneXp: number;
  finiteContentXp: number;
  /** Growth from finishing all countable study/map content (no practice days). */
  maxGrowthFromContent: number;
}

/** Perfect-quiz XP for one timeline level at levelIndex 0|1|2 (3 questions). */
function timelineLevelXp(levelIndex: number): number {
  return XP_FOR.timelinePoint + 3 * XP_FOR.quizCorrect + levelIndex * 10;
}

export function estimateFiniteBudget(): FiniteBudget {
  const lessons = ALL_LESSONS.length;
  const timelineLevels = ALL_POINTS.reduce((n, p) => n + p.levels.length, 0);
  const sageChapters = SAGES.reduce((n, s) => n + s.chapters.length, 0);
  const glyphs = GLYPHS.length;
  const mapRewardXp = REGIONS.reduce((n, r) => n + r.rewardXp, 0);
  const capstones = TIMELINE.length + MASTERABLE_BRANCHES.length + SAGES.length;

  const lessonXp = lessons * (XP_FOR.lesson + XP_FOR.quizCorrect);
  let timelineXp = 0;
  for (const p of ALL_POINTS) {
    for (let i = 0; i < p.levels.length; i++) timelineXp += timelineLevelXp(i);
  }
  // Sage chapters: 2 quiz questions each when perfect.
  const sageXp = sageChapters * (XP_FOR.sageChapter + 2 * XP_FOR.quizCorrect);
  const glyphXp = glyphs * XP_FOR.glyph;
  const capstoneXp = capstones * XP_FOR.capstone;
  const finiteContentXp = lessonXp + timelineXp + sageXp + glyphXp + mapRewardXp + capstoneXp;

  // Mirrors growthScore weights for a fully cleared content profile (streak 0).
  const topicCount = Math.floor(lessons / 2); // 2 lessons per topic
  const eras = TIMELINE.length;
  const timelineFoundations = ALL_POINTS.length;
  const regions = REGIONS.length;
  const maxGrowthFromContent =
    lessons * 2 +
    topicCount * 3 +
    timelineFoundations * 4 +
    eras * 6 +
    regions * 5 +
    sageChapters * 2 +
    glyphs * 3 +
    capstones * 4;

  return {
    lessons,
    timelineLevels,
    sageChapters,
    glyphs,
    mapRewardXp,
    capstones,
    lessonXp,
    timelineXp,
    sageXp,
    glyphXp,
    capstoneXp,
    finiteContentXp,
    maxGrowthFromContent,
  };
}

export interface PacingIssue {
  level: 'error' | 'warn';
  message: string;
}

/** Invariants that keep ladders synced when content grows. */
export function validatePacing(): PacingIssue[] {
  const b = estimateFiniteBudget();
  const issues: PacingIssue[] = [];
  const wk = PACING_RANK_MIN_XP.wisdomKeeper;
  const hb = PACING_RANK_MIN_XP.harmonyBuilder;
  const sanctuary = PACING_FOREST_THRESHOLDS.sanctuary;
  const cityUnlock = PACING_MAP_UNLOCK_XP.city ?? 0;

  if (wk <= b.finiteContentXp) {
    issues.push({
      level: 'error',
      message: `Wisdom Keeper (${wk}) <= finite content XP (${b.finiteContentXp}) — top rank reachable without practice`,
    });
  }
  if (hb > b.finiteContentXp * 1.15 || hb < b.finiteContentXp * 0.95) {
    issues.push({
      level: 'warn',
      message: `Harmony Builder (${hb}) should sit near finite content XP (~${b.finiteContentXp}); ratio now ${(hb / b.finiteContentXp).toFixed(2)}`,
    });
  }
  if (sanctuary <= b.maxGrowthFromContent) {
    issues.push({
      level: 'error',
      message: `Sanctuary (${sanctuary}) <= max growth from content alone (${b.maxGrowthFromContent})`,
    });
  }
  if (cityUnlock <= hb) {
    issues.push({
      level: 'error',
      message: `Map city unlockXp (${cityUnlock}) should sit above Harmony Builder (${hb})`,
    });
  }
  for (const r of REGIONS) {
    const expected = PACING_MAP_UNLOCK_XP[r.id];
    if (expected === undefined) {
      issues.push({ level: 'warn', message: `Region ${r.id} missing from PACING_MAP_UNLOCK_XP` });
    } else if (r.unlockXp !== expected) {
      issues.push({
        level: 'error',
        message: `Region ${r.id} unlockXp ${r.unlockXp} != pacing budget ${expected}`,
      });
    }
  }
  return issues;
}
