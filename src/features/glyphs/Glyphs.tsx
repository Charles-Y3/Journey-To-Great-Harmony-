import { useEffect, useState } from 'react';
import { GLYPHS, type VirtueGlyph } from '../../data/glyphs';
import { scrambleBoard, trySlide, isSolved, type GlyphBoard } from '../../engine/glyphPuzzle';
import { useJourney } from '../../state/store';
import { Modal, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { playSfx } from '../../engine/sfx';

function TileFace({ character, tileId, size }: { character: string; tileId: number; size: number }) {
  const row = Math.floor(tileId / size);
  const col = tileId % size;
  return (
    <div className="glyph-tile-clip" aria-hidden="true">
      <div
        className="glyph-tile-glyph"
        style={{
          width: `${size * 100}%`,
          height: `${size * 100}%`,
          transform: `translate(${-col * (100 / size)}%, ${-row * (100 / size)}%)`,
        }}
      >
        {character}
      </div>
    </div>
  );
}

function PuzzleBoard({
  glyph,
  board,
  onSlide,
}: {
  glyph: VirtueGlyph;
  board: GlyphBoard;
  onSlide: (index: number) => void;
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
        return (
          <button
            key={`t-${tileId}-${index}`}
            type="button"
            className="glyph-cell glyph-tile"
            role="gridcell"
            onClick={() => onSlide(index)}
          >
            <TileFace character={glyph.character} tileId={tileId} size={size} />
          </button>
        );
      })}
    </div>
  );
}

function PuzzleModal({ glyph, onClose }: { glyph: VirtueGlyph; onClose: () => void }) {
  const { t, L } = useT();
  const completeGlyph = useJourney((s) => s.completeGlyph);
  const [board, setBoard] = useState<GlyphBoard>(() => scrambleBoard(glyph.size));
  const [solved, setSolved] = useState(false);
  const [wasFirstClear, setWasFirstClear] = useState(false);

  useEffect(() => {
    setBoard(scrambleBoard(glyph.size));
    setSolved(false);
    setWasFirstClear(false);
  }, [glyph.id, glyph.size]);

  function slide(index: number) {
    if (solved) return;
    const next = trySlide(board, index, glyph.size);
    if (!next) return;
    setBoard(next);
    if (isSolved(next)) {
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
      <p className="small muted">{t('glyphsHint')}</p>
      <PuzzleBoard glyph={glyph} board={board} onSlide={slide} />
      <div className="glyph-actions">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setBoard(scrambleBoard(glyph.size));
            setSolved(false);
            setWasFirstClear(false);
          }}
        >
          {t('glyphsShuffleBtn')}
        </button>
      </div>

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

export default function Glyphs() {
  const { t, L } = useT();
  const completedGlyphs = useJourney((s) => s.completedGlyphs ?? []);
  const [open, setOpen] = useState<VirtueGlyph | null>(null);

  return (
    <div>
      <PageHeader emoji="🀄" title={t('glyphsTitle')} subtitle={t('glyphsSubtitle')} />
      <div className="glyph-list">
        {GLYPHS.map((g) => {
          const done = completedGlyphs.includes(g.id);
          return (
            <div key={g.id} className={done ? 'card glyph-card cleared' : 'card glyph-card'}>
              <div className="glyph-card-char" aria-hidden="true">
                {g.character}
              </div>
              <div className="glyph-card-body">
                <strong>{L(g.title)}</strong>
                <p className="small muted">{L(g.meaning)}</p>
                <p className="small muted">
                  {t('glyphsSizeLabel')} {g.size}×{g.size}
                  {done ? ` · ${t('glyphsClearedLabel')}` : ''}
                </p>
                <button type="button" className="btn btn-primary" onClick={() => setOpen(g)}>
                  {done ? t('glyphsReplayBtn') : t('glyphsPlayBtn')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {open && <PuzzleModal glyph={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
