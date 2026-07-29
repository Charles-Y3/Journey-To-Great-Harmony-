import type { Locale } from './types';
import { localized, type Localized } from './types';
import { L } from './L';

// Every static UI-chrome string in the app, authored in English and
// Simplified Chinese. Traditional Chinese is derived automatically (see
// scripts/gen-zh-hant.ts / src/i18n/L.ts). Content data (lessons, timeline,
// quotes, etc.) lives in its own localized fields in src/data/*.

export const UI = {
  // ── App shell ──────────────────────────────────────────────────────
  appName: localized('Journey to Great Harmony', '大同之路'),
  appTagline: localized('Learn · Cultivate · Practise · Contribute', '学习 · 修身 · 力行 · 贡献'),
  settings: localized('Settings', '设置'),

  navToday: localized('Today', '今日'),
  navPractice: localized('Practice', '修行'),
  navKnowledge: localized('Knowledge', '知识'),
  navTimeline: localized('Timeline', '时间线'),
  navForest: localized('Forest', '森林'),
  navMap: localized('Map', '地图'),
  navWorld: localized('World', '世界'),
  navCommunity: localized('Companions', '同修'),
  navCollection: localized('Collection', '收藏'),
  navGlyphs: localized('Glyphs', '字谜'),
  navTurningPoints: localized('Still Waters', '静水'),
  navAdvisor: localized('Advisor', '良师'),
  navMore: localized('More', '更多'),
  navLockedHint: localized('Unlocks as you progress', '随你的进展逐步解锁'),

  moreSheetTitle: localized('More', '更多'),
  moreSheetSubtitle: localized(
    'Explore the rest of your journey.',
    '探索你旅程的其他部分。',
  ),

  // ── Virtue Glyph sliding puzzles ──────────────────────────────────
  glyphsTitle: localized('Virtue Glyphs', '德行之字'),
  glyphsSubtitle: localized(
    'Bonus logic puzzles: restore virtue characters — modern slides, seal Klotski, then path totems.',
    '额外的逻辑谜题：还原德行汉字 — 现代方块、说文小篆华容道，再到道上图腾。',
  ),
  glyphsTierBeginner: localized('Beginner — Five Constants', '入门 — 五常'),
  glyphsTierBeginnerBlurb: localized(
    'Slide square tiles to restore each modern character.',
    '滑动方块拼块，还原每一个现代汉字。',
  ),
  glyphsTierBeginnerTab: localized('Beginner', '入门'),
  glyphsTierIntermediate: localized('Intermediate — Eight Virtues', '进阶 — 八德'),
  glyphsTierIntermediateBlurb: localized(
    'Slide mixed squares and rectangles to restore each Shuowen seal form.',
    '滑动方块与长方形拼块，还原每一个说文小篆字形。',
  ),
  glyphsTierIntermediateTab: localized('Intermediate', '进阶'),
  glyphsTierAdvanced: localized('Advanced — Path totems', '高阶 — 道上图腾'),
  glyphsTierAdvancedTab: localized('Advanced', '高阶'),
  glyphsTierAdvancedBlurb: localized(
    'Arrange symbolic totem pieces by meaning — free placement, then Contemplate.',
    '按意义摆放图腾碎片 — 自由放置，再点「静观」。',
  ),
  glyphsTierAdvancedLocked: localized(
    'Clear every Intermediate glyph first to unlock this tier.',
    '先解开进阶的每一个字谜，才能解锁这一阶。',
  ),
  glyphsTotemLabel: localized('Totem', '图腾'),
  glyphsTotemContemplate: localized('Contemplate', '静观'),
  glyphsTotemScatter: localized('Scatter', '打散'),
  glyphsTotemHint: localized('Hint', '提示'),
  glyphsTotemScatterPrompt: localized(
    'Arrange the shards until the meaning holds, then Contemplate.',
    '摆好碎片，直到意义成立，再点「静观」。',
  ),
  glyphsTotemRelationsHold: localized('The relations hold.', '关系已成立。'),
  glyphsTotemMeaningRestored: localized('Meaning restored.', '意义已还原。'),
  glyphsTotemSolvedTitle: localized('Totem restored', '图腾已还原'),
  glyphsTotemRulesNote: localized(
    'Win by relation: every shard belongs in the meaning. Arrange freely, then Contemplate — feedback names what is still missing.',
    '以关系取胜：每一片都属意义之中。自由摆放，再点「静观」— 反馈会指出仍缺什么。',
  ),
  glyphsTotemHintLine: localized('Hint {n}/{total}: {text}', '提示 {n}/{total}：{text}'),
  glyphsTierLocked: localized(
    'Clear every Beginner glyph first to unlock this tier.',
    '先解开入门的每一个字谜，才能解锁这一阶。',
  ),
  glyphsClearedLabel: localized('Cleared', '已解开'),
  glyphsPlayBtn: localized('Begin', '开始'),
  glyphsReplayBtn: localized('Play again', '再玩一次'),
  glyphsShuffleBtn: localized('Shuffle', '打乱'),
  glyphsUndoBtn: localized('Undo', '撤销'),
  glyphsPreviewHint: localized(
    "This is what you're rebuilding. Tap Start when you're ready to scramble it.",
    '这是你要还原的样子。准备好后，点按「开始」将它打乱。',
  ),
  glyphsStartBtn: localized('Start', '开始'),
  glyphsHint: localized(
    'Tap a tile next to the empty space to slide it. Restore the character.',
    '点按空格旁的拼块即可滑动。还原这个汉字。',
  ),
  glyphsKlotskiHint: localized(
    'Tap a piece that borders empty space to slide it one step. If it can go two ways, tap it, then tap the empty space you want. Restore the seal form.',
    '点按紧邻空位的拼块，让它滑一步。若可朝两个方向移动，先点拼块，再点你想进入的空位。还原这个小篆字形。',
  ),
  glyphsOracleRefLabel: localized('Seal form', '小篆字形'),
  glyphsKlotskiChooseHint: localized(
    'Tap the highlighted empty space to slide the selected piece there.',
    '点按高亮的空位，让选中的拼块滑入那里。',
  ),
  glyphsSolvedTitle: localized('Character restored', '汉字已还原'),
  glyphsFirstClearNote: localized(
    'First clear — a small bonus for your journey.',
    '首次解开 — 旅途的一点小小奖励。',
  ),
  glyphsReplayNote: localized(
    'Well restored. Practice earns no further XP for this glyph.',
    '还原得很好。此字再次练习不再给予经验。',
  ),
  glyphsCloseBtn: localized('Continue', '继续'),
  glyphsSizeLabel: localized('Grid', '棋盘'),
  glyphsKlotskiLabel: localized('Klotski', '华容道'),
  glyphsInscriptionLabel: localized('Why this form', '何以如此写'),
  openGlyphsCta: localized('Open Glyphs', '打开字谜'),

  // ── Still Waters (daily koan/dilemma card) ──────────────────────────
  turningPointsTitle: localized('Still Waters', '静水'),
  turningPointsSubtitle: localized(
    'One real story a day, up to the moment of choice. Ponder it, then turn the card.',
    '每天一则真实的故事，停在抉择的那一刻。先静静想一想，再翻开卡牌。',
  ),
  turningPointsPrompt: localized('What do you think?', '你怎么看？'),
  turningPointsFlipBtn: localized('Turn the card', '翻开卡牌'),
  turningPointsResolutionLabel: localized('What happened', '后来发生的事'),
  turningPointsQuestionLabel: localized('To sit with', '留待细想'),
  turningPointsYesterdayTitle: localized('Yesterday’s card', '昨日的卡牌'),

  // ── Settings modal ────────────────────────────────────────────────
  settingsTitle: localized('⚙️ Settings', '⚙️ 设置'),
  settingsTabYou: localized('You', '你'),
  settingsTabJourney: localized('Journey', '旅程'),
  settingsTabDevice: localized('Device', '设备'),
  settingsTabAbout: localized('About', '关于'),
  settingsLanguageTitle: localized('Language', '语言'),
  settingsLanguageDesc: localized(
    'Choose your language. You can change this anytime.',
    '选择你的语言，随时可以更改。',
  ),
  settingsTextSizeTitle: localized('Text size', '字号'),
  settingsTextSizeDesc: localized(
    'Enlarge reading text. Tab labels stay the same so the navigation bar does not wrap.',
    '放大阅读文字。标签栏文字保持原样，以免导航换行。',
  ),
  settingsTextSizeDefault: localized('Default', '默认'),
  settingsTextSizeLarger: localized('Larger', '较大'),
  settingsTextSizeLargest: localized('Largest', '最大'),
  settingsTextSizePreview: localized(
    'Preview: The examined life is worth living — and so is a clear line of type.',
    '预览：经过省察的人生值得度过 — 清晰的文字亦然。',
  ),
  settingsResetTitle: localized('Reset', '重置'),
  settingsResetDesc: localized(
    'Erase all progress and begin the journey again as a Seeker.',
    '清除所有进度，以「寻路人」的身份重新开始旅程。',
  ),
  settingsResetConfirm: localized('Yes, erase everything', '是的，清除一切'),
  settingsCancel: localized('Cancel', '取消'),
  settingsResetBtn: localized('🔄 Reset journey…', '🔄 重置旅程…'),
  settingsFooter: localized(
    'Journey to Great Harmony v1.4 — your progress is stored privately in this browser.',
    '大同之路 v1.4 — 你的进度私密地保存在此浏览器中。',
  ),
  settingsDisclaimerTitle: localized('A note before you begin', '开始之前的一点说明'),
  settingsDisclaimerBody: localized(
    'This app is a personal-growth and reflection tool, offered for educational and entertainment purposes. It is not professional medical, psychological, legal, or financial advice, and its content — interpretations of classical teachings — is not a substitute for guidance from a qualified professional or a community you trust. Progress is stored in this browser by default. If you opt in to the shared road in Settings, your display name, avatar, and a few dedication metrics (XP, streak, challenges, encouragements, growth) are sent to a small server so other travellers can see you on Companions boards and in the Great Harmony World — still no email account. There is no guarantee against data loss. Use the app and its content at your own discretion.',
    '本应用是一款个人成长与自省工具，仅供学习与娱乐之用。它并非专业的医疗、心理、法律或财务建议，其内容 — 对经典教导的诠释 — 也不能替代合格专业人士或你所信任的群体所给予的指导。进度默认只保存在此浏览器中。若你在设置中选择走上共享之路，你的显示名、头像，以及少量坚持相关的数值（经验、连续记录、挑战、鼓励、成长）会传到一台小服务器，好让其他旅人在「同修」榜单与大同世界中看见你 — 仍无需邮箱账号。不保证数据不会遗失。使用本应用及其内容，请自行判断、自负其责。',
  ),

  // ── Settings: name ───────────────────────────────────────────────────
  settingsNameTitle: localized('Name', '姓名'),
  settingsNameDesc: localized(
    'How Companions of the Way see you in the shared Great Harmony World.',
    '这是「道上同修」在共享大同世界中看到你的名字。',
  ),
  settingsAvatarTitle: localized('Avatar', '头像'),
  settingsAvatarDesc: localized(
    'A tiny emoji others see on Companions boards and in the Great Harmony World. More faces open as your journey rank rises.',
    '同修榜单与大同世界中，他人会看到的小小表情头像。随着旅程等级提升，会有更多头像开放。',
  ),
  settingsAvatarLocked: localized('Locked', '未解锁'),
  settingsSharedRoadTitle: localized('Shared road', '共享之路'),
  settingsSharedRoadDesc: localized(
    'After a short streak, you may appear on the four Companions boards and as a walker in others’ Great Harmony World. No email — only an anonymous id in this browser, plus your name, avatar, and dedication metrics.',
    '有了短暂的连续记录后，你可以出现在同修的四个榜单上，并在他人的大同世界中漫步。无需邮箱 — 只在此浏览器中保存匿名编号，连同你的名字、头像与坚持相关的数值。',
  ),
  settingsSharedRoadLocked: localized(
    'Set a name and keep a 3-day streak to unlock.',
    '先设定名字，并保持连续 3 天，即可解锁。',
  ),
  settingsSharedRoadJoin: localized('Appear on the shared road', '出现在共享之路上'),
  settingsSharedRoadLeave: localized('Step off the shared road', '离开共享之路'),
  settingsSharedRoadOn: localized('You are visible to other travellers.', '其他旅人可以看见你。'),
  settingsSharedRoadOff: localized('You are only walking with companion archetypes for now.', '目前你只与典型同修同行。'),
  settingsSharedRoadSyncFail: localized(
    'Could not reach the shared road right now. Your choice is saved here — try again later.',
    '此刻无法连上共享之路。你的选择已保存在本地 — 请稍后再试。',
  ),
  settingsNameSave: localized('Save', '保存'),

  // ── Settings: reminders (calendar-based) ────────────────────────────
  settingsReminderTitle: localized('Reminders', '提醒'),
  settingsReminderDesc: localized(
    'Add a daily reminder to your phone or computer\'s own calendar app — a real notification, even with this app fully closed. Pick a time, then tap "Add to Calendar".',
    '将每日提醒加入你手机或电脑自带的日历应用 — 即便本应用完全关闭，也能收到真正的通知。选好时间后，点击「加入日历」即可。',
  ),
  reminderMorningLabel: localized('🌅 Morning: set your intention', '🌅 早晨：立下心愿'),
  reminderMorningDesc: localized('A moment to set your goal for the day.', '花一点时间，为今天立下目标。'),
  reminderMorningSummary: localized('Set your morning intention 🌅', '立下你的晨间心愿 🌅'),
  reminderEveningLabel: localized('🪞 Evening: reflect', '🪞 夜晚：反思'),
  reminderEveningDesc: localized('A moment to look back on how today went.', '花一点时间，回顾今天过得如何。'),
  reminderEveningSummary: localized('Evening reflection time 🪞', '夜间反思时间 🪞'),
  settingsReminderAddBtn: localized('Add to Calendar', '加入日历'),
  settingsReminderFootnote: localized(
    "This downloads a small calendar file (.ics) that repeats daily. Your calendar keeps its own copy — if you change the time above, tap \"Add to Calendar\" again so the reminder matches.",
    '这会下载一个每日重复的日历文件（.ics）。日历应用保存的是它自己的副本 — 若你更改了上方的时间，请再次点击「加入日历」，提醒才会一致。',
  ),
  reminderNudgeMorning: localized(
    'Want a daily nudge to set your intention? Add a morning reminder in Settings.',
    '想每天被提醒立下心愿吗？可在设置中加入早晨提醒。',
  ),
  reminderNudgeEvening: localized(
    'Want a daily nudge to reflect? Add an evening reminder in Settings.',
    '想每天被提醒反思吗？可在设置中加入夜间提醒。',
  ),
  reminderNudgeOpenSettings: localized('Set reminder', '设置提醒'),
  streakNudgeBody: localized(
    'Your streak is waiting — a couple of minutes on Practice keeps it alive tonight.',
    '你的连续记录还在等你 — 花几分钟去修习，今晚就能延续它。',
  ),
  streakNudgeCta: localized('Go to Practice', '前往修行'),
  streakNudgeDismiss: localized('Not now', '暂不'),

  // ── Settings: ambient music ──────────────────────────────────────────
  settingsMusicTitle: localized('Background Music', '背景音乐'),
  settingsMusicDesc: localized(
    'Free, gentle ambient music you can loop while you practise. Generated in your browser — no download, no account needed.',
    '在你修习时可循环播放的免费舒缓背景音乐。由你的浏览器即时生成 — 无需下载，无需账号。',
  ),
  musicTrackOff: localized('Off', '关闭'),
  musicTrackBells: localized('🔔 Temple Bells', '🔔 寺钟'),
  musicTrackChimes: localized('🎋 Wind Chimes', '🎋 风铃'),
  musicVolumeLabel: localized('Volume', '音量'),
  settingsMusicAutoplayNote: localized(
    "Browsers only allow audio to start after you tap a button, so music won't resume automatically when you reopen the app — just pick a track again.",
    '浏览器只允许在你点击按钮之后才播放音效，因此重新打开应用时音乐不会自动恢复 — 只需再次选择曲目即可。',
  ),
  // ── Settings: share ──────────────────────────────────────────────────
  settingsShareTitle: localized('Share', '分享'),
  settingsShareDesc: localized(
    'Know someone who might enjoy this journey too? Share the app with them.',
    '有朋友可能也会喜欢这段旅程吗？把这个应用分享给他们吧。',
  ),
  settingsShareBtn: localized('📤 Share this app', '📤 分享这个应用'),
  shareCopiedConfirmation: localized('✓ Link copied!', '✓ 链接已复制！'),
  shareMessage: localized(
    "I'm on a journey through humanity's wisdom traditions with Journey to Great Harmony — thought you might like it too:",
    '我正透过《大同之路》探索人类的智慧传统 — 想你可能也会喜欢：',
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
  youGateTitle: localized('About you', '关于你'),
  youGateSubtitle: localized(
    'Choose how you appear and how large text should be. You can change these anytime in Settings.',
    '选择你如何现身，以及文字大小。随时可在设置中更改。',
  ),
  youGateChangeLater: localized('You can change these in Settings → You.', '可在「设置 → 你」中随时更改。'),
  nameGateTitle: localized('What should we call you?', '我们该如何称呼你？'),
  nameGateSubtitle: localized(
    'This is how Companions of the Way will know you in the shared world.',
    '这将是「道上同修」在共享世界中认出你的名字。',
  ),
  nameGatePlaceholder: localized('Your name', '你的名字'),
  nameGateContinue: localized('Continue', '继续'),
  nameGateSkip: localized('Skip name for now', '暂时跳过姓名'),
  nameJunkHint: localized(
    'Please enter a real name — not just a repeated character.',
    '请输入一个真实的名字 — 而不只是重复的字符。',
  ),

  // ── Modal / celebration ───────────────────────────────────────────
  close: localized('Close', '关闭'),
  celebrateContinue: localized('Continue', '继续'),

  // ── Topbar info modals ─────────────────────────────────────────────
  streakInfoTitle: localized('🔥 Daily Streak', '🔥 每日连续记录'),
  streakInfoBody: localized(
    "This is how many days in a row you've done at least one practice — a morning intention, a virtue challenge, a lesson, or an evening reflection. Missing a whole day resets it to zero, but your best streak ever is remembered separately (see Badges in your Collection).",
    '这是你连续多少天，至少完成了一项修习 — 晨间心愿、德行挑战、课程，或夜间反思。若整整一天都没有修习，它会归零，但你有史以来最佳的连续记录，会被单独记住（见「收藏」中的徽章）。',
  ),
  harmonyInfoTitle: localized('🌏 Your Harmony Contribution', '🌏 你的和谐贡献'),
  harmonyInfoBody: localized(
    'This is how many harmony points you have personally contributed to the shared Great Harmony World — earned through lessons, challenges, reflections, and encouragement sent to fellow travellers. It adds to the community\'s own growth to advance it through four stages: Village, Town, City, and World (see the World tab).',
    '这是你个人为共享的大同世界，贡献了多少和谐点 — 通过课程、挑战、反思，以及向同修送出的鼓励所获得。它与社群自身的成长相加，共同推动世界经历四个阶段：村庄、城镇、城市，最终迈向「世界」（详见「世界」页面）。',
  ),

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
  taskLearnDescTimeline: localized(
    'Your Knowledge Path is complete — continue on the Wisdom Timeline.',
    '知识之路已走完 — 请到智慧时间线继续研读。',
  ),
  taskLearnDescAllDone: localized(
    'You have finished the Knowledge Path and Timeline studies for now.',
    '知识之路与时间线的研读，你都已完成。',
  ),
  ctaTimeline: localized('Timeline', '时间线'),
  taskChallengePrefix: localized('Virtue challenge', '德行挑战'),
  taskHeartTitle: localized('Heart check', '心念一问'),
  taskHeartDesc: localized(
    'Name how you feel — then take one small fitting step.',
    '说出此刻的感受 — 再迈出一步合宜的小行动。',
  ),
  taskHeartDone: localized('Heart check noted for today.', '今日心念已记下。'),
  taskStillWatersTitle: localized('Still Waters', '静水'),
  taskStillWatersDesc: localized(
    'Sit with today’s short story — no quiz, only a question to carry.',
    '静看今日的短故事 — 没有测验，只有一个可带走的问题。',
  ),
  taskStillWatersDone: localized('You turned today’s card.', '你已翻开今日的卡牌。'),
  taskGlyphTitle: localized('Virtue Glyph', '德行之字'),
  taskGlyphDesc: localized(
    'Restore a character puzzle — modern slides or seal Klotski.',
    '还原一个字谜 — 现代方块滑动或小篆华容道。',
  ),
  taskGlyphDone: localized('You practised a glyph today.', '你今天练习过字谜。'),
  taskEncourageTitle: localized('Encourage a friend', '鼓励一位朋友'),
  taskEncourageDesc: localized(
    'Send a kind word to a companion on the Community board.',
    '在社群榜上，给一位同修送出一句善意。',
  ),
  taskEncourageDone: localized('Encouragement sent today.', '今天已送出鼓励。'),
  taskAlsoToday: localized('Consider doing', '可以考虑'),
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
  ctaHeart: localized('Check in', '问一问'),
  ctaStillWaters: localized('Sit with it', '静看'),
  ctaGlyph: localized('Play', '开始'),
  ctaEncourage: localized('Encourage', '鼓励'),
  heartCardTitle: localized('Heart check', '心念一问'),
  heartCardIntro: localized(
    'Anytime — not a judgment. Name the weather inside, then choose a small next step.',
    '随时可做 — 不是评判。说出内心的天气，再选一个小小的下一步。',
  ),
  heartCardNoteLabel: localized('Optional note', '可选一句话'),
  heartCardNotePlaceholder: localized('One honest line…', '一句诚实的话…'),
  heartCardSaveBtn: localized('Save heart check (+4 XP)', '记下心念（+4 经验）'),
  heartCardUpdateBtn: localized('Update heart check', '更新心念'),
  heartCardSaved: localized('Noted', '已记下'),
  heartCardChange: localized('Choose again', '重新选择'),
  eveningMoodEcho: localized('Earlier today your heart felt', '今天早些时候，你的心感到'),
  todayFullHarmony: localized(
    '🎉 Full harmony today — your forest and the world both grew!',
    '🎉 今日圆满和谐 — 你的森林与世界都成长了！',
  ),
  welcomeBackTitleAnon: localized('👋 Welcome back', '👋 欢迎回来'),
  welcomeBackTasksHeading: localized("Today's journey", '今日的旅程'),
  welcomeBackContinue: localized("Let's go", '出发吧'),
  statStreak: localized('day streak', '天连续记录'),
  statForest: localized('forest', '森林'),
  statWorld: localized('world', '世界'),
  statVisit: localized('visit', '前往'),
  statWisdomXp: localized('wisdom XP', '智慧经验'),
  weeklyEchoTitle: localized('Card of the week', '本周之卡'),
  weeklyEchoSubtitle: localized('A wisdom card from your collection, revisited.', '从你的收藏中，重访一张智慧卡牌。'),
  journeyRecapTitle: localized('My Journey so far', '我的旅程至今'),
  journeyRecapRankLabel: localized('rank', '段位'),
  journeyRecapCardsLabel: localized('wisdom cards', '智慧卡牌'),
  journeyRecapBadgesLabel: localized('badges', '徽章'),
  journeyRecapCapstonesLabel: localized('capstone reflections', '圆满反思'),
  journeyRecapSettingsTitle: localized('📊 My Journey so far', '📊 我的旅程至今'),
  journeyRecapSettingsDesc: localized(
    'A single view of everything you have gathered along the way.',
    '一处纵览你一路以来所积累的一切。',
  ),
  journeyRecapOpenBtn: localized('View recap', '查看总览'),
  setupTipsTitle: localized('Settle in for the journey', '安顿好这段旅程'),
  setupTipsBody: localized(
    'A few optional steps help the path stay with you day to day — open Settings anytime to change them.',
    '几件可选的事，能让这条路更好地陪你过日子 — 随时可在设置中更改。',
  ),
  setupTipReminders: localized(
    'Add morning and evening reminders to your calendar, so practice finds you even when the app is closed.',
    '把早晚提醒加入日历，即使应用关闭，修习也会找到你。',
  ),
  setupTipMusic: localized(
    'Turn on soft temple bells or wind chimes while you read and reflect.',
    '阅读与反思时，可打开轻柔的寺钟或风铃作为背景。',
  ),
  setupTipInstall: localized(
    "Install this journey on your phone's home screen for offline use and a quieter focus.",
    '把这段旅程安装到手机主屏幕，便于离线使用，也更安静专注。',
  ),
  setupTipsOpenSettings: localized('Open Settings', '打开设置'),
  setupTipsRemindersBtn: localized('Reminders', '提醒'),
  setupTipsMusicBtn: localized('Music', '音乐'),
  setupTipsInstallBtn: localized('Install', '安装'),
  setupTipsDismiss: localized('Got it', '知道了'),

  whyEveningLock: localized(
    'Reflection works best after the day has unfolded — not as a morning plan.',
    '反思最好在一天真正展开之后，而不是当作早晨的计划。',
  ),
  whyMinLength: localized(
    'A few real words help the practice stick — not a checkbox.',
    '几句真心话更能让修习留下痕迹 — 不只是打个勾。',
  ),
  whyCalendarReadd: localized(
    'Your calendar app keeps its own copy — change the time here, then tap Add to Calendar again.',
    '日历应用保存的是它自己的副本 — 在这里改时间后，请再点一次「加入日历」。',
  ),
  whyQuizRetry: localized(
    'Wrong answers reshuffle so you learn by finding the right one — not by seeing it revealed.',
    '答错会重新打乱选项，好让你自己找出正解 — 而不是直接看到答案。',
  ),
  practiceExpand: localized('Show', '展开'),
  practiceCollapse: localized('Hide', '收起'),
  practiceCollapsedDone: localized('Done for now', '已完成'),
  firstDayGuideTitle: localized('Your first small steps', '你的最初几步'),
  firstDayGuideIntro: localized(
    'Start with one of these — that is enough for today. The rest of the path can wait.',
    '从其中一件开始就够了 — 今天这样就好，其余的路可以等。',
  ),
  firstDayGuidePractice: localized('Morning intention', '晨间心愿'),
  firstDayGuideStillWaters: localized('Still Waters', '静水'),
  firstDayGuideLearn: localized('A short lesson', '一小课'),
  firstDayGuideContinue: localized('Continue', '继续'),
  firstDayGuidePracticeDesc: localized('Set one honest intention on Practice.', '在「修习」里立下一个真心的心愿。'),
  firstDayGuideStillWatersDesc: localized('Flip today’s card and sit with it a moment.', '翻开今日的卡片，静静坐一会儿。'),
  firstDayGuideLearnDesc: localized('Read one short teaching on Learn.', '在「学习」里读一小段教诲。'),

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
  challengeNotePlaceholder: localized(
    'What did you actually do? One concrete act is enough…',
    '你实际做了什么？一件具体的事就够…',
  ),
  challengeNoteHint: localized(
    'Witness the act itself — evening reflection is for meaning, not a second report of the same virtue.',
    '记下践行本身 — 夜间反思留给意义，不必再写一遍同一种德行。',
  ),
  textNonsenseHint: localized(
    'That looks like filler or keyboard noise — try a few real words.',
    '这看起来像随意填充或乱按键盘 — 请试着写几句真实的话。',
  ),
  forestMuteLabel: localized('Mute forest sounds', '静音森林声响'),
  forestUnmuteLabel: localized('Unmute forest sounds', '开启森林声响'),
  challengeBreathBtn: localized('Pause, then practise', '先静心，再践行'),
  challengeBtn: localized('I practised this today (+15 XP)', '我今天践行了 (+15 经验)'),
  challengeRerollBtn: localized("🔄 If this doesn't resonate today", '🔄 若今天不适合这个'),
  challengeRerollHint: localized(
    'You can swap a deep challenge for a different one, once per day.',
    '你可以将一个深度挑战换成另一个，每天限一次。',
  ),

  // ── Guided stillness timer ─────────────────────────────────────────
  stillnessTimerStart: localized('Begin', '开始'),
  stillnessTimerPause: localized('Pause', '暂停'),
  stillnessTimerDone: localized('The bell has rung. Well held.', '钟声已响。你安坐住了。'),
  quietMomentTitle: localized('🧘 Take a quiet moment', '🧘 静坐片刻'),
  quietMomentDesc: localized(
    'A guided stillness timer, any time you want one — not just for a challenge.',
    '随时可用的静坐计时器 — 不只是为了挑战。',
  ),
  challengeTimerIntro: localized(
    'This challenge asks for real silence. A guided timer can hold it with you.',
    '这项挑战需要真正的静默。引导式计时器可以陪你一起完成。',
  ),
  breathGateTitle: localized('One full breath', '一次完整的呼吸'),
  breathGateInhale: localized('Breathe in…', '吸气…'),
  breathGateExhale: localized('Breathe out…', '呼气…'),
  breathGateReady: localized('Begin when ready', '准备好了就开始'),
  eveningCardTitle: localized('🪞 Evening Reflection', '🪞 夜间反思'),
  reflectionDone: localized('Reflection written ✓', '反思已写下 ✓'),
  reflectionLearnedLabel: localized('Learned', '学到了'),
  reflectionVirtueLabel: localized('Virtue practised', '践行的德行'),
  reflectionTomorrowLabel: localized('Tomorrow', '明日'),
  reflectionIntro: localized(
    'Evening is for meaning and tomorrow — not another list of what you did. A sentence each is plenty.',
    '夜间留给意义与明日 — 不是再列一遍今天做了什么。每题一句话就够了。',
  ),
  eveningIntentionEcho: localized('This morning you set out to:', '今早你立下的心愿是：'),
  eveningChallengeEcho: localized('Today’s virtue practice:', '今天的德行践行：'),
  reflectionBreathBtn: localized('Pause, then reflect', '先静心，再反思'),
  reflectionQ1: localized('What did I learn today?', '我今天学到了什么？'),
  reflectionQ2: localized(
    'Where did virtue (or its absence) shape you today?',
    '今天，德行（或它的缺席）如何塑造了你？',
  ),
  reflectionQ2AfterChallenge: localized(
    'What did that practice teach you — beyond the act itself?',
    '那次践行，在行动之外，教会了你什么？',
  ),
  reflectionQ3: localized('How can I improve tomorrow?', '明天我可以如何做得更好？'),
  reflectionQ3WithIntention: localized(
    'How did today’s intention go — and how can tomorrow deepen it?',
    '今天的心愿践行得如何 — 明天又可以如何加深？',
  ),
  reflectionBtn: localized('Save reflection (+10 XP)', '保存反思 (+10 经验)'),
  reflectionLockedNote: localized(
    'Today’s reflection is saved in your journal and cannot be rewritten.',
    '今天的反思已写入日志，不可再改写。',
  ),
  eveningLockedNote: localized(
    'Evening Reflection opens at 5pm, once your day has actually happened — come back then.',
    '夜间反思在下午5点后开放，待今天真正过去一些再来吧。',
  ),
  journalTitle: localized('📔 Journal', '📔 日志'),
  journalEmptyTitle: localized('Your journal waits', '你的日志静候着'),
  journalEmptyDesc: localized(
    'Set a morning intention, practise a virtue, or write an evening reflection — each entry becomes a page here.',
    '立下晨间心愿、践行一种德行，或写下夜间反思 — 每一则都会成为这里的一页。',
  ),
  journalBrowse: localized('Browse journal', '浏览日志'),
  journalClose: localized('Close journal', '关闭日志'),
  journalFilterAll: localized('All', '全部'),
  journalFilterIntentions: localized('Intentions', '心愿'),
  journalFilterMoods: localized('Heart', '心念'),
  journalFilterChallenges: localized('Challenges', '挑战'),
  journalFilterReflections: localized('Reflections', '反思'),
  journalFilterEmpty: localized('No entries of this kind yet.', '目前还没有这类记录。'),
  journalMoodLabel: localized('Heart', '心念'),
  journalDateFilterAll: localized('All dates', '所有日期'),
  journalDateFilterFrom: localized('From date', '起始日期'),
  journalDateFilterClear: localized('Clear', '清除'),
  todayIntentionLabel: localized("Today’s intention", '今日心愿'),
  yesterdayWroteLabel: localized('Yesterday you wrote', '昨日你写下'),
  visitForestBanner: localized('Your forest grew — visit?', '你的森林成长了 — 去看看？'),
  visitWorldBanner: localized('The world brightened — see it?', '世界更明亮了 — 去看看？'),
  pacingIntroTitle: localized('A paced journey', '一段缓行的旅程'),
  pacingIntroBody1: localized(
    'This path is cultivation, not a binge. You can only complete a few lessons and timeline studies each day.',
    '这条路是修养，不是狂刷。每天只能完成有限的几课与时间线研读。',
  ),
  pacingIntroBody2: localized(
    'Quizzes ask you to understand before you continue — a wrong answer reshuffles; the right one is not shown.',
    '测验要求你真正理解后才能继续 — 答错会重新洗牌，不会直接揭示正确答案。',
  ),
  pacingIntroBody3: localized(
    'Evening reflection opens at 5pm, so looking back happens after the day has truly unfolded.',
    '夜间反思在下午5点后开放，好让回顾发生在这一天真正展开之后。',
  ),
  pacingIntroBody4: localized(
    'Go gently. The summit was never the point — becoming someone who walks is.',
    '慢慢走。终点从来不是重点 — 成为能行走的人，才是。',
  ),
  pacingIntroContinue: localized('I understand', '我明白了'),
  pacingIntroChoiceLabel: localized('How would you like to begin?', '你想如何开始？'),
  pacingModeEaseIn: localized('Ease me in', '让我慢慢来'),
  pacingModeEaseInDesc: localized(
    'New paths will appear here as you go.',
    '新的路径会随你前行而逐步出现。',
  ),
  pacingModeShowAll: localized('Show me everything', '把一切都显示给我'),
  pacingModeShowAllDesc: localized(
    "I've done this before — show the whole app now. (This can't be switched back later.)",
    '我以前用过类似的应用 — 现在就显示整个应用。（之后无法切换回来。）',
  ),
  settingsPacingTitle: localized('Pacing', '节奏'),
  settingsPacingDesc: localized(
    'Choose whether new paths in the sidebar and More unlock gradually, or everything stays visible.',
    '选择侧边栏与「更多」中的新路径是逐步解锁，还是始终全部可见。',
  ),
  pacingConfirmAllBody: localized(
    "This can't be undone — once everything is unlocked, switching back to \"Ease me in\" won't hide anything again.",
    '此操作无法撤销 — 一旦全部解锁，切换回「让我慢慢来」也不会再隐藏任何内容。',
  ),
  pacingConfirmAllYes: localized('Yes, show everything', '是的，全部显示'),
  pacingEaseInDisabledHint: localized(
    "You've already chosen to show everything — this can't be switched back.",
    '你已选择全部显示 — 此设置无法切换回来。',
  ),
  appTourTitle: localized('A quick look around', '快速导览'),
  appTourIntro: localized(
    'Everything below is already part of your journey — a short map before you begin.',
    '以下这些都已是你旅程的一部分 — 在你启程前，先看一张简短的地图。',
  ),
  appTourClusterDailyTitle: localized('Daily practice', '每日修习'),
  appTourClusterDailyDesc: localized('Where you set an intention, meet a challenge, and reflect each day.', '每天在此立下心愿、迎接挑战、写下反思。'),
  appTourClusterLearningTitle: localized('Learning', '学习'),
  appTourClusterLearningDesc: localized('Study the Knowledge Path and the Wisdom Timeline at your own pace.', '按自己的步调研读知识之路与智慧时间线。'),
  appTourClusterLivingTitle: localized('A living world', '一个鲜活的世界'),
  appTourClusterLivingDesc: localized('Watch your forest grow, the shared world brighten, and your map unfold.', '看着你的森林成长、共享的世界变得明亮、地图逐渐展开。'),
  appTourClusterTogetherTitle: localized('Together, and collecting', '同修与收藏'),
  appTourClusterTogetherDesc: localized('Companions to encourage, wisdom cards and badges to gather, and a puzzle to play.', '可鼓励的同修、可收集的智慧卡牌与徽章，还有一个可玩的谜题。'),
  appTourContinue: localized("Let's begin", '开始吧'),
  whatsNewTitle: localized("What's new", '有什么新变化'),
  whatsNewContinue: localized('Continue', '继续'),
  celebrateVisitForest: localized('Visit your forest', '前往你的森林'),
  celebrateVisitWorld: localized('Visit the world', '前往大同世界'),
  celebrateVisitCollection: localized('Open Collection', '打开收藏'),
  celebrateVisitMap: localized('Open Map', '打开地图'),
  mapArrivalTitle: localized('You have arrived', '你已抵达'),
  mapArrivalContinue: localized('Continue', '继续'),
  cardRevealTap: localized('Reveal', '揭开'),
  collectionFirstPromise: localized(
    'Locked cards wait for your practice. Complete lessons, timeline studies, and challenges — each unlock is a teaching received.',
    '锁住的卡牌等待你的修习。完成课程、时间线研读与挑战 — 每一次解锁，都是一份领受的教导。',
  ),
  quizNudgeReread: localized(
    'Pause and reread the teaching, then try again.',
    '停下来重读教导，再试一次。',
  ),
  quizNudgeBreathe: localized(
    'One breath, then return to what you just learned.',
    '深呼吸一次，再回到你刚学到的内容。',
  ),
  quizNudgeLookAgain: localized(
    'Look again at the key ideas above — the answer is in the teaching.',
    '再看看上方的要点 — 答案就在教导之中。',
  ),
  quizRereadTeaching: localized('Reread teaching', '重读教导'),
  knowledgeDailyCapWhy: localized(
    'Paced on purpose — a few lessons a day keep wisdom from becoming rushed content.',
    '有意放缓节奏 — 每天几课，免得智慧沦为赶进度的内容。',
  ),
  timelineDailyCapWhy: localized(
    'Paced on purpose — the timeline is a lifelong road, not a race.',
    '有意放缓节奏 — 时间线是一生的路，不是赛跑。',
  ),
  weeklyReviewTitle: localized('Weekly harmony review', '每周和谐回顾'),
  weeklyReviewStreak: localized('Your streak', '你的连续记录'),
  weeklyReviewQuote: localized('A teaching from this week', '本周的一则教导'),
  weeklyReviewVirtue: localized('A virtue you practised', '你践行的德行'),
  weeklyReviewThread: localized('From intention to tomorrow', '从心愿到明日'),
  weeklyReviewEmpty: localized(
    'A quiet week so far — set an intention to begin again.',
    '这一周还很安静 — 立下一个心愿，重新开始。',
  ),
  weeklyReviewCta: localized('Set this week’s intention', '立下本周心愿'),
  weeklyReviewContinue: localized('Begin the week', '开始这一周'),
  forestVirtueLeaf: localized(
    'Today’s practised virtue left a leaf in the forest.',
    '今日践行的德行，在森林里留下了一片叶。',
  ),
  settingsExportTitle: localized('Backup & restore', '备份与恢复'),
  settingsExportDesc: localized(
    'Your journey is stored only in this browser. Download a backup so clearing site data or switching devices does not erase it. Import restores progress only — not language, name, or reminders.',
    '你的旅程只保存在此浏览器中。下载备份，以免清除网站数据或更换设备时丢失。导入只会恢复进度 — 不会覆盖语言、姓名或提醒。',
  ),
  settingsExportBtn: localized('Download backup', '下载备份'),
  settingsImportBtn: localized('Import backup…', '导入备份…'),
  settingsImportConfirm: localized(
    'Replace your current journey progress with this backup? This cannot be undone.',
    '用这份备份替换当前的旅程进度？此操作无法撤销。',
  ),
  settingsImportSuccess: localized('Journey restored.', '旅程已恢复。'),
  settingsImportError: localized(
    'That file does not look like a valid journey backup.',
    '这个文件看起来不是有效的旅程备份。',
  ),
  settingsInstallTitle: localized('Install this journey', '安装这段旅程'),
  settingsInstallDesc: localized(
    'Add it to your home screen (or Dock) for offline use and a quieter focus.',
    '把它加到主屏幕（或程序坞），以便离线使用，也更安静专注。',
  ),
  settingsInstallBtn: localized('Install app', '安装应用'),
  settingsInstallDone: localized('Installed on this device', '已安装到此设备'),
  settingsInstallIosSteps: localized(
    'On iPhone or iPad: open this page in Safari, tap the Share button, then choose “Add to Home Screen”. Open it from your home screen like an app.',
    '在 iPhone 或 iPad：用 Safari 打开本页，点击「分享」，再选择「添加到主屏幕」。之后可从主屏幕像应用一样打开。',
  ),
  settingsInstallAndroidSteps: localized(
    'On Android: open the browser menu (⋮), then tap “Install app” or “Add to Home screen”. Chrome and Edge work best.',
    '在 Android：打开浏览器菜单（⋮），再点「安装应用」或「添加到主屏幕」。Chrome 与 Edge 效果最好。',
  ),
  settingsInstallDesktopSteps: localized(
    'On a computer: open your browser menu and choose “Install app” or “Install”. In Safari on Mac, use File → Add to Dock (or Share → Add to Dock).',
    '在电脑上：打开浏览器菜单，选择「安装应用」或「安装」。Mac 上的 Safari 可用「文件」→「添加到程序坞」（或「分享」→「添加到程序坞」）。',
  ),
  settingsInstallOrMenu: localized(
    'Or use your browser’s install / Add to Home Screen option in the menu.',
    '也可在浏览器菜单中选择「安装」或「添加到主屏幕」。',
  ),
  seasonalVirtueTitle: localized('Virtue of the season', '当季德行'),
  yearlyReviewTitle: localized('Yearly harmony review', '年度和谐回顾'),
  yearlyReviewBody: localized(
    'A new turn of the year. Look gently at how far you have walked — then set one intention for the year ahead.',
    '新的一年回转。温柔地看看你走了多远 — 再为前方的一年立下一个心愿。',
  ),
  yearlyReviewCta: localized('Set a new-year intention', '立下新年心愿'),
  yearlyReviewContinue: localized('Begin the year', '开始这一年'),
  newYearRitualTitle: localized('New-year intention', '新年心愿'),
  newYearRitualHint: localized(
    'The year is young. What virtue will you walk with through its seasons?',
    '一年尚早。你将与哪种德行，走过它的四季？',
  ),
  journalPromptFromPast: localized('A thread from your past intention', '来自你过往心愿的线索'),
  journalPromptDefault1: localized('What kindness will you practise today?', '你今天将践行怎样的善意？'),
  journalPromptDefault2: localized('Where can you be a little more patient?', '你能在哪里多一点耐心？'),
  journalPromptDefault3: localized('What is one honest step toward harmony?', '迈向和谐的一步真诚行动是什么？'),
  companionYearsLabel: localized('years on the Way together', '年同修于道'),
  companionYearsNew: localized('Newly walking beside you', '初与你同修'),
  offlineBanner: localized('You’re offline — your journey continues here.', '你处于离线状态 — 旅程仍可在此继续。'),
  updateBannerBody: localized(
    'A new version of the journey is ready.',
    '大同之路有新版本可用。',
  ),
  updateBannerReload: localized('Reload to update', '重新加载以更新'),
  updateBannerLater: localized('Later', '稍后'),
  civicTapSchool: localized('A mind that grows here teaches another. Revisit the Knowledge Path when you can.', '在此成长的心灵，也将教导他人。有空时再走一走知识之路。'),
  civicTapLibrary: localized('From the shelves of wisdom', '来自智慧的书架'),
  civicTapGarden: localized('Patience tends this garden. Visit your Virtue Forest.', '耐心照料着这座花园。去看看你的德行森林。'),
  civicTapCare: localized('Compassion built this place. Send encouragement to a companion.', '慈悲建成此地。向一位同修送出鼓励吧。'),
  civicTapBridge: localized('This bridge is built by encouragement given.', '这座桥，由给予的鼓励建成。'),
  civicTapHall: localized('Eras you have crowned with reflection', '你以反思加冕过的时代'),
  civicTapLocked: localized('Not yet built — keep contributing harmony.', '尚未建成 — 请继续贡献和谐。'),
  civicTapClose: localized('Continue', '继续'),
  civicEncouragementsWeek: localized('Encouragements you sent recently', '你近来送出的鼓励'),
  worldContribYou: localized('You', '你'),
  worldContribCommunity: localized('Community', '社群'),
  worldContribTotal: localized('Total', '合计'),

  // ── Knowledge ─────────────────────────────────────────────────────
  knowledgeTitle: localized('The Knowledge Path', '知识之路'),
  knowledgeSubtitle: localized(
    'Begin with Depth I. Deeper walks open when you finish the one before — your progress is kept.',
    '从第一层开始。完成上一层后，更深的路程才会打开 — 你的进度会保留。',
  ),
  knowledgeDepth1: localized('Depth I · Foundation', '第一层 · 基础'),
  knowledgeDepth2: localized('Depth II · New virtues', '第二层 · 新德行'),
  knowledgeDepth3: localized('Depth III · Mastery', '第三层 · 圆满'),
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
  knowledgeDailyCapNote: localized(
    "You've reached today's lesson limit — come back tomorrow to continue.",
    '你今天的课程额度已用完 — 明天再回来继续吧。',
  ),

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
    "You've reached today's study limit for the Wisdom Timeline — Ages and Lives share this budget. Come back tomorrow for more.",
    '你今天在智慧时间线上的研读额度已用完 —「时代」与「生平」共用这一额度。明天再回来继续吧。',
  ),
  timelineModeAges: localized('Ages', '时代'),
  timelineModeLives: localized('Lives', '生平'),
  livesSubtitle: localized(
    'Walk the lives of the sages — their years, trials, and historical turning points.',
    '走进圣哲的生平 — 他们的岁月、考验，与历史转折。',
  ),
  livesChaptersProgress: localized('Chapters', '篇章'),
  livesHistoricalSetting: localized('In history', '历史背景'),
  livesLifeStory: localized('The life', '生平叙事'),
  livesChapterLocked: localized('Complete the chapter above first.', '请先完成上一篇章。'),
  livesOpenLife: localized('Read the life', '阅读生平'),
  livesOpenTeachings: localized('Study on Ages', '在「时代」中研读'),
  livesRelatedKnowledge: localized('Related on the Knowledge Path', '知识之路上的相关主题'),
  turningPointsReadLife: localized('Read this sage’s life', '阅读这位圣哲的生平'),

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
  forestStagePreviewHint: localized(
    'Tap a reached stage above to see its scene up close.',
    '轻点上方已达成的阶段，近看它的景象。',
  ),
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
  worldSunHint: localized('Tap the sun for a new saying', '轻点太阳，换一句箴言'),
  worldMuteSpeech: localized('Mute travellers’ voices', '静音旅人的声音'),
  worldUnmuteSpeech: localized('Unmute travellers’ voices', '取消静音旅人的声音'),
  worldReached: localized(
    '🌏 The Great Harmony has been reached — keep tending it.',
    '🌏 大同已经实现 — 请继续用心守护它。',
  ),
  worldYourContribution: localized('your contribution', '你的贡献'),
  worldCommunityContribution: localized('community contribution', '社群贡献'),
  worldTotalHarmony: localized('total harmony', '和谐总量'),
  civicBuildingsTitle: localized('Civic buildings', '公共建筑'),
  todayInCommunity: localized('Today in the community', '今日社群动态'),
  worldTravellerGreeting: localized('A fellow companion waves.', '一位同修向您挥手。'),
  worldSelfGreeting: localized("That's you.", '那是你。'),
  worldYouName: localized('You', '你'),
  worldTravellerLang: localized('Shared road', '共享之路'),
  worldWalkersHint: localized(
    'Tap a traveller to hear them say hello, or tap a building to learn about it. Use the arrows to look around the world.',
    '点击一位旅人，听听他们如何打招呼；点击一座建筑，了解它的故事。使用箭头环顾这个世界。',
  ),
  worldRotateLeft: localized('Look left', '向左看'),
  worldRotateRight: localized('Look right', '向右看'),
  worldStagePreviewHint: localized(
    'Tap a reached stage above to see its scene up close.',
    '轻点上方已达成的阶段，近看它的景象。',
  ),
  worldFooter: localized(
    "You'll always have fellow travellers here to grow alongside, cheering you on and building this world with you.",
    '在这里，你永远都会有同修旅人，与你一起成长，为你加油，一同建设这个世界。',
  ),

  // ── Community ─────────────────────────────────────────────────────
  communityTitle: localized('Companions of the Way', '道上同修'),
  communitySubtitle: localized(
    'Archetypal fellow travellers on the road to Great Harmony — companions of the Way, not a contest of worth.',
    '通往大同之路上的典型同修 — 道上的伙伴，而非价值的较量。',
  ),
  communityRealTravellersNote: localized(
    'Names with a shared-road mark are real opted-in travellers; the rest are companion archetypes.',
    '带有共享之路标记的名字是真实选择加入的旅人；其余为典型同修。',
  ),
  communityRealPill: localized('shared road', '共享之路'),
  leaderboardsTitle: localized('Shared dedication', '共同的坚持'),
  leaderboardsFooter: localized(
    'You see fellow travellers within one journey rank of you. These boards are about shared dedication — not a competition or a comparison. Everyone here walks the same road.',
    '你看见的是与你相差不超过一个旅程等级的同修。这些榜单关乎共同的坚持，而非竞赛或比较。这里的每个人都走在同一条路上。',
  ),
  leaderboardsNearbyNote: localized(
    'Nearby band: your rank, and one above or below.',
    '邻近区间：你的等级，以及上下各一档。',
  ),
  sendEncouragementTitle: localized('Send encouragement 🌸', '送出鼓励 🌸'),
  sendEncouragementDesc: localized(
    'Celebrate a companion of the Way. Encouragement costs nothing and builds the world (+2 XP, +5 harmony).',
    '为道上的同修喝彩。鼓励不花费任何代价，还能建设世界 (+2 经验, +5 和谐)。',
  ),
  peerTierActive: localized('active', '活跃'),
  peerTierNormal: localized('regular', '常规'),
  peerTierOccasional: localized('occasional', '偶尔'),
  encourageSentJust: localized('🌸 Sent!', '🌸 已送出！'),
  encourageSentToday: localized('🌸 Sent today', '🌸 今日已送出'),
  encourageBtn: localized('🌸 Encourage', '🌸 鼓励'),
  leaderboardYou: localized('You', '你'),
  catWisdomName: localized('Wisdom', '智慧'),
  catWisdomDesc: localized('Learning completed (XP)', '已完成的学习（经验值）'),
  catPracticeName: localized('Practice', '修行'),
  catPracticeDesc: localized('Daily consistency (streak)', '每日坚持（连续记录）'),
  catCompassionName: localized('Compassion', '慈悲'),
  catCompassionDesc: localized('Challenges & encouragement given', '完成的挑战与给予的鼓励'),
  catGrowthName: localized('Growth', '成长'),
  catGrowthDesc: localized('Overall personal cultivation', '整体的个人修养'),
  // ── Collection ────────────────────────────────────────────────────
  collectionTitle: localized('Collection', '收藏'),
  collectionSubtitle: localized(
    'Wisdom cards and achievement badges gathered along your journey.',
    '旅程中收集到的智慧卡牌与成就徽章。',
  ),
  wisdomCardsTab: localized('🎴 Wisdom Cards', '🎴 智慧卡牌'),
  badgesTab: localized('🏅 Badges', '🏅 徽章'),
  lockedCardTitle: localized('???', '？？？'),
  rarityCommon: localized('Common', '普通'),
  rarityRare: localized('Rare', '稀有'),
  rarityLegendary: localized('Legendary', '传说'),
  categoryFigure: localized('figure', '人物'),
  categoryTeaching: localized('teaching', '教导'),
  categoryVirtue: localized('virtue', '德行'),
  categoryStory: localized('story', '故事'),
  rarityFilterAll: localized('All', '全部'),
  cardSummaryHeading: localized('Summary', '简介'),
  cardQuoteHeading: localized('Quote', '语录'),
  cardDetailHeading: localized('Did you know?', '你知道吗？'),

  // ── Ranks (fallback labels; see engine/progression.ts for full localized list) ──
  highestRankLabel: localized('highest rank', '最高段位'),
  rankModalTitle: localized('Your Rank', '你的段位'),
  rankModalSubtitle: localized(
    'Tap a rank to learn what it means. Progress is measured by consistency, not competition.',
    '点按某个段位，了解它的含义。进步以坚持衡量，而非竞争。',
  ),
  rankModalCurrent: localized('You are here', '你在这里'),
  rankModalBack: localized('Back to all ranks', '返回全部段位'),
  rankModalUnlockedAt: localized('Unlocks at', '解锁于'),

  // ── Capstone reflections ──────────────────────────────────────────────
  capstoneModalTitle: localized('Capstone Reflection', '圆满反思'),
  capstonePlaceholder: localized('Write your reflection here…', '在这里写下你的反思…'),
  capstoneDoneLabel: localized('Capstone written ✓', '圆满反思已写下 ✓'),

  // ── Advisor ───────────────────────────────────────────────────────
  advisorTitle: localized('Your Advisor', '你的良师'),
  advisorPickSubtitle: localized(
    'Choose a figure card to be your advisor. You can ask one question a day.',
    '选择一张人物卡牌，作为你的良师。每天可以提出一个问题。',
  ),
  advisorLockedMessage: localized(
    'Study a figure on the Wisdom Timeline to gain your first advisor.',
    '在智慧时间线上研读一位人物，即可获得你的第一位良师。',
  ),
  advisorChangeCta: localized('Change advisor', '更换良师'),
  advisorChangeLockedHint: localized(
    'You can change advisors again tomorrow.',
    '明日才能更换良师。',
  ),
  advisorAskHeading: localized('Ask about…', '请教关于…'),
  advisorHintText: localized('Pick a topic above to ask today’s question.', '选择上方的主题，提出今日的问题。'),
  advisorComeBackTomorrow: localized(
    'Today’s question is used — come back tomorrow for another.',
    '今日的提问已用完，明日再来。',
  ),
  advisorTopicPatience: localized('Patience', '耐心'),
  advisorTopicAnger: localized('Anger', '怒气'),
  advisorTopicLoss: localized('Loss', '失落'),
  advisorTopicPurpose: localized('Purpose', '志向'),
  advisorTopicRelationships: localized('Relationships', '人际'),
  advisorTopicDoubt: localized('Doubt', '疑惑'),
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
  return pick(
    locale,
    `${n} learning step${n === 1 ? '' : 's'} completed today`,
    `今天已完成 ${n} 次学习`,
    `今天已完成 ${n} 次學習`,
  );
}

