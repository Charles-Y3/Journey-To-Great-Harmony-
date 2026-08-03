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
    version: 15,
    date: '2026-08-03',
    highlights: [
      localized(
        '🖋️ Review capstone reflections after writing them on Knowledge, Timeline, and Sage Lives.',
        '🖋️ 在知识之路、时间线与圣哲生平写下圆满反思后，可再查看。',
      ),
      localized(
        '🎴 Collection rarity tabs show new-card counts that match the Collection badge; Badges tab shows unseen badges.',
        '🎴 收藏稀有度标签显示新卡数量，与收藏角标一致；徽章标签显示未查看徽章。',
      ),
      localized(
        '🧭 Advisor “Ask about…” is a clear two-by-three grid; Journey Map’s last region unlocks at 5500 XP.',
        '🧭 良师「请教关于…」改为整齐的两行三列；旅程地图最终区域于 5500 经验解锁。',
      ),
    ],
  },
  {
    version: 14,
    date: '2026-07-30',
    highlights: [
      localized(
        '🪶 Early Advisor: begin Ptahhotep’s life on Sage Lives to unlock a common figure guide — Ma’at stays the Ages teaching reward.',
        '🪶 更早的良师：在圣哲生平中开始普塔霍特普的生平，即可解锁普通人物向导 — 玛阿特仍是时代研读的教导奖励。',
      ),
      localized(
        '🎴 Collection: rarity-tab “new” dots, unflipped highlights, and SVG art for every wisdom card; Constancy card at a 21-day streak.',
        '🎴 收藏：稀有度标签上的「新」标记、未翻开高亮，以及每张智慧卡的 SVG 插画；连续 21 天可获得「恒」卡。',
      ),
      localized(
        '💧 Still Waters flip no longer interrupts with the feature tour; soft reveal instead of a collapsing card.',
        '💧 静水翻卡不再被功能导览打断；柔和揭示，取代整卡收合。',
      ),
      localized(
        '🌅 Today tips for Advisor, World travellers, quiet return, and the shared road — plus glyph CTAs: Restore / Arrange / Practise.',
        '🌅 今日提示：良师、世界旅人、归来问候与共行之路 — 字谜按钮改为：还原 / 排列 / 再练习。',
      ),
    ],
  },
  {
    version: 13,
    date: '2026-07-29',
    highlights: [
      localized(
        '🪷 Advanced Glyphs: Totem Arrange is live — six relational puzzles (Harmony, Community, Balance, Reciprocity, Courage, Sincerity), unlocked after clearing Intermediate.',
        '🪷 高阶字谜：「图腾摆放」已上线 — 六则关系谜题（和谐、共同体、平衡、恕道、勇气、诚意），完成进阶后解锁。',
      ),
    ],
  },
  {
    version: 12,
    date: '2026-07-29',
    highlights: [
      localized(
        '🧭 New: Advisor (良师). Choose an owned figure card as your guide and ask one question a day — rarer figures answer with more depth.',
        '🧭 新功能：良师。选择一张已拥有的人物卡牌作为你的向导，每天可以请教一个问题 — 稀有度越高的人物，指引越深。',
      ),
      localized(
        '🌊 A gentler start: new paths (Forest, World, Timeline, Companions, Collection, Glyphs) now open gradually as you progress — or choose "Show me everything" in Settings → Journey to see it all at once.',
        '🌊 更温和的开始：森林、世界、时间线、同修、收藏、字谜等新路径，会随你的进展逐步开放 — 也可在「设置 → 旅程」中选择「全部显示」，一次看到全部。',
      ),
      localized(
        '🎴 Collection rebalanced with more common cards and a category icon on every card; Virtue Glyph shuffles are fairer and now support Undo.',
        '🎴 收藏牌组重新调配，普通卡牌更多，每张卡牌都标有类别图标；德行拼图的洗牌更公平，并支持撤销。',
      ),
    ],
  },
  {
    version: 11,
    date: '2026-07-28',
    highlights: [
      localized(
        '🌅 A friendlier day: a clearer core checklist, Keep exploring shortcuts, setup deep-links, encourage-first Companions, a guided first day, time-aware Practice, and short “why this?” hints.',
        '🌅 一天更友好：核心清单更清晰、「继续探索」快捷入口、设置深链、「同修」先鼓励、引导式第一天、按时辰排序的修习，以及简短的「为什么这样」提示。',
      ),
      localized(
        '💧 Still Waters prompt and copy polish; Glyphs Beginner / Intermediate / Advanced tabs with Advanced unlock preview.',
        '💧「静水」提问与文案打磨；「字图」分初级 / 进阶 / 高阶页签，高阶未解锁时可预览。',
      ),
    ],
  },
  {
    version: 10,
    date: '2026-07-27',
    highlights: [
      localized(
        '🎨 Avatar packs unlock with your journey rank — starter faces first, rarer ones as you rise. Locked picks stay visible with an unlock hint.',
        '🎨 头像包随旅程等级解锁 — 先有入门表情，更稀有的随等级开放。未解锁的仍可见，并提示所需等级。',
      ),
    ],
  },
  {
    version: 9,
    date: '2026-07-27',
    highlights: [
      localized(
        '💧 Still Waters grew to ~50 stories with a personal no-repeat shuffle — you only revisit a card after the whole deck has turned. Looking back shows yesterday’s card only.',
        '💧「静水」扩充至约 50 则故事，并采用个人不重复洗牌 — 整副牌走完前不会重遇同一则。回看只保留昨日卡牌。',
      ),
    ],
  },
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
