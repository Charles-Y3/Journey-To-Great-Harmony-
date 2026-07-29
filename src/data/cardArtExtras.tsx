// Symbolic medallion arts for non-figure wisdom cards + Ptahhotep bust.
// Same 200×200 Frame / ink / accent language as cardArt.tsx.

import type { SVGProps } from 'react';

function Frame(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" {...props} />;
}

function Shoulders({ fill = 'var(--ink)', flare = 60 }: { fill?: string; flare?: number }) {
  const x0 = 100 - flare;
  const x1 = 100 + flare;
  return <path d={`M${x0 - 8} 200 Q${x0} 140 100 132 Q${x1} 140 ${x1 + 8} 200 Z`} fill={fill} />;
}

function Head({ r = 34, cy = 80 }: { r?: number; cy?: number }) {
  return <circle cx="100" cy={cy} r={r} fill="var(--ink)" />;
}

/** Ptahhotep — Egyptian vizier bust with Ma'at feather (gold), matching figure medallions. */
export function PtahhotepArt() {
  return (
    <Frame>
      <Shoulders flare={56} />
      <Head />
      <path d="M128 74 q10 4 8 14 q-2 6 -10 3 Z" fill="var(--ink)" />
      <path d="M100 46 Q88 20 100 4 Q112 20 100 46 Z" fill="var(--gold)" />
      <path d="M100 46 L100 10" stroke="var(--surface)" strokeWidth="1.5" opacity="0.45" />
      <rect x="70" y="118" width="60" height="8" rx="2" fill="var(--gold)" opacity="0.7" />
    </Frame>
  );
}

function Ring({ accent = 'var(--jade)' }: { accent?: string }) {
  return <circle cx="100" cy="100" r="72" fill="none" stroke={accent} strokeWidth="3" opacity="0.55" />;
}

export function WisdomArt() {
  return (
    <Frame>
      <Ring accent="var(--sky)" />
      <circle cx="100" cy="100" r="28" fill="var(--ink)" />
      <path d="M100 72 L108 100 L100 128 L92 100 Z" fill="var(--sky)" />
    </Frame>
  );
}

export function KindnessArt() {
  return (
    <Frame>
      <Ring />
      <path d="M100 130 C70 108 62 86 78 72 C88 64 100 72 100 72 C100 72 112 64 122 72 C138 86 130 108 100 130 Z" fill="var(--ink)" />
      <circle cx="100" cy="88" r="6" fill="var(--jade)" />
    </Frame>
  );
}

export function ForgivenessArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      <path d="M70 100 H130" stroke="var(--ink)" strokeWidth="8" strokeLinecap="round" />
      <path d="M118 82 L138 100 L118 118" fill="none" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function ServiceArt() {
  return (
    <Frame>
      <Ring />
      <path d="M100 55 L118 95 H82 Z" fill="var(--ink)" />
      <rect x="88" y="95" width="24" height="50" rx="3" fill="var(--ink)" />
      <circle cx="100" cy="70" r="5" fill="var(--jade)" />
    </Frame>
  );
}

export function HumilityArt() {
  return (
    <Frame>
      <Ring accent="var(--sky)" />
      <path d="M60 120 Q100 70 140 120" fill="none" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="100" cy="128" r="10" fill="var(--sky)" />
    </Frame>
  );
}

export function PatienceArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="var(--ink)" strokeWidth="8" />
      <path d="M100 72 V100 L120 112" fill="none" stroke="var(--gold)" strokeWidth="5" strokeLinecap="round" />
    </Frame>
  );
}

export function IntegrityArt() {
  return (
    <Frame>
      <Ring />
      <rect x="78" y="60" width="44" height="80" rx="4" fill="var(--ink)" />
      <path d="M78 80 H122" stroke="var(--jade)" strokeWidth="4" />
      <path d="M90 110 L98 120 L114 95" fill="none" stroke="var(--jade)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function ReflectionArt() {
  return (
    <Frame>
      <Ring accent="var(--amethyst)" />
      <ellipse cx="100" cy="100" rx="36" ry="48" fill="var(--ink)" />
      <ellipse cx="100" cy="100" rx="22" ry="32" fill="none" stroke="var(--amethyst)" strokeWidth="3" />
    </Frame>
  );
}

export function DiscernmentArt() {
  return (
    <Frame>
      <Ring accent="var(--sky)" />
      <circle cx="100" cy="100" r="34" fill="var(--ink)" />
      <circle cx="100" cy="100" r="14" fill="var(--sky)" />
      <circle cx="100" cy="100" r="5" fill="var(--surface)" />
    </Frame>
  );
}

export function AwarenessArt() {
  return (
    <Frame>
      <Ring />
      <path d="M40 100 Q100 50 160 100 Q100 150 40 100 Z" fill="var(--ink)" />
      <circle cx="100" cy="100" r="16" fill="var(--jade)" />
    </Frame>
  );
}

export function GenerosityArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      <path d="M70 90 H130 V130 H70 Z" fill="var(--ink)" />
      <path d="M85 90 V70 H115 V90" fill="none" stroke="var(--gold)" strokeWidth="6" />
      <circle cx="100" cy="110" r="8" fill="var(--gold)" />
    </Frame>
  );
}

