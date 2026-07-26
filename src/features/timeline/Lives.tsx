import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SAGES, isSageLifeComplete } from '../../data/sages';
import type { Sage, SageChapter } from '../../data/types';
import { TOPICS } from '../../data/knowledgeTree';
import { useJourney, useToday } from '../../state/store';
import {
  sageCapstoneKey,
  timelineStudiesToday,
  DAILY_TIMELINE_CAP,
  type JourneyData,
} from '../../state/selectors';
import { XP_FOR } from '../../engine/progression';
import { Modal, CapstoneModal, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import {
  questionProgress,
  nextOrFinish,
  takeQuizBtn,
  quizResult,
  completeStudyBtn,
  capstoneSagePrompt,
  capstoneEntryBtn,
  livesChaptersLabel,
} from '../../i18n/strings';
import { shuffledIndices } from '../../engine/quiz';

function ChapterBody({
  chapter,
  capReached,
  onComplete,
}: {
  chapter: SageChapter;
  capReached: boolean;
  onComplete: (correctCount: number) => void;
}) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showStory, setShowStory] = useState(true);
  const [qIndex, setQIndex] = useState(0);
  const [order, setOrder] = useState<number[]>(() => shuffledIndices(chapter.quiz[0].options.en.length));
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [nudgeIdx, setNudgeIdx] = useState(0);
  const { t, L, locale } = useT();

  const finishedQuiz = qIndex >= chapter.quiz.length;
  const q = finishedQuiz ? null : chapter.quiz[qIndex];
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
    if (nextIndex < chapter.quiz.length) setOrder(shuffledIndices(chapter.quiz[nextIndex].options.en.length));
  }

  return (
    <div style={{ marginTop: 10 }}>
      {showStory && (
        <>
          <h4>{t('livesHistoricalSetting')}</h4>
          <p className="small">{L(chapter.historicalSetting)}</p>
          <h4>{t('livesLifeStory')}</h4>
          <p>{L(chapter.lifeStory)}</p>
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
            {takeQuizBtn(locale, chapter.quiz.length)}
          </button>
        )
      ) : !finishedQuiz && q ? (
        <div className="card" style={{ marginTop: 10 }}>
          <p className="small muted">{questionProgress(locale, qIndex + 1, chapter.quiz.length)}</p>
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
              <p className="small muted" style={{ marginTop: 4 }}>
                {nudge}
              </p>
              <button
                className="btn"
                style={{ marginTop: 4, marginRight: 8 }}
                onClick={() => {
                  setShowStory(true);
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
              {nextOrFinish(locale, qIndex + 1 >= chapter.quiz.length)}
            </button>
          )}
        </div>
      ) : (
        <div className="card" style={{ marginTop: 10 }}>
          <p>{quizResult(locale, correctCount, chapter.quiz.length)}</p>
          <button
            className="btn btn-primary"
            onClick={() => onComplete(correctCount)}
          >
            {completeStudyBtn(locale, XP_FOR.sageChapter + correctCount * XP_FOR.quizCorrect)}
          </button>
        </div>
      )}
    </div>
  );
}

