/** Sliding-tile board: tile id equals its solved grid position, `null` = empty cell. */
export type GlyphBoard = (number | null)[];

/** A fully assembled board with no empty cell — for the "here's the target" preview, not playable. */
export function fullBoard(size: number): GlyphBoard {
  return Array.from({ length: size * size }, (_, i) => i);
}

export function solvedBoard(size: number, solvedEmptyIndex: number = size * size - 1): GlyphBoard {
  const n = size * size;
  return Array.from({ length: n }, (_, i) => (i === solvedEmptyIndex ? null : i));
}

export function isSolved(board: GlyphBoard, solvedEmptyIndex: number = board.length - 1): boolean {
  for (let i = 0; i < board.length; i++) {
    if (i === solvedEmptyIndex) {
      if (board[i] !== null) return false;
    } else if (board[i] !== i) {
      return false;
    }
  }
  return true;
}

export function emptyIndex(board: GlyphBoard): number {
  return board.indexOf(null);
}

export function neighborIndices(index: number, size: number): number[] {
  const r = Math.floor(index / size);
  const c = index % size;
  const out: number[] = [];
  if (r > 0) out.push(index - size);
  if (r < size - 1) out.push(index + size);
  if (c > 0) out.push(index - 1);
  if (c < size - 1) out.push(index + 1);
  return out;
}

/** Slide the tile at `fromIndex` into the empty cell, if adjacent. */
export function trySlide(board: GlyphBoard, fromIndex: number, size: number): GlyphBoard | null {
  const empty = emptyIndex(board);
  if (empty < 0 || !neighborIndices(empty, size).includes(fromIndex)) return null;
  if (board[fromIndex] === null) return null;
  const next = board.slice();
  next[empty] = next[fromIndex];
  next[fromIndex] = null;
  return next;
}

/**
 * Scramble by performing legal slides from the solved state so the puzzle
 * is always solvable. `moves` scales with board size.
 */
export function scrambleBoard(size: number, solvedEmptyIndex: number = size * size - 1, moves?: number): GlyphBoard {
  const steps = moves ?? (size <= 3 ? 48 : 96);
  let board = solvedBoard(size, solvedEmptyIndex);
  let empty = solvedEmptyIndex;
  let prev = -1;
  for (let i = 0; i < steps; i++) {
    const opts = neighborIndices(empty, size).filter((n) => n !== prev);
    const pick = opts[Math.floor(Math.random() * opts.length)]!;
    board = board.slice();
    board[empty] = board[pick];
    board[pick] = null;
    prev = empty;
    empty = pick;
  }
  if (isSolved(board, solvedEmptyIndex)) return scrambleBoard(size, solvedEmptyIndex, steps + 8);
  return board;
}
