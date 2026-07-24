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
  },
  {
    id: 'river',
    name: localized('River of Compassion', '慈悲之河'),
    emoji: '🌊',
    unlockXp: 800,
    tagline: localized('Where the heart learns to flow.', '心学会流动的地方。'),
    story: localized(
      'Down from the mountain runs a wide, generous river. "The highest good is like water," reads the boatman\'s sail: "it benefits all things without contending." The river does not choose which fields to nourish. Ferrymen here carry travellers across without payment, saying only: "Someone once carried me." To cross, you must have carried others.',
      '从山间流下一条宽阔而慷慨的大河。船夫的帆上写着："上善若水，水善利万物而不争。"这条河从不挑选它要滋养的田地。这里的渡人从不收费，只说一句："曾经也有人渡过我。"想要渡河，你也必须曾经渡过别人。',
    ),
    challenge: localized(
      'Complete 15 daily virtue challenges and send encouragement to 5 fellow travellers.',
      '完成15次每日德行挑战，并为5位同行者送出鼓励。',
    ),
    rewardXp: 60,
  },
  {
    id: 'city',
    name: localized('City of Harmony', '大同之城'),
    emoji: '🏙️',
    unlockXp: 1500,
    tagline: localized('Where the journey becomes a home.', '旅程化为归宿的地方。'),
    story: localized(
      'At last: a city with open gates and no walls. In its squares, the old are cared for, the young are taught, and strangers are greeted as kin — the Great Harmony 大同, not as a dream but as a daily practice. You understand now that this city is not a destination. It is built, everywhere, by people who took the same road you did: learn, cultivate, practise, contribute.',
      '终于到了：一座城门敞开、没有城墙的城市。广场上，老者得到奉养，幼者得到教导，陌生人被当作亲人相迎 — 大同，不再是一个梦想，而是每日的践行。此刻你明白，这座城并非终点。它在每一处被建造，由和你走过同一条路的人们共同建造：学习、修身、力行、贡献。',
    ),
    challenge: localized(
      "Reach the rank of Contributor and complete every other region's challenge.",
      '达到「贡献者」段位，并完成其他所有区域的挑战。',
    ),
    rewardXp: 100,
  },
];
