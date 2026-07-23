import type { WisdomCard, Stats } from './types';

export const CARDS: WisdomCard[] = [
  // ── Figures & teachings (from the Wisdom Timeline) ──────────────────
  { id: 'card-maat', title: 'Ma\'at', emoji: '𓂀', rarity: 'common', category: 'teaching', text: 'The ancient Egyptian ideal of truth, balance, and right order — one of humanity\'s first visions of harmony.', unlockHint: 'Study the first civilizations on the Wisdom Timeline.' },
  { id: 'card-socrates', title: 'Socrates', emoji: '🗣️', rarity: 'rare', category: 'figure', text: '"The unexamined life is not worth living." The questioner of Athens, who taught that wisdom begins in humility.', unlockHint: 'Study Socrates on the Wisdom Timeline.' },
  { id: 'card-aristotle', title: 'Aristotle', emoji: '📖', rarity: 'rare', category: 'figure', text: 'Virtue is a habit: we become just by doing just acts. Happiness is a life of excellence, lived at the golden mean.', unlockHint: 'Study Plato & Aristotle on the Wisdom Timeline.' },
  { id: 'card-confucius', title: 'Confucius', zh: '孔子', emoji: '📜', rarity: 'legendary', category: 'figure', text: 'The teacher of ren 仁, who dreamed of Datong 大同 — a world shared by all, where every person is cared for.', unlockHint: 'Study Confucius on the Wisdom Timeline.' },
  { id: 'card-laozi', title: 'Laozi', zh: '老子', emoji: '☯️', rarity: 'legendary', category: 'figure', text: 'Sage of the Dao. "The highest good is like water: it benefits all things without contending."', unlockHint: 'Study Laozi on the Wisdom Timeline.' },
  { id: 'card-mencius', title: 'Mencius', zh: '孟子', emoji: '🌾', rarity: 'rare', category: 'figure', text: 'Human nature is originally good — every heart holds four sprouts of virtue, waiting to be cultivated.', unlockHint: 'Study Mencius on the Wisdom Timeline.' },
  { id: 'card-buddha', title: 'The Buddha', emoji: '🪷', rarity: 'legendary', category: 'figure', text: 'The awakened one, who taught the Middle Way: understanding suffering, and meeting all beings with compassion.', unlockHint: 'Study the Buddha on the Wisdom Timeline.' },
  { id: 'card-jesus', title: 'Jesus of Nazareth', emoji: '✝️', rarity: 'legendary', category: 'figure', text: 'Teacher of the ethic of love: love your neighbour as yourself — and even your enemies.', unlockHint: 'Study Jesus on the Wisdom Timeline.' },
  { id: 'card-rumi', title: 'Rumi', emoji: '🌙', rarity: 'rare', category: 'figure', text: 'Sufi poet of love and unity. "Out beyond ideas of wrongdoing and rightdoing, there is a field."', unlockHint: 'Study the Islamic Golden Age on the Wisdom Timeline.' },
  { id: 'card-kant', title: 'Immanuel Kant', emoji: '💡', rarity: 'rare', category: 'figure', text: '"Dare to know." Treat every person as an end in themselves, never merely as a means.', unlockHint: 'Study the Enlightenment on the Wisdom Timeline.' },
  { id: 'card-gandhi', title: 'Gandhi & King', emoji: '🕊️', rarity: 'legendary', category: 'figure', text: 'Truth-force and the power of love: nonviolence as the weapon of the strong, transforming whole societies.', unlockHint: 'Study the modern thinkers on the Wisdom Timeline.' },

  // ── Virtues (from the Knowledge Path) ───────────────────────────────
  { id: 'card-wisdom', title: 'Wisdom', zh: '智', emoji: '🦉', rarity: 'common', category: 'virtue', text: 'Knowledge is knowing many things; wisdom is knowing how to live.', unlockHint: 'Complete the Wisdom topic on the Knowledge Path.' },
  { id: 'card-kindness', title: 'Kindness', zh: '慈', emoji: '🌸', rarity: 'common', category: 'virtue', text: 'Compassion in everyday clothes. No act of kindness, no matter how small, is ever wasted.', unlockHint: 'Complete the Kindness topic on the Knowledge Path.' },
  { id: 'card-forgiveness', title: 'Forgiveness', zh: '恕', emoji: '🕊️', rarity: 'common', category: 'virtue', text: 'Setting down the poison of resentment. The person freed first is always the one who forgives.', unlockHint: 'Complete the Forgiveness topic on the Knowledge Path.' },
  { id: 'card-service', title: 'Service', zh: '奉献', emoji: '🤲', rarity: 'common', category: 'virtue', text: 'The paradox of giving: those who give themselves away become richer.', unlockHint: 'Complete the Service topic on the Knowledge Path.' },
  { id: 'card-humility', title: 'Humility', zh: '谦', emoji: '🌾', rarity: 'common', category: 'virtue', text: 'The valley spirit: the ocean is king of a hundred rivers because it lies below them.', unlockHint: 'Complete the Humility topic on the Knowledge Path.' },
  { id: 'card-patience', title: 'Patience', zh: '忍', emoji: '🐢', rarity: 'common', category: 'virtue', text: 'Growth has its own pace. Patience is bitter, but its fruit is sweet.', unlockHint: 'Complete the Patience topic on the Knowledge Path.' },
  { id: 'card-integrity', title: 'Integrity', zh: '诚', emoji: '🧭', rarity: 'common', category: 'virtue', text: 'One whole person: no gap between what you believe, say, and do.', unlockHint: 'Complete the Integrity topic on the Knowledge Path.' },
  { id: 'card-reflection', title: 'Reflection', zh: '省', emoji: '🪞', rarity: 'common', category: 'virtue', text: 'The daily mirror. Reflection is how experience becomes wisdom.', unlockHint: 'Complete the Reflection topic on the Knowledge Path.' },
  { id: 'card-discernment', title: 'Discernment', zh: '辨', emoji: '⚖️', rarity: 'common', category: 'virtue', text: 'Judging well: truth from noise, the important from the urgent, the better from the easier.', unlockHint: 'Complete the Discernment topic on the Knowledge Path.' },
  { id: 'card-awareness', title: 'Awareness', zh: '觉', emoji: '🧘', rarity: 'common', category: 'virtue', text: 'Waking up to now. You cannot practise any virtue in a moment you are not present for.', unlockHint: 'Complete the Awareness topic on the Knowledge Path.' },

  // ── Special cards ───────────────────────────────────────────────────
  { id: 'card-week', title: 'Seven Suns', emoji: '🌞', rarity: 'rare', category: 'story', text: 'Seven days of unbroken practice. The seedling does not doubt the sun; it simply turns toward it each morning.', unlockHint: 'Reach a 7-day streak.' },
  { id: 'card-moon', title: 'The Patient Moon', emoji: '🌕', rarity: 'legendary', category: 'story', text: 'Thirty days of practice — a full turn of the moon. What was effort is becoming nature.', unlockHint: 'Reach a 30-day streak.' },
  { id: 'card-datong', title: 'Datong — Great Harmony', zh: '大同', emoji: '🌏', rarity: 'legendary', category: 'teaching', text: '"When the Great Way prevails, the world is shared by all." The dream that unites every tradition you have studied.', unlockHint: 'Complete every era on the Wisdom Timeline.' },
  { id: 'card-bridge', title: 'The Bridge Builder', emoji: '🌉', rarity: 'rare', category: 'story', text: 'Every point of harmony you contribute is a plank in a bridge others will cross. Communities are built this way.', unlockHint: 'Contribute 500 harmony points to the world.' },
];

// Cards not tied to a specific lesson/timeline completion unlock via these rules.
export const SPECIAL_CARD_RULES: { cardId: string; check: (s: Stats) => boolean }[] = [
  { cardId: 'card-week', check: (s) => s.streakBest >= 7 },
  { cardId: 'card-moon', check: (s) => s.streakBest >= 30 },
  { cardId: 'card-datong', check: (s) => s.erasCompleted >= 10 },
  { cardId: 'card-bridge', check: (s) => s.harmonyPoints >= 500 },
];

export function cardById(id: string): WisdomCard | undefined {
  return CARDS.find((c) => c.id === id);
}
