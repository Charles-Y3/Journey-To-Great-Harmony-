import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  XP_FOR,
  HARMONY_FOR,
  rankIndexForXp,
  RANKS,
  forestStageIndex,
  FOREST_STAGES,
  growthScore,
  todayKey,
} from '../engine/progression';
import {
  statsFromData,
  completedEraIds,
  completedTopicIds,
  worldInfo,
  type JourneyData,
} from './selectors';
import { BADGES, eraBadgeId, badgeById } from '../data/badges';
import { SPECIAL_CARD_RULES, cardById } from '../data/cards';
import { ALL_POINTS } from '../data/timeline';
import { TOPICS } from '../data/knowledgeTree';
import { REGIONS } from '../data/journeyMap';
import { useLocale } from './localeStore';
import { L } from '../i18n/L';
import {
  rankUpTitle,
  badgeEarnedTitle,
  eraBadgeTitle,
  wisdomCardTitle,
  forestGrewTitle,
  forestGrewSubtitle,
  worldStageTitle,
  regionCompleteTitle,
  regionCompleteSubtitle,
} from '../i18n/strings';

export interface Celebration {
  id: string;
  kind: 'rank' | 'badge' | 'card' | 'forest' | 'world' | 'region';
  emoji: string;
  title: string;
  subtitle?: string;
}

interface JourneyActions {
  completeLesson: (lessonId: string, answeredCorrectly: boolean) => void;
  completeTimelinePoint: (pointId: string, correctCount: number) => void;
  setIntention: (text: string) => void;
  completeChallenge: (challengeId: string, note?: string) => void;
  submitReflection: (learned: string, virtue: string, improve: string) => void;
  sendEncouragement: (peerId: string) => boolean;
  completeRegion: (regionId: string) => void;
  dismissCelebration: () => void;
  advanceDay: () => void;
  resetJourney: () => void;
  markCollectionSeen: () => void;
}

export type JourneyState = JourneyData & { celebrations: Celebration[] } & JourneyActions;

function initialData(): JourneyData {
  return {
    xp: 0,
    harmonyPoints: 0,
    days: {},
    streakCurrent: 0,
    streakBest: 0,
    lastActiveDay: null,
    completedLessons: [],
    completedTimelinePoints: [],
    completedRegions: [],
    unlockedCards: [],
    unlockedBadges: [],
    encouragedOn: {},
    encouragementsSent: 0,
    quizCorrect: 0,
    startDay: todayKey(0),
    dayOffset: 0,
    seenCollectionCount: 0,
  };
}

let celebrationSeq = 0;
function celebration(kind: Celebration['kind'], emoji: string, title: string, subtitle?: string): Celebration {
  return { id: `c${Date.now()}-${celebrationSeq++}`, kind, emoji, title, subtitle };
}

/** Update streak fields for activity on `today`. Mutates the draft. */
function markActive(draft: JourneyData, today: string) {
  if (draft.lastActiveDay === today) return;
  if (draft.lastActiveDay) {
    const yesterday = todayKeyMinusOne(today);
    draft.streakCurrent = draft.lastActiveDay === yesterday ? draft.streakCurrent + 1 : 1;
  } else {
    draft.streakCurrent = 1;
  }
  draft.streakBest = Math.max(draft.streakBest, draft.streakCurrent);
  draft.lastActiveDay = today;
}

