import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { todayKey } from '../engine/progression';

interface UiState {
  /** Day key (YYYY-MM-DD) the welcome-back popup was last shown, so it only appears once per day. */
  lastWelcomeSeenDay: string | null;
  setLastWelcomeSeenDay: (day: string) => void;
  /** One-time pacing intro after the name gate. */
  seenPacingIntro: boolean;
  setSeenPacingIntro: (seen: boolean) => void;
  /** One-time first-day guide after pacing (before the feature tour). */
  seenFirstDayGuide: boolean;
  setSeenFirstDayGuide: (seen: boolean) => void;
  /** One-time guided tour shown after the first-day guide + first success. */
  seenAppTour: boolean;
  setSeenAppTour: (seen: boolean) => void;
  /** ISO week key (YYYY-Www) of the last weekly harmony review shown. */
  lastWeeklyReviewWeek: string | null;
  setLastWeeklyReviewWeek: (week: string) => void;
  /** Calendar year of the last yearly harmony review (e.g. 2026). */
  lastYearlyReviewYear: number | null;
  setLastYearlyReviewYear: (year: number) => void;
  /** Day key when the evening-open hush SFX last played. */
  lastEveningSfxDay: string | null;
  setLastEveningSfxDay: (day: string) => void;
  /** Day key when the full-harmony SFX last played. */
  lastFullHarmonySfxDay: string | null;
  setLastFullHarmonySfxDay: (day: string) => void;
  /** After "Reset journey", re-show welcome/pacing as on a new start. */
  resetOnboardingUi: () => void;
  /** Soft tips card on Today (reminders / music / install) has been dismissed. */
  seenSetupTips: boolean;
  setSeenSetupTips: (seen: boolean) => void;
  /** Day key the evening streak-at-risk nudge was dismissed, so it stays hidden only for that day. */
  dismissedStreakNudgeDay: string | null;
  setDismissedStreakNudgeDay: (day: string) => void;
  /**
   * Highest changelog version (see data/changelog.ts) this browser has seen.
   * Null means "never set" — seeded to the latest version (no modal) the
   * moment a brand-new user finishes the pacing intro, so only genuinely
   * returning users (who already had seenPacingIntro=true before this flag
   * existed) see the "What's New" modal. Deliberately NOT reset by
   * resetOnboardingUi() — resetting progress doesn't un-show an update.
   */
  lastSeenChangelogVersion: number | null;
  setLastSeenChangelogVersion: (version: number) => void;
  /** Which owned figure card (id) the user has chosen as their Advisor. */
  advisorFigureId: string | null;
  setAdvisorFigureId: (id: string | null) => void;
  /** One-time "new" badge on the Advisor nav entry, cleared the first time the screen is opened. */
  seenAdvisorUnlock: boolean;
  setSeenAdvisorUnlock: (seen: boolean) => void;
  /** One-shot Today banner pointing at Advisor after first figure card. */
  seenAdvisorDiscoverBanner: boolean;
  setSeenAdvisorDiscoverBanner: (seen: boolean) => void;
  /** One-shot Today banner about World travellers. */
  seenWorldTravellersBanner: boolean;
  setSeenWorldTravellersBanner: (seen: boolean) => void;
  /** One-shot quiet return welcome after absence. */
  seenQuietReturnBanner: boolean;
  setSeenQuietReturnBanner: (seen: boolean) => void;
  /** One-shot shared-road Settings nudge. */
  seenSharedRoadNudge: boolean;
  setSeenSharedRoadNudge: (seen: boolean) => void;
  /** Day key (YYYY-MM-DD) the daily Advisor question was last answered. */
  lastAdvisorQuestionDay: string | null;
  /** Topic answered on lastAdvisorQuestionDay, so revisiting shows the same Q&A. */
  lastAdvisorTopicId: string | null;
  /**
   * Streak/harmony values at the moment of answering, frozen into the
   * legendary reflection prompt so a later stat change can't retroactively
   * rewrite an already-given answer.
   */
  lastAdvisorStreakSnapshot: number | null;
  lastAdvisorHarmonySnapshot: number | null;
  answerAdvisorToday: (topicId: string, streak: number, harmony: number) => void;
  /**
   * 'gated' reveals nav destinations gradually (see NAV_ITEMS/computeProgressWave
   * in App.tsx); 'all' shows everything immediately. Chosen once at the end of
   * PacingIntroModal, changeable anytime in Settings → Journey.
   */
  pacingMode: 'gated' | 'all';
  /** True once the user has made (or been defaulted into) the pacing choice. */
  pacingModeChosen: boolean;
  setPacingMode: (mode: 'gated' | 'all') => void;
  /**
   * High-water mark of nav "waves" ever unlocked, so switching pacingMode
   * back to 'gated' after choosing 'all' can never hide something already
   * shown — it only ratchets up (via the natural progress check in App.tsx,
   * or straight to the max when the user picks "show everything"), never down.
   */
  highestWaveSeen: number;
  setHighestWaveSeen: (wave: number) => void;
}

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      lastWelcomeSeenDay: null,
      setLastWelcomeSeenDay: (day) => set({ lastWelcomeSeenDay: day }),
      seenPacingIntro: false,
      setSeenPacingIntro: (seen) => set({ seenPacingIntro: seen }),
      seenFirstDayGuide: false,
      setSeenFirstDayGuide: (seen) => set({ seenFirstDayGuide: seen }),
      seenAppTour: false,
      setSeenAppTour: (seen) => set({ seenAppTour: seen }),
      lastWeeklyReviewWeek: null,
      setLastWeeklyReviewWeek: (week) => set({ lastWeeklyReviewWeek: week }),
      lastYearlyReviewYear: null,
      setLastYearlyReviewYear: (year) => set({ lastYearlyReviewYear: year }),
      lastEveningSfxDay: null,
      setLastEveningSfxDay: (day) => set({ lastEveningSfxDay: day }),
      lastFullHarmonySfxDay: null,
      setLastFullHarmonySfxDay: (day) => set({ lastFullHarmonySfxDay: day }),
      seenSetupTips: false,
      setSeenSetupTips: (seen) => set({ seenSetupTips: seen }),
      dismissedStreakNudgeDay: null,
      setDismissedStreakNudgeDay: (day) => set({ dismissedStreakNudgeDay: day }),
      lastSeenChangelogVersion: null,
      setLastSeenChangelogVersion: (version) => set({ lastSeenChangelogVersion: version }),
      advisorFigureId: null,
      setAdvisorFigureId: (id) => set({ advisorFigureId: id }),
      seenAdvisorUnlock: false,
      setSeenAdvisorUnlock: (seen) => set({ seenAdvisorUnlock: seen }),
      seenAdvisorDiscoverBanner: false,
      setSeenAdvisorDiscoverBanner: (seen) => set({ seenAdvisorDiscoverBanner: seen }),
      seenWorldTravellersBanner: false,
      setSeenWorldTravellersBanner: (seen) => set({ seenWorldTravellersBanner: seen }),
      seenQuietReturnBanner: false,
      setSeenQuietReturnBanner: (seen) => set({ seenQuietReturnBanner: seen }),
      seenSharedRoadNudge: false,
      setSeenSharedRoadNudge: (seen) => set({ seenSharedRoadNudge: seen }),
      lastAdvisorQuestionDay: null,
      lastAdvisorTopicId: null,
      lastAdvisorStreakSnapshot: null,
      lastAdvisorHarmonySnapshot: null,
      answerAdvisorToday: (topicId, streak, harmony) =>
        set({
          lastAdvisorQuestionDay: todayKey(0),
          lastAdvisorTopicId: topicId,
          lastAdvisorStreakSnapshot: streak,
          lastAdvisorHarmonySnapshot: harmony,
        }),
      pacingMode: 'gated',
      pacingModeChosen: false,
      setPacingMode: (mode) => set({ pacingMode: mode, pacingModeChosen: true }),
      highestWaveSeen: 0,
      setHighestWaveSeen: (wave) => set((s) => (wave > s.highestWaveSeen ? { highestWaveSeen: wave } : {})),
      resetOnboardingUi: () =>
        set({
          lastWelcomeSeenDay: null,
          seenPacingIntro: false,
          seenFirstDayGuide: false,
          seenAppTour: false,
          lastWeeklyReviewWeek: null,
          lastYearlyReviewYear: null,
          lastEveningSfxDay: null,
          lastFullHarmonySfxDay: null,
          seenSetupTips: false,
          dismissedStreakNudgeDay: null,
          advisorFigureId: null,
          seenAdvisorUnlock: false,
          seenAdvisorDiscoverBanner: false,
          seenWorldTravellersBanner: false,
          seenQuietReturnBanner: false,
          seenSharedRoadNudge: false,
          lastAdvisorQuestionDay: null,
          lastAdvisorTopicId: null,
          lastAdvisorStreakSnapshot: null,
          lastAdvisorHarmonySnapshot: null,
          pacingMode: 'gated',
          pacingModeChosen: false,
          highestWaveSeen: 0,
        }),
    }),
    { name: 'journey-ui', version: 4 },
  ),
);

/** ISO week string for a YYYY-MM-DD day key, e.g. "2026-W30". */
export function isoWeekKey(dayKey: string): string {
  const [y, m, d] = dayKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const thursday = new Date(date);
  thursday.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(thursday.getFullYear(), 0, 4);
  const week =
    1 +
    Math.round(
      ((thursday.getTime() - week1.getTime()) / 86_400_000 - 3 + ((week1.getDay() + 6) % 7)) / 7,
    );
  return `${thursday.getFullYear()}-W${String(week).padStart(2, '0')}`;
}
