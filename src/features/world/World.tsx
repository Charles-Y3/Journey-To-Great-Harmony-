import { useEffect, useRef, useState } from 'react';
import { useJourney, useToday } from '../../state/store';
import { useProfile } from '../../state/profileStore';
import { worldInfo, type JourneyData } from '../../state/selectors';
import { WORLD_STAGES } from '../../data/world';
import { PEERS } from '../../data/peers';
import { greetingFor } from '../../data/greetings';
import type { Peer, WorldBuilding } from '../../data/types';
import type { Localized, Locale } from '../../i18n/types';
import { communityFeed } from '../../engine/community';
import { seededRandom } from '../../engine/progression';
import { PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { worldProgressLabel, buildingLockedNote, yourContributionLabel } from '../../i18n/strings';

type LocalizeFn = <T>(v: Localized<T>) => T;

// The world is a wide "strip" of FACE_COUNT scenes (600 SVG units each) that
// the viewport shows one face of at a time — rotating left/right pans along
// the strip, with houses, the river, and civic buildings distributed across
// its full width, so different sides of the world look genuinely different.
const FACE_COUNT = 4;
const FACE_WIDTH = 600;
const STRIP_WIDTH = FACE_COUNT * FACE_WIDTH;

const BUILDING_SPOTS: Record<string, { x: number; emoji: string }> = {
  school: { x: 220, emoji: '🏫' },
  library: { x: 480, emoji: '📚' },
  garden: { x: 780, emoji: '🌳' },
  care: { x: 1050, emoji: '🏥' },
  bridge: { x: 1500, emoji: '🌉' },
  hall: { x: 2050, emoji: '🏛️' },
};

function WorldGround({ stageIndex }: { stageIndex: number }) {
  const houseCount = Math.min(56, (3 + stageIndex * 3) * FACE_COUNT);
  const houses = Array.from({ length: houseCount }, (_, i) => ({
    x: 40 + seededRandom(`house-x-${i}`) * (STRIP_WIDTH - 80),
    size: 0.8 + seededRandom(`house-s-${i}`) * 0.55,
  }));
  const hills = Array.from({ length: FACE_COUNT }, (_, f) => f).flatMap((f) => [
    { cx: f * FACE_WIDTH + 120, cy: 250, rx: 230, ry: 60, fill: '#d8c9a3' },
    { cx: f * FACE_WIDTH + 480, cy: 255, rx: 260, ry: 70, fill: '#cdbb96' },
  ]);
  const riverSegments = STRIP_WIDTH / 300;
  let riverPath = 'M0 250 q 150 14 300 4 ';
  for (let i = 1; i < riverSegments; i++) riverPath += 't 300 6 ';
  riverPath += `v 40 h -${STRIP_WIDTH} z`;

  return (
    <svg className="world-ground" viewBox={`0 0 ${STRIP_WIDTH} 300`} preserveAspectRatio="xMidYMid meet">
      {hills.map((h, i) => (
        <ellipse key={i} cx={h.cx} cy={h.cy} rx={h.rx} ry={h.ry} fill={h.fill} />
      ))}
      <rect y="245" width={STRIP_WIDTH} height="55" fill="#cbbb92" />
      <path d={riverPath} fill="#9fc6de" opacity="0.8" />
      {houses.map((h, i) => (
        <g key={i} transform={`translate(${h.x} 232) scale(${h.size})`}>
          <rect x={-12} y={-18} width={24} height={18} fill="#e8dcc0" stroke="#b09b6d" />
          <path d="M -15 -18 L 0 -30 L 15 -18 Z" fill="#b5443c" />
          <rect x={-4} y={-10} width={8} height={10} fill="#7a5230" />
        </g>
      ))}
    </svg>
  );
}

interface WalkerLayout {
  peer: Peer;
  top: number;
  x0: number;
  x1: number;
  duration: number;
  delay: number;
}

// Deterministic (peer.id-seeded) so everyone has a consistent "home range"
// across visits rather than jumping around on every re-render. Percentages
// are relative to the full strip, so peers may roam across face boundaries.
const WALKERS: WalkerLayout[] = PEERS.map((peer, i) => {
  const lane = 64 + (i % 4) * 6.5 + seededRandom(`walk-top-${peer.id}`) * 3;
  const spread = 12 + seededRandom(`walk-spread-${peer.id}`) * 30;
  const x0 = 2 + seededRandom(`walk-x0-${peer.id}`) * Math.max(1, 96 - spread);
  const x1 = Math.min(98, x0 + spread);
  const duration = 20 + seededRandom(`walk-dur-${peer.id}`) * 16;
  const delay = -seededRandom(`walk-delay-${peer.id}`) * duration;
  return { peer, top: lane, x0, x1, duration, delay };
});

/** Tracks which bubble (peer greeting or building info) is showing, auto-dismissing after a delay. */
function useBubble(durationMs: number) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);
  function trigger(id: string) {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setActiveId(id);
    timeoutRef.current = window.setTimeout(() => setActiveId(null), durationMs);
  }
  return { activeId, trigger };
}

