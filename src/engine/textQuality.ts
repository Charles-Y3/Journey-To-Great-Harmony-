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
export function meaningfulLength(raw: string): number {
  const text = raw.trim();
  if (!text) return 0;

  // A run of the same character 3+ times counts as if it were only 2
  // ("aaaaaaaaaa" -> "aa"), so pure keyboard-mashing can't reach a minimum.
  const collapsed = text.replace(/(.)\1{2,}/gu, '$1$1');

  const letterCount = (collapsed.match(/[\p{L}\p{N}]/gu) ?? []).length;
  if (letterCount === 0) return 0; // just punctuation/whitespace/symbols

  const uniqueChars = new Set(collapsed.replace(/\s/gu, '').split('')).size;
  if (uniqueChars < 3) return 0; // e.g. "aaaa", "abab", "1212121"

  // Reject a short token repeated over and over ("asdf asdf asdf asdf").
  const words = collapsed.split(/\s+/u).filter(Boolean);
  if (words.length >= 4) {
    const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
    if (uniqueWords.size <= Math.max(1, Math.floor(words.length / 4))) return 0;
  }

  return collapsed.length;
}

export function isMeaningful(raw: string, min: number): boolean {
  return meaningfulLength(raw) >= min;
}
