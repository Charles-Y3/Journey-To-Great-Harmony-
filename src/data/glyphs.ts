import { localized, type Localized } from '../i18n/types';

export type GlyphTier = 'beginner' | 'intermediate';

export interface GlyphPiece {
  id: string;
  /** Width in unit cells. */
  w: number;
  /** Height in unit cells. */
  h: number;
  /** Solved-state top row (0-indexed). */
  solvedR: number;
  /** Solved-state left column (0-indexed). */
  solvedC: number;
}

interface GlyphBase {
  id: string;
  /** Modern Chinese character — list label / a11y; beginner also renders this as the puzzle face. */
  character: string;
  tier: GlyphTier;
  title: Localized<string>;
  meaning: Localized<string>;
  teaching: Localized<string>;
}

export interface BeginnerGlyph extends GlyphBase {
  tier: 'beginner';
  /** Board size N for an N×N sliding puzzle (one cell empty). */
  size: 3 | 4;
  /**
   * Which grid cell (0-indexed, row-major) is the permanently-empty slot
   * in the solved state. Defaults to the last cell (bottom-right) when omitted.
   */
  solvedEmptyIndex?: number;
}

export interface IntermediateGlyph extends GlyphBase {
  tier: 'intermediate';
  /** Public URL of the oracle-bone SVG. */
  oracleSvg: string;
  board: { cols: number; rows: number };
  pieces: GlyphPiece[];
}

export type VirtueGlyph = BeginnerGlyph | IntermediateGlyph;

/**
 * Shared 4×5 Klotski layout for all 八德 puzzles (18 covered + 2 empty).
 * Pieces are only 2×1, 1×2, and 1×1 — no 2×2 blocks.
 */
const BAODE_PIECES: GlyphPiece[] = [
  { id: 'a', w: 2, h: 1, solvedR: 0, solvedC: 0 },
  { id: 'b', w: 2, h: 1, solvedR: 0, solvedC: 2 },
  { id: 'c', w: 1, h: 2, solvedR: 1, solvedC: 0 },
  { id: 'd', w: 1, h: 1, solvedR: 1, solvedC: 1 },
  { id: 'e', w: 1, h: 1, solvedR: 1, solvedC: 2 },
  { id: 'f', w: 1, h: 2, solvedR: 1, solvedC: 3 },
  { id: 'g', w: 2, h: 1, solvedR: 2, solvedC: 1 },
  { id: 'h', w: 1, h: 2, solvedR: 3, solvedC: 0 },
  { id: 'i', w: 1, h: 1, solvedR: 3, solvedC: 1 },
  { id: 'j', w: 1, h: 1, solvedR: 3, solvedC: 2 },
  { id: 'k', w: 1, h: 1, solvedR: 3, solvedC: 3 },
  { id: 'l', w: 1, h: 1, solvedR: 4, solvedC: 1 },
];

const BAODE_BOARD = { cols: 4, rows: 5 } as const;

function baode(
  id: string,
  character: string,
  svgFile: string,
  title: Localized<string>,
  meaning: Localized<string>,
  teaching: Localized<string>,
): IntermediateGlyph {
  return {
    id,
    character,
    tier: 'intermediate',
    // BASE_URL respects vite.config `base: './'` so public assets resolve in prod.
    oracleSvg: `${import.meta.env.BASE_URL}glyphs/oracle/${svgFile}`,
    board: { cols: BAODE_BOARD.cols, rows: BAODE_BOARD.rows },
    pieces: BAODE_PIECES,
    title,
    meaning,
    teaching,
  };
}

