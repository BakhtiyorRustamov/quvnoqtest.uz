import type { Block, Chart, EQ, ObjectiveSection, Seg, SpeakingSection, WritingSection } from './types';

/**
 * IELTS Academic — original practice material in the official format:
 * Listening 4 parts / 40 q (played ONCE, ~30 min); Reading 3 passages / 40 q (60 min);
 * Writing Task 1 (chart, 150+ words) + Task 2 (essay, 250+ words), 60 min; Speaking 3 parts.
 */
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const shuffle = <T,>(a: T[]): T[] => {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
};
const L = 'ABCDEFGHIJ';
const R = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const mcq = (n: number, q: string, opts: string[], a: number): EQ => {
  const order = shuffle(opts.map((_, i) => i));
  return { k: 'mcq', n, q, opts: order.map((o) => opts[o]), a: order.indexOf(a) };
};

/* =============================== LISTENING =============================== */
const P1: { audio: Seg[]; form: string; gaps: [string, string[]][] }[] = [
  {
    form: 'CITY LIBRARY — NEW MEMBER FORM',
    audio: [
      { v: 'F', t: "Good afternoon, City Library. How can I help you?" },
      { v: 'M', t: "Hi, I'd like to become a member, please." },
      { v: 'F', t: "Certainly. Can I take your name?" },
      { v: 'M', t: "Yes, it's Robert Hallam. That's H, A, double L, A, M." },
      { v: 'F', t: "Thank you. And your address?" },
      { v: 'M', t: "Forty-two Station Road, Westbury." },
      { v: 'F', t: "And a postcode?" },
      { v: 'M', t: "W B seven, three K T." },
      { v: 'F', t: "Lovely. What's your date of birth?" },
      { v: 'M', t: "The fourteenth of March, nineteen ninety-eight." },
      { v: 'F', t: "And your occupation?" },
      { v: 'M', t: "I'm a nurse at the hospital, so I work shifts." },
      { v: 'F', t: "I see. Our standard membership is free, but there's also a premium option for twelve pounds a year, which lets you borrow up to fifteen books at a time and download e-books." },
      { v: 'M', t: "I'll take the premium one, please. Can I pay by card?" },
      { v: 'F', t: "Of course. And how did you hear about us?" },
      { v: 'M', t: "A colleague recommended you, actually." },
      { v: 'F', t: "Great. Your card will be ready on Thursday. Please bring a photo ID when you collect it. And just so you know, we're closed on Mondays." },
      { v: 'M', t: "Thursday, photo ID, closed Mondays. Got it. Oh, one more thing: do you have a quiet room for studying?" },
      { v: 'F', t: "Yes, on the second floor. It's open until nine p.m." },
      { v: 'M', t: "Perfect, thank you." }
    ],
    gaps: [
      ['Surname: (1) ___', ['hallam']],
      ['Address: (2) ___ Station Road, Westbury', ['42', 'forty-two']],
      ['Postcode: (3) ___', ['wb7 3kt', 'wb73kt']],
      ['Date of birth: 14th (4) ___ 1998', ['march']],
      ['Occupation: (5) ___', ['nurse']],
      ['Premium membership costs £(6) ___ a year', ['12', 'twelve']],
      ['Premium members can borrow up to (7) ___ books', ['15', 'fifteen']],
      ['Heard about the library from a (8) ___', ['colleague']],
      ['Bring a photo (9) ___ to collect the card', ['id']],
      ['Quiet room: on the (10) ___ floor', ['second', '2nd']]
    ]
  },
  {
    form: 'HOLIDAY COTTAGE BOOKING',
    audio: [
      { v: 'M', t: "Lakeside Cottages, good morning." },
      { v: 'F', t: "Good morning. I'd like to book a cottage for a family holiday in August." },
      { v: 'M', t: "Lovely. How many people will there be?" },
      { v: 'F', t: "Two adults and three children." },
      { v: 'M', t: "Then I'd suggest Willow Cottage. It has three bedrooms and a garden right next to the lake." },
      { v: 'F', t: "That sounds perfect. We'd like to arrive on the ninth and stay for seven nights." },
      { v: 'M', t: "Let me check. Yes, it's available. The price is eighty-five pounds per night, and there's a cleaning fee of forty pounds." },
      { v: 'F', t: "Is it possible to bring our dog?" },
      { v: 'M', t: "Yes, pets are allowed, but please bring a blanket for him. Can I have your name?" },
      { v: 'F', t: "Mrs Jane Okafor. O, K, A, F, O, R." },
      { v: 'M', t: "And a contact number?" },
      { v: 'F', t: "Oh seven seven, double four, one nine six two." },
      { v: 'M', t: "Thank you. We ask for a deposit of twenty percent to confirm the booking. And may I recommend our bike hire? It's only five pounds a day." },
      { v: 'F', t: "The children would love that. Is there a shop nearby?" },
      { v: 'M', t: "There's a small bakery in the village, about ten minutes on foot, and a supermarket in town." },
      { v: 'F', t: "Wonderful. Thank you so much." }
    ],
    gaps: [
      ['Number of children: (1) ___', ['3', 'three']],
      ['Recommended cottage: (2) ___ Cottage', ['willow']],
      ['The cottage has a garden next to the (3) ___', ['lake']],
      ['Arrival date: (4) ___ August', ['9', '9th', 'ninth']],
      ['Price per night: £(5) ___', ['85', 'eighty-five']],
      ['Cleaning fee: £(6) ___', ['40', 'forty']],
      ['For the dog, bring a (7) ___', ['blanket']],
      ['Surname: Mrs (8) ___', ['okafor']],
      ['Deposit: (9) ___ % of the total', ['20', 'twenty']],
      ['Nearest shop in the village: a (10) ___', ['bakery']]
    ]
  }
];
function part1(): Block {
  const s = pick(P1);
  return { title: 'Part 1', instr: `Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.\n\n${s.form}`, audio: s.audio, repeat: 1, qs: s.gaps.map(([q, a], i) => ({ k: 'gap', n: 1 + i, q, a })) };
}

