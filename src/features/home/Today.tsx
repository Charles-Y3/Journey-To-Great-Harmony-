import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useJourney, useToday } from '../../state/store';
import { QUOTES } from '../../data/quotes';
import { CHALLENGES } from '../../data/challenges';
import { dailyQuoteIndex } from '../../engine/community';
import { addDaysToKey, hashString } from '../../engine/progression';
import { statsFromData, forestInfo, worldInfo, weeklyEchoCard, type JourneyData } from '../../state/selectors';
import { EVENING_OPEN_HOUR } from '../../engine/progression';
import { CardModal } from '../collection/Collection';
import { Modal, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { todaySubtitle } from '../../i18n/strings';
import { useTodayTasks } from './useTodayTasks';
import { isoWeekKey, useUi } from '../../state/uiStore';
import { isGregorianNewYearWindow, isLunarNewYearWindow, seasonalVirtueForDay } from '../../data/seasons';

export default function Today() {
  const state = useJourney();
  const today = useToday();
  const { t, L, locale } = useT();
  const d = state as unknown as JourneyData;

  const quote = QUOTES[dailyQuoteIndex(today, QUOTES.length)];
  const stats = statsFromData(d);
  const forest = forestInfo(d);
  const world = worldInfo(d, today);
  const { tasks, coreDoneCount, coreTotal, coreComplete } = useTodayTasks();
  const rec = d.days[today] ?? {};
  const yesterday = addDaysToKey(today, -1);
  const yRec = d.days[yesterday] ?? {};
  const yesterdayLine = yRec.reflection?.improve || yRec.intention;
  const season = seasonalVirtueForDay(today);
  const year = Number(today.slice(0, 4));

  const weekKey = isoWeekKey(today);
  const echoCard = useMemo(() => weeklyEchoCard(d.unlockedCards, weekKey), [d.unlockedCards, weekKey]);
  const [showEchoCard, setShowEchoCard] = useState(false);
  const lastWeeklyReviewWeek = useUi((s) => s.lastWeeklyReviewWeek);
  const setLastWeeklyReviewWeek = useUi((s) => s.setLastWeeklyReviewWeek);
  const lastYearlyReviewYear = useUi((s) => s.lastYearlyReviewYear);
  const setLastYearlyReviewYear = useUi((s) => s.setLastYearlyReviewYear);
  const seenSetupTips = useUi((s) => s.seenSetupTips);
  const setSeenSetupTips = useUi((s) => s.setSeenSetupTips);
  const dismissedStreakNudgeDay = useUi((s) => s.dismissedStreakNudgeDay);
  const setDismissedStreakNudgeDay = useUi((s) => s.setDismissedStreakNudgeDay);
  const [showWeekly, setShowWeekly] = useState(false);
  const [showYearly, setShowYearly] = useState(false);

  const streakAtRisk = new Date().getHours() >= EVENING_OPEN_HOUR && !rec.intention && !rec.challengeDone && !rec.reflection;
  const showStreakNudge = streakAtRisk && dismissedStreakNudgeDay !== today;

  function openSettings(section?: 'reminders' | 'music' | 'install') {
    window.dispatchEvent(
      new CustomEvent('journey:open-settings', { detail: section ? { section } : undefined }),
    );
  }

  // First open of a new ISO week: seed silently once, then show the review.
  useEffect(() => {
    if (lastWeeklyReviewWeek === null) {
      setLastWeeklyReviewWeek(weekKey);
      return;
    }
    if (lastWeeklyReviewWeek !== weekKey) {
      setShowWeekly(true);
    }
  }, [weekKey, lastWeeklyReviewWeek, setLastWeeklyReviewWeek]);

  useEffect(() => {
    const inWindow = isGregorianNewYearWindow(today) || isLunarNewYearWindow(today);
    if (!inWindow) return;
    if (lastYearlyReviewYear === null) {
      setLastYearlyReviewYear(year);
      return;
    }
    if (lastYearlyReviewYear < year) {
      setShowYearly(true);
    }
  }, [today, year, lastYearlyReviewYear, setLastYearlyReviewYear]);

  const weekDays = useMemo(() => {
    // Collect Mon–Sun keys for the current ISO week containing `today`.
    const [y, m, day] = today.split('-').map(Number);
    const date = new Date(y, m - 1, day);
    const dow = (date.getDay() + 6) % 7; // Mon=0
    const monday = addDaysToKey(today, -dow);
    return Array.from({ length: 7 }, (_, i) => addDaysToKey(monday, i));
  }, [today]);

  const weekChallenge = useMemo(() => {
    for (const day of [...weekDays].reverse()) {
      const r = d.days[day];
      if (r?.challengeId) {
        const ch = CHALLENGES.find((c) => c.id === r.challengeId);
        if (ch) return ch;
      }
    }
    return null;
  }, [d.days, weekDays]);

  const weekQuote = QUOTES[Math.abs(hashString(`week-quote-${weekKey}`)) % QUOTES.length];
  const weekIntention = weekDays.map((day) => d.days[day]?.intention).find(Boolean);
  const weekImprove = [...weekDays].reverse().map((day) => d.days[day]?.reflection?.improve).find(Boolean);

  function closeWeekly() {
    setLastWeeklyReviewWeek(weekKey);
    setShowWeekly(false);
  }

  function closeYearly() {
    setLastYearlyReviewYear(year);
    setShowYearly(false);
  }

  return (
    <div>
      <PageHeader emoji="🌅" title={t('todayTitle')} subtitle={todaySubtitle(locale, today, coreDoneCount, coreTotal)} />

      <div className="quote-card">
        <p className="quote-text">“{L(quote.text)}”</p>
        <p className="quote-author">— {L(quote.author)}</p>
      </div>

      <div className="card seasonal-virtue-card">
        <h3>
          {season.emoji} {t('seasonalVirtueTitle')}
        </h3>
        <p className="small muted" style={{ marginBottom: 4 }}>
          {L(season.name)} · <span className="pill pill-gold">{L(season.virtue)}</span>
        </p>
        <p style={{ margin: 0 }}>{L(season.guidance)}</p>
      </div>

      {rec.intention && (
        <p className="today-intention-strip">
          <strong>{t('todayIntentionLabel')}:</strong> “{rec.intention}”
        </p>
      )}

      {yesterdayLine && (
        <p className="yesterday-strip">
          <strong>{t('yesterdayWroteLabel')}:</strong> “{yesterdayLine}”
        </p>
      )}

      {showStreakNudge && (
        <div className="today-intention-strip">
          <p style={{ margin: '0 0 8px' }}>🔥 {t('streakNudgeBody')}</p>
          <div className="setup-tips-actions">
            <Link className="btn btn-primary" to="/practice">
              {t('streakNudgeCta')}
            </Link>
            <button type="button" className="btn" onClick={() => setDismissedStreakNudgeDay(today)}>
              {t('streakNudgeDismiss')}
            </button>
          </div>
        </div>
      )}

      {!seenSetupTips && (
        <div className="card setup-tips-card">
          <h3>{t('setupTipsTitle')}</h3>
          <p className="small muted">{t('setupTipsBody')}</p>
          <ul className="setup-tips-list">
            <li>{t('setupTipReminders')}</li>
            <li>{t('setupTipMusic')}</li>
            <li>{t('setupTipInstall')}</li>
          </ul>
          <div className="setup-tips-actions">
            <button type="button" className="btn btn-primary" onClick={() => openSettings('reminders')}>
              {t('setupTipsRemindersBtn')}
            </button>
            <button type="button" className="btn btn-primary" onClick={() => openSettings('music')}>
              {t('setupTipsMusicBtn')}
            </button>
            <button type="button" className="btn btn-primary" onClick={() => openSettings('install')}>
              {t('setupTipsInstallBtn')}
            </button>
            <button type="button" className="btn" onClick={() => setSeenSetupTips(true)}>
              {t('setupTipsDismiss')}
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <h3>{t('todayJourneyCard')}</h3>
        {tasks
          .filter((tk) => !tk.secondary)
          .map((tk) => (
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
        <h4 className="today-also-heading">{t('taskAlsoToday')}</h4>
        {tasks
          .filter((tk) => tk.secondary)
          .map((tk) => (
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
        {coreComplete && (
          <>
            <p className="pill" style={{ marginTop: 12 }}>{t('todayFullHarmony')}</p>
            <div className="visit-banner-row" style={{ marginTop: 10 }}>
              <Link className="visit-banner" to="/forest">
                {forest.stage.emoji} {t('visitForestBanner')}
              </Link>
              <Link className="visit-banner" to="/world">
                {world.stage.emoji} {t('visitWorldBanner')}
              </Link>
            </div>
          </>
        )}
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

      {echoCard && (
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => setShowEchoCard(true)}>
          <h3>
            {echoCard.emoji} {t('weeklyEchoTitle')}
          </h3>
          <p className="small muted" style={{ marginBottom: 4 }}>{t('weeklyEchoSubtitle')}</p>
          <p style={{ margin: 0 }}>
            <strong>{L(echoCard.title)}</strong>
          </p>
        </div>
      )}

      {showEchoCard && echoCard && <CardModal card={echoCard} onClose={() => setShowEchoCard(false)} />}

      {showWeekly && (
        <Modal onClose={closeWeekly}>
          <h2>{t('weeklyReviewTitle')}</h2>
          <p className="small muted">
            {t('weeklyReviewStreak')}: 🔥 {stats.streakCurrent}
          </p>
          <div className="quote-card" style={{ marginTop: 12 }}>
            <p className="small muted" style={{ marginBottom: 4 }}>{t('weeklyReviewQuote')}</p>
            <p className="quote-text">“{L(weekQuote.text)}”</p>
            <p className="quote-author">— {L(weekQuote.author)}</p>
          </div>
          {weekChallenge ? (
            <p style={{ marginTop: 12 }}>
              <strong>{t('weeklyReviewVirtue')}:</strong> {weekChallenge.emoji} {L(weekChallenge.virtue)}
            </p>
          ) : (
            <p className="small muted" style={{ marginTop: 12 }}>{t('weeklyReviewEmpty')}</p>
          )}
          {(weekIntention || weekImprove) && (
            <p className="small" style={{ marginTop: 10 }}>
              <strong>{t('weeklyReviewThread')}:</strong>
              {weekIntention ? ` “${weekIntention}”` : ''}
              {weekImprove ? ` → “${weekImprove}”` : ''}
            </p>
          )}
          <Link className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }} to="/practice" onClick={closeWeekly}>
            {t('weeklyReviewCta')}
          </Link>
          <button className="btn" style={{ marginTop: 8, marginLeft: 8 }} onClick={closeWeekly}>
            {t('weeklyReviewContinue')}
          </button>
        </Modal>
      )}

      {showYearly && !showWeekly && (
        <Modal onClose={closeYearly}>
          <h2>{t('yearlyReviewTitle')}</h2>
          <p>{t('yearlyReviewBody')}</p>
          <p className="small muted" style={{ marginTop: 10 }}>
            {season.emoji} {L(season.virtue)} · 🔥 {stats.streakBest} · {stats.xp} XP
          </p>
          <Link className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }} to="/practice" onClick={closeYearly}>
            {t('yearlyReviewCta')}
          </Link>
          <button className="btn" style={{ marginTop: 8, marginLeft: 8 }} onClick={closeYearly}>
            {t('yearlyReviewContinue')}
          </button>
        </Modal>
      )}
    </div>
  );
}
