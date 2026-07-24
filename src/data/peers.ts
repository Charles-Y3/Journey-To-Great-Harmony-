import type { Peer } from './types';
import { localized } from '../i18n/types';

// Fictional fellow travellers who populate the simulated community in v1.
// With real accounts (future version), these become real people.
export const PEERS: Peer[] = [
  { id: 'p-mei', name: localized('Mei', '美'), emoji: '🧝‍♀️', motto: localized('Small kindnesses, every day.', '每日的小小善意。'), pace: 1.15 },
  { id: 'p-arjun', name: localized('Arjun', '阿俊'), emoji: '🧘‍♂️', motto: localized('One breath at a time.', '一次只呼吸一口气。'), pace: 0.9 },
  { id: 'p-sofia', name: localized('Sofia', '索菲亚'), emoji: '👩‍🏫', motto: localized('Still learning. Always learning.', '仍在学习，永远在学习。'), pace: 1.3 },
  { id: 'p-tao', name: localized('Tao', '涛'), emoji: '👨‍🌾', motto: localized('Like water — patient and persistent.', '如水一般 — 耐心而坚持。'), pace: 0.75 },
  { id: 'p-amina', name: localized('Amina', '阿米娜'), emoji: '🧕', motto: localized('Seek knowledge wherever it is found.', '无论知识在何处，都去寻求它。'), pace: 1.05 },
  { id: 'p-leo', name: localized('Leo', '利奥'), emoji: '🧑‍🎨', motto: localized('Make something beautiful today.', '今天创造一些美好的事物。'), pace: 0.85 },
  { id: 'p-hana', name: localized('Hana', '花'), emoji: '👵', motto: localized('The ripest grain bows lowest.', '最饱满的稻穗，垂得最低。'), pace: 1.0 },
  { id: 'p-sam', name: localized('Sam', '山姆'), emoji: '🧑‍🚒', motto: localized("Show up. Especially when it's hard.", '挺身而出，尤其在艰难的时候。'), pace: 1.2 },
];
