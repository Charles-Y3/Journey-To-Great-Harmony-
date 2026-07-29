import type { TotemPart, TotemPose, TotemRule } from '../data/totems';

export const TOTEM_STAGE = 200;
const CLAMP_MIN = 18;
const CLAMP_MAX = 182;

export function clampTotem(v: number): number {
  return Math.max(CLAMP_MIN, Math.min(CLAMP_MAX, v));
}

export function dist(a: { x: number; y: number }, b: { x: number; y: number }): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function scatterTotem(parts: readonly TotemPart[]): TotemPose {
  const pose: TotemPose = {};
  const margin = 28;
  for (const p of parts) {
    pose[p.id] = {
      x: margin + Math.random() * (TOTEM_STAGE - margin * 2),
      y: margin + Math.random() * (TOTEM_STAGE - margin * 2),
    };
  }
  for (let pass = 0; pass < 8; pass++) {
    for (const a of parts) {
      for (const b of parts) {
        if (a.id >= b.id) continue;
        const pa = pose[a.id]!;
        const pb = pose[b.id]!;
        const d = dist(pa, pb);
        const min = (a.r + b.r) * 0.55;
        if (d < min && d > 0.01) {
          const push = (min - d) / 2;
          const ux = (pa.x - pb.x) / d;
          const uy = (pa.y - pb.y) / d;
          pa.x = clampTotem(pa.x + ux * push);
          pa.y = clampTotem(pa.y + uy * push);
          pb.x = clampTotem(pb.x - ux * push);
          pb.y = clampTotem(pb.y - uy * push);
        }
      }
    }
  }
  return pose;
}

function partById(parts: readonly TotemPart[], id: string): TotemPart {
  const p = parts.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown totem part: ${id}`);
  return p;
}

export function evalTotemRule(
  rule: TotemRule,
  pose: TotemPose,
  parts: readonly TotemPart[],
): boolean {
  const A = pose[rule.a];
  const B = pose[rule.b];
  if (!A || !B) return false;
  const C = rule.c ? pose[rule.c] : null;
  const pA = partById(parts, rule.a);
  const pB = partById(parts, rule.b);

  switch (rule.type) {
    case 'inside':
      return dist(A, B) <= pB.r - pA.r * 0.25;
    case 'outside':
      return dist(A, B) >= pB.r + pA.r * 0.2;
    case 'near':
      return dist(A, B) <= (rule.max ?? 0);
    case 'far':
    case 'apart':
      return dist(A, B) >= (rule.min ?? 0);
    case 'above':
      return A.y <= B.y - 10;
    case 'below':
      return A.y >= B.y + 8;
    case 'aside':
      if (rule.side === 'left') return A.x <= B.x - 12;
      return A.x >= B.x + 12;
    case 'level':
      return Math.abs(A.y - B.y) <= (rule.max ?? 0);
    case 'between': {
      if (!C) return false;
      const vx = C.x - B.x;
      const vy = C.y - B.y;
      const len2 = vx * vx + vy * vy || 1;
      const t = ((A.x - B.x) * vx + (A.y - B.y) * vy) / len2;
      if (t < 0.2 || t > 0.8) return false;
      const px = B.x + t * vx;
      const py = B.y + t * vy;
      return Math.hypot(A.x - px, A.y - py) <= 28;
    }
    default:
      return true;
  }
}

/** First failing rule message key index, or null if all pass. */
export function firstFailingRule(
  rules: readonly TotemRule[],
  pose: TotemPose,
  parts: readonly TotemPart[],
): TotemRule | null {
  for (const rule of rules) {
    if (!evalTotemRule(rule, pose, parts)) return rule;
  }
  return null;
}

export function hitTestTotem(
  x: number,
  y: number,
  parts: readonly TotemPart[],
  pose: TotemPose,
): string | null {
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i]!;
    const c = pose[p.id];
    if (!c) continue;
    if (Math.hypot(x - c.x, y - c.y) <= p.r + 4) return p.id;
  }
  return null;
}
