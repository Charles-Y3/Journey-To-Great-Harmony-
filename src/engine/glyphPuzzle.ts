/** Sliding-tile board: tile ids 0..n-2 in solved order, `null` = empty cell. */
export type GlyphBoard = (number | null)[];

export function solvedBoard(size: number): GlyphBoard {
  const n = size * size;
  return Array.from({ length: n }, (_, i) => (i === n - 1 ? null : i));
}

export function isSolved(board: GlyphBoard): boolean {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i) return false;
  }
  return board[board.length - 1] === null;
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
export function scrambleBoard(size: number, moves?: number): GlyphBoard {
  const steps = moves ?? (size <= 3 ? 48 : 96);
  let board = solvedBoard(size);
  let empty = board.length - 1;
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
  if (isSolved(board)) return scrambleBoard(size, steps + 8);
  return board;
}
