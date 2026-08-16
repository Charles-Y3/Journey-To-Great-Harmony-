import { create } from 'zustand';

/** Ephemeral (non-persisted) flags scoped to the current app load — reset on every page refresh. */
interface SessionFlagsState {
  backupNudgeShownThisSession: boolean;
  markBackupNudgeShown: () => void;
}

export const useSessionFlags = create<SessionFlagsState>((set) => ({
  backupNudgeShownThisSession: false,
  markBackupNudgeShown: () => set({ backupNudgeShownThisSession: true }),
}));
