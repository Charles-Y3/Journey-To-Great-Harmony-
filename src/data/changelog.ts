import { localized, type Localized } from '../i18n/types';

export interface ChangelogEntry {
  version: number;
  date: string;
  highlights: Localized<string>[];
}

// Newest first. `version` only ever increases — see lastSeenChangelogVersion
// in state/uiStore.ts, which drives the one-time "What's New" modal in App.tsx.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 4,
    date: '2026-07-26',
    highlights: [
      localized(
        '⏳ Sage Lives — inside Timeline, switch Ages | Lives to walk the biographies of Confucius, Mencius, Laozi, and Socrates (history + life story + quiz).',
        '⏳ 圣哲生平 — 在「时间线」内切换「时代 | 生平」，走进孔子、孟子、老子与苏格拉底的传记（历史背景 + 生平叙事 + 测验）。',
      ),
      localized(
        '🔗 Still Waters and Knowledge can deep-link into a related sage life when the story matches — no new tab, no XP on Still Waters.',
        '🔗「静水」与「知识」可在故事对应时，跳转到相关圣哲生平 — 不加新标签页，翻静水卡也不给经验。',
      ),
      localized(
        '⚖️ Ages and Lives share the same daily study XP budget, so biography chapters never inflate Timeline wave gates or forest Timeline counts.',
        '⚖️「时代」与「生平」共用每日研读经验额度，生平篇章不会打乱时间线波次门槛或森林的时间线计数。',
      ),
    ],
  },
  {
    version: 3,
    date: '2026-07-26',
    highlights: [
      localized(
        '💛 Heart check — name how you feel anytime in Practice (also on Today). Not a lock, just a gentle midday pause.',
        '💛 心念一问 — 随时在「修行」中说出此刻感受（「今日」也有任务）。不设锁，只是温柔的日间停顿。',
      ),
      localized(
        '📋 Today lists more you can do midday: Still Waters, Virtue Glyphs, and encouraging a friend.',
        '📋「今日」列出更多日间可做之事：静水、德行之字、以及鼓励一位朋友。',
      ),
      localized(
        '⏳ Wisdom Timeline daily study XP raised so you are less stuck after morning lessons.',
        '⏳ 智慧时间线每日研读经验额度提高，早晨学完后不易卡住。',
      ),
      localized(
        '👥 Community companions now grow nearer your XP, so serious travellers are not left alone at the top.',
        '👥 社群同修的经验会更贴近你，认真前行的旅人不会独自遥遥领先。',
      ),
      localized(
        '🔄 When a new version is ready, a banner asks you to reload — so you are not stuck on an old build.',
        '🔄 有新版本时，横幅会请你重新加载 — 以免一直停在旧版本。',
      ),
    ],
  },
  {
    version: 2,
    date: '2026-07-25',
    highlights: [
      localized('🧭 A short guided tour for new travellers, right after the pacing intro.', '🧭 为新旅人准备的简短导览，紧接在节奏说明之后。'),
      localized("🔥 A gentle nudge on Today if your streak hasn't been kept up yet by evening.", '🔥 若傍晚了你的连续记录还没保住，今日页会温柔提醒你。'),
      localized("🔄 A once-a-day option to swap a deep challenge for a different one, if it doesn't resonate.", '🔄 若深度挑战不适合今天，每天可换一次不同的挑战。'),
      localized('🧘 A guided stillness timer — built into silence-based challenges, and free to use anytime from Practice.', '🧘 引导式静坐计时器 — 内建于静默类挑战中，也可随时在「修行」中使用。'),
      localized('🌸 A calming breathing pause now precedes evening reflection too, not just challenges.', '🌸 平静的呼吸停顿，如今也在夜间反思前出现，不只是挑战前。'),
      localized("📜 “Card of the week” — a weekly spotlight on a wisdom card from your collection.", '📜「本周之卡」— 每周从你的收藏中，重访一张智慧卡牌。'),
      localized('📊 “My Journey so far” — a single view of everything gathered along the way, in Settings.', '📊「我的旅程至今」— 在设置中，一处纵览你一路积累的一切。'),
    ],
  },
];

export const LATEST_CHANGELOG_VERSION = CHANGELOG[0].version;
