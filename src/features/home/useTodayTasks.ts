import { useJourney, useToday } from '../../state/store';
import { dailyChallenge } from '../../engine/community';
import { maxChallengeTierForRankIndex, rankIndexForXp } from '../../engine/progression';
import { useT } from '../../i18n/useT';
import { lessonsCompletedToday } from '../../i18n/strings';
import { ALL_LESSONS } from '../../data/knowledgeTree';
import { ALL_POINTS } from '../../data/timeline';

export interface TodayTask {
  done: boolean;
  emoji: string;
  title: string;
  desc: string;
  to: string;
  cta: string;
}

// Shared by Today.tsx (the full page) and App.tsx's welcome-back popup, so
// the "what's left today" checklist is computed once and can never drift
// between the two.
export function useTodayTasks(): { tasks: TodayTask[]; doneCount: number } {
  const state = useJourney();
  const today = useToday();
  const { t, L, locale } = useT();
  const rec = state.days[today] ?? {};
  const challenge = dailyChallenge(today, maxChallengeTierForRankIndex(rankIndexForXp(state.xp)), rec.challengeRerollCount ?? 0);

  const knowledgeDone = ALL_LESSONS.every((l) => state.completedLessons.includes(l.id));
  // Every timeline point has 3 levels; "fully studied" means all levels done.
  const timelineDone = ALL_POINTS.every((p) => (state.timelinePointLevels[p.id] ?? 0) >= 3);
  const learnedToday = (rec.lessons ?? 0) + (rec.timelineStudies ?? 0) > 0;

  let learnTo = '/knowledge';
  let learnDesc = t('taskLearnDesc');
  let learnCta = t('ctaLearn');
  if (knowledgeDone && !timelineDone) {
    learnTo = '/timeline';
    learnDesc = t('taskLearnDescTimeline');
    learnCta = t('ctaTimeline');
  } else if (knowledgeDone && timelineDone) {
    learnTo = '/timeline';
    learnDesc = t('taskLearnDescAllDone');
    learnCta = t('ctaTimeline');
  }

  const tasks: TodayTask[] = [
    {
      done: !!rec.intention,
      emoji: '🌅',
      title: t('taskMorningTitle'),
      desc: rec.intention ? `“${rec.intention}”` : t('taskMorningDesc'),
      to: '/practice',
      cta: t('ctaBegin'),
    },
    {
      done: knowledgeDone && timelineDone ? true : learnedToday,
      emoji: '📖',
      title: t('taskLearnTitle'),
      desc: learnedToday && !(knowledgeDone && timelineDone)
        ? lessonsCompletedToday(locale, (rec.lessons ?? 0) + (rec.timelineStudies ?? 0))
        : learnDesc,
      to: learnTo,
      cta: learnCta,
    },
    {
      done: !!rec.challengeDone,
      emoji: challenge.emoji,
      title: `${t('taskChallengePrefix')}: ${L(challenge.virtue)}`,
      desc: L(challenge.text),
      to: '/practice',
      cta: t('ctaPractise'),
    },
    {
      done: !!rec.reflection,
      emoji: '🪞',
      title: t('taskEveningTitle'),
      desc: rec.reflection ? t('taskEveningDone') : t('taskEveningDesc'),
      to: '/practice',
      cta: t('ctaReflect'),
    },
  ];

  return { tasks, doneCount: tasks.filter((tk) => tk.done).length };
}
