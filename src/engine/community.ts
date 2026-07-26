import { PEERS } from '../data/peers';
import { CHALLENGES } from '../data/challenges';
import type { Peer } from '../data/types';
import { daysBetweenKeys, seededRandom } from './progression';
import { localized, type Localized } from '../i18n/types';

// The v1 community is a deterministic simulation seeded by the user's start
// day, so the shared world visibly grows a little every real day. With real
// accounts (future version) this module is replaced by a backend.

/** Days the community has existed, from the user's journey start to "today". */
export function communityAge(startDay: string, today: string): number {
  return Math.max(0, daysBetweenKeys(startDay, today));
}

/** Simulated community harmony points (excluding the user's own contribution). */
export function communityHarmony(startDay: string, today: string): number {
  const days = communityAge(startDay, today);
  let total = 90; // the founding villagers' head start
  for (let i = 1; i <= days; i++) {
    // Each day the community contributes a varying amount (28–75 points).
    total += 28 + Math.floor(seededRandom(`world:${startDay}:${i}`) * 48);
  }
  return total;
}

/** How close each tier stays to the user's XP (before pace / jitter). */
const TIER_XP_FRAC: Record<Peer['tier'], number> = {
  active: 0.9,
  normal: 0.76,
  occasional: 0.62,
};

/**
 * A peer's simulated total XP as of today.
 * Calendar floor keeps early journeys company; rubber-band to `userXp` so
 * serious travellers no longer leave friends permanently behind.
 */
export function peerXp(peer: Peer, startDay: string, today: string, userXp = 0): number {
  const days = communityAge(startDay, today);
  const noise = seededRandom(`xp:${peer.id}`) * 40;
  const calendarXp = Math.floor(30 + noise + peer.pace * days * 46);
  if (userXp <= 0) return calendarXp;

  const frac = Math.min(0.97, TIER_XP_FRAC[peer.tier] * (0.88 + peer.pace * 0.12));
  const week = Math.floor(days / 7);
  const jitter = 0.94 + seededRandom(`xpband:${peer.id}:${week}`) * 0.06;
  const target = Math.floor(userXp * frac * jitter);
  const capped = Math.min(target, Math.floor(userXp * 0.98));
  return Math.max(calendarXp, capped);
}

/**
 * The peers currently "in" the community: joined by now (peer.joinDay) and,
 * for the occasional few who eventually move on, not yet past their
 * departDay. This is the single source of truth every other function in
 * this module (and the World/Community UI) reads the peer roster through —
 * never PEERS directly — so the visible community grows as joinDay
 * thresholds pass and quietly loses a traveller once in a while, rather
 * than being a fixed cast for the app's entire lifetime.
 */
export function visiblePeers(startDay: string, today: string): Peer[] {
  const days = communityAge(startDay, today);
  return PEERS.filter((p) => days >= p.joinDay && (p.departDay === undefined || days < p.departDay));
}

export interface PeerStats {
  peer: Peer;
  xp: number;
  lessons: number;
  streak: number;
  encouragements: number;
  growthPct: number; // recent improvement, for the Growth leaderboard
}

export function peerStats(startDay: string, today: string, userXp = 0): PeerStats[] {
  const days = communityAge(startDay, today);
  return visiblePeers(startDay, today).map((peer) => {
    const xp = peerXp(peer, startDay, today, userXp);
    return {
      peer,
      xp,
      lessons: Math.floor(xp / 60),
      streak: Math.max(
        1,
        Math.floor(
          (days % 14) * seededRandom(`st:${peer.id}:${Math.floor(days / 14)}`) + peer.pace * 2,
        ),
      ),
      encouragements: Math.floor(xp / 45),
      growthPct: Math.round(4 + seededRandom(`gr:${peer.id}:${today}`) * 22),
    };
  });
}

/** Did this peer send the user encouragement today? (Reciprocation happens the day after the user sends.) */
export function peerEncouragesToday(peerId: string, lastSentDay: string | undefined, today: string): boolean {
  if (!lastSentDay) return false;
  const gap = daysBetweenKeys(lastSentDay, today);
  return gap >= 1 && gap <= 2 && seededRandom(`re:${peerId}:${lastSentDay}`) > 0.25;
}

export interface FeedItem {
  peer: Peer;
  text: Localized<string>;
}

const FEED_ACTIONS: Localized<string>[] = [
  localized('completed a lesson on the Knowledge Path 📖', '在知识之路上完成了一课 📖'),
  localized("finished today's virtue challenge 🎯", '完成了今天的德行挑战 🎯'),
  localized('wrote an evening reflection 🪞', '写下了一篇夜间反思 🪞'),
  localized('studied a point on the Wisdom Timeline ⏳', '在智慧时间线上研读了一个节点 ⏳'),
  localized('helped a neighbour today 🤲', '今天帮助了一位邻居 🤲'),
  localized('sent encouragement to a fellow traveller 🌸', '为一位同修送出了鼓励 🌸'),
  localized('planted a tree in their Virtue Forest 🌳', '在自己的德行森林中种下了一棵树 🌳'),
  localized('set a morning intention 🌅', '立下了晨间心愿 🌅'),
];

// How much more often each tier shows up in the daily feed — active
// travellers post updates far more often than the occasional ones.
const TIER_FEED_WEIGHT: Record<Peer['tier'], number> = { active: 4, normal: 2, occasional: 1 };

/** Today's simulated community activity feed. */
export function communityFeed(startDay: string, today: string): FeedItem[] {
  const pool: Peer[] = [];
  for (const peer of visiblePeers(startDay, today)) {
    for (let w = 0; w < TIER_FEED_WEIGHT[peer.tier]; w++) pool.push(peer);
  }
  if (pool.length === 0) return [];

  const items: FeedItem[] = [];
  const count = 4 + Math.floor(seededRandom(`feedn:${today}`) * 3);
  for (let i = 0; i < count; i++) {
    const peer = pool[Math.floor(seededRandom(`feedp:${today}:${i}`) * pool.length)]!;
    const action = FEED_ACTIONS[Math.floor(seededRandom(`feeda:${today}:${i}`) * FEED_ACTIONS.length)]!;
    if (items.some((it) => it.peer.id === peer.id && it.text === action)) continue;
    items.push({ peer, text: action });
  }
  return items;
}

/**
 * The daily challenge rotates deterministically through whichever tiers the
 * user's rank has unlocked (see maxChallengeTierForRankIndex in
 * engine/progression.ts) — higher ranks see deeper, harder challenges
 * mixed in, not just a bigger number of the same gentle ones.
 *
 * `rerollCount` (0 by default) lets a tier-3 pick be swapped for a
 * different one from the same pool — see rerollChallenge() in state/store.ts.
 * A non-zero reroll excludes the original (seed-0) pick so it can't land
 * back on the same challenge.
 */
export function dailyChallenge(today: string, maxTier: 1 | 2 | 3, rerollCount = 0) {
  const pool = CHALLENGES.filter((c) => c.tier <= maxTier);
  const originalIdx = Math.floor(seededRandom(`challenge:${maxTier}:${today}`) * pool.length);
  if (rerollCount <= 0) return pool[originalIdx]!;
  const rerollPool = pool.filter((_, i) => i !== originalIdx);
  const idx = Math.floor(
    seededRandom(`challenge:${maxTier}:${today}:reroll${rerollCount}`) * rerollPool.length,
  );
  return rerollPool[idx]!;
}

export function dailyQuoteIndex(today: string, quoteCount: number): number {
  return Math.floor(seededRandom(`quote:${today}`) * quoteCount);
}
