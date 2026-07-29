import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToday } from '../../state/store';
import { useTurningPoints } from '../../state/turningPointStore';
import { sageForTurningPoint } from '../../data/sages';
import { addDaysToKey } from '../../engine/progression';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import type { TurningPoint } from '../../data/turningPoints';
import { useIsNavRouteUnlocked } from '../../engine/pacing';

const FLIP_MS = 220;

function StoryBody({
  point,
  revealed,
  flipping,
  onFlip,
}: {
  point: TurningPoint;
  revealed: boolean;
  flipping: boolean;
  onFlip: () => void;
}) {
  const { t, L } = useT();
  const relatedSage = sageForTurningPoint(point.id);
  const relatedChapter = relatedSage?.chapters.find((c) => c.relatedTurningPointId === point.id);
  // Still Waters is wave 1; Timeline is wave 2 — don't invite a tap into a
  // screen the sidebar itself still shows locked.
  const timelineUnlocked = useIsNavRouteUnlocked('/timeline');

  return (
    <div className={flipping ? 'tp-card tp-card-flipping' : 'tp-card'}>
      <div className="card-modal-hero card-modal-hero-common tp-card-hero">
        <div className="card-modal-portrait">
          <div className="card-modal-portrait-inner">
            <span className="card-modal-portrait-emoji">{point.emoji}</span>
          </div>
        </div>
      </div>
      <div className="tp-card-body">
        <p style={{ marginBottom: 10 }}>
          <span className="pill">{L(point.tradition)}</span>
        </p>
        <p>{L(point.setting)}</p>
        {!revealed ? (
          <>
            <p className="small muted" style={{ marginTop: 10 }}>
              {t('turningPointsPrompt')}
            </p>
            <button type="button" className="btn btn-primary" style={{ marginTop: 6 }} onClick={onFlip}>
              {t('turningPointsFlipBtn')}
            </button>
          </>
        ) : (
          <>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
              <p className="small muted" style={{ marginBottom: 4 }}>
                <strong>{t('turningPointsResolutionLabel')}</strong>
              </p>
              <p>{L(point.resolution)}</p>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 14 }}>
              <p className="small muted" style={{ marginBottom: 4 }}>
                <strong>{t('turningPointsQuestionLabel')}</strong>
              </p>
              <p>{L(point.reflectionQuestion)}</p>
            </div>
            {relatedSage && timelineUnlocked && (
              <Link
                to="/timeline"
                state={{ mode: 'lives', sageId: relatedSage.id, chapterId: relatedChapter?.id }}
                className="btn"
                style={{ marginTop: 12, display: 'inline-block' }}
              >
                {relatedSage.emoji} {t('turningPointsReadLife')}
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function TurningPoints() {
  const { t, L } = useT();
  const today = useToday();
  const yesterday = addDaysToKey(today, -1);
  const flippedDays = useTurningPoints((s) => s.flippedDays);
  const markFlipped = useTurningPoints((s) => s.markFlipped);
  const ensureAssignment = useTurningPoints((s) => s.ensureAssignment);
  const pointForDay = useTurningPoints((s) => s.pointForDay);

  const point = ensureAssignment(today);
  const yesterdayPoint = pointForDay(yesterday);
  const flippedToday = flippedDays.includes(today);
  const [revealed, setRevealed] = useState(flippedToday);
  const [flipping, setFlipping] = useState(false);

  function flip() {
    setFlipping(true);
    window.setTimeout(() => {
      setRevealed(true);
      markFlipped(today);
      setFlipping(false);
    }, FLIP_MS);
  }

  return (
    <div>
      <PageHeader emoji="💧" title={t('turningPointsTitle')} subtitle={t('turningPointsSubtitle')} />

      <StoryBody point={point} revealed={revealed} flipping={flipping} onFlip={flip} />

      {yesterdayPoint && (
        <div className="card">
          <h3>{t('turningPointsYesterdayTitle')}</h3>
          <p className="small muted" style={{ marginBottom: 8 }}>
            {yesterday}
          </p>
          <p className="small muted" style={{ margin: '4px 0' }}>
            {yesterdayPoint.emoji} {L(yesterdayPoint.tradition)}
          </p>
          <p className="small muted">{L(yesterdayPoint.setting)}</p>
          <p className="small" style={{ marginTop: 4 }}>
            {L(yesterdayPoint.resolution)}
          </p>
          <p className="small muted" style={{ marginTop: 4 }}>
            {L(yesterdayPoint.reflectionQuestion)}
          </p>
        </div>
      )}
    </div>
  );
}
