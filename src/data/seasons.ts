import { localized, type Localized } from '../i18n/types';

export interface SeasonalVirtue {
  id: string;
  /** Approximate solar month 1–12 this virtue centres on. */
  month: number;
  emoji: string;
  name: Localized<string>;
  virtue: Localized<string>;
  guidance: Localized<string>;
}

/** Twelve virtues of the year — one per solar month, rotating forever. */
export const SEASONAL_VIRTUES: SeasonalVirtue[] = [
  {
    id: 'jan',
    month: 1,
    emoji: '🌱',
    name: localized('Month of Beginnings', '起始之月'),
    virtue: localized('Intention', '立志'),
    guidance: localized(
      'Plant one clear intention. Do not rush the harvest.',
      '立下一个清楚的心愿。不必催促收成。',
    ),
  },
  {
    id: 'feb',
    month: 2,
    emoji: '🧧',
    name: localized('Month of Renewal', '更新之月'),
    virtue: localized('Hope', '盼望'),
    guidance: localized(
      'Renew what grew tired. Speak kindly to the year ahead.',
      '更新那疲倦之处。对前方的一年，说一句温柔的话。',
    ),
  },
  {
    id: 'mar',
    month: 3,
    emoji: '🌸',
    name: localized('Month of Awakening', '觉醒之月'),
    virtue: localized('Curiosity', '好奇'),
    guidance: localized(
      'Ask one honest question each day, and listen for the answer in living.',
      '每天问一个真诚的问题，并在生活中聆听答案。',
    ),
  },
  {
    id: 'apr',
    month: 4,
    emoji: '🌧️',
    name: localized('Month of Patience', '耐性之月'),
    virtue: localized('Patience', '耐心'),
    guidance: localized(
      'When irritation rises, take one full breath before you respond.',
      '当烦躁升起时，先做一次完整的呼吸，再回应。',
    ),
  },
  {
    id: 'may',
    month: 5,
    emoji: '🌿',
    name: localized('Month of Growth', '生长之月'),
    virtue: localized('Diligence', '勤勉'),
    guidance: localized(
      'Tend a small practice daily — growth is quiet and cumulative.',
      '每日照料一小段修习 — 成长是安静而累积的。',
    ),
  },
  {
    id: 'jun',
    month: 6,
    emoji: '☀️',
    name: localized('Month of Clarity', '清明之月'),
    virtue: localized('Honesty', '诚实'),
    guidance: localized(
      'Name what is true without cruelty — to yourself first.',
      '不加苛责地道出真实 — 先对自己如此。',
    ),
  },
  {
    id: 'jul',
    month: 7,
    emoji: '🌊',
    name: localized('Month of Generosity', '慷慨之月'),
    virtue: localized('Generosity', '慷慨'),
    guidance: localized(
      'Give one thing freely today: time, attention, or encouragement.',
      '今天自由地给出一样东西：时间、关注，或鼓励。',
    ),
  },
  {
    id: 'aug',
    month: 8,
    emoji: '🌾',
    name: localized('Month of Gratitude', '感恩之月'),
    virtue: localized('Gratitude', '感恩'),
    guidance: localized(
      'Name three gifts the day already offered, however small.',
      '说出这一天已给予你的三份礼物，无论多么微小。',
    ),
  },
  {
    id: 'sep',
    month: 9,
    emoji: '🍂',
    name: localized('Month of Balance', '平衡之月'),
    virtue: localized('Harmony', '和谐'),
    guidance: localized(
      'Hold firmness and gentleness together — neither alone is enough.',
      '同时持守坚定与温柔 — 单有其一都不够。',
    ),
  },
  {
    id: 'oct',
    month: 10,
    emoji: '🌕',
    name: localized('Month of Reflection', '反思之月'),
    virtue: localized('Reflection', '反思'),
    guidance: localized(
      'Look back without judgment. What wants to be released?',
      '不加评判地回望。有什么想被放下？',
    ),
  },
  {
    id: 'nov',
    month: 11,
    emoji: '🕯️',
    name: localized('Month of Compassion', '慈悲之月'),
    virtue: localized('Compassion', '慈悲'),
    guidance: localized(
      'Meet one difficulty — yours or another’s — with warmth.',
      '以温暖面对一处困难 — 你的，或他人的。',
    ),
  },
  {
    id: 'dec',
    month: 12,
    emoji: '❄️',
    name: localized('Month of Stillness', '静定之月'),
    virtue: localized('Stillness', '静定'),
    guidance: localized(
      'Leave a little silence in the day. Wisdom often arrives there.',
      '在一天中留一点静默。智慧常在那里到来。',
    ),
  },
];

export function seasonalVirtueForDay(dayKey: string): SeasonalVirtue {
  const month = Number(dayKey.slice(5, 7));
  return SEASONAL_VIRTUES.find((s) => s.month === month) ?? SEASONAL_VIRTUES[0];
}

/** Rough lunar-new-year window: late Jan through mid Feb (solar). */
export function isLunarNewYearWindow(dayKey: string): boolean {
  const month = Number(dayKey.slice(5, 7));
  const day = Number(dayKey.slice(8, 10));
  if (month === 1 && day >= 20) return true;
  if (month === 2 && day <= 20) return true;
  return false;
}

export function isGregorianNewYearWindow(dayKey: string): boolean {
  const month = Number(dayKey.slice(5, 7));
  const day = Number(dayKey.slice(8, 10));
  return month === 1 && day <= 7;
}
