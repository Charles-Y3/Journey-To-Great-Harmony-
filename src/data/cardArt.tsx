// Hand-drawn SVG portrait illustrations for the Wisdom Cards' full-screen
// reveal (Collection.tsx). These are stylized "engraved medallion"
// silhouettes, not photorealistic portraits — there is no image-generation
// tool available in this environment, and a coin/cameo-style silhouette
// fits the "collectible card" theme better than a crude fake photo would
// anyway. The silhouette itself uses `var(--ink)` (the app's theme-aware
// text colour) so it reads as dark ink on parchment in light mode and pale
// gilt on dark backgrounds in dark mode; each figure gets one distinguishing
// accent colour drawn from the app's existing palette tokens, tied loosely
// to their tradition (jade for Chinese sages, sky for Greek philosophers,
// gold for Egyptian/divine imagery, amethyst for Sufi mysticism).
//
// Every illustration is a 200x200 viewBox rendered into a circular frame
// (see .card-modal-portrait in global.css) — keep the subject within the
// circle inscribed at centre (100,100) radius ~96, since the corners of
// the square are clipped by that circular mask.

import type { SVGProps } from 'react';

function Frame(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" {...props} />;
}

/** Generic draped-shoulders/robe base shared by every bust. */
function Shoulders({ fill = 'var(--ink)', flare = 60 }: { fill?: string; flare?: number }) {
  const x0 = 100 - flare;
  const x1 = 100 + flare;
  return <path d={`M${x0 - 8} 200 Q${x0} 140 100 132 Q${x1} 140 ${x1 + 8} 200 Z`} fill={fill} />;
}

function Head({ r = 34, cy = 80 }: { r?: number; cy?: number }) {
  return <circle cx="100" cy={cy} r={r} fill="var(--ink)" />;
}

export function MaatArt() {
  return (
    <Frame>
      <Shoulders flare={54} />
      <Head />
      {/* Egyptian-style profile nose */}
      <path d="M130 76 q12 5 9 16 q-3 7 -12 4 Z" fill="var(--ink)" />
      {/* single ostrich feather of Ma'at */}
      <path d="M100 46 Q88 22 100 6 Q112 22 100 46 Z" fill="var(--gold)" />
      <path d="M100 46 L100 12" stroke="var(--surface)" strokeWidth="1.5" opacity="0.5" />
    </Frame>
  );
}

export function SocratesArt() {
  return (
    <Frame>
      <Shoulders flare={58} />
      <Head r={33} />
      {/* short round beard */}
      <path d="M76 92 Q100 128 124 92 L124 104 Q100 118 76 104 Z" fill="var(--ink)" />
      {/* balding highlight */}
      <ellipse cx="100" cy="54" rx="14" ry="8" fill="var(--surface)" opacity="0.35" />
      <circle cx="100" cy="80" r="34" fill="none" stroke="var(--sky)" strokeWidth="3" opacity="0.6" />
    </Frame>
  );
}

export function AristotleArt() {
  return (
    <Frame>
      <Shoulders flare={62} />
      {/* himation drape accent over one shoulder */}
      <path d="M150 150 Q120 130 100 140 L108 158 Q132 152 150 174 Z" fill="var(--sky)" opacity="0.85" />
      <Head r={33} />
      {/* full curled beard */}
      <path d="M72 90 Q100 132 128 90 L130 110 Q100 126 70 110 Z" fill="var(--ink)" />
      {/* curly hair */}
      <path d="M68 70 Q66 44 100 42 Q134 44 132 70 Q118 56 100 56 Q82 56 68 70 Z" fill="var(--ink)" />
    </Frame>
  );
}

