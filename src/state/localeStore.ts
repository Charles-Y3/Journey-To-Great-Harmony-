import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '../i18n/types';

interface LocaleState {
  locale: Locale;
  hasChosen: boolean;
  setLocale: (locale: Locale) => void;
}

// Persisted separately from journey progress (src/state/store.ts) so a
// "Reset journey" never wipes the user's language choice, and so language
// can be read before the rest of the app decides what to render.
export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: 'en',
      hasChosen: false,
      setLocale: (locale) => set({ locale, hasChosen: true }),
    }),
    { name: 'journey-locale', version: 1 },
  ),
);
