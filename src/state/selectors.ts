import type { Stats, Topic, WisdomCard } from '../data/types';
import { ALL_LESSONS, TOPICS } from '../data/knowledgeTree';
import { ALL_POINTS, TIMELINE } from '../data/timeline';
import {
  RANKS,
  rankIndexForXp,
  growthScore,
  forestStageIndex,
  FOREST_STAGES,
  seededRandom,
} from '../engine/progression';
import { communityHarmony } from '../engine/community';
import { WORLD_STAGES, BUILDINGS } from '../data/world';
import { REGIONS } from '../data/journeyMap';
import { CARDS } from '../data/cards';

// The persisted data shape the selectors read (defined by the store).
export interface JourneyData {
  xp: number;
  harmonyPoints: number;
  days: Record<
    string,
    {
      intention?: string;
      challengeDone?: boolean;
      challengeNote?: string;
      challengeId?: string;
      /** How many times today's tier-3 challenge has been rerolled (capped at 1). */
      challengeRerollCount?: number;
      reflection?: { learned: string; virtue: string; improve: string };
      lessons?: number;
      timelineStudies?: number;
      /** Light Heart check — mood id from data/moods.ts; optional one-line note. */
      mood?: { id: string; note?: string };
      /** Solved a Virtue Glyph puzzle today (first clear or replay). */
      glyphPractice?: boolean;
    }
  >;
  streakCurrent: number;
  streakBest: number;
  lastActiveDay: string | null;
  completedLessons: string[];
  completedTimelinePoints: string[];
  /** How many of a TimelinePoint's 3 levels have been completed, keyed by point id (0 if absent). */
  timelinePointLevels: Record<string, number>;
  completedRegions: string[];
  unlockedCards: string[];
  unlockedBadges: string[];
  encouragedOn: Record<string, string>;
  encouragementsSent: number;
  quizCorrect: number;
  startDay: string;
  dayOffset: number;
  seenCollectionCount: number;
  /** Longer written reflections required to fully "master" a timeline era or knowledge branch, keyed by era/branch id. */
  capstones: Record<string, { text: string; day: string }>;
  /** Card ids that have already played their first-open reveal animation. */
  revealedCards: string[];
  /** Virtue Glyph puzzle ids cleared at least once (first clear awards XP). */
  completedGlyphs: string[];
  /**
   * Sage Lives chapters completed once, keyed by chapter id.
   * Never written into timelinePointLevels — keeps Ages wave / forest / era badges intact.
   */
  sageChapters: Record<string, true>;
}

/** How many unlocked cards/badges the user hasn't opened the Collection tab to see yet. */
export function newCollectionCount(d: JourneyData): number {
  return Math.max(0, d.unlockedCards.length + d.unlockedBadges.length - d.seenCollectionCount);
}

export function isTopicCompleted(completedLessons: string[], topic: Topic): boolean {
  return topic.lessons.every((l) => completedLessons.includes(l.id));
}

export function completedTopicIds(completedLessons: string[]): string[] {
  return TOPICS.filter((t) => isTopicCompleted(completedLessons, t)).map((t) => t.id);
}

export function topicDepth(topic: Topic): 1 | 2 | 3 {
  return topic.depth ?? 1;
}

/** Lowest unfinished Knowledge Path depth (1–3). Used for the per-depth progress bar. */
export function activeKnowledgeDepth(completedLessons: string[]): 1 | 2 | 3 {
  for (const d of [1, 2] as const) {
    const topics = TOPICS.filter((t) => topicDepth(t) === d);
    if (topics.length === 0 || !topics.every((t) => isTopicCompleted(completedLessons, t))) return d;
  }
  return 3;
}

export function knowledgeLessonsAtDepth(depth: 1 | 2 | 3): { id: string }[] {
  return TOPICS.filter((t) => topicDepth(t) === depth).flatMap((t) => t.lessons);
}

export function isTopicUnlocked(completedLessons: string[], topic: Topic): boolean {
  if (!topic.parentId) return true;
  const parent = TOPICS.find((t) => t.id === topic.parentId);
  if (!parent || !isTopicCompleted(completedLessons, parent)) return false;
  const depth = topicDepth(topic);
  if (depth <= 1) return true;
  // Second / third walk: finish every same-branch topic at the prior depth first.
  const prior = TOPICS.filter((t) => t.branch === topic.branch && topicDepth(t) === depth - 1);
  return prior.length > 0 && prior.every((t) => isTopicCompleted(completedLessons, t));
}

/** True once every point in an era has reached full 3/3 mastery — not just foundation. */
export function fullyMasteredEraIds(timelinePointLevels: Record<string, number>): string[] {
  return TIMELINE.filter((era) =>
    era.points.every((p) => (timelinePointLevels[p.id] ?? 0) >= p.levels.length),
  ).map((era) => era.id);
}

/**
 * Whether `levelIndex` (0-indexed: 0=foundation, 1=level 2, 2=level 3) can
 * begin for any point yet. Foundation has no prerequisite; level 2 needs
 * every point on the timeline to have finished foundation first, and level
 * 3 needs every point to have finished level 2 first — the same
 * "finish the prior wave everywhere before going deeper" shape already
 * used by Knowledge Path branches (see isTopicUnlocked above).
 */
export function timelineWaveReady(timelinePointLevels: Record<string, number>, levelIndex: number): boolean {
  if (levelIndex <= 0) return true;
  return ALL_POINTS.every((p) => (timelinePointLevels[p.id] ?? 0) >= levelIndex);
}

/** How many points have reached at least `levelIndex` levels, for wave-progress messaging. */
export function timelinePointsReadyForWave(timelinePointLevels: Record<string, number>, levelIndex: number): number {
  return ALL_POINTS.filter((p) => (timelinePointLevels[p.id] ?? 0) >= levelIndex).length;
}

