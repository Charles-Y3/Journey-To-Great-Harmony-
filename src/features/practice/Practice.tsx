import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useJourney, useToday } from '../../state/store';
import type { JourneyData } from '../../state/selectors';
import { forestInfo, worldInfo } from '../../state/selectors';
import { QUOTES } from '../../data/quotes';
import { CHALLENGES } from '../../data/challenges';
import { dailyQuoteIndex, dailyChallenge } from '../../engine/community';
import { maxChallengeTierForRankIndex, rankIndexForXp, EVENING_OPEN_HOUR } from '../../engine/progression';
import { meaningfulLength, progressLength, looksLikeNonsense, TEXT_MIN } from '../../engine/textQuality';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { yourNoteLabel, journalCount, minLengthHint, challengeTimerBtn, minutesLabel, type UiKey } from '../../i18n/strings';
import { playSfx } from '../../engine/sfx';
import { useUi } from '../../state/uiStore';
import { useTodayTasks } from '../home/useTodayTasks';
import BreathGate from './BreathGate';
import StillnessTimer from './StillnessTimer';
import { isGregorianNewYearWindow, isLunarNewYearWindow, seasonalVirtueForDay } from '../../data/seasons';
import { collectPastIntentions, journalPromptFromIntentions } from '../../engine/journalPrompts';
import { useReminders } from '../../state/reminderStore';
import { MOODS, moodById } from '../../data/moods';

function openReminderSettings() {
  window.dispatchEvent(new CustomEvent('journey:open-settings', { detail: { section: 'reminders' } }));
}

function ReminderNudge({ kind }: { kind: 'morning' | 'evening' }) {
  const { t } = useT();
  const added = useReminders((s) => (kind === 'morning' ? s.morningCalendarAdded : s.eveningCalendarAdded));
  if (added) return null;
  return (
    <div className="reminder-nudge">
      <p className="small muted">{t(kind === 'morning' ? 'reminderNudgeMorning' : 'reminderNudgeEvening')}</p>
      <button type="button" className="btn" onClick={openReminderSettings}>
        {t('reminderNudgeOpenSettings')}
      </button>
    </div>
  );
}

function practiceTimeOfDay(): 'morning' | 'day' | 'evening' {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h >= EVENING_OPEN_HOUR) return 'evening';
  return 'day';
}

function MorningCard({ today }: { today: string }) {
  const rec = useJourney((s) => s.days[today] ?? {});
  const days = useJourney((s) => s.days);
  const setIntention = useJourney((s) => s.setIntention);
  const [text, setText] = useState('');
  const { t, L, locale } = useT();
  const quote = QUOTES[dailyQuoteIndex(today, QUOTES.length)];
  const season = seasonalVirtueForDay(today);
  const newYear = isGregorianNewYearWindow(today) || isLunarNewYearWindow(today);
  const pastIntentions = useMemo(() => collectPastIntentions(days), [days]);
  const fromPast = pastIntentions.length > 0;
  const promptSeed = journalPromptFromIntentions(pastIntentions, `prompt-${today}`, [
    t('journalPromptDefault1'),
    t('journalPromptDefault2'),
    t('journalPromptDefault3'),
  ]);

  return (
    <div className="card practice-card">
      <h3>{newYear ? t('newYearRitualTitle') : t('morningCardTitle')}</h3>
      {newYear && <p className="small muted">{t('newYearRitualHint')}</p>}
      <div className="quote-card" style={{ marginBottom: 14 }}>
        <p className="quote-text">“{L(quote.text)}”</p>
        <p className="quote-author">— {L(quote.author)}</p>
      </div>
      <p className="small muted" style={{ marginBottom: 10 }}>
        {season.emoji} {L(season.virtue)} — {L(season.guidance)}
      </p>
      {rec.intention ? (
        <p>
          <span className="pill">{t('intentionSetLabel')}</span>&nbsp; “{rec.intention}”
        </p>
      ) : (
        <>
          <p className="small muted">{t('intentionPrompt')}</p>
          {fromPast ? (
            <p className="journal-prompt-strip">
              <strong>{t('journalPromptFromPast')}:</strong> “{promptSeed}”
            </p>
          ) : (
            <p className="journal-prompt-strip">{promptSeed}</p>
          )}
          <textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder={t('intentionPlaceholder')} />
          <p className="small muted" style={{ marginTop: 4 }}>{minLengthHint(locale, progressLength(text), TEXT_MIN.intention)}</p>
          {progressLength(text) >= TEXT_MIN.intention && looksLikeNonsense(text) && (
            <p className="small muted">{t('textNonsenseHint')}</p>
          )}
          <button
            className="btn btn-primary"
            style={{ marginTop: 6 }}
            disabled={meaningfulLength(text) < TEXT_MIN.intention}
            onClick={() => {
              setIntention(text.trim());
              playSfx('chime');
            }}
          >
            {t('intentionBtn')}
          </button>
        </>
      )}
      <ReminderNudge kind="morning" />
    </div>
  );
}

