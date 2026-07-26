/** Per-action XP and harmony awards — keep amounts stable; retune ladders in pacingBudget.ts. */

export const XP_FOR = {
  lesson: 20,
  quizCorrect: 5,
  timelinePoint: 15,
  challenge: 15,
  intention: 5,
  reflection: 10,
  encouragement: 2,
  capstone: 40,
  /** First clear of a Virtue Glyph sliding puzzle (bonus side activity). */
  glyph: 8,
  /** First Heart check (mood) of the day. */
  moodCheck: 4,
  /** First clear of a Sage Lives chapter (slightly below timeline foundation). */
  sageChapter: 12,
} as const;

/** Harmony points: the user's contribution to the shared Great Harmony World. */
export const HARMONY_FOR = {
  lesson: 10,
  quizCorrect: 2,
  timelinePoint: 8,
  challenge: 12,
  intention: 3,
  reflection: 8,
  encouragement: 5,
  region: 20,
  capstone: 25,
  glyph: 4,
  moodCheck: 2,
  sageChapter: 6,
} as const;
