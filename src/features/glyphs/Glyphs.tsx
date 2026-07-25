import { useEffect, useState } from 'react';
import {
  BEGINNER_GLYPHS,
  INTERMEDIATE_GLYPHS,
  beginnerTierCleared,
  isBeginnerGlyph,
  isIntermediateGlyph,
  type BeginnerGlyph,
  type IntermediateGlyph,
  type VirtueGlyph,
} from '../../data/glyphs';
import { scrambleBoard, fullBoard, trySlide, isSolved, type GlyphBoard } from '../../engine/glyphPuzzle';
import {
  previewState,
  scrambleKlotski,
  tryTapPiece,
  isSolved as isKlotskiSolved,
  movableDirs,
  occupancy,
  type KlotskiState,
} from '../../engine/glyphKlotski';
import { OracleGlyphSvg } from '../../assets/glyphs/oracle/OracleGlyphSvgs';
import { useJourney } from '../../state/store';
import { Modal, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { playSfx } from '../../engine/sfx';

// Not every Chinese character spreads its ink evenly across its bounding
// square (e.g. 仁's right-hand 二 sits only in the vertical middle), so a
// pure font-glyph crop can leave some tiles looking nearly blank — easy to
// mistake for the empty cell. glyph-tile-bg sits behind the character,
// cropped by the exact same transform, and paints a continuous gradient
// across the whole character's bounding box so every tile shows a distinct,
// non-blank patch of color regardless of how sparse that tile's ink is.
function TileFace({ character, tileId, size }: { character: string; tileId: number; size: number }) {
  const row = Math.floor(tileId / size);
  const col = tileId % size;
  const layerStyle = {
    width: `${size * 100}%`,
    height: `${size * 100}%`,
    transform: `translate(${-col * (100 / size)}%, ${-row * (100 / size)}%)`,
  };
  return (
    <div className="glyph-tile-clip" aria-hidden="true">
      <div className="glyph-tile-bg" style={layerStyle} />
      <div className="glyph-tile-glyph" style={layerStyle}>
        {character}
      </div>
    </div>
  );
}

function OracleFace({
  glyph,
  solvedR,
  solvedC,
  w,
  h,
}: {
  glyph: IntermediateGlyph;
  solvedR: number;
  solvedC: number;
  w: number;
  h: number;
}) {
  const { cols, rows } = glyph.board;
  const layerStyle = {
    width: `${(cols / w) * 100}%`,
    height: `${(rows / h) * 100}%`,
    transform: `translate(${-(solvedC / cols) * 100}%, ${-(solvedR / rows) * 100}%)`,
  };
  return (
    <div className="glyph-tile-clip" aria-hidden="true">
      <div className="glyph-tile-bg" style={layerStyle} />
      <div className="glyph-tile-oracle" style={layerStyle}>
        <OracleGlyphSvg character={glyph.character} />
      </div>
    </div>
  );
}

function PuzzleBoard({
  glyph,
  board,
  onSlide,
  interactive = true,
}: {
  glyph: BeginnerGlyph;
  board: GlyphBoard;
  onSlide: (index: number) => void;
  /** false for the assembled "here's the target" preview — a picture, not a puzzle. */
  interactive?: boolean;
}) {
  const size = glyph.size;
  return (
    <div
      className="glyph-board"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      role="grid"
      aria-label={glyph.character}
    >
      {board.map((tileId, index) => {
        if (tileId === null) {
          return <div key={`e-${index}`} className="glyph-cell glyph-cell-empty" role="gridcell" />;
        }
        const face = <TileFace character={glyph.character} tileId={tileId} size={size} />;
        if (!interactive) {
          return (
            <div key={`t-${tileId}-${index}`} className="glyph-cell glyph-tile" role="gridcell">
              {face}
            </div>
          );
        }
        return (
          <button
            key={`t-${tileId}-${index}`}
            type="button"
            className="glyph-cell glyph-tile"
            role="gridcell"
            onClick={() => onSlide(index)}
          >
            {face}
          </button>
        );
      })}
    </div>
  );
}

function KlotskiBoard({
  glyph,
  state,
  onTap,
  interactive = true,
}: {
  glyph: IntermediateGlyph;
  state: KlotskiState;
  onTap: (pieceId: string) => void;
  interactive?: boolean;
}) {
  const { cols, rows } = glyph.board;
  const grid = occupancy(state, glyph);
  const empties: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r]![c] === null) empties.push({ r, c });
    }
  }

  return (
    <div
      className="glyph-klotski-board"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
      role="grid"
      aria-label={glyph.character}
    >
      {empties.map(({ r, c }) => (
        <div
          key={`e-${r}-${c}`}
          className="glyph-klotski-empty"
          style={{ gridColumn: c + 1, gridRow: r + 1 }}
          role="gridcell"
        />
      ))}
      {glyph.pieces.map((p) => {
        const pos = state[p.id];
        if (!pos) return null;
        const canMove = interactive && movableDirs(state, glyph, p.id).length > 0;
        const face = (
          <OracleFace glyph={glyph} solvedR={p.solvedR} solvedC={p.solvedC} w={p.w} h={p.h} />
        );
        const style = {
          gridColumn: `${pos.c + 1} / span ${p.w}`,
          gridRow: `${pos.r + 1} / span ${p.h}`,
        };
        if (!interactive) {
          return (
            <div
              key={p.id}
              className="glyph-klotski-piece"
              style={style}
              role="gridcell"
            >
              {face}
            </div>
          );
        }
        return (
          <button
            key={p.id}
            type="button"
            className={canMove ? 'glyph-klotski-piece movable' : 'glyph-klotski-piece'}
            style={style}
            role="gridcell"
            onClick={() => onTap(p.id)}
            disabled={!canMove}
          >
            {face}
          </button>
        );
      })}
    </div>
  );
}

