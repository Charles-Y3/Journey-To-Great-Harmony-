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
  maxChallengeTierForRankIndex,
} from '../engine/progression';
import { dailyChallenge } from '../engine/community';
import {
  statsFromData,
  fullyMasteredEraIds,
  timelineWaveReady,
  completedTopicIds,
  isBranchMastered,
  branchCapstoneKey,
  sageCapstoneKey,
  worldInfo,
  DAILY_LESSON_CAP,
  DAILY_TIMELINE_CAP,
  lessonsCompletedToday,
  timelineStudiesToday,
  type JourneyData,
} from './selectors';
import { BADGES, eraBadgeId, branchBadgeId, badgeById, MASTERABLE_BRANCHES, sageBadgeId } from '../data/badges';
import { SPECIAL_CARD_RULES, cardById, RARITY_LEVEL_REQUIRED } from '../data/cards';
import { ALL_POINTS } from '../data/timeline';
import { TOPICS } from '../data/knowledgeTree';
import { SAGES, chapterById, isSageLifeComplete } from '../data/sages';
import { REGIONS } from '../data/journeyMap';
import { glyphById } from '../data/glyphs';
import { advancedTotemById } from '../data/totems';
import { moodById } from '../data/moods';
import { isMeaningful, TEXT_MIN } from '../engine/textQuality';
import { useLocale } from './localeStore';
import { L } from '../i18n/L';
import {
  rankUpTitle,
  badgeEarnedTitle,
  eraBadgeTitle,
  branchBadgeTitle,
  sageBadgeTitle,
  wisdomCardTitle,
  forestGrewTitle,
  forestGrewSubtitle,
  worldStageTitle,
  regionCompleteTitle,
  regionCompleteSubtitle,
  glyphClearedTitle,
  glyphClearedSubtitle,
} from '../i18n/strings';

export interface Celebration {
  id: string;
  kind: 'rank' | 'badge' | 'card' | 'forest' | 'world' | 'region' | 'glyph';
  emoji: string;
  title: string;
  subtitle?: string;
  /** In-app route for a primary CTA button on the overlay. */
  ctaTo?: string;
  /** Major tier gets richer motion / SFX (rank, forest, world, legendary cards). */
  major?: boolean;
}

interface JourneyActions {
  completeLesson: (lessonId: string, answeredCorrectly: boolean) => void;
  completeTimelineLevel: (pointId: string, levelIndex: number, correctCount: number) => void;
  /** First clear of a Sage Lives chapter — shares DAILY_TIMELINE_CAP with Ages study. */
  completeSageChapter: (chapterId: string, correctCount: number) => void;
  setIntention: (text: string) => void;
  completeChallenge: (challengeId: string, note?: string) => void;
  /** Swap today's tier-3 challenge for a different one from the same pool. Once per day, only before it's completed. */
  rerollChallenge: () => void;
  submitReflection: (learned: string, virtue: string, improve: string) => void;
  /** Light Heart check — first set today awards XP; can change mood later without re-pay. */
  setMoodCheck: (moodId: string, note?: string) => void;
  sendEncouragement: (peerId: string) => boolean;
  completeRegion: (regionId: string) => void;
  submitCapstone: (key: string, text: string) => void;
  /** First clear of a Virtue Glyph awards XP; replays are no-ops for progress. Returns true if newly cleared. */
  completeGlyph: (glyphId: string) => boolean;
  /** Mark that the user solved a glyph today (first clear or replay) for Today tasks. */
  noteGlyphPractice: () => void;
  dismissCelebration: () => void;
  advanceDay: () => void;
  resetJourney: () => void;
  markCollectionSeen: () => void;
  markCardRevealed: (cardId: string) => void;
  importJourney: (data: JourneyData) => boolean;
}

/** Schema version stamped on exported backups. */
export const JOURNEY_EXPORT_VERSION = 1;

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
    timelinePointLevels: {},
    completedRegions: [],
    unlockedCards: [],
    unlockedBadges: [],
    encouragedOn: {},
    encouragementsSent: 0,
    quizCorrect: 0,
    startDay: todayKey(0),
    dayOffset: 0,
    seenCollectionCount: 0,
    capstones: {},
    revealedCards: [],
    completedGlyphs: [],
    sageChapters: {},
  };
}

