import { localized, type Localized } from '../i18n/types';

/**
 * Content bank for the Advisor feature (src/features/advisor/Advisor.tsx).
 * Keyed by figure wisdom-card id (matches CARDS in ./cards.ts), then by
 * topic. `reflection` is only present on legendary figures — that presence
 * (not a branch in the component) is what encodes the rarity depth rule.
 * `{{streak}}`/`{{harmony}}` in a reflection are substituted at render time.
 */

export type AdvisorTopicId = 'patience' | 'anger' | 'loss' | 'purpose' | 'relationships' | 'doubt';

export const ADVISOR_TOPICS: AdvisorTopicId[] = ['patience', 'anger', 'loss', 'purpose', 'relationships', 'doubt'];

export interface AdvisorWisdomEntry {
  quote: Localized<string>;
  framing: Localized<string>;
  reflection?: Localized<string>;
}

type AdvisorFigureWisdom = Record<AdvisorTopicId, AdvisorWisdomEntry>;

export const ADVISOR_WISDOM: Record<string, AdvisorFigureWisdom> = {
  'card-socrates': {
    patience: {
      quote: localized(
        'I know that I know nothing — and there is peace in that not-knowing.',
        '我知道我一无所知——而这份不知，自有一种平静。',
      ),
      framing: localized(
        'For Socrates, waiting for clarity was never wasted time; it was the work itself.',
        '对苏格拉底而言，等待清晰从不是浪费时间，那本身就是修行。',
      ),
    },
    anger: {
      quote: localized(
        'No one does wrong willingly — every harsh word hides a mistaken idea of the good.',
        '没有人心甘情愿作恶——每一句伤人的话，背后都是对「善」的误解。',
      ),
      framing: localized(
        'He met anger with questions, not force, trusting that clear thinking cools what shouting cannot.',
        '他以提问而非强硬回应怒气，相信清晰的思考能平息呐喊无法平息的东西。',
      ),
    },
    loss: {
      quote: localized(
        'To fear death, my friends, is only to think ourselves wise when we are not.',
        '朋友们，惧怕死亡，不过是自以为聪明，其实并非如此。',
      ),
      framing: localized(
        'He treated loss the way he treated every unknown — worth examining, not fleeing.',
        '他对待失落，一如对待所有未知——值得细细省察，而非逃避。',
      ),
    },
    purpose: {
      quote: localized('The unexamined life is not worth living.', '未经省察的人生，不值得度过。'),
      framing: localized(
        "For Socrates, purpose wasn't handed down — it was found by relentlessly asking why.",
        '对苏格拉底来说，志向不是被赋予的，而是靠不断追问「为什么」找到的。',
      ),
    },
    relationships: {
      quote: localized(
        'Be kind, for everyone you meet is fighting a harder battle than you know.',
        '请善待他人，因为你遇见的每个人，都在打一场你不知道的更艰难的仗。',
      ),
      framing: localized(
        'He judged a friendship by how honestly it could bear a hard question.',
        '他衡量一段友谊的标准，是它能否坦然承受一个尖锐的问题。',
      ),
    },
    doubt: {
      quote: localized('Wonder is the beginning of wisdom.', '惊奇，是智慧的开端。'),
      framing: localized(
        'Socrates never rushed to certainty — doubt, held honestly, was where his best thinking began.',
        '苏格拉底从不急于求得定论——诚实地怀疑，正是他最好的思考的起点。',
      ),
    },
  },

  'card-aristotle': {
    patience: {
      quote: localized('Patience is bitter, but its fruit is sweet.', '忍耐是苦的，但它的果实是甜的。'),
      framing: localized(
        'Aristotle saw every virtue, patience included, as a habit built one repeated act at a time.',
        '亚里士多德认为，包括耐心在内的每一种美德，都是靠反复的行动养成的习惯。',
      ),
    },
    anger: {
      quote: localized(
        'Anyone can become angry — that is easy. To be angry with the right person, to the right degree, at the right time — that is not easy.',
        '任何人都会生气——这很容易。但对的人、对的程度、对的时机才生气——这并不容易。',
      ),
      framing: localized(
        "He didn't ask you to suppress anger, only to aim it well.",
        '他并不要求你压抑怒气，只要求你把它用在正确的地方。',
      ),
    },
    loss: {
      quote: localized(
        'We are what we repeatedly do; excellence is a habit, not an act.',
        '我们是自己反复行为的总和；卓越不是一时之举，而是一种习惯。',
      ),
      framing: localized(
        'Even grief, to Aristotle, was something you moved through by practice, not by waiting it out.',
        '在亚里士多德看来，即使是悲伤，也要靠不断的练习去穿越，而非枯等它过去。',
      ),
    },
    purpose: {
      quote: localized('Knowing yourself is the beginning of all wisdom.', '了解自己，是一切智慧的开端。'),
      framing: localized(
        'Purpose, for Aristotle, was your particular function done well — not a title borrowed from elsewhere.',
        '对亚里士多德而言，志向就是把你独有的职分做好，而非借来的头衔。',
      ),
    },
    relationships: {
      quote: localized(
        'In poverty and other misfortunes of life, true friends are a sure refuge.',
        '在贫困与人生的种种不幸中，真正的朋友是可靠的庇护所。',
      ),
      framing: localized(
        'He ranked friendship among the highest goods a life could hold.',
        '他把友谊列为人生中最珍贵的美好之一。',
      ),
    },
    doubt: {
      quote: localized('The whole is greater than the sum of its parts.', '整体大于部分之和。'),
      framing: localized(
        'Aristotle trusted that scattered doubts, examined patiently, eventually resolve into a clearer whole.',
        '亚里士多德相信，零散的疑惑经过耐心的梳理，终会汇聚成更清晰的整体。',
      ),
    },
  },

  'card-mencius': {
    patience: {
      quote: localized(
        'Do not be like the farmer of Song, who tugged at his seedlings to help them grow.',
        '不要像宋国那位拔苗助长的农夫。',
      ),
      framing: localized(
        'Mencius warned that forcing growth only breaks what patience would have raised well.',
        '孟子提醒，强行催促成长，只会毁掉耐心本可以养好的东西。',
      ),
    },
    anger: {
      quote: localized('The feeling of shame and dislike is the beginning of righteousness.', '羞恶之心，义之端也。'),
      framing: localized(
        'He trusted a well-tended conscience, not suppressed anger, was what actually steadies a person.',
        '他相信，真正让人安定的，是一颗用心涵养的良知，而非压抑的怒气。',
      ),
    },
    loss: {
      quote: localized(
        'Human nature is like water in a whirlpool — it can be led, but not forced, toward the good.',
        '人性如漩涡中的水——可以被引导向善，却不能被强迫。',
      ),
      framing: localized(
        "Mencius believed setbacks bend a life's course without breaking its underlying goodness.",
        '孟子相信，挫折会改变人生的走向，却不会毁掉本性中的善。',
      ),
    },
    purpose: {
      quote: localized(
        'Everyone has within them the beginnings of virtue, as they have four limbs.',
        '人皆有四端，如同人皆有四肢。',
      ),
      framing: localized(
        'He located purpose not in achievement but in tending the good already planted in you.',
        '他认为志向不在于成就，而在于培育心中早已种下的善。',
      ),
    },
    relationships: {
      quote: localized('A benevolent man loves others; a courteous man respects others.', '仁者爱人，有礼者敬人。'),
      framing: localized(
        'For Mencius, how you treated the people nearest you was the truest test of character.',
        '对孟子来说，如何对待身边最亲近的人，才是品格最真实的考验。',
      ),
    },
    doubt: {
      quote: localized("That which cannot be doubted needn't be argued for.", '无可怀疑之处，本不必辩解。'),
      framing: localized(
        'He treated real doubt as worth sitting with, not something to argue away too quickly.',
        '他认为真正的疑惑值得静心沉思，而不该急着用言辞打发。',
      ),
    },
  },

  'card-rumi': {
    patience: {
      quote: localized(
        'Patience is not sitting and waiting, it is foreseeing. It is looking at the thorn and seeing the rose.',
        '耐心不是枯坐等待，而是一种预见——看着荆棘，却看见玫瑰。',
      ),
      framing: localized(
        'Rumi saw patience as a kind of vision — trusting the bloom hidden inside the wait.',
        '鲁米把耐心看作一种眼光——相信等待之中，藏着尚未绽放的花。',
      ),
    },
    anger: {
      quote: localized(
        'Raise your words, not your voice. It is rain that grows flowers, not thunder.',
        '提高你的言辞，而非你的音量。让花朵生长的是雨水，不是雷鸣。',
      ),
      framing: localized(
        'He believed gentleness carried further than force ever could.',
        '他相信，温柔所能到达的地方，远比强硬更远。',
      ),
    },
    loss: {
      quote: localized('The wound is the place where the light enters you.', '伤口，是光进入你的地方。'),
      framing: localized(
        'For Rumi, what broke you open was also what let something new in.',
        '对鲁米而言，那使你破碎的，也正是让新事物得以进入的地方。',
      ),
    },
    purpose: {
      quote: localized(
        'Let yourself be silently drawn by the strange pull of what you really love.',
        '让自己被那真正所爱之物的奇异牵引，静静带走。',
      ),
      framing: localized(
        "He trusted longing itself as a compass toward a life's true direction.",
        '他相信，渴望本身就是指向人生真正方向的罗盘。',
      ),
    },
    relationships: {
      quote: localized(
        "Out beyond ideas of wrongdoing and rightdoing, there is a field. I'll meet you there.",
        '在是非对错的观念之外，有一片田野，我会在那里等你。',
      ),
      framing: localized(
        'Rumi imagined connection as something beyond keeping score.',
        '鲁米想象的连结，是超越计较得失的。',
      ),
    },
    doubt: {
      quote: localized('Sell your cleverness and buy bewilderment.', '卖掉你的聪明，买下你的困惑。'),
      framing: localized(
        'For Rumi, not-knowing was not a failure — it was the state closest to wonder.',
        '对鲁米而言，「不知道」并非一种失败，而是最接近「惊奇」的状态。',
      ),
    },
  },

  'card-kant': {
    patience: {
      quote: localized('Patience is the courage of the virtues.', '耐心，是诸种美德中的勇气。'),
      framing: localized(
        'Kant treated patience as a form of moral discipline, not a passive waiting game.',
        '康德把耐心看作一种道德的自律，而非被动的等待游戏。',
      ),
    },
    anger: {
      quote: localized(
        'He who is cruel to animals becomes hard also in his dealings with men.',
        '对动物残忍的人，对待人也会变得冷酷。',
      ),
      framing: localized(
        'For Kant, how you treated others in small moments revealed your whole character.',
        '对康德而言，你在细微之处如何对待他人，揭示的是你整个的品格。',
      ),
    },
    loss: {
      quote: localized(
        'We are not rich by what we possess but by what we can do without.',
        '我们的富足，不在于拥有多少，而在于能舍弃多少。',
      ),
      framing: localized(
        'He found a strange freedom in what loss forces a person to release.',
        '他在失去所迫使人放下的东西里，发现了一种奇异的自由。',
      ),
    },
    purpose: {
      quote: localized(
        'Act only according to that maxim whereby you can at the same time will that it should become a universal law.',
        '只按照你同时愿意它成为普遍法则的准则去行动。',
      ),
      framing: localized(
        "Kant grounded purpose in principle — living by rules you'd want everyone to live by.",
        '康德把志向建立在原则之上——依循你也愿意所有人遵循的准则而活。',
      ),
    },
    relationships: {
      quote: localized(
        'Treat people as ends in themselves, never merely as means.',
        '永远把人当作目的本身，而非仅仅当作手段。',
      ),
      framing: localized(
        'He held that real respect for another person was non-negotiable, in every relationship.',
        '他坚持，对他人真正的尊重，在任何关系中都不容妥协。',
      ),
    },
    doubt: {
      quote: localized('Dare to know! Have the courage to use your own understanding.', '要有勇气运用你自己的理智，敢于求知！'),
      framing: localized(
        'Kant treated doubt as an invitation to think for yourself rather than borrow an answer.',
        '康德把疑惑看作一种邀请——邀请你独立思考，而非借用现成的答案。',
      ),
    },
  },

  'card-confucius': {
    patience: {
      quote: localized(
        'It does not matter how slowly you go as long as you do not stop.',
        '只要不停下，走得多慢都无妨。',
      ),
      framing: localized(
        'Confucius measured a student not by speed but by whether they kept returning to the work.',
        '孔子衡量一个学生，看的不是速度，而是他是否一次次回到功课上。',
      ),
      reflection: localized(
        "You've kept returning for {{streak}} days, and carried {{harmony}} points of harmony along the way. Confucius might ask: what small, repeated act has quietly become your practice?",
        '你已经坚持回来了 {{streak}} 天，一路上也累积了 {{harmony}} 点和气。孔子或许会问：有哪个微小的、反复做的动作，已经悄悄成了你的修行？',
      ),
    },
    anger: {
      quote: localized('When anger rises, think of the consequences.', '愤怒涌起时，先想想后果。'),
      framing: localized(
        "He taught that a moment's pause was the whole distance between regret and restraint.",
        '他教导说，片刻的停顿，就是懊悔与克制之间全部的距离。',
      ),
      reflection: localized(
        "With {{streak}} days behind you, you've already proven you can pause and return. When anger rises next, what's one pause you could borrow from that habit?",
        '走过 {{streak}} 天，你已经证明自己懂得停顿、懂得回归。下一次愤怒涌起时，你能从这个习惯里借来怎样的一次停顿？',
      ),
    },
    loss: {
      quote: localized(
        'Our greatest glory is not in never falling, but in rising every time we fall.',
        '最大的光荣，不在于从不跌倒，而在于每次跌倒后都能重新站起。',
      ),
      framing: localized(
        'For Confucius, grief and failure were not the opposite of progress — they were part of its shape.',
        '对孔子而言，悲伤与失败并非进步的对立面，而是进步本身的一部分。',
      ),
      reflection: localized(
        "You've risen {{streak}} times already, one day at a time. What did the last hard day teach you that an easy one couldn't?",
        '你已经一天天地重新站起了 {{streak}} 次。上一个艰难的日子，教会了你哪些顺利的日子教不会的事？',
      ),
    },
    purpose: {
      quote: localized(
        'The superior man understands what is right; the inferior man understands what will sell.',
        '君子喻于义，小人喻于利。',
      ),
      framing: localized(
        'Confucius tied purpose to integrity — doing right mattered more than doing what was praised.',
        '孔子把志向与正直联系在一起——做对的事，比做被称赞的事更重要。',
      ),
      reflection: localized(
        "You've gathered {{harmony}} points walking this road. Which of your daily choices, small as it seemed, felt most true to who you want to be?",
        '走这条路，你已积累了 {{harmony}} 点和气。哪一个看似微小的日常选择，让你觉得最贴近自己想成为的样子？',
      ),
    },
    relationships: {
      quote: localized('Ren 仁 — to love others — is the root of all virtue.', '仁者爱人——这是一切德行的根本。'),
      framing: localized(
        "He believed no self-cultivation mattered if it didn't make you kinder to the people around you.",
        '他相信，若修身不能让你对身边的人更温柔，那修身便毫无意义。',
      ),
      reflection: localized(
        'After {{streak}} days of practice, has it changed how you show up for someone close to you? Confucius would want to know who.',
        '经过 {{streak}} 天的修行，这是否改变了你对某个亲近之人的态度？孔子会想知道，是谁。',
      ),
    },
    doubt: {
      quote: localized("Real knowledge is knowing the extent of one's ignorance.", '知之为知之，不知为不知，是知也。'),
      framing: localized(
        'He treated doubt as honesty, not weakness — the mark of someone still willing to learn.',
        '他把怀疑看作诚实，而非软弱——那是一个人仍愿意学习的标志。',
      ),
      reflection: localized(
        "You've stayed on this path for {{streak}} days despite not having every answer. What question are you still sitting with?",
        '尽管没有全部的答案，你仍在这条路上走了 {{streak}} 天。有什么问题，你至今仍在静静思索？',
      ),
    },
  },

  'card-laozi': {
    patience: {
      quote: localized('Nature does not hurry, yet everything is accomplished.', '天地不急，万物自成。'),
      framing: localized(
        'Laozi trusted the slow, unforced pace of water over the strain of forcing an outcome.',
        '老子信赖水那般不急不躁的节奏，而非强求结果的紧绷。',
      ),
      reflection: localized(
        "For {{streak}} days you've let this practice unfold at its own pace, gathering {{harmony}} points along the way. Where else in your life could you loosen your grip a little?",
        '{{streak}} 天以来，你让这段修行按它自己的节奏展开，也累积了 {{harmony}} 点和气。生活中还有哪里，你可以再放松一点手中的紧握？',
      ),
    },
    anger: {
      quote: localized(
        'A good warrior is not violent; a good fighter does not give way to anger.',
        '善为士者不武，善战者不怒。',
      ),
      framing: localized(
        'He met friction the way water meets a rock — not by pushing harder, but by yielding and finding another way around.',
        '他面对摩擦，如水遇石——不是用力冲撞，而是顺势绕行，另寻出路。',
      ),
      reflection: localized(
        'Across {{streak}} days, what has yielding — instead of pushing — actually gotten you?',
        '这 {{streak}} 天里，「顺势」而非「用力」，究竟为你带来了什么？',
      ),
    },
    loss: {
      quote: localized('New beginnings are often disguised as painful endings.', '新的开始，常常伪装成痛苦的结束。'),
      framing: localized(
        'For Laozi, loss was simply the shape change takes before you can see what it made room for.',
        '对老子而言，失去只是变化在你看清它腾出的空间之前，所呈现的样子。',
      ),
      reflection: localized(
        "You've carried {{harmony}} points of harmony through {{streak}} days of change. What ending, looking back, turned out to be a beginning?",
        '在 {{streak}} 天的变化中，你带着 {{harmony}} 点和气一路走来。回头看，哪一个「结束」，其实是一个「开始」？',
      ),
    },
    purpose: {
      quote: localized('He who knows others is wise; he who knows himself is enlightened.', '知人者智，自知者明。'),
      framing: localized(
        'Laozi pointed purpose inward — not toward what the world wanted, but toward who you already were.',
        '老子把志向指向内心——不是世界想要什么，而是你本来就是谁。',
      ),
      reflection: localized(
        "{{streak}} days in, what have you learned about yourself that you didn't know when you started?",
        '走过 {{streak}} 天，你对自己有了哪些一开始并不知道的了解？',
      ),
    },
    relationships: {
      quote: localized(
        'Kindness in words creates confidence. Kindness in thinking creates depth.',
        '言语的良善带来信任，思虑的良善带来深度。',
      ),
      framing: localized(
        'He believed the softest approach to another person was often the strongest one.',
        '他相信，对待他人最柔软的方式，往往也是最有力量的方式。',
      ),
      reflection: localized(
        'With {{harmony}} points of harmony gathered, has your patience with others grown alongside your patience with yourself?',
        '累积了 {{harmony}} 点和气之后，你对他人的耐心，是否也随着你对自己的耐心一起成长了？',
      ),
    },
    doubt: {
      quote: localized('The Dao that can be spoken is not the eternal Dao.', '道可道，非常道。'),
      framing: localized(
        'Laozi held that not everything worth knowing can be pinned down in words — some things you live your way into understanding.',
        '老子认为，并非所有值得知道的事都能用言语说尽——有些道理，要靠亲身经历才能懂得。',
      ),
      reflection: localized(
        "After {{streak}} days, is there something you understand now only in practice, not in words?",
        '{{streak}} 天之后，有没有什么道理，你只能在行动中懂得，却难以言说？',
      ),
    },
  },

  'card-buddha': {
    patience: {
      quote: localized('A jug fills drop by drop.', '水罐是一滴一滴装满的。'),
      framing: localized(
        "The Buddha taught that patience wasn't passive waiting — it was trusting that small, steady effort accumulates.",
        '佛陀教导，耐心并非被动地等待，而是相信微小而稳定的努力终会累积。',
      ),
      reflection: localized(
        "Drop by drop, you've filled {{streak}} days and {{harmony}} points of harmony. What has that slow accumulation taught you that a single big effort couldn't?",
        '一滴一滴地，你积累了 {{streak}} 天与 {{harmony}} 点和气。这份缓慢的积累，教会了你哪些一次猛力无法教会的事？',
      ),
    },
    anger: {
      quote: localized(
        'Holding onto anger is like drinking poison and expecting the other person to die.',
        '紧抓怒气不放，就像自己喝下毒药，却盼着别人因此倒下。',
      ),
      framing: localized(
        'He saw anger as a fire that burns the one holding it longest.',
        '他认为，愤怒是一把火，最先烧伤的，是握着它最久的那个人。',
      ),
      reflection: localized(
        "After {{streak}} days of practice, what's one grudge you're ready to finally set down?",
        '修行 {{streak}} 天之后，有哪一份怨怼，是你终于愿意放下的？',
      ),
    },
    loss: {
      quote: localized(
        'Everything that has a beginning has an ending. Make your peace with that and all will be well.',
        '凡有开始，必有结束。与此和解，一切便会安好。',
      ),
      framing: localized(
        "For the Buddha, impermanence wasn't a tragedy to resist — it was simply how things are.",
        '对佛陀而言，无常不是需要抗拒的悲剧，而只是事物本来的样子。',
      ),
      reflection: localized(
        "You've walked {{streak}} days through change already. What have you learned to let go of more gently?",
        '你已经在变化中走过了 {{streak}} 天。你学会了更温柔地放下什么？',
      ),
    },
    purpose: {
      quote: localized('Peace comes from within. Do not seek it without.', '平静源于内心，勿向外求。'),
      framing: localized(
        "He located purpose not in circumstance but in the mind's own steadiness.",
        '他认为志向不在于境遇，而在于心的安定。',
      ),
      reflection: localized(
        'With {{harmony}} points gathered, has your sense of what actually matters shifted since you began?',
        '累积了 {{harmony}} 点和气之后，从你开始至今，你对「什么才真正重要」的看法，是否有所改变？',
      ),
    },
    relationships: {
      quote: localized('Radiate boundless love towards the entire world.', '对全世界，散发无量的慈爱。'),
      framing: localized(
        'The Buddha treated compassion for others as inseparable from peace within yourself.',
        '佛陀认为，对他人的慈悲，与内心的平静密不可分。',
      ),
      reflection: localized(
        "Across {{streak}} days, who has your growing steadiness quietly made room for?",
        '在这 {{streak}} 天里，你日渐增长的安定，悄悄为谁腾出了空间？',
      ),
    },
    doubt: {
      quote: localized(
        'Believe nothing merely because you have been told it — test it in your own experience.',
        '不要仅仅因为听说而相信——用自己的亲身经历去检验它。',
      ),
      framing: localized(
        'He asked for direct experience over borrowed certainty, doubt included.',
        '他要求的是亲身的体验，而非借来的笃定，怀疑也是如此。',
      ),
      reflection: localized(
        "What have {{streak}} days of your own practice shown you that no one could have simply told you?",
        '{{streak}} 天的亲身修行，让你明白了哪些别人无法直接告诉你的事？',
      ),
    },
  },

  'card-jesus': {
    patience: {
      quote: localized('Be still, and know.', '你们要安静，便知道。'),
      framing: localized(
        'He pointed to stillness itself as a kind of strength, not a delay before the real work begins.',
        '他指出，安静本身就是一种力量，而不是真正开始前的耽搁。',
      ),
      reflection: localized(
        'In {{streak}} days of stillness and practice, gathering {{harmony}} points of harmony, what has quiet actually given you?',
        '在 {{streak}} 天的安静与修行中，你累积了 {{harmony}} 点和气。这份安静，究竟给了你什么？',
      ),
    },
    anger: {
      quote: localized('Blessed are the peacemakers.', '使人和睦的人有福了。'),
      framing: localized(
        'He met conflict with a call to mend it, not win it.',
        '面对冲突，他呼吁去修复，而不是去赢。',
      ),
      reflection: localized(
        'After {{streak}} days of practice, where might you choose to make peace instead of being right?',
        '修行 {{streak}} 天之后，有哪个时刻，你可以选择「和好」而不是「争对错」？',
      ),
    },
    loss: {
      quote: localized('Blessed are those who mourn, for they will be comforted.', '哀恸的人有福了，因为他们必得安慰。'),
      framing: localized(
        "He didn't ask grief to hurry — only trusted that comfort follows it in its own time.",
        '他从不要求悲伤匆匆过去——只是相信，安慰终会以它自己的时间到来。',
      ),
      reflection: localized(
        "You've carried {{harmony}} points of harmony through {{streak}} days. What loss are you still gently comforting?",
        '{{streak}} 天里，你带着 {{harmony}} 点和气一路前行。有什么失去，你仍在温柔地安慰自己？',
      ),
    },
    purpose: {
      quote: localized('Where your treasure is, there your heart will be also.', '你的财宝在哪里，你的心也在哪里。'),
      framing: localized(
        'He measured purpose by what a life was quietly organized around, not what it claimed to value.',
        '他衡量志向的标准，是一个人的生活真正围绕着什么，而非嘴上宣称重视什么。',
      ),
      reflection: localized(
        '{{streak}} days in — what has this practice shown you that you actually treasure?',
        '走过 {{streak}} 天，这段修行让你看清了自己真正珍视的是什么？',
      ),
    },
    relationships: {
      quote: localized('Love your neighbor as yourself.', '爱人如己。'),
      framing: localized(
        'He made care for others inseparable from care for your own soul.',
        '他让对他人的关怀，与对自己灵魂的关怀密不可分。',
      ),
      reflection: localized(
        'With {{harmony}} points gathered, who around you has felt the effect of your steadier days?',
        '累积了 {{harmony}} 点和气，你身边有谁，感受到了你日渐平稳的变化？',
      ),
    },
    doubt: {
      quote: localized('Ask, and it will be given to you; seek, and you will find.', '祈求，就给你们；寻找，就寻见。'),
      framing: localized(
        'He treated honest seeking, doubt and all, as itself a kind of faith.',
        '他把诚实的寻求，连同其中的疑惑，本身就看作一种信心。',
      ),
      reflection: localized(
        'After {{streak}} days of seeking, what question are you still asking?',
        '寻求了 {{streak}} 天，你仍在问着什么问题？',
      ),
    },
  },

  'card-gandhi': {
    patience: {
      quote: localized('Full effort is full victory.', '全力以赴，便是完全的胜利。'),
      framing: localized(
        'Gandhi measured success by sustained effort, not by how quickly change arrived.',
        '甘地衡量成功的标准，是持续的努力，而非改变到来的速度。',
      ),
      reflection: localized(
        "You've sustained effort for {{streak}} days and gathered {{harmony}} points of harmony. What has staying the course taught you that a quick win couldn't?",
        '你已经持续努力了 {{streak}} 天，累积了 {{harmony}} 点和气。坚持到底，教会了你哪些速胜无法教会的事？',
      ),
    },
    anger: {
      quote: localized('An eye for an eye only ends up making the whole world blind.', '以眼还眼，只会让全世界都失明。'),
      framing: localized(
        'He met force with restraint, trusting that retaliation only multiplies harm.',
        '他以克制回应强硬，相信报复只会让伤害成倍增加。',
      ),
      reflection: localized(
        'After {{streak}} days of practice, where could restraint serve you better than retaliation would?',
        '修行 {{streak}} 天之后，有哪个时刻，克制会比报复更有力量？',
      ),
    },
    loss: {
      quote: localized(
        'Freedom is not worth having if it does not include the freedom to make mistakes.',
        '如果自由不包含犯错的自由，那它就不值得拥有。',
      ),
      framing: localized(
        'He held that setbacks were the price, not the opposite, of real growth.',
        '他认为，挫折是真正成长所付出的代价，而非成长的对立面。',
      ),
      reflection: localized(
        'Across {{streak}} days, what mistake taught you something a clean success never could?',
        '在这 {{streak}} 天里，哪一个错误，教会了你一次干净利落的成功永远教不会的事？',
      ),
    },
    purpose: {
      quote: localized('Be the change that you wish to see in the world.', '成为你希望在世界上看见的那种改变。'),
      framing: localized(
        'For Gandhi, purpose began with your own conduct, not with waiting for the world to move first.',
        '对甘地而言，志向始于自身的言行，而非等待世界先行改变。',
      ),
      reflection: localized(
        'With {{harmony}} points of harmony gathered, what change have you already begun to be?',
        '累积了 {{harmony}} 点和气，你已经开始成为了怎样的改变？',
      ),
    },
    relationships: {
      quote: localized(
        'The best way to find yourself is to lose yourself in the service of others.',
        '找到自己最好的方式，就是在服务他人中忘却自己。',
      ),
      framing: localized(
        'He believed a life turned toward others was also the surest way to understand your own.',
        '他相信，一个转向他人的生命，也是理解自己生命最确实的方式。',
      ),
      reflection: localized(
        "After {{streak}} days of practice, who has your quiet consistency served, even without them knowing it?",
        '修行 {{streak}} 天之后，你默默的坚持，在谁都未曾察觉的情况下，帮助了谁？',
      ),
    },
    doubt: {
      quote: localized('In a gentle way, you can shake the world.', '以温和的方式，你也能撼动世界。'),
      framing: localized(
        'He trusted that even uncertain, small acts of conviction were never wasted.',
        '他相信，即使是犹疑不定的、微小的坚持之举，也从未被浪费。',
      ),
      reflection: localized(
        "You've shown up quietly for {{streak}} days. What small, uncertain act of yours might matter more than you think?",
        '你已经默默坚持出现了 {{streak}} 天。有哪个微小、犹疑的举动，或许比你想象的更重要？',
      ),
    },
  },
};
