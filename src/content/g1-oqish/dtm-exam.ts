import type { L10n } from '@/lib/i18n-config';
import type { ExamConfig, ExamQuestion } from '@/content/g1-math/exam';

/**
 * "Milliy sertifikatga tayyorgarlik - Adabiyot" — a grade-1 literature practice
 * exam for the "Oʻqish savodxonligi" subject, in the style of the national
 * certificate (milliy sertifikat) tests. Real certificate tests target older
 * students; this bank uses ONLY grade-1 reading/literature material: janrlar
 * (ertak, sheʼr, maqol, topishmoq, tez aytish, alla), xalq ogʻzaki ijodi, ertak
 * qahramonlari va xulosalari, maqollar, topishmoqlar, kitob va kutubxona odobi,
 * fasllar va bayramlar (Navroʻz), mashhur ajdodlar. Each generator draws from a
 * pool and shuffles the options; `buildOqishDtmExam` picks a random subset of
 * the bank in random order, so a child gets a different test on every retake.
 * Each question carries `reviewTopics` (Oʻqish lesson numbers 1–64) so the
 * results screen recommends which lessons to revise.
 */

export const OQISH_DTM_EXAM_KEY = 'g1-oqish-dtm';
export const OQISH_DTM_MINUTES = 30;
export const OQISH_DTM_COUNT = 20;

export const OQISH_DTM_TITLE: L10n = {
  uz: 'Milliy sertifikatga tayyorgarlik - Adabiyot',
  ru: 'Подготовка к национальному сертификату - Литература',
  en: 'National certificate preparation - Literature'
};

export const OQISH_DTM_INTRO: L10n = {
  uz: 'Milliy sertifikat imtihonlari odatda katta yoshdagi oʻquvchilar uchun boʻladi. Bu — haqiqiy milliy sertifikat testi EMAS, balki 1-sinf oʻqish savodxonligi darslarida oʻrganilgan adabiyot mavzulari (janrlar — ertak, sheʼr, maqol, topishmoq; xalq ogʻzaki ijodi, ertak qahramonlari, maqollar maʼnosi, kitob va kutubxona, fasllar va bayramlar) asosidagi tayyorgarlik testi. 20 ta savol, 30 daqiqa. Har safar savollar oʻzgaradi — qayta ishlaganda boshqa test chiqadi. Test soʻngida qaysi darslarni takrorlash kerakligi tavsiya qilinadi.',
  ru: 'Экзамены на национальный сертификат обычно сдают ученики старших классов. Это НЕ настоящий тест национального сертификата, а тренировочный тест по темам литературы из уроков читательской грамотности 1 класса (жанры — сказка, стихотворение, пословица, загадка; устное народное творчество, герои сказок, смысл пословиц, книга и библиотека, времена года и праздники). 20 вопросов, 30 минут. Вопросы меняются каждый раз — при повторе будет другой тест. В конце рекомендуется, какие уроки повторить.',
  en: 'National certificate exams are usually taken by older students. This is NOT a real national certificate test — it is a practice test built from the literature topics of the grade-1 reading-literacy lessons (genres — fairy tale, poem, proverb, riddle; folk oral art, fairy-tale characters, the meaning of proverbs, books and the library, seasons and festivals). 20 questions, 30 minutes. The questions change every time — a retake gives a different test. At the end it recommends which lessons to review.'
};

/* ----------------------------- helpers ----------------------------- */
const pickOne = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const N = (x: number | string): L10n => ({ uz: String(x), ru: String(x), en: String(x) });
const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });

function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

/** Pick `n` distinct random items from a pool. */
function sample<T>(pool: T[], n: number): T[] {
  return shuffle(pool).slice(0, n);
}

/** Build 4 unique options from a correct choice + wrong choices (option text is
 *  locale-neutral Uzbek subject vocabulary), then shuffle. */
function wordOptions(correct: string, wrong: string[]): { choices: L10n[]; answerIndex: number } {
  const seen = new Set<string>([correct]);
  const uniqWrong: string[] = [];
  for (const w of wrong) {
    if (!seen.has(w)) {
      seen.add(w);
      uniqWrong.push(w);
    }
    if (uniqWrong.length === 3) break;
  }
  const opts = shuffle([{ v: correct, ok: true }, ...uniqWrong.map((v) => ({ v, ok: false }))]);
  return { choices: opts.map((o) => N(o.v)), answerIndex: opts.findIndex((o) => o.ok) };
}