function WorldWalkers({ onGreet, speakingId, L }: { onGreet: (peerId: string) => void; speakingId: string | null; L: LocalizeFn }) {
  return (
    <div className="world-walkers">
      {WALKERS.map(({ peer, top, x0, x1, duration, delay }) => {
        const greeting = greetingFor(peer);
        const speaking = speakingId === peer.id;
        return (
          <button
            key={peer.id}
            type="button"
            className={speaking ? 'world-walker speaking' : 'world-walker'}
            style={{
              top: `${top}%`,
              '--x0': `${x0}%`,
              '--x1': `${x1}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties}
            onClick={() => onGreet(peer.id)}
            aria-label={L(peer.name)}
            title={L(peer.name)}
          >
            <span className="world-walker-emoji" aria-hidden="true">
              {peer.emoji}
            </span>
            {speaking && (
              <span className="world-bubble" role="status">
                <strong>{L(peer.name)}</strong>
                <span className="world-bubble-text">{greeting.text}</span>
                <span className="world-bubble-lang">{greeting.lang}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function WorldBuildings({
  buildings,
  activeId,
  onSelect,
  L,
  locale,
}: {
  buildings: (WorldBuilding & { built: boolean })[];
  activeId: string | null;
  onSelect: (id: string) => void;
  L: LocalizeFn;
  locale: Locale;
}) {
  return (
    <div className="world-buildings">
      {buildings.map((b) => {
        const spot = BUILDING_SPOTS[b.id];
        if (!spot) return null;
        const active = activeId === b.id;
        return (
          <button
            key={b.id}
            type="button"
            className={b.built ? 'world-building' : 'world-building locked'}
            style={{ left: `${(spot.x / STRIP_WIDTH) * 100}%` }}
            onClick={() => onSelect(b.id)}
            aria-label={L(b.name)}
            title={L(b.name)}
          >
            <span className="world-building-platform" aria-hidden="true" />
            <span className="world-building-emoji" aria-hidden="true">
              {spot.emoji}
            </span>
            {active && (
              <span className="world-bubble world-bubble-wide" role="status">
                <strong>{L(b.name)}</strong>
                <span className="world-bubble-desc">{b.built ? L(b.description) : buildingLockedNote(locale, b.threshold)}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function World() {
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const info = worldInfo(d, today);
  const feed = communityFeed(today);
  const { t, L, locale } = useT();
  const myName = useProfile((s) => s.name);

  const [faceIndex, setFaceIndex] = useState(0);
  const peerBubble = useBubble(2800);
  const buildingBubble = useBubble(4200);

  function rotate(dir: 1 | -1) {
    setFaceIndex((f) => (f + dir + FACE_COUNT) % FACE_COUNT);
  }

  return (
    <div>
      <PageHeader emoji="🌏" title={t('worldTitle')} subtitle={t('worldSubtitle')} />

      <div className="world-viewport">
        <span className="world-sun" aria-hidden="true" />
        <div
          className="world-strip"
          style={{ width: `${FACE_COUNT * 100}%`, transform: `translateX(-${faceIndex * (100 / FACE_COUNT)}%)` }}
        >
          <WorldGround stageIndex={info.stageIndex} />
          <WorldBuildings buildings={info.buildings} activeId={buildingBubble.activeId} onSelect={buildingBubble.trigger} L={L} locale={locale} />
          <WorldWalkers onGreet={peerBubble.trigger} speakingId={peerBubble.activeId} L={L} />
        </div>
        <p className="world-caption">{t('worldSceneCaption')}</p>
        <button type="button" className="world-rotate world-rotate-left" onClick={() => rotate(-1)} aria-label={t('worldRotateLeft')}>
          ◀
        </button>
        <button type="button" className="world-rotate world-rotate-right" onClick={() => rotate(1)} aria-label={t('worldRotateRight')}>
          ▶
        </button>
        <div className="world-face-dots">
          {Array.from({ length: FACE_COUNT }, (_, i) => (
            <span key={i} className={i === faceIndex ? 'world-face-dot active' : 'world-face-dot'} />
          ))}
        </div>
      </div>
      <p className="small muted world-walkers-hint">{t('worldWalkersHint')}</p>

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
            <div className="stat-name">{yourContributionLabel(locale, myName)}</div>
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
