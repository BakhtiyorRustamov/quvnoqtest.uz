import type { Block, EQ, ObjectiveSection, Seg, SpeakingSection, WritingSection } from './types';

/**
 * Multilevel (CEFR) English — national certificate format (Davlat test markazi sample):
 * Listening 6 parts / 35 q (~35 min, each recording twice); Reading 5 parts / 35 q (60 min);
 * Writing 2 tasks (60 min, task 2 counts double); Speaking 3 parts.
 * Every text and script here is original; each attempt mixes the banks into a new variant.
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

/* =============================== LISTENING =============================== */
/** Part 1: [what the speaker says, voice, replies, correct index] */
const L1: [string, 'F' | 'M', string[], number][] = [
  ['Would you mind if I opened the window? It is really hot in here.', 'F', ['No, go ahead.', 'Yes, it is cold.', 'I opened it yesterday.'], 0],
  ['How long have you been learning English?', 'M', ['Since I was ten.', 'In the evening.', 'Twice a week, at school.'], 0],
  ["I'm afraid I've lost the book you lent me.", 'F', ["Don't worry, it was an old one.", 'Yes, I lent it.', 'It was on the table.'], 0],
  ['Shall we take a taxi or walk to the station?', 'M', ["Let's walk, it isn't far.", 'The station is new.', 'I took it last week.'], 0],
  ['Could you tell me where the nearest chemist is?', 'F', ["Sorry, I'm not from around here.", 'It closes at six.', 'Yes, I can tell.'], 0],
  ['I passed my driving test this morning!', 'M', ["Congratulations! That's great news.", 'It was in the morning.', 'Drive carefully tomorrow.'], 0],
  ["What's the weather going to be like at the weekend?", 'F', ["They say it'll be sunny.", 'I like the weekend.', 'It was raining yesterday.'], 0],
  ['Do you fancy going to the cinema tonight?', 'M', ["I'd love to, but I have to study.", 'The cinema is big.', 'I went there by bus.'], 0],
  ['Excuse me, is this seat taken?', 'F', ["No, it's free. Please sit down.", 'Yes, I took it home.', "It's a comfortable chair."], 0],
  ["I'm sorry I'm late. The traffic was terrible.", 'M', ["That's all right. We've only just started.", 'The traffic is green.', "I'm late too, tomorrow."], 0],
  ['How often do you go to the gym?', 'F', ['About three times a week.', 'For two hours.', 'With my brother.'], 0],
  ["Can I borrow your pen for a moment?", 'M', ['Sure, here you are.', "It's a blue pen.", 'I bought it yesterday.'], 0],
  ["Have you heard? Sarah's got a new job in London.", 'F', ['Really? Good for her!', 'London is a big city.', 'I have heard music.'], 0],
  ['Would you like some more tea?', 'M', ["No, thanks. I've had enough.", 'Tea comes from China.', 'I liked it before.'], 0],
  ["I can't find my keys anywhere.", 'F', ['Have you checked your coat pocket?', 'Keys are expensive.', 'I found them last year.'], 0],
  ['What time does the museum open on Sundays?', 'M', ['At ten, I think.', 'It is very old.', 'On Sunday I was at home.'], 0]
];
function lPart1(): Block {
  const items = shuffle(L1).slice(0, 8);
  const qs: EQ[] = [];
  const audioPerQ: Seg[][] = [];
  items.forEach(([s, v, opts, a], i) => {
    const order = shuffle([0, 1, 2]);
    qs.push({ k: 'mcq', n: i + 1, q: `Question ${i + 1}`, opts: order.map((o) => opts[o]), a: order.indexOf(a) });
    audioPerQ.push([{ v, t: s }]);
  });
  return { title: 'Part 1', instr: 'You will hear some sentences. You will hear each sentence twice. Choose the correct reply to each sentence (A, B or C).', audioPerQ, repeat: 2, qs };
}

