import { useJourney, useToday } from '../../state/store';
import { worldInfo, type JourneyData } from '../../state/selectors';
import { WORLD_STAGES } from '../../data/world';
import { communityFeed } from '../../engine/community';
import { PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { worldProgressLabel, buildingLockedNote } from '../../i18n/strings';

function WorldScene({ stageIndex, builtIds, caption }: { stageIndex: number; builtIds: string[]; caption: string }) {
  const houseCount = 3 + stageIndex * 3;
  const houses = Array.from({ length: houseCount }, (_, i) => ({
    x: 40 + (i * 520) / Math.max(1, houseCount - 1),
    size: 0.8 + ((i * 37) % 10) / 18,
  }));

  const buildingSpots: Record<string, { x: number; emoji: string }> = {
    school: { x: 90, emoji: '🏫' },
    library: { x: 180, emoji: '📚' },
    garden: { x: 270, emoji: '🌳' },
    care: { x: 360, emoji: '🏥' },
    bridge: { x: 450, emoji: '🌉' },
    hall: { x: 540, emoji: '🏛️' },
  };

  return (
    <svg className="scene" viewBox="0 0 600 300" role="img" aria-label={caption}>
      <defs>
        <linearGradient id="wsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7d9a8" />
          <stop offset="100%" stopColor="#fdf2dc" />
        </linearGradient>
      </defs>
      <rect width="600" height="235" fill="url(#wsky)" />
      <circle cx="80" cy="55" r="24" fill="#f2a83c" opacity="0.85" />
      <ellipse cx="300" cy="260" rx="340" ry="70" fill="#d8c9a3" />
      <rect y="245" width="600" height="55" fill="#cbbb92" />
      {/* river */}
      <path d="M0 250 q 150 14 300 4 t 300 6 v 40 h -600 z" fill="#9fc6de" opacity="0.8" />

      {/* houses */}
      {houses.map((h, i) => (
        <g key={i} transform={`translate(${h.x} ${232}) scale(${h.size})`}>
          <rect x={-12} y={-18} width={24} height={18} fill="#e8dcc0" stroke="#b09b6d" />
          <path d="M -15 -18 L 0 -30 L 15 -18 Z" fill="#b5443c" />
          <rect x={-4} y={-10} width={8} height={10} fill="#7a5230" />
        </g>
      ))}

      {/* civic buildings appear as the community grows */}
      {Object.entries(buildingSpots).map(([id, spot]) =>
        builtIds.includes(id) ? (
          <text key={id} x={spot.x} y={205} fontSize="30" textAnchor="middle">
            {spot.emoji}
          </text>
        ) : null,
      )}

      <text x="300" y="30" textAnchor="middle" fontSize="15" fill="#7a6437" fontStyle="italic">
        {caption}
      </text>
    </svg>
  );
}

export default function World() {
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const info = worldInfo(d, today);
  const feed = communityFeed(today);
  const builtIds = info.buildings.filter((b) => b.built).map((b) => b.id);
  const { t, L, locale } = useT();

  return (
    <div>
      <PageHeader emoji="🌏" title={t('worldTitle')} subtitle={t('worldSubtitle')} />

      <WorldScene stageIndex={info.stageIndex} builtIds={builtIds} caption={t('worldSceneCaption')} />

      <div className="stage-steps">
        {WORLD_STAGES.map((s, i) => {
          let cls = 'stage-step';
          if (i < info.stageIndex) cls += ' reached';
          if (i === info.stageIndex) cls += ' current';
          return (
            <span key={s.id} className={cls}>
              {s.emoji} {L(s.name)}
            </span>
          );
        })}
      </div>

      <div className="card">
        <h3>
          {info.stage.emoji} {L(info.stage.name)}
        </h3>
        <p className="small muted">{L(info.stage.description)}</p>
        {info.next ? (
          <ProgressBar value={info.total} max={info.next.threshold} label={worldProgressLabel(locale, info.total, info.next.threshold, L(info.next.name))} />
        ) : (
          <p className="pill">{t('worldReached')}</p>
        )}
        <div className="stat-grid">
          <div className="stat-tile">
            <div className="stat-value">{info.user}</div>
            <div className="stat-name">{t('worldYourContribution')}</div>
          </div>
          <div className="stat-tile">
            <div className="stat-value">{info.community}</div>
            <div className="stat-name">{t('worldCommunityContribution')}</div>
          </div>
          <div className="stat-tile">
            <div className="stat-value">{info.total}</div>
            <div className="stat-name">{t('worldTotalHarmony')}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t('civicBuildingsTitle')}</h3>
        <div className="card-grid">
          {info.buildings.map((b) => (
            <div key={b.id} className={b.built ? 'badge-tile' : 'badge-tile locked'}>
              <div className="wcard-emoji">{b.emoji}</div>
              <strong>{L(b.name)}</strong>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                {b.built ? L(b.description) : buildingLockedNote(locale, b.threshold)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>{t('todayInCommunity')}</h3>
        {feed.map((item, i) => (
          <div className="feed-item" key={i}>
            <span>{item.peer.emoji}</span>
            <span>
              <strong>{L(item.peer.name)}</strong> {L(item.text)}
            </span>
          </div>
        ))}
        <p className="small muted" style={{ marginTop: 10 }}>
          {t('worldFooter')}
        </p>
      </div>
    </div>
  );
}
