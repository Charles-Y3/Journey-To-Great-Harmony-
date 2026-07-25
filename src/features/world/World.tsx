import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useJourney, useToday } from '../../state/store';
import { useProfile } from '../../state/profileStore';
import { useSound } from '../../state/soundStore';
import { worldInfo, completedEraIds, type JourneyData } from '../../state/selectors';
import { WORLD_STAGES } from '../../data/world';
import { CARDS } from '../../data/cards';
import { TIMELINE } from '../../data/timeline';
import { TOPICS } from '../../data/knowledgeTree';
import { greetingFor } from '../../data/greetings';
import type { Peer, WorldBuilding } from '../../data/types';
import { localized, type Localized, type Locale } from '../../i18n/types';
import { communityFeed, visiblePeers } from '../../engine/community';
import { hashString, seededRandom } from '../../engine/progression';
import { speakGreeting, speakAppText } from '../../engine/speech';
import { playSfx } from '../../engine/sfx';
import { Modal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { worldProgressLabel, buildingLockedNote } from '../../i18n/strings';

type LocalizeFn = <T>(v: Localized<T>) => T;

// Sayings the sun's caption cycles through when clicked — a small bit of
// life on top of the World scene, separate from the "how do I use this"
// hint text below it.
const SUN_CAPTIONS: Localized<string>[] = [
  localized('The world grows because people grow.', '世界因人的成长而成长。'),
  localized('Every small act of harmony ripples outward.', '每一个和谐的小小举动，都会向外荡漾。'),
  localized('A shared world is built one person at a time.', '共享的世界，是一个人、一个人建成的。'),
  localized('Great Harmony begins with a single kind act.', '大同，始于一次善举。'),
  localized('No one builds this world alone.', '没有人是独自建成这个世界的。'),
];

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

// A distinct look per world stage, so Village/Town/City/World stage
// don't all read as "the same houses, just more of them": earthy dawn
// tones for the Village, richer warm tones for the Town, an ordered grey
// stone palette (plus a wall) for the City, and a radiant jade-gold glow
// (plus lanterns) for the World stage.
const STAGE_GROUND_PALETTE = [
  { hill1: '#d8c9a3', hill2: '#cdbb96', ground: '#cbbb92', roofs: ['#b5443c', '#a8583c'] },
  { hill1: '#dfc9a0', hill2: '#d6b98e', ground: '#c9b283', roofs: ['#b5443c', '#c9962e', '#a8583c'] },
  { hill1: '#c7c9cf', hill2: '#b9bcc4', ground: '#aeb2ba', roofs: ['#5c6270', '#7a5230', '#3b6ea5'] },
  { hill1: '#d9e6c8', hill2: '#c8e0c4', ground: '#bcdcb0', roofs: ['#c9962e', '#2e7d5b', '#b5443c'] },
];

// One unmistakable landmark + a bit of moving life per stage, so a glance at
// the skyline tells the stages apart even before you notice the palette:
// a well and a hen for the Village, a market stall and a handcart for the
// Town, a clock tower and a bicycle for the City, and a lantern-hung
// pavilion with a drifting dove for the World stage.
function WorldLandmark({ stageIndex, x }: { stageIndex: number; x: number }) {
  if (stageIndex === 0) {
    return (
      <g transform={`translate(${x} 232)`}>
        <ellipse cx={0} cy={2} rx={16} ry={5} fill="#8a7452" opacity="0.5" />
        <rect x={-11} y={-16} width={22} height={16} rx={2} fill="#a89066" stroke="#7a6440" />
        <path d="M -14 -16 L 0 -28 L 14 -16 Z" fill="#5c6270" />
        <rect x={-1.5} y={-24} width={3} height={10} fill="#6d4c2a" />
        <text fontSize={11}>
          <animateMotion path="M-40,10 q 20 4 40 0 t 40 0" dur="14s" repeatCount="indefinite" />
          🐓
        </text>
      </g>
    );
  }
  if (stageIndex === 1) {
    return (
      <g transform={`translate(${x} 232)`}>
        <rect x={-16} y={-14} width={32} height={14} fill="#e8dcc0" stroke="#b09b6d" />
        <path d="M -20 -14 L -20 -24 L 20 -24 L 20 -14 Z" fill="#c9962e" />
        <rect x={-20} y={-24} width={40} height={4} fill="#b5443c" />
        <text fontSize={12}>
          <animateMotion path="M-60,8 L 60,8 L -60,8" dur="16s" repeatCount="indefinite" />
          🛒
        </text>
      </g>
    );
  }
  if (stageIndex === 2) {
    return (
      <g transform={`translate(${x} 232)`}>
        <rect x={-7} y={-46} width={14} height={46} fill="#8a8f98" stroke="#5c6270" />
        <circle cx={0} cy={-46} r={9} fill="#fdf6e3" stroke="#5c6270" />
        <line x1={0} y1={-46} x2={0} y2={-51} stroke="#5c6270" strokeWidth="1.4" />
        <line x1={0} y1={-46} x2={4} y2={-44} stroke="#5c6270" strokeWidth="1.4" />
        <text fontSize={13}>
          <animateMotion path="M-70,6 L 70,6 L -70,6" dur="12s" repeatCount="indefinite" />
          🚲
        </text>
      </g>
    );
  }
  return (
    <g transform={`translate(${x} 232)`}>
      <rect x={-4} y={-38} width={8} height={38} fill="#b5443c" />
      <path d="M -22 -38 L 22 -38 L 16 -46 L -16 -46 Z" fill="#c9962e" />
      <circle cx={0} cy={-52} r={7} fill="#f2d98a" opacity="0.9" />
      <path d="M -7 -52 A 7 7 0 0 1 7 -52" stroke="#fff1cf" strokeWidth="1.2" fill="none" opacity="0.8" />
      <text fontSize={14}>
        <animateMotion path="M-50,-30 q 25 -14 50 0 t 50 0" dur="15s" repeatCount="indefinite" />
        🕊️
      </text>
    </g>
  );
}

function WorldGround({ stageIndex, width = STRIP_WIDTH, faceCount = FACE_COUNT }: { stageIndex: number; width?: number; faceCount?: number }) {
  const palette = STAGE_GROUND_PALETTE[Math.min(stageIndex, STAGE_GROUND_PALETTE.length - 1)];
  const houseCount = Math.min(56, (3 + stageIndex * 3) * faceCount);
  const houses = Array.from({ length: houseCount }, (_, i) => ({
    x: 40 + seededRandom(`house-x-${i}`) * (width - 80),
    size: 0.8 + seededRandom(`house-s-${i}`) * 0.55,
    roof: palette.roofs[i % palette.roofs.length],
    tall: stageIndex >= 2 && seededRandom(`house-tall-${i}`) > 0.6,
  }));
  const faceWidth = width / faceCount;
  const hills = Array.from({ length: faceCount }, (_, f) => f).flatMap((f) => [
    { cx: f * faceWidth + 120, cy: 250, rx: 230, ry: 60, fill: palette.hill1 },
    { cx: f * faceWidth + 480, cy: 255, rx: 260, ry: 70, fill: palette.hill2 },
  ]);
  const riverSegments = width / 300;
  let riverPath = 'M0 250 q 150 14 300 4 ';
  for (let i = 1; i < riverSegments; i++) riverPath += 't 300 6 ';
  riverPath += `v 40 h -${width} z`;

  return (
    <svg className="world-ground" viewBox={`0 0 ${width} 300`} preserveAspectRatio="none">
      {hills.map((h, i) => (
        <ellipse key={i} cx={h.cx} cy={h.cy} rx={h.rx} ry={h.ry} fill={h.fill} />
      ))}
      <rect y="245" width={width} height="55" fill={palette.ground} />
      <path d={riverPath} fill="#9fc6de" opacity="0.8" />
      {/* City and World stage sit behind a low wall — a visible sign of a more built-up stage. */}
      {stageIndex >= 2 && <rect y="238" width={width} height="6" fill="#8a8f98" opacity="0.7" />}
      {houses.map((h, i) => (
        <g key={i} transform={`translate(${h.x} 232) scale(${h.size})`}>
          {h.tall ? (
            <>
              <rect x={-10} y={-30} width={20} height={30} fill="#e2ddd2" stroke="#9a9186" />
              <rect x={-6} y={-16} width={5} height={6} fill="#5c6270" />
              <rect x={1} y={-16} width={5} height={6} fill="#5c6270" />
            </>
          ) : (
            <>
              <rect x={-12} y={-18} width={24} height={18} fill="#e8dcc0" stroke="#b09b6d" />
              <path d="M -15 -18 L 0 -30 L 15 -18 Z" fill={h.roof} />
              <rect x={-4} y={-10} width={8} height={10} fill="#7a5230" />
            </>
          )}
        </g>
      ))}
      {/* World stage: paper lanterns strung along the skyline. */}
      {stageIndex >= 3 &&
        Array.from({ length: Math.round(width / 140) }, (_, i) => {
          const x = 60 + i * 140 + seededRandom(`lantern-x-${i}`) * 40;
          return (
            <g key={`lantern-${i}`}>
              <line x1={x} y1="0" x2={x} y2="60" stroke="#d8a943" strokeWidth="0.8" opacity="0.5" />
              <ellipse cx={x} cy="66" rx="7" ry="9" fill="#e2a13c" opacity="0.9" />
            </g>
          );
        })}
      <WorldLandmark stageIndex={stageIndex} x={faceWidth / 2} />
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

// Deterministic (peer.id-seeded, not array-position-seeded) so a given
// peer keeps the same "home range" across visits regardless of who else is
// currently visible — the roster grows and occasionally loses a traveller
// over time (see visiblePeers() in engine/community.ts), so a lane based on
// array index would otherwise reshuffle everyone's walk whenever the cast
// changes. Percentages are relative to the full strip, so peers may roam
// across face boundaries.
function buildWalkers(peers: Peer[]): WalkerLayout[] {
  return peers.map((peer) => {
    // Kept within 64–78% so walkers stay on the hills/ground (houses sit at
    // ~77%) and never reach the river band, which starts around 82%.
    const lane = 64 + Math.floor(seededRandom(`walk-lane-${peer.id}`) * 4) * 4 + seededRandom(`walk-top-${peer.id}`) * 2;
    const spread = 12 + seededRandom(`walk-spread-${peer.id}`) * 30;
    const x0 = 2 + seededRandom(`walk-x0-${peer.id}`) * Math.max(1, 96 - spread);
    const x1 = Math.min(98, x0 + spread);
    const duration = 20 + seededRandom(`walk-dur-${peer.id}`) * 16;
    const delay = -seededRandom(`walk-delay-${peer.id}`) * duration;
    return { peer, top: lane, x0, x1, duration, delay };
  });
}

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

function WorldWalkers({
  walkers,
  onGreet,
  speakingId,
  L,
}: {
  walkers: WalkerLayout[];
  onGreet: (peerId: string) => void;
  speakingId: string | null;
  L: LocalizeFn;
}) {
  return (
    <div className="world-walkers">
      {walkers.map(({ peer, top, x0, x1, duration, delay }) => {
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

// Distinct sky per stage, so a Village dawn, a Town afternoon, a City's
// clearer blue, and the World stage's golden-rose glow don't all look
// like the same backdrop with different houses in front of it.
const STAGE_SKY = [
  'linear-gradient(to bottom, #f7d9a8, #fdf2dc)',
  'linear-gradient(to bottom, #bfe0f2, #fdf6e3)',
  'linear-gradient(to bottom, #8fb9e0, #e7eef5)',
  'linear-gradient(to bottom, #f2c9df, #fff1cf)',
];

export default function World() {
  const state = useJourney();
  const today = useToday();
  const d = state as unknown as JourneyData;
  const info = worldInfo(d, today);
  const feed = communityFeed(state.startDay, today);
  const peers = visiblePeers(state.startDay, today);
  const walkers = buildWalkers(peers);
  const { t, L, locale } = useT();
  const myName = useProfile((s) => s.name);
  const speechMuted = useSound((s) => s.speechMuted);
  const setSpeechMuted = useSound((s) => s.setSpeechMuted);

  const [faceIndex, setFaceIndex] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [captionHighlight, setCaptionHighlight] = useState(false);
  const [previewStage, setPreviewStage] = useState<number | null>(null);
  const [civicId, setCivicId] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);
  const peerBubble = useBubble(2800);
  const buildingBubble = useBubble(4200);

  const libraryQuote = useMemo(() => {
    const owned = CARDS.filter((c) => d.unlockedCards.includes(c.id));
    const pool = owned.length > 0 ? owned : CARDS;
    return pool[Math.abs(hashString(`lib-${today}`)) % pool.length];
  }, [d.unlockedCards, today]);

  const cappedEras = useMemo(() => {
    return completedEraIds(d.completedTimelinePoints).filter((id) => d.capstones[id]);
  }, [d.completedTimelinePoints, d.capstones]);

  const recentEncouragements = d.encouragementsSent;

  const lastLessonTitle = useMemo(() => {
    const lastId = d.completedLessons[d.completedLessons.length - 1];
    if (!lastId) return null;
    for (const topic of TOPICS) {
      const lesson = topic.lessons.find((l) => l.id === lastId);
      if (lesson) return lesson.title;
    }
    return null;
  }, [d.completedLessons]);

  useEffect(() => {
    return () => {
      if (highlightTimeoutRef.current) window.clearTimeout(highlightTimeoutRef.current);
    };
  }, []);

  function rotate(dir: 1 | -1) {
    setFaceIndex((f) => (f + dir + FACE_COUNT) % FACE_COUNT);
  }

  function greet(peerId: string) {
    peerBubble.trigger(peerId);
    if (!speechMuted) {
      const peer = peers.find((p) => p.id === peerId);
      if (peer) speakGreeting(greetingFor(peer));
    }
  }

  function clickSun() {
    const nextIndex = (captionIndex + 1) % SUN_CAPTIONS.length;
    setCaptionIndex(nextIndex);
    if (!speechMuted) speakAppText(L(SUN_CAPTIONS[nextIndex]), locale);
    if (highlightTimeoutRef.current) window.clearTimeout(highlightTimeoutRef.current);
    setCaptionHighlight(true);
    highlightTimeoutRef.current = window.setTimeout(() => setCaptionHighlight(false), 2800);
  }

  return (
    <div>
      <PageHeader emoji="🌏" title={t('worldTitle')} subtitle={t('worldSubtitle')} />

      <div className="world-viewport" style={{ background: STAGE_SKY[Math.min(info.stageIndex, STAGE_SKY.length - 1)] }}>
        <button type="button" className="world-sun" onClick={clickSun} aria-label={t('worldSunHint')} />
        <div
          className="world-strip"
          style={{ width: `${FACE_COUNT * 100}%`, transform: `translateX(-${faceIndex * (100 / FACE_COUNT)}%)` }}
        >
          <WorldGround stageIndex={info.stageIndex} />
          <WorldBuildings buildings={info.buildings} activeId={buildingBubble.activeId} onSelect={buildingBubble.trigger} L={L} locale={locale} />
          <WorldWalkers walkers={walkers} onGreet={greet} speakingId={peerBubble.activeId} L={L} />
        </div>
        <button type="button" className="world-rotate world-rotate-left" onClick={() => rotate(-1)} aria-label={t('worldRotateLeft')}>
          ◀
        </button>
        <button type="button" className="world-rotate world-rotate-right" onClick={() => rotate(1)} aria-label={t('worldRotateRight')}>
          ▶
        </button>
        <button
          type="button"
          className="world-mute-btn"
          onClick={() => setSpeechMuted(!speechMuted)}
          aria-label={t(speechMuted ? 'worldUnmuteSpeech' : 'worldMuteSpeech')}
          title={t(speechMuted ? 'worldUnmuteSpeech' : 'worldMuteSpeech')}
        >
          {speechMuted ? '🔇' : '🔊'}
        </button>
        <div className="world-face-dots">
          {Array.from({ length: FACE_COUNT }, (_, i) => (
            <span key={i} className={i === faceIndex ? 'world-face-dot active' : 'world-face-dot'} />
          ))}
        </div>
      </div>
      <p className={captionHighlight ? 'small muted world-scene-caption highlight' : 'small muted world-scene-caption'}>
        {L(SUN_CAPTIONS[captionIndex])}
      </p>
      <p className="small muted world-walkers-hint">{t('worldWalkersHint')}</p>

      <div className="stage-steps world-stage-grid">
        {WORLD_STAGES.map((s, i) => {
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
      <p className="small muted">{t('worldStagePreviewHint')}</p>

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
        <div className="world-contrib-row" aria-label={myName ?? t('worldContribYou')}>
          <div className="world-contrib-cell">
            <div className="stat-value">{info.user}</div>
            <div className="stat-name">{t('worldContribYou')}</div>
          </div>
          <div className="world-contrib-cell">
            <div className="stat-value">{info.community}</div>
            <div className="stat-name">{t('worldContribCommunity')}</div>
          </div>
          <div className="world-contrib-cell">
            <div className="stat-value">{info.total}</div>
            <div className="stat-name">{t('worldContribTotal')}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>{t('civicBuildingsTitle')}</h3>
        <div className="card-grid">
          {info.buildings.map((b) => (
            <button
              key={b.id}
              type="button"
              className={b.built ? 'badge-tile civic-tile' : 'badge-tile civic-tile locked'}
              onClick={() => {
                setCivicId(b.id);
                if (b.built) playSfx('chime');
              }}
            >
              <div className="wcard-emoji">{b.emoji}</div>
              <strong>{L(b.name)}</strong>
              <p className="small muted" style={{ margin: '4px 0 0' }}>
                {b.built ? L(b.description) : buildingLockedNote(locale, b.threshold)}
              </p>
            </button>
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

      {previewStage !== null && (
        <Modal onClose={() => setPreviewStage(null)}>
          <h2>
            {WORLD_STAGES[previewStage].emoji} {L(WORLD_STAGES[previewStage].name)}
          </h2>
          <div className="world-viewport world-viewport-preview" style={{ background: STAGE_SKY[Math.min(previewStage, STAGE_SKY.length - 1)] }}>
            <WorldGround stageIndex={previewStage} width={FACE_WIDTH} faceCount={1} />
          </div>
          <p className="small muted">{L(WORLD_STAGES[previewStage].description)}</p>
        </Modal>
      )}

      {civicId && info.buildings.find((b) => b.id === civicId) && (
        <CivicBuildingModal
          building={info.buildings.find((b) => b.id === civicId)!}
          onClose={() => setCivicId(null)}
          lastLessonTitle={lastLessonTitle ? L(lastLessonTitle) : null}
          libraryQuote={libraryQuote}
          cappedEraNames={cappedEras.map((id) => {
            const era = TIMELINE.find((e) => e.id === id);
            return era ? L(era.name) : id;
          })}
          encouragementCount={recentEncouragements}
        />
      )}
    </div>
  );
}

function CivicBuildingModal({
  building,
  onClose,
  lastLessonTitle,
  libraryQuote,
  cappedEraNames,
  encouragementCount,
}: {
  building: WorldBuilding & { built: boolean };
  onClose: () => void;
  lastLessonTitle: string | null;
  libraryQuote: (typeof CARDS)[number];
  cappedEraNames: string[];
  encouragementCount: number;
}) {
  const { t, L } = useT();
  if (!building.built) {
    return (
      <Modal onClose={onClose}>
        <h2>
          {building.emoji} {L(building.name)}
        </h2>
        <p>{t('civicTapLocked')}</p>
        <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={onClose}>
          {t('civicTapClose')}
        </button>
      </Modal>
    );
  }

  let body: ReactNode = null;
  let cta: ReactNode = null;
  switch (building.id) {
    case 'school':
      body = (
        <>
          <p>{t('civicTapSchool')}</p>
          {lastLessonTitle && <p className="small muted">📖 {lastLessonTitle}</p>}
        </>
      );
      cta = (
        <Link className="btn btn-primary" to="/knowledge" onClick={onClose}>
          {t('navKnowledge')}
        </Link>
      );
      break;
    case 'library':
      body = (
        <>
          <p className="small muted">{t('civicTapLibrary')}</p>
          <p className="quote-text">“{L(libraryQuote.quote)}”</p>
          <p className="quote-author">— {L(libraryQuote.title)}</p>
        </>
      );
      cta = (
        <Link className="btn btn-primary" to="/collection" onClick={onClose}>
          {t('navCollection')}
        </Link>
      );
      break;
    case 'garden':
      body = <p>{t('civicTapGarden')}</p>;
      cta = (
        <Link className="btn btn-primary" to="/forest" onClick={onClose}>
          {t('navForest')}
        </Link>
      );
      break;
    case 'care':
      body = <p>{t('civicTapCare')}</p>;
      cta = (
        <Link className="btn btn-primary" to="/community" onClick={onClose}>
          {t('navCommunity')}
        </Link>
      );
      break;
    case 'bridge':
      body = (
        <>
          <p>{t('civicTapBridge')}</p>
          <p className="small muted">
            {t('civicEncouragementsWeek')}: {encouragementCount}
          </p>
        </>
      );
      cta = (
        <Link className="btn btn-primary" to="/community" onClick={onClose}>
          {t('navCommunity')}
        </Link>
      );
      break;
    case 'hall':
      body = (
        <>
          <p>{t('civicTapHall')}</p>
          {cappedEraNames.length > 0 ? (
            <ul className="small">
              {cappedEraNames.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ) : (
            <p className="small muted">—</p>
          )}
        </>
      );
      cta = (
        <Link className="btn btn-primary" to="/timeline" onClick={onClose}>
          {t('navTimeline')}
        </Link>
      );
      break;
    default:
      body = <p>{L(building.description)}</p>;
  }

  return (
    <Modal onClose={onClose}>
      <h2>
        {building.emoji} {L(building.name)}
      </h2>
      {body}
      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {cta}
        <button className="btn" onClick={onClose}>
          {t('civicTapClose')}
        </button>
      </div>
    </Modal>
  );
}
