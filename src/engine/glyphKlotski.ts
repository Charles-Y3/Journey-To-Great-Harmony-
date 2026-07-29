import type { GlyphPiece, IntermediateGlyph } from '../data/glyphs';

export type Dir = 'up' | 'down' | 'left' | 'right';

/** Current top-left of each piece by id. */
export type KlotskiState = Record<string, { r: number; c: number }>;

/** An empty cell a piece would enter when stepping in `dir`. */
export type EmptyTarget = { r: number; c: number; dir: Dir };

const DIR_DELTA: Record<Dir, { dr: number; dc: number }> = {
  up: { dr: -1, dc: 0 },
  down: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
  right: { dr: 0, dc: 1 },
};

export function previewState(glyph: IntermediateGlyph): KlotskiState {
  const state: KlotskiState = {};
  for (const p of glyph.pieces) {
    state[p.id] = { r: p.solvedR, c: p.solvedC };
  }
  return state;
}

export function isSolved(state: KlotskiState, glyph: IntermediateGlyph): boolean {
  for (const p of glyph.pieces) {
    const pos = state[p.id];
    if (!pos || pos.r !== p.solvedR || pos.c !== p.solvedC) return false;
  }
  return true;
}

function pieceById(glyph: IntermediateGlyph, id: string): GlyphPiece {
  const p = glyph.pieces.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown piece ${id}`);
  return p;
}

/** Occupancy grid: piece id or null for empty. */
export function occupancy(state: KlotskiState, glyph: IntermediateGlyph): (string | null)[][] {
  const { cols, rows } = glyph.board;
  const grid: (string | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null),
  );
  for (const p of glyph.pieces) {
    const pos = state[p.id];
    if (!pos) continue;
    for (let r = pos.r; r < pos.r + p.h; r++) {
      for (let c = pos.c; c < pos.c + p.w; c++) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
        grid[r]![c] = p.id;
      }
    }
  }
  return grid;
}

/**
 * Whether `pieceId` can step one cell in `dir` (target cells empty / in-bounds).
 */
export function canMove(
  state: KlotskiState,
  glyph: IntermediateGlyph,
  pieceId: string,
  dir: Dir,
): boolean {
  const p = pieceById(glyph, pieceId);
  const pos = state[pieceId];
  if (!pos) return false;
  const { dr, dc } = DIR_DELTA[dir];
  const nr = pos.r + dr;
  const nc = pos.c + dc;
  const { cols, rows } = glyph.board;
  if (nr < 0 || nc < 0 || nr + p.h > rows || nc + p.w > cols) return false;

  const grid = occupancy(state, glyph);
  for (let r = nr; r < nr + p.h; r++) {
    for (let c = nc; c < nc + p.w; c++) {
      const cell = grid[r]![c];
      if (cell !== null && cell !== pieceId) return false;
    }
  }
  return true;
}

/** Directions in which `pieceId` can currently step one cell. */
export function movableDirs(
  state: KlotskiState,
  glyph: IntermediateGlyph,
  pieceId: string,
): Dir[] {
  return (['up', 'down', 'left', 'right'] as Dir[]).filter((d) =>
    canMove(state, glyph, pieceId, d),
  );
}

/**
 * Empty cells the piece would enter for each legal one-cell step.
 * Used so the player can tap a specific empty slot when multiple dirs exist.
 */
export function emptyTargetsForPiece(
  state: KlotskiState,
  glyph: IntermediateGlyph,
  pieceId: string,
): EmptyTarget[] {
  const p = pieceById(glyph, pieceId);
  const pos = state[pieceId];
  if (!pos) return [];
  const out: EmptyTarget[] = [];
  for (const dir of movableDirs(state, glyph, pieceId)) {
    if (dir === 'up') {
      for (let c = pos.c; c < pos.c + p.w; c++) out.push({ r: pos.r - 1, c, dir });
    } else if (dir === 'down') {
      for (let c = pos.c; c < pos.c + p.w; c++) out.push({ r: pos.r + p.h, c, dir });
    } else if (dir === 'left') {
      for (let r = pos.r; r < pos.r + p.h; r++) out.push({ r, c: pos.c - 1, dir });
    } else {
      for (let r = pos.r; r < pos.r + p.h; r++) out.push({ r, c: pos.c + p.w, dir });
    }
  }
  return out;
}

export function tryMove(
  state: KlotskiState,
  glyph: IntermediateGlyph,
  pieceId: string,
  dir: Dir,
): KlotskiState | null {
  if (!canMove(state, glyph, pieceId, dir)) return null;
  const pos = state[pieceId]!;
  const { dr, dc } = DIR_DELTA[dir];
  return {
    ...state,
    [pieceId]: { r: pos.r + dr, c: pos.c + dc },
  };
}

/**
 * Tap a piece: if it has exactly one legal step, take it.
 * If several, return null — the UI must ask which empty slot to enter.
 */
export function tryTapPiece(
  state: KlotskiState,
  glyph: IntermediateGlyph,
  pieceId: string,
): KlotskiState | null {
  const dirs = movableDirs(state, glyph, pieceId);
  if (dirs.length === 1) return tryMove(state, glyph, pieceId, dirs[0]!);
  return null;
}

function stateKey(state: KlotskiState, glyph: IntermediateGlyph): string {
  return glyph.pieces.map((p) => `${p.id}:${state[p.id]!.r},${state[p.id]!.c}`).join('|');
}

function allMoves(state: KlotskiState, glyph: IntermediateGlyph): { id: string; dir: Dir }[] {
  const out: { id: string; dir: Dir }[] = [];
  for (const p of glyph.pieces) {
    for (const dir of movableDirs(state, glyph, p.id)) out.push({ id: p.id, dir });
  }
  return out;
}

/**
 * Random walk of legal slides from the solved state that never revisits a
 * state already seen earlier in this same walk. Plain random walks on this
 * board (only 2 empty cells among 20) have a small branching factor and
 * readily double back on themselves within a handful of moves, handing back
 * an almost-solved board; refusing to revisit forces every step to make
 * genuine progress instead.
 */
function selfAvoidingWalk(glyph: IntermediateGlyph, targetMoves: number): KlotskiState {
  let state = previewState(glyph);
  const visited = new Set([stateKey(state, glyph)]);
  let taken = 0;
  // Generous attempt budget: a self-avoiding walk can dead-end (every
  // reachable neighbour already visited) before reaching targetMoves.
  for (let i = 0; i < targetMoves * 6 && taken < targetMoves; i++) {
    const moves = allMoves(state, glyph);
    for (let j = moves.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [moves[j], moves[k]] = [moves[k]!, moves[j]!];
    }
    let advanced = false;
    for (const m of moves) {
      const next = tryMove(state, glyph, m.id, m.dir);
      if (!next) continue;
      const key = stateKey(next, glyph);
      if (visited.has(key)) continue;
      state = next;
      visited.add(key);
      taken++;
      advanced = true;
      break;
    }
    if (!advanced) break;
  }
  return state;
}

/** Shallow bounded search: can `state` reach solved within `capDepth` moves? */
function solvableWithin(state: KlotskiState, glyph: IntermediateGlyph, capDepth: number): boolean {
  if (isSolved(state, glyph)) return true;
  let frontier = [state];
  const seen = new Set([stateKey(state, glyph)]);
  for (let d = 0; d < capDepth; d++) {
    const next: KlotskiState[] = [];
    for (const s of frontier) {
      for (const m of allMoves(s, glyph)) {
        const n = tryMove(s, glyph, m.id, m.dir);
        if (!n) continue;
        const key = stateKey(n, glyph);
        if (seen.has(key)) continue;
        if (isSolved(n, glyph)) return true;
        seen.add(key);
        next.push(n);
      }
    }
    frontier = next;
    if (frontier.length === 0) break;
  }
  return false;
}

/**
 * Scramble by a self-avoiding walk of legal slides from the solved state,
 * retrying if the result is still trivially close to solved (a cheap
 * shallow search, not a full solve) so Shuffle can't hand back an
 * almost-finished board. Always solvable by construction — every step is a
 * legal, reversible slide — and self-avoidance keeps the walk from wasting
 * moves doubling back, which is what let a plain random walk wander into
 * pathologically deep, hard-to-escape states.
 */
export function scrambleKlotski(glyph: IntermediateGlyph, targetMoves = 30): KlotskiState {
  const REJECT_IF_SOLVABLE_WITHIN = 8;
  const MAX_ATTEMPTS = 20;
  let candidate = previewState(glyph);
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    candidate = selfAvoidingWalk(glyph, targetMoves);
    if (!solvableWithin(candidate, glyph, REJECT_IF_SOLVABLE_WITHIN)) return candidate;
  }
  return candidate;
}