/* ----------------------------- pools ----------------------------- */
const GENRES = ['ertak', 'sheʼr', 'maqol', 'topishmoq', 'hikoya', 'tez aytish', 'alla'];

/** Grade-1 riddles: [riddle, answer]. Wrong options come from other answers. */
const RIDDLES: [L10n, string][] = [
  [L('Osmondan oppoq boʻlib, yumshoq boʻlib yogʻadi.', 'С неба падает белым и мягким.', 'It falls from the sky, white and soft.'), 'qor'],
  [L('Kunduzi olamga nur sochadi.', 'Днём освещает весь мир.', 'By day it lights the whole world.'), 'quyosh'],
  [L('Ichi toʻla bilim, jimgina soʻzlaydi.', 'Полна знаний, говорит молча.', 'Full of knowledge, it speaks silently.'), 'kitob'],
  [L('Kechasi osmonda oltin lagandek porlaydi.', 'Ночью сияет в небе, как золотое блюдо.', 'At night it shines in the sky like a golden dish.'), 'oy'],
  [L('Yashil bargli daraxtda qip-qizil boʻlib pishadi.', 'На дереве с зелёными листьями зреет красным.', 'It ripens red on a green-leafed tree.'), 'olma'],
  [L('Bahorda daraxtlarga qoʻnib sayraydi, kuzda uchib ketadi.', 'Весной поёт на деревьях, осенью улетает.', 'In spring it sings in the trees, in autumn it flies away.'), 'qush']
];

/** Proverbs with a missing word: [proverb with gap (L10n), correct word, wrong words]. */
const PROVERB_GAPS: { p: L10n; a: string; w: string[] }[] = [
  { p: L('Mehnatning tagi — …', 'Труд приносит …', 'At the bottom of labour lies …'), a: 'rohat', w: ['uyqu', 'oʻyin', 'malol'] },
  { p: L('Kitob — bilim …', 'Книга — … знаний', 'A book is a … of knowledge'), a: 'manbai', w: ['dushmani', 'oʻyinchisi', 'toʻsigʻi'] },
  { p: L('Kuch — …', 'Сила — в …', 'Strength lies in …'), a: 'birlikda', w: ['boylikda', 'urushda', 'yolgʻonda'] },
  { p: L('Yaxshi soʻz — jon …', 'Доброе слово — … для души', 'A kind word is … for the soul'), a: 'ozigʻi', w: ['dushmani', 'ogʻrigʻi', 'toʻsigʻi'] },
  { p: L('Vatanni sevmoq — …', 'Любить Родину — часть …', 'Loving the Homeland is part of …'), a: 'iymondandir', w: ['oʻyindandir', 'uyqudandir', 'ovqatdandir'] }
];

/** Proverb → its topic: [proverb, topic, wrong topics]. */
const PROVERB_TOPICS: { p: string; a: string; w: string[] }[] = [
  { p: 'Mehnatning tagi — rohat', a: 'mehnat', w: ['qish', 'osmon', 'oʻyin'] },
  { p: 'Kuch — birlikda', a: 'doʻstlik va birlik', w: ['fasllar', 'taomlar', 'ranglar'] },
  { p: 'Vatan — ona kabi muqaddas', a: 'Vatan', w: ['kitob', 'qish', 'oʻyin'] },
  { p: 'Kitob — aql chirogʻi', a: 'kitob', w: ['sport', 'osmon', 'taom'] },
  { p: 'Yaxshi soʻz — jon ozigʻi', a: 'yaxshi soʻz', w: ['yomon odat', 'oʻyin', 'fasl'] }
];

/** Fairy-tale animals and their traditional traits. */
const TALE_ANIMALS: { animal: string; trait: string }[] = [
  { animal: 'tulki', trait: 'ayyor' },
  { animal: 'quyon', trait: 'qoʻrqoq' },
  { animal: 'boʻri', trait: 'ochkoʻz' },
  { animal: 'sher', trait: 'kuchli' },
  { animal: 'chumoli', trait: 'mehnatkash' }
];

/** Which season is the text/festival about: [subject (L10n), season, lessons]. */
const SEASONS: { s: L10n; a: string; topics: number[] }[] = [
  { s: L('«Laylak qor yoqqanda» matni', 'Текст «Когда падает пушистый снег»', 'The text “When fluffy snow falls”'), a: 'qish', topics: [12] },
  { s: L('«Qor toʻpi voqeasi» hikoyasi', 'Рассказ «История со снежком»', 'The story “The snowball incident”'), a: 'qish', topics: [13] },
  { s: L('«Salom senga, gulbahor» sheʼri', 'Стихотворение «Здравствуй, весна!»', 'The poem “Hello to you, spring!”'), a: 'bahor', topics: [25] },
  { s: L('Navroʻz bayrami', 'Праздник Навруз', 'The Navruz festival'), a: 'bahor', topics: [33] },
  { s: L('«Yoz — naqadar soz» sheʼri', 'Стихотворение «Лето — как прекрасно»', 'The poem “Summer — how fine it is”'), a: 'yoz', topics: [61] }
];

