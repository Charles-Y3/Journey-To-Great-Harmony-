import type { Locale } from './types';
import { localized, type Localized } from './types';
import { L } from './L';

// Every static UI-chrome string in the app, authored in English and
// Simplified Chinese. Traditional Chinese is derived automatically (see
// scripts/gen-zh-hant.ts / src/i18n/L.ts). Content data (lessons, timeline,
// quotes, etc.) lives in its own localized fields in src/data/*.

export const UI = {
  // ── App shell ──────────────────────────────────────────────────────
  appName: localized('Journey to Great Harmony', '大同之旅'),
  appTagline: localized('Learn · Cultivate · Practise · Contribute', '学习 · 修身 · 力行 · 贡献'),
  settings: localized('Settings', '设置'),

  navToday: localized('Today', '今日'),
  navPractice: localized('Practice', '修行'),
  navKnowledge: localized('Knowledge', '知识'),
  navTimeline: localized('Timeline', '时间线'),
  navForest: localized('Forest', '森林'),
  navMap: localized('Map', '地图'),
  navWorld: localized('World', '世界'),
  navCommunity: localized('Community', '社群'),
  navCollection: localized('Collection', '收藏'),
  navMore: localized('More', '更多'),

  moreSheetTitle: localized('More', '更多'),
  moreSheetSubtitle: localized(
    'Explore the rest of your journey.',
    '探索你旅程的其他部分。',
  ),

  // ── Settings modal ────────────────────────────────────────────────
  settingsTitle: localized('⚙️ Settings', '⚙️ 设置'),
  settingsLanguageTitle: localized('Language', '语言'),
  settingsLanguageDesc: localized(
    'Choose your language. You can change this anytime.',
    '选择你的语言，随时可以更改。',
  ),
  settingsTestingTitle: localized('Testing tools', '测试工具'),
  settingsTestingDesc: localized(
    'Advancing the day lets you preview streaks and community growth without waiting.',
    '推进日期可以让你无需等待即可预览连续记录与社群成长。',
  ),
  settingsAdvanceDay: localized('⏭️ Advance one day', '⏭️ 推进一天'),
  settingsResetTitle: localized('Reset', '重置'),
  settingsResetDesc: localized(
    'Erase all progress and begin the journey again as a Seeker.',
    '清除所有进度，以「求道者」的身份重新开始旅程。',
  ),
  settingsResetConfirm: localized('Yes, erase everything', '是的，清除一切'),
  settingsCancel: localized('Cancel', '取消'),
  settingsResetBtn: localized('🔄 Reset journey…', '🔄 重置旅程…'),
  settingsFooter: localized(
    'Journey to Great Harmony v1 — your progress is stored privately in this browser.',
    '大同之旅 v1 — 你的进度私密地保存在此浏览器中。',
  ),

  // ── Settings: name ───────────────────────────────────────────────────
  settingsNameTitle: localized('Name', '姓名'),
  settingsNameDesc: localized(
    'How fellow travellers see you in Community and the Great Harmony World.',
    '这是同行者在社群与大同世界中看到你的名字。',
  ),
  settingsNameSave: localized('Save', '保存'),

  // ── Settings: notifications ─────────────────────────────────────────
  settingsNotifTitle: localized('Notifications', '通知'),
  settingsNotifDesc: localized(
    "Get a gentle reminder for your evening reflection, and to keep today's practice from slipping. Reminders only work while this app is open in a browser tab.",
    '为你的夜间反思送上温和的提醒，也提醒你别错过今天的修习。提醒仅在此应用于浏览器标签页中保持开启时才会生效。',
  ),
  settingsNotifOn: localized('🔔 Reminders on', '🔔 提醒已开启'),
  settingsNotifOff: localized('🔕 Enable reminders', '🔕 开启提醒'),
  settingsNotifDenied: localized(
    "Notifications are blocked in your browser. Allow them in your browser's site settings to turn this on.",
    '你的浏览器已阻止通知。请在浏览器的网站设置中允许通知，才能开启此功能。',
  ),
  settingsNotifUnsupported: localized("Your browser doesn't support notifications.", '你的浏览器不支持通知功能。'),
  notifyEveningTitle: localized('🪞 Evening Reflection', '🪞 夜间反思'),
  notifyEveningBody: localized(
    'Take a quiet moment to reflect on your day in Journey to Great Harmony.',
    '花一点安静的时间，在《大同之旅》中回顾你的一天吧。',
  ),
  notifyStreakTitle: localized('🔥 Keep your streak alive', '🔥 别让连续记录中断'),
  notifyStreakBody: localized(
    "You haven't practised today yet — a few minutes keeps your journey going.",
    '你今天还没有修习 — 只需几分钟，就能延续你的旅程。',
  ),

  // ── Language onboarding gate ──────────────────────────────────────
  gateWelcome: localized('Welcome', '欢迎'),
  gateSubtitle: localized(
    'Choose your language to begin your journey.',
    '选择你的语言，开始你的旅程。',
  ),
  gateContinue: localized('Begin', '开始'),
  gateChangeLater: localized(
    'You can change this anytime in Settings.',
    '你可以随时在「设置」中更改语言。',
  ),

  // ── Name onboarding gate ────────────────────────────────────────────
  nameGateTitle: localized('What should we call you?', '我们该如何称呼你？'),
  nameGateSubtitle: localized(
    "This is how fellow travellers will know you in Community and the Great Harmony World.",
    '这将是你在社群与大同世界中，被同行者认出的名字。',
  ),
  nameGatePlaceholder: localized('Your name', '你的名字'),
  nameGateContinue: localized('Continue', '继续'),
  nameGateSkip: localized('Skip for now', '暂时跳过'),

  // ── Modal / celebration ───────────────────────────────────────────
  close: localized('Close', '关闭'),
  celebrateContinue: localized('Continue', '继续'),

  // ── Today ─────────────────────────────────────────────────────────
  todayTitle: localized('Today', '今日'),
  todayJourneyCard: localized('Your 10-minute journey', '你的十分钟旅程'),
  taskMorningTitle: localized('Morning intention', '晨间立志'),
  taskMorningDesc: localized(
    "Receive today's wisdom and set your intention.",
    '领受今日的智慧，立下你的心愿。',
  ),
  taskLearnTitle: localized('Learn something', '学一点新知'),
  taskLearnDesc: localized(
    'Complete a short lesson on the Knowledge Path or Timeline.',
    '在知识之路或时间线上完成一课。',
  ),
  taskChallengePrefix: localized('Virtue challenge', '德行挑战'),
  taskEveningTitle: localized('Evening reflection', '夜间反思'),
  taskEveningDesc: localized(
    'Look back on the day with honesty and kindness.',
    '以诚实而温柔的心回顾这一天。',
  ),
  taskEveningDone: localized('Reflection written — well done.', '反思已写下 — 做得好。'),
  ctaBegin: localized('Begin', '开始'),
  ctaLearn: localized('Learn', '学习'),
  ctaPractise: localized('Practise', '践行'),
  ctaReflect: localized('Reflect', '反思'),
  todayFullHarmony: localized(
    '🎉 Full harmony today — your forest and the world both grew!',
    '🎉 今日圆满和谐 — 你的森林与世界都成长了！',
  ),
  statStreak: localized('day streak', '天连续记录'),
  statForest: localized('forest', '森林'),
  statWorld: localized('world', '世界'),
  statVisit: localized('visit', '前往'),
  statWisdomXp: localized('wisdom XP', '智慧经验'),
  keepExploringTitle: localized('Keep exploring', '继续探索'),
  keepExploringBody: localized(
    "Study humanity's story on the Wisdom Timeline, walk the Journey Map, cheer on fellow travellers in the Community, or browse your Collection.",
    '在智慧时间线上研读人类的故事，走上旅程地图，在社群中为同行者加油，或浏览你的收藏。',
  ),

  // ── Practice ──────────────────────────────────────────────────────
  practiceTitle: localized('Daily Virtue Practice', '每日德行修习'),
  practiceSubtitle: localized(
    'Knowledge alone does not transform people. Practice does.',
    '知识本身并不能改变一个人，践行才能。',
  ),
  morningCardTitle: localized('🌅 Morning Reflection', '🌅 晨间反思'),
  intentionSetLabel: localized('Intention set', '心愿已立'),
  intentionPrompt: localized(
    'What is your intention for today? One honest sentence is enough.',
    '你今天的心愿是什么？一句真诚的话就够了。',
  ),
  intentionPlaceholder: localized('Today I will…', '今天我会…'),
  intentionBtn: localized('Set intention (+5 XP)', '立下心愿 (+5 经验)'),
  challengeComplete: localized('Challenge complete ✓', '挑战完成 ✓'),
  challengeNoteLabel: localized('Your note', '你的记录'),
  challengeNotePlaceholder: localized('Optional: how did it go?', '选填：进行得如何？'),
  challengeBtn: localized('I practised this today (+15 XP)', '我今天践行了 (+15 经验)'),
  eveningCardTitle: localized('🪞 Evening Reflection', '🪞 夜间反思'),
  reflectionDone: localized('Reflection written ✓', '反思已写下 ✓'),
  reflectionLearnedLabel: localized('Learned', '学到了'),
  reflectionVirtueLabel: localized('Virtue practised', '践行的德行'),
  reflectionTomorrowLabel: localized('Tomorrow', '明日'),
  reflectionIntro: localized(
    'Three questions, honestly but kindly. A sentence each is plenty.',
    '三个问题，诚实而温柔地回答。每题一句话就够了。',
  ),
  reflectionQ1: localized('What did I learn today?', '我今天学到了什么？'),
  reflectionQ2: localized('What virtue did I practise?', '我践行了哪种德行？'),
  reflectionQ3: localized('How can I improve tomorrow?', '明天我可以如何做得更好？'),
  reflectionBtn: localized('Save reflection (+10 XP)', '保存反思 (+10 经验)'),
  journalTitle: localized('📔 Journal', '📔 日志'),
  journalBrowse: localized('Browse journal', '浏览日志'),
  journalClose: localized('Close journal', '关闭日志'),

  // ── Knowledge ─────────────────────────────────────────────────────
  knowledgeTitle: localized('The Knowledge Path', '知识之路'),
  knowledgeSubtitle: localized(
    'A living tree of wisdom. Each completed topic unlocks the deeper ones beneath it.',
    '一棵生长中的智慧之树。完成每个主题，便能解锁其下更深的主题。',
  ),
  lockedPrevLesson: localized('complete the previous lesson first', '请先完成前一课'),
  checkUnderstanding: localized('Check your understanding', '检验你的理解'),
  quizCorrectMsg: localized('✅ Exactly right. (+5 XP)', '✅ 完全正确。(+5 经验)'),
  quizWrongMsg: localized('🤔 Not quite — give it another try.', '🤔 还不太对 — 再试一次吧。'),
  quizTryAgain: localized('Try again', '再试一次'),
  reflectHeading: localized('Reflect', '反思'),
  reflectionOptionalPlaceholder: localized(
    'A sentence of honest reflection (optional)…',
    '写下一句真诚的反思（选填）…',
  ),
  completeLessonBtn: localized('Complete lesson (+20 XP)', '完成本课 (+20 经验)'),
  lessonCompleteLabel: localized('Lesson complete ✓', '本课已完成 ✓'),
  backTo: localized('Back to', '返回'),
  lockedTopic: localized('Complete the topic above to unlock.', '完成上方主题即可解锁。'),

  // ── Timeline ──────────────────────────────────────────────────────
  timelineTitle: localized('The Wisdom Timeline', '智慧时间线'),
  timelineSubtitle: localized(
    "Understanding humanity's journey — how wisdom developed across thousands of years and every culture.",
    '理解人类的旅程 — 智慧如何在数千年间、在每种文化中发展。',
  ),
  keyFigures: localized('Key figures', '重要人物'),
  importantTeachings: localized('Important teachings', '重要教导'),
  relatedConcepts: localized('Related concepts', '相关概念'),
  studiedLabel: localized('Studied ✓', '已研读 ✓'),
  timelineScrollHint: localized('Scroll sideways to travel through time →', '向右滑动，穿越时间 →'),
  timelineLevelLockedNote: localized(
    'Complete the level above first to unlock this one.',
    '请先完成上一关，才能解锁这一关。',
  ),
  timelineDailyCapNote: localized(
    "You've reached today's study limit for the Wisdom Timeline — come back tomorrow for more.",
    '你今天在智慧时间线上的研读额度已用完 — 明天再回来继续吧。',
  ),

  // ── Forest ────────────────────────────────────────────────────────
  forestTitle: localized('Virtue Forest', '德行森林'),
  forestSubtitle: localized(
    'A living picture of your inner cultivation. It grows as you do.',
    '你内在修养的生动写照，随你一同成长。',
  ),
  forestSeedCaption: localized('a seed, waiting for your care…', '一颗种子，静待你的照料…'),
  forestGrowingToward: localized('Growing toward', '正在长成'),
  forestSanctuary: localized(
    '⛩️ Your forest has become a Sanctuary — tend it well.',
    '⛩️ 你的森林已成为圣境 — 请好好守护它。',
  ),
  forestFactorLessons: localized('Lessons completed', '完成课程'),
  forestFactorChallenges: localized('Challenges completed', '完成挑战'),
  forestFactorReflections: localized('Reflections written', '写下反思'),
  forestFactorTimeline: localized('Timeline studies', '时间线研读'),
  forestFactorStreak: localized('Best streak', '最佳连续记录'),
  forestFooter: localized(
    'Every lesson, challenge, reflection, and day of consistency adds growth. There is no shortcut — and no hurry, as the old saying goes: a journey of a thousand miles begins with a single step.',
    '每一课、每次挑战、每篇反思、每一天的坚持，都在增添成长。没有捷径，也无需匆忙。千里之行，始于足下。',
  ),

  // ── Journey Map ───────────────────────────────────────────────────
  mapTitle: localized('Journey Map', '旅程地图'),
  mapSubtitle: localized(
    'Your personal adventure. Each region is a stage of inner growth — unlock them as your wisdom deepens.',
    '属于你的冒险旅程。每个区域都是内在成长的一个阶段 — 随着智慧加深逐一解锁。',
  ),
  regionChallengeLabel: localized('Region challenge', '区域挑战'),
  regionInProgress: localized('Challenge in progress…', '挑战进行中…'),

  // ── World ─────────────────────────────────────────────────────────
  worldTitle: localized('Great Harmony World', '大同世界'),
  worldSubtitle: localized(
    "From individual growth to collective transformation. Every traveller's practice builds this shared world.",
    '从个人成长到集体转化。每位旅人的践行，都在建设这个共享的世界。',
  ),
  worldSceneCaption: localized(
    'The world grows because people grow.',
    '世界因人的成长而成长。',
  ),
  worldReached: localized(
    '🌏 The Great Harmony has been reached — keep tending it.',
    '🌏 大同已经实现 — 请继续用心守护它。',
  ),
  worldYourContribution: localized('your contribution', '你的贡献'),
  worldCommunityContribution: localized('community contribution', '社群贡献'),
  worldTotalHarmony: localized('total harmony', '和谐总量'),
  civicBuildingsTitle: localized('Civic buildings', '公共建筑'),
  todayInCommunity: localized('Today in the community', '今日社群动态'),
  worldWalkersHint: localized(
    'Tap a traveller to hear them say hello, or tap a building to learn about it. Use the arrows to look around the world.',
    '点击一位旅人，听听他们如何打招呼；点击一座建筑，了解它的故事。使用箭头环顾这个世界。',
  ),
  worldRotateLeft: localized('Look left', '向左看'),
  worldRotateRight: localized('Look right', '向右看'),
  worldFooter: localized(
    'In this version your fellow travellers are simulated companions. With community accounts, this world will be built by real people together.',
    '在此版本中，你的同行旅人是模拟的伙伴。未来有了社群账号后，这个世界将由真实的人们共同建设。',
  ),

  // ── Community ─────────────────────────────────────────────────────
  communityTitle: localized('Community', '社群'),
  communitySubtitle: localized(
    'Fellow travellers on the road to Great Harmony. Not a competition — an encouragement.',
    '通往大同之路上的同行者。这不是竞争，而是彼此鼓励。',
  ),
  leaderboardsTitle: localized('Leaderboards', '排行榜'),
  leaderboardsFooter: localized(
    'Rankings measure consistency and contribution, never worth. Everyone here is walking the same road.',
    '排名衡量的是坚持与贡献，而非价值高低。这里的每个人都走在同一条路上。',
  ),
  sendEncouragementTitle: localized('Send encouragement 🌸', '送出鼓励 🌸'),
  sendEncouragementDesc: localized(
    'Celebrate a fellow traveller. Encouragement costs nothing and builds the world (+2 XP, +5 harmony).',
    '为同行者喝彩。鼓励不花费任何代价，还能建设世界 (+2 经验, +5 和谐)。',
  ),
  encourageSentJust: localized('🌸 Sent!', '🌸 已送出！'),
  encourageSentToday: localized('🌸 Sent today', '🌸 今日已送出'),
  encourageBtn: localized('🌸 Encourage', '🌸 鼓励'),
  groupsTitle: localized('Groups', '小组'),
  leaderboardYou: localized('You', '你'),
  catWisdomName: localized('Wisdom', '智慧'),
  catWisdomDesc: localized('Learning completed (XP)', '已完成的学习（经验值）'),
  catPracticeName: localized('Practice', '修行'),
  catPracticeDesc: localized('Daily consistency (streak)', '每日坚持（连续记录）'),
  catCompassionName: localized('Compassion', '慈悲'),
  catCompassionDesc: localized('Challenges & encouragement given', '完成的挑战与给予的鼓励'),
  catGrowthName: localized('Growth', '成长'),
  catGrowthDesc: localized('Overall personal cultivation', '整体的个人修养'),
  groupsBody: localized(
    '🏡 Family journeys · 🏫 School groups · 🧑‍🤝‍🧑 Study circles — travelling together with real friends and family arrives with community accounts in a future version. For now, your simulated companions keep the campfire warm.',
    '🏡 家庭旅程 · 🏫 学校小组 · 🧑‍🤝‍🧑 学习圈 — 与真实的亲友一同结伴同行，将在未来加入社群账号功能后实现。目前，就让模拟的伙伴们先为你守候这团篝火。',
  ),

  // ── Collection ────────────────────────────────────────────────────
  collectionTitle: localized('Collection', '收藏'),
  collectionSubtitle: localized(
    'Wisdom cards and achievement badges gathered along your journey.',
    '旅程中收集到的智慧卡牌与成就徽章。',
  ),
  wisdomCardsTab: localized('🎴 Wisdom Cards', '🎴 智慧卡牌'),
  badgesTab: localized('🏅 Badges', '🏅 徽章'),
  lockedCardTitle: localized('???', '？？？'),
  rarityCommon: localized('common', '普通'),
  rarityRare: localized('rare', '稀有'),
  rarityLegendary: localized('legendary', '传说'),
  categoryFigure: localized('figure', '人物'),
  categoryTeaching: localized('teaching', '教导'),
  categoryVirtue: localized('virtue', '德行'),
  categoryStory: localized('story', '故事'),

  // ── Ranks (fallback labels; see engine/progression.ts for full localized list) ──
  highestRankLabel: localized('highest rank', '最高段位'),
  rankModalTitle: localized('Your Rank', '你的段位'),
  rankModalSubtitle: localized(
    'Every rank on the journey from Seeker to Wisdom Keeper. Progress is measured by consistency, not competition.',
    '从求道者到守智者，旅程中的每一个段位。进步以坚持衡量，而非竞争。',
  ),
  rankModalCurrent: localized('You are here', '你在这里'),

  // ── Capstone reflections ──────────────────────────────────────────────
  capstoneModalTitle: localized('Capstone Reflection', '圆满反思'),
  capstonePlaceholder: localized('Write your reflection here…', '在这里写下你的反思…'),
  capstoneDoneLabel: localized('Capstone written ✓', '圆满反思已写下 ✓'),
} satisfies Record<string, Localized<string>>;

