import { useState } from 'react';
import { TOPICS } from '../../data/knowledgeTree';
import type { Topic, Lesson } from '../../data/types';
import { useJourney } from '../../state/store';
import { isTopicCompleted, isTopicUnlocked } from '../../state/selectors';
import { Modal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { knowledgeProgressLabel, topicLessonCount, backToTopic } from '../../i18n/strings';

function LessonView({ lesson, done, onDone }: { lesson: Lesson; done: boolean; onDone: (correct: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const { t, L } = useT();
  const answered = picked !== null;
  const correct = picked === lesson.question.answer;
  const options = L(lesson.question.options);

  return (
    <div>
      <h3>{L(lesson.title)}</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{L(lesson.reading)}</p>

      <h4>{t('checkUnderstanding')}</h4>
      <p className="small">{L(lesson.question.q)}</p>
      {options.map((opt, i) => {
        let cls = 'btn quiz-option';
        if (answered && i === lesson.question.answer) cls += ' correct';
        else if (answered && i === picked) cls += ' wrong';
        return (
          <button key={i} className={cls} disabled={answered} onClick={() => setPicked(i)}>
            {opt}
          </button>
        );
      })}
      {answered && (
        <p className="small" style={{ marginTop: 6 }}>
          {correct ? t('quizCorrectMsg') : t('quizWrongMsg')}
        </p>
      )}

      {answered && !done && (
        <>
          <h4>{t('reflectHeading')}</h4>
          <p className="small muted">{L(lesson.reflection)}</p>
          <textarea rows={2} value={reflectionText} onChange={(e) => setReflectionText(e.target.value)} placeholder={t('reflectionOptionalPlaceholder')} />
          <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => onDone(correct)}>
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

function TopicModal({ topic, onClose }: { topic: Topic; onClose: () => void }) {
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
          <LessonView lesson={openLesson} done={completedLessons.includes(openLesson.id)} onDone={(correct) => completeLesson(openLesson.id, correct)} />
        </>
      ) : (
        <>
          <h2>
            {topic.emoji} {L(topic.name)} {topic.accent && <span className="zh-accent">{topic.accent}</span>}
          </h2>
          <p className="muted">{L(topic.intro)}</p>
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
        <strong>{L(topic.name)}</strong> {topic.accent && <span className="zh-accent">{topic.accent}</span>}
        <span className="small muted"> · {topicLessonCount(locale, doneCount, topic.lessons.length)}</span>
        <div className="small muted">{unlocked ? L(topic.intro) : t('lockedTopic')}</div>
      </span>
      {completed && <span>✓</span>}
    </button>
  );
}

export default function Knowledge() {
  const completedLessons = useJourney((s) => s.completedLessons);
  const [open, setOpen] = useState<Topic | null>(null);
  const { t, locale } = useT();

  const root = TOPICS.find((t) => t.id === 'wisdom')!;
  const branches: { id: Topic['branch'] }[] = [{ id: 'compassion' }, { id: 'character' }, { id: 'understanding' }];

  const totalLessons = TOPICS.reduce((n, tp) => n + tp.lessons.length, 0);

  return (
    <div>
      <PageHeader emoji="🌳" title={t('knowledgeTitle')} zh={t('knowledgeZh')} subtitle={t('knowledgeSubtitle')} />
      <div className="card">
        <ProgressBar value={completedLessons.length} max={totalLessons} label={knowledgeProgressLabel(locale, completedLessons.length, totalLessons)} />
      </div>

      <div className="tree-branch">
        <TopicNode topic={root} onOpen={setOpen} />
      </div>

      {branches.map((branch) => {
        const branchTopic = TOPICS.find((tp) => tp.id === branch.id)!;
        const leaves = TOPICS.filter((tp) => tp.branch === branch.id && tp.id !== branch.id);
        return (
          <div className="tree-branch" key={branch.id}>
            <TopicNode topic={branchTopic} onOpen={setOpen} />
            <div className="topic-leaf-list">
              {leaves.map((leaf) => (
                <TopicNode key={leaf.id} topic={leaf} onOpen={setOpen} />
              ))}
            </div>
          </div>
        );
      })}

      {open && <TopicModal topic={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