function part2(): Block {
  const audio: Seg[] = [
    { v: 'M', t: "Good morning, and welcome to the Northgate Community Festival information session. I'm Ian Walsh, the festival organiser. This is our tenth festival, and we're expecting around eight thousand visitors over the weekend." },
    { v: 'M', t: "First, a change from previous years: the festival will no longer be held in the town square. Because of building work there, everything will take place in Riverside Park, which actually gives us much more space." },
    { v: 'M', t: "The main stage, where all the music performances happen, is near the north entrance. Food stalls will run along the river path, and this year we've made sure that at least half of them offer vegetarian dishes." },
    { v: 'M', t: "For families, the children's area will be next to the playground, with face painting and storytelling. Please note that the storytelling sessions start at eleven and three o'clock each day." },
    { v: 'M', t: "Now, volunteers. We still need people to help, especially on Sunday afternoon when we clear up. Volunteers receive a free T-shirt and a meal voucher. The most important thing we look for is reliability; experience is not necessary." },
    { v: 'M', t: "As for transport, parking in the park itself is not allowed. There's a free shuttle bus from the railway station every fifteen minutes, and I'd strongly encourage you to use it, or better still, to come by bicycle. We've added two hundred extra bike racks." },
    { v: 'M', t: "Finally, if it rains, the music will move into the sports centre, but the market and food stalls will stay outdoors under covered tents." }
  ];
  const qs: EQ[] = [
    mcq(11, 'This year the festival will take place in …', ['Riverside Park.', 'the town square.', 'the sports centre.'], 0),
    mcq(12, 'Why has the location changed?', ['There is building work in the usual place.', 'The festival has become cheaper.', 'Visitors complained about noise.'], 0),
    mcq(13, 'What is new about the food stalls this year?', ['At least half offer vegetarian food.', 'They are all next to the stage.', 'They are free for volunteers.'], 0),
    mcq(14, 'Storytelling sessions begin at …', ['11 am and 3 pm.', '10 am and 2 pm.', '12 pm and 4 pm.'], 0),
    mcq(15, 'What quality is most important for volunteers?', ['being reliable', 'having experience', 'being available all weekend'], 0),
    mcq(16, 'What does the speaker recommend for transport?', ['the shuttle bus or a bicycle', 'parking inside the park', 'walking from the town centre'], 0)
  ];
  const opts = ['main stage', 'food stalls', "children's area", 'extra bike racks', 'covered market tents', 'volunteer meeting point', 'first aid tent'];
  ['north entrance', 'river path', 'playground', 'outdoors in case of rain'].forEach((place, i) => {
    const a = [0, 1, 2, 4][i];
    qs.push({ k: 'match', n: 17 + i, q: `What will be found at / near the ${place}?`, a: L[a] });
  });
  return {
    title: 'Part 2',
    instr: 'Questions 11–16: choose the correct letter A, B or C. Questions 17–20: choose the correct option from the list (A–G) for each place.',
    options: opts,
    audio,
    repeat: 1,
    qs
  };
}

