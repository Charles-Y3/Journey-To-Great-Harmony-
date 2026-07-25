import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  /** Day key (YYYY-MM-DD) the welcome-back popup was last shown, so it only appears once per day. */
  lastWelcomeSeenDay: string | null;
  setLastWelcomeSeenDay: (day: string) => void;
  /** One-time pacing intro after the name gate. */
  seenPacingIntro: boolean;
  setSeenPacingIntro: (seen: boolean) => void;
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
}

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      lastWelcomeSeenDay: null,
      setLastWelcomeSeenDay: (day) => set({ lastWelcomeSeenDay: day }),
      seenPacingIntro: false,
      setSeenPacingIntro: (seen) => set({ seenPacingIntro: seen }),
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
      resetOnboardingUi: () =>
        set({
          lastWelcomeSeenDay: null,
          seenPacingIntro: false,
          lastWeeklyReviewWeek: null,
          lastYearlyReviewYear: null,
          lastEveningSfxDay: null,
          lastFullHarmonySfxDay: null,
          seenSetupTips: false,
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
