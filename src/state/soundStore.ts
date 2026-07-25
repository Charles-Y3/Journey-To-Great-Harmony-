import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MusicTrackId = 'bells' | 'chimes';

interface SoundState {
  /** Mutes the wandering peers' spoken greetings on the Great Harmony World tab. */
  speechMuted: boolean;
  /** Mutes Virtue Forest animal / bird ambience. */
  forestMuted: boolean;
  /** null = ambient background music off. */
  musicTrack: MusicTrackId | null;
  musicVolume: number; // 0..1
  setSpeechMuted: (muted: boolean) => void;
  setForestMuted: (muted: boolean) => void;
  setMusicTrack: (track: MusicTrackId | null) => void;
  setMusicVolume: (volume: number) => void;
}

// Persisted separately from journey progress, since these are
// device/browser-level preferences, not app progress.
export const useSound = create<SoundState>()(
  persist(
    (set) => ({
      speechMuted: false,
      forestMuted: false,
      musicTrack: null,
      musicVolume: 0.7,
      setSpeechMuted: (speechMuted) => set({ speechMuted }),
      setForestMuted: (forestMuted) => set({ forestMuted }),
      setMusicTrack: (musicTrack) => set({ musicTrack }),
      setMusicVolume: (musicVolume) => set({ musicVolume }),
    }),
    {
      name: 'journey-sound',
      version: 3,
      migrate: (persisted) => {
        const state = { ...(persisted as Record<string, unknown>) };
        const track = state.musicTrack;
        // Calm Pad removed — only bells / chimes remain.
        if (track !== 'bells' && track !== 'chimes') {
          state.musicTrack = null;
        }
        return state as unknown as SoundState;
      },
    },
  ),
);
