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
    }
  >;
  streakCurrent: number;
  streakBest: number;
  lastActiveDay: string | null;
  completedLessons: string[];
  completedTimelinePoints: string[];
  completedRegions: string[];
  unlockedCards: string[];
  unlockedBadges: string[];
  encouragedOn: Record<string, string>;
  encouragementsSent: number;
  quizCorrect: number;
  startDay: string;
  dayOffset: number;
  seenCollectionCount: number;
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
    case 'river':
      return s.challengesDone >= 15 && s.encouragementsSent >= 5;
    case 'city':
      return (
        rankIndexForXp(s.xp) >= RANKS.findIndex((r) => r.id === 'contributor') &&
        REGIONS.filter((r) => r.id !== 'city').every((r) => d.completedRegions.includes(r.id))
      );
    default:
      return false;
  }
}
