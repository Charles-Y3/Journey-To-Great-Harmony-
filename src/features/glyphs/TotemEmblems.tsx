import type { SVGProps } from 'react';

function Medallion(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="totem-emblem-svg"
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      aria-hidden="true"
      {...props}
    />
  );
}

function Ring() {
  return (
    <>
      <circle cx="100" cy="100" r="88" fill="none" stroke="var(--gold)" strokeWidth="3" opacity="0.45" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="var(--jade)" strokeWidth="1.5" opacity="0.35" />
    </>
  );
}

/** Twin faces in a shared circle — harmony without bowl/mat layout. */
export function HarmonyEmblem() {
  return (
    <Medallion>
      <Ring />
      <circle cx="100" cy="100" r="62" fill="none" stroke="var(--gold)" strokeWidth="5" />
      {/* left face */}
      <circle cx="78" cy="100" r="22" fill="var(--jade)" opacity="0.85" />
      <circle cx="72" cy="96" r="3" fill="var(--surface)" />
      <path d="M70 108 Q78 114 86 108" fill="none" stroke="var(--surface)" strokeWidth="2" />
      {/* right face */}
      <circle cx="122" cy="100" r="22" fill="var(--jade)" opacity="0.85" />
      <circle cx="128" cy="96" r="3" fill="var(--surface)" />
      <path d="M114 108 Q122 114 130 108" fill="none" stroke="var(--surface)" strokeWidth="2" />
      {/* shared crest */}
      <circle cx="100" cy="72" r="8" fill="var(--gold)" opacity="0.9" />
    </Medallion>
  );
}

/** Ring of four seat-dots around empty center — gathering, not the puzzle table. */
export function CommunityEmblem() {
  return (
    <Medallion>
      <Ring />
      <ellipse cx="100" cy="100" rx="48" ry="36" fill="none" stroke="var(--gold)" strokeWidth="5" />
      <circle cx="100" cy="58" r="9" fill="var(--jade)" />
      <circle cx="100" cy="142" r="9" fill="var(--jade)" />
      <circle cx="148" cy="100" r="9" fill="var(--jade)" />
      <circle cx="52" cy="100" r="9" fill="var(--jade)" />
      <circle cx="100" cy="100" r="10" fill="none" stroke="var(--ink)" strokeWidth="2.5" opacity="0.5" />
    </Medallion>
  );
}

/** Symmetrical double-mask crest — evenness without fulcrum/cords. */
export function BalanceEmblem() {
  return (
    <Medallion>
      <Ring />
      <rect x="94" y="48" width="12" height="104" rx="2" fill="var(--ink)" opacity="0.8" />
      <rect x="58" y="88" width="84" height="14" rx="3" fill="var(--gold)" />
      {/* mirrored mask halves */}
      <path d="M58 70 Q78 52 100 70 Q100 100 78 108 Q58 100 58 70 Z" fill="var(--jade)" opacity="0.9" />
      <path d="M142 70 Q122 52 100 70 Q100 100 122 108 Q142 100 142 70 Z" fill="var(--jade)" opacity="0.9" />
      <circle cx="82" cy="78" r="3" fill="var(--surface)" />
      <circle cx="118" cy="78" r="3" fill="var(--surface)" />
      <path d="M70 130 H130" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" />
    </Medallion>
  );
}

/** Mirrored half-faces exchanging a mark — reciprocity without gifts/hands. */
export function ReciprocityEmblem() {
  return (
    <Medallion>
      <Ring />
      <path d="M40 60 Q70 40 100 100 Q70 160 40 140 Z" fill="var(--jade)" opacity="0.9" />
      <path d="M160 60 Q130 40 100 100 Q130 160 160 140 Z" fill="var(--ink)" opacity="0.85" />
      <circle cx="72" cy="92" r="4" fill="var(--surface)" />
      <circle cx="128" cy="92" r="4" fill="var(--gold)" />
      <rect x="88" y="88" width="24" height="24" rx="3" fill="none" stroke="var(--gold)" strokeWidth="3" />
      <path d="M96 100 H104 M100 96 V104" stroke="var(--gold)" strokeWidth="2.5" />
    </Medallion>
  );
}

/** Forward fierce crest with flame mark — courage without walker/storm path. */
export function CourageEmblem() {
  return (
    <Medallion>
      <Ring />
      <path d="M100 36 L140 70 L128 120 H72 L60 70 Z" fill="var(--ink)" opacity="0.9" />
      <path d="M100 44 L118 66 H82 Z" fill="var(--gold)" />
      <circle cx="86" cy="82" r="5" fill="var(--gold)" />
      <circle cx="114" cy="82" r="5" fill="var(--gold)" />
      <path d="M88 100 Q100 112 112 100" fill="none" stroke="var(--gold)" strokeWidth="3" />
      {/* flame mark on brow */}
      <path d="M100 58 Q94 48 100 38 Q106 48 100 58 Z" fill="#c45c4a" />
    </Medallion>
  );
}

/** Open-eye seal on a pillar segment — sincerity without word/path layout. */
export function SincerityEmblem() {
  return (
    <Medallion>
      <Ring />
      <rect x="86" y="40" width="28" height="120" rx="4" fill="var(--ink)" opacity="0.75" />
      <rect x="70" y="70" width="60" height="60" rx="6" fill="none" stroke="var(--seal)" strokeWidth="4" />
      <ellipse cx="100" cy="100" rx="18" ry="11" fill="none" stroke="var(--gold)" strokeWidth="3" />
      <circle cx="100" cy="100" r="5" fill="var(--gold)" />
      <circle cx="100" cy="100" r="2" fill="var(--ink)" />
      <rect x="78" y="152" width="44" height="10" rx="2" fill="var(--gold)" opacity="0.8" />
    </Medallion>
  );
}

const EMBLEMS: Record<string, () => JSX.Element> = {
  'totem-harmony': HarmonyEmblem,
  'totem-community': CommunityEmblem,
  'totem-balance': BalanceEmblem,
  'totem-reciprocity': ReciprocityEmblem,
  'totem-courage': CourageEmblem,
  'totem-sincerity': SincerityEmblem,
};

export function TotemEmblem({ totemId }: { totemId: string }) {
  const Emblem = EMBLEMS[totemId] ?? HarmonyEmblem;
  return <Emblem />;
}