export type UiKey = keyof typeof UI;

export function t(key: UiKey, locale: Locale): string {
  return L(UI[key], locale);
}

// ── Dynamic / templated strings ───────────────────────────────────────
// These combine live numbers/names with locale, so they're plain functions
// rather than static dictionary entries. Each is written with explicit
// English / Simplified / Traditional branches (`pick`) rather than relying
// on the build-time conversion table, since these short connector phrases
// are easiest to author correctly by hand for all three locales at once.

function pick(locale: Locale, en: string, hans: string, hant: string): string {
  if (locale === 'en') return en;
  return locale === 'zh-Hans' ? hans : hant;
}

export function xpBarLabel(locale: Locale, xp: number, toNext: number | null, nextName: string): string {
  if (toNext !== null) {
    return pick(locale, `${xp} XP · ${toNext} to ${nextName}`, `${xp} 经验 · 还差 ${toNext} 至「${nextName}」`, `${xp} 經驗 · 還差 ${toNext} 至「${nextName}」`);
  }
  return pick(locale, `${xp} XP · highest rank`, `${xp} 经验 · 已达最高段位`, `${xp} 經驗 · 已達最高段位`);
}

export function todaySubtitle(locale: Locale, dateStr: string, done: number, total: number): string {
  return pick(
    locale,
    `${dateStr} · ${done}/${total} daily practices complete`,
    `${dateStr} · ${done}/${total} 项每日修习已完成`,
    `${dateStr} · ${done}/${total} 項每日修習已完成`,
  );
}