let celebrationSeq = 0;
function celebration(
  kind: Celebration['kind'],
  emoji: string,
  title: string,
  subtitle?: string,
  opts?: { ctaTo?: string; major?: boolean },
): Celebration {
  return {
    id: `c${Date.now()}-${celebrationSeq++}`,
    kind,
    emoji,
    title,
    subtitle,
    ctaTo: opts?.ctaTo,
    major: opts?.major,
  };
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
    out.push(
      celebration('rank', r.emoji, rankUpTitle(locale, L(r.name, locale)), undefined, {
        major: true,
      }),
    );
  }

  const stats = statsFromData(after);

  // Stats-based badges
  for (const b of BADGES) {
    if (!after.unlockedBadges.includes(b.id) && b.check(stats)) {
      after.unlockedBadges.push(b.id);
      out.push(
        celebration('badge', b.emoji, badgeEarnedTitle(locale, L(b.title, locale)), L(b.description, locale), {
          ctaTo: '/collection',
        }),
      );
    }
  }

  // Era badges (granted once every point of an era has reached full 3/3
  // mastery AND its capstone reflection has been written)
  for (const eraId of fullyMasteredEraIds(after.timelinePointLevels)) {
    const id = eraBadgeId(eraId);
    if (!after.unlockedBadges.includes(id) && after.capstones[eraId]) {
      after.unlockedBadges.push(id);
      const b = badgeById(id);
      if (b)
        out.push(
          celebration('badge', b.emoji, eraBadgeTitle(locale, L(b.title, locale)), L(b.description, locale), {
            ctaTo: '/collection',
          }),
        );
    }
  }

  // Branch-mastery badges (granted once every topic in a knowledge-tree
  // branch is complete AND its capstone reflection has been written)
  for (const branch of MASTERABLE_BRANCHES) {
    const id = branchBadgeId(branch);
    const key = branchCapstoneKey(branch);
    if (!after.unlockedBadges.includes(id) && isBranchMastered(after.completedLessons, branch) && after.capstones[key]) {
      after.unlockedBadges.push(id);
      const b = badgeById(id);
      if (b)
        out.push(
          celebration('badge', b.emoji, branchBadgeTitle(locale, L(b.title, locale)), L(b.description, locale), {
            ctaTo: '/collection',
          }),
        );
    }
  }

  // Sage Lives badges (all chapters + namespaced capstone — never via ALL_POINTS)
  for (const sage of SAGES) {
    const id = sageBadgeId(sage.id);
    const key = sageCapstoneKey(sage.id);
    if (
      !after.unlockedBadges.includes(id) &&
      isSageLifeComplete(after.sageChapters, sage) &&
      after.capstones[key]
    ) {
      after.unlockedBadges.push(id);
      const b = badgeById(id);
      if (b)
        out.push(
          celebration('badge', b.emoji, sageBadgeTitle(locale, L(b.title, locale)), L(b.description, locale), {
            ctaTo: '/collection',
          }),
        );
    }
  }

  // Cards attached to timeline points: the rarer the card, the more of
  // that point's 3 levels must be completed first (see RARITY_LEVEL_REQUIRED).
  for (const p of ALL_POINTS) {
    if (!p.cardId || after.unlockedCards.includes(p.cardId)) continue;
    const c = cardById(p.cardId);
    if (!c) continue;
    const levelsDone = after.timelinePointLevels[p.id] ?? 0;
    if (levelsDone >= RARITY_LEVEL_REQUIRED[c.rarity]) {
      after.unlockedCards.push(p.cardId);
      out.push(
        celebration('card', c.emoji, wisdomCardTitle(locale, L(c.title, locale)), L(c.summary, locale), {
          ctaTo: '/collection',
          major: c.rarity === 'legendary',
        }),
      );
    }
  }

  // Cards attached to completed topics
  const doneTopics = completedTopicIds(after.completedLessons);
  for (const t of TOPICS) {
    if (t.cardId && doneTopics.includes(t.id) && !after.unlockedCards.includes(t.cardId)) {
      after.unlockedCards.push(t.cardId);
      const c = cardById(t.cardId);
      if (c)
        out.push(
          celebration('card', c.emoji, wisdomCardTitle(locale, L(c.title, locale)), L(c.summary, locale), {
            ctaTo: '/collection',
            major: c.rarity === 'legendary',
          }),
        );
    }
  }

  // Cards attached to completed Sage Lives (biography tracks — not Ages points)
  for (const sage of SAGES) {
    if (!sage.cardId || after.unlockedCards.includes(sage.cardId)) continue;
    if (!isSageLifeComplete(after.sageChapters, sage)) continue;
    after.unlockedCards.push(sage.cardId);
    const c = cardById(sage.cardId);
    if (c)
      out.push(
        celebration('card', c.emoji, wisdomCardTitle(locale, L(c.title, locale)), L(c.summary, locale), {
          ctaTo: '/collection',
          major: c.rarity === 'legendary',
        }),
      );
  }

  // Special cards
  for (const rule of SPECIAL_CARD_RULES) {
    if (!after.unlockedCards.includes(rule.cardId) && rule.check(stats)) {
      after.unlockedCards.push(rule.cardId);
      const c = cardById(rule.cardId);
      if (c)
        out.push(
          celebration('card', c.emoji, wisdomCardTitle(locale, L(c.title, locale)), L(c.summary, locale), {
            ctaTo: '/collection',
            major: c.rarity === 'legendary',
          }),
        );
    }
  }

  // Forest growth
  const beforeForest = forestStageIndex(growthScore(statsFromData(before)));
  const afterForest = forestStageIndex(growthScore(stats));
  if (afterForest > beforeForest) {
    const f = FOREST_STAGES[afterForest];
    out.push(
      celebration('forest', f.emoji, forestGrewTitle(locale, L(f.name, locale)), forestGrewSubtitle(locale), {
        ctaTo: '/forest',
        major: true,
      }),
    );
  }

  // World stage (only celebrate when the user's action crosses the threshold)
  const beforeWorld = worldInfo(before, today).stageIndex;
  const afterWorld = worldInfo(after, today).stageIndex;
  if (afterWorld > beforeWorld) {
    const w = worldInfo(after, today).stage;
    out.push(
      celebration('world', w.emoji, worldStageTitle(locale, L(w.name, locale)), L(w.description, locale), {
        ctaTo: '/world',
        major: true,
      }),
    );
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
    timelinePointLevels: s.timelinePointLevels,
    completedRegions: s.completedRegions,
    unlockedCards: s.unlockedCards,
    unlockedBadges: s.unlockedBadges,
    encouragedOn: s.encouragedOn,
    encouragementsSent: s.encouragementsSent,
    quizCorrect: s.quizCorrect,
    startDay: s.startDay,
    dayOffset: s.dayOffset,
    seenCollectionCount: s.seenCollectionCount,
    capstones: s.capstones,
    revealedCards: s.revealedCards ?? [],
    completedGlyphs: s.completedGlyphs ?? [],
    sageChapters: s.sageChapters ?? {},
  };
}

