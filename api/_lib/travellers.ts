import { AVATARS, isAllowedAvatar } from '../../src/data/avatars.js';
import type { LbCategory } from './redis.js';

export { AVATARS, isAllowedAvatar };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const LB_CATEGORIES: LbCategory[] = ['wisdom', 'practice', 'compassion', 'growth'];

export interface TravellerSyncBody {
  id: string;
  name: string;
  avatar: string;
  optedIn: boolean;
  xp: number;
  streak: number;
  challenges: number;
  encouragements: number;
  growth: number;
}

export interface TravellerRecord {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  challenges: number;
  encouragements: number;
  growth: number;
  updatedAt: number;
  optedIn: boolean;
}

export function compassionScore(challenges: number, encouragements: number): number {
  return challenges * 2 + encouragements * 3;
}

function clampInt(n: unknown, max: number): number | null {
  if (typeof n !== 'number' || !Number.isFinite(n)) return null;
  const v = Math.floor(n);
  if (v < 0 || v > max) return null;
  return v;
}

export function parseSyncBody(raw: unknown): TravellerSyncBody | { error: string } {
  if (!raw || typeof raw !== 'object') return { error: 'Invalid body' };
  const b = raw as Record<string, unknown>;
  const id = typeof b.id === 'string' ? b.id.trim() : '';
  if (!UUID_RE.test(id)) return { error: 'Invalid id' };
  const name = typeof b.name === 'string' ? b.name.trim().slice(0, 40) : '';
  if (!name) return { error: 'Name required' };
  const avatar = typeof b.avatar === 'string' ? b.avatar : '';
  if (!isAllowedAvatar(avatar)) return { error: 'Invalid avatar' };
  const optedIn = b.optedIn === true;
  const xp = clampInt(b.xp, 10_000_000);
  const streak = clampInt(b.streak, 10_000);
  const challenges = clampInt(b.challenges, 100_000);
  const encouragements = clampInt(b.encouragements, 100_000);
  const growth = clampInt(b.growth, 100_000);
  if (xp === null || streak === null || challenges === null || encouragements === null || growth === null) {
    return { error: 'Invalid metrics' };
  }
  return { id, name, avatar, optedIn, xp, streak, challenges, encouragements, growth };
}

export function scoreForCategory(rec: Pick<TravellerRecord, 'xp' | 'streak' | 'challenges' | 'encouragements' | 'growth'>, cat: LbCategory): number {
  switch (cat) {
    case 'wisdom':
      return rec.xp;
    case 'practice':
      return rec.streak;
    case 'compassion':
      return compassionScore(rec.challenges, rec.encouragements);
    case 'growth':
      return rec.growth;
  }
}

/** Normalize Upstash zrange+withScores results across SDK shapes. */
export function parseZScoredMembers(raw: unknown): { id: string; score: number }[] {
  if (!Array.isArray(raw)) return [];
  if (raw.length > 0 && raw[0] && typeof raw[0] === 'object' && 'member' in (raw[0] as object)) {
    return (raw as { member: string; score: number }[]).map((r) => ({
      id: String(r.member),
      score: Number(r.score) || 0,
    }));
  }
  const out: { id: string; score: number }[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    out.push({ id: String(raw[i]), score: Number(raw[i + 1]) || 0 });
  }
  return out;
}

export function recordFromHash(id: string, hash: Record<string, unknown> | null): TravellerRecord | null {
  if (!hash) return null;
  const name = typeof hash.name === 'string' ? hash.name : '';
  const avatar = typeof hash.avatar === 'string' ? hash.avatar : '';
  if (!name || !isAllowedAvatar(avatar)) return null;
  return {
    id,
    name,
    avatar,
    xp: Number(hash.xp) || 0,
    streak: Number(hash.streak) || 0,
    challenges: Number(hash.challenges) || 0,
    encouragements: Number(hash.encouragements) || 0,
    growth: Number(hash.growth) || 0,
    updatedAt: Number(hash.updatedAt) || 0,
    optedIn: hash.optedIn === true || hash.optedIn === 'true',
  };
}
