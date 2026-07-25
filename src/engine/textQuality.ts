/**
 * A cheap heuristic against low-effort input ("aaaaaaaaaa", "asdf asdf asdf",
 * "......") being padded out to hit a minimum-character threshold and claim
 * XP for reflections, intentions, and capstones. This is not a grammar or
 * sentiment check — just a floor that keyboard-mashing and repetition can't
 * clear. Works for both Latin scripts and CJK (no word-boundary spaces).
 */

export const TEXT_MIN = {
  intention: 8,
  reflection: 15,
  challengeNote: 8,
  capstone: 40,
} as const;

/**
 * True if `text` is substantially made of a short repeating unit.
 */
export function hasRepeatingPattern(text: string, threshold = 0.75): boolean {
  const s = text.length > 500 ? text.slice(0, 500) : text;
  const maxPeriod = Math.floor(s.length / 3);
  for (let period = 1; period <= maxPeriod; period++) {
    let matches = 0;
    const total = s.length - period;
    for (let i = period; i < s.length; i++) {
      if (s[i] === s[i - period]) matches++;
    }
    if (total > 0 && matches / total >= threshold) return true;
  }
  return false;
}

/** Collapsed run length for UI counters — does not zero out early short input. */
export function progressLength(raw: string): number {
  const text = raw.trim();
  if (!text) return 0;
  const collapsed = text.replace(/(.)\1{2,}/gu, '$1$1');
  const letterCount = (collapsed.match(/[\p{L}\p{N}]/gu) ?? []).length;
  if (letterCount === 0) return 0;
  return collapsed.length;
}

const KEYBOARD_SPAM =
  /asdf+|qwer+|zxcv+|hjkl+|fghj+|yuio+|bnm+|1234+|abcd+|aoeu+|jkl;+|qazwsx|password/i;

/**
 * Extra nonsense / keyboard-mash detector used by `isMeaningful`.
 * Conservative for short CJK (few characters can be a real sentence).
 */
export function looksLikeNonsense(raw: string): boolean {
  const text = raw.trim();
  if (!text) return false;

  const compact = text.replace(/\s+/gu, '');
  if (KEYBOARD_SPAM.test(compact)) return true;

  const latin = (compact.match(/[A-Za-z]/g) ?? []).join('').toLowerCase();
  if (latin.length >= 6) {
    const vowels = (latin.match(/[aeiou]/g) ?? []).length;
    if (vowels / latin.length < 0.12) return true;
  }

  if (compact.length >= 12) {
    const unique = new Set([...compact.toLowerCase()]).size;
    if (unique / compact.length < 0.22) return true;
  }

  // Long runs of consonants with almost no vowels (Latin only).
  if (/[b-df-hj-np-tv-z]{6,}/i.test(latin)) return true;

  return false;
}

export function meaningfulLength(raw: string): number {
  const text = raw.trim();
  if (!text) return 0;

  const collapsed = text.replace(/(.)\1{2,}/gu, '$1$1');

  const letterCount = (collapsed.match(/[\p{L}\p{N}]/gu) ?? []).length;
  if (letterCount === 0) return 0;

  const stripped = collapsed.replace(/\s/gu, '');
  const uniqueChars = new Set(stripped.split('')).size;
  if (uniqueChars < 3) return 0;

  if (hasRepeatingPattern(stripped.toLowerCase())) return 0;
  if (looksLikeNonsense(collapsed)) return 0;

  return collapsed.length;
}

export function isMeaningful(raw: string, min: number): boolean {
  return meaningfulLength(raw) >= min;
}

/**
 * A separate, much more lenient junk filter for the display name field —
 * deliberately NOT `meaningfulLength`/`isMeaningful`, whose `uniqueChars < 3`
 * rule would reject every legitimate one- or two-character name.
 */
export function isJunkName(raw: string): boolean {
  const text = raw.trim();
  if (!text) return false;
  if (!/[\p{L}\p{N}]/u.test(text)) return true;
  const chars = [...text.toLowerCase()].filter((c) => !/\s/u.test(c));
  if (chars.length > 1 && new Set(chars).size === 1) return true;
  return false;
}