function BeginnerModal({ glyph, onClose }: { glyph: BeginnerGlyph; onClose: () => void }) {
  const { t, L } = useT();
  const completeGlyph = useJourney((s) => s.completeGlyph);
  const [started, setStarted] = useState(false);
  const [board, setBoard] = useState<GlyphBoard>(() => fullBoard(glyph.size));
  const [solved, setSolved] = useState(false);
  const [wasFirstClear, setWasFirstClear] = useState(false);

  useEffect(() => {
    setStarted(false);
    setBoard(fullBoard(glyph.size));
    setSolved(false);
    setWasFirstClear(false);
  }, [glyph.id, glyph.size]);

  function start() {
    setBoard(scrambleBoard(glyph.size, glyph.solvedEmptyIndex));
    setStarted(true);
    setSolved(false);
    setWasFirstClear(false);
  }

  function slide(index: number) {
    if (solved) return;
    const next = trySlide(board, index, glyph.size);
    if (!next) return;
    setBoard(next);
    if (isSolved(next, glyph.solvedEmptyIndex)) {
      setSolved(true);
      playSfx('chime');
      const first = completeGlyph(glyph.id);
      setWasFirstClear(first);
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2>
        {glyph.character} · {L(glyph.title)}
      </h2>
      {!started ? (
        <>
          <p className="small muted">{t('glyphsPreviewHint')}</p>
          <PuzzleBoard glyph={glyph} board={board} onSlide={() => {}} interactive={false} />
          <div className="glyph-actions">
            <button type="button" className="btn btn-primary" onClick={start}>
              {t('glyphsStartBtn')}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="small muted">{t('glyphsHint')}</p>
          <PuzzleBoard glyph={glyph} board={board} onSlide={slide} />
          <div className="glyph-actions">
            <button type="button" className="btn" onClick={start}>
              {t('glyphsShuffleBtn')}
            </button>
          </div>
        </>
      )}

      {solved && (
        <div className="glyph-solved">
          <div className="glyph-solved-char" aria-hidden="true">
            {glyph.character}
          </div>
          <h3>{t('glyphsSolvedTitle')}</h3>
          <p className="glyph-meaning">{L(glyph.meaning)}</p>
          <p className="small">{L(glyph.teaching)}</p>
          <p className="small muted">{wasFirstClear ? t('glyphsFirstClearNote') : t('glyphsReplayNote')}</p>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {t('glyphsCloseBtn')}
          </button>
        </div>
      )}
    </Modal>
  );
}

function IntermediateModal({ glyph, onClose }: { glyph: IntermediateGlyph; onClose: () => void }) {
  const { t, L } = useT();
  const completeGlyph = useJourney((s) => s.completeGlyph);
  const [started, setStarted] = useState(false);
  const [state, setState] = useState<KlotskiState>(() => previewState(glyph));
  const [solved, setSolved] = useState(false);
  const [wasFirstClear, setWasFirstClear] = useState(false);

  useEffect(() => {
    setStarted(false);
    setState(previewState(glyph));
    setSolved(false);
    setWasFirstClear(false);
  }, [glyph]);

  function start() {
    setState(scrambleKlotski(glyph));
    setStarted(true);
    setSolved(false);
    setWasFirstClear(false);
  }

  function tap(pieceId: string) {
    if (solved) return;
    const next = tryTapPiece(state, glyph, pieceId);
    if (!next) return;
    setState(next);
    if (isKlotskiSolved(next, glyph)) {
      setSolved(true);
      playSfx('chime');
      const first = completeGlyph(glyph.id);
      setWasFirstClear(first);
    }
  }

  return (
    <Modal onClose={onClose}>
      <h2>
        {glyph.character} · {L(glyph.title)}
      </h2>
      {!started ? (
        <>
          <p className="small muted">{t('glyphsPreviewHint')}</p>
          <KlotskiBoard glyph={glyph} state={state} onTap={() => {}} interactive={false} />
          <p className="glyph-inscription">
            <span className="glyph-inscription-label">{t('glyphsInscriptionLabel')}</span>
            {L(glyph.inscription)}
          </p>
          <div className="glyph-actions">
            <button type="button" className="btn btn-primary" onClick={start}>
              {t('glyphsStartBtn')}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="small muted">{t('glyphsKlotskiHint')}</p>
          <KlotskiBoard glyph={glyph} state={state} onTap={tap} />
          <div className="glyph-actions">
            <button type="button" className="btn" onClick={start}>
              {t('glyphsShuffleBtn')}
            </button>
          </div>
        </>
      )}

      {solved && (
        <div className="glyph-solved">
          <div className="glyph-solved-oracle" aria-hidden="true">
            <OracleGlyphSvg character={glyph.character} />
          </div>
          <h3>{t('glyphsSolvedTitle')}</h3>
          <p className="glyph-meaning">{L(glyph.meaning)}</p>
          <p className="glyph-inscription">
            <span className="glyph-inscription-label">{t('glyphsInscriptionLabel')}</span>
            {L(glyph.inscription)}
          </p>
          <p className="small">{L(glyph.teaching)}</p>
          <p className="small muted">{wasFirstClear ? t('glyphsFirstClearNote') : t('glyphsReplayNote')}</p>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {t('glyphsCloseBtn')}
          </button>
        </div>
      )}
    </Modal>
  );
}

function GlyphModal({ glyph, onClose }: { glyph: VirtueGlyph; onClose: () => void }) {
  if (isBeginnerGlyph(glyph)) return <BeginnerModal glyph={glyph} onClose={onClose} />;
  if (isIntermediateGlyph(glyph)) return <IntermediateModal glyph={glyph} onClose={onClose} />;
  return null;
}

function GlyphCard({
  glyph,
  done,
  locked = false,
  onPlay,
}: {
  glyph: VirtueGlyph;
  done: boolean;
  locked?: boolean;
  onPlay: () => void;
}) {
  const { t, L } = useT();
  const meta = isBeginnerGlyph(glyph)
    ? `${t('glyphsSizeLabel')} ${glyph.size}×${glyph.size}`
    : `${t('glyphsKlotskiLabel')} ${glyph.board.cols}×${glyph.board.rows}`;

  return (
    <div
      className={
        locked ? 'card glyph-card locked' : done ? 'card glyph-card cleared' : 'card glyph-card'
      }
    >
      <div className="glyph-card-char" aria-hidden="true">
        {isIntermediateGlyph(glyph) ? (
          <span className="glyph-card-oracle">
            <OracleGlyphSvg character={glyph.character} />
          </span>
        ) : (
          glyph.character
        )}
      </div>
      <div className="glyph-card-body">
        <strong>
          {glyph.character} · {L(glyph.title)}
        </strong>
        <p className="small muted">{L(glyph.meaning)}</p>
        {isIntermediateGlyph(glyph) && (
          <p className="small glyph-card-inscription">
            <span className="glyph-inscription-label">{t('glyphsInscriptionLabel')}</span>
            {L(glyph.inscription)}
          </p>
        )}
        <p className="small muted">
          {meta}
          {done ? ` · ${t('glyphsClearedLabel')}` : ''}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onPlay}
          disabled={locked}
        >
          {done ? t('glyphsReplayBtn') : t('glyphsPlayBtn')}
        </button>
      </div>
    </div>
  );
}