function part3(): Block {
  const audio: Seg[] = [
    { v: 'F2', t: "So, Ben, we need to decide on the topic for our geography project. Have you had any ideas?" },
    { v: 'M2', t: "I was thinking about urban heat islands, how cities are warmer than the countryside around them." },
    { v: 'F2', t: "That's interesting, but isn't there already a lot written about it? Dr Morris said she wanted something original." },
    { v: 'M2', t: "True. What about combining it with something local? We could measure temperatures in different parts of our own town." },
    { v: 'F2', t: "I like that. We could compare the park with the shopping centre car park. But we'd need equipment." },
    { v: 'M2', t: "The department lends out digital thermometers. I checked yesterday. We just have to book them a week in advance." },
    { v: 'F2', t: "Great. How many sites should we choose? Five?" },
    { v: 'M2', t: "Maybe eight, so the data is more reliable. And we should take readings at the same time each day, say at two in the afternoon." },
    { v: 'F2', t: "OK. Now, how do we divide the work? I'm better at statistics, so I could analyse the data." },
    { v: 'M2', t: "Fine, and I'll do the maps. I've used the mapping software before. Then we can write the conclusion together." },
    { v: 'F2', t: "What about the presentation? It's only ten minutes." },
    { v: 'M2', t: "Let's keep it simple: a few clear charts and one map. Dr Morris said last year's groups put far too much text on their slides." },
    { v: 'F2', t: "Good point. And the deadline is the end of next month, so we should start measuring next week." }
  ];
  const qs: EQ[] = [
    mcq(21, "Why is the woman unsure about Ben's first idea?", ['It may not be original enough.', 'It is too difficult.', 'It is not about geography.'], 0),
    mcq(22, 'What do the students decide to add to the topic?', ['measurements in their own town', 'interviews with residents', 'data from other countries'], 0),
    mcq(23, 'What must they do to get the thermometers?', ['book them a week ahead', 'pay a deposit', 'ask Dr Morris to sign a form'], 0),
    mcq(24, 'How many sites do they plan to use?', ['eight', 'five', 'ten'], 0),
    mcq(25, 'When will they take temperature readings?', ['at 2 pm every day', 'early in the morning', 'only at weekends'], 0)
  ];
  const tasks = ['analysing the data', 'making the maps', 'writing the conclusion'];
  const opts = ['the woman', 'Ben', 'both students'];
  [0, 1, 2].forEach((a, i) => qs.push({ k: 'match', n: 26 + i, q: `Who will be responsible for ${tasks[i]}?`, a: L[a] }));
  qs.push(mcq(29, 'What advice about the presentation do they remember?', ['avoid too much text on slides', 'include many maps', 'make it longer than ten minutes'], 0));
  qs.push(mcq(30, 'When will they start measuring?', ['next week', 'at the end of next month', 'tomorrow'], 0));
  return { title: 'Part 3', instr: 'Questions 21–25 and 29–30: choose the correct letter A, B or C. Questions 26–28: who will do each task? Choose A, B or C.', options: opts, audio, repeat: 1, qs };
}

