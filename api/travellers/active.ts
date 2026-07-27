import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ACTIVE_KEY, getRedis, travellerKey } from '../_lib/redis.js';
import { parseZScoredMembers, recordFromHash } from '../_lib/travellers.js';

const TOP_N = 24;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const redis = getRedis();
  if (!redis) return res.status(503).json({ error: 'Unavailable', travellers: [] });

  const raw = await redis.zrange(ACTIVE_KEY, 0, TOP_N - 1, { rev: true, withScores: true });
  const scored = parseZScoredMembers(raw);

  const travellers = [];
  for (const { id } of scored) {
    const hash = (await redis.hgetall(travellerKey(id))) as Record<string, unknown> | null;
    const rec = recordFromHash(id, hash);
    if (!rec || !rec.optedIn) continue;
    travellers.push({
      id: rec.id,
      name: rec.name,
      avatar: rec.avatar,
      xp: rec.xp,
      updatedAt: rec.updatedAt,
    });
  }

  return res.status(200).json({ travellers });
}
