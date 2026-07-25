import type { WisdomCard, Stats, CardRarity } from './types';
import { localized } from '../i18n/types';
import { ALL_POINTS } from './timeline';

export const CARDS: WisdomCard[] = [
  // ── Figures & teachings (from the Wisdom Timeline) ──────────────────
  {
    id: 'card-maat',
    title: localized("Ma'at", '玛阿特'),
    emoji: '𓂀',
    rarity: 'common',
    category: 'teaching',
    summary: localized(
      "The ancient Egyptian ideal of truth, balance, and right order — one of humanity's first visions of harmony.",
      '古埃及关于真理、平衡与正当秩序的理想 — 人类最早的和谐愿景之一。',
    ),
    quote: localized(
      'Great is Maat, and lasting is its reward.',
      '玛阿特是伟大的，它的回报恒久长存。',
    ),
    unlockHint: localized('Study the first civilizations on the Wisdom Timeline.', '在智慧时间线上研读最早的文明。'),
    didYouKnow: localized(
      "Ma'at was pictured as a goddess wearing a single ostrich feather. Egyptians believed that after death, the heart was weighed against that feather — a life lived in truth and balance was light enough to pass.",
      '玛阿特被描绘为一位头戴鸵鸟羽毛的女神。古埃及人相信，人死后心脏会被放上天平，与这根羽毛互相称量 — 一生活得真实而平衡的心，才够轻盈，得以通过。',
    ),
  },
  {
    id: 'card-socrates',
    title: localized('Socrates', '苏格拉底'),
    emoji: '🗣️',
    rarity: 'rare',
    category: 'figure',
    summary: localized(
      'The questioner of Athens, who taught that true wisdom begins with admitting how little you know.',
      '雅典的发问者，教导人们真正的智慧始于承认自己所知甚少。',
    ),
    quote: localized('The unexamined life is not worth living.', '未经省察的人生，不值得度过。'),
    unlockHint: localized('Study Socrates on the Wisdom Timeline.', '在智慧时间线上研读苏格拉底。'),
    didYouKnow: localized(
      'Socrates left behind no writings of his own — everything we know comes from his students, chiefly Plato. Condemned to death in 399 BCE for "corrupting the youth," he chose to drink hemlock rather than flee Athens.',
      '苏格拉底从未留下任何自己的著作 — 我们对他的一切了解，都来自他的学生，尤其是柏拉图。公元前399年，他因"败坏青年"而被判处死刑，却选择饮下毒堇汁，而非逃离雅典。',
    ),
  },
  {
    id: 'card-aristotle',
    title: localized('Aristotle', '亚里士多德'),
    emoji: '📖',
    rarity: 'rare',
    category: 'figure',
    summary: localized(
      'Tutor of a young Alexander the Great, who taught that virtue is a habit built through repeated right action.',
      '少年亚历山大大帝的老师，教导德行是透过反复行正义之事所养成的习惯。',
    ),
    quote: localized(
      'Happiness is the meaning and the purpose of life, the whole aim and end of human existence.',
      '幸福，是人生的意义与目的，是人类存在的全部目标与归宿。',
    ),
    unlockHint: localized('Study Plato & Aristotle on the Wisdom Timeline.', '在智慧时间线上研读柏拉图与亚里士多德。'),
    didYouKnow: localized(
      'Aristotle tutored a young Alexander the Great before founding his own school, the Lyceum, in Athens. His work on ethics, logic, and biology shaped Western thought for two thousand years, earning him the medieval title "The Philosopher."',
      '亚里士多德曾担任年少的亚历山大大帝的老师，之后在雅典创立了自己的学院 — 吕克昂学院。他在伦理学、逻辑学与生物学上的著作，塑造了往后两千年的西方思想，中世纪学者甚至直接称他为"哲学家"。',
    ),
  },
  {
    id: 'card-confucius',
    title: localized('Confucius', '孔子'),
    emoji: '📜',
    rarity: 'legendary',
    category: 'figure',
    summary: localized(
      'The teacher of ren (benevolence), who dreamed of Great Harmony — a world shared by all, where every person is cared for.',
      '仁的教导者，梦想着大同 — 一个天下为公、人人皆得其养的世界。',
    ),
    quote: localized('Do not do to others what you do not want done to yourself.', '己所不欲，勿施于人。'),
    unlockHint: localized('Study Confucius on the Wisdom Timeline.', '在智慧时间线上研读孔子。'),
    didYouKnow: localized(
      'Confucius spent over a decade travelling between rival states, offering counsel to rulers who rarely listened. Only after his death did his teachings, gathered by his students into the Analects, become the philosophical foundation of Chinese civilization.',
      '孔子曾用十余年的时间，周游列国，向各国君主进言，却鲜少被真正采纳。直到他去世后，他的弟子将其教导整理成《论语》，才使儒家思想成为中华文明的哲学根基。',
    ),
  },
  {
    id: 'card-laozi',
    title: localized('Laozi', '老子'),
    emoji: '☯️',
    rarity: 'legendary',
    category: 'figure',
    summary: localized(
      'The sage of the Dao, who taught that the softest and most yielding force in the world can overcome the hardest.',
      '道的圣者，教导天下至柔之物，能胜天下至坚之物。',
    ),
    quote: localized(
      'The highest good is like water: it benefits all things without contending.',
      '上善若水，水善利万物而不争。',
    ),
    unlockHint: localized('Study Laozi on the Wisdom Timeline.', '在智慧时间线上研读老子。'),
    didYouKnow: localized(
      'Legend says Laozi, weary of a corrupt court, rode an ox westward to leave civilization behind. At a mountain pass, a gatekeeper begged him to first write down his wisdom — the result, in about five thousand characters, was the Daodejing.',
      '相传老子厌倦了朝廷的腐败，骑着青牛西行，欲远离尘世。行至一处关隘，守关的官吏恳求他先留下自己的智慧再离去 — 于是便有了这部约五千字的《道德经》。',
    ),
  },
  {
    id: 'card-mencius',
    title: localized('Mencius', '孟子'),
    emoji: '🌾',
    rarity: 'rare',
    category: 'figure',
    summary: localized(
      "Confucius's great successor, who taught that human nature is originally good — every heart holds the seeds of virtue.",
      '孔子的伟大继承者，教导人性本善 — 每颗心中都藏有德行的种子。',
    ),
    quote: localized('The great man is one who does not lose the heart of a child.', '大人者，不失其赤子之心者也。'),
    unlockHint: localized('Study Mencius on the Wisdom Timeline.', '在智慧时间线上研读孟子。'),
    didYouKnow: localized(
      "Mencius's mother is said to have moved house three times to find the best environment in which to raise him — a story (\"Mencius's mother, three moves\") still told today to explain his lifelong belief that environment shapes virtue.",
      '相传孟母曾三次迁居，只为替他寻得一个最适宜成长的环境 — "孟母三迁"的故事至今仍被传颂，也说明了他何以终生相信环境足以塑造德行。',
    ),
  },
  {
    id: 'card-buddha',
    title: localized('The Buddha', '佛陀'),
    emoji: '🪷',
    rarity: 'legendary',
    category: 'figure',
    summary: localized(
      'The awakened one, who taught the Middle Way: understanding suffering, and meeting all beings with compassion.',
      '觉悟者，教导中道：了解苦，并以慈悲对待一切众生。',
    ),
    quote: localized(
      'Hatred does not cease by hatred, but only by love; this is the eternal rule.',
      '怨憎不能止怨憎，唯有慈爱方能止息，这是永恒的法则。',
    ),
    unlockHint: localized('Study the Buddha on the Wisdom Timeline.', '在智慧时间线上研读佛陀。'),
    didYouKnow: localized(
      'Born a prince named Siddhartha Gautama, he left his palace at 29 after encountering old age, sickness, and death for the first time. Years of extreme fasting nearly killed him before he found the Middle Way and awakened beneath what is now called the Bodhi Tree.',
      '他生为王子，本名悉达多·乔达摩，29岁那年第一次目睹了老、病、死，便离开了王宫。多年的极端苦行几乎令他丧命，直到他寻得中道，最终在如今被称为"菩提树"下觉悟成道。',
    ),
  },
  {
    id: 'card-jesus',
    title: localized('Jesus of Nazareth', '拿撒勒人耶稣'),
    emoji: '✝️',
    rarity: 'legendary',
    category: 'figure',
    summary: localized(
      'Teacher of the ethic of love: love your neighbour as yourself — and even your enemies.',
      '爱的伦理的教导者：爱人如己 — 甚至爱你的仇敌。',
    ),
    quote: localized(
      'Love your enemies, bless those who curse you, do good to those who hate you.',
      '要爱你们的仇敌，为咒诅你们的祝福，善待恨你们的人。',
    ),
    unlockHint: localized('Study Jesus on the Wisdom Timeline.', '在智慧时间线上研读耶稣。'),
    didYouKnow: localized(
      'Jesus taught publicly for only about three years, left no writings of his own, and was executed as a political criminal by Rome around age 33. Within four centuries, the movement built on his teaching had spread across the Roman Empire and beyond.',
      '耶稣公开传道仅约三年，未曾留下自己的著作，大约33岁时便以政治罪犯的身份被罗马处死。然而在往后不到四百年间，建立在他教导之上的运动，已传遍罗马帝国乃至更远之地。',
    ),
  },
  {
    id: 'card-rumi',
    title: localized('Rumi', '鲁米'),
    emoji: '🌙',
    rarity: 'rare',
    category: 'figure',
    summary: localized(
      'Sufi poet of love and unity, whose grief for a beloved friend poured into verse and the whirling dance.',
      '爱与合一的苏菲诗人，将痛失挚友的悲伤，化作诗篇与旋转的舞蹈。',
    ),
    quote: localized(
      "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.",
      '在是非对错的观念之外，有一片旷野，我将在那里与你相见。',
    ),
    unlockHint: localized('Study the Islamic Golden Age on the Wisdom Timeline.', '在智慧时间线上研读伊斯兰黄金时代。'),
    didYouKnow: localized(
      'Rumi\'s poetry was born from grief: after his beloved friend and teacher Shams of Tabriz vanished, Rumi poured his loss into verse and whirling dance, founding what became the Mevlevi Sufi order — the "whirling dervishes."',
      '鲁米的诗歌，诞生于深切的悲痛之中：在他挚爱的挚友与导师大不里士的沙姆斯失踪之后，鲁米将失落化作诗篇与旋转的舞蹈，由此创立了日后的"梅夫拉维"苏菲教团 — 即"旋转托钵僧"。',
    ),
  },
  {
    id: 'card-kant',
    title: localized('Immanuel Kant', '伊曼努尔·康德'),
    emoji: '💡',
    rarity: 'rare',
    category: 'figure',
    summary: localized(
      'Enlightenment philosopher of Königsberg, who argued that every person must be treated as an end, never merely as a means.',
      '启蒙时代柯尼斯堡的哲学家，主张必须将每个人当作目的本身，而绝不仅仅当作手段。',
    ),
    quote: localized(
      'Dare to know! Have courage to use your own understanding.',
      '敢于求知！要有勇气运用你自己的理智。',
    ),
    unlockHint: localized('Study the Enlightenment on the Wisdom Timeline.', '在智慧时间线上研读启蒙运动。'),
    didYouKnow: localized(
      'Kant reportedly never travelled more than about 16 kilometres from his hometown of Königsberg in his entire life, and his daily walk was so punctual that neighbours were said to set their clocks by it — even as his mind ranged further than almost any philosopher before him.',
      '相传康德终其一生，从未离开过家乡柯尼斯堡十六公里之外，而他每日散步的时间之准时，据说邻居们都以此对表 — 然而他的思想，却比在他之前几乎任何一位哲学家都走得更远。',
    ),
  },
  {
    id: 'card-gandhi',
    title: localized('Gandhi & King', '甘地与金'),
    emoji: '🕊️',
    rarity: 'legendary',
    category: 'figure',
    summary: localized(
      'Twin champions of nonviolence, who showed that the power of love and truth can transform whole societies.',
      '非暴力精神的双子典范，证明了真理与爱的力量足以转化整个社会。',
    ),
    quote: localized(
      'Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.',
      '黑暗无法驱逐黑暗，唯有光明可以；仇恨无法驱逐仇恨，唯有爱可以。',
    ),
    unlockHint: localized('Study the modern thinkers on the Wisdom Timeline.', '在智慧时间线上研读现代思想家。'),
    didYouKnow: localized(
      'Gandhi trained as a lawyer in London and developed satyagraha while working in South Africa, decades before leading India\'s independence movement. Martin Luther King Jr. studied Gandhi\'s writings as a student and later travelled to India to learn his methods firsthand.',
      '甘地曾在伦敦接受律师训练，并在南非工作期间发展出"satyagraha"（真理的力量），那时距离他领导印度独立运动，还有数十年之久。马丁·路德·金求学时便研读过甘地的著作，后来更亲赴印度，实地学习他的方法。',
    ),
  },

  // ── Virtues (from the Knowledge Path) ───────────────────────────────
  {
    id: 'card-wisdom',
    title: localized('Wisdom', '智慧'),
    accent: '智',
    emoji: '🦉',
    rarity: 'common',
    category: 'virtue',
    summary: localized('Knowing how to live well, not merely knowing many things.', '懂得如何好好生活，而不只是知道许多事情。'),
    quote: localized('The only true wisdom is in knowing you know nothing.', '唯一真正的智慧，是明白自己一无所知。'),
    unlockHint: localized('Complete the Wisdom topic on the Knowledge Path.', '在知识之路上完成「智慧」主题。'),
    didYouKnow: localized(
      'The owl has symbolized wisdom since ancient Athens, where it was sacred to Athena, goddess of wisdom and strategy — a reminder that wisdom, like the owl, often sees most clearly in the dark, uncertain moments most people would rather look away from.',
      '猫头鹰自古雅典时代起便象征着智慧，因它是智慧与谋略女神雅典娜的圣鸟 — 这也提醒着我们，智慧就如猫头鹰一般，往往在黑暗与不确定之中看得最为清楚，而那正是大多数人宁愿别过头去的时刻。',
    ),
  },
  {
    id: 'card-kindness',
    title: localized('Kindness', '仁慈'),
    accent: '慈',
    emoji: '🌸',
    rarity: 'common',
    category: 'virtue',
    summary: localized('Compassion in everyday clothes — small acts, freely given.', '慈悲的日常模样 — 微小而自由给予的善举。'),
    quote: localized('No act of kindness, no matter how small, is ever wasted.', '无论多么微小的善举，都不会白费。'),
    unlockHint: localized('Complete the Kindness topic on the Knowledge Path.', '在知识之路上完成「仁慈」主题。'),
    didYouKnow: localized(
      'Researchers call it "moral elevation": simply witnessing someone else\'s act of kindness reliably makes bystanders more likely to help others themselves. Kindness doesn\'t just repeat — it multiplies through people who only ever saw it happen.',
      '研究者称之为"道德提升"：仅仅是目睹他人的一次善举，就足以让旁观者自己也更愿意去帮助别人。仁慈不只是重复 — 它会通过那些仅仅是"看见"过它的人，不断地繁衍增生。',
    ),
  },
  {
    id: 'card-forgiveness',
    title: localized('Forgiveness', '宽恕'),
    accent: '恕',
    emoji: '🕊️',
    rarity: 'common',
    category: 'virtue',
    summary: localized(
      'Setting down the poison of resentment, so you — not just the other person — can be free.',
      '放下怨恨这剂毒药，好让你自己 — 而不只是对方 — 获得自由。',
    ),
    quote: localized('The weak can never forgive. Forgiveness is the attribute of the strong.', '弱者永远无法宽恕，宽恕是强者的特质。'),
    unlockHint: localized('Complete the Forgiveness topic on the Knowledge Path.', '在知识之路上完成「宽恕」主题。'),
    didYouKnow: localized(
      'Modern medicine increasingly echoes the old traditions here: chronic resentment has been linked to elevated stress hormones, while studies of forgiveness practices report measurable drops in blood pressure and anxiety.',
      '现代医学，在这一点上，越来越呼应着古老的传统：长期的怨恨，已被发现与压力激素的升高有关；而关于宽恕练习的研究，则报告了血压与焦虑水平的可测量下降。',
    ),
  },
  {
    id: 'card-service',
    title: localized('Service', '服务'),
    accent: '奉献',
    emoji: '🤲',
    rarity: 'common',
    category: 'virtue',
    summary: localized(
      'The paradox of giving: those who give themselves away become richer, not poorer.',
      '给予的悖论：付出自己的人，反而变得更富足，而非更贫乏。',
    ),
    quote: localized(
      'The best way to find yourself is to lose yourself in the service of others.',
      '找到自我的最好方式，就是在服务他人之中忘却自我。',
    ),
    unlockHint: localized('Complete the Service topic on the Knowledge Path.', '在知识之路上完成「服务」主题。'),
    didYouKnow: localized(
      'Volunteering is one of the more reliable predictors of long-term life satisfaction across cultures and income levels — by some measures, a more reliable one than income itself once basic needs are met.',
      '在不同文化与收入水平之间，志愿服务是长期生活满意度较为可靠的预测因素之一 — 按某些衡量标准，在基本需求得到满足之后，它甚至比收入本身更为可靠。',
    ),
  },
  {
    id: 'card-humility',
    title: localized('Humility', '谦逊'),
    accent: '谦',
    emoji: '🌾',
    rarity: 'common',
    category: 'virtue',
    summary: localized(
      'The valley spirit: true strength lies in placing yourself lower, not higher.',
      '山谷的精神：真正的力量，在于甘居人下，而非高高在上。',
    ),
    quote: localized(
      'The ocean is king of a hundred rivers because it lies below them.',
      '大海之所以为百川之王，正因它甘居于百川之下。',
    ),
    unlockHint: localized('Complete the Humility topic on the Knowledge Path.', '在知识之路上完成「谦逊」主题。'),
    didYouKnow: localized(
      'Confucius reportedly described himself, at the height of his fame, as "not one born with knowledge, but one who loves antiquity and is diligent in seeking it there" — positioning himself as a lifelong student rather than a finished sage.',
      '相传孔子在声名最盛之时，仍如此描述自己："我非生而知之者，好古，敏以求之者也"— 即便功成名就，他仍将自己定位为一名终身的学习者，而非一位已然圆满的圣人。',
    ),
  },
  {
    id: 'card-patience',
    title: localized('Patience', '耐心'),
    accent: '忍',
    emoji: '🐢',
    rarity: 'common',
    category: 'virtue',
    summary: localized(
      'Growth cannot be rushed — forcing it only breaks what you are trying to help.',
      '成长不能被催逼 — 强行拔高，只会毁掉你想帮助的事物。',
    ),
    quote: localized('Patience is bitter, but its fruit is sweet.', '忍耐是苦的，但它的果实是甜的。'),
    unlockHint: localized('Complete the Patience topic on the Knowledge Path.', '在知识之路上完成「耐心」主题。'),
    didYouKnow: localized(
      "The Chinese idiom yà miáo zhù zhǎng (\"pulling up seedlings to help them grow\") comes from the Mencius, and is still used today for any well-meaning effort that damages what it is trying to help by rushing it.",
      '成语"揠苗助长"出自《孟子》，至今仍被用来形容任何出于善意、却因求快而反倒毁掉了所欲帮助之事物的行为。',
    ),
  },
  {
    id: 'card-integrity',
    title: localized('Integrity', '正直'),
    accent: '诚',
    emoji: '🧭',
    rarity: 'common',
    category: 'virtue',
    summary: localized('One whole person — no gap between what you believe, say, and do.', '完整合一的人 — 所信、所言、所行之间，没有裂缝。'),
    quote: localized(
      'Integrity is doing the right thing, even when no one is watching.',
      '正直，就是即便无人注视，仍然做正确的事。',
    ),
    unlockHint: localized('Complete the Integrity topic on the Knowledge Path.', '在知识之路上完成「正直」主题。'),
    didYouKnow: localized(
      'Confucian ethics places special weight on shen du — watchfulness over oneself in solitude: the idea that character is most real not in public, but in the moments no one else will ever know about.',
      '儒家伦理特别看重"慎独" — 独处时对自己的谨守：其核心理念在于，品格最真实的样子，不在于人前，而在于那些无人知晓的时刻。',
    ),
  },
  {
    id: 'card-reflection',
    title: localized('Reflection', '反思'),
    accent: '省',
    emoji: '🪞',
    rarity: 'common',
    category: 'virtue',
    summary: localized('The daily mirror — reflection is how experience becomes wisdom.', '每日的镜子 — 反思，是经验化为智慧的方式。'),
    quote: localized(
      'We do not learn from experience. We learn from reflecting on experience.',
      '我们并非从经验中学习，而是从对经验的反思中学习。',
    ),
    unlockHint: localized('Complete the Reflection topic on the Knowledge Path.', '在知识之路上完成「反思」主题。'),
    didYouKnow: localized(
      "Zengzi's daily three-part self-examination, recorded over 2,400 years ago, is one of history's earliest documented personal-reflection practices — a direct ancestor of the Evening Reflection you write in this app.",
      '曾子"吾日三省吾身"的修习，记录于2400多年前，是历史上最早有文字记载的个人反思修习之一 — 也是你在本应用中所写的"夜间反思"的直系先祖。',
    ),
  },
  {
    id: 'card-discernment',
    title: localized('Discernment', '明辨'),
    accent: '辨',
    emoji: '⚖️',
    rarity: 'common',
    category: 'virtue',
    summary: localized(
      'Judging well — telling truth from noise, the important from the merely urgent.',
      '善于判断 — 在喧嚣中辨明真相，在紧急中辨明真正重要之事。',
    ),
    quote: localized(
      'Not everything that can be counted counts, and not everything that counts can be counted.',
      '并非所有能被计算的都真正重要，也并非所有重要的都能够被计算。',
    ),
    unlockHint: localized('Complete the Discernment topic on the Knowledge Path.', '在知识之路上完成「明辨」主题。'),
    didYouKnow: localized(
      'The Buddha\'s advice to the Kalamas — test any teaching by whether it leads to harm or to welfare, rather than accepting it on tradition or authority alone — is sometimes called Buddhism\'s "charter of free inquiry."',
      '佛陀对迦罗摩人的教导 — 检验任何一项教导，看它是导向伤害还是导向福祉，而非仅凭传统或权威就予以接受 — 有时被称为佛教的"自由探究宪章"。',
    ),
  },
  {
    id: 'card-awareness',
    title: localized('Awareness', '觉察'),
    accent: '觉',
    emoji: '🧘',
    rarity: 'common',
    category: 'virtue',
    summary: localized(
      'Waking up to now — you cannot practise any virtue in a moment you are not present for.',
      '觉醒于当下 — 若你未曾真正临在，便无法在那一刻践行任何德行。',
    ),
    quote: localized(
      'The present moment is the only time over which we have dominion.',
      '当下，是我们唯一真正拥有主权的时刻。',
    ),
    unlockHint: localized('Complete the Awareness topic on the Knowledge Path.', '在知识之路上完成「觉察」主题。'),
    didYouKnow: localized(
      "Zhuangzi told of a butcher whose knife stayed razor-sharp for nineteen years because he cut only through the natural gaps in the joint, never forcing the blade — a parable for how much easier life goes when we are fully present rather than fighting what is in front of us.",
      '庄子曾讲述一位屠夫，他的刀刃十九年来始终锋利如新，只因他总是顺着关节中本就存在的空隙下刀，从不强行用力 — 这则寓言告诉我们，当我们全然临在，而非与眼前之事相抗衡时，生活会顺遂许多。',
    ),
  },

  // ── Knowledge Path · depth 2–3 ──────────────────────────────────────
  {
    id: 'card-generosity',
    title: localized('Generosity', '慷慨'),
    accent: '施',
    emoji: '🎁',
    rarity: 'rare',
    category: 'virtue',
    summary: localized(
      'An open hand — life expands when shared, and quiet gifts protect both people.',
      '张开的手 — 生命因分享而开阔，安静的礼物保护双方。',
    ),
    quote: localized(
      'The fragrance always remains in the hand that gives the rose.',
      '赠人玫瑰，手有余香。',
    ),
    unlockHint: localized('Complete the Generosity topic on the Knowledge Path.', '在知识之路上完成「慷慨」主题。'),
    didYouKnow: localized(
      'Buddhist dana (giving) is often listed first among the perfections — not because it is easiest, but because loosening the grip on “mine” opens the path for every other virtue.',
      '佛教的布施常被列为波罗蜜多之首 — 并非因为它最容易，而是因为松开对「我的」的紧握，为其他一切德行打开道路。',
    ),
  },
  {
    id: 'card-courage',
    title: localized('Courage', '勇敢'),
    accent: '勇',
    emoji: '🦁',
    rarity: 'rare',
    category: 'virtue',
    summary: localized(
      'Choosing the right act while fear is present — especially the moral kind.',
      '在恐惧仍在时选择正行 — 尤其是道德上的勇敢。',
    ),
    quote: localized(
      'To see what is right and not do it is want of courage.',
      '见义不为，无勇也。',
    ),
    unlockHint: localized('Complete the Courage topic on the Knowledge Path.', '在知识之路上完成「勇敢」主题。'),
    didYouKnow: localized(
      'Aristotle placed courage between cowardice and recklessness — a mean that still feels the fear, but does not let fear choose.',
      '亚里士多德把勇敢放在怯懦与鲁莽之间 — 一种仍感到恐惧、却不让恐惧作主的中道。',
    ),
  },
  {
    id: 'card-listening',
    title: localized('Listening', '倾听'),
    accent: '听',
    emoji: '👂',
    rarity: 'rare',
    category: 'virtue',
    summary: localized(
      'Hearing to understand — often the rarest form of hospitality.',
      '为理解而听 — 往往是最稀缺的一种好客。',
    ),
    quote: localized(
      'We have two ears and one mouth so that we can listen twice as much as we speak.',
      '人有两耳一口，为的是多听少说。',
    ),
    unlockHint: localized('Complete the Listening topic on the Knowledge Path.', '在知识之路上完成「倾听」主题。'),
    didYouKnow: localized(
      'In many counsel traditions, the first skill taught is not advice-giving but accurate restatement — until the speaker says, “Yes, that’s what I meant.”',
      '在许多咨商传统中，首先教授的技能不是给建议，而是准确复述 — 直到说话者说：「对，我就是这个意思。」',
    ),
  },
  {
    id: 'card-ren-living',
    title: localized('Living Ren', '仁的践行'),
    accent: '仁',
    emoji: '💗',
    rarity: 'legendary',
    category: 'teaching',
    summary: localized(
      'Compassion’s full walk — offering the face of ren each moment needs.',
      '慈悲的全程 — 给予每一刻所需要的那一面仁。',
    ),
    quote: localized(
      'The person of ren, wishing to be established, establishes others.',
      '己欲立而立人，己欲达而达人。',
    ),
    unlockHint: localized('Complete Living Ren on the Knowledge Path (Depth III).', '在知识之路上完成「仁的践行」（第三层）。'),
    didYouKnow: localized(
      'Ren is sometimes translated as humaneness, benevolence, or authoritative conduct — each capturing a facet of a virtue that is less a feeling than a way of treating people as kin.',
      '「仁」有时译为 humaneness、benevolence 或 authoritative conduct — 各自捕捉这一德行的一面：它与其说是一种感觉，不如说是视人为亲人的对待方式。',
    ),
  },
  {
    id: 'card-junzi',
    title: localized('The Junzi Path', '君子之路'),
    accent: '君',
    emoji: '⛰️',
    rarity: 'legendary',
    category: 'teaching',
    summary: localized(
      'Character under pressure — effort becoming second nature.',
      '压力下的品格 — 努力化为第二天性。',
    ),
    quote: localized(
      'The junzi seeks within; the small person seeks without.',
      '君子求诸己，小人求诸人。',
    ),
    unlockHint: localized('Complete The Junzi Path on the Knowledge Path (Depth III).', '在知识之路上完成「君子之路」（第三层）。'),
    didYouKnow: localized(
      'Junzi originally named a social rank (“son of a lord”) and was gradually moralised by Confucians into an ideal of character available through learning — not birth.',
      '「君子」原指社会身份（「君之子」），后被儒家逐渐道德化，成为可通过学习达成的品格理想 — 而非出身。',
    ),
  },
  {
    id: 'card-clear-seeing',
    title: localized('Clear Seeing', '清明看见'),
    accent: '明',
    emoji: '🔆',
    rarity: 'legendary',
    category: 'teaching',
    summary: localized(
      'Understanding united — seeing what is present, then living it.',
      '合一的理解 — 看见所在，并活出来。',
    ),
    quote: localized(
      'Knowing others is intelligence; knowing yourself is true wisdom.',
      '知人者智，自知者明。',
    ),
    unlockHint: localized('Complete Clear Seeing on the Knowledge Path (Depth III).', '在知识之路上完成「清明看见」（第三层）。'),
    didYouKnow: localized(
      'Laozi’s pairing of zhi 智 and ming 明 separates clever reading of others from the rarer clarity of seeing one’s own mind — the aim of this branch’s third walk.',
      '老子对「智」与「明」的对举，区分了读懂他人的聪明，与更罕见的自见其心的清明 — 正是这一分支第三程的目标。',
    ),
  },

  // ── Special cards ───────────────────────────────────────────────────
  {
    id: 'card-week',
    title: localized('Seven Suns', '七日之阳'),
    emoji: '🌞',
    rarity: 'rare',
    category: 'story',
    summary: localized(
      'Seven days of unbroken practice — the shape every longer habit has ever taken.',
      '七天不间断的修习 — 这正是每一个更长久习惯，最初的模样。',
    ),
    quote: localized('A journey of a thousand miles begins with a single step.', '千里之行，始于足下。'),
    unlockHint: localized('Reach a 7-day streak.', '达成连续7天的记录。'),
    didYouKnow: localized(
      'The number seven recurs across traditions as a marker of completion — seven days of creation, seven notes in a scale. A first seven-day streak is small in the arc of a life, and yet it is the exact shape every longer habit has ever taken.',
      '"七"这个数字，在众多传统中反复出现，作为圆满的标志 — 七日的创世，音阶中的七个音符。第一次达成的七日连续记录，在人生的长河中微不足道，然而它正是每一个更长久的习惯，最初所呈现的模样。',
    ),
  },
  {
    id: 'card-moon',
    title: localized('The Patient Moon', '恒月'),
    emoji: '🌕',
    rarity: 'legendary',
    category: 'story',
    summary: localized(
      'Thirty days of practice, a full turn of the moon — what was effort is becoming nature.',
      '三十天的修习，满月的一次轮回 — 曾经的努力，正在化为天性。',
    ),
    quote: localized(
      'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
      '我们是什么样的人，取决于我们反复做什么。因此，卓越并非一次行为，而是一种习惯。',
    ),
    unlockHint: localized('Reach a 30-day streak.', '达成连续30天的记录。'),
    didYouKnow: localized(
      'A lunar month is about 29.5 days — this card marks roughly one full cycle. Traditions from Daoist cultivation to modern habit research agree on a similar rough timescale: about a month before a new practice starts to feel less like effort and more like who you are.',
      '一个朔望月约为29.5天 — 这张卡牌，标志着大约一次完整的循环。从道家的修行传统，到现代的习惯研究，都不约而同地指向一个相近的大致时长：大约一个月后，一项新的修习便不再只是努力，而开始成为你的一部分。',
    ),
  },
  {
    id: 'card-datong',
    title: localized('Datong — Great Harmony', '大同'),
    emoji: '🌏',
    rarity: 'legendary',
    category: 'teaching',
    summary: localized(
      "Confucius's vision of the furthest horizon of good government — a world genuinely shared by all.",
      '孔子对良治最遥远境界的构想 — 一个真正天下为公的世界。',
    ),
    quote: localized('When the Great Way prevails, the world is shared by all.', '大道之行也，天下为公。'),
    unlockHint: localized('Complete every era on the Wisdom Timeline.', '完成智慧时间线上的每一个时代。'),
    didYouKnow: localized(
      'Datong (Great Harmony) appears in the Book of Rites\' "Liyun" chapter, contrasted there with the more modest Xiaokang ("Small Tranquility"). Confucius offered it not as a place any dynasty had achieved, but as the furthest horizon by which every nearer reform could be measured.',
      '"大同"一词，出自《礼记·礼运》篇，与更为质朴的"小康"相对而言。孔子提出大同，并非指某个朝代已然达成的境地，而是作为一个最遥远的地平线，用以衡量每一次较为切近的改革。',
    ),
  },
  {
    id: 'card-bridge',
    title: localized('The Bridge Builder', '造桥者'),
    emoji: '🌉',
    rarity: 'rare',
    category: 'story',
    summary: localized(
      'Every point of harmony you contribute is a plank in a bridge others will cross.',
      '你贡献的每一分和谐，都是他人将要跨越的桥上的一块木板。',
    ),
    quote: localized(
      'No one is useless in this world who lightens the burden of another.',
      '在这个世界上，只要能减轻他人的负担，便无人是无用的。',
    ),
    unlockHint: localized('Contribute 1500 harmony points to the world.', '为世界贡献1500点和谐值。'),
    didYouKnow: localized(
      'Contributing harmony points here does not remove them from you — it is one of the few "economies" where giving costs the giver nothing and only ever adds to what the receiver has. Real bridges rarely work that way; this one does.',
      '在此贡献和谐点数，并不会让你自己有所减损 — 这是少数几种"经济体系"之一：给予者毫无损失，接受者却因此有所增益。真实世界中的桥梁，很少能这样运作；而这一座，可以。',
    ),
  },
  {
    id: 'card-horizon',
    title: localized('The Long Horizon', '长远的地平线'),
    emoji: '🌅',
    rarity: 'common',
    category: 'story',
    summary: localized(
      'Having surveyed the foundation of every era, the whole shape of the journey comes into view before any one part is walked deeply.',
      '在为每一个时代都打下基础之后，整段旅程的全貌，在深入任何一处之前，便已浮现眼前。',
    ),
    quote: localized('See the whole field before you till one corner of it.', '先纵览全田，再耕耘一隅。'),
    unlockHint: localized('Complete the foundation level of every Wisdom Timeline point.', '完成智慧时间线每一个节点的基础关。'),
    didYouKnow: localized(
      'Historians of the Axial Age — the centuries when Confucius, the Buddha, and the early Greek philosophers all lived within a few generations of one another — often note that no single tradition saw the whole picture alone. Surveying many at once, even briefly, is itself an old way of learning to see clearly.',
      '研究"轴心时代"的历史学者常常指出：孔子、佛陀与早期希腊哲人几乎生活在相近的世代，却无一个传统独自窥见全貌。同时略览多方，本身便是一种古老的、通向清明之见的学习方式。',
    ),
  },
  {
    id: 'card-second-walk',
    title: localized('The Second Walk', '二度之行'),
    emoji: '🔁',
    rarity: 'rare',
    category: 'story',
    summary: localized(
      'Every era, walked again — not to relearn what was known, but to notice what the first walk was too quick to see.',
      '每一个时代，再走一遍 — 不是为了重新学会已知的，而是去留意初次走过时，太匆忙而错过的。',
    ),
    quote: localized(
      'The path does not change; the walker does — and so the second walk is never the same road.',
      '路未曾改变；变的是走路的人 — 因此，第二次行走，从来不是同一条路。',
    ),
    unlockHint: localized('Complete the second level of every Wisdom Timeline point.', '完成智慧时间线每一个节点的第二关。'),
    didYouKnow: localized(
      'This card shares its name with an idea already at work elsewhere on your journey: the Knowledge Path\'s deeper topics only open once every topic in a branch has been walked once — a "second walk" through familiar ground, on purpose, rather than by accident.',
      '这张卡牌的名字，与你旅程中另一处已在运作的理念相呼应：知识之路上更深的主题，唯有在同一分支的每个主题都走过一遍之后，才会开启 — 一次刻意的，而非偶然的，「二度而行」。',
    ),
  },
];

