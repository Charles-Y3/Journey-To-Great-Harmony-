import type { Badge } from './types';
import { TIMELINE } from './timeline';
import { ALL_LESSONS } from './knowledgeTree';

const STATIC_BADGES: Badge[] = [
  { id: 'b-first-step', title: 'First Step', emoji: '🌱', description: 'Take your first action on the journey.', check: (s) => s.xp > 0 },
  { id: 'b-knowledge-seeker', title: 'Knowledge Seeker', emoji: '📚', description: 'Complete 5 lessons on the Knowledge Path.', check: (s) => s.lessons >= 5 },
  { id: 'b-scholar', title: 'Scholar of the Path', emoji: '🎓', description: `Complete all ${ALL_LESSONS.length} lessons on the Knowledge Path.`, check: (s) => s.lessons >= ALL_LESSONS.length },
  { id: 'b-time-traveller', title: 'Time Traveller', emoji: '⏳', description: 'Study 3 points on the Wisdom Timeline.', check: (s) => s.timelinePoints >= 3 },
  { id: 'b-compassion-builder', title: 'Compassion Builder', emoji: '❤️', description: 'Complete 10 daily virtue challenges.', check: (s) => s.challengesDone >= 10 },
  { id: 'b-heart-of-service', title: 'Heart of Service', emoji: '🤲', description: 'Complete 30 daily virtue challenges.', check: (s) => s.challengesDone >= 30 },
  { id: 'b-reflective-mind', title: 'Reflective Mind', emoji: '🪞', description: 'Write 7 evening reflections.', check: (s) => s.reflections >= 7 },
  { id: 'b-deep-well', title: 'Deep Well', emoji: '🌊', description: 'Write 30 evening reflections.', check: (s) => s.reflections >= 30 },
  { id: 'b-dawn-greeter', title: 'Dawn Greeter', emoji: '🌅', description: 'Set 7 morning intentions.', check: (s) => s.intentions >= 7 },
  { id: 'b-streak-3', title: 'Kindling', emoji: '🔥', description: 'Reach a 3-day streak.', check: (s) => s.streakBest >= 3 },
  { id: 'b-streak-7', title: 'Steady Flame', emoji: '🕯️', description: 'Reach a 7-day streak.', check: (s) => s.streakBest >= 7 },
  { id: 'b-streak-30', title: 'Eternal Flame', emoji: '🏮', description: 'Reach a 30-day streak.', check: (s) => s.streakBest >= 30 },
  { id: 'b-encourager', title: 'Encourager', emoji: '📣', description: 'Send encouragement to 10 fellow travellers.', check: (s) => s.encouragementsSent >= 10 },
  { id: 'b-harmony-contributor', title: 'Harmony Contributor', emoji: '🌏', description: 'Contribute 300 harmony points to the shared world.', check: (s) => s.harmonyPoints >= 300 },
  { id: 'b-world-builder', title: 'World Builder', emoji: '🏙️', description: 'Contribute 1000 harmony points to the shared world.', check: (s) => s.harmonyPoints >= 1000 },
  { id: 'b-pathfinder', title: 'Pathfinder', emoji: '🗺️', description: 'Complete 3 regions of the Journey Map.', check: (s) => s.regionsCompleted >= 3 },
  { id: 'b-quiz-whiz', title: 'Clear-Eyed', emoji: '🔍', description: 'Answer 15 quiz questions correctly.', check: (s) => s.quizCorrect >= 15 },
];

// One badge per timeline era, e.g. "📜 Confucian Philosophy Completed".
const ERA_BADGES: Badge[] = TIMELINE.map((era) => ({
  id: `b-era-${era.id}`,
  title: era.badgeTitle,
  emoji: era.emoji,
  description: `Complete every point in the "${era.name}" era of the Wisdom Timeline.`,
  // Era badges are granted directly by the engine when an era completes,
  // not via a Stats predicate.
  check: () => false,
}));

export const BADGES: Badge[] = [...STATIC_BADGES, ...ERA_BADGES];

// Era badges are keyed by era id rather than a Stats predicate.
export function eraBadgeId(eraId: string): string {
  return `b-era-${eraId}`;
}

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