export function ConfuciusArt() {
  return (
    <Frame>
      <Shoulders flare={64} />
      {/* robe collar */}
      <path d="M76 150 Q100 168 124 150 L124 168 Q100 184 76 168 Z" fill="var(--jade)" opacity="0.85" />
      <Head r={32} cy={78} />
      {/* long thin beard */}
      <path d="M84 100 Q100 150 116 100 Q108 128 100 130 Q92 128 84 100 Z" fill="var(--ink)" />
      {/* scholar's cap (guan) */}
      <path d="M72 58 Q100 30 128 58 L128 48 Q100 24 72 48 Z" fill="var(--ink)" />
      <rect x="94" y="20" width="12" height="16" rx="2" fill="var(--ink)" />
    </Frame>
  );
}

export function LaoziArt() {
  return (
    <Frame>
      {/* ox silhouette beneath */}
      <path d="M40 196 Q40 172 66 168 Q78 150 100 154 Q122 150 132 168 Q160 172 160 196 Z" fill="var(--jade)" opacity="0.55" />
      <path d="M62 158 Q58 146 66 140 Q70 148 68 158 Z" fill="var(--jade)" opacity="0.55" />
      <Shoulders flare={50} />
      <Head r={30} cy={92} />
      {/* very long flowing beard */}
      <path d="M78 108 Q100 168 122 108 Q112 140 100 144 Q88 140 78 108 Z" fill="var(--ink)" />
      {/* topknot */}
      <circle cx="100" cy="58" r="10" fill="var(--ink)" />
    </Frame>
  );
}

export function MenciusArt() {
  return (
    <Frame>
      <Shoulders flare={58} />
      {/* a sprout held in front, symbolizing the "four sprouts" */}
      <path d="M100 175 Q94 158 100 144 Q106 158 100 175 Z" fill="var(--jade)" />
      <path d="M100 150 Q88 144 84 132" stroke="var(--jade)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M100 150 Q112 144 116 132" stroke="var(--jade)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Head r={32} cy={78} />
      <path d="M78 98 Q100 122 122 98 L122 112 Q100 124 78 112 Z" fill="var(--ink)" />
      <path d="M74 62 Q100 42 126 62 L126 52 Q100 36 74 52 Z" fill="var(--ink)" />
    </Frame>
  );
}

export function BuddhaArt() {
  return (
    <Frame>
      {/* bodhi leaf behind */}
      <path d="M100 20 Q60 40 66 84 Q100 96 134 84 Q140 40 100 20 Z" fill="var(--gold)" opacity="0.3" />
      <Shoulders flare={62} fill="var(--ink)" />
      {/* draped robe accent off one shoulder */}
      <path d="M60 150 Q90 132 100 140 L96 160 Q70 168 56 190 Z" fill="var(--gold)" opacity="0.8" />
      <Head r={32} cy={82} />
      {/* ushnisha top-knot */}
      <ellipse cx="100" cy="48" rx="10" ry="12" fill="var(--ink)" />
      {/* long earlobes */}
      <ellipse cx="70" cy="86" rx="5" ry="12" fill="var(--ink)" />
      <ellipse cx="130" cy="86" rx="5" ry="12" fill="var(--ink)" />
      {/* small lotus base */}
      <path d="M76 194 Q100 178 124 194 Q100 188 76 194 Z" fill="var(--gold)" />
    </Frame>
  );
}

export function JesusArt() {
  return (
    <Frame>
      {/* halo */}
      <circle cx="100" cy="76" r="46" fill="none" stroke="var(--gold)" strokeWidth="4" opacity="0.75" />
      <Shoulders flare={60} />
      <Head r={32} cy={80} />
      {/* center-parted long hair */}
      <path d="M68 78 Q64 44 100 40 Q136 44 132 78 Q124 54 100 54 Q76 54 68 78 Z" fill="var(--ink)" />
      {/* short beard */}
      <path d="M80 96 Q100 124 120 96 L120 108 Q100 120 80 108 Z" fill="var(--ink)" />
    </Frame>
  );
}

