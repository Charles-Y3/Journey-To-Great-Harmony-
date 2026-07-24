import type { Badge } from './types';
import { localized, type Localized } from '../i18n/types';
import { TIMELINE } from './timeline';
import { ALL_LESSONS } from './knowledgeTree';

const STATIC_BADGES: Badge[] = [
  { id: 'b-first-step', title: localized('First Step', '迈出第一步'), emoji: '🌱', description: localized('Take your first action on the journey.', '踏上旅程的第一个行动。'), check: (s) => s.xp > 0 },
  { id: 'b-knowledge-seeker', title: localized('Knowledge Seeker', '求知者'), emoji: '📚', description: localized('Complete 5 lessons on the Knowledge Path.', '在知识之路上完成5课。'), check: (s) => s.lessons >= 5 },
  { id: 'b-scholar', title: localized('Scholar of the Path', '路上的学者'), emoji: '🎓', description: localized(`Complete all ${ALL_LESSONS.length} lessons on the Knowledge Path.`, `完成知识之路上全部 ${ALL_LESSONS.length} 课。`), check: (s) => s.lessons >= ALL_LESSONS.length },
  { id: 'b-time-traveller', title: localized('Time Traveller', '时间旅人'), emoji: '⏳', description: localized('Study 3 points on the Wisdom Timeline.', '在智慧时间线上研读3个节点。'), check: (s) => s.timelinePoints >= 3 },
  { id: 'b-compassion-builder', title: localized('Compassion Builder', '慈悲的建造者'), emoji: '❤️', description: localized('Complete 10 daily virtue challenges.', '完成10次每日德行挑战。'), check: (s) => s.challengesDone >= 10 },
  { id: 'b-heart-of-service', title: localized('Heart of Service', '服务之心'), emoji: '🤲', description: localized('Complete 30 daily virtue challenges.', '完成30次每日德行挑战。'), check: (s) => s.challengesDone >= 30 },
  { id: 'b-reflective-mind', title: localized('Reflective Mind', '善思之心'), emoji: '🪞', description: localized('Write 7 evening reflections.', '写下7篇夜间反思。'), check: (s) => s.reflections >= 7 },
  { id: 'b-deep-well', title: localized('Deep Well', '深井'), emoji: '🌊', description: localized('Write 30 evening reflections.', '写下30篇夜间反思。'), check: (s) => s.reflections >= 30 },
  { id: 'b-dawn-greeter', title: localized('Dawn Greeter', '迎晨者'), emoji: '🌅', description: localized('Set 7 morning intentions.', '立下7次晨间心愿。'), check: (s) => s.intentions >= 7 },
  { id: 'b-streak-3', title: localized('Kindling', '星火'), emoji: '🔥', description: localized('Reach a 3-day streak.', '达成连续3天的记录。'), check: (s) => s.streakBest >= 3 },
  { id: 'b-streak-7', title: localized('Steady Flame', '恒焰'), emoji: '🕯️', description: localized('Reach a 7-day streak.', '达成连续7天的记录。'), check: (s) => s.streakBest >= 7 },
  { id: 'b-streak-30', title: localized('Eternal Flame', '不灭之火'), emoji: '🏮', description: localized('Reach a 30-day streak.', '达成连续30天的记录。'), check: (s) => s.streakBest >= 30 },
  { id: 'b-encourager', title: localized('Encourager', '鼓励者'), emoji: '📣', description: localized('Send encouragement to 10 fellow travellers.', '为10位同行者送出鼓励。'), check: (s) => s.encouragementsSent >= 10 },
  { id: 'b-harmony-contributor', title: localized('Harmony Contributor', '和谐贡献者'), emoji: '🌏', description: localized('Contribute 300 harmony points to the shared world.', '为共享世界贡献300点和谐值。'), check: (s) => s.harmonyPoints >= 300 },
  { id: 'b-world-builder', title: localized('World Builder', '世界建设者'), emoji: '🏙️', description: localized('Contribute 1000 harmony points to the shared world.', '为共享世界贡献1000点和谐值。'), check: (s) => s.harmonyPoints >= 1000 },
  { id: 'b-pathfinder', title: localized('Pathfinder', '探路者'), emoji: '🗺️', description: localized('Complete 3 regions of the Journey Map.', '完成旅程地图上的3个区域。'), check: (s) => s.regionsCompleted >= 3 },
  { id: 'b-quiz-whiz', title: localized('Clear-Eyed', '明眼者'), emoji: '🔍', description: localized('Answer 15 quiz questions correctly.', '答对15道测验题。'), check: (s) => s.quizCorrect >= 15 },
];

function eraBadgeDescription(eraName: Localized<string>): Localized<string> {
  return localized(
    `Complete every point in the "${eraName.en}" era of the Wisdom Timeline.`,
    `完成智慧时间线上「${eraName.zh}」时代的每一个节点。`,
  );
}

// One badge per timeline era, e.g. "📜 Confucian Philosophy Completed".
const ERA_BADGES: Badge[] = TIMELINE.map((era) => ({
  id: `b-era-${era.id}`,
  title: era.badgeTitle,
  emoji: era.emoji,
  description: eraBadgeDescription(era.name),
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