// Challenges that explicitly ask for unaided silence — the guided timer
// gives them real in-app support instead of only the instruction text.
const SILENCE_MINUTES: Record<string, number> = {
  'ch-silence-1': 10,
  'ch-deep-silence-1': 20,
};

function ChallengeCard({ today }: { today: string }) {
  const rec = useJourney((s) => s.days[today] ?? {});
  const completeChallenge = useJourney((s) => s.completeChallenge);
  const rerollChallenge = useJourney((s) => s.rerollChallenge);
  const xp = useJourney((s) => s.xp);
  const [note, setNote] = useState('');
  const [breathing, setBreathing] = useState(false);
  const [breathDone, setBreathDone] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const { t, L, locale } = useT();
  const rerollCount = rec.challengeRerollCount ?? 0;
  const challenge = dailyChallenge(today, maxChallengeTierForRankIndex(rankIndexForXp(xp)), rerollCount);
  const canReroll = !rec.challengeDone && challenge.tier === 3 && rerollCount < 1;
  const silenceMinutes = SILENCE_MINUTES[challenge.id];

  const onBreathReady = useCallback(() => {
    setBreathing(false);
    setBreathDone(true);
  }, []);

  return (
    <div className="card practice-card">
      <h3>
        {challenge.emoji} {t('taskChallengePrefix')} <span className="pill pill-gold">{L(challenge.virtue)}</span>
      </h3>
      <p>{L(challenge.text)}</p>
      {rec.challengeDone ? (
        <>
          <p>
            <span className="pill">{t('challengeComplete')}</span>
          </p>
          {rec.challengeNote && <p className="small muted">{yourNoteLabel(locale, rec.challengeNote)}</p>}
        </>
      ) : breathing ? (
        <BreathGate onReady={onBreathReady} />
      ) : !breathDone ? (
        <>
          <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => setBreathing(true)}>
            {t('challengeBreathBtn')}
          </button>
          {canReroll && (
            <>
              <button className="btn" style={{ marginTop: 10, marginLeft: 8 }} onClick={() => rerollChallenge()}>
                {t('challengeRerollBtn')}
              </button>
              <p className="small muted" style={{ marginTop: 6 }}>{t('challengeRerollHint')}</p>
            </>
          )}
        </>
      ) : (
        <>
          {silenceMinutes && !rec.challengeDone && (
            <div style={{ marginBottom: 12 }}>
              {showTimer ? (
                <StillnessTimer minutes={silenceMinutes} />
              ) : (
                <>
                  <p className="small muted">{t('challengeTimerIntro')}</p>
                  <button className="btn" onClick={() => setShowTimer(true)}>
                    {challengeTimerBtn(locale, silenceMinutes)}
                  </button>
                </>
              )}
            </div>
          )}
          <p className="small muted">{t('challengeNoteHint')}</p>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('challengeNotePlaceholder')} />
          <p className="small muted" style={{ marginTop: 4 }}>{minLengthHint(locale, progressLength(note), TEXT_MIN.challengeNote)}</p>
          {progressLength(note) >= TEXT_MIN.challengeNote && looksLikeNonsense(note) && (
            <p className="small muted">{t('textNonsenseHint')}</p>
          )}
          <button
            className="btn btn-primary"
            style={{ marginTop: 10 }}
            disabled={
              meaningfulLength(note) < TEXT_MIN.challengeNote || looksLikeNonsense(note)
            }
            onClick={() => {
              const trimmed = note.trim();
              if (meaningfulLength(trimmed) < TEXT_MIN.challengeNote || looksLikeNonsense(trimmed)) return;
              completeChallenge(challenge.id, trimmed);
              playSfx('bell');
            }}
          >
            {t('challengeBtn')}
          </button>
        </>
      )}
    </div>
  );
}

