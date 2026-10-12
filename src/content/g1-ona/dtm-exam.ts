import type { L10n } from '@/lib/i18n-config';
import type { ExamConfig, ExamQuestion } from '@/content/g1-math/exam';

/**
 * "DTM ga tayyorgarlik (Ona tili)" — a grade-1 native-language practice exam in
 * the style of the DTM (Davlat test markazi) admission tests. Real DTM Ona tili
 * tests target grades 5–11 / university entry; this bank uses ONLY the grade-1
 * Ona tili topics those tests touch (bosh harf / atoqli otlar, soʻz turkumlari —
 * narsa/harakat/belgi, unli-undosh, boʻgʻin, tinish belgilari, son soʻzlari,
 * zid maʼnoli soʻzlar). We cannot randomize digits like the maths test, so each
 * generator instead draws its words/items from a pool (≥5 variants) and shuffles
 * the options; `buildOnaDtmExam` also picks a random SUBSET of the generator bank
 * and shuffles their order, so a child gets a different test on every retake.
 * Each question carries `reviewTopics` (Ona tili topic numbers) so the results
 * screen recommends which grade-1 lessons to revise.
 */

export const ONA_DTM_EXAM_KEY = 'g1-ona-dtm';
export const ONA_DTM_MINUTES = 30;
export const ONA_DTM_COUNT = 20;

export const ONA_DTM_TITLE: L10n = {
  uz: 'Milliy sertifikatga tayyorgarlik - Ona tili',
  ru: 'Подготовка к национальному сертификату - Родной язык',
  en: 'National certificate preparation - Native language'
};

