import { useState } from 'react';
import { TIMELINE } from '../../data/timeline';
import type { TimelinePoint } from '../../data/types';
import { useJourney } from '../../state/store';
import { completedEraIds } from '../../state/selectors';
import { Modal, PageHeader, ProgressBar } from '../../components/ui';

function PointModal({ point, onClose }: { point: TimelinePoint; onClose: () => void }) {
  const done = useJourney((s) => s.completedTimelinePoints.includes(point.id));
  const completeTimelinePoint = useJourney((s) => s.completeTimelinePoint);
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

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
        {point.emoji} {point.title}
      </h2>
      <p className="small muted">{point.years}</p>
      <p>{point.background}</p>

      <h4>Key figures</h4>
      <p className="small">{point.figures.join(' · ')}</p>
      <h4>Important teachings</h4>
      <ul className="small">
        {point.teachings.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <h4>Related concepts</h4>
      <p>
        {point.concepts.map((c) => (
          <span key={c} className="pill" style={{ marginRight: 6, marginBottom: 6, display: 'inline-block' }}>
            {c}
          </span>
        ))}
      </p>

      {done ? (
        <p>
          <span className="pill">Studied ✓</span>
        </p>
      ) : !quizStarted ? (
        <button className="btn btn-primary" onClick={() => setQuizStarted(true)}>
          Take the quiz ({point.quiz.length} questions)
        </button>
      ) : !finishedQuiz ? (
        <div className="card" style={{ marginTop: 10 }}>
          <p className="small muted">
            Question {qIndex + 1} of {point.quiz.length}
          </p>
          <p>
            <strong>{q.q}</strong>
          </p>
          {q.options.map((opt, i) => {
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
              {qIndex + 1 < point.quiz.length ? 'Next question' : 'Finish quiz'}
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ marginTop: 10 }}>
          <p>
            You answered <strong>{correctCount}</strong> of {point.quiz.length} correctly.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => completeTimelinePoint(point.id, correctCount)}
          >
            Complete this study (+{15 + correctCount * 5} XP)
          </button>
        </div>
      )}
    </Modal>
  );
}

export default function Timeline() {
  const completedPoints = useJourney((s) => s.completedTimelinePoints);
  const [open, setOpen] = useState<TimelinePoint | null>(null);
  const doneEras = completedEraIds(completedPoints);
  const totalPoints = TIMELINE.reduce((n, e) => n + e.points.length, 0);

  return (
    <div>
      <PageHeader
        emoji="⏳"
        title="The Wisdom Timeline"
        zh="智慧长河"
        subtitle="Understanding humanity's journey — how wisdom developed across thousands of years and every culture."
      />
      <div className="card">
        <ProgressBar
          value={completedPoints.length}
          max={totalPoints}
          label={`${completedPoints.length}/${totalPoints} points studied · ${doneEras.length}/${TIMELINE.length} eras complete`}
        />
      </div>

      <div className="timeline-scroll">
        {TIMELINE.map((era) => {
          const eraDone = doneEras.includes(era.id);
          return (
            <div className="era-card" key={era.id}>
              <div className="timeline-rail" />
              <div className="era-emoji">{era.emoji}</div>
              <h3 style={{ marginBottom: 2 }}>{era.name}</h3>
              <div className="era-period">{era.period}</div>
              {eraDone && (
                <p style={{ margin: '8px 0 0' }}>
                  <span className="pill">🏅 {era.badgeTitle}</span>
                </p>
              )}
              {era.points.map((p) => {
                const done = completedPoints.includes(p.id);
                return (
                  <button key={p.id} className="btn point-btn" onClick={() => setOpen(p)}>
                    {done ? '✅' : p.emoji} {p.title}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <p className="small muted">Scroll sideways to travel through time →</p>

      {open && <PointModal point={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
