import type { Lesson, Topic } from './types';
import { localized } from '../i18n/types';

/**
 * Extra Depth II–III lessons and topics (v1.2). Merged onto DEPTH_TOPICS
 * in knowledgeDepth.ts so the foundation file stays readable.
 */

export const EXTRA_LESSONS_BY_TOPIC: Record<string, Lesson[]> = {
  generosity: [
    {
      id: 'generosity-3',
      title: localized('The Habit of Offering', '给予的习惯'),
      reading: localized(
        'Generosity deepens when it becomes a small daily habit, not a rare heroic gift. A seat offered, a message of thanks, sharing credit at work — each loosens the reflex to clutch. Traditions that practice alms or hospitality often insist on regularity: the heart learns by repetition. Depth II asks you to notice needs nearby and answer one of them without waiting to feel “ready” or wealthy enough.',
        '当慷慨成为微小的日课，而非罕见的英雄式馈赠，它才会加深。让出座位、一句感谢、在工作中分享功劳 — 每一项都松开紧握的反射。实行布施或好客的传统，往往坚持规律：心靠重复学会。第二层请你留意近旁的需要，并回应其中一项，而不必等待自己觉得「准备好了」或足够富有。',
      ),
      question: {
        q: localized('How does this lesson say generosity deepens?', '本课说慷慨如何加深？'),
        options: localized(
          ['By rare heroic gifts only', 'By small daily habits of offering', 'By keeping score of favours', 'By waiting until you feel wealthy'],
          ['仅靠罕见的英雄式馈赠', '靠微小的日常给予习惯', '靠记人情账', '靠等到自觉富有'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Name one small offering you can make tomorrow without spending money.',
        '说出明天你可以做的一件不花钱的微小给予。',
      ),
    },
  ],
  gentleness: [
    {
      id: 'gentleness-3',
      title: localized('Gentleness Toward Yourself', '对自己的温柔'),
      reading: localized(
        'Compassion’s second walk includes the self you speak to in private. Harsh self-talk rarely produces lasting virtue; it produces hiding and exhaustion. Gentleness here is not excuse-making — it is correcting without contempt, the way a good teacher guides a student. Many traditions pair rigor of practice with kindness toward the practitioner. If you cannot be gentle with your own learning curve, your gentleness toward others will thin under stress.',
        '慈悲的第二程也包括你私下对自己说话的那个人。严苛的自我对话很少产生持久的德行；它产生躲藏与耗尽。这里的温柔不是找借口 — 而是没有鄙视的纠正，如良师引导学生。许多传统把修行的严谨与对修行者的善意放在一起。若你不能温柔对待自己的学习曲线，对他人的温柔在压力下就会变薄。',
      ),
      question: {
        q: localized('What is gentleness toward yourself in this lesson?', '在本课中，对自己的温柔是什么？'),
        options: localized(
          ['Making endless excuses', 'Correcting without contempt', 'Never practising', 'Praising yourself publicly'],
          ['不断找借口', '没有鄙视地纠正', '永不练习', '公开赞美自己'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Rewrite one harsh sentence you often tell yourself into a firm but kind one.',
        '把你常对自己说的一句苛责，改写成坚定却善意的一句。',
      ),
    },
  ],
  hospitality: [
    {
      id: 'hospitality-3',
      title: localized('Making Room on Purpose', '有意地腾出空间'),
      reading: localized(
        'Hospitality is spatial and temporal: you make room — at a table, in a calendar, in a conversation. Depth II moves beyond politeness into intention: who is usually left outside your circle, and what one concrete welcome would cost you? Sacred guest laws in many cultures protect the stranger because communities decay when only the familiar is fed. Practise hospitality by designing one open seat — literal or figurative — this week.',
        '好客关乎空间与时间：你腾出位置 — 在餐桌旁、在日程里、在对话中。第二层越过礼貌，进入有意：谁通常被留在你的圈子外，一次具体的欢迎会让你付出什么？许多文化的待客律保护陌生人，因为只喂养熟人的群体会衰败。练习好客：这周设计一个开放的座位 — 字面或比喻上的。',
      ),
      question: {
        q: localized('What does hospitality require beyond politeness here?', '在这里，好客在礼貌之外还要求什么？'),
        options: localized(
          ['Larger houses only', 'Intention — making room for someone often left outside', 'Entertaining strangers every night', 'Never keeping close friends'],
          ['只要更大的房子', '有意 — 为常被留在圈外的人腾出空间', '每晚招待陌生人', '永不保持密友'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Who could sit in your “open seat” this week, and what will you actually offer them?',
        '这周谁可以坐进你的「开放座位」，你实际会提供什么？',
      ),
    },
  ],
  courage: [
    {
      id: 'courage-3',
      title: localized('Courage in Small Rooms', '斗室中的勇敢'),
      reading: localized(
        'Moral courage is often quieter than battlefield stories. It is naming a harm in a meeting, apologising first, refusing gossip, or telling a loved one a hard truth kindly. Character’s second walk trains courage where your reputation is local and the cost is awkwardness, not glory. Aristotle’s mean still applies: not recklessness, not silence that abandons what is right. Ask what the right act is while fear is present — then take the smallest honest step.',
        '道德勇敢往往比战场故事更安静。它是在会议上指出伤害、先道歉、拒绝闲话，或温柔地对亲爱的人说出难听的真相。品格的第二程在名声只是局部、代价是尴尬而非光荣之处训练勇敢。亚里士多德的中道仍适用：不是鲁莽，也不是遗弃正道的沉默。问：恐惧仍在时，正行是什么 — 然后跨出最小的诚实一步。',
      ),
      question: {
        q: localized('Where does this lesson locate moral courage?', '本课把道德勇敢放在何处？'),
        options: localized(
          ['Only on battlefields', 'In small local acts while fear and awkwardness are present', 'In never feeling fear', 'In winning every argument'],
          ['仅在战场上', '在恐惧与尴尬仍在时的局部小行动中', '在永不感到恐惧中', '在赢得每一次争论中'],
        ),
        answer: 1,
      },
      reflection: localized(
        'What is one small courageous act you have been postponing? When will you do it?',
        '你一直推迟的一件小小勇敢之事是什么？你何时去做？',
      ),
    },
  ],
  temperance: [
    {
      id: 'temperance-3',
      title: localized('Choosing Enough', '选择「足够」'),
      reading: localized(
        'Temperance is the art of enough — food, speech, screens, work, praise. Excess is not always vice of appetite; sometimes it is anxiety wearing the mask of more. Depth II asks you to notice one channel where “more” has stopped serving life, and to set a humane limit you can keep. Moderation frees attention for compassion and understanding; without it, even good aims become frantic.',
        '节制是「足够」的艺术 — 饮食、言语、屏幕、工作、赞美。过量不总是食欲之恶；有时是焦虑戴着「更多」的面具。第二层请你留意一条「更多」已不再服务生命的渠道，并设定一条你能守住的人性限度。适度为慈悲与理解腾出注意力；没有它，连好的目标也会变成慌乱。',
      ),
      question: {
        q: localized('What does temperance free, according to this lesson?', '根据本课，节制解放了什么？'),
        options: localized(
          ['The right to never enjoy anything', 'Attention for compassion and understanding', 'Permission to judge others’ habits', 'A reason to skip all pleasure'],
          ['永不享受任何事物的权利', '用于慈悲与理解的注意力', '评判他人习惯的许可', '跳过一切愉悦的理由'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Name one “more” you will gently limit this week, and what “enough” looks like.',
        '说出这周你将温和限制的一样「更多」，以及「足够」长什么样。',
      ),
    },
  ],
  gratitude: [
    {
      id: 'gratitude-3',
      title: localized('Gratitude Without Denial', '不否认的感恩'),
      reading: localized(
        'Gratitude is not pretending pain is absent. It is refusing to let difficulty erase every gift still present — breath, a friend, a skill, a chance to repair. Forced cheerfulness is not virtue; clear thanks beside honest sorrow is. Character grows when gratitude and courage sit together: you name what hurts and still bow to what sustains you.',
        '感恩不是假装痛苦不在。它是拒绝让困难抹去仍在的每一样礼物 — 呼吸、一位朋友、一项技能、一次修补的机会。强迫的快活不是德行；诚实的悲伤旁清晰的感谢才是。当感恩与勇敢同坐，品格生长：你说出何物伤痛，仍向支撑你的事物鞠躬。',
      ),
      question: {
        q: localized('What is gratitude without denial here?', '在这里，不否认的感恩是什么？'),
        options: localized(
          ['Pretending nothing hurts', 'Giving thanks beside honest sorrow', 'Listing only money received', 'Never feeling sad'],
          ['假装没有伤痛', '在诚实的悲伤旁仍致谢', '只列出收到的钱', '永不感到悲伤'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Name one difficulty and one gift you can hold at the same time today.',
        '说出今天你可以同时握住的一样困难与一样礼物。',
      ),
    },
  ],
  listening: [
    {
      id: 'listening-3',
      title: localized('Listening Across Difference', '跨越差异的倾听'),
      reading: localized(
        'Understanding’s second walk stretches listening past agreement. Can you stay present when someone’s story challenges your habits or politics? Listening across difference does not mean abandoning your convictions; it means delaying the rebuttal long enough to hear the human speaking. Many conflicts soften when each side can restate the other’s concern fairly. That skill is rare — and trainable.',
        '理解的第二程把倾听延伸到同意之外。当某人的故事挑战你的习惯或立场时，你还能临在吗？跨越差异的倾听不是放弃信念；而是把反驳推迟到足够听见说话的那个人。当每一方都能公正复述对方的关切时，许多冲突会软化。那技能稀少 — 也可训练。',
      ),
      question: {
        q: localized('What does listening across difference require here?', '在这里，跨越差异的倾听要求什么？'),
        options: localized(
          ['Abandoning all convictions', 'Delaying rebuttal long enough to hear the human', 'Winning the debate faster', 'Only listening to allies'],
          ['放弃一切信念', '把反驳推迟到足够听见那个人', '更快赢得辩论', '只听同盟者'],
        ),
        answer: 1,
      },
      reflection: localized(
        'With whom could you practise fair restatement this week — without trying to win?',
        '这周你可以与谁练习公正复述 — 而不试图赢？',
      ),
    },
  ],
  wonder: [
    {
      id: 'wonder-3',
      title: localized('Wonder After You Know', '知道之后的惊奇'),
      reading: localized(
        'Expertise can kill wonder. Depth II invites you to keep a beginner’s eye even in familiar places — a street you walk daily, a person you think you have “figured out,” a teaching you have read twice. Socrates’ wisdom began in not-knowing; Zhuangzi’s butterflies unsettle certainty. Wonder after knowledge is humility’s ally: it keeps understanding alive instead of sealed.',
        '专长可能杀死惊奇。第二层邀请你即使在熟悉之处仍保持初学者的眼睛 — 你每日走的街、你自以为「看透」的人、你读过两遍的教导。苏格拉底的智慧始于不知；庄子的蝴蝶动摇确定。知道之后的惊奇是谦逊的盟友：它使理解保持活泼，而非被封存。',
      ),
      question: {
        q: localized('What keeps understanding alive in this lesson?', '在本课中，什么使理解保持活泼？'),
        options: localized(
          ['Sealing what you know forever', 'Wonder after knowledge — a beginner’s eye in familiar places', 'Avoiding all expertise', 'Collecting more facts only'],
          ['永远封存已知', '知道之后的惊奇 — 在熟悉处仍用初学者的眼睛', '回避一切专长', '只收集更多事实'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Choose one familiar thing. What have you stopped noticing about it?',
        '选一样熟悉之物。你已停止注意它的什么？',
      ),
    },
  ],
  stillness: [
    {
      id: 'stillness-3',
      title: localized('Stillness That Serves Others', '服务他人的静定'),
      reading: localized(
        'Stillness is not only private retreat. A calm presence in a tense room can steady others; a pause before you answer can spare them your reactivity. Understanding’s virtues exist to serve life together. Practise a stillness that makes you more available — not more distant. When your quiet becomes a gift others can lean on, Depth II has reached its aim.',
        '静定不只是私下退隐。紧张房间里平静的临在可以稳住他人；回答前的停顿可以免去他们对你反应性的承受。理解的诸德是为共同生活服务。练习一种使你更可接近 — 而非更疏远 — 的静定。当你的安静成为他人可以倚靠的礼物，第二层便达到了它的目标。',
      ),
      question: {
        q: localized('What kind of stillness does this lesson aim for?', '本课旨在何种静定？'),
        options: localized(
          ['Stillness that makes you more distant', 'Stillness that makes you more available to others', 'Stillness that avoids all people', 'Stillness only on retreats'],
          ['使你更疏远的静定', '使你对他人更可接近的静定', '避开所有人的静定', '仅在闭关中的静定'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Where could your calm presence help someone else this week?',
        '这周你的平静临在可能在何处帮助别人？',
      ),
    },
  ],
  'compassion-mastery': [
    {
      id: 'compassion-mastery-3',
      title: localized('The Difficult Person', '难相处的人'),
      reading: localized(
        'Living ren is tested most on the person who drains you. Depth III does not demand that you endure abuse; it asks whether you can keep a thread of humanity — a boundary with dignity, a refusal to dehumanise, perhaps a limited kindness that costs little and harms none. Confucian ren and Buddhist compassion both warn against selective warmth that only loves the easy. Mastery is proportion: protect yourself, and still refuse contempt.',
        '仁的践行，最常在耗尽你的人身上受试。第三层不要求你忍受虐待；它问你能否保有一丝人性 — 有尊严的界限、拒绝非人化，或许是代价很小且不伤害任何人的有限善意。儒家的仁与佛教的慈悲都警告只爱容易之人的选择性温暖。圆满是分寸：保护自己，仍拒绝鄙视。',
      ),
      question: {
        q: localized('What does mastery ask toward a difficult person here?', '在这里，圆满对难相处的人要求什么？'),
        options: localized(
          ['Endure all abuse', 'Keep humanity — boundaries with dignity, without contempt', 'Cut all contact forever as the only option', 'Pretend you feel warmth'],
          ['忍受一切虐待', '保有人性 — 有尊严的界限，没有鄙视', '永远断绝作为唯一选项', '假装感到温暖'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Toward one difficult person, what boundary and what minimal respect can you hold together?',
        '对一个难相处的人，你能同时守住怎样的界限与怎样的最低尊重？',
      ),
    },
  ],
  'character-mastery': [
    {
      id: 'character-mastery-3',
      title: localized('Repair After Failure', '失败之后的修补'),
      reading: localized(
        'The junzi path includes falling short. Integrity after failure means naming the miss, repairing what you can, and returning to practice without theatrical self-hatred. Perseverance, humility, and courage meet here. Depth III is not a spotless record; it is a reliable pattern of return. Communities trust people who mend, not people who never err in public.',
        '君子之路包括未达标准。失败之后的正直，意味着说出失误、尽力修补，并回到练习，而不作戏剧化的自我憎恨。恒心、谦逊与勇敢在此相遇。第三层不是无瑕记录；它是可靠的归回模式。共同体信任会修补的人，而非从不在公开场合犯错的人。',
      ),
      question: {
        q: localized('What is integrity after failure in this lesson?', '在本课中，失败之后的正直是什么？'),
        options: localized(
          ['Hiding the miss forever', 'Naming it, repairing what you can, and returning to practice', 'Dramatic self-hatred', 'Blaming everyone else'],
          ['永远隐瞒失误', '说出它、尽力修补，并回到练习', '戏剧化的自我憎恨', '责怪所有其他人'],
        ),
        answer: 1,
      },
      reflection: localized(
        'Is there a small repair you still owe someone? What is the first sentence you will say?',
        '你是否仍欠某人一次小小的修补？你将说出的第一句是什么？',
      ),
    },
  ],
  'understanding-mastery': [
    {
      id: 'understanding-mastery-3',
      title: localized('Seeing That Serves', '服务的看见'),
      reading: localized(
        'Clear seeing ends in service, not superiority. Perspective, listening, and stillness should make you a better neighbour, colleague, and citizen — quicker to notice suffering, slower to spread confusion. If your third walk only sharpens private insight, turn it outward: one conversation, one decision, one institution you can influence a little. Understanding that never leaves the mind has not finished the path.',
        '清明看见止于服务，而非优越。视角、倾听与静定应使你成为更好的邻人、同事与公民 — 更快察觉苦难，更慢传播混乱。若你的第三程只锐化私下洞见，就把它转向外：一次对话、一个决定、一个你能稍加影响的制度。从未离开内心的理解，尚未走完这条路。',
      ),
      question: {
        q: localized('When has clear seeing not finished the path here?', '在这里，清明看见何时尚未走完路？'),
        options: localized(
          ['When it serves neighbours', 'When it never leaves the mind', 'When it includes stillness', 'When it asks questions'],
          ['当它服务邻人时', '当它从未离开内心时', '当它包含静定时', '当它提出问题时'],
        ),
        answer: 1,
      },
      reflection: localized(
        'What one outward act will your clearer seeing take in the next three days?',
        '在接下来三天，你更清明的看见将采取哪一个外向行动？',
      ),
    },
  ],
};

/** New Depth II virtues — one per branch — unlocked with the rest of depth 2. */
export const EXTRA_DEPTH_TOPICS: Topic[] = [
  {
    id: 'solidarity',
    name: localized('Solidarity', '休戚与共'),
    accent: '共',
    emoji: '🤝',
    branch: 'compassion',
    parentId: 'compassion',
    depth: 2,
    intro: localized(
      'Standing with others in their struggle — not only feeling for them.',
      '在他人的挣扎中与之同在 — 不只是为他们感到。',
    ),
    cardId: 'card-solidarity',
    lessons: [
      {
        id: 'solidarity-1',
        title: localized('Beside, Not Above', '在身旁，不在上方'),
        reading: localized(
          'Solidarity differs from pity. Pity looks down; solidarity stands beside and shares risk, time, or voice. Labour movements, mutual aid, and the Confucian sense of a shared moral world all point here: another’s burden is not entertainment or a chance to feel superior. Depth II compassion asks whether you will show up when it is inconvenient — and whether you will listen to those affected before deciding how to “help.”',
          '休戚与共有别于怜悯。怜悯向下看；休戚与共站在身旁，分担风险、时间或声音。劳工运动、互助，以及儒家共享道德世界的意识都指向这里：他人的重负不是娱乐，也不是感到优越的机会。第二层的慈悲问：不方便时你是否仍会出现 — 以及在决定如何「帮助」之前，你是否先听受影响者怎么说。',
        ),
        question: {
          q: localized('How does solidarity differ from pity here?', '在这里，休戚与共如何有别于怜悯？'),
          options: localized(
            ['It looks down with more emotion', 'It stands beside and shares risk, time, or voice', 'It never helps anyone', 'It only donates money'],
            ['它带着更多情绪向下看', '它站在身旁，分担风险、时间或声音', '它从不帮助任何人', '它只捐钱'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Whose struggle could you stand beside this month — and what would “beside” look like?',
          '这个月你可以站在谁的挣扎身旁 — 「身旁」会是什么样子？',
        ),
      },
      {
        id: 'solidarity-2',
        title: localized('Shared Strength', '共享的力量'),
        reading: localized(
          'Solidarity multiplies what one person cannot carry alone. It can be as simple as covering a shift, joining a neighbour’s errand, or speaking up so someone is not isolated. The Liyun vision of care beyond one’s own family begins in such acts. Beware performative solidarity that vanishes when cameras leave; prefer quiet consistency. Your second walk of compassion is incomplete without at least one bond of mutual support.',
          '休戚与共使一个人无法独自承担的事得以倍增。它可以简单如顶一次班、陪邻人跑腿，或出声使某人不再孤立。《礼运》超越自家的关怀，始于这类行动。提防镜头离开就消失的表演式团结；宁可安静的持续。没有至少一条互助的纽带，慈悲的第二程就不完整。',
        ),
        question: {
          q: localized('What should you prefer over performative solidarity?', '你应宁可选择什么，而非表演式团结？'),
          options: localized(
            ['Louder posts', 'Quiet consistency', 'Helping only strangers online', 'Waiting for perfect causes'],
            ['更响的帖子', '安静的持续', '只在网上帮助陌生人', '等待完美的事业'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Name one mutual-support bond you will strengthen this week.',
          '说出这周你将加强的一条互助纽带。',
        ),
      },
    ],
  },
  {
    id: 'perseverance',
    name: localized('Perseverance', '恒心'),
    accent: '恒',
    emoji: '🏔️',
    branch: 'character',
    parentId: 'character',
    depth: 2,
    intro: localized(
      'Returning after delay and difficulty — character that outlasts mood.',
      '在拖延与困难之后仍归回 — 比情绪更耐久的品格。',
    ),
    cardId: 'card-perseverance',
    lessons: [
      {
        id: 'perseverance-1',
        title: localized('The Long Walk', '漫长的步行'),
        reading: localized(
          'Perseverance is character stretched across time. Confucius praised the one who keeps going; Buddhist practice speaks of viriya — energy that does not quit at the first boredom. Depth II is not intensity for a week; it is returning after you skipped a day, failed a vow, or lost enthusiasm. Mood starts many paths; perseverance finishes the worthy ones.',
          '恒心是横跨时间的品格。孔子称赞坚持前行的人；佛教修行谈精进 — 不在第一次无聊时放弃的能量。第二层不是一周的强度；而是在你跳过一天、失信一愿或失去热情之后仍归回。情绪开启许多路；恒心完成值得的那些。',
        ),
        question: {
          q: localized('What finishes worthy paths in this lesson?', '在本课中，什么完成值得的路？'),
          options: localized(
            ['Mood alone', 'Perseverance — returning after delay and failure', 'Never resting', 'Public praise'],
            ['仅靠情绪', '恒心 — 在拖延与失败之后仍归回', '永不休息', '公开赞美'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Which worthy practice have you dropped? What would a gentle return look like?',
          '你放下了哪项值得的练习？温和的归回会是什么样子？',
        ),
      },
      {
        id: 'perseverance-2',
        title: localized('Steady, Not Stubborn', '稳健，而非固执'),
        reading: localized(
          'True perseverance is not stubbornness. Stubbornness clings to a failing plan; perseverance keeps the aim and adapts the means — with humility and temperance. The junzi adjusts without abandoning the good. When pride forbids changing course, what looks like grit is often fear of admitting error. Depth II character holds both: keep walking, and keep learning how.',
          '真正的恒心不是固执。固执紧抓失败的计划；恒心保持目标并调整手段 — 带着谦逊与节制。君子调整而不放弃善。当骄傲禁止改道时，看起来像毅力的，往往是害怕承认错误。第二层品格二者兼持：继续走，并继续学习如何走。',
        ),
        question: {
          q: localized('How does perseverance differ from stubbornness here?', '在这里，恒心如何有别于固执？'),
          options: localized(
            ['It never changes plans', 'It keeps the aim and adapts the means', 'It quits at the first obstacle', 'It ignores all advice'],
            ['它从不改变计划', '它保持目标并调整手段', '它在第一个障碍处放弃', '它忽略一切建议'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Where might you be stubborn rather than persevering? What aim stays — and what means should change?',
          '你何处可能是固执而非恒心？哪个目标留下 — 哪些手段应改变？',
        ),
      },
    ],
  },
  {
    id: 'perspective',
    name: localized('Perspective', '视角'),
    accent: '视',
    emoji: '🔭',
    branch: 'understanding',
    parentId: 'understanding',
    depth: 2,
    intro: localized(
      'Holding more than one angle — so judgment grows slower and fairer.',
      '持守不止一个角度 — 好判断更慢、更公允。',
    ),
    cardId: 'card-perspective',
    lessons: [
      {
        id: 'perspective-1',
        title: localized('More Than One Angle', '不止一个角度'),
        reading: localized(
          'Perspective is the discipline of asking what this situation looks like from another seat — the colleague you resent, the child you scold, the stranger in the news. Understanding’s second walk uses imagination in service of fairness, not relativism that erases truth. Many wisdom traditions slow judgment until more angles are seen. Depth II trains that pause.',
          '视角是一种修炼：问这件事从另一个座位看是什么样子 — 你怨恨的同事、你责骂的孩子、新闻里的陌生人。理解的第二程用想像力服务公允，而非抹去真相的相对主义。许多智慧传统在看到更多角度之前放慢判断。第二层训练那一停顿。',
        ),
        question: {
          q: localized('What is perspective for in this lesson?', '在本课中，视角为了什么？'),
          options: localized(
            ['Erasing all truth', 'Fairness — seeing from another seat before judging', 'Winning arguments', 'Avoiding decisions forever'],
            ['抹去一切真相', '公允 — 在判断前从另一个座位看见', '赢得争论', '永远回避决定'],
          ),
          answer: 1,
        },
        reflection: localized(
          'Pick a current conflict. What might the other seat see that you have ignored?',
          '选一个当前的冲突。另一个座位可能看见你忽略了什么？',
        ),
      },
      {
        id: 'perspective-2',
        title: localized('Zoom Out, Then In', '先拉远，再拉近'),
        reading: localized(
          'Useful perspective toggles scale: the long view of a year, then the concrete next hour; the whole community, then the one person in front of you. Panic lives in a zoom stuck too close; coldness lives in a zoom stuck too far. Clear understanding moves between them. Practise once daily: name the wide frame, then the next kind act inside it.',
          '有用的视角切换尺度：一年的长远，然后下一小时的具体；整个共同体，然后眼前的那一个人。恐慌活在卡得太近的焦距里；冷漠活在卡得太远的焦距里。清明的理解在两者之间移动。每日练习一次：说出宽阔的框架，再说出框架内的下一个善行。',
        ),
        question: {
          q: localized('What does useful perspective toggle?', '有用的视角切换什么？'),
          options: localized(
            ['Only the distant past', 'Scale — wide frame and concrete next act', 'Other people’s secrets', 'Your social media feed'],
            ['仅遥远的过去', '尺度 — 宽阔框架与具体的下一步', '他人的秘密', '你的社群媒体动态'],
          ),
          answer: 1,
        },
        reflection: localized(
          'For today’s stress: what is the wide frame, and what is the next kind act?',
          '对今日的压力：宽阔框架是什么，下一个善行是什么？',
        ),
      },
    ],
  },
];

export function mergeDepthExtras(base: Topic[]): Topic[] {
  const withLessons = base.map((t) => {
    const extra = EXTRA_LESSONS_BY_TOPIC[t.id];
    if (!extra) return t;
    return { ...t, lessons: [...t.lessons, ...extra] };
  });
  // Insert new depth-2 topics before depth-3 mastery topics.
  const depth3Start = withLessons.findIndex((t) => t.depth === 3);
  if (depth3Start < 0) return [...withLessons, ...EXTRA_DEPTH_TOPICS];
  return [
    ...withLessons.slice(0, depth3Start),
    ...EXTRA_DEPTH_TOPICS,
    ...withLessons.slice(depth3Start),
  ];
}

/** Updated Depth III intros that name the expanded second-walk virtues. */
export const MASTERY_INTRO_OVERRIDES: Record<string, Topic['intro']> = {
  'compassion-mastery': localized(
    'Depth III: weave kindness, forgiveness, service, generosity, gentleness, hospitality, and solidarity into one way of being.',
    '第三层：把仁慈、宽恕、服务、慷慨、温柔、好客与休戚与共织成一种存在方式。',
  ),
  'character-mastery': localized(
    'Depth III: humility, patience, integrity, courage, temperance, gratitude, and perseverance as one character.',
    '第三层：谦逊、耐心、正直、勇敢、节制、感恩与恒心，合为一种品格。',
  ),
  'understanding-mastery': localized(
    'Depth III: reflection, discernment, awareness, listening, wonder, stillness, and perspective as one clear mind.',
    '第三层：反思、明辨、觉察、倾听、惊奇、静定与视角，合为一颗清明的心。',
  ),
};
