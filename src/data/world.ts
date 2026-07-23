import type { WorldBuilding } from './types';

export interface WorldStage {
  id: string;
  name: string;
  zh?: string;
  emoji: string;
  threshold: number; // total (community + user) harmony points
  description: string;
}

export const WORLD_STAGES: WorldStage[] = [
  { id: 'village', name: 'Village', zh: '村', emoji: '🏘️', threshold: 0, description: 'A few homes by the river. Every great society began this way — with a handful of people choosing to grow.' },
  { id: 'town', name: 'Town', zh: '镇', emoji: '🏡', threshold: 600, description: 'The village has grown into a town. Paths become streets; neighbours become a community.' },
  { id: 'city', name: 'City', zh: '城', emoji: '🏙️', threshold: 1500, description: 'A flourishing city, alive with learning and care. Its strength is not its walls but its people.' },
  { id: 'harmony', name: 'Harmony Society', zh: '大同', emoji: '🌏', threshold: 3000, description: 'The Great Harmony: a society where the world is shared by all, and every person\'s growth lifts everyone.' },
];

export const BUILDINGS: WorldBuilding[] = [
  { id: 'school', name: 'School', emoji: '🏫', threshold: 200, description: 'Built by lessons learned. Every mind that grows here teaches another.' },
  { id: 'library', name: 'Library', emoji: '📚', threshold: 450, description: 'Built by wisdom gathered. The heritage of all traditions, open to all.' },
  { id: 'garden', name: 'Community Garden', emoji: '🌳', threshold: 800, description: 'Built by patience and care. A green heart where the community gathers.' },
  { id: 'care', name: 'Care Centre', emoji: '🏥', threshold: 1200, description: 'Built by compassion practised. Here, the old are cared for and no one is left behind.' },
  { id: 'bridge', name: 'Great Bridge', emoji: '🌉', threshold: 1800, description: 'Built by encouragement given. It joins what was separate.' },
  { id: 'hall', name: 'Cultural Hall', emoji: '🏛️', threshold: 2500, description: 'Built by all virtues together. A hall where every tradition\'s wisdom is celebrated.' },
];
