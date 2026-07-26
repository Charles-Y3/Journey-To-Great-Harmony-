import { Redis } from '@upstash/redis';

/** Returns null when Upstash env is missing — callers should fail soft (NPC-only UI). */
export function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export const LB_KEYS = {
  wisdom: 'lb:wisdom',
  practice: 'lb:practice',
  compassion: 'lb:compassion',
  growth: 'lb:growth',
} as const;

export type LbCategory = keyof typeof LB_KEYS;

export const ACTIVE_KEY = 'travellers:active';

export function travellerKey(id: string): string {
  return `traveller:${id}`;
}
