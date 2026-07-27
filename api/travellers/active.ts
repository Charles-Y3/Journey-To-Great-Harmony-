import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ACTIVE_KEY, getRedis, LB_KEYS, travellerKey } from '../_lib/redis.js';
import { parseZScoredMembers, rankXpBand, recordFromHash } from '../_lib/travellers.js';

const TOP_N = 24;
/** Skip the near-rank query when the caller is already this prominent in `travellers`. */
const PROMINENCE_THRESHOLD = 10;
const NEAR_RANK_QUERY_CAP = 20;
const NEAR_RANK_RESULT_CAP = 15;
const ACTIVE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

interface TravellerRow {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  updatedAt: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const redis = getRedis();
  if (!redis) return res.status(503).json({ error: 'Unavailable', travellers: [], nearby: [] });

  const myId = typeof req.query.myId === 'string' ? req.query.myId : null;
  const myXpRaw = typeof req.query.myXp === 'string' ? Number(req.query.myXp) : NaN;
  const myXp = Number.isFinite(myXpRaw) ? myXpRaw : null;

  const raw = await redis.zrange(ACTIVE_KEY, 0, TOP_N - 1, { rev: true, withScores: true });
  const scored = parseZScoredMembers(raw);

  const travellers: TravellerRow[] = [];
  const seenIds = new Set<string>();
  for (const { id } of scored) {
    const hash = (await redis.hgetall(travellerKey(id))) as Record<string, unknown> | null;
    const rec = recordFromHash(id, hash);
    if (!rec || !rec.optedIn) continue;
    seenIds.add(id);
    travellers.push({ id: rec.id, name: rec.name, avatar: rec.avatar, xp: rec.xp, updatedAt: rec.updatedAt });
  }

  // Real travellers near the caller's own rank tier — only worth fetching when
  // the caller isn't already prominent among the recently-active set above.
  const nearby: TravellerRow[] = [];
  const myProminentIndex = myId ? travellers.findIndex((tr) => tr.id === myId) : -1;
  const needsNearby = myId !== null && myXp !== null && (myProminentIndex === -1 || myProminentIndex >= PROMINENCE_THRESHOLD);
  if (needsNearby) {
    const { min, max } = rankXpBand(myXp as number);
    const candidateIds = (await redis.zrange(LB_KEYS.wisdom, min, max, {
      byScore: true,
      offset: 0,
      count: NEAR_RANK_QUERY_CAP,
    })) as string[];
    const staleBefore = Date.now() - ACTIVE_WINDOW_MS;
    for (const id of candidateIds) {
      if (nearby.length >= NEAR_RANK_RESULT_CAP) break;
      if (id === myId || seenIds.has(id)) continue;
      const hash = (await redis.hgetall(travellerKey(id))) as Record<string, unknown> | null;
      const rec = recordFromHash(id, hash);
      if (!rec || !rec.optedIn || rec.updatedAt < staleBefore) continue;
      seenIds.add(id);
      nearby.push({ id: rec.id, name: rec.name, avatar: rec.avatar, xp: rec.xp, updatedAt: rec.updatedAt });
    }
  }

  return res.status(200).json({ travellers, nearby });
}
