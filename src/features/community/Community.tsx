import { useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import { peerStats, peerEncouragesToday } from '../../engine/community';
import { statsFromData, forestInfo, type JourneyData } from '../../state/selectors';
import { PEERS } from '../../data/peers';
import { PageHeader } from '../../components/ui';

type Category = 'wisdom' | 'practice' | 'compassion' | 'growth';

const CATEGORIES: { id: Category; name: string; emoji: string; desc: string }[] = [
  { id: 'wisdom', name: 'Wisdom', emoji: '📚', desc: 'Learning completed (XP)' },
  { id: 'practice', name: 'Practice', emoji: '🔥', desc: 'Daily consistency (streak)' },
  { id: 'compassion', name: 'Compassion', emoji: '❤️', desc: 'Challenges & encouragement given' },
  { id: 'growth', name: 'Growth', emoji: '🌱', desc: 'Overall personal cultivation' },
];

export default function Community() {
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const sendEncouragement = useJourney((s) => s.sendEncouragement);
  const [category, setCategory] = useState<Category>('wisdom');
  const [sentFlash, setSentFlash] = useState<string | null>(null);

  const stats = statsFromData(d);
  const forest = forestInfo(d);
  const peers = peerStats(state.startDay, today);

  function scoreFor(id: Category, isUser: boolean, peerIdx = 0): number {
    const p = peers[peerIdx];
    switch (id) {
      case 'wisdom':
        return isUser ? stats.xp : p.xp;
      case 'practice':
        return isUser ? stats.streakCurrent : p.streak;
      case 'compassion':
        return isUser ? stats.challengesDone * 2 + stats.encouragementsSent * 3 : p.encouragements;
      case 'growth':
        return isUser ? forest.score : Math.floor(p.xp / 9);
    }
  }

  const rows = [
    { id: 'me', name: 'You', emoji: '🧑‍🌾', me: true, score: scoreFor(category, true) },
    ...peers.map((p, i) => ({ id: p.peer.id, name: p.peer.name, emoji: p.peer.emoji, me: false, score: scoreFor(category, false, i) })),
  ].sort((a, b) => b.score - a.score);

  const encouragersToday = PEERS.filter((p) => peerEncouragesToday(p.id, state.encouragedOn[p.id], today));

  return (
    <div>
      <PageHeader
        emoji="👥"
        title="Community"
        zh="同行者"
        subtitle="Fellow travellers on the road to Great Harmony. Not a competition — an encouragement."
      />

      {encouragersToday.length > 0 && (
        <div className="quote-card">
          <p style={{ margin: 0 }}>
            🌸 {encouragersToday.map((p) => p.name).join(', ')}{' '}
            {encouragersToday.length === 1 ? 'has' : 'have'} sent you encouragement for your kindness yesterday!
          </p>
        </div>
      )}

      <div className="card">
        <h3>Leaderboards</h3>
        <div className="tab-row">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={category === c.id ? 'btn tab-btn active' : 'btn tab-btn'}
              onClick={() => setCategory(c.id)}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
        <p className="small muted">{CATEGORIES.find((c) => c.id === category)!.desc}</p>
        {rows.map((row, i) => (
          <div key={row.id} className={row.me ? 'leader-row me' : 'leader-row'}>
            <span className="leader-pos">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
            <span>{row.emoji}</span>
            <span>{row.name}</span>
            <span className="leader-score">{row.score}</span>
          </div>
        ))}
        <p className="small muted" style={{ marginTop: 8 }}>
          Rankings measure consistency and contribution, never worth. Everyone here is walking the same road.
        </p>
      </div>

      <div className="card">
        <h3>Send encouragement 🌸</h3>
        <p className="small muted">
          Celebrate a fellow traveller. Encouragement costs nothing and builds the world (+2 XP, +5 harmony).
        </p>
        {peers.map((p) => {
          const sentToday = state.encouragedOn[p.peer.id] === today;
          return (
            <div key={p.peer.id} className="leader-row">
              <span>{p.peer.emoji}</span>
              <span>
                <strong>{p.peer.name}</strong>
                <div className="small muted">“{p.peer.motto}”</div>
              </span>
              <span className="leader-score">
                <button
                  className="btn"
                  disabled={sentToday}
                  onClick={() => {
                    if (sendEncouragement(p.peer.id)) {
                      setSentFlash(p.peer.id);
                      setTimeout(() => setSentFlash(null), 1500);
                    }
                  }}
                >
                  {sentToday ? (sentFlash === p.peer.id ? '🌸 Sent!' : '🌸 Sent today') : '🌸 Encourage'}
                </button>
              </span>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3>Groups</h3>
        <p className="small muted">
          🏡 Family journeys · 🏫 School groups · 🧑‍🤝‍🧑 Study circles — travelling together with real friends and
          family arrives with community accounts in a future version. For now, your simulated companions keep the
          campfire warm.
        </p>
      </div>
    </div>
  );
}
