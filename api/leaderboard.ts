import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getRedis, LB_KEYS, type LbCategory, travellerKey } from './_lib/redis.js';
import { LB_CATEGORIES, parseZScoredMembers, recordFromHash } from './_lib/travellers.js';

const TOP_N = 20;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const redis = getRedis();
  if (!redis) return res.status(503).json({ error: 'Leaderboard unavailable', rows: [] });

  const catRaw = typeof req.query.cat === 'string' ? req.query.cat : 'wisdom';
  if (!LB_CATEGORIES.includes(catRaw as LbCategory)) {
    return res.status(400).json({ error: 'Invalid category', rows: [] });
  }
  const cat = catRaw as LbCategory;

  const raw = await redis.zrange(LB_KEYS[cat], 0, TOP_N - 1, { rev: true, withScores: true });
  const scored = parseZScoredMembers(raw);

  const rows = [];
  for (const { id, score } of scored) {
    const hash = (await redis.hgetall(travellerKey(id))) as Record<string, unknown> | null;
    const rec = recordFromHash(id, hash);
    if (!rec || !rec.optedIn) continue;
    rows.push({ id: rec.id, name: rec.name, avatar: rec.avatar, score, xp: rec.xp });
  }

  return res.status(200).json({ cat, rows });
}
