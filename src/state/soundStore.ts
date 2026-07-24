import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MusicTrackId = 'pad' | 'bells' | 'chimes';

interface SoundState {
  /** Mutes the wandering peers' spoken greetings on the Great Harmony World tab. */
  speechMuted: boolean;
  /** null = ambient background music off. */
  musicTrack: MusicTrackId | null;
  musicVolume: number; // 0..1
  setSpeechMuted: (muted: boolean) => void;
  setMusicTrack: (track: MusicTrackId | null) => void;
  setMusicVolume: (volume: number) => void;
}

// Persisted separately from journey progress, since these are
// device/browser-level preferences, not app progress.
export const useSound = create<SoundState>()(
  persist(
    (set) => ({
      speechMuted: false,
      musicTrack: null,
      musicVolume: 0.35,
      setSpeechMuted: (speechMuted) => set({ speechMuted }),
      setMusicTrack: (musicTrack) => set({ musicTrack }),
      setMusicVolume: (musicVolume) => set({ musicVolume }),
    }),
    { name: 'journey-sound', version: 1 },
  ),
);