const SEASONS_ALL = ['qish', 'bahor', 'yoz', 'kuz'];

/* --------------------------- question bank --------------------------- */
type Gen = () => ExamQuestion;

const GENERATORS: Gen[] = [
  // janr — ertak boshlanishi
  () => ({
    id: 'genre-ertak',
    prompt: L(
      '«Bir bor ekan, bir yoʻq ekan…» — bu qaysi janrning boshlanishi?',
      '«Жили-были…» — так начинается какой жанр?',
      '“Once upon a time…” — which genre begins like this?'
    ),
    ...wordOptions('ertak', sample(GENRES.filter((g) => g !== 'ertak'), 3)),
    reviewTopics: [45, 46]
  }),
  // janr — sheʼr
  () => ({
    id: 'genre-sher',
    prompt: L(
      'Qofiyali, ohangdor misralardan tuzilgan asar qaysi janrga mansub?',
      'Произведение из рифмованных, напевных строк — какой это жанр?',
      'A work made of rhymed, melodic lines belongs to which genre?'
    ),
    ...wordOptions('sheʼr', sample(GENRES.filter((g) => g !== 'sheʼr'), 3)),
    reviewTopics: [1, 2]
  }),
  // janr — maqol
  () => ({
    id: 'genre-maqol',
    prompt: L(
      'Xalqning qisqa va dono hikmatli soʻzi qaysi janr?',
      'Краткое мудрое народное изречение — какой это жанр?',
      'A short, wise folk saying is which genre?'
    ),
    ...wordOptions('maqol', sample(GENRES.filter((g) => g !== 'maqol'), 3)),
    reviewTopics: [45, 46]
  }),
  // janr — topishmoq
  () => ({
    id: 'genre-topishmoq',
    prompt: L(
      'Javobini oʻylab topish kerak boʻlgan sirli savol qaysi janr?',
      'Загадочный вопрос, ответ на который нужно отгадать, — какой это жанр?',
      'A mysterious question whose answer must be guessed is which genre?'
    ),
    ...wordOptions('topishmoq', sample(GENRES.filter((g) => g !== 'topishmoq'), 3)),
    reviewTopics: [47]
  }),
  // janr — tez aytish
  () => ({
    id: 'genre-tezaytish',
    prompt: L(
      '«Oq choynakka oq qopqoq, koʻk choynakka koʻk qopqoq» — bu qaysi janr?',
      '«У белого чайника белая крышка, у синего — синяя» — какой это жанр?',
      '“A white lid for the white teapot, a blue lid for the blue teapot” — which genre is this?'
    ),
    ...wordOptions('tez aytish', sample(GENRES.filter((g) => g !== 'tez aytish'), 3)),
    reviewTopics: [47, 49]
  }),
  // janr — alla
  () => ({
    id: 'genre-alla',
    prompt: L(
      'Ona bolasini uxlatish uchun aytadigan mayin qoʻshiq nima deyiladi?',
      'Как называется нежная песня, которую мама поёт, укладывая ребёнка спать?',
      'What is the gentle song a mother sings to lull her child to sleep called?'
    ),
    ...wordOptions('alla', sample(GENRES.filter((g) => g !== 'alla'), 3)),
    reviewTopics: [49]
  }),
  // topishmoq — javobini top
  () => {
    const [r, a] = pickOne(RIDDLES);
    const others = RIDDLES.map(([, x]) => x).filter((x) => x !== a);
    return {
      id: 'riddle',
      prompt: L(
        `Topishmoqning javobini toping: «${r.uz}»`,
        `Отгадайте загадку: «${r.ru}»`,
        `Solve the riddle: “${r.en}”`
      ),
      ...wordOptions(a, sample(others, 3)),
      reviewTopics: [47]
    };
  },
  // maqolni toʻldir
  () => {
    const g = pickOne(PROVERB_GAPS);
    return {
      id: 'proverb-gap',
      prompt: L(
        `Maqolni toʻldiring: «${g.p.uz}»`,
        `Дополните пословицу: «${g.p.ru}»`,
        `Complete the proverb: “${g.p.en}”`
      ),
      ...wordOptions(g.a, g.w),
      reviewTopics: [45, 46]
    };
  },
  // maqol nima haqida
  () => {
    const g = pickOne(PROVERB_TOPICS);
    return {
      id: 'proverb-topic',
      prompt: L(
        `«${g.p}» maqoli nima haqida?`,
        `О чём пословица «${g.p}»?`,
        `What is the proverb “${g.p}” about?`
      ),
      ...wordOptions(g.a, g.w),
      reviewTopics: [45, 46]
    };
  },
  // ertak hayvoni — belgidan hayvonga
  () => {
    const t = pickOne(TALE_ANIMALS);
    const others = TALE_ANIMALS.map((x) => x.animal).filter((x) => x !== t.animal);
    return {
      id: 'tale-animal',
      prompt: L(
        `Ertaklarda qaysi hayvon odatda ${t.trait} boʻlib tasvirlanadi?`,
        `Какое животное в сказках обычно изображается со свойством «${t.trait}»?`,
        `Which animal is usually shown as “${t.trait}” in fairy tales?`
      ),
      ...wordOptions(t.animal, sample(others, 3)),
      reviewTopics: [45, 46]
    };
  },
  // ertak hayvoni — hayvondan belgiga
  () => {
    const t = pickOne(TALE_ANIMALS);
    const others = TALE_ANIMALS.map((x) => x.trait).filter((x) => x !== t.trait);
    return {
      id: 'tale-trait',
      prompt: L(
        `Ertaklarda ${t.animal} odatda qanday boʻladi?`,
        `Каким обычно бывает в сказках «${t.animal}»?`,
        `In fairy tales, what is the “${t.animal}” usually like?`
      ),
      ...wordOptions(t.trait, sample(others, 3)),
      reviewTopics: [45, 46]
    };
  },
  // ertak tugashi
  () => ({
    id: 'tale-ending',
    prompt: L(
      'Ertaklar koʻpincha qanday soʻzlar bilan tugaydi?',
      'Какими словами чаще всего заканчиваются сказки?',
      'With which words do fairy tales most often end?'
    ),
    ...wordOptions('…murod-maqsadiga yetibdi', ['Bir bor ekan, bir yoʻq ekan…', 'Salom, bolalar!', 'Ertaga koʻrishamiz!']),
    reviewTopics: [45, 46]
  }),
  // ertak saboqlari
  () => ({
    id: 'tale-moral',
    prompt: L(
      'Ertaklar bizni nimaga oʻrgatadi?',
      'Чему нас учат сказки?',
      'What do fairy tales teach us?'
    ),
    ...wordOptions('yaxshilikka', ['yolgʻonchilikka', 'dangasalikka', 'qoʻpollikka']),
    reviewTopics: [45, 46]
  }),
  // qofiya
  () => ({
    id: 'qofiya',
    prompt: L(
      'Sheʼr misralari oxiridagi ohangdosh soʻzlar nima deyiladi?',
      'Как называются созвучные слова в конце строк стихотворения?',
      'What are the harmonising words at the ends of poem lines called?'
    ),
    ...wordOptions('qofiya', ['maqol', 'boʻgʻin', 'sarlavha']),
    reviewTopics: [1, 2]
  }),
  // sarlavha
  () => ({
    id: 'sarlavha',
    prompt: L(
      'Asarning nomi nima deb ataladi?',
      'Как называется название произведения?',
      'What is the name of a work called?'
    ),
    ...wordOptions('sarlavha', ['qofiya', 'muallif', 'qahramon']),
    reviewTopics: [1]
  }),
  // muallif
  () => ({
    id: 'muallif',
    prompt: L(
      'Asarni yozgan kishi kim deb ataladi?',
      'Как называют человека, написавшего произведение?',
      'What is the person who wrote a work called?'
    ),
    ...wordOptions('muallif', ['oʻquvchi', 'qahramon', 'rassom']),
    reviewTopics: [1]
  }),
  // qahramon
  () => ({
    id: 'qahramon',
    prompt: L(
      'Ertak va hikoyalarda qatnashuvchilar nima deyiladi?',
      'Как называются действующие лица сказок и рассказов?',
      'What are the participants in tales and stories called?'
    ),
    ...wordOptions('qahramonlar', ['mualliflar', 'oʻquvchilar', 'kitoblar']),
    reviewTopics: [1]
  }),
  // xalq ogʻzaki ijodi
  () => ({
    id: 'folk',
    prompt: L(
      'Ertak, maqol va topishmoqlarni kim yaratgan?',
      'Кто создал сказки, пословицы и загадки?',
      'Who created fairy tales, proverbs and riddles?'
    ),
    ...wordOptions('xalq', ['bitta shoir', 'oʻqituvchi', 'rassom']),
    reviewTopics: [45, 46, 47]
  }),
  // kutubxona
  () => ({
    id: 'library',
    prompt: L(
      'Kitoblar saqlanadigan va oʻqiladigan joy nima deyiladi?',
      'Как называется место, где хранят и читают книги?',
      'What is the place where books are kept and read called?'
    ),
    ...wordOptions('kutubxona', ['oshxona', 'doʻkon', 'stadion']),
    reviewTopics: [22]
  }),
  // kitobni asrash
  () => ({
    id: 'book-care',
    prompt: L(
      'Kitobni qanday asraymiz?',
      'Как мы бережём книгу?',
      'How do we take care of a book?'
    ),
    ...wordOptions('toza qoʻl bilan varaqlaymiz', ['varaqlarini yirtamiz', 'ustiga rasm chizamiz', 'yerga tashlab ketamiz']),
    reviewTopics: [23]
  }),
  // fasl — matn/bayram qaysi faslda
  () => {
    const s = pickOne(SEASONS);
    return {
      id: 'season',
      prompt: L(
        `${s.s.uz} qaysi fasl bilan bogʻliq?`,
        `${s.s.ru} — с каким временем года связан(о)?`,
        `${s.s.en} is connected with which season?`
      ),
      ...wordOptions(s.a, SEASONS_ALL.filter((x) => x !== s.a)),
      reviewTopics: s.topics
    };
  },
  // sumalak
  () => ({
    id: 'sumalak',
    prompt: L(
      'Sumalak qaysi bayramning taomi?',
      'Блюдом какого праздника является сумаляк?',
      'Sumalak is the dish of which festival?'
    ),
    ...wordOptions('Navroʻz', ['Yangi yil', 'Hosil bayrami', 'Mustaqillik kuni']),
    reviewTopics: [30, 31]
  }),
  // Sohibqiron
  () => ({
    id: 'sohibqiron',
    prompt: L(
      'Olamga mashhur Sohibqiron deb kim ulugʻlanadi?',
      'Кого прославляют как всемирно известного Сохибкирана?',
      'Who is celebrated as the world-famous Sohibqiron?'
    ),
    ...wordOptions('Amir Temur', ['Zahiriddin Muhammad Bobur', 'Alisher Navoiy', 'Mirzo Ulugʻbek']),
    reviewTopics: [36]
  }),
  // Bobur
  () => ({
    id: 'bobur',
    prompt: L(
      'Zahiriddin Muhammad Bobur qanday inson boʻlgan?',
      'Каким человеком был Захириддин Мухаммад Бабур?',
      'What kind of person was Zahiriddin Muhammad Bobur?'
    ),
    ...wordOptions('shoh va shoir', ['dehqon', 'sportchi', 'haydovchi']),
    reviewTopics: [41]
  }),
  // Zumrad va Qimmat
  () => ({
    id: 'zumrad',
    prompt: L(
      '«Zumrad va Qimmat» ertagidagi mehnatsevar, odobli qiz kim?',
      'Кто в сказке «Зумрад и Киммат» трудолюбивая и воспитанная девочка?',
      'Who is the hard-working, well-mannered girl in the tale “Zumrad and Qimmat”?'
    ),
    ...wordOptions('Zumrad', ['Qimmat', 'Malika', 'Gulnora']),
    reviewTopics: [45, 46]
  })
];

/** Build a fresh Adabiyot practice exam: a random subset of the generator bank,
 *  in random order, with each question's options reshuffled. */
export function buildOqishDtmExam(): ExamQuestion[] {
  return shuffle(GENERATORS)
    .slice(0, OQISH_DTM_COUNT)
    .map((gen, i) => {
      const q = gen();
      return { ...q, id: `q${i + 1}-${q.id}` };
    });
}

export const OQISH_DTM_EXAM_CONFIG: ExamConfig = {
  title: OQISH_DTM_TITLE,
  intro: OQISH_DTM_INTRO,
  minutes: OQISH_DTM_MINUTES,
  count: OQISH_DTM_COUNT,
  build: buildOqishDtmExam,
  logoSrc: '/dtm-logo.png',
  topicKey: OQISH_DTM_EXAM_KEY
};
