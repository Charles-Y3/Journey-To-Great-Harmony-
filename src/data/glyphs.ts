import { localized, type Localized } from '../i18n/types';

export interface VirtueGlyph {
  id: string;
  /** The Chinese character shown on the sliding board. */
  character: string;
  /** Board size N for an N×N sliding puzzle (one cell empty). */
  size: 3 | 4;
  /**
   * Which grid cell (0-indexed, row-major) is the permanently-empty slot
   * in the solved state. Defaults to the last cell (bottom-right) when
   * omitted. Not every character spreads its strokes evenly, so a
   * character whose bottom-right corner carries real detail should use a
   * different cell here instead — see 'ren' below.
   */
  solvedEmptyIndex?: number;
  title: Localized<string>;
  meaning: Localized<string>;
  teaching: Localized<string>;
}

/** Bonus sliding puzzles — virtue characters to restore by sliding tiles. */
export const GLYPHS: VirtueGlyph[] = [
  {
    id: 'ren',
    character: '仁',
    size: 3,
    // 仁's right-hand 二 stroke reaches into the bottom-right cell, so
    // leaving that corner permanently empty (the usual default) cuts into
    // real detail. The top-left corner is just the start of 亻's plain
    // vertical stroke — a safer, less disruptive cell to leave blank.
    solvedEmptyIndex: 0,
    title: localized('Ren — Benevolence', '仁 — 仁爱'),
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
    size: 3,
    title: localized('Yi — Righteousness', '義 — 义'),
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
    size: 3,
    title: localized('Li — Ritual Propriety', '禮 — 礼'),
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
    size: 3,
    title: localized('Zhi — Wisdom', '智 — 智'),
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
    size: 3,
    title: localized('Xin — Trustworthiness', '信 — 信'),
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

export function glyphById(id: string): VirtueGlyph | undefined {
  return GLYPHS.find((g) => g.id === id);
}