export function lessonsCompletedToday(locale: Locale, n: number): string {
  return pick(locale, `${n} lesson${n === 1 ? '' : 's'} completed today`, `今天已完成 ${n} 课`, `今天已完成 ${n} 課`);
}

export function journalCount(locale: Locale, n: number): string {
  return pick(
    locale,
    `${n} day${n === 1 ? '' : 's'} recorded on your journey.`,
    `你的旅程中已记录 ${n} 天。`,
    `你的旅程中已記錄 ${n} 天。`,
  );
}

export function topicLessonCount(locale: Locale, done: number, total: number): string {
  return pick(locale, `${done}/${total} lessons`, `${done}/${total} 课`, `${done}/${total} 課`);
}

export function knowledgeProgressLabel(locale: Locale, done: number, total: number): string {
  return pick(locale, `${done}/${total} lessons completed`, `已完成 ${done}/${total} 课`, `已完成 ${done}/${total} 課`);
}

export function timelineProgressLabel(
  locale: Locale,
  done: number,
  total: number,
  erasDone: number,
  erasTotal: number,
): string {
  return pick(
    locale,
    `${done}/${total} points studied · ${erasDone}/${erasTotal} eras complete`,
    `已研读 ${done}/${total} 个节点 · 已完成 ${erasDone}/${erasTotal} 个时代`,
    `已研讀 ${done}/${total} 個節點 · 已完成 ${erasDone}/${erasTotal} 個時代`,
  );
}

