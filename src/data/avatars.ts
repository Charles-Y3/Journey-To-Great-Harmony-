/** Curated emoji avatars for opted-in travellers (World + leaderboards). */
export const DEFAULT_AVATAR = '🧑‍🌾';

export const AVATARS: readonly string[] = [
  '🧑‍🌾',
  '🧘',
  '📿',
  '🏮',
  '🕊️',
  '🌸',
  '🍃',
  '⛰️',
  '🌊',
  '🌕',
  '🎋',
  '🪷',
  '🪶',
  '🧭',
  '📖',
  '🔔',
  '🌿',
  '🦊',
  '🐢',
  '🦉',
  '🐝',
  '🦀',
  '🦋',
  '🌅',
] as const;

const AVATAR_SET = new Set<string>(AVATARS);

export function isAllowedAvatar(avatar: string): boolean {
  return AVATAR_SET.has(avatar);
}