export default function Glyphs() {
  const { t } = useT();
  const completedGlyphs = useJourney((s) => s.completedGlyphs ?? []);
  const [open, setOpen] = useState<VirtueGlyph | null>(null);
  const intermediateOpen = beginnerTierCleared(completedGlyphs);

  return (
    <div>
      <PageHeader emoji="🧩" title={t('glyphsTitle')} subtitle={t('glyphsSubtitle')} />

      <section className="glyph-tier">
        <h2 className="glyph-tier-title">{t('glyphsTierBeginner')}</h2>
        <p className="small muted glyph-tier-blurb">{t('glyphsTierBeginnerBlurb')}</p>
        <div className="glyph-list">
          {BEGINNER_GLYPHS.map((g) => (
            <GlyphCard
              key={g.id}
              glyph={g}
              done={completedGlyphs.includes(g.id)}
              onPlay={() => setOpen(g)}
            />
          ))}
        </div>
      </section>

      <section className={`glyph-tier${intermediateOpen ? '' : ' glyph-tier-locked'}`}>
        <h2 className="glyph-tier-title">{t('glyphsTierIntermediate')}</h2>
        <p className="small muted glyph-tier-blurb">
          {intermediateOpen ? t('glyphsTierIntermediateBlurb') : t('glyphsTierLocked')}
        </p>
        <div className="glyph-list">
          {INTERMEDIATE_GLYPHS.map((g) => (
            <GlyphCard
              key={g.id}
              glyph={g}
              done={completedGlyphs.includes(g.id)}
              locked={!intermediateOpen}
              onPlay={() => {
                if (intermediateOpen) setOpen(g);
              }}
            />
          ))}
        </div>
      </section>

      {open && <GlyphModal glyph={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