export function questionProgress(locale: Locale, i: number, total: number): string {
  return pick(locale, `Question ${i} of ${total}`, `第 ${i} 题，共 ${total} 题`, `第 ${i} 題，共 ${total} 題`);
}

export function nextOrFinish(locale: Locale, isLast: boolean): string {
  if (locale === 'en') return isLast ? 'Finish quiz' : 'Next question';
  if (locale === 'zh-Hans') return isLast ? '完成测验' : '下一题';
  return isLast ? '完成測驗' : '下一題';
}

export function takeQuizBtn(locale: Locale, n: number): string {
  return pick(locale, `Take the quiz (${n} questions)`, `开始测验（共 ${n} 题）`, `開始測驗（共 ${n} 題）`);
}

export function quizResult(locale: Locale, correct: number, total: number): string {
  return pick(
    locale,
    `You answered ${correct} of ${total} correctly.`,
    `你答对了 ${total} 题中的 ${correct} 题。`,
    `你答對了 ${total} 題中的 ${correct} 題。`,
  );
}

export function completeStudyBtn(locale: Locale, xp: number): string {
  return pick(locale, `Complete this study (+${xp} XP)`, `完成研读 (+${xp} 经验)`, `完成研讀 (+${xp} 經驗)`);
}

export function regionUnlockNote(locale: Locale, need: number, have: number): string {
  return pick(
    locale,
    `unlocks at ${need} XP (you have ${have})`,
    `达到 ${need} 经验即可解锁（你目前有 ${have}）`,
    `達到 ${need} 經驗即可解鎖（你目前有 ${have}）`,
  );
}

