import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isJunkName } from '../engine/textQuality';
import { DEFAULT_AVATAR, isAllowedAvatar } from '../data/avatars';

interface ProfileState {
  name: string | null;
  hasSetName: boolean;
  avatar: string;
  setName: (name: string | null) => void;
  setAvatar: (avatar: string) => void;
}

// Persisted separately from journey progress and locale — a display
// identity, not app state. Optional: a user can skip and stay anonymous.
export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      name: null,
      hasSetName: false,
      avatar: DEFAULT_AVATAR,
      setName: (name) => {
        const trimmed = name?.trim() ?? '';
        if (trimmed && isJunkName(trimmed)) return; // reject junk, keep prior name
        set({ name: trimmed ? trimmed.slice(0, 40) : null, hasSetName: true });
      },
      setAvatar: (avatar) => {
        if (!isAllowedAvatar(avatar)) return;
        set({ avatar });
      },
    }),
    {
      name: 'journey-profile',
      version: 2,
      migrate: (persisted) => {
        const p = persisted as ProfileState & { avatar?: string };
        if (!p.avatar || !isAllowedAvatar(p.avatar)) p.avatar = DEFAULT_AVATAR;
        return p;
      },
    },
  ),
);
