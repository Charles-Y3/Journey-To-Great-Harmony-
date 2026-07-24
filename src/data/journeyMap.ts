import type { MapRegion } from './types';
import { localized } from '../i18n/types';

export const REGIONS: MapRegion[] = [
  {
    id: 'valley',
    name: localized('Valley of Discovery', '发现之谷'),
    emoji: '🏞️',
    unlockXp: 0,
    tagline: localized('Where every journey begins.', '每段旅程开始的地方。'),
    story: localized(
      'You stand at the mouth of a green valley, morning mist rising from the river. An old signpost reads: "A journey of a thousand miles begins with a single step." Travellers from every land have passed this way — some carrying scriptures, some carrying questions. The valley asks nothing of you but curiosity: the willingness to wonder, to ask, and to begin.\n\nSocrates, it is said, never once claimed to have arrived anywhere — he only ever claimed to be asking. That is the valley\'s whole teaching: wisdom does not begin with an answer, but with an honest question, held without embarrassment. Every tradition on this Timeline started exactly here, in someone\'s willingness to stand at a threshold and wonder what lay beyond it.',
      '你站在一片翠绿山谷的入口，晨雾正从河面上升起。一块古老的路标写着："千里之行，始于足下。"来自四方的旅人都曾经过此地 — 有人带着经卷，有人带着疑问。这片山谷对你别无所求，只求一份好奇之心：愿意惊叹、愿意发问、愿意启程。\n\n据说，苏格拉底从未宣称自己已抵达过任何地方 — 他只承认自己一直在发问。这正是山谷全部的教导：智慧并非始于一个答案，而是始于一个诚实的问题，坦然持有而不觉羞愧。这条时间线上的每一个传统，都正是从这里开始的 — 从某个人愿意站在门槛前，惊叹于门外还有什么开始。',
    ),
    challenge: localized(
      'Complete your first lesson and your first daily challenge to prove your journey has truly begun.',
      '完成你的第一课与第一次每日挑战，证明你的旅程真正开始了。',
    ),
    rewardXp: 30,
    epilogue: localized(
      'The mist has lifted. Looking back at the valley\'s mouth, you notice it looks smaller than it did — not because the valley shrank, but because you are no longer standing at its very edge. The question that brought you here has not been answered; it has simply been joined by better ones. Carry them forward.',
      '晨雾已经散去。回望山谷的入口，你发现它看起来比先前小了 — 并非山谷缩小了，而是因为你已不再站在它最边缘之处。带你来到此地的那个问题，并未获得解答；它只是被更好的问题所陪伴。带着它们，继续前行吧。',
    ),
  },
  {
    id: 'forest',
    name: localized('Forest of Reflection', '反思之林'),
    emoji: '🌲',
    unlockXp: 150,
    tagline: localized('Where the noise falls away.', '喧嚣归于平静的地方。'),
    story: localized(
      'The path climbs into a still forest where sunlight falls in quiet columns. Here, hermits and sages once kept their journals; the trees seem to hold their listening. A carved stone reads: "I daily examine myself on three points." In this forest, the only way forward is inward — those who rush through it emerge exactly as they entered.\n\nConfucius\'s student Zengzi is said to have examined his own conduct three times each day: had he been faithful in his duties, trustworthy with friends, and true to what he had been taught? The forest asks the same of every traveller who enters — not to punish themselves for what they find, but to see it clearly enough that tomorrow can be different from today.',
      '小径蜿蜒而上，通往一片静谧的森林，阳光如静默的光柱洒落林间。曾有隐士与圣贤在此写下日记；林中的树木，仿佛也在静静聆听。一块石刻写着："吾日三省吾身。"在这片森林里，唯一向前的路，是向内而行 — 那些匆匆穿过它的人，出来时与进去时并无二致。\n\n相传孔子的弟子曾子，每天三次省察自己的言行：是否尽心竭力地完成了自己的职责？与朋友交往是否守信？是否真正践行了所学的教导？这片森林，也向每一位踏入其中的旅人提出同样的问题 — 不是为了因所见而惩罚自己，而是为了看得足够清楚，好让明天不同于今天。',
    ),
    challenge: localized(
      'Write evening reflections on 3 different days while you hold this ground.',
      '在停留此地期间，于3个不同的日子写下夜间反思。',
    ),
    rewardXp: 40,
    epilogue: localized(
      'Three evenings of honest looking-back have thinned the canopy overhead — or perhaps it only feels that way, now that you are used to the quiet. You leave carrying no verdict on yourself, only a slightly clearer mirror. That mirror does not stay in the forest; it travels with you from here on.',
      '三个夜晚诚实的回顾，让头顶的树冠仿佛稀疏了一些 — 又或许，只是因为你已经习惯了这份寂静。你离开时，并未对自己下任何定论，只是带着一面稍稍清晰了一些的镜子。这面镜子不会留在森林里；从此刻起，它将与你同行。',
    ),
  },
  {
    id: 'mountain',
    name: localized('Mountain of Discipline', '自律之山'),
    emoji: '⛰️',
    unlockXp: 400,
    tagline: localized('Where habits are forged.', '习惯锻造而成的地方。'),
    story: localized(
      'The mountain is honest: it cannot be argued with, only climbed. Each morning the pilgrims here rise before the sun, not because the mountain demands it, but because they have learned that character is built one step at a time, like a wall — brick by brick, act by act. On the summit, they say, you can see who you are becoming.\n\nAristotle taught that no one becomes brave by a single brave act, any more than one warm day makes a summer — virtue is a habit, worn into the soul the way a path is worn into a hillside, by many feet crossing the same ground. The mountain does not reward talent or good intentions; it only ever rewards the traveller who returns to the same slope again tomorrow.',
      '这座山诚实无欺：它无法被说服，只能被攀登。每天清晨，这里的朝圣者都会在日出之前起身，并非因为山有此要求，而是因为他们懂得，品格是一步一步筑成的，如同砌墙 — 一砖一石，一行一动。据说，在山顶之上，你能看清自己正在成为怎样的人。\n\n亚里士多德教导说，没有人能仅凭一次勇敢的行为就变得勇敢，正如一个温暖的日子不能造就整个夏天 — 德行是一种习惯，如同山坡上被无数双脚反复踏过而磨出的小径，是被一次次同样的践行磨进灵魂里的。这座山从不奖赏天赋或良好的意图；它只奖赏那些明天依然回到同一片山坡上的旅人。',
    ),
    challenge: localized('Reach a 5-day streak of daily practice.', '达成连续5天的每日修习记录。'),
    rewardXp: 50,
    epilogue: localized(
      'Five sunrises met on the same slope, and something in your legs — or perhaps in your resolve — has changed. The summit was never really the point; the point was becoming someone who climbs. That habit doesn\'t stay behind on the mountain either. It walks with you, quietly, into whatever comes next.',
      '在同一片山坡上，你迎来了五次日出，而你的双腿 — 或许更是你的决心 — 已然有所不同。山顶其实从来都不是重点；重点在于成为一个懂得攀登的人。这份习惯，同样不会被留在山上。它会静静地随你同行，走向接下来的一切。',
    ),
  },
  {
    id: 'river',
    name: localized('River of Compassion', '慈悲之河'),
    emoji: '🌊',
    unlockXp: 800,
    tagline: localized('Where the heart learns to flow.', '心学会流动的地方。'),
    story: localized(
      'Down from the mountain runs a wide, generous river. "The highest good is like water," reads the boatman\'s sail: "it benefits all things without contending." The river does not choose which fields to nourish. Ferrymen here carry travellers across without payment, saying only: "Someone once carried me." To cross, you must have carried others.\n\nMencius taught that anyone who sees a child about to fall into a well feels alarm before any thought of reward — proof, he said, that compassion is a seed already planted in every heart. The river simply asks that seed to be watered: not as a grand gesture, but as small, repeated acts of encouragement toward whoever is crossing beside you.',
      '从山间流下一条宽阔而慷慨的大河。船夫的帆上写着："上善若水，水善利万物而不争。"这条河从不挑选它要滋养的田地。这里的渡人从不收费，只说一句："曾经也有人渡过我。"想要渡河，你也必须曾经渡过别人。\n\n孟子教导说，任何人看见一个孩子即将跌入井中，都会在任何关于回报的念头之前，先感到惊惧与恻隐之心 — 他说，这证明了慈悲的种子，早已种在每一颗心中。这条河，只是请求这颗种子得到浇灌 — 不是要你做出什么惊天动地的举动，而只是对身旁同渡之人，付出一次次微小而反复的鼓励。',
    ),
    challenge: localized(
      'Complete 15 daily virtue challenges and send encouragement to 5 fellow travellers.',
      '完成15次每日德行挑战，并为5位同行者送出鼓励。',
    ),
    rewardXp: 60,
    epilogue: localized(
      'You reach the far bank having paid the only fare the river accepts: attention paid to people who were not you. Looking back, you can no longer tell which ripple was yours and which belonged to someone you encouraged along the way — which, the old ferrymen would say, was always the point.',
      '你抵达了对岸，付出了这条河唯一接受的渡资：对那些不是你自己的人所给予的关注。回望水面，你已分不清哪一圈涟漪是你自己激起的，哪一圈属于你曾在途中鼓励过的人 — 而老船夫们会说，这原本就是重点所在。',
    ),
  },
  {
    id: 'city',
    name: localized('City of Harmony', '大同之城'),
    emoji: '🏙️',
    unlockXp: 1500,
    tagline: localized('Where the journey becomes a home.', '旅程化为归宿的地方。'),
    story: localized(
      'At last: a city with open gates and no walls. In its squares, the old are cared for, the young are taught, and strangers are greeted as kin — the Great Harmony 大同, not as a dream but as a daily practice. You understand now that this city is not a destination. It is built, everywhere, by people who took the same road you did: learn, cultivate, practise, contribute.\n\nConfucius called this Datong the highest vision a society could hold — a world where "the world belongs to all" (天下为公). He never pretended it was close or easy; he offered it as the standard against which every smaller reform should be measured. Every lesson learned in the Valley, every reflection written in the Forest, every habit forged on the Mountain, and every kindness offered across the River — all of it was always construction material for this city\'s gates.',
      '终于到了：一座城门敞开、没有城墙的城市。广场上，老者得到奉养，幼者得到教导，陌生人被当作亲人相迎 — 大同，不再是一个梦想，而是每日的践行。此刻你明白，这座城并非终点。它在每一处被建造，由和你走过同一条路的人们共同建造：学习、修身、力行、贡献。\n\n孔子称这大同为一个社会所能持有的最高愿景 — 一个"天下为公"的世界。他从未假装这近在咫尺或轻而易举；他将其作为衡量每一次较小改革的标准而提出。你在山谷中学到的每一课、在森林中写下的每一篇反思、在山上锻造出的每一个习惯、在河上给予的每一份善意 — 这一切，始终都是建造这座城门的材料。',
    ),
    challenge: localized(
      "Reach the rank of Contributor and complete every other region's challenge.",
      '达到「贡献者」段位，并完成其他所有区域的挑战。',
    ),
    rewardXp: 100,
    epilogue: localized(
      'The city does not close behind you like the valley, the forest, the mountain, and the river did — because it was never really a place on the map. It was the shape all four of those grounds were quietly building toward. You are still walking through it, today, and every day this journey continues.',
      '这座城，不会像山谷、森林、高山与河流那样在你身后合拢 — 因为它从来就不真正是地图上的一处地方。它是前面四片土地，一直在悄悄建造着的那个形状。今天，你依然走在其中，而这段旅程，也将在每一天继续下去。',
    ),
  },
];
