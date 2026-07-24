/**
 * A cheap heuristic against low-effort input ("aaaaaaaaaa", "asdf asdf asdf",
 * "......") being padded out to hit a minimum-character threshold and claim
 * XP for reflections, intentions, and capstones. This is not a grammar or
 * sentiment check — just a floor that keyboard-mashing and repetition can't
 * clear, so `minLengthHint`/button-disabled logic in Practice.tsx and
 * CapstoneModal can compare against `meaningfulLength()` instead of raw
 * `.length`. Works for both Latin scripts and CJK (no word-boundary
 * spaces), since it counts collapsed characters, not "words".
 */

// Single source of truth for the per-field minimums, shared by the UI
// (Practice.tsx, ui.tsx CapstoneModal) and by store.ts's own defense-in-depth
// checks — previously each place defined its own copy of these numbers.
export const TEXT_MIN = {
  intention: 8,
  reflection: 15,
  capstone: 40,
} as const;

/**
 * True if `text` is substantially made of a short repeating unit, checked
 * per-character-position rather than by splitting on whitespace — the old
 * approach here split on `\s+` to catch spam like "asdf asdf asdf asdf",
 * which is a no-op for CJK text (no spaces between words/characters), so a
 * short Chinese phrase repeated many times slipped through ungated. This
 * scans every candidate period length up to a third of the string, and for
 * each one measures what fraction of character positions match the
 * position exactly one period earlier — a real match ratio, not just a
 * "does the whole string parse as N whole repeats" check, so it still
 * catches spam with a trailing partial repeat or an extra separator.
 */
export function hasRepeatingPattern(text: string, threshold = 0.75): boolean {
  // Cheap safety cap — textareas in this app are short, so this is a
  // formality against a pathological paste, not a real perf concern.
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

export function meaningfulLength(raw: string): number {
  const text = raw.trim();
  if (!text) return 0;

  // A run of the same character 3+ times counts as if it were only 2
  // ("aaaaaaaaaa" -> "aa"), so pure keyboard-mashing can't reach a minimum.
  const collapsed = text.replace(/(.)\1{2,}/gu, '$1$1');

  const letterCount = (collapsed.match(/[\p{L}\p{N}]/gu) ?? []).length;
  if (letterCount === 0) return 0; // just punctuation/whitespace/symbols

  const stripped = collapsed.replace(/\s/gu, '');
  const uniqueChars = new Set(stripped.split('')).size;
  if (uniqueChars < 3) return 0; // e.g. "aaaa", "abab", "1212121"

  // Reject text that's mostly a short unit repeated over and over — works
  // for both space-delimited spam ("asdf asdf asdf asdf") and CJK phrase
  // spam with no separators at all (see hasRepeatingPattern's docs above).
  if (hasRepeatingPattern(stripped.toLowerCase())) return 0;

  return collapsed.length;
}

export function isMeaningful(raw: string, min: number): boolean {
  return meaningfulLength(raw) >= min;
}

/**
 * A separate, much more lenient junk filter for the display name field —
 * deliberately NOT `meaningfulLength`/`isMeaningful`, whose `uniqueChars < 3`
 * rule would reject every legitimate one- or two-character name, including
 * common single-character Chinese given names (e.g. "伟"). This only
 * rejects a name with no letters/digits at all, or one that's a single
 * character repeated ("aaaa", "1111", "啊啊啊啊") — real short names pass.
 */
export function isJunkName(raw: string): boolean {
  const text = raw.trim();
  if (!text) return false; // empty is handled separately (means "clear name")
  if (!/[\p{L}\p{N}]/u.test(text)) return true; // no letters/digits at all
  const chars = [...text.toLowerCase()].filter((c) => !/\s/u.test(c));
  if (chars.length > 1 && new Set(chars).size === 1) return true; // one character repeated
  return false;
}
