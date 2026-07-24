import { useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import { peerStats, peerEncouragesToday } from '../../engine/community';
import { statsFromData, forestInfo, type JourneyData } from '../../state/selectors';
import { PEERS } from '../../data/peers';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { encouragementBanner, type UiKey } from '../../i18n/strings';

type Category = 'wisdom' | 'practice' | 'compassion' | 'growth';

const CATEGORIES: { id: Category; emoji: string; nameKey: UiKey; descKey: UiKey }[] = [
  { id: 'wisdom', emoji: '📚', nameKey: 'catWisdomName', descKey: 'catWisdomDesc' },
  { id: 'practice', emoji: '🔥', nameKey: 'catPracticeName', descKey: 'catPracticeDesc' },
  { id: 'compassion', emoji: '❤️', nameKey: 'catCompassionName', descKey: 'catCompassionDesc' },
  { id: 'growth', emoji: '🌱', nameKey: 'catGrowthName', descKey: 'catGrowthDesc' },
];

export default function Community() {
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const sendEncouragement = useJourney((s) => s.sendEncouragement);
  const [category, setCategory] = useState<Category>('wisdom');
  const [sentFlash, setSentFlash] = useState<string | null>(null);
  const { t, L, locale } = useT();

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
    { id: 'me', name: t('leaderboardYou'), emoji: '🧑‍🌾', me: true, score: scoreFor(category, true) },
    ...peers.map((p, i) => ({ id: p.peer.id, name: L(p.peer.name), emoji: p.peer.emoji, me: false, score: scoreFor(category, false, i) })),
  ].sort((a, b) => b.score - a.score);

  const encouragersToday = PEERS.filter((p) => peerEncouragesToday(p.id, state.encouragedOn[p.id], today));
  const activeCategory = CATEGORIES.find((c) => c.id === category)!;

  return (
    <div>
      <PageHeader emoji="👥" title={t('communityTitle')} zh={t('communityZh')} subtitle={t('communitySubtitle')} />

      {encouragersToday.length > 0 && (
        <div className="quote-card">
          <p style={{ margin: 0 }}>{encouragementBanner(locale, encouragersToday.map((p) => L(p.name)))}</p>
        </div>
      )}

      <div className="card">
        <h3>{t('leaderboardsTitle')}</h3>
        <div className="tab-row">
          {CATEGORIES.map((c) => (
            <button key={c.id} className={category === c.id ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setCategory(c.id)}>
              {c.emoji} {t(c.nameKey)}
            </button>
          ))}
        </div>
        <p className="small muted">{t(activeCategory.descKey)}</p>
        {rows.map((row, i) => (
          <div key={row.id} className={row.me ? 'leader-row me' : 'leader-row'}>
            <span className="leader-pos">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
            <span>{row.emoji}</span>
            <span>{row.name}</span>
            <span className="leader-score">{row.score}</span>
          </div>
        ))}
        <p className="small muted" style={{ marginTop: 8 }}>
          {t('leaderboardsFooter')}
        </p>
      </div>

      <div className="card">
        <h3>{t('sendEncouragementTitle')}</h3>
        <p className="small muted">{t('sendEncouragementDesc')}</p>
        {peers.map((p) => {
          const sentToday = state.encouragedOn[p.peer.id] === today;
          return (
            <div key={p.peer.id} className="leader-row">
              <span>{p.peer.emoji}</span>
              <span>
                <strong>{L(p.peer.name)}</strong>
                <div className="small muted">“{L(p.peer.motto)}”</div>
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
                  {sentToday ? (sentFlash === p.peer.id ? t('encourageSentJust') : t('encourageSentToday')) : t('encourageBtn')}
                </button>
              </span>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3>{t('groupsTitle')}</h3>
        <p className="small muted">{t('groupsBody')}</p>
      </div>
    </div>
  );
}