/** Part 2: a talk + notes with 6 gaps (ONE WORD and/or A NUMBER) */
const L2: { audio: Seg[]; notes: [string, string[]][] }[] = [
  {
    audio: [
      { v: 'F', t: "Good morning, everyone, and welcome to Greenfield Botanical Gardens. My name is Laura and I'll be your guide today. Before we start, a few practical points. The gardens are open every day from nine in the morning until six in the evening, but the glasshouses close an hour earlier, at five." },
      { v: 'F', t: "If you'd like a map, you can pick one up free of charge at the visitor centre, which is just behind me. Our café is next to the rose garden, and today it is offering a special lunch menu for fifteen pounds." },
      { v: 'F', t: "This afternoon at two o'clock there will be a talk about tropical plants in the main glasshouse. Places are limited to thirty people, so please book at the information desk. Finally, our gift shop sells seeds and books, and members get a ten percent discount. Now, let's begin with the herb garden." }
    ],
    notes: [
      ['The glasshouses close at (9) ___ pm.', ['5', 'five']],
      ['Free maps are available at the (10) ___ centre.', ['visitor']],
      ['The café is next to the (11) ___ garden.', ['rose']],
      ['The special lunch costs (12) £___.', ['15', 'fifteen']],
      ['The talk about tropical plants is limited to (13) ___ people.', ['30', 'thirty']],
      ['Members get a (14) ___ % discount in the gift shop.', ['10', 'ten']]
    ]
  },
  {
    audio: [
      { v: 'M', t: "Hello and thank you for joining the Riverside Sports Club open day. I'm Tom, the club manager. The club was founded in nineteen eighty-two, and today we have over four hundred members." },
      { v: 'M', t: "Our swimming pool is open from seven a.m. On weekdays, the first hour is reserved for adults only. For young people, we run football training every Saturday morning, and the coach is a former professional player called Mark Davies." },
      { v: 'M', t: "Membership costs twenty-five pounds a month, but students pay just eighteen. If you join today, you will receive a free sports bag. Please remember to bring a photo when you register. Our tennis courts can be booked online up to seven days in advance." }
    ],
    notes: [
      ['The club was founded in (9) ___.', ['1982']],
      ['The pool opens at (10) ___ a.m.', ['7', 'seven']],
      ['Football training takes place every (11) ___ morning.', ['saturday']],
      ['Students pay £(12) ___ a month.', ['18', 'eighteen']],
      ['New members today get a free sports (13) ___.', ['bag']],
      ['Tennis courts can be booked (14) ___ days in advance.', ['7', 'seven']]
    ]
  }
];
function lPart2(): Block {
  const s = pick(L2);
  return {
    title: 'Part 2',
    instr: 'You will hear someone giving a talk. For each question, fill in the missing information in the numbered space. Write ONE WORD and / or A NUMBER for each answer.',
    audio: s.audio,
    repeat: 2,
    qs: s.notes.map(([q, a], i) => ({ k: 'gap', n: 9 + i, q, a }))
  };
}

/** Part 3: four speakers, six places (two extra) */
const L3: { options: string[]; speakers: [string, Seg['v'], number][] }[] = [
  {
    options: ['at a train station', 'in a hospital', 'at a hairdresser’s', 'in a supermarket', 'at a hotel reception', 'in a library'],
    speakers: [
      ["Excuse me, could you tell me which platform the next service to Manchester leaves from? The board says it's delayed, and I need to change at Birmingham.", 'M', 0],
      ["Just a little shorter at the back, please, but leave the front as it is. And no gel this time, it made it far too stiff last month.", 'F', 2],
      ["I booked a double room for three nights under the name Patel. Is breakfast included, and could I possibly have a room away from the lift?", 'M', 4],
      ["Sorry, could you keep your voice down? People are trying to study. If you need to make a call, there's a room by the entrance.", 'F2', 5]
    ]
  },
  {
    options: ['at a football match', 'in a restaurant', 'at a dentist’s', 'at an airport', 'in a museum', 'in a clothes shop'],
    speakers: [
      ["Could we have the bill, please? And the fish was lovely, by the way. Please tell the chef.", 'F', 1],
      ["Open a little wider for me. That's it. You might feel some pressure, but it shouldn't hurt.", 'M', 2],
      ["Your gate will close twenty minutes before departure. Do you have any liquids in your hand luggage?", 'F2', 3],
      ["These are a bit tight. Do you have them in the next size up, maybe in dark blue?", 'M2', 5]
    ]
  }
];
function lPart3(): Block {
  const s = pick(L3);
  const audio: Seg[] = [];
  s.speakers.forEach(([t, v], i) => audio.push({ v: 'N', t: `Speaker ${i + 1}.` }, { v, t }));
  return {
    title: 'Part 3',
    instr: 'You will hear people speaking in different situations. Match each speaker (15–18) to the place where the speaker is (A–F). There are TWO extra places which you do not need to use.',
    options: s.options,
    audio,
    repeat: 2,
    qs: s.speakers.map(([, , a], i) => ({ k: 'match', n: 15 + i, q: `Speaker ${i + 1}`, a: L[a] }))
  };
}

