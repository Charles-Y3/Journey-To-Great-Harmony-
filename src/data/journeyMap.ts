import type { MapRegion } from './types';

export const REGIONS: MapRegion[] = [
  {
    id: 'valley',
    name: 'Valley of Discovery',
    emoji: '🏞️',
    unlockXp: 0,
    tagline: 'Where every journey begins.',
    story:
      'You stand at the mouth of a green valley, morning mist rising from the river. An old signpost reads: "A journey of a thousand miles begins with a single step." Travellers from every land have passed this way — some carrying scriptures, some carrying questions. The valley asks nothing of you but curiosity: the willingness to wonder, to ask, and to begin.',
    challenge: 'Complete your first lesson and your first daily challenge to prove your journey has truly begun.',
    rewardXp: 30,
  },
  {
    id: 'forest',
    name: 'Forest of Reflection',
    emoji: '🌲',
    unlockXp: 150,
    tagline: 'Where the noise falls away.',
    story:
      'The path climbs into a still forest where sunlight falls in quiet columns. Here, hermits and sages once kept their journals; the trees seem to hold their listening. A carved stone reads: "I daily examine myself on three points." In this forest, the only way forward is inward — those who rush through it emerge exactly as they entered.',
    challenge: 'Write evening reflections on 3 different days while you hold this ground.',
    rewardXp: 40,
  },
  {
    id: 'mountain',
    name: 'Mountain of Discipline',
    emoji: '⛰️',
    unlockXp: 400,
    tagline: 'Where habits are forged.',
    story:
      'The mountain is honest: it cannot be argued with, only climbed. Each morning the pilgrims here rise before the sun, not because the mountain demands it, but because they have learned that character is built one step at a time, like a wall — brick by brick, act by act. On the summit, they say, you can see who you are becoming.',
    challenge: 'Reach a 5-day streak of daily practice.',
    rewardXp: 50,
  },
  {
    id: 'river',
    name: 'River of Compassion',
    emoji: '🌊',
    unlockXp: 800,
    tagline: 'Where the heart learns to flow.',
    story:
      'Down from the mountain runs a wide, generous river. "The highest good is like water," reads the boatman\'s sail: "it benefits all things without contending." The river does not choose which fields to nourish. Ferrymen here carry travellers across without payment, saying only: "Someone once carried me." To cross, you must have carried others.',
    challenge: 'Complete 15 daily virtue challenges and send encouragement to 5 fellow travellers.',
    rewardXp: 60,
  },
  {
    id: 'city',
    name: 'City of Harmony',
    emoji: '🏙️',
    unlockXp: 1500,
    tagline: 'Where the journey becomes a home.',
    story:
      'At last: a city with open gates and no walls. In its squares, the old are cared for, the young are taught, and strangers are greeted as kin — the Great Harmony 大同, not as a dream but as a daily practice. You understand now that this city is not a destination. It is built, everywhere, by people who took the same road you did: learn, cultivate, practise, contribute.',
    challenge: 'Reach the rank of Contributor and complete every other region\'s challenge.',
    rewardXp: 100,
  },
];
