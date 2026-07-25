import { localized, type Localized } from '../i18n/types';
import { seededRandom } from '../engine/progression';

/**
 * A real, well-documented traditional story — a koan, parable, or
 * historical anecdote — presented up to its moment of choice. The app
 * deliberately adds no explanation on the reveal; the story is trusted to
 * do the work. See features/turningPoints/TurningPoints.tsx.
 */
export interface TurningPoint {
  id: string;
  emoji: string;
  tradition: Localized<string>;
  setting: Localized<string>;
  resolution: Localized<string>;
  /** An open question shown after the reveal, to carry the thinking further — never a leading or "correct-answer" question. */
  reflectionQuestion: Localized<string>;
}

export const TURNING_POINTS: TurningPoint[] = [
  {
    id: 'zhaozhou-dog',
    emoji: '🐕',
    tradition: localized('Zen koan — The Gateless Gate', '禅宗公案 — 《无门关》'),
    setting: localized(
      "A monk asked the Zen master Zhaozhou: 'Does a dog have Buddha-nature, or not?'",
      '一位僧人问禅师赵州：「狗子还有佛性也无？」',
    ),
    resolution: localized("Zhaozhou said: 'Wú' — 'No.'", '赵州说：「无。」'),
    reflectionQuestion: localized(
      'Why might a teacher refuse to explain a single word of it?',
      '一位老师，为何会拒绝解释这一个字？',
    ),
  },
  {
    id: 'nan-in-teacup',
    emoji: '🍵',
    tradition: localized('Zen story', '禅宗故事'),
    setting: localized(
      "A professor came to the Zen master Nan-in to ask about Zen. Nan-in poured tea into his visitor's cup — and kept pouring after it was full, tea spilling onto the table.",
      '一位教授前来向禅师南隐请教禅。南隐为客人斟茶，茶满之后仍不停手，任由茶水溢出杯外，流满桌面。',
    ),
    resolution: localized(
      "As the professor cried out, Nan-in said: 'Like this cup, you are full of your own opinions. How can I show you Zen unless you first empty your cup?'",
      '教授惊呼之际，南隐说：「你就像这只杯子，装满了自己的看法。你不先把杯子倒空，我怎么能对你说禅呢？」',
    ),
    reflectionQuestion: localized(
      'What opinion of your own might already be too full to hold anything new?',
      '你自己有哪种看法，或许早已满得容不下新的东西？',
    ),
  },
  {
    id: 'farmer-lost-horse',
    emoji: '🐎',
    tradition: localized('Daoist parable — Huainanzi', '道家寓言 — 《淮南子》'),
    setting: localized(
      "An old man near the border lost his horse. His neighbours came to console him. 'Who's to say this isn't good fortune?' he said.",
      '边塞一位老人丢失了一匹马，邻居都来安慰他。老人说：「这怎么就不是福气呢？」',
    ),
    resolution: localized(
      "The horse returned, bringing a fine wild horse with it; his son broke his leg riding it; soldiers then came conscripting every able-bodied man for war, and his son alone was spared. At each turn, the old man said only: 'Who's to say?'",
      '马后来自己回来了，还带回一匹骏马；他的儿子骑马摔断了腿；后来官府征兵打仗，唯独他的儿子因腿伤得以幸免。每一次，老人都只是说：「这怎么就不是呢？」',
    ),
    reflectionQuestion: localized(
      "Is there something in your life you've already labelled 'bad luck' that hasn't finished unfolding?",
      '生活中有没有哪件你已经贴上「坏运气」标签的事，其实还没有真正落幕？',
    ),
  },
  {
    id: 'blind-men-elephant',
    emoji: '🐘',
    tradition: localized('Buddhist parable — Udana', '佛教寓言 — 《自说经》'),
    setting: localized(
      'A king brought several blind men to an elephant and asked each to describe it by touch alone.',
      '一位国王请来几位盲人，让他们各自触摸一头大象，并说出大象是什么样子。',
    ),
    resolution: localized(
      'The one who touched the trunk said it was a snake; the one at the ear said a fan; the one at the leg said a tree trunk. Each was certain, and each argued with the others.',
      '摸到象鼻的说大象像蛇；摸到耳朵的说像扇子；摸到腿的说像树干。每个人都坚信不疑，彼此争论不休。',
    ),
    reflectionQuestion: localized(
      "Where might you be certain about something you've only ever touched one part of?",
      '在哪些事上，你可能只摸到了一部分，却已经十分笃定？',
    ),
  },
  {
    id: 'solomons-judgment',
    emoji: '👑',
    tradition: localized('1 Kings 3:16–28', '《列王纪上》3:16–28'),
    setting: localized(
      'Two women, living in the same house, each claiming the same living infant as her own, came before King Solomon for judgment.',
      '两个同住一屋的妇人，都声称同一个还活着的婴儿是自己的孩子，来到所罗门王面前请求裁决。',
    ),
    resolution: localized(
      'Solomon called for a sword and ordered the living child cut in two, half given to each. One woman agreed; the other cried out to give the child to her rival rather than see it killed. Solomon gave the child to the one who had begged for its life.',
      '所罗门命人取来一把剑，下令将活着的孩子劈成两半，各分一半。一个妇人同意了；另一个则宁可让孩子归对方，也不愿见孩子被杀。所罗门便将孩子判给了那位为孩子求情的妇人。',
    ),
    reflectionQuestion: localized(
      'What does the willingness to lose reveal that the willingness to win cannot?',
      '愿意失去，能揭示出愿意获胜所不能揭示的是什么？',
    ),
  },
  {
    id: 'diogenes-alexander',
    emoji: '☀️',
    tradition: localized('Recorded by Plutarch and Diogenes Laërtius', '见于普鲁塔克与第欧根尼·拉尔修的记载'),
    setting: localized(
      'Alexander the Great, ruler of the known world, sought out the philosopher Diogenes, who lived simply and owned almost nothing, and offered to grant him whatever he wished.',
      '亚历山大大帝，已征服半个已知世界，前去拜访生活简朴、几乎一无所有的哲学家第欧根尼，表示愿意满足他的任何愿望。',
    ),
    resolution: localized(
      "Diogenes, sitting where he was, replied: 'Stand a little out of my sunlight.'",
      '第欧根尼坐在原地，只说：「请你别挡住我的阳光。」',
    ),
    reflectionQuestion: localized(
      'What would you ask for, if the most powerful person alive offered you anything?',
      '若世上最有权势的人，愿意满足你任何愿望，你会开口要什么？',
    ),
  },
  {
    id: 'second-arrow',
    emoji: '🏹',
    tradition: localized('Buddhist teaching — Sallatha Sutta', '佛教教导 — 《箭喻经》'),
    setting: localized(
      'A disciple came to the Buddha in pain, having suffered a great loss, and asked why suffering seemed to multiply itself.',
      '一位弟子在遭受重大损失、身心痛苦之中前来求教佛陀，问为何苦难似乎会自行加倍。',
    ),
    resolution: localized(
      'The Buddha said: an ordinary person struck by misfortune is like one struck by an arrow, and then, grieving and raging against it, struck by a second arrow — this one loosed by their own hand.',
      '佛陀说：凡夫遭遇不幸，如同中了一箭；而后又因悲伤与怨怼，再中一箭 — 这第二支箭，却是自己射出的。',
    ),
    reflectionQuestion: localized(
      'Which of your own arrows was self-inflicted, after the first one had already landed?',
      '在你自己的经历里，哪一支箭，是在第一支箭落地之后，自己射向自己的？',
    ),
  },
  {
    id: 'confucius-honest-son',
    emoji: '🐑',
    tradition: localized('Analects 13.18', '《论语·子路》'),
    setting: localized(
      "The Duke of She told Confucius: 'In my land there is an upright man — his father stole a sheep, and the son gave testimony against him.'",
      '叶公对孔子说：「吾党有直躬者，其父攘羊，而子证之。」',
    ),
    resolution: localized(
      "Confucius replied: 'The upright in my land are different from this — a father conceals for his son, and a son conceals for his father. Uprightness lies therein.'",
      '孔子说：「吾党之直者异于是：父为子隐，子为父隐 — 直在其中矣。」',
    ),
    reflectionQuestion: localized(
      'When does loyalty to a person outweigh loyalty to a rule?',
      '对一个人的忠诚，何时会超越对一条规则的忠诚？',
    ),
  },
  {
    id: 'monk-carried-woman',
    emoji: '🌊',
    tradition: localized('Zen story', '禅宗故事'),
    setting: localized(
      'Two travelling monks, one senior and easy-going, one young and strict about the rules, came to a river where a woman stood unable to cross. The elder lifted her onto his back, carried her over, and set her down.',
      '两位云游的僧人，一位年长随和，一位年轻严守戒律，走到一条河边，见一位妇人无法过河。年长者将她背起，渡过河去，放她下来。',
    ),
    resolution: localized(
      "Hours later, the younger monk finally burst out: 'How could you touch that woman, carry her, against our rules?' The elder replied: 'I set her down at the river. Are you still carrying her?'",
      '数小时后，年轻僧人终于忍不住责问：「你怎能违背戒律，触碰并背负那妇人？」年长者答道：「我早已在河边把她放下了。你怎么还背着她？」',
    ),
    reflectionQuestion: localized(
      "What are you still carrying that you set down long ago?",
      '你还背负着什么，其实早已该被放下？',
    ),
  },
  {
    id: 'zhuangzi-butterfly',
    emoji: '🦋',
    tradition: localized('Zhuangzi, Chapter 2', '《庄子·齐物论》'),
    setting: localized(
      'Zhuangzi dreamed he was a butterfly, fluttering happily, knowing nothing of Zhuangzi at all. Then he woke, and found himself, unmistakably, Zhuangzi again.',
      '庄周梦见自己变成了一只蝴蝶，翩翩飞舞，浑然不知自己是庄周。忽然醒来，惊觉自己分明还是庄周。',
    ),
    resolution: localized(
      'He did not know: was he a man who had just dreamed he was a butterfly, or was he now a butterfly, dreaming he was a man? Between the two, he said, there must be some distinction — and this is called the transformation of things.',
      '他不知道：是庄周做梦变成了蝴蝶，还是蝴蝶做梦变成了庄周？他说，庄周与蝴蝶之间，必定是有分别的 — 这，就叫做「物化」。',
    ),
    reflectionQuestion: localized(
      'How would you know, right now, which one you actually are?',
      '此刻，你要如何知道，自己究竟是哪一个？',
    ),
  },
];

/** Deterministic per-day pick — same entry for everyone on a given day, cycling through the pool. */
export function dailyTurningPoint(today: string): TurningPoint {
  const idx = Math.floor(seededRandom(`turning-point:${today}`) * TURNING_POINTS.length);
  return TURNING_POINTS[idx];
}