/** Beginner sliding puzzles — 五常, modern display font. */
export const BEGINNER_GLYPHS: BeginnerGlyph[] = [
  {
    id: 'ren',
    character: '仁',
    tier: 'beginner',
    size: 3,
    // Chinese titles are the gloss only — the character is already shown
    // beside the title in the UI, so "仁 — 仁爱" / "智 — 智" read as repeats
    // (and Traditional conversion turns "義 — 义" into "義 — 義").
    title: localized('Ren — Benevolence', '仁爱'),
    meaning: localized(
      'Care for others as people like yourself — the heart of Confucian virtue.',
      '爱人如己，以他人为人 — 儒家德性的核心。',
    ),
    teaching: localized(
      'Ren 仁 is not soft sentiment. It is the steady choice to treat the person in front of you as fully human — in family first, then outward, ring by ring, toward Great Harmony.',
      '仁不是软弱的情绪。它是坚定地选择，把眼前的人当作完整的人来对待 — 先从家庭开始，再一圈一圈向外，通向大同。',
    ),
  },
  {
    id: 'yi',
    character: '義',
    tier: 'beginner',
    size: 3,
    title: localized('Yi — Righteousness', '道义'),
    meaning: localized(
      'Doing what ought to be done, even when it costs you.',
      '做应当做的事，即便要付出代价。',
    ),
    teaching: localized(
      'Yi 義 is the spine of character: the courage to choose the fitting action over the easy or profitable one. Without yi, kindness becomes whim.',
      '义是品格的脊梁：勇于选择合宜的行动，而不是容易或有利的。没有义，善意会沦为随意。',
    ),
  },
  {
    id: 'li',
    character: '禮',
    tier: 'beginner',
    size: 3,
    title: localized('Li — Ritual Propriety', '礼仪'),
    meaning: localized(
      'Forms of respect that train the heart — manners with meaning.',
      '带着敬意的形式，用以陶冶内心 — 有意义的礼节。',
    ),
    teaching: localized(
      'Li 禮 is practice made visible: greetings, sharing, restraint. Empty ritual hardens; living ritual reminds us we belong to one another.',
      '礼是可见的践行：问候、分享、节制。空洞的仪式使人僵硬；有生命的礼，提醒我们彼此相连。',
    ),
  },
  {
    id: 'zhi',
    character: '智',
    tier: 'beginner',
    size: 3,
    title: localized('Zhi — Wisdom', '智慧'),
    meaning: localized(
      'Clear seeing that joins understanding with how you live.',
      '清明的看见，把理解与如何生活连在一起。',
    ),
    teaching: localized(
      'Zhi 智 is not cleverness alone. It is discernment — knowing when to speak, when to wait, and how a small truth changes the next step you take.',
      '智不只是聪明。它是明辨 — 知道何时开口、何时等待，以及一个小小的真相如何改变你的下一步。',
    ),
  },
  {
    id: 'xin',
    character: '信',
    tier: 'beginner',
    size: 3,
    title: localized('Xin — Trustworthiness', '诚信'),
    meaning: localized(
      'Keeping your word so others can rest their trust on you.',
      '信守承诺，使他人可以把信赖安放在你身上。',
    ),
    teaching: localized(
      'Xin 信 is the bridge of community. A promise kept is a stone in the Great Harmony World; a promise broken is a crack others must walk around.',
      '信是共同体的桥梁。守住的承诺，是大同世界里的一块石头；失信，则是他人必须绕行的裂隙。',
    ),
  },
];

