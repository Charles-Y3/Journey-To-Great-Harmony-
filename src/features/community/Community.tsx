import { useEffect, useMemo, useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import { useProfile } from '../../state/profileStore';
import { useTraveller } from '../../state/travellerStore';
import { peerStats, peerEncouragesToday, visiblePeers } from '../../engine/community';
import { fetchLeaderboard, type LeaderboardCategory, type LeaderboardRow } from '../../engine/travellerApi';
import { statsFromData, forestInfo, type JourneyData } from '../../state/selectors';
import type { Peer } from '../../data/types';
import { DEFAULT_AVATAR, isAllowedAvatar } from '../../data/avatars';
import { rankForXp, rankIndexForXp } from '../../engine/progression';
import { findNameCollisions, travellerTag } from '../../engine/travellerTags';
import { AvatarGlyph, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { encouragementBanner, type UiKey } from '../../i18n/strings';
import { agedPeerEmoji, companionAgeYears } from '../../engine/companions';

/** Show companions within ±1 journey rank of the user (all four boards). */
const NEARBY_RANK_BAND = 1;

const TIER_KEY: Record<Peer['tier'], UiKey> = {
  active: 'peerTierActive',
  normal: 'peerTierNormal',
  occasional: 'peerTierOccasional',
};

type Category = LeaderboardCategory;

const CATEGORIES: { id: Category; emoji: string; nameKey: UiKey; descKey: UiKey }[] = [
  { id: 'wisdom', emoji: '📚', nameKey: 'catWisdomName', descKey: 'catWisdomDesc' },
  { id: 'practice', emoji: '🔥', nameKey: 'catPracticeName', descKey: 'catPracticeDesc' },
  { id: 'compassion', emoji: '❤️', nameKey: 'catCompassionName', descKey: 'catCompassionDesc' },
  { id: 'growth', emoji: '🌱', nameKey: 'catGrowthName', descKey: 'catGrowthDesc' },
];

interface BoardRow {
  id: string;
  name: string;
  emoji: string;
  me: boolean;
  score: number;
  rankLabel: string;
  /** Journey XP — used only for the nearby rank band, not the board score. */
  journeyXp: number;
}

export default function Community() {
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const sendEncouragement = useJourney((s) => s.sendEncouragement);
  const [category, setCategory] = useState<Category>('wisdom');
  const [sentFlash, setSentFlash] = useState<string | null>(null);
  const [remoteRows, setRemoteRows] = useState<LeaderboardRow[] | null>(null);
  const { t, L, locale } = useT();
  const myName = useProfile((s) => s.name);
  const myAvatar = useProfile((s) => s.avatar);
  const optedIn = useTraveller((s) => s.optedIn);
  const myTravellerId = useTraveller((s) => s.travellerId);

  const stats = statsFromData(d);
  const forest = forestInfo(d);
  const peers = peerStats(state.startDay, today, state.xp);
  const ageYears = companionAgeYears(state.startDay, today, state.streakBest);

  useEffect(() => {
    if (!optedIn) {
      setRemoteRows(null);
      return;
    }
    let cancelled = false;
    void fetchLeaderboard(category).then((rows) => {
      if (!cancelled) setRemoteRows(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [optedIn, category, stats.xp, stats.streakCurrent, stats.encouragementsSent]);

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

  const avatar = isAllowedAvatar(myAvatar) ? myAvatar : DEFAULT_AVATAR;
  const myRank = rankForXp(stats.xp);
  const myRankIdx = rankIndexForXp(stats.xp);
  const meRow: BoardRow = {
    id: 'me',
    name: myName ?? t('leaderboardYou'),
    emoji: avatar,
    me: true,
    score: scoreFor(category, true),
    rankLabel: `${myRank.emoji} ${L(myRank.name)}`,
    journeyXp: stats.xp,
  };

  const npcRows: BoardRow[] = peers.map((p, i) => {
    const rank = rankForXp(p.xp);
    return {
      id: p.peer.id,
      name: L(p.peer.name),
      emoji: agedPeerEmoji(p.peer.emoji, ageYears),
      me: false,
      score: scoreFor(category, false, i),
      rankLabel: `${rank.emoji} ${L(rank.name)}`,
      journeyXp: p.xp,
    };
  });

  const realRows: BoardRow[] = (remoteRows ?? [])
    .filter((r) => r.id !== myTravellerId)
    .map((r) => {
      const xp = typeof r.xp === 'number' ? r.xp : 0;
      const rank = rankForXp(xp);
      return {
        id: `real-${r.id}`,
        name: r.name,
        emoji: isAllowedAvatar(r.avatar) ? r.avatar : DEFAULT_AVATAR,
        me: false,
        score: r.score,
        rankLabel: `${rank.emoji} ${L(rank.name)}`,
        journeyXp: xp,
      };
    });

  const rows = [...(optedIn ? [meRow, ...realRows, ...npcRows] : [meRow, ...npcRows])]
    .filter((r) => r.me || Math.abs(rankIndexForXp(r.journeyXp) - myRankIdx) <= NEARBY_RANK_BAND)
    .sort((a, b) => b.score - a.score);

  // Only real travellers are candidates for the duplicate-name tag — NPCs are a
  // fixed roster and "me" is already visually distinct.
  const collisionIds = useMemo(
    () => findNameCollisions(realRows.map((r) => ({ id: r.id, name: r.name }))),
    [realRows],
  );
  const [revealedId, setRevealedId] = useState<string | null>(null);
  function revealTag(id: string) {
    setRevealedId(id);
    window.setTimeout(() => setRevealedId((cur) => (cur === id ? null : cur)), 3000);
  }

  const encouragersToday = visiblePeers(state.startDay, today).filter((p) => peerEncouragesToday(p.id, state.encouragedOn[p.id], today));
  const activeCategory = CATEGORIES.find((c) => c.id === category)!;

  return (
    <div>
      <PageHeader emoji="👥" title={t('communityTitle')} subtitle={t('communitySubtitle')} />

      <p className="small muted companion-age-note">
        {ageYears > 0 ? `${ageYears} ${t('companionYearsLabel')}` : t('companionYearsNew')}
      </p>

      {encouragersToday.length > 0 && (
        <div className="quote-card">
          <p style={{ margin: 0 }}>{encouragementBanner(locale, encouragersToday.map((p) => L(p.name)))}</p>
        </div>
      )}

      <div className="card">
        <h3>{t('leaderboardsTitle')}</h3>
        <div className="tab-row leaderboard-tab-row">
          {CATEGORIES.map((c) => (
            <button key={c.id} className={category === c.id ? 'btn tab-btn active' : 'btn tab-btn'} onClick={() => setCategory(c.id)}>
              {c.emoji} {t(c.nameKey)}
            </button>
          ))}
        </div>
        <p className="small muted">{t(activeCategory.descKey)}</p>
        <p className="small muted">{t('leaderboardsNearbyNote')}</p>
        {rows.map((row, i) => {
          const hasCollision = collisionIds.has(row.id);
          const tag = hasCollision ? travellerTag(row.id) : null;
          return (
            <div
              key={row.id}
              className={row.me ? 'leader-row me' : 'leader-row'}
              title={tag ? `${row.name} · ${tag}` : undefined}
              onClick={tag ? () => revealTag(row.id) : undefined}
              style={tag ? { cursor: 'pointer' } : undefined}
            >
              <span className="leader-pos">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
              <AvatarGlyph emoji={row.emoji} ringed={hasCollision} className="leader-emoji" />
              <span className="leader-info">
                <span className="leader-name">
                  {row.name}
                  {tag && revealedId === row.id && <span className="leader-tag">{tag}</span>}
                </span>
                <span className="leader-rank small muted">{row.rankLabel}</span>
              </span>
              <span className="leader-score">{row.score}</span>
            </div>
          );
        })}
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
              <span className="leader-emoji">{agedPeerEmoji(p.peer.emoji, ageYears)}</span>
              <span className="leader-info">
                <strong>{L(p.peer.name)}</strong> <span className="pill pill-tier">{t(TIER_KEY[p.peer.tier])}</span>
                <div className="small muted">“{L(p.peer.motto)}”</div>
                {ageYears > 0 && (
                  <div className="small muted">
                    {ageYears} {t('companionYearsLabel')}
                  </div>
                )}
              </span>
              <span className="leader-score">
                <button
                  className="btn btn-encourage"
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
    </div>
  );
}
