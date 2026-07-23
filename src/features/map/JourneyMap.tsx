import { useJourney } from '../../state/store';
import { REGIONS } from '../../data/journeyMap';
import { regionChallengeMet, type JourneyData } from '../../state/selectors';
import { PageHeader } from '../../components/ui';

export default function JourneyMap() {
  const state = useJourney();
  const d = state as unknown as JourneyData;
  const completeRegion = useJourney((s) => s.completeRegion);
  const xp = state.xp;

  return (
    <div>
      <PageHeader
        emoji="🗺️"
        title="Journey Map"
        zh="旅程"
        subtitle="Your personal adventure. Each region is a stage of inner growth — unlock them as your wisdom deepens."
      />

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
                {region.emoji} {region.name}
              </h3>
              <p className="small muted" style={{ marginBottom: 8 }}>
                {region.tagline}
                {!unlocked && ` · unlocks at ${region.unlockXp} XP (you have ${xp})`}
              </p>
              {unlocked && (
                <>
                  <p className="small" style={{ fontStyle: 'italic' }}>
                    {region.story}
                  </p>
                  <p className="small">
                    <strong>Region challenge:</strong> {region.challenge}
                  </p>
                  {completed ? (
                    <span className="pill">Completed ✓ (+{region.rewardXp} XP)</span>
                  ) : met ? (
                    <button className="btn btn-primary" onClick={() => completeRegion(region.id)}>
                      Claim this ground (+{region.rewardXp} XP)
                    </button>
                  ) : (
                    <span className="pill pill-gold">Challenge in progress…</span>
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
