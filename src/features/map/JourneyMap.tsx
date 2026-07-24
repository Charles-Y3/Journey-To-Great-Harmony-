import { useState } from 'react';
import { useJourney } from '../../state/store';
import { REGIONS } from '../../data/journeyMap';
import { regionChallengeMet, type JourneyData } from '../../state/selectors';
import { Modal, PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { regionUnlockNote, regionCompletedPill, claimGroundBtn } from '../../i18n/strings';
import { playSfx } from '../../engine/sfx';
import type { MapRegion } from '../../data/types';

export default function JourneyMap() {
  const state = useJourney();
  const d = state as unknown as JourneyData;
  const completeRegion = useJourney((s) => s.completeRegion);
  const xp = state.xp;
  const { t, L, locale } = useT();
  const [arrival, setArrival] = useState<MapRegion | null>(null);

  function claim(region: MapRegion) {
    completeRegion(region.id);
    playSfx('harmony');
    setArrival(region);
  }

  return (
    <div>
      <PageHeader emoji="🗺️" title={t('mapTitle')} subtitle={t('mapSubtitle')} />

      {REGIONS.map((region, i) => {
        const unlocked = xp >= region.unlockXp;
        const completed = state.completedRegions.includes(region.id);
        const met = regionChallengeMet(region.id, d);
        let cls = 'region';
        if (unlocked) cls += ' unlocked';
        if (completed) cls += ' completed';
        return (
          <div className={cls} key={region.id}>
            <div className="region-line">
              <div className="region-dot">{completed ? '✅' : unlocked ? region.emoji : '🔒'}</div>
              {i < REGIONS.length - 1 && <div className="region-connector" />}
            </div>
            <div className="region-body card" style={{ marginBottom: 8 }}>
              <h3 style={{ marginBottom: 2 }}>
                {region.emoji} {L(region.name)}
              </h3>
              <p className="small muted" style={{ marginBottom: 8 }}>
                {L(region.tagline)}
                {!unlocked && ` · ${regionUnlockNote(locale, region.unlockXp, xp)}`}
              </p>
              {unlocked && (
                <>
                  <p className="small" style={{ fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                    {L(region.story)}
                  </p>
                  <p className="small">
                    <strong>{t('regionChallengeLabel')}:</strong> {L(region.challenge)}
                  </p>
                  {completed && (
                    <p className="small muted" style={{ whiteSpace: 'pre-line', marginTop: 8 }}>
                      🖋️ {L(region.epilogue)}
                    </p>
                  )}
                  {completed ? (
                    <span className="pill">{regionCompletedPill(locale, region.rewardXp)}</span>
                  ) : met ? (
                    <button className="btn btn-primary" onClick={() => claim(region)}>
                      {claimGroundBtn(locale, region.rewardXp)}
                    </button>
                  ) : (
                    <span className="pill pill-gold">{t('regionInProgress')}</span>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}

      {arrival && (
        <Modal onClose={() => setArrival(null)}>
          <h2>
            {arrival.emoji} {t('mapArrivalTitle')}
          </h2>
          <h3 style={{ marginTop: 8 }}>{L(arrival.name)}</h3>
          <p className="small" style={{ whiteSpace: 'pre-line', fontStyle: 'italic' }}>
            {L(arrival.epilogue)}
          </p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setArrival(null)}>
            {t('mapArrivalContinue')}
          </button>
        </Modal>
      )}
    </div>
  );
}
