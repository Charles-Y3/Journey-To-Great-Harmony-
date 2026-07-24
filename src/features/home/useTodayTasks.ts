import { useJourney, useToday } from '../../state/store';
import { dailyChallenge } from '../../engine/community';
import { maxChallengeTierForRankIndex, rankIndexForXp } from '../../engine/progression';
import { useT } from '../../i18n/useT';
import { lessonsCompletedToday } from '../../i18n/strings';

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
  const challenge = dailyChallenge(today, maxChallengeTierForRankIndex(rankIndexForXp(state.xp)));

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
      done: (rec.lessons ?? 0) > 0,
      emoji: '📖',
      title: t('taskLearnTitle'),
      desc: (rec.lessons ?? 0) > 0 ? lessonsCompletedToday(locale, rec.lessons ?? 0) : t('taskLearnDesc'),
      to: '/knowledge',
      cta: t('ctaLearn'),
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