function part4(): Block {
  const audio: Seg[] = [
    { v: 'F', t: "Today I'm going to talk about vertical farming, a method of growing crops in stacked layers inside buildings. The idea is not new: it was first described by an American professor in the late nineteen nineties, but only recently has technology made it practical." },
    { v: 'F', t: "Most vertical farms use hydroponics, which means plants grow in water containing nutrients instead of soil. Light comes from LED lamps, which can be adjusted to the exact colour each plant needs. Red and blue light are the most effective for growth." },
    { v: 'F', t: "There are several advantages. First, vertical farms use up to ninety-five percent less water than traditional fields, because the water is recycled. Second, there is no need for pesticides, since insects cannot get inside. Third, crops can be grown all year round, regardless of the season." },
    { v: 'F', t: "Location is another benefit. Farms can be built in cities, close to customers, which reduces transport costs and means vegetables arrive fresher. Some farms have even been set up in old warehouses and underground car parks." },
    { v: 'F', t: "However, there are serious challenges. The biggest is energy: the lamps and climate control systems consume huge amounts of electricity, so the farms are only truly sustainable when powered by renewable sources. Another problem is the limited range of crops. At present, leafy greens such as lettuce and herbs are the most profitable, while crops like wheat or potatoes are far too expensive to grow this way." },
    { v: 'F', t: "Finally, the cost of building a farm is high, and many early companies went out of business. Still, as the price of LED lights continues to fall, experts believe vertical farming will play an important role in feeding growing cities." }
  ];
  const notes: [string, string[]][] = [
    ['Crops are grown in stacked (31) ___ inside buildings.', ['layers']],
    ['The idea was first described by an American (32) ___.', ['professor']],
    ['In hydroponics, plants grow in water instead of (33) ___.', ['soil']],
    ['Red and (34) ___ light are best for growth.', ['blue']],
    ['Vertical farms use up to (35) ___ % less water.', ['95', 'ninety-five']],
    ['No (36) ___ are needed because insects cannot get in.', ['pesticides']],
    ['Some farms are in old (37) ___ and car parks.', ['warehouses']],
    ['The biggest challenge is the use of (38) ___.', ['energy', 'electricity']],
    ['Leafy greens such as lettuce and (39) ___ are most profitable.', ['herbs']],
    ['The falling price of (40) ___ lights may help the industry.', ['led']]
  ];
  return { title: 'Part 4', instr: 'Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.\n\nVERTICAL FARMING', audio, repeat: 1, qs: notes.map(([q, a], i) => ({ k: 'gap', n: 31 + i, q, a })) };
}

export function ieltsListening(): ObjectiveSection {
  return { kind: 'listening', minutes: 40, blocks: [part1(), part2(), part3(), part4()] };
}

/* =============================== READING =============================== */
const TFNG = ['TRUE', 'FALSE', 'NOT GIVEN'];
const YNNG = ['YES', 'NO', 'NOT GIVEN'];

