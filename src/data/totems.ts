import { localized, type Localized } from '../i18n/types';
import { beginnerTierCleared, intermediateTierCleared } from './glyphs';

export type TotemRuleType =
  | 'inside'
  | 'outside'
  | 'near'
  | 'far'
  | 'apart'
  | 'above'
  | 'below'
  | 'aside'
  | 'level'
  | 'between';

export interface TotemPart {
  id: string;
  /** Inline SVG markup for children of an SVG <g> (no outer <g>). */
  svg: string;
  r: number;
}

export interface TotemRule {
  type: TotemRuleType;
  a: string;
  b: string;
  c?: string;
  max?: number;
  min?: number;
  side?: 'left' | 'right';
  msg: Localized<string>;
}

export type TotemPose = Record<string, { x: number; y: number }>;

export interface AdvancedTotem {
  id: string; // prefix with totem- e.g. totem-harmony
  emoji: string;
  title: Localized<string>;
  /** Short list subtitle (virtue sense). */
  meaning: Localized<string>;
  riddle: Localized<string>;
  teaching: Localized<string>;
  /** Exactly 2 hints. */
  hints: [Localized<string>, Localized<string>];
  parts: TotemPart[];
  rules: TotemRule[];
  /** Solved arrangement — used for list thumbnails (same geometry as the puzzle). */
  solution: TotemPose;
}

