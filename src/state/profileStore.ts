import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      setName: (name) => set({ name: name && name.trim() ? name.trim().slice(0, 40) : null, hasSetName: true }),
    }),
    { name: 'journey-profile', version: 1 },
  ),
);
