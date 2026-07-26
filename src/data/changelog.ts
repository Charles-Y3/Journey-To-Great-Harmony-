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
    version: 8,
    date: '2026-07-27',
    highlights: [
      localized(
        '👥 Companions boards show a nearby band — travellers within one journey rank of you — on all four dedication boards.',
        '👥「同修」四个坚持榜单改为邻近区间 — 只显示与你相差不超过一个旅程等级的旅人。',
      ),
      localized(
        '🌳 Knowledge Path progress tracks your current depth only; daily lesson cap is 8. Depth II–III gained new virtues and lessons.',
        '🌳「知识之路」进度只显示当前层级；每日课程额度改为 8。第二、三层新增德行与课文。',
      ),
    ],
  },
  {
    version: 7,
    date: '2026-07-27',
    highlights: [
      localized(
        '⏳ Sage Lives now covers every Age — Ptahhotep, the Buddha, Jesus, Rumi, Kant, Gandhi, and King join Confucius, Mencius, Laozi, and Socrates.',
        '⏳ 圣哲生平现已覆盖每一个时代 — 普塔霍特普、佛陀、耶稣、鲁米、康德、甘地与金恩，加入孔子、孟子、老子与苏格拉底。',
      ),
      localized(
        '🔗 Ages study points with more than one life (e.g. Gandhi & King) offer a button for each biography.',
        '🔗 对应多条生平的时代研读点（如甘地与金恩）会为每一位提供入口按钮。',
      ),
    ],
  },
  {
    version: 6,
    date: '2026-07-27',
    highlights: [
      localized(
        '👥 Shared road (opt-in) — after a short streak, join anonymous Companions leaderboards and appear with your emoji avatar in others’ Great Harmony World. Needs Upstash Redis on the host; without it, companions stay as before.',
        '👥 共享之路（可选）— 短暂连续记录后，可匿名加入同修榜单，并以表情头像出现在他人的大同世界。需主机配置 Upstash Redis；未配置时，同修仍与以往相同。',
      ),
      localized(
        '🎨 Pick a tiny avatar in Settings — shown on boards and as a World walker when you opt in.',
        '🎨 在设置中选择小小头像 — 加入后会显示在榜单与世界漫步者上。',
      ),
    ],
  },
  {
    version: 5,
    date: '2026-07-26',
    highlights: [
      localized(
        '🔤 Text size in Settings — enlarge reading text (Default / Larger / Largest). Tab labels stay compact so the bottom bar does not wrap.',
        '🔤 设置中的字号 — 放大阅读文字（默认 / 较大 / 最大）。标签栏保持紧凑，底部导航不会换行。',
      ),
    ],
  },
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