export function CourageArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      <path d="M100 55 L130 145 H70 Z" fill="var(--ink)" />
      <path d="M100 70 V120" stroke="var(--gold)" strokeWidth="5" />
    </Frame>
  );
}

export function ListeningArt() {
  return (
    <Frame>
      <Ring accent="var(--sky)" />
      <path d="M85 70 Q60 100 85 130" fill="none" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round" />
      <path d="M105 78 Q90 100 105 122" fill="none" stroke="var(--sky)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="125" cy="100" r="10" fill="var(--ink)" />
    </Frame>
  );
}

export function SolidarityArt() {
  return (
    <Frame>
      <Ring />
      <circle cx="78" cy="100" r="22" fill="var(--ink)" />
      <circle cx="122" cy="100" r="22" fill="var(--ink)" />
      <circle cx="100" cy="100" r="14" fill="var(--jade)" />
    </Frame>
  );
}

export function PerseveranceArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      <path d="M55 130 L100 55 L145 130" fill="none" stroke="var(--ink)" strokeWidth="10" strokeLinejoin="round" />
      <path d="M75 130 H125" stroke="var(--gold)" strokeWidth="8" strokeLinecap="round" />
    </Frame>
  );
}

export function PerspectiveArt() {
  return (
    <Frame>
      <Ring accent="var(--sky)" />
      <path d="M50 130 L100 60 L150 130 Z" fill="var(--ink)" />
      <circle cx="100" cy="105" r="12" fill="var(--sky)" />
    </Frame>
  );
}

export function RenLivingArt() {
  return (
    <Frame>
      <Ring accent="var(--jade)" />
      <circle cx="100" cy="88" r="26" fill="var(--ink)" />
      <path d="M70 130 Q100 150 130 130" fill="none" stroke="var(--ink)" strokeWidth="12" strokeLinecap="round" />
      <path d="M88 82 H112 M100 70 V94" stroke="var(--jade)" strokeWidth="4" strokeLinecap="round" />
    </Frame>
  );
}

export function JunziArt() {
  return (
    <Frame>
      <Ring accent="var(--jade)" />
      <rect x="72" y="55" width="56" height="90" rx="6" fill="var(--ink)" />
      <path d="M72 85 H128" stroke="var(--jade)" strokeWidth="4" />
      <circle cx="100" cy="68" r="8" fill="var(--jade)" />
    </Frame>
  );
}

export function ClearSeeingArt() {
  return (
    <Frame>
      <Ring accent="var(--sky)" />
      <circle cx="100" cy="100" r="42" fill="var(--ink)" />
      <path d="M70 100 H130 M100 70 V130" stroke="var(--sky)" strokeWidth="5" />
      <circle cx="100" cy="100" r="10" fill="var(--surface)" />
    </Frame>
  );
}

export function WeekArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const a = ((i - 1.5) / 7) * Math.PI * 2 - Math.PI / 2;
        const x = 100 + Math.cos(a) * 40;
        const y = 100 + Math.sin(a) * 40;
        return <circle key={i} cx={x} cy={y} r="8" fill={i === 3 ? 'var(--gold)' : 'var(--ink)'} />;
      })}
    </Frame>
  );
}

export function MoonArt() {
  return (
    <Frame>
      <Ring accent="var(--amethyst)" />
      <circle cx="100" cy="100" r="40" fill="var(--ink)" />
      <circle cx="118" cy="90" r="32" fill="var(--surface)" />
      <circle cx="118" cy="90" r="32" fill="var(--amethyst)" opacity="0.25" />
    </Frame>
  );
}

export function ConstancyArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      <path d="M55 120 Q100 50 145 120" fill="none" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="100" cy="70" r="14" fill="var(--gold)" />
      <path d="M70 135 H130" stroke="var(--gold)" strokeWidth="6" strokeLinecap="round" />
    </Frame>
  );
}

export function BridgeArt() {
  return (
    <Frame>
      <Ring accent="var(--sky)" />
      <path d="M40 130 Q100 70 160 130" fill="none" stroke="var(--ink)" strokeWidth="12" />
      <path d="M55 130 V150 M145 130 V150" stroke="var(--sky)" strokeWidth="8" strokeLinecap="round" />
    </Frame>
  );
}

export function HorizonArt() {
  return (
    <Frame>
      <Ring accent="var(--gold)" />
      <path d="M40 110 H160" stroke="var(--ink)" strokeWidth="8" strokeLinecap="round" />
      <circle cx="100" cy="78" r="22" fill="var(--gold)" />
      <path d="M60 130 L100 110 L140 130" fill="none" stroke="var(--ink)" strokeWidth="6" />
    </Frame>
  );
}

export function SecondWalkArt() {
  return (
    <Frame>
      <Ring />
      <path d="M70 140 Q85 80 100 140 Q115 80 130 140" fill="none" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="85" cy="70" r="10" fill="var(--jade)" />
      <circle cx="115" cy="70" r="10" fill="var(--jade)" />
    </Frame>
  );
}

export function KingArt() {
  return (
    <Frame>
      <Shoulders flare={58} />
      <Head />
      <path d="M70 55 L85 70 L100 55 L115 70 L130 55 L125 85 H75 Z" fill="var(--gold)" />
    </Frame>
  );
}
