import { useState } from 'react';
import { TIMELINE } from '../../data/timeline';
import type { TimelinePoint, TimelineEra, TimelineLevel } from '../../data/types';
import { useJourney } from '../../state/store';
import { completedEraIds, timelineStudiesToday, DAILY_TIMELINE_CAP, type JourneyData } from '../../state/selectors';
import { useToday } from '../../state/store';
import { Modal, CapstoneModal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import {
  timelineProgressLabel,
  questionProgress,
  nextOrFinish,
  takeQuizBtn,
  quizResult,
  completeStudyBtn,
  capstoneEraPrompt,
  capstoneEntryBtn,
} from '../../i18n/strings';
import { shuffledIndices } from '../../engine/quiz';

function LevelBody({
  level,
  capReached,
  onComplete,
}: {
  level: TimelineLevel;
  capReached: boolean;
  onComplete: (correctCount: number) => void;
}) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() => shuffledIndices(level.quiz[0].options.en.length));
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const { t, L, locale } = useT();

  const q = level.quiz[qIndex];
  const finishedQuiz = qIndex >= level.quiz.length;
  const answered = picked !== null;
  const correct = answered && order[picked] === q.answer;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (order[i] === q.answer) setCorrectCount((c) => c + 1);
  }

  function retry() {
    setOrder(shuffledIndices(q.options.en.length));
    setPicked(null);
  }

  function next() {
    const nextIndex = qIndex + 1;
    setPicked(null);
    setQIndex(nextIndex);
    if (nextIndex < level.quiz.length) setOrder(shuffledIndices(level.quiz[nextIndex].options.en.length));
  }

  return (
    <div style={{ marginTop: 10 }}>
      <p>{L(level.background)}</p>

      <h4>{t('keyFigures')}</h4>
      <p className="small">{L(level.figures).join(' · ')}</p>
      <h4>{t('importantTeachings')}</h4>
      <ul className="small">
        {L(level.teachings).map((tItem) => (
          <li key={tItem}>{tItem}</li>
        ))}
      </ul>
      <h4>{t('relatedConcepts')}</h4>
      <p>
        {L(level.concepts).map((c) => (
          <span key={c} className="pill" style={{ marginRight: 6, marginBottom: 6, display: 'inline-block' }}>
            {c}
          </span>
        ))}
      </p>

      {!quizStarted ? (
        capReached ? (
          <p className="small muted">{t('timelineDailyCapNote')}</p>
        ) : (
          <button className="btn btn-primary" onClick={() => setQuizStarted(true)}>
            {takeQuizBtn(locale, level.quiz.length)}
          </button>
        )
      ) : !finishedQuiz ? (
        <div className="card" style={{ marginTop: 10 }}>
          <p className="small muted">{questionProgress(locale, qIndex + 1, level.quiz.length)}</p>
          <p>
            <strong>{L(q.q)}</strong>
          </p>
          {order.map((origIdx, i) => {
            const opts = L(q.options);
            let cls = 'btn quiz-option';
            if (answered && i === picked) cls += correct ? ' correct' : ' wrong';
            return (
              <button key={origIdx} className={cls} disabled={answered} onClick={() => pick(i)}>
                {opts[origIdx]}
              </button>
            );
          })}
          {answered && (
            <p className="small" style={{ marginTop: 6 }}>
              {correct ? t('quizCorrectMsg') : t('quizWrongMsg')}
            </p>
          )}
          {answered && !correct && (
            <button className="btn" style={{ marginTop: 4 }} onClick={retry}>
              {t('quizTryAgain')}
            </button>
          )}
          {correct && (
            <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={next}>
              {nextOrFinish(locale, qIndex + 1 >= level.quiz.length)}
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ marginTop: 10 }}>
          <p>{quizResult(locale, correctCount, level.quiz.length)}</p>
          <button className="btn btn-primary" onClick={() => onComplete(correctCount)}>
            {completeStudyBtn(locale, 15 + correctCount * 5)}
          </button>
        </div>
      )}
    </div>
  );
}

function PointModal({ point, onClose }: { point: TimelinePoint; onClose: () => void }) {
  const timelinePointLevels = useJourney((s) => s.timelinePointLevels);
  const completeTimelineLevel = useJourney((s) => s.completeTimelineLevel);
  const today = useToday();
  const data = useJourney() as unknown as JourneyData;
  const levelsDone = timelinePointLevels[point.id] ?? 0;
  const capReached = timelineStudiesToday(data, today) >= DAILY_TIMELINE_CAP;
  const [openLevel, setOpenLevel] = useState<number | null>(levelsDone < 3 ? levelsDone : null);
  const { t, L } = useT();

  return (
    <Modal onClose={onClose} wide>
      <h2>
        {point.emoji} {L(point.title)}
      </h2>
      <p className="small muted">{L(point.years)}</p>

      {point.levels.map((lvl, i) => {
        const done = i < levelsDone;
        const locked = i > levelsDone;
        const open = openLevel === i;
        let cls = 'btn';
        if (done) cls += ' quiz-option correct';
        return (
          <div key={i} className="card" style={{ marginBottom: 10 }}>
            <button
              className={cls}
              style={{ width: '100%', textAlign: 'left' }}
              disabled={locked}
              onClick={() => setOpenLevel(open ? null : i)}
            >
              {done ? '✅' : locked ? '🔒' : '📖'} {L(lvl.label)}
            </button>
            {locked && <p className="small muted" style={{ marginTop: 6 }}>{t('timelineLevelLockedNote')}</p>}
            {open && !locked && !done && (
              <LevelBody level={lvl} capReached={capReached} onComplete={(correct) => completeTimelineLevel(point.id, i, correct)} />
            )}
            {open && done && (
              <div style={{ marginTop: 10 }}>
                <p>{L(lvl.background)}</p>
                <p>
                  <span className="pill">{t('studiedLabel')}</span>
                </p>
              </div>
            )}
          </div>
        );
      })}
    </Modal>
  );
}

export default function Timeline() {
  const completedPoints = useJourney((s) => s.completedTimelinePoints);
  const capstones = useJourney((s) => s.capstones);
  const submitCapstone = useJourney((s) => s.submitCapstone);
  const [open, setOpen] = useState<TimelinePoint | null>(null);
  const [capstoneEra, setCapstoneEra] = useState<TimelineEra | null>(null);
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
              {eraDone && capstones[era.id] && (
                <p style={{ margin: '8px 0 0' }}>
                  <span className="pill">🏅 {L(era.badgeTitle)}</span>
                </p>
              )}
              {eraDone && !capstones[era.id] && (
                <button className="btn" style={{ marginTop: 8 }} onClick={() => setCapstoneEra(era)}>
                  🖋️ {capstoneEntryBtn(locale, L(era.name))}
                </button>
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
      {capstoneEra && (
        <CapstoneModal
          name={L(capstoneEra.name)}
          prompt={capstoneEraPrompt(locale, L(capstoneEra.name))}
          onSubmit={(text) => {
            submitCapstone(capstoneEra.id, text);
            setCapstoneEra(null);
          }}
          onClose={() => setCapstoneEra(null)}
        />
      )}
    </div>
  );
}