export const ONA_DTM_INTRO: L10n = {
  uz: 'Milliy sertifikat imtihonlari odatda katta yoshdagi oʻquvchilar uchun boʻladi. Bu — haqiqiy milliy sertifikat testi EMAS, balki bunday testlarda uchraydigan, 1-sinfda oʻrganilgan ona tili mavzulari (bosh harf va atoqli otlar, soʻz turkumlari — narsa, harakat, belgi, unli-undosh tovushlar, boʻgʻin, tinish belgilari, son soʻzlari) asosidagi tayyorgarlik testi. 20 ta savol, 30 daqiqa. Har safar soʻzlar va savollar oʻzgaradi — qayta ishlaganda boshqa test chiqadi. Test soʻngida qaysi darslarni takrorlash kerakligi tavsiya qilinadi.',
  ru: 'Экзамены на национальный сертификат обычно сдают ученики старших классов. Это НЕ настоящий тест национального сертификата, а тренировочный тест по темам родного языка 1 класса, встречающимся в таких тестах (заглавная буква и имена собственные, части речи — предмет, действие, признак, гласные-согласные, слоги, знаки препинания, слова-числа). 20 вопросов, 30 минут. Слова и вопросы меняются каждый раз — при повторе будет другой тест. В конце рекомендуется, какие уроки повторить.',
  en: 'National certificate exams are usually taken by older students. This is NOT a real national certificate test — it is a practice test built from the grade-1 native-language topics that appear in such tests (capital letters & proper nouns, word classes — thing/action/attribute, vowels & consonants, syllables, punctuation, number words). 20 questions, 30 minutes. The words and questions change every time — a retake gives a different test. At the end it recommends which lessons to review.'
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

/** Build 4 unique word options from a correct choice + wrong choices (word text
 *  is locale-neutral here, so one L10n per option), then shuffle. */
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

/* ----------------------------- word pools ----------------------------- */
const PLACES = ['Toshkent', 'Buxoro', 'Samarqand', 'Andijon', 'Namangan', 'Xiva', 'Qoʻqon', 'Chirchiq', 'Nil', 'Baykal'];
const COMMON = ['olma', 'kitob', 'stol', 'gul', 'non', 'daftar', 'qalam', 'maktab', 'oʻrik', 'suv'];
const NAMES = ['Aziza', 'Akmal', 'Doston', 'Nodira', 'Malika', 'Alisher', 'Karim', 'Sardor', 'Gulnora', 'Botir'];
const NICKNAMES = ['Mosh', 'Momiq', 'Ziyrak', 'Boychibor', 'Polvon', 'Chopqir', 'Olapar', 'Qashqa'];
const PERSONS = ['oʻquvchi', 'shifokor', 'rassom', 'dehqon', 'muallim', 'haydovchi', 'sportchi', 'bola'];
const THINGS = ['stol', 'kitob', 'olma', 'daftar', 'qalam', 'stakan', 'divan', 'gul'];
const ACTIONS = ['yugurdi', 'oʻqidi', 'kuyladi', 'sakradi', 'uchadi', 'suzadi', 'yozdi', 'chizdi'];
const ATTRS = ['shirin', 'baland', 'qizil', 'katta', 'yumshoq', 'uzun', 'issiq', 'goʻzal', 'mehribon'];
const COUNTS = ['bir', 'ikki', 'uch', 'besh', 'olti', 'yetti', 'oʻn'];
const ORDINALS = ['birinchi', 'ikkinchi', 'uchinchi', 'beshinchi', 'oltinchi', 'oʻninchi'];
const VOWELS = ['a', 'o', 'i', 'u', 'e'];
const CONSONANTS = ['b', 'd', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'g', 'x', 'y', 'z'];
const ANTONYMS: [string, string][] = [
  ['katta', 'kichik'], ['uzun', 'qisqa'], ['baland', 'past'], ['issiq', 'sovuq'],
  ['oq', 'qora'], ['shirin', 'achchiq'], ['keng', 'tor'], ['yaxshi', 'yomon']
];
const SYLLABLES: [string, number][] = [
  ['gul', 1], ['non', 1], ['opa', 2], ['olma', 2], ['kitob', 2], ['maktab', 2],
  ['bola', 2], ['daftar', 2], ['sabzavot', 3], ['qalamdon', 3]
];
const LETTERS_COUNT: [string, number][] = [
  ['gul', 3], ['non', 3], ['opa', 3], ['olma', 4], ['bola', 4], ['qalam', 5], ['kitob', 5], ['maktab', 6], ['daftar', 6]
];
const VOWELS_COUNT: [string, number][] = [
  ['gul', 1], ['non', 1], ['olma', 2], ['bola', 2], ['kitob', 2], ['maktab', 2], ['opa', 2], ['daftar', 2], ['qalam', 2]
];
const SENT_STATEMENT = ['Bugun havo issiq', 'Men maktabga bordim', 'Bahor keldi', 'Olma pishdi', 'Qush uchdi'];
const SENT_QUESTION = ['Bugun havo issiqmi', 'Sen qayerga borasan', 'Bu qanday gul', 'Kim keldi', 'Nechta olma bor'];
const SENT_EXCLAIM = ['Qanday goʻzal', 'Yashang', 'Voy, chiroyli', 'Ura, bayram keldi'];

/* --------------------------- question bank --------------------------- */
type Gen = () => ExamQuestion;

const GENERATORS: Gen[] = [
  // atoqli ot — joy nomi
  () => {
    const correct = pickOne(PLACES);
    return {
      id: 'place',
      prompt: L('Qaysi soʻz joy nomi (bosh harf bilan yoziladi)?', 'Какое слово — название места (пишется с заглавной)?', 'Which word is a place name (written with a capital)?'),
      ...wordOptions(correct, sample(COMMON, 3)),
      reviewTopics: [41, 42]
    };
  },
  // atoqli ot — kishi ismi
  () => {
    const correct = pickOne(NAMES);
    return {
      id: 'name',
      prompt: L('Qaysi soʻz kishi ismi (bosh harf bilan yoziladi)?', 'Какое слово — имя человека (с заглавной)?', "Which word is a person's name (written with a capital)?"),
      ...wordOptions(correct, sample(COMMON, 3)),
      reviewTopics: [39, 40]
    };
  },
  // atoqli ot — hayvon laqabi
  () => {
    const correct = pickOne(NICKNAMES);
    return {
      id: 'nickname',
      prompt: L('Qaysi soʻz hayvon laqabi (bosh harf bilan yoziladi)?', 'Какое слово — кличка животного (с заглавной)?', "Which word is an animal's nickname (written with a capital)?"),
      ...wordOptions(correct, sample(COMMON, 3)),
      reviewTopics: [43, 44]
    };
  },
  // bosh harf — qaysi soʻz notoʻgʻri (kichik harfli ism)
  () => {
    const name = pickOne(NAMES);
    return {
      id: 'capitalfix',
      prompt: L(`Qaysi soʻz bosh harf bilan yozilishi kerak?`, 'Какое слово нужно писать с заглавной буквы?', 'Which word must be written with a capital letter?'),
      ...wordOptions(name.toLowerCase(), sample(COMMON, 3)),
      reviewTopics: [39, 41]
    };
  },
  // soʻz turkumi — narsa (Kim?)
  () => {
    const correct = pickOne(PERSONS);
    return {
      id: 'kim',
      prompt: L('Qaysi soʻz «Kim?» soʻrogʻiga javob boʻladi?', 'Какое слово отвечает на вопрос «Кто?»?', 'Which word answers the question “Who?”?'),
      ...wordOptions(correct, sample(THINGS, 3)),
      reviewTopics: [33, 36, 37]
    };
  },
  // soʻz turkumi — narsa (Nima?)
  () => {
    const correct = pickOne(THINGS);
    return {
      id: 'nima',
      prompt: L('Qaysi soʻz «Nima?» soʻrogʻiga javob boʻladi?', 'Какое слово отвечает на вопрос «Что?»?', 'Which word answers the question “What?”?'),
      ...wordOptions(correct, sample(PERSONS, 3)),
      reviewTopics: [33, 36, 37]
    };
  },
  // koʻplik shakli
  () => {
    const w = pickOne(COMMON);
    return {
      id: 'plural',
      prompt: L(`«${w}» soʻzining koʻplik shakli qaysi?`, `Какая форма множественного числа слова «${w}»?`, `Which is the plural form of “${w}”?`),
      ...wordOptions(`${w}lar`, [w, `${w}da`, `${w}im`, `${w}ni`]),
      reviewTopics: [34, 35]
    };
  },
  // harakat soʻzi (feʼl)
  () => {
    const correct = pickOne(ACTIONS);
    return {
      id: 'action',
      prompt: L('Qaysi soʻz harakatni bildiradi (Nima qildi?)?', 'Какое слово обозначает действие (Что сделал?)?', 'Which word names an action (What did it do?)?'),
      ...wordOptions(correct, [...sample(THINGS, 2), ...sample(ATTRS, 1)]),
      reviewTopics: [46, 47, 48]
    };
  },
  // belgi soʻzi (sifat)
  () => {
    const correct = pickOne(ATTRS);
    return {
      id: 'attr',
      prompt: L('Qaysi soʻz belgini bildiradi (Qanday?)?', 'Какое слово обозначает признак (Какой?)?', 'Which word names an attribute (What kind?)?'),
      ...wordOptions(correct, [...sample(ACTIONS, 2), ...sample(THINGS, 1)]),
      reviewTopics: [49, 50, 51]
    };
  },
  // soʻz turkumini aniqlash — berilgan soʻz qaysi turkum
  () => {
    const kind = pickOne([
      { w: pickOne(THINGS), a: 'narsa', wr: ['harakat', 'belgi', 'son'] },
      { w: pickOne(ACTIONS), a: 'harakat', wr: ['narsa', 'belgi', 'son'] },
      { w: pickOne(ATTRS), a: 'belgi', wr: ['narsa', 'harakat', 'son'] }
    ]);
    return {
      id: 'turkum',
      prompt: L(`«${kind.w}» soʻzi qaysi turkumga mansub?`, `К какой группе относится слово «${kind.w}»?`, `Which kind of word is “${kind.w}”?`),
      ...wordOptions(kind.a, kind.wr),
      reviewTopics: [33, 46, 49]
    };
  },
  // zid maʼnoli soʻz (antonim)
  () => {
    const [a, b] = pickOne(ANTONYMS);
    const others = ATTRS.filter((x) => x !== a && x !== b);
    return {
      id: 'antonym',
      prompt: L(`«${a}» soʻzining zid maʼnolisi qaysi?`, `Какое слово противоположно слову «${a}»?`, `Which word is the opposite of “${a}”?`),
      ...wordOptions(b, sample(others, 3)),
      reviewTopics: [49, 51]
    };
  },
  // unli harf
  () => {
    const correct = pickOne(VOWELS);
    return {
      id: 'vowel',
      prompt: L('Qaysi harf unli?', 'Какая буква гласная?', 'Which letter is a vowel?'),
      ...wordOptions(correct, sample(CONSONANTS, 3)),
      reviewTopics: [8, 9, 11]
    };
  },
  // undosh harf
  () => {
    const correct = pickOne(CONSONANTS);
    return {
      id: 'consonant',
      prompt: L('Qaysi harf undosh?', 'Какая буква согласная?', 'Which letter is a consonant?'),
      ...wordOptions(correct, sample(VOWELS, 3)),
      reviewTopics: [13]
    };
  },
  // boʻgʻin soni
  () => {
    const [w, n] = pickOne(SYLLABLES);
    const wrong = [1, 2, 3, 4].filter((x) => x !== n).map(String);
    return {
      id: 'syll',
      prompt: L(`«${w}» soʻzida nechta boʻgʻin bor?`, `Сколько слогов в слове «${w}»?`, `How many syllables are in “${w}”?`),
      ...wordOptions(String(n), wrong),
      reviewTopics: [22, 23]
    };
  },
  // harf soni
  () => {
    const [w, n] = pickOne(LETTERS_COUNT);
    const wrong = [n + 1, n - 1, n + 2].map(String);
    return {
      id: 'letters',
      prompt: L(`«${w}» soʻzida nechta harf bor?`, `Сколько букв в слове «${w}»?`, `How many letters are in “${w}”?`),
      ...wordOptions(String(n), wrong),
      reviewTopics: [4, 5]
    };
  },
  // unli tovush soni
  () => {
    const [w, n] = pickOne(VOWELS_COUNT);
    const wrong = [n + 1, n + 2, Math.max(0, n - 1)].map(String);
    return {
      id: 'vcount',
      prompt: L(`«${w}» soʻzida nechta unli tovush bor?`, `Сколько гласных звуков в слове «${w}»?`, `How many vowels are in the word “${w}”?`),
      ...wordOptions(String(n), wrong),
      reviewTopics: [8, 11]
    };
  },
  // alifbo tartibi
  () => {
    const four = sample(['a', 'b', 'd', 'e', 'g', 'k', 'm', 'o', 'r', 's', 't'], 4).sort();
    const first = four[0];
    return {
      id: 'alpha',
      prompt: L(`Alifboda qaysi harf birinchi keladi? (${four.join(', ')})`, `Какая буква идёт первой в алфавите? (${four.join(', ')})`, `Which letter comes first in the alphabet? (${four.join(', ')})`),
      ...wordOptions(first, four.slice(1)),
      reviewTopics: [6]
    };
  },
  // gap oxiridagi tinish belgisi
  () => {
    const kind = pickOne([
      { s: pickOne(SENT_STATEMENT), a: '.' },
      { s: pickOne(SENT_QUESTION), a: '?' },
      { s: pickOne(SENT_EXCLAIM), a: '!' }
    ]);
    return {
      id: 'punct',
      prompt: L(`«${kind.s}…» gapi oxiriga qaysi belgi qoʻyiladi?`, `Какой знак ставится в конце: «${kind.s}…»?`, `Which mark ends the sentence “${kind.s}…”?`),
      ...wordOptions(kind.a, ['.', '?', '!', ','].filter((x) => x !== kind.a)),
      reviewTopics: [30, 31]
    };
  },
  // sanoq soʻzi (Necha?)
  () => {
    const correct = pickOne(COUNTS);
    return {
      id: 'sanoq',
      prompt: L('Qaysi soʻz sanoqni bildiradi (Necha?)?', 'Какое слово обозначает счёт (Сколько?)?', 'Which word is a counting word (How many?)?'),
      ...wordOptions(correct, sample(ORDINALS, 3)),
      reviewTopics: [53]
    };
  },
  // tartib soʻzi (Nechanchi?)
  () => {
    const correct = pickOne(ORDINALS);
    return {
      id: 'tartib',
      prompt: L('Qaysi soʻz tartibni bildiradi (Nechanchi?)?', 'Какое слово обозначает порядок (Который?)?', 'Which word is an order word (Which one?)?'),
      ...wordOptions(correct, sample(COUNTS, 3)),
      reviewTopics: [53, 55]
    };
  },
  // -ta / nafar (odam sanogʻi)
  () => {
    const n = pickOne(COUNTS);
    return {
      id: 'nafar',
      prompt: L('Odamlarni sanashda qaysi birikma toʻgʻri?', 'Какое сочетание верно при счёте людей?', 'Which phrase is correct for counting people?'),
      ...wordOptions(`${n} nafar bola`, [`${n}ta bola`, `${n}inchi bola`, `${n}dan bola`]),
      reviewTopics: [54]
    };
  },
  // miqdor -ta (narsa sanogʻi)
  () => {
    const n = pickOne(['uch', 'besh', 'olti', 'yetti', 'oʻn']);
    const thing = pickOne(['olma', 'kitob', 'daftar', 'qalam']);
    return {
      id: 'miqdorta',
      prompt: L(`Narsani sanashda qaysi birikma toʻgʻri?`, 'Какое сочетание верно при счёте предметов?', 'Which phrase is correct for counting things?'),
      ...wordOptions(`${n}ta ${thing}`, [`${n} nafar ${thing}`, `${n}inchi ${thing}`, `${n}dan ${thing}`]),
      reviewTopics: [54]
    };
  }
];

/** Build a fresh DTM (Ona tili) practice exam: a random subset of the generator
 *  bank, in random order, with each question's options reshuffled. */
export function buildOnaDtmExam(): ExamQuestion[] {
  return shuffle(GENERATORS)
    .slice(0, ONA_DTM_COUNT)
    .map((gen, i) => {
      const q = gen();
      return { ...q, id: `q${i + 1}-${q.id}` };
    });
}

export const ONA_DTM_EXAM_CONFIG: ExamConfig = {
  title: ONA_DTM_TITLE,
  intro: ONA_DTM_INTRO,
  minutes: ONA_DTM_MINUTES,
  count: ONA_DTM_COUNT,
  build: buildOnaDtmExam,
  logoSrc: '/dtm-logo.png',
  topicKey: ONA_DTM_EXAM_KEY
};