/** Part 4: map labelling (5 places, map A–H) — fully procedural: new places, positions and directions each time */
const MAPS: { title: string; places: string[] }[] = [
  { title: 'Hillside College', places: ['Library', 'Sports hall', 'Art studio', 'Canteen', 'Science lab', 'Music room', 'Medical room', 'Computer room', 'Lecture theatre', 'Student office'] },
  { title: 'Riverside Town Centre', places: ['Post office', 'Bank', 'Health centre', 'Bakery', 'Cinema', 'Bookshop', 'Pharmacy', 'Police station', 'Gym', 'Tourist information'] },
  { title: 'Greenway Leisure Park', places: ['Café', 'Swimming pool', 'Mini golf', 'Toilets', 'Gift shop', 'Picnic area', 'First aid point', 'Bike hire', 'Playground', 'Boat hire'] }
];
function lPart4(): Block {
  const m = pick(MAPS);
  const spots = 'ABCDEFGH'.split('').map((label, i) => ({ label, x: 60 + (i % 4) * 110, y: i < 4 ? 70 : 230 }));
  const chosen = shuffle(m.places).slice(0, 5);
  const where = shuffle([0, 1, 2, 3, 4, 5, 6, 7]).slice(0, 5);
  const ORD = ['first', 'second', 'third', 'fourth'];
  const say = (name: string, idx: number) => {
    const row = idx < 4 ? 'top' : 'bottom';
    const col = idx % 4;
    const note = col === 0 ? ', nearest to the gate' : col === 3 ? (row === 'top' ? ', right beside the car park' : ', in the far right-hand corner') : ', close to the fountain';
    const tpl = [
      `The ${name.toLowerCase()} is on the ${row} row, the ${ORD[col]} building from the left${note}.`,
      `If you need the ${name.toLowerCase()}, go along the ${row} row; it's the ${ORD[col]} building as you walk away from the gate${note}.`,
      `You'll find the ${name.toLowerCase()} in the ${ORD[col]} building on the ${row} row${col === 0 || col === 3 ? note : ''}.`
    ];
    return pick(tpl);
  };
  const audio: Seg[] = [
    { v: 'F', t: `Welcome to ${m.title}. Let me explain where everything is, using the map. The gate is on the left, the fountain is in the middle between the two rows of buildings, and the car park is at the top right.` },
    ...chosen.map((name, k) => ({ v: 'F' as const, t: say(name, where[k]) }))
  ];
  return {
    title: 'Part 4',
    instr: 'You will hear someone giving a talk. Label the places (19–23) on the map (A–H). There are THREE extra options which you do not need to use.',
    map: { title: m.title, spots, landmarks: [{ label: 'Gate', x: 2, y: 150, w: 36, h: 30 }, { label: 'Fountain', x: 200, y: 140, w: 90, h: 40 }, { label: 'Car park', x: 470, y: 20, w: 70, h: 40 }] },
    audio,
    repeat: 2,
    qs: chosen.map((name, i) => ({ k: 'match', n: 19 + i, q: name, a: L[where[i]] }))
  };
}

/** Part 5: three extracts, two MCQ each */
const L5: { audio: Seg[]; qs: [string, string[], number][] }[] = [
  {
    audio: [
      { v: 'F', t: "So, how was the interview, Daniel?" },
      { v: 'M', t: "Better than I expected, actually. I was terribly nervous on the train, but once they started asking about my design projects, I relaxed. The only tricky part was when they asked why I'd left my last job after just a year." },
      { v: 'F', t: "And what did you say?" },
      { v: 'M', t: "The truth: that the company moved to the other side of the city and the journey took two hours each way. They seemed to understand. They'll let me know by Friday." }
    ],
    qs: [
      ['How did Daniel feel during most of the interview?', ['calm once he talked about his work', 'nervous from beginning to end', 'bored by the questions'], 0],
      ['Why did Daniel leave his previous job?', ['the travel time became too long', 'he did not like the projects', 'the salary was too low'], 0]
    ]
  },
  {
    audio: [
      { v: 'M', t: "I've been volunteering at the animal shelter every Sunday for six months now." },
      { v: 'F2', t: "Isn't it sad, seeing all those dogs without homes?" },
      { v: 'M', t: "At first, yes. But most of them find new families within a few weeks. What surprised me most was how much I've learned, not about animals, but about patience. Some dogs are frightened of people, and you can't rush them. You just sit quietly and wait until they come to you." }
    ],
    qs: [
      ['What surprised the man most about volunteering?', ['what he learned about patience', 'how sad the work was', 'how quickly he was paid'], 0],
      ['According to the man, frightened dogs need …', ['time to approach people themselves', 'to be trained every day', 'to stay with other dogs'], 0]
    ]
  },
  {
    audio: [
      { v: 'F', t: "Have you decided where to go on holiday this year?" },
      { v: 'M2', t: "We wanted to go to the seaside again, but the hotel prices have nearly doubled. So we're thinking of renting a small house in the mountains instead. It's cheaper, and the children can go hiking." },
      { v: 'F', t: "Won't they miss the beach?" },
      { v: 'M2', t: "Probably, but there's a lake nearby where they can swim, so I think they'll be happy." }
    ],
    qs: [
      ['Why did the family change their holiday plans?', ['the seaside hotels became too expensive', 'the children wanted to hike', 'the beach was closed'], 0],
      ['What does the man say about the lake?', ['the children will be able to swim there', 'it is too cold for swimming', 'it is far from the house'], 0]
    ]
  },
  {
    audio: [
      { v: 'F2', t: "Our town has just opened a new cycle path along the river, and I must say I was against it at first." },
      { v: 'M', t: "Why was that?" },
      { v: 'F2', t: "They had to cut down some old trees, and I thought it would spoil the view. But they planted twice as many new ones, and now I cycle to work every day instead of sitting in traffic. It saves me about twenty minutes each morning." }
    ],
    qs: [
      ['Why was the woman against the cycle path at first?', ['some old trees had to be removed', 'she cannot ride a bike', 'it was too expensive'], 0],
      ['What benefit does the woman mention?', ['her journey to work is shorter', 'she meets new friends', 'she earns more money'], 0]
    ]
  }
];
function lPart5(): Block {
  const ex = shuffle(L5).slice(0, 3);
  const audio: Seg[] = [];
  const qs: EQ[] = [];
  ex.forEach((e, k) => {
    audio.push({ v: 'N', t: `Extract ${['one', 'two', 'three'][k]}.` }, ...e.audio);
    e.qs.forEach(([q, opts, a], j) => {
      const order = shuffle([0, 1, 2]);
      qs.push({ k: 'mcq', n: 24 + k * 2 + j, q: `Extract ${k + 1}. ${q}`, opts: order.map((o) => opts[o]), a: order.indexOf(a) });
    });
  });
  return { title: 'Part 5', instr: 'You will hear three extracts. Choose the correct answer (A, B or C) for each question (24–29). There are TWO questions for each extract.', audio, repeat: 2, qs };
}

