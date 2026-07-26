import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function newTravellerId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

interface TravellerState {
  travellerId: string | null;
  optedIn: boolean;
  /** Ensure an id exists (call on first opt-in). */
  ensureId: () => string;
  setOptedIn: (optedIn: boolean) => void;
}

// Separate from journey progress / profile so Reset journey does not erase
// the anonymous traveller seat (opt-out still removes you from boards).
export const useTraveller = create<TravellerState>()(
  persist(
    (set, get) => ({
      travellerId: null,
      optedIn: false,
      ensureId: () => {
        const existing = get().travellerId;
        if (existing) return existing;
        const id = newTravellerId();
        set({ travellerId: id });
        return id;
      },
      setOptedIn: (optedIn) => {
        if (optedIn && !get().travellerId) {
          set({ travellerId: newTravellerId(), optedIn: true });
          return;
        }
        set({ optedIn });
      },
    }),
    { name: 'journey-traveller', version: 1 },
  ),
);

/** Streak gate before the shared-road opt-in unlocks. */
export const TRAVELLER_OPT_IN_STREAK = 3;