function scrollToPracticeFocus(focusId: string) {
  document.getElementById(focusId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function HeartCheckCard({ today }: { today: string }) {
  const rec = useJourney((s) => s.days[today] ?? {});
  const setMoodCheck = useJourney((s) => s.setMoodCheck);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, L, locale } = useT();
  const saved = rec.mood ? moodById(rec.mood.id) : undefined;
  const [picked, setPicked] = useState<string | null>(saved?.id ?? null);
  const [note, setNote] = useState(rec.mood?.note ?? '');
  const [editing, setEditing] = useState(!saved);

  useEffect(() => {
    setPicked(rec.mood?.id ?? null);
    setNote(rec.mood?.note ?? '');
    setEditing(!rec.mood);
  }, [today, rec.mood?.id, rec.mood?.note]);

  const option = picked ? moodById(picked) : undefined;
  const noteOk = !note.trim() || meaningfulLength(note) >= TEXT_MIN.intention;

  function followMoodAction() {
    if (!saved?.actionTo) return;
    if (saved.actionFocus) {
      if (location.pathname === '/practice' || location.pathname === saved.actionTo) {
        scrollToPracticeFocus(saved.actionFocus);
        return;
      }
      navigate(saved.actionTo, { state: { focus: saved.actionFocus } });
      return;
    }
    navigate(saved.actionTo);
  }

  return (
    <div className="card practice-card" id="heart-check">
      <h3>{t('heartCardTitle')}</h3>
      <p className="small muted">{t('heartCardIntro')}</p>
      {!editing && saved ? (
        <>
          <p>
            <span className="pill">{t('heartCardSaved')}</span>&nbsp; {saved.emoji} {L(saved.label)}
          </p>
          {rec.mood?.note && <p className="small">“{rec.mood.note}”</p>}
          <p className="small muted">{L(saved.response)}</p>
          <div className="glyph-actions" style={{ justifyContent: 'flex-start', marginTop: 10 }}>
            {saved.actionTo && saved.actionCta && (
              <button type="button" className="btn btn-primary" onClick={followMoodAction}>
                {L(saved.actionCta)}
              </button>
            )}
            <button type="button" className="btn" onClick={() => setEditing(true)}>
              {t('heartCardChange')}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mood-pick-row">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                className={picked === m.id ? 'btn tab-btn active' : 'btn tab-btn'}
                onClick={() => setPicked(m.id)}
              >
                {m.emoji} {L(m.label)}
              </button>
            ))}
          </div>
          {option && <p className="small muted" style={{ marginTop: 10 }}>{L(option.response)}</p>}
          <label className="small" style={{ display: 'block', marginTop: 10 }}>
            {t('heartCardNoteLabel')}
          </label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t('heartCardNotePlaceholder')}
          />
          {note.trim() && (
            <p className="small muted" style={{ marginTop: 4 }}>
              {minLengthHint(locale, progressLength(note), TEXT_MIN.intention)}
            </p>
          )}
          {progressLength(note) >= TEXT_MIN.intention && looksLikeNonsense(note) && (
            <p className="small muted">{t('textNonsenseHint')}</p>
          )}
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 8 }}
            disabled={
              !picked ||
              !noteOk ||
              (note.trim().length > 0 && looksLikeNonsense(note))
            }
            onClick={() => {
              if (!picked) return;
              setMoodCheck(picked, note.trim() || undefined);
              setEditing(false);
              playSfx('chime');
            }}
          >
            {saved ? t('heartCardUpdateBtn') : t('heartCardSaveBtn')}
          </button>
        </>
      )}
    </div>
  );
}