function passage1(): Block {
  const text = `THE HISTORY OF GLASS

A. Glass is one of the oldest materials made by humans, yet it remains one of the most modern. The earliest glass objects, small beads, were produced in Mesopotamia around 3,500 years ago. Historians are not certain how glass was first discovered, but one theory suggests that it happened accidentally when sand was heated in very hot fires used for making pottery.

B. For many centuries glass was a luxury. Making it required great skill, and only the wealthy could afford glass vessels. A major breakthrough came in the first century BC, when craftsmen in the eastern Mediterranean discovered glassblowing. By blowing air through a long metal tube into melted glass, they could quickly create thin, transparent containers of many shapes. The technique spread rapidly throughout the Roman Empire, and glass bottles became common household items.

C. In the Middle Ages, the Italian city of Venice became the centre of European glassmaking. In 1291, the city's government ordered all glassmakers to move to the island of Murano. The official reason was to protect the city from fires, but the move also helped to keep the secrets of the craft from spreading. Glassmakers enjoyed high social status, yet they were forbidden to leave the republic.

D. Window glass remained expensive until the nineteenth century. Early windows were made of small pieces joined with lead, and they were often uneven and slightly coloured. In 1959, the British engineer Alastair Pilkington introduced the float glass process, in which molten glass is poured onto a bath of liquid tin. The glass spreads out to form a perfectly flat sheet. Today, around ninety percent of the world's flat glass is produced in this way.

E. Modern glass is far more than a transparent material. Optical fibres made of extremely pure glass carry internet data across oceans as pulses of light. Smartphone screens use special toughened glass that resists scratches. Scientists are even developing 'smart' windows that darken automatically in strong sunlight, reducing the need for air conditioning. Glass is also almost endlessly recyclable, which makes it attractive at a time of growing concern about waste.`;
  const qs: EQ[] = [];
  const tf: [string, number][] = [
    ['The first glass objects were beads.', 0],
    ['Historians know exactly how glass was invented.', 1],
    ['Glassblowing made glass objects cheaper and more common.', 0],
    ['Venetian glassmakers were allowed to travel abroad freely.', 1],
    ['The Murano glassmakers were paid more than other craftsmen in Venice.', 2],
    ['Early window glass was perfectly clear.', 1],
    ['Smart windows are already used in most new buildings.', 2]
  ];
  tf.forEach(([q, a], i) => qs.push({ k: 'mcq', n: 1 + i, q, opts: TFNG, a }));
  const gaps: [string, string[]][] = [
    ['Glass may have been discovered when sand was heated in fires for making (8) ___.', ['pottery']],
    ['In 1291, glassmakers were moved to the island of (9) ___.', ['murano']],
    ['In the float process, molten glass is poured onto liquid (10) ___.', ['tin']],
    ['About (11) ___ % of flat glass is made by the float process.', ['90', 'ninety']],
    ['Optical fibres carry data as pulses of (12) ___.', ['light']],
    ['Glass is attractive today because it is almost endlessly (13) ___.', ['recyclable']]
  ];
  gaps.forEach(([q, a], i) => qs.push({ k: 'gap', n: 8 + i, q, a }));
  return { title: 'Reading Passage 1', instr: 'Questions 1–7: do the statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN. Questions 8–13: complete the sentences with ONE WORD AND/OR A NUMBER from the passage.', text, qs };
}

function passage2(): Block {
  const text = `WHY WE FORGET

Paragraph I. For more than a century, psychologists have tried to understand why memories fade. In the 1880s, the German researcher Hermann Ebbinghaus tested himself by learning lists of meaningless syllables and checking how many he could recall later. He found that forgetting is fastest in the first hour after learning and then slows down, a pattern now known as the 'forgetting curve'.

Paragraph II. One explanation for forgetting is decay: the idea that memory traces simply weaken with time if they are not used. However, decay is difficult to test, because during any period of time people also experience new events that may interfere with old memories.

Paragraph III. Interference theory argues that memories compete with one another. New learning can make it harder to recall older information, and old habits can block new learning. Anyone who has changed their phone number and kept giving out the old one has experienced this kind of competition.

Paragraph IV. Some researchers believe that much of what we call forgetting is actually a failure of retrieval. The memory is still stored, but we cannot find it without the right cue. This explains why a smell or a song can suddenly bring back a long-forgotten experience in vivid detail.

Paragraph V. Forgetting is not always a weakness. A brain that remembered every detail would be overwhelmed. By discarding unimportant information, we are better able to generalise, make decisions and adapt to change. People with extremely detailed memories often report that they find it hard to think in general terms.

Paragraph VI. The practical lesson for learners is clear. Reviewing material shortly after learning it, and then again at increasing intervals, is far more effective than studying everything in one long session. This technique, called spaced repetition, is now built into many language-learning apps.`;
  const headings = ['The benefits of losing information', 'An early experiment', 'Memories that block each other', 'A theory that is hard to prove', 'The memory is there but hidden', 'How to study more effectively', 'Why children remember better', 'The chemistry of the brain'];
  const qs: EQ[] = [];
  [1, 3, 2, 4, 0, 5].forEach((a, i) => qs.push({ k: 'match', n: 14 + i, q: `Paragraph ${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}`, a: L[a] }));
  qs.push(mcq(20, 'According to Ebbinghaus, forgetting is fastest …', ['in the first hour after learning.', 'after one week.', 'after a night of sleep.', 'at a constant speed.'], 0));
  qs.push(mcq(21, 'Why is decay theory difficult to test?', ['New experiences may also affect memory over time.', 'Memory traces cannot be measured.', 'People refuse to take part in experiments.', 'It was only tested on animals.'], 0));
  qs.push(mcq(22, 'The example of the phone number illustrates …', ['interference between memories.', 'the decay of memories.', 'the role of smell in memory.', 'the benefits of forgetting.'], 0));
  qs.push(mcq(23, 'According to the writer, people with extremely detailed memories …', ['may find general thinking difficult.', 'learn languages more easily.', 'never use spaced repetition.', 'have better decision-making skills.'], 0));
  const gaps: [string, string[]][] = [
    ["A smell or song can act as a (24) ___ that brings back a memory.", ['cue']],
    ['Reviewing at increasing intervals is called spaced (25) ___.', ['repetition']],
    ['Spaced repetition is used in many language-learning (26) ___.', ['apps']]
  ];
  gaps.forEach(([q, a], i) => qs.push({ k: 'gap', n: 24 + i, q, a }));
  return { title: 'Reading Passage 2', instr: 'Questions 14–19: choose the correct heading (A–H) for each paragraph. Questions 20–23: choose the correct letter. Questions 24–26: complete the sentences with ONE WORD from the passage.', text, options: headings, qs };
}

