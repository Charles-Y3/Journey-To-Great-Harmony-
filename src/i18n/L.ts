import type { Locale, Localized } from './types';
import zhHantMap from './zhHant.generated.json';

const HANT_MAP: Record<string, string> = zhHantMap as Record<string, string>;

function toTraditional(s: string): string {
  return HANT_MAP[s] ?? s;
}

/**
 * Resolve a Localized value for the given locale.
 * Traditional Chinese is derived from the Simplified text via a
 * build-time-generated lookup table (see scripts/gen-zh-hant.ts); if a
 * string is missing from the table (e.g. content added after the last
 * `npm run gen:i18n`) it falls back to the Simplified original rather than
 * breaking.
 */
export function L<T>(loc: Localized<T>, locale: Locale): T {
  if (locale === 'en') return loc.en;
  if (locale === 'zh-Hans') return loc.zh;
  // zh-Hant
  const value = loc.zh as unknown;
  if (typeof value === 'string') return toTraditional(value) as unknown as T;
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'string' ? toTraditional(v) : v)) as unknown as T;
  }
  return loc.zh;
}
