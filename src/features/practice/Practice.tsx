import { useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import type { JourneyData } from '../../state/selectors';
import { QUOTES } from '../../data/quotes';
import { CHALLENGES } from '../../data/challenges';
import { dailyQuoteIndex, dailyChallenge } from '../../engine/community';
import { maxChallengeTierForRankIndex, rankIndexForXp } from '../../engine/progression';
import { meaningfulLength } from '../../engine/textQuality';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { yourNoteLabel, journalCount, minLengthHint, type UiKey } from '../../i18n/strings';

// Evening reflection only opens from 5pm local time, up to midnight — it's
// meant to be a look back on the day that's actually happened, not
// something to front-load in the morning.
const EVENING_OPEN_HOUR = 17;

// Minimum effort required before a submission is accepted — trivial
// one-word "done" entries don't count as real practice.
const INTENTION_MIN = 8;
const REFLECTION_MIN = 15;

function MorningCard({ today }: { today: string }) {
  const rec = useJourney((s) => s.days[today] ?? {});
  const setIntention = useJourney((s) => s.setIntention);
  const [text, setText] = useState('');
  const { t, L, locale } = useT();
  const quote = QUOTES[dailyQuoteIndex(today, QUOTES.length)];

  return (
    <div className="card">
      <h3>{t('morningCardTitle')}</h3>
      <div className="quote-card" style={{ marginBottom: 14 }}>
        <p className="quote-text">“{L(quote.text)}”</p>
        <p className="quote-author">— {L(quote.author)}</p>
      </div>
      {rec.intention ? (
        <p>
          <span className="pill">{t('intentionSetLabel')}</span>&nbsp; “{rec.intention}”
        </p>
      ) : (
        <>
          <p className="small muted">{t('intentionPrompt')}</p>
          <textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder={t('intentionPlaceholder')} />
          <p className="small muted" style={{ marginTop: 4 }}>{minLengthHint(locale, meaningfulLength(text), INTENTION_MIN)}</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 6 }}
            disabled={meaningfulLength(text) < INTENTION_MIN}
            onClick={() => setIntention(text.trim())}
          >
            {t('intentionBtn')}
          </button>
        </>
      )}
    </div>
  );
}

function ChallengeCard({ today }: { today: string }) {
  const rec = useJourney((s) => s.days[today] ?? {});
  const completeChallenge = useJourney((s) => s.completeChallenge);
  const xp = useJourney((s) => s.xp);
  const [note, setNote] = useState('');
  const { t, L, locale } = useT();
  const challenge = dailyChallenge(today, maxChallengeTierForRankIndex(rankIndexForXp(xp)));

  return (
    <div className="card">
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
      ) : (
        <>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('challengeNotePlaceholder')} />
          <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => completeChallenge(challenge.id, note.trim() || undefined)}>
            {t('challengeBtn')}
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
  const { t, locale } = useT();
  const eveningOpen = new Date().getHours() >= EVENING_OPEN_HOUR;

  return (
    <div className="card">
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
          <p className="small muted">{t('reflectionIntro')}</p>
          <label className="small">{t('reflectionQ1')}</label>
          <textarea rows={2} value={learned} onChange={(e) => setLearned(e.target.value)} />
          <p className="small muted" style={{ margin: '4px 0 10px' }}>{minLengthHint(locale, meaningfulLength(learned), REFLECTION_MIN)}</p>
          <label className="small">{t('reflectionQ2')}</label>
          <textarea rows={2} value={virtue} onChange={(e) => setVirtue(e.target.value)} />
          <p className="small muted" style={{ margin: '4px 0 10px' }}>{minLengthHint(locale, meaningfulLength(virtue), REFLECTION_MIN)}</p>
          <label className="small">{t('reflectionQ3')}</label>
          <textarea rows={2} value={improve} onChange={(e) => setImprove(e.target.value)} />
          <p className="small muted" style={{ margin: '4px 0 10px' }}>{minLengthHint(locale, meaningfulLength(improve), REFLECTION_MIN)}</p>
          <button
            className="btn btn-primary"
            disabled={meaningfulLength(learned) < REFLECTION_MIN || meaningfulLength(virtue) < REFLECTION_MIN || meaningfulLength(improve) < REFLECTION_MIN}
            onClick={() => submitReflection(learned.trim(), virtue.trim(), improve.trim())}
          >
            {t('reflectionBtn')}
          </button>
        </>
      )}
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
  const entries = allEntries.filter(([day, rec]) => matchesJournalFilter(rec, filter) && (dateFilter === 'all' || day === dateFilter));

  if (allEntries.length === 0) return null;
  return (
    <div className="card">
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
                  {day}
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
                    {rec.challengeNote ? ` — “${rec.challengeNote}”` : ''}
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

export default function Practice() {
  const today = useToday();
  const { t } = useT();
  return (
    <div>
      <PageHeader emoji="🎯" title={t('practiceTitle')} subtitle={t('practiceSubtitle')} />
      <MorningCard today={today} />
      <ChallengeCard today={today} />
      <EveningCard today={today} />
      <Journal />
    </div>
  );
}
