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
      'You stand at the mouth of a green valley, morning mist rising from the river. An old signpost reads: "A journey of a thousand miles begins with a single step." Travellers from every land have passed this way — some carrying scriptures, some carrying questions. The valley asks nothing of you but curiosity: the willingness to wonder, to ask, and to begin.',
      '你站在一片翠绿山谷的入口，晨雾正从河面上升起。一块古老的路标写着："千里之行，始于足下。"来自四方的旅人都曾经过此地 — 有人带着经卷，有人带着疑问。这片山谷对你别无所求，只求一份好奇之心：愿意惊叹、愿意发问、愿意启程。',
    ),
    challenge: localized(
      'Complete your first lesson and your first daily challenge to prove your journey has truly begun.',
      '完成你的第一课与第一次每日挑战，证明你的旅程真正开始了。',
    ),
    rewardXp: 30,
    epilogue: localized(
      'The question that brought you here has not been answered; it has simply been joined by better ones.',
      '带你来到此地的那个问题，并未获得解答；它只是被更好的问题所陪伴。',
    ),
  },
  {
    id: 'forest',
    name: localized('Forest of Reflection', '反思之林'),
    emoji: '🌲',
    unlockXp: 150,
    tagline: localized('Where the noise falls away.', '喧嚣归于平静的地方。'),
    story: localized(
      'The path climbs into a still forest where sunlight falls in quiet columns. Here, hermits and sages once kept their journals; the trees seem to hold their listening. A carved stone reads: "I daily examine myself on three points." In this forest, the only way forward is inward — those who rush through it emerge exactly as they entered.',
      '小径蜿蜒而上，通往一片静谧的森林，阳光如静默的光柱洒落林间。曾有隐士与圣贤在此写下日记；林中的树木，仿佛也在静静聆听。一块石刻写着："吾日三省吾身。"在这片森林里，唯一向前的路，是向内而行 — 那些匆匆穿过它的人，出来时与进去时并无二致。',
    ),
    challenge: localized(
      'Write evening reflections on 3 different days while you hold this ground.',
      '在停留此地期间，于3个不同的日子写下夜间反思。',
    ),
    rewardXp: 40,
    epilogue: localized(
      'You leave carrying no verdict on yourself, only a slightly clearer mirror.',
      '你离开时，并未对自己下任何定论，只是带着一面稍稍清晰了一些的镜子。',
    ),
  },
  {
    id: 'mountain',
    name: localized('Mountain of Discipline', '自律之山'),
    emoji: '⛰️',
    unlockXp: 400,
    tagline: localized('Where habits are forged.', '习惯锻造而成的地方。'),
    story: localized(
      'The mountain is honest: it cannot be argued with, only climbed. Each morning the pilgrims here rise before the sun, not because the mountain demands it, but because they have learned that character is built one step at a time, like a wall — brick by brick, act by act. On the summit, they say, you can see who you are becoming.',
      '这座山诚实无欺：它无法被说服，只能被攀登。每天清晨，这里的朝圣者都会在日出之前起身，并非因为山有此要求，而是因为他们懂得，品格是一步一步筑成的，如同砌墙 — 一砖一石，一行一动。据说，在山顶之上，你能看清自己正在成为怎样的人。',
    ),
    challenge: localized('Reach a 5-day streak of daily practice.', '达成连续5天的每日修习记录。'),
    rewardXp: 50,
    epilogue: localized(
      'The summit was never really the point; the point was becoming someone who climbs.',
      '山顶其实从来都不是重点；重点在于成为一个懂得攀登的人。',
    ),
  },
  {
    id: 'garden',
    name: localized('Garden of Patience', '耐心之园'),
    emoji: '🪴',
    unlockXp: 700,
    tagline: localized('Where growth cannot be rushed.', '成长无法被催促的地方。'),
    story: localized(
      'Rows of seedlings stretch before you in careful lines, none of them ready before their time. An old gardener waters without hurry, humming an old proverb: patience is bitter, but its fruit is sweet. Nothing in this garden grows any faster for being watched — only for being tended, day after unremarkable day.',
      '一垄垄整齐的幼苗在你面前排开，没有一株会提前成熟。一位老园丁不慌不忙地浇水，哼唱着一句古老的谚语：忍耐是苦的，但它的果实是甜的。这座园子里，没有什么会因为被注视而长得更快 — 只会因为日复一日、平凡无奇的照料而生长。',
    ),
    challenge: localized('Reach a 10-day streak of daily practice.', '达成连续10天的每日修习记录。'),
    rewardXp: 55,
    epilogue: localized(
      'The garden never did grow faster for your watching — only steadier, which turned out to be the same thing.',
      '这座园子，从未因你的注视而长得更快 — 只是更加稳健，而这，其实是同一回事。',
    ),
  },
  {
    id: 'river',
    name: localized('River of Compassion', '慈悲之河'),
    emoji: '🌊',
    unlockXp: 950,
    tagline: localized('Where the heart learns to flow.', '心学会流动的地方。'),
    story: localized(
      'Down from the mountain runs a wide, generous river. "The highest good is like water," reads the boatman\'s sail: "it benefits all things without contending." The river does not choose which fields to nourish. Ferrymen here carry travellers across without payment, saying only: "Someone once carried me." To cross, you must have carried others.',
      '从山间流下一条宽阔而慷慨的大河。船夫的帆上写着："上善若水，水善利万物而不争。"这条河从不挑选它要滋养的田地。这里的渡人从不收费，只说一句："曾经也有人渡过我。"想要渡河，你也必须曾经渡过别人。',
    ),
    challenge: localized(
      'Complete 15 daily virtue challenges and send encouragement to 5 fellow travellers.',
      '完成15次每日德行挑战，并为5位同修送出鼓励。',
    ),
    rewardXp: 60,
    epilogue: localized(
      'You can no longer tell which ripple was yours and which belonged to someone you encouraged along the way.',
      '你已分不清哪一圈涟漪是你自己激起的，哪一圈属于你曾在途中鼓励过的人。',
    ),
  },
  {
    id: 'bridge',
    name: localized('Bridge of Community', '同心之桥'),
    emoji: '🌉',
    unlockXp: 1300,
    tagline: localized('Where no one crosses alone.', '无人独自跨越的地方。'),
    story: localized(
      'A long wooden bridge spans a gorge too wide to leap. Every plank was laid by someone who had already crossed, for those still to come. There is no toll here — only travellers willing to steady the rail for whoever crosses next.',
      '一座长长的木桥，横跨着一道无法跳跃而过的峡谷。每一块木板，都是由已经渡过的人，为尚未到来的人铺设的。这里不收取任何过路费 — 只需要愿意为下一位过桥者扶稳栏杆的旅人。',
    ),
    challenge: localized(
      'Send encouragement to 10 fellow travellers and reach the rank of Cultivator.',
      '为10位同修送出鼓励，并达到「修行者」段位。',
    ),
    rewardXp: 75,
    epilogue: localized('The rail held, because enough hands were on it. It always does.', '栏杆稳住了，因为有足够多的手扶着它。它向来如此。'),
  },
  {
    id: 'scrolls',
    name: localized('Hall of Teachings', '教导之厅'),
    emoji: '📜',
    unlockXp: 1700,
    tagline: localized('Where the Knowledge Path becomes a home.', '知识之路化为归处之地。'),
    story: localized(
      'Shelves of teachings line a quiet hall — compassion, character, understanding. Nothing here is stored for display; each scroll asks to be lived. A plaque reads: "To learn and to practise is one road."',
      '静厅两侧排列着教导的卷轴 — 慈悲、品格、理解。这里的一切不是为陈列而存；每一卷都邀请被活出来。匾额写着：「学与行，本是一条路。」',
    ),
    challenge: localized(
      'Complete every lesson on the Knowledge Path.',
      '完成知识之路上的每一课。',
    ),
    rewardXp: 80,
    epilogue: localized(
      'The hall did not grow quieter when you finished — you did.',
      '你走完时，厅堂并未更静 — 是你更静了。',
    ),
  },
  {
    id: 'horizon',
    name: localized('Horizon of Ages', '世代之涯'),
    emoji: '🌅',
    unlockXp: 2400,
    tagline: localized('Where the Wisdom Timeline opens wide.', '智慧时间线开阔之处。'),
    story: localized(
      'From a high ridge you see the long river of human wisdom — eras like bends of light. The wind carries names you have studied. To stand here is to know you are one chapter among many, and still responsible for your own.',
      '从高脊望去，人类智慧的长河铺开 — 各个时代如光的弯折。风里有你研读过的名字。站在此处，是明白自己只是众多篇章中的一章，却仍要对这一章负责。',
    ),
    challenge: localized(
      'Complete the foundation level of every Wisdom Timeline point.',
      '完成智慧时间线每一个节点的基础关。',
    ),
    rewardXp: 90,
    epilogue: localized(
      'The horizon did not end — it only taught you how far a life can see.',
      '天涯并未终结 — 它只是教你，一生可以望见多远。',
    ),
  },
  {
    id: 'sanctuary',
    name: localized('Sanctuary of Practice', '践行圣境'),
    emoji: '⛩️',
    unlockXp: 3000,
    tagline: localized('Where forest, world, and vow meet.', '森林、世界与心愿交会之处。'),
    story: localized(
      'A simple gate opens onto ground you have already been tending — your forest, your contributions, your evening honesty. The sanctuary asks for no new spectacle, only that practice has become a place you can return to.',
      '一道朴素的门，通向你已在照料的土地 — 你的森林、你的贡献、你夜间的诚实。圣境不索求新的奇观，只问：践行是否已成你可以归来的地方。',
    ),
    challenge: localized(
      'Reach a 21-day streak and write 20 evening reflections.',
      '达成连续21天的修习，并写下20篇夜间反思。',
    ),
    rewardXp: 95,
    epilogue: localized(
      'You do not leave the sanctuary; you carry its stillness into ordinary days.',
      '你并未离开圣境；你把它的静定，带进了平常日子。',
    ),
  },
  {
    id: 'city',
    name: localized('City of Harmony', '大同之城'),
    emoji: '🏙️',
    unlockXp: 3800,
    tagline: localized('Where the journey becomes a home.', '旅程化为归宿的地方。'),
    story: localized(
      'At last: a city with open gates and no walls. In its squares, the old are cared for, the young are taught, and strangers are greeted as kin — the Great Harmony 大同, not as a dream but as a daily practice. You understand now that this city is not a destination. It is built, everywhere, by people who took the same road you did: learn, cultivate, practise, contribute.',
      '终于到了：一座城门敞开、没有城墙的城市。广场上，老者得到奉养，幼者得到教导，陌生人被当作亲人相迎 — 大同，不再是一个梦想，而是每日的践行。此刻你明白，这座城并非终点。它在每一处被建造，由和你走过同一条路的人们共同建造：学习、修身、力行、贡献。',
    ),
    challenge: localized(
      "Reach the rank of Contributor and complete every other region's challenge.",
      '达到「贡献者」段位，并完成其他所有区域的挑战。',
    ),
    rewardXp: 120,
    epilogue: localized(
      'This city was never really a place on the map — it was the shape every other ground was quietly building toward.',
      '这座城，从来就不真正是地图上的一处地方 — 它是其他每一片土地，一直在悄悄建造着的那个形状。',
    ),
  },
];
