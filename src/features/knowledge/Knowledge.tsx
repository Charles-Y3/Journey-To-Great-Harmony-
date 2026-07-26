import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOPICS } from '../../data/knowledgeTree';
import type { Topic, Lesson } from '../../data/types';
import { sageForTopic } from '../../data/sages';
import { useJourney, useToday } from '../../state/store';
import {
  isTopicCompleted,
  isTopicUnlocked,
  isBranchMastered,
  branchCapstoneKey,
  lessonsCompletedToday,
  topicDepth,
  DAILY_LESSON_CAP,
  type JourneyData,
} from '../../state/selectors';
import { Modal, CapstoneModal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import {
  knowledgeProgressLabel,
  topicLessonCount,
  backToTopic,
  capstoneBranchPrompt,
  capstoneEntryBtn,
} from '../../i18n/strings';
import { shuffledIndices } from '../../engine/quiz';

const QUIZ_NUDGE_KEYS = ['quizNudgeReread', 'quizNudgeBreathe', 'quizNudgeLookAgain'] as const;

function LessonView({ lesson, done, onDone, capReached }: { lesson: Lesson; done: boolean; onDone: () => void; capReached: boolean }) {
  const [order, setOrder] = useState(() => shuffledIndices(lesson.question.options.en.length));
  const [picked, setPicked] = useState<number | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [showQuiz, setShowQuiz] = useState(true);
  const [nudgeIdx, setNudgeIdx] = useState(0);
  const { t, L } = useT();
  const options = L(lesson.question.options);
  const answered = picked !== null;
  const correct = answered && order[picked] === lesson.question.answer;
  const nudge = lesson.question.nudge
    ? L(lesson.question.nudge)
    : t(QUIZ_NUDGE_KEYS[nudgeIdx % QUIZ_NUDGE_KEYS.length]);

  function retry() {
    setOrder(shuffledIndices(options.length));
    setPicked(null);
    setNudgeIdx((n) => n + 1);
  }

  return (
    <div>
      <h3>{L(lesson.title)}</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{L(lesson.reading)}</p>

      {/* Reading stays open when the daily cap is hit; quiz/complete wait until tomorrow. */}
      {!done && capReached ? (
        <>
          <p className="small muted" style={{ marginTop: 10 }}>{t('knowledgeDailyCapNote')}</p>
          <p className="small muted">{t('knowledgeDailyCapWhy')}</p>
        </>
      ) : showQuiz ? (
        <>
          <h4>{t('checkUnderstanding')}</h4>
          <p className="small">{L(lesson.question.q)}</p>
          {order.map((origIdx, i) => {
            let cls = 'btn quiz-option';
            if (answered && i === picked) cls += correct ? ' correct' : ' wrong';
            return (
              <button key={origIdx} className={cls} disabled={answered} onClick={() => setPicked(i)}>
                {options[origIdx]}
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
              <button className="btn" style={{ marginRight: 8 }} onClick={() => setShowQuiz(false)}>
                {t('quizRereadTeaching')}
              </button>
              <button className="btn" onClick={retry}>
                {t('quizTryAgain')}
              </button>
            </>
          )}
        </>
      ) : (
        <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => { setShowQuiz(true); retry(); }}>
          {t('checkUnderstanding')}
        </button>
      )}

      {correct && !done && !capReached && (
        <>
          <h4>{t('reflectHeading')}</h4>
          <p className="small muted">{L(lesson.reflection)}</p>
          <textarea rows={2} value={reflectionText} onChange={(e) => setReflectionText(e.target.value)} placeholder={t('reflectionOptionalPlaceholder')} />
          <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => onDone()}>
            {t('completeLessonBtn')}
          </button>
        </>
      )}
      {done && (
        <p style={{ marginTop: 10 }}>
          <span className="pill">{t('lessonCompleteLabel')}</span>
        </p>
      )}
    </div>
  );
}

function TopicModal({ topic, onClose, capReached }: { topic: Topic; onClose: () => void; capReached: boolean }) {
  const completedLessons = useJourney((s) => s.completedLessons);
  const completeLesson = useJourney((s) => s.completeLesson);
  const [openLesson, setOpenLesson] = useState<Lesson | null>(null);
  const { t, L, locale } = useT();

  return (
    <Modal onClose={onClose} wide>
      {openLesson ? (
        <>
          <button className="btn" style={{ marginBottom: 12 }} onClick={() => setOpenLesson(null)}>
            {backToTopic(locale, L(topic.name))}
          </button>
          <LessonView
            lesson={openLesson}
            done={completedLessons.includes(openLesson.id)}
            onDone={() => completeLesson(openLesson.id, true)}
            capReached={capReached}
          />
        </>
      ) : (
        <>
          <h2>
            {topic.emoji} {L(topic.name)}
          </h2>
          <p className="muted">{L(topic.intro)}</p>
          {(() => {
            const relatedSage = sageForTopic(topic.id);
            if (!relatedSage) return null;
            return (
              <Link
                to="/timeline"
                state={{ mode: 'lives', sageId: relatedSage.id }}
                className="btn"
                style={{ marginBottom: 12, display: 'inline-block' }}
              >
                {relatedSage.emoji} {t('livesOpenLife')}
              </Link>
            );
          })()}
          {topic.lessons.map((lesson, i) => {
            const done = completedLessons.includes(lesson.id);
            const prevDone = i === 0 || completedLessons.includes(topic.lessons[i - 1].id);
            return (
              <button key={lesson.id} className={done ? 'topic-node completed' : 'topic-node'} disabled={!prevDone} onClick={() => setOpenLesson(lesson)}>
                <span className="topic-emoji">{done ? '✅' : '📖'}</span>
                <span>
                  <strong>{L(lesson.title)}</strong>
                  {!prevDone && <span className="small muted"> — {t('lockedPrevLesson')}</span>}
                </span>
              </button>
            );
          })}
        </>
      )}
    </Modal>
  );
}

function TopicNode({ topic, onOpen }: { topic: Topic; onOpen: (t: Topic) => void }) {
  const completedLessons = useJourney((s) => s.completedLessons);
  const { L, t, locale } = useT();
  const unlocked = isTopicUnlocked(completedLessons, topic);
  const completed = isTopicCompleted(completedLessons, topic);
  const doneCount = topic.lessons.filter((l) => completedLessons.includes(l.id)).length;

  return (
    <button className={completed ? 'topic-node completed' : 'topic-node'} disabled={!unlocked} onClick={() => onOpen(topic)}>
      <span className="topic-emoji">{unlocked ? topic.emoji : '🔒'}</span>
      <span style={{ flex: 1 }}>
        <strong>{L(topic.name)}</strong>
        <span className="small muted"> · {topicLessonCount(locale, doneCount, topic.lessons.length)}</span>
        <div className="small muted">{unlocked ? L(topic.intro) : t('lockedTopic')}</div>
      </span>
      {completed && <span>✓</span>}
    </button>
  );
}

export default function Knowledge() {
  const completedLessons = useJourney((s) => s.completedLessons);
  const capstones = useJourney((s) => s.capstones);
  const submitCapstone = useJourney((s) => s.submitCapstone);
  const [open, setOpen] = useState<Topic | null>(null);
  const [capstoneBranch, setCapstoneBranch] = useState<Topic | null>(null);
  const { t, L, locale } = useT();
  const today = useToday();
  const data = useJourney() as unknown as JourneyData;
  const capReached = lessonsCompletedToday(data, today) >= DAILY_LESSON_CAP;

  const root = TOPICS.find((t) => t.id === 'wisdom')!;
  const branches: { id: Topic['branch'] }[] = [{ id: 'compassion' }, { id: 'character' }, { id: 'understanding' }];

  const totalLessons = TOPICS.reduce((n, tp) => n + tp.lessons.length, 0);

  return (
    <div>
      <PageHeader emoji="🌳" title={t('knowledgeTitle')} subtitle={t('knowledgeSubtitle')} />
      <div className="card">
        <ProgressBar value={completedLessons.length} max={totalLessons} label={knowledgeProgressLabel(locale, completedLessons.length, totalLessons)} />
        {capReached && <p className="small muted" style={{ marginTop: 8 }}>{t('knowledgeDailyCapNote')}</p>}
      </div>

      <div className="tree-branch">
        <TopicNode topic={root} onOpen={setOpen} />
      </div>

      {branches.map((branch) => {
        const branchTopic = TOPICS.find((tp) => tp.id === branch.id)!;
        const leaves = TOPICS.filter((tp) => tp.branch === branch.id && tp.id !== branch.id);
        const depthLeaves = (d: 1 | 2 | 3) => leaves.filter((tp) => topicDepth(tp) === d);
        const mastered = isBranchMastered(completedLessons, branch.id);
        const hasCapstone = !!capstones[branchCapstoneKey(branch.id)];
        const depth1Done = depthLeaves(1).every((tp) => isTopicCompleted(completedLessons, tp))
          && isTopicCompleted(completedLessons, branchTopic);
        const depth2Done = depthLeaves(2).every((tp) => isTopicCompleted(completedLessons, tp));
        return (
          <div className="tree-branch" key={branch.id}>
            <TopicNode topic={branchTopic} onOpen={setOpen} />
            <p className="small muted" style={{ margin: '10px 0 4px' }}>{t('knowledgeDepth1')}</p>
            <div className="topic-leaf-list">
              {depthLeaves(1).map((leaf) => (
                <TopicNode key={leaf.id} topic={leaf} onOpen={setOpen} />
              ))}
            </div>
            {/* Depth II / III stay hidden until the prior depth is finished. */}
            {depth1Done && (
              <>
                <p className="small muted" style={{ margin: '12px 0 4px' }}>{t('knowledgeDepth2')}</p>
                <div className="topic-leaf-list">
                  {depthLeaves(2).map((leaf) => (
                    <TopicNode key={leaf.id} topic={leaf} onOpen={setOpen} />
                  ))}
                </div>
              </>
            )}
            {depth2Done && (
              <>
                <p className="small muted" style={{ margin: '12px 0 4px' }}>{t('knowledgeDepth3')}</p>
                <div className="topic-leaf-list">
                  {depthLeaves(3).map((leaf) => (
                    <TopicNode key={leaf.id} topic={leaf} onOpen={setOpen} />
                  ))}
                </div>
              </>
            )}
            {mastered && !hasCapstone && (
              <button className="btn" style={{ marginTop: 8 }} onClick={() => setCapstoneBranch(branchTopic)}>
                🖋️ {capstoneEntryBtn(locale, L(branchTopic.name))}
              </button>
            )}
          </div>
        );
      })}

      {open && <TopicModal topic={open} onClose={() => setOpen(null)} capReached={capReached} />}
      {capstoneBranch && (
        <CapstoneModal
          name={L(capstoneBranch.name)}
          prompt={capstoneBranchPrompt(locale, L(capstoneBranch.name))}
          onSubmit={(text) => {
            submitCapstone(branchCapstoneKey(capstoneBranch.id), text);
            setCapstoneBranch(null);
          }}
          onClose={() => setCapstoneBranch(null)}
        />
      )}
    </div>
  );
}
