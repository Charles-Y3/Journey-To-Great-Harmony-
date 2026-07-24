import type { TimelineEra, TimelineLevel, QuizQuestion } from './types';
import { localized } from '../i18n/types';

// Every TimelinePoint has 3 levels: a foundation, a deeper study (unlocked
// after the foundation is complete), and a mastery tier with the hardest
// quiz (unlocked after the deeper study is complete) — see
// `timelinePointLevels` in state/store.ts. These small helpers keep the
// per-level authoring below readable.
function level(
  label: [string, string],
  background: [string, string],
  figures: [string[], string[]],
  teachings: [string[], string[]],
  concepts: [string[], string[]],
  quiz: QuizQuestion[],
): TimelineLevel {
  return {
    label: localized(label[0], label[1]),
    background: localized(background[0], background[1]),
    figures: localized(figures[0], figures[1]),
    teachings: localized(teachings[0], teachings[1]),
    concepts: localized(concepts[0], concepts[1]),
    quiz,
  };
}

function q(question: [string, string], options: [string[], string[]], answer: number): QuizQuestion {
  return { q: localized(question[0], question[1]), options: localized(options[0], options[1]), answer };
}

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
        cardId: 'card-maat',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              "Long before philosophy had a name, the first great civilizations — Egypt, Mesopotamia, the Indus Valley, and early China — were already asking how to live well. Egyptian sages taught Ma'at: truth, balance, and right order. Mesopotamian proverbs urged honesty and moderation. The Vedic hymns of ancient India searched for the unity behind all things. These early teachings show that the longing for wisdom and harmony is as old as humanity itself.",
              '早在"哲学"这个名字出现之前，最早的伟大文明 — 埃及、美索不达米亚、印度河流域，以及上古中国 — 便已经在探问如何活得美好。埃及的贤者教导「玛阿特」：真理、平衡与正当秩序。美索不达米亚的箴言劝人诚实而节制。古印度的吠陀圣歌，探寻着万物背后的合一。这些最早的教导告诉我们：对智慧与和谐的渴望，与人类本身一样古老。',
            ],
            [
              ['Ptahhotep (Egyptian vizier & sage)', 'The Vedic seers (rishis)', 'Mesopotamian scribes'],
              ['普塔霍特普（埃及宰相与贤者）', '吠陀圣者（仙人）', '美索不达米亚的书吏'],
            ],
            [
              [
                "Ma'at — live in truth, balance, and right order",
                'Speak honestly; a good name outlasts wealth',
                'Behind the many things of the world lies a deeper unity',
              ],
              ['玛阿特 — 依真理、平衡与正当秩序而生活', '诚实地说话；美名比财富更加长久', '世间万物的背后，藏着更深的合一'],
            ],
            [["Ma'at", 'Rita (cosmic order)', 'Proverbial wisdom'], ['玛阿特', '梨多（宇宙秩序）', '箴言智慧']],
            [
              q(
                ["What did the Egyptian concept of Ma'at represent?", '埃及的「玛阿特」概念代表什么？'],
                [
                  ['Military strength', 'Truth, balance, and right order', 'Wealth and abundance', 'The afterlife only'],
                  ['军事力量', '真理、平衡与正当秩序', '财富与丰饶', '仅仅是来世'],
                ],
                1,
              ),
              q(
                ['The Vedic seers of ancient India searched for…', '古印度的吠陀圣者所探寻的是……'],
                [
                  ['New trade routes', 'The unity behind all things', 'Better weapons', 'Faster ways to farm'],
                  ['新的贸易路线', '万物背后的合一', '更好的武器', '更快的耕作方式'],
                ],
                1,
              ),
              q(
                ['What do the earliest wisdom teachings show us?', '最早的智慧教导告诉了我们什么？'],
                [
                  ['Wisdom was invented recently', 'Only one civilization sought wisdom', 'The longing for wisdom is as old as humanity', 'Ancient people had no ethics'],
                  ['智慧是近代才被发明的', '只有一个文明追寻过智慧', '对智慧的渴望与人类本身一样古老', '古代人没有伦理观念'],
                ],
                2,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Roots', '第二关 · 更深的根源'],
            [
              "Look closer at the texts themselves. The Instruction of Ptahhotep counselled listening over speaking: \"Do not be proud of your knowledge, but take counsel with the ignorant as with the learned.\" Hammurabi's Code paired harsh penalties with a striking claim of purpose — that even severe law existed \"so that the strong might not oppress the weak.\" And the Rigveda's Hymn of Creation dared to ask whether even the gods know how the universe began. Written law and written wisdom had to reinforce each other: a ruler bound by nothing but power could never sustain the order Ma'at promised.",
              '再深入看看这些文本本身。普塔霍特普的教诲劝人多听少说："不要因你的知识而骄傲，无论对无知者还是博学者，都应虚心求教。"《汉谟拉比法典》在严厉的刑罚之外，也提出了一个引人深思的立法目的 — 即便是严刑峻法，也是"为了使强者不能欺压弱者"。而《梨俱吠陀》的"创世颂"，竟敢发问：连神明自己，是否也不知道宇宙是如何开始的。成文的法律与成文的智慧必须彼此支撑 — 一位除了权力别无约束的统治者，永远无法维系玛阿特所承诺的秩序。',
            ],
            [
              [
                'Hammurabi (Babylonian king & lawgiver)',
                'The unnamed poet of the Rigveda\'s Hymn of Creation',
              ],
              ['汉谟拉比（巴比伦国王与立法者）', '《梨俱吠陀》创世颂的无名诗人'],
            ],
            [
              [
                "Ptahhotep: seek counsel from the ignorant as much as from the learned",
                "Hammurabi's Code claimed its purpose was so the strong might not oppress the weak",
                'The Rigveda openly questioned its own certainty about creation',
              ],
              ['普塔霍特普：无论对无知者还是博学者，都应虚心求教', '《汉谟拉比法典》宣称其目的是使强者不能欺压弱者', '《梨俱吠陀》公开质疑了自己对创世的确定性'],
            ],
            [["Ptahhotep's maxims", 'Codified law', 'Sacred doubt'], ['普塔霍特普的箴言', '成文法典', '神圣的疑问']],
            [
              q(
                ["What did Ptahhotep's instruction advise about seeking counsel?", '普塔霍特普的教诲对寻求忠告有何建议？'],
                [
                  ['Only consult the learned', 'Seek it from the ignorant as much as the learned', 'Never ask for advice', 'Only kings may give counsel'],
                  ['只向博学者请教', '无论对无知者还是博学者，都应虚心求教', '从不寻求忠告', '只有君王才能给予忠告'],
                ],
                1,
              ),
              q(
                ["Hammurabi's Code justified harsh law by claiming its purpose was…", '《汉谟拉比法典》以什么理由为其严刑峻法辩护？'],
                [
                  ['To enrich the king', 'So the strong might not oppress the weak', 'To punish foreigners', 'To fund temples'],
                  ['为了充实国王的财富', '使强者不能欺压弱者', '为了惩罚外邦人', '为了资助神庙'],
                ],
                1,
              ),
              q(
                ["What made the Rigveda's Hymn of Creation unusual for its time?", '《梨俱吠陀》创世颂在当时为何显得不寻常？'],
                [
                  ['It named a single all-powerful god', 'It openly questioned whether even the gods knew the answer', 'It was written in prose', 'It banned all questioning'],
                  ['它指名了一位全能的神', '它公开质疑连神明是否也知道答案', '它以散文写成', '它禁止一切质疑'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · The Universal Root', '第三关 · 普世之根'],
            [
              'Across Egypt, Mesopotamia, and India, three unrelated civilizations arrived at a shared insight without contact with one another: that a hidden order underlies visible chaos, and human conduct must align with it or suffer consequence. This is the seed from which every later tradition on this Timeline grows — Confucius\'s Tian 天, Laozi\'s Dao 道, and the Enlightenment\'s natural law are all descendants of this first intuition. Historians of the "Axial Age" note that humanity, on different shores, was already reaching for the same truth before these traditions ever met.',
              '在埃及、美索不达米亚与印度，三个互不相干的文明，各自独立地得出了同一个洞见：可见的混乱之下，藏着一种隐秘的秩序，而人的行为必须与之相合，否则便会招致后果。这正是这条时间线上，日后一切传统所由生长的种子 — 孔子的「天」、老子的「道」，以及启蒙运动的自然法，都是这最初直觉的后裔。研究"轴心时代"的历史学家指出，在这些传统彼此相遇之前，人类早已在不同的岸边，各自摸索着同一个真理。',
            ],
            [
              ["Ptahhotep, Hammurabi, and the Vedic seers, considered together"],
              ['普塔霍特普、汉谟拉比与吠陀圣者，共同来看'],
            ],
            [
              [
                'Independent civilizations discovered the same idea without contact: a hidden order beneath visible chaos',
                "Ma'at, Rita, and Mesopotamian justice are ancestors of Dao, Tian, and natural law",
                'The longing for moral order may be a universal feature of human thought, not one culture\'s invention',
              ],
              ['互不相干的文明，各自独立地发现了同一个理念：可见的混乱之下藏着隐秘的秩序', '玛阿特、梨多与美索不达米亚的正义，都是道、天与自然法的先祖', '对道德秩序的渴望，或许是人类思想的普遍特征，而非某一文化的独有发明'],
            ],
            [['Convergent wisdom', 'the Axial pattern', 'cosmic-moral order'], ['汇聚而成的智慧', '轴心模式', '宇宙-道德秩序']],
            [
              q(
                ["What is remarkable about Ma'at, Rita, and Mesopotamian justice arising independently?", '玛阿特、梨多与美索不达米亚的正义各自独立出现，这有何值得注意之处？'],
                [
                  ['They were spread by trade caravans', 'Civilizations without contact reached a similar insight', 'They were all written in the same language', 'Only Egypt had this idea'],
                  ['它们是由商队传播的', '互不相通的文明各自达成了相近的洞见', '它们都以同一种语言写成', '只有埃及有这个理念'],
                ],
                1,
              ),
              q(
                ['Which later concepts descend from this first intuition of hidden order?', '哪些后来的概念，是这最初"隐秘秩序"直觉的后裔？'],
                [
                  ['Only Chinese philosophy', 'Only Greek philosophy', 'Dao, Tian, and natural law, among others', 'None — they are unrelated'],
                  ['仅有中国哲学', '仅有希腊哲学', '道、天与自然法等概念', '毫无关联'],
                ],
                2,
              ),
              q(
                ['What does the convergence across unconnected civilizations suggest?', '这些互不相干的文明所呈现出的趋同现象，说明了什么？'],
                [
                  ['That one civilization must have secretly copied another', 'That the longing for moral order may be universal to human thought', 'That ancient people could not think independently', 'That written language causes moral ideas'],
                  ['必定是某个文明暗中抄袭了另一个', '对道德秩序的渴望，或许是人类思想中普遍存在的', '古代人无法独立思考', '文字的出现导致了道德观念'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-socrates',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              'In the streets of Athens, Socrates asked questions no one could easily answer: What is justice? What is courage? What is a good life? He wrote nothing, yet changed thought forever. He claimed to know only that he knew nothing — and that honest questioning was the beginning of wisdom. Condemned to death for "corrupting the youth," he calmly accepted the sentence, teaching that it is better to suffer wrong than to do wrong.',
              '在雅典的街头，苏格拉底提出了无人能轻易回答的问题：什么是正义？什么是勇气？什么是美好的人生？他从未写下一字一句，却永远改变了人类的思想。他声称自己唯一知道的，便是自己一无所知 — 而诚实的发问，正是智慧的开端。他因被控"败坏青年"而被判处死刑，却平静地接受了判决，以此教导世人：宁可承受不义，也不可施行不义。',
            ],
            [['Socrates'], ['苏格拉底']],
            [
              [
                '"The unexamined life is not worth living"',
                'True wisdom begins with knowing what you do not know',
                'It is better to suffer injustice than to commit it',
              ],
              ['"未经省察的人生，不值得度过"', '真正的智慧，始于知道自己有什么不知道', '宁可承受不义，也不可施行不义'],
            ],
            [['The Socratic method', 'Intellectual humility', 'Moral integrity'], ['苏格拉底式方法', '智识上的谦逊', '道德上的正直']],
            [
              q(
                ["What was the heart of Socrates' method?", '苏格拉底方法的核心是什么？'],
                [
                  ['Giving long lectures', 'Asking honest questions', 'Writing many books', 'Winning debates at any cost'],
                  ['进行冗长的演讲', '提出诚实的问题', '写下许多著作', '不惜一切代价赢得辩论'],
                ],
                1,
              ),
              q(
                ['Socrates said the beginning of wisdom is…', '苏格拉底说，智慧的开端是……'],
                [
                  ['Wealth', 'Knowing what you do not know', 'Memorizing facts', 'Obeying authority'],
                  ['财富', '知道自己有什么不知道', '记住各种事实', '服从权威'],
                ],
                1,
              ),
              q(
                ['According to Socrates, which is worse?', '根据苏格拉底的说法，哪一种更糟？'],
                [
                  ['Suffering injustice', 'Committing injustice', 'Being poor', 'Being unknown'],
                  ['承受不义', '施行不义', '贫穷', '默默无闻'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              "Socrates' method — the elenchus — worked by cross-examining a claim until its holder's own assumptions contradicted each other, not to humiliate but to clear away false confidence so real inquiry could begin. Unlike the Sophists, who taught rhetoric for a fee, Socrates took no payment, since he did not believe wisdom was a product to sell. At his trial, recorded by his student Plato in the Apology, he refused a plea deal that would have silenced his questioning, saying he would rather die free than live obedient to a lie.",
              '苏格拉底的方法 — 反诘法（elenchus）— 是通过不断追问一项主张，直到持有者自己的假设彼此矛盾，其目的不是羞辱对方，而是清除虚假的自信，好让真正的探究得以展开。与收费教授修辞术的智者派不同，苏格拉底分文不取，因为他不相信智慧是可以出售的商品。在他的学生柏拉图记录的《申辩篇》中，他在受审时拒绝了一项能让他免于一死、却须从此噤声的认罪协议，并说，他宁可自由地死去，也不愿屈从于谎言而活。',
            ],
            [
              ["Plato (his student & biographer)", 'The Sophists (his rivals)'],
              ['柏拉图（他的学生与记录者）', '智者派（他的论敌）'],
            ],
            [
              [
                'The elenchus: cross-examine a claim until its own assumptions contradict each other',
                'Unlike the Sophists, Socrates refused payment for teaching',
                'At his trial, he chose death over abandoning his questioning',
              ],
              ['反诘法：不断追问一项主张，直到其自身的假设彼此矛盾', '与智者派不同，苏格拉底拒绝收取教学的报酬', '在受审时，他选择了死亡，而非放弃发问'],
            ],
            [['Elenchus', 'the Apology', 'philosophical martyrdom'], ['反诘法', '《申辩篇》', '哲学式的殉道']],
            [
              q(
                ['What was the purpose of the Socratic elenchus?', '苏格拉底反诘法的目的是什么？'],
                [
                  ['To humiliate an opponent in public', 'To clear away false confidence, not to humiliate', 'To win a prize for rhetoric', 'To prove Socrates was always right'],
                  ['公开羞辱对方', '清除虚假的自信，而非羞辱他人', '赢得修辞比赛的奖项', '证明苏格拉底永远正确'],
                ],
                1,
              ),
              q(
                ['Why did Socrates refuse to accept payment, unlike the Sophists?', '与智者派不同，苏格拉底为何拒绝收取报酬？'],
                [
                  ['He was independently wealthy', 'He did not believe wisdom was a product to sell', 'The law forbade it', 'He disliked his students'],
                  ['他本身就很富有', '他不相信智慧是可以出售的商品', '法律禁止这样做', '他不喜欢自己的学生'],
                ],
                1,
              ),
              q(
                ['At his trial, what did Socrates choose?', '在受审时，苏格拉底做出了怎样的选择？'],
                [
                  ['To flee Athens', 'Death, rather than abandon his questioning', 'To recant everything he taught', 'To bribe the jury'],
                  ['逃离雅典', '选择死亡，而非放弃发问', '收回自己所教导的一切', '贿赂陪审团'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'Socrates left no writings, yet his death became philosophy\'s founding myth: that the examined life is worth more than mere survival. His question "How should one live?" separated ethics from mere custom — asking not "what do we do here" but "what is truly good" — a distinction every later moral philosopher, from Confucius\'s contemporaries to Kant, would inherit in their own way. His confessed ignorance remains a harder discipline to sustain than any of his answers.',
              '苏格拉底未曾留下任何著作，然而他的死，却成为了哲学的立教神话：经过省察的人生，胜过单纯的存活。他所提出的问题"人应当如何生活？"，将伦理学从单纯的风俗习惯中分离出来 — 问的不是"这里的人都怎么做"，而是"什么才是真正的善" — 这一区分，被日后每一位道德哲学家所继承，从孔子的同时代人，到康德，各自以自己的方式承接了这一遗产。他所坦承的无知，至今仍比他给出的任何答案，都更难以真正持守。',
            ],
            [['Socrates (his legacy, considered as a whole)'], ['苏格拉底（就其整体遗产而言）']],
            [
              [
                "Socrates' unanswered question 'How should one live?' founded ethics as separate from mere custom",
                'His death made the examined life, not survival, philosophy\'s highest value',
                'Confessed ignorance is harder to sustain than any confident answer',
              ],
              ['苏格拉底那未获解答的问题"人应当如何生活？"，让伦理学从单纯的风俗中独立出来', '他的死，让"经过省察的人生"而非单纯的存活，成为哲学的最高价值', '坦承的无知，比任何自信的答案都更难以持守'],
            ],
            [['ethics vs. custom', 'Socratic humility', 'philosophy as a way of life'], ['伦理 vs. 风俗习惯', '苏格拉底式的谦逊', '作为生活方式的哲学']],
            [
              q(
                ['What did Socrates\' question "How should one live?" separate from mere custom?', '苏格拉底"人应当如何生活？"这一问题，将什么从单纯的风俗习惯中区分了出来？'],
                [
                  ['Politics', 'Ethics — true goodness, not just local custom', 'Mathematics', 'Poetry'],
                  ['政治', '伦理 — 真正的善，而非仅仅是当地的习俗', '数学', '诗歌'],
                ],
                1,
              ),
              q(
                ['Why is Socrates\' "knowing that he knew nothing" still considered difficult today?', '为何苏格拉底"深知自己一无所知"，在今日看来仍是困难的？'],
                [
                  ['Because confessed ignorance is harder to sustain than confident certainty', 'Because it requires great wealth', 'Because it was made illegal', 'It is not actually difficult'],
                  ['因为坦承无知，比自信的确定更难持守', '因为这需要巨大的财富', '因为这已被立法禁止', '这其实并不困难'],
                ],
                0,
              ),
              q(
                ["Socrates' death is remembered as founding what idea?", '苏格拉底之死，被视为奠定了怎样的理念？'],
                [
                  ['That philosophers should avoid politics', 'That the examined life matters more than survival', 'That democracy always fails', 'That teaching should always be free'],
                  ['哲学家应当远离政治', '经过省察的人生，比单纯的存活更重要', '民主制度终将失败', '教学永远都应该是免费的'],
                ],
                1,
              ),
            ],
          ),
        ],
      },
      {
        id: 'greek-plato-aristotle',
        title: localized('Plato, Aristotle & the Good Life', '柏拉图、亚里士多德与美好人生'),
        years: localized('c. 428–322 BCE', '约公元前428至322年'),
        emoji: '📖',
        cardId: 'card-aristotle',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              "Socrates' student Plato imagined a just society guided by wisdom, and taught that beyond the shifting world of appearances lie eternal ideals — above all, the Good. His student Aristotle brought philosophy down to earth: happiness (eudaimonia) is a life of virtue, and virtue is a habit built by practice. Courage, generosity, and honesty each lie at a golden mean between two extremes. Together they shaped how the world thinks about ethics, character, and community.",
              '苏格拉底的学生柏拉图构想了一个由智慧引导的正义社会，并教导说，在这个流变不居的表象世界之外，存在着永恒的理型 — 其中最高的，便是"善"本身。他的学生亚里士多德则把哲学带回了人间：幸福（eudaimonia）是一种依德行而活的人生，而德行是通过反复实践养成的习惯。勇气、慷慨与诚实，各自都居于两个极端之间的"中道"。这两位师徒共同塑造了世人对伦理、品格与社群的理解方式。',
            ],
            [['Plato', 'Aristotle'], ['柏拉图', '亚里士多德']],
            [
              [
                'A good society must be guided by wisdom and justice',
                'Happiness is activity of the soul in accordance with virtue',
                'Virtue is a habit: we become just by doing just acts',
              ],
              ['良好的社会，必须由智慧与正义来引导', '幸福，是灵魂依循德行而展现的活动', '德行是一种习惯：我们因行正义之事而成为正义之人'],
            ],
            [
              ['The Form of the Good', 'Eudaimonia (flourishing)', 'The golden mean'],
              ['善的理型', '幸福（人生的兴盛）', '中道'],
            ],
            [
              q(
                ['For Aristotle, virtue is best understood as…', '对亚里士多德而言，德行最好被理解为……'],
                [
                  ['A lucky gift at birth', 'A habit built by practice', 'A set of rules to memorize', 'Something only philosophers have'],
                  ['天生的幸运禀赋', '通过练习养成的习惯', '一套需要背诵的规则', '只有哲学家才拥有的东西'],
                ],
                1,
              ),
              q(
                ['The "golden mean" means virtue lies…', '「中道」意味着德行位于……'],
                [
                  ['In extreme behaviour', 'Between two extremes', 'In wealth', 'In avoiding all action'],
                  ['极端的行为之中', '两个极端之间', '财富之中', '完全不作为之中'],
                ],
                1,
              ),
              q(
                ['What did Aristotle call true happiness or flourishing?', '亚里士多德把真正的幸福或兴盛称为什么？'],
                [['Hedonia', 'Eudaimonia', 'Nirvana', 'Ataraxia'], ['享乐（Hedonia）', '幸福（Eudaimonia）', '涅槃（Nirvana）', '心灵宁静（Ataraxia）']],
                1,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              "Plato's Republic argued that a just society needs philosopher-kings — rulers who love wisdom more than power — and used the Allegory of the Cave to show most people mistake shadows for reality. Aristotle, breaking from his teacher, insisted ideals must be tested against observed life: he catalogued hundreds of constitutions and animal species alike, believing the good is found by studying what actually flourishes, not by pure abstraction. Their disagreement — ideal Forms versus observed nature — set the terms of Western philosophy for two thousand years.",
              '柏拉图的《理想国》主张，一个正义的社会需要"哲学王" — 热爱智慧胜过热爱权力的统治者 — 并以"洞穴寓言"说明，大多数人误把影子当作了真实。亚里士多德则与他的老师分道扬镳，坚持理想必须经受实际生活的检验：他整理了数百种政体与动物物种，相信"善"是通过研究真正兴盛之物而发现的，而非纯粹的抽象思辨。他们之间的分歧 — 理型 vs. 实际观察 — 为往后两千年的西方哲学定下了基调。',
            ],
            [['Plato', 'Aristotle'], ['柏拉图', '亚里士多德']],
            [
              [
                "Plato's Cave: most people mistake shadows for reality",
                'Aristotle tested ideas against observed life, not abstraction alone',
                'Their disagreement (ideal Forms vs. observed nature) shaped two thousand years of philosophy',
              ],
              ['柏拉图的洞穴寓言：大多数人误把影子当作了真实', '亚里士多德以实际的生活来检验理念，而非仅凭抽象思辨', '他们之间的分歧（理型 vs. 实际观察），塑造了两千年的哲学史'],
            ],
            [
              ['The Allegory of the Cave', 'philosopher-kings', 'empirical observation'],
              ['洞穴寓言', '哲学王', '经验观察'],
            ],
            [
              q(
                ["What does Plato's Allegory of the Cave suggest about most people?", '柏拉图的洞穴寓言，对大多数人有何暗示？'],
                [
                  ['They see reality perfectly', 'They mistake shadows for reality', 'They live underground', 'They cannot be educated'],
                  ['他们能够完美地看清真实', '他们误把影子当作了真实', '他们生活在地下', '他们无法被教育'],
                ],
                1,
              ),
              q(
                ["How did Aristotle's approach differ from Plato's?", '亚里士多德的方法与柏拉图有何不同？'],
                [
                  ['He rejected all observation', 'He tested ideas against observed, real life', 'He agreed with Plato in every respect', 'He refused to study politics'],
                  ['他摒弃一切观察', '他以真实、可观察的生活来检验理念', '他在各方面都完全认同柏拉图', '他拒绝研究政治'],
                ],
                1,
              ),
              q(
                ["Plato's Republic argued a just society needs…", '柏拉图的《理想国》主张，一个正义的社会需要……'],
                [
                  ['Rulers who love wisdom more than power', 'The largest possible army', 'No laws at all', 'Rule by the wealthiest citizens'],
                  ['热爱智慧胜过热爱权力的统治者', '尽可能庞大的军队', '完全没有法律', '由最富有的公民统治'],
                ],
                0,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'Aristotle\'s golden mean is often misread as "moderation in all things," but he meant something sharper: courage is not a compromise between cowardice and recklessness, it is its own virtue, correctly calibrated to a specific situation — what counts as brave differs for a soldier and a nurse. Eudaimonia, likewise, is not a feeling but an activity sustained over a whole life, which is why Aristotle said "one swallow does not make a summer." Their combined legacy still divides ethics today: those who ask "what kind of person should I become?" (virtue ethics) versus "what are the eternal principles?" (a Platonic echo in later natural-law thinking).',
              '亚里士多德的"中道"，常被误解为"凡事都应适中"，但他的意思其实更为精细：勇气并不是"怯懦"与"鲁莽"之间的折中，它本身就是一种德行，需要针对具体情境校准得恰到好处 — 对士兵而言的勇敢，与对护士而言的勇敢，标准并不相同。同样，幸福（eudaimonia）不是一时的感受，而是贯穿一生的持续活动，这正是亚里士多德所说"一只燕子不能造就夏天"的含义。他们二人共同的遗产，至今仍在划分着伦理学的两大路径：一种问"我应当成为怎样的人？"（德行伦理学），另一种问"永恒的原则是什么？"（这在日后的自然法思想中，仍回响着柏拉图的余音）。',
            ],
            [['Plato and Aristotle, considered together'], ['柏拉图与亚里士多德，合而观之']],
            [
              [
                'The golden mean is not "always moderate" — it is the correct response calibrated to each situation',
                'Eudaimonia is an activity sustained over a life, not a passing feeling',
                'Virtue ethics ("what kind of person?") and principle-based ethics ("what are the eternal rules?") both descend from this era',
              ],
              ['中道并非"永远选择折中"，而是针对具体情境校准出的正确回应', '幸福是贯穿一生的持续活动，而非一时的感受', '德行伦理学（"我应当成为怎样的人？"）与原则伦理学（"永恒的规则是什么？"），皆源自这个时代'],
            ],
            [
              ['situational virtue', 'eudaimonia as activity', 'virtue ethics'],
              ['因境而异的德行', '作为活动的幸福', '德行伦理学'],
            ],
            [
              q(
                ['Why is the golden mean not simply "always choose moderation"?', '为何"中道"并不只是"永远选择折中"？'],
                [
                  ['Because moderation is always cowardly', 'Because the right response is calibrated to the specific situation', 'Because Aristotle rejected the idea entirely', 'Because it only applies to money'],
                  ['因为折中总是怯懦的表现', '因为正确的回应，是针对具体情境校准而来的', '因为亚里士多德彻底否定了这个观念', '因为它只适用于金钱'],
                ],
                1,
              ),
              q(
                ['What did Aristotle mean by saying "one swallow does not make a summer"?', '亚里士多德说"一燕不成夏"，是什么意思？'],
                [
                  ['Birds are unreliable', 'Eudaimonia requires a sustained life of activity, not a single good moment', 'Summer is the best season for philosophy', 'Happiness cannot be studied'],
                  ['鸟类是不可靠的', '幸福需要贯穿一生的持续活动，而非单一美好的片刻', '夏天是研究哲学最好的季节', '幸福无法被研究'],
                ],
                1,
              ),
              q(
                ['Which two branches of ethics trace back to Aristotle and Plato respectively?', '哪两大伦理学路径，分别可追溯至亚里士多德与柏拉图？'],
                [
                  ['Utilitarianism and nihilism', 'Virtue ethics and principle/ideal-based ethics', 'Legal positivism and anarchism', 'Stoicism and hedonism'],
                  ['功利主义与虚无主义', '德行伦理学与原则/理型伦理学', '法律实证主义与无政府主义', '斯多葛主义与享乐主义'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-confucius',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              'In an age of war and disorder, Confucius (Kongzi 孔子) taught that a harmonious world begins with the cultivation of each person. His central virtue was ren 仁 — humaneness, the deep care of one person for another. Through li 礼 (ritual propriety), filial devotion, and lifelong learning, anyone can become a junzi 君子, an exemplary person. His vision reached its height in the ideal of Datong 大同, the Great Harmony: a world where the world is shared by all (天下为公), the old are cared for, the young are nurtured, and trust prevails.',
              '在一个战乱纷争的时代，孔子教导说，和谐的世界，始于每一个人的自我修养。他所提出的核心德行是「仁」— 人与人之间深切的关怀。通过「礼」（合宜的礼节）、孝道，以及终身的学习，任何人都可以成为「君子」，一个修养有成的典范之人。他的愿景，最终凝聚为「大同」的理想：一个天下为公、老有所终、幼有所长、人人守信的世界。',
            ],
            [['Confucius (Kongzi 孔子)'], ['孔子']],
            [
              [
                '"Do not impose on others what you yourself do not desire" (己所不欲，勿施于人)',
                'Cultivate yourself → regulate the family → order the state → bring peace to the world',
                'The Great Harmony 大同: a world shared by all, where all people are cared for',
              ],
              ['"己所不欲，勿施于人"', '修身 → 齐家 → 治国 → 平天下', '大同：一个天下为公、人人皆得其养的世界'],
            ],
            [
              ['Ren 仁 (humaneness)', 'Li 礼 (propriety)', 'Junzi 君子 (exemplary person)', 'Datong 大同 (Great Harmony)'],
              ['仁（人道关怀）', '礼（合宜的礼节）', '君子（典范之人）', '大同（大同理想）'],
            ],
            [
              q(
                ['What is ren 仁, the central virtue of Confucius?', '「仁」，孔子思想的核心德行，是什么？'],
                [
                  ['Military skill', 'Humaneness — deep care for others', 'Cleverness in argument', 'Strict obedience'],
                  ['军事技能', '人道关怀 — 对他人深切的关怀', '辩论上的机敏', '严格的服从'],
                ],
                1,
              ),
              q(
                ['According to Confucius, a harmonious world begins with…', '根据孔子的说法，和谐的世界始于……'],
                [
                  ['Strong laws', 'Cultivating oneself', 'Great wealth', 'Powerful armies'],
                  ['严厉的法律', '自我修养', '巨大的财富', '强大的军队'],
                ],
                1,
              ),
              q(
                ['What does Datong 大同 describe?', '「大同」描述的是什么？'],
                [
                  ['A world of Great Harmony shared by all', 'A single world government', 'A famous palace', 'A style of calligraphy'],
                  ['一个天下为公的大同世界', '单一的世界政府', '一座著名的宫殿', '一种书法风格'],
                ],
                0,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              'Confucius lived through the disorder before the Warring States and believed it came from names no longer matching realities — a ruler who did not rule justly was, in his view, no true ruler at all. This he called zhengming 正名, "the rectification of names." He organized virtue into five key relationships — ruler-subject, parent-child, husband-wife, elder-younger sibling, friend-friend — each demanding a different, reciprocal duty: hierarchy, in his vision, obligated the higher party as much as the lower.',
              '孔子生活在"战国"前夕那段纷乱的年代，他认为，混乱的根源，在于名分不再与实际相符 — 在他看来，一位不能行仁政的统治者，根本称不上真正的统治者。他称此为「正名」。他将德行组织为五种关键的人伦关系 — 君臣、父子、夫妻、兄弟（长幼），以及朋友 — 每一种关系都要求不同的、相互对应的责任：在他的构想中，等级并非单向的服从，而是位居其上者同样负有责任。',
            ],
            [['Confucius (Kongzi 孔子)'], ['孔子']],
            [
              [
                'Zhengming 正名: "rectification of names" — words and titles must match reality',
                'The Five Relationships bind reciprocal duties, not one-way obedience',
                'A ruler who does not rule justly forfeits the name of ruler',
              ],
              ['正名：名分与称谓，必须与实际相符', '五伦所约束的是相互的责任，而非单向的服从', '不行仁政的统治者，也就失去了"统治者"这个名分'],
            ],
            [
              ['Zhengming 正名 (rectification of names)', 'Wulun 五伦 (Five Relationships)', 'reciprocal duty'],
              ['正名', '五伦', '相互的责任'],
            ],
            [
              q(
                ['What did Confucius mean by "rectification of names"?', '孔子所说的「正名」是什么意思？'],
                [
                  ['That everyone should change their birth name', 'That titles and roles must actually match how a person behaves', 'That only kings may be named in history', 'That names should be written in classical script'],
                  ['每个人都应改换自己的本名', '名分与角色，必须真正与其行为相符', '只有君王才有资格被载入史册', '姓名应以古体文字书写'],
                ],
                1,
              ),
              q(
                ['In Confucius\'s Five Relationships, duty flows…', '在孔子的五伦中，责任是……'],
                [
                  ['Only from the lower party to the higher', 'Both ways — the higher party owes duty too', 'Only within the family', 'Only between strangers'],
                  ['仅由下位者流向上位者', '双向的 — 上位者同样负有责任', '仅存在于家庭之内', '仅存在于陌生人之间'],
                ],
                1,
              ),
              q(
                ['According to zhengming, a ruler who governs unjustly…', '根据"正名"的观点，一位施行不义之政的统治者……'],
                [
                  ['Gains even more authority', 'Forfeits the very name of "ruler"', 'Becomes a junzi automatically', 'Is protected by ritual propriety'],
                  ['获得了更多的权威', '也就失去了"统治者"这个名分', '自动成为君子', '会受到礼的保护'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'Confucius\'s Datong 大同 vision, recorded in the Book of Rites (Liji 礼记), describes a realistic first stage called xiaokang 小康 ("Small Tranquility") — a well-ordered, family-centred society — before the far harder ideal of Datong, where "the world belongs to all" and even a stranger\'s elderly parents and children are cared for as one\'s own. Confucius never claimed this was easy or near; he offered it as the standard by which every partial reform should be judged — a horizon rather than a destination, precisely how this app uses it.',
              '孔子的「大同」理想，记载于《礼记》之中，描述了一个更为现实的初阶 —「小康」— 一个秩序井然、以家庭为核心的社会 — 而在此之上，才是更为艰难的「大同」理想："天下为公"，甚至连陌生人的父母子女，也被当作自己的亲人般照料。孔子从未宣称这是容易或近在眼前的；他将其作为一个标准，用以衡量每一次局部的改革 — 一个地平线，而非一个终点，这正是本应用所使用这个理想的方式。',
            ],
            [['Confucius (Kongzi 孔子)'], ['孔子']],
            [
              [
                'Xiaokang 小康 (Small Tranquility) is the realistic first stage; Datong is the far horizon beyond it',
                "In Datong, even strangers' parents and children are cared for as one's own",
                'Confucius offered Datong as a standard for judging reform, not a place to simply arrive',
              ],
              ['小康是更为现实的初阶；大同则是其上更为遥远的地平线', '在大同的理想中，连陌生人的父母子女，也被当作自己的亲人般照料', '孔子提出大同，是作为衡量改革的标准，而非一个可以轻易抵达之处'],
            ],
            [
              ['Xiaokang 小康', 'the Book of Rites (Liji 礼记)', 'Datong as horizon, not destination'],
              ['小康', '《礼记》', '作为地平线而非终点的大同'],
            ],
            [
              q(
                ['What is Xiaokang 小康 in relation to Datong?', '「小康」与「大同」之间是什么关系？'],
                [
                  ['They are the same thing', 'A realistic first stage on the way toward it', 'A rejection of the Datong ideal', 'A term for foreign nations'],
                  ['两者是同一回事', '通往大同途中，一个更为现实的初阶', '对大同理想的否定', '指称外邦的用语'],
                ],
                1,
              ),
              q(
                ["In the Datong ideal, how are strangers' parents and children treated?", '在大同的理想中，陌生人的父母子女会受到怎样的对待？'],
                [
                  ['Ignored, since family comes first', "Cared for as if they were one's own", 'Sent to state institutions', 'Left to fend for themselves'],
                  ['被忽视，因为家人优先', '被当作自己的亲人般照料', '被送往国家机构', '任其自生自灭'],
                ],
                1,
              ),
              q(
                ['How did Confucius intend the Datong ideal to function?', '孔子希望大同理想发挥怎样的作用？'],
                [
                  ['As a standard to judge reforms by, not a place expected to be fully reached', 'As a literal government policy to enact immediately', 'As a myth with no practical use', 'As a description of his own era'],
                  ['作为衡量改革的标准，而非一个预期能完全抵达之处', '作为可以立即施行的具体政策', '作为一个毫无实际用途的神话', '作为对他自己所处时代的描述'],
                ],
                0,
              ),
            ],
          ),
        ],
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
        cardId: 'card-laozi',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              "The Daodejing 道德经, attributed to the sage Laozi 老子, teaches that behind all things flows the Dao 道 — the Way. Water is its image: soft yet overcoming the hard, always seeking the low place, nourishing all without contending. Laozi taught wu wei 无为 — effortless action that does not force — and prized simplicity, humility, and contentment. Where Confucius perfected human relationships, Laozi reminded humanity to stay rooted in nature's quiet rhythm.",
              '相传由圣者老子所著的《道德经》教导说，万物的背后，流淌着「道」。水，是道的意象：柔弱却能胜过刚强，总是趋向低处，滋养万物而不与之相争。老子教导「无为」— 不强求的、顺其自然的行动 — 并珍视简朴、谦逊与知足。若说孔子完善了人与人之间的关系，老子则提醒人类，要扎根于自然那静默的节律之中。',
            ],
            [['Laozi 老子', 'Zhuangzi 庄子'], ['老子', '庄子']],
            [
              [
                '"The highest good is like water" (上善若水)',
                'Act without forcing (wu wei 无为); great results come without contention',
                '"A journey of a thousand miles begins with a single step" (千里之行，始于足下)',
              ],
              ['"上善若水"', '无为而无不为；伟大的成就，来自不与人相争', '"千里之行，始于足下"'],
            ],
            [
              ['Dao 道 (the Way)', 'Wu wei 无为', 'Ziran 自然 (naturalness)', 'Simplicity'],
              ['道', '无为', '自然', '简朴'],
            ],
            [
              q(
                ['Why did Laozi admire water?', '老子为何欣赏水？'],
                [
                  ['It is soft yet overcomes the hard, and nourishes without contending', 'It is powerful and destructive', 'It is rare and precious', 'It always moves upward'],
                  ['它柔弱却能胜过刚强，滋养万物而不相争', '它强大而具有破坏力', '它稀有而珍贵', '它总是向上流动'],
                ],
                0,
              ),
              q(
                ['Wu wei 无为 is best translated as…', '「无为」最恰当的理解是……'],
                [
                  ['Doing nothing at all', 'Effortless, unforced action', 'Working extremely hard', 'Strict discipline'],
                  ['完全什么都不做', '不强求、顺其自然的行动', '极其努力地工作', '严格的纪律'],
                ],
                1,
              ),
              q(
                ['A journey of a thousand miles begins with…', '千里之行，始于……'],
                [['A great map', 'A single step', 'A fast horse', 'A large supply'], ['一张精良的地图', '一步', '一匹快马', '充足的物资']],
                1,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              'The Daodejing opens by warning that "the Dao that can be spoken is not the eternal Dao" — language itself distorts the very thing it tries to name, a humility that logic-centred philosophy rarely shares. Laozi\'s political teaching was equally radical for its age: "govern a large state as you would cook a small fish" — do not overturn it with too much handling. Zhuangzi, his great successor, extended this with the butterfly dream, questioning whether we can even be certain we are not dreaming our whole waking lives.',
              '《道德经》开篇便警示："道可道，非常道"— 语言本身，就会扭曲它试图命名的那个东西，这是一种以逻辑为中心的哲学，很少具备的谦逊。老子的政治教导，在当时同样是激进的："治大国若烹小鲜"— 不要过度插手，以免翻覆。他伟大的继承者庄子，则以"庄周梦蝶"进一步延伸了这一点，质疑我们是否能够确定，自己整个清醒的人生，不是一场梦境。',
            ],
            [['Laozi 老子', 'Zhuangzi 庄子'], ['老子', '庄子']],
            [
              [
                "'The Dao that can be spoken is not the eternal Dao' — language distorts what it names",
                "'Govern a large state as you would cook a small fish' — do not over-handle it",
                "Zhuangzi's butterfly dream questioned the certainty of waking reality itself",
              ],
              ['"道可道，非常道"— 语言会扭曲它所命名的东西', '"治大国若烹小鲜"— 不要过度插手', '庄周梦蝶，质疑了清醒现实本身的确定性'],
            ],
            [
              ['the ineffable Dao', 'light-touch governance', "Zhuangzi's butterfly dream"],
              ['不可言说的道', '轻手治理', '庄周梦蝶'],
            ],
            [
              q(
                ["What does the Daodejing's opening line suggest about language?", '《道德经》的开篇之语，对语言有何暗示？'],
                [
                  ['That it perfectly captures the Dao', 'That it distorts the very Dao it tries to describe', 'That it should never be used', 'That only poetry can be trusted'],
                  ['它能完美捕捉道', '它会扭曲它试图描述的道本身', '它永远不应被使用', '只有诗歌才可信'],
                ],
                1,
              ),
              q(
                ['"Govern a large state as you would cook a small fish" teaches…', '"治大国若烹小鲜"教导的是……'],
                [
                  ['Cook every meal slowly', 'Avoid over-handling; light-touch governance', 'Only experts should govern', 'Small states are weaker'],
                  ['每一餐都应慢慢烹煮', '避免过度插手；轻手治理', '只有专家才能治理国家', '小国比较弱小'],
                ],
                1,
              ),
              q(
                ["What did Zhuangzi's butterfly dream question?", '庄周梦蝶质疑了什么？'],
                [
                  ['Whether butterflies can dream', 'Whether we can be certain we are not dreaming our whole lives', 'Whether insects have souls', 'Whether dreams predict the future'],
                  ['蝴蝶是否会做梦', '我们是否能确定自己整个人生不是一场梦', '昆虫是否有灵魂', '梦境是否能预示未来'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              "Wu wei is often mistranslated as passivity, but classical commentators describe it as acting so completely in accordance with a situation's own grain that no excess motion is needed — like Zhuangzi's Cook Ding, a butcher whose blade never dulls because he cuts along the natural spaces already present in the joint. This 'effortless mastery' reframes Daoist naturalness (ziran 自然) not as inaction but as the highest form of skill: so practised it looks as though nothing is being done at all.",
              '「无为」常被误译为消极被动，但古代的注疏家将它描述为：如此彻底地顺应一件事物本有的纹理，以至于不需要任何多余的动作 — 就像庄子笔下的庖丁，他的刀刃从不磨损，因为他总是沿着关节中本就存在的空隙下刀。这种"毫不费力的精通"，重新定义了道家的"自然" — 它不是不作为，而是技艺的最高形式：如此娴熟，以至于看起来仿佛什么都没有做。',
            ],
            [['Laozi 老子', 'Zhuangzi 庄子 (Cook Ding)'], ['老子', '庄子（庖丁）']],
            [
              [
                'Wu wei is not passivity — it is acting so precisely with a situation\'s grain that no excess is needed',
                "Cook Ding's knife (Zhuangzi) never dulls because it follows the natural spaces already there",
                'Ziran 自然 (naturalness) is mastery so complete it looks like nothing is being done',
              ],
              ['无为不是消极被动 — 而是如此精准地顺应事物的纹理，以至于不需要多余的动作', '庖丁的刀从不磨损，因为它顺着本就存在的空隙而行', '自然，是如此彻底的精通，以至于看似什么都没有做'],
            ],
            [
              ['wu wei as mastery, not passivity', "Cook Ding's knife", 'effortless skill'],
              ['作为精通而非消极的无为', '庖丁之刀', '毫不费力的技艺'],
            ],
            [
              q(
                ['What is the common misunderstanding of wu wei?', '对"无为"最常见的误解是什么？'],
                [
                  ['That it requires great physical strength', 'That it means passivity or doing nothing', 'That it only applies to rulers', 'That it is a form of magic'],
                  ['认为它需要极大的体力', '认为它意味着消极被动、什么都不做', '认为它只适用于统治者', '认为它是一种法术'],
                ],
                1,
              ),
              q(
                ["What does the parable of Cook Ding's knife illustrate?", '庖丁解牛的寓言说明了什么？'],
                [
                  ['That sharp tools are more important than skill', 'Skill so complete it follows what is already there, effortlessly', 'That butchering is a low form of work', 'That practice eventually damages any tool'],
                  ['锋利的工具比技艺更重要', '如此彻底的技艺，能毫不费力地顺应本就存在的东西', '屠宰是一种低下的工作', '反复练习终将损坏任何工具'],
                ],
                1,
              ),
              q(
                ['How should ziran 自然 (naturalness) best be understood?', '「自然」最恰当的理解方式是什么？'],
                [
                  ['As mere laziness', 'As mastery so refined it appears effortless, not as mere inaction', 'As a rejection of all skill', 'As something only animals possess'],
                  ['仅仅是懒惰', '如此精炼的精通，以至看似毫不费力，而非单纯的不作为', '对一切技艺的否定', '只有动物才拥有的东西'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-mencius',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              'Mencius (Mengzi 孟子), the greatest heir of Confucius, taught that human nature is originally good. Anyone who sees a child about to fall into a well feels alarm and compassion — proof, he said, that the seeds of virtue are born in every heart. These "four sprouts" — compassion, shame, courtesy, and the sense of right and wrong — grow into full virtues when nourished, like grain ripening in a well-tended field. A ruler, he insisted, earns legitimacy only by caring for the people.',
              '孟子，孔子思想最伟大的继承者，教导说人性本善。任何人看见一个孩子即将跌入井中，都会感到惊惧与恻隐之心 — 他说，这正证明了德行的种子，天生存在于每一颗心中。这"四端"— 恻隐之心、羞恶之心、辞让之心，以及是非之心 — 若得到滋养，便会成长为完满的德行，如同稻谷在悉心照料的田地中成熟。他坚持认为，统治者唯有关爱百姓，才能获得统治的正当性。',
            ],
            [['Mencius (Mengzi 孟子)'], ['孟子']],
            [
              [
                'Human nature contains the seeds of goodness — cultivate them daily',
                'The four sprouts: compassion, shame, courtesy, and moral discernment',
                'The people are the most important; a ruler must serve their welfare',
              ],
              ['人性中蕴含着善的种子 — 需要每日加以培育', '四端：恻隐、羞恶、辞让，与是非之心', '民为贵；统治者必须服务于百姓的福祉'],
            ],
            [
              ['The four sprouts (四端)', 'Innate goodness', 'Benevolent government (仁政)'],
              ['四端', '性善论', '仁政'],
            ],
            [
              q(
                ['What did Mencius believe about human nature?', '孟子对人性有什么看法？'],
                [['It is originally evil', 'It is originally good', 'It is a blank slate', 'It cannot change'], ['人性本恶', '人性本善', '人性是一张白纸', '人性无法改变']],
                1,
              ),
              q(
                ['The "four sprouts" are seeds of…', '「四端」是什么的种子？'],
                [['Wealth', 'Virtue', 'Knowledge', 'Power'], ['财富', '德行', '知识', '权力']],
                1,
              ),
              q(
                ['Mencius used the child at the well to show that…', '孟子用孩童将跌入井中的例子，是为了说明……'],
                [
                  ['People are careless', 'Compassion arises naturally in the human heart', 'Wells are dangerous', 'Children need supervision'],
                  ['人们粗心大意', '恻隐之心在人心中自然而生', '水井很危险', '孩童需要看管'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              'Mencius debated a rival philosopher, Gaozi, who compared human nature to swirling water — it flows wherever channelled, neither good nor bad by nature. Mencius countered that while water can be forced uphill, it is not water\'s nature to rise; likewise a person forced to do evil is not proof that evil is our nature, only that our natural goodness was dammed or diverted. He also taught hengchan 恒产 — a "constant livelihood": a ruler who fails to provide for the people\'s basic security cannot then blame them for lacking virtue.',
              '孟子曾与一位论敌 — 告子 — 展开辩论，告子将人性比作回旋的水流 — 引向哪里，便流向哪里，本身无所谓善恶。孟子反驳说，虽然水可以被强行引向高处，但这并非水的本性；同样，一个被迫作恶的人，并不能证明恶是人的本性，只能说明他本有的善性，被堵塞或引偏了。他还提出了「恒产」的观念：一位不能保障百姓基本生计的统治者，便没有资格反过来指责他们缺乏德行。',
            ],
            [['Mencius (Mengzi 孟子)', 'Gaozi (his philosophical rival)'], ['孟子', '告子（他的论敌）']],
            [
              [
                "Against Gaozi: water forced uphill is not proof it is water's nature to rise — likewise forced evil is not proof of evil nature",
                'Hengchan 恒产: people need a secure livelihood before they can be expected to cultivate virtue',
                'A ruler who leaves people without means has no right to blame their lack of virtue',
              ],
              ['反驳告子：水被迫流向高处，并不证明这是水的本性 — 被迫作恶同样不能证明恶是人的本性', '恒产：人们需要先有稳定的生计，才能被期待去培育德行', '一位让百姓无以维生的统治者，没有资格反过来责怪他们缺乏德行'],
            ],
            [
              ["Gaozi's debate", 'Hengchan 恒产 (constant livelihood)', 'virtue requires security'],
              ['与告子的辩论', '恒产', '德行需要以生计为基础'],
            ],
            [
              q(
                ["In Mencius's debate with Gaozi, what did the water analogy defend?", '在孟子与告子的辩论中，水的比喻捍卫了什么观点？'],
                [
                  ['That human nature has no fixed direction', 'That goodness is our nature even if it can be forced astray', 'That water is more powerful than virtue', 'That Gaozi was entirely correct'],
                  ['人性没有固定的方向', '善是人的本性，即便它可能被迫偏离', '水比德行更有力量', '告子完全正确'],
                ],
                1,
              ),
              q(
                ['What is hengchan 恒产?', '「恒产」是什么？'],
                [['A royal title', 'A secure, constant livelihood', 'A religious ritual', 'A type of tax'], ['一种王室头衔', '稳定、恒常的生计', '一种宗教仪式', '一种税收']],
                1,
              ),
              q(
                ['According to Mencius, before expecting virtue from the people, a ruler must first…', '根据孟子的说法，在期待百姓具备德行之前，统治者必须先……'],
                [
                  ['Build grand monuments', 'Secure their basic livelihood', 'Write new laws', 'Raise taxes'],
                  ['建造宏伟的纪念建筑', '保障他们基本的生计', '制定新的法律', '提高税收'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'Mencius\'s "four sprouts" are not full virtues but potentials requiring cultivation — without nourishment they wither, as in his image of Ox Mountain: once green, it was stripped bare by careless cutting and grazing until it looked "naturally" barren. This is Mencius\'s warning: original goodness can be so neglected it disappears from view — but its capacity to regrow, given the chance, never disappears entirely.',
              '孟子的"四端"并非已然完满的德行，而是需要培育的潜能 — 若得不到滋养，便会枯萎，正如他所举的"牛山"之喻：牛山本是苍翠的，却因不断的砍伐与放牧而变得光秃，以至于看起来"天生"就是贫瘠的。这正是孟子的警示：本有的善，若长期遭到忽视，便可能从视野中消失 — 但只要有机会，它重新生长的能力，永远不会彻底消失。',
            ],
            [['Mencius (Mengzi 孟子)'], ['孟子']],
            [
              [
                "Ox Mountain: once lush, stripped bare by neglect until it looks 'naturally' barren — a warning that virtue can be lost from view, not from possibility",
                'The four sprouts are potentials, not finished virtues — Mencius agrees that nature alone is not enough',
                'The capacity to regrow goodness never fully disappears, however neglected',
              ],
              ['牛山：本是苍翠，却因忽视而变得光秃，看似"天生"贫瘠 — 警示德行可能从视野中消失，却不会从可能性中消失', '四端只是潜能，而非已完满的德行 — 光有天性是不够的', '无论受到怎样的忽视，重新生长善的能力，永远不会彻底消失'],
            ],
            [
              ['Ox Mountain parable', 'sprouts vs. finished virtue', 'the persistence of the capacity for good'],
              ['牛山之喻', '四端 vs. 已完满的德行', '向善能力的恒久存续'],
            ],
            [
              q(
                ['What does the parable of Ox Mountain warn against?', '牛山之喻警示的是什么？'],
                [
                  ['That mountains cannot be climbed', 'That neglect can make original goodness disappear from view', 'That farming is always destructive', 'That trees grow too slowly to matter'],
                  ['山峰无法被攀登', '忽视可能使本有的善从视野中消失', '农耕总是带有破坏性', '树木生长得太慢，因而无关紧要'],
                ],
                1,
              ),
              q(
                ["How are Mencius's 'four sprouts' best understood?", '孟子的"四端"最恰当的理解方式是什么？'],
                [
                  ['As potentials that require cultivation, not finished virtues already complete', 'As four separate gods', 'As a legal code', 'As something only sages are born with'],
                  ['作为需要培育的潜能，而非已然完满的德行', '作为四位不同的神明', '作为一部法典', '作为只有圣人才天生具备的东西'],
                ],
                0,
              ),
              q(
                ['According to Mencius, even after severe neglect, the capacity for goodness…', '根据孟子的说法，即便经历了严重的忽视，向善的能力……'],
                [
                  ['Is permanently destroyed', 'Never fully disappears; it can still regrow given the chance', 'Transfers to someone else', 'Only returns through punishment'],
                  ['被永久摧毁', '永远不会彻底消失；只要有机会仍能重新生长', '会转移到别人身上', '只能通过惩罚才能恢复'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-buddha',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              'Siddhartha Gautama left a life of palace luxury to seek the cause of suffering. After years of searching he awoke beneath the Bodhi tree and became the Buddha — "the awakened one." He taught the Four Noble Truths: suffering exists, it arises from craving, it can cease, and there is a path to its ceasing — the Eightfold Path of right understanding, intention, speech, action, livelihood, effort, mindfulness, and concentration. His way is a Middle Way between indulgence and harsh denial, walked with compassion (karuna) and loving-kindness (metta) for all beings.',
              '悉达多·乔达摩舍弃了宫廷中奢华的生活，去探寻苦的根源。历经多年的寻觅，他在菩提树下觉悟，成为佛陀 — "觉悟者"。他教导了四圣谛：苦是存在的，苦生于贪爱，苦可以止息，而止息苦的道路，便是八正道 — 正见、正思维、正语、正业、正命、正精进、正念，与正定。他所走的道路，是纵欲与苦行两个极端之间的中道，以对一切众生的慈悲与慈爱而行。',
            ],
            [['Siddhartha Gautama (the Buddha)'], ['悉达多·乔达摩（佛陀）']],
            [
              [
                'The Four Noble Truths: understand suffering and the path beyond it',
                'The Eightfold Path: wisdom, ethics, and mental discipline together',
                'Meet all beings with compassion and loving-kindness',
              ],
              ['四圣谛：了解苦，以及超越苦的道路', '八正道：智慧、戒律与心的修持合而为一', '以慈悲与慈爱对待一切众生'],
            ],
            [
              ['The Middle Way', 'Mindfulness', 'Karuna (compassion)', 'Metta (loving-kindness)'],
              ['中道', '正念', '悲（慈悲）', '慈（慈爱）'],
            ],
            [
              q(
                ['According to the Buddha, suffering arises from…', '根据佛陀的说法，苦生于……'],
                [['Bad luck', 'Craving and attachment', 'Other people', 'The gods'], ['厄运', '贪爱与执着', '他人', '神明']],
                1,
              ),
              q(
                ['The Middle Way lies between…', '中道位于……之间'],
                [
                  ['Rich and poor', 'Indulgence and harsh self-denial', 'East and West', 'Youth and age'],
                  ['富有与贫穷', '纵欲与严苛的自我克制', '东方与西方', '青年与老年'],
                ],
                1,
              ),
              q(
                ['Metta means…', '「慈」（Metta）意味着……'],
                [['Loving-kindness', 'Strict discipline', 'Deep sleep', 'Sacred fire'], ['慈爱', '严格的戒律', '深沉的睡眠', '神圣的火']],
                0,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              'The Buddha\'s teaching of dependent origination (pratityasamutpada) holds that nothing exists independently — a self is a temporary pattern of five aggregates (skandhas: form, sensation, perception, mental formations, consciousness), not a fixed soul, arising and passing in dependence on conditions. This is why craving causes suffering: we grasp at what is, by nature, always changing, as if it could be held still. The Kalama Sutta later made this rigorous: test every teaching, even the Buddha\'s own, against your own experience of what leads to harm or to welfare.',
              '佛陀所教导的"缘起"（pratityasamutpada）认为，没有任何事物是独立存在的 — 自我，只是五蕴（色、受、想、行、识）这一暂时性的组合模式，而非固定不变的灵魂，它依条件而生起，也依条件而消散。这正是贪爱导致苦的原因：我们紧抓着本质上不断变化之物，仿佛它能够被固定不动。后来的《卡拉玛经》，将这一点提炼得更为严谨：检验每一项教导，即使是佛陀自己的教导，也要以自己的经验，去检验它是导向伤害，还是导向福祉。',
            ],
            [['Siddhartha Gautama (the Buddha)'], ['悉达多·乔达摩（佛陀）']],
            [
              [
                'Dependent origination: nothing exists independently, including the self',
                'The five skandhas (aggregates) form a changing pattern mistaken for a fixed self',
                "The Kalama Sutta: test every teaching, even the Buddha's own, against experience",
              ],
              ['缘起：没有任何事物是独立存在的，包括自我', '五蕴构成了一种不断变化的组合模式，却被误认为固定的自我', '《卡拉玛经》：以自身经验检验每一项教导，即使是佛陀自己的教导'],
            ],
            [
              ['Pratityasamutpada (dependent origination)', 'the five skandhas', 'anatta (non-self)'],
              ['缘起', '五蕴', '无我'],
            ],
            [
              q(
                ['What does dependent origination teach about the self?', '缘起对自我有何教导？'],
                [
                  ['It is eternal and unchanging', 'It is a changing pattern, not a fixed independent thing', 'It does not exist at all in any sense', 'It is created by the gods'],
                  ['它是永恒不变的', '它是一种不断变化的组合模式，而非固定独立之物', '它在任何意义上都完全不存在', '它是由神明所造的'],
                ],
                1,
              ),
              q(
                ['What are the five skandhas?', '五蕴是什么？'],
                [
                  ['Five moral precepts', 'The aggregates (form, sensation, perception, mental formations, consciousness) that form the sense of self', 'Five sacred mountains', 'Five types of meditation posture'],
                  ['五项戒律', '构成自我感的五种组合（色、受、想、行、识）', '五座圣山', '五种禅坐姿势'],
                ],
                1,
              ),
              q(
                ["What did the Kalama Sutta instruct followers to do, even with the Buddha's own words?", '《卡拉玛经》教导信众，即使面对佛陀自己的话语，也应该怎么做？'],
                [
                  ['Accept them without question', 'Test them against their own experience of harm or welfare', 'Reject them automatically', 'Memorize them word for word'],
                  ['不加质疑地接受', '以自身对伤害或福祉的经验来检验它们', '一律加以否定', '逐字逐句地背诵'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'The doctrine of anatta (non-self) is often mistaken for nihilism, but the Buddha rejected both extremes: that there is a fixed eternal self, and that therefore nothing matters — this is itself the Middle Way applied to metaphysics, not just to lifestyle. Compassion (karuna) becomes more, not less, urgent once self and other are seen as interdependent patterns rather than separate fortresses: your suffering and mine arise from the same causes and can be eased by the same practice. This is why the bodhisattva ideal — postponing one\'s own final liberation to help all beings first — became so central in later Buddhist thought.',
              '「无我」的教义，常被误解为一种虚无主义，但佛陀其实否定了两个极端：既否定"存在一个固定永恒的自我"，也否定"因此一切都无关紧要"— 这正是中道在形而上学层面的运用，而不仅仅是在生活方式上的运用。一旦自我与他者，被视为相互依存的模式，而非彼此隔绝的堡垒，慈悲（悲）便变得更加迫切，而非更不迫切：你我的苦，都源于相同的因，也能以相同的修习得以缓解。这正是为何"菩萨"的理想 — 为了先度一切众生，而推迟自己最终的解脱 — 在后来的佛教思想中，变得如此核心。',
            ],
            [['Siddhartha Gautama (the Buddha)', 'later Mahayana teachers on the bodhisattva ideal'], ['悉达多·乔达摩（佛陀）', '论述菩萨理想的后世大乘论师']],
            [
              [
                'Anatta (non-self) rejects both "a fixed eternal self" and the nihilist conclusion that nothing matters',
                'Seeing self and other as interdependent patterns makes compassion more urgent, not less',
                "The bodhisattva ideal: delaying one's own liberation to help all beings first",
              ],
              ['无我，既否定"固定永恒的自我"，也否定"因此一切都无关紧要"这一虚无结论', '将自我与他者视为相互依存的模式，会让慈悲变得更加迫切，而非更不迫切', '菩萨理想：推迟自己的解脱，先度一切众生'],
            ],
            [
              ['Anatta (non-self) as Middle Way metaphysics', 'interdependence and compassion', 'the bodhisattva ideal'],
              ['作为形而上学中道的无我', '相互依存与慈悲', '菩萨理想'],
            ],
            [
              q(
                ['What two extremes does anatta (non-self) reject?', '「无我」否定了哪两个极端？'],
                [
                  ['Rich and poor', 'A fixed eternal self, and the nihilist idea that nothing matters', 'Buddhism and other religions', 'Meditation and study'],
                  ['富裕与贫穷', '固定永恒的自我，以及"一切都无关紧要"的虚无观点', '佛教与其他宗教', '禅修与研读'],
                ],
                1,
              ),
              q(
                ['Why does seeing self and other as interdependent make compassion more urgent?', '为何将自我与他者视为相互依存，会使慈悲变得更加迫切？'],
                [
                  ['It does not — it makes compassion less necessary', "Because your suffering and another's arise from the same causes and can be eased the same way", 'Because it removes all personal responsibility', 'Because it proves other people are not real'],
                  ['并不会 — 这反而使慈悲变得不那么必要', '因为你我的苦，都源于相同的因，也能以相同的方式得到缓解', '因为它消除了一切个人责任', '因为它证明了他人并不真实存在'],
                ],
                1,
              ),
              q(
                ['What is the bodhisattva ideal?', '什么是菩萨理想？'],
                [
                  ['Achieving liberation as quickly as possible for oneself', 'Delaying one\'s own final liberation in order to help all beings first', 'Renouncing all compassion for strangers', 'A title given only to kings'],
                  ['尽快为自己获得解脱', '推迟自己最终的解脱，先度一切众生', '摒弃对陌生人的一切慈悲', '一个只授予君王的头衔'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-jesus',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              'In Roman-ruled Galilee, Jesus of Nazareth taught a radical ethic of love: love God, and love your neighbour as yourself — even your enemy. In the Sermon on the Mount he blessed the meek, the merciful, and the peacemakers, and gave the Golden Rule: do to others what you would have them do to you. His parables — the Good Samaritan, the Prodigal Son — taught that compassion crosses every boundary and that forgiveness restores what is broken. This ethic of unconditional love and service became one of the most influential moral visions in history.',
              '在罗马统治下的加利利，拿撒勒人耶稣教导了一种彻底的爱的伦理：爱神，也要爱人如己 — 甚至要爱你的仇敌。在《登山宝训》中，他祝福温柔的人、怜悯人的人，以及使人和睦的人，并留下了"金律"：你想别人怎样待你，你也要怎样待人。他的比喻 — 好撒玛利亚人、浪子回头 — 教导世人，慈悲能够跨越一切界限，而宽恕能够修复破碎之物。这种无条件的爱与服务的伦理，成为人类历史上最具影响力的道德愿景之一。',
            ],
            [['Jesus of Nazareth'], ['拿撒勒人耶稣']],
            [
              [
                '"Love your neighbour as yourself" — and even your enemies',
                'The Golden Rule: do to others what you would have them do to you',
                'Blessed are the merciful and the peacemakers',
              ],
              ['"爱人如己"— 甚至要爱你的仇敌', '金律：你想别人怎样待你，你也要怎样待人', '怜悯人的人有福了，使人和睦的人有福了'],
            ],
            [
              ['Agape (unconditional love)', 'Forgiveness', 'Service', 'The Golden Rule'],
              ['圣爱（无条件的爱）', '宽恕', '服务', '金律'],
            ],
            [
              q(
                ['The Golden Rule teaches…', '金律教导的是……'],
                [
                  ['Treat others as you would have them treat you', 'An eye for an eye', 'Look after yourself first', 'Rules are golden and unbreakable'],
                  ['你想别人怎样待你，你也要怎样待人', '以眼还眼', '先照顾好自己', '规则是神圣而不可打破的'],
                ],
                0,
              ),
              q(
                ['The parable of the Good Samaritan shows that…', '好撒玛利亚人的比喻说明了……'],
                [
                  ['Travel is dangerous', 'Compassion crosses every boundary', 'Priests are always kind', 'Strangers cannot be trusted'],
                  ['旅行是危险的', '慈悲能够跨越一切界限', '祭司总是仁慈的', '陌生人不可信任'],
                ],
                1,
              ),
              q(
                ['In the Sermon on the Mount, Jesus blessed…', '在《登山宝训》中，耶稣祝福了……'],
                [
                  ['The powerful and wealthy', 'The merciful and the peacemakers', 'The clever and famous', 'The strong and fearless'],
                  ['有权势与富有的人', '怜悯人的人与使人和睦的人', '聪明而有名望的人', '强壮而无所畏惧的人'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              'Jesus taught largely through parables rather than direct doctrine, forcing listeners to complete the moral reasoning themselves — the Prodigal Son never explains why the father runs to meet his returning son before a word of apology is spoken; the listener must supply the answer. His table fellowship — eating openly with tax collectors and those his society called sinners — was itself a teaching: inclusion was demonstrated before doctrine, not after.',
              '耶稣大多是通过比喻，而非直接的教条来教导，迫使听者自己去完成道德上的推理 — 在浪子回头的故事中，他从未解释，为何父亲要在儿子开口道歉之前，就跑去迎接他 — 听者必须自己补上答案。他公开与税吏，以及那个社会所称的"罪人"一同用餐，这一行为本身就是一种教导：接纳，是先以行动示现，而非先以教条宣讲。',
            ],
            [['Jesus of Nazareth'], ['拿撒勒人耶稣']],
            [
              [
                'Parables force the listener to complete the moral reasoning themselves',
                'In the Prodigal Son, the father runs to meet his son before any apology is spoken',
                'Jesus taught inclusion by eating openly with outcasts, before any doctrine was preached',
              ],
              ['比喻迫使听者自己去完成道德上的推理', '在浪子回头的故事中，父亲在儿子开口道歉之前，便已跑去迎接他', '耶稣以公开与被排斥者共餐的方式教导接纳，先于任何教条的宣讲'],
            ],
            [['Parable as method', 'the Prodigal Son', 'table fellowship'], ['比喻作为方法', '浪子回头', '共餐团契']],
            [
              q(
                ['Why did Jesus so often teach through parables rather than direct rules?', '耶稣为何常常以比喻而非直接的规条来教导？'],
                [
                  ['He was forbidden from writing', 'To make listeners complete the moral reasoning themselves', 'Parables were easier to translate', 'He disliked direct speech'],
                  ['他被禁止写作', '为了让听者自己去完成道德上的推理', '比喻比较容易翻译', '他不喜欢直接的言说'],
                ],
                1,
              ),
              q(
                ['In the parable of the Prodigal Son, what happens before any apology is spoken?', '在浪子回头的比喻中，在任何道歉出口之前，发生了什么？'],
                [
                  ['The son is turned away', 'The father runs out to meet his returning son', 'The elder brother forgives him first', 'The father demands repayment'],
                  ['儿子被拒之门外', '父亲跑出去迎接归来的儿子', '兄长先原谅了他', '父亲要求偿还'],
                ],
                1,
              ),
              q(
                ['What did Jesus\'s practice of eating with tax collectors and "sinners" demonstrate?', '耶稣与税吏及"罪人"一同用餐的做法，展现了什么？'],
                [
                  ['That rules do not apply to teachers', 'Inclusion, shown in action before being preached in words', 'That he rejected Jewish law entirely', 'A political alliance with tax collectors'],
                  ['规矩不适用于教师', '接纳，先以行动展现，后以言语宣讲', '他彻底否定了犹太律法', '与税吏结成政治同盟'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'The Golden Rule was not new to Jesus — Confucius, Hillel, and others taught versions of it — but Jesus pushed it past reciprocity into asymmetry: love your enemy, who by definition will not reciprocate; forgive "seventy times seven," past any ledger of fairness. This is the hardest edge of the ethic of love, precisely because it asks for a virtue with no guarantee of return — and it is why later movements for nonviolent resistance (Gandhi, King) drew on this teaching directly, rather than on the more common, symmetrical Golden Rule alone.',
              '金律并非耶稣首创 — 孔子、希勒尔等人都曾教导过类似的版本 — 但耶稣将它从"互惠"推向了"不对称"：爱你的仇敌，而仇敌按定义是不会回报你的；宽恕"七十个七次"，超越任何公平的账本。这正是爱的伦理中最艰难的一面，恰恰因为它要求一种没有回报保证的德行 — 这也是为何后来的非暴力抵抗运动（甘地、金恩）直接援引了这一教导，而非仅仅援引更为常见、对等互惠的那种金律。',
            ],
            [['Jesus of Nazareth', 'Confucius and Hillel (earlier teachers of reciprocity)'], ['拿撒勒人耶稣', '孔子与希勒尔（更早教导互惠原则的人物）']],
            [
              [
                'Jesus pushed the Golden Rule past reciprocity into asymmetry: love even those who cannot repay it',
                '"Seventy times seven" — forgiveness beyond any ledger of fairness',
                'This asymmetrical love directly inspired later nonviolent movements (Gandhi, King)',
              ],
              ['耶稣将金律从互惠推向了不对称：即使对方无法回报，也要去爱', '"七十个七次"— 宽恕超越任何公平的账本', '这种不对称的爱，直接启发了后来的非暴力运动（甘地、金恩）'],
            ],
            [['asymmetrical love', 'forgiveness without ledger', 'roots of nonviolent resistance'], ['不对称的爱', '不计账本的宽恕', '非暴力抵抗的根源']],
            [
              q(
                ['How did Jesus push the Golden Rule further than mere reciprocity?', '耶稣如何将金律推进到超越单纯互惠的层次？'],
                [
                  ['By asking for love of enemies who cannot repay it', 'By making it a legal requirement', 'By limiting it only to family members', 'By removing forgiveness from it entirely'],
                  ['要求人去爱那些无法回报的仇敌', '将它变成一项法律要求', '将其限定于仅适用于家人', '将宽恕从中完全剔除'],
                ],
                0,
              ),
              q(
                ['What does "seventy times seven" mean regarding forgiveness?', '"七十个七次"对宽恕意味着什么？'],
                [
                  ['Forgiveness has an exact numerical limit', 'Forgiveness beyond any counted limit or fairness ledger', 'It refers to a specific historical event', 'It means forgiveness should be delayed'],
                  ['宽恕有一个精确的数字上限', '宽恕超越任何计数的上限或公平账本', '它指的是一个特定的历史事件', '它意味着宽恕应当被延迟'],
                ],
                1,
              ),
              q(
                ['Which later movement explicitly drew on this asymmetrical ethic of love?', '哪个后来的运动，明确援引了这种不对称的爱的伦理？'],
                [
                  ['The Industrial Revolution', "Nonviolent resistance movements such as Gandhi's and King's", 'The Scientific Revolution', 'The Age of Exploration'],
                  ['工业革命', '如甘地与金恩所领导的非暴力抵抗运动', '科学革命', '大航海时代'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-rumi',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              "While much of Europe's ancient learning lay scattered, scholars of the Islamic world gathered, translated, and transformed it. In Baghdad's House of Wisdom, thinkers such as Al-Farabi, Avicenna (Ibn Sina), and Averroes (Ibn Rushd) wove Greek philosophy together with faith, medicine, mathematics, and astronomy. Al-Ghazali explored the inner life of the heart, and the Sufi poet Rumi sang of a love that unites all beings. Their work carried the flame of wisdom across centuries and cultures, later reigniting learning in Europe.",
              '当欧洲大部分的古代学问散佚失传之时，伊斯兰世界的学者们却在收集、翻译，并加以转化。在巴格达的"智慧宫"中，法拉比、伊本·西那（阿维森纳），以及伊本·鲁世德（阿威罗伊）等思想家，将希腊哲学与信仰、医学、数学与天文学交织在一起。安萨里探索了内心的精神生活，苏菲诗人鲁米则歌咏着一种联结万物的爱。他们的工作，让智慧之火跨越数个世纪与文化传递下去，后来更重新点燃了欧洲的学术之光。',
            ],
            [
              ['Avicenna (Ibn Sina)', 'Averroes (Ibn Rushd)', 'Al-Ghazali', 'Rumi'],
              ['伊本·西那（阿维森纳）', '伊本·鲁世德（阿威罗伊）', '安萨里', '鲁米'],
            ],
            [
              [
                'Reason and faith can illuminate one another',
                'Seek knowledge wherever it is found — learning is a bridge between cultures',
                'Rumi: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there."',
              ],
              ['理性与信仰可以彼此照亮', '无论知识在何处，都去寻求它 — 学问是连结不同文化的桥梁', '鲁米："在是非对错的观念之外，有一片旷野，我们在那里相遇。"'],
            ],
            [
              ['The House of Wisdom', 'Falsafa (philosophy)', 'Sufi love & unity'],
              ['智慧宫', '法尔萨法（哲学）', '苏菲的爱与合一'],
            ],
            [
              q(
                ['What was the House of Wisdom?', '「智慧宫」是什么？'],
                [
                  ['A famous mosque', 'A great centre of translation and scholarship in Baghdad', 'A royal palace', 'A trading market'],
                  ['一座著名的清真寺', '巴格达的一座伟大的翻译与学术中心', '一座皇家宫殿', '一个贸易市场'],
                ],
                1,
              ),
              q(
                ['Islamic Golden Age scholars are known for…', '伊斯兰黄金时代的学者们以什么著称？'],
                [
                  ['Rejecting all foreign learning', 'Preserving and transforming knowledge across cultures', 'Studying only poetry', 'Avoiding science'],
                  ['拒绝一切外来学问', '跨文化地保存并转化知识', '只研究诗歌', '回避科学'],
                ],
                1,
              ),
              q(
                ['Rumi is celebrated as…', '鲁米被尊崇为……'],
                [['A general', 'A Sufi poet of love and unity', 'An architect', 'A mapmaker'], ['一位将军', '一位歌咏爱与合一的苏菲诗人', '一位建筑师', '一位制图师']],
                1,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              'Ibn Sina\'s (Avicenna) "Floating Man" thought experiment asked readers to imagine themselves suspended in mid-air with no sensory input at all — even then, he argued, you would still know you exist, an argument for the reality of the self centuries before Descartes\' "I think, therefore I am." Averroes (Ibn Rushd), writing commentaries on Aristotle so thorough that medieval Europe called him simply "The Commentator," argued reason and revelation could not truly conflict, since both come from the same ultimate truth, properly understood.',
              '伊本·西那（阿维森纳）的"悬浮人"思想实验，请读者想象自己悬浮于半空之中，完全没有任何感官输入 — 他论证说，即便如此，你依然会知道自己存在，这是一个早于笛卡尔"我思故我在"数个世纪的、关于自我真实性的论证。伊本·鲁世德（阿威罗伊）为亚里士多德撰写的注疏是如此详尽，以至于中世纪的欧洲干脆称他为"评注者"，他论证说，理性与启示不可能真正冲突，因为两者若被正确理解，都源于同一个终极真理。',
            ],
            [
              ['Avicenna (Ibn Sina)', 'Averroes (Ibn Rushd)'],
              ['伊本·西那（阿维森纳）', '伊本·鲁世德（阿威罗伊）'],
            ],
            [
              [
                "Ibn Sina's 'Floating Man': even without any senses, you would still know you exist",
                'Averroes (\'The Commentator\') argued reason and revelation cannot truly conflict',
                'Islamic scholars preserved and extended Greek philosophy through centuries Europe had largely lost it',
              ],
              ['伊本·西那的"悬浮人"：即便没有任何感官，你依然会知道自己存在', '阿威罗伊（"评注者"）论证理性与启示不可能真正冲突', '伊斯兰学者在欧洲已大量佚失希腊哲学的数个世纪中，保存并延续了它'],
            ],
            [
              ['The Floating Man argument', 'The Commentator (Averroes)', 'harmony of reason and revelation'],
              ['悬浮人论证', '评注者（阿威罗伊）', '理性与启示的调和'],
            ],
            [
              q(
                ['What did Ibn Sina\'s "Floating Man" argument try to prove?', '伊本·西那的"悬浮人"论证，试图证明什么？'],
                [
                  ['That flight is possible', 'That you would still know you exist even with no sensory input at all', 'That the soul can be weighed', 'That dreams are always false'],
                  ['飞行是可能的', '即便完全没有感官输入，你依然会知道自己存在', '灵魂可以被称重', '梦境永远是虚假的'],
                ],
                1,
              ),
              q(
                ['Why was Averroes called "The Commentator" in medieval Europe?', '为何中世纪欧洲称阿威罗伊为"评注者"？'],
                [
                  ['For his thorough commentaries on Aristotle', 'For his poetry', 'For his military commentary', 'For translating the Quran'],
                  ['因他为亚里士多德撰写的详尽注疏', '因他的诗歌', '因他的军事评论', '因他翻译了《古兰经》'],
                ],
                0,
              ),
              q(
                ['What did Averroes argue about reason and revelation?', '阿威罗伊对理性与启示的关系有何论证？'],
                [
                  ['That they always contradict each other', 'That they cannot truly conflict, properly understood', 'That revelation should be abandoned', 'That reason is inferior to tradition'],
                  ['两者总是彼此矛盾', '若被正确理解，两者不可能真正冲突', '启示应当被摒弃', '理性劣于传统'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'Al-Ghazali, in his Incoherence of the Philosophers, challenged the very rationalists Ibn Sina and Averroes represented, arguing that pure logic alone could not prove several claims philosophers assumed were certain — and that direct spiritual experience, as in Sufism, reaches truths reason cannot reach alone. Rumi inherited this turn toward the heart: his poetry did not reject reason but insisted love was reason\'s fulfilment, not its opposite. The Golden Age\'s deepest legacy is this ongoing, unresolved conversation between rigorous logic and direct experience, still alive in philosophy of religion today.',
              '安萨里在其《哲学家的矛盾》一书中，挑战了伊本·西那与阿威罗伊所代表的理性主义本身，论证说，仅凭纯粹的逻辑，无法证明哲学家们所假定为确凿无疑的几项主张 — 而如苏菲主义所展现的那种直接的灵性体验，能够抵达单凭理性无法抵达的真理。鲁米继承了这种转向内心的思路：他的诗歌并未否定理性，而是坚持认为，爱是理性的圆满实现，而非其对立面。伊斯兰黄金时代最深刻的遗产，正是这场严密逻辑与直接体验之间、至今仍未有定论的持续对话，它至今仍活跃于宗教哲学之中。',
            ],
            [['Al-Ghazali', 'Rumi'], ['安萨里', '鲁米']],
            [
              [
                'Al-Ghazali challenged rationalist philosophers, arguing logic alone cannot prove everything it assumes',
                'Sufism holds that direct spiritual experience reaches truths reason alone cannot',
                'Rumi: love fulfils reason rather than opposing it',
              ],
              ['安萨里挑战了理性主义哲学家，论证仅凭逻辑无法证明它所假定的一切', '苏菲主义认为，直接的灵性体验能抵达单凭理性无法抵达的真理', '鲁米：爱是理性的圆满，而非其对立面'],
            ],
            [
              ["Al-Ghazali's Incoherence of the Philosophers", 'Sufi direct experience', 'reason and love as allies'],
              ['安萨里的《哲学家的矛盾》', '苏菲的直接体验', '理性与爱作为盟友'],
            ],
            [
              q(
                ['What did Al-Ghazali argue against pure rationalist philosophy?', '安萨里对纯粹理性主义哲学提出了怎样的论证？'],
                [
                  ['That it was entirely correct', 'That logic alone cannot prove everything philosophers assumed as certain', 'That it should replace religion entirely', 'That it had no influence on Islamic thought'],
                  ['它是完全正确的', '仅凭逻辑无法证明哲学家们所假定的一切确凿事项', '它应当彻底取代宗教', '它对伊斯兰思想毫无影响'],
                ],
                1,
              ),
              q(
                ['According to Sufi thought, what can direct spiritual experience reach that reason alone cannot?', '根据苏菲思想，直接的灵性体验能抵达哪些仅凭理性无法抵达之处？'],
                [
                  ['Nothing — reason is always sufficient', 'Deeper truths beyond logical proof', 'Only emotional comfort, not truth', 'Political power'],
                  ['什么都抵达不了 — 理性总是足够的', '超越逻辑证明的更深真理', '仅仅是情感上的慰藉，而非真理', '政治权力'],
                ],
                1,
              ),
              q(
                ["In Rumi's view, how does love relate to reason?", '在鲁米看来，爱与理性是怎样的关系？'],
                [
                  ['Love destroys reason', 'Love fulfils reason; it is not its opposite', 'Love and reason are unrelated', 'Reason must be abandoned for love'],
                  ['爱摧毁理性', '爱是理性的圆满；并非其对立面', '爱与理性毫不相关', '为了爱必须放弃理性'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-kant',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              'European thinkers of the Enlightenment dared people to think for themselves. Kant\'s motto was "Sapere aude" — dare to know. He taught that every person must be treated as an end in themselves, never merely as a means, and asked us to act only on principles we could will for everyone. Locke argued for natural rights to life and liberty; Rousseau explored the social contract that binds free people together. These ideas of universal dignity, tolerance, and human rights still shape our world — and echo the ancient dream of a world shared by all.',
              '欧洲启蒙时代的思想家，鼓励人们勇敢地独立思考。康德的座右铭是"Sapere aude"— 敢于求知。他教导说，每个人都必须被当作目的本身来对待，绝不能仅仅被当作手段，并要求我们只依据那些愿意让所有人都遵循的原则来行动。洛克主张生命与自由是天赋的权利；卢梭则探讨了将自由的人们联结在一起的社会契约。这些关于普遍尊严、宽容与人权的理念，至今仍在塑造着我们的世界 — 并呼应着"天下为公"这一古老的梦想。',
            ],
            [
              ['Immanuel Kant', 'John Locke', 'Jean-Jacques Rousseau', 'Mary Wollstonecraft'],
              ['伊曼努尔·康德', '约翰·洛克', '让-雅克·卢梭', '玛丽·沃斯通克拉夫特'],
            ],
            [
              [
                '"Dare to know" — think for yourself, courageously and honestly',
                'Treat every person as an end, never merely as a means',
                'All people share natural rights and equal dignity',
              ],
              ['"敢于求知"— 勇敢而诚实地独立思考', '把每个人都当作目的本身，绝不仅仅当作手段', '所有人都拥有天赋的权利与平等的尊严'],
            ],
            [
              ['Reason', 'The categorical imperative', 'Natural rights', 'The social contract'],
              ['理性', '定言令式', '天赋权利', '社会契约'],
            ],
            [
              q(
                ['Kant\'s motto "Sapere aude" means…', '康德的座右铭「Sapere aude」意思是……'],
                [['Obey wisely', 'Dare to know', 'Live simply', 'Fear nothing'], ['明智地服从', '敢于求知', '简朴地生活', '无所畏惧']],
                1,
              ),
              q(
                ['Kant taught that every person must be treated as…', '康德教导说，每个人都必须被当作……对待'],
                [
                  ['A means to progress', 'An end in themselves', 'A subject of the state', 'A competitor'],
                  ['进步的手段', '目的本身', '国家的臣民', '竞争对手'],
                ],
                1,
              ),
              q(
                ['Enlightenment thinkers argued that rights and dignity belong to…', '启蒙思想家主张，权利与尊严属于……'],
                [['Kings only', 'The educated only', 'All people', 'The wealthy'], ['仅属于君王', '仅属于受过教育的人', '所有人', '富有的人']],
                2,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              'Kant\'s categorical imperative had a second, more concrete formulation beyond "dare to know": act only so that you could will your action\'s principle to become a universal law for everyone — a lie fails this test instantly, since a world where everyone lied on convenience would destroy the very trust lying depends on. Rousseau, meanwhile, worried that Enlightenment reason alone could corrupt as easily as it could liberate; his "general will" tried to bind individual freedom to the common good, believing people could be "forced to be free" by a just social contract they had themselves agreed to.',
              '康德的定言令式，在"敢于求知"之外，还有第二个更为具体的表述：只依据那些你愿意让它成为普遍法则、适用于所有人的准则去行动 — 一个谎言会立刻在这一检验中失败，因为一个人人都为了方便而说谎的世界，将摧毁说谎本身所依赖的信任。与此同时，卢梭担忧，仅凭启蒙的理性，既可能带来解放，也同样可能带来腐化；他的"公意"，试图将个人的自由，与共同的善绑定在一起，他相信，人们可以被一份他们自己同意的正义社会契约"强迫获得自由"。',
            ],
            [['Immanuel Kant', 'Jean-Jacques Rousseau'], ['伊曼努尔·康德', '让-雅克·卢梭']],
            [
              [
                'The categorical imperative: act only on principles you could will to be a universal law for everyone',
                'A lie fails this test because universal lying would destroy the trust it depends on',
                "Rousseau's 'general will' tried to bind individual freedom to the common good",
              ],
              ['定言令式：只依据那些你愿意让所有人都遵循的准则去行动', '谎言无法通过这项检验，因为普遍的说谎会摧毁其自身所依赖的信任', '卢梭的"公意"，试图将个人自由与共同的善绑定在一起'],
            ],
            [
              ['The categorical imperative (universal law)', 'the general will', "reason's limits"],
              ['定言令式（普遍法则）', '公意', '理性的局限'],
            ],
            [
              q(
                ["What does Kant's categorical imperative ask you to test?", '康德的定言令式，要求你检验的是什么？'],
                [
                  ['Whether an action makes you happy', 'Whether you could will your action\'s principle as a universal law for everyone', 'Whether an action is legal', 'Whether an action is popular'],
                  ['一项行为是否让你感到快乐', '你是否愿意让这项行为的准则，成为适用于所有人的普遍法则', '一项行为是否合法', '一项行为是否受欢迎'],
                ],
                1,
              ),
              q(
                ['Why does a lie fail the categorical imperative\'s test?', '为何谎言无法通过定言令式的检验？'],
                [
                  ['Because lying is always illegal', 'Because universal lying would destroy the trust it depends on', 'Because Kant disliked dishonest people', 'It does not fail the test'],
                  ['因为说谎永远是违法的', '因为普遍的说谎会摧毁其自身所依赖的信任', '因为康德不喜欢不诚实的人', '它并没有无法通过检验'],
                ],
                1,
              ),
              q(
                ['What was Rousseau\'s "general will" meant to bind together?', '卢梭的"公意"意在将什么绑定在一起？'],
                [
                  ['Church and state', 'Individual freedom and the common good', 'Kings and nobles', 'Reason and superstition'],
                  ['教会与国家', '个人自由与共同的善', '国王与贵族', '理性与迷信'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              'Mary Wollstonecraft, often overlooked beside Kant and Rousseau, turned Enlightenment universalism against its own blind spot: if reason and rights belong to all persons, she argued in A Vindication of the Rights of Woman, then excluding women from education and civic life was not merely unjust but logically inconsistent with the Enlightenment\'s own first principles. This pattern — a universal claim outrunning the limited practice of its own authors — repeats throughout history, and recognizing it is itself a skill: perhaps the Enlightenment\'s deepest gift is less its specific answers than this habit of holding a principle to its own honest conclusion, including against its authors.',
              '玛丽·沃斯通克拉夫特常常在康德与卢梭的光芒下被忽略，她却将启蒙的普遍主义，转而对准了其自身的盲点：她在《为女权辩护》中论证说，如果理性与权利属于所有人，那么将女性排除在教育与公民生活之外，就不仅仅是不义的，更是在逻辑上，与启蒙运动自身的首要原则相悖。这种模式 — 一项普遍性的主张，超前于其自身提出者有限的实践 — 在历史中不断重演，能够辨识出这一点，本身便是一种智识上的技艺：或许启蒙运动最深刻的馈赠，不在于它给出的具体答案，而在于这种"将一项原则贯彻到其自身诚实结论"的习惯 — 即便这一结论，会反过来指向它的提出者本身。',
            ],
            [['Mary Wollstonecraft'], ['玛丽·沃斯通克拉夫特']],
            [
              [
                "Wollstonecraft argued that excluding women from Enlightenment rights was logically inconsistent with the Enlightenment's own principles",
                'Universal claims often outrun the limited practice of the very thinkers who first stated them',
                "Holding a principle to its own honest conclusion — even against its author — is itself a form of wisdom",
              ],
              ['沃斯通克拉夫特论证，将女性排除在启蒙权利之外，在逻辑上与启蒙运动自身的原则相悖', '普遍性的主张，常常超前于首先提出它们的思想家自身有限的实践', '将一项原则贯彻至其自身诚实的结论 — 即便这会反过来指向提出者本身 — 本身便是一种智慧'],
            ],
            [
              ["Wollstonecraft's critique", 'universalism vs. practice', 'holding principles to their conclusions'],
              ['沃斯通克拉夫特的批判', '普遍主义 vs. 实践', '将原则贯彻到底'],
            ],
            [
              q(
                ["What was Mary Wollstonecraft's key argument?", '玛丽·沃斯通克拉夫特的核心论点是什么？'],
                [
                  ['That women should not receive an education', "That excluding women from Enlightenment rights was inconsistent with the Enlightenment's own principles", 'That the Enlightenment had no flaws', 'That Kant and Rousseau were entirely wrong about everything'],
                  ['女性不应接受教育', '将女性排除在启蒙权利之外，与启蒙运动自身的原则不一致', '启蒙运动毫无缺陷', '康德与卢梭在所有方面都完全错误'],
                ],
                1,
              ),
              q(
                ["What pattern does Wollstonecraft's critique reveal about universal claims?", '沃斯通克拉夫特的批判，揭示了普遍性主张的哪种模式？'],
                [
                  ['That they are always false', 'That they often outrun the limited practice of the thinkers who first stated them', 'That they apply only to their original authors', 'That they cannot be tested'],
                  ['它们总是错误的', '它们常常超前于首先提出它们的思想家自身有限的实践', '它们只适用于最初的提出者', '它们无法被检验'],
                ],
                1,
              ),
              q(
                ['What does the text suggest may be the Enlightenment\'s deepest gift?', '文中提到，启蒙运动最深刻的馈赠可能是什么？'],
                [
                  ['A single perfect answer to ethics', "The habit of holding a principle to its own honest conclusion, even against its authors", 'The abolition of all tradition', 'A universal single language'],
                  ['一个关于伦理学的完美答案', '将一项原则贯彻至其自身诚实结论的习惯，即便这会指向其提出者本身', '废除一切传统', '一种全人类通用的单一语言'],
                ],
                1,
              ),
            ],
          ),
        ],
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
        cardId: 'card-gandhi',
        levels: [
          level(
            ['Level 1 · Foundations', '第一关 · 基础'],
            [
              'In the modern age, ancient wisdom became a force for transforming whole societies. Mahatma Gandhi fused the Indian ideal of ahimsa (non-harm) with satyagraha — "truth-force" — leading India to freedom without hatred. Martin Luther King Jr. carried this torch, joining the ethic of love with the demand for justice: "Darkness cannot drive out darkness; only light can do that." Thinkers like Kang Youwei revived the dream of Datong 大同 for the modern world, and the Universal Declaration of Human Rights gave humanity a shared moral charter. The journey to Great Harmony continues — through each of us.',
              '在现代，古老的智慧成为了转化整个社会的力量。圣雄甘地将印度"非暴力"（不伤害）的理想，与"satyagraha"（真理的力量）结合在一起 — 带领印度在没有仇恨的情况下走向自由。马丁·路德·金接过了这把火炬，将爱的伦理与对正义的诉求结合在一起："黑暗不能驱逐黑暗，唯有光明可以。"康有为等思想家为现代世界重新唤醒了"大同"的梦想，而《世界人权宣言》则为全人类订立了一份共同的道德宪章。通往大同的旅程仍在继续 — 通过我们每一个人。',
            ],
            [
              ['Mahatma Gandhi', 'Martin Luther King Jr.', 'Kang Youwei 康有为', 'Eleanor Roosevelt'],
              ['圣雄甘地', '马丁·路德·金', '康有为', '埃莉诺·罗斯福'],
            ],
            [
              [
                '"Be the change you wish to see in the world"',
                'Nonviolence is the weapon of the strong: meet hatred with love',
                'The dream of Great Harmony belongs to all humanity',
              ],
              ['"想要世界如何改变，自己先成为那样的改变"', '非暴力是强者的武器：以爱回应仇恨', '大同的梦想，属于全体人类'],
            ],
            [
              ['Ahimsa (non-harm)', 'Satyagraha (truth-force)', 'Universal human rights', 'Datong 大同 renewed'],
              ['非暴力（不伤害）', '真理的力量', '普世人权', '重焕新生的大同理想'],
            ],
            [
              q(
                ["Satyagraha, Gandhi's method, means…", '甘地的方法「satyagraha」意味着……'],
                [
                  ['Silent protest', 'Truth-force — nonviolent resistance', 'Armed struggle', 'Political negotiation'],
                  ['无声的抗议', '真理的力量 — 非暴力抵抗', '武装斗争', '政治谈判'],
                ],
                1,
              ),
              q(
                ['King taught that darkness can only be driven out by…', '金恩教导说，黑暗唯有被……驱逐'],
                [['Greater darkness', 'Light', 'Time', 'Forgetting'], ['更大的黑暗', '光明', '时间', '遗忘']],
                1,
              ),
              q(
                ['Kang Youwei renewed which ancient ideal for the modern age?', '康有为为现代重新唤醒了哪一个古老的理想？'],
                [
                  ['Wu wei 无为', 'Datong 大同 — the Great Harmony', 'The golden mean', 'The social contract'],
                  ['无为', '大同 — 天下为公的理想', '中道', '社会契约'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 2 · Deeper Study', '第二关 · 深入研读'],
            [
              "Gandhi's satyagraha was not passive submission but active, disciplined confrontation — the Salt March of 1930 broke an unjust law openly, in public, accepting arrest and violence without retaliating, so that the injustice of the response would be visible to the whole world. King's Letter from Birmingham Jail made the same logic explicit: \"injustice anywhere is a threat to justice everywhere,\" and argued that breaking an unjust law openly, with a willingness to accept the penalty, actually expresses the highest respect for law, not its rejection.",
              '甘地的"非暴力抵抗"并非消极的顺从，而是主动的、有纪律的对抗 — 1930年的"食盐进军"，公开地、当众地打破了一项不义的法律，甘地一方在遭到逮捕与暴力对待时不加以报复，好让这种回应的不义，能被全世界看见。金恩在《伯明翰狱中书》中，将同样的逻辑说得更为明确："任何地方的不义，都是对各处正义的威胁"，他论证说，公开打破一项不义的法律，并甘愿承受其惩罚，实际上表达的是对法律最高的尊重，而非对它的否定。',
            ],
            [['Mahatma Gandhi', 'Martin Luther King Jr.'], ['圣雄甘地', '马丁·路德·金']],
            [
              [
                'Satyagraha was active, disciplined confrontation, not passive submission',
                'The Salt March broke an unjust law openly so the injustice of the response would be visible to the world',
                'King: breaking an unjust law openly, and accepting the penalty, expresses respect for law, not its rejection',
              ],
              ['非暴力抵抗是主动的、有纪律的对抗，而非消极的顺从', '食盐进军公开打破了一项不义的法律，好让回应的不义能被全世界看见', '金恩：公开打破不义之法并甘愿受罚，表达的是对法律的尊重，而非否定'],
            ],
            [
              ['Satyagraha in action', 'the Salt March', 'civil disobedience as respect for law'],
              ['行动中的非暴力抵抗', '食盐进军', '作为对法律尊重的公民不服从'],
            ],
            [
              q(
                ['Was satyagraha passive submission?', '非暴力抵抗是一种消极的顺从吗？'],
                [
                  ['Yes, entirely', 'No — it was active, disciplined confrontation', 'Only in its early years', 'Only Gandhi believed this'],
                  ['是的，完全是', '不 — 它是主动的、有纪律的对抗', '只有在早期是这样', '只有甘地这么认为'],
                ],
                1,
              ),
              q(
                ['Why did the Salt March break the law openly rather than secretly?', '为何食盐进军选择公开而非秘密地打破法律？'],
                [
                  ['To avoid detection', 'So the injustice of the response would be visible to the world', 'Because secrecy was against Gandhi\'s religion', 'It was actually done in secret'],
                  ['为了避免被发现', '好让回应的不义能被全世界看见', '因为秘密行事违背甘地的信仰', '它其实是秘密进行的'],
                ],
                1,
              ),
              q(
                ['According to King, openly breaking an unjust law and accepting the penalty expresses…', '根据金恩的说法，公开打破不义之法并接受惩罚，表达的是……'],
                [
                  ['Contempt for all law', 'Respect for law, not rejection of it', 'A desire for chaos', 'Political weakness'],
                  ['对一切法律的蔑视', '对法律的尊重，而非否定', '对混乱的渴望', '政治上的软弱'],
                ],
                1,
              ),
            ],
          ),
          level(
            ['Level 3 · Mastery', '第三关 · 圆满'],
            [
              "Kang Youwei's Book of Great Unity (Datong Shu 大同书), written after direct contact with Western thought, imagined Datong not as a return to the past but as a future built by abolishing every boundary that divides people — nations, classes, even the family unit itself, in his most radical (and most contested) proposals. Whether or not one accepts his specific vision, his method is the one this app borrows: an ancient ideal, reinterpreted rather than merely repeated, tested against modern global conditions. The Universal Declaration of Human Rights (1948), drafted by a committee spanning multiple civilizations' traditions, including Confucian input from P. C. Chang, is arguably Datong's first real institutional attempt — imperfect, incomplete, and still the closest thing humanity has built to a shared moral charter.",
              '康有为的《大同书》，写于他与西方思想直接接触之后，将"大同"想象为一个并非复归过去，而是通过废除一切分隔人群的界限 — 国家、阶级，甚至在他最激进（也最具争议）的构想中，连家庭本身 — 而建成的未来。无论人们是否认同他这一具体的构想，他所使用的方法，正是本应用所借鉴的：一个古老的理想，被重新诠释，而非仅仅重复，并放在现代全球的条件下加以检验。1948年的《世界人权宣言》，由一个跨越多个文明传统、包括来自张彭春的儒家思想贡献在内的委员会起草，可说是"大同"第一次真正的制度性尝试 — 不完美、未完成，却仍是人类迄今为止所建成的、最接近共同道德宪章的事物。',
            ],
            [['Kang Youwei 康有为', 'the drafters of the Universal Declaration of Human Rights'], ['康有为', '《世界人权宣言》的起草者']],
            [
              [
                'Kang Youwei\'s Datong Shu 大同书 reimagined Datong as a future to build, not a past to restore',
                'The Universal Declaration of Human Rights (1948) drew on multiple civilizations\' traditions, including Confucian input',
                'Reinterpreting an ancient ideal for modern conditions, rather than just repeating it, is itself the method Datong requires',
              ],
              ['康有为的《大同书》，将大同重新构想为一个有待建成的未来，而非有待复归的过去', '1948年的《世界人权宣言》，汲取了包括儒家思想在内的多个文明传统', '为现代条件重新诠释一个古老理想，而非仅仅重复它，正是大同本身所要求的方法'],
            ],
            [
              ['Datong Shu 大同书', 'the Universal Declaration of Human Rights', 'reinterpretation as method'],
              ['大同书', '世界人权宣言', '重新诠释作为方法'],
            ],
            [
              q(
                ['How did Kang Youwei reimagine Datong in his Book of Great Unity?', '康有为在《大同书》中，如何重新构想大同？'],
                [
                  ['As a past golden age to restore exactly', 'As a future to be built, not a past to be restored', 'As an impossible fantasy with no method', 'As a purely religious concept'],
                  ['作为一个需要完全复归的过去黄金时代', '作为一个有待建成的未来，而非有待复归的过去', '作为一个毫无方法可循的不可能幻想', '作为一个纯粹的宗教概念'],
                ],
                1,
              ),
              q(
                ['What made the 1948 Universal Declaration of Human Rights notable in relation to Datong?', '1948年《世界人权宣言》在与大同理想的关联上，有何值得注意之处？'],
                [
                  ['It rejected all non-Western traditions', 'It drew on multiple civilizations\' traditions, including Confucian input, as a shared moral charter', 'It was written entirely by one country', 'It has no connection to Datong at all'],
                  ['它拒绝了一切非西方传统', '它汲取了包括儒家思想在内的多个文明传统，作为一份共同的道德宪章', '它完全由一个国家起草', '它与大同毫无关联'],
                ],
                1,
              ),
              q(
                ['What method does the text say Datong itself requires?', '文中提到，大同本身要求怎样的方法？'],
                [
                  ['Repeating the ancient ideal exactly, unchanged', 'Reinterpreting the ancient ideal for modern conditions, not merely repeating it', 'Waiting passively for it to arrive on its own', 'Abandoning all ancient ideals entirely'],
                  ['原封不动地重复这个古老理想', '为现代条件重新诠释这个古老理想，而非仅仅重复它', '被动地等待它自行到来', '彻底抛弃一切古老的理想'],
                ],
                1,
              ),
            ],
          ),
        ],
      },
    ],
  },
];

export const ALL_POINTS = TIMELINE.flatMap((era) => era.points);

export function eraOfPoint(pointId: string): TimelineEra | undefined {
  return TIMELINE.find((era) => era.points.some((p) => p.id === pointId));
}
