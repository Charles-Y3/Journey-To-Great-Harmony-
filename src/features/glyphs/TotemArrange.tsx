import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { AdvancedTotem, TotemPose } from '../../data/totems';
import {
  clampTotem,
  firstFailingRule,
  hitTestTotem,
  scatterTotem,
  TOTEM_STAGE,
} from '../../engine/totemPuzzle';
import { useJourney } from '../../state/store';
import { Modal } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { playSfx } from '../../engine/sfx';

const MAX_HINTS = 2;

export function TotemArrangeModal({ totem, onClose }: { totem: AdvancedTotem; onClose: () => void }) {
  const { t, L } = useT();
  const completeGlyph = useJourney((s) => s.completeGlyph);
  const noteGlyphPractice = useJourney((s) => s.noteGlyphPractice);
  const stageRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [pose, setPose] = useState<TotemPose>(() => scatterTotem(totem.parts));
  const [hintLevel, setHintLevel] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wasFirstClear, setWasFirstClear] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; kind: '' | 'warn' | 'ok' }>({
    text: '',
    kind: '',
  });
  const dragRef = useRef<{ id: string; ox: number; oy: number } | null>(null);

  function scatterBoard() {
    setPose(scatterTotem(totem.parts));
    setHintLevel(0);
    setSolved(false);
    setWasFirstClear(false);
    setFeedback({ text: t('glyphsTotemScatterPrompt'), kind: '' });
  }

  // Only re-scatter when the opened totem changes. Do not depend on `t` —
  // useT() returns a fresh function each render, which would loop forever.
  useEffect(() => {
    setPose(scatterTotem(totem.parts));
    setHintLevel(0);
    setSolved(false);
    setWasFirstClear(false);
    setFeedback({ text: t('glyphsTotemScatterPrompt'), kind: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- totem.id gates the reset
  }, [totem.id]);

  function clientToSvg(clientX: number, clientY: number): { x: number; y: number } | null {
    const svg = stageRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const local = pt.matrixTransform(ctm.inverse());
    return { x: local.x, y: local.y };
  }

  function onPointerDown(e: ReactPointerEvent) {
    if (solved) return;
    const local = clientToSvg(e.clientX, e.clientY);
    if (!local) return;
    const id = hitTestTotem(local.x, local.y, totem.parts, pose);
    if (!id) return;
    const c = pose[id]!;
    dragRef.current = { id, ox: local.x - c.x, oy: local.y - c.y };
    wrapRef.current?.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e: ReactPointerEvent) {
    const drag = dragRef.current;
    if (!drag) return;
    const local = clientToSvg(e.clientX, e.clientY);
    if (!local) return;
    setPose((prev) => ({
      ...prev,
      [drag.id]: {
        x: clampTotem(local.x - drag.ox),
        y: clampTotem(local.y - drag.oy),
      },
    }));
  }

  function onPointerUp() {
    dragRef.current = null;
  }

  function contemplate() {
    if (solved) return;
    const fail = firstFailingRule(totem.rules, pose, totem.parts);
    if (fail) {
      setFeedback({ text: L(fail.msg), kind: 'warn' });
      return;
    }
    setSolved(true);
    playSfx('chime');
    const first = completeGlyph(totem.id);
    if (!first) noteGlyphPractice();
    setWasFirstClear(first);
    setFeedback({ text: t('glyphsTotemRelationsHold'), kind: 'ok' });
  }

  function giveHint() {
    if (solved || hintLevel >= MAX_HINTS) return;
    const next = hintLevel + 1;
    setHintLevel(next);
    const lines = totem.hints.slice(0, next).map((h, i) =>
      t('glyphsTotemHintLine').replace('{n}', String(i + 1)).replace('{total}', String(MAX_HINTS)).replace('{text}', L(h)),
    );
    setFeedback({ text: lines.join('\n'), kind: 'warn' });
  }

  return (
    <Modal onClose={onClose}>
      <h2>
        {totem.emoji} {L(totem.title)}
      </h2>
      <p className="small muted totem-riddle">{solved ? t('glyphsTotemMeaningRestored') : L(totem.riddle)}</p>

      <div
        ref={wrapRef}
        className={solved ? 'totem-stage-wrap solved' : 'totem-stage-wrap'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg
          ref={stageRef}
          className="totem-stage-svg"
          viewBox={`0 0 ${TOTEM_STAGE} ${TOTEM_STAGE}`}
          aria-label={L(totem.title)}
        >
          <circle className="totem-vignette" cx="100" cy="100" r="88" />
          {totem.parts.map((p) => {
            const c = pose[p.id] ?? { x: 100, y: 100 };
            return (
              <g
                key={p.id}
                className="totem-part"
                transform={`translate(${c.x} ${c.y})`}
                dangerouslySetInnerHTML={{ __html: p.svg }}
              />
            );
          })}
        </svg>
      </div>

      <div className="totem-actions">
        <button type="button" className="btn btn-primary" onClick={contemplate} disabled={solved}>
          {t('glyphsTotemContemplate')}
        </button>
        <button type="button" className="btn" onClick={scatterBoard}>
          {t('glyphsTotemScatter')}
        </button>
        <button type="button" className="btn" onClick={giveHint} disabled={solved || hintLevel >= MAX_HINTS}>
          {t('glyphsTotemHint')}
        </button>
      </div>

      {feedback.text && (
        <p className={`totem-feedback${feedback.kind ? ` ${feedback.kind}` : ''}`}>{feedback.text}</p>
      )}

      <p className="small muted totem-rules-note">{t('glyphsTotemRulesNote')}</p>

      {solved && (
        <div className="glyph-solved totem-solved">
          <h3>{t('glyphsTotemSolvedTitle')}</h3>
          <p className="glyph-meaning">{L(totem.meaning)}</p>
          <p className="small">{L(totem.teaching)}</p>
          <p className="small muted">{wasFirstClear ? t('glyphsFirstClearNote') : t('glyphsReplayNote')}</p>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {t('glyphsCloseBtn')}
          </button>
        </div>
      )}
    </Modal>
  );
}
