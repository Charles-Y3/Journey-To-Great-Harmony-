import { statsFromData, forestInfo, type JourneyData } from '../state/selectors';
import { useJourney } from '../state/store';
import { useProfile } from '../state/profileStore';
import { useTraveller } from '../state/travellerStore';
import { DEFAULT_AVATAR, isAllowedAvatar } from '../data/avatars';
import { syncTraveller, type TravellerSyncPayload } from './travellerApi';

const DEBOUNCE_MS = 2500;
let timer: ReturnType<typeof setTimeout> | null = null;
let inflight = false;

function buildPayload(): TravellerSyncPayload | null {
  const traveller = useTraveller.getState();
  const profile = useProfile.getState();
  const journey = useJourney.getState();
  const id = traveller.travellerId;
  if (!id) return null;
  const name = profile.name?.trim();
  if (!name) return null;
  const avatar = isAllowedAvatar(profile.avatar) ? profile.avatar : DEFAULT_AVATAR;
  const d = journey as unknown as JourneyData;
  const stats = statsFromData(d);
  const forest = forestInfo(d);
  return {
    id,
    name,
    avatar,
    optedIn: traveller.optedIn,
    xp: stats.xp,
    streak: stats.streakCurrent,
    challenges: stats.challengesDone,
    encouragements: stats.encouragementsSent,
    growth: forest.score,
  };
}

/** Immediate sync (opt-in / opt-out / avatar change). */
export async function flushTravellerSync(): Promise<boolean> {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  const payload = buildPayload();
  if (!payload) return false;
  if (inflight) return false;
  inflight = true;
  try {
    return await syncTraveller(payload);
  } finally {
    inflight = false;
  }
}

/** Debounced sync after progress changes while opted in. */
export function scheduleTravellerSync() {
  const { optedIn, travellerId } = useTraveller.getState();
  if (!optedIn || !travellerId) return;
  if (!useProfile.getState().name?.trim()) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void flushTravellerSync();
  }, DEBOUNCE_MS);
}
