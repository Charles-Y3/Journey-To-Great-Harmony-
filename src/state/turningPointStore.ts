import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { pickNextTurningPointId, turningPointById, type TurningPoint } from '../data/turningPoints';

interface TurningPointState {
  /** Day keys (YYYY-MM-DD) the user has already flipped that day's card. */
  flippedDays: string[];
  /** Personal day → story id (no-repeat shuffle). */
  assignments: Record<string, string>;
  /** Story ids already drawn in the current shuffle cycle. */
  cycleSeen: string[];
  markFlipped: (day: string) => void;
  /** Assign today's card once; stable for the rest of the day. */
  ensureAssignment: (day: string) => TurningPoint;
  pointForDay: (day: string) => TurningPoint | null;
}

// Persisted separately from journey progress — this feature is
// intentionally reward-free (no XP/harmony), so it has no place in
// state/store.ts.
export const useTurningPoints = create<TurningPointState>()(
  persist(
    (set, get) => ({
      flippedDays: [],
      assignments: {},
      cycleSeen: [],
      markFlipped: (day) => {
        if (get().flippedDays.includes(day)) return;
        set((s) => ({ flippedDays: [...s.flippedDays, day] }));
      },
      ensureAssignment: (day) => {
        const existingId = get().assignments[day];
        const existing = existingId ? turningPointById(existingId) : undefined;
        if (existing) return existing;

        const { id, nextCycleSeen } = pickNextTurningPointId(get().cycleSeen);
        const point = turningPointById(id)!;
        set((s) => ({
          assignments: { ...s.assignments, [day]: id },
          cycleSeen: nextCycleSeen,
        }));
        return point;
      },
      pointForDay: (day) => {
        const id = get().assignments[day];
        return id ? turningPointById(id) ?? null : null;
      },
    }),
    {
      name: 'journey-turning-points',
      version: 2,
      migrate: (persisted) => {
        const p = persisted as Partial<TurningPointState> | undefined;
        return {
          flippedDays: Array.isArray(p?.flippedDays) ? p.flippedDays : [],
          assignments: p?.assignments && typeof p.assignments === 'object' ? p.assignments : {},
          cycleSeen: Array.isArray(p?.cycleSeen) ? p.cycleSeen : [],
        };
      },
    },
  ),
);