/** Part 6: lecture + 6 gaps (ONE WORD) */
const L6: { title: string; audio: Seg[]; notes: [string, string[]][] }[] = [
  {
    title: 'THE HISTORY OF TEA',
    audio: [
      { v: 'M', t: "Today's lecture is about the history of tea. According to legend, tea was first discovered in China nearly five thousand years ago, when leaves fell into an emperor's cup of hot water. For centuries, tea was used mainly as a medicine rather than an everyday drink." },
      { v: 'M', t: "Tea arrived in Europe in the seventeenth century, carried by Dutch traders. At first it was extremely expensive, so only wealthy families could afford it, and they often kept their tea in a locked box." },
      { v: 'M', t: "In Britain, the custom of afternoon tea became fashionable in the eighteen-forties. Later, huge plantations were established in India, which made tea cheaper and available to ordinary people. Today, after water, tea is the most popular drink in the world." }
    ],
    notes: [
      ['Tea was first discovered in (30) ___.', ['china']],
      ['For centuries it was used mainly as a (31) ___.', ['medicine']],
      ['It was brought to Europe by (32) ___ traders.', ['dutch']],
      ['Rich families kept tea in a locked (33) ___.', ['box']],
      ['Large (34) ___ in India made tea cheaper.', ['plantations']],
      ['Only (35) ___ is drunk more than tea in the world.', ['water']]
    ]
  },
  {
    title: 'SLEEP AND LEARNING',
    audio: [
      { v: 'F', t: "In this session we'll look at how sleep affects learning. Researchers have found that during deep sleep the brain replays information from the day and moves it into long-term memory." },
      { v: 'F', t: "In one experiment, students who slept after studying a list of words remembered about forty percent more than those who stayed awake. Interestingly, even a short nap of twenty minutes improved results." },
      { v: 'F', t: "Teenagers need between eight and ten hours of sleep, yet many get far less, partly because of screens. The blue light from phones delays the release of a hormone called melatonin, which tells the body it is time to rest. So my advice is simple: switch off your phone an hour before bed." }
    ],
    notes: [
      ['During deep sleep, information moves into long-term (30) ___.', ['memory']],
      ['Students who slept remembered about (31) ___ percent more words.', ['forty', '40']],
      ['Even a short (32) ___ improved results.', ['nap']],
      ['Teenagers need between eight and (33) ___ hours of sleep.', ['ten', '10']],
      ['Blue (34) ___ from phones delays a sleep hormone.', ['light']],
      ['The hormone (35) ___ tells the body to rest.', ['melatonin']]
    ]
  }
];
function lPart6(): Block {
  const s = pick(L6);
  return { title: 'Part 6', instr: `You will hear a part of a lecture. For each question, fill in the missing information in the numbered space. Write no more than ONE WORD for each answer.\n\n${s.title}`, audio: s.audio, repeat: 2, qs: s.notes.map(([q, a], i) => ({ k: 'gap', n: 30 + i, q, a })) };
}