export function regionCompletedPill(locale: Locale, xp: number): string {
  return pick(locale, `Completed ✓ (+${xp} XP)`, `已完成 ✓ (+${xp} 经验)`, `已完成 ✓ (+${xp} 經驗)`);
}

export function claimGroundBtn(locale: Locale, xp: number): string {
  return pick(locale, `Claim this ground (+${xp} XP)`, `踏上此地 (+${xp} 经验)`, `踏上此地 (+${xp} 經驗)`);
}

export function buildingLockedNote(locale: Locale, threshold: number): string {
  return pick(locale, `Unlocks at ${threshold} total harmony points.`, `和谐总量达到 ${threshold} 即可解锁。`, `和諧總量達到 ${threshold} 即可解鎖。`);
}

export function worldProgressLabel(locale: Locale, total: number, threshold: number, nextName: string): string {
  return pick(
    locale,
    `${total} / ${threshold} harmony points to become a ${nextName}`,
    `${total} / ${threshold} 和谐点，即可成为「${nextName}」`,
    `${total} / ${threshold} 和諧點，即可成為「${nextName}」`,
  );
}

export function encouragementBanner(locale: Locale, names: string[]): string {
  const list = names.join(locale === 'en' ? ', ' : '、');
  if (locale === 'en') {
    return `🌸 ${list} ${names.length === 1 ? 'has' : 'have'} sent you encouragement for your kindness yesterday!`;
  }
  return locale === 'zh-Hans' ? `🌸 ${list} 因为你昨日的善举，为你送来了鼓励！` : `🌸 ${list} 因為你昨日的善舉，為你送來了鼓勵！`;
}