/** Remaining XP-granting study slots for Today Learn task copy. */
export function learnRemainingToday(
  locale: Locale,
  done: number,
  lessonLeft: number,
  timelineLeft: number,
): string {
  const left = lessonLeft + timelineLeft;
  if (left <= 0) {
    return pick(
      locale,
      `${done} learning step${done === 1 ? '' : 's'} today — daily study XP is full; you can still read.`,
      `今天已学 ${done} 次 — 今日学习经验已满；仍可继续阅读。`,
      `今天已學 ${done} 次 — 今日學習經驗已滿；仍可繼續閱讀。`,
    );
  }
  return pick(
    locale,
    `${done} done today — about ${left} more XP-granting stud${left === 1 ? 'y' : 'ies'} still open.`,
    `今天已完成 ${done} 次 — 大约还可获得 ${left} 次学习经验。`,
    `今天已完成 ${done} 次 — 大約還可獲得 ${left} 次學習經驗。`,
  );
}

export function minutesLabel(locale: Locale, n: number): string {
  return pick(locale, `${n} min`, `${n} 分钟`, `${n} 分鐘`);
}

export function challengeTimerBtn(locale: Locale, n: number): string {
  return pick(locale, `Start guided timer (${n} min)`, `开始引导计时（${n}分钟）`, `開始引導計時（${n}分鐘）`);
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

export function avatarUnlocksAt(locale: Locale, rankName: string): string {
  return pick(
    locale,
    `Unlocks at ${rankName}`,
    `达到「${rankName}」解锁`,
    `達到「${rankName}」解鎖`,
  );
}

export function knowledgeDepthProgressLabel(
  locale: Locale,
  depthLabel: string,
  done: number,
  total: number,
): string {
  return pick(
    locale,
    `${depthLabel} · ${done}/${total} lessons`,
    `${depthLabel} · ${done}/${total} 课`,
    `${depthLabel} · ${done}/${total} 課`,
  );
}

// A single bar tracks whichever wave is currently active (see Timeline.tsx)
// instead of showing separate "surveyed" and "mastered" bars at once.
export function timelineWaveProgressLabel(locale: Locale, level: 1 | 2 | 3, done: number, total: number): string {
  if (level === 1) {
    return pick(
      locale,
      `Level 1 · Foundations — ${done}/${total} points`,
      `第一关 · 基础 — ${done}/${total} 个节点`,
      `第一關 · 基礎 — ${done}/${total} 個節點`,
    );
  }
  if (level === 2) {
    return pick(
      locale,
      `Level 2 · Deeper Study — ${done}/${total} points`,
      `第二关 · 深入研读 — ${done}/${total} 个节点`,
      `第二關 · 深入研讀 — ${done}/${total} 個節點`,
    );
  }
  return pick(
    locale,
    `Level 3 · Mastery — ${done}/${total} points`,
    `第三关 · 精通 — ${done}/${total} 个节点`,
    `第三關 · 精通 — ${done}/${total} 個節點`,
  );
}

export function timelineWaveLockedNote(locale: Locale, ready: number, total: number): string {
  return pick(
    locale,
    `Every point on the Wisdom Timeline must reach this level before you can go deeper here — ${ready}/${total} ready so far.`,
    `智慧时间线上的每一个节点，都必须先到达这一关，才能在此继续深入 — 目前已有 ${ready}/${total} 个节点准备就绪。`,
    `智慧時間線上的每一個節點，都必須先到達這一關，才能在此繼續深入 — 目前已有 ${ready}/${total} 個節點準備就緒。`,
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

export function badgesTabLabel(locale: Locale, owned: number, total: number): string {
  return `${t('badgesTab', locale)} (${owned}/${total})`;
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
  return pick(
    locale,
    `Write a few honest, meaningful words — ${current}/${min} characters so far`,
    `请写下几句真诚、有意义的话 — 目前 ${current}/${min} 字`,
    `請寫下幾句真誠、有意義的話 — 目前 ${current}/${min} 字`,
  );
}

export function yourNoteLabel(locale: Locale, note: string): string {
  return pick(locale, `Your note: "${note}"`, `你的记录：「${note}」`, `你的記錄：「${note}」`);
}

export function welcomeBackTitle(locale: Locale, name: string): string {
  return pick(locale, `👋 Welcome back, ${name}`, `👋 欢迎回来，${name}`, `👋 歡迎回來，${name}`);
}

export function capstoneEraPrompt(locale: Locale, eraName: string): string {
  return pick(
    locale,
    `You've mastered every point of the "${eraName}" era — all three levels, each one. Write a longer reflection on what it taught you to earn its era badge.`,
    `你已经精通「${eraName}」时代的每一个节点 — 三关皆已完成。写下一篇更完整的反思，谈谈它教会了你什么，即可获得该时代徽章。`,
    `你已經精通「${eraName}」時代的每一個節點 — 三關皆已完成。寫下一篇更完整的反思，談談它教會了你什麼，即可獲得該時代徽章。`,
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

export function capstoneSagePrompt(locale: Locale, sageName: string): string {
  return pick(
    locale,
    `You've walked every chapter of the life of ${sageName}. Write a longer reflection on what this life asks of you to earn its life badge.`,
    `你已经走完${sageName}生平的每一个篇章。写下一篇更完整的反思，谈谈这段生命向你提出了什么要求，即可获得该生平徽章。`,
    `你已經走完${sageName}生平的每一個篇章。寫下一篇更完整的反思，談談這段生命向你提出了什麼要求，即可獲得該生平徽章。`,
  );
}

export function sageBadgeTitle(locale: Locale, badgeTitle: string): string {
  return pick(locale, `Life badge: ${badgeTitle}`, `生平徽章：${badgeTitle}`, `生平徽章：${badgeTitle}`);
}

export function livesChaptersLabel(locale: Locale, done: number, total: number): string {
  return pick(locale, `${done} / ${total} chapters`, `${done} / ${total} 篇章`, `${done} / ${total} 篇章`);
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

export function glyphClearedTitle(locale: Locale, glyphTitle: string): string {
  return pick(locale, `Glyph restored: ${glyphTitle}`, `字谜还原：${glyphTitle}`, `字謎還原：${glyphTitle}`);
}

export function glyphClearedSubtitle(locale: Locale, xp: number, harmony: number): string {
  return pick(
    locale,
    `+${xp} XP · +${harmony} harmony`,
    `+${xp} 经验 · +${harmony} 和谐点`,
    `+${xp} 經驗 · +${harmony} 和諧點`,
  );
}
