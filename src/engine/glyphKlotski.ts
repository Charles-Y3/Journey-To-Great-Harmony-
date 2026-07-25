import type { GlyphPiece, IntermediateGlyph } from '../data/glyphs';

export type Dir = 'up' | 'down' | 'left' | 'right';

/** Current top-left of each piece by id. */
export type KlotskiState = Record<string, { r: number; c: number }>;

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
 * Tap a piece: if it has exactly one legal step direction, take it; if several,
 * prefer the direction toward the largest contiguous empty gap along an edge.
 * Returns null if the piece cannot move.
 */
export function tryTapPiece(
  state: KlotskiState,
  glyph: IntermediateGlyph,
  pieceId: string,
): KlotskiState | null {
  const dirs = movableDirs(state, glyph, pieceId);
  if (dirs.length === 0) return null;
  if (dirs.length === 1) return tryMove(state, glyph, pieceId, dirs[0]!);

  // Prefer a direction where the piece's facing edge fully borders empty cells.
  const p = pieceById(glyph, pieceId);
  const pos = state[pieceId]!;
  const grid = occupancy(state, glyph);
  let best: Dir | null = null;
  let bestScore = -1;
  for (const dir of dirs) {
    const { dr, dc } = DIR_DELTA[dir];
    let score = 0;
    if (dr === -1) {
      for (let c = pos.c; c < pos.c + p.w; c++) {
        if (grid[pos.r - 1]?.[c] === null) score++;
      }
    } else if (dr === 1) {
      for (let c = pos.c; c < pos.c + p.w; c++) {
        if (grid[pos.r + p.h]?.[c] === null) score++;
      }
    } else if (dc === -1) {
      for (let r = pos.r; r < pos.r + p.h; r++) {
        if (grid[r]?.[pos.c - 1] === null) score++;
      }
    } else {
      for (let r = pos.r; r < pos.r + p.h; r++) {
        if (grid[r]?.[pos.c + p.w] === null) score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = dir;
    }
  }
  return best ? tryMove(state, glyph, pieceId, best) : null;
}

/**
 * Scramble by performing legal one-cell slides from the solved state.
 */
export function scrambleKlotski(glyph: IntermediateGlyph, moves = 80): KlotskiState {
  let state = previewState(glyph);
  let prevKey = '';
  for (let i = 0; i < moves; i++) {
    const options: { id: string; dir: Dir }[] = [];
    for (const p of glyph.pieces) {
      for (const dir of movableDirs(state, glyph, p.id)) {
        const key = `${p.id}:${dir}`;
        if (key === prevKey) continue;
        // Avoid immediate undo of the last move.
        const undo =
          dir === 'up'
            ? 'down'
            : dir === 'down'
              ? 'up'
              : dir === 'left'
                ? 'right'
                : 'left';
        if (prevKey === `${p.id}:${undo}`) continue;
        options.push({ id: p.id, dir });
      }
    }
    if (options.length === 0) break;
    const pick = options[Math.floor(Math.random() * options.length)]!;
    const next = tryMove(state, glyph, pick.id, pick.dir);
    if (!next) continue;
    state = next;
    prevKey = `${pick.id}:${pick.dir}`;
  }
  if (isSolved(state, glyph)) return scrambleKlotski(glyph, moves + 16);
  return state;
}
