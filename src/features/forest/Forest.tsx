import { useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import { forestInfo, statsFromData, type JourneyData } from '../../state/selectors';
import { FOREST_STAGES } from '../../engine/progression';
import { seededRandom } from '../../engine/progression';
import { CHALLENGES } from '../../data/challenges';
import { Modal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';

// Distinct palette per stage so the scene visibly shifts from bare and dusty
// (Seed) to lush and serene (Sanctuary), not just "the same green".
const STAGE_PALETTE = [
  { hill1: '#e3d9bd', hill2: '#dcd0ae', ground: '#cdbe94' }, // seed — dusty, waiting
  { hill1: '#d7e6bf', hill2: '#cfdfae', ground: '#b9d29a' }, // sprout — fresh green arriving
  { hill1: '#cfe6c2', hill2: '#c2dfb4', ground: '#a9d29a' }, // tree — established green
  { hill1: '#c3e0b7', hill2: '#b6d9a8', ground: '#9bc98d' }, // forest — deeper, denser
  { hill1: '#bfe3c4', hill2: '#a9d9b0', ground: '#8fc79b' }, // garden — lush, colourful
  { hill1: '#cbe8d9', hill2: '#a9ddc4', ground: '#8bc9ad' }, // sanctuary — serene jade
];

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

// A young seedling: a bent stem with two small leaves — visually distinct
// from the full rounded-crown Tree, so the Sprout stage actually reads as
// "just sprouting" rather than "a smaller tree".
function Sprout({ x, size }: { x: number; size: number }) {
  const groundY = 240;
  return (
    <g>
      <path d={`M${x} ${groundY} q ${-3 * size} ${-9 * size} 0 ${-15 * size}`} stroke="#3c8d63" strokeWidth={2.4 * size} fill="none" strokeLinecap="round" />
      <path
        d={`M${x} ${groundY - 7 * size} q ${-7 * size} ${-3 * size} ${-9 * size} ${2 * size}`}
        stroke="#57b06f"
        strokeWidth={2 * size}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M${x} ${groundY - 10 * size} q ${7 * size} ${-3 * size} ${9 * size} ${2 * size}`}
        stroke="#57b06f"
        strokeWidth={2 * size}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

// A little life on top of the static scene, with a different animal cast
// per stage so Tree and Forest read as distinct places, not the same scene
// with more trees: a squirrel keeps to the Tree stage's few big trunks, a
// rabbit and a deer share the Forest stage's denser canopy, a bee joins the
// butterflies once the Oasis's flowers bloom, and a crane visits the
// Sanctuary's shrine.
function ForestCritters({ stageIndex }: { stageIndex: number }) {
  if (stageIndex < 1) return null;
  const butterflyCount = Math.min(5, 1 + stageIndex);
  const butterflies = Array.from({ length: butterflyCount }, (_, i) => {
    const y0 = 90 + seededRandom(`bfly-y-${i}`) * 70;
    const sweep = 30 + seededRandom(`bfly-sweep-${i}`) * 40;
    const x0 = 40 + seededRandom(`bfly-x-${i}`) * 500;
    const dur = 9 + seededRandom(`bfly-dur-${i}`) * 8;
    const path = `M${x0},${y0} q ${sweep} -22 ${sweep * 2} 0 t ${sweep * 2} 0 t ${-sweep * 2} 8 t ${-sweep * 2} -8`;
    return { path, dur, size: 10 + seededRandom(`bfly-size-${i}`) * 4 };
  });

  return (
    <g aria-hidden="true">
      {butterflies.map((b, i) => (
        <text key={`bfly-${i}`} fontSize={b.size}>
          <animateMotion path={b.path} dur={`${b.dur}s`} repeatCount="indefinite" rotate="auto" />
          🦋
        </text>
      ))}
      {stageIndex === 2 && (
        <text fontSize={14}>
          <animateMotion path="M260,240 q 20 -30 40 0 q 20 -30 40 0 q -20 30 -40 0 q -20 30 -40 0" dur="10s" repeatCount="indefinite" />
          🐿️
        </text>
      )}
      {stageIndex === 3 && (
        <>
          <text fontSize={16}>
            <animateMotion path="M80,258 L 220,258 L 80,258" dur="11s" repeatCount="indefinite" />
            🐇
          </text>
          <text fontSize={18}>
            <animateMotion path="M420,256 L 300,256 L 420,256" dur="15s" repeatCount="indefinite" />
            🦌
          </text>
        </>
      )}
      {stageIndex >= 4 && (
        <text fontSize={13}>
          <animateMotion path="M120,250 q 30 -18 60 0 t 60 0 t -60 4 t -60 -4" dur="8s" repeatCount="indefinite" />
          🐝
        </text>
      )}
      {stageIndex >= 5 && (
        <text fontSize={17}>
          <animateMotion path="M540,262 L 380,262 L 540,262" dur="13s" repeatCount="indefinite" />
          🦢
        </text>
      )}
    </g>
  );
}

function VirtueLeaf({ x }: { x: number }) {
  return (
    <g className="virtue-leaf">
      <ellipse cx={x} cy={210} rx={7} ry={11} fill="#57b06f" transform={`rotate(-25 ${x} 210)`} opacity={0.9} />
      <path d={`M${x} 201 q 2 8 0 18`} stroke="#2e7d5b" strokeWidth={1} fill="none" />
    </g>
  );
}

function ForestScene({
  stageIndex,
  stageProgress,
  seedCaption,
  showVirtueLeaf,
}: {
  stageIndex: number;
  stageProgress: number;
  seedCaption: string;
  showVirtueLeaf?: boolean;
}) {
  const palette = STAGE_PALETTE[Math.min(stageIndex, STAGE_PALETTE.length - 1)];

  // Each stage has its own distinct scene, not just "more of the same tree".
  // Tree and Forest in particular need to read as clearly different stages,
  // not overlapping counts of similarly-sized trees: Tree stays a sparse
  // handful of large, individually-notable trees, while Forest jumps to a
  // visibly dense canopy of many smaller ones.
  const sproutCount = stageIndex === 1 ? Math.round(4 + stageProgress * 5) : 0; // 4–9
  const treeCount =
    stageIndex === 2
      ? Math.round(3 + stageProgress * 3) // 3–6: a few young trees, still sparse
      : stageIndex === 3
        ? Math.round(14 + stageProgress * 8) // 14–22: a proper, dense forest
        : stageIndex >= 4
          ? Math.min(18, 14 + Math.round(stageProgress * 4)) // 14–18
          : 0;
  // Tree stage trees are individually bigger (a few notable trees); Forest
  // stage trees are smaller on average so more can read as one dense canopy.
  const treeSize = stageIndex === 2 ? { min: 0.95, span: 0.65 } : { min: 0.5, span: 0.55 };
  const flowerCount =
    stageIndex === 3
      ? Math.round(2 + stageProgress * 8) // 2–10: flowers first appear late in Forest
      : stageIndex >= 4
        ? Math.round(12 + stageProgress * 12) // 12–24: the Oasis bursts with colour
        : 0;

  const sprouts = Array.from({ length: sproutCount }, (_, i) => ({
    x: 60 + seededRandom(`sprout-x-${i}`) * 480,
    size: 0.8 + seededRandom(`sprout-s-${i}`) * 0.6,
  }));
  const trees = Array.from({ length: treeCount }, (_, i) => ({
    x: 60 + seededRandom(`tree-x-${i}`) * 480,
    size: treeSize.min + seededRandom(`tree-s-${i}`) * treeSize.span,
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
      <ellipse cx="120" cy="250" rx="230" ry="60" fill={palette.hill1} />
      <ellipse cx="480" cy="255" rx="260" ry="70" fill={palette.hill2} />
      {/* ground */}
      <rect y="240" width="600" height="60" fill={palette.ground} />

      {stageIndex === 0 && (
        <g>
          <ellipse cx="300" cy="252" rx="26" ry="9" fill="#8b6b43" />
          <circle cx="300" cy="246" r="7" fill="#6d4c2a" />
          <text x="300" y="215" textAnchor="middle" fontSize="14" fill="#557">
            {seedCaption}
          </text>
        </g>
      )}

      {sprouts.map((s, i) => (
        <Sprout key={i} x={s.x} size={s.size} />
      ))}

      {trees.map((t, i) => (
        <Tree key={i} x={t.x} size={t.size} kind={t.kind} />
      ))}

      {/* Tree stage: a mossy resting rock beside the few big trunks — a
          landmark of its own, not just "fewer trees than Forest". */}
      {stageIndex === 2 && (
        <g>
          <ellipse cx="150" cy="252" rx="20" ry="10" fill="#8a8f7a" />
          <ellipse cx="150" cy="246" rx="16" ry="9" fill="#a3a88f" />
        </g>
      )}

      {/* Forest stage: scattered fern/undergrowth tufts make the ground
          itself read as dense woodland floor, distinct from Tree's bare
          grass and Oasis's flowerbeds. */}
      {stageIndex === 3 &&
        Array.from({ length: 10 }, (_, i) => {
          const x = 30 + seededRandom(`fern-x-${i}`) * 540;
          const y = 246 + seededRandom(`fern-y-${i}`) * 28;
          return (
            <path
              key={`fern-${i}`}
              d={`M${x} ${y} q -6 -10 -2 -16 M${x} ${y} q 0 -12 0 -18 M${x} ${y} q 6 -10 2 -16`}
              stroke="#3c8d5a"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}

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

      <ForestCritters stageIndex={stageIndex} />
      {showVirtueLeaf && <VirtueLeaf x={420} />}
    </svg>
  );
}

export default function Forest() {
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const info = forestInfo(d);
  const stats = statsFromData(d);
  const { t, L } = useT();
  const [previewStage, setPreviewStage] = useState<number | null>(null);
  const todayRec = d.days[today] ?? {};
  const showVirtueLeaf = !!(todayRec.challengeDone && todayRec.challengeNote);
  const todayChallenge = todayRec.challengeId ? CHALLENGES.find((c) => c.id === todayRec.challengeId) : undefined;

  const stageProgress = info.next
    ? Math.max(0, Math.min(1, (info.score - info.stage.threshold) / (info.next.threshold - info.stage.threshold)))
    : 1;

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

      <ForestScene
        stageIndex={info.stageIndex}
        stageProgress={stageProgress}
        seedCaption={t('forestSeedCaption')}
        showVirtueLeaf={showVirtueLeaf}
      />
      {showVirtueLeaf && (
        <p className="small muted" style={{ marginTop: 6 }}>
          {t('forestVirtueLeaf')}
          {todayChallenge ? ` (${L(todayChallenge.virtue)})` : ''}
        </p>
      )}

      <div className="stage-steps forest-stage-grid">
        {FOREST_STAGES.map((s, i) => {
          let cls = 'stage-step';
          if (i < info.stageIndex) cls += ' reached';
          if (i === info.stageIndex) cls += ' current';
          const unlocked = i <= info.stageIndex;
          return (
            <button key={s.id} type="button" className={cls} disabled={!unlocked} onClick={() => setPreviewStage(i)}>
              {unlocked ? s.emoji : '🔒'} {L(s.name)}
            </button>
          );
        })}
      </div>
      <p className="small muted">{t('forestStagePreviewHint')}</p>

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

      {previewStage !== null && (
        <Modal onClose={() => setPreviewStage(null)}>
          <h2>
            {FOREST_STAGES[previewStage].emoji} {L(FOREST_STAGES[previewStage].name)}
          </h2>
          <ForestScene stageIndex={previewStage} stageProgress={1} seedCaption={t('forestSeedCaption')} />
        </Modal>
      )}
    </div>
  );
}