// Timeline-linked wisdom cards (see TimelinePoint.cardId) get harder to
// unlock the rarer they are, now that the Wisdom Timeline has 3 levels per
// point: a common card unlocks at level 1, rare needs level 2, and
// legendary needs the full level-3 mastery study. See collectUnlocks() in
// state/store.ts for where this is applied.
export const RARITY_LEVEL_REQUIRED: Record<CardRarity, number> = {
  common: 1,
  rare: 2,
  legendary: 3,
};

// Cards not tied to a specific lesson/timeline completion unlock via these rules.
export const SPECIAL_CARD_RULES: { cardId: string; check: (s: Stats) => boolean }[] = [
  { cardId: 'card-week', check: (s) => s.streakBest >= 7 },
  { cardId: 'card-moon', check: (s) => s.streakBest >= 30 },
  { cardId: 'card-datong', check: (s) => s.erasCompleted >= 10 },
  { cardId: 'card-bridge', check: (s) => s.harmonyPoints >= 1500 },
  // Wave milestones across the whole Wisdom Timeline (see timelineWaveReady
  // in state/selectors.ts) — card-datong above is the wave-3 reward.
  { cardId: 'card-horizon', check: (s) => s.timelinePoints >= ALL_POINTS.length },
  { cardId: 'card-second-walk', check: (s) => s.timelinePointsLevel2 >= ALL_POINTS.length },
];

export function cardById(id: string): WisdomCard | undefined {
  return CARDS.find((c) => c.id === id);
}
