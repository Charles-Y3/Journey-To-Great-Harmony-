import { daysBetweenKeys } from './progression';

/** Whole years the traveller has been on the road (from journey startDay). */
export function companionYearsWalked(startDay: string, today: string): number {
  const days = Math.max(0, daysBetweenKeys(startDay, today));
  return Math.floor(days / 365);
}

/** Years implied by best streak (a second aging signal). */
export function companionYearsFromStreak(streakBest: number): number {
  return Math.floor(Math.max(0, streakBest) / 365);
}

export function companionAgeYears(startDay: string, today: string, streakBest: number): number {
  return Math.max(companionYearsWalked(startDay, today), companionYearsFromStreak(streakBest));
}

/** Slightly mature the companion glyph as years accumulate. */
export function agedPeerEmoji(baseEmoji: string, years: number): string {
  if (years >= 3) {
    if (baseEmoji.includes('🧒') || baseEmoji.includes('👧') || baseEmoji.includes('👦')) return '🧑';
  }
  if (years >= 5) {
    if (baseEmoji.includes('👩') || baseEmoji.includes('👨') || baseEmoji.includes('🧑')) return baseEmoji;
  }
  return baseEmoji;
}
