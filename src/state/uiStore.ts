import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  /** Day key (YYYY-MM-DD) the welcome-back popup was last shown, so it only appears once per day. */
  lastWelcomeSeenDay: string | null;
  setLastWelcomeSeenDay: (day: string) => void;
}

// Persisted separately from journey progress — a "have I seen today's
// welcome popup" marker, not app progress, so resetting the journey
// doesn't need to touch it (and vice versa).
export const useUi = create<UiState>()(
  persist(
    (set) => ({
      lastWelcomeSeenDay: null,
      setLastWelcomeSeenDay: (day) => set({ lastWelcomeSeenDay: day }),
    }),
    { name: 'journey-ui', version: 1 },
  ),
);
