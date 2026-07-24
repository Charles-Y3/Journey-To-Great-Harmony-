import { Link } from 'react-router-dom';
import { useJourney, useToday } from '../../state/store';
import { QUOTES } from '../../data/quotes';
import { CHALLENGES } from '../../data/challenges';
import { dailyQuoteIndex, dailyChallengeIndex } from '../../engine/community';
import { statsFromData, forestInfo, worldInfo, type JourneyData } from '../../state/selectors';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { todaySubtitle, lessonsCompletedToday } from '../../i18n/strings';

export default function Today() {
  const state = useJourney();
  const today = useToday();
  const { t, L, locale } = useT();
  const d = state as unknown as JourneyData;
  const rec = state.days[today] ?? {};

  const quote = QUOTES[dailyQuoteIndex(today, QUOTES.length)];
  const challenge = CHALLENGES[dailyChallengeIndex(today)];
  const stats = statsFromData(d);
  const forest = forestInfo(d);
  const world = worldInfo(d, today);

  const tasks = [
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

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div>
      <PageHeader emoji="🌅" title={t('todayTitle')} subtitle={todaySubtitle(locale, today, doneCount, tasks.length)} />

      <div className="quote-card">
        <p className="quote-text">“{L(quote.text)}”</p>
        <p className="quote-author">— {L(quote.author)}</p>
      </div>

      <div className="card">
        <h3>{t('todayJourneyCard')}</h3>
        {tasks.map((tk) => (
          <div key={tk.title} className={tk.done ? 'task-row task-done' : 'task-row'}>
            <span className="task-check">{tk.done ? '✅' : tk.emoji}</span>
            <div>
              <div className="task-title">{tk.title}</div>
              <div className="task-desc">{tk.desc}</div>
            </div>
            {!tk.done && (
              <Link className="btn btn-primary task-action" to={tk.to}>
                {tk.cta}
              </Link>
            )}
          </div>
        ))}
        {doneCount === tasks.length && <p className="pill" style={{ marginTop: 12 }}>{t('todayFullHarmony')}</p>}
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <div className="stat-value">🔥 {stats.streakCurrent}</div>
          <div className="stat-name">{t('statStreak')}</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{forest.stage.emoji}</div>
          <div className="stat-name">
            {t('statForest')}: {L(forest.stage.name)} <Link to="/forest">{t('statVisit')}</Link>
          </div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{world.stage.emoji}</div>
          <div className="stat-name">
            {t('statWorld')}: {L(world.stage.name)} <Link to="/world">{t('statVisit')}</Link>
          </div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{stats.xp}</div>
          <div className="stat-name">{t('statWisdomXp')}</div>
        </div>
      </div>

      <div className="card">
        <h3>{t('keepExploringTitle')}</h3>
        <p className="small muted">{t('keepExploringBody')}</p>
      </div>
    </div>
  );
}