export function cardsTabLabel(locale: Locale, owned: number, total: number): string {
  return `${t('wisdomCardsTab', locale)} (${owned}/${total})`;
}

export function badgesTabLabel(locale: Locale, owned: number, total: number): string {
  return `${t('badgesTab', locale)} (${owned}/${total})`;
}

export function advancedDaysNote(locale: Locale, today: string, dayOffset: number): string {
  if (dayOffset <= 0) {
    return pick(locale, `Simulated date: ${today}.`, `模拟日期：${today}。`, `模擬日期：${today}。`);
  }
  return pick(
    locale,
    `Simulated date: ${today} (advanced ${dayOffset} day${dayOffset === 1 ? '' : 's'}).`,
    `模拟日期：${today}（已推进 ${dayOffset} 天）。`,
    `模擬日期：${today}（已推進 ${dayOffset} 天）。`,
  );
}

export function continueBtn(locale: Locale, remaining: number): string {
  const base = t('celebrateContinue', locale);
  if (remaining <= 0) return base;
  return locale === 'en' ? `${base} (${remaining} more)` : `${base}（还有 ${remaining} 项）`;
}

export function backToTopic(locale: Locale, topicName: string): string {
  return locale === 'en' ? `← Back to ${topicName}` : `← 返回「${topicName}」`;
}