function passage3(): Block {
  const text = `THE FOUR-DAY WORKING WEEK

In recent years, a growing number of companies around the world have experimented with a four-day working week, in which employees work thirty-two hours instead of forty but receive the same salary. Supporters argue that this arrangement leads to happier, healthier and more productive workers. Critics, however, warn that it may not suit every industry.

The largest trial to date took place in the United Kingdom, where around sixty companies, from software firms to a fish-and-chip shop, reduced working hours for six months. At the end of the trial, the great majority chose to continue, and some made the change permanent. Employees reported less stress and better sleep, and the number of sick days fell by about two thirds. Perhaps most importantly for managers, revenue remained broadly the same.

How is it possible to do the same work in less time? Many participating firms found that a large part of the traditional working week was spent in unnecessary meetings or on distractions. When time became limited, teams cut meetings shorter, introduced periods of 'focus time' without emails, and became more disciplined about priorities. In my view, this suggests that the forty-hour week is more a habit inherited from the industrial age than a requirement of modern work.

Nevertheless, the model has clear limits. In hospitals, schools and shops, where staff must be present to serve the public, reducing hours often means hiring more people, which raises costs. Some workers in the trial also said that compressing their tasks into four days made those days more intense. And there is a risk that, in competitive industries, employees will simply continue working on their 'day off' to keep up.

It would be unwise, therefore, to see the four-day week as a universal solution. It is better understood as an invitation to rethink how work is organised. Even companies that keep a five-day week can learn from the experiments: fewer meetings, clearer goals and respect for employees' time benefit everyone. The question is no longer whether working time can change, but how quickly organisations are willing to let it.`;
  const qs: EQ[] = [];
  const yn: [string, number][] = [
    ['The writer believes the forty-hour week mainly reflects an old habit.', 0],
    ['The writer thinks every industry should adopt a four-day week immediately.', 1],
    ['The writer suggests that five-day companies can also learn from the trials.', 0],
    ['The writer believes most employees prefer to work longer days.', 2],
    ['The writer considers revenue less important than employee happiness.', 2]
  ];
  yn.forEach(([q, a], i) => qs.push({ k: 'mcq', n: 27 + i, q, opts: YNNG, a }));
  qs.push(mcq(32, 'In the UK trial, employees …', ['took far fewer sick days.', 'earned higher salaries.', 'worked at weekends.', 'had more meetings.'], 0));
  qs.push(mcq(33, 'What did many firms discover about the traditional week?', ['A lot of time was wasted on meetings and distractions.', 'Employees needed longer holidays.', 'Software firms worked fewer hours.', 'Customers preferred shorter opening times.'], 0));
  qs.push(mcq(34, 'Why is the four-day week harder for hospitals and shops?', ['Staff must be present, so more people may be needed.', 'Their employees do not want shorter hours.', 'They cannot use emails.', 'Their revenue depends on meetings.'], 0));
  qs.push(mcq(35, 'Which is the best title for the final paragraph?', ['A chance to rethink work', 'The end of the five-day week', 'Why the trials failed', 'Rules for managers'], 0));
  const summaryOpts = ['stress', 'revenue', 'intense', 'permanent', 'focus', 'salary', 'competition', 'priorities'];
  // summary completion with options A–H
  const sum: [string, number][] = [
    ['Employees in the trial kept the same (36) ___.', 5],
    ['Some firms made the shorter week (37) ___.', 3],
    ["Teams introduced periods of '(38) ___ time' without emails.", 4],
    ['Some workers found their four working days more (39) ___.', 2],
    ['In competitive industries, people may work on their day off because of (40) ___.', 6]
  ];
  sum.forEach(([q, a], i) => qs.push({ k: 'match', n: 36 + i, q, a: L[a] }));
  return { title: 'Reading Passage 3', instr: 'Questions 27–31: do the statements agree with the views of the writer? Choose YES, NO or NOT GIVEN. Questions 32–35: choose the correct letter. Questions 36–40: complete the summary using the list of words (A–H).', text, options: summaryOpts, qs };
}

