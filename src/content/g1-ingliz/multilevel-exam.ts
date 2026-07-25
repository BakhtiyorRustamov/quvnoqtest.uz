import type { L10n } from '@/lib/i18n-config';
import bank from '@/content/g1-ingliz/multilevel-listening.json';

/**
 * "Milliy Sertifikat Multilevelga tayyorlanish" — a four-section practice exam
 * shaped like the real CEFR Multilevel / IELTS papers (see the /multilevel
 * folder: Listening, Reading and Writing papers + a Speaking module), but VERY
 * simplified and built only from grade-1 "Ingliz tili" topics:
 *
 *   1 LISTENING — hear a short sentence (seeded TTS clip, browser-speech
 *     fallback), then choose the correct reply or answer — like the real
 *     Listening Part 1 ("You will hear some sentences… choose the correct reply").
 *   2 READING  — read a tiny text / description / gapped sentence, choose the
 *     answer — like the real Reading Parts 1–5, shrunk to grade-1 size.
 *   3 WRITING  — the real paper wants essays; here the child TYPES one word or
 *     a very short phrase ("Write ONE WORD…"), auto-checked gently.
 *   4 SPEAKING — UNGRADED warm-up questions the child answers out loud; a
 *     sample answer is shown after each one. Not counted in the score.
 *
 * Every attempt draws a fresh random subset from each section's pool, so
 * retakes differ. Graded questions carry `reviewTopics` (grade-1 Ingliz lesson
 * numbers 1–60) for the results-screen recommendations.
 */

export const INGLIZ_MULTILEVEL_KEY = 'g1-ingliz-multilevel';
export const INGLIZ_MULTILEVEL_MINUTES = 40;

/** questions drawn per section (listening, reading, writing, speaking) */
export const ML_COUNTS = { listening: 8, reading: 10, writing: 6, speaking: 4 } as const;
/** graded questions (speaking is ungraded) */
export const INGLIZ_MULTILEVEL_COUNT = ML_COUNTS.listening + ML_COUNTS.reading + ML_COUNTS.writing;

export const INGLIZ_MULTILEVEL_TITLE: L10n = {
  uz: 'Milliy Sertifikat Multilevelga tayyorlanish',
  ru: 'Подготовка к Multilevel (национальный сертификат)',
  en: 'National Certificate Multilevel preparation'
};

export const INGLIZ_MULTILEVEL_INTRO: L10n = {
  uz: 'Haqiqiy Multilevel (Milliy sertifikat) imtihoni xuddi IELTS kabi toʻrt boʻlimdan iborat: Listening, Reading, Writing va Speaking. Bu — haqiqiy imtihon EMAS, balki oʻsha toʻrt boʻlimni juda soddalashtirilgan koʻrinishda takrorlaydigan tayyorgarlik testi: faqat 1-sinf ingliz tili mavzulari. Listening — gapni tinglab, javobni tanlaysan; Reading — kichkina matnni oʻqiysan; Writing — bitta soʻz yoki juda qisqa ibora yozasan; Speaking — savollarga ovoz chiqarib javob berasan (baholanmaydi). Savollar har safar oʻzgaradi. Test soʻngida qaysi darslarni takrorlash kerakligi tavsiya qilinadi.',
  ru: 'Настоящий экзамен Multilevel (национальный сертификат), как и IELTS, состоит из четырёх секций: Listening, Reading, Writing и Speaking. Это НЕ настоящий экзамен, а тренировочный тест, повторяющий эти четыре секции в очень упрощённом виде: только темы английского 1 класса. Listening — слушаешь предложение и выбираешь ответ; Reading — читаешь маленький текст; Writing — печатаешь одно слово или очень короткую фразу; Speaking — отвечаешь на вопросы вслух (не оценивается). Вопросы меняются каждый раз. В конце будет рекомендовано, какие уроки повторить.',
  en: 'The real Multilevel (National Certificate) exam, like IELTS, has four sections: Listening, Reading, Writing and Speaking. This is NOT the real exam — it is a practice test that mirrors those four sections in a very simplified way, using only grade-1 English topics. Listening: hear a sentence and choose the answer. Reading: read a tiny text. Writing: type one word or a very short phrase. Speaking: answer questions out loud (not graded). The questions change every time. At the end it recommends which lessons to review.'
};

