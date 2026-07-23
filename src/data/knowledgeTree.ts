import type { Topic, Lesson } from './types';

export const TOPICS: Topic[] = [
  // ── Root ─────────────────────────────────────────────────────────────
  {
    id: 'wisdom',
    name: 'Wisdom',
    zh: '智',
    emoji: '🦉',
    branch: 'root',
    parentId: null,
    intro: 'The root of the path. What wisdom is, and why it must be lived, not only known.',
    cardId: 'card-wisdom',
    lessons: [
      {
        id: 'wisdom-1',
        title: 'What Is Wisdom?',
        reading:
          'Knowledge is knowing many things; wisdom is knowing how to live. A person can memorize a thousand facts and still act foolishly, while a farmer who has never read a book may live with deep wisdom. Every great tradition agrees on this: wisdom joins understanding with action. Confucius said that to learn without thinking is useless, and to think without learning is dangerous. Socrates showed that wisdom begins with humility — admitting how much we do not know. And all traditions agree on a second point: wisdom is not a possession but a practice. It grows the way a tree grows — slowly, daily, through seasons of effort. On this journey, every lesson you read matters only when it changes how you treat the next person you meet.',
        question: {
          q: 'What separates wisdom from mere knowledge?',
          options: [
            'Wisdom requires a good memory',
            'Wisdom joins understanding with action',
            'Wisdom comes only from books',
            'There is no difference',
          ],
          answer: 1,
        },
        reflection: 'Think of the wisest person you know. What do they do — not just know — that makes them wise?',
      },
    ],
  },

  // ── Branches ─────────────────────────────────────────────────────────
  {
    id: 'compassion',
    name: 'Compassion',
    zh: '仁',
    emoji: '💗',
    branch: 'compassion',
    parentId: 'wisdom',
    intro: 'The heart of the path: feeling with others and acting for their good.',
    lessons: [
      {
        id: 'compassion-1',
        title: 'The Heart That Feels With Others',
        reading:
          'Compassion is the ability to feel another\'s joy and pain as if it were partly your own — and to act on that feeling. Mencius taught that compassion is a seed born in every heart: anyone who sees a child about to fall into a well feels alarm, before any thought of reward. The Buddha called it karuna and made it a pillar of the path. Jesus made it the measure of all law: love your neighbour as yourself. Compassion is not pity, which looks down, nor mere sentiment, which does nothing. It stands beside another person and asks: what do you need? Like a muscle, it grows with use — each small act of care makes the next one easier.',
        question: {
          q: 'How is compassion different from pity?',
          options: [
            'Compassion looks down on others',
            'Compassion stands beside others and acts',
            'Pity is stronger than compassion',
            'They are the same thing',
          ],
          answer: 1,
        },
        reflection: 'When did someone show you real compassion? How did it change what you believed about people?',
      },
    ],
  },
  {
    id: 'character',
    name: 'Character',
    zh: '德',
    emoji: '⛰️',
    branch: 'character',
    parentId: 'wisdom',
    intro: 'The backbone of the path: who you are when it is difficult.',
    lessons: [
      {
        id: 'character-1',
        title: 'Building the Inner Mountain',
        reading:
          'Character is who you are when no one is watching and when everything is difficult. Aristotle taught that character is built the way a wall is built — one brick, one act, at a time: we become brave by doing brave things, honest by telling the truth. Confucius spent his life describing the junzi 君子, the person of cultivated character, who is "calm and at ease" while the petty person is "full of worry" — because the junzi\'s foundation is inside, not in circumstances. Character has a quiet compound interest: every time you keep a promise, resist a temptation, or own a mistake, you are not just doing one good act — you are becoming the kind of person who does such acts.',
        question: {
          q: 'According to Aristotle, how is character built?',
          options: [
            'It is fixed at birth',
            'Through one act at a time, like building a wall',
            'By reading philosophy',
            'By avoiding all difficulty',
          ],
          answer: 1,
        },
        reflection: 'What is one small promise to yourself you could keep every day this week?',
      },
    ],
  },
  {
    id: 'understanding',
    name: 'Understanding',
    zh: '明',
    emoji: '🔆',
    branch: 'understanding',
    parentId: 'wisdom',
    intro: 'The eyes of the path: seeing yourself and the world clearly.',
    lessons: [
      {
        id: 'understanding-1',
        title: 'Seeing Clearly',
        reading:
          'Understanding is the practice of seeing things as they are — including yourself. Laozi wrote: "Knowing others is intelligence; knowing yourself is true wisdom" (知人者智，自知者明). Most of our mistakes come not from bad intentions but from unclear seeing: we judge before we listen, react before we reflect, and mistake our first impression for the whole truth. The traditions offer the same medicine in different bottles: the Buddhist practice of mindfulness, the Confucian daily self-examination, the Socratic habit of questioning assumptions. All slow the mind down long enough to see what is actually there. Clear seeing is the beginning of every other virtue — you cannot be kind to a person you have not truly seen.',
        question: {
          q: 'According to Laozi, what is true wisdom (明)?',
          options: ['Knowing many facts', 'Knowing others', 'Knowing yourself', 'Knowing the future'],
          answer: 2,
        },
        reflection: 'What is one assumption about someone in your life that might deserve a second look?',
      },
    ],
  },

  // ── Compassion leaves ────────────────────────────────────────────────
  {
    id: 'kindness',
    name: 'Kindness',
    zh: '慈',
    emoji: '🌸',
    branch: 'compassion',
    parentId: 'compassion',
    intro: 'Small acts of warmth that ripple outward.',
    cardId: 'card-kindness',
    lessons: [
      {
        id: 'kindness-1',
        title: 'The Ripple Effect',
        reading:
          'Kindness is compassion in its everyday clothes. It rarely looks heroic: a sincere greeting, a door held, a message to someone who is struggling, credit given where it is due. Yet kindness is one of the most contagious forces in human life — studies and centuries of experience agree that one act of kindness reliably inspires others, rippling outward to people the original giver will never meet. Laozi counted kindness among his three treasures. The Dalai Lama put it simply: "My religion is kindness." Because it costs so little, we underestimate it; because it means so much, no act of kindness is ever wasted.',
        question: {
          q: 'Why is kindness described as a ripple?',
          options: [
            'It is weak and fades quickly',
            'One act inspires others, spreading beyond the giver',
            'It only works in water',
            'It only helps the giver',
          ],
          answer: 1,
        },
        reflection: 'Recall a small kindness you never forgot. Why did it stay with you?',
      },
      {
        id: 'kindness-2',
        title: 'Practising Kindness',
        reading:
          'Kindness grows through deliberate practice. Try this: each morning, choose one person who will receive an intentional act of kindness from you today — a specific compliment, a helping hand, a patient ear. Include the difficult people; kindness to pleasant people is easy, and easy practice builds little strength. And do not forget yourself: harsh self-talk trains the habit of harshness. The goal is for kindness to move from something you do to something you are.',
        question: {
          q: 'Why practise kindness toward difficult people?',
          options: [
            'To win them over for personal gain',
            'Because easy practice builds little strength',
            'To prove you are better than them',
            'It is not worth doing',
          ],
          answer: 1,
        },
        reflection: 'Who is one person you find difficult — and what small kindness could you offer them tomorrow?',
      },
    ],
  },
  {
    id: 'forgiveness',
    name: 'Forgiveness',
    zh: '恕',
    emoji: '🕊️',
    branch: 'compassion',
    parentId: 'compassion',
    intro: 'Releasing resentment to free yourself and others.',
    cardId: 'card-forgiveness',
    lessons: [
      {
        id: 'forgiveness-1',
        title: 'Setting Down the Burden',
        reading:
          'Resentment has been called drinking poison and expecting the other person to suffer. Forgiveness is the decision to set the poison down. It does not mean pretending the wrong never happened, excusing it, or even reconciling — it means releasing your claim to revenge so the wound can close. When Confucius was asked for one word to guide a whole life, he chose shu 恕 — reciprocity, often written with the heart radical: "as one\'s own heart." Jesus asked forgiveness even for his executioners. Gandhi taught that forgiveness is the attribute of the strong, not the weak. The person freed first by forgiveness is always the one who forgives.',
        question: {
          q: 'What does forgiveness actually mean?',
          options: [
            'Pretending the wrong never happened',
            'Releasing resentment so the wound can close',
            'Letting people harm you again',
            'Forgetting everything',
          ],
          answer: 1,
        },
        reflection: 'Is there a resentment you are carrying that harms you more than anyone else?',
      },
      {
        id: 'forgiveness-2',
        title: 'Practising Forgiveness',
        reading:
          'Forgiveness is usually a process, not a moment. Start small: forgive the driver who cut you off, the friend who forgot to reply. For deeper wounds, try writing a letter you never send — name the harm honestly, then name your decision to stop carrying it. Include yourself: many people find self-forgiveness hardest of all, yet carrying old shame helps no one you wronged. Each act of letting go clears ground where something better can grow.',
        question: {
          q: 'What is a good way to begin practising forgiveness?',
          options: [
            'Start with the deepest wound',
            'Start small, with everyday irritations',
            'Wait for an apology first',
            'Avoid thinking about it',
          ],
          answer: 1,
        },
        reflection: 'What is one small irritation from this week you can simply decide to release right now?',
      },
    ],
  },
  {
    id: 'service',
    name: 'Service',
    zh: '奉献',
    emoji: '🤲',
    branch: 'compassion',
    parentId: 'compassion',
    intro: 'Finding yourself by giving yourself.',
    cardId: 'card-service',
    lessons: [
      {
        id: 'service-1',
        title: 'The Paradox of Giving',
        reading:
          'Every wisdom tradition discovered the same paradox: those who give themselves away become richer. Gandhi said the best way to find yourself is to lose yourself in the service of others. Laozi observed that the sage, by living for others, is fulfilled. Modern research agrees — people who volunteer and help others report more meaning and happiness than those who chase pleasure alone. Service also completes the journey of virtue: compassion that never becomes action remains a feeling. In the vision of Datong 大同, a harmonious world is simply this paradox lived at scale — everyone contributing their strength, everyone cared for in need.',
        question: {
          q: 'What is the paradox of service?',
          options: [
            'Giving to others leaves you with less',
            'Those who give themselves away become richer',
            'Service only helps the receiver',
            'Only wealthy people can serve',
          ],
          answer: 1,
        },
        reflection: 'When has helping someone else lifted your own spirits? What does that tell you?',
      },
      {
        id: 'service-2',
        title: 'Practising Service',
        reading:
          'Service does not require grand gestures. Ask three questions each week: Who around me is struggling? What am I good at? Where do those meet? Service that uses your real strengths — cooking, listening, fixing, teaching, organizing — lasts longer than service done from guilt. Start with a radius of one metre: family, neighbours, colleagues. Then let the circle widen. A community where everyone serves within their reach needs no heroes.',
        question: {
          q: 'What makes service sustainable?',
          options: [
            'Doing it from guilt',
            'Grand, dramatic gestures',
            'Using your real strengths where they meet real needs',
            'Serving only strangers',
          ],
          answer: 2,
        },
        reflection: 'What is one strength of yours, and who within one metre of your life could it help this week?',
      },
    ],
  },

  // ── Character leaves ─────────────────────────────────────────────────
  {
    id: 'humility',
    name: 'Humility',
    zh: '谦',
    emoji: '🌾',
    branch: 'character',
    parentId: 'character',
    intro: 'Strength that does not need to announce itself.',
    cardId: 'card-humility',
    lessons: [
      {
        id: 'humility-1',
        title: 'The Valley Spirit',
        reading:
          'Laozi loved images of lowness: the valley that gathers all streams, the ocean that is king of a hundred rivers because it lies below them. Humility is not thinking less of yourself; it is thinking of yourself less — seeing your true size in a vast world, honestly acknowledging both your strengths and your limits. Socrates was called the wisest man in Athens precisely because he knew what he did not know. The ripest grain bows lowest, says the proverb. Humility is also the door to all learning: a full cup can receive nothing. Arrogance closes that door and, worse, closes people\'s hearts.',
        question: {
          q: 'What is humility?',
          options: [
            'Thinking you are worthless',
            'Seeing your true size honestly — strengths and limits alike',
            'Never accepting praise',
            'Letting others mistreat you',
          ],
          answer: 1,
        },
        reflection: 'What is something you are not good at that you could openly admit — and maybe ask for help with?',
      },
      {
        id: 'humility-2',
        title: 'Practising Humility',
        reading:
          'Try these practices: ask a genuine question of someone you usually instruct; say "I was wrong" plainly, without excuses, the next time you are; give away credit for a success that others shared in; and each day, learn one thing from someone unexpected — a child, a beginner, a critic. Humility grows fastest at the exact moments pride resists most.',
        question: {
          q: 'When does humility grow fastest?',
          options: [
            'When everything goes well',
            'At the moments pride resists most',
            'When we are praised',
            'When we avoid other people',
          ],
          answer: 1,
        },
        reflection: 'When did you last say "I was wrong" without adding an excuse? How did it feel?',
      },
    ],
  },
  {
    id: 'patience',
    name: 'Patience',
    zh: '忍',
    emoji: '🐢',
    branch: 'character',
    parentId: 'character',
    intro: 'The quiet power of enduring and waiting well.',
    cardId: 'card-patience',
    lessons: [
      {
        id: 'patience-1',
        title: 'The Strength to Wait',
        reading:
          'A farmer in the old Chinese tale, impatient for his rice to grow, pulled each seedling up a little to "help" — and by evening the whole field had withered. Patience is the wisdom that growth has its own pace: in crops, in skills, in people, in ourselves. It is not passive; the patient farmer still waters, weeds, and tends. Patience is also the guardian at anger\'s door — the pause between a provocation and your response, in which your best self can catch up with your first impulse. "Patience is bitter," said Rousseau, "but its fruit is sweet."',
        question: {
          q: 'What does the tale of the impatient farmer teach?',
          options: [
            'Rice needs more fertilizer',
            'Forcing growth destroys it; growth has its own pace',
            'Farming is not worthwhile',
            'Help always makes things better',
          ],
          answer: 1,
        },
        reflection: 'Where in your life are you "pulling on seedlings" — trying to force what needs time?',
      },
      {
        id: 'patience-2',
        title: 'Practising Patience',
        reading:
          'Patience can be trained like a muscle. Practise the sacred pause: when irritation flares, take one full breath before speaking. Use waiting itself as practice — a queue or a delay is a free gymnasium for the mind; notice the irritation, and let it pass like weather. And practise patience with yourself most of all: you are also a field that ripens slowly. The goal is not to never feel impatience, but to stop letting it drive.',
        question: {
          q: 'What is the "sacred pause"?',
          options: [
            'A long holiday',
            'One full breath between provocation and response',
            'Refusing to ever speak',
            'A form of meditation retreat',
          ],
          answer: 1,
        },
        reflection: 'What situation most reliably triggers your impatience? What would the pause look like there?',
      },
    ],
  },
  {
    id: 'integrity',
    name: 'Integrity',
    zh: '诚',
    emoji: '🧭',
    branch: 'character',
    parentId: 'character',
    intro: 'Being whole: one person in public and in private.',
    cardId: 'card-integrity',
    lessons: [
      {
        id: 'integrity-1',
        title: 'One Whole Person',
        reading:
          'Integrity comes from the word for "whole" — an integer, undivided. A person of integrity is the same person in public and in private, in success and under pressure. Confucian thought prizes cheng 诚, sincerity: no gap between what you believe, say, and do. Its power is trust: every kept promise is a brick in the invisible bridge others can walk on; every broken one removes ten. Integrity is expensive in the moment — the honest answer may cost an advantage — and priceless over a lifetime, because a reputation for truth cannot be bought at any price. As the junzi ideal teaches: the exemplary person is watchful over themselves even when alone.',
        question: {
          q: 'What does cheng 诚 (sincerity) mean?',
          options: [
            'Saying what people want to hear',
            'No gap between what you believe, say, and do',
            'Never changing your mind',
            'Speaking formally',
          ],
          answer: 1,
        },
        reflection: 'Is there a gap anywhere between what you say and what you do? What would closing it require?',
      },
      {
        id: 'integrity-2',
        title: 'Practising Integrity',
        reading:
          'Integrity is built in small transactions: return the extra change, admit the missed deadline, keep the minor promise no one would notice you breaking. Beware the "just this once" doorway — almost every large compromise began as a small one. A useful test: before acting, ask whether you would be comfortable if the people you most respect could see. Practise also the harder half of integrity: keeping promises to yourself, which quietly teaches you whether your own word can be trusted.',
        question: {
          q: 'Where is integrity mainly built?',
          options: [
            'In dramatic public moments',
            'In small everyday transactions',
            'In what we say about ourselves',
            'In formal ceremonies',
          ],
          answer: 1,
        },
        reflection: 'What small promise to yourself, kept daily, would most change your life in a year?',
      },
    ],
  },

  // ── Understanding leaves ─────────────────────────────────────────────
  {
    id: 'reflection',
    name: 'Reflection',
    zh: '省',
    emoji: '🪞',
    branch: 'understanding',
    parentId: 'understanding',
    intro: 'The daily mirror: examining your own life.',
    cardId: 'card-reflection',
    lessons: [
      {
        id: 'reflection-1',
        title: 'The Daily Examination',
        reading:
          'Confucius\' student Zengzi examined himself daily on three points: Was I faithful in what I did for others? Was I trustworthy with friends? Did I practise what I was taught? (吾日三省吾身). Socrates went further: the unexamined life is not worth living. Reflection is how experience becomes wisdom — without it, we can repeat the same year of mistakes forty times and call it forty years of experience. It needs only minutes: a look back at the day, honest but kind, asking what went well, what went wrong, and what to try tomorrow. The mirror is not for punishing yourself; it is for seeing yourself.',
        question: {
          q: 'How does experience become wisdom?',
          options: [
            'Automatically, with age',
            'Through honest reflection on experience',
            'By forgetting failures',
            'Through others\' opinions',
          ],
          answer: 1,
        },
        reflection: 'Looking honestly but kindly at yesterday: what is one thing you would do differently?',
      },
      {
        id: 'reflection-2',
        title: 'Practising Reflection',
        reading:
          'Give reflection a fixed home in your day — evenings work well, and this app\'s Evening Reflection is built for it. Keep it short and honest: three questions, three sentences. Watch for patterns across days, not verdicts on single ones: patterns are where the real lessons live. And end each reflection facing forward — one small intention for tomorrow — so the mirror becomes a window.',
        question: {
          q: 'What should reflection look for across days?',
          options: ['Reasons to feel guilty', 'Patterns, where real lessons live', 'Other people\'s faults', 'Perfect days only'],
          answer: 1,
        },
        reflection: 'What pattern — good or bad — have you noticed in your last few days?',
      },
    ],
  },
  {
    id: 'discernment',
    name: 'Discernment',
    zh: '辨',
    emoji: '⚖️',
    branch: 'understanding',
    parentId: 'understanding',
    intro: 'Judging well: truth from noise, better from worse.',
    cardId: 'card-discernment',
    lessons: [
      {
        id: 'discernment-1',
        title: 'Weighing What Is True',
        reading:
          'Discernment is the skill of judging well — telling truth from noise, the important from the urgent, the better from the merely easier. Confucius warned against both extremes of laziness: believing everything and doubting everything. The Buddha told the Kalamas not to accept a teaching merely because of tradition, rumour, or authority — but to test it: does it lead to harm or to welfare? In an age of infinite information, discernment matters more than ever: the question is no longer how to find information but how to weigh it. Ask of what you hear: Who says so? How do they know? What would change my mind?',
        question: {
          q: 'What test did the Buddha give the Kalamas for any teaching?',
          options: [
            'Is it ancient?',
            'Is it popular?',
            'Does it lead to harm or to welfare when practised?',
            'Is it beautifully written?',
          ],
          answer: 2,
        },
        reflection: 'What belief do you hold mainly because you have never questioned it?',
      },
      {
        id: 'discernment-2',
        title: 'Practising Discernment',
        reading:
          'Train judgment deliberately. Before sharing a claim, pause: is it true, and is it helpful? Before a decision, name what would count as evidence you are wrong — a mind that cannot be changed cannot discern. Seek one voice you respect who disagrees with you, and listen to understand rather than to answer. Discernment also applies to attention itself: what you repeatedly attend to shapes what you become, so choose your inputs like you choose your food.',
        question: {
          q: 'Why should you name what would change your mind?',
          options: [
            'To win arguments',
            'A mind that cannot be changed cannot discern',
            'To seem open-minded',
            'It is not useful',
          ],
          answer: 1,
        },
        reflection: 'What do you give your attention to daily — and what is it slowly making of you?',
      },
    ],
  },
  {
    id: 'awareness',
    name: 'Awareness',
    zh: '觉',
    emoji: '🧘',
    branch: 'understanding',
    parentId: 'understanding',
    intro: 'Being fully present in this moment.',
    cardId: 'card-awareness',
    lessons: [
      {
        id: 'awareness-1',
        title: 'Waking Up to Now',
        reading:
          'The word "Buddha" simply means "the awakened one" — and what he awoke to, above all, was the present moment, seen clearly and without grasping. Most of life is missed on autopilot: we eat without tasting, listen without hearing, walk without arriving anywhere inside ourselves. Awareness — mindfulness — is the practice of returning: to the breath, to the senses, to the person actually in front of you. It is the soil of every other virtue: you cannot be patient, kind, or honest in a moment you are not present for. Zhuangzi praised the artisan whose full attention made work effortless; presence is not only calming, it is how excellence happens.',
        question: {
          q: 'Why is awareness called the soil of other virtues?',
          options: [
            'It is the oldest virtue',
            'You cannot practise any virtue in a moment you are absent from',
            'It requires the most study',
            'It replaces the other virtues',
          ],
          answer: 1,
        },
        reflection: 'What part of your day do you most often spend on autopilot? What might you be missing there?',
      },
      {
        id: 'awareness-2',
        title: 'Practising Awareness',
        reading:
          'Awareness is trained in ordinary moments. Try one mindful minute: stop, and take five slow breaths, feeling each one fully. Do one daily task — tea, washing dishes, a short walk — with complete attention, as if for the first time. In conversation, practise listening with your whole self, without rehearsing your reply. When the mind wanders (it will, thousands of times), the practice is not to never wander — it is the gentle return. Every return is one repetition of the most important exercise there is.',
        question: {
          q: 'When the mind wanders during practice, what is the real exercise?',
          options: [
            'Forcing the mind to never wander',
            'Giving up for the day',
            'The gentle return of attention',
            'Thinking harder',
          ],
          answer: 2,
        },
        reflection: 'Choose one daily task to do with full attention tomorrow. Which will it be?',
      },
    ],
  },
];

export const ALL_LESSONS: Lesson[] = TOPICS.flatMap((t) => t.lessons);

export function topicOfLesson(lessonId: string): Topic | undefined {
  return TOPICS.find((t) => t.lessons.some((l) => l.id === lessonId));
}
