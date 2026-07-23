import { Link } from 'react-router-dom';
import { useJourney, useToday } from '../../state/store';
import { QUOTES } from '../../data/quotes';
import { CHALLENGES } from '../../data/challenges';
import { dailyQuoteIndex, dailyChallengeIndex } from '../../engine/community';
import { statsFromData, forestInfo, worldInfo, type JourneyData } from '../../state/selectors';
import { PageHeader } from '../../components/ui';

export default function Today() {
  const state = useJourney();
  const today = useToday();
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
      title: 'Morning intention',
      desc: rec.intention ? `"${rec.intention}"` : 'Receive today\'s wisdom and set your intention.',
      to: '/practice',
      cta: 'Begin',
    },
    {
      done: (rec.lessons ?? 0) > 0,
      emoji: '📖',
      title: 'Learn something',
      desc:
        (rec.lessons ?? 0) > 0
          ? `${rec.lessons} lesson${rec.lessons === 1 ? '' : 's'} completed today`
          : 'Complete a short lesson on the Knowledge Path or Timeline.',
      to: '/knowledge',
      cta: 'Learn',
    },
    {
      done: !!rec.challengeDone,
      emoji: challenge.emoji,
      title: `Virtue challenge: ${challenge.virtue}`,
      desc: challenge.text,
      to: '/practice',
      cta: 'Practise',
    },
    {
      done: !!rec.reflection,
      emoji: '🪞',
      title: 'Evening reflection',
      desc: rec.reflection ? 'Reflection written — well done.' : 'Look back on the day with honesty and kindness.',
      to: '/practice',
      cta: 'Reflect',
    },
  ];

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div>
      <PageHeader
        emoji="🌅"
        title="Today"
        subtitle={`${today} · ${doneCount}/${tasks.length} daily practices complete`}
      />

      <div className="quote-card">
        <p className="quote-text">“{quote.text}”</p>
        {quote.zh && <p className="quote-zh">{quote.zh}</p>}
        <p className="quote-author">— {quote.author}</p>
      </div>

      <div className="card">
        <h3>Your 10-minute journey</h3>
        {tasks.map((t) => (
          <div key={t.title} className={t.done ? 'task-row task-done' : 'task-row'}>
            <span className="task-check">{t.done ? '✅' : t.emoji}</span>
            <div>
              <div className="task-title">{t.title}</div>
              <div className="task-desc">{t.desc}</div>
            </div>
            {!t.done && (
              <Link className="btn btn-primary task-action" to={t.to}>
                {t.cta}
              </Link>
            )}
          </div>
        ))}
        {doneCount === tasks.length && (
          <p style={{ marginTop: 12 }} className="pill">
            🎉 Full harmony today — your forest and the world both grew!
          </p>
        )}
      </div>

      <div className="stat-grid">
        <div className="stat-tile">
          <div className="stat-value">🔥 {stats.streakCurrent}</div>
          <div className="stat-name">day streak</div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{forest.stage.emoji}</div>
          <div className="stat-name">
            forest: {forest.stage.name} <Link to="/forest">visit</Link>
          </div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{world.stage.emoji}</div>
          <div className="stat-name">
            world: {world.stage.name} <Link to="/world">visit</Link>
          </div>
        </div>
        <div className="stat-tile">
          <div className="stat-value">{stats.xp}</div>
          <div className="stat-name">wisdom XP</div>
        </div>
      </div>

      <div className="card">
        <h3>Keep exploring</h3>
        <p className="small muted">
          Study humanity's story on the <Link to="/timeline">Wisdom Timeline</Link>, walk the{' '}
          <Link to="/map">Journey Map</Link>, cheer on fellow travellers in the{' '}
          <Link to="/community">Community</Link>, or browse your <Link to="/collection">Collection</Link>.
        </p>
      </div>
    </div>
  );
}