/** True once every topic (root + leaves) belonging to a knowledge branch is completed. */
export function isBranchMastered(completedLessons: string[], branch: Topic['branch']): boolean {
  const topics = TOPICS.filter((t) => t.branch === branch);
  return topics.length > 0 && topics.every((t) => isTopicCompleted(completedLessons, t));
}

/** Storage key for a branch's capstone reflection (kept distinct from era ids, which have no prefix). */
export function branchCapstoneKey(branch: string): string {
  return `branch-${branch}`;
}

/** Storage key for a sage life's capstone (kept distinct from era / branch keys). */
export function sageCapstoneKey(sageId: string): string {
  return `sage-${sageId}`;
}

// A deliberate daily pace limit (see engine/progression.ts pacing notes):
// without it, the whole Knowledge Path or Wisdom Timeline could be
// finished in one sitting. Reaching the cap doesn't lock the reading —
// only the XP-granting "complete" action — so learning stays accessible.
export const DAILY_LESSON_CAP = 8;
/** Raised in v1.1 so midday study is not exhausted after two Timeline hits. */
export const DAILY_TIMELINE_CAP = 4;

export function lessonsCompletedToday(d: JourneyData, today: string): number {
  return d.days[today]?.lessons ?? 0;
}

export function timelineStudiesToday(d: JourneyData, today: string): number {
  return d.days[today]?.timelineStudies ?? 0;
}

export function statsFromData(d: JourneyData): Stats {
  let challengesDone = 0;
  let reflections = 0;
  let intentions = 0;
  let daysActive = 0;
  for (const rec of Object.values(d.days)) {
    if (rec.challengeDone) challengesDone++;
    if (rec.reflection) reflections++;
    if (rec.intention) intentions++;
    if (rec.challengeDone || rec.reflection || rec.intention || rec.lessons) daysActive++;
  }
  return {
    xp: d.xp,
    lessons: d.completedLessons.length,
    topicsCompleted: completedTopicIds(d.completedLessons).length,
    timelinePoints: d.completedTimelinePoints.length,
    timelinePointsLevel2: timelinePointsReadyForWave(d.timelinePointLevels, 2),
    erasCompleted: fullyMasteredEraIds(d.timelinePointLevels).length,
    challengesDone,
    reflections,
    intentions,
    streakCurrent: d.streakCurrent,
    streakBest: d.streakBest,
    encouragementsSent: d.encouragementsSent,
    harmonyPoints: d.harmonyPoints,
    regionsCompleted: d.completedRegions.length,
    daysActive,
    quizCorrect: d.quizCorrect,
  };
}

// ── Forest ─────────────────────────────────────────────────────────────
export function forestInfo(d: JourneyData) {
  const score = growthScore(statsFromData(d));
  const idx = forestStageIndex(score);
  const stage = FOREST_STAGES[idx];
  const next = idx + 1 < FOREST_STAGES.length ? FOREST_STAGES[idx + 1] : null;
  return { score, stageIndex: idx, stage, next };
}

// ── World ──────────────────────────────────────────────────────────────
export function worldInfo(d: JourneyData, today: string) {
  const community = communityHarmony(d.startDay, today);
  const total = community + d.harmonyPoints;
  let idx = 0;
  for (let i = 0; i < WORLD_STAGES.length; i++) {
    if (total >= WORLD_STAGES[i].threshold) idx = i;
  }
  const stage = WORLD_STAGES[idx];
  const next = idx + 1 < WORLD_STAGES.length ? WORLD_STAGES[idx + 1] : null;
  const buildings = BUILDINGS.map((b) => ({ ...b, built: total >= b.threshold }));
  return { community, user: d.harmonyPoints, total, stageIndex: idx, stage, next, buildings };
}

// ── Weekly Card Echo ──────────────────────────────────────────────────
// A small evergreen touch for long-term users: once the finite Knowledge
// Path / Timeline / Map content is exhausted, this resurfaces one
// already-unlocked wisdom card per ISO week, deterministically by weekKey
// (see isoWeekKey in state/uiStore.ts) so everyone sees the same spotlight
// on the same week and it changes every week, forever.
export function weeklyEchoCard(unlockedCardIds: string[], weekKey: string): WisdomCard | null {
  if (unlockedCardIds.length === 0) return null;
  const idx = Math.floor(seededRandom(`weekly-echo:${weekKey}`) * unlockedCardIds.length);
  const id = unlockedCardIds[idx];
  return CARDS.find((c) => c.id === id) ?? null;
}

// ── Journey Map ────────────────────────────────────────────────────────
export function regionChallengeMet(regionId: string, d: JourneyData): boolean {
  const s = statsFromData(d);
  switch (regionId) {
    case 'valley':
      return s.lessons >= 1 && s.challengesDone >= 1;
    case 'forest':
      return s.reflections >= 3;
    case 'mountain':
      return s.streakBest >= 5;
    case 'garden':
      return s.streakBest >= 10;
    case 'river':
      return s.challengesDone >= 15 && s.encouragementsSent >= 5;
    case 'bridge':
      return s.encouragementsSent >= 10 && rankIndexForXp(s.xp) >= RANKS.findIndex((r) => r.id === 'cultivator');
    case 'scrolls':
      return s.lessons >= ALL_LESSONS.length;
    case 'horizon':
      return s.timelinePoints >= ALL_POINTS.length;
    case 'sanctuary':
      return s.streakBest >= 21 && s.reflections >= 20;
    case 'city':
      return (
        rankIndexForXp(s.xp) >= RANKS.findIndex((r) => r.id === 'contributor') &&
        REGIONS.filter((r) => r.id !== 'city').every((r) => d.completedRegions.includes(r.id))
      );
    default:
      return false;
  }
}
