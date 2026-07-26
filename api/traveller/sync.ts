import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ACTIVE_KEY, getRedis, LB_KEYS, travellerKey } from '../_lib/redis';
import { compassionScore, parseSyncBody, scoreForCategory } from '../_lib/travellers';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const redis = getRedis();
  if (!redis) return res.status(503).json({ error: 'Leaderboard unavailable' });

  const parsed = parseSyncBody(req.body);
  if ('error' in parsed) return res.status(400).json({ error: parsed.error });

  const { id, name, avatar, optedIn, xp, streak, challenges, encouragements, growth } = parsed;
  const updatedAt = Date.now();
  const key = travellerKey(id);

  if (!optedIn) {
    await redis.hset(key, {
      name,
      avatar,
      xp,
      streak,
      challenges,
      encouragements,
      growth,
      updatedAt,
      optedIn: false,
    });
    await Promise.all([
      redis.zrem(LB_KEYS.wisdom, id),
      redis.zrem(LB_KEYS.practice, id),
      redis.zrem(LB_KEYS.compassion, id),
      redis.zrem(LB_KEYS.growth, id),
      redis.zrem(ACTIVE_KEY, id),
    ]);
    return res.status(200).json({ ok: true, optedIn: false });
  }

  const rec = { xp, streak, challenges, encouragements, growth };
  await redis.hset(key, {
    name,
    avatar,
    xp,
    streak,
    challenges,
    encouragements,
    growth,
    updatedAt,
    optedIn: true,
  });
  await Promise.all([
    redis.zadd(LB_KEYS.wisdom, { score: scoreForCategory(rec, 'wisdom'), member: id }),
    redis.zadd(LB_KEYS.practice, { score: scoreForCategory(rec, 'practice'), member: id }),
    redis.zadd(LB_KEYS.compassion, {
      score: compassionScore(challenges, encouragements),
      member: id,
    }),
    redis.zadd(LB_KEYS.growth, { score: scoreForCategory(rec, 'growth'), member: id }),
    redis.zadd(ACTIVE_KEY, { score: updatedAt, member: id }),
  ]);

  // Drop travellers idle longer than 30 days from the World active set.
  const staleBefore = updatedAt - 30 * 24 * 60 * 60 * 1000;
  await redis.zremrangebyscore(ACTIVE_KEY, 0, staleBefore);

  return res.status(200).json({ ok: true, optedIn: true });
}
