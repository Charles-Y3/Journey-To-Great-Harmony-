import { useState } from 'react';
import { TIMELINE } from '../../data/timeline';
import type { TimelinePoint } from '../../data/types';
import { useJourney } from '../../state/store';
import { completedEraIds } from '../../state/selectors';
import { Modal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { timelineProgressLabel, questionProgress, nextOrFinish, takeQuizBtn, quizResult, completeStudyBtn } from '../../i18n/strings';

function PointModal({ point, onClose }: { point: TimelinePoint; onClose: () => void }) {
  const done = useJourney((s) => s.completedTimelinePoints.includes(point.id));
  const completeTimelinePoint = useJourney((s) => s.completeTimelinePoint);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const { t, L, locale } = useT();

  const q = point.quiz[qIndex];
  const finishedQuiz = qIndex >= point.quiz.length;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setCorrectCount((c) => c + 1);
  }

  function next() {
    setPicked(null);
    setQIndex((i) => i + 1);
  }

  return (
    <Modal onClose={onClose} wide>
      <h2>
        {point.emoji} {L(point.title)}
      </h2>
      <p className="small muted">{L(point.years)}</p>
      <p>{L(point.background)}</p>

      <h4>{t('keyFigures')}</h4>
      <p className="small">{L(point.figures).join(' · ')}</p>
      <h4>{t('importantTeachings')}</h4>
      <ul className="small">
        {L(point.teachings).map((tItem) => (
          <li key={tItem}>{tItem}</li>
        ))}
      </ul>
      <h4>{t('relatedConcepts')}</h4>
      <p>
        {L(point.concepts).map((c) => (
          <span key={c} className="pill" style={{ marginRight: 6, marginBottom: 6, display: 'inline-block' }}>
            {c}
          </span>
        ))}
      </p>

      {done ? (
        <p>
          <span className="pill">{t('studiedLabel')}</span>
        </p>
      ) : !quizStarted ? (
        <button className="btn btn-primary" onClick={() => setQuizStarted(true)}>
          {takeQuizBtn(locale, point.quiz.length)}
        </button>
      ) : !finishedQuiz ? (
        <div className="card" style={{ marginTop: 10 }}>
          <p className="small muted">{questionProgress(locale, qIndex + 1, point.quiz.length)}</p>
          <p>
            <strong>{L(q.q)}</strong>
          </p>
          {L(q.options).map((opt, i) => {
            let cls = 'btn quiz-option';
            if (picked !== null && i === q.answer) cls += ' correct';
            else if (picked !== null && i === picked) cls += ' wrong';
            return (
              <button key={i} className={cls} disabled={picked !== null} onClick={() => pick(i)}>
                {opt}
              </button>
            );
          })}
          {picked !== null && (
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={next}>
              {nextOrFinish(locale, qIndex + 1 >= point.quiz.length)}
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ marginTop: 10 }}>
          <p>{quizResult(locale, correctCount, point.quiz.length)}</p>
          <button className="btn btn-primary" onClick={() => completeTimelinePoint(point.id, correctCount)}>
            {completeStudyBtn(locale, 15 + correctCount * 5)}
          </button>
        </div>
      )}
    </Modal>
  );
}

export default function Timeline() {
  const completedPoints = useJourney((s) => s.completedTimelinePoints);
  const [open, setOpen] = useState<TimelinePoint | null>(null);
  const { t, L, locale } = useT();
  const doneEras = completedEraIds(completedPoints);
  const totalPoints = TIMELINE.reduce((n, e) => n + e.points.length, 0);

  return (
    <div>
      <PageHeader emoji="⏳" title={t('timelineTitle')} subtitle={t('timelineSubtitle')} />
      <div className="card">
        <ProgressBar
          value={completedPoints.length}
          max={totalPoints}
          label={timelineProgressLabel(locale, completedPoints.length, totalPoints, doneEras.length, TIMELINE.length)}
        />
      </div>

      <div className="timeline-scroll">
        {TIMELINE.map((era) => {
          const eraDone = doneEras.includes(era.id);
          return (
            <div className="era-card" key={era.id}>
              <div className="timeline-rail" />
              <div className="era-emoji">{era.emoji}</div>
              <h3 style={{ marginBottom: 2 }}>{L(era.name)}</h3>
              <div className="era-period">{L(era.period)}</div>
              {eraDone && (
                <p style={{ margin: '8px 0 0' }}>
                  <span className="pill">🏅 {L(era.badgeTitle)}</span>
                </p>
              )}
              {era.points.map((p) => {
                const done = completedPoints.includes(p.id);
                return (
                  <button key={p.id} className="btn point-btn" onClick={() => setOpen(p)}>
                    {done ? '✅' : p.emoji} {L(p.title)}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <p className="small muted">{t('timelineScrollHint')}</p>

      {open && <PointModal point={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
