import { useState } from 'react';
import { TIMELINE, ALL_POINTS } from '../../data/timeline';
import type { TimelinePoint, TimelineEra, TimelineLevel } from '../../data/types';
import { useJourney } from '../../state/store';
import {
  completedEraIds,
  fullyMasteredEraIds,
  timelineWaveReady,
  timelinePointsReadyForWave,
  timelineStudiesToday,
  DAILY_TIMELINE_CAP,
  type JourneyData,
} from '../../state/selectors';
import { useToday } from '../../state/store';
import { Modal, CapstoneModal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import {
  timelineProgressLabel,
  timelineMasteryProgressLabel,
  timelineWaveLockedNote,
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
  const [showTeaching, setShowTeaching] = useState(true);
  const [qIndex, setQIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() => shuffledIndices(level.quiz[0].options.en.length));
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [nudgeIdx, setNudgeIdx] = useState(0);
  const { t, L, locale } = useT();

  const finishedQuiz = qIndex >= level.quiz.length;
  const q = finishedQuiz ? null : level.quiz[qIndex];
  const answered = !finishedQuiz && picked !== null;
  const correct = !!q && answered && order[picked!] === q.answer;
  const nudgeKeys = ['quizNudgeReread', 'quizNudgeBreathe', 'quizNudgeLookAgain'] as const;
  const nudge = q?.nudge ? L(q.nudge) : t(nudgeKeys[nudgeIdx % nudgeKeys.length]);

  function pick(i: number) {
    if (!q || picked !== null) return;
    setPicked(i);
    if (order[i] === q.answer) setCorrectCount((c) => c + 1);
  }

  function retry() {
    if (!q) return;
    setOrder(shuffledIndices(q.options.en.length));
    setPicked(null);
    setNudgeIdx((n) => n + 1);
  }

  function next() {
    const nextIndex = qIndex + 1;
    setPicked(null);
    setQIndex(nextIndex);
    if (nextIndex < level.quiz.length) setOrder(shuffledIndices(level.quiz[nextIndex].options.en.length));
  }

  return (
    <div style={{ marginTop: 10 }}>
      {showTeaching && (
        <>
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
        </>
      )}

      {!quizStarted ? (
        capReached ? (
          <>
            <p className="small muted">{t('timelineDailyCapNote')}</p>
            <p className="small muted">{t('timelineDailyCapWhy')}</p>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => setQuizStarted(true)}>
            {takeQuizBtn(locale, level.quiz.length)}
          </button>
        )
      ) : !finishedQuiz && q ? (
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
            <>
              <p className="small muted" style={{ marginTop: 4 }}>{nudge}</p>
              <button
                className="btn"
                style={{ marginTop: 4, marginRight: 8 }}
                onClick={() => {
                  setShowTeaching(true);
                  setQuizStarted(false);
                  retry();
                }}
              >
                {t('quizRereadTeaching')}
              </button>
              <button className="btn" style={{ marginTop: 4 }} onClick={retry}>
                {t('quizTryAgain')}
              </button>
            </>
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
  const { t, L, locale } = useT();

  return (
    <Modal onClose={onClose} wide>
      <h2>
        {point.emoji} {L(point.title)}
      </h2>
      <p className="small muted">{L(point.years)}</p>

      {point.levels.map((lvl, i) => {
        const done = i < levelsDone;
        const locked = i > levelsDone;
        const waveLocked = i === levelsDone && !timelineWaveReady(timelinePointLevels, i);
        const open = openLevel === i;
        let cls = 'btn';
        if (done) cls += ' quiz-option correct';
        return (
          <div key={i} className="card" style={{ marginBottom: 10 }}>
            <button
              className={cls}
              style={{ width: '100%', textAlign: 'left' }}
              disabled={locked || waveLocked}
              onClick={() => setOpenLevel(open ? null : i)}
            >
              {done ? '✅' : locked || waveLocked ? '🔒' : '📖'} {L(lvl.label)}
            </button>
            {locked && <p className="small muted" style={{ marginTop: 6 }}>{t('timelineLevelLockedNote')}</p>}
            {waveLocked && (
              <p className="small muted" style={{ marginTop: 6 }}>
                {timelineWaveLockedNote(locale, timelinePointsReadyForWave(timelinePointLevels, i), ALL_POINTS.length)}
              </p>
            )}
            {open && !locked && !waveLocked && !done && (
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
  const timelinePointLevels = useJourney((s) => s.timelinePointLevels);
  const capstones = useJourney((s) => s.capstones);
  const submitCapstone = useJourney((s) => s.submitCapstone);
  const [open, setOpen] = useState<TimelinePoint | null>(null);
  const [capstoneEra, setCapstoneEra] = useState<TimelineEra | null>(null);
  const { t, L, locale } = useT();
  const doneEras = completedEraIds(completedPoints);
  const masteredEras = fullyMasteredEraIds(timelinePointLevels);
  const masteredPointCount = ALL_POINTS.filter((p) => (timelinePointLevels[p.id] ?? 0) >= p.levels.length).length;
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
        <ProgressBar
          value={masteredPointCount}
          max={totalPoints}
          label={timelineMasteryProgressLabel(locale, masteredPointCount, totalPoints, masteredEras.length, TIMELINE.length)}
        />
      </div>

      <div className="timeline-scroll">
        {TIMELINE.map((era) => {
          const eraMastered = masteredEras.includes(era.id);
          return (
            <div className="era-card" key={era.id}>
              <div className="timeline-rail" />
              <div className="era-emoji">{era.emoji}</div>
              <h3 style={{ marginBottom: 2 }}>{L(era.name)}</h3>
              <div className="era-period">{L(era.period)}</div>
              {eraMastered && capstones[era.id] && (
                <p style={{ margin: '8px 0 0' }}>
                  <span className="pill">🏅 {L(era.badgeTitle)}</span>
                </p>
              )}
              {eraMastered && !capstones[era.id] && (
                <button className="btn" style={{ marginTop: 8 }} onClick={() => setCapstoneEra(era)}>
                  🖋️ {capstoneEntryBtn(locale, L(era.name))}
                </button>
              )}
              {era.points.map((p) => {
                const levelsDone = timelinePointLevels[p.id] ?? 0;
                const mastered = levelsDone >= p.levels.length;
                return (
                  <button key={p.id} className="btn point-btn" onClick={() => setOpen(p)}>
                    {mastered ? '✅' : p.emoji} {L(p.title)}
                    {levelsDone > 0 && !mastered && <span className="small muted"> ({levelsDone}/{p.levels.length})</span>}
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
