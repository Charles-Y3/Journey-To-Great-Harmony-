import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TurningPointState {
  /** Day keys (YYYY-MM-DD) the user has already flipped that day's card. */
  flippedDays: string[];
  markFlipped: (day: string) => void;
}

// Persisted separately from journey progress — this feature is
// intentionally reward-free (no XP/harmony), so it has no place in
// state/store.ts.
export const useTurningPoints = create<TurningPointState>()(
  persist(
    (set, get) => ({
      flippedDays: [],
      markFlipped: (day) => {
        if (get().flippedDays.includes(day)) return;
        set((s) => ({ flippedDays: [...s.flippedDays, day] }));
      },
    }),
    { name: 'journey-turning-points', version: 1 },
  ),
);
