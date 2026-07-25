import type { Topic } from './types';
import { localized } from '../i18n/types';

/**
 * Knowledge Path depths 2–3: a second walk of different virtues, then a
 * synthesis (mastery) topic per branch. Foundation topics stay in
 * knowledgeTree.ts; these append after them. Unlocking is gated by
 * `Topic.depth` in selectors.isTopicUnlocked — L1 progress is never wiped.
 */
export const DEPTH_TOPICS: Topic[] = [
  // ── Compassion · Depth 2 ───────────────────────────────────────────
  {
    id: 'generosity',
    name: localized('Generosity', '慷慨'),
    accent: '施',
    emoji: '🎁',
    branch: 'compassion',
    parentId: 'compassion',
    depth: 2,
    intro: localized(
      'Giving without keeping score — of time, attention, and goods.',
      '不计较地给予 — 时间、注意力与物资。',
    ),
    cardId: 'card-generosity',
    lessons: [
      {
        id: 'generosity-1',
        title: localized('The Open Hand', '张开的手'),
        reading: localized(
          'Generosity is compassion made concrete: you notice a need and loosen your grip. Buddhist dana 布施, Confucian yi 义 when it means giving what is fitting, and every tradition of hospitality agree — the gift is not only the object, but the willingness to be slightly less comfortable so another can be more whole. Stinginess is rarely about money alone; it is fear that there will not be enough. Practising generosity trains the opposite belief: life expands when shared.',
          '慷慨，是化为具体的慈悲：你看见需要，便松开紧握。佛教的布施、儒家合乎时宜的「义」，以及一切好客的传统都同意 — 礼物不仅是物件，更是愿意自己略减舒适，好让他人更完整。吝啬很少只关乎金钱；它是「不够」的恐惧。练习慷慨，是训练相反的信念：生命因分享而开阔。',
        ),
        question: {
          q: localized('According to this lesson, what does generosity train you to believe?', '根据本课，慷慨训练你相信什么？'),
          options: localized(
            ['That scarcity is permanent', 'That life expands when shared', 'That gifts must be repaid', 'That only the rich can give'],
            ['匮乏是永久的', '生命因分享而开阔', '礼物必须被回报', '只有富人才给得起'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What is one thing you could give this week that is not money — time, attention, or skill?',
          '这周你可以给出一样不是金钱的东西 — 时间、注意力或技能？是什么？',
        ),
      },
      {
        id: 'generosity-2',
        title: localized('Giving Without a Ledger', '不记账的给予'),
        reading: localized(
          'The deepest generosity forgets the ledger. Jesus praised the left hand not knowing what the right gives; Zhuangzi mocked virtue done for reputation. When giving becomes a performance, the receiver becomes a prop. Quiet generosity protects both people: the giver from pride, the receiver from debt. Start small and anonymous when you can — a favour no one needs to thank you for.',
          '最深的慷慨忘记账本。耶稣称赞左手不知右手所施；庄子嘲讽为名声而行的德。当给予变成表演，接受者就成了道具。安静的慷慨保护双方：保护给予者免于骄傲，保护接受者免于亏欠。尽可能从小而匿名开始 — 做一件不需要被感谢的好事。',
        ),
        question: {
          q: localized('Why can quiet generosity protect both people?', '为何安静的慷慨能保护双方？'),
          options: localized(
            ['It makes gifts larger', 'It protects the giver from pride and the receiver from debt', 'It guarantees repayment', 'It requires an audience'],
            ['它让礼物更大', '它保护给予者免于骄傲、接受者免于亏欠', '它保证回报', '它需要观众'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Recall a kindness you received that asked nothing back. How did it feel?',
          '回想一次不求回报的善意。那感觉如何？',
        ),
      },
    ],
  },
  {
    id: 'gentleness',
    name: localized('Gentleness', '温柔'),
    accent: '柔',
    emoji: '🕊️',
    branch: 'compassion',
    parentId: 'compassion',
    depth: 2,
    intro: localized(
      'Strength that does not bruise — tone, pace, and touch of care.',
      '不伤人的力量 — 语气、节奏与关怀的触感。',
    ),
    lessons: [
      {
        id: 'gentleness-1',
        title: localized('Soft Power', '柔的力量'),
        reading: localized(
          'Gentleness is not weakness. Laozi praised water that wears down stone by persistence without force. A harsh truth spoken harshly often hardens the listener; the same truth spoken gently can open a door. Parents, teachers, and friends who change lives usually combine firmness of standard with gentleness of manner. The virtue is especially needed when you are right — that is when cruelty most easily disguises itself as honesty.',
          '温柔不是软弱。老子称赞水以柔韧消磨顽石，而不靠蛮力。刺耳地说出刺耳的真相，常使听者更硬；同样的真相若温柔说出，却可能打开一扇门。改变人生的父母、师长与朋友，通常把标准的坚定与态度的温柔合在一起。当你正确时，尤其需要这德行 — 那时残忍最容易伪装成诚实。',
        ),
        question: {
          q: localized('When is gentleness especially needed, according to this lesson?', '根据本课，何时尤其需要温柔？'),
          options: localized(
            ['Only when you are wrong', 'When you are right — so honesty does not become cruelty', 'Never with children', 'Only in public'],
            ['仅当你错误时', '当你正确时 — 以免诚实变成残忍', '对孩子从不需要', '仅在公开场合'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Where in your speech this week could you keep the truth and soften the delivery?',
          '这周你的言语中，何处可以既保有真相，又把语气放软？',
        ),
      },
      {
        id: 'gentleness-2',
        title: localized('Gentleness Toward Yourself', '对自己的温柔'),
        reading: localized(
          'Many people who are gentle with others are harsh with themselves. Self-contempt is not a reliable path to growth; it usually produces hiding and perfectionism. The traditions that urge daily examination (Confucius, Stoics, monastics) also urge repair without self-hatred: notice the fault, make amends, begin again. Gentleness toward yourself is not an excuse to stop improving — it is the ground that makes honest improvement possible.',
          '许多人对他人温柔，对自己却严厉。自我厌恶并不是可靠的成长之路；它通常带来躲藏与完美主义。那些敦促每日省察的传统（孔子、斯多葛、修道者）也敦促不带自恨的修补：看见过失、作出弥补、重新开始。对自己温柔，不是停止改进的借口 — 它是真诚改进得以发生的土地。',
        ),
        question: {
          q: localized('What does healthy self-gentleness make possible?', '健康的自我温柔使什么成为可能？'),
          options: localized(
            ['Never improving', 'Honest improvement without self-hatred', 'Ignoring all faults', 'Avoiding amends'],
            ['从不改进', '不带自恨的真诚改进', '忽略一切过失', '避免弥补'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What would you say to a friend who made the mistake you made recently — and can you say it to yourself?',
          '若朋友犯了你最近犯的错，你会怎么说 — 你能对自己也这样说吗？',
        ),
      },
    ],
  },
  {
    id: 'hospitality',
    name: localized('Hospitality', '好客'),
    accent: '待',
    emoji: '🏠',
    branch: 'compassion',
    parentId: 'compassion',
    depth: 2,
    intro: localized(
      'Making room — at the table, in the conversation, in the heart.',
      '腾出空间 — 在餐桌上、在对话里、在心里。',
    ),
    lessons: [
      {
        id: 'hospitality-1',
        title: localized('Making Room', '腾出空间'),
        reading: localized(
          'Hospitality is the art of making another person feel they belong, even briefly. Across cultures it has been sacred: the stranger at the door might be a teacher, a god in disguise, or simply a human in need. Modern life often outsources welcome to institutions; the personal practice remains: put the phone down, ask a real question, share what you have. You do not need a large house — only a willingness to widen the circle by one.',
          '好客，是让另一个人感到自己属于此处的艺术，哪怕只是片刻。在许多文化中它是神圣的：门外的陌生人可能是老师、乔装的神，或只是需要帮助的人。现代生活常把欢迎外包给机构；个人的练习仍在：放下手机、问一个真实的问题、分享你所有的。你不需要大房子 — 只需要愿意把圈子扩大一人。',
        ),
        question: {
          q: localized('What does hospitality primarily require?', '好客主要需要什么？'),
          options: localized(
            ['A large house', 'Willingness to widen the circle by one', 'Expensive food', 'Formal manners only'],
            ['一座大房子', '愿意把圈子扩大一人', '昂贵的食物', '仅有正式礼仪'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Who could you welcome more fully this week — into a meal, a chat, or a task?',
          '这周你可以更充分欢迎谁 — 进一顿饭、一场谈话，或一件事？',
        ),
      },
      {
        id: 'hospitality-2',
        title: localized('Listening as Welcome', '倾听即欢迎'),
        reading: localized(
          'Often the rarest hospitality is attention. People leave conversations feeling unseen even after an hour of small talk. To host someone in speech is to listen until they finish, to resist turning every story into your own, and to remember a detail next time. Mencius spoke of extending the heart; hospitality extends the ear. In a crowded age, undivided attention is a feast.',
          '往往最稀缺的好客是注意力。人们谈上一小时闲话，仍觉得未被看见。在言语中款待某人，是听完他们说完、忍住把每个故事都变成你自己的、并在下次记得一个细节。孟子讲推恩；好客则是推及耳朵。在嘈杂的时代，不分心的注意就是一席盛宴。',
        ),
        question: {
          q: localized('What does this lesson call a feast in a crowded age?', '本课称嘈杂时代的盛宴是什么？'),
          options: localized(
            ['Loud entertainment', 'Undivided attention', 'Many guests', 'Long speeches'],
            ['喧闹的娱乐', '不分心的注意', '许多宾客', '冗长演说'],
          ),
          answer: 1,
        },
        reflection: localized(
          'In your next conversation, try remembering one detail to ask about later. Who will it be?',
          '在下一场对话里，试着记住一个细节以便之后问起。会是谁？',
        ),
      },
    ],
  },

  // ── Character · Depth 2 ────────────────────────────────────────────
  {
    id: 'courage',
    name: localized('Courage', '勇敢'),
    accent: '勇',
    emoji: '🦁',
    branch: 'character',
    parentId: 'character',
    depth: 2,
    intro: localized(
      'Doing what is right when it costs comfort, approval, or ease.',
      '在需要付出舒适、认同或安逸时，仍做正当之事。',
    ),
    cardId: 'card-courage',
    lessons: [
      {
        id: 'courage-1',
        title: localized('Fear and the Right Act', '恐惧与正行'),
        reading: localized(
          'Courage is not the absence of fear; it is choosing the right act while fear is present. Aristotle placed courage between cowardice and recklessness. Confucius linked courage to seeing what is right and doing it (见义不为，无勇也). Moral courage — speaking truth kindly, defending the vulnerable, admitting fault — is usually harder than physical bravery, because the cost is social. Practise in small stakes first: one honest sentence you have been avoiding.',
          '勇敢不是没有恐惧；它是在恐惧仍在时选择正行。亚里士多德把勇敢放在怯懦与鲁莽之间。孔子把勇与见义而行相连（见义不为，无勇也）。道德勇气 — 温和地说出真相、护卫弱者、承认过错 — 往往比肉体勇气更难，因为代价是社交性的。先在小事上练习：一句你一直回避的诚实的话。',
        ),
        question: {
          q: localized('How does this lesson define courage?', '本课如何定义勇敢？'),
          options: localized(
            ['Never feeling fear', 'Choosing the right act while fear is present', 'Always fighting', 'Seeking danger'],
            ['从不感到恐惧', '在恐惧仍在时选择正行', '总是打斗', '寻求危险'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What honest sentence have you been avoiding? What would courage look like this week?',
          '你一直回避的诚实的话是什么？这周的勇敢会是什么样子？',
        ),
      },
      {
        id: 'courage-2',
        title: localized('Courage with Kindness', '带着善意的勇气'),
        reading: localized(
          'Courage without kindness becomes cruelty; kindness without courage becomes compliance. The junzi 君子 ideal holds both. When you must confront, prepare: clarify the issue, aim at the behaviour not the person, and leave the other a path to repair. Courage that only destroys is incomplete. The goal is a truer relationship or a juster situation — not winning the moment.',
          '没有善意的勇气会变成残忍；没有勇气的善意会变成顺从。君子的理想二者兼持。当你必须当面指出时，先准备：澄清问题、针对行为而非人身，并给对方留下修补的路。只会破坏的勇气是不完整的。目标是更真实的关系或更公正的处境 — 不是赢得这一刻。',
        ),
        question: {
          q: localized('What makes confronting someone more complete, according to this lesson?', '根据本课，什么使当面指出更完整？'),
          options: localized(
            ['Winning the argument', 'Aiming at behaviour, leaving a path to repair', 'Speaking as loudly as possible', 'Never confronting'],
            ['赢得争论', '针对行为，并留下修补的路', '尽可能大声说话', '从不当面指出'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Is there a situation where you need both more courage and more kindness together?',
          '有没有一个处境，需要你同时更多勇敢与更多善意？',
        ),
      },
    ],
  },
  {
    id: 'temperance',
    name: localized('Temperance', '节制'),
    accent: '节',
    emoji: '⚖️',
    branch: 'character',
    parentId: 'character',
    depth: 2,
    intro: localized(
      'Freedom through measure — appetite, speech, and screen in right proportion.',
      '以有度而得自由 — 欲望、言语与屏幕各得其分。',
    ),
    lessons: [
      {
        id: 'temperance-1',
        title: localized('The Middle Path of Appetite', '欲望的中道'),
        reading: localized(
          'Temperance is mastery of desire, not hatred of pleasure. Aristotle, the Buddha\'s Middle Way, and Confucian restraint all warn against being owned by appetite. When pleasure becomes compulsion, it stops being pleasure and becomes a master. Practising temperance means choosing enough: enough food, enough praise, enough scrolling. Paradoxically, limits often restore joy — because you taste what you choose.',
          '节制是对欲望的主宰，不是对快乐的憎恨。亚里士多德、佛陀的中道，与儒家的克己，都警告人勿被食欲与嗜好所役。当快乐变成强迫，它就不再是快乐，而成为主人。练习节制，是选择「够了」：够吃的、够被称赞的、够滑动屏幕的。吊诡的是，界限常常恢复喜乐 — 因为你品尝自己所选。',
        ),
        question: {
          q: localized('What paradox does temperance offer?', '节制带来什么吊诡？'),
          options: localized(
            ['Limits destroy all joy', 'Limits can restore joy because you taste what you choose', 'Pleasure must be hated', 'Only monks need measure'],
            ['界限摧毁一切喜乐', '界限可恢复喜乐，因为你品尝自己所选', '必须憎恨快乐', '只有出家人需要有度'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Name one appetite (food, screens, praise) where “enough” would free you this week.',
          '说出一种欲望（饮食、屏幕、称赞），在那里「够了」会让你这周更自由。',
        ),
      },
      {
        id: 'temperance-2',
        title: localized('Temperance of Speech', '言语的节制'),
        reading: localized(
          'Speech has appetite too: to vent, to gossip, to win. Temperance of speech is pausing long enough to ask whether words heal, clarify, or merely discharge tension onto someone else. The Analects praise those slow to speak and quick to act. Online culture rewards the opposite. A single unsent message can be a victory of character.',
          '言语也有食欲：要发泄、要闲话、要赢。言语的节制，是停顿够久，好问这些话是疗愈、澄清，还是只把紧张卸到别人身上。《论语》称赞敏于事而慎于言。网络文化奖励相反的事。一条未发送的讯息，可以是品格上的一次胜利。',
        ),
        question: {
          q: localized('What can an unsent message be, in this lesson’s view?', '在本课看来，一条未发送的讯息可以是什么？'),
          options: localized(
            ['A failure of honesty', 'A victory of character', 'Proof you are weak', 'Always the wrong choice'],
            ['诚实的失败', '品格上的胜利', '软弱的证明', '总是错误的选择'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Before you next reply in anger, can you wait ten breaths? Try it once today.',
          '下次怒中回复前，你能等十次呼吸吗？今天试一次。',
        ),
      },
    ],
  },
  {
    id: 'gratitude',
    name: localized('Gratitude', '感恩'),
    accent: '恩',
    emoji: '🙏',
    branch: 'character',
    parentId: 'character',
    depth: 2,
    intro: localized(
      'Seeing clearly what you have received — and answering with thanks.',
      '看清自己所受 — 并以感谢回应。',
    ),
    lessons: [
      {
        id: 'gratitude-1',
        title: localized('The Counter to Entitlement', '对抗理所当然'),
        reading: localized(
          'Gratitude is accurate seeing: you notice that much of what sustains you arrived through others — parents, teachers, farmers, strangers, traditions. Entitlement is a fog that makes gifts look like wages. Writing three specific thanks (not vague “I’m grateful for life”) rewires attention toward what is already enough. Traditions of saying grace before meals, or bowing, are technologies of this seeing.',
          '感恩是准确的看见：你注意到支撑你的许多事物来自他人 — 父母、师长、农夫、陌生人、传统。「理所当然」是雾，使礼物看起来像工资。写下三件具体的感谢（而非模糊的「感激生命」），能把注意力重新导向已经够用的事物。餐前感恩或鞠躬，都是这种看见的技术。',
        ),
        question: {
          q: localized('What does entitlement do to gifts, according to this lesson?', '根据本课，「理所当然」对礼物做了什么？'),
          options: localized(
            ['Makes them larger', 'Makes gifts look like wages', 'Increases gratitude', 'Removes all needs'],
            ['使它们更大', '使礼物看起来像工资', '增加感恩', '消除一切需要'],
          ),
          answer: 1,
        },
        reflection: localized(
          'List three specific gifts you received this month from other people.',
          '列出这个月你从他人那里收到的三件具体礼物。',
        ),
      },
      {
        id: 'gratitude-2',
        title: localized('Gratitude That Acts', '会行动的感恩'),
        reading: localized(
          'Felt gratitude that never becomes thanks or reciprocity is incomplete. A message, a return favour, care for the next generation — these close the circle. In the vision of Great Harmony, gratitude scales: we protect what we did not build so those after us can receive it too. Practise both the inward noticing and the outward reply.',
          '只有感觉、从不化为感谢或回馈的感恩，是不完整的。一条讯息、一次回报、对下一代的照料 — 这些闭合圆环。在大同的视野里，感恩可以放大：我们守护自己未曾建造的事物，好让后来者也能领受。练习向内的看见，也练习向外的回应。',
        ),
        question: {
          q: localized('What completes gratitude in this lesson?', '在本课中，什么使感恩完整？'),
          options: localized(
            ['Feeling it strongly', 'Thanks or reciprocity that closes the circle', 'Never depending on anyone', 'Keeping it private forever'],
            ['强烈地感觉它', '闭合圆环的感谢或回馈', '永不依赖任何人', '永远只藏在心里'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Whom will you thank — specifically — before this day ends?',
          '在今天结束前，你会具体感谢谁？',
        ),
      },
    ],
  },

  // ── Understanding · Depth 2 ────────────────────────────────────────
  {
    id: 'listening',
    name: localized('Listening', '倾听'),
    accent: '听',
    emoji: '👂',
    branch: 'understanding',
    parentId: 'understanding',
    depth: 2,
    intro: localized(
      'Hearing to understand — not merely to reply.',
      '为理解而听 — 不只为了回答。',
    ),
    cardId: 'card-listening',
    lessons: [
      {
        id: 'listening-1',
        title: localized('Empty the Cup', '把杯子倒空'),
        reading: localized(
          'Listening well requires a temporarily empty cup: you suspend your rebuttal long enough to take in what is actually said. Most “conversations” are two monologues waiting for gaps. Socratic dialogue, Confucian learning from others, and modern counsel all begin with attention. Ask one clarifying question before you advise. Understanding arrives after hearing, not before.',
          '好好倾听需要暂时倒空杯子：你搁置反驳，久到足以接收实际所说。多数「对话」是两段独白在等空隙。苏格拉底式对话、儒家的见贤思齐，与现代咨商，都始于注意。在给建议前，先问一个澄清的问题。理解在听见之后到来，而不是之前。',
        ),
        question: {
          q: localized('What should you do before advising, according to this lesson?', '根据本课，给建议前你应做什么？'),
          options: localized(
            ['Give your opinion first', 'Ask one clarifying question', 'Change the subject', 'Agree with everything'],
            ['先给出你的意见', '问一个澄清的问题', '转换话题', '同意一切'],
          ),
          answer: 1,
        },
        reflection: localized(
          'In your next disagreement, can you restate the other person’s view until they say “yes, that’s it”?',
          '在下次分歧中，你能复述对方的观点，直到他们说「对，就是这样」吗？',
        ),
      },
      {
        id: 'listening-2',
        title: localized('Listening Beneath Words', '听言外之意'),
        reading: localized(
          'Skilled listening hears need under complaint, fear under anger, hope under silence. This is not mind-reading; it is careful inference checked with the other person (“It sounds like you’re exhausted — is that right?”). Compassion and understanding meet here. When people feel accurately heard, conflict often shrinks before any solution is offered.',
          '熟练的倾听，能在抱怨下听见需要、在愤怒下听见恐惧、在沉默下听见希望。这不是读心；这是谨慎推断，并与对方核对（「听起来你很疲倦 — 是这样吗？」）。慈悲与理解在此相遇。当人们感到被准确听见，冲突往往在提出任何解决方案之前就缩小了。',
        ),
        question: {
          q: localized('What often shrinks when people feel accurately heard?', '当人们感到被准确听见时，什么常常会缩小？'),
          options: localized(
            ['Their vocabulary', 'Conflict', 'The need to listen', 'All responsibility'],
            ['他们的词汇', '冲突', '倾听的需要', '一切责任'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Who in your life might need to be heard more than advised right now?',
          '你生命中谁此刻可能更需要被听见，而不是被建议？',
        ),
      },
    ],
  },
  {
    id: 'wonder',
    name: localized('Wonder', '惊奇'),
    accent: '奇',
    emoji: '✨',
    branch: 'understanding',
    parentId: 'understanding',
    depth: 2,
    intro: localized(
      'Fresh eyes — curiosity that keeps the mind teachable.',
      '新鲜的眼睛 — 使心保持可教的好奇。',
    ),
    lessons: [
      {
        id: 'wonder-1',
        title: localized('Beginner’s Mind', '初心'),
        reading: localized(
          'Wonder is the refusal to let familiarity kill attention. Zhuangzi’s free-and-easy wandering, scientific curiosity, and a child’s questions share a root: the world is stranger and larger than our last theory. Cynicism feels like wisdom but often is fatigue. Practising wonder means asking “what else could this be?” before “I already know.” Teachability is a form of intelligence.',
          '惊奇是拒绝让熟悉杀死注意。庄子的逍遥、科学的好奇，与孩子的提问共有一个根：世界比我们上一个理论更奇异、更广大。犬儒常感觉像智慧，却往往只是疲倦。练习惊奇，是在说「我已经知道」之前，先问「这还可能是什么？」可教，是一种智力。',
        ),
        question: {
          q: localized('What does practising wonder mean here?', '在这里，练习惊奇意味着什么？'),
          options: localized(
            ['Rejecting all knowledge', 'Asking what else something could be before claiming you know', 'Never forming opinions', 'Only studying nature'],
            ['拒绝一切知识', '在宣称知道之前先问它还可能是什么', '从不形成意见', '只研究自然'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Pick one ordinary object or person you “already know.” Look again for five minutes. What did you miss?',
          '选一件你「已经知道」的平常之物或人。再看五分钟。你错过了什么？',
        ),
      },
      {
        id: 'wonder-2',
        title: localized('Wonder and Humility', '惊奇与谦逊'),
        reading: localized(
          'Wonder and humility travel together. Socrates’ wisdom was knowing he did not know; the more a field expands, the clearer its horizon of ignorance becomes. Wonder without humility becomes tourism of ideas; humility without wonder becomes dull self-effacement. Together they keep study alive for a lifetime — which is the real length of the Knowledge Path.',
          '惊奇与谦逊同行。苏格拉底的智慧是知道自己不知；一个领域越开阔，无知的地平线就越清晰。没有谦逊的惊奇，成为观念的观光；没有惊奇的谦逊，成为沉闷的自我消减。二者一起，使研习可活一辈子 — 而这才是知识之路真正的长度。',
        ),
        question: {
          q: localized('What keeps study alive for a lifetime in this lesson?', '在本课中，什么使研习可活一辈子？'),
          options: localized(
            ['Wonder and humility together', 'Memorising more facts', 'Avoiding hard questions', 'Finishing one book'],
            ['惊奇与谦逊在一起', '背更多事实', '回避难题', '读完一本书'],
          ),
          answer: 0,
        },
        reflection: localized(
          'Where have you been sure too quickly? What question could reopen that place?',
          '你在何处过早确定？什么问题可以重新打开那里？',
        ),
      },
    ],
  },
  {
    id: 'stillness',
    name: localized('Stillness', '静定'),
    accent: '静',
    emoji: '🕯️',
    branch: 'understanding',
    parentId: 'understanding',
    depth: 2,
    intro: localized(
      'Quiet enough inside to see — and to choose rather than react.',
      '内心足够安静，才能看见 — 并选择而非反应。',
    ),
    lessons: [
      {
        id: 'stillness-1',
        title: localized('The Pause Before the Act', '行动前的停顿'),
        reading: localized(
          'Stillness is not emptiness for its own sake; it is the pause that lets understanding catch up with impulse. Daoist zuowang 坐忘, Buddhist meditation, and simple silence before a hard reply share this function. Without stillness, discernment has no room to operate. Even one minute of quiet breath before a decision can change its quality.',
          '静定不是为空虚而空虚；它是让理解追上冲动的停顿。道家的坐忘、佛教的禅修，与困难回复前的单纯沉默，共享这一功能。没有静定，明辨没有运作的空间。哪怕在决定前安静呼吸一分钟，也能改变决定的品质。',
        ),
        question: {
          q: localized('What does stillness give discernment?', '静定给明辨什么？'),
          options: localized(
            ['More opinions', 'Room to operate', 'Faster reactions', 'A reason to avoid decisions'],
            ['更多意见', '运作的空间', '更快的反应', '逃避决定的理由'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Tomorrow, place one intentional pause before a habitual reaction. Where?',
          '明天，在一个习惯性反应前安放一次有意的停顿。在哪里？',
        ),
      },
      {
        id: 'stillness-2',
        title: localized('Stillness in a Noisy World', '嘈杂世界中的静'),
        reading: localized(
          'Modern noise is not only sound; it is endless input. Stillness practice may be a walk without headphones, a meal without a screen, or sitting with eyes soft for a few breaths. The point is not escape from the world but return to it with a clearer mind. From stillness, compassion and character become choosable again — not automatic.',
          '现代的嘈杂不只是声音；它是无尽输入。静定练习可以是不戴耳机的散步、不看屏幕的一餐，或柔和双眼坐几个呼吸。重点不是逃离世界，而是以更清明的心返回世界。从静定中，慈悲与品格再次成为可选择的 — 而非自动的。',
        ),
        question: {
          q: localized('What is the point of stillness practice here?', '在这里，静定练习的重点是什么？'),
          options: localized(
            ['Escaping the world permanently', 'Returning to the world with a clearer mind', 'Proving spiritual status', 'Avoiding all people'],
            ['永久逃离世界', '以更清明的心返回世界', '证明灵性地位', '避开所有人'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Design a three-minute stillness ritual you could actually keep daily.',
          '设计一个你真正能每日保持的三分钟静定仪式。',
        ),
      },
    ],
  },

  // ── Depth 3 · Branch mastery ───────────────────────────────────────
  {
    id: 'compassion-mastery',
    name: localized('Living Ren', '仁的践行'),
    accent: '仁',
    emoji: '💗',
    branch: 'compassion',
    parentId: 'compassion',
    depth: 3,
    intro: localized(
      'Depth III: weave kindness, forgiveness, service, generosity, gentleness, and hospitality into one way of being.',
      '第三层：把仁慈、宽恕、服务、慷慨、温柔与好客织成一种存在方式。',
    ),
    cardId: 'card-ren-living',
    lessons: [
      {
        id: 'compassion-mastery-1',
        title: localized('One Heart, Many Acts', '一心，万行'),
        reading: localized(
          'Ren 仁 is not a single mood; it is a family of acts that grow from seeing others as kin. Kindness is the daily tone; forgiveness repairs rupture; service carries weight; generosity loosens the hand; gentleness protects dignity; hospitality widens the circle. Mastery is not collecting virtues like badges — it is noticing which face of ren a moment needs, and offering that without forcing the others.',
          '仁不是单一情绪；它是从视人为亲人而生的一簇行动。仁慈是日常语气；宽恕修补破裂；服务承担重量；慷慨松开手；温柔护住尊严；好客扩大圈子。圆满不是像徽章一样收集德行 — 而是察觉这一刻需要仁的哪一面，并给予那一面，而不强行塞入其他。',
        ),
        question: {
          q: localized('What is mastery of ren in this lesson?', '在本课中，仁的圆满是什么？'),
          options: localized(
            ['Collecting every virtue as a badge', 'Offering the face of ren the moment needs', 'Only feeling warm emotions', 'Never needing forgiveness'],
            ['把每种德行当徽章收集', '给予这一刻所需要的那一面仁', '只感受温暖情绪', '永不需要宽恕'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Which face of ren does your life most need from you this month?',
          '这个月，你的生活最需要你给出仁的哪一面？',
        ),
      },
      {
        id: 'compassion-mastery-2',
        title: localized('Compassion at Scale', '扩大的慈悲'),
        reading: localized(
          'Personal compassion becomes Great Harmony when it shapes how we build tables, rules, and neighbourhoods — not only how we feel in private. The Liyun vision of datong begins in hearts that refuse to treat strangers as disposable. Your second walk ends not with a certificate, but with a question you will keep answering: whom have I made more at home in the world?',
          '个人的慈悲成为大同，是当它塑造我们如何建餐桌、规则与邻里 — 而不只是私下的感觉。《礼运》的大同，始于拒绝把陌生人当作可弃之物的心。你的第二程不以证书结束，而以一个你会持续回答的问题结束：我使谁在世界上更有家的感觉？',
        ),
        question: {
          q: localized('How does personal compassion become Great Harmony here?', '在这里，个人慈悲如何成为大同？'),
          options: localized(
            ['By private feeling alone', 'By shaping tables, rules, and neighbourhoods', 'By ignoring strangers', 'By finishing quizzes'],
            ['仅靠私下感觉', '靠塑造餐桌、规则与邻里', '靠忽略陌生人', '靠完成测验'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Name one concrete way you could make someone more “at home” this week.',
          '说出一个这周能让某人更「有家的感觉」的具体做法。',
        ),
      },
    ],
  },
  {
    id: 'character-mastery',
    name: localized('The Junzi Path', '君子之路'),
    accent: '君',
    emoji: '⛰️',
    branch: 'character',
    parentId: 'character',
    depth: 3,
    intro: localized(
      'Depth III: humility, patience, integrity, courage, temperance, and gratitude as one character.',
      '第三层：谦逊、耐心、正直、勇敢、节制与感恩，合为一种品格。',
    ),
    cardId: 'card-junzi',
    lessons: [
      {
        id: 'character-mastery-1',
        title: localized('Character Under Pressure', '压力下的品格'),
        reading: localized(
          'The junzi 君子 is not a perfect person; it is a direction — the self that holds under pressure. Humility keeps learning open; patience outlasts friction; integrity aligns word and act; courage does the hard right; temperance frees you from appetite’s tyranny; gratitude keeps entitlement from rotting the heart. Under stress, one of these will be tested first. Knowing your weakest link is already half the training.',
          '君子不是完美之人；它是一个方向 — 在压力下仍站得住的自我。谦逊保持可学；耐心熬过摩擦；正直对齐言与行；勇敢做艰难的正确；节制使你免于欲望暴政；感恩使「理所当然」不腐蚀心。压力之下，其中一环会先被考验。知道自己最弱的一环，已是训练的一半。',
        ),
        question: {
          q: localized('What is the junzi in this lesson?', '在本课中，君子是什么？'),
          options: localized(
            ['A perfect person', 'A direction — the self that holds under pressure', 'A social rank', 'Someone without fear'],
            ['一个完美的人', '一个方向 — 在压力下仍站得住的自我', '一种社会等级', '一个没有恐惧的人'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Under stress, which virtue in this branch fails first for you? How will you train it?',
          '压力下，这一分支中哪一种德行最先在你身上失败？你将如何训练它？',
        ),
      },
      {
        id: 'character-mastery-2',
        title: localized('From Habit to Nature', '从习惯到天性'),
        reading: localized(
          'Aristotle said we become just by doing just acts; Wang Yangming urged the unity of knowledge and action 知行合一. Depth III is not new theory — it is repetition until the worthy act is closer to your default. Keep a small daily discipline tied to character (one honest repair, one measured appetite, one thanks). Over years, effort becomes second nature. That is the quiet endgame of this branch.',
          '亚里士多德说我们因行正义之事而成为正义；王阳明敦促知行合一。第三层不是新理论 — 它是重复，直到值得的行为更接近你的默认。保持一项与品格相连的微小日课（一次诚实的修补、一次有度的欲望、一次感谢）。经年之后，努力成为第二天性。那是这一分支安静的终局。',
        ),
        question: {
          q: localized('What is the quiet endgame of the character branch here?', '在这里，品格分支安静的终局是什么？'),
          options: localized(
            ['Winning arguments', 'Effort becoming second nature', 'Never needing practice', 'Collecting titles'],
            ['赢得争论', '努力成为第二天性', '永不需要练习', '收集头衔'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What one daily character discipline will you keep for the next 21 days?',
          '接下来21天，你将保持哪一项每日品格日课？',
        ),
      },
    ],
  },
  {
    id: 'understanding-mastery',
    name: localized('Clear Seeing', '清明看见'),
    accent: '明',
    emoji: '🔆',
    branch: 'understanding',
    parentId: 'understanding',
    depth: 3,
    intro: localized(
      'Depth III: reflection, discernment, awareness, listening, wonder, and stillness as one clear mind.',
      '第三层：反思、明辨、觉察、倾听、惊奇与静定，合为一颗清明的心。',
    ),
    cardId: 'card-clear-seeing',
    lessons: [
      {
        id: 'understanding-mastery-1',
        title: localized('The Unified Practice', '统一的练习'),
        reading: localized(
          'Understanding’s virtues are one practice with different gates. Reflection reviews the day; discernment chooses among options; awareness returns to now; listening receives the other; wonder keeps you teachable; stillness makes room for all of them. When they fragment, you get cleverness without wisdom. When they unite, you see what is present — including your own bias — and act with fewer illusions.',
          '理解的诸德，是一门练习的不同门户。反思回顾一日；明辨在选项中选择；觉察回到当下；倾听接收对方；惊奇使你可教；静定给这一切腾出空间。当它们分裂，你得到没有智慧的聪明。当它们合一，你看见所在 — 包括自己的偏见 — 并以更少幻觉行动。',
        ),
        question: {
          q: localized('What happens when understanding’s virtues unite?', '当理解的诸德合一，会发生什么？'),
          options: localized(
            ['You avoid all action', 'You see what is present, including bias, and act with fewer illusions', 'You become cynical', 'You finish the app'],
            ['你回避一切行动', '你看见所在（包括偏见），并以更少幻觉行动', '你变得犬儒', '你完成这个应用'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Which gate of understanding do you enter most easily — and which do you avoid?',
          '你最容易从理解的哪一扇门进入 — 又回避哪一扇？',
        ),
      },
      {
        id: 'understanding-mastery-2',
        title: localized('Understanding in Service of Life', '服务于生活的理解'),
        reading: localized(
          'Clear seeing is not an end in itself. The Knowledge Path began with wisdom joining understanding to action. Depth III returns you there: use what you see to love better, choose cleaner, and contribute to a world less ruled by confusion. If understanding only sharpens your judgments of others, it has failed. If it softens and steadies how you live, the third walk has done its work.',
          '清明看见本身不是终点。知识之路始于智慧把理解与行动相连。第三层把你带回那里：用你所见去更好地爱、更干净地选择，并为更少被混乱统治的世界作贡献。若理解只锐化你对他人的评判，它就失败了。若它使你的生活更柔、更稳，第三程便已完成它的工作。',
        ),
        question: {
          q: localized('When has understanding failed, according to this lesson?', '根据本课，理解何时失败？'),
          options: localized(
            ['When it joins action', 'When it only sharpens judgments of others', 'When it includes stillness', 'When it asks questions'],
            ['当它与行动相连时', '当它只锐化对他人的评判时', '当它包含静定时', '当它提出问题时'],
          ),
          answer: 1,
        },
        reflection: localized(
          'How will you put clear seeing into one concrete action in the next 48 hours?',
          '在接下来48小时内，你将如何把清明看见化为一个具体行动？',
        ),
      },
    ],
  },
];