function isJourneyData(value: unknown): value is JourneyData {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.xp === 'number' &&
    typeof v.harmonyPoints === 'number' &&
    typeof v.days === 'object' &&
    v.days !== null &&
    Array.isArray(v.completedLessons) &&
    Array.isArray(v.unlockedCards)
  );
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
            // Hard daily cap — UI also hides the button; this is defense in depth.
            if (lessonsCompletedToday(draft, today) >= DAILY_LESSON_CAP) return;
            draft.completedLessons.push(lessonId);
            const rec = dayRec(draft, today);
            rec.lessons = (rec.lessons ?? 0) + 1;
            draft.xp += XP_FOR.lesson + (answeredCorrectly ? XP_FOR.quizCorrect : 0);
            draft.harmonyPoints += HARMONY_FOR.lesson;
            if (answeredCorrectly) draft.quizCorrect += 1;
            markActive(draft, today);
          }),

        completeTimelineLevel: (pointId, levelIndex, correctCount) =>
          apply((draft, today) => {
            const levelsDone = draft.timelinePointLevels[pointId] ?? 0;
            if (levelIndex !== levelsDone) return; // levels must be completed in order, once each
            // Level 2+ only opens once every point on the timeline has
            // finished the prior level — defense in depth; the UI also
            // hides/disables the button (see PointModal in Timeline.tsx).
            if (levelIndex > 0 && !timelineWaveReady(draft.timelinePointLevels, levelIndex)) return;
            if (timelineStudiesToday(draft, today) >= DAILY_TIMELINE_CAP) return;
            draft.timelinePointLevels[pointId] = levelsDone + 1;
            if (levelIndex === 0 && !draft.completedTimelinePoints.includes(pointId)) {
              draft.completedTimelinePoints.push(pointId);
            }
            const rec = dayRec(draft, today);
            rec.timelineStudies = (rec.timelineStudies ?? 0) + 1;
            // Deeper levels carry a small bonus, rewarding the harder study.
            draft.xp += XP_FOR.timelinePoint + correctCount * XP_FOR.quizCorrect + levelIndex * 10;
            draft.harmonyPoints += HARMONY_FOR.timelinePoint + correctCount * HARMONY_FOR.quizCorrect + levelIndex * 6;
            draft.quizCorrect += correctCount;
            markActive(draft, today);
          }),

        completeSageChapter: (chapterId, correctCount) =>
          apply((draft, today) => {
            const found = chapterById(chapterId);
            if (!found) return;
            if (!draft.sageChapters) draft.sageChapters = {};
            if (draft.sageChapters[chapterId]) return;
            // Chapters within a sage must be completed in order.
            const { sage, index } = found;
            for (let i = 0; i < index; i++) {
              if (!draft.sageChapters[sage.chapters[i].id]) return;
            }
            // Shares the Ages midday study budget so Lives cannot double daily XP.
            if (timelineStudiesToday(draft, today) >= DAILY_TIMELINE_CAP) return;
            draft.sageChapters[chapterId] = true;
            const rec = dayRec(draft, today);
            rec.timelineStudies = (rec.timelineStudies ?? 0) + 1;
            draft.xp += XP_FOR.sageChapter + correctCount * XP_FOR.quizCorrect;
            draft.harmonyPoints += HARMONY_FOR.sageChapter + correctCount * HARMONY_FOR.quizCorrect;
            draft.quizCorrect += correctCount;
            markActive(draft, today);
          }),

        setIntention: (text) =>
          apply((draft, today) => {
            if (!isMeaningful(text, TEXT_MIN.intention)) return;
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
            if (!note || !isMeaningful(note, TEXT_MIN.challengeNote)) return;
            rec.challengeDone = true;
            rec.challengeId = challengeId;
            rec.challengeNote = note;
            draft.xp += XP_FOR.challenge;
            draft.harmonyPoints += HARMONY_FOR.challenge;
            markActive(draft, today);
          }),

        rerollChallenge: () =>
          apply((draft, today) => {
            const rec = dayRec(draft, today);
            if (rec.challengeDone) return;
            const rerollsUsed = rec.challengeRerollCount ?? 0;
            if (rerollsUsed >= 1) return;
            const maxTier = maxChallengeTierForRankIndex(rankIndexForXp(draft.xp));
            const current = dailyChallenge(today, maxTier, rerollsUsed);
            if (current.tier !== 3) return;
            rec.challengeRerollCount = rerollsUsed + 1;
          }),

        submitReflection: (learned, virtue, improve) =>
          apply((draft, today) => {
            const rec = dayRec(draft, today);
            // Locked once written — past (and today's) journal entries are not overwritten.
            if (rec.reflection) return;
            if (
              !isMeaningful(learned, TEXT_MIN.reflection) ||
              !isMeaningful(virtue, TEXT_MIN.reflection) ||
              !isMeaningful(improve, TEXT_MIN.reflection)
            ) return;
            rec.reflection = { learned, virtue, improve };
            draft.xp += XP_FOR.reflection;
            draft.harmonyPoints += HARMONY_FOR.reflection;
            markActive(draft, today);
          }),

        setMoodCheck: (moodId, note) =>
          apply((draft, today) => {
            if (!moodById(moodId)) return;
            const trimmed = note?.trim() ?? '';
            if (trimmed && !isMeaningful(trimmed, TEXT_MIN.intention)) return;
            const rec = dayRec(draft, today);
            const firstTime = !rec.mood;
            rec.mood = trimmed ? { id: moodId, note: trimmed } : { id: moodId };
            if (firstTime) {
              draft.xp += XP_FOR.moodCheck;
              draft.harmonyPoints += HARMONY_FOR.moodCheck;
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
                { ctaTo: '/map' },
              ),
            ];
          }),

        submitCapstone: (key, text) =>
          apply((draft, today) => {
            if (draft.capstones[key]) return;
            if (!isMeaningful(text, TEXT_MIN.capstone)) return;
            draft.capstones[key] = { text, day: today };
            draft.xp += XP_FOR.capstone;
            draft.harmonyPoints += HARMONY_FOR.capstone;
            markActive(draft, today);
          }),

        completeGlyph: (glyphId) => {
          const state = get();
          if ((state.completedGlyphs ?? []).includes(glyphId)) return false;
          const glyph = glyphById(glyphId);
          const totem = glyph ? null : advancedTotemById(glyphId);
          if (!glyph && !totem) return false;
          apply((draft, today) => {
            if (!draft.completedGlyphs) draft.completedGlyphs = [];
            if (draft.completedGlyphs.includes(glyphId)) return;
            draft.completedGlyphs.push(glyphId);
            draft.xp += XP_FOR.glyph;
            draft.harmonyPoints += HARMONY_FOR.glyph;
            dayRec(draft, today).glyphPractice = true;
            markActive(draft, today);
            const locale = useLocale.getState().locale;
            const title = glyph ? L(glyph.title, locale) : L(totem!.title, locale);
            const face = glyph ? glyph.character : totem!.emoji;
            return [
              celebration(
                'glyph',
                face,
                glyphClearedTitle(locale, title),
                glyphClearedSubtitle(locale, XP_FOR.glyph, HARMONY_FOR.glyph),
                { ctaTo: '/glyphs' },
              ),
            ];
          });
          return true;
        },

        noteGlyphPractice: () =>
          apply((draft, today) => {
            dayRec(draft, today).glyphPractice = true;
            markActive(draft, today);
          }),

        dismissCelebration: () => set((s) => ({ celebrations: s.celebrations.slice(1) })),

        advanceDay: () => set((s) => ({ dayOffset: s.dayOffset + 1 })),

        resetJourney: () => set({ ...initialData(), celebrations: [] }),

        markCollectionSeen: () =>
          set((s) => {
            const total = s.unlockedCards.length + s.unlockedBadges.length;
            return total > s.seenCollectionCount ? { seenCollectionCount: total } : {};
          }),

        markCardRevealed: (cardId) =>
          set((s) => {
            if (s.revealedCards?.includes(cardId)) return {};
            return { revealedCards: [...(s.revealedCards ?? []), cardId] };
          }),

        importJourney: (data) => {
          if (!isJourneyData(data)) return false;
          const next: JourneyData = {
            ...initialData(),
            ...data,
            days: data.days ?? {},
            completedLessons: data.completedLessons ?? [],
            completedTimelinePoints: data.completedTimelinePoints ?? [],
            timelinePointLevels: data.timelinePointLevels ?? {},
            completedRegions: data.completedRegions ?? [],
            unlockedCards: data.unlockedCards ?? [],
            unlockedBadges: data.unlockedBadges ?? [],
            encouragedOn: data.encouragedOn ?? {},
            capstones: data.capstones ?? {},
            revealedCards: data.revealedCards ?? [],
            completedGlyphs: data.completedGlyphs ?? [],
            sageChapters: data.sageChapters ?? {},
          };
          set({ ...next, celebrations: [] });
          return true;
        },
      };
    },
    {
      name: 'journey-to-great-harmony',
      version: 4,
      migrate: (persisted, fromVersion) => {
        const p = persisted as JourneyData & {
          revealedCards?: string[];
          completedGlyphs?: string[];
          sageChapters?: Record<string, true>;
        };
        if (!p.revealedCards) p.revealedCards = [];
        if (!p.completedGlyphs) p.completedGlyphs = [];
        if (!p.sageChapters) p.sageChapters = {};
        void fromVersion;
        return p;
      },
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

/** Snapshot of persistable journey progress for backup download. */
export function exportJourneyData(): JourneyData {
  return dataOf(useJourney.getState());
}
