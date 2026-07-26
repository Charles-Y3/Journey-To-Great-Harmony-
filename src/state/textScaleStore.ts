import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TextScale = 'default' | 'larger' | 'largest';

/** Root font multipliers. Kept modest so reading grows without blowing layout. */
export const TEXT_SCALE_FACTOR: Record<TextScale, number> = {
  default: 1,
  larger: 1.12,
  largest: 1.22,
};

/** Apply scale to <html> — nav chrome CSS divides by --text-scale so tabs stay compact. */
export function applyTextScale(scale: TextScale) {
  const root = document.documentElement;
  root.dataset.textScale = scale;
  root.style.setProperty('--text-scale', String(TEXT_SCALE_FACTOR[scale]));
}

interface TextScaleState {
  scale: TextScale;
  setScale: (scale: TextScale) => void;
}

// Persisted separately from journey progress — like locale — so Reset journey
// never wipes the reader's text-size preference.
export const useTextScale = create<TextScaleState>()(
  persist(
    (set) => ({
      scale: 'default',
      setScale: (scale) => {
        applyTextScale(scale);
        set({ scale });
      },
    }),
    {
      name: 'journey-text-scale',
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state?.scale) applyTextScale(state.scale);
      },
    },
  ),
);
