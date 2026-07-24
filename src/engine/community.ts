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

/** A peer's simulated total XP as of today. */
export function peerXp(peer: Peer, startDay: string, today: string): number {
  const days = communityAge(startDay, today);
  const noise = seededRandom(`xp:${peer.id}`) * 40;
  return Math.floor(30 + noise + peer.pace * days * 46);
}

export interface PeerStats {
  peer: Peer;
  xp: number;
  lessons: number;
  streak: number;
  encouragements: number;
  growthPct: number; // recent improvement, for the Growth leaderboard
}

export function peerStats(startDay: string, today: string): PeerStats[] {
  const days = communityAge(startDay, today);
  return PEERS.map((peer) => {
    const xp = peerXp(peer, startDay, today);
    return {
      peer,
      xp,
      lessons: Math.floor(xp / 60),
      streak: Math.max(1, Math.floor((days % 14) * seededRandom(`st:${peer.id}:${Math.floor(days / 14)}`) + peer.pace * 2)),
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
  localized('sent encouragement to a fellow traveller 🌸', '为一位同行者送出了鼓励 🌸'),
  localized('planted a tree in their Virtue Forest 🌳', '在自己的德行森林中种下了一棵树 🌳'),
  localized('set a morning intention 🌅', '立下了晨间心愿 🌅'),
];

/** Today's simulated community activity feed. */
export function communityFeed(today: string): FeedItem[] {
  const items: FeedItem[] = [];
  const count = 4 + Math.floor(seededRandom(`feedn:${today}`) * 3);
  for (let i = 0; i < count; i++) {
    const peer = PEERS[Math.floor(seededRandom(`feedp:${today}:${i}`) * PEERS.length)];
    const action = FEED_ACTIONS[Math.floor(seededRandom(`feeda:${today}:${i}`) * FEED_ACTIONS.length)];
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
 */
export function dailyChallenge(today: string, maxTier: 1 | 2 | 3) {
  const pool = CHALLENGES.filter((c) => c.tier <= maxTier);
  const idx = Math.floor(seededRandom(`challenge:${maxTier}:${today}`) * pool.length);
  return pool[idx];
}

export function dailyQuoteIndex(today: string, quoteCount: number): number {
  return Math.floor(seededRandom(`quote:${today}`) * quoteCount);
}