function todayKeyMinusOne(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${mm}-${dd}`;
}

/**
 * Compare before/after and append celebrations for every newly earned
 * rank, badge, card, forest stage, and world stage.
 */
function collectUnlocks(before: JourneyData, after: JourneyData, today: string): Celebration[] {
  const out: Celebration[] = [];
  const locale = useLocale.getState().locale;

  // Rank up
  const beforeRank = rankIndexForXp(before.xp);
  const afterRank = rankIndexForXp(after.xp);
  if (afterRank > beforeRank) {
    const r = RANKS[afterRank];
    out.push(celebration('rank', r.emoji, rankUpTitle(locale, L(r.name, locale))));
  }

  const stats = statsFromData(after);

  // Stats-based badges
  for (const b of BADGES) {
    if (!after.unlockedBadges.includes(b.id) && b.check(stats)) {
      after.unlockedBadges.push(b.id);
      out.push(celebration('badge', b.emoji, badgeEarnedTitle(locale, L(b.title, locale)), L(b.description, locale)));
    }
  }

  // Era badges (granted when every point of an era is complete)
  for (const eraId of completedEraIds(after.completedTimelinePoints)) {
    const id = eraBadgeId(eraId);
    if (!after.unlockedBadges.includes(id)) {
      after.unlockedBadges.push(id);
      const b = badgeById(id);
      if (b) out.push(celebration('badge', b.emoji, eraBadgeTitle(locale, L(b.title, locale)), L(b.description, locale)));
    }
  }

  // Cards attached to completed timeline points
  for (const p of ALL_POINTS) {
    if (p.cardId && after.completedTimelinePoints.includes(p.id) && !after.unlockedCards.includes(p.cardId)) {
      after.unlockedCards.push(p.cardId);
      const c = cardById(p.cardId);
      if (c) out.push(celebration('card', c.emoji, wisdomCardTitle(locale, L(c.title, locale)), L(c.text, locale)));
    }
  }

  // Cards attached to completed topics
  const doneTopics = completedTopicIds(after.completedLessons);
  for (const t of TOPICS) {
    if (t.cardId && doneTopics.includes(t.id) && !after.unlockedCards.includes(t.cardId)) {
      after.unlockedCards.push(t.cardId);
      const c = cardById(t.cardId);
      if (c) out.push(celebration('card', c.emoji, wisdomCardTitle(locale, L(c.title, locale)), L(c.text, locale)));
    }
  }

  // Special cards
  for (const rule of SPECIAL_CARD_RULES) {
    if (!after.unlockedCards.includes(rule.cardId) && rule.check(stats)) {
      after.unlockedCards.push(rule.cardId);
      const c = cardById(rule.cardId);
      if (c) out.push(celebration('card', c.emoji, wisdomCardTitle(locale, L(c.title, locale)), L(c.text, locale)));
    }
  }

  // Forest growth
  const beforeForest = forestStageIndex(growthScore(statsFromData(before)));
  const afterForest = forestStageIndex(growthScore(stats));
  if (afterForest > beforeForest) {
    const f = FOREST_STAGES[afterForest];
    out.push(celebration('forest', f.emoji, forestGrewTitle(locale, L(f.name, locale)), forestGrewSubtitle(locale)));
  }

  // World stage (only celebrate when the user's action crosses the threshold)
  const beforeWorld = worldInfo(before, today).stageIndex;
  const afterWorld = worldInfo(after, today).stageIndex;
  if (afterWorld > beforeWorld) {
    const w = worldInfo(after, today).stage;
    out.push(celebration('world', w.emoji, worldStageTitle(locale, L(w.name, locale)), L(w.description, locale)));
  }

  return out;
}

function snapshot(d: JourneyData): JourneyData {
  return JSON.parse(JSON.stringify(d));
}

function dataOf(s: JourneyState): JourneyData {
  return {
    xp: s.xp,
    harmonyPoints: s.harmonyPoints,
    days: s.days,
    streakCurrent: s.streakCurrent,
    streakBest: s.streakBest,
    lastActiveDay: s.lastActiveDay,
    completedLessons: s.completedLessons,
    completedTimelinePoints: s.completedTimelinePoints,
    completedRegions: s.completedRegions,
    unlockedCards: s.unlockedCards,
    unlockedBadges: s.unlockedBadges,
    encouragedOn: s.encouragedOn,
    encouragementsSent: s.encouragementsSent,
    quizCorrect: s.quizCorrect,
    startDay: s.startDay,
    dayOffset: s.dayOffset,
    seenCollectionCount: s.seenCollectionCount,
  };
}

export const useJourney = create<JourneyState>()(
  persist(
    (set, get) => {
      /** Run a mutation against a deep-copied draft, then commit it plus any unlock celebrations. */
      function apply(mutate: (draft: JourneyData, today: string) => Celebration[] | void) {
        const state = get();
        const before = snapshot(dataOf(state));
        const draft = snapshot(before);
        const today = todayKey(draft.dayOffset);
        const extra = mutate(draft, today) ?? [];
        const unlocks = collectUnlocks(before, draft, today);
        set({ ...draft, celebrations: [...state.celebrations, ...extra, ...unlocks] });
      }

      function dayRec(draft: JourneyData, today: string) {
        if (!draft.days[today]) draft.days[today] = {};
        return draft.days[today];
      }

      return {
        ...initialData(),
        celebrations: [],

        completeLesson: (lessonId, answeredCorrectly) =>
          apply((draft, today) => {
            if (draft.completedLessons.includes(lessonId)) return;
            draft.completedLessons.push(lessonId);
            const rec = dayRec(draft, today);
            rec.lessons = (rec.lessons ?? 0) + 1;
            draft.xp += XP_FOR.lesson + (answeredCorrectly ? XP_FOR.quizCorrect : 0);
            draft.harmonyPoints += HARMONY_FOR.lesson;
            if (answeredCorrectly) draft.quizCorrect += 1;
            markActive(draft, today);
          }),

        completeTimelinePoint: (pointId, correctCount) =>
          apply((draft, today) => {
            if (draft.completedTimelinePoints.includes(pointId)) return;
            draft.completedTimelinePoints.push(pointId);
            draft.xp += XP_FOR.timelinePoint + correctCount * XP_FOR.quizCorrect;
            draft.harmonyPoints += HARMONY_FOR.timelinePoint + correctCount * HARMONY_FOR.quizCorrect;
            draft.quizCorrect += correctCount;
            markActive(draft, today);
          }),

        setIntention: (text) =>
          apply((draft, today) => {
            const rec = dayRec(draft, today);
            const firstTime = !rec.intention;
            rec.intention = text;
            if (firstTime) {
              draft.xp += XP_FOR.intention;
              draft.harmonyPoints += HARMONY_FOR.intention;
              markActive(draft, today);
            }
          }),

        completeChallenge: (challengeId, note) =>
          apply((draft, today) => {
            const rec = dayRec(draft, today);
            if (rec.challengeDone) return;
            rec.challengeDone = true;
            rec.challengeId = challengeId;
            if (note) rec.challengeNote = note;
            draft.xp += XP_FOR.challenge;
            draft.harmonyPoints += HARMONY_FOR.challenge;
            markActive(draft, today);
          }),

        submitReflection: (learned, virtue, improve) =>
          apply((draft, today) => {
            const rec = dayRec(draft, today);
            const firstTime = !rec.reflection;
            rec.reflection = { learned, virtue, improve };
            if (firstTime) {
              draft.xp += XP_FOR.reflection;
              draft.harmonyPoints += HARMONY_FOR.reflection;
              markActive(draft, today);
            }
          }),

        sendEncouragement: (peerId) => {
          const state = get();
          const today = todayKey(state.dayOffset);
          if (state.encouragedOn[peerId] === today) return false;
          apply((draft, t) => {
            draft.encouragedOn[peerId] = t;
            draft.encouragementsSent += 1;
            draft.xp += XP_FOR.encouragement;
            draft.harmonyPoints += HARMONY_FOR.encouragement;
            markActive(draft, t);
          });
          return true;
        },

        completeRegion: (regionId) =>
          apply((draft, today) => {
            if (draft.completedRegions.includes(regionId)) return;
            const region = REGIONS.find((r) => r.id === regionId);
            if (!region) return;
            draft.completedRegions.push(regionId);
            draft.xp += region.rewardXp;
            draft.harmonyPoints += HARMONY_FOR.region;
            markActive(draft, today);
            const locale = useLocale.getState().locale;
            return [
              celebration(
                'region',
                region.emoji,
                regionCompleteTitle(locale, L(region.name, locale)),
                regionCompleteSubtitle(locale, region.rewardXp),
              ),
            ];
          }),

        dismissCelebration: () => set((s) => ({ celebrations: s.celebrations.slice(1) })),

        advanceDay: () => set((s) => ({ dayOffset: s.dayOffset + 1 })),

        resetJourney: () => set({ ...initialData(), celebrations: [] }),

        markCollectionSeen: () =>
          set((s) => {
            const total = s.unlockedCards.length + s.unlockedBadges.length;
            return total > s.seenCollectionCount ? { seenCollectionCount: total } : {};
          }),
      };
    },
    {
      name: 'journey-to-great-harmony',
      version: 1,
      partialize: (s) => {
        const { celebrations: _celebrations, ...rest } = s as JourneyState & Record<string, unknown>;
        return rest;
      },
    },
  ),
);

// Convenience hooks -----------------------------------------------------
export function useToday(): string {
  const offset = useJourney((s) => s.dayOffset);
  return todayKey(offset);
}