function SageModal({
  sage,
  initialChapterId,
  onClose,
  onSwitchToAges,
}: {
  sage: Sage;
  initialChapterId?: string;
  onClose: () => void;
  onSwitchToAges?: (pointId: string) => void;
}) {
  const sageChapters = useJourney((s) => s.sageChapters) ?? {};
  const completeSageChapter = useJourney((s) => s.completeSageChapter);
  const today = useToday();
  const data = useJourney() as unknown as JourneyData;
  const capReached = timelineStudiesToday(data, today) >= DAILY_TIMELINE_CAP;
  const { t, L } = useT();

  const firstOpen =
    initialChapterId != null
      ? sage.chapters.findIndex((c) => c.id === initialChapterId)
      : sage.chapters.findIndex((c) => !sageChapters[c.id]);
  const [openChapter, setOpenChapter] = useState<number | null>(firstOpen >= 0 ? firstOpen : null);

  return (
    <Modal onClose={onClose} wide>
      <h2>
        {sage.emoji} {L(sage.name)}
      </h2>
      <p className="small muted">{L(sage.years)}</p>
      <p>{L(sage.summary)}</p>

      {sage.relatedTimelinePointIds?.[0] && onSwitchToAges && (
        <button
          type="button"
          className="btn"
          style={{ marginBottom: 10 }}
          onClick={() => onSwitchToAges(sage.relatedTimelinePointIds![0])}
        >
          {t('livesOpenTeachings')}
        </button>
      )}

      {sage.relatedTopicIds && sage.relatedTopicIds.length > 0 && (
        <p className="small muted" style={{ marginBottom: 10 }}>
          {t('livesRelatedKnowledge')}:{' '}
          {sage.relatedTopicIds
            .map((id) => TOPICS.find((tp) => tp.id === id))
            .filter(Boolean)
            .map((tp) => (
              <Link key={tp!.id} to="/knowledge" className="pill" style={{ marginRight: 6 }}>
                {tp!.emoji} {L(tp!.name)}
              </Link>
            ))}
        </p>
      )}

      {sage.chapters.map((ch, i) => {
        const done = !!sageChapters[ch.id];
        const locked = i > 0 && !sageChapters[sage.chapters[i - 1].id];
        const open = openChapter === i;
        let cls = 'btn';
        if (done) cls += ' quiz-option correct';
        return (
          <div key={ch.id} className="card" style={{ marginBottom: 10 }}>
            <button
              className={cls}
              style={{ width: '100%', textAlign: 'left' }}
              disabled={locked}
              onClick={() => setOpenChapter(open ? null : i)}
            >
              {done ? '✅' : locked ? '🔒' : '📖'} {L(ch.title)}
            </button>
            {locked && (
              <p className="small muted" style={{ marginTop: 6 }}>
                {t('livesChapterLocked')}
              </p>
            )}
            {open && !locked && !done && (
              <ChapterBody
                chapter={ch}
                capReached={capReached}
                onComplete={(correct) => completeSageChapter(ch.id, correct)}
              />
            )}
            {open && done && (
              <div style={{ marginTop: 10 }}>
                <h4>{t('livesHistoricalSetting')}</h4>
                <p className="small">{L(ch.historicalSetting)}</p>
                <h4>{t('livesLifeStory')}</h4>
                <p>{L(ch.lifeStory)}</p>
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

export default function Lives({
  focusSageId,
  focusChapterId,
  onSwitchToAges,
}: {
  focusSageId?: string;
  focusChapterId?: string;
  onSwitchToAges?: (pointId: string) => void;
}) {
  const sageChapters = useJourney((s) => s.sageChapters) ?? {};
  const capstones = useJourney((s) => s.capstones);
  const submitCapstone = useJourney((s) => s.submitCapstone);
  const [open, setOpen] = useState<Sage | null>(null);
  const [capstoneSage, setCapstoneSage] = useState<Sage | null>(null);
  const { t, L, locale } = useT();

  useEffect(() => {
    if (!focusSageId) return;
    const sage = SAGES.find((s) => s.id === focusSageId);
    if (sage) setOpen(sage);
  }, [focusSageId]);

  const totalChapters = SAGES.reduce((n, s) => n + s.chapters.length, 0);
  const doneChapters = Object.keys(sageChapters).length;

  return (
    <div>
      <p className="muted" style={{ marginBottom: 12 }}>
        {t('livesSubtitle')}
      </p>
      <div className="card">
        <ProgressBar
          value={doneChapters}
          max={totalChapters}
          label={livesChaptersLabel(locale, doneChapters, totalChapters)}
        />
      </div>

      {SAGES.map((sage) => {
        const done = sage.chapters.filter((c) => sageChapters[c.id]).length;
        const lifeComplete = isSageLifeComplete(sageChapters, sage);
        const key = sageCapstoneKey(sage.id);
        const hasCapstone = !!capstones[key];
        return (
          <div className="card" key={sage.id} style={{ marginBottom: 10 }}>
            <button type="button" className="btn point-btn" style={{ width: '100%' }} onClick={() => setOpen(sage)}>
              {lifeComplete ? '✅' : sage.emoji} {L(sage.name)}
              <span className="small muted">
                {' '}
                ({done}/{sage.chapters.length})
              </span>
            </button>
            <p className="small muted" style={{ margin: '8px 0 0' }}>
              {L(sage.years)} · {L(sage.summary)}
            </p>
            {lifeComplete && hasCapstone && (
              <p style={{ margin: '8px 0 0' }}>
                <span className="pill">
                  🏅 {L(sage.badgeTitle)}
                </span>
              </p>
            )}
            {lifeComplete && !hasCapstone && (
              <button className="btn" style={{ marginTop: 8 }} onClick={() => setCapstoneSage(sage)}>
                🖋️ {capstoneEntryBtn(locale, L(sage.name))}
              </button>
            )}
          </div>
        );
      })}

      {open && (
        <SageModal
          sage={open}
          initialChapterId={open.id === focusSageId ? focusChapterId : undefined}
          onClose={() => setOpen(null)}
          onSwitchToAges={onSwitchToAges}
        />
      )}
      {capstoneSage && (
        <CapstoneModal
          name={L(capstoneSage.name)}
          prompt={capstoneSagePrompt(locale, L(capstoneSage.name))}
          onSubmit={(text) => {
            submitCapstone(sageCapstoneKey(capstoneSage.id), text);
            setCapstoneSage(null);
          }}
          onClose={() => setCapstoneSage(null)}
        />
      )}
    </div>
  );
}
