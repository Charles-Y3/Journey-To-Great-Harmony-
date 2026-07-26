/** Stage-scaled walker population for the Great Harmony World strip. */

export interface WorldWalkerCaps {
  /** Max NPCs + remote reals (local self is always outside this). */
  cap: number;
  /** Prefer up to this many remote actives before filling with NPCs. */
  maxReals: number;
}

const STAGE_CAPS: WorldWalkerCaps[] = [
  { cap: 6, maxReals: 4 }, // Village
  { cap: 12, maxReals: 8 }, // Town
  { cap: 20, maxReals: 14 }, // City
  { cap: 28, maxReals: 20 }, // World
];

export function walkerCapsForStage(stageIndex: number): WorldWalkerCaps {
  const i = Math.max(0, Math.min(STAGE_CAPS.length - 1, stageIndex));
  return STAGE_CAPS[i];
}
