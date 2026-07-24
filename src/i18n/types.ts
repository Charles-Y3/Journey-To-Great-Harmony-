// Core i18n primitives. Content is authored in English and Simplified
// Chinese only; Traditional Chinese is derived at build time (see
// scripts/gen-zh-hant.ts) from the Simplified text via opencc-js, and the
// resulting flat dictionary is baked into zhHant.generated.json — no
// conversion library ships to the browser.

export type Locale = 'en' | 'zh-Hans' | 'zh-Hant';

export const LOCALES: Locale[] = ['en', 'zh-Hans', 'zh-Hant'];

// User-selectable locales — deliberately excludes 'zh-Hans': content is
// still authored in Simplified Chinese internally (see the note above) and
// zh-Hans stays a valid Locale for that, but it's hidden as a pickable
// language so the language gate and Settings only ever offer two choices.
export const VISIBLE_LOCALES: Locale[] = ['en', 'zh-Hant'];

export const LOCALE_LABELS: Record<Locale, { name: string; native: string; flagEmoji: string }> = {
  en: { name: 'English', native: 'English', flagEmoji: '🇬🇧' },
  'zh-Hans': { name: 'Simplified Chinese', native: '简体中文', flagEmoji: '🇨🇳' },
  'zh-Hant': { name: 'Traditional Chinese', native: '繁體中文', flagEmoji: '🇹🇼' },
};

/**
 * A piece of human-readable content authored in English and Simplified
 * Chinese. `T` is usually `string` or `string[]`.
 */
export interface Localized<T = string> {
  en: T;
  zh: T; // Simplified Chinese (ground truth for both Chinese variants)
}

export function localized<T>(en: T, zh: T): Localized<T> {
  return { en, zh };
}
