import type { Challenge } from './types';
import { localized } from '../i18n/types';

// Tier 1: everyday, gentle — available from the start.
// Tier 2: moderate, needs deliberate effort or a little vulnerability —
//         unlocked once the user has some practice behind them.
// Tier 3: deep, genuinely hard — unlocked only at the higher ranks, where
//         the daily practice is meant to ask more of you, not less.
export const CHALLENGES: Challenge[] = [
  // ── Tier 1 ──────────────────────────────────────────────────────────
  { id: 'ch-patience-1', text: localized('Show patience today: when irritation rises, take one full breath before you respond.', '今天练习耐心：当烦躁升起时，先做一次完整的深呼吸，再回应。'), virtue: localized('Patience', '耐心'), emoji: '🐢', tier: 1 },
  { id: 'ch-gratitude-1', text: localized('Express sincere gratitude to someone — tell them exactly what they did and why it mattered.', '向某人真诚表达感激 — 具体说出他们做了什么，以及这为何对你重要。'), virtue: localized('Gratitude', '感恩'), emoji: '🙏', tier: 1 },
  { id: 'ch-help-1', text: localized('Help someone today without being asked — and without expecting anything back.', '今天主动帮助他人，不待人开口，也不求回报。'), virtue: localized('Service', '服务'), emoji: '🤲', tier: 1 },
  { id: 'ch-anger-1', text: localized('Avoid unnecessary anger today. If it flares, name it silently and let it pass like weather.', '今天尽量不生无谓的气。若怒气升起，静静地在心中为它命名，让它如风雨般过去。'), virtue: localized('Calm', '平和'), emoji: '🌊', tier: 1 },
  { id: 'ch-learn-1', text: localized('Spend 15 minutes learning something that makes you a little wiser, not just more informed.', '花15分钟学习一些能让你更有智慧、而不只是更博学的东西。'), virtue: localized('Learning', '学习'), emoji: '📚', tier: 1 },
  { id: 'ch-listen-1', text: localized('In one conversation today, listen completely — no interrupting, no rehearsing your reply.', '今天在一次对话中完全地倾听 — 不打断，也不在心里预演自己的回答。'), virtue: localized('Awareness', '觉察'), emoji: '👂', tier: 1 },
  { id: 'ch-kindness-1', text: localized('Do one deliberate act of kindness for someone who cannot repay you.', '为一位无法回报你的人，刻意做一件善事。'), virtue: localized('Kindness', '仁慈'), emoji: '🌸', tier: 1 },
  { id: 'ch-nature-1', text: localized('Spend a few quiet minutes with nature — sky, tree, or garden — and simply observe.', '花几分钟安静地与自然相处 — 看天空、看树、看花园 — 只是静静观察。'), virtue: localized('Harmony', '和谐'), emoji: '🌳', tier: 1 },
  { id: 'ch-smile-1', text: localized('Greet everyone you meet today warmly, as if each one matters — because they do.', '今天温暖地问候你遇见的每一个人，仿佛他们都很重要 — 因为他们确实如此。'), virtue: localized('Kindness', '仁慈'), emoji: '😊', tier: 1 },
  { id: 'ch-thank3-1', text: localized('Before sleeping, write down three specific things from today you are grateful for.', '睡前写下今天让你心怀感激的三件具体事情。'), virtue: localized('Gratitude', '感恩'), emoji: '✨', tier: 1 },
  { id: 'ch-family-1', text: localized('Give focused, unhurried time to a family member or close friend today.', '今天给家人或挚友一段专注而从容的时间。'), virtue: localized('Devotion', '用心'), emoji: '🏡', tier: 1 },
  { id: 'ch-beauty-1', text: localized('Create or share a little beauty today — tidy a space, share a poem, cook with care.', '今天创造或分享一点美好 — 整理一处空间、分享一首诗、用心做一道菜。'), virtue: localized('Harmony', '和谐'), emoji: '🎨', tier: 1 },

  // ── Tier 2 ──────────────────────────────────────────────────────────
  { id: 'ch-honesty-1', text: localized('Be scrupulously honest all day — including the small, convenient exaggerations.', '今天严格保持诚实 — 包括那些方便顺口的小夸张。'), virtue: localized('Integrity', '正直'), emoji: '🧭', tier: 2 },
  { id: 'ch-forgive-1', text: localized('Choose one small grievance from this week and simply decide to release it.', '从本周中选一件小小的委屈，就此决定放下它。'), virtue: localized('Forgiveness', '宽恕'), emoji: '🕊️', tier: 2 },
  { id: 'ch-humility-1', text: localized('Ask a genuine question of someone you would usually instruct — and learn from their answer.', '向一位你平时习惯指导的人，真诚地提一个问题，并从他们的回答中学习。'), virtue: localized('Humility', '谦逊'), emoji: '🌾', tier: 2 },
  { id: 'ch-encourage-1', text: localized('Encourage someone who is struggling or doubting themselves. Be specific about their strengths.', '鼓励一位正在挣扎或自我怀疑的人，具体说出他们的优点。'), virtue: localized('Encouragement', '鼓励'), emoji: '📣', tier: 2 },
  { id: 'ch-presence-1', text: localized('Do one ordinary task today with complete attention, as if for the first time.', '今天用全然的专注做一件平凡小事，仿佛是第一次做。'), virtue: localized('Awareness', '觉察'), emoji: '🧘', tier: 2 },
  { id: 'ch-complaint-1', text: localized('Go the whole day without complaining. Each time you catch one, find one thing to appreciate instead.', '今天整天不抱怨。每当察觉自己想抱怨，就转而找一件值得感激的事。'), virtue: localized('Contentment', '知足'), emoji: '☀️', tier: 2 },
  { id: 'ch-generous-1', text: localized('Give something away today: your time, your knowledge, or something you own that another needs more.', '今天送出一些东西：你的时间、你的知识，或一件他人更需要的物品。'), virtue: localized('Generosity', '慷慨'), emoji: '🎁', tier: 2 },
  { id: 'ch-praise-1', text: localized("Give away credit today: publicly acknowledge someone's contribution that might go unnoticed.", '今天把功劳让出去：公开肯定一位可能被忽视的人的贡献。'), virtue: localized('Humility', '谦逊'), emoji: '🏵️', tier: 2 },
  { id: 'ch-slow-1', text: localized('Move through today unhurried. Do less, but do it well and completely.', '今天从容地生活。少做一些，但做得用心而完整。'), virtue: localized('Simplicity', '简朴'), emoji: '🍃', tier: 2 },
  { id: 'ch-reachout-1', text: localized('Reach out to someone you have not spoken to in a while, just to ask how they are.', '联系一位许久未联络的人，只是问候他们近况如何。'), virtue: localized('Connection', '连结'), emoji: '💌', tier: 2 },
  { id: 'ch-judgment-1', text: localized('Each time you judge someone today, pause and imagine one struggle they might be carrying.', '今天每当你对人心生评判，先停下来，想象他们可能正承受的一份艰难。'), virtue: localized('Compassion', '慈悲'), emoji: '💗', tier: 2 },
  { id: 'ch-promise-1', text: localized('Make one small promise today — to yourself or another — and keep it exactly.', '今天对自己或他人许下一个小小的承诺，并精确地做到。'), virtue: localized('Integrity', '正直'), emoji: '📜', tier: 2 },
  { id: 'ch-teach-1', text: localized('Share something useful you know with someone who could benefit from it.', '把一件你所知的有用之事，分享给能从中受益的人。'), virtue: localized('Service', '服务'), emoji: '🎓', tier: 2 },
  { id: 'ch-silence-1', text: localized('Take ten minutes of complete silence today. No screens, no input — just you and your breath.', '今天留出十分钟完全的静默 — 不看屏幕，不接收信息 — 只有你与呼吸。'), virtue: localized('Stillness', '静定'), emoji: '🌙', tier: 2 },
  { id: 'ch-waste-1', text: localized('Waste nothing today: food, time, or words. Use what you have with care and respect.', '今天不浪费任何东西：食物、时间、言语。珍惜并善用你所拥有的一切。'), virtue: localized('Simplicity', '简朴'), emoji: '♻️', tier: 2 },
  { id: 'ch-differ-1', text: localized('Listen to an opinion you disagree with today — to understand it, not to answer it.', '今天聆听一个你不认同的观点 — 是为了理解它，而不是反驳它。'), virtue: localized('Discernment', '明辨'), emoji: '⚖️', tier: 2 },
  { id: 'ch-selfkind-1', text: localized('Speak to yourself today as you would to a dear friend — notice and soften harsh self-talk.', '今天像对待挚友一样对待自己 — 觉察并柔化那些苛刻的自我批评。'), virtue: localized('Self-compassion', '自我慈悲'), emoji: '🪞', tier: 2 },

  // ── Tier 3 — deep, unlocked only at the higher ranks ────────────────
  { id: 'ch-apologize-1', text: localized('If you owe anyone an apology — even a small one — offer it today, plainly and without excuses.', '若你欠谁一声道歉 — 哪怕很小 — 今天就坦然说出口，不找借口。'), virtue: localized('Integrity', '正直'), emoji: '🤝', tier: 3 },
  { id: 'ch-deep-conversation-1', text: localized('Have the difficult conversation you have been avoiding, with honesty and care.', '展开一场你一直回避的艰难对话，以诚实而关怀的心态进行。'), virtue: localized('Courage', '勇气'), emoji: '💬', tier: 3 },
  { id: 'ch-deep-silence-1', text: localized('Spend 20 minutes in complete silence and stillness, with no distraction at all.', '花20分钟完全静默独处，不受任何干扰。'), virtue: localized('Stillness', '静定'), emoji: '🕯️', tier: 3 },
  { id: 'ch-deep-forgive-1', text: localized('Write a letter of forgiveness to someone who hurt you — even if you never send it.', '给一位曾伤害过你的人写一封宽恕信 — 即使你永远不会寄出它。'), virtue: localized('Forgiveness', '宽恕'), emoji: '✉️', tier: 3 },
  { id: 'ch-deep-habit-1', text: localized('Name one habit that quietly harms you or others, and go the whole day without it.', '找出一个正默默伤害你或他人的习惯，今天一整天都不去做它。'), virtue: localized('Discipline', '自律'), emoji: '🚫', tier: 3 },
  { id: 'ch-deep-sacrifice-1', text: localized('Give up something you enjoy today, so that someone else can have more.', '今天放弃一件你喜欢的事物，好让别人能拥有更多。'), virtue: localized('Sacrifice', '舍己'), emoji: '🎗️', tier: 3 },
  { id: 'ch-deep-memory-1', text: localized('Sit with a painful memory today, without pushing it away or dramatizing it — just understand it.', '今天静静面对一段痛苦的记忆，不逃避、不夸大，只是去理解它。'), virtue: localized('Acceptance', '接纳'), emoji: '🌗', tier: 3 },
  { id: 'ch-deep-truth-1', text: localized('Tell someone a hard truth they need to hear, gently and with their good in mind.', '温和地、真心为对方着想地，向某人说出他们需要听到的一句真话。'), virtue: localized('Candour', '坦诚'), emoji: '🗝️', tier: 3 },
  { id: 'ch-deep-unseen-1', text: localized('Spend a full hour helping someone with no acknowledgment at all — let it go unseen.', '花一整个小时默默帮助他人，不求任何认可 — 让这份善意无人知晓。'), virtue: localized('Humility', '谦逊'), emoji: '🌑', tier: 3 },
  { id: 'ch-deep-steelman-1', text: localized('Examine a belief you hold strongly, and argue the opposing side as convincingly as you can.', '检视一个你深信不疑的信念，并尽力为其对立面辩护。'), virtue: localized('Discernment', '明辨'), emoji: '🔍', tier: 3 },
];