/* ------------------------------- types ------------------------------- */
export type MLSectionId = 'listening' | 'reading' | 'writing' | 'speaking';

export type MLChoiceQuestion = {
  kind: 'listen' | 'read';
  id: string;
  /** for 'listen': the spoken sentence + its seeded-clip key/voice */
  audio?: { key: string; text: string; voice?: string };
  prompt: L10n;
  choices: L10n[];
  answerIndex: number;
  reviewTopics: number[];
};

export type MLWriteQuestion = {
  kind: 'write';
  id: string;
  prompt: L10n;
  /** normalized accepted answers (first one is shown in the review) */
  answers: string[];
  reviewTopics: number[];
};

export type MLSpeakQuestion = {
  kind: 'speak';
  id: string;
  audio?: { key: string; text: string; voice?: string };
  prompt: L10n;
  sample: string;
};

export type MLQuestion = MLChoiceQuestion | MLWriteQuestion | MLSpeakQuestion;

export type MLSection = {
  id: MLSectionId;
  title: L10n;
  /** paper-style instruction shown on the section splash screen */
  instruction: L10n;
  questions: MLQuestion[];
};

/* ----------------------------- helpers ----------------------------- */
const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });
/** English-only content — identical in every locale (it IS the exam language). */
const E = (s: string): L10n => ({ uz: s, ru: s, en: s });

function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

/** 4 shuffled English options from a correct answer + 3 wrong ones. */
function opts(correct: string, wrong: string[]): { choices: L10n[]; answerIndex: number } {
  const picked = shuffle([{ v: correct, ok: true }, ...wrong.slice(0, 3).map((v) => ({ v, ok: false }))]);
  return { choices: picked.map((o) => E(o.v)), answerIndex: picked.findIndex((o) => o.ok) };
}