export function RumiArt() {
  return (
    <Frame>
      <Shoulders flare={64} />
      {/* flowing dance robe accent */}
      <path d="M40 200 Q60 150 100 140 Q140 150 160 200 Z" fill="var(--amethyst)" opacity="0.35" />
      <Head r={32} cy={80} />
      {/* wrapped Sufi turban */}
      <path d="M70 62 Q100 30 130 62 Q130 46 100 40 Q70 46 70 62 Z" fill="var(--amethyst)" />
      <circle cx="100" cy="46" r="7" fill="var(--amethyst)" />
      {/* flowing beard */}
      <path d="M78 96 Q100 132 122 96 L122 112 Q100 126 78 112 Z" fill="var(--ink)" />
    </Frame>
  );
}

export function KantArt() {
  return (
    <Frame>
      <Shoulders flare={64} />
      {/* coat lapels */}
      <path d="M78 150 L100 172 L122 150 L122 168 L100 190 L78 168 Z" fill="var(--sky)" opacity="0.8" />
      {/* powdered wig with side curls and queue — a fixed pale tone (not a
          theme var) so the curls stay visible against both a light and a
          dark hero background, drawn first so the face circle (with its own
          outline) sits clearly forward of it rather than blending together */}
      <path d="M64 70 Q60 40 100 36 Q140 40 136 70 Q140 90 130 96 Q136 76 122 62 Q100 50 78 62 Q64 76 70 96 Q60 90 64 70 Z" fill="#e9ddc3" stroke="var(--ink)" strokeWidth="2" />
      <rect x="94" y="118" width="12" height="20" rx="5" fill="#e9ddc3" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="100" cy="84" r="26" fill="var(--ink)" stroke="#e9ddc3" strokeWidth="2" />
    </Frame>
  );
}

export function GandhiKingArt() {
  return (
    <Frame>
      {/* two overlapping busts */}
      <path d="M14 200 Q16 152 62 142 Q100 150 100 200 Z" fill="var(--ink)" opacity="0.92" />
      <path d="M186 200 Q184 152 138 142 Q100 150 100 200 Z" fill="var(--ink)" />
      <circle cx="58" cy="96" r="27" fill="var(--ink)" opacity="0.92" />
      <circle cx="142" cy="96" r="27" fill="var(--ink)" />
      {/* Gandhi's round glasses */}
      <circle cx="49" cy="96" r="7" fill="none" stroke="var(--gold)" strokeWidth="2.5" />
      <circle cx="67" cy="96" r="7" fill="none" stroke="var(--gold)" strokeWidth="2.5" />
      <path d="M56 96 L60 96" stroke="var(--gold)" strokeWidth="2.5" />
      {/* King's collar & tie — a fixed pale tone so the collar reads against
          a dark hero background, not the theme surface colour it would blend into */}
      <path d="M130 132 L142 148 L154 132 L154 122 L130 122 Z" fill="#f2ece0" />
      <path d="M138 132 L142 150 L146 132 Z" fill="var(--seal)" />
      {/* shared dawn glow */}
      <circle cx="100" cy="60" r="10" fill="var(--gold)" opacity="0.7" />
    </Frame>
  );
}

/** A globe encircled by linked figures, for the Datong ("world shared by all") card. */
export function DatongArt() {
  const dots = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const x = 100 + Math.cos(angle) * 70;
    const y = 100 + Math.sin(angle) * 70;
    return { x, y };
  });
  return (
    <Frame>
      <circle cx="100" cy="100" r="70" fill="none" stroke="var(--gold)" strokeWidth="2" opacity="0.55" />
      <circle cx="100" cy="100" r="44" fill="var(--jade)" opacity="0.28" />
      <path d="M56 100 Q100 80 144 100 Q100 120 56 100 Z" fill="var(--jade)" opacity="0.5" />
      <path d="M100 56 Q120 100 100 144 Q80 100 100 56 Z" fill="var(--jade)" opacity="0.35" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={7} fill="var(--gold)" />
      ))}
    </Frame>
  );
}

