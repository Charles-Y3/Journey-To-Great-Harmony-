import { useUi } from '../state/uiStore';
import type { UiKey } from '../i18n/strings';

/**
 * Progressive nav reveal (pacingMode === 'gated'): every destination except
 * Advisor (which has its own independent figure-card-owned gate, handled
 * separately in App.tsx) belongs to a wave. A wave's items are fully visible
 * once reached; the *next* wave shows as a named, locked tile (a visible
 * goal, not a mystery); anything further out stays fully unrendered.
 * `mobilePrimary` marks the items that live in the fixed bottom-nav bar once
 * unlocked — while still locked they show as a locked tile in "More"
 * instead, so the bottom bar never wastes a slot on an inert lock icon.
 *
 * Shared between App.tsx (nav rendering) and useTodayTasks.ts (so the
 * "Consider doing" secondary tasks never point at a feature the wave system
 * hasn't unlocked yet) — keep this the single source of truth for wave
 * membership rather than duplicating the mapping in either place.
 */
export const NAV_ITEMS: { to: string; emoji: string; key: UiKey; wave: number; mobilePrimary: boolean }[] = [
  { to: '/', emoji: '🌅', key: 'navToday', wave: 0, mobilePrimary: true },
  { to: '/practice', emoji: '🎯', key: 'navPractice', wave: 0, mobilePrimary: true },
  { to: '/knowledge', emoji: '🌳', key: 'navKnowledge', wave: 0, mobilePrimary: true },
  { to: '/forest', emoji: '🌲', key: 'navForest', wave: 1, mobilePrimary: true },
  { to: '/turning-points', emoji: '💧', key: 'navTurningPoints', wave: 1, mobilePrimary: false },
  { to: '/world', emoji: '🌏', key: 'navWorld', wave: 2, mobilePrimary: true },
  { to: '/map', emoji: '🗺️', key: 'navMap', wave: 2, mobilePrimary: false },
  { to: '/timeline', emoji: '⏳', key: 'navTimeline', wave: 2, mobilePrimary: false },
  { to: '/community', emoji: '👥', key: 'navCommunity', wave: 3, mobilePrimary: false },
  { to: '/collection', emoji: '🎴', key: 'navCollection', wave: 3, mobilePrimary: false },
  { to: '/glyphs', emoji: '🧩', key: 'navGlyphs', wave: 3, mobilePrimary: false },
];

/** Highest wave index in NAV_ITEMS — the point past which "show everything" ratchets. */
export const MAX_NAV_WAVE = Math.max(...NAV_ITEMS.map((i) => i.wave));

/** Which wave the user's own progress has naturally reached (independent of pacingMode). */
export function computeProgressWave(rankIndex: number, firstDaySuccess: boolean): number {
  if (rankIndex >= 2) return 3; // Learner+
  if (rankIndex >= 1) return 2; // Explorer+
  if (firstDaySuccess) return 1;
  return 0;
}

export type NavItemState = 'visible' | 'locked' | 'hidden';

export function navItemState(wave: number, effectiveWave: number): NavItemState {
  if (wave <= effectiveWave) return 'visible';
  if (wave === effectiveWave + 1) return 'locked';
  return 'hidden';
}

/** Combines pacingMode with the ratcheted high-water mark — see uiStore's highestWaveSeen doc comment. */
export function useEffectiveWave(): number {
  const pacingMode = useUi((s) => s.pacingMode);
  const highestWaveSeen = useUi((s) => s.highestWaveSeen);
  return pacingMode === 'all' ? MAX_NAV_WAVE : highestWaveSeen;
}

/**
 * Plain (non-hook) check for a single route against an already-computed
 * effectiveWave — use this inside .map()/.filter() over several candidate
 * links, where calling the hook version per-item would break rules-of-hooks.
 */
export function isNavRouteUnlocked(to: string, effectiveWave: number): boolean {
  const item = NAV_ITEMS.find((i) => i.to === to);
  if (!item) return true; // routes outside the wave system (e.g. /advisor) are never gated here
  return navItemState(item.wave, effectiveWave) === 'visible';
}

/** True once the wave containing `to` (a NAV_ITEMS route) is fully visible. */
export function useIsNavRouteUnlocked(to: string): boolean {
  const effectiveWave = useEffectiveWave();
  return isNavRouteUnlocked(to, effectiveWave);
}
