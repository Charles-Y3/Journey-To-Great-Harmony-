import { useJourney } from '../../state/store';
import { forestInfo, statsFromData, type JourneyData } from '../../state/selectors';
import { FOREST_STAGES } from '../../engine/progression';
import { seededRandom } from '../../engine/progression';
import { PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';

function Tree({ x, size, kind }: { x: number; size: number; kind: number }) {
  const groundY = 240;
  const trunkH = 22 * size;
  const crownR = 16 * size;
  const crownColors = ['#2e7d5b', '#3c8d63', '#4f9d55', '#2f6d50'];
  const color = crownColors[kind % crownColors.length];
  return (
    <g>
      <rect x={x - 2.5 * size} y={groundY - trunkH} width={5 * size} height={trunkH} rx={2} fill="#7a5230" />
      <circle cx={x} cy={groundY - trunkH - crownR * 0.7} r={crownR} fill={color} />
      <circle cx={x - crownR * 0.7} cy={groundY - trunkH - crownR * 0.3} r={crownR * 0.72} fill={color} />
      <circle cx={x + crownR * 0.7} cy={groundY - trunkH - crownR * 0.3} r={crownR * 0.72} fill={color} />
    </g>
  );
}

function ForestScene({ stageIndex, score, seedCaption }: { stageIndex: number; score: number; seedCaption: string }) {
  const treeCount = Math.min(14, stageIndex === 0 ? 0 : 1 + Math.floor(score / 12));
  const flowerCount = stageIndex >= 3 ? Math.min(20, Math.floor(score / 8)) : 0;
  const trees = Array.from({ length: treeCount }, (_, i) => ({
    x: 60 + seededRandom(`tree-x-${i}`) * 480,
    size: 0.6 + seededRandom(`tree-s-${i}`) * 0.9,
    kind: i,
  })).sort((a, b) => a.size - b.size);
  const flowers = Array.from({ length: flowerCount }, (_, i) => ({
    x: 30 + seededRandom(`fl-x-${i}`) * 540,
    y: 248 + seededRandom(`fl-y-${i}`) * 34,
    hue: ['#e26d8c', '#e2a13c', '#b76fc4', '#e2e26d'][i % 4],
  }));

  return (
    <svg className="scene" viewBox="0 0 600 300" role="img" aria-label={seedCaption}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe3f2" />
          <stop offset="100%" stopColor="#eef7e8" />
        </linearGradient>
      </defs>
      <rect width="600" height="240" fill="url(#sky)" />
      <circle cx="520" cy="52" r="26" fill="#f2c94c" opacity="0.9" />
      {/* hills */}
      <ellipse cx="120" cy="250" rx="230" ry="60" fill="#cfe6c2" />
      <ellipse cx="480" cy="255" rx="260" ry="70" fill="#c2dfb4" />
      {/* ground */}
      <rect y="240" width="600" height="60" fill="#a9d29a" />

      {stageIndex === 0 && (
        <g>
          <ellipse cx="300" cy="252" rx="26" ry="9" fill="#8b6b43" />
          <circle cx="300" cy="246" r="7" fill="#6d4c2a" />
          <text x="300" y="215" textAnchor="middle" fontSize="14" fill="#557">
            {seedCaption}
          </text>
        </g>
      )}

      {stageIndex >= 1 && treeCount === 0 && (
        <g>
          <path d="M300 250 q -3 -18 0 -26 q 3 8 0 26" stroke="#3c8d63" strokeWidth="4" fill="none" />
        </g>
      )}

      {trees.map((t, i) => (
        <Tree key={i} x={t.x} size={t.size} kind={t.kind} />
      ))}

      {flowers.map((f, i) => (
        <g key={i}>
          <circle cx={f.x} cy={f.y} r={3.2} fill={f.hue} />
          <circle cx={f.x} cy={f.y} r={1.2} fill="#fff8e0" />
        </g>
      ))}

      {stageIndex >= 4 && (
        <g>
          {/* pond */}
          <ellipse cx="120" cy="272" rx="48" ry="12" fill="#8fc3dd" />
          {/* birds */}
          <path d="M420 70 q 6 -7 12 0 q 6 -7 12 0" stroke="#556" strokeWidth="2" fill="none" />
          <path d="M460 92 q 5 -6 10 0 q 5 -6 10 0" stroke="#556" strokeWidth="2" fill="none" />
        </g>
      )}

      {stageIndex >= 5 && (
        <g>
          {/* small shrine gate for the sanctuary */}
          <rect x="282" y="196" width="6" height="46" fill="#b5443c" />
          <rect x="312" y="196" width="6" height="46" fill="#b5443c" />
          <rect x="272" y="188" width="56" height="8" rx="3" fill="#b5443c" />
          <rect x="278" y="200" width="44" height="5" fill="#b5443c" />
        </g>
      )}
    </svg>
  );
}

export default function Forest() {
  const state = useJourney();
  const d = state as unknown as JourneyData;
  const info = forestInfo(d);
  const stats = statsFromData(d);
  const { t, L } = useT();

  const factors = [
    { name: t('forestFactorLessons'), emoji: '📖', value: stats.lessons },
    { name: t('forestFactorChallenges'), emoji: '🎯', value: stats.challengesDone },
    { name: t('forestFactorReflections'), emoji: '🪞', value: stats.reflections },
    { name: t('forestFactorTimeline'), emoji: '⏳', value: stats.timelinePoints },
    { name: t('forestFactorStreak'), emoji: '🔥', value: stats.streakBest },
  ];

  return (
    <div>
      <PageHeader emoji="🌲" title={t('forestTitle')} subtitle={t('forestSubtitle')} />

      <ForestScene stageIndex={info.stageIndex} score={info.score} seedCaption={t('forestSeedCaption')} />

      <div className="stage-steps">
        {FOREST_STAGES.map((s, i) => {
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
        {info.next ? (
          <>
            <h3>
              {t('forestGrowingToward')}: {info.next.emoji} {L(info.next.name)}
            </h3>
            <ProgressBar value={info.score} max={info.next.threshold} label={`${info.score} / ${info.next.threshold}`} />
          </>
        ) : (
          <h3>{t('forestSanctuary')}</h3>
        )}
        <div className="stat-grid">
          {factors.map((f) => (
            <div className="stat-tile" key={f.name}>
              <div className="stat-value">
                {f.emoji} {f.value}
              </div>
              <div className="stat-name">{f.name}</div>
            </div>
          ))}
        </div>
        <p className="small muted">{t('forestFooter')}</p>
      </div>
    </div>
  );
}
