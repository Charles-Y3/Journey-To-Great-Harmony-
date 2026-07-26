/**
 * Curated emoji avatars for travellers (World + leaderboards).
 * Unlock packs gate by journey rank index (see RANKS in progression.ts).
 */

export const DEFAULT_AVATAR = '🧑‍🌾';

export interface AvatarDef {
  emoji: string;
  /** Minimum `rankIndexForXp` required to select this avatar. */
  minRankIndex: number;
}

/**
 * Packs: Seeker (0) → Learner (2) → Practitioner (3) → Cultivator (4)
 * → Contributor (5) → Harmony Builder (6) → Wisdom Keeper (7).
 */
export const AVATAR_DEFS: readonly AvatarDef[] = [
  // Seeker — path basics
  { emoji: '🧑‍🌾', minRankIndex: 0 },
  { emoji: '🧘', minRankIndex: 0 },
  { emoji: '📿', minRankIndex: 0 },
  { emoji: '🏮', minRankIndex: 0 },
  { emoji: '🕊️', minRankIndex: 0 },
  { emoji: '🌸', minRankIndex: 0 },
  { emoji: '🍃', minRankIndex: 0 },
  { emoji: '🧭', minRankIndex: 0 },
  { emoji: '🌅', minRankIndex: 0 },
  { emoji: '🪴', minRankIndex: 0 },

  // Learner — study & quiet
  { emoji: '📖', minRankIndex: 2 },
  { emoji: '🔔', minRankIndex: 2 },
  { emoji: '🪔', minRankIndex: 2 },
  { emoji: '🪶', minRankIndex: 2 },
  { emoji: '📜', minRankIndex: 2 },
  { emoji: '🕯️', minRankIndex: 2 },

  // Practitioner — practice body
  { emoji: '🙏', minRankIndex: 3 },
  { emoji: '☯️', minRankIndex: 3 },
  { emoji: '🍵', minRankIndex: 3 },
  { emoji: '🪷', minRankIndex: 3 },
  { emoji: '🎋', minRankIndex: 3 },
  { emoji: '🥋', minRankIndex: 3 },

  // Cultivator — living nature
  { emoji: '🌿', minRankIndex: 4 },
  { emoji: '🦊', minRankIndex: 4 },
  { emoji: '🐢', minRankIndex: 4 },
  { emoji: '🦉', minRankIndex: 4 },
  { emoji: '🐝', minRankIndex: 4 },
  { emoji: '🦋', minRankIndex: 4 },
  { emoji: '🌊', minRankIndex: 4 },
  { emoji: '⛰️', minRankIndex: 4 },
  { emoji: '🌕', minRankIndex: 4 },

  // Contributor — shared road
  { emoji: '🌍', minRankIndex: 5 },
  { emoji: '🤝', minRankIndex: 5 },
  { emoji: '💫', minRankIndex: 5 },
  { emoji: '🌉', minRankIndex: 5 },
  { emoji: '💛', minRankIndex: 5 },

  // Harmony Builder — rare lantern
  { emoji: '🌟', minRankIndex: 6 },
  { emoji: '🏯', minRankIndex: 6 },
  { emoji: '✨', minRankIndex: 6 },
  { emoji: '🔆', minRankIndex: 6 },

  // Wisdom Keeper — endgame
  { emoji: '🐉', minRankIndex: 7 },
  { emoji: '🗿', minRankIndex: 7 },
  { emoji: '💎', minRankIndex: 7 },
] as const;

export const AVATARS: readonly string[] = AVATAR_DEFS.map((d) => d.emoji);

const AVATAR_SET = new Set<string>(AVATARS);
const BY_EMOJI = new Map<string, AvatarDef>(AVATAR_DEFS.map((d) => [d.emoji, d]));

export function isAllowedAvatar(avatar: string): boolean {
  return AVATAR_SET.has(avatar);
}

export function isAvatarUnlocked(emoji: string, rankIndex: number): boolean {
  const def = BY_EMOJI.get(emoji);
  if (!def) return false;
  return rankIndex >= def.minRankIndex;
}

export function unlockRankIndexForAvatar(emoji: string): number | null {
  return BY_EMOJI.get(emoji)?.minRankIndex ?? null;
}

/** If the avatar is missing or locked at this rank, return the default. */
export function resolveAvatarForRank(emoji: string, rankIndex: number): string {
  if (isAllowedAvatar(emoji) && isAvatarUnlocked(emoji, rankIndex)) return emoji;
  return DEFAULT_AVATAR;
}
