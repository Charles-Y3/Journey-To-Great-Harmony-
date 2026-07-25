import { useState } from 'react';
import { useToday } from '../../state/store';
import { useTurningPoints } from '../../state/turningPointStore';
import { dailyTurningPoint } from '../../data/turningPoints';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';

export default function TurningPoints() {
  const { t, L } = useT();
  const today = useToday();
  const flippedDays = useTurningPoints((s) => s.flippedDays);
  const markFlipped = useTurningPoints((s) => s.markFlipped);
  const [showArchive, setShowArchive] = useState(false);

  const point = dailyTurningPoint(today);
  const flippedToday = flippedDays.includes(today);
  const [revealed, setRevealed] = useState(flippedToday);

  function flip() {
    setRevealed(true);
    markFlipped(today);
  }

  const pastDays = flippedDays.filter((d) => d !== today).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div>
      <PageHeader emoji="🪙" title={t('turningPointsTitle')} subtitle={t('turningPointsSubtitle')} />

      <div className="card">
        <p style={{ marginBottom: 10 }}>
          <span className="pill">
            {point.emoji} {L(point.tradition)}
          </span>
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
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 10, marginTop: 10 }}>
            <p className="small muted" style={{ marginBottom: 4 }}>
              <strong>{t('turningPointsResolutionLabel')}</strong>
            </p>
            <p>{L(point.resolution)}</p>
          </div>
        )}
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
                    <p className="small">{L(p.resolution)}</p>
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
