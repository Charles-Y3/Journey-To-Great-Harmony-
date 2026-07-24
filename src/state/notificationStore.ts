import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NotificationState {
  enabled: boolean;
  /** Day keys (YYYY-MM-DD) already prompted, so we never nag twice in one day. */
  lastEveningPromptDay: string | null;
  lastStreakPromptDay: string | null;
  setEnabled: (enabled: boolean) => void;
  markEveningPrompted: (day: string) => void;
  markStreakPrompted: (day: string) => void;
}

// Persisted separately from journey progress and locale, since it's a
// device/browser-level permission preference, not app state.
export const useNotifications = create<NotificationState>()(
  persist(
    (set) => ({
      enabled: false,
      lastEveningPromptDay: null,
      lastStreakPromptDay: null,
      setEnabled: (enabled) => set({ enabled }),
      markEveningPrompted: (day) => set({ lastEveningPromptDay: day }),
      markStreakPrompted: (day) => set({ lastStreakPromptDay: day }),
    }),
    { name: 'journey-notifications', version: 1 },
  ),
);