export const ADVANCED_TOTEMS: AdvancedTotem[] = [
  {
    id: 'totem-harmony',
    emoji: '🪷',
    title: localized('Harmony', '和谐'),
    meaning: localized('Shared life under one sky', '同天之下，共享生命'),
    riddle: localized(
      'Make a picture of shared life under one sky — companions, meal, and shelter together.',
      '绘一幅同天共享之景——同伴、餐食与休憩同在一处。',
    ),
    teaching: localized(
      'Two figures share a bowl and a resting mat inside one ring, under a small sun: harmony as life held in common — circle, nourishment, rest, and light belonging together.',
      '两人同享一碗、一席，环于圆中，小日在上：和谐即共持的生命——圆、滋养、休憩与光明同归一处。',
    ),
    hints: [
      localized(
        'Something round should hold the whole scene.',
        '须有一圆，容纳整幅图景。',
      ),
      localized(
        'Nourishment sits between the two who share it — with rest and light inside the circle too.',
        '餐食置于二人之间，休憩与光明亦在圆内。',
      ),
    ],
    parts: [
      {
        id: 'ring',
        svg: `<circle cx="0" cy="0" r="42" fill="none" stroke="#c5a15a" stroke-width="6"/>
                    <circle cx="0" cy="0" r="34" fill="none" stroke="#c5a15a" stroke-width="2" opacity="0.4"/>`,
        r: 46,
      },
      {
        id: 'bowl',
        svg: `<ellipse cx="0" cy="2" rx="14" ry="5" fill="#c5a15a"/>
                    <path d="M-14 2 Q0 16 14 2" fill="none" stroke="#8a6a2e" stroke-width="3"/>
                    <ellipse cx="0" cy="0" rx="11" ry="3.5" fill="#e2c57a"/>`,
        r: 16,
      },
      {
        id: 'figL',
        svg: `<circle cx="0" cy="-12" r="4.5" fill="#c5a15a"/>
                    <path d="M0 -7 v14 M-6 -1 h12 M-4 7 l-3 8 M4 7 l3 8" stroke="#c5a15a" stroke-width="2.8" stroke-linecap="round" fill="none"/>`,
        r: 14,
      },
      {
        id: 'figR',
        svg: `<circle cx="0" cy="-12" r="4.5" fill="#c5a15a"/>
                    <path d="M0 -7 v14 M-6 -1 h12 M-4 7 l-3 8 M4 7 l3 8" stroke="#c5a15a" stroke-width="2.8" stroke-linecap="round" fill="none"/>`,
        r: 14,
      },
      {
        id: 'mat',
        svg: `<rect x="-18" y="-4" width="36" height="8" rx="2" fill="none" stroke="#c5a15a" stroke-width="3"/>
                    <path d="M-14 0 H14" stroke="#8a6a2e" stroke-width="2"/>`,
        r: 16,
      },
      {
        id: 'sun',
        svg: `<circle cx="0" cy="0" r="8" fill="#e2c57a"/>
                    <path d="M0 -14 V-10 M0 10 V14 M-14 0 H-10 M10 0 H14 M-10 -10 L-7 -7 M7 7 L10 10 M10 -10 L7 -7 M-7 7 L-10 10" stroke="#c5a15a" stroke-width="2" stroke-linecap="round"/>`,
        r: 14,
      },
      {
        id: 'steam',
        svg: `<path d="M-4 8 Q-8 -2 -2 -10 M2 8 Q6 -2 0 -10 M8 6 Q10 -2 6 -8" fill="none" stroke="#c5a15a" stroke-width="2" stroke-linecap="round" opacity="0.85"/>`,
        r: 12,
      },
    ],
    rules: [
      {
        type: 'inside',
        a: 'figL',
        b: 'ring',
        msg: localized('One figure stands outside the shared circle.', '有一人站在共享之圆外。'),
      },
      {
        type: 'inside',
        a: 'figR',
        b: 'ring',
        msg: localized('One figure stands outside the shared circle.', '有一人站在共享之圆外。'),
      },
      {
        type: 'inside',
        a: 'bowl',
        b: 'ring',
        msg: localized('The shared meal is outside the circle.', '共享之餐在圆外。'),
      },
      {
        type: 'inside',
        a: 'mat',
        b: 'ring',
        msg: localized('The resting place is outside the circle.', '休憩之处在圆外。'),
      },
      {
        type: 'inside',
        a: 'sun',
        b: 'ring',
        msg: localized(
          'The light should warm the shared circle, not shine elsewhere.',
          '光明应温暖共享之圆，而非照在别处。',
        ),
      },
      {
        type: 'between',
        a: 'bowl',
        b: 'figL',
        c: 'figR',
        msg: localized('The bowl is not held between the two figures.', '碗未置于二人之间。'),
      },
      {
        type: 'below',
        a: 'mat',
        b: 'bowl',
        msg: localized('The mat should support from below the meal.', '席应从餐食之下承托。'),
      },
      {
        type: 'near',
        a: 'steam',
        b: 'bowl',
        max: 28,
        msg: localized('The rising warmth belongs with the bowl.', '升腾之暖应与碗同在。'),
      },
      {
        type: 'above',
        a: 'steam',
        b: 'bowl',
        msg: localized('Warmth should rise above the meal.', '暖意应在餐食之上升起。'),
      },
      {
        type: 'above',
        a: 'sun',
        b: 'bowl',
        msg: localized('Light belongs higher in the scene than the meal.', '光明应高于餐食。'),
      },
      {
        type: 'apart',
        a: 'figL',
        b: 'figR',
        min: 20,
        msg: localized(
          'The two figures are merged — they should stand as companions.',
          '二人重叠——应如同伴并肩而立。',
        ),
      },
      {
        type: 'level',
        a: 'figL',
        b: 'figR',
        max: 16,
        msg: localized(
          'The companions should meet as equals — one stands much higher.',
          '同伴应平等相对——一人站得过高。',
        ),
      },
    ],
    solution: {
      ring: { x: 100, y: 108 },
      figL: { x: 78, y: 100 },
      figR: { x: 122, y: 100 },
      bowl: { x: 100, y: 112 },
      mat: { x: 100, y: 132 },
      steam: { x: 100, y: 92 },
      sun: { x: 100, y: 72 },
    },
  },
  {
    id: 'totem-community',
    emoji: '🪺',
    title: localized('Community', '社群'),
    meaning: localized('Equals at a round table', '圆桌之前，人人平等'),
    riddle: localized(
      'Set a round table where equals meet — shared meal at the center, paths arriving from many sides.',
      '设一张圆桌，让平等者相聚——共享之餐在中央，各路足迹从四方而来。',
    ),
    teaching: localized(
      'A round table holds equal seats around one bowl and a central lamp. Footprints arrive from different sides: community is shared ground made visible — not a fortress, but a place prepared for many.',
      '圆桌围坐，一碗一灯居中。足迹从各方而至：社群即让共享之地可见——非堡垒，而是为众人预备之处。',
    ),
    hints: [
      localized(
        'The meal and lamp belong at the heart of the table.',
        '餐食与灯应在桌心。',
      ),
      localized(
        'Seats gather around; footprints arrive from more than one side.',
        '席位围聚四周；足迹从不止一方而来。',
      ),
    ],
    parts: [
      {
        id: 'table',
        svg: `<ellipse cx="0" cy="0" rx="40" ry="28" fill="none" stroke="#c5a15a" stroke-width="5"/>
                    <ellipse cx="0" cy="0" rx="32" ry="20" fill="none" stroke="#8a6a2e" stroke-width="2" opacity="0.5"/>`,
        r: 42,
      },
      {
        id: 'bowl',
        svg: `<ellipse cx="0" cy="2" rx="12" ry="5" fill="#c5a15a"/>
                    <path d="M-12 2 Q0 14 12 2" fill="none" stroke="#8a6a2e" stroke-width="2.5"/>
                    <ellipse cx="0" cy="0" rx="9" ry="3" fill="#e2c57a"/>`,
        r: 14,
      },
      {
        id: 'lamp',
        svg: `<path d="M0 8 V0" stroke="#8a6a2e" stroke-width="2"/>
                    <path d="M-5 0 L0 -10 L5 0 Z" fill="#e2c57a"/>
                    <circle cx="0" cy="-3" r="2.5" fill="#f0b060"/>`,
        r: 10,
      },
      {
        id: 'seatN',
        svg: `<rect x="-10" y="-6" width="20" height="10" rx="2" fill="none" stroke="#c5a15a" stroke-width="2.5"/>
                    <path d="M-6 4 V10 M6 4 V10" stroke="#c5a15a" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'seatS',
        svg: `<rect x="-10" y="-6" width="20" height="10" rx="2" fill="none" stroke="#c5a15a" stroke-width="2.5"/>
                    <path d="M-6 4 V10 M6 4 V10" stroke="#c5a15a" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'seatE',
        svg: `<rect x="-10" y="-6" width="20" height="10" rx="2" fill="none" stroke="#c5a15a" stroke-width="2.5"/>
                    <path d="M-6 4 V10 M6 4 V10" stroke="#c5a15a" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'seatW',
        svg: `<rect x="-10" y="-6" width="20" height="10" rx="2" fill="none" stroke="#c5a15a" stroke-width="2.5"/>
                    <path d="M-6 4 V10 M6 4 V10" stroke="#c5a15a" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'printsN',
        svg: `<ellipse cx="-4" cy="-8" rx="4" ry="6" fill="none" stroke="#c5a15a" stroke-width="2"/>
                    <ellipse cx="4" cy="2" rx="4" ry="6" fill="none" stroke="#c5a15a" stroke-width="2"/>
                    <ellipse cx="-2" cy="12" rx="4" ry="6" fill="none" stroke="#c5a15a" stroke-width="2"/>`,
        r: 14,
      },
      {
        id: 'printsE',
        svg: `<ellipse cx="-8" cy="-4" rx="6" ry="4" fill="none" stroke="#c5a15a" stroke-width="2"/>
                    <ellipse cx="2" cy="2" rx="6" ry="4" fill="none" stroke="#c5a15a" stroke-width="2"/>
                    <ellipse cx="12" cy="-2" rx="6" ry="4" fill="none" stroke="#c5a15a" stroke-width="2"/>`,
        r: 14,
      },
      {
        id: 'printsW',
        svg: `<ellipse cx="8" cy="-4" rx="6" ry="4" fill="none" stroke="#c5a15a" stroke-width="2"/>
                    <ellipse cx="-2" cy="2" rx="6" ry="4" fill="none" stroke="#c5a15a" stroke-width="2"/>
                    <ellipse cx="-12" cy="-2" rx="6" ry="4" fill="none" stroke="#c5a15a" stroke-width="2"/>`,
        r: 14,
      },
    ],
    rules: [
      {
        type: 'inside',
        a: 'bowl',
        b: 'table',
        msg: localized('The shared meal should sit at the heart of the table.', '共享之餐应在桌心。'),
      },
      {
        type: 'inside',
        a: 'lamp',
        b: 'table',
        msg: localized('The lamp should light the center of the gathering.', '灯应照亮聚会中央。'),
      },
      {
        type: 'near',
        a: 'lamp',
        b: 'bowl',
        max: 28,
        msg: localized('Lamp and meal belong together at the center.', '灯与餐应在中央相伴。'),
      },
      {
        type: 'above',
        a: 'seatN',
        b: 'table',
        msg: localized('A seat should wait above the table.', '一席应在桌上方等候。'),
      },
      {
        type: 'below',
        a: 'seatS',
        b: 'table',
        msg: localized('A seat should wait below the table.', '一席应在桌下方等候。'),
      },
      {
        type: 'aside',
        a: 'seatE',
        b: 'table',
        side: 'right',
        msg: localized('A seat should wait to the right of the table.', '一席应在桌右侧等候。'),
      },
      {
        type: 'aside',
        a: 'seatW',
        b: 'table',
        side: 'left',
        msg: localized('A seat should wait to the left of the table.', '一席应在桌左侧等候。'),
      },
      {
        type: 'near',
        a: 'seatN',
        b: 'table',
        max: 55,
        msg: localized('A seat has drifted too far from the table.', '一席离桌过远。'),
      },
      {
        type: 'near',
        a: 'seatS',
        b: 'table',
        max: 55,
        msg: localized('A seat has drifted too far from the table.', '一席离桌过远。'),
      },
      {
        type: 'near',
        a: 'seatE',
        b: 'table',
        max: 55,
        msg: localized('A seat has drifted too far from the table.', '一席离桌过远。'),
      },
      {
        type: 'near',
        a: 'seatW',
        b: 'table',
        max: 55,
        msg: localized('A seat has drifted too far from the table.', '一席离桌过远。'),
      },
      {
        type: 'apart',
        a: 'seatN',
        b: 'seatS',
        min: 50,
        msg: localized(
          'Opposite seats should face across the table, not huddle.',
          '对席应隔桌相对，而非挤在一处。',
        ),
      },
      {
        type: 'apart',
        a: 'seatE',
        b: 'seatW',
        min: 50,
        msg: localized(
          'Opposite seats should face across the table, not huddle.',
          '对席应隔桌相对，而非挤在一处。',
        ),
      },
      {
        type: 'above',
        a: 'printsN',
        b: 'seatN',
        msg: localized('Footprints should approach the north seat from outside.', '足迹应从外侧趋向北席。'),
      },
      {
        type: 'aside',
        a: 'printsE',
        b: 'seatE',
        side: 'right',
        msg: localized('Footprints should approach the east seat from outside.', '足迹应从外侧趋向东席。'),
      },
      {
        type: 'aside',
        a: 'printsW',
        b: 'seatW',
        side: 'left',
        msg: localized('Footprints should approach the west seat from outside.', '足迹应从外侧趋向西席。'),
      },
      {
        type: 'near',
        a: 'printsN',
        b: 'seatN',
        max: 40,
        msg: localized('Northern footprints should lead toward a seat.', '北方足迹应引向一席。'),
      },
      {
        type: 'near',
        a: 'printsE',
        b: 'seatE',
        max: 40,
        msg: localized('Eastern footprints should lead toward a seat.', '东方足迹应引向一席。'),
      },
      {
        type: 'near',
        a: 'printsW',
        b: 'seatW',
        max: 40,
        msg: localized('Western footprints should lead toward a seat.', '西方足迹应引向一席。'),
      },
    ],
    solution: {
      table: { x: 100, y: 108 },
      bowl: { x: 100, y: 112 },
      lamp: { x: 100, y: 96 },
      seatN: { x: 100, y: 62 },
      seatS: { x: 100, y: 154 },
      seatE: { x: 152, y: 110 },
      seatW: { x: 48, y: 110 },
      printsN: { x: 100, y: 36 },
      printsE: { x: 176, y: 110 },
      printsW: { x: 24, y: 110 },
    },
  },
  {
    id: 'totem-balance',
    emoji: '⚖️',
    title: localized('Balance', '平衡'),
    meaning: localized('Neither side wins', '两边皆不独胜'),
    riddle: localized(
      'Neither side should win. Build a still balance that holds equal weights.',
      '任一边不可独胜。建一静止之衡，承等量之权。',
    ),
    teaching: localized(
      'Twin weights hang from one beam over a fulcrum, with a plumb line marking the center and a base that steadies the whole: balance as even measure — not a crown, not a tip.',
      '双权悬于同一横梁，支点在上，垂线标中，基座稳之：平衡即均量——非王冠，非倾侧。',
    ),
    hints: [
      localized(
        'Something must support from below, on a steady base.',
        '须由下承托，立于稳固之基。',
      ),
      localized(
        'Two similar weights should answer each other across a centered line.',
        '两相似之权应沿中线彼此呼应。',
      ),
    ],
    parts: [
      {
        id: 'beam',
        svg: `<rect x="-52" y="-3" width="104" height="7" rx="2" fill="#c5a15a"/>`,
        r: 54,
      },
      {
        id: 'fulcrum',
        svg: `<path d="M0 -4 L12 22 H-12 Z" fill="#c5a15a"/>
                    <circle cx="0" cy="-6" r="4" fill="#e2c57a"/>`,
        r: 18,
      },
      {
        id: 'base',
        svg: `<rect x="-22" y="-3" width="44" height="7" rx="2" fill="#8a6a2e"/>`,
        r: 20,
      },
      {
        id: 'wL',
        svg: `<circle cx="0" cy="0" r="10" fill="#c5a15a"/>
                    <path d="M0 -10 V-18" stroke="#8a6a2e" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'wR',
        svg: `<circle cx="0" cy="0" r="10" fill="#c5a15a"/>
                    <path d="M0 -10 V-18" stroke="#8a6a2e" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'cordL',
        svg: `<path d="M0 -12 V12" stroke="#c5a15a" stroke-width="2.5" stroke-linecap="round"/>`,
        r: 10,
      },
      {
        id: 'cordR',
        svg: `<path d="M0 -12 V12" stroke="#c5a15a" stroke-width="2.5" stroke-linecap="round"/>`,
        r: 10,
      },
      {
        id: 'plumb',
        svg: `<path d="M0 -16 V10" stroke="#c5a15a" stroke-width="2"/>
                    <circle cx="0" cy="14" r="5" fill="#e2c57a"/>`,
        r: 12,
      },
    ],
    rules: [
      {
        type: 'below',
        a: 'fulcrum',
        b: 'beam',
        msg: localized('The support should sit under the beam.', '支点应在横梁之下。'),
      },
      {
        type: 'near',
        a: 'fulcrum',
        b: 'beam',
        max: 34,
        msg: localized('The fulcrum is too far from the beam.', '支点离横梁过远。'),
      },
      {
        type: 'below',
        a: 'base',
        b: 'fulcrum',
        msg: localized('A base should steady the fulcrum from below.', '基座应从下稳住支点。'),
      },
      {
        type: 'near',
        a: 'base',
        b: 'fulcrum',
        max: 30,
        msg: localized('The base is not under the support.', '基座未在支点之下。'),
      },
      {
        type: 'near',
        a: 'wL',
        b: 'beam',
        max: 48,
        msg: localized('A weight is not with the beam.', '一权未与横梁同在。'),
      },
      {
        type: 'near',
        a: 'wR',
        b: 'beam',
        max: 48,
        msg: localized('A weight is not with the beam.', '一权未与横梁同在。'),
      },
      {
        type: 'aside',
        a: 'wL',
        b: 'fulcrum',
        side: 'left',
        msg: localized('Weights should answer each other across the center.', '两权应沿中心彼此呼应。'),
      },
      {
        type: 'aside',
        a: 'wR',
        b: 'fulcrum',
        side: 'right',
        msg: localized('Weights should answer each other across the center.', '两权应沿中心彼此呼应。'),
      },
      {
        type: 'level',
        a: 'wL',
        b: 'wR',
        max: 14,
        msg: localized('The weights are uneven — one side is winning.', '两权不均——一边独胜。'),
      },
      {
        type: 'apart',
        a: 'wL',
        b: 'wR',
        min: 40,
        msg: localized('The weights are too close to read as two sides.', '两权过近，难辨两侧。'),
      },
      {
        type: 'between',
        a: 'cordL',
        b: 'beam',
        c: 'wL',
        msg: localized('A cord should hang between beam and left weight.', '一绳应悬于横梁与左权之间。'),
      },
      {
        type: 'between',
        a: 'cordR',
        b: 'beam',
        c: 'wR',
        msg: localized('A cord should hang between beam and right weight.', '一绳应悬于横梁与右权之间。'),
      },
      {
        type: 'below',
        a: 'plumb',
        b: 'beam',
        msg: localized('The plumb should hang down from the beam.', '垂线应从横梁下垂。'),
      },
      {
        type: 'near',
        a: 'plumb',
        b: 'fulcrum',
        max: 28,
        msg: localized(
          'The plumb should mark the true center above the fulcrum.',
          '垂线应标出支点之上的真正中心。',
        ),
      },
    ],
    solution: {
      beam: { x: 100, y: 88 },
      fulcrum: { x: 100, y: 112 },
      base: { x: 100, y: 138 },
      wL: { x: 58, y: 108 },
      wR: { x: 142, y: 108 },
      cordL: { x: 72, y: 96 },
      cordR: { x: 128, y: 96 },
      plumb: { x: 100, y: 108 },
    },
  },
  {
    id: 'totem-reciprocity',
    emoji: '🤝',
    title: localized('Reciprocity', '互惠'),
    meaning: localized('Fair exchange face to face', '面对面，公平交换'),
    riddle: localized(
      'What you would not suffer, do not place upon another — arrange a fair exchange.',
      '己所不欲，勿施于人——排列一场公平的交换。',
    ),
    teaching: localized(
      'Two figures face each other across a shared mirror of measure: what leaves one hand returns in kind. Reciprocity is not scorekeeping — it is refusing to deal to others what you would refuse yourself.',
      '两人隔共享之镜相对而量：出自一手之物，以同等方式回返。互惠非记分——而是拒将己所不受者加诸他人。',
    ),
    hints: [
      localized(
        'Two people should meet as equals, face to face.',
        '两人应平等相对，面对面。',
      ),
      localized(
        'A measure between them — and gifts that answer from both sides.',
        '其间有一度量——礼物从两侧彼此回应。',
      ),
    ],
    parts: [
      {
        id: 'figL',
        svg: `<circle cx="0" cy="-12" r="4.5" fill="#c5a15a"/>
                    <path d="M0 -7 v14 M-6 -1 h12 M-4 7 l-3 8 M4 7 l3 8" stroke="#c5a15a" stroke-width="2.8" stroke-linecap="round" fill="none"/>`,
        r: 14,
      },
      {
        id: 'figR',
        svg: `<circle cx="0" cy="-12" r="4.5" fill="#c5a15a"/>
                    <path d="M0 -7 v14 M-6 -1 h12 M-4 7 l-3 8 M4 7 l3 8" stroke="#c5a15a" stroke-width="2.8" stroke-linecap="round" fill="none"/>`,
        r: 14,
      },
      {
        id: 'mirror',
        svg: `<ellipse cx="0" cy="0" rx="10" ry="22" fill="none" stroke="#c5a15a" stroke-width="3"/>
                    <path d="M-4 -10 L4 0 L-4 10" fill="none" stroke="#e2c57a" stroke-width="2"/>`,
        r: 16,
      },
      {
        id: 'giftL',
        svg: `<rect x="-8" y="-6" width="16" height="12" rx="2" fill="#c5a15a"/>
                    <path d="M-8 0 H8 M0 -6 V6" stroke="#8a6a2e" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'giftR',
        svg: `<rect x="-8" y="-6" width="16" height="12" rx="2" fill="#c5a15a"/>
                    <path d="M-8 0 H8 M0 -6 V6" stroke="#8a6a2e" stroke-width="2"/>`,
        r: 12,
      },
      {
        id: 'handL',
        svg: `<path d="M-10 4 Q-2 -8 8 2" fill="none" stroke="#c5a15a" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="8" cy="2" r="3" fill="#e2c57a"/>`,
        r: 12,
      },
      {
        id: 'handR',
        svg: `<path d="M10 4 Q2 -8 -8 2" fill="none" stroke="#c5a15a" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="-8" cy="2" r="3" fill="#e2c57a"/>`,
        r: 12,
      },
    ],
    rules: [
      {
        type: 'aside',
        a: 'figL',
        b: 'mirror',
        side: 'left',
        msg: localized('One person should stand on each side of the measure.', '度量两侧应各有一人。'),
      },
      {
        type: 'aside',
        a: 'figR',
        b: 'mirror',
        side: 'right',
        msg: localized('One person should stand on each side of the measure.', '度量两侧应各有一人。'),
      },
      {
        type: 'level',
        a: 'figL',
        b: 'figR',
        max: 14,
        msg: localized('The two should meet as equals — one stands much higher.', '两人应平等相对——一人站得过高。'),
      },
      {
        type: 'apart',
        a: 'figL',
        b: 'figR',
        min: 40,
        msg: localized('They need space to face each other across the exchange.', '交换之间需留空间，以便相对。'),
      },
      {
        type: 'between',
        a: 'mirror',
        b: 'figL',
        c: 'figR',
        msg: localized('The measure should stand between the two people.', '度量应立于二人之间。'),
      },
      {
        type: 'near',
        a: 'giftL',
        b: 'figL',
        max: 32,
        msg: localized('A gift should stay with the one who offers it.', '礼物应与赠予者同在。'),
      },
      {
        type: 'near',
        a: 'giftR',
        b: 'figR',
        max: 32,
        msg: localized('A gift should stay with the one who offers it.', '礼物应与赠予者同在。'),
      },
      {
        type: 'aside',
        a: 'giftL',
        b: 'mirror',
        side: 'left',
        msg: localized('Gifts should answer from both sides.', '礼物应从两侧彼此回应。'),
      },
      {
        type: 'aside',
        a: 'giftR',
        b: 'mirror',
        side: 'right',
        msg: localized('Gifts should answer from both sides.', '礼物应从两侧彼此回应。'),
      },
      {
        type: 'level',
        a: 'giftL',
        b: 'giftR',
        max: 16,
        msg: localized('The exchange is uneven — one gift sits much higher.', '交换不均——一礼位置过高。'),
      },
      {
        type: 'between',
        a: 'handL',
        b: 'giftL',
        c: 'mirror',
        msg: localized(
          'An open hand should reach from gift toward the shared measure.',
          '伸出的手应从礼物伸向共享之度。',
        ),
      },
      {
        type: 'between',
        a: 'handR',
        b: 'giftR',
        c: 'mirror',
        msg: localized(
          'An open hand should reach from gift toward the shared measure.',
          '伸出的手应从礼物伸向共享之度。',
        ),
      },
    ],
    solution: {
      figL: { x: 58, y: 100 },
      figR: { x: 142, y: 100 },
      mirror: { x: 100, y: 100 },
      giftL: { x: 48, y: 128 },
      giftR: { x: 152, y: 128 },
      handL: { x: 72, y: 118 },
      handR: { x: 128, y: 118 },
    },
  },
  {
    id: 'totem-courage',
    emoji: '🔥',
    title: localized('Courage', '勇气'),
    meaning: localized('Steady heart toward the storm', '稳心迎风暴'),
    riddle: localized(
      'Fear is present — yet a steady heart still steps toward what must be faced.',
      '恐惧在场——然稳心仍向必须面对之处迈步。',
    ),
    teaching: localized(
      'Courage is not the absence of the storm. A figure advances with a bright heart while the dark weather stays ahead — and a small companion light follows, so bravery is not lonely recklessness.',
      '勇气非无风暴。一人持明亮之心前行，暗云在前——小伴灯随后，故勇敢非孤勇之莽。',
    ),
    hints: [
      localized(
        'The storm belongs in front of the one who walks.',
        '风暴应在行者之前。',
      ),
      localized(
        'A heart travels with the walker; a small light may follow behind.',
        '心随行者；小灯可随后。',
      ),
    ],
    parts: [
      {
        id: 'walker',
        svg: `<circle cx="0" cy="-14" r="5" fill="#c5a15a"/>
                    <path d="M0 -8 v18 M-8 0 h10 M8 2 l10 4 M-4 10 l-6 12 M4 10 l8 12" stroke="#c5a15a" stroke-width="3" stroke-linecap="round" fill="none"/>`,
        r: 18,
      },
      {
        id: 'heart',
        svg: `<path d="M0 6 C0 6 -12 -2 -12 -10 C-12 -16 -6 -16 0 -10 C6 -16 12 -16 12 -10 C12 -2 0 6 0 6Z" fill="#c45c4a"/>`,
        r: 14,
      },
      {
        id: 'storm',
        svg: `<path d="M-20 -4 Q-8 -18 6 -8 Q16 -16 22 -2 Q8 4 -4 0 Q-16 8 -20 -4Z" fill="#5a6a78"/>
                    <path d="M-2 4 L6 18 L0 16 L8 30" fill="none" stroke="#e2c57a" stroke-width="3" stroke-linecap="round"/>`,
        r: 22,
      },
      {
        id: 'ground',
        svg: `<path d="M-40 0 H40" stroke="#8a6a2e" stroke-width="4" stroke-linecap="round"/>
                    <path d="M-20 6 H30" stroke="#5a4a28" stroke-width="2" opacity="0.7"/>`,
        r: 28,
      },
      {
        id: 'step',
        svg: `<ellipse cx="0" cy="0" rx="10" ry="4" fill="none" stroke="#c5a15a" stroke-width="2" stroke-dasharray="3 2"/>`,
        r: 10,
      },
      {
        id: 'lamp',
        svg: `<path d="M0 10 V0" stroke="#8a6a2e" stroke-width="2"/>
                    <path d="M-6 0 L0 -12 L6 0 Z" fill="#e2c57a"/>
                    <circle cx="0" cy="-4" r="3" fill="#f0b060"/>`,
        r: 12,
      },
      {
        id: 'banner',
        svg: `<path d="M-2 16 V-16" stroke="#8a6a2e" stroke-width="2.5"/>
                    <path d="M0 -14 H16 L12 -6 L16 2 H0 Z" fill="#3d9b6e"/>`,
        r: 14,
      },
    ],
    rules: [
      {
        type: 'below',
        a: 'ground',
        b: 'walker',
        msg: localized('The path should lie under the one who walks.', '道路应在行者之下。'),
      },
      {
        type: 'near',
        a: 'walker',
        b: 'ground',
        max: 40,
        msg: localized('The walker has left the ground.', '行者已离道路。'),
      },
      {
        type: 'aside',
        a: 'storm',
        b: 'walker',
        side: 'right',
        msg: localized('What must be faced should stand ahead of the walker.', '必须面对之物应在行者之前。'),
      },
      {
        type: 'near',
        a: 'storm',
        b: 'walker',
        max: 70,
        msg: localized('The trial is too far to be the next step.', '试炼过远，非下一步所及。'),
      },
      {
        type: 'near',
        a: 'heart',
        b: 'walker',
        max: 28,
        msg: localized('The heart should travel with the one who advances.', '心应与前行者同在。'),
      },
      {
        type: 'above',
        a: 'heart',
        b: 'ground',
        msg: localized(
          'The heart belongs with the living walker, not buried in the road.',
          '心应属于活着的行者，而非埋于路中。',
        ),
      },
      {
        type: 'between',
        a: 'step',
        b: 'walker',
        c: 'storm',
        msg: localized(
          'A footprint of intent should lie between walker and storm.',
          '意向之足迹应在行者与风暴之间。',
        ),
      },
      {
        type: 'aside',
        a: 'lamp',
        b: 'walker',
        side: 'left',
        msg: localized(
          'A companion light should follow behind, not lead into the storm alone.',
          '伴灯应在后跟随，而非独自冲入风暴。',
        ),
      },
      {
        type: 'near',
        a: 'lamp',
        b: 'walker',
        max: 45,
        msg: localized('The companion light has drifted too far.', '伴灯漂移过远。'),
      },
      {
        type: 'near',
        a: 'banner',
        b: 'walker',
        max: 36,
        msg: localized(
          'Courage carries a sign of purpose — keep the banner with the walker.',
          '勇气携使命之帜——旗帜应与行者同在。',
        ),
      },
      {
        type: 'above',
        a: 'banner',
        b: 'ground',
        msg: localized('The banner should rise above the road.', '旗帜应在道路之上飘扬。'),
      },
    ],
    solution: {
      ground: { x: 100, y: 150 },
      walker: { x: 78, y: 118 },
      heart: { x: 68, y: 96 },
      storm: { x: 132, y: 96 },
      step: { x: 108, y: 120 },
      lamp: { x: 48, y: 130 },
      banner: { x: 92, y: 92 },
    },
  },
  {
    id: 'totem-sincerity',
    emoji: '👁️',
    title: localized('Sincerity', '真诚'),
    meaning: localized('Word and deed in one line', '言行如一'),
    riddle: localized(
      'Let word and deed stand in one line under a clear seeing.',
      '让言与行在同一直线上，置于清明之视下。',
    ),
    teaching: localized(
      'A spoken sign and a walking path align beneath an open eye: sincerity is when what you say and what you do do not pull apart. A seal of trust rests where they meet.',
      '言语之符与行路之径，对齐于睁开的目下：真诚即所言与所行不相分离。信任之印，停于二者交汇之处。',
    ),
    hints: [
      localized(
        'Speech and footsteps should share one direction under clear seeing.',
        '言语与足迹应在清明之视下同向。',
      ),
      localized(
        'A seal of trust belongs where word and deed meet.',
        '信任之印应在言与行交汇之处。',
      ),
    ],
    parts: [
      {
        id: 'eye',
        svg: `<ellipse cx="0" cy="0" rx="18" ry="10" fill="none" stroke="#c5a15a" stroke-width="3"/>
                    <circle cx="0" cy="0" r="5" fill="#e2c57a"/>
                    <circle cx="0" cy="0" r="2" fill="#141c18"/>`,
        r: 16,
      },
      {
        id: 'word',
        svg: `<path d="M-16 8 Q-16 -12 0 -12 Q16 -12 16 0 Q16 10 4 10 H-4 L-10 16 Z" fill="none" stroke="#c5a15a" stroke-width="3"/>
                    <path d="M-6 -2 H6 M-4 4 H4" stroke="#c5a15a" stroke-width="2"/>`,
        r: 18,
      },
      {
        id: 'path',
        svg: `<path d="M0 -28 V28" stroke="#c5a15a" stroke-width="5" stroke-linecap="round"/>
                    <path d="M-8 -12 H8 M-8 4 H8 M-8 18 H8" stroke="#8a6a2e" stroke-width="2"/>`,
        r: 22,
      },
      {
        id: 'foot',
        svg: `<ellipse cx="0" cy="2" rx="8" ry="12" fill="#c5a15a"/>
                    <circle cx="-3" cy="-8" r="3" fill="#e2c57a"/>`,
        r: 12,
      },
      {
        id: 'seal',
        svg: `<rect x="-12" y="-12" width="24" height="24" rx="3" fill="none" stroke="#c45c4a" stroke-width="3"/>
                    <path d="M-6 0 H6 M0 -6 V6" stroke="#c45c4a" stroke-width="2"/>`,
        r: 14,
      },
      {
        id: 'root',
        svg: `<path d="M0 -6 V16 M0 8 Q-14 18 -18 28 M0 8 Q14 18 18 28" fill="none" stroke="#8a6a2e" stroke-width="3" stroke-linecap="round"/>`,
        r: 16,
      },
      {
        id: 'light',
        svg: `<circle cx="0" cy="0" r="7" fill="#e2c57a" opacity="0.9"/>
                    <path d="M0 -14 V-10 M0 10 V14 M-14 0 H-10 M10 0 H14" stroke="#c5a15a" stroke-width="2"/>`,
        r: 12,
      },
    ],
    rules: [
      {
        type: 'above',
        a: 'eye',
        b: 'word',
        msg: localized('Clear seeing should watch from above speech.', '清明之视应从言语之上观照。'),
      },
      {
        type: 'above',
        a: 'eye',
        b: 'path',
        msg: localized('Clear seeing should watch from above the deed.', '清明之视应从行迹之上观照。'),
      },
      {
        type: 'near',
        a: 'light',
        b: 'eye',
        max: 30,
        msg: localized('Light belongs with clear seeing.', '光明应与清明之视同在。'),
      },
      {
        type: 'aside',
        a: 'word',
        b: 'path',
        side: 'left',
        msg: localized(
          'Word and deed should stand side by side — speech to one side of the path.',
          '言与行应并肩——言语在行路一侧。',
        ),
      },
      {
        type: 'near',
        a: 'word',
        b: 'path',
        max: 50,
        msg: localized('Word and deed have drifted too far apart.', '言与行分离过远。'),
      },
      {
        type: 'level',
        a: 'word',
        b: 'path',
        max: 22,
        msg: localized('Word and deed should share one height of intent.', '言与行应共享同一意向之高度。'),
      },
      {
        type: 'below',
        a: 'foot',
        b: 'path',
        msg: localized('Footsteps should follow under the path of deed.', '足迹应随行路之下。'),
      },
      {
        type: 'near',
        a: 'foot',
        b: 'path',
        max: 36,
        msg: localized('The footsteps have left the path.', '足迹已离行路。'),
      },
      {
        type: 'between',
        a: 'seal',
        b: 'word',
        c: 'path',
        msg: localized(
          'The seal of trust should sit where word and deed meet.',
          '信任之印应在言与行交汇之处。',
        ),
      },
      {
        type: 'below',
        a: 'root',
        b: 'seal',
        msg: localized(
          'Sincerity needs roots under the seal — depth, not display alone.',
          '真诚需印下有根——有深度，非仅展示。',
        ),
      },
      {
        type: 'near',
        a: 'root',
        b: 'seal',
        max: 36,
        msg: localized('The roots are not under the seal.', '根未在印之下。'),
      },
    ],
    solution: {
      eye: { x: 100, y: 48 },
      light: { x: 122, y: 42 },
      word: { x: 72, y: 100 },
      path: { x: 116, y: 108 },
      foot: { x: 116, y: 138 },
      seal: { x: 94, y: 112 },
      root: { x: 94, y: 148 },
    },
  },
];

export function advancedTotemById(id: string): AdvancedTotem | undefined {
  return ADVANCED_TOTEMS.find((t) => t.id === id);
}

export function advancedTierCleared(completedGlyphs: readonly string[]): boolean {
  return ADVANCED_TOTEMS.every((t) => completedGlyphs.includes(t.id));
}

export function allVirtueGlyphsCleared(completedGlyphs: readonly string[]): boolean {
  return (
    beginnerTierCleared(completedGlyphs) &&
    intermediateTierCleared(completedGlyphs) &&
    advancedTierCleared(completedGlyphs)
  );
}
