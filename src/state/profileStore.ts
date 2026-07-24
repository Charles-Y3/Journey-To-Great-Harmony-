import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isJunkName } from '../engine/textQuality';

interface ProfileState {
  name: string | null;
  hasSetName: boolean;
  setName: (name: string | null) => void;
}

// Persisted separately from journey progress and locale — a display
// identity, not app state. Optional: a user can skip and stay anonymous.
export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      name: null,
      hasSetName: false,
      setName: (name) => {
        const trimmed = name?.trim() ?? '';
        if (trimmed && isJunkName(trimmed)) return; // reject junk, keep prior name
        set({ name: trimmed ? trimmed.slice(0, 40) : null, hasSetName: true });
      },
    }),
    { name: 'journey-profile', version: 1 },
  ),
);
