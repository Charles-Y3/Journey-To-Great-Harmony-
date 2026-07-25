import { hashString } from './progression';

/** Pick a prompt rooted in a past intention, or a gentle default. */
export function journalPromptFromIntentions(
  intentions: string[],
  seed: string,
  defaults: string[],
): string {
  if (intentions.length === 0) {
    return defaults[Math.abs(hashString(seed)) % defaults.length];
  }
  const pick = intentions[Math.abs(hashString(seed)) % intentions.length];
  return pick;
}

export function collectPastIntentions(days: Record<string, { intention?: string }>): string[] {
  return Object.values(days)
    .map((d) => d.intention?.trim())
    .filter((t): t is string => !!t && t.length > 0);
}