export function newItemsAriaLabel(locale: Locale, count: number): string {
  return pick(locale, `${count} new`, `${count} 个新项目`, `${count} 個新項目`);
}

export function rankXpLabel(locale: Locale, minXp: number): string {
  return pick(locale, minXp === 0 ? 'Starting rank' : `${minXp} XP`, minXp === 0 ? '起始段位' : `${minXp} 经验`, minXp === 0 ? '起始段位' : `${minXp} 經驗`);
}

export function yourContributionLabel(locale: Locale, name: string | null): string {
  if (!name) return t('worldYourContribution', locale);
  return pick(locale, `${name}'s contribution`, `${name} 的贡献`, `${name} 的貢獻`);
}

export function minLengthHint(locale: Locale, current: number, min: number): string {
  if (current >= min) return pick(locale, '✓ Thank you for taking the time.', '✓ 感谢你用心写下这些。', '✓ 感謝你用心寫下這些。');
  return pick(locale, `A little more — ${current}/${min} characters`, `再多写一点 — ${current}/${min} 字`, `再多寫一點 — ${current}/${min} 字`);
}

export function yourNoteLabel(locale: Locale, note: string): string {
  return pick(locale, `Your note: "${note}"`, `你的记录：「${note}」`, `你的記錄：「${note}」`);
}

