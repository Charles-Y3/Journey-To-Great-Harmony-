import type { Stats, Topic } from '../data/types';
import { TOPICS } from '../data/knowledgeTree';
import { TIMELINE } from '../data/timeline';
import {
  RANKS,
  rankIndexForXp,
  growthScore,
  forestStageIndex,
  FOREST_STAGES,
} from '../engine/progression';
import { communityHarmony } from '../engine/community';
import { WORLD_STAGES, BUILDINGS } from '../data/world';
import { REGIONS } from '../data/journeyMap';

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
      reflection?: { learned: string; virtue: string; improve: string };
      lessons?: number;
      timelineStudies?: number;
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

export function isTopicUnlocked(completedLessons: string[], topic: Topic): boolean {
  if (!topic.parentId) return true;
  const parent = TOPICS.find((t) => t.id === topic.parentId);
  return parent ? isTopicCompleted(completedLessons, parent) : true;
}

export function completedEraIds(completedTimelinePoints: string[]): string[] {
  return TIMELINE.filter((era) => era.points.every((p) => completedTimelinePoints.includes(p.id))).map(
    (era) => era.id,
  );
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

// A deliberate daily pace limit (see engine/progression.ts pacing notes):
// without it, the whole Knowledge Path or Wisdom Timeline could be
// finished in one sitting. Reaching the cap doesn't lock the reading —
// only the XP-granting "complete" action — so learning stays accessible.
export const DAILY_LESSON_CAP = 2;
export const DAILY_TIMELINE_CAP = 2;

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
    erasCompleted: completedEraIds(d.completedTimelinePoints).length,
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
    case 'city':
      return (
        rankIndexForXp(s.xp) >= RANKS.findIndex((r) => r.id === 'contributor') &&
        REGIONS.filter((r) => r.id !== 'city').every((r) => d.completedRegions.includes(r.id))
      );
    default:
      return false;
  }
}
