import type { Sage, SageChapter, QuizQuestion } from './types';
import { localized } from '../i18n/types';

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
  return SAGES.find((s) => s.relatedTimelinePointIds?.includes(pointId));
}

export function sageForTopic(topicId: string): Sage | undefined {
  return SAGES.find((s) => s.relatedTopicIds?.includes(topicId));
}

export function sageForTurningPoint(turningPointId: string): Sage | undefined {
  return SAGES.find((s) => s.chapters.some((c) => c.relatedTurningPointId === turningPointId));
}
