import { useJourney, useToday } from '../../state/store';
import { useTurningPoints } from '../../state/turningPointStore';
import { dailyChallenge } from '../../engine/community';
import { maxChallengeTierForRankIndex, rankIndexForXp } from '../../engine/progression';
import { useT } from '../../i18n/useT';
import { learnRemainingToday } from '../../i18n/strings';
import { ALL_LESSONS } from '../../data/knowledgeTree';
import { ALL_POINTS } from '../../data/timeline';
import { DAILY_LESSON_CAP, DAILY_TIMELINE_CAP } from '../../state/selectors';
import { moodById } from '../../data/moods';

export interface TodayTask {
  done: boolean;
  emoji: string;
  title: string;
  desc: string;
  to: string;
  cta: string;
  /** Secondary midday extras shown under “Also today”. */
  secondary?: boolean;
}

// Shared by Today.tsx (the full page) and App.tsx's welcome-back popup, so
// the "what's left today" checklist is computed once and can never drift
// between the two.
export function useTodayTasks(): { tasks: TodayTask[]; doneCount: number } {
  const state = useJourney();
  const today = useToday();
  const { t, L, locale } = useT();
  const flippedDays = useTurningPoints((s) => s.flippedDays);
  const rec = state.days[today] ?? {};
  const challenge = dailyChallenge(
    today,
    maxChallengeTierForRankIndex(rankIndexForXp(state.xp)),
    rec.challengeRerollCount ?? 0,
  );

  const knowledgeDone = ALL_LESSONS.every((l) => state.completedLessons.includes(l.id));
  // Every timeline point has 3 levels; "fully studied" means all levels done.
  const timelineDone = ALL_POINTS.every((p) => (state.timelinePointLevels[p.id] ?? 0) >= 3);
  const lessonsToday = rec.lessons ?? 0;
  const timelineToday = rec.timelineStudies ?? 0;
  const learnedToday = lessonsToday + timelineToday > 0;
  const lessonLeft = Math.max(0, DAILY_LESSON_CAP - lessonsToday);
  const timelineLeft = Math.max(0, DAILY_TIMELINE_CAP - timelineToday);

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
  if (learnedToday && !(knowledgeDone && timelineDone)) {
    learnDesc = learnRemainingToday(locale, lessonsToday + timelineToday, lessonLeft, timelineLeft);
  }

  const mood = rec.mood ? moodById(rec.mood.id) : undefined;
  const encouragedToday = Object.values(state.encouragedOn ?? {}).includes(today);
  const stillWatersDone = flippedDays.includes(today);

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
      desc: learnDesc,
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
      done: !!rec.mood,
      emoji: mood?.emoji ?? '💛',
      title: t('taskHeartTitle'),
      desc: mood ? `${mood.emoji} ${L(mood.label)}` : t('taskHeartDesc'),
      to: '/practice',
      cta: t('ctaHeart'),
    },
    {
      done: stillWatersDone,
      emoji: '💧',
      title: t('taskStillWatersTitle'),
      desc: stillWatersDone ? t('taskStillWatersDone') : t('taskStillWatersDesc'),
      to: '/turning-points',
      cta: t('ctaStillWaters'),
      secondary: true,
    },
    {
      done: !!rec.glyphPractice,
      emoji: '🧩',
      title: t('taskGlyphTitle'),
      desc: rec.glyphPractice ? t('taskGlyphDone') : t('taskGlyphDesc'),
      to: '/glyphs',
      cta: t('ctaGlyph'),
      secondary: true,
    },
    {
      done: encouragedToday,
      emoji: '🌸',
      title: t('taskEncourageTitle'),
      desc: encouragedToday ? t('taskEncourageDone') : t('taskEncourageDesc'),
      to: '/community',
      cta: t('ctaEncourage'),
      secondary: true,
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
