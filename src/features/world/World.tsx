import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useJourney, useToday } from '../../state/store';
import { useProfile } from '../../state/profileStore';
import { useTraveller } from '../../state/travellerStore';
import { useSound } from '../../state/soundStore';
import { worldInfo, fullyMasteredEraIds, statsFromData, type JourneyData } from '../../state/selectors';
import { WORLD_STAGES } from '../../data/world';
import { CARDS } from '../../data/cards';
import { TIMELINE } from '../../data/timeline';
import { TOPICS } from '../../data/knowledgeTree';
import { greetingFor } from '../../data/greetings';
import type { Peer, WorldBuilding } from '../../data/types';
import { DEFAULT_AVATAR, isAllowedAvatar } from '../../data/avatars';
import { localized, type Localized, type Locale } from '../../i18n/types';
import { communityFeed, peerStats } from '../../engine/community';
import { fetchActiveTravellers, type ActiveTraveller } from '../../engine/travellerApi';
import { walkerCapsForStage } from '../../engine/worldWalkers';
import { hashString, rankForXp, seededRandom } from '../../engine/progression';
import { useIsNavRouteUnlocked } from '../../engine/pacing';
import { findNameCollisions, travellerTag } from '../../engine/travellerTags';
import { speakGreeting, speakAppText } from '../../engine/speech';
import { playSfx } from '../../engine/sfx';
import { AvatarGlyph, Modal, PageHeader, ProgressBar } from '../../components/ui';
import { useT } from '../../i18n/useT';
import { worldProgressLabel, buildingLockedNote } from '../../i18n/strings';
import { useUi } from '../../state/uiStore';

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
        <text fontSize={10} opacity="0.9">
          <animateMotion path="M40,-20 q 30 -18 60 0" dur="11s" repeatCount="indefinite" />
          🐦
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
        {/* Secondary civic silhouette so City reads denser than Town. */}
        <rect x={28} y={-36} width={12} height={36} fill="#9aa0a8" stroke="#5c6270" opacity="0.85" />
        <rect x={30} y={-28} width={3} height={4} fill="#cfe0f0" />
        <rect x={35} y={-28} width={3} height={4} fill="#cfe0f0" />
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
      <text fontSize={11} opacity="0.85">
        <animateMotion path="M30,-18 q -20 -10 -40 0" dur="13s" repeatCount="indefinite" />
        🕊️
      </text>
    </g>
  );
}

const HOUSE_CEILING_BY_STAGE = [28, 48, 72, 96];

