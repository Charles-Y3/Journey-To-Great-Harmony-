import type { TimelineEra } from './types';
import { localized } from '../i18n/types';

export const TIMELINE: TimelineEra[] = [
  {
    id: 'ancient',
    name: localized('Ancient Civilizations', '古代文明'),
    emoji: '🏛️',
    period: localized('c. 3000–600 BCE', '约公元前3000至600年'),
    badgeTitle: localized('Ancient Wisdom Explorer', '古代智慧探索者'),
    points: [
      {
        id: 'ancient-first',
        title: localized('Wisdom of the First Civilizations', '最早文明的智慧'),
        years: localized('c. 3000–600 BCE', '约公元前3000至600年'),
        emoji: '𓂀',
        background: localized(
          "Long before philosophy had a name, the first great civilizations — Egypt, Mesopotamia, the Indus Valley, and early China — were already asking how to live well. Egyptian sages taught Ma'at: truth, balance, and right order. Mesopotamian proverbs urged honesty and moderation. The Vedic hymns of ancient India searched for the unity behind all things. These early teachings show that the longing for wisdom and harmony is as old as humanity itself.",
          '早在"哲学"这个名字出现之前，最早的伟大文明 — 埃及、美索不达米亚、印度河流域，以及上古中国 — 便已经在探问如何活得美好。埃及的贤者教导「玛阿特」：真理、平衡与正当秩序。美索不达米亚的箴言劝人诚实而节制。古印度的吠陀圣歌，探寻着万物背后的合一。这些最早的教导告诉我们：对智慧与和谐的渴望，与人类本身一样古老。',
        ),
        figures: localized(
          ['Ptahhotep (Egyptian vizier & sage)', 'The Vedic seers (rishis)', 'Mesopotamian scribes'],
          ['普塔霍特普（埃及宰相与贤者）', '吠陀圣者（仙人）', '美索不达米亚的书吏'],
        ),
        teachings: localized(
          [
            "Ma'at — live in truth, balance, and right order",
            'Speak honestly; a good name outlasts wealth',
            'Behind the many things of the world lies a deeper unity',
          ],
          ['玛阿特 — 依真理、平衡与正当秩序而生活', '诚实地说话；美名比财富更加长久', '世间万物的背后，藏着更深的合一'],
        ),
        concepts: localized(["Ma'at", 'Rita (cosmic order)', 'Proverbial wisdom'], ['玛阿特', '梨多（宇宙秩序）', '箴言智慧']),
        quiz: [
          {
            q: localized("What did the Egyptian concept of Ma'at represent?", '埃及的「玛阿特」概念代表什么？'),
            options: localized(
              ['Military strength', 'Truth, balance, and right order', 'Wealth and abundance', 'The afterlife only'],
              ['军事力量', '真理、平衡与正当秩序', '财富与丰饶', '仅仅是来世'],
            ),
            answer: 1,
          },
          {
            q: localized('The Vedic seers of ancient India searched for…', '古印度的吠陀圣者所探寻的是……'),
            options: localized(
              ['New trade routes', 'The unity behind all things', 'Better weapons', 'Faster ways to farm'],
              ['新的贸易路线', '万物背后的合一', '更好的武器', '更快的耕作方式'],
            ),
            answer: 1,
          },
          {
            q: localized('What do the earliest wisdom teachings show us?', '最早的智慧教导告诉了我们什么？'),
            options: localized(
              ['Wisdom was invented recently', 'Only one civilization sought wisdom', 'The longing for wisdom is as old as humanity', 'Ancient people had no ethics'],
              ['智慧是近代才被发明的', '只有一个文明追寻过智慧', '对智慧的渴望与人类本身一样古老', '古代人没有伦理观念'],
            ),
            answer: 2,
          },
        ],
        cardId: 'card-maat',
      },
    ],
  },
  {
    id: 'greek',
    name: localized('Greek Philosophy', '希腊哲学'),
    emoji: '🏺',
    period: localized('c. 600–300 BCE', '约公元前600至300年'),
    badgeTitle: localized('Hellenic Wisdom Explorer', '希腊智慧探索者'),
    points: [
      {
        id: 'greek-socrates',
        title: localized('Socrates & the Examined Life', '苏格拉底与省察的人生'),
        years: localized('470–399 BCE', '公元前470至399年'),
        emoji: '🗣️',
        background: localized(
          'In the streets of Athens, Socrates asked questions no one could easily answer: What is justice? What is courage? What is a good life? He wrote nothing, yet changed thought forever. He claimed to know only that he knew nothing — and that honest questioning was the beginning of wisdom. Condemned to death for "corrupting the youth," he calmly accepted the sentence, teaching that it is better to suffer wrong than to do wrong.',
          '在雅典的街头，苏格拉底提出了无人能轻易回答的问题：什么是正义？什么是勇气？什么是美好的人生？他从未写下一字一句，却永远改变了人类的思想。他声称自己唯一知道的，便是自己一无所知 — 而诚实的发问，正是智慧的开端。他因被控"败坏青年"而被判处死刑，却平静地接受了判决，以此教导世人：宁可承受不义，也不可施行不义。',
        ),
        figures: localized(['Socrates'], ['苏格拉底']),
        teachings: localized(
          [
            '"The unexamined life is not worth living"',
            'True wisdom begins with knowing what you do not know',
            'It is better to suffer injustice than to commit it',
          ],
          ['"未经省察的人生，不值得度过"', '真正的智慧，始于知道自己有什么不知道', '宁可承受不义，也不可施行不义'],
        ),
        concepts: localized(
          ['The Socratic method', 'Intellectual humility', 'Moral integrity'],
          ['苏格拉底式方法', '智识上的谦逊', '道德上的正直'],
        ),
        quiz: [
          {
            q: localized("What was the heart of Socrates' method?", '苏格拉底方法的核心是什么？'),
            options: localized(
              ['Giving long lectures', 'Asking honest questions', 'Writing many books', 'Winning debates at any cost'],
              ['进行冗长的演讲', '提出诚实的问题', '写下许多著作', '不惜一切代价赢得辩论'],
            ),
            answer: 1,
          },
          {
            q: localized('Socrates said the beginning of wisdom is…', '苏格拉底说，智慧的开端是……'),
            options: localized(
              ['Wealth', 'Knowing what you do not know', 'Memorizing facts', 'Obeying authority'],
              ['财富', '知道自己有什么不知道', '记住各种事实', '服从权威'],
            ),
            answer: 1,
          },
          {
            q: localized('According to Socrates, which is worse?', '根据苏格拉底的说法，哪一种更糟？'),
            options: localized(
              ['Suffering injustice', 'Committing injustice', 'Being poor', 'Being unknown'],
              ['承受不义', '施行不义', '贫穷', '默默无闻'],
            ),
            answer: 1,
          },
        ],
        cardId: 'card-socrates',
      },
      {
        id: 'greek-plato-aristotle',
        title: localized('Plato, Aristotle & the Good Life', '柏拉图、亚里士多德与美好人生'),
        years: localized('c. 428–322 BCE', '约公元前428至322年'),
        emoji: '📖',
        background: localized(
          "Socrates' student Plato imagined a just society guided by wisdom, and taught that beyond the shifting world of appearances lie eternal ideals — above all, the Good. His student Aristotle brought philosophy down to earth: happiness (eudaimonia) is a life of virtue, and virtue is a habit built by practice. Courage, generosity, and honesty each lie at a golden mean between two extremes. Together they shaped how the world thinks about ethics, character, and community.",
          '苏格拉底的学生柏拉图构想了一个由智慧引导的正义社会，并教导说，在这个流变不居的表象世界之外，存在着永恒的理型 — 其中最高的，便是"善"本身。他的学生亚里士多德则把哲学带回了人间：幸福（eudaimonia）是一种依德行而活的人生，而德行是通过反复实践养成的习惯。勇气、慷慨与诚实，各自都居于两个极端之间的"中道"。这两位师徒共同塑造了世人对伦理、品格与社群的理解方式。',
        ),
        figures: localized(['Plato', 'Aristotle'], ['柏拉图', '亚里士多德']),
        teachings: localized(
          [
            'A good society must be guided by wisdom and justice',
            'Happiness is activity of the soul in accordance with virtue',
            'Virtue is a habit: we become just by doing just acts',
          ],
          ['良好的社会，必须由智慧与正义来引导', '幸福，是灵魂依循德行而展现的活动', '德行是一种习惯：我们因行正义之事而成为正义之人'],
        ),
        concepts: localized(
          ['The Form of the Good', 'Eudaimonia (flourishing)', 'The golden mean'],
          ['善的理型', '幸福（人生的兴盛）', '中道'],
        ),
        quiz: [
          {
            q: localized('For Aristotle, virtue is best understood as…', '对亚里士多德而言，德行最好被理解为……'),
            options: localized(
              ['A lucky gift at birth', 'A habit built by practice', 'A set of rules to memorize', 'Something only philosophers have'],
              ['天生的幸运禀赋', '通过练习养成的习惯', '一套需要背诵的规则', '只有哲学家才拥有的东西'],
            ),
            answer: 1,
          },
          {
            q: localized('The "golden mean" means virtue lies…', '「中道」意味着德行位于……'),
            options: localized(
              ['In extreme behaviour', 'Between two extremes', 'In wealth', 'In avoiding all action'],
              ['极端的行为之中', '两个极端之间', '财富之中', '完全不作为之中'],
            ),
            answer: 1,
          },
          {
            q: localized('What did Aristotle call true happiness or flourishing?', '亚里士多德把真正的幸福或兴盛称为什么？'),
            options: localized(['Hedonia', 'Eudaimonia', 'Nirvana', 'Ataraxia'], ['享乐（Hedonia）', '幸福（Eudaimonia）', '涅槃（Nirvana）', '心灵宁静（Ataraxia）']),
            answer: 1,
          },
        ],
        cardId: 'card-aristotle',
      },
    ],
  },
  {
    id: 'confucius',
    name: localized('Confucius', '孔子'),
    emoji: '📜',
    period: localized('551–479 BCE', '公元前551至479年'),
    badgeTitle: localized('Confucian Philosophy Completed', '儒家哲学已完成'),
    points: [
      {
        id: 'confucius-ren',
        title: localized('Confucius & the Way of Ren 仁', '孔子与仁道'),
        years: localized('551–479 BCE', '公元前551至479年'),
        emoji: '📜',
        background: localized(
          'In an age of war and disorder, Confucius (Kongzi 孔子) taught that a harmonious world begins with the cultivation of each person. His central virtue was ren 仁 — humaneness, the deep care of one person for another. Through li 礼 (ritual propriety), filial devotion, and lifelong learning, anyone can become a junzi 君子, an exemplary person. His vision reached its height in the ideal of Datong 大同, the Great Harmony: a world where the world is shared by all (天下为公), the old are cared for, the young are nurtured, and trust prevails.',
          '在一个战乱纷争的时代，孔子教导说，和谐的世界，始于每一个人的自我修养。他所提出的核心德行是「仁」— 人与人之间深切的关怀。通过「礼」（合宜的礼节）、孝道，以及终身的学习，任何人都可以成为「君子」，一个修养有成的典范之人。他的愿景，最终凝聚为「大同」的理想：一个天下为公、老有所终、幼有所长、人人守信的世界。',
        ),
        figures: localized(['Confucius (Kongzi 孔子)'], ['孔子']),
        teachings: localized(
          [
            '"Do not impose on others what you yourself do not desire" (己所不欲，勿施于人)',
            'Cultivate yourself → regulate the family → order the state → bring peace to the world',
            'The Great Harmony 大同: a world shared by all, where all people are cared for',
          ],
          ['"己所不欲，勿施于人"', '修身 → 齐家 → 治国 → 平天下', '大同：一个天下为公、人人皆得其养的世界'],
        ),
        concepts: localized(
          ['Ren 仁 (humaneness)', 'Li 礼 (propriety)', 'Junzi 君子 (exemplary person)', 'Datong 大同 (Great Harmony)'],
          ['仁（人道关怀）', '礼（合宜的礼节）', '君子（典范之人）', '大同（大同理想）'],
        ),
        quiz: [
          {
            q: localized('What is ren 仁, the central virtue of Confucius?', '「仁」，孔子思想的核心德行，是什么？'),
            options: localized(
              ['Military skill', 'Humaneness — deep care for others', 'Cleverness in argument', 'Strict obedience'],
              ['军事技能', '人道关怀 — 对他人深切的关怀', '辩论上的机敏', '严格的服从'],
            ),
            answer: 1,
          },
          {
            q: localized('According to Confucius, a harmonious world begins with…', '根据孔子的说法，和谐的世界始于……'),
            options: localized(
              ['Strong laws', 'Cultivating oneself', 'Great wealth', 'Powerful armies'],
              ['严厉的法律', '自我修养', '巨大的财富', '强大的军队'],
            ),
            answer: 1,
          },
          {
            q: localized('What does Datong 大同 describe?', '「大同」描述的是什么？'),
            options: localized(
              ['A world of Great Harmony shared by all', 'A single world government', 'A famous palace', 'A style of calligraphy'],
              ['一个天下为公的大同世界', '单一的世界政府', '一座著名的宫殿', '一种书法风格'],
            ),
            answer: 0,
          },
        ],
        cardId: 'card-confucius',
      },
    ],
  },
  {
    id: 'daoism',
    name: localized('Daoism', '道家'),
    emoji: '☯️',
    period: localized('c. 6th–4th century BCE', '约公元前6至4世纪'),
    badgeTitle: localized('Daoist Wisdom Explorer', '道家智慧探索者'),
    points: [
      {
        id: 'daoism-laozi',
        title: localized('Laozi & the Dao 道', '老子与道'),
        years: localized('c. 6th century BCE', '约公元前6世纪'),
        emoji: '☯️',
        background: localized(
          'The Daodejing 道德经, attributed to the sage Laozi 老子, teaches that behind all things flows the Dao 道 — the Way. Water is its image: soft yet overcoming the hard, always seeking the low place, nourishing all without contending. Laozi taught wu wei 无为 — effortless action that does not force — and prized simplicity, humility, and contentment. Where Confucius perfected human relationships, Laozi reminded humanity to stay rooted in nature\'s quiet rhythm.',
          '相传由圣者老子所著的《道德经》教导说，万物的背后，流淌着「道」。水，是道的意象：柔弱却能胜过刚强，总是趋向低处，滋养万物而不与之相争。老子教导「无为」— 不强求的、顺其自然的行动 — 并珍视简朴、谦逊与知足。若说孔子完善了人与人之间的关系，老子则提醒人类，要扎根于自然那静默的节律之中。',
        ),
        figures: localized(['Laozi 老子', 'Zhuangzi 庄子'], ['老子', '庄子']),
        teachings: localized(
          [
            '"The highest good is like water" (上善若水)',
            'Act without forcing (wu wei 无为); great results come without contention',
            '"A journey of a thousand miles begins with a single step" (千里之行，始于足下)',
          ],
          ['"上善若水"', '无为而无不为；伟大的成就，来自不与人相争', '"千里之行，始于足下"'],
        ),
        concepts: localized(
          ['Dao 道 (the Way)', 'Wu wei 无为', 'Ziran 自然 (naturalness)', 'Simplicity'],
          ['道', '无为', '自然', '简朴'],
        ),
        quiz: [
          {
            q: localized('Why did Laozi admire water?', '老子为何欣赏水？'),
            options: localized(
              ['It is soft yet overcomes the hard, and nourishes without contending', 'It is powerful and destructive', 'It is rare and precious', 'It always moves upward'],
              ['它柔弱却能胜过刚强，滋养万物而不相争', '它强大而具有破坏力', '它稀有而珍贵', '它总是向上流动'],
            ),
            answer: 0,
          },
          {
            q: localized('Wu wei 无为 is best translated as…', '「无为」最恰当的理解是……'),
            options: localized(
              ['Doing nothing at all', 'Effortless, unforced action', 'Working extremely hard', 'Strict discipline'],
              ['完全什么都不做', '不强求、顺其自然的行动', '极其努力地工作', '严格的纪律'],
            ),
            answer: 1,
          },
          {
            q: localized('A journey of a thousand miles begins with…', '千里之行，始于……'),
            options: localized(['A great map', 'A single step', 'A fast horse', 'A large supply'], ['一张精良的地图', '一步', '一匹快马', '充足的物资']),
            answer: 1,
          },
        ],
        cardId: 'card-laozi',
      },
    ],
  },
  {
    id: 'mencius',
    name: localized('Mencius', '孟子'),
    emoji: '🌾',
    period: localized('372–289 BCE', '公元前372至289年'),
    badgeTitle: localized('Mencian Wisdom Explorer', '孟子智慧探索者'),
    points: [
      {
        id: 'mencius-goodness',
        title: localized('Mencius & Innate Goodness', '孟子与性善论'),
        years: localized('372–289 BCE', '公元前372至289年'),
        emoji: '🌾',
        background: localized(
          'Mencius (Mengzi 孟子), the greatest heir of Confucius, taught that human nature is originally good. Anyone who sees a child about to fall into a well feels alarm and compassion — proof, he said, that the seeds of virtue are born in every heart. These "four sprouts" — compassion, shame, courtesy, and the sense of right and wrong — grow into full virtues when nourished, like grain ripening in a well-tended field. A ruler, he insisted, earns legitimacy only by caring for the people.',
          '孟子，孔子思想最伟大的继承者，教导说人性本善。任何人看见一个孩子即将跌入井中，都会感到惊惧与恻隐之心 — 他说，这正证明了德行的种子，天生存在于每一颗心中。这"四端"— 恻隐之心、羞恶之心、辞让之心，以及是非之心 — 若得到滋养，便会成长为完满的德行，如同稻谷在悉心照料的田地中成熟。他坚持认为，统治者唯有关爱百姓，才能获得统治的正当性。',
        ),
        figures: localized(['Mencius (Mengzi 孟子)'], ['孟子']),
        teachings: localized(
          [
            'Human nature contains the seeds of goodness — cultivate them daily',
            'The four sprouts: compassion, shame, courtesy, and moral discernment',
            'The people are the most important; a ruler must serve their welfare',
          ],
          ['人性中蕴含着善的种子 — 需要每日加以培育', '四端：恻隐、羞恶、辞让，与是非之心', '民为贵；统治者必须服务于百姓的福祉'],
        ),
        concepts: localized(
          ['The four sprouts (四端)', 'Innate goodness', 'Benevolent government (仁政)'],
          ['四端', '性善论', '仁政'],
        ),
        quiz: [
          {
            q: localized('What did Mencius believe about human nature?', '孟子对人性有什么看法？'),
            options: localized(
              ['It is originally evil', 'It is originally good', 'It is a blank slate', 'It cannot change'],
              ['人性本恶', '人性本善', '人性是一张白纸', '人性无法改变'],
            ),
            answer: 1,
          },
          {
            q: localized('The "four sprouts" are seeds of…', '「四端」是什么的种子？'),
            options: localized(['Wealth', 'Virtue', 'Knowledge', 'Power'], ['财富', '德行', '知识', '权力']),
            answer: 1,
          },
          {
            q: localized('Mencius used the child at the well to show that…', '孟子用孩童将跌入井中的例子，是为了说明……'),
            options: localized(
              ['People are careless', 'Compassion arises naturally in the human heart', 'Wells are dangerous', 'Children need supervision'],
              ['人们粗心大意', '恻隐之心在人心中自然而生', '水井很危险', '孩童需要看管'],
            ),
            answer: 1,
          },
        ],
        cardId: 'card-mencius',
      },
    ],
  },
  {
    id: 'buddhism',
    name: localized('Buddhism', '佛教'),
    emoji: '🪷',
    period: localized('c. 563–483 BCE', '约公元前563至483年'),
    badgeTitle: localized('Buddhist Wisdom Explorer', '佛教智慧探索者'),
    points: [
      {
        id: 'buddhism-buddha',
        title: localized('The Buddha & the Middle Way', '佛陀与中道'),
        years: localized('c. 563–483 BCE', '约公元前563至483年'),
        emoji: '🪷',
        background: localized(
          'Siddhartha Gautama left a life of palace luxury to seek the cause of suffering. After years of searching he awoke beneath the Bodhi tree and became the Buddha — "the awakened one." He taught the Four Noble Truths: suffering exists, it arises from craving, it can cease, and there is a path to its ceasing — the Eightfold Path of right understanding, intention, speech, action, livelihood, effort, mindfulness, and concentration. His way is a Middle Way between indulgence and harsh denial, walked with compassion (karuna) and loving-kindness (metta) for all beings.',
          '悉达多·乔达摩舍弃了宫廷中奢华的生活，去探寻苦的根源。历经多年的寻觅，他在菩提树下觉悟，成为佛陀 — "觉悟者"。他教导了四圣谛：苦是存在的，苦生于贪爱，苦可以止息，而止息苦的道路，便是八正道 — 正见、正思维、正语、正业、正命、正精进、正念，与正定。他所走的道路，是纵欲与苦行两个极端之间的中道，以对一切众生的慈悲与慈爱而行。',
        ),
        figures: localized(['Siddhartha Gautama (the Buddha)'], ['悉达多·乔达摩（佛陀）']),
        teachings: localized(
          [
            'The Four Noble Truths: understand suffering and the path beyond it',
            'The Eightfold Path: wisdom, ethics, and mental discipline together',
            'Meet all beings with compassion and loving-kindness',
          ],
          ['四圣谛：了解苦，以及超越苦的道路', '八正道：智慧、戒律与心的修持合而为一', '以慈悲与慈爱对待一切众生'],
        ),
        concepts: localized(
          ['The Middle Way', 'Mindfulness', 'Karuna (compassion)', 'Metta (loving-kindness)'],
          ['中道', '正念', '悲（慈悲）', '慈（慈爱）'],
        ),
        quiz: [
          {
            q: localized('According to the Buddha, suffering arises from…', '根据佛陀的说法，苦生于……'),
            options: localized(['Bad luck', 'Craving and attachment', 'Other people', 'The gods'], ['厄运', '贪爱与执着', '他人', '神明']),
            answer: 1,
          },
          {
            q: localized('The Middle Way lies between…', '中道位于……之间'),
            options: localized(
              ['Rich and poor', 'Indulgence and harsh self-denial', 'East and West', 'Youth and age'],
              ['富有与贫穷', '纵欲与严苛的自我克制', '东方与西方', '青年与老年'],
            ),
            answer: 1,
          },
          {
            q: localized('Metta means…', '「慈」（Metta）意味着……'),
            options: localized(['Loving-kindness', 'Strict discipline', 'Deep sleep', 'Sacred fire'], ['慈爱', '严格的戒律', '深沉的睡眠', '神圣的火']),
            answer: 0,
          },
        ],
        cardId: 'card-buddha',
      },
    ],
  },
  {
    id: 'christianity',
    name: localized('Christianity', '基督教'),
    emoji: '✝️',
    period: localized('1st century CE', '公元1世纪'),
    badgeTitle: localized('Christian Wisdom Explorer', '基督教智慧探索者'),
    points: [
      {
        id: 'christianity-jesus',
        title: localized('Jesus & the Ethic of Love', '耶稣与爱的伦理'),
        years: localized('c. 4 BCE–30 CE', '约公元前4年至公元30年'),
        emoji: '✝️',
        background: localized(
          'In Roman-ruled Galilee, Jesus of Nazareth taught a radical ethic of love: love God, and love your neighbour as yourself — even your enemy. In the Sermon on the Mount he blessed the meek, the merciful, and the peacemakers, and gave the Golden Rule: do to others what you would have them do to you. His parables — the Good Samaritan, the Prodigal Son — taught that compassion crosses every boundary and that forgiveness restores what is broken. This ethic of unconditional love and service became one of the most influential moral visions in history.',
          '在罗马统治下的加利利，拿撒勒人耶稣教导了一种彻底的爱的伦理：爱神，也要爱人如己 — 甚至要爱你的仇敌。在《登山宝训》中，他祝福温柔的人、怜悯人的人，以及使人和睦的人，并留下了"金律"：你想别人怎样待你，你也要怎样待人。他的比喻 — 好撒玛利亚人、浪子回头 — 教导世人，慈悲能够跨越一切界限，而宽恕能够修复破碎之物。这种无条件的爱与服务的伦理，成为人类历史上最具影响力的道德愿景之一。',
        ),
        figures: localized(['Jesus of Nazareth'], ['拿撒勒人耶稣']),
        teachings: localized(
          [
            '"Love your neighbour as yourself" — and even your enemies',
            'The Golden Rule: do to others what you would have them do to you',
            'Blessed are the merciful and the peacemakers',
          ],
          ['"爱人如己"— 甚至要爱你的仇敌', '金律：你想别人怎样待你，你也要怎样待人', '怜悯人的人有福了，使人和睦的人有福了'],
        ),
        concepts: localized(
          ['Agape (unconditional love)', 'Forgiveness', 'Service', 'The Golden Rule'],
          ['圣爱（无条件的爱）', '宽恕', '服务', '金律'],
        ),
        quiz: [
          {
            q: localized('The Golden Rule teaches…', '金律教导的是……'),
            options: localized(
              ['Treat others as you would have them treat you', 'An eye for an eye', 'Look after yourself first', 'Rules are golden and unbreakable'],
              ['你想别人怎样待你，你也要怎样待人', '以眼还眼', '先照顾好自己', '规则是神圣而不可打破的'],
            ),
            answer: 0,
          },
          {
            q: localized('The parable of the Good Samaritan shows that…', '好撒玛利亚人的比喻说明了……'),
            options: localized(
              ['Travel is dangerous', 'Compassion crosses every boundary', 'Priests are always kind', 'Strangers cannot be trusted'],
              ['旅行是危险的', '慈悲能够跨越一切界限', '祭司总是仁慈的', '陌生人不可信任'],
            ),
            answer: 1,
          },
          {
            q: localized('In the Sermon on the Mount, Jesus blessed…', '在《登山宝训》中，耶稣祝福了……'),
            options: localized(
              ['The powerful and wealthy', 'The merciful and the peacemakers', 'The clever and famous', 'The strong and fearless'],
              ['有权势与富有的人', '怜悯人的人与使人和睦的人', '聪明而有名望的人', '强壮而无所畏惧的人'],
            ),
            answer: 1,
          },
        ],
        cardId: 'card-jesus',
      },
    ],
  },
  {
    id: 'islamic',
    name: localized('Islamic Philosophy', '伊斯兰哲学'),
    emoji: '🌙',
    period: localized('8th–13th century CE', '公元8至13世纪'),
    badgeTitle: localized('Islamic Wisdom Explorer', '伊斯兰智慧探索者'),
    points: [
      {
        id: 'islamic-golden-age',
        title: localized('The Golden Age of Islamic Thought', '伊斯兰思想的黄金时代'),
        years: localized('8th–13th century CE', '公元8至13世纪'),
        emoji: '🌙',
        background: localized(
          "While much of Europe's ancient learning lay scattered, scholars of the Islamic world gathered, translated, and transformed it. In Baghdad's House of Wisdom, thinkers such as Al-Farabi, Avicenna (Ibn Sina), and Averroes (Ibn Rushd) wove Greek philosophy together with faith, medicine, mathematics, and astronomy. Al-Ghazali explored the inner life of the heart, and the Sufi poet Rumi sang of a love that unites all beings. Their work carried the flame of wisdom across centuries and cultures, later reigniting learning in Europe.",
          '当欧洲大部分的古代学问散佚失传之时，伊斯兰世界的学者们却在收集、翻译，并加以转化。在巴格达的"智慧宫"中，法拉比、伊本·西那（阿维森纳），以及伊本·鲁世德（阿威罗伊）等思想家，将希腊哲学与信仰、医学、数学与天文学交织在一起。安萨里探索了内心的精神生活，苏菲诗人鲁米则歌咏着一种联结万物的爱。他们的工作，让智慧之火跨越数个世纪与文化传递下去，后来更重新点燃了欧洲的学术之光。',
        ),
        figures: localized(
          ['Avicenna (Ibn Sina)', 'Averroes (Ibn Rushd)', 'Al-Ghazali', 'Rumi'],
          ['伊本·西那（阿维森纳）', '伊本·鲁世德（阿威罗伊）', '安萨里', '鲁米'],
        ),
        teachings: localized(
          [
            'Reason and faith can illuminate one another',
            'Seek knowledge wherever it is found — learning is a bridge between cultures',
            'Rumi: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there."',
          ],
          ['理性与信仰可以彼此照亮', '无论知识在何处，都去寻求它 — 学问是连结不同文化的桥梁', '鲁米："在是非对错的观念之外，有一片旷野，我们在那里相遇。"'],
        ),
        concepts: localized(
          ['The House of Wisdom', 'Falsafa (philosophy)', 'Sufi love & unity'],
          ['智慧宫', '法尔萨法（哲学）', '苏菲的爱与合一'],
        ),
        quiz: [
          {
            q: localized('What was the House of Wisdom?', '「智慧宫」是什么？'),
            options: localized(
              ['A famous mosque', 'A great centre of translation and scholarship in Baghdad', 'A royal palace', 'A trading market'],
              ['一座著名的清真寺', '巴格达的一座伟大的翻译与学术中心', '一座皇家宫殿', '一个贸易市场'],
            ),
            answer: 1,
          },
          {
            q: localized('Islamic Golden Age scholars are known for…', '伊斯兰黄金时代的学者们以什么著称？'),
            options: localized(
              ['Rejecting all foreign learning', 'Preserving and transforming knowledge across cultures', 'Studying only poetry', 'Avoiding science'],
              ['拒绝一切外来学问', '跨文化地保存并转化知识', '只研究诗歌', '回避科学'],
            ),
            answer: 1,
          },
          {
            q: localized('Rumi is celebrated as…', '鲁米被尊崇为……'),
            options: localized(
              ['A general', 'A Sufi poet of love and unity', 'An architect', 'A mapmaker'],
              ['一位将军', '一位歌咏爱与合一的苏菲诗人', '一位建筑师', '一位制图师'],
            ),
            answer: 1,
          },
        ],
        cardId: 'card-rumi',
      },
    ],
  },
  {
    id: 'enlightenment',
    name: localized('The Enlightenment', '启蒙运动'),
    emoji: '💡',
    period: localized('17th–18th century CE', '公元17至18世纪'),
    badgeTitle: localized('Enlightenment Explorer', '启蒙运动探索者'),
    points: [
      {
        id: 'enlightenment-reason',
        title: localized('Reason, Rights & Human Dignity', '理性、权利与人的尊严'),
        years: localized('17th–18th century CE', '公元17至18世纪'),
        emoji: '💡',
        background: localized(
          'European thinkers of the Enlightenment dared people to think for themselves. Kant\'s motto was "Sapere aude" — dare to know. He taught that every person must be treated as an end in themselves, never merely as a means, and asked us to act only on principles we could will for everyone. Locke argued for natural rights to life and liberty; Rousseau explored the social contract that binds free people together. These ideas of universal dignity, tolerance, and human rights still shape our world — and echo the ancient dream of a world shared by all.',
          '欧洲启蒙时代的思想家，鼓励人们勇敢地独立思考。康德的座右铭是"Sapere aude"— 敢于求知。他教导说，每个人都必须被当作目的本身来对待，绝不能仅仅被当作手段，并要求我们只依据那些愿意让所有人都遵循的原则来行动。洛克主张生命与自由是天赋的权利；卢梭则探讨了将自由的人们联结在一起的社会契约。这些关于普遍尊严、宽容与人权的理念，至今仍在塑造着我们的世界 — 并呼应着"天下为公"这一古老的梦想。',
        ),
        figures: localized(
          ['Immanuel Kant', 'John Locke', 'Jean-Jacques Rousseau', 'Mary Wollstonecraft'],
          ['伊曼努尔·康德', '约翰·洛克', '让-雅克·卢梭', '玛丽·沃斯通克拉夫特'],
        ),
        teachings: localized(
          [
            '"Dare to know" — think for yourself, courageously and honestly',
            'Treat every person as an end, never merely as a means',
            'All people share natural rights and equal dignity',
          ],
          ['"敢于求知"— 勇敢而诚实地独立思考', '把每个人都当作目的本身，绝不仅仅当作手段', '所有人都拥有天赋的权利与平等的尊严'],
        ),
        concepts: localized(
          ['Reason', 'The categorical imperative', 'Natural rights', 'The social contract'],
          ['理性', '定言令式', '天赋权利', '社会契约'],
        ),
        quiz: [
          {
            q: localized('Kant\'s motto "Sapere aude" means…', '康德的座右铭「Sapere aude」意思是……'),
            options: localized(['Obey wisely', 'Dare to know', 'Live simply', 'Fear nothing'], ['明智地服从', '敢于求知', '简朴地生活', '无所畏惧']),
            answer: 1,
          },
          {
            q: localized('Kant taught that every person must be treated as…', '康德教导说，每个人都必须被当作……对待'),
            options: localized(
              ['A means to progress', 'An end in themselves', 'A subject of the state', 'A competitor'],
              ['进步的手段', '目的本身', '国家的臣民', '竞争对手'],
            ),
            answer: 1,
          },
          {
            q: localized('Enlightenment thinkers argued that rights and dignity belong to…', '启蒙思想家主张，权利与尊严属于……'),
            options: localized(['Kings only', 'The educated only', 'All people', 'The wealthy'], ['仅属于君王', '仅属于受过教育的人', '所有人', '富有的人']),
            answer: 2,
          },
        ],
        cardId: 'card-kant',
      },
    ],
  },
  {
    id: 'modern',
    name: localized('Modern Thinkers', '现代思想家'),
    emoji: '🌏',
    period: localized('19th–20th century CE', '公元19至20世纪'),
    badgeTitle: localized('Global Wisdom Explorer', '全球智慧探索者'),
    points: [
      {
        id: 'modern-gandhi-king',
        title: localized('Gandhi, King & the Power of Nonviolence', '甘地、金恩与非暴力的力量'),
        years: localized('1869–1968', '1869年至1968年'),
        emoji: '🕊️',
        background: localized(
          'In the modern age, ancient wisdom became a force for transforming whole societies. Mahatma Gandhi fused the Indian ideal of ahimsa (non-harm) with satyagraha — "truth-force" — leading India to freedom without hatred. Martin Luther King Jr. carried this torch, joining the ethic of love with the demand for justice: "Darkness cannot drive out darkness; only light can do that." Thinkers like Kang Youwei revived the dream of Datong 大同 for the modern world, and the Universal Declaration of Human Rights gave humanity a shared moral charter. The journey to Great Harmony continues — through each of us.',
          '在现代，古老的智慧成为了转化整个社会的力量。圣雄甘地将印度"非暴力"（不伤害）的理想，与"satyagraha"（真理的力量）结合在一起 — 带领印度在没有仇恨的情况下走向自由。马丁·路德·金接过了这把火炬，将爱的伦理与对正义的诉求结合在一起："黑暗不能驱逐黑暗，唯有光明可以。"康有为等思想家为现代世界重新唤醒了"大同"的梦想，而《世界人权宣言》则为全人类订立了一份共同的道德宪章。通往大同的旅程仍在继续 — 通过我们每一个人。',
        ),
        figures: localized(
          ['Mahatma Gandhi', 'Martin Luther King Jr.', 'Kang Youwei 康有为', 'Eleanor Roosevelt'],
          ['圣雄甘地', '马丁·路德·金', '康有为', '埃莉诺·罗斯福'],
        ),
        teachings: localized(
          [
            '"Be the change you wish to see in the world"',
            'Nonviolence is the weapon of the strong: meet hatred with love',
            'The dream of Great Harmony belongs to all humanity',
          ],
          ['"想要世界如何改变，自己先成为那样的改变"', '非暴力是强者的武器：以爱回应仇恨', '大同的梦想，属于全体人类'],
        ),
        concepts: localized(
          ['Ahimsa (non-harm)', 'Satyagraha (truth-force)', 'Universal human rights', 'Datong 大同 renewed'],
          ['非暴力（不伤害）', '真理的力量', '普世人权', '重焕新生的大同理想'],
        ),
        quiz: [
          {
            q: localized("Satyagraha, Gandhi's method, means…", '甘地的方法「satyagraha」意味着……'),
            options: localized(
              ['Silent protest', 'Truth-force — nonviolent resistance', 'Armed struggle', 'Political negotiation'],
              ['无声的抗议', '真理的力量 — 非暴力抵抗', '武装斗争', '政治谈判'],
            ),
            answer: 1,
          },
          {
            q: localized('King taught that darkness can only be driven out by…', '金恩教导说，黑暗唯有被……驱逐'),
            options: localized(['Greater darkness', 'Light', 'Time', 'Forgetting'], ['更大的黑暗', '光明', '时间', '遗忘']),
            answer: 1,
          },
          {
            q: localized('Kang Youwei renewed which ancient ideal for the modern age?', '康有为为现代重新唤醒了哪一个古老的理想？'),
            options: localized(
              ['Wu wei 无为', 'Datong 大同 — the Great Harmony', 'The golden mean', 'The social contract'],
              ['无为', '大同 — 天下为公的理想', '中道', '社会契约'],
            ),
            answer: 1,
          },
        ],
        cardId: 'card-gandhi',
      },
    ],
  },
];

export const ALL_POINTS = TIMELINE.flatMap((era) => era.points);

export function eraOfPoint(pointId: string): TimelineEra | undefined {
  return TIMELINE.find((era) => era.points.some((p) => p.id === pointId));
}