export function capstoneEraPrompt(locale: Locale, eraName: string): string {
  return pick(
    locale,
    `You've studied every point of the "${eraName}" era. Write a longer reflection on what it taught you to earn its era badge.`,
    `你已经研读完「${eraName}」时代的每一个节点。写下一篇更完整的反思，谈谈它教会了你什么，即可获得该时代徽章。`,
    `你已經研讀完「${eraName}」時代的每一個節點。寫下一篇更完整的反思，談談它教會了你什麼，即可獲得該時代徽章。`,
  );
}

export function capstoneBranchPrompt(locale: Locale, branchName: string): string {
  return pick(
    locale,
    `You've mastered every topic in the "${branchName}" branch. Write a longer reflection on how it has shaped you to earn its mastery badge.`,
    `你已经修完「${branchName}」分支的每一个主题。写下一篇更完整的反思，谈谈它如何塑造了你，即可获得该分支的圆满徽章。`,
    `你已經修完「${branchName}」分支的每一個主題。寫下一篇更完整的反思，談談它如何塑造了你，即可獲得該分支的圓滿徽章。`,
  );
}

export function capstoneEntryBtn(locale: Locale, name: string): string {
  return pick(locale, `Write capstone reflection: ${name}`, `写下圆满反思：${name}`, `寫下圓滿反思：${name}`);
}

export function capstoneSubmitBtn(locale: Locale, xp: number): string {
  return pick(locale, `Submit capstone reflection (+${xp} XP)`, `提交圆满反思 (+${xp} 经验)`, `提交圓滿反思 (+${xp} 經驗)`);
}

// ── Celebration templates (store.ts) ──────────────────────────────────
// Note: rankName/badgeTitle/cardTitle/stageName/regionName arguments are
// already resolved to the current locale by the caller (via L()).
export function rankUpTitle(locale: Locale, rankName: string): string {
  if (locale === 'en') {
    const article = /^[aeiou]/i.test(rankName) ? 'an' : 'a';
    return `You are now ${article} ${rankName}!`;
  }
  return pick(locale, '', `你现在是「${rankName}」了！`, `你現在是「${rankName}」了！`);
}

export function badgeEarnedTitle(locale: Locale, badgeTitle: string): string {
  return pick(locale, `Badge earned: ${badgeTitle}`, `获得徽章：${badgeTitle}`, `獲得徽章：${badgeTitle}`);
}

export function eraBadgeTitle(locale: Locale, badgeTitle: string): string {
  return pick(locale, `Era badge: ${badgeTitle}`, `时代徽章：${badgeTitle}`, `時代徽章：${badgeTitle}`);
}

export function branchBadgeTitle(locale: Locale, badgeTitle: string): string {
  return pick(locale, `Mastery badge: ${badgeTitle}`, `圆满徽章：${badgeTitle}`, `圓滿徽章：${badgeTitle}`);
}

export function wisdomCardTitle(locale: Locale, cardTitle: string): string {
  return pick(locale, `Wisdom Card: ${cardTitle}`, `智慧卡牌：${cardTitle}`, `智慧卡牌：${cardTitle}`);
}

export function forestGrewTitle(locale: Locale, stageName: string): string {
  return pick(locale, `Your forest grew: ${stageName}!`, `你的森林成长了：${stageName}！`, `你的森林成長了：${stageName}！`);
}

export function forestGrewSubtitle(locale: Locale): string {
  return pick(locale, 'Visit the Virtue Forest to see it.', '前往德行森林去看看吧。', '前往德行森林去看看吧。');
}

export function worldStageTitle(locale: Locale, stageName: string): string {
  return pick(locale, `The community became a ${stageName}!`, `社群已成长为「${stageName}」！`, `社群已成長為「${stageName}」！`);
}

export function regionCompleteTitle(locale: Locale, regionName: string): string {
  return pick(locale, `${regionName} — completed!`, `${regionName} — 已完成！`, `${regionName} — 已完成！`);
}

export function regionCompleteSubtitle(locale: Locale, xp: number): string {
  return pick(locale, `+${xp} XP · The road continues.`, `+${xp} 经验 · 旅途仍在继续。`, `+${xp} 經驗 · 旅途仍在繼續。`);
}