function EveningCard({ today }: { today: string }) {
  const rec = useJourney((s) => s.days[today] ?? {});
  const submitReflection = useJourney((s) => s.submitReflection);
  const [learned, setLearned] = useState('');
  const [virtue, setVirtue] = useState('');
  const [improve, setImprove] = useState('');
  const [breathing, setBreathing] = useState(false);
  const [breathDone, setBreathDone] = useState(false);
  const { t, L, locale } = useT();
  const eveningOpen = new Date().getHours() >= EVENING_OPEN_HOUR;
  const mood = rec.mood ? moodById(rec.mood.id) : undefined;
  const onBreathReady = useCallback(() => {
    setBreathing(false);
    setBreathDone(true);
  }, []);
  const lastEveningSfxDay = useUi((s) => s.lastEveningSfxDay);
  const setLastEveningSfxDay = useUi((s) => s.setLastEveningSfxDay);

  useEffect(() => {
    if (eveningOpen && lastEveningSfxDay !== today) {
      playSfx('hush');
      setLastEveningSfxDay(today);
    }
  }, [eveningOpen, today, lastEveningSfxDay, setLastEveningSfxDay]);

  return (
    <div className="card practice-card">
      <h3>{t('eveningCardTitle')}</h3>
      {rec.reflection ? (
        <>
          <p>
            <span className="pill">{t('reflectionDone')}</span>
          </p>
          <p className="small">
            <strong>{t('reflectionLearnedLabel')}:</strong> {rec.reflection.learned}
          </p>
          <p className="small">
            <strong>{t('reflectionVirtueLabel')}:</strong> {rec.reflection.virtue}
          </p>
          <p className="small">
            <strong>{t('reflectionTomorrowLabel')}:</strong> {rec.reflection.improve}
          </p>
        </>
      ) : !eveningOpen ? (
        <p className="small muted">{t('eveningLockedNote')}</p>
      ) : (
        <>
          {rec.intention && (
            <p className="evening-intention-echo">
              {t('eveningIntentionEcho')} <em>“{rec.intention}”</em>
            </p>
          )}
          {mood && (
            <p className="evening-intention-echo">
              {t('eveningMoodEcho')} {mood.emoji} <em>{L(mood.label)}</em>
              {rec.mood?.note ? ` — “${rec.mood.note}”` : ''}
            </p>
          )}
          {breathing ? (
            <BreathGate onReady={onBreathReady} />
          ) : !breathDone ? (
            <button className="btn btn-primary" onClick={() => setBreathing(true)}>
              {t('reflectionBreathBtn')}
            </button>
          ) : (
            <>
              <p className="small muted">{t('reflectionIntro')}</p>
              <label className="small">{t('reflectionQ1')}</label>
              <textarea rows={2} value={learned} onChange={(e) => setLearned(e.target.value)} />
              <p className="small muted" style={{ margin: '4px 0 10px' }}>{minLengthHint(locale, progressLength(learned), TEXT_MIN.reflection)}</p>
              {progressLength(learned) >= TEXT_MIN.reflection && looksLikeNonsense(learned) && (
                <p className="small muted">{t('textNonsenseHint')}</p>
              )}
              <label className="small">{t('reflectionQ2')}</label>
              <textarea rows={2} value={virtue} onChange={(e) => setVirtue(e.target.value)} />
              <p className="small muted" style={{ margin: '4px 0 10px' }}>{minLengthHint(locale, progressLength(virtue), TEXT_MIN.reflection)}</p>
              {progressLength(virtue) >= TEXT_MIN.reflection && looksLikeNonsense(virtue) && (
                <p className="small muted">{t('textNonsenseHint')}</p>
              )}
              <label className="small">{rec.intention ? t('reflectionQ3WithIntention') : t('reflectionQ3')}</label>
              <textarea rows={2} value={improve} onChange={(e) => setImprove(e.target.value)} />
              <p className="small muted" style={{ margin: '4px 0 10px' }}>{minLengthHint(locale, progressLength(improve), TEXT_MIN.reflection)}</p>
              {progressLength(improve) >= TEXT_MIN.reflection && looksLikeNonsense(improve) && (
                <p className="small muted">{t('textNonsenseHint')}</p>
              )}
              <button
                className="btn btn-primary"
                disabled={meaningfulLength(learned) < TEXT_MIN.reflection || meaningfulLength(virtue) < TEXT_MIN.reflection || meaningfulLength(improve) < TEXT_MIN.reflection}
                onClick={() => {
                  submitReflection(learned.trim(), virtue.trim(), improve.trim());
                  playSfx('hush');
                }}
              >
                {t('reflectionBtn')}
              </button>
            </>
          )}
        </>
      )}
      <ReminderNudge kind="evening" />
    </div>
  );
}

