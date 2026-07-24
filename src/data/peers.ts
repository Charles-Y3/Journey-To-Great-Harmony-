import type { Peer } from './types';
import { localized } from '../i18n/types';

// Fictional fellow travellers who populate the simulated community in v1.
// With real accounts (future version), these become real people.
//
// Each peer has a `tier` (active/normal/occasional — how often they show up
// in the feed, leaderboard, and World tab) and a `joinDay` (the community-age
// day, see communityAge() in engine/community.ts, at which they become
// visible). Founding travellers all have joinDay 0; the rest join in a
// staggered trickle over the following months so the community visibly
// grows the longer the app has existed. A couple of `occasional` peers also
// carry a `departDay`, after which engine/community.ts's visiblePeers()
// stops showing them — simulating travellers who wander off, not just a
// roster that only ever gets bigger. See visiblePeers() for how all three
// fields are applied.
export const PEERS: Peer[] = [
  {
    id: 'p-mei',
    name: localized('Mei', '美'),
    emoji: '🧝‍♀️',
    motto: localized('Small kindnesses, every day.', '每日的小小善意。'),
    pace: 1.15,
    tier: 'active',
    joinDay: 0,
  },
  {
    id: 'p-arjun',
    name: localized('Arjun', '阿俊'),
    emoji: '🧘‍♂️',
    motto: localized('One breath at a time.', '一次只呼吸一口气。'),
    pace: 0.9,
    tier: 'normal',
    joinDay: 0,
  },
  {
    id: 'p-sofia',
    name: localized('Sofia', '索菲亚'),
    emoji: '👩‍🏫',
    motto: localized('Still learning. Always learning.', '仍在学习，永远在学习。'),
    pace: 1.3,
    tier: 'active',
    joinDay: 0,
  },
  {
    id: 'p-tao',
    name: localized('Tao', '涛'),
    emoji: '👨‍🌾',
    motto: localized('Like water — patient and persistent.', '如水一般 — 耐心而坚持。'),
    pace: 0.75,
    tier: 'normal',
    joinDay: 0,
  },
  {
    id: 'p-amina',
    name: localized('Amina', '阿米娜'),
    emoji: '🧕',
    motto: localized('Seek knowledge wherever it is found.', '无论知识在何处，都去寻求它。'),
    pace: 1.05,
    tier: 'normal',
    joinDay: 0,
  },
  {
    id: 'p-leo',
    name: localized('Leo', '利奥'),
    emoji: '🧑‍🎨',
    motto: localized('Make something beautiful today.', '今天创造一些美好的事物。'),
    pace: 0.85,
    tier: 'occasional',
    joinDay: 0,
  },
  {
    id: 'p-hana',
    name: localized('Hana', '花'),
    emoji: '👵',
    motto: localized('The ripest grain bows lowest.', '最饱满的稻穗，垂得最低。'),
    pace: 1.0,
    tier: 'normal',
    joinDay: 0,
  },
  {
    id: 'p-sam',
    name: localized('Sam', '山姆'),
    emoji: '🧑‍🚒',
    motto: localized("Show up. Especially when it's hard.", '挺身而出，尤其在艰难的时候。'),
    pace: 1.2,
    tier: 'active',
    joinDay: 0,
  },
  {
    id: 'p-noor',
    name: localized('Noor', '努尔'),
    emoji: '🕯️',
    motto: localized('Small lights add up in the dark.', '微光汇聚，便可照亮黑暗。'),
    pace: 0.95,
    tier: 'occasional',
    joinDay: 14,
  },
  {
    id: 'p-diego',
    name: localized('Diego', '迭戈'),
    emoji: '🧑‍🍳',
    motto: localized('Cook with care, serve with joy.', '用心烹饪，欢喜奉献。'),
    pace: 1.1,
    tier: 'normal',
    joinDay: 25,
  },
  {
    id: 'p-yuki',
    name: localized('Yuki', '由纪'),
    emoji: '🧑‍💻',
    motto: localized('Small steps, every single day.', '每天一小步，从不间断。'),
    pace: 1.25,
    tier: 'active',
    joinDay: 40,
  },
  {
    id: 'p-oskar',
    name: localized('Oskar', '奥斯卡'),
    emoji: '🧑‍🏫',
    motto: localized('Teach what you still are learning.', '把仍在学习的东西，教给别人。'),
    pace: 0.8,
    tier: 'occasional',
    joinDay: 55,
    departDay: 120,
  },
  {
    id: 'p-fatima',
    name: localized('Fatima', '法蒂玛'),
    emoji: '🧑‍⚕️',
    motto: localized('Heal one person, heal the world a little.', '医治一人，便让世界痊愈一分。'),
    pace: 1.0,
    tier: 'normal',
    joinDay: 70,
  },
  {
    id: 'p-chen',
    name: localized('Chen', '陈'),
    emoji: '🌿',
    motto: localized("Plant today what you'll rest under tomorrow.", '今日所种，他日乘凉。'),
    pace: 0.9,
    tier: 'occasional',
    joinDay: 90,
    departDay: 160,
  },
];
