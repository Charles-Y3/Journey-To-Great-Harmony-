import { localized } from '../i18n/types';
import type { TurningPoint } from './turningPoints';

/** Additional Still Waters stories (v1.2+) — merged into TURNING_POINTS. */
export const EXTRA_TURNING_POINTS: TurningPoint[] = [
  {
    id: 'good-samaritan',
    emoji: '🛣️',
    tradition: localized('Gospel of Luke 10:25–37', '《路加福音》10:25–37'),
    setting: localized(
      'A man lay beaten on the road from Jerusalem to Jericho. A priest passed by on the other side. A Levite did the same. Then a Samaritan — of a people the wounded man’s community despised — came upon him.',
      '一个人被打伤，躺在耶路撒冷通往耶利哥的路上。祭司从另一边过去了；利未人也一样。后来，一个被伤者同胞所鄙视的撒玛利亚人走到了他跟前。',
    ),
    resolution: localized(
      'The Samaritan bound his wounds, set him on his own animal, brought him to an inn, and paid for his care — asking nothing in return.',
      '撒玛利亚人为他包扎伤口，扶他上自己的牲口，带到客店照料，并付了费用 — 不求回报。',
    ),
    reflectionQuestion: localized(
      'Whom have you been trained to walk past — and what would stopping cost you?',
      '你被训练成会从谁身边走过 — 停下来会让你付出什么？',
    ),
  },
  {
    id: 'prodigal-return',
    emoji: '🏠',
    tradition: localized('Gospel of Luke 15:11–32', '《路加福音》15:11–32'),
    setting: localized(
      'A younger son demanded his inheritance early, wasted it far from home, and found himself starving among pigs. He decided to return and ask only to be hired as a servant.',
      '小儿子早早要了家产，在远方挥霍殆尽，沦落到与猪同饿。他决定回家，只求被雇为仆人。',
    ),
    resolution: localized(
      'While he was still far off, his father ran to him, embraced him, and called for a feast — before any speech of worthiness was finished.',
      '他还在远处，父亲就跑去拥抱他，吩咐摆宴 — 不等「我配不配」的话讲完。',
    ),
    reflectionQuestion: localized(
      'Where might love already be coming toward you — farther along the road than shame lets you walk?',
      '爱或许已在路上向你走来 — 比羞愧允许你走到的地方更远。那是哪里？',
    ),
  },
  {
    id: 'widows-mite',
    emoji: '🪙',
    tradition: localized('Gospel of Mark 12:41–44', '《马可福音》12:41–44'),
    setting: localized(
      'Jesus watched the rich put large sums into the temple treasury. Then a poor widow came and put in two small coins.',
      '耶稣看见财主把大笔钱投入圣殿银库。后来一位穷寡妇前来，投了两个小钱。',
    ),
    resolution: localized(
      'He told his disciples she had given more than all the others — because they gave from abundance, and she gave all she had to live on.',
      '他对门徒说，她投的比众人都多 — 因为他们是从富余中拿出来，她却把养生的都投上了。',
    ),
    reflectionQuestion: localized(
      'What would “all you have to live on” look like if it were not money?',
      '若不是金钱，「养生的全部」会是什么样子？',
    ),
  },
  {
    id: 'mencius-child-well',
    emoji: '👧',
    tradition: localized('Mencius 2A6', '《孟子·公孙丑上》'),
    setting: localized(
      'Mencius asked his listeners to imagine suddenly seeing a child about to fall into a well — and to notice what rises in the heart before any calculation of gain.',
      '孟子请听众想像：忽然看见一个小孩将要掉进井里 — 并留意在任何算计利益之前，心里升起的是什么。',
    ),
    resolution: localized(
      'He said everyone would feel alarm and compassion — not to gain favour with the parents, not for reputation, not because they dislike the child’s cry, but from a mind that cannot bear the suffering of others.',
      '他说人人都会惊骇恻隐 — 不是为讨好孩子的父母，不是为名声，也不是厌恶孩子的哭声，而是出自不忍人之心。',
    ),
    reflectionQuestion: localized(
      'When did you last feel that first alarm — before your mind named a reason?',
      '你上一次感到那最初的惊骇，是在心智说出理由之前吗？何时？',
    ),
  },
  {
    id: 'mencius-fish-bear',
    emoji: '🐟',
    tradition: localized('Mencius 6A10', '《孟子·告子上》'),
    setting: localized(
      'Mencius said: I like fish, and I also like bear’s paw. If I cannot have both, I will give up fish and take bear’s paw.',
      '孟子说：鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。',
    ),
    resolution: localized(
      'Likewise I like life, and I like righteousness. If I cannot keep both, I will give up life and choose righteousness.',
      '生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。',
    ),
    reflectionQuestion: localized(
      'What lesser good are you clinging to that quietly costs you the greater one?',
      '你紧抓着的次要之好，正悄悄让你失去哪件更重要的？',
    ),
  },
  {
    id: 'laozi-water',
    emoji: '💧',
    tradition: localized('Daodejing, Chapter 8', '《道德经》第八章'),
    setting: localized(
      'A student asked why the soft never seems to win. The teacher pointed to a stream cutting through rock: water benefits the ten thousand things and does not contend; it dwells in places others disdain.',
      '学生问为何柔弱似乎从不取胜。老师指向一条切开岩石的溪流：水善利万物而不争，处众人之所恶。',
    ),
    resolution: localized(
      'Therefore it is close to the Way — soft, low, and useful precisely where force refuses to go.',
      '故几于道 — 柔、下，并在刚强不肯去的地方有用。',
    ),
    reflectionQuestion: localized(
      'Where could softness reach farther this week than insistence?',
      '这周，柔软可能比坚持更能抵达何处？',
    ),
  },
  {
    id: 'socrates-hemlock',
    emoji: '☠️',
    tradition: localized('Plato — Crito & Phaedo', '柏拉图 — 《克里托》《斐多》'),
    setting: localized(
      'Socrates’ friends arranged an escape from prison before his death sentence. Crito urged him to flee for his children’s sake and for justice wrongly applied.',
      '苏格拉底的朋友在死刑执行前安排越狱。克里托劝他逃走，为了孩子，也为了被错用的正义。',
    ),
    resolution: localized(
      'Socrates refused. He would not answer injustice with a breach of the laws he had lived under — and drank the hemlock as scheduled.',
      '苏格拉底拒绝了。他不愿以违背自己一向生活于其下的法律，来回应不义 — 并按时饮下毒堇汁。',
    ),
    reflectionQuestion: localized(
      'When does escaping a wrong become another wrong — and when does it not?',
      '何时逃离错误会变成另一种错误 — 何时又不会？',
    ),
  },
  {
    id: 'plato-cave',
    emoji: '🕳️',
    tradition: localized('Plato — Republic, Book VII', '柏拉图 — 《理想国》第七卷'),
    setting: localized(
      'Prisoners chained in a cave saw only shadows on the wall and took them for the whole of reality. One was freed and dragged upward toward the sun.',
      '洞穴中被缚的囚徒只见墙上的影子，并以其为全部真实。一人被松开，被拖向阳光。',
    ),
    resolution: localized(
      'At first the light hurt. Later, returning to tell the others, he was mocked — for their eyes were still trained only on the wall.',
      '起初光令人疼痛。后来他回去告诉同伴，却遭嘲笑 — 因为他们的眼睛仍只习惯墙壁。',
    ),
    reflectionQuestion: localized(
      'What shadow have you mistaken for the thing itself?',
      '你把哪一片影子误认成了事物本身？',
    ),
  },
  {
    id: 'rumi-guest-house',
    emoji: '🚪',
    tradition: localized('Rumi — The Guest House', '鲁米 — 《客栈》'),
    setting: localized(
      'Rumi imagined the human heart as a guest house. Every morning a new arrival knocks — joy, meanness, a dark thought.',
      '鲁米把人心想成客栈。每日清晨都有新客敲门 — 喜悦、卑劣、阴暗的念头。',
    ),
    resolution: localized(
      'He urged: welcome them all. Even if a crowd of sorrows sweeps your house empty, treat each guest honourably — they may be clearing you for some new delight.',
      '他劝道：一律欢迎。即便忧愁之众扫空你的屋子，仍要礼遇每位客人 — 他们或许正为某种新的喜悦腾出空间。',
    ),
    reflectionQuestion: localized(
      'Which inner guest have you been refusing at the door?',
      '你一直拒绝在门外的，是哪一位内在的客人？',
    ),
  },
  {
    id: 'nasrudin-lost-key',
    emoji: '🔑',
    tradition: localized('Sufi teaching story — Nasrudin', '苏菲教喻 — 纳斯鲁丁'),
    setting: localized(
      'Neighbours found Nasrudin on his knees under a streetlamp, searching. “I lost my key,” he said. “Where did you lose it?” “In my house.” “Then why search here?”',
      '邻居看见纳斯鲁丁跪在路灯下寻找。「我钥匙丢了。」「在哪儿丢的？」「在家里。」「那为何在这里找？」',
    ),
    resolution: localized(
      '“Because there is more light here,” he answered.',
      '他答：「因为这里更亮。」',
    ),
    reflectionQuestion: localized(
      'Where are you searching because it is easier to look — not because the key is there?',
      '你在何处寻找，只因那里更好找 — 而非钥匙在那里？',
    ),
  },
  {
    id: 'hyakujo-fox',
    emoji: '🦊',
    tradition: localized('Zen koan — The Gateless Gate', '禅宗公案 — 《无门关》'),
    setting: localized(
      'An old man told Hyakujo he had once answered a monk that an enlightened person does not fall under cause and effect — and for that answer he had been reborn as a wild fox for five hundred lives.',
      '一老人告诉百丈：他曾答僧人说悟者「不落因果」，因此堕为野狐五百生。',
    ),
    resolution: localized(
      'Hyakujo said the enlightened one does not ignore cause and effect. At those words the old man was released — and asked for a monk’s funeral for the fox body.',
      '百丈说：悟者不昧因果。言下老人得脱 — 并求以僧礼葬其狐身。',
    ),
    reflectionQuestion: localized(
      'Where might “I am beyond the rules” still be a rule you are caught in?',
      '何处「我已超越规则」本身，仍是你陷在其中的规则？',
    ),
  },
  {
    id: 'empty-boat',
    emoji: '🛶',
    tradition: localized('Zhuangzi — The Empty Boat', '《庄子》— 空船'),
    setting: localized(
      'A man crossing a river in a boat saw another boat collide with his. He began to shout angrily — until he saw the other boat was empty.',
      '人乘船渡河，见另一船撞来，便怒声喝骂 — 直到看见那船是空的。',
    ),
    resolution: localized(
      'His anger vanished. Zhuangzi asked: if you can empty your own boat as you wander the world, who can harm you?',
      '怒气消了。庄子问：若你游于世而能虚己，谁能害你？',
    ),
    reflectionQuestion: localized(
      'What would change if the person who bumped you today were, in some sense, an empty boat?',
      '若今天撞到你的人，在某种意义上是空船 — 什么会改变？',
    ),
  },
  {
    id: 'confucius-river',
    emoji: '🌊',
    tradition: localized('Analects 9.17', '《论语·子罕》'),
    setting: localized(
      'Standing by a river with his disciples, Confucius watched the current and said: “It passes on just like this — not ceasing day or night.”',
      '孔子与弟子立于川上，望着流水说：「逝者如斯夫，不舍昼夜。」',
    ),
    resolution: localized(
      'He offered no further commentary — only the image of time and life flowing without pause.',
      '他没有再多解释 — 只留下时间与生命昼夜不息流去的意象。',
    ),
    reflectionQuestion: localized(
      'What are you gripping as if the river would wait?',
      '你紧抓着什么，仿佛河水会等待？',
    ),
  },
  {
    id: 'analects-three-reflections',
    emoji: '🌙',
    tradition: localized('Analects 1.4', '《论语·学而》'),
    setting: localized(
      'Zengzi told his companions he examined himself every day. Before sleep he asked three questions of his own conduct:',
      '曾子对同伴说，他每日自省。入睡前，他以三个问题检视自己的言行：',
    ),
    resolution: localized(
      'In acting for others, have I been disloyal? In dealings with friends, have I been untrustworthy? Have I failed to practise what was transmitted to me?',
      '为人谋而不忠乎？与朋友交而不信乎？传不习乎？',
    ),
    reflectionQuestion: localized(
      'Which of the three would sting most if you asked it honestly tonight?',
      '今晚若诚实自问，三者中哪一条最刺痛？',
    ),
  },
  {
    id: 'buddha-mustard-seed',
    emoji: '🌾',
    tradition: localized('Buddhist tale — Kisa Gotami', '佛教故事 — 季沙瞿昙弥'),
    setting: localized(
      'A mother whose child had died came to the Buddha begging for medicine to bring him back. He told her to fetch a mustard seed from a house that had never known death.',
      '丧子的母亲求佛陀赐药使孩子复生。佛陀让她去从未死过人的人家讨一粒芥子。',
    ),
    resolution: localized(
      'She went from door to door. Every house had known death. She returned without the seed — and began to understand.',
      '她挨家挨户去问。家家都死过人。她空手而回 — 并开始明白。',
    ),
    reflectionQuestion: localized(
      'What private grief have you treated as if no one else had ever carried one?',
      '哪一份私密的哀痛，你曾当作仿佛无人也曾背负过？',
    ),
  },
  {
    id: 'two-wolves',
    emoji: '🐺',
    tradition: localized('Cherokee teaching story (popular telling)', '切罗基教喻（通行叙述）'),
    setting: localized(
      'An elder told a grandchild: inside me two wolves fight — one is anger, envy, greed; the other is kindness, empathy, hope.',
      '一位长者对孙子说：我内心有两匹狼在争斗 — 一匹是愤怒、嫉妒、贪婪；另一匹是仁慈、同理、希望。',
    ),
    resolution: localized(
      'The child asked which wolf wins. The elder said: the one you feed.',
      '孩子问哪匹会赢。长者说：你喂养的那一匹。',
    ),
    reflectionQuestion: localized(
      'Which wolf did you feed yesterday — in a small, ordinary moment?',
      '昨天你在一个微小、平常的时刻喂了哪一匹狼？',
    ),
  },
  {
    id: 'king-letter-birmingham',
    emoji: '✉️',
    tradition: localized('Martin Luther King Jr. — Letter from Birmingham Jail', '马丁·路德·金 — 《伯明翰狱中来信》'),
    setting: localized(
      'Clergymen called King’s protests “unwise and untimely.” From jail he answered the charge of impatience.',
      '神职人员称金的抗议「不智且不合时宜」。他在狱中回应「不耐烦」的指责。',
    ),
    resolution: localized(
      'He wrote that “wait” nearly always means “never” for those who have waited — and that justice too long delayed is justice denied.',
      '他写道：对已经等待的人而言，「等一等」几乎总是意味着「永远不要」 — 而延迟太久的正义，即是否认正义。',
    ),
    reflectionQuestion: localized(
      'Where has “not yet” become a polite form of “no” in your life?',
      '在你的生活中，「还不是时候」在何处已变成客气的「不」？',
    ),
  },
  {
    id: 'gandhi-salt',
    emoji: '🧂',
    tradition: localized('Salt March, 1930', '食盐进军，1930'),
    setting: localized(
      'The colonial salt tax made it illegal for Indians to collect salt from their own shores. Gandhi proposed a long walk to the sea to take salt openly.',
      '殖民盐税使印度人不得从自己的海岸取盐。甘地提议长途步行至海边，公开取盐。',
    ),
    resolution: localized(
      'He and thousands walked. At the shore he lifted a lump of salty mud — a small act that made an unjust law visible to the world.',
      '他与数千人同行。在海边他拾起一块咸泥 — 一个使不义之法被世界看见的微小行动。',
    ),
    reflectionQuestion: localized(
      'What small, public truth-telling is available to you that does not require a throne?',
      '你能做的、不需要王座的小小公开真话是什么？',
    ),
  },
  {
    id: 'kant-starry-sky',
    emoji: '🌌',
    tradition: localized('Kant — Critique of Practical Reason', '康德 — 《实践理性批判》'),
    setting: localized(
      'Kant paused under the night sky and wrote that two things fill the mind with ever new admiration and awe:',
      '康德在夜空下停步，写道：有两样东西使心灵充满常新的赞叹与敬畏：',
    ),
    resolution: localized(
      'The starry sky above him, and the moral law within him — one pointing outward to a vast order, the other inward to a duty that does not shrink because no one is watching.',
      '我头上的星空，与我心中的道德法则 — 一个指向外在的浩瀚秩序；一个指向内在的义务，并不因无人看见而缩小。',
    ),
    reflectionQuestion: localized(
      'When no one is watching, which law do you still consult?',
      '无人注视时，你仍请教的是哪一条法则？',
    ),
  },
  {
    id: 'epictetus-two-handles',
    emoji: '✊',
    tradition: localized('Epictetus — Enchiridion', '爱比克泰德 — 《手册》'),
    setting: localized(
      'Epictetus said everything has two handles: one by which it can be carried, and one by which it cannot.',
      '爱比克泰德说：凡事都有两个把手：一个拿得动，一个拿不动。',
    ),
    resolution: localized(
      'If your brother wrongs you, do not take it by the handle of the wrong — take it by the handle that he is your brother, and you will carry it.',
      '若兄弟对你不公，不要抓「不公」那个把手 — 要抓「他是你的兄弟」那个，你就能拿得动。',
    ),
    reflectionQuestion: localized(
      'What are you currently carrying by the wrong handle?',
      '你此刻正用错误的那个把手抓着什么？',
    ),
  },
  {
    id: 'marcus-obstacle',
    emoji: '🔥',
    tradition: localized('Marcus Aurelius — Meditations', '马可·奥勒留 — 《沉思录》'),
    setting: localized(
      'Facing yet another setback, Marcus wrote that the mind can turn every obstacle into material for practice — as fire turns what is thrown into it into flame and brightness.',
      '面对又一次挫败，马可写道：心灵可以把每个障碍化为练习的材料 — 如火把投进来的东西化为光焰。',
    ),
    resolution: localized(
      'What stands in the way becomes the way.',
      '挡在路上的，成为路本身。',
    ),
    reflectionQuestion: localized(
      'What obstacle in front of you could be treated as training rather than insult?',
      '眼前的哪个障碍，可以当作训练而非侮辱？',
    ),
  },
  {
    id: 'hillel-rooftop',
    emoji: '💬',
    tradition: localized('Pirkei Avot / Talmudic tradition', '《先贤篇》/ 塔木德传统'),
    setting: localized(
      'A student asked Hillel for the whole of the teaching in brief. Hillel answered with three questions held in one breath:',
      '学生请希勒尔把全部教导简要说出。希勒尔以一口气里的三个问题作答：',
    ),
    resolution: localized(
      'If I am not for myself, who will be for me? If I am only for myself, what am I? And if not now, when?',
      '我不为己，谁人为我？若只为己，我是什么？若非此时，更待何时？',
    ),
    reflectionQuestion: localized(
      'Which of Hillel’s three questions are you dodging this week?',
      '希勒尔的三个问题中，你这周在躲避哪一个？',
    ),
  },
  {
    id: 'rabbi-two-pockets',
    emoji: '📄',
    tradition: localized('Hasidic teaching — Simcha Bunim', '哈西德教喻 — 辛查·布尼姆'),
    setting: localized(
      'Rabbi Simcha Bunim said everyone should carry two slips of paper, one in each pocket.',
      '拉比辛查·布尼姆说：人人应随身带两张字条，各放一袋。',
    ),
    resolution: localized(
      'One says: For my sake the world was created. The other: I am but dust and ashes. Take out each when the moment needs it.',
      '一张写：世界为我而造。另一张写：我不过是尘土与灰烬。时刻需要哪张，就取出哪张。',
    ),
    reflectionQuestion: localized(
      'Which pocket do you reach for too often — and which too rarely?',
      '你太常伸向哪一只口袋 — 又太少伸向哪一只？',
    ),
  },
  {
    id: 'aesop-north-wind',
    emoji: '🌬️',
    tradition: localized('Aesop — The North Wind and the Sun', '伊索 — 《北风与太阳》'),
    setting: localized(
      'The North Wind and the Sun wagered which could make a traveller remove his cloak. The Wind blew with all its force.',
      '北风与太阳打赌，看谁能让旅人脱掉外衣。北风竭力吹刮。',
    ),
    resolution: localized(
      'The traveller only wrapped tighter. Then the Sun shone warmly, and the man took the cloak off himself.',
      '旅人反而裹得更紧。太阳温暖地照着，旅人自己脱下了外衣。',
    ),
    reflectionQuestion: localized(
      'Where are you still the North Wind with someone you wish would change?',
      '对你希望其改变的人，你仍在何处做北风？',
    ),
  },
  {
    id: 'chinese-broken-mirror',
    emoji: '🪞',
    tradition: localized('Chinese proverb — broken mirror', '中国谚语 — 破镜难圆'),
    setting: localized(
      'When a marriage or a deep trust had shattered beyond repair, people said: a broken mirror cannot be made round again.',
      '当婚姻或深切的信任碎到难以修补，人们说：破镜难圆。',
    ),
    resolution: localized(
      'The proverb does not promise a perfect join. It names the loss honestly — some breaks change the shape forever.',
      '这句谚语并不承诺完美复原。它诚实地说出损失 — 有些破裂，会永远改变形状。',
    ),
    reflectionQuestion: localized(
      'What break are you still pretending never happened?',
      '你仍在假装从未发生的裂痕是哪一道？',
    ),
  },
  {
    id: 'bodhidharma-wall',
    emoji: '🧱',
    tradition: localized('Chan tradition — Bodhidharma', '禅宗传统 — 菩提达摩'),
    setting: localized(
      'Bodhidharma is said to have sat facing a wall for years at Shaolin, refusing to teach those who came only for novelty.',
      '据说菩提达摩在少林面壁九年，拒绝只为猎奇而来的人。',
    ),
    resolution: localized(
      'Huike stood in the snow and would not leave. Only then did the wall become a door.',
      '慧可立于雪中不去。于是墙才成为门。',
    ),
    reflectionQuestion: localized(
      'What teaching are you approaching as a tourist — and what would sincerity cost?',
      '你把哪一门教导当作观光 — 真诚又会代价什么？',
    ),
  },
  {
    id: 'joshua-bell-metro',
    emoji: '🎻',
    tradition: localized('Washington Post experiment, 2007', '《华盛顿邮报》实验，2007'),
    setting: localized(
      'A world-famous violinist played Bach in a subway station at rush hour, in ordinary clothes, with an open case for tips.',
      '一位世界著名小提琴家在高峰时段的地铁站，穿着便服演奏巴赫，琴盒开着收小费。',
    ),
    resolution: localized(
      'Almost everyone hurried past. A few children stopped. Beauty was present; recognition was scarce.',
      '几乎人人匆匆走过。几个孩子停了下来。美在场；认出它的人很少。',
    ),
    reflectionQuestion: localized(
      'What excellence might you be walking past because it lacks the right stage?',
      '何种卓越你可能正走过，只因它缺少「正确」的舞台？',
    ),
  },
  {
    id: 'thich-tea',
    emoji: '🍵',
    tradition: localized('Thich Nhat Hanh — teaching on tea', '一行禅师 — 茶的教导'),
    setting: localized(
      'Thich Nhat Hanh invited people to drink a cup of tea with full attention — not while planning the next hour.',
      '一行禅师请人全然专注地喝一杯茶 — 而不是一边计划下一小时。',
    ),
    resolution: localized(
      'If you are not there with the tea, he said, you are not really drinking tea; you are drinking your projects and worries.',
      '他说：若你不在茶那里，你并非真的在喝茶；你喝的是计划与忧虑。',
    ),
    reflectionQuestion: localized(
      'What ordinary act could you inhabit fully once today?',
      '今天你能全然安住的一件平常之事是什么？',
    ),
  },
  {
    id: 'desert-father-basket',
    emoji: '🧺',
    tradition: localized('Sayings of the Desert Fathers', '沙漠教父语录'),
    setting: localized(
      'A brother asked an elder how to deal with intrusive thoughts. The elder told him to go outside and catch the wind in a basket.',
      '一弟兄问长老如何对付纷扰的念头。长老让他到外面用篮子去装风。',
    ),
    resolution: localized(
      'When the brother said it was impossible, the elder replied: so it is with thoughts — do not try to seize them all; tend to your work and let them pass.',
      '弟兄说不可能。长老答：念头也是如此 — 不要企图捉住全部；做你的工，让它们过去。',
    ),
    reflectionQuestion: localized(
      'Which thought are you exhausting yourself trying to catch in a basket?',
      '你正耗尽自己、想用篮子去捉的是哪一个念头？',
    ),
  },
  {
    id: 'african-ubuntu',
    emoji: '🫂',
    tradition: localized('Southern African proverb — Ubuntu', '南部非洲谚语 — Ubuntu'),
    setting: localized(
      'In the spirit of ubuntu, belonging is pictured this way: when you feast, the village’s children eat; when you suffer, hands appear.',
      '在 ubuntu 的精神里，归属被这样描绘：你设宴时，村里的孩子也吃；你受苦时，手会出现。',
    ),
    resolution: localized(
      '“I am because we are” — a person is a person through other people.',
      '「我在，因我们在」 — 人通过他人而成为人。',
    ),
    reflectionQuestion: localized(
      'Through whom are you becoming more of a person lately?',
      '近来，你通过谁，正成为更多的人？',
    ),
  },
  {
    id: 'japanese-kintsugi',
    emoji: '🏺',
    tradition: localized('Japanese craft — Kintsugi', '日本工艺 — 金缮'),
    setting: localized(
      'A broken bowl is not thrown away. The cracks are joined with lacquer mixed with gold.',
      '破碗不被丢弃。裂缝以调了金的漆接合。',
    ),
    resolution: localized(
      'The break is not hidden; it becomes the brightest part of the vessel’s history.',
      '裂痕不被掩盖；它成为器物史上最亮的部分。',
    ),
    reflectionQuestion: localized(
      'What break in you are you still trying to hide instead of gild?',
      '你仍在试图隐藏、而非镀金的裂痕是哪一道？',
    ),
  },
  {
    id: 'confucius-neighbours',
    emoji: '🏘️',
    tradition: localized('Analects 4.25', '《论语·里仁》'),
    setting: localized(
      'Someone worried that practising virtue would leave them alone. Confucius answered briefly:',
      '有人担心践行德行会孤单。孔子答得很短：',
    ),
    resolution: localized(
      'Virtue is not left to stand alone. He who practises it will have neighbours.',
      '德不孤，必有邻。',
    ),
    reflectionQuestion: localized(
      'Are you lonely because virtue has no neighbours — or because you are not practising where they could find you?',
      '你寂寞，是因为德行没有邻人，还是你没有在他们找得到你的地方去践行？',
    ),
  },
  {
    id: 'buddha-raft',
    emoji: '🪵',
    tradition: localized('Buddhist parable — the raft', '佛教譬喻 — 筏喻'),
    setting: localized(
      'The Buddha likened his teaching to a raft built to cross a dangerous river. Once on the far shore, would a wise person hoist the raft onto their head and carry it onward?',
      '佛陀把教导比作为渡险河而造的筏。到了彼岸，智者会把筏顶在头上继续走吗？',
    ),
    resolution: localized(
      'No — the raft was for crossing, not for clinging. Even the Dharma is to be let go when its work is done.',
      '不会 — 筏为渡河，不为执取。即使佛法，事成亦当放下。',
    ),
    reflectionQuestion: localized(
      'What useful raft are you still carrying on dry land?',
      '你在旱地上仍顶着的有用的筏是什么？',
    ),
  },
  {
    id: 'laozi-know-enough',
    emoji: '🤫',
    tradition: localized('Daodejing, Chapter 33 / 56 (themes)', '《道德经》第三十三 / 五十六章（主旨）'),
    setting: localized(
      'A boastful official asked what true strength looked like. The answer came in quiet lines from the Way:',
      '一位爱自夸的官员问何为真正的力量。回答来自道的安静句子：',
    ),
    resolution: localized(
      'Those who know do not boast; knowing yourself is clarity. Mastery of others is force; mastery of yourself is strength. Contentment is wealth.',
      '知者不言，言者不知。知人者智，自知者明。胜人者有力，自胜者强。知足者富。',
    ),
    reflectionQuestion: localized(
      'Where are you still trying to win against someone instead of mastering yourself?',
      '你仍在何处想赢过别人，而非胜过自己？',
    ),
  },
  {
    id: 'jesus-first-stone',
    emoji: '🪨',
    tradition: localized('Gospel of John 8:1–11', '《约翰福音》8:1–11'),
    setting: localized(
      'A crowd brought a woman caught in adultery and asked Jesus whether she should be stoned, as the law prescribed.',
      '众人带来行淫时被捉的妇人，问耶稣是否该按律法用石头打死她。',
    ),
    resolution: localized(
      'He said: Let the one among you who is without sin cast the first stone. One by one they went away, beginning with the eldest.',
      '他说：你们中间谁是没有罪的，谁就可以先拿石头打她。众人从老到少一个一个走开了。',
    ),
    reflectionQuestion: localized(
      'What stone are you still holding — and what would open hands cost your pride?',
      '你仍握着哪一块石头 — 松开手会让骄傲付出什么？',
    ),
  },
  {
    id: 'rumi-onion',
    emoji: '🧅',
    tradition: localized('Rumi — teaching image', '鲁米 — 教喻意象'),
    setting: localized(
      'Rumi spoke of peeling an onion of the self — layer after layer of story, pride, and borrowed opinion.',
      '鲁米谈剥开自我的洋葱 — 一层层故事、骄傲与借来的意见。',
    ),
    resolution: localized(
      'Tears come with the peeling. Keep going, he urged — the work is not to find a final mask, but to become permeable to love.',
      '剥时会流泪。他劝你继续 — 工夫不是找到最终的面具，而是变得能被爱穿透。',
    ),
    reflectionQuestion: localized(
      'Which layer are you defending as if it were the centre?',
      '你把哪一层当作中心在防守？',
    ),
  },
  {
    id: 'ptahhotep-listen',
    emoji: '👂',
    tradition: localized('The Maxims of Ptahhotep', '《普塔霍特普箴言》'),
    setting: localized(
      'The Egyptian vizier Ptahhotep taught: if you are a leader, listen calmly to the plea of the petitioner.',
      '埃及维齐尔普塔霍特普教导：若你居于上位，当平静倾听陈情者。',
    ),
    resolution: localized(
      'A person who is heard may leave with an empty hand — yet feel the body unburdened, because the listening itself was justice.',
      '人或许空手离去 — 却觉身体卸下重负，因倾听本身已是一种公正。',
    ),
    reflectionQuestion: localized(
      'Whom could you leave “unburdened” this week by listening without fixing?',
      '这周你能通过只听不修，让谁「卸下重负」？',
    ),
  },
  {
    id: 'confucius-rectify-names',
    emoji: '📝',
    tradition: localized('Analects 13.3', '《论语·子路》'),
    setting: localized(
      'Asked what he would do first if given charge of a state, Confucius did not name armies or taxes. He said: first, rectify names — let words mean what they ought.',
      '问若为政何先，孔子不提兵税。子曰：必也正名乎 — 让用词合乎其所当指。',
    ),
    resolution: localized(
      'If names are not correct, language will not be in accordance with the truth of things — and affairs cannot be carried to success.',
      '名不正，则言不顺；言不顺，则事不成。',
    ),
    reflectionQuestion: localized(
      'What word in your life has drifted from what you actually mean by it?',
      '你生活中哪个词，已偏离你真正所指？',
    ),
  },
  {
    id: 'zen-wash-bowl',
    emoji: '🥣',
    tradition: localized('Zen koan — Chao-chou / Zhaozhou', '禅宗公案 — 赵州'),
    setting: localized(
      'A new monk arrived and asked Zhaozhou for instruction. Zhaozhou asked: Have you eaten your rice gruel?',
      '新到僧问赵州请示。赵州问：吃粥了也未？',
    ),
    resolution: localized(
      'The monk said yes. Zhaozhou said: Then wash your bowl. At that the monk had insight.',
      '僧云吃了。赵州云：洗钵盂去。僧有省。',
    ),
    reflectionQuestion: localized(
      'What ordinary next act is your “wash the bowl” — the one you skip for bigger seeking?',
      '你的「洗钵」是哪件平常的下一步 — 你因更大的寻求而跳过的？',
    ),
  },
  {
    id: 'stoic-dichotomy',
    emoji: '⚖️',
    tradition: localized('Epictetus — dichotomy of control', '爱比克泰德 — 控制的二分'),
    setting: localized(
      'A student fretted over reputation and illness. Epictetus drew a line through life:',
      '学生为名声与病痛焦虑。爱比克泰德在人生中划下一道线：',
    ),
    resolution: localized(
      'Up to us: judgment, aim, refusal. Not up to us: body, property, reputation, office. Freedom is putting effort only where choice lives.',
      '我们能力所及：判断、志向、拒绝。非我们所及：身体、财产、名声、职位。自由是把力气只用在选择所在之处。',
    ),
    reflectionQuestion: localized(
      'What are you gripping that was never in the “up to you” column?',
      '你紧抓着的哪一样，从不曾在「由你做主」那一栏？',
    ),
  },
];