/** Normalize a typed answer: lowercase, trim, strip punctuation, squash spaces. */
export function normalizeWritten(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[.,!?;:"«»()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ========================= 1 · LISTENING bank ========================= */
type ListenItem = {
  kind: 'reply' | 'question';
  audio: { key: string; text: string; voice?: string };
  question?: string;
  correct: string;
  wrong: string[];
  topics: number[];
};

const LISTEN_PROMPT_REPLY = L(
  'Gapni tingla. Eng toʻgʻri JAVOBNI tanla.',
  'Прослушай предложение. Выбери правильный ОТВЕТ на него.',
  'Listen to the sentence. Choose the correct reply.'
);

const LISTENING_BANK: ListenItem[] = (bank as { listening: ListenItem[] }).listening;

const LISTENING_GENS = LISTENING_BANK.map((it, i) => (): MLChoiceQuestion => ({
  kind: 'listen',
  id: `listen-${String(i + 1).padStart(2, '0')}`,
  audio: it.audio,
  prompt:
    it.kind === 'reply'
      ? LISTEN_PROMPT_REPLY
      : {
          uz: `Gapni tingla va savolga javob ber:\n${it.question}`,
          ru: `Прослушай предложение и ответь на вопрос:\n${it.question}`,
          en: `Listen to the sentence and answer the question:\n${it.question}`
        },
  ...opts(it.correct, it.wrong),
  reviewTopics: it.topics
}));

/* ========================== 2 · READING bank ========================== */
const READ_TEXT = L('Matnni oʻqib, savolga javob ber.', 'Прочитай текст и ответь на вопрос.', 'Read the text and answer the question.');
const READ_MATCH = L('Taʼrifni oʻqi va unga mos soʻzni top.', 'Прочитай описание и найди подходящее слово.', 'Read the description and find the matching word.');
const READ_GAP = L('Gapni oʻqi. Boʻshliqqa mos BITTA soʻzni tanla.', 'Прочитай предложение. Выбери ОДНО слово для пропуска.', 'Read the sentence. Choose ONE word for the gap.');

const rp = (instruction: L10n, body: string): L10n => ({
  uz: `${instruction.uz}\n\n${body}`,
  ru: `${instruction.ru}\n\n${body}`,
  en: `${instruction.en}\n\n${body}`
});

const AGES = ['six', 'seven', 'eight', 'nine'];

type ReadStatic = { id: string; instruction: L10n; body: string; correct: string; wrong: string[]; topics: number[] };

const READING_STATIC: ReadStatic[] = [
  // --- tiny texts ---
  { id: 'tom', instruction: READ_TEXT, body: 'This is Tom. He has a blue car and a green ball.\n\nWhat color is the ball?', correct: 'green', wrong: ['blue', 'red', 'yellow'], topics: [1, 6, 13] },
  { id: 'bek', instruction: READ_TEXT, body: 'I am Bek. I like apples and bananas. I do not like onions.\n\nWhat does Bek like?', correct: 'apples and bananas', wrong: ['onions', 'cars and dolls', 'cats and dogs'], topics: [37, 38] },
  { id: 'lola', instruction: READ_TEXT, body: 'My family is big. This is my mother, my father and my little sister Lola.\n\nWho is Lola?', correct: 'my sister', wrong: ['my mother', 'my brother', 'my grandpa'], topics: [19, 20] },
  { id: 'monkey', instruction: READ_TEXT, body: 'Look at the monkey! It is small and brown. It can climb and jump.\n\nWhat can the monkey do?', correct: 'climb and jump', wrong: ['swim and fly', 'cook and read', 'sing and write'], topics: [43, 44, 49] },
  { id: 'plov', instruction: READ_TEXT, body: 'I am in the kitchen with my grandma. We cook plov.\n\nWhere am I?', correct: 'in the kitchen', wrong: ['in the bathroom', 'in the bedroom', 'at school'], topics: [25, 26] },
  { id: 'fingers', instruction: READ_TEXT, body: 'I have two eyes, one nose and ten fingers.\n\nHow many fingers do I have?', correct: 'ten', wrong: ['two', 'one', 'five'], topics: [2, 31, 32] },
  { id: 'dog', instruction: READ_TEXT, body: 'My cat is white. My dog is black.\n\nWhat color is my dog?', correct: 'black', wrong: ['white', 'orange', 'pink'], topics: [1, 6, 49] },
  // --- match a description to a word ---
  { id: 'bedroom', instruction: READ_MATCH, body: '«You sleep in this room.»', correct: 'bedroom', wrong: ['kitchen', 'bathroom', 'school'], topics: [25, 26] },
  { id: 'elephant', instruction: READ_MATCH, body: '«This animal is very big and grey.»', correct: 'elephant', wrong: ['ant', 'cat', 'fish'], topics: [41, 49, 50] },
  { id: 'ball', instruction: READ_MATCH, body: '«It is a toy. You throw it and catch it.»', correct: 'ball', wrong: ['doll', 'book', 'sock'], topics: [13, 14] },
  { id: 'banana', instruction: READ_MATCH, body: '«This fruit is long and yellow.»', correct: 'banana', wrong: ['apple', 'egg', 'milk'], topics: [37, 38] },
  { id: 'fish', instruction: READ_MATCH, body: '«This animal lives in water and can swim.»', correct: 'fish', wrong: ['lion', 'hen', 'panda'], topics: [49, 54] },
  { id: 'teacher', instruction: READ_MATCH, body: '«She helps you learn at school.»', correct: 'teacher', wrong: ['doctor', 'baby', 'lizard'], topics: [7, 10] },
  // --- one-word gaps ---
  { id: 'gap-banana', instruction: READ_GAP, body: 'The banana is ___.', correct: 'yellow', wrong: ['red', 'blue', 'purple'], topics: [1, 6] },
  { id: 'gap-count', instruction: READ_GAP, body: 'One, two, three, ___.', correct: 'four', wrong: ['six', 'ten', 'eight'], topics: [2, 8] },
  { id: 'gap-pencil', instruction: READ_GAP, body: 'I write with a ___.', correct: 'pencil', wrong: ['bag', 'door', 'sofa'], topics: [7] },
  { id: 'gap-eyes', instruction: READ_GAP, body: 'I see with my ___.', correct: 'eyes', wrong: ['ears', 'legs', 'hands'], topics: [31, 36] },
  { id: 'gap-grandma', instruction: READ_GAP, body: 'She is my mother’s mother. She is my ___.', correct: 'grandma', wrong: ['brother', 'sister', 'father'], topics: [19, 20] },
  { id: 'gap-lion', instruction: READ_GAP, body: 'The ___ is the king of the animals.', correct: 'lion', wrong: ['fish', 'ant', 'frog'], topics: [49, 52] }
];

const READING_GENS: Array<() => MLChoiceQuestion> = [
  // one dynamic mini-text (age changes every attempt)
  () => {
    const age = AGES[Math.floor(Math.random() * AGES.length)];
    return {
      kind: 'read',
      id: 'read-aziza',
      prompt: rp(READ_TEXT, `My name is Aziza. I am ${age}. I have a red kite and two dolls.\n\nHow old is Aziza?`),
      ...opts(age, AGES.filter((a) => a !== age)),
      reviewTopics: [2, 10, 13]
    };
  },
  ...READING_STATIC.map((it) => (): MLChoiceQuestion => ({
    kind: 'read',
    id: `read-${it.id}`,
    prompt: rp(it.instruction, it.body),
    ...opts(it.correct, it.wrong),
    reviewTopics: it.topics
  }))
];

/* ========================== 3 · WRITING bank ========================== */
/** The real Writing paper wants essays; here it is "write ONE word / a very
 *  short phrase", typed and checked gently (case/punctuation ignored).
 *  Every item shows a 💡 letter scaffold ("y _ _ _ _ _") so the expected word
 *  is unambiguous — the scaffold's first answer is what the hint spells. */
type WriteItem = { id: string; body: string; hint: string; answers: string[]; topics: number[] };

const WRITE_INSTR = L(
  'BITTA soʻz YOZ. 💡 — birinchi harf va harflar soni.',
  'НАПЕЧАТАЙ ОДНО слово. 💡 — первая буква и число букв.',
  'WRITE ONE word. 💡 shows the first letter and the number of letters.'
);

/** "yellow" → "y _ _ _ _ _" */
const scaffold = (w: string) => w[0] + w.slice(1).replace(/[a-z]/gi, ' _');

const WRITING_BANK: WriteItem[] = [
  { id: 'am', body: 'I ___ seven years old.', hint: scaffold('am'), answers: ['am'], topics: [2, 10] },
  { id: 'banana-color', body: 'What color is a banana? 🍌 Write the color.', hint: scaffold('yellow'), answers: ['yellow'], topics: [1, 6, 37] },
  { id: 'ten', body: 'Write the number 10 as a word.', hint: scaffold('ten'), answers: ['ten'], topics: [2, 8] },
  { id: 'four', body: 'Write the number 4 as a word.', hint: scaffold('four'), answers: ['four'], topics: [2, 8] },
  { id: 'small', body: 'The elephant is big. The ant is ___.', hint: scaffold('small'), answers: ['small', 'little'], topics: [50, 52, 58] },
  { id: 'count', body: 'One, two, three, ___. Write the next number word.', hint: scaffold('four'), answers: ['four'], topics: [2, 8] },
  { id: 'eyes', body: 'I see with my ___.', hint: scaffold('eyes'), answers: ['eyes', 'eye'], topics: [31, 36] },
  { id: 'morning', body: 'It is morning. Complete the greeting: «Good ___, teacher!»', hint: scaffold('morning'), answers: ['morning'], topics: [1, 7] },
  { id: 'grandma', body: 'She is my mother’s mother. She is my ___.', hint: scaffold('grandma'), answers: ['grandma', 'grandmother', 'granny'], topics: [19, 20] },
  { id: 'bedroom', body: 'You sleep in this room. It is your ___.', hint: scaffold('bedroom'), answers: ['bedroom', 'bed room'], topics: [25, 26] },
  { id: 'hello', body: 'Your friend says «Hello!». Say hello back — write the greeting word.', hint: scaffold('hello'), answers: ['hello', 'hi', 'hey'], topics: [1, 10] },
  { id: 'can', body: 'I ___ run and jump.', hint: scaffold('can'), answers: ['can'], topics: [43, 44, 57] }
];

const WRITING_GENS = WRITING_BANK.map((it) => (): MLWriteQuestion => ({
  kind: 'write',
  id: `write-${it.id}`,
  prompt: rp(WRITE_INSTR, `${it.body}\n\n💡 ${it.hint}`),
  answers: it.answers,
  reviewTopics: it.topics
}));

/* ========================== 4 · SPEAKING bank ========================== */
type SpeakItem = { audio: { key: string; text: string; voice?: string }; sample: string };

const SPEAK_INSTR = L(
  'Savolga OVOZ CHIQARIB javob ber. Bu boʻlim baholanmaydi!',
  'Ответь на вопрос ВСЛУХ. Эта секция не оценивается!',
  'Answer the question OUT LOUD. This section is not graded!'
);

const SPEAKING_BANK: SpeakItem[] = (bank as { speaking: SpeakItem[] }).speaking;

const SPEAKING_GENS = SPEAKING_BANK.map((it, i) => (): MLSpeakQuestion => ({
  kind: 'speak',
  id: `speak-${String(i + 1).padStart(2, '0')}`,
  audio: it.audio,
  prompt: rp(SPEAK_INSTR, it.audio.text),
  sample: it.sample
}));

/* ------------------------------ builder ------------------------------ */
const SECTION_META: Record<MLSectionId, { title: L10n; instruction: L10n }> = {
  listening: {
    title: L('1-boʻlim · LISTENING (Tinglash)', 'Секция 1 · LISTENING (Аудирование)', 'Section 1 · LISTENING'),
    instruction: L(
      'Xuddi haqiqiy imtihondagidek: gapni tinglaysan va toʻgʻri javobni tanlaysan. 🔊 tugmasini bosib, gapni istagancha qayta tinglashing mumkin. Agar ovoz chiqmasa, «Matnni koʻrish» tugmasi yordam beradi.',
      'Как на настоящем экзамене: слушаешь предложение и выбираешь правильный ответ. Нажимай 🔊, чтобы слушать сколько угодно раз. Если звука нет, поможет кнопка «Показать текст».',
      'Just like the real exam: listen to a sentence and choose the correct answer. Tap 🔊 to listen as many times as you like. If there is no sound, the “Show text” button will help.'
    )
  },
  reading: {
    title: L('2-boʻlim · READING (Oʻqish)', 'Секция 2 · READING (Чтение)', 'Section 2 · READING'),
    instruction: L(
      'Kichkina matn yoki gapni oʻqib, toʻgʻri javobni tanlaysan.',
      'Читаешь маленький текст или предложение и выбираешь правильный ответ.',
      'Read a tiny text or sentence and choose the correct answer.'
    )
  },
  writing: {
    title: L('3-boʻlim · WRITING (Yozish)', 'Секция 3 · WRITING (Письмо)', 'Section 3 · WRITING'),
    instruction: L(
      'Haqiqiy imtihonda insho yoziladi. Bu yerda esa faqat BITTA soʻz yoki juda qisqa ibora yozasan. Katta-kichik harf muhim emas.',
      'На настоящем экзамене пишут эссе. Здесь ты печатаешь только ОДНО слово или очень короткую фразу. Большие и маленькие буквы не важны.',
      'In the real exam you write essays. Here you type just ONE word or a very short phrase. Capital letters do not matter.'
    )
  },
  speaking: {
    title: L('4-boʻlim · SPEAKING (Gapirish)', 'Секция 4 · SPEAKING (Говорение)', 'Section 4 · SPEAKING'),
    instruction: L(
      'Savollarga ovoz chiqarib javob ber — xuddi imtihondagi suhbat kabi. Bu boʻlim BAHOLANMAYDI, bu shunchaki mashq! Javobingdan soʻng namuna javobni koʻrasan.',
      'Отвечай на вопросы вслух — как на устной части экзамена. Эта секция НЕ оценивается, это просто практика! После ответа увидишь образец.',
      'Answer the questions out loud — like the exam interview. This section is NOT graded, it is just practice! After you answer, you will see a sample answer.'
    )
  }
};

/** Build a fresh four-section test (8 listening + 10 reading + 6 writing
 *  graded questions, then 4 ungraded speaking questions), randomized per
 *  attempt. */
export function buildInglizMultilevelExam(): MLSection[] {
  const pickFrom = <T,>(pool: Array<() => T>, n: number): T[] => shuffle(pool).slice(0, n).map((gen) => gen());
  const make = (id: MLSectionId, questions: MLQuestion[]): MLSection => ({ id, ...SECTION_META[id], questions });
  return [
    make('listening', pickFrom<MLQuestion>(LISTENING_GENS, ML_COUNTS.listening)),
    make('reading', pickFrom<MLQuestion>(READING_GENS, ML_COUNTS.reading)),
    make('writing', pickFrom<MLQuestion>(WRITING_GENS, ML_COUNTS.writing)),
    make('speaking', pickFrom<MLQuestion>(SPEAKING_GENS, ML_COUNTS.speaking))
  ];
}