type JournalFilter = 'all' | 'intention' | 'challenge' | 'reflection';

const JOURNAL_FILTERS: { id: JournalFilter; emoji: string; key: UiKey }[] = [
  { id: 'all', emoji: '📔', key: 'journalFilterAll' },
  { id: 'intention', emoji: '🌅', key: 'journalFilterIntentions' },
  { id: 'challenge', emoji: '🎯', key: 'journalFilterChallenges' },
  { id: 'reflection', emoji: '🪞', key: 'journalFilterReflections' },
];

function matchesJournalFilter(rec: JourneyData['days'][string], filter: JournalFilter): boolean {
  if (filter === 'intention') return !!rec.intention;
  if (filter === 'challenge') return !!rec.challengeDone;
  if (filter === 'reflection') return !!rec.reflection;
  return true;
}

function Journal() {
  const days = useJourney((s) => s.days);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<JournalFilter>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const { t, L, locale } = useT();
  const allEntries = Object.entries(days)
    .filter(([, rec]) => rec.intention || rec.reflection || rec.challengeDone)
    .sort(([a], [b]) => (a < b ? 1 : -1));
  const entries = allEntries.filter(([day, rec]) => matchesJournalFilter(rec, filter) && (dateFilter === 'all' || day >= dateFilter));

  if (allEntries.length === 0) {
    return (
      <div className="card practice-card journal-empty">
        <h3>{t('journalTitle')}</h3>
        <p className="journal-empty-title">{t('journalEmptyTitle')}</p>
        <p className="small muted">{t('journalEmptyDesc')}</p>
      </div>
    );
  }

  return (
    <div className="card practice-card">
      <h3>{t('journalTitle')}</h3>
      <p className="small muted">{journalCount(locale, allEntries.length)}</p>
      {!open ? (
        <button className="btn" onClick={() => setOpen(true)}>
          {t('journalBrowse')}
        </button>
      ) : (
        <>
          <div className="journal-filter-row">
            <select className="journal-filter-select" value={filter} onChange={(e) => setFilter(e.target.value as JournalFilter)}>
              {JOURNAL_FILTERS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.emoji} {t(f.key)}
                </option>
              ))}
            </select>
            <select className="journal-filter-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option value="all">{t('journalDateFilterAll')}</option>
              {allEntries.map(([day]) => (
                <option key={day} value={day}>
                  {t('journalDateFilterFromPrefix')} {day}
                </option>
              ))}
            </select>
          </div>
          {entries.length === 0 && <p className="small muted">{t('journalFilterEmpty')}</p>}
          {entries.map(([day, rec]) => {
            const ch = rec.challengeId ? CHALLENGES.find((c) => c.id === rec.challengeId) : undefined;
            return (
              <div key={day} style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
                <strong>{day}</strong>
                {(filter === 'all' || filter === 'intention') && rec.intention && (
                  <p className="small" style={{ margin: '4px 0' }}>
                    🌅 “{rec.intention}”
                  </p>
                )}
                {(filter === 'all' || filter === 'challenge') && rec.challengeDone && (
                  <p className="small" style={{ margin: '4px 0' }}>
                    🎯 {ch ? L(ch.virtue) : ''}
                    {rec.challengeNote ? (
                      <>
                        {' '}
                        — <em>“{rec.challengeNote}”</em>
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                )}
                {(filter === 'all' || filter === 'reflection') && rec.reflection && (
                  <p className="small" style={{ margin: '4px 0' }}>
                    🪞 {t('reflectionLearnedLabel')}: {rec.reflection.learned} · {t('reflectionVirtueLabel')}: {rec.reflection.virtue} ·{' '}
                    {t('reflectionTomorrowLabel')}: {rec.reflection.improve}
                  </p>
                )}
              </div>
            );
          })}
          <button className="btn" style={{ marginTop: 10 }} onClick={() => setOpen(false)}>
            {t('journalClose')}
          </button>
        </>
      )}
    </div>
  );
}

