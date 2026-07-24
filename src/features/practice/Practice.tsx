import { useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import { QUOTES } from '../../data/quotes';
import { CHALLENGES } from '../../data/challenges';
import { dailyQuoteIndex, dailyChallengeIndex } from '../../engine/community';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { yourNoteLabel, journalCount } from '../../i18n/strings';

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
        {locale === 'en' && quote.originalZh && <p className="quote-zh">{quote.originalZh}</p>}
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
          <button className="btn btn-primary" style={{ marginTop: 10 }} disabled={!text.trim()} onClick={() => setIntention(text.trim())}>
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
  const [note, setNote] = useState('');
  const { t, L, locale } = useT();
  const challenge = CHALLENGES[dailyChallengeIndex(today)];

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
  const { t } = useT();

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
      ) : (
        <>
          <p className="small muted">{t('reflectionIntro')}</p>
          <label className="small">{t('reflectionQ1')}</label>
          <textarea rows={2} value={learned} onChange={(e) => setLearned(e.target.value)} />
          <label className="small">{t('reflectionQ2')}</label>
          <textarea rows={2} value={virtue} onChange={(e) => setVirtue(e.target.value)} />
          <label className="small">{t('reflectionQ3')}</label>
          <textarea rows={2} value={improve} onChange={(e) => setImprove(e.target.value)} />
          <button
            className="btn btn-primary"
            style={{ marginTop: 10 }}
            disabled={!learned.trim() || !virtue.trim() || !improve.trim()}
            onClick={() => submitReflection(learned.trim(), virtue.trim(), improve.trim())}
          >
            {t('reflectionBtn')}
          </button>
        </>
      )}
    </div>
  );
}

function Journal() {
  const days = useJourney((s) => s.days);
  const [open, setOpen] = useState(false);
  const { t, L, locale } = useT();
  const entries = Object.entries(days)
    .filter(([, rec]) => rec.intention || rec.reflection || rec.challengeDone)
    .sort(([a], [b]) => (a < b ? 1 : -1));

  if (entries.length === 0) return null;
  return (
    <div className="card">
      <h3>{t('journalTitle')}</h3>
      <p className="small muted">{journalCount(locale, entries.length)}</p>
      {!open ? (
        <button className="btn" onClick={() => setOpen(true)}>
          {t('journalBrowse')}
        </button>
      ) : (
        <>
          {entries.map(([day, rec]) => {
            const ch = rec.challengeId ? CHALLENGES.find((c) => c.id === rec.challengeId) : undefined;
            return (
              <div key={day} style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
                <strong>{day}</strong>
                {rec.intention && (
                  <p className="small" style={{ margin: '4px 0' }}>
                    🌅 “{rec.intention}”
                  </p>
                )}
                {rec.challengeDone && (
                  <p className="small" style={{ margin: '4px 0' }}>
                    🎯 {ch ? L(ch.virtue) : ''}
                    {rec.challengeNote ? ` — “${rec.challengeNote}”` : ''}
                  </p>
                )}
                {rec.reflection && (
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
      <PageHeader emoji="🎯" title={t('practiceTitle')} zh={t('practiceZh')} subtitle={t('practiceSubtitle')} />
      <MorningCard today={today} />
      <ChallengeCard today={today} />
      <EveningCard today={today} />
      <Journal />
    </div>
  );
}
