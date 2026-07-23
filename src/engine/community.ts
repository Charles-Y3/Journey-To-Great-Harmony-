import { PEERS } from '../data/peers';
import { CHALLENGES } from '../data/challenges';
import type { Peer } from '../data/types';
import { daysBetweenKeys, seededRandom } from './progression';

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
  text: string;
}

const FEED_ACTIONS = [
  'completed a lesson on the Knowledge Path 📖',
  'finished today\'s virtue challenge 🎯',
  'wrote an evening reflection 🪞',
  'studied a point on the Wisdom Timeline ⏳',
  'helped a neighbour today 🤲',
  'sent encouragement to a fellow traveller 🌸',
  'planted a tree in their Virtue Forest 🌳',
  'set a morning intention 🌅',
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

/** The daily challenge rotates deterministically through the pool. */
export function dailyChallengeIndex(today: string): number {
  return Math.floor(seededRandom(`challenge:${today}`) * CHALLENGES.length);
}

export function dailyQuoteIndex(today: string, quoteCount: number): number {
  return Math.floor(seededRandom(`quote:${today}`) * quoteCount);
}