const QUIET_MOMENT_PRESETS = [5, 10, 20];

function QuietMomentCard() {
  const { t, locale } = useT();
  const [minutes, setMinutes] = useState<number | null>(null);

  return (
    <div className="card practice-card" id="quiet-moment">
      <h3>{t('quietMomentTitle')}</h3>
      <p className="small muted">{t('quietMomentDesc')}</p>
      {minutes === null ? (
        <div className="tab-row">
          {QUIET_MOMENT_PRESETS.map((m) => (
            <button key={m} type="button" className="btn tab-btn" onClick={() => setMinutes(m)}>
              {minutesLabel(locale, m)}
            </button>
          ))}
        </div>
      ) : (
        <>
          <StillnessTimer key={minutes} minutes={minutes} />
          <button type="button" className="btn" style={{ marginTop: 10 }} onClick={() => setMinutes(null)}>
            {t('close')}
          </button>
        </>
      )}
    </div>
  );
}

function GrowthVisitBanners({ today }: { today: string }) {
  const { t } = useT();
  const { doneCount, tasks } = useTodayTasks();
  const state = useJourney();
  const d = state as unknown as JourneyData;
  const forest = forestInfo(d);
  const world = worldInfo(d, today);
  const full = doneCount === tasks.length && tasks.length > 0;

  if (!full) return null;
  return (
    <div className="visit-banner-row">
      <Link className="visit-banner" to="/forest">
        {forest.stage.emoji} {t('visitForestBanner')}
      </Link>
      <Link className="visit-banner" to="/world">
        {world.stage.emoji} {t('visitWorldBanner')}
      </Link>
    </div>
  );
}

export default function Practice() {
  const today = useToday();
  const { t } = useT();
  const location = useLocation();
  const time = practiceTimeOfDay();
  const { doneCount, tasks } = useTodayTasks();
  const lastFullHarmonySfxDay = useUi((s) => s.lastFullHarmonySfxDay);
  const setLastFullHarmonySfxDay = useUi((s) => s.setLastFullHarmonySfxDay);

  useEffect(() => {
    if (doneCount === tasks.length && tasks.length > 0 && lastFullHarmonySfxDay !== today) {
      playSfx('harmony');
      setLastFullHarmonySfxDay(today);
    }
  }, [doneCount, tasks.length, today, lastFullHarmonySfxDay, setLastFullHarmonySfxDay]);

  useEffect(() => {
    const focus = (location.state as { focus?: string } | null)?.focus;
    if (!focus) return;
    const timer = window.setTimeout(() => scrollToPracticeFocus(focus), 50);
    return () => window.clearTimeout(timer);
  }, [location.state]);

  return (
    <div className="practice-page" data-time={time}>
      <PageHeader emoji="🎯" title={t('practiceTitle')} subtitle={t('practiceSubtitle')} />
      <GrowthVisitBanners today={today} />
      <MorningCard today={today} />
      <ChallengeCard today={today} />
      <HeartCheckCard today={today} />
      <EveningCard today={today} />
      <Journal />
      <QuietMomentCard />
    </div>
  );
}
