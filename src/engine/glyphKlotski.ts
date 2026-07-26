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
