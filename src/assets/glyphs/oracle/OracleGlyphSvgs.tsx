import type { ReactNode } from 'react';

/** Inline oracle-bone-style pictographs for 八德 (filled, high-contrast). */

const wrap = (paths: ReactNode) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="oracle-inline-svg"
    aria-hidden="true"
  >
    <g fill="currentColor">{paths}</g>
  </svg>
);

const GLYPHS: Record<string, ReactNode> = {
  孝: wrap(
    <>
      <path d="M50 8c-8 0-14 5-16 12-6-2-12 2-10 8 3 2 7 1 10-1 2 8 8 14 16 14s14-6 16-14c3 2 7 3 10 1 2-6-4-10-10-8C64 13 58 8 50 8z" />
      <path d="M42 40h16l-2 10H44z" />
      <path d="M38 48c-4 2-6 8-4 14h32c2-6 0-12-4-14H38z" />
      <circle cx="50" cy="68" r="8" />
      <path d="M46 76h8v14h-8z" />
      <path d="M34 90h32v6H34z" />
      <path d="M28 72c-6 4-10 12-6 18h10c-2-4 0-10 4-14z" />
      <path d="M72 72c6 4 10 12 6 18H68c2-4 0-10-4-14z" />
    </>,
  ),
  悌: wrap(
    <>
      <circle cx="50" cy="16" r="7" />
      <path d="M44 22h12v8H44z" />
      <path d="M28 30h44v8H28z" />
      <path d="M34 38h8v28h-8z" />
      <path d="M58 38h8v28h-8z" />
      <path d="M22 40c0 18 8 28 20 34v-8c-8-4-12-12-12-26z" />
      <path d="M78 40c0 18-8 28-20 34v-8c8-4 12-12 12-26z" />
      <path d="M40 66h20v8H40z" />
      <path d="M36 78h8v14h-8z" />
      <path d="M56 78h8v14h-8z" />
      <path d="M30 92h16v5H30z" />
      <path d="M54 92h16v5H54z" />
    </>,
  ),
  忠: wrap(
    <>
      <rect x="46" y="6" width="8" height="40" rx="2" />
      <path d="M28 18h44v10H28z" />
      <path d="M32 20c-2 8 2 18 18 18s20-10 18-18c-4 6-10 10-18 10s-14-4-18-10z" />
      <path d="M32 56c-8 4-14 16-8 28 8 12 18 16 26 16s18-4 26-16c6-12 0-24-8-28-4 8-10 12-18 12s-14-4-18-12z" />
      <rect x="46" y="62" width="8" height="22" rx="2" />
    </>,
  ),
  信: wrap(
    <>
      <circle cx="28" cy="18" r="8" />
      <path d="M24 26h8v30h-8z" />
      <path d="M14 40h28v7H14z" />
      <path d="M18 56l-10 28h10l6-20 6 20h10L30 56z" />
      <path d="M52 14h36v7H52z" />
      <path d="M52 28h36v7H52z" />
      <path d="M52 42h28v7H52z" />
      <path d="M58 14h7v48c0 12 8 18 18 18v7c-16 0-25-10-25-25V14z" />
    </>,
  ),
  禮: wrap(
    <>
      <path d="M50 6l6 12H44z" />
      <rect x="36" y="16" width="28" height="6" rx="1" />
      <rect x="26" y="26" width="48" height="16" rx="3" />
      <rect x="32" y="42" width="6" height="12" />
      <rect x="47" y="42" width="6" height="12" />
      <rect x="62" y="42" width="6" height="12" />
      <path d="M18 54h64v8H18z" />
      <path d="M26 62h8v20h-8z" />
      <path d="M66 62h8v20h-8z" />
      <path d="M20 82h60v8H20z" />
      <rect x="38" y="66" width="24" height="10" rx="2" />
    </>,
  ),
  義: wrap(
    <>
      <path d="M30 10h40v7H30z" />
      <path d="M34 8h7v22h-7z" />
      <path d="M46.5 6h7v24h-7z" />
      <path d="M59 8h7v22h-7z" />
      <path d="M28 30h44v8H28z" />
      <path d="M46 38h8v18h-8z" />
      <path d="M30 56h40v8H30z" />
      <path d="M36 64c-6 10-4 24 4 30h8c-6-6-8-16-4-26z" />
      <path d="M64 64c6 10 4 24-4 30h-8c6-6 8-16 4-26z" />
      <path d="M40 78h20v7H40z" />
    </>,
  ),
  廉: wrap(
    <>
      <path d="M12 34L50 8l38 26v8H12z" />
      <path d="M22 40h8v16h-8z" />
      <path d="M70 40h8v16h-8z" />
      <path d="M22 56h56v8H22z" />
      <path d="M34 40h8v16h-8z" />
      <path d="M58 40h8v16h-8z" />
      <path d="M30 64h40v8H30z" />
      <path d="M40 72h8v18h-8z" />
      <path d="M52 72h8v18h-8z" />
      <path d="M32 90h36v6H32z" />
    </>,
  ),
  恥: wrap(
    <>
      <path d="M22 12c-10 6-12 20-6 32 6 10 16 14 26 10l-4-8c-6 2-12 0-16-6-4-8-2-16 4-20z" />
      <path d="M28 18c8 2 14 10 14 20h8c0-14-8-26-20-28z" />
      <path d="M20 48h32v7H20z" />
      <path d="M32 55h8v14h-8z" />
      <path d="M56 40c-6 4-14 14-10 28 8 14 18 18 26 18s18-4 26-18c4-14-4-24-10-28-4 10-12 16-20 16s-16-6-20-16z" />
      <rect x="68" y="50" width="8" height="20" rx="2" />
    </>,
  ),
};

export function OracleGlyphSvg({ character }: { character: string }) {
  return <>{GLYPHS[character] ?? <span className="oracle-inline-fallback">{character}</span>}</>;
}
