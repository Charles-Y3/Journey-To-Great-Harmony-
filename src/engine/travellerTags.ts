import { hashString } from './progression';

/** Ids of every row whose name collides with another row's name in the same list. */
export function findNameCollisions(rows: { id: string; name: string }[]): Set<string> {
  const byName = new Map<string, string[]>();
  for (const r of rows) {
    const key = r.name.trim().toLowerCase();
    if (!key) continue;
    const ids = byName.get(key);
    if (ids) ids.push(r.id);
    else byName.set(key, [r.id]);
  }
  const collisions = new Set<string>();
  for (const ids of byName.values()) {
    if (ids.length > 1) ids.forEach((id) => collisions.add(id));
  }
  return collisions;
}

/** Short, muted, numeric-only disambiguation tag derived from a traveller id (no i18n needed). */
export function travellerTag(id: string): string {
  const n = Math.abs(hashString(id)) % 1000;
  return `#${n.toString().padStart(3, '0')}`;
}
