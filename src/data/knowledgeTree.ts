import type { Topic, Lesson } from './types';
import { localized } from '../i18n/types';

export const TOPICS: Topic[] = [
  // ── Root ─────────────────────────────────────────────────────────────
  {
    id: 'wisdom',
    name: localized('Wisdom', '智慧'),
    accent: '智',
    emoji: '🦉',
    branch: 'root',
    parentId: null,
    intro: localized(
      'The root of the path. What wisdom is, and why it must be lived, not only known.',
      '这条路的根本。智慧是什么，以及为何它必须被活出来，而不只是被知道。',
    ),
    cardId: 'card-wisdom',
    lessons: [
      {
        id: 'wisdom-1',
        title: localized('What Is Wisdom?', '什么是智慧？'),
        reading: localized(
          'Knowledge is knowing many things; wisdom is knowing how to live. A person can memorize a thousand facts and still act foolishly, while a farmer who has never read a book may live with deep wisdom. Every great tradition agrees on this: wisdom joins understanding with action. Confucius said that to learn without thinking is useless, and to think without learning is dangerous. Socrates showed that wisdom begins with humility — admitting how much we do not know. And all traditions agree on a second point: wisdom is not a possession but a practice. It grows the way a tree grows — slowly, daily, through seasons of effort. On this journey, every lesson you read matters only when it changes how you treat the next person you meet.',
          '知识是知道许多事，智慧则是懂得如何生活。一个人可以记住上千个事实，却依然行事愚蠢；而一位从未读过书的农夫，却可能活出深厚的智慧。每一个伟大的传统都认同这一点：智慧将理解与行动结合在一起。孔子说，学而不思则罔，思而不学则殆。苏格拉底则告诉我们，智慧始于谦逊 — 承认自己有多少不知道的事。所有传统还有一个共同的看法：智慧不是一种拥有物，而是一种修习。它像树木生长一样 — 缓慢地、日复一日地、历经一季又一季的努力。在这段旅程中，你所读的每一课，唯有在改变你如何对待下一个遇见的人时，才真正有意义。',
        ),
        question: {
          q: localized('What separates wisdom from mere knowledge?', '是什么将智慧与单纯的知识区分开来？'),
          options: localized(
            ['Wisdom requires a good memory', 'Wisdom joins understanding with action', 'Wisdom comes only from books', 'There is no difference'],
            ['智慧需要良好的记忆力', '智慧将理解与行动结合在一起', '智慧只能来自书本', '两者并无区别'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Think of the wisest person you know. What do they do — not just know — that makes them wise?',
          '想一想你所认识的最有智慧的人。是他们做了什么 — 而不仅仅是知道什么 — 让他们显得有智慧？',
        ),
      },
    ],
  },

  // ── Branches ─────────────────────────────────────────────────────────
  {
    id: 'compassion',
    name: localized('Compassion', '慈悲'),
    accent: '仁',
    emoji: '💗',
    branch: 'compassion',
    parentId: 'wisdom',
    intro: localized(
      'The heart of the path: feeling with others and acting for their good.',
      '这条路的心：感受他人所感，并为他们的福祉而行动。',
    ),
    lessons: [
      {
        id: 'compassion-1',
        title: localized('The Heart That Feels With Others', '与他人同感的心'),
        reading: localized(
          "Compassion is the ability to feel another's joy and pain as if it were partly your own — and to act on that feeling. Mencius taught that compassion is a seed born in every heart: anyone who sees a child about to fall into a well feels alarm, before any thought of reward. The Buddha called it karuna and made it a pillar of the path. Jesus made it the measure of all law: love your neighbour as yourself. Compassion is not pity, which looks down, nor mere sentiment, which does nothing. It stands beside another person and asks: what do you need? Like a muscle, it grows with use — each small act of care makes the next one easier.",
          '慈悲，是能够感受他人的喜悦与痛苦，仿佛那也是你自己的一部分 — 并依此而行动的能力。孟子教导说，慈悲之心是每颗心中都天生具有的种子：任何人看见一个孩子即将跌入井中，都会感到惊惧，而这在任何关于回报的念头之前就已发生。佛陀称之为「悲」，并将它立为道路上的一根支柱。耶稣则将它定为一切律法的准则：爱人如己。慈悲不是俯视他人的怜悯，也不是无所作为的空洞情感。它站在另一个人身旁，问道：你需要什么？它如同一块肌肉，越用越强 — 每一次微小的关怀之举，都让下一次变得更容易。',
        ),
        question: {
          q: localized('How is compassion different from pity?', '慈悲与怜悯有何不同？'),
          options: localized(
            ['Compassion looks down on others', 'Compassion stands beside others and acts', 'Pity is stronger than compassion', 'They are the same thing'],
            ['慈悲俯视他人', '慈悲站在他人身旁并付诸行动', '怜悯比慈悲更强大', '两者相同'],
          ),
          answer: 1,
        },
        reflection: localized(
          'When did someone show you real compassion? How did it change what you believed about people?',
          '什么时候有人曾对你展现真正的慈悲？这如何改变了你对人的看法？',
        ),
      },
    ],
  },
  {
    id: 'character',
    name: localized('Character', '品格'),
    accent: '德',
    emoji: '⛰️',
    branch: 'character',
    parentId: 'wisdom',
    intro: localized(
      'The backbone of the path: who you are when it is difficult.',
      '这条路的脊梁：艰难之时，你是谁。',
    ),
    lessons: [
      {
        id: 'character-1',
        title: localized('Building the Inner Mountain', '建造内在的山'),
        reading: localized(
          'Character is who you are when no one is watching and when everything is difficult. Aristotle taught that character is built the way a wall is built — one brick, one act, at a time: we become brave by doing brave things, honest by telling the truth. Confucius spent his life describing the junzi 君子, the person of cultivated character, who is "calm and at ease" while the petty person is "full of worry" — because the junzi\'s foundation is inside, not in circumstances. Character has a quiet compound interest: every time you keep a promise, resist a temptation, or own a mistake, you are not just doing one good act — you are becoming the kind of person who does such acts.',
          '品格，是当无人注视、当一切都变得艰难时，你依然如是的那个你。亚里士多德教导说，品格如同砌墙一般，一砖一石、一行一动地筑成：我们因做出勇敢之事而变得勇敢，因说出真话而变得诚实。孔子穷其一生描述「君子」这种修养有成的人 — 君子「坦荡荡」，而小人则「长戚戚」，因为君子的根基在于内心，而非外在境遇。品格有一种静默的复利效应：每一次你信守承诺、抵御诱惑、或坦然承认错误，你所做的不仅是一件善事 — 你正在成为一个会做这类事情的人。',
        ),
        question: {
          q: localized('According to Aristotle, how is character built?', '根据亚里士多德的说法，品格是如何建成的？'),
          options: localized(
            ['It is fixed at birth', 'Through one act at a time, like building a wall', 'By reading philosophy', 'By avoiding all difficulty'],
            ['它在出生时就已固定', '通过一次又一次的行动，如同砌墙', '通过阅读哲学', '通过避开一切困难'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What is one small promise to yourself you could keep every day this week?',
          '这一周，你可以每天对自己信守的一个小小承诺是什么？',
        ),
      },
    ],
  },
  {
    id: 'understanding',
    name: localized('Understanding', '理解'),
    accent: '明',
    emoji: '🔆',
    branch: 'understanding',
    parentId: 'wisdom',
    intro: localized(
      'The eyes of the path: seeing yourself and the world clearly.',
      '这条路的眼睛：清晰地看见自己与世界。',
    ),
    lessons: [
      {
        id: 'understanding-1',
        title: localized('Seeing Clearly', '清晰地看见'),
        reading: localized(
          'Understanding is the practice of seeing things as they are — including yourself. Laozi wrote: "Knowing others is intelligence; knowing yourself is true wisdom" (知人者智，自知者明). Most of our mistakes come not from bad intentions but from unclear seeing: we judge before we listen, react before we reflect, and mistake our first impression for the whole truth. The traditions offer the same medicine in different bottles: the Buddhist practice of mindfulness, the Confucian daily self-examination, the Socratic habit of questioning assumptions. All slow the mind down long enough to see what is actually there. Clear seeing is the beginning of every other virtue — you cannot be kind to a person you have not truly seen.',
          '理解，是如实看见事物 — 包括看见自己 — 的修习。老子写道："知人者智，自知者明。"我们大多数的过错，并非源于恶意，而是源于看不清楚：我们在倾听之前就已评判，在反思之前就已反应，把第一印象误当作全部的真相。各个传统都开出了相同的药方，只是包装不同：佛教的正念修习、儒家的每日自省、苏格拉底质疑假设的习惯。它们都在让心慢下来，慢到足以看清真正存在的东西。清明的看见，是一切其他德行的起点 — 你无法善待一个你从未真正看见的人。',
        ),
        question: {
          q: localized('According to Laozi, what is true wisdom (明)?', '根据老子的说法，什么是真正的「明」（智慧）？'),
          options: localized(
            ['Knowing many facts', 'Knowing others', 'Knowing yourself', 'Knowing the future'],
            ['知道许多事实', '了解他人', '了解自己', '预知未来'],
          ),
          answer: 2,
        },
        reflection: localized(
          'What is one assumption about someone in your life that might deserve a second look?',
          '在你生活中，有哪一个关于某人的假设，也许值得你再重新审视一次？',
        ),
      },
    ],
  },

  // ── Compassion leaves ────────────────────────────────────────────────
  {
    id: 'kindness',
    name: localized('Kindness', '仁慈'),
    accent: '慈',
    emoji: '🌸',
    branch: 'compassion',
    parentId: 'compassion',
    intro: localized('Small acts of warmth that ripple outward.', '温暖的小小举动，如涟漪般扩散开来。'),
    cardId: 'card-kindness',
    lessons: [
      {
        id: 'kindness-1',
        title: localized('The Ripple Effect', '涟漪效应'),
        reading: localized(
          'Kindness is compassion in its everyday clothes. It rarely looks heroic: a sincere greeting, a door held, a message to someone who is struggling, credit given where it is due. Yet kindness is one of the most contagious forces in human life — studies and centuries of experience agree that one act of kindness reliably inspires others, rippling outward to people the original giver will never meet. Laozi counted kindness among his three treasures. The Dalai Lama put it simply: "My religion is kindness." Because it costs so little, we underestimate it; because it means so much, no act of kindness is ever wasted.',
          '仁慈，是慈悲穿上了日常的衣裳。它很少显得英勇：一句真诚的问候、为人扶住的一扇门、给正在挣扎的人捎去的一条讯息、该给予肯定时给予的肯定。然而，仁慈是人类生活中最具感染力的力量之一 — 研究与数百年的经验都表明，一次善举必定会激励他人，如涟漪般扩散到最初的给予者永远不会遇见的人身上。老子将「慈」列为他的三宝之一。达赖喇嘛则说得简单："我的宗教就是仁慈。"正因为它代价如此微小，我们常常低估它；正因为它意义如此重大，任何一次仁慈之举都不曾白费。',
        ),
        question: {
          q: localized('Why is kindness described as a ripple?', '为什么仁慈被形容为涟漪？'),
          options: localized(
            ['It is weak and fades quickly', 'One act inspires others, spreading beyond the giver', 'It only works in water', 'It only helps the giver'],
            ['它很脆弱，很快就会消散', '一次善举会激励他人，扩散到给予者之外', '它只在水中起作用', '它只让给予者受益'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Recall a small kindness you never forgot. Why did it stay with you?',
          '回想一次你始终未曾忘记的小小善举。它为何一直留在你心中？',
        ),
      },
      {
        id: 'kindness-2',
        title: localized('Practising Kindness', '修习仁慈'),
        reading: localized(
          'Kindness grows through deliberate practice. Try this: each morning, choose one person who will receive an intentional act of kindness from you today — a specific compliment, a helping hand, a patient ear. Include the difficult people; kindness to pleasant people is easy, and easy practice builds little strength. And do not forget yourself: harsh self-talk trains the habit of harshness. The goal is for kindness to move from something you do to something you are.',
          '仁慈通过刻意的修习而成长。不妨试试：每天早晨，选定一个人，作为你今天要特意善待的对象 — 一句具体的称赞、一次援手、一份耐心的倾听。也要把难相处的人包括在内；善待讨人喜欢的人很容易，而容易的练习锻炼不出多少力量。也别忘了善待自己：苛刻的自我对话，只会训练出苛刻的习惯。最终的目标，是让仁慈从你「所做」的事，变成你「所是」的人。',
        ),
        question: {
          q: localized('Why practise kindness toward difficult people?', '为什么要对难相处的人练习仁慈？'),
          options: localized(
            ['To win them over for personal gain', 'Because easy practice builds little strength', 'To prove you are better than them', 'It is not worth doing'],
            ['为了个人利益去讨好他们', '因为容易的练习锻炼不出多少力量', '为了证明自己比他们更好', '这样做不值得'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Who is one person you find difficult — and what small kindness could you offer them tomorrow?',
          '有哪一个你觉得难相处的人？明天你可以给他们什么样的小小善意？',
        ),
      },
    ],
  },
  {
    id: 'forgiveness',
    name: localized('Forgiveness', '宽恕'),
    accent: '恕',
    emoji: '🕊️',
    branch: 'compassion',
    parentId: 'compassion',
    intro: localized(
      'Releasing resentment to free yourself and others.',
      '放下怨恨，释放自己，也释放他人。',
    ),
    cardId: 'card-forgiveness',
    lessons: [
      {
        id: 'forgiveness-1',
        title: localized('Setting Down the Burden', '放下重担'),
        reading: localized(
          'Resentment has been called drinking poison and expecting the other person to suffer. Forgiveness is the decision to set the poison down. It does not mean pretending the wrong never happened, excusing it, or even reconciling — it means releasing your claim to revenge so the wound can close. When Confucius was asked for one word to guide a whole life, he chose shu 恕 — reciprocity, often written with the heart radical: "as one\'s own heart." Jesus asked forgiveness even for his executioners. Gandhi taught that forgiveness is the attribute of the strong, not the weak. The person freed first by forgiveness is always the one who forgives.',
          '怨恨曾被比作喝下毒药，却期待对方痛苦。宽恕，是放下这剂毒药的决定。它不是假装错事从未发生，不是为它找借口，甚至也不一定意味着和解 — 它意味着放弃报复的权利，好让伤口得以愈合。当孔子被问及可以终身奉行的一个字时，他选择了「恕」— 这个字常被理解为「如心」，即将心比心。耶稣甚至为处死他的人祈求宽恕。甘地教导说，宽恕是强者的特质，而非弱者的表现。因宽恕而最先获得自由的人，永远是那个宽恕别人的人。',
        ),
        question: {
          q: localized('What does forgiveness actually mean?', '宽恕真正的含义是什么？'),
          options: localized(
            ['Pretending the wrong never happened', 'Releasing resentment so the wound can close', 'Letting people harm you again', 'Forgetting everything'],
            ['假装错事从未发生过', '放下怨恨，让伤口得以愈合', '任由他人再次伤害你', '忘记一切'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Is there a resentment you are carrying that harms you more than anyone else?',
          '你是否正背负着一份怨恨，而它伤害你自己，胜过伤害任何其他人？',
        ),
      },
      {
        id: 'forgiveness-2',
        title: localized('Practising Forgiveness', '修习宽恕'),
        reading: localized(
          'Forgiveness is usually a process, not a moment. Start small: forgive the driver who cut you off, the friend who forgot to reply. For deeper wounds, try writing a letter you never send — name the harm honestly, then name your decision to stop carrying it. Include yourself: many people find self-forgiveness hardest of all, yet carrying old shame helps no one you wronged. Each act of letting go clears ground where something better can grow.',
          '宽恕通常是一个过程，而不是一个瞬间。从小事开始：原谅那个突然别车的司机，原谅那个忘记回复的朋友。对于更深的伤痛，可以试着写一封永远不寄出的信 — 诚实地写下所受的伤害，再写下你决定不再背负它的心意。也别忘了包括自己：许多人发现，宽恕自己是最难的事，然而背负旧日的羞愧，并不能帮助任何一个被你伤害过的人。每一次放下，都为更美好的事物腾出了生长的空间。',
        ),
        question: {
          q: localized('What is a good way to begin practising forgiveness?', '开始修习宽恕的好方法是什么？'),
          options: localized(
            ['Start with the deepest wound', 'Start small, with everyday irritations', 'Wait for an apology first', 'Avoid thinking about it'],
            ['从最深的伤痛开始', '从日常的小烦恼开始', '先等待对方道歉', '避免去想它'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What is one small irritation from this week you can simply decide to release right now?',
          '这一周有哪一件小小的烦心事，是你现在就可以决定放下的？',
        ),
      },
    ],
  },
  {
    id: 'service',
    name: localized('Service', '服务'),
    accent: '奉献',
    emoji: '🤲',
    branch: 'compassion',
    parentId: 'compassion',
    intro: localized('Finding yourself by giving yourself.', '在付出自己中，寻回自己。'),
    cardId: 'card-service',
    lessons: [
      {
        id: 'service-1',
        title: localized('The Paradox of Giving', '给予的悖论'),
        reading: localized(
          'Every wisdom tradition discovered the same paradox: those who give themselves away become richer. Gandhi said the best way to find yourself is to lose yourself in the service of others. Laozi observed that the sage, by living for others, is fulfilled. Modern research agrees — people who volunteer and help others report more meaning and happiness than those who chase pleasure alone. Service also completes the journey of virtue: compassion that never becomes action remains a feeling. In the vision of Datong 大同, a harmonious world is simply this paradox lived at scale — everyone contributing their strength, everyone cared for in need.',
          '每一个智慧传统都发现了同一个悖论：付出自己的人，反而变得更富足。甘地说，找到自我的最好方式，就是在服务他人中忘却自我。老子也曾观察到，圣人正是因为为他人而活，才成就了自身。现代研究也认同这一点 — 那些从事志愿服务、帮助他人的人，比起只追求个人享乐的人，报告出更多的意义感与幸福感。服务也让德行之路得以完整：从未化为行动的慈悲，终究只是一种感受。在大同的愿景中，一个和谐的世界，正是这个悖论在更大规模上的实践 — 人人贡献己力，人人在需要时得到照料。',
        ),
        question: {
          q: localized('What is the paradox of service?', '服务的悖论是什么？'),
          options: localized(
            ['Giving to others leaves you with less', 'Those who give themselves away become richer', 'Service only helps the receiver', 'Only wealthy people can serve'],
            ['付出给他人会让你拥有得更少', '付出自己的人反而变得更富足', '服务只使接受者受益', '只有富有的人才能行服务'],
          ),
          answer: 1,
        },
        reflection: localized(
          'When has helping someone else lifted your own spirits? What does that tell you?',
          '什么时候帮助别人也提振了你自己的心情？这告诉了你什么？',
        ),
      },
      {
        id: 'service-2',
        title: localized('Practising Service', '修习服务'),
        reading: localized(
          'Service does not require grand gestures. Ask three questions each week: Who around me is struggling? What am I good at? Where do those meet? Service that uses your real strengths — cooking, listening, fixing, teaching, organizing — lasts longer than service done from guilt. Start with a radius of one metre: family, neighbours, colleagues. Then let the circle widen. A community where everyone serves within their reach needs no heroes.',
          '服务并不需要惊天动地的举动。每周问自己三个问题：我身边谁正在经历困难？我擅长什么？这两者在哪里交会？运用你真正长处的服务 — 烹饪、倾听、修理、教导、组织 — 比出于愧疚而做的服务更能长久持续。从一米的半径开始：家人、邻居、同事。然后让这个圆圈慢慢扩大。一个人人都在自己能及之处付出的社群，无需英雄。',
        ),
        question: {
          q: localized('What makes service sustainable?', '是什么让服务得以持续？'),
          options: localized(
            ['Doing it from guilt', 'Grand, dramatic gestures', 'Using your real strengths where they meet real needs', 'Serving only strangers'],
            ['出于愧疚去做', '宏大而戏剧化的举动', '在真正的需要与你真正的长处交会之处付出', '只服务陌生人'],
          ),
          answer: 2,
        },
        reflection: localized(
          'What is one strength of yours, and who within one metre of your life could it help this week?',
          '你有什么长处？这一周，在你生活一米之内，谁可能因此受益？',
        ),
      },
    ],
  },

  // ── Character leaves ─────────────────────────────────────────────────
  {
    id: 'humility',
    name: localized('Humility', '谦逊'),
    accent: '谦',
    emoji: '🌾',
    branch: 'character',
    parentId: 'character',
    intro: localized('Strength that does not need to announce itself.', '无需张扬的力量。'),
    cardId: 'card-humility',
    lessons: [
      {
        id: 'humility-1',
        title: localized('The Valley Spirit', '山谷的精神'),
        reading: localized(
          'Laozi loved images of lowness: the valley that gathers all streams, the ocean that is king of a hundred rivers because it lies below them. Humility is not thinking less of yourself; it is thinking of yourself less — seeing your true size in a vast world, honestly acknowledging both your strengths and your limits. Socrates was called the wisest man in Athens precisely because he knew what he did not know. The ripest grain bows lowest, says the proverb. Humility is also the door to all learning: a full cup can receive nothing. Arrogance closes that door and, worse, closes people\'s hearts.',
          '老子偏爱「低下」的意象：汇聚百川的山谷，因甘居于百川之下而成为百川之王的大海。谦逊，并不是看轻自己，而是少想着自己 — 在广阔的世界中看清自己真实的位置，诚实地承认自己的长处，也承认自己的局限。苏格拉底之所以被称为雅典最有智慧的人，正是因为他知道自己有多少不知道的事。俗话说，最饱满的稻穗，垂得最低。谦逊也是通往一切学习的门 — 一只装满的杯子，什么也装不下。傲慢关上了这扇门，更糟的是，它也关上了人心。',
        ),
        question: {
          q: localized('What is humility?', '什么是谦逊？'),
          options: localized(
            ['Thinking you are worthless', 'Seeing your true size honestly — strengths and limits alike', 'Never accepting praise', 'Letting others mistreat you'],
            ['认为自己毫无价值', '诚实地看清自己真实的位置 — 包括长处与局限', '从不接受赞美', '任由他人恶待自己'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What is something you are not good at that you could openly admit — and maybe ask for help with?',
          '有什么事是你并不擅长、可以坦然承认、也许还能开口寻求帮助的？',
        ),
      },
      {
        id: 'humility-2',
        title: localized('Practising Humility', '修习谦逊'),
        reading: localized(
          'Try these practices: ask a genuine question of someone you usually instruct; say "I was wrong" plainly, without excuses, the next time you are; give away credit for a success that others shared in; and each day, learn one thing from someone unexpected — a child, a beginner, a critic. Humility grows fastest at the exact moments pride resists most.',
          '试试这些练习：向一位你平时习惯指导的人，提出一个真诚的问题；下一次犯错时，坦然说出"我错了"，不加任何借口；把他人共同参与的成功之功劳让出去；每天从一个意想不到的人身上学到一件事 — 一个孩子、一个初学者、一位批评你的人。谦逊往往在骄傲最抗拒的那一刻，成长得最快。',
        ),
        question: {
          q: localized('When does humility grow fastest?', '谦逊何时成长得最快？'),
          options: localized(
            ['When everything goes well', 'At the moments pride resists most', 'When we are praised', 'When we avoid other people'],
            ['当一切顺利时', '在骄傲最抗拒的时刻', '当我们受到赞美时', '当我们回避他人时'],
          ),
          answer: 1,
        },
        reflection: localized(
          'When did you last say "I was wrong" without adding an excuse? How did it feel?',
          '你上一次说"我错了"而不加任何借口是什么时候？那种感觉如何？',
        ),
      },
    ],
  },
  {
    id: 'patience',
    name: localized('Patience', '耐心'),
    accent: '忍',
    emoji: '🐢',
    branch: 'character',
    parentId: 'character',
    intro: localized(
      'The quiet power of enduring and waiting well.',
      '忍耐与善于等待的静默力量。',
    ),
    cardId: 'card-patience',
    lessons: [
      {
        id: 'patience-1',
        title: localized('The Strength to Wait', '等待的力量'),
        reading: localized(
          'A farmer in the old Chinese tale, impatient for his rice to grow, pulled each seedling up a little to "help" — and by evening the whole field had withered. Patience is the wisdom that growth has its own pace: in crops, in skills, in people, in ourselves. It is not passive; the patient farmer still waters, weeds, and tends. Patience is also the guardian at anger\'s door — the pause between a provocation and your response, in which your best self can catch up with your first impulse. "Patience is bitter," said Rousseau, "but its fruit is sweet."',
          '在一则古老的中国寓言里，有位农夫因等不及稻苗长高，便把每一株禾苗都稍稍拔高一些来"帮助"它们 — 到了傍晚，整片田地都枯萎了。这就是「揠苗助长」。耐心，是懂得成长自有其节奏的智慧：庄稼如此，技能如此，人也如此，我们自己更是如此。耐心并非消极被动 — 有耐心的农夫依然浇水、除草、悉心照料。耐心也是守在怒气之门前的卫士 — 是挑衅与你的回应之间的那一停顿，让你最好的自己能够赶上你最初的冲动。卢梭说："忍耐是苦的，但它的果实是甜的。"',
        ),
        question: {
          q: localized('What does the tale of the impatient farmer teach?', '揠苗助长的寓言教会了我们什么？'),
          options: localized(
            ['Rice needs more fertilizer', 'Forcing growth destroys it; growth has its own pace', 'Farming is not worthwhile', 'Help always makes things better'],
            ['水稻需要更多肥料', '强行催长只会摧毁生长；成长自有其节奏', '务农不值得从事', '帮助总能让事情变得更好'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Where in your life are you "pulling on seedlings" — trying to force what needs time?',
          '在你生活中的哪个地方，你正在"拔苗助长" — 试图强行催促那些需要时间的事？',
        ),
      },
      {
        id: 'patience-2',
        title: localized('Practising Patience', '修习耐心'),
        reading: localized(
          'Patience can be trained like a muscle. Practise the sacred pause: when irritation flares, take one full breath before speaking. Use waiting itself as practice — a queue or a delay is a free gymnasium for the mind; notice the irritation, and let it pass like weather. And practise patience with yourself most of all: you are also a field that ripens slowly. The goal is not to never feel impatience, but to stop letting it drive.',
          '耐心可以像肌肉一样被训练。练习那神圣的停顿：当烦躁升起时，先做一次完整的呼吸，再开口说话。把等待本身当作练习 — 排队或延误，都是心灵的免费健身房；觉察那份烦躁，让它如风雨般过去。而最重要的，是对自己练习耐心：你自己，也是一片需要慢慢成熟的田地。目标不是从此不再感到不耐烦，而是不再任由它来驾驭你。',
        ),
        question: {
          q: localized('What is the "sacred pause"?', '「神圣的停顿」是什么？'),
          options: localized(
            ['A long holiday', 'One full breath between provocation and response', 'Refusing to ever speak', 'A form of meditation retreat'],
            ['一段长假', '挑衅与回应之间的一次完整呼吸', '从此拒绝开口说话', '一种禅修闭关的形式'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What situation most reliably triggers your impatience? What would the pause look like there?',
          '什么情境最常引发你的不耐烦？在那种情境中，"停顿"会是什么样子？',
        ),
      },
    ],
  },
  {
    id: 'integrity',
    name: localized('Integrity', '正直'),
    accent: '诚',
    emoji: '🧭',
    branch: 'character',
    parentId: 'character',
    intro: localized(
      'Being whole: one person in public and in private.',
      '完整合一：人前人后，同为一人。',
    ),
    cardId: 'card-integrity',
    lessons: [
      {
        id: 'integrity-1',
        title: localized('One Whole Person', '完整合一的人'),
        reading: localized(
          'Integrity comes from the word for "whole" — an integer, undivided. A person of integrity is the same person in public and in private, in success and under pressure. Confucian thought prizes cheng 诚, sincerity: no gap between what you believe, say, and do. Its power is trust: every kept promise is a brick in the invisible bridge others can walk on; every broken one removes ten. Integrity is expensive in the moment — the honest answer may cost an advantage — and priceless over a lifetime, because a reputation for truth cannot be bought at any price. As the junzi ideal teaches: the exemplary person is watchful over themselves even when alone.',
          '"正直"（integrity）一词，源自"完整"之意 — 如同一个不可分割的整数。一个正直的人，在人前与人后是同一个人，在成功时与在压力下也是同一个人。儒家思想珍视「诚」：所信、所言、所行之间，没有裂缝。它的力量在于信任：每一个信守的承诺，都是他人可以踏上的那座无形之桥上的一砖一石；而每一次食言，则会拆掉十块。正直在当下往往代价不菲 — 诚实的答案可能让你失去某种优势 — 但纵观一生，它却无价，因为诚信的名声，无论用多少钱都买不到。正如「君子」的理想所教导的：修养有成的人，即便独处之时，也谨慎自守 — 慎独。',
        ),
        question: {
          q: localized('What does cheng 诚 (sincerity) mean?', '「诚」是什么意思？'),
          options: localized(
            ['Saying what people want to hear', 'No gap between what you believe, say, and do', 'Never changing your mind', 'Speaking formally'],
            ['说别人想听的话', '所信、所言、所行之间没有裂缝', '永不改变主意', '说话正式'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Is there a gap anywhere between what you say and what you do? What would closing it require?',
          '在你所说的话与所做的事之间，是否存在某种裂缝？弥合它需要什么？',
        ),
      },
      {
        id: 'integrity-2',
        title: localized('Practising Integrity', '修习正直'),
        reading: localized(
          'Integrity is built in small transactions: return the extra change, admit the missed deadline, keep the minor promise no one would notice you breaking. Beware the "just this once" doorway — almost every large compromise began as a small one. A useful test: before acting, ask whether you would be comfortable if the people you most respect could see. Practise also the harder half of integrity: keeping promises to yourself, which quietly teaches you whether your own word can be trusted.',
          '正直是在一件件小事中建立起来的：退还多找的零钱，承认自己错过的截止日期，信守那个即使违背也无人会察觉的小小承诺。要警惕"就这一次"这道门 — 几乎每一次大的妥协，最初都只是一次小小的妥协。一个有用的检验方法：在行动之前，问问自己，如果你最敬重的人能够看见，你是否依然坦然。也要练习正直更难的那一半：信守对自己的承诺 — 这会悄悄告诉你，自己说出的话，究竟值不值得信任。',
        ),
        question: {
          q: localized('Where is integrity mainly built?', '正直主要是在哪里建立起来的？'),
          options: localized(
            ['In dramatic public moments', 'In small everyday transactions', 'In what we say about ourselves', 'In formal ceremonies'],
            ['在戏剧性的公开时刻', '在日常的小事之中', '在我们对自己的评价之中', '在正式的仪式之中'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What small promise to yourself, kept daily, would most change your life in a year?',
          '有哪一个每天信守的小小承诺，一年之后最能改变你的人生？',
        ),
      },
    ],
  },

  // ── Understanding leaves ─────────────────────────────────────────────
  {
    id: 'reflection',
    name: localized('Reflection', '反思'),
    accent: '省',
    emoji: '🪞',
    branch: 'understanding',
    parentId: 'understanding',
    intro: localized('The daily mirror: examining your own life.', '每日的镜子：省察自己的人生。'),
    cardId: 'card-reflection',
    lessons: [
      {
        id: 'reflection-1',
        title: localized('The Daily Examination', '每日的省察'),
        reading: localized(
          'Confucius\' student Zengzi examined himself daily on three points: Was I faithful in what I did for others? Was I trustworthy with friends? Did I practise what I was taught? (吾日三省吾身). Socrates went further: the unexamined life is not worth living. Reflection is how experience becomes wisdom — without it, we can repeat the same year of mistakes forty times and call it forty years of experience. It needs only minutes: a look back at the day, honest but kind, asking what went well, what went wrong, and what to try tomorrow. The mirror is not for punishing yourself; it is for seeing yourself.',
          '孔子的弟子曾子，每天从三个方面反省自己：为人做事是否尽心竭力？与朋友交往是否守信？所学的道理是否已经践行？— 这便是"吾日三省吾身"。苏格拉底则说得更进一步：未经省察的人生，不值得度过。反思，正是经验化为智慧的方式 — 若没有反思，我们可能把同一年的错误重复四十遍，却把它称作四十年的经验。反思其实只需几分钟：诚实而温柔地回顾这一天，问问自己什么做得好，什么出了差错，明天可以尝试什么。这面镜子，不是用来惩罚自己的；它是用来看见自己的。',
        ),
        question: {
          q: localized('How does experience become wisdom?', '经验是如何变成智慧的？'),
          options: localized(
            ['Automatically, with age', 'Through honest reflection on experience', 'By forgetting failures', "Through others' opinions"],
            ['随着年龄增长自然而然', '通过对经验的诚实反思', '通过遗忘失败', '通过他人的看法'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Looking honestly but kindly at yesterday: what is one thing you would do differently?',
          '诚实而温柔地回顾昨天：有哪一件事，你会想要用不同的方式去做？',
        ),
      },
      {
        id: 'reflection-2',
        title: localized('Practising Reflection', '修习反思'),
        reading: localized(
          "Give reflection a fixed home in your day — evenings work well, and this app's Evening Reflection is built for it. Keep it short and honest: three questions, three sentences. Watch for patterns across days, not verdicts on single ones: patterns are where the real lessons live. And end each reflection facing forward — one small intention for tomorrow — so the mirror becomes a window.",
          '为反思在你的一天中安排一个固定的位置 — 夜晚是不错的时段，本应用的"夜间反思"正是为此而设计。保持简短而诚实：三个问题，三句话即可。留意跨越许多天所呈现出的规律，而不是对单独一天下定论 — 真正的功课，往往藏在这些规律之中。并让每一次反思都朝向未来收尾 — 为明天定下一个小小的心愿 — 这样，镜子便化作了一扇窗。',
        ),
        question: {
          q: localized('What should reflection look for across days?', '反思应该在多日之中寻找什么？'),
          options: localized(
            ['Reasons to feel guilty', 'Patterns, where real lessons live', "Other people's faults", 'Perfect days only'],
            ['感到愧疚的理由', '规律，真正的功课所在之处', '他人的过错', '只有完美的日子'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What pattern — good or bad — have you noticed in your last few days?',
          '在你最近这几天里，你注意到了什么样的规律 — 无论好坏？',
        ),
      },
    ],
  },
  {
    id: 'discernment',
    name: localized('Discernment', '明辨'),
    accent: '辨',
    emoji: '⚖️',
    branch: 'understanding',
    parentId: 'understanding',
    intro: localized(
      'Judging well: truth from noise, better from worse.',
      '善于判断：从喧嚣中辨明真相，从优劣中辨明取舍。',
    ),
    cardId: 'card-discernment',
    lessons: [
      {
        id: 'discernment-1',
        title: localized('Weighing What Is True', '权衡真相'),
        reading: localized(
          'Discernment is the skill of judging well — telling truth from noise, the important from the urgent, the better from the merely easier. Confucius warned against both extremes of laziness: believing everything and doubting everything. The Buddha told the Kalamas not to accept a teaching merely because of tradition, rumour, or authority — but to test it: does it lead to harm or to welfare? In an age of infinite information, discernment matters more than ever: the question is no longer how to find information but how to weigh it. Ask of what you hear: Who says so? How do they know? What would change my mind?',
          '明辨，是善于判断的能力 — 从喧嚣中辨明真相，从紧急中辨明真正重要之事，从轻易之中辨明真正更好的选择。孔子警惕两种懒惰的极端：全盘相信，与全盘怀疑。佛陀告诉迦罗摩人，不要仅仅因为传统、传闻或权威就接受一种教导 — 而要去检验它：它会带来伤害，还是带来福祉？在一个信息无穷无尽的时代，明辨比以往任何时候都更加重要：问题已不再是如何寻找信息，而是如何权衡信息。对于所听到的一切，不妨问一问：是谁这么说的？他们是怎么知道的？什么样的证据能改变我的想法？',
        ),
        question: {
          q: localized('What test did the Buddha give the Kalamas for any teaching?', '佛陀给迦罗摩人检验任何教导的方法是什么？'),
          options: localized(
            ['Is it ancient?', 'Is it popular?', 'Does it lead to harm or to welfare when practised?', 'Is it beautifully written?'],
            ['它是否古老？', '它是否流行？', '实践它，会带来伤害还是带来福祉？', '它是否辞藻优美？'],
          ),
          answer: 2,
        },
        reflection: localized(
          'What belief do you hold mainly because you have never questioned it?',
          '有哪一个信念，你之所以持有它，主要是因为你从未质疑过它？',
        ),
      },
      {
        id: 'discernment-2',
        title: localized('Practising Discernment', '修习明辨'),
        reading: localized(
          'Train judgment deliberately. Before sharing a claim, pause: is it true, and is it helpful? Before a decision, name what would count as evidence you are wrong — a mind that cannot be changed cannot discern. Seek one voice you respect who disagrees with you, and listen to understand rather than to answer. Discernment also applies to attention itself: what you repeatedly attend to shapes what you become, so choose your inputs like you choose your food.',
          '刻意地训练自己的判断力。在分享一个说法之前，先停顿一下：它是真的吗？它有益吗？在做决定之前，先想清楚什么样的证据会让你承认自己错了 — 一个无法被改变的心，也就无法明辨。寻找一个你敬重、却与你意见不同的声音，倾听是为了理解，而不是为了反驳。明辨也适用于注意力本身：你反复关注的事物，塑造着你将成为的样子，所以，请像挑选食物一样，谨慎挑选你所摄入的信息。',
        ),
        question: {
          q: localized('Why should you name what would change your mind?', '为什么要先想清楚什么会改变你的想法？'),
          options: localized(
            ['To win arguments', 'A mind that cannot be changed cannot discern', 'To seem open-minded', 'It is not useful'],
            ['为了赢得争论', '一个无法被改变的心，也就无法明辨', '为了显得思想开放', '这没有用'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What do you give your attention to daily — and what is it slowly making of you?',
          '你每天把注意力放在什么上面？它正悄悄把你变成什么样的人？',
        ),
      },
    ],
  },
  {
    id: 'awareness',
    name: localized('Awareness', '觉察'),
    accent: '觉',
    emoji: '🧘',
    branch: 'understanding',
    parentId: 'understanding',
    intro: localized('Being fully present in this moment.', '全然临在于此刻。'),
    cardId: 'card-awareness',
    lessons: [
      {
        id: 'awareness-1',
        title: localized('Waking Up to Now', '觉醒于当下'),
        reading: localized(
          'The word "Buddha" simply means "the awakened one" — and what he awoke to, above all, was the present moment, seen clearly and without grasping. Most of life is missed on autopilot: we eat without tasting, listen without hearing, walk without arriving anywhere inside ourselves. Awareness — mindfulness — is the practice of returning: to the breath, to the senses, to the person actually in front of you. It is the soil of every other virtue: you cannot be patient, kind, or honest in a moment you are not present for. Zhuangzi praised the artisan whose full attention made work effortless; presence is not only calming, it is how excellence happens.',
          '"佛陀"这个词，本意就是"觉悟者"— 而他所觉悟到的，首先便是清晰而不执取地看见当下这一刻。生命中大部分时光，都在自动导航中被错过：我们吃东西却尝不出滋味，听着却听不见，走着路却在内心从未真正抵达任何地方。觉察 — 正念 — 便是不断回归的修习：回到呼吸，回到感官，回到眼前真正站着的这个人。它是一切其他德行赖以生长的土壤：在一个你并未真正临在的时刻，你无法保持耐心、仁慈或诚实。庄子曾赞颂那位因全神贯注而使工作毫不费力的匠人；临在，不只是让人平静，它更是卓越得以发生的方式。',
        ),
        question: {
          q: localized('Why is awareness called the soil of other virtues?', '为什么觉察被称为其他德行的土壤？'),
          options: localized(
            ['It is the oldest virtue', 'You cannot practise any virtue in a moment you are absent from', 'It requires the most study', 'It replaces the other virtues'],
            ['因为它是最古老的德行', '在你缺席的时刻，你无法践行任何德行', '因为它需要最多的学习', '因为它取代了其他德行'],
          ),
          answer: 1,
        },
        reflection: localized(
          'What part of your day do you most often spend on autopilot? What might you be missing there?',
          '你一天中哪个部分最常处于自动导航状态？你可能因此错过了什么？',
        ),
      },
      {
        id: 'awareness-2',
        title: localized('Practising Awareness', '修习觉察'),
        reading: localized(
          'Awareness is trained in ordinary moments. Try one mindful minute: stop, and take five slow breaths, feeling each one fully. Do one daily task — tea, washing dishes, a short walk — with complete attention, as if for the first time. In conversation, practise listening with your whole self, without rehearsing your reply. When the mind wanders (it will, thousands of times), the practice is not to never wander — it is the gentle return. Every return is one repetition of the most important exercise there is.',
          '觉察，是在平凡的时刻中被训练出来的。试试"正念一分钟"：停下来，做五次缓慢的呼吸，充分感受每一次。选一件每天都会做的事 — 泡茶、洗碗、散一小段步 — 以全然的专注去做，仿佛是第一次做。在对话中，练习用整个自己去倾听，而不是在心里预演自己的回答。当心思游移时（它一定会，成千上百次），修习的重点不在于永不游移 — 而在于温柔地把它带回来。每一次带回来，都是在重复这世上最重要的一个练习。',
        ),
        question: {
          q: localized('When the mind wanders during practice, what is the real exercise?', '当心思在练习中游移时，真正的练习是什么？'),
          options: localized(
            ['Forcing the mind to never wander', 'Giving up for the day', 'The gentle return of attention', 'Thinking harder'],
            ['强迫心思永不游移', '当天就放弃练习', '温柔地把注意力带回来', '更用力地思考'],
          ),
          answer: 2,
        },
        reflection: localized(
          'Choose one daily task to do with full attention tomorrow. Which will it be?',
          '选一件明天要以全然专注去做的日常之事。会是哪一件呢？',
        ),
      },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = TOPICS.flatMap((t) => t.lessons);

export function topicOfLesson(lessonId: string): Topic | undefined {
  return TOPICS.find((t) => t.lessons.some((l) => l.id === lessonId));
}
