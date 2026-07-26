import type { Sage, SageChapter, QuizQuestion } from './types';
import { localized } from '../i18n/types';
import { TIMELINE } from './timeline';

function q(question: [string, string], options: [string[], string[]], answer: number): QuizQuestion {
  return { q: localized(question[0], question[1]), options: localized(options[0], options[1]), answer };
}

function chapter(
  id: string,
  title: [string, string],
  historicalSetting: [string, string],
  lifeStory: [string, string],
  quiz: QuizQuestion[],
  links?: { relatedTurningPointId?: string; relatedTimelinePointId?: string },
): SageChapter {
  return {
    id,
    title: localized(title[0], title[1]),
    historicalSetting: localized(historicalSetting[0], historicalSetting[1]),
    lifeStory: localized(lifeStory[0], lifeStory[1]),
    quiz,
    relatedTurningPointId: links?.relatedTurningPointId,
    relatedTimelinePointId: links?.relatedTimelinePointId,
  };
}

/**
 * Sage Lives — biographical tracks shown as a second mode inside Timeline.
 * Progress is stored in JourneyData.sageChapters (never in timelinePointLevels).
 */
export const SAGES: Sage[] = [
  {
    id: 'confucius',
    name: localized('Confucius', '孔子'),
    years: localized('551–479 BCE', '公元前551–479年'),
    emoji: '📜',
    summary: localized(
      'A teacher from Lu who wandered the courts of a fractured age, teaching ren 仁 and dreaming of Datong 大同 — then returned home to teach a circle of students who would carry his words farther than any throne.',
      '一位来自鲁国的老师，在裂变的时代周游列国，教导「仁」，梦想「大同」— 最终归乡授徒，让弟子把话语传得比任何王座更远。',
    ),
    badgeTitle: localized('Life of Confucius', '孔子生平'),
    cardId: 'card-life-confucius',
    relatedTimelinePointIds: ['confucius-ren'],
    relatedTopicIds: ['compassion', 'integrity'],
    chapters: [
      chapter(
        'confucius-youth',
        ['Youth in Lu', '鲁国少年'],
        [
          'In the late Spring and Autumn period, the Zhou kings still held a title, but real power lay with rival feudal lords. Ritual and rank were fraying; war and intrigue filled the gaps.',
          '春秋晚期，周天子仍有名号，实权却落在相互争斗的诸侯手中。礼制与名分日渐松弛，战争与权谋填补空隙。',
        ],
        [
          'Kong Qiu was born in the state of Lu. Tradition remembers a childhood of modest means and early love of learning and ceremony. He studied history, music, and the rites — not as empty form, but as the grammar of a humane community. Even as a young man he asked how a disordered age might recover trust between people.',
          '孔丘生于鲁国。传统记载他家境清寒，却早早热爱学习与礼仪。他研习史、乐与礼 — 不是空洞的形式，而是人与人之间善意共同体的语法。即使年轻，他已在追问：乱世如何恢复人与人之间的信任。',
        ],
        [
          q(
            ['In which state was Confucius born?', '孔子出生于哪个诸侯国？'],
            [
              ['Qin', 'Lu', 'Chu', 'Qi'],
              ['秦', '鲁', '楚', '齐'],
            ],
            1,
          ),
          q(
            ['As a youth, Confucius valued rites mainly as…', '青年时期，孔子看重礼仪，主要是因为视其为……'],
            [
              ['A way to impress rulers', 'The grammar of a humane community', 'Military drill', 'A path to wealth'],
              ['取悦君主的手段', '人与人善意共同体的语法', '军事操练', '致富之路'],
            ],
            1,
          ),
        ],
      ),
      chapter(
        'confucius-office',
        ['Office and departure', '从政与告别'],
        [
          'Lu, like its neighbours, struggled with powerful ministerial clans. A teacher who insisted that names must match realities — that a ruler must truly rule with virtue — was useful only when courts wanted honesty.',
          '鲁国与邻国一样，受强势卿族牵制。一位坚持名实相符、认为统治者须以德行真正统治的老师，唯有在朝廷愿意听真话时才被看重。',
        ],
        [
          'Confucius briefly held office in Lu and tried to put li 礼 and ren 仁 into practice. When politics closed against him, he left — beginning years of travel among the states. He offered counsel; few rulers listened for long. The wandering was not failure of teaching so much as proof of how hard it is to reform power from within.',
          '孔子曾在鲁国短暂任职，试图把「礼」与「仁」付诸实践。当政治对他关闭，他离开了 — 开始多年周游列国。他进言，却鲜少有君主长久听从。这段漂泊并非教学失败，更像证明：从内部改革权力何其艰难。',
        ],
        [
          q(
            ['Why did Confucius leave Lu to travel?', '孔子为何离开鲁国去周游？'],
            [
              ['To seek treasure', 'Politics closed against his reforms', 'He was banished forever by law', 'To become a general'],
              ['寻找宝藏', '政治阻挠了他的改革', '法律永久放逐了他', '去当将军'],
            ],
            1,
          ),
          q(
            ['His years of travel mainly show that…', '他多年的周游主要说明……'],
            [
              ['Teaching only works in one state', 'Reforming power from within is hard', 'Rulers always welcomed him', 'He abandoned ren'],
              ['教学只在一国有效', '从内部改革权力十分艰难', '君主总是欢迎他', '他放弃了仁'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'confucius-ren' },
      ),
      chapter(
        'confucius-teaching',
        ['Teaching the circle', '授徒成圈'],
        [
          'Literacy and oral transmission among students were how ideas survived when courts ignored them. Disciples recorded sayings that later became the Analects.',
          '当朝廷忽视思想时，弟子间的书写与口传，成了思想得以存续的方式。门人记录的言语，后来成为《论语》。',
        ],
        [
          'Back in Lu in later life, Confucius taught a devoted circle. He sorted students by character, not birth: some for government, some for ritual, some for reflection. He insisted that learning without thinking is empty, and thinking without learning is dangerous. The classroom — not the throne — became his lasting workshop for Great Harmony.',
          '晚年回到鲁国后，孔子教导一群忠实的弟子。他按性情而非出身来引导人：有人适于从政，有人适于礼仪，有人适于深思。他坚持学而不思则罔，思而不学则殆。教室 — 而非王座 — 成了他为大同理想长久工作的工坊。',
        ],
        [
          q(
            ['How did Confucius mainly sort his students?', '孔子主要按什么来引导弟子？'],
            [
              ['By wealth', 'By character, not birth', 'By military rank', 'By age alone'],
              ['按财富', '按性情而非出身', '按军阶', '仅按年龄'],
            ],
            1,
          ),
          q(
            ['Where did his lasting workshop for Datong take shape?', '他为大同理想长久工作的工坊，最终形成于何处？'],
            [
              ['On the battlefield', 'In the classroom with students', 'In a merchant guild', 'In a foreign palace'],
              ['战场上', '与弟子共处的教室里', '商会中', '外国宫廷里'],
            ],
            1,
          ),
        ],
        { relatedTurningPointId: 'confucius-honest-son' },
      ),
      chapter(
        'confucius-legacy',
        ['After the teacher', '师者之后'],
        [
          'The Warring States that followed his death would tear China further apart — yet schools of thought claiming his mantle would shape imperial China for centuries.',
          '他去世后的战国时代，中国进一步分裂 — 然而自称承继其衣钵的学派，却将塑造帝国中国数百年。',
        ],
        [
          'Confucius did not live to see Datong. What he left was a standard: cultivate the person, rectify names, care for the people, measure every reform against a world where the elderly are tended and strangers are not left outside the circle of care. Mencius and later scholars would argue over his meaning; the life itself remains a story of patience when power would not listen.',
          '孔子未能亲见大同。他留下的是一把尺度：修身、正名、爱民，并以「老有所终、陌生人亦不被排除在关怀之外」的世界，来衡量每一次改革。孟子与后世学者将争论其真义；而这生命本身，仍是权力不听之时，仍能忍耐前行的故事。',
        ],
        [
          q(
            ['What did Confucius leave more than a finished utopia?', '孔子留下的，更甚于一座完工的乌托邦的是什么？'],
            [
              ['A military code', 'A standard for judging reform', 'A map of treasure', 'A single law for all states'],
              ['一部军法', '一把衡量改革的尺度', '一张藏宝图', '各国共用的单一法律'],
            ],
            1,
          ),
          q(
            ['His life story most clearly models…', '他的生平最清楚地示范了……'],
            [
              ['Winning every debate at court', 'Patience when power will not listen', 'Fleeing every duty', 'Rejecting all students'],
              ['在朝廷赢得每一次辩论', '权力不听时仍能忍耐前行', '逃避一切责任', '拒绝所有学生'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'confucius-ren' },
      ),
    ],
  },
  {
    id: 'mencius',
    name: localized('Mencius', '孟子'),
    years: localized('c. 372–289 BCE', '约公元前372–289年'),
    emoji: '🌾',
    summary: localized(
      'The great heir of Confucius who argued that human nature holds the sprouts of goodness — and that rulers who starve those sprouts forfeit the right to rule.',
      '孔子最伟大的继承者：主张人性中本有善端，而饿死这些善端的统治者，便丧失了统治的正当性。',
    ),
    badgeTitle: localized('Life of Mencius', '孟子生平'),
    cardId: 'card-life-mencius',
    relatedTimelinePointIds: ['mencius-goodness'],
    relatedTopicIds: ['compassion', 'kindness'],
    chapters: [
      chapter(
        'mencius-mother',
        ['A mother moves three times', '孟母三迁'],
        [
          'In the early Warring States, towns grew around markets, graves, and schools. Where a child grew up shaped what they practised every day.',
          '战国初期，市集、坟地与学堂周围形成聚落。孩子生长的环境，塑造着他日常所习之事。',
        ],
        [
          'Tradition tells that Mencius’s mother moved the family three times — away from a graveyard, away from a market of noise and bargaining, until they lived near a school. She wanted her son’s first habits to be learning and right conduct. Whether every detail is history or parable, the point is Mencian: environment cultivates the sprouts, or it weeds them.',
          '传统讲述孟母三迁 — 离开坟，离开喧闹交易的市集，直到住在学堂旁。她希望儿子最初的习惯是学习与正行。细节或为史实或为寓言，要旨却是孟子式的：环境滋养善端，也可能将它们锄去。',
        ],
        [
          q(
            ['Why does the story say Mencius’s mother moved three times?', '故事中孟母为何三迁？'],
            [
              ['To find gold', 'So his habits formed near learning and right conduct', 'To escape a war forever', 'To join a royal court'],
              ['寻找黄金', '好让他在学习与正行旁养成习惯', '永远躲避战争', '进入王室宫廷'],
            ],
            1,
          ),
          q(
            ['The story’s Mencian lesson is mainly about…', '这则故事的孟子式教训，主要关于……'],
            [
              ['Fate alone deciding character', 'How environment cultivates or weeds the sprouts', 'Never trusting schools', 'Avoiding all neighbours'],
              ['命运单独决定品格', '环境如何滋养或锄去善端', '永不信任学堂', '避开所有邻居'],
            ],
            1,
          ),
        ],
      ),
      chapter(
        'mencius-courts',
        ['Counsel at the courts', '游说于朝'],
        [
          'Kings of Qi, Liang, and other states sought talent — and often ignored advice that limited their wars or taxes.',
          '齐、梁等国之君求贤若渴 — 却也常常无视限制其战争或赋税的劝谏。',
        ],
        [
          'Mencius travelled like Confucius before him, speaking to rulers about benevolent government. He argued that the people are the most important, the state next, and the ruler lightest. A king who cannot provide a constant livelihood (hengchan 恒产) has no right to blame the hungry for failing virtue. Several courts praised him; few fully obeyed.',
          '孟子如孔子一般周游，向君主谈论仁政。他主张民为贵，社稷次之，君为轻。不能保障「恒产」的国君，无权指责饥民缺乏德行。多国称赞他，鲜少完全听从。',
        ],
        [
          q(
            ['In Mencius’s ranking, who is most important?', '在孟子的排序中，何者最重？'],
            [
              ['The ruler', 'The people', 'The army', 'Foreign allies'],
              ['君主', '人民', '军队', '外国盟友'],
            ],
            1,
          ),
          q(
            ['Before blaming people for lacking virtue, a ruler must first…', '在指责百姓缺乏德行之前，统治者必须先……'],
            [
              ['Win more wars', 'Provide a constant livelihood', 'Build taller palaces', 'Silence all critics'],
              ['打更多仗', '保障恒产（基本生计）', '建造更高的宫殿', '压制所有批评者'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'mencius-goodness' },
      ),
      chapter(
        'mencius-debate',
        ['Debate with Gaozi', '与告子辩'],
        [
          'Rival schools flourished: some said nature was neutral, others that desire ruled. Public argument was how philosophy lived.',
          '诸子争鸣：有人说人性中性，有人说欲望主宰。公开辩论，是哲学存活的方式。',
        ],
        [
          'Against Gaozi, who likened nature to water that flows wherever channelled, Mencius insisted that water’s nature is to go downward — force can make it rise, but that is not its tendency. Likewise, cruelty forced on a person does not prove evil is our nature. The four sprouts — compassion, shame, courtesy, and right-and-wrong — are already in the heart; they need tending, like Ox Mountain once green before axes and goats stripped it bare.',
          '面对告子把人性比作随渠而流的水，孟子坚持水的本性向下 — 强力可使之上升，却非其趋势。同理，被迫作恶并不能证明恶是人的本性。四端 — 恻隐、羞恶、辞让、是非 — 已在心中；它们需要照料，正如牛山一度青翠，后被斧斤与牛羊剥蚀至秃。',
        ],
        [
          q(
            ['What did Mencius’s water reply defend?', '孟子以水作答，所捍卫的是什么？'],
            [
              ['That nature has no direction', 'That goodness is our tendency, though force can divert it', 'That rulers invent virtue', 'That debate is useless'],
              ['人性毫无方向', '善是我们的趋势，虽可被强力引偏', '德行由统治者发明', '辩论毫无用处'],
            ],
            1,
          ),
          q(
            ['Ox Mountain warns that original goodness can…', '牛山之喻警告：本有的善可以……'],
            [
              ['Never be harmed', 'Be neglected until it disappears from view', 'Only grow in kings', 'Require no nourishment'],
              ['永不受损', '因被忽视而从视野中消失', '只在君王身上生长', '无需滋养'],
            ],
            1,
          ),
        ],
      ),
      chapter(
        'mencius-legacy',
        ['Sprouts for later ages', '善端传后'],
        [
          'Later Confucians would call Mencius the “Second Sage.” His emphasis on the people and on innate goodness shaped reformers and educators for millennia.',
          '后世儒者称孟子为「亚圣」。他对民本与性善的强调，塑造了千年来的改革者与教育者。',
        ],
        [
          'Mencius died without installing a perfect king. His gift was sharper: trust that compassion can start in anyone who sees a child at a well — and hold rulers to that same heart. Read with Confucius, his life turns teaching into political courage: speak, even when courts smile and do not change.',
          '孟子未能扶立一位完美的君主。他更锐利的礼物是：相信任何人看见孩童将入井时都会生起恻隐 — 并以同一颗心要求统治者。与孔子并读，他的生平把教导变成政治勇气：即使朝廷微笑却不改，仍要说。',
        ],
        [
          q(
            ['Later tradition often calls Mencius the…', '后世传统常称孟子为……'],
            [
              ['First Emperor', 'Second Sage', 'Silent Monk', 'Merchant King'],
              ['始皇帝', '亚圣', '沉默的僧人', '商王之王'],
            ],
            1,
          ),
          q(
            ['Together with Confucius, Mencius’s life models…', '与孔子并观，孟子的生平示范了……'],
            [
              ['Never speaking to rulers', 'Political courage to speak when courts will not change', 'Abandoning the people', 'Teaching only in secret'],
              ['永不向君主进言', '朝廷不改时仍敢进言的政治勇气', '抛弃人民', '只在暗中教学'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'mencius-goodness' },
      ),
    ],
  },
  {
    id: 'laozi',
    name: localized('Laozi', '老子'),
    years: localized('trad. 6th–5th c. BCE', '传统记载约前6–5世纪'),
    emoji: '🍃',
    summary: localized(
      'The shadowy sage of the Daodejing — remembered less as a court biography than as a way: soft water, low places, and action that does not force.',
      '《道德经》中影影绰绰的圣者 — 人们记得的与其说是朝堂传记，不如说是一条道路：柔弱之水、卑下之处，以及不强求的行动。',
    ),
    badgeTitle: localized('Life of Laozi', '老子生平'),
    cardId: 'card-life-laozi',
    relatedTimelinePointIds: ['daoism-laozi'],
    relatedTopicIds: ['humility', 'awareness'],
    chapters: [
      chapter(
        'laozi-keeper',
        ['Keeper of the archives', '守藏史'],
        [
          'Zhou court culture still prized records, rites, and the memory of an older order even as the dynasty weakened.',
          '即使周室衰微，周朝宫廷仍珍视典籍、礼仪，以及对更古老秩序的记忆。',
        ],
        [
          'Tradition casts Laozi as a keeper of Zhou archives — a quiet official who watched names and ceremonies hollow out. Whether one historical person or a composite, the figure stands for someone who saw power’s noise and turned toward what endures beneath it: the Dao 道 that cannot be fully named.',
          '传统把老子写成周朝的守藏史 — 一位静默的官吏，看着名分与礼仪逐渐空洞。无论是一人或是群像，这个形象代表看见权力喧嚣后，转向其下更持久之物的人：那不可尽名的「道」。',
        ],
        [
          q(
            ['Tradition often remembers Laozi’s early role as…', '传统常记得老子早年的角色是……'],
            [
              ['A general of Qi', 'A keeper of Zhou archives', 'A merchant of silk', 'King of Chu'],
              ['齐国将军', '周朝守藏史', '丝绸商人', '楚王'],
            ],
            1,
          ),
          q(
            ['The Laozi figure turns from hollow ceremony toward…', '老子这一形象从空洞礼仪转向……'],
            [
              ['Conquering neighbours', 'The Dao beneath power’s noise', 'Collecting taxes', 'Building taller walls'],
              ['征服邻国', '权力喧嚣之下的道', '征收赋税', '建造更高的城墙'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'daoism-laozi' },
      ),
      chapter(
        'laozi-departure',
        ['Leaving for the west', '西出函谷'],
        [
          'Frontier passes marked the edge of the Zhou cultural world. Stories gather at thresholds.',
          '边关标志着周文化世界的边缘。故事常聚集在门槛之处。',
        ],
        [
          'One famous tale says Laozi, weary of decline, rode west. At the pass, a gatekeeper begged him to leave a teaching. He wrote (or dictated) the Daodejing — then vanished into legend. History cannot verify the scene; the meaning survives: when the centre will not hear, the Way is carried out as a book for anyone who will empty their cup.',
          '著名传说称老子倦于衰世，骑牛西去。关令尹喜恳请留下教导。他写下（或口述）《道德经》— 然后隐入传说。史实难以核实，意义却流传：中心不听之时，道便以书卷带给任何愿倒空杯子的人。',
        ],
        [
          q(
            ['In the famous pass story, Laozi leaves behind…', '在著名的函谷关故事中，老子留下了……'],
            [
              ['A treasure map', 'The Daodejing', 'An army', 'A new capital'],
              ['藏宝图', '《道德经》', '一支军队', '一座新都'],
            ],
            1,
          ),
          q(
            ['The story’s lasting meaning is that the Way can…', '这则故事长久的意义是：道可以……'],
            [
              ['Only live in one palace', 'Travel as a teaching when courts will not hear', 'Be owned by one clan', 'Be sold for gold'],
              ['只活在一座宫殿里', '在朝廷不听时以教导远行', '被一族独占', '换成黄金'],
            ],
            1,
          ),
        ],
      ),
      chapter(
        'laozi-way',
        ['Water and wu wei', '水与无为'],
        [
          'While Confucians stressed cultivated relationships, Daoist voices stressed returning to what is simple and unforced.',
          '当儒家强调修养人伦时，道家声音则强调回到简朴与不强求。',
        ],
        [
          'Whether or not one man wrote every line, the teaching linked to Laozi prizes water: soft, low, nourishing without contending. Wu wei 无为 is not laziness — it is action that does not force against the grain of things. In an age of ambitious states, that was a political and personal critique: the hard breaks; the flexible endures.',
          '无论是否一人写尽每一句，与老子相连的教导珍视水：柔弱、处下、滋养而不争。「无为」不是懒惰 — 而是不逆事物纹理的行动。在野心勃勃的列国时代，这既是政治也是个人的批评：刚者易折，柔者久存。',
        ],
        [
          q(
            ['Wu wei in this teaching means mainly…', '此教导中的「无为」主要是指……'],
            [
              ['Doing nothing forever', 'Action that does not force against the grain', 'Winning every argument', 'Collecting more titles'],
              ['永远什么都不做', '不逆事物纹理的行动', '赢得每一次争论', '收集更多头衔'],
            ],
            1,
          ),
          q(
            ['Water is prized as an image because it…', '水被珍为意象，是因为它……'],
            [
              ['Conquers by shouting', 'Is soft yet overcomes the hard without contending', 'Stays only at the top', 'Refuses to nourish'],
              ['靠呼喊征服', '柔弱却能胜刚，且不与之相争', '只停留在高处', '拒绝滋养'],
            ],
            1,
          ),
        ],
        { relatedTurningPointId: 'farmer-lost-horse' },
      ),
      chapter(
        'laozi-legacy',
        ['A nameless influence', '无名之传'],
        [
          'Daoist communities, poets, and later religions would claim Laozi; the Daodejing remained short enough to reread for a lifetime.',
          '道教社群、诗人与后世宗教都会认祖老子；《道德经》短到足以用一生反复阅读。',
        ],
        [
          'Laozi’s “life” may be more path than biography — and that fits the book. Where Confucius left a classroom and Mencius a political courage, Laozi leaves a reminder: return, simplify, do not mistake noise for the Way. Read beside Confucius, the two lives are partners, not enemies: cultivate relationships, and stay rooted in nature’s quiet rhythm.',
          '老子的「生平」或许更是道路而非传记 — 这正合乎其书。孔子留下教室，孟子留下政治勇气，老子留下提醒：归复、简朴，勿把喧嚣误认为道。与孔子并读，两条生命是伙伴而非敌人：修养人伦，同时扎根于自然静默的节律。',
        ],
        [
          q(
            ['Why may Laozi’s life feel more like a path than a biography?', '为何老子的生平更像道路而非传记？'],
            [
              ['Because he wrote a thousand volumes', 'Because tradition remembers a way more than court details', 'Because he ruled China', 'Because dates are exact'],
              ['因为他写了千卷书', '因为传统记得的是道路多于朝堂细节', '因为他统治了中国', '因为年代精确'],
            ],
            1,
          ),
          q(
            ['Beside Confucius, Laozi’s life most clearly adds…', '与孔子并观，老子的生平最清楚地补上了……'],
            [
              ['More court titles', 'Rootedness in nature’s quiet rhythm', 'A call to endless war', 'Rejection of all teaching'],
              ['更多朝堂头衔', '扎根于自然静默节律', '无尽战争的号召', '拒绝一切教导'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'daoism-laozi' },
      ),
    ],
  },
  {
    id: 'socrates',
    name: localized('Socrates', '苏格拉底'),
    years: localized('c. 470–399 BCE', '约公元前470–399年'),
    emoji: '🗣️',
    summary: localized(
      'The barefoot questioner of Athens who wrote nothing, taught in the agora, and chose hemlock rather than silence the examined life.',
      '赤足行走于雅典的发问者：不著书，在广场上教导，宁饮毒堇也不让省察的人生噤声。',
    ),
    badgeTitle: localized('Life of Socrates', '苏格拉底生平'),
    cardId: 'card-life-socrates',
    relatedTimelinePointIds: ['greek-socrates'],
    relatedTopicIds: ['discernment', 'reflection'],
    chapters: [
      chapter(
        'socrates-athens',
        ['Athens after the wars', '战后的雅典'],
        [
          'After the Persian Wars and during the Peloponnesian War, Athens was rich in speech, democracy, empire — and anxiety about who was corrupting the young.',
          '波斯战争之后，伯罗奔尼撒战争期间，雅典富于言辞、民主与帝国 — 也焦虑着谁在败坏青年。',
        ],
        [
          'Socrates served as a hoplite in hard campaigns, then spent decades in the agora asking Athenians what justice, courage, and piety really were. He took no fee, unlike the Sophists. He claimed a divine sign warned him from wrong, and that he knew that he did not know — a discipline harder than any boast of wisdom.',
          '苏格拉底曾以重装步兵参加艰苦战役，而后数十年在广场上追问雅典人：正义、勇敢、虔敬究竟是什么。他不像智者派那样收费。他声称有一种神谕般的征象阻止他做错，并深知自己无知 — 这比任何智慧的吹嘘都更难持守。',
        ],
        [
          q(
            ['Where did Socrates mainly teach?', '苏格拉底主要在何处教导？'],
            [
              ['A private palace school for fees', 'The agora, in public conversation', 'Only in Sparta', 'A silent monastery'],
              ['收费的宫廷私学', '广场上的公开对话', '只在斯巴达', '一座沉默修道院'],
            ],
            1,
          ),
          q(
            ['Unlike many Sophists, Socrates…', '与许多智者派不同，苏格拉底……'],
            [
              ['Sold speeches for gold', 'Took no payment for teaching', 'Refused all questions', 'Became a tyrant'],
              ['靠卖演讲赚钱', '教学不收取报酬', '拒绝一切提问', '成为僭主'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'greek-socrates' },
      ),
      chapter(
        'socrates-method',
        ['The elenchus', '诘问之法'],
        [
          'Public talk was political power in Athens. Cross-examination could shame — or free — a citizen’s false confidence.',
          '在雅典，公共言谈即是政治力量。交叉诘问可以羞辱一个人，也可以解放他虚假的确信。',
        ],
        [
          'Socrates’ method — the elenchus — tested a claim until the speaker’s own answers conflicted. The aim was not to humiliate for sport, but to clear space for real inquiry. Friends and enemies alike felt the sting. Young listeners loved him; powerful men who traded in reputation often did not.',
          '苏格拉底的方法 — 诘问（elenchus）— 检验一个主张，直到说话者自己的答案互相冲突。目的不是为了取乐羞辱，而是为真正的探究腾出空间。朋友与敌人都感到刺痛。年轻人喜爱他；以名声交易的权贵往往不然。',
        ],
        [
          q(
            ['The elenchus mainly aimed to…', '诘问之法主要旨在……'],
            [
              ['Win prizes for rhetoric', 'Clear away false confidence for real inquiry', 'Prove Socrates always right', 'Elect Socrates archon'],
              ['赢得修辞奖', '清除虚假确信，好让真正探究开始', '证明苏格拉底永远正确', '选举苏格拉底为执政官'],
            ],
            1,
          ),
          q(
            ['Who often disliked Socrates’ questioning?', '谁常常不喜欢苏格拉底的追问？'],
            [
              ['Only children', 'Powerful men who traded in reputation', 'All farmers', 'Foreign merchants alone'],
              ['只有儿童', '以名声交易的权贵', '所有农民', '仅外国商人'],
            ],
            1,
          ),
        ],
      ),
      chapter(
        'socrates-trial',
        ['Trial and hemlock', '审判与毒堇'],
        [
          'In 399 BCE, after defeat and oligarchic violence, Athens was ready to blame teachers for unsettled youth.',
          '公元前399年，在战败与寡头暴力之后，雅典准备将不安的青年归咎于教师。',
        ],
        [
          'Charged with impiety and corrupting the young, Socrates refused to beg or flee. In Plato’s Apology he offers a defence that is also a last lesson: better to suffer wrong than to do wrong; the unexamined life is not worth living. He drinks the hemlock among friends — a death that made the examined life a founding story of philosophy.',
          '被控不敬神与败坏青年，苏格拉底拒绝求饶或逃亡。在柏拉图《申辩》中，他的辩护也是最后一课：受不义胜过行不义；未经省察的人生不值得度过。他在友人之间饮下毒堇 — 这一死，使省察的人生成为哲学的立教故事。',
        ],
        [
          q(
            ['In 399 BCE Socrates was condemned for…', '公元前399年，苏格拉底被定罪的罪名包括……'],
            [
              ['Stealing from the treasury', 'Impiety and corrupting the young', 'Deserting the army', 'Burning the agora'],
              ['盗窃国库', '不敬神与败坏青年', '临阵脱逃', '焚烧广场'],
            ],
            1,
          ),
          q(
            ['At his trial he chose…', '在受审时，他选择了……'],
            [
              ['A plea deal that silenced questioning', 'Death rather than abandon the examined life', 'Exile with riches', 'Revenge by force'],
              ['以噤声换取的和解', '死亡，也不放弃省察的人生', '带着财富流亡', '以武力复仇'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'greek-socrates' },
      ),
      chapter(
        'socrates-legacy',
        ['Students and the question', '弟子与追问'],
        [
          'Plato, Xenophon, and others wrote the Socrates we meet. Philosophy inherited his question more than any doctrine.',
          '柏拉图、色诺芬等人写下了我们所认识的苏格拉底。哲学继承的，更多是他的问题，而非某一教条。',
        ],
        [
          'Socrates left no book of his own. What remains is a way of living with questions in public, and a refusal to trade truth for comfort. Plato’s Academy and later ethics all stand in the shadow of that barefoot walk through Athens — and of a cup drunk so that inquiry would not kneel.',
          '苏格拉底没有留下自己的书。留下的是在公共生活中与问题共处的方式，以及拒绝用真理换取安逸。柏拉图的学园与后世伦理学，都站在那赤足穿行雅典的身影里 — 以及那杯为了不让探究下跪而饮下的酒中。',
        ],
        [
          q(
            ['Socrates left behind mainly…', '苏格拉底主要留下了……'],
            [
              ['His own complete library', 'A way of living with public questions', 'A code of tax law', 'A map of Atlantis'],
              ['自己完整的藏书', '一种在公共中与问题共处的方式', '一部税法', '亚特兰蒂斯地图'],
            ],
            1,
          ),
          q(
            ['His death is remembered as founding…', '他的死被记为奠定了……'],
            [
              ['The Athenian empire', 'The examined life as worth more than mere survival', 'A merchant league', 'Silence as the highest virtue'],
              ['雅典帝国', '省察的人生胜过单纯存活', '一个商业同盟', '沉默为最高德行'],
            ],
            1,
          ),
        ],
      ),
    ],
  },
  {
    id: 'ptahhotep',
    name: localized('Ptahhotep', '普塔霍特普'),
    years: localized('c. 24th century BCE', '约公元前24世纪'),
    emoji: '𓂀',
    summary: localized(
      'An Egyptian vizier whose Maxims taught that a good name outlasts wealth — and that listening is the beginning of wise rule.',
      '一位埃及宰相，其《箴言》教导：美名比财富更长久 — 而倾听，是明智统治的开端。',
    ),
    badgeTitle: localized('Life of Ptahhotep', '普塔霍特普生平'),
    cardId: 'card-life-ptahhotep',
    relatedTimelinePointIds: ['ancient-first'],
    relatedTopicIds: ['humility', 'integrity'],
    chapters: [
      chapter(
        'ptahhotep-court',
        ['Vizier of Ma’at', '玛阿特的宰相'],
        [
          'In Old Kingdom Egypt, the vizier stood between pharaoh and the land. Ma’at — truth, balance, right order — was the measure of a just court.',
          '在古王国埃及，宰相立于法老与国土之间。「玛阿特」— 真理、平衡与正当秩序 — 是公正朝廷的尺度。',
        ],
        [
          'Ptahhotep served as vizier under a Fifth Dynasty king. Tradition remembers him as a man who had seen power close up and still urged restraint: do not be proud of what you know; take counsel; let the heart stay open. Wisdom, for him, was how a house and a kingdom stay upright.',
          '普塔霍特普曾任第五王朝某王的宰相。传统记他近距离见过权力，仍劝人节制：勿以所知自骄；多纳谏言；让心保持敞开。对他而言，智慧就是使家与国得以直立的方式。',
        ],
        [
          q(
            ['Ptahhotep served mainly as…', '普塔霍特普主要担任……'],
            [
              ['A desert hermit', 'Vizier — chief counsellor of the court', 'A foreign merchant', 'A pyramid architect only'],
              ['沙漠隐士', '宰相 — 朝廷首席顾问', '外国商人', '仅金字塔建筑师'],
            ],
            1,
          ),
          q(
            ['Ma’at in his world meant…', '在他的世界里，玛阿特意味着……'],
            [
              ['Military conquest only', 'Truth, balance, and right order', 'Gold storage', 'Silence forever'],
              ['仅军事征服', '真理、平衡与正当秩序', '贮藏黄金', '永远沉默'],
            ],
            1,
          ),
        ],
        { relatedTimelinePointId: 'ancient-first' },
      ),
      chapter(
        'ptahhotep-maxims',
        ['The Maxims', '箴言集'],
        [
          'Instruction literature trained the young elite to speak carefully and govern without crushing the weak.',
          '「教谕」文学训练年轻精英谨慎言说，治理时不欺压弱者。',
        ],
        [
          'He set down Maxims for his son and successors: listen before you speak; a good name endures longer than a storehouse; do not terrify people for sport. The words are practical — how to sit in council, how to correct without humiliation — yet they aim at a moral sky: live so that Ma’at is not a slogan but a habit.',
          '他为儿子与后继者写下箴言：先听后言；美名比仓廪更长久；勿以恐吓百姓为乐。这些话很实用 — 如何坐在议事之中，如何纠正而不羞辱 — 却指向道德的天空：让玛阿特不是口号，而是习惯。',
        ],
        [
          q(
            ['Ptahhotep taught that a good name…', '普塔霍特普教导：美名……'],
            [
              ['Matters less than gold', 'Outlasts wealth', 'Is useless in court', 'Belongs only to kings'],
              ['不如黄金重要', '比财富更长久', '在朝廷无用', '只属于国王'],
            ],
            1,
          ),
          q(
            ['His Maxims urge leaders to…', '他的箴言敦促领导者……'],
            [
              ['Listen before speaking', 'Conquer first, ask later', 'Hide all mistakes', 'Ignore the weak'],
              ['先听后言', '先征服再问', '隐瞒一切过错', '忽视弱者'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'ptahhotep-listening',
        ['The art of hearing', '倾听之艺'],
        [
          'Egyptian courts prized eloquence, but Ptahhotep ranked hearing above display.',
          '埃及朝廷看重辞令，普塔霍特普却把倾听置于炫耀之上。',
        ],
        [
          '“If you are a leader, listen calmly to a petitioner’s speech,” the Maxims say in spirit — even when the words are tangled. Patience in hearing is not weakness; it is how truth enters a room where power already sits. That lesson travels easily into any age that confuses volume with wisdom.',
          '箴言大意说：你若居上位，当平静倾听陈情者的话 — 即使话语纷乱。耐心倾听不是软弱；它是真理进入权力已坐满之室的方式。这课轻易传到任何把音量误当作智慧的时代。',
        ],
        [
          q(
            ['For Ptahhotep, listening carefully is…', '对普塔霍特普而言，仔细倾听是……'],
            [
              ['A waste of a ruler’s time', 'How truth can enter a room of power', 'Only for servants', 'A form of magic'],
              ['浪费统治者时间', '真理进入权力之室的方式', '只属于仆人', '一种魔法'],
            ],
            1,
          ),
          q(
            ['He warns against confusing…', '他告诫勿把……混淆'],
            [
              ['Volume with wisdom', 'Bread with water', 'Night with day', 'Boats with carts'],
              ['音量与智慧', '面包与水', '夜与日', '船与车'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'ptahhotep-legacy',
        ['An early lamp', '一盏早灯'],
        [
          'The Maxims of Ptahhotep are among the oldest surviving wisdom books — proof that the hunger for harmony is ancient.',
          '《普塔霍特普箴言》是现存最古老的智慧书之一 — 证明对和谐的渴望古已有之。',
        ],
        [
          'Long before Greece named “philosophy,” an Egyptian elder was already teaching character as public craft. His lamp still burns wherever someone chooses a good name over a quick win — and wherever Ma’at is practised as daily balance, not museum stone.',
          '早在希腊为「哲学」命名之前，一位埃及长者已在把品格当作公共技艺来教。凡有人选择美名而非速胜之处，凡把玛阿特当作日常平衡而非博物馆石刻之处，他的灯仍在燃烧。',
        ],
        [
          q(
            ['Ptahhotep’s Maxims show that…', '普塔霍特普的箴言表明……'],
            [
              ['Wisdom began only in Greece', 'The longing for wise living is very old', 'Egypt had no ethics', 'Viziers never wrote'],
              ['智慧只始于希腊', '对智慧生活的渴望极为古老', '埃及没有伦理', '宰相从不写作'],
            ],
            1,
          ),
          q(
            ['His lasting theme is…', '他持久的主题是……'],
            [
              ['Character as public craft under Ma’at', 'Secret alchemy', 'Naval tactics', 'Tax evasion'],
              ['在玛阿特之下，品格作为公共技艺', '秘密炼金', '海战战术', '逃税'],
            ],
            0,
          ),
        ],
      ),
    ],
  },
  {
    id: 'buddha',
    name: localized('The Buddha', '佛陀'),
    years: localized('c. 563–483 BCE', '约公元前563–483年'),
    emoji: '🪷',
    summary: localized(
      'Siddhartha Gautama left the palace, awoke beneath the Bodhi tree, and taught a Middle Way of compassion — suffering understood, craving loosened, kindness widened to all beings.',
      '悉达多·乔达摩离开王宫，在菩提树下觉悟，教导慈悲的中道 — 知苦、松绑贪爱，把慈爱扩及一切众生。',
    ),
    badgeTitle: localized('Life of the Buddha', '佛陀生平'),
    cardId: 'card-life-buddha',
    relatedTimelinePointIds: ['buddhism-buddha'],
    relatedTopicIds: ['compassion', 'awareness'],
    chapters: [
      chapter(
        'buddha-palace',
        ['Leaving the palace', '出离王宫'],
        [
          'In the kingdoms of the Gangetic plain, luxury and caste framed many lives — and also hid sickness, age, and death from royal eyes.',
          '在恒河平原的诸国，奢华与种姓框定了许多人生 — 也把病、老、死从王室眼前藏起。',
        ],
        [
          'Tradition tells that Prince Siddhartha was shielded from suffering until he saw an old person, a sick person, a corpse, and a seeker. The sight broke the palace spell. He left home not to scorn the world, but to find why beings suffer — and whether freedom was possible.',
          '传统说，悉达多王子被隔开苦难，直到他见到老人、病人、尸体与求道者。那一见打破了王宫的迷咒。他离家并非鄙弃世界，而是要寻问：众生为何受苦 — 以及自由是否可能。',
        ],
        [
          q(
            ['Siddhartha left the palace after seeing…', '悉达多见了……之后离开王宫'],
            [
              ['A treasure map', 'Old age, sickness, death, and a seeker', 'Only a festival', 'A foreign army'],
              ['寻宝图', '老、病、死与求道者', '仅一场节日', '外国军队'],
            ],
            1,
          ),
          q(
            ['He left mainly in order to…', '他离开主要为了……'],
            [
              ['Conquer neighbouring kingdoms', 'Understand suffering and whether freedom is possible', 'Become richer', 'Forget the world entirely'],
              ['征服邻国', '了解苦，以及自由是否可能', '变得更富', '彻底忘记世界'],
            ],
            1,
          ),
        ],
      ),
      chapter(
        'buddha-awakening',
        ['Awakening under the tree', '树下觉悟'],
        [
          'Ascetics of the time often swung between indulgence and harsh self-denial. Siddhartha tried both extremes and found them wanting.',
          '当时的苦行者常在纵欲与严苛自制之间摇摆。悉达多试过两个极端，都觉不足。',
        ],
        [
          'After years of searching and nearly destroying his body with austerity, he took nourishment, sat beneath the Bodhi tree, and awoke as the Buddha — “the awakened one.” He saw that craving fuels suffering, and that a clear mind can loosen the knot. The Middle Way was not compromise for comfort; it was a path sturdy enough to walk for a lifetime.',
          '历经多年寻觅，几乎因苦行毁坏身体后，他进食，坐在菩提树下，觉悟为佛陀 — 「觉醒者」。他看见贪爱助长苦，而清明的心能松开那个结。中道不是为了安逸的妥协；它是一条足以走一生的稳路。',
        ],
        [
          q(
            ['“Buddha” means…', '「佛陀」意为……'],
            [
              ['The richest king', 'The awakened one', 'The silent mountain', 'The lawgiver of taxes'],
              ['最富有的国王', '觉醒者', '沉默的山', '税法制定者'],
            ],
            1,
          ),
          q(
            ['The Middle Way lies between…', '中道位于……之间'],
            [
              ['Indulgence and harsh self-denial', 'East and West only', 'Speech and silence forever', 'War and trade'],
              ['纵欲与严苛自制', '仅东与西', '永远的言语与沉默', '战争与贸易'],
            ],
            0,
          ),
        ],
        { relatedTimelinePointId: 'buddhism-buddha' },
      ),
      chapter(
        'buddha-turning',
        ['Turning the Wheel', '转法轮'],
        [
          'After awakening he hesitated, then chose to teach — beginning at Sarnath with companions who had left him.',
          '觉悟后他曾犹豫，最终选择教导 — 在鹿野苑从曾离开他的同伴开始。',
        ],
        [
          'He taught the Four Noble Truths and the Eightfold Path: see suffering clearly, loosen craving, cultivate ethics, mindfulness, and wisdom together. Compassion (karuna) and loving-kindness (metta) were not ornaments; they were how awakening meets other beings. The sangha — community of practice — became a living vessel for the teaching.',
          '他教导四圣谛与八正道：看清苦，松绑贪爱，将戒、正念与智慧一同修持。慈悲与慈爱不是装饰；它们是觉悟遇见众生的方式。僧伽 — 修行的共同体 — 成了承载教法的活的容器。',
        ],
        [
          q(
            ['According to the Buddha, suffering arises from…', '根据佛陀，苦生于……'],
            [
              ['Bad luck alone', 'Craving and attachment', 'Other people’s success', 'The weather'],
              ['仅厄运', '贪爱与执着', '他人的成功', '天气'],
            ],
            1,
          ),
          q(
            ['Karuna and metta name…', '「悲」与「慈」指的是……'],
            [
              ['Compassion and loving-kindness', 'Taxes and tribute', 'War and peace treaties', 'Music scales'],
              ['慈悲与慈爱', '税与贡品', '战争与和约', '音阶'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'buddha-legacy',
        ['A path across Asia', '穿越亚洲之路'],
        [
          'The teaching spread along trade routes and into many cultures, adapting without losing the heart of liberation and care.',
          '教法沿商路传入多种文化，适应而不失解脱与关怀之心。',
        ],
        [
          'From early councils to traditions across Asia, the Buddha’s life remained a pattern: leave what blinds you, sit until you see, then walk back toward others with open hands. Great Harmony hears in that pattern a familiar rhythm — personal awakening that refuses to stop at the self.',
          '从早期结集到亚洲各地传统，佛陀的一生仍是一个范式：离开蒙蔽你的，安坐直到看见，然后张开双手走回人群。大同在那范式中听见熟悉的节奏 — 个人的觉醒，却拒绝停在自我。',
        ],
        [
          q(
            ['The Buddha’s path ends not in isolation but in…', '佛陀之路的终点不是孤立，而是……'],
            [
              ['Returning toward others with compassion', 'Building taller palaces', 'Erasing all memory', 'Ruling as emperor'],
              ['以慈悲走回他人', '建造更高王宫', '抹去一切记忆', '以皇帝统治'],
            ],
            0,
          ),
          q(
            ['His life pattern emphasises…', '他的人生范式强调……'],
            [
              ['Awakening that includes care for beings', 'Wealth first', 'Fame at any cost', 'Never teaching'],
              ['包含关怀众生的觉醒', '财富优先', '不惜代价求名', '永不教导'],
            ],
            0,
          ),
        ],
      ),
    ],
  },
  {
    id: 'jesus',
    name: localized('Jesus of Nazareth', '拿撒勒人耶稣'),
    years: localized('c. 4 BCE–30 CE', '约公元前4年–公元30年'),
    emoji: '✝️',
    summary: localized(
      'A teacher in Roman Galilee who blessed the merciful and the peacemakers, told of neighbours beyond every boundary, and made love — even of enemies — the measure of a life.',
      '罗马治下加利利的一位老师，祝福怜悯人的与使人和睦的，讲述跨越界限的邻舍，并以爱 — 甚至爱仇敌 — 作为人生的尺度。',
    ),
    badgeTitle: localized('Life of Jesus', '耶稣生平'),
    cardId: 'card-life-jesus',
    relatedTimelinePointIds: ['christianity-jesus'],
    relatedTopicIds: ['forgiveness', 'kindness'],
    chapters: [
      chapter(
        'jesus-galilee',
        ['Among the villages', '行走乡间'],
        [
          'Galilee under Rome was tense with taxes, hope for liberation, and debates over how to keep faith amid empire.',
          '罗马治下的加利利，税赋、解放的盼望，与如何在帝国中持守信仰的争论交织。',
        ],
        [
          'Jesus grew up in Nazareth and walked the villages teaching in synagogues and on hillsides. He spoke of a kingdom not built on swords: the meek, the merciful, and the peacemakers are blessed. Crowds came for healing and for words that rearranged who counted as neighbour.',
          '耶稣在拿撒勒长大，走遍乡村，在会堂与山坡上教导。他讲论的国不以刀剑建立：温柔的、怜悯人的、使人和睦的有福了。人群为医治而来，也为那重新安排「谁算邻舍」的话语而来。',
        ],
        [
          q(
            ['Jesus taught mainly in…', '耶稣主要在……教导'],
            [
              ['Roman senate halls', 'Villages, synagogues, and hillsides of Galilee', 'Only distant deserts forever', 'Egyptian temples'],
              ['罗马元老院大厅', '加利利的乡村、会堂与山坡', '永远只在遥远沙漠', '埃及神庙'],
            ],
            1,
          ),
          q(
            ['In the Sermon on the Mount he blessed…', '在登山宝训中，他祝福……'],
            [
              ['Only the wealthy', 'The meek, the merciful, and the peacemakers', 'Generals alone', 'Tax collectors exclusively'],
              ['仅富人', '温柔的、怜悯人的与使人和睦的', '仅将军', '仅税吏'],
            ],
            1,
          ),
        ],
      ),
      chapter(
        'jesus-love',
        ['The ethic of love', '爱的伦理'],
        [
          'Religious and civic lines often decided who deserved care. Jesus crossed those lines in story and in practice.',
          '宗教与公民界限常决定谁值得被关怀。耶稣在故事与实践中跨越那些界限。',
        ],
        [
          'He summed the law as love of God and love of neighbour — and stretched “neighbour” to include the enemy and the stranger. The Golden Rule and parables like the Good Samaritan made compassion concrete: mercy is proved on the road, not only in the temple.',
          '他把律法总结为爱神与爱人 — 并把「邻舍」伸展到仇敌与陌生人。金律与好撒玛利亚人等比喻使慈悲具体：怜悯在路上得证，不只在圣殿里。',
        ],
        [
          q(
            ['The Golden Rule teaches…', '金律教导……'],
            [
              ['Treat others as you would have them treat you', 'An eye for an eye', 'Ignore strangers', 'Win every argument'],
              ['你想别人怎样待你，你也要怎样待人', '以眼还眼', '忽视陌生人', '赢得每次争论'],
            ],
            0,
          ),
          q(
            ['The Good Samaritan shows that…', '好撒玛利亚人表明……'],
            [
              ['Compassion crosses social boundaries', 'Only priests may help', 'Roads are unsafe so stay home', 'Love is optional'],
              ['慈悲跨越社会界限', '只有祭司可以帮忙', '路不安全所以待在家', '爱是可选项'],
            ],
            0,
          ),
        ],
        { relatedTimelinePointId: 'christianity-jesus' },
      ),
      chapter(
        'jesus-table',
        ['Table and forgiveness', '筵席与宽恕'],
        [
          'Who you ate with signalled honour. Jesus’s open table unsettled that map.',
          '与谁同席标示尊荣。耶稣敞开的筵席扰动了那张地图。',
        ],
        [
          'He welcomed the overlooked and the criticised, and taught forgiveness that restores what shame and debt break. The Prodigal Son’s father runs to meet the returning child — a picture of mercy that moves first. For Jesus, holiness was not distance from the wounded; it was presence that heals.',
          '他欢迎被忽视与被指摘的人，教导能修复羞耻与亏欠所破碎之物的宽恕。浪子回头的父亲奔跑迎接归来的孩子 — 一幅主动施怜悯的图画。对耶稣而言，圣洁不是远离受伤者；而是带来医治的同在。',
        ],
        [
          q(
            ['Jesus’s open table mainly signalled…', '耶稣敞开的筵席主要标示……'],
            [
              ['Welcome beyond honour maps', 'Exclusive club membership', 'Roman loyalty tests', 'Military recruitment'],
              ['超越尊荣地图的欢迎', '专属俱乐部会员', '罗马忠诚测试', '军事征召'],
            ],
            0,
          ),
          q(
            ['The Prodigal Son highlights…', '浪子回头突出……'],
            [
              ['Mercy that moves toward the returning one', 'Permanent exile', 'Wealth as the only good', 'Never forgiving'],
              ['主动迎向归来者的怜悯', '永久放逐', '财富为唯一的善', '永不宽恕'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'jesus-legacy',
        ['A vision that travelled', '远行的愿景'],
        [
          'After his death under Roman power, communities carried his ethic across the Mediterranean and far beyond.',
          '他在罗马权力下死后，群体把他的伦理带到地中海沿岸与更远之处。',
        ],
        [
          'Whatever one believes about his nature, the moral vision remains: love that crosses enmity, service over domination, peacemaking as blessed work. Great Harmony recognises in that ethic a companion to Datong — a world where no one is left outside the circle of care.',
          '无论人如何理解他的本质，道德愿景仍在：跨越仇恨的爱，服务胜过宰制，使人和睦为有福的工作。大同在那伦理中认出与「天下为公」相伴的声音 — 一个无人被留在关怀圈外的世界。',
        ],
        [
          q(
            ['A central lasting note of his teaching is…', '其教导一个持久的核心是……'],
            [
              ['Love that includes even enemies', 'Victory by any means', 'Silence as the only prayer', 'Empire first'],
              ['甚至包括仇敌的爱', '不择手段的胜利', '沉默为唯一祷告', '帝国优先'],
            ],
            0,
          ),
          q(
            ['Peacemakers in his teaching are…', '在他的教导中，使人和睦的人……'],
            [
              ['Blessed', 'Ignored', 'Punished always', 'Only for the rich'],
              ['有福的', '被忽视的', '总是受罚', '只属于富人'],
            ],
            0,
          ),
        ],
      ),
    ],
  },
  {
    id: 'rumi',
    name: localized('Rumi', '鲁米'),
    years: localized('1207–1273', '1207–1273年'),
    emoji: '🌙',
    summary: localized(
      'A scholar of Konya who, after friendship and loss, became a poet of the field beyond right and wrong — singing a love that gathers all beings.',
      '科尼亚的一位学者，在友谊与失去之后，成为歌唱「是非之外那片旷野」的诗人 — 咏唱聚拢万物的爱。',
    ),
    badgeTitle: localized('Life of Rumi', '鲁米生平'),
    cardId: 'card-life-rumi',
    relatedTimelinePointIds: ['islamic-golden-age'],
    relatedTopicIds: ['compassion', 'awareness'],
    chapters: [
      chapter(
        'rumi-scholar',
        ['Scholar of Konya', '科尼亚的学者'],
        [
          'In the Seljuk lands of Anatolia, Islamic learning, Persian poetry, and travelling mystics met in busy cities.',
          '在安纳托利亚的塞尔柱领地，伊斯兰学问、波斯诗歌与行走的神秘家在繁忙城市相遇。',
        ],
        [
          'Jalal al-Din Rumi inherited a learned household and taught law and faith with respect. He was already respected when friendship would overturn the order of his days — proving that scholarship alone does not finish a heart.',
          '贾拉鲁丁·鲁米承继书香之家，以敬重之心教授律法与信仰。他已受人尊敬，而友谊将颠覆他日子的秩序 — 证明单靠学问，不足以完成一颗心。',
        ],
        [
          q(
            ['Rumi first lived mainly as…', '鲁米起初主要作为……生活'],
            [
              ['A pirate captain', 'A respected teacher of law and faith', 'A silent hermit from birth', 'A Roman senator'],
              ['海盗船长', '受人尊敬的律法与信仰教师', '生来就沉默的隐士', '罗马元老'],
            ],
            1,
          ),
          q(
            ['His city, Konya, sat in…', '他的城市科尼亚位于……'],
            [
              ['Anatolia, where many traditions met', 'Only the Antarctic', 'Isolation from all books', 'A single closed village forever'],
              ['安纳托利亚，多种传统交会之处', '仅南极', '与一切书籍隔绝', '永远封闭的单一村庄'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'rumi-shams',
        ['Friendship with Shams', '与沙姆斯的友谊'],
        [
          'Sufi paths sought direct love of the Divine. Companionship could become the furnace of that love.',
          '苏菲之路寻求对神圣的直接之爱。同伴之谊可成为那爱的熔炉。',
        ],
        [
          'The wandering dervish Shams of Tabriz entered Rumi’s life like a spark. Their friendship burned away pride and caution; when Shams vanished, grief opened Rumi into poetry. Loss did not end the teaching — it became the door through which love spoke in verse.',
          '大不里士的行走托钵僧沙姆斯如火花进入鲁米的生命。他们的友谊烧掉骄傲与谨慎；当沙姆斯消失，哀伤把鲁米打开成诗。失去没有结束教导 — 它成了爱以诗句说话的门。',
        ],
        [
          q(
            ['Shams of Tabriz was…', '大不里士的沙姆斯是……'],
            [
              ['A wandering spiritual friend who transformed Rumi', 'Rumi’s tax collector', 'A fictional horse', 'A crusader general'],
              ['改变鲁米的行走心灵挚友', '鲁米的税吏', '虚构的马', '十字军将军'],
            ],
            0,
          ),
          q(
            ['After Shams vanished, Rumi…', '沙姆斯消失后，鲁米……'],
            [
              ['Turned grief into poetry of love', 'Quit all teaching forever', 'Became a merchant only', 'Burned every book'],
              ['把哀伤化为爱的诗歌', '永远停止一切教导', '只做商人', '烧掉每一本书'],
            ],
            0,
          ),
        ],
        { relatedTimelinePointId: 'islamic-golden-age' },
      ),
      chapter(
        'rumi-field',
        ['The field beyond', '是非之外的旷野'],
        [
          'Courts and schools argued right and wrong. Rumi pointed past the quarrel to a meeting place of the heart.',
          '宫廷与学院争论是非。鲁米指向争吵之外，那心灵相遇之处。',
        ],
        [
          '“Out beyond ideas of wrongdoing and rightdoing, there is a field. I’ll meet you there.” The line is not laziness about ethics; it is an invitation to a love larger than winning debates — the Sufi sense that unity waits where ego loosens.',
          '「在是非对错的观念之外，有一片旷野，我们在那里相遇。」这句不是对伦理的懒惰；它是邀请进入比赢得辩论更大的爱 — 苏菲所感：当自我松开，合一在等待。',
        ],
        [
          q(
            ['Rumi’s “field” is mainly an image of…', '鲁米的「旷野」主要是……的意象'],
            [
              ['A place of meeting beyond harsh judgment', 'A sports stadium', 'A tax office', 'A battlefield only'],
              ['超越苛刻评判的相遇之地', '体育场', '税务所', '仅战场'],
            ],
            0,
          ),
          q(
            ['His poetry invites…', '他的诗邀请……'],
            [
              ['Love larger than winning arguments', 'Never listening', 'Strict silence about God', 'Hate of strangers'],
              ['比赢得争论更大的爱', '永不倾听', '对神严格沉默', '憎恨陌生人'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'rumi-legacy',
        ['A song that crossed borders', '越过边界的歌'],
        [
          'The Masnavi and the lyrics travelled through Persian, Turkish, and later world languages.',
          '《玛斯纳维》与抒情诗穿越波斯语、土耳其语，以及后来的世界语言。',
        ],
        [
          'Rumi’s whirling, his teaching circle, and his verses made love a public craft again — not private sentiment alone. In the Great Harmony journey he stands with the Golden Age scholars: reason and faith can illuminate one another, and the heart has its own scholarship of reunion.',
          '鲁米的旋转、他的教圈与诗句，使爱再次成为公共技艺 — 不只是私密情感。在大同之路上，他与黄金时代的学者并列：理性与信仰可以彼此照亮，而心自有其重逢的学问。',
        ],
        [
          q(
            ['Rumi belongs to the wider story of…', '鲁米属于……的更广故事'],
            [
              ['Islamic Golden Age wisdom and Sufi love', 'Only Norse myth', 'Roman road building', 'Silent trade guilds'],
              ['伊斯兰黄金时代智慧与苏菲之爱', '仅北欧神话', '罗马筑路', '沉默的商会'],
            ],
            0,
          ),
          q(
            ['His lasting gift is often named as…', '他持久的礼物常被称为……'],
            [
              ['Poetry that gathers beings in love', 'A code of naval law', 'A map of buried gold', 'A ban on music'],
              ['以爱聚拢众生的诗歌', '一部海法', '藏金地图', '禁止音乐'],
            ],
            0,
          ),
        ],
      ),
    ],
  },
  {
    id: 'kant',
    name: localized('Immanuel Kant', '伊曼努尔·康德'),
    years: localized('1724–1804', '1724–1804年'),
    emoji: '💡',
    summary: localized(
      'A Königsberg thinker who dared people to use their own understanding — and to treat every person as an end, never merely a means.',
      '一位柯尼斯堡的思想家，鼓励人运用自己的理智 — 并把每个人当作目的本身，绝不仅仅当作手段。',
    ),
    badgeTitle: localized('Life of Kant', '康德生平'),
    cardId: 'card-life-kant',
    relatedTimelinePointIds: ['enlightenment-reason'],
    relatedTopicIds: ['integrity', 'discernment'],
    chapters: [
      chapter(
        'kant-konigsberg',
        ['The regular walk', '规律的散步'],
        [
          'Enlightenment Europe argued about reason, faith, science, and the rights of persons — often from salons and universities far from Königsberg’s quiet streets.',
          '启蒙时代的欧洲争论理性、信仰、科学与人的权利 — 往往在远离柯尼斯堡安静街道的沙龙与大学里。',
        ],
        [
          'Kant rarely left his city, yet his mind travelled the whole map of knowledge. Neighbours timed their clocks by his walk; he timed his life by rigorous study. Outer calm held an inner revolution: what can we know, and how should we act?',
          '康德极少离开他的城市，思想却走遍知识的全图。邻人以他的散步对时；他以严谨的研读安排人生。外在的平静里藏着内在的革命：我们能知道什么，又应当如何行动？',
        ],
        [
          q(
            ['Kant spent most of his life in…', '康德大半生在……度过'],
            [
              ['Königsberg', 'Only Paris cafés', 'A desert monastery', 'The British navy'],
              ['柯尼斯堡', '仅巴黎咖啡馆', '沙漠修道院', '英国海军'],
            ],
            0,
          ),
          q(
            ['His outer routine is remembered as…', '他外在的规律被记为……'],
            [
              ['A calm frame for radical questions about knowledge and duty', 'Proof he never thought', 'A refusal to read', 'A plan for conquest'],
              ['为知识与义务的激进问题而设的平静框架', '证明他从不思考', '拒绝阅读', '征服计划'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'kant-aude',
        ['Sapere aude', '敢于求知'],
        [
          'Many lived by borrowed opinions. Kant named Enlightenment as exit from self-incurred immaturity.',
          '许多人靠借来的意见生活。康德把启蒙称为走出自己加于自己的不成熟。',
        ],
        [
          '“Sapere aude” — dare to know — became his motto for the age: have the courage to use your own understanding. Critique was not cynicism; it was clearing space so reason could serve freedom without pretending to know what it cannot.',
          '「Sapere aude」— 敢于求知 — 成了他给时代的座右铭：要有勇气运用你自己的理智。批判不是犬儒；它是清理空间，使理性能服务自由，却不假装知道它所不能知的。',
        ],
        [
          q(
            ['“Sapere aude” means…', '「Sapere aude」意为……'],
            [
              ['Dare to know', 'Obey quietly', 'Sleep early', 'Spend freely'],
              ['敢于求知', '安静服从', '早睡', '自由花钱'],
            ],
            0,
          ),
          q(
            ['For Kant, Enlightenment is courage to…', '对康德而言，启蒙是勇于……'],
            [
              ['Use your own understanding', 'Never ask questions', 'Follow every rumour', 'Abandon all ethics'],
              ['运用自己的理智', '永不提问', '听从每个谣言', '放弃一切伦理'],
            ],
            0,
          ),
        ],
        { relatedTimelinePointId: 'enlightenment-reason' },
      ),
      chapter(
        'kant-end',
        ['Persons as ends', '人为目的'],
        [
          'Markets and states can treat humans as tools. Kant drew a bright line.',
          '市场与国家可能把人当作工具。康德划下一道明线。',
        ],
        [
          'Act only on principles you could will as universal law; treat humanity in yourself and others always as an end, never merely as a means. Dignity is not a luxury good — it is the ground of a shared moral world, echoing older dreams that the world be shared by all.',
          '只依据你愿意成为普遍法则的原则行动；永远把你自己与他人中的人性当作目的，绝不仅仅当作手段。尊严不是奢侈品 — 它是共享道德世界的地基，呼应着天下为公的古老梦想。',
        ],
        [
          q(
            ['Kant taught that every person must be treated as…', '康德教导：每个人都必须被当作……'],
            [
              ['An end, never merely a means', 'A tool for the state only', 'A means to profit alone', 'Optional'],
              ['目的本身，绝不仅仅是手段', '仅国家的工具', '仅营利的手段', '可有可无'],
            ],
            0,
          ),
          q(
            ['The categorical imperative asks you to will principles…', '定言令式要求你愿意原则……'],
            [
              ['As if they could be universal law', 'Only when convenient', 'Never out loud', 'For your friends alone'],
              ['如同它们能成为普遍法则', '仅在方便时', '永不说出', '只为你的朋友'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'kant-legacy',
        ['Dignity after Königsberg', '柯尼斯堡之后的尊严'],
        [
          'Later human-rights language drank from many wells; Kant’s insistence on universal dignity was one deep spring.',
          '后来的人权语言饮自许多井；康德对普遍尊严的坚持，是其中一口深泉。',
        ],
        [
          'He never marched with crowds, yet his ideas marched into constitutions and classrooms: think for yourself, and never use a person as furniture for your plans. On the road to Great Harmony, that is civic love in the language of reason.',
          '他从未与人群一同游行，思想却走进宪法与课堂：独立思考，永不把人当作你计划的家具。在通向大同的路上，那是以理性语言说出的公民之爱。',
        ],
        [
          q(
            ['Kant’s moral legacy emphasises…', '康德的道德遗产强调……'],
            [
              ['Universal dignity and thinking for oneself', 'Blind obedience', 'Wealth ranking', 'Secret codes only'],
              ['普遍尊严与独立思考', '盲目服从', '财富排名', '仅密码'],
            ],
            0,
          ),
          q(
            ['Great Harmony can hear in Kant…', '大同可在康德那里听见……'],
            [
              ['A shared moral world where persons are never mere tools', 'A call to abandon neighbours', 'Praise of tyranny', 'Silence about rights'],
              ['人永不只是工具的共享道德世界', '抛弃邻人的号召', '赞美暴政', '对权利沉默'],
            ],
            0,
          ),
        ],
      ),
    ],
  },
  {
    id: 'gandhi',
    name: localized('Mahatma Gandhi', '圣雄甘地'),
    years: localized('1869–1948', '1869–1948年'),
    emoji: '🕊️',
    summary: localized(
      'A lawyer who made ahimsa and satyagraha — non-harm and truth-force — into a public path that sought freedom without hatred.',
      '一位律师，把不害与真理的力量 — 非暴力与真理之力 — 变成寻求自由却不怀仇恨的公共道路。',
    ),
    badgeTitle: localized('Life of Gandhi', '甘地生平'),
    cardId: 'card-life-gandhi',
    relatedTimelinePointIds: ['modern-gandhi-king'],
    relatedTopicIds: ['service', 'integrity'],
    chapters: [
      chapter(
        'gandhi-south',
        ['South Africa awakening', '南非的觉醒'],
        [
          'Colonial law ranked bodies by race. A young Indian lawyer met that ranking on a train — and refused to stay seated in humiliation.',
          '殖民法律按种族排列身体。一位年轻的印度律师在火车上遇见那排列 — 并拒绝屈辱地坐着不动。',
        ],
        [
          'In South Africa Gandhi learned how law can wound, and how disciplined non-cooperation can answer without mirroring hate. Experiments in simple living and communal work began there — a workshop for the India struggle still ahead.',
          '在南非，甘地学会法律如何伤害人，以及有纪律的不合作如何回应而不镜像仇恨。简朴生活与共同劳动的实验在那里开始 — 那是前方印度斗争的工坊。',
        ],
        [
          q(
            ['Gandhi’s early political awakening is linked to…', '甘地早期的政治觉醒与……相关'],
            [
              ['Racial humiliation under colonial law in South Africa', 'Winning a lottery', 'Becoming a general', 'Abandoning all ethics'],
              ['南非殖民法律下的种族屈辱', '中彩票', '成为将军', '放弃一切伦理'],
            ],
            0,
          ),
          q(
            ['He began practising…', '他开始践行……'],
            [
              ['Disciplined non-cooperation without mirroring hate', 'Revenge at all costs', 'Silence forever', 'Luxury only'],
              ['不镜像仇恨的有纪律不合作', '不惜代价报复', '永远沉默', '仅奢华'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'gandhi-satyagraha',
        ['Satyagraha', '真理的力量'],
        [
          'India under empire sought freedom. Gandhi offered a method: hold to truth, refuse violence, accept suffering rather than inflict it.',
          '帝国下的印度寻求自由。甘地提供一种方法：持守真理，拒绝暴力，宁愿承受苦难也不施加苦难。',
        ],
        [
          'Satyagraha — truth-force — joined ahimsa (non-harm) with courage. Salt marches and boycotts were not stunts; they trained a people to stand upright without becoming the cruelty they opposed. He insisted the means are the ends in the making.',
          '「真理的力量」把不害与勇气相连。盐游行与抵制不是噱头；它们训练一个民族直立，而不变成他所反对的残忍。他坚持：手段即正在生成的目的。',
        ],
        [
          q(
            ['Satyagraha means roughly…', 'Satyagraha 大意是……'],
            [
              ['Truth-force', 'Silent wealth', 'Hidden weapons', 'Royal decree'],
              ['真理的力量', '沉默的财富', '隐藏武器', '王室法令'],
            ],
            0,
          ),
          q(
            ['Gandhi taught that means and ends…', '甘地教导：手段与目的……'],
            [
              ['Are woven together — violent means corrupt freedom', 'Never relate', 'Only ends matter', 'Only means matter'],
              ['彼此交织 — 暴力手段会败坏自由', '从无关联', '只有目的重要', '只有手段重要'],
            ],
            0,
          ),
        ],
        { relatedTimelinePointId: 'modern-gandhi-king' },
      ),
      chapter(
        'gandhi-india',
        ['Freedom and the wound of partition', '自由与分治的伤'],
        [
          'Independence arrived with joy and with the trauma of partition. Gandhi walked among the grieving, pleading for peace between communities.',
          '独立带着喜悦与分治的创伤到来。甘地走在哀伤的人群中，恳求共同体之间的和平。',
        ],
        [
          'He fasted and travelled to cool riots, insisting that swaraj without neighbour-love is hollow. His life’s last chapter was not triumph alone but stubborn care for a fractured people — until assassination cut the walk short.',
          '他绝食、奔走以平息暴乱，坚持没有邻人之爱的自治是空洞的。生命最后一章不只是胜利，更是对撕裂民族的固执关怀 — 直到暗杀截断了那步行。',
        ],
        [
          q(
            ['After independence Gandhi focused on…', '独立后甘地专注于……'],
            [
              ['Calming violence and pleading for communal peace', 'Collecting medals only', 'Leaving India forever', 'Building a private palace'],
              ['平息暴力并恳求共同体和平', '仅收集勋章', '永远离开印度', '建造私人宫殿'],
            ],
            0,
          ),
          q(
            ['He held that self-rule without neighbour-love is…', '他认为没有邻人之爱的自治是……'],
            [
              ['Hollow', 'Perfect', 'Optional forever', 'Only for elites'],
              ['空洞的', '完美的', '永远可有可无', '只属于精英'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'gandhi-legacy',
        ['A torch passed on', '传递的火炬'],
        [
          'Movements worldwide studied his method. Martin Luther King Jr. named the debt openly.',
          '世界各地的运动研习他的方法。马丁·路德·金公开承认这债。',
        ],
        [
          'Be the change; refuse to answer hate with hate; organise courage as carefully as armies organise force. On the Great Harmony road, Gandhi is proof that ancient non-harm can become modern public power — when ordinary people hold the line together.',
          '成为你愿见的改变；拒以恨报恨；像军队组织武力一样仔细地组织勇气。在大同之路上，甘地证明：古老的不害可以成为现代的公共力量 — 当普通人一同守住那条线。',
        ],
        [
          q(
            ['Gandhi’s global legacy is tied to…', '甘地的全球遗产与……相连'],
            [
              ['Nonviolent struggle as public power', 'Giving up all hope', 'Secret violence only', 'Ignoring the poor'],
              ['作为公共力量的非暴力斗争', '放弃一切希望', '仅秘密暴力', '忽视穷人'],
            ],
            0,
          ),
          q(
            ['He is often linked with the call to…', '他常与……的号召相连'],
            [
              ['Be the change you wish to see', 'Fear your neighbours', 'Never organise', 'Worship empire'],
              ['成为你愿见的改变', '惧怕邻人', '永不组织', '崇拜帝国'],
            ],
            0,
          ),
        ],
      ),
    ],
  },
  {
    id: 'king',
    name: localized('Martin Luther King Jr.', '马丁·路德·金'),
    years: localized('1929–1968', '1929–1968年'),
    emoji: '🔔',
    summary: localized(
      'A pastor who joined the ethic of love with the demand for justice — teaching that only light drives out darkness, and that the arc of the moral universe bends toward justice when people walk it.',
      '一位牧师，把爱的伦理与对正义的要求相连 — 教导唯有光明能驱散黑暗，而道德宇宙的弧线，在人们行走时弯向正义。',
    ),
    badgeTitle: localized('Life of King', '金恩生平'),
    cardId: 'card-life-king',
    relatedTimelinePointIds: ['modern-gandhi-king'],
    relatedTopicIds: ['compassion', 'service'],
    chapters: [
      chapter(
        'king-montgomery',
        ['Montgomery', '蒙哥马利'],
        [
          'Jim Crow segregation ordered American life by race. A bus boycott in Montgomery became a school of disciplined hope.',
          '吉姆·克劳隔离按种族安排美国生活。蒙哥马利的巴士抵制，成了有纪律的希望的学校。',
        ],
        [
          'Young pastor Martin Luther King Jr. helped lead the Montgomery bus boycott after Rosa Parks’s arrest. The method was clear: nonviolent resistance, dignity under insult, organisation that outlasts a single march. A local fight became a national mirror.',
          '年轻的牧师马丁·路德·金在罗莎·帕克斯被捕后，协助领导蒙哥马利巴士抵制。方法清晰：非暴力抵抗，受辱中的尊严，比单次游行更耐久的组织。一场地方斗争成了全国的镜子。',
        ],
        [
          q(
            ['King first rose to wide notice during…', '金恩首先因……广为人知'],
            [
              ['The Montgomery bus boycott', 'A silent retreat only', 'A royal coronation', 'A space launch'],
              ['蒙哥马利巴士抵制', '仅一次静修', '王室加冕', '航天发射'],
            ],
            0,
          ),
          q(
            ['The boycott trained people in…', '抵制训练人们……'],
            [
              ['Disciplined nonviolent resistance', 'Random revenge', 'Giving up voting forever', 'Ignoring neighbours'],
              ['有纪律的非暴力抵抗', '随意报复', '永远放弃投票', '忽视邻人'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'king-love',
        ['Love and justice', '爱与正义'],
        [
          'Some said love was soft; some said justice was only force. King refused the split.',
          '有人说爱软弱；有人说正义只是武力。金恩拒绝这种分裂。',
        ],
        [
          'He preached that agape love could confront unjust laws without becoming hatred. “Darkness cannot drive out darkness; only light can do that.” Gandhi’s satyagraha met the Black church’s hope — and the demand that America keep its own promises.',
          '他宣讲：圣爱可以对抗不义之法而不变成仇恨。「黑暗不能驱走黑暗；唯有光明可以。」甘地的真理之力与黑人教会的盼望相遇 — 并要求美国兑现自己的承诺。',
        ],
        [
          q(
            ['King taught that darkness is driven out by…', '金恩教导：驱走黑暗的是……'],
            [
              ['Light — not more darkness', 'Louder hatred', 'Silence forever', 'Gold alone'],
              ['光明 — 而非更多黑暗', '更大的恨', '永远沉默', '仅黄金'],
            ],
            0,
          ),
          q(
            ['He joined the ethic of love with…', '他把爱的伦理与……相连'],
            [
              ['The demand for justice', 'Abandoning the poor', 'Fear of voting', 'Praise of segregation'],
              ['对正义的要求', '抛弃穷人', '惧怕投票', '赞美隔离'],
            ],
            0,
          ),
        ],
        { relatedTimelinePointId: 'modern-gandhi-king' },
      ),
      chapter(
        'king-dream',
        ['The dream spoken', '说出的梦'],
        [
          'The March on Washington put a dream into the world’s ear — work unfinished, yet unmistakable.',
          '向华盛顿进军把一个梦送进世界的耳朵 — 工作未完，却清晰可辨。',
        ],
        [
          '“I have a dream” was not escape from struggle; it was a public imagination of children judged by character, not colour. King kept organising after the cameras left — for voting rights, for the poor, against the numbness that follows a single speech.',
          '「我有一个梦」不是逃离斗争；它是对孩童以品格而非肤色被衡量的公共想象。镜头离开后，金恩仍在组织 — 为投票权，为穷人，对抗一场演讲之后的麻木。',
        ],
        [
          q(
            ['The “dream” speech imagined children judged by…', '「梦想」演讲想象孩童被……衡量'],
            [
              ['Character, not colour', 'Wealth only', 'Fear', 'Silence'],
              ['品格，而非肤色', '仅财富', '恐惧', '沉默'],
            ],
            0,
          ),
          q(
            ['After the famous speech King…', '著名演讲之后，金恩……'],
            [
              ['Kept organising for rights and against poverty', 'Retired from all justice work', 'Became silent forever', 'Left the country'],
              ['继续为权利与反贫困组织', '退出一切正义工作', '永远沉默', '离开国家'],
            ],
            0,
          ),
        ],
      ),
      chapter(
        'king-legacy',
        ['The arc and the walk', '弧线与行走'],
        [
          'Assassination ended his years, not the work. Later movements still quote his insistence that injustice anywhere threatens justice everywhere.',
          '暗杀结束了他的岁月，而非那工作。后来的运动仍引用他的坚持：任何地方的不公，都威胁所有地方的正义。',
        ],
        [
          'He left a grammar for moral courage in public: organise, love without surrendering truth, accept that the arc bends only when hands pull. Beside Gandhi on this Age’s path, King shows Great Harmony as street-level practice — not a slogan for later.',
          '他留下公共道德勇气的语法：组织起来，爱而不放弃真理，明白弧线唯有手去拉才会弯曲。在这个时代之路上与甘地并列，金恩显示大同是街巷中的实践 — 不是留给以后的口号。',
        ],
        [
          q(
            ['King warned that injustice anywhere…', '金恩警告：任何地方的不公……'],
            [
              ['Threatens justice everywhere', 'Is someone else’s problem only', 'Never matters', 'Should be ignored'],
              ['威胁所有地方的正义', '只是别人的问题', '从不重要', '应当忽视'],
            ],
            0,
          ),
          q(
            ['His life pairs with Gandhi’s as…', '他的一生与甘地并列，作为……'],
            [
              ['Modern nonviolent struggle for a shared moral world', 'A call to abandon hope', 'Proof that love is useless', 'A ban on marching'],
              ['为共享道德世界的现代非暴力斗争', '放弃希望的号召', '证明爱无用', '禁止游行'],
            ],
            0,
          ),
        ],
      ),
    ],
  },
];

export const ALL_SAGE_CHAPTERS: SageChapter[] = SAGES.flatMap((s) => s.chapters);

export function sageById(id: string): Sage | undefined {
  return SAGES.find((s) => s.id === id);
}

export function chapterById(id: string): { sage: Sage; chapter: SageChapter; index: number } | undefined {
  for (const sage of SAGES) {
    const index = sage.chapters.findIndex((c) => c.id === id);
    if (index >= 0) return { sage, chapter: sage.chapters[index], index };
  }
  return undefined;
}

export function sageBadgeId(sageId: string): string {
  return `b-sage-${sageId}`;
}

export function isSageLifeComplete(sageChapters: Record<string, true> | undefined, sage: Sage): boolean {
  const done = sageChapters ?? {};
  return sage.chapters.every((c) => done[c.id]);
}

export function sageForTimelinePoint(pointId: string): Sage | undefined {
  return sagesForTimelinePoint(pointId)[0];
}

/** All sage lives linked to an Ages timeline point (e.g. Gandhi + King). */
export function sagesForTimelinePoint(pointId: string): Sage[] {
  return SAGES.filter((s) => s.relatedTimelinePointIds?.includes(pointId));
}

/** Lives list order — follows Wisdom Timeline Ages (and point order within an Age). */
export function sagesInTimelineOrder(): Sage[] {
  const ordered: Sage[] = [];
  const seen = new Set<string>();
  for (const era of TIMELINE) {
    for (const point of era.points) {
      for (const sage of sagesForTimelinePoint(point.id)) {
        if (seen.has(sage.id)) continue;
        seen.add(sage.id);
        ordered.push(sage);
      }
    }
  }
  for (const sage of SAGES) {
    if (seen.has(sage.id)) continue;
    ordered.push(sage);
  }
  return ordered;
}

export function sageForTopic(topicId: string): Sage | undefined {
  return SAGES.find((s) => s.relatedTopicIds?.includes(topicId));
}

export function sageForTurningPoint(turningPointId: string): Sage | undefined {
  return SAGES.find((s) => s.chapters.some((c) => c.relatedTurningPointId === turningPointId));
}
