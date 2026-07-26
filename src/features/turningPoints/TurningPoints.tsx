import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToday } from '../../state/store';
import { useTurningPoints } from '../../state/turningPointStore';
import { dailyTurningPoint } from '../../data/turningPoints';
import { sageForTurningPoint } from '../../data/sages';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';

const FLIP_MS = 220;

export default function TurningPoints() {
  const { t, L } = useT();
  const today = useToday();
  const flippedDays = useTurningPoints((s) => s.flippedDays);
  const markFlipped = useTurningPoints((s) => s.markFlipped);
  const [showArchive, setShowArchive] = useState(false);

  const point = dailyTurningPoint(today);
  const relatedSage = sageForTurningPoint(point.id);
  const relatedChapter = relatedSage?.chapters.find((c) => c.relatedTurningPointId === point.id);
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

  const pastDays = flippedDays.filter((d) => d !== today).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div>
      <PageHeader emoji="💧" title={t('turningPointsTitle')} subtitle={t('turningPointsSubtitle')} />

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
              <button type="button" className="btn btn-primary" style={{ marginTop: 6 }} onClick={flip}>
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
              {relatedSage && (
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

      {pastDays.length > 0 && (
        <div className="card">
          <h3>{t('turningPointsArchiveTitle')}</h3>
          {!showArchive ? (
            <button type="button" className="btn" onClick={() => setShowArchive(true)}>
              {t('turningPointsArchiveBrowse')}
            </button>
          ) : (
            <>
              {pastDays.map((day) => {
                const p = dailyTurningPoint(day);
                return (
                  <div key={day} style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
                    <strong>{day}</strong>
                    <p className="small muted" style={{ margin: '4px 0' }}>
                      {p.emoji} {L(p.tradition)}
                    </p>
                    <p className="small muted">{L(p.setting)}</p>
                    <p className="small" style={{ marginTop: 4 }}>
                      {L(p.resolution)}
                    </p>
                    <p className="small muted" style={{ marginTop: 4 }}>
                      {L(p.reflectionQuestion)}
                    </p>
                  </div>
                );
              })}
              <button type="button" className="btn" style={{ marginTop: 10 }} onClick={() => setShowArchive(false)}>
                {t('turningPointsArchiveClose')}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