/** Intermediate Klotski puzzles — 八德, oracle-bone SVG faces. */
export const INTERMEDIATE_GLYPHS: IntermediateGlyph[] = [
  baode(
    'xiao',
    '孝',
    'xiao.svg',
    localized('Xiao — Filial Devotion', '孝道'),
    localized(
      'Care and respect for parents and elders — the root of humane feeling.',
      '对父母与长辈的关爱与敬重 — 仁心的根本。',
    ),
    localized(
      'Xiao 孝 begins at home: gratitude in small acts, patience when care is hard. From that root, respect for others can grow outward.',
      '孝从家庭开始：在小事上感恩，在照护艰难时仍有耐心。从这根本，对他人的敬重才能向外生长。',
    ),
  ),
  baode(
    'ti',
    '悌',
    'ti.svg',
    localized('Ti — Fraternal Respect', '悌敬'),
    localized(
      'Kindness and deference among siblings and peers — harmony in the near circle.',
      '兄弟与同伴之间的和善与礼让 — 近处的和谐。',
    ),
    localized(
      'Ti 悌 is how we practice equality without rivalry: listen first, yield when pride would win, and keep the circle warm.',
      '悌是练习平等而不竞争：先听，在骄傲要赢时退让，并让圈子保持温暖。',
    ),
  ),
  baode(
    'zhong',
    '忠',
    'zhong.svg',
    localized('Zhong — Loyalty', '忠诚'),
    localized(
      'Wholehearted dedication to what you serve — person, duty, or shared good.',
      '对所事之人、之责、之公的全心尽己。',
    ),
    localized(
      'Zhong 忠 is not blind obedience. It is steady fidelity to a worthy trust — and the courage to correct course when loyalty would otherwise become harm.',
      '忠不是盲目服从。它是对值得托付之事的稳定守信 — 以及当忠诚将变为伤害时，纠正航向的勇气。',
    ),
  ),
  baode(
    'xin-oracle',
    '信',
    'xin.svg',
    localized('Xin — Trustworthiness', '诚信'),
    localized(
      'Keeping your word so others can rest their trust on you.',
      '信守承诺，使他人可以把信赖安放在你身上。',
    ),
    localized(
      'In oracle bone form, Xin 信 still names the same bridge: a promise kept is a stone others can stand on.',
      '甲骨之形中，信仍是同一座桥：守住的承诺，是他人可以立足的石头。',
    ),
  ),
  baode(
    'li-oracle',
    '禮',
    'li.svg',
    localized('Li — Ritual Propriety', '礼仪'),
    localized(
      'Forms of respect that train the heart — manners with meaning.',
      '带着敬意的形式，用以陶冶内心 — 有意义的礼节。',
    ),
    localized(
      'Li 禮 in early script already points to offering and measure: respect made visible, not empty show.',
      '早期字形中的礼已指向奉献与法度：可见的敬意，而非空洞的表演。',
    ),
  ),
  baode(
    'yi-oracle',
    '義',
    'yi.svg',
    localized('Yi — Righteousness', '道义'),
    localized(
      'Doing what ought to be done, even when it costs you.',
      '做应当做的事，即便要付出代价。',
    ),
    localized(
      'Yi 義 is the fitting action — chosen when ease and profit pull the other way.',
      '义是合宜的行动 — 在安逸与利益拉向另一边时仍被选择。',
    ),
  ),
  baode(
    'lian',
    '廉',
    'lian.svg',
    localized('Lian — Integrity', '廉洁'),
    localized(
      'Clean hands and a clear conscience — refusing what you should not take.',
      '手净心明 — 拒绝不该取的。',
    ),
    localized(
      'Lian 廉 guards the commons: when you do not skim advantage, trust can gather around you.',
      '廉洁守护公共：当你不捞取私利，信赖才能聚集在你周围。',
    ),
  ),
  baode(
    'chi',
    '恥',
    'chi.svg',
    localized('Chi — Sense of Shame', '知耻'),
    localized(
      'A living conscience that flinches from what is base — and steers you back.',
      '对卑劣之事心生退缩的良心 — 并引领你回头。',
    ),
    localized(
      'Chi 恥 is not humiliation for show. It is the inner check that keeps character from rotting when no one is watching.',
      '耻不是给人看的羞辱。它是无人看见时，仍使品格不腐的内在约束。',
    ),
  ),
];

/** All glyphs (beginner then intermediate) — used by i18n gen and lookups. */
export const GLYPHS: VirtueGlyph[] = [...BEGINNER_GLYPHS, ...INTERMEDIATE_GLYPHS];

export const ALL_GLYPHS = GLYPHS;

export function glyphById(id: string): VirtueGlyph | undefined {
  return GLYPHS.find((g) => g.id === id);
}

export function isBeginnerGlyph(g: VirtueGlyph): g is BeginnerGlyph {
  return g.tier === 'beginner';
}

export function isIntermediateGlyph(g: VirtueGlyph): g is IntermediateGlyph {
  return g.tier === 'intermediate';
}

/** Intermediate unlocks only after every beginner glyph has been cleared once. */
export function beginnerTierCleared(completedGlyphs: readonly string[]): boolean {
  return BEGINNER_GLYPHS.every((g) => completedGlyphs.includes(g.id));
}
