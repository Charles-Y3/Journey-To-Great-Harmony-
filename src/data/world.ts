import type { WorldBuilding } from './types';
import { localized, type Localized } from '../i18n/types';

export interface WorldStage {
  id: string;
  name: Localized<string>;
  emoji: string;
  threshold: number; // total (community + user) harmony points
  description: Localized<string>;
}

// Thresholds assume community harmony grows over months plus a full personal
// journey (Knowledge Depth I–III, Timeline, practice, map). Early buildings
// still appear within the first weeks so the world never feels empty.
export const WORLD_STAGES: WorldStage[] = [
  {
    id: 'village',
    name: localized('Village', '村庄'),
    emoji: '🏘️',
    threshold: 0,
    description: localized(
      'A few homes by the river. Every great society began this way — with a handful of people choosing to grow.',
      '河边的几户人家。每一个伟大的社会，都是这样开始的 — 从少数几个选择成长的人开始。',
    ),
  },
  {
    id: 'town',
    name: localized('Town', '城镇'),
    emoji: '🏡',
    threshold: 2200,
    description: localized(
      'The village has grown into a town. Paths become streets; neighbours become a community.',
      '村庄已成长为城镇。小径变成了街道，邻里变成了社群。',
    ),
  },
  {
    id: 'city',
    name: localized('City', '城市'),
    emoji: '🏙️',
    threshold: 6000,
    description: localized(
      'A flourishing city, alive with learning and care. Its strength is not its walls but its people.',
      '一座繁荣的城市，充满学习与关怀的气息。它的力量不在城墙，而在人民。',
    ),
  },
  {
    id: 'harmony',
    name: localized('World', '世界'),
    emoji: '🌏',
    threshold: 12000,
    description: localized(
      "The Great Harmony: a society where the world is shared by all, and every person's growth lifts everyone.",
      '大同：一个天下为公的社会，每个人的成长都能提升所有人。',
    ),
  },
];

export const BUILDINGS: WorldBuilding[] = [
  { id: 'school', name: localized('School', '学校'), emoji: '🏫', threshold: 400, description: localized('Built by lessons learned. Every mind that grows here teaches another.', '由所学的课程建成。在此成长的每个心灵，都将教导他人。') },
  { id: 'library', name: localized('Library', '图书馆'), emoji: '📚', threshold: 1400, description: localized('Built by wisdom gathered. The heritage of all traditions, open to all.', '由汇聚的智慧建成。一切传统的遗产，向所有人敞开。') },
  { id: 'garden', name: localized('Community Garden', '社区花园'), emoji: '🌳', threshold: 2800, description: localized('Built by patience and care. A green heart where the community gathers.', '由耐心与关怀建成。一颗绿色的心，社群在此相聚。') },
  { id: 'care', name: localized('Care Centre', '关怀中心'), emoji: '🏥', threshold: 4500, description: localized('Built by compassion practised. Here, the old are cared for and no one is left behind.', '由践行的慈悲建成。在此，老者得到照料，无人被遗落。') },
  { id: 'bridge', name: localized('Great Bridge', '大桥'), emoji: '🌉', threshold: 7000, description: localized('Built by encouragement given. It joins what was separate.', '由给予的鼓励建成。它连接了曾经分离的事物。') },
  { id: 'hall', name: localized('Cultural Hall', '文化殿堂'), emoji: '🏛️', threshold: 10000, description: localized("Built by all virtues together. A hall where every tradition's wisdom is celebrated.", '由所有德行共同建成。一座殿堂，礼赞着每个传统的智慧。') },
];