function WorldGround({ stageIndex, width = STRIP_WIDTH, faceCount = FACE_COUNT }: { stageIndex: number; width?: number; faceCount?: number }) {
  const stage = Math.min(stageIndex, HOUSE_CEILING_BY_STAGE.length - 1);
  const palette = STAGE_GROUND_PALETTE[stage];
  const ceiling = HOUSE_CEILING_BY_STAGE[stage];
  const houseCount = Math.min(ceiling, (3 + stage * 4) * faceCount);
  const tallThreshold = stage >= 3 ? 0.35 : stage >= 2 ? 0.45 : 1;
  const houses = Array.from({ length: houseCount }, (_, i) => ({
    x: 40 + seededRandom(`house-x-${i}`) * (width - 80),
    size: 0.8 + seededRandom(`house-s-${i}`) * 0.55,
    roof: palette.roofs[i % palette.roofs.length],
    tall: stage >= 2 && seededRandom(`house-tall-${i}`) > tallThreshold,
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
  const lanternSpacing = stage >= 3 ? 90 : 140;

  return (
    <svg className="world-ground" viewBox={`0 0 ${width} 300`} preserveAspectRatio="none">
      {hills.map((h, i) => (
        <ellipse key={i} cx={h.cx} cy={h.cy} rx={h.rx} ry={h.ry} fill={h.fill} />
      ))}
      <rect y="245" width={width} height="55" fill={palette.ground} />
      <path d={riverPath} fill="#9fc6de" opacity="0.8" />
      {/* City and World stage sit behind a low wall — a visible sign of a more built-up stage. */}
      {stage >= 2 && <rect y="238" width={width} height="6" fill="#8a8f98" opacity="0.7" />}
      {stage >= 2 &&
        Array.from({ length: faceCount }, (_, f) => {
          const base = f * faceWidth + faceWidth * 0.72;
          return (
            <g key={`civic-${f}`} opacity="0.7">
              <rect x={base} y={196} width={18} height={42} fill="#8a8f98" stroke="#5c6270" />
              <rect x={base + 22} y={208} width={14} height={30} fill="#9aa0a8" stroke="#5c6270" />
            </g>
          );
        })}
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
      {/* World stage: denser paper lanterns along the skyline. */}
      {stage >= 3 &&
        Array.from({ length: Math.round(width / lanternSpacing) }, (_, i) => {
          const x = 40 + i * lanternSpacing + seededRandom(`lantern-x-${i}`) * 30;
          return (
            <g key={`lantern-${i}`}>
              <line x1={x} y1="0" x2={x} y2="60" stroke="#d8a943" strokeWidth="0.8" opacity="0.5" />
              <ellipse cx={x} cy="66" rx="7" ry="9" fill="#e2a13c" opacity="0.9" />
            </g>
          );
        })}
      {Array.from({ length: faceCount }, (_, f) => (
        <WorldLandmark key={`landmark-${f}`} stageIndex={stage} x={f * faceWidth + faceWidth / 2} />
      ))}
    </svg>
  );
}

interface WalkerPerson {
  id: string;
  displayName: string;
  emoji: string;
  kind: 'npc' | 'traveller' | 'self';
  peer?: Peer;
  /** Localized rank label for self + remote travellers (emoji + name). */
  rankLabel?: string;
  /** Set only when this traveller's name collides with another real traveller's. */
  tag?: string | null;
}

interface WalkerLayout {
  person: WalkerPerson;
  top: number;
  x0: number;
  x1: number;
  duration: number;
  delay: number;
}

// Deterministic (id-seeded, not array-position-seeded) so a given
// walker keeps the same "home range" across visits regardless of who else is
// currently visible — the roster grows and occasionally loses a traveller
// over time (see visiblePeers() in engine/community.ts), so a lane based on
// array index would otherwise reshuffle everyone's walk whenever the cast
// changes. Percentages are relative to the full strip, so peers may roam
// across face boundaries.
function buildWalkers(people: WalkerPerson[], stageIndex: number): WalkerLayout[] {
  // City/World widen the vertical band so denser crowds don't stack on one path.
  const laneBase = stageIndex >= 2 ? 60 : 64;
  const laneSteps = stageIndex >= 2 ? 6 : 4;
  return people.map((person) => {
    const lane =
      laneBase +
      Math.floor(seededRandom(`walk-lane-${person.id}`) * laneSteps) * 3.5 +
      seededRandom(`walk-top-${person.id}`) * 2;
    const spread = 12 + seededRandom(`walk-spread-${person.id}`) * 30;
    const x0 = 2 + seededRandom(`walk-x0-${person.id}`) * Math.max(1, 96 - spread);
    const x1 = Math.min(98, x0 + spread);
    const duration = 20 + seededRandom(`walk-dur-${person.id}`) * 16;
    const delay = -seededRandom(`walk-delay-${person.id}`) * duration;
    return { person, top: Math.min(80, lane), x0, x1, duration, delay };
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
  travellerGreeting,
  selfGreeting,
  travellerLang,
}: {
  walkers: WalkerLayout[];
  onGreet: (personId: string) => void;
  speakingId: string | null;
  travellerGreeting: string;
  selfGreeting: string;
  travellerLang: string;
}) {
  return (
    <div className="world-walkers">
      {walkers.map(({ person, top, x0, x1, duration, delay }) => {
        const speaking = speakingId === person.id;
        const isSelf = person.kind === 'self';
        const isRemote = person.kind === 'traveller';
        const bubbleText = isSelf
          ? selfGreeting
          : isRemote || !person.peer
            ? travellerGreeting
            : greetingFor(person.peer).text;
        const bubbleLang = isSelf
          ? null
          : isRemote || !person.peer
            ? travellerLang
            : greetingFor(person.peer).lang;
        const baseAria = person.rankLabel
          ? `${person.displayName}, ${person.rankLabel}`
          : person.displayName;
        const aria = person.tag ? `${baseAria} · ${person.tag}` : baseAria;
        const className = ['world-walker', isSelf ? 'world-walker-self' : '', speaking ? 'speaking' : '']
          .filter(Boolean)
          .join(' ');
        return (
          <button
            key={person.id}
            type="button"
            className={className}
            style={{
              top: `${top}%`,
              '--x0': `${x0}%`,
              '--x1': `${x1}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties}
            onClick={() => onGreet(person.id)}
            aria-label={aria}
            title={aria}
          >
            <AvatarGlyph emoji={person.emoji} ringed={!!person.tag} className="world-walker-emoji" />
            {speaking && (
              <span className="world-bubble world-bubble-wide" role="status">
                <strong>{person.displayName}</strong>
                <span className="world-bubble-avatar" aria-hidden="true">
                  {person.emoji}
                </span>
                {person.rankLabel && (
                  <span className="world-bubble-rank">{person.rankLabel}</span>
                )}
                {person.tag && <span className="world-bubble-tag">{person.tag}</span>}
                <span className="world-bubble-text">{bubbleText}</span>
                {bubbleLang && <span className="world-bubble-lang">{bubbleLang}</span>}
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
  const peers = peerStats(state.startDay, today, state.xp);
  const { t, L, locale } = useT();
  const setSeenWorldTravellersBanner = useUi((s) => s.setSeenWorldTravellersBanner);
  const myName = useProfile((s) => s.name);
  const myAvatar = useProfile((s) => s.avatar);
  const myTravellerId = useTraveller((s) => s.travellerId);
  const speechMuted = useSound((s) => s.speechMuted);
  const setSpeechMuted = useSound((s) => s.setSpeechMuted);
  const myXp = statsFromData(d).xp;

  const [faceIndex, setFaceIndex] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [captionHighlight, setCaptionHighlight] = useState(false);
  const [previewStage, setPreviewStage] = useState<number | null>(null);
  const [civicId, setCivicId] = useState<string | null>(null);
  const [activeTravellers, setActiveTravellers] = useState<ActiveTraveller[]>([]);
  const [nearbyTravellers, setNearbyTravellers] = useState<ActiveTraveller[]>([]);
  const highlightTimeoutRef = useRef<number | null>(null);
  const peerBubble = useBubble(2800);
  const buildingBubble = useBubble(4200);

  useEffect(() => {
    setSeenWorldTravellersBanner(true);
  }, [setSeenWorldTravellersBanner]);

  useEffect(() => {
    let cancelled = false;
    void fetchActiveTravellers({ myId: myTravellerId ?? undefined, myXp }).then((result) => {
      if (cancelled || !result) return;
      setActiveTravellers(result.travellers);
      setNearbyTravellers(result.nearby);
    });
    return () => {
      cancelled = true;
    };
  }, [today, myTravellerId, myXp]);

  const walkers = useMemo(() => {
    const { cap, maxReals } = walkerCapsForStage(info.stageIndex);
    const selfRank = rankForXp(myXp);
    const self: WalkerPerson = {
      id: myTravellerId ? `self-${myTravellerId}` : 'walker-self',
      displayName: myName?.trim() || t('worldYouName'),
      emoji: isAllowedAvatar(myAvatar) ? myAvatar : DEFAULT_AVATAR,
      kind: 'self',
      rankLabel: `${selfRank.emoji} ${L(selfRank.name)}`,
    };
    // Reserve a "top few" quota of the most recently-active real travellers, then
    // fill the rest of the budget with real travellers near the user's own rank
    // (so near-rank picks can't be crowded out by a pure recency sort), backfilling
    // from the remaining recents if there aren't enough near-rank candidates.
    const topFew = Math.min(8, maxReals);
    const excludeSelf = (tr: ActiveTraveller) => tr.id !== myTravellerId;
    const byRecency = (a: ActiveTraveller, b: ActiveTraveller) => (b.updatedAt || 0) - (a.updatedAt || 0);
    const recentSorted = [...activeTravellers].filter(excludeSelf).sort(byRecency);
    const topPicks = recentSorted.slice(0, topFew);
    const usedIds = new Set(topPicks.map((tr) => tr.id));
    const nearPicks = nearbyTravellers
      .filter((tr) => excludeSelf(tr) && !usedIds.has(tr.id))
      .slice(0, Math.max(0, maxReals - topPicks.length));
    nearPicks.forEach((tr) => usedIds.add(tr.id));
    const backfill = recentSorted
      .filter((tr) => !usedIds.has(tr.id))
      .slice(0, Math.max(0, maxReals - topPicks.length - nearPicks.length));
    const realTravellers = [...topPicks, ...nearPicks, ...backfill].slice(0, maxReals);
    const collisionIds = findNameCollisions(realTravellers.map((tr) => ({ id: tr.id, name: tr.name })));
    const reals: WalkerPerson[] = realTravellers.map((tr) => {
        const rank = rankForXp(typeof tr.xp === 'number' ? tr.xp : 0);
        return {
          id: `traveller-${tr.id}`,
          displayName: tr.name,
          emoji: isAllowedAvatar(tr.avatar) ? tr.avatar : DEFAULT_AVATAR,
          kind: 'traveller' as const,
          rankLabel: `${rank.emoji} ${L(rank.name)}`,
          tag: collisionIds.has(tr.id) ? travellerTag(tr.id) : null,
        };
      });
    const npcSlots = Math.max(0, cap - reals.length);
    const npcs: WalkerPerson[] = peers.slice(0, npcSlots).map((p) => {
      const rank = rankForXp(p.xp);
      return {
        id: p.peer.id,
        displayName: L(p.peer.name),
        emoji: p.peer.emoji,
        kind: 'npc' as const,
        peer: p.peer,
        rankLabel: `${rank.emoji} ${L(rank.name)}`,
      };
    });
    // Self is always present and never counts against the stage cap.
    return buildWalkers([self, ...reals, ...npcs], info.stageIndex);
  }, [
    peers,
    activeTravellers,
    nearbyTravellers,
    myTravellerId,
    myName,
    myAvatar,
    myXp,
    info.stageIndex,
    L,
    t,
  ]);

  const libraryQuote = useMemo(() => {
    const owned = CARDS.filter((c) => d.unlockedCards.includes(c.id));
    const pool = owned.length > 0 ? owned : CARDS;
    return pool[Math.abs(hashString(`lib-${today}`)) % pool.length];
  }, [d.unlockedCards, today]);

  const cappedEras = useMemo(() => {
    return fullyMasteredEraIds(d.timelinePointLevels).filter((id) => d.capstones[id]);
  }, [d.timelinePointLevels, d.capstones]);

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

  function greet(personId: string) {
    peerBubble.trigger(personId);
    if (speechMuted) return;
    const layout = walkers.find((w) => w.person.id === personId);
    if (!layout) return;
    if (layout.person.kind === 'npc' && layout.person.peer) {
      speakGreeting(greetingFor(layout.person.peer));
      return;
    }
    if (layout.person.kind === 'self') {
      speakAppText(t('worldSelfGreeting'), locale);
      return;
    }
    speakAppText(t('worldTravellerGreeting'), locale);
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
          <WorldWalkers
            walkers={walkers}
            onGreet={greet}
            speakingId={peerBubble.activeId}
            travellerGreeting={t('worldTravellerGreeting')}
            selfGreeting={t('worldSelfGreeting')}
            travellerLang={t('worldTravellerLang')}
          />
        </div>
        <button type="button" className="world-rotate world-rotate-left" onClick={() => rotate(-1)} aria-label={t('worldRotateLeft')}>
          ‹
        </button>
        <button type="button" className="world-rotate world-rotate-right" onClick={() => rotate(1)} aria-label={t('worldRotateRight')}>
          ›
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
  // World itself is wave 2, but its buildings can point at wave-3 features
  // (Collection, Community) that aren't necessarily unlocked yet just
  // because World is reachable — check each target independently.
  const collectionUnlocked = useIsNavRouteUnlocked('/collection');
  const forestUnlocked = useIsNavRouteUnlocked('/forest');
  const communityUnlocked = useIsNavRouteUnlocked('/community');
  const timelineUnlocked = useIsNavRouteUnlocked('/timeline');
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
      cta = collectionUnlocked ? (
        <Link className="btn btn-primary" to="/collection" onClick={onClose}>
          {t('navCollection')}
        </Link>
      ) : null;
      break;
    case 'garden':
      body = <p>{t('civicTapGarden')}</p>;
      cta = forestUnlocked ? (
        <Link className="btn btn-primary" to="/forest" onClick={onClose}>
          {t('navForest')}
        </Link>
      ) : null;
      break;
    case 'care':
      body = <p>{t('civicTapCare')}</p>;
      cta = communityUnlocked ? (
        <Link className="btn btn-primary" to="/community" onClick={onClose}>
          {t('navCommunity')}
        </Link>
      ) : null;
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
      cta = communityUnlocked ? (
        <Link className="btn btn-primary" to="/community" onClick={onClose}>
          {t('navCommunity')}
        </Link>
      ) : null;
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
      cta = timelineUnlocked ? (
        <Link className="btn btn-primary" to="/timeline" onClick={onClose}>
          {t('navTimeline')}
        </Link>
      ) : null;
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
