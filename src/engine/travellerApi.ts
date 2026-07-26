export type LeaderboardCategory = 'wisdom' | 'practice' | 'compassion' | 'growth';

export interface LeaderboardRow {
  id: string;
  name: string;
  avatar: string;
  score: number;
  /** For displaying journey rank beside the name on every board. */
  xp: number;
}

export interface ActiveTraveller {
  id: string;
  name: string;
  avatar: string;
  /** Used client-side to derive display rank. */
  xp: number;
  updatedAt: number;
}

export interface TravellerSyncPayload {
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

async function readJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** POST sync. Returns false when API/Redis unavailable. */
export async function syncTraveller(payload: TravellerSyncPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/traveller/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchLeaderboard(cat: LeaderboardCategory): Promise<LeaderboardRow[] | null> {
  try {
    const res = await fetch(`/api/leaderboard?cat=${encodeURIComponent(cat)}`);
    if (!res.ok) return null;
    const data = await readJson<{ rows?: LeaderboardRow[] }>(res);
    return data?.rows ?? null;
  } catch {
    return null;
  }
}

export async function fetchActiveTravellers(): Promise<ActiveTraveller[] | null> {
  try {
    const res = await fetch('/api/travellers/active');
    if (!res.ok) return null;
    const data = await readJson<{ travellers?: ActiveTraveller[] }>(res);
    return data?.travellers ?? null;
  } catch {
    return null;
  }
}
