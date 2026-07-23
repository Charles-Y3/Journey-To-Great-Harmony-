import { useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import { QUOTES } from '../../data/quotes';
import { CHALLENGES } from '../../data/challenges';
import { dailyQuoteIndex, dailyChallengeIndex } from '../../engine/community';
import { PageHeader } from '../../components/ui';

function MorningCard({ today }: { today: string }) {
  const rec = useJourney((s) => s.days[today] ?? {});
  const setIntention = useJourney((s) => s.setIntention);
  const [text, setText] = useState('');
  const quote = QUOTES[dailyQuoteIndex(today, QUOTES.length)];

  return (
    <div className="card">
      <h3>🌅 Morning Reflection</h3>
      <div className="quote-card" style={{ marginBottom: 14 }}>
        <p className="quote-text">“{quote.text}”</p>
        {quote.zh && <p className="quote-zh">{quote.zh}</p>}
        <p className="quote-author">— {quote.author}</p>
      </div>
      {rec.intention ? (
        <p>
          <span className="pill">Intention set</span>&nbsp; “{rec.intention}”
        </p>
      ) : (
        <>
          <p className="small muted">What is your intention for today? One honest sentence is enough.</p>
          <textarea
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Today I will…"
          />
          <button
            className="btn btn-primary"
            style={{ marginTop: 10 }}
            disabled={!text.trim()}
            onClick={() => setIntention(text.trim())}
          >
            Set intention (+5 XP)
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
  const challenge = CHALLENGES[dailyChallengeIndex(today)];

  return (
    <div className="card">
      <h3>
        {challenge.emoji} Daily Challenge <span className="pill pill-gold">{challenge.virtue}</span>
      </h3>
      <p>{challenge.text}</p>
      {rec.challengeDone ? (
        <>
          <p>
            <span className="pill">Challenge complete ✓</span>
          </p>
          {rec.challengeNote && <p className="small muted">Your note: “{rec.challengeNote}”</p>}
        </>
      ) : (
        <>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional: how did it go?"
          />
          <button
            className="btn btn-primary"
            style={{ marginTop: 10 }}
            onClick={() => completeChallenge(challenge.id, note.trim() || undefined)}
          >
            I practised this today (+15 XP)
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

  return (
    <div className="card">
      <h3>🪞 Evening Reflection</h3>
      {rec.reflection ? (
        <>
          <p>
            <span className="pill">Reflection written ✓</span>
          </p>
          <p className="small">
            <strong>Learned:</strong> {rec.reflection.learned}
          </p>
          <p className="small">
            <strong>Virtue practised:</strong> {rec.reflection.virtue}
          </p>
          <p className="small">
            <strong>Tomorrow:</strong> {rec.reflection.improve}
          </p>
        </>
      ) : (
        <>
          <p className="small muted">Three questions, honestly but kindly. A sentence each is plenty.</p>
          <label className="small">What did I learn today?</label>
          <textarea rows={2} value={learned} onChange={(e) => setLearned(e.target.value)} />
          <label className="small">What virtue did I practise?</label>
          <textarea rows={2} value={virtue} onChange={(e) => setVirtue(e.target.value)} />
          <label className="small">How can I improve tomorrow?</label>
          <textarea rows={2} value={improve} onChange={(e) => setImprove(e.target.value)} />
          <button
            className="btn btn-primary"
            style={{ marginTop: 10 }}
            disabled={!learned.trim() || !virtue.trim() || !improve.trim()}
            onClick={() => submitReflection(learned.trim(), virtue.trim(), improve.trim())}
          >
            Save reflection (+10 XP)
          </button>
        </>
      )}
    </div>
  );
}

function Journal() {
  const days = useJourney((s) => s.days);
  const [open, setOpen] = useState(false);
  const entries = Object.entries(days)
    .filter(([, rec]) => rec.intention || rec.reflection || rec.challengeDone)
    .sort(([a], [b]) => (a < b ? 1 : -1));

  if (entries.length === 0) return null;
  return (
    <div className="card">
      <h3>📔 Journal</h3>
      <p className="small muted">{entries.length} day{entries.length === 1 ? '' : 's'} recorded on your journey.</p>
      {!open ? (
        <button className="btn" onClick={() => setOpen(true)}>
          Browse journal
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
                    🎯 {ch ? `${ch.virtue} challenge` : 'Challenge'} completed
                    {rec.challengeNote ? ` — “${rec.challengeNote}”` : ''}
                  </p>
                )}
                {rec.reflection && (
                  <p className="small" style={{ margin: '4px 0' }}>
                    🪞 Learned: {rec.reflection.learned} · Virtue: {rec.reflection.virtue} · Tomorrow:{' '}
                    {rec.reflection.improve}
                  </p>
                )}
              </div>
            );
          })}
          <button className="btn" style={{ marginTop: 10 }} onClick={() => setOpen(false)}>
            Close journal
          </button>
        </>
      )}
    </div>
  );
}

export default function Practice() {
  const today = useToday();
  return (
    <div>
      <PageHeader
        emoji="🎯"
        title="Daily Virtue Practice"
        zh="修行"
        subtitle="Knowledge alone does not transform people. Practice does."
      />
      <MorningCard today={today} />
      <ChallengeCard today={today} />
      <EveningCard today={today} />
      <Journal />
    </div>
  );
}