export function multilevelListening(): ObjectiveSection {
  return { kind: 'listening', minutes: 45, blocks: [lPart1(), lPart2(), lPart3(), lPart4(), lPart5(), lPart6()] };
}

/* =============================== READING =============================== */
const R1: { title: string; text: string; a: string[] }[] = [
  {
    title: 'The return of the bicycle',
    text: "In many cities, the bicycle is making a comeback. Fifty years ago, most people believed that cars were the future and that bicycles belonged to the past. Today, however, city planners are building new cycle lanes because (1) ___ are cheap, quiet and clean. In Copenhagen, more than half of all journeys to work are made by bike, and the city has become a model for other (2) ___ around the world.\nThere are several reasons for this change. First, traffic jams make driving slow and stressful, so many drivers are choosing to leave their (3) ___ at home. Second, cycling is good for health: regular riders have stronger hearts and fewer health problems. Doctors often recommend cycling to patients who need more (4) ___, because it is gentle on the knees.\nHowever, not everyone is happy. Some shop owners worry that fewer cars mean fewer customers. But studies show the opposite: people on bikes stop more often and spend more (5) ___ in local shops. Perhaps the biggest challenge is safety, and that is why good (6) ___ for cyclists are so important.",
    a: ['bicycles', 'cities', 'cars', 'exercise', 'money', 'lanes']
  },
  {
    title: 'Why do we yawn?',
    text: "Everybody yawns, from babies to grandparents, and even many animals do it. For a long time, scientists believed that we yawn because our bodies need more oxygen. However, recent (1) ___ have shown that this is probably not true: people who breathe air rich in oxygen yawn just as often.\nA newer theory suggests that yawning helps to cool the brain. When the brain gets too warm, a deep breath of cool air may help it work better. This could explain why people yawn more in (2) ___ rooms and less in cold weather.\nYawning is also contagious. If you see another person yawn, you are likely to do the same, and sometimes just reading about yawning is enough to make you (3) ___. Interestingly, we copy the yawns of family and friends more often than those of strangers, which suggests a link with empathy. Young children under four rarely catch yawns, perhaps because they are still learning to understand other (4) ___ feelings.\nSo the next time you yawn in class, it may not mean you are bored. Your (5) ___ may simply be trying to cool down. Still, it is polite to cover your (6) ___!",
    a: ['studies', 'warm', 'yawn', "people's", 'brain', 'mouth']
  }
];
function rPart1(): Block {
  const s = pick(R1);
  return { title: 'Part 1', instr: 'Read the text. Fill in each gap with ONE word. You must use a word which is somewhere in the rest of the text.', text: `${s.title}\n\n${s.text}`, qs: s.a.map((a, i) => ({ k: 'gap', n: 1 + i, q: `Gap ${i + 1}`, a: [a, a.replace(/'s$/, 's')] })) };
}

const R2 = {
  statements: [
    'You want to learn to cook dishes from other countries.',
    'You want a course that takes place at weekends only.',
    'You need help to prepare for a job interview.',
    'You would like to improve your public speaking.',
    'You want to study online at your own pace.',
    'You want an activity you can do with your children.',
    'You would like to get a certificate at the end of the course.',
    'You want to learn a practical skill for repairing things at home.',
    'You are looking for a free course.',
    'You want to learn to take better photographs.'
  ],
  texts: [
    ['World Kitchen', "Every Tuesday evening our chefs show you how to prepare a different national dish, from Thai curry to Italian risotto. All ingredients are included, and you take home what you cook.", 0],
    ['Speak Up!', "Do you get nervous in front of an audience? In six sessions you will practise giving short talks, using your voice and body language, and answering questions with confidence.", 3],
    ['Family Clay Club', "Parents and kids work together at the potter's wheel. No experience needed. Sessions last one hour, perfect for little hands and busy weekends.", 5],
    ['Fix It Yourself', "Learn to change a tap, repair a broken chair and paint a room properly. Our experienced builder teaches simple techniques that will save you money for years.", 7],
    ['Career Ready', "Our advisers will check your CV, practise typical questions with you and give honest feedback, so you walk into your next interview feeling prepared.", 2],
    ['Learn Anywhere', "Over two hundred video lessons available day and night. Start and stop whenever you like, and repeat any lesson as many times as you need.", 4],
    ['Community Library Talks', "Our volunteers run monthly talks on local history and gardening. Everyone is welcome and there is no charge, though booking is recommended.", 8],
    ['Focus Workshop', "Bring your camera or phone and discover how light, angle and composition can turn ordinary scenes into striking pictures. Field trips included.", 9]
  ] as [string, string, number][]
};
function rPart2(): Block {
  return {
    title: 'Part 2',
    instr: 'Read the texts 7–14 and the statements A–J. Decide which text matches the situation described in the statements. Each statement can be used ONCE only. There are TWO extra statements which you do not need to use.',
    options: R2.statements,
    text: R2.texts.map(([t, b], i) => `${7 + i}. ${t}\n${b}`).join('\n\n'),
    qs: R2.texts.map(([t, , a], i) => ({ k: 'match', n: 7 + i, q: `Text ${7 + i} (${t})`, a: L[a] }))
  };
}

const R3 = {
  title: 'THE CITY THAT LEARNED TO SAVE WATER',
  headings: ['A crisis that changed habits', 'Technology lends a hand', 'Lessons for the rest of the world', 'Prices that make people think', 'A plan that almost failed', 'Gardens without lawns', 'The role of schools', 'Rain as a resource'],
  paras: [
    ["For years the residents of the city used water as if it would never run out. Then came three dry summers in a row. Reservoirs fell to a fifth of their usual level, and for the first time people were told that the taps might soon be turned off. Suddenly, short showers and full washing machines became a matter of pride.", 0],
    ["The water company installed smart meters in every home. These small devices send information to residents' phones, showing how much water they use each hour. Leaks that once went unnoticed for months are now discovered within a day.", 1],
    ["The city also introduced a new pricing system. The first hundred litres per person each day remain cheap, but every litre after that costs more. Families who once filled swimming pools in their back gardens soon decided it was not worth the expense.", 3],
    ["Many homeowners have replaced thirsty green lawns with stones, local plants and herbs that need little watering. At first, neighbours complained that the streets looked untidy, but the new gardens attract birds and bees and have become fashionable.", 5],
    ["Children learn about the water cycle from their first year at school, and every class has a 'water monitor' who checks that taps are closed. Teachers say that pupils often go home and correct their parents' bad habits.", 6],
    ["Today, new buildings must collect rainwater from their roofs. It is stored in underground tanks and used for flushing toilets and watering parks, which reduces the demand for drinking water by almost a third.", 7]
  ] as [string, number][]
};
function rPart3(): Block {
  return {
    title: 'Part 3',
    instr: 'Read the text and choose the correct heading for each paragraph from the list of headings. There are more headings than paragraphs, so you will not use all of them.',
    options: R3.headings,
    text: `${R3.title}\n\n${R3.paras.map(([p], i) => `${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}. ${p}`).join('\n\n')}`,
    qs: R3.paras.map(([, a], i) => ({ k: 'match', n: 15 + i, q: `Paragraph ${['I', 'II', 'III', 'IV', 'V', 'VI'][i]}`, a: L[a] }))
  };
}

const R4 = {
  title: 'THE MAN WHO PLANTED A FOREST',
  text: "In 1979, a sixteen-year-old boy from a village in north-eastern India noticed something terrible after a flood: hundreds of snakes lying dead on a bare sandbank in the middle of the river. There were no trees to give them shade, and the hot sun had killed them. The boy, whose name was Jadav, decided that if nobody else would plant trees there, he would do it himself.\nHe began with twenty bamboo plants. Local officials told him that nothing would grow on the sandbank, but every morning he rowed across the river with seedlings and carried water up from the riverbank. When the plants grew, he collected ants from his village and released them on the island, because ants improve the soil.\nOver the next forty years, the young bamboo grew into a forest of about 550 hectares — larger than many city parks. Today it is home to deer, rhinos, hundreds of birds and even tigers. For a long time, almost nobody outside the area knew about it. Jadav worked alone, and he did not ask for money or recognition.\nThe forest became famous in 2007, when a journalist on a photography trip came across it by accident. Since then, Jadav has received several national awards, and a documentary about him has been shown around the world. He says that he has no plans to stop: he would like to plant a new forest on another island. 'Nature gives us everything,' he once said. 'We must give something back.'",
  mcq: [
    ['Why did Jadav decide to plant trees?', ['He saw animals die because there was no shade.', 'Officials asked him to do it.', 'He wanted to sell bamboo.', 'A flood destroyed his village.'], 0],
    ['Why did Jadav bring ants to the island?', ['to make the soil better', 'to feed the birds', 'to protect the bamboo from snakes', 'to attract tourists'], 0],
    ['How large is the forest today?', ['about 550 hectares', 'about 20 hectares', 'about 40 hectares', 'about 1979 hectares'], 0],
    ['How did the world learn about the forest?', ['A journalist found it by chance.', 'Jadav wrote to the newspapers.', 'Officials announced it in 1979.', 'Tourists posted photos online.'], 0]
  ] as [string, string[], number][],
  tfn: [
    ['Jadav was a teenager when he started planting.', 0],
    ['Local officials helped Jadav to buy the first plants.', 1],
    ['Tigers now live in the forest.', 0],
    ['Jadav was paid by the government for his work.', 1],
    ['Jadav has already started a second forest on another island.', 2]
  ] as [string, number][]
};
function rPart4(): Block {
  const qs: EQ[] = R4.mcq.map(([q, opts, a], i) => {
    const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    return { k: 'mcq', n: 21 + i, q, opts: order.map((o) => opts[o]), a: order.indexOf(a) };
  });
  R4.tfn.forEach(([q, a], i) => qs.push({ k: 'mcq', n: 25 + i, q, opts: ['True', 'False', 'No Information'], a }));
  return { title: 'Part 4', instr: 'Read the text. For questions 21–24, choose the correct answer A, B, C or D. For questions 25–29, decide if the statements agree with the information given in the text.', text: `${R4.title}\n\n${R4.text}`, qs };
}

const R5 = {
  title: 'THE SCIENCE OF HABITS',
  text: "Around forty percent of what we do every day is not the result of conscious decisions but of habits. Brushing our teeth, checking our phones and taking the same route to work all happen almost automatically. Psychologists describe a habit as a loop with three parts: a cue, a routine and a reward. The cue is the trigger — the time of day, a place or a feeling. The routine is the behaviour itself, and the reward is the pleasant feeling that makes the brain want to repeat it.\nBecause habits save mental energy, the brain is very reluctant to give them up. This is why simply deciding to stop a bad habit rarely works. Researchers suggest that it is more effective to keep the cue and the reward but change the routine. A person who eats biscuits every afternoon because they feel tired, for example, might replace the snack with a short walk, which also brings a feeling of energy.\nHow long does it take to form a new habit? A popular myth says twenty-one days, but a study at University College London found that the average was sixty-six days, and for some people it took much longer. Missing a day now and then did not seem to matter much. What counted most was repetition in a stable situation: doing the same thing at the same time and in the same place.",
  gaps: [
    ['Psychologists divide a habit into a cue, a routine and a (30) ___.', ['reward']],
    ['Habits help the brain save mental (31) ___.', ['energy']],
    ['To change a habit, experts advise replacing the (32) ___ only.', ['routine']],
    ['On average, a new habit took (33) ___ days to form.', ['66', 'sixty-six']]
  ] as [string, string[]][],
  mcq: [
    ['According to the text, missing a day …', ['did not have a big effect.', 'meant starting again.', 'doubled the time needed.', 'made habits stronger.'], 0],
    ["What is the writer's main purpose?", ['to explain how habits work and how to change them', 'to criticise people with bad habits', 'to advertise a university study', 'to prove that habits are always harmful'], 0]
  ] as [string, string[], number][]
};
function rPart5(): Block {
  const qs: EQ[] = R5.gaps.map(([q, a], i) => ({ k: 'gap', n: 30 + i, q, a }));
  R5.mcq.forEach(([q, opts, a], i) => {
    const order = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    qs.push({ k: 'mcq', n: 34 + i, q, opts: order.map((o) => opts[o]), a: order.indexOf(a) });
  });
  return { title: 'Part 5', instr: 'Read the text. For questions 30–33, write no more than ONE WORD and / or A NUMBER. For questions 34–35, choose the correct answer A, B, C or D.', text: `${R5.title}\n\n${R5.text}`, qs };
}

export function multilevelReading(): ObjectiveSection {
  return { kind: 'reading', minutes: 60, blocks: [rPart1(), rPart2(), rPart3(), rPart4(), rPart5()] };
}

/* =============================== WRITING =============================== */
const W1 = [
  'You have just joined a sports club, but the training times have changed and now clash with your classes. Write an email to the club manager. In your email:\n- explain who you are;\n- describe the problem;\n- suggest a solution.',
  'Last week you bought a pair of headphones online, but they stopped working after two days. Write an email to the shop. In your email:\n- say what you bought and when;\n- explain what is wrong;\n- say what you would like the shop to do.',
  'A friend from abroad is planning to visit Uzbekistan next summer and has asked for your advice. Write an email to your friend. In your email:\n- say how you feel about the visit;\n- recommend places to see;\n- give advice about what to bring.',
  'You have begun a new course at university and you missed the first lecture because you were ill. Write an email to your teacher. In your email:\n- apologise and explain why you were absent;\n- ask what you missed;\n- ask for a meeting.'
];
const W2 = [
  'Some people believe that young people should be required to do unpaid community work in their free time. Others think this should be a personal choice. Discuss both views and give your opinion.',
  'Many people now work from home using the internet. Do the advantages of working from home outweigh the disadvantages?',
  'In some countries, the number of people living in cities is growing rapidly. What problems does this cause, and what can be done to solve them?',
  'Some think that schools should teach practical skills such as cooking and managing money instead of traditional academic subjects. To what extent do you agree or disagree?',
  'Social media has changed the way people communicate. Has this been a positive or a negative development?'
];
export function multilevelWriting(): WritingSection {
  return {
    kind: 'writing',
    minutes: 60,
    tasks: [
      { id: 'ml-w1', title: 'Task 1', prompt: `${pick(W1)}\n\nWrite about 150 words in an appropriate format and style.`, minWords: 120, maxWords: 180, weight: 1 },
      { id: 'ml-w2', title: 'Task 2', prompt: `${pick(W2)}\n\nWrite at least 250 words in an appropriate style and format.`, minWords: 250, weight: 2 }
    ]
  };
}

/* =============================== SPEAKING =============================== */
const S11 = ['What do you usually do at the weekend?', 'Tell me about your favourite teacher.', 'How do you usually travel to school or work?', 'What kind of music do you like?', 'Do you prefer to spend time indoors or outdoors? Why?', 'What is your favourite season of the year?', 'How often do you use the internet, and what for?', 'Describe your home town in a few words.', 'What did you do last birthday?', 'Do you like cooking? Why or why not?'];
const S12: [string, string[]][] = [
  ['Picture A: a family eating dinner together at home. Picture B: a young man eating fast food alone in a busy café.', ['Compare the two pictures.', 'Which kind of meal do you prefer and why?', 'Why do some people not have time to eat with their families?']],
  ['Picture A: students studying in a library with books. Picture B: a student studying at home with a laptop.', ['Compare the two pictures.', 'Where do you study best?', 'Will libraries still be needed in the future?']],
  ['Picture A: people shopping at a busy outdoor market. Picture B: a person shopping online on a phone.', ['Compare the two pictures.', 'How do you usually shop?', 'What are the dangers of shopping online?']]
];
const S2 = [
  'Describe a book or film that made a strong impression on you.\nYou should say:\n- what it was about;\n- when you read or saw it;\n- why it impressed you;\n- whether you would recommend it.',
  'Describe a person who has helped you a lot.\nYou should say:\n- who the person is;\n- how you know them;\n- how they helped you;\n- how you feel about them.',
  'Describe a place you would like to visit in the future.\nYou should say:\n- where it is;\n- how you learned about it;\n- what you would do there;\n- why you want to go.',
  'Describe a skill you learned that is useful for you.\nYou should say:\n- what the skill is;\n- how you learned it;\n- how difficult it was;\n- how it helps you now.'
];
const S3: [string, string[], string[]][] = [
  ['Students should wear school uniforms.', ['Uniforms make everyone equal', 'They save time in the morning', 'They create a sense of belonging'], ['They limit self-expression', 'They can be expensive', 'Students feel less comfortable']],
  ['Children should have their own mobile phones.', ['Parents can contact them easily', 'Phones help with learning', 'They keep children safe'], ['They distract children from studying', 'They reduce physical activity', 'Children may see harmful content']],
  ['Cars should be banned from city centres.', ['Cleaner air', 'Safer streets for pedestrians', 'Less noise'], ['Problems for elderly and disabled people', 'Shops may lose customers', 'Public transport may not be enough']]
];
export function multilevelSpeaking(): SpeakingSection {
  const [pics, picQs] = pick(S12);
  const [topic, fo, ag] = pick(S3);
  return {
    kind: 'speaking',
    parts: [
      { title: 'Part 1.1', instr: 'Answer the questions about yourself. You have 30 seconds for each answer.', questions: shuffle(S11).slice(0, 3), prepSec: 5, speakSec: 30 },
      { title: 'Part 1.2', instr: 'Look at the two pictures and answer the questions. You have 45 seconds for each answer.', card: pics, questions: picQs, prepSec: 10, speakSec: 45 },
      { title: 'Part 2', instr: 'Talk about the topic on the card. You have 1 minute to prepare and up to 2 minutes to speak.', card: pick(S2), questions: ['Talk about the topic on the card.'], prepSec: 60, speakSec: 120 },
      { title: 'Part 3', instr: 'Look at the table. Discuss the topic giving arguments for and against. You have 1 minute to prepare and 2 minutes to speak.', card: `${topic}\n\nFOR:\n- ${fo.join('\n- ')}\n\nAGAINST:\n- ${ag.join('\n- ')}`, questions: ['Please give your arguments and your own opinion.'], prepSec: 60, speakSec: 120 }
    ]
  };
}

/* =============================== SCORING =============================== */
/** raw → 0–75 scaled score (approximate; the real exam uses the Rasch model) */
export const mlScaled = (raw: number, max: number) => Math.round((raw / Math.max(1, max)) * 75 * 10) / 10;
export const mlLevel = (score75: number) => (score75 >= 65 ? 'C1' : score75 >= 51 ? 'B2' : score75 >= 38 ? 'B1' : 'B1 dan past');
