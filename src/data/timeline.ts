import type { TimelineEra } from './types';

export const TIMELINE: TimelineEra[] = [
  {
    id: 'ancient',
    name: 'Ancient Civilizations',
    emoji: '🏛️',
    period: 'c. 3000–600 BCE',
    badgeTitle: 'Ancient Wisdom Explorer',
    points: [
      {
        id: 'ancient-first',
        title: 'Wisdom of the First Civilizations',
        years: 'c. 3000–600 BCE',
        emoji: '𓂀',
        background:
          'Long before philosophy had a name, the first great civilizations — Egypt, Mesopotamia, the Indus Valley, and early China — were already asking how to live well. Egyptian sages taught Ma\'at: truth, balance, and right order. Mesopotamian proverbs urged honesty and moderation. The Vedic hymns of ancient India searched for the unity behind all things. These early teachings show that the longing for wisdom and harmony is as old as humanity itself.',
        figures: ['Ptahhotep (Egyptian vizier & sage)', 'The Vedic seers (rishis)', 'Mesopotamian scribes'],
        teachings: [
          'Ma\'at — live in truth, balance, and right order',
          'Speak honestly; a good name outlasts wealth',
          'Behind the many things of the world lies a deeper unity',
        ],
        concepts: ['Ma\'at', 'Rita (cosmic order)', 'Proverbial wisdom'],
        quiz: [
          {
            q: 'What did the Egyptian concept of Ma\'at represent?',
            options: ['Military strength', 'Truth, balance, and right order', 'Wealth and abundance', 'The afterlife only'],
            answer: 1,
          },
          {
            q: 'The Vedic seers of ancient India searched for…',
            options: ['New trade routes', 'The unity behind all things', 'Better weapons', 'Faster ways to farm'],
            answer: 1,
          },
          {
            q: 'What do the earliest wisdom teachings show us?',
            options: [
              'Wisdom was invented recently',
              'Only one civilization sought wisdom',
              'The longing for wisdom is as old as humanity',
              'Ancient people had no ethics',
            ],
            answer: 2,
          },
        ],
        cardId: 'card-maat',
      },
    ],
  },
  {
    id: 'greek',
    name: 'Greek Philosophy',
    emoji: '🏺',
    period: 'c. 600–300 BCE',
    badgeTitle: 'Hellenic Wisdom Explorer',
    points: [
      {
        id: 'greek-socrates',
        title: 'Socrates & the Examined Life',
        years: '470–399 BCE',
        emoji: '🗣️',
        background:
          'In the streets of Athens, Socrates asked questions no one could easily answer: What is justice? What is courage? What is a good life? He wrote nothing, yet changed thought forever. He claimed to know only that he knew nothing — and that honest questioning was the beginning of wisdom. Condemned to death for "corrupting the youth," he calmly accepted the sentence, teaching that it is better to suffer wrong than to do wrong.',
        figures: ['Socrates'],
        teachings: [
          '"The unexamined life is not worth living"',
          'True wisdom begins with knowing what you do not know',
          'It is better to suffer injustice than to commit it',
        ],
        concepts: ['The Socratic method', 'Intellectual humility', 'Moral integrity'],
        quiz: [
          {
            q: 'What was the heart of Socrates\' method?',
            options: ['Giving long lectures', 'Asking honest questions', 'Writing many books', 'Winning debates at any cost'],
            answer: 1,
          },
          {
            q: 'Socrates said the beginning of wisdom is…',
            options: ['Wealth', 'Knowing what you do not know', 'Memorizing facts', 'Obeying authority'],
            answer: 1,
          },
          {
            q: 'According to Socrates, which is worse?',
            options: ['Suffering injustice', 'Committing injustice', 'Being poor', 'Being unknown'],
            answer: 1,
          },
        ],
        cardId: 'card-socrates',
      },
      {
        id: 'greek-plato-aristotle',
        title: 'Plato, Aristotle & the Good Life',
        years: 'c. 428–322 BCE',
        emoji: '📖',
        background:
          'Socrates\' student Plato imagined a just society guided by wisdom, and taught that beyond the shifting world of appearances lie eternal ideals — above all, the Good. His student Aristotle brought philosophy down to earth: happiness (eudaimonia) is a life of virtue, and virtue is a habit built by practice. Courage, generosity, and honesty each lie at a golden mean between two extremes. Together they shaped how the world thinks about ethics, character, and community.',
        figures: ['Plato', 'Aristotle'],
        teachings: [
          'A good society must be guided by wisdom and justice',
          'Happiness is activity of the soul in accordance with virtue',
          'Virtue is a habit: we become just by doing just acts',
        ],
        concepts: ['The Form of the Good', 'Eudaimonia (flourishing)', 'The golden mean'],
        quiz: [
          {
            q: 'For Aristotle, virtue is best understood as…',
            options: ['A lucky gift at birth', 'A habit built by practice', 'A set of rules to memorize', 'Something only philosophers have'],
            answer: 1,
          },
          {
            q: 'The "golden mean" means virtue lies…',
            options: ['In extreme behaviour', 'Between two extremes', 'In wealth', 'In avoiding all action'],
            answer: 1,
          },
          {
            q: 'What did Aristotle call true happiness or flourishing?',
            options: ['Hedonia', 'Eudaimonia', 'Nirvana', 'Ataraxia'],
            answer: 1,
          },
        ],
        cardId: 'card-aristotle',
      },
    ],
  },
  {
    id: 'confucius',
    name: 'Confucius',
    emoji: '📜',
    period: '551–479 BCE',
    badgeTitle: 'Confucian Philosophy Completed',
    points: [
      {
        id: 'confucius-ren',
        title: 'Confucius & the Way of Ren 仁',
        years: '551–479 BCE',
        emoji: '📜',
        background:
          'In an age of war and disorder, Confucius (Kongzi 孔子) taught that a harmonious world begins with the cultivation of each person. His central virtue was ren 仁 — humaneness, the deep care of one person for another. Through li 礼 (ritual propriety), filial devotion, and lifelong learning, anyone can become a junzi 君子, an exemplary person. His vision reached its height in the ideal of Datong 大同, the Great Harmony: a world where the world is shared by all (天下为公), the old are cared for, the young are nurtured, and trust prevails.',
        figures: ['Confucius (Kongzi 孔子)'],
        teachings: [
          '"Do not impose on others what you yourself do not desire" (己所不欲，勿施于人)',
          'Cultivate yourself → regulate the family → order the state → bring peace to the world',
          'The Great Harmony 大同: a world shared by all, where all people are cared for',
        ],
        concepts: ['Ren 仁 (humaneness)', 'Li 礼 (propriety)', 'Junzi 君子 (exemplary person)', 'Datong 大同 (Great Harmony)'],
        quiz: [
          {
            q: 'What is ren 仁, the central virtue of Confucius?',
            options: ['Military skill', 'Humaneness — deep care for others', 'Cleverness in argument', 'Strict obedience'],
            answer: 1,
          },
          {
            q: 'According to Confucius, a harmonious world begins with…',
            options: ['Strong laws', 'Cultivating oneself', 'Great wealth', 'Powerful armies'],
            answer: 1,
          },
          {
            q: 'What does Datong 大同 describe?',
            options: [
              'A world of Great Harmony shared by all',
              'A single world government',
              'A famous palace',
              'A style of calligraphy',
            ],
            answer: 0,
          },
        ],
        cardId: 'card-confucius',
      },
    ],
  },
  {
    id: 'daoism',
    name: 'Daoism',
    emoji: '☯️',
    period: 'c. 6th–4th century BCE',
    badgeTitle: 'Daoist Wisdom Explorer',
    points: [
      {
        id: 'daoism-laozi',
        title: 'Laozi & the Dao 道',
        years: 'c. 6th century BCE',
        emoji: '☯️',
        background:
          'The Daodejing 道德经, attributed to the sage Laozi 老子, teaches that behind all things flows the Dao 道 — the Way. Water is its image: soft yet overcoming the hard, always seeking the low place, nourishing all without contending. Laozi taught wu wei 无为 — effortless action that does not force — and prized simplicity, humility, and contentment. Where Confucius perfected human relationships, Laozi reminded humanity to stay rooted in nature\'s quiet rhythm.',
        figures: ['Laozi 老子', 'Zhuangzi 庄子'],
        teachings: [
          '"The highest good is like water" (上善若水)',
          'Act without forcing (wu wei 无为); great results come without contention',
          '"A journey of a thousand miles begins with a single step" (千里之行，始于足下)',
        ],
        concepts: ['Dao 道 (the Way)', 'Wu wei 无为', 'Ziran 自然 (naturalness)', 'Simplicity'],
        quiz: [
          {
            q: 'Why did Laozi admire water?',
            options: [
              'It is soft yet overcomes the hard, and nourishes without contending',
              'It is powerful and destructive',
              'It is rare and precious',
              'It always moves upward',
            ],
            answer: 0,
          },
          {
            q: 'Wu wei 无为 is best translated as…',
            options: ['Doing nothing at all', 'Effortless, unforced action', 'Working extremely hard', 'Strict discipline'],
            answer: 1,
          },
          {
            q: 'A journey of a thousand miles begins with…',
            options: ['A great map', 'A single step', 'A fast horse', 'A large supply'],
            answer: 1,
          },
        ],
        cardId: 'card-laozi',
      },
    ],
  },
  {
    id: 'mencius',
    name: 'Mencius',
    emoji: '🌾',
    period: '372–289 BCE',
    badgeTitle: 'Mencian Wisdom Explorer',
    points: [
      {
        id: 'mencius-goodness',
        title: 'Mencius & Innate Goodness',
        years: '372–289 BCE',
        emoji: '🌾',
        background:
          'Mencius (Mengzi 孟子), the greatest heir of Confucius, taught that human nature is originally good. Anyone who sees a child about to fall into a well feels alarm and compassion — proof, he said, that the seeds of virtue are born in every heart. These "four sprouts" — compassion, shame, courtesy, and the sense of right and wrong — grow into full virtues when nourished, like grain ripening in a well-tended field. A ruler, he insisted, earns legitimacy only by caring for the people.',
        figures: ['Mencius (Mengzi 孟子)'],
        teachings: [
          'Human nature contains the seeds of goodness — cultivate them daily',
          'The four sprouts: compassion, shame, courtesy, and moral discernment',
          'The people are the most important; a ruler must serve their welfare',
        ],
        concepts: ['The four sprouts (四端)', 'Innate goodness', 'Benevolent government (仁政)'],
        quiz: [
          {
            q: 'What did Mencius believe about human nature?',
            options: ['It is originally evil', 'It is originally good', 'It is a blank slate', 'It cannot change'],
            answer: 1,
          },
          {
            q: 'The "four sprouts" are seeds of…',
            options: ['Wealth', 'Virtue', 'Knowledge', 'Power'],
            answer: 1,
          },
          {
            q: 'Mencius used the child at the well to show that…',
            options: [
              'People are careless',
              'Compassion arises naturally in the human heart',
              'Wells are dangerous',
              'Children need supervision',
            ],
            answer: 1,
          },
        ],
        cardId: 'card-mencius',
      },
    ],
  },
  {
    id: 'buddhism',
    name: 'Buddhism',
    emoji: '🪷',
    period: 'c. 563–483 BCE',
    badgeTitle: 'Buddhist Wisdom Explorer',
    points: [
      {
        id: 'buddhism-buddha',
        title: 'The Buddha & the Middle Way',
        years: 'c. 563–483 BCE',
        emoji: '🪷',
        background:
          'Siddhartha Gautama left a life of palace luxury to seek the cause of suffering. After years of searching he awoke beneath the Bodhi tree and became the Buddha — "the awakened one." He taught the Four Noble Truths: suffering exists, it arises from craving, it can cease, and there is a path to its ceasing — the Eightfold Path of right understanding, intention, speech, action, livelihood, effort, mindfulness, and concentration. His way is a Middle Way between indulgence and harsh denial, walked with compassion (karuna) and loving-kindness (metta) for all beings.',
        figures: ['Siddhartha Gautama (the Buddha)'],
        teachings: [
          'The Four Noble Truths: understand suffering and the path beyond it',
          'The Eightfold Path: wisdom, ethics, and mental discipline together',
          'Meet all beings with compassion and loving-kindness',
        ],
        concepts: ['The Middle Way', 'Mindfulness', 'Karuna (compassion)', 'Metta (loving-kindness)'],
        quiz: [
          {
            q: 'According to the Buddha, suffering arises from…',
            options: ['Bad luck', 'Craving and attachment', 'Other people', 'The gods'],
            answer: 1,
          },
          {
            q: 'The Middle Way lies between…',
            options: ['Rich and poor', 'Indulgence and harsh self-denial', 'East and West', 'Youth and age'],
            answer: 1,
          },
          {
            q: 'Metta means…',
            options: ['Loving-kindness', 'Strict discipline', 'Deep sleep', 'Sacred fire'],
            answer: 0,
          },
        ],
        cardId: 'card-buddha',
      },
    ],
  },
  {
    id: 'christianity',
    name: 'Christianity',
    emoji: '✝️',
    period: '1st century CE',
    badgeTitle: 'Christian Wisdom Explorer',
    points: [
      {
        id: 'christianity-jesus',
        title: 'Jesus & the Ethic of Love',
        years: 'c. 4 BCE–30 CE',
        emoji: '✝️',
        background:
          'In Roman-ruled Galilee, Jesus of Nazareth taught a radical ethic of love: love God, and love your neighbour as yourself — even your enemy. In the Sermon on the Mount he blessed the meek, the merciful, and the peacemakers, and gave the Golden Rule: do to others what you would have them do to you. His parables — the Good Samaritan, the Prodigal Son — taught that compassion crosses every boundary and that forgiveness restores what is broken. This ethic of unconditional love and service became one of the most influential moral visions in history.',
        figures: ['Jesus of Nazareth'],
        teachings: [
          '"Love your neighbour as yourself" — and even your enemies',
          'The Golden Rule: do to others what you would have them do to you',
          'Blessed are the merciful and the peacemakers',
        ],
        concepts: ['Agape (unconditional love)', 'Forgiveness', 'Service', 'The Golden Rule'],
        quiz: [
          {
            q: 'The Golden Rule teaches…',
            options: [
              'Treat others as you would have them treat you',
              'An eye for an eye',
              'Look after yourself first',
              'Rules are golden and unbreakable',
            ],
            answer: 0,
          },
          {
            q: 'The parable of the Good Samaritan shows that…',
            options: ['Travel is dangerous', 'Compassion crosses every boundary', 'Priests are always kind', 'Strangers cannot be trusted'],
            answer: 1,
          },
          {
            q: 'In the Sermon on the Mount, Jesus blessed…',
            options: ['The powerful and wealthy', 'The merciful and the peacemakers', 'The clever and famous', 'The strong and fearless'],
            answer: 1,
          },
        ],
        cardId: 'card-jesus',
      },
    ],
  },
  {
    id: 'islamic',
    name: 'Islamic Philosophy',
    emoji: '🌙',
    period: '8th–13th century CE',
    badgeTitle: 'Islamic Wisdom Explorer',
    points: [
      {
        id: 'islamic-golden-age',
        title: 'The Golden Age of Islamic Thought',
        years: '8th–13th century CE',
        emoji: '🌙',
        background:
          'While much of Europe\'s ancient learning lay scattered, scholars of the Islamic world gathered, translated, and transformed it. In Baghdad\'s House of Wisdom, thinkers such as Al-Farabi, Avicenna (Ibn Sina), and Averroes (Ibn Rushd) wove Greek philosophy together with faith, medicine, mathematics, and astronomy. Al-Ghazali explored the inner life of the heart, and the Sufi poet Rumi sang of a love that unites all beings. Their work carried the flame of wisdom across centuries and cultures, later reigniting learning in Europe.',
        figures: ['Avicenna (Ibn Sina)', 'Averroes (Ibn Rushd)', 'Al-Ghazali', 'Rumi'],
        teachings: [
          'Reason and faith can illuminate one another',
          'Seek knowledge wherever it is found — learning is a bridge between cultures',
          'Rumi: "Out beyond ideas of wrongdoing and rightdoing, there is a field. I\'ll meet you there."',
        ],
        concepts: ['The House of Wisdom', 'Falsafa (philosophy)', 'Sufi love & unity'],
        quiz: [
          {
            q: 'What was the House of Wisdom?',
            options: [
              'A famous mosque',
              'A great centre of translation and scholarship in Baghdad',
              'A royal palace',
              'A trading market',
            ],
            answer: 1,
          },
          {
            q: 'Islamic Golden Age scholars are known for…',
            options: [
              'Rejecting all foreign learning',
              'Preserving and transforming knowledge across cultures',
              'Studying only poetry',
              'Avoiding science',
            ],
            answer: 1,
          },
          {
            q: 'Rumi is celebrated as…',
            options: ['A general', 'A Sufi poet of love and unity', 'An architect', 'A mapmaker'],
            answer: 1,
          },
        ],
        cardId: 'card-rumi',
      },
    ],
  },
  {
    id: 'enlightenment',
    name: 'The Enlightenment',
    emoji: '💡',
    period: '17th–18th century CE',
    badgeTitle: 'Enlightenment Explorer',
    points: [
      {
        id: 'enlightenment-reason',
        title: 'Reason, Rights & Human Dignity',
        years: '17th–18th century CE',
        emoji: '💡',
        background:
          'European thinkers of the Enlightenment dared people to think for themselves. Kant\'s motto was "Sapere aude" — dare to know. He taught that every person must be treated as an end in themselves, never merely as a means, and asked us to act only on principles we could will for everyone. Locke argued for natural rights to life and liberty; Rousseau explored the social contract that binds free people together. These ideas of universal dignity, tolerance, and human rights still shape our world — and echo the ancient dream of a world shared by all.',
        figures: ['Immanuel Kant', 'John Locke', 'Jean-Jacques Rousseau', 'Mary Wollstonecraft'],
        teachings: [
          '"Dare to know" — think for yourself, courageously and honestly',
          'Treat every person as an end, never merely as a means',
          'All people share natural rights and equal dignity',
        ],
        concepts: ['Reason', 'The categorical imperative', 'Natural rights', 'The social contract'],
        quiz: [
          {
            q: 'Kant\'s motto "Sapere aude" means…',
            options: ['Obey wisely', 'Dare to know', 'Live simply', 'Fear nothing'],
            answer: 1,
          },
          {
            q: 'Kant taught that every person must be treated as…',
            options: ['A means to progress', 'An end in themselves', 'A subject of the state', 'A competitor'],
            answer: 1,
          },
          {
            q: 'Enlightenment thinkers argued that rights and dignity belong to…',
            options: ['Kings only', 'The educated only', 'All people', 'The wealthy'],
            answer: 2,
          },
        ],
        cardId: 'card-kant',
      },
    ],
  },
  {
    id: 'modern',
    name: 'Modern Thinkers',
    emoji: '🌏',
    period: '19th–20th century CE',
    badgeTitle: 'Global Wisdom Explorer',
    points: [
      {
        id: 'modern-gandhi-king',
        title: 'Gandhi, King & the Power of Nonviolence',
        years: '1869–1968',
        emoji: '🕊️',
        background:
          'In the modern age, ancient wisdom became a force for transforming whole societies. Mahatma Gandhi fused the Indian ideal of ahimsa (non-harm) with satyagraha — "truth-force" — leading India to freedom without hatred. Martin Luther King Jr. carried this torch, joining the ethic of love with the demand for justice: "Darkness cannot drive out darkness; only light can do that." Thinkers like Kang Youwei revived the dream of Datong 大同 for the modern world, and the Universal Declaration of Human Rights gave humanity a shared moral charter. The journey to Great Harmony continues — through each of us.',
        figures: ['Mahatma Gandhi', 'Martin Luther King Jr.', 'Kang Youwei 康有为', 'Eleanor Roosevelt'],
        teachings: [
          '"Be the change you wish to see in the world"',
          'Nonviolence is the weapon of the strong: meet hatred with love',
          'The dream of Great Harmony belongs to all humanity',
        ],
        concepts: ['Ahimsa (non-harm)', 'Satyagraha (truth-force)', 'Universal human rights', 'Datong 大同 renewed'],
        quiz: [
          {
            q: 'Satyagraha, Gandhi\'s method, means…',
            options: ['Silent protest', 'Truth-force — nonviolent resistance', 'Armed struggle', 'Political negotiation'],
            answer: 1,
          },
          {
            q: 'King taught that darkness can only be driven out by…',
            options: ['Greater darkness', 'Light', 'Time', 'Forgetting'],
            answer: 1,
          },
          {
            q: 'Kang Youwei renewed which ancient ideal for the modern age?',
            options: ['Wu wei 无为', 'Datong 大同 — the Great Harmony', 'The golden mean', 'The social contract'],
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
