import { useState } from 'react';
import { TOPICS } from '../../data/knowledgeTree';
import type { Topic, Lesson } from '../../data/types';
import { useJourney } from '../../state/store';
import { isTopicCompleted, isTopicUnlocked } from '../../state/selectors';
import { Modal, PageHeader, ProgressBar } from '../../components/ui';

function LessonView({ lesson, done, onDone }: { lesson: Lesson; done: boolean; onDone: (correct: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const answered = picked !== null;
  const correct = picked === lesson.question.answer;

  return (
    <div>
      <h3>{lesson.title}</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{lesson.reading}</p>

      <h4>Check your understanding</h4>
      <p className="small">{lesson.question.q}</p>
      {lesson.question.options.map((opt, i) => {
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
          {correct ? '✅ Exactly right. (+5 XP)' : `🤔 Not quite — the answer is highlighted above.`}
        </p>
      )}

      {answered && !done && (
        <>
          <h4>Reflect</h4>
          <p className="small muted">{lesson.reflection}</p>
          <textarea
            rows={2}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="A sentence of honest reflection (optional)…"
          />
          <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => onDone(correct)}>
            Complete lesson (+20 XP)
          </button>
        </>
      )}
      {done && (
        <p style={{ marginTop: 10 }}>
          <span className="pill">Lesson complete ✓</span>
        </p>
      )}
    </div>
  );
}

function TopicModal({ topic, onClose }: { topic: Topic; onClose: () => void }) {
  const completedLessons = useJourney((s) => s.completedLessons);
  const completeLesson = useJourney((s) => s.completeLesson);
  const [openLesson, setOpenLesson] = useState<Lesson | null>(null);

  return (
    <Modal onClose={onClose} wide>
      {openLesson ? (
        <>
          <button className="btn" style={{ marginBottom: 12 }} onClick={() => setOpenLesson(null)}>
            ← Back to {topic.name}
          </button>
          <LessonView
            lesson={openLesson}
            done={completedLessons.includes(openLesson.id)}
            onDone={(correct) => completeLesson(openLesson.id, correct)}
          />
        </>
      ) : (
        <>
          <h2>
            {topic.emoji} {topic.name} {topic.zh && <span className="zh-accent">{topic.zh}</span>}
          </h2>
          <p className="muted">{topic.intro}</p>
          {topic.lessons.map((lesson, i) => {
            const done = completedLessons.includes(lesson.id);
            const prevDone = i === 0 || completedLessons.includes(topic.lessons[i - 1].id);
            return (
              <button
                key={lesson.id}
                className={done ? 'topic-node completed' : 'topic-node'}
                disabled={!prevDone}
                onClick={() => setOpenLesson(lesson)}
              >
                <span className="topic-emoji">{done ? '✅' : '📖'}</span>
                <span>
                  <strong>{lesson.title}</strong>
                  {!prevDone && <span className="small muted"> — complete the previous lesson first</span>}
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
  const unlocked = isTopicUnlocked(completedLessons, topic);
  const completed = isTopicCompleted(completedLessons, topic);
  const doneCount = topic.lessons.filter((l) => completedLessons.includes(l.id)).length;

  return (
    <button
      className={completed ? 'topic-node completed' : 'topic-node'}
      disabled={!unlocked}
      onClick={() => onOpen(topic)}
    >
      <span className="topic-emoji">{unlocked ? topic.emoji : '🔒'}</span>
      <span style={{ flex: 1 }}>
        <strong>{topic.name}</strong> {topic.zh && <span className="zh-accent">{topic.zh}</span>}
        <span className="small muted"> · {doneCount}/{topic.lessons.length} lessons</span>
        <div className="small muted">{unlocked ? topic.intro : 'Complete the topic above to unlock.'}</div>
      </span>
      {completed && <span>✓</span>}
    </button>
  );
}

export default function Knowledge() {
  const completedLessons = useJourney((s) => s.completedLessons);
  const [open, setOpen] = useState<Topic | null>(null);

  const root = TOPICS.find((t) => t.id === 'wisdom')!;
  const branches: { id: Topic['branch']; title: string; note: string }[] = [
    { id: 'compassion', title: 'Compassion 仁', note: 'The heart of the path' },
    { id: 'character', title: 'Character 德', note: 'The backbone of the path' },
    { id: 'understanding', title: 'Understanding 明', note: 'The eyes of the path' },
  ];

  const totalLessons = TOPICS.reduce((n, t) => n + t.lessons.length, 0);

  return (
    <div>
      <PageHeader
        emoji="🌳"
        title="The Knowledge Path"
        zh="智慧之树"
        subtitle="A living tree of wisdom. Each completed topic unlocks the deeper ones beneath it."
      />
      <div className="card">
        <ProgressBar
          value={completedLessons.length}
          max={totalLessons}
          label={`${completedLessons.length}/${totalLessons} lessons completed`}
        />
      </div>

      <div className="tree-branch">
        <TopicNode topic={root} onOpen={setOpen} />
      </div>

      {branches.map((branch) => {
        const branchTopic = TOPICS.find((t) => t.id === branch.id)!;
        const leaves = TOPICS.filter((t) => t.branch === branch.id && t.id !== branch.id);
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