export function ieltsReading(): ObjectiveSection {
  return { kind: 'reading', minutes: 60, blocks: [passage1(), passage2(), passage3()] };
}

/* =============================== WRITING =============================== */
const CHART_TOPICS: { title: string; unit: string; cats: string[]; series: string[]; type: Chart['type']; lo: number; hi: number }[] = [
  { title: 'Percentage of households with internet access in three countries', unit: '%', cats: ['2000', '2005', '2010', '2015', '2020'], series: ['Country A', 'Country B', 'Country C'], type: 'line', lo: 5, hi: 98 },
  { title: 'Average weekly hours spent on leisure activities by age group', unit: 'hours', cats: ['Sport', 'Reading', 'TV', 'Social media', 'Music'], series: ['Aged 16–24', 'Aged 45–64'], type: 'bar', lo: 1, hi: 18 },
  { title: 'Number of visitors to three museums (thousands)', unit: 'thousand', cats: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'], series: ['History Museum', 'Science Museum', 'Art Gallery'], type: 'line', lo: 20, hi: 160 },
  { title: 'Sources of electricity in one country in 2023', unit: '%', cats: ['Gas', 'Coal', 'Solar', 'Wind', 'Hydro'], series: ['Share'], type: 'pie', lo: 5, hi: 40 },
  { title: 'Methods of travelling to work in a city, 2005 and 2025', unit: '%', cats: ['Car', 'Bus', 'Metro', 'Bicycle', 'Walking'], series: ['2005', '2025'], type: 'bar', lo: 4, hi: 45 }
];
export function makeChart(): Chart {
  const t = pick(CHART_TOPICS);
  if (t.type === 'pie') {
    const raw = t.cats.map(() => R(t.lo, t.hi));
    const sum = raw.reduce((a, b) => a + b, 0);
    const vals = raw.map((v) => Math.round((v / sum) * 100));
    vals[0] += 100 - vals.reduce((a, b) => a + b, 0);
    return { type: 'pie', title: t.title, unit: t.unit, categories: t.cats, series: [{ name: t.series[0], values: vals }] };
  }
  const series = t.series.map((name) => {
    if (t.type === 'line') {
      let v = R(t.lo, Math.round((t.lo + t.hi) / 2));
      const dir = Math.random() < 0.75 ? 1 : -1;
      return { name, values: t.cats.map(() => (v = Math.max(t.lo, Math.min(t.hi, v + dir * R(0, Math.round((t.hi - t.lo) / 5)))))) };
    }
    return { name, values: t.cats.map(() => R(t.lo, t.hi)) };
  });
  return { type: t.type, title: t.title, unit: t.unit, categories: t.cats, series };
}
const T2 = [
  'Some people think that governments should spend money on public transport rather than building new roads. To what extent do you agree or disagree?',
  'In many countries, people are living longer than ever before. What are the advantages and disadvantages of an ageing population?',
  'Some people believe that university education should be free for all students. Others think students should pay for their own studies. Discuss both views and give your opinion.',
  'Many young people today spend more time online than with friends in person. Why is this happening, and is it a positive or negative development?',
  'Environmental problems are too big for individuals to solve; only governments and large companies can make a difference. To what extent do you agree or disagree?',
  'Some people say that the best way to learn a foreign language is to live in the country where it is spoken. Do you agree or disagree?'
];
export function ieltsWriting(): WritingSection {
  const chart = makeChart();
  return {
    kind: 'writing',
    minutes: 60,
    tasks: [
      { id: 'ie-w1', title: 'Task 1', prompt: `You should spend about 20 minutes on this task.\n\nThe chart below shows: ${chart.title.toLowerCase()}.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.`, minWords: 150, chart, weight: 1 },
      { id: 'ie-w2', title: 'Task 2', prompt: `You should spend about 40 minutes on this task.\n\n${pick(T2)}\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.`, minWords: 250, weight: 2 }
    ]
  };
}
/** chart data as plain text — sent to the AI so it can check the Task 1 report */
export const chartAsText = (c: Chart) =>
  `${c.type} chart: ${c.title}. Unit: ${c.unit}. ` + c.series.map((s) => `${s.name}: ${c.categories.map((cat, i) => `${cat} = ${s.values[i]}`).join(', ')}`).join('; ');

/* =============================== SPEAKING =============================== */
const SP1: [string, string[]][] = [
  ['Hometown', ['Where is your hometown?', 'What do you like most about it?', 'Has it changed much in recent years?', 'Would you like to live there in the future?']],
  ['Study or work', ['Do you work or are you a student?', 'Why did you choose that subject or job?', 'What is the most difficult part of it?', 'What would you like to do in the future?']],
  ['Free time', ['What do you like to do in your free time?', 'Did you have the same hobbies as a child?', 'Do you prefer spending free time alone or with others?', 'Is there a new hobby you would like to try?']],
  ['Food', ['What kind of food do you enjoy?', 'Do you often cook at home?', 'Is there any food you disliked as a child?', 'How important is eating together with family in your country?']]
];
const SP2: [string, string[]][] = [
  ['Describe a time when you helped someone.\nYou should say:\n- who you helped;\n- what the situation was;\n- how you helped;\nand explain how you felt about it.', ['Do people help each other less than in the past?', 'Should schools teach children to volunteer?', 'Why do some people find it difficult to ask for help?']],
  ['Describe a piece of technology you find useful.\nYou should say:\n- what it is;\n- when you got it;\n- how you use it;\nand explain why it is useful to you.', ['How has technology changed the way people work?', 'Are there any disadvantages of depending on technology?', 'Will technology make education better in the future?']],
  ['Describe a memorable journey you have made.\nYou should say:\n- where you went;\n- who you went with;\n- what happened;\nand explain why it was memorable.', ['Why do people enjoy travelling?', 'How has tourism affected your country?', 'Is it better to travel alone or in a group?']],
  ['Describe a goal you would like to achieve.\nYou should say:\n- what the goal is;\n- when you set it;\n- what you need to do to achieve it;\nand explain why it is important to you.', ['Why do some people give up on their goals?', 'Should parents choose goals for their children?', 'Is success more about hard work or luck?']]
];
export function ieltsSpeaking(): SpeakingSection {
  const [topic, q1] = pick(SP1);
  const [card, q3] = pick(SP2);
  return {
    kind: 'speaking',
    parts: [
      { title: 'Part 1', instr: `The examiner asks you questions about familiar topics (${topic}). Answer each question in about 20–30 seconds.`, questions: q1, prepSec: 3, speakSec: 30 },
      { title: 'Part 2', instr: 'You will have 1 minute to prepare and then speak for 1–2 minutes about the topic on the card.', card, questions: ['Talk about the topic on the card.'], prepSec: 60, speakSec: 120 },
      { title: 'Part 3', instr: 'The examiner asks you more general questions connected with the Part 2 topic. Give extended answers.', questions: q3, prepSec: 3, speakSec: 60 }
    ]
  };
}

/* =============================== SCORING =============================== */
const LISTEN: [number, number][] = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 0]];
const READ: [number, number][] = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 0]];
export const ieltsBand = (kind: 'listening' | 'reading', raw: number) => (kind === 'listening' ? LISTEN : READ).find(([min]) => raw >= min)![1];
/** overall band: average rounded to the nearest half band (.25 → .5, .75 → next whole) */
export const ieltsOverall = (bands: number[]) => {
  const avg = bands.reduce((a, b) => a + b, 0) / Math.max(1, bands.length);
  return Math.floor(avg * 2 + 0.5) / 2;
};
