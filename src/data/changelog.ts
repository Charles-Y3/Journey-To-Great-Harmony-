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
