import { useJourney } from '../../state/store';
import { REGIONS } from '../../data/journeyMap';
import { regionChallengeMet, type JourneyData } from '../../state/selectors';
import { PageHeader } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { regionUnlockNote, regionCompletedPill, claimGroundBtn } from '../../i18n/strings';

export default function JourneyMap() {
  const state = useJourney();
  const d = state as unknown as JourneyData;
  const completeRegion = useJourney((s) => s.completeRegion);
  const xp = state.xp;
  const { t, L, locale } = useT();

  return (
    <div>
      <PageHeader emoji="🗺️" title={t('mapTitle')} zh={t('mapZh')} subtitle={t('mapSubtitle')} />

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
                  <p className="small" style={{ fontStyle: 'italic' }}>
                    {L(region.story)}
                  </p>
                  <p className="small">
                    <strong>{t('regionChallengeLabel')}:</strong> {L(region.challenge)}
                  </p>
                  {completed ? (
                    <span className="pill">{regionCompletedPill(locale, region.rewardXp)}</span>
                  ) : met ? (
                    <button className="btn btn-primary" onClick={() => completeRegion(region.id)}>
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
    </div>
  );
}