/** Wuxing five-element line marks — for the Five Constants glyph milestone card. */
export function GlyphConstantsArt() {
  // Positions around a pentagon: Wood, Fire, Earth, Metal, Water (clockwise from top).
  const spots = [
    { x: 100, y: 36, kind: 'wood' as const },
    { x: 156, y: 76, kind: 'fire' as const },
    { x: 134, y: 148, kind: 'earth' as const },
    { x: 66, y: 148, kind: 'metal' as const },
    { x: 44, y: 76, kind: 'water' as const },
  ];
  return (
    <Frame>
      <circle cx="100" cy="100" r="78" fill="none" stroke="var(--line)" strokeWidth="2" />
      {spots.map((s, i) => {
        const n = spots[(i + 1) % spots.length]!;
        return (
          <path
            key={`arc-${i}`}
            d={`M${s.x} ${s.y} Q100 100 ${n.x} ${n.y}`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity="0.35"
          />
        );
      })}
      {spots.map((s) => (
        <g key={s.kind} transform={`translate(${s.x} ${s.y})`}>
          {s.kind === 'wood' && (
            <g stroke="#5a8f5a" strokeWidth="3.2" strokeLinecap="round">
              <path d="M-9 -12 V12" />
              <path d="M-3 -12 V12" />
              <path d="M3 -12 V12" />
              <path d="M9 -12 V12" />
            </g>
          )}
          {s.kind === 'fire' && (
            <g stroke="#b55a45" strokeWidth="3.2" strokeLinecap="round" fill="none">
              <path d="M-9 12 Q-12 0 -9 -12" />
              <path d="M-3 12 Q0 0 -3 -12" />
              <path d="M3 12 Q0 0 3 -12" />
              <path d="M9 12 Q12 0 9 -12" />
            </g>
          )}
          {s.kind === 'earth' && (
            <g stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" fill="none">
              <path d="M-14 -9 L-7 -4 L0 -9 L7 -4 L14 -9" />
              <path d="M-14 -3 L-7 2 L0 -3 L7 2 L14 -3" />
              <path d="M-14 3 L-7 8 L0 3 L7 8 L14 3" />
              <path d="M-14 9 L-7 14 L0 9 L7 14 L14 9" />
            </g>
          )}
          {s.kind === 'metal' && (
            <g stroke="var(--gold)" strokeWidth="3.2" strokeLinecap="round">
              <path d="M-14 -9 H14" />
              <path d="M-14 -3 H14" />
              <path d="M-14 3 H14" />
              <path d="M-14 9 H14" />
            </g>
          )}
          {s.kind === 'water' && (
            <g stroke="#4a7a9a" strokeWidth="3.2" strokeLinecap="round" fill="none">
              <path d="M-14 -9 Q-7 -14 0 -9 Q7 -4 14 -9" />
              <path d="M-14 -3 Q-7 -8 0 -3 Q7 2 14 -3" />
              <path d="M-14 3 Q-7 -2 0 3 Q7 8 14 3" />
              <path d="M-14 9 Q-7 4 0 9 Q7 14 14 9" />
            </g>
          )}
        </g>
      ))}
    </Frame>
  );
}

/** Bagua / trigram ring — for the Eight Virtues glyph milestone card. */
export function GlyphBaodeArt() {
  // Classic eight trigrams as 3-line stacks (yang = solid, yin = broken).
  const trigrams: [boolean, boolean, boolean][] = [
    [true, true, true], // 乾
    [true, true, false], // 兑
    [true, false, true], // 离
    [true, false, false], // 震
    [false, true, true], // 巽
    [false, true, false], // 坎
    [false, false, true], // 艮
    [false, false, false], // 坤
  ];
  return (
    <Frame>
      <circle cx="100" cy="100" r="78" fill="none" stroke="var(--jade)" strokeWidth="2.5" opacity="0.55" />
      <circle cx="100" cy="100" r="22" fill="var(--jade)" opacity="0.2" />
      <circle cx="100" cy="100" r="10" fill="var(--ink)" />
      <path d="M100 90 A10 10 0 0 1 100 110" fill="var(--surface)" />
      {trigrams.map((lines, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const cx = 100 + Math.cos(angle) * 52;
        const cy = 100 + Math.sin(angle) * 52;
        const deg = (angle * 180) / Math.PI + 90;
        return (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${deg})`}>
            {lines.map((yang, row) => {
              const y = -10 + row * 10;
              if (yang) {
                return <rect key={row} x={-14} y={y} width={28} height={5} rx={1} fill="var(--ink)" />;
              }
              return (
                <g key={row} fill="var(--ink)">
                  <rect x={-14} y={y} width={11} height={5} rx={1} />
                  <rect x={3} y={y} width={11} height={5} rx={1} />
                </g>
              );
            })}
          </g>
        );
      })}
    </Frame>
  );
}

/** Stacked ceremonial totem pole — for the Virtue Totems legendary card. */
export function GlyphTotemsArt() {
  return (
    <Frame>
      {/* pole */}
      <rect x="94" y="28" width="12" height="148" rx="2" fill="var(--ink)" opacity="0.85" />
      {/* top crest — sun / wing */}
      <path d="M100 22 L118 42 H82 Z" fill="var(--gold)" />
      <circle cx="100" cy="38" r="7" fill="var(--gold)" />
      {/* face 1 — ringed harmony */}
      <ellipse cx="100" cy="62" rx="28" ry="18" fill="var(--jade)" opacity="0.85" />
      <circle cx="90" cy="60" r="3.5" fill="var(--surface)" />
      <circle cx="110" cy="60" r="3.5" fill="var(--surface)" />
      <path d="M92 70 Q100 76 108 70" fill="none" stroke="var(--surface)" strokeWidth="2.5" />
      {/* face 2 — winged community */}
      <path d="M100 88 L132 108 H68 Z" fill="var(--ink)" />
      <path d="M68 108 Q52 100 48 88 Q62 96 72 100" fill="var(--gold)" opacity="0.9" />
      <path d="M132 108 Q148 100 152 88 Q138 96 128 100" fill="var(--gold)" opacity="0.9" />
      <circle cx="92" cy="102" r="3" fill="var(--surface)" />
      <circle cx="108" cy="102" r="3" fill="var(--surface)" />
      {/* face 3 — balance beam */}
      <rect x="70" y="118" width="60" height="22" rx="4" fill="var(--jade-deep)" opacity="0.9" />
      <rect x="78" y="124" width="18" height="10" rx="2" fill="var(--gold)" />
      <rect x="104" y="124" width="18" height="10" rx="2" fill="var(--gold)" />
      {/* face 4 — base creature */}
      <path d="M70 150 H130 L120 176 H80 Z" fill="var(--ink)" />
      <circle cx="88" cy="160" r="4" fill="var(--gold)" />
      <circle cx="112" cy="160" r="4" fill="var(--gold)" />
      <path d="M90 168 H110" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
      {/* pedestal */}
      <rect x="62" y="176" width="76" height="10" rx="2" fill="var(--gold)" opacity="0.75" />
    </Frame>
  );
}

export const CARD_ART: Record<string, () => JSX.Element> = {
  'card-maat': MaatArt,
  'card-socrates': SocratesArt,
  'card-aristotle': AristotleArt,
  'card-confucius': ConfuciusArt,
  'card-laozi': LaoziArt,
  'card-mencius': MenciusArt,
  'card-buddha': BuddhaArt,
  'card-jesus': JesusArt,
  'card-rumi': RumiArt,
  'card-kant': KantArt,
  'card-gandhi': GandhiKingArt,
  'card-datong': DatongArt,
  'card-glyph-constants': GlyphConstantsArt,
  'card-glyph-baode': GlyphBaodeArt,
  'card-glyph-totems': GlyphTotemsArt,
};
