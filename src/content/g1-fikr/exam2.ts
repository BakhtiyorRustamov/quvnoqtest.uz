import type { L10n } from '@/lib/i18n-config';
import type { ExamConfig, ExamQuestion } from '@/content/g1-math/exam';

/**
 * "Fikrlash qobiliyatini baholash — 2-test" — a SECOND grade-1 thinking-skills
 * practice test. Where test 1 leans on shape/number figures, this one is pure
 * VERBAL LOGICAL REASONING (no arithmetic — maths lives in the Matematika
 * subject). Question styles are inspired by the Presidential-School / UCLES
 * "Fikrlash Qobiliyatini baholash" booklet — critical thinking (which statement
 * supports a claim), if–then reasoning, syllogisms/classification, analogies,
 * transitive ordering, natural sequences and cause–effect — but scaled to grade
 * 1 with original, kid-friendly items. Each generator draws from a pool and
 * shuffles its options, and every attempt uses a random subset in random order,
 * so retakes give a different test.
 */

export const G1_FIKR2_EXAM_KEY = 'g1-fikr-exam-2';
export const FIKR2_MINUTES = 20;
export const FIKR2_COUNT = 10;

export const FIKR2_TITLE: L10n = {
  uz: 'Fikrlash qobiliyatini baholash 2-test',
  ru: 'Оценка мышления — тест 2',
  en: 'Thinking assessment — test 2'
};

export const FIKR2_INTRO: L10n = {
  uz: 'Bu — fikrlash qobiliyatini baholovchi ikkinchi mashq testi. Bu yerda hisob-kitob yoʻq — faqat mantiqiy fikrlash: ortiqchani topish, oʻxshatishlar, «agar… unda…» xulosalar, tartib va sabab-oqibat. 10 ta savol, 20 daqiqa. Har safar savollar oʻzgaradi — istagancha mashq qilishing mumkin.',
  ru: 'Это второй тренировочный тест на мышление. Здесь нет вычислений — только логика: найти лишнее, аналогии, выводы «если… то…», порядок и причина-следствие. 10 вопросов, 20 минут. Вопросы меняются каждый раз — тренируйся сколько хочешь.',
  en: 'This is a second thinking-skills practice test. No arithmetic here — only logical reasoning: odd-one-out, analogies, “if… then…” conclusions, ordering and cause–effect. 10 questions, 20 minutes. The questions change every time, so keep practising.'
};

/* ----------------------------- helpers ----------------------------- */
const pickOne = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });

function shuffle<T>(a: T[]): T[] {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

/** 4 options from a correct L10n + 3 wrong L10n, shuffled. */
function wordOptions(correct: L10n, wrong: L10n[]): { choices: L10n[]; answerIndex: number } {
  const opts = shuffle([{ v: correct, ok: true }, ...wrong.slice(0, 3).map((v) => ({ v, ok: false }))]);
  return { choices: opts.map((o) => o.v), answerIndex: opts.findIndex((o) => o.ok) };
}

const CANT = L('Aniqlab boʻlmaydi', 'Нельзя определить', "Can't tell");

/* --------------------------- question bank --------------------------- */
type Gen = () => ExamQuestion;

const GENERATORS: Gen[] = [
  // 1 — odd one out by CATEGORY (words, not shapes)
  () => {
    const sets = [
      { odd: L('sabzi', 'морковь', 'carrot'), rest: [L('olma', 'яблоко', 'apple'), L('nok', 'груша', 'pear'), L('banan', 'банан', 'banana')] },
      { odd: L('stol', 'стол', 'table'), rest: [L('it', 'собака', 'dog'), L('mushuk', 'кошка', 'cat'), L('ot', 'конь', 'horse')] },
      { odd: L('katta', 'большой', 'big'), rest: [L('qizil', 'красный', 'red'), L('koʻk', 'синий', 'blue'), L('yashil', 'зелёный', 'green')] },
      { odd: L('yanvar', 'январь', 'January'), rest: [L('dushanba', 'понедельник', 'Monday'), L('seshanba', 'вторник', 'Tuesday'), L('juma', 'пятница', 'Friday')] },
      { odd: L('stul', 'стул', 'chair'), rest: [L('bosh', 'голова', 'head'), L('qoʻl', 'рука', 'hand'), L('oyoq', 'нога', 'leg')] },
      { odd: L('kartoshka', 'картошка', 'potato'), rest: [L('olma', 'яблоко', 'apple'), L('uzum', 'виноград', 'grapes'), L('anor', 'гранат', 'pomegranate')] }
    ];
    const s = pickOne(sets);
    return {
      id: 'odd',
      prompt: L('Qaysi biri ortiqcha?', 'Какое слово лишнее?', 'Which one does not belong?'),
      ...wordOptions(s.odd, s.rest),
      reviewTopics: []
    };
  },
  // 2 — analogy (relation between a pair)
  () => {
    const sets = [
      { a: L('Qush', 'Птица', 'A bird'), b: L('uchadi', 'летает', 'flies'), c: L('Baliq', 'Рыба', 'A fish'), ans: L('suzadi', 'плавает', 'swims'), wrong: [L('yuguradi', 'бегает', 'runs'), L('sakraydi', 'прыгает', 'jumps'), L('uchadi', 'летает', 'flies')] },
      { a: L('It', 'Собака', 'A dog'), b: L('vovullaydi', 'лает', 'barks'), c: L('Mushuk', 'Кошка', 'A cat'), ans: L('miyovlaydi', 'мяукает', 'meows'), wrong: [L('sayraydi', 'поёт', 'sings'), L('maʼraydi', 'блеет', 'bleats'), L('vovullaydi', 'лает', 'barks')] },
      { a: L('Ari', 'Пчела', 'A bee'), b: L('asal', 'мёд', 'honey'), c: L('Sigir', 'Корова', 'A cow'), ans: L('sut', 'молоко', 'milk'), wrong: [L('tuxum', 'яйцо', 'an egg'), L('yun', 'шерсть', 'wool'), L('non', 'хлеб', 'bread')] },
      { a: L('Kun', 'День', 'Day'), b: L('yorugʻ', 'светлый', 'bright'), c: L('Tun', 'Ночь', 'Night'), ans: L('qorongʻi', 'тёмная', 'dark'), wrong: [L('issiq', 'жаркая', 'hot'), L('baland', 'высокая', 'high'), L('yorugʻ', 'светлая', 'bright')] },
      { a: L('Qoʻl', 'Рука', 'A hand'), b: L('qoʻlqop', 'перчатка', 'a glove'), c: L('Oyoq', 'Нога', 'A foot'), ans: L('paypoq', 'носок', 'a sock'), wrong: [L('shapka', 'шапка', 'a hat'), L('koʻzoynak', 'очки', 'glasses'), L('sharf', 'шарф', 'a scarf')] }
    ];
    const s = pickOne(sets);
    return {
      id: 'analogy',
      prompt: L(
        `«${s.a.uz} — ${s.b.uz}» boʻlsa, «${s.c.uz} — ?». Mos soʻzni tanla.`,
        `Если «${s.a.ru} — ${s.b.ru}», то «${s.c.ru} — ?». Выбери слово.`,
        `If “${s.a.en} — ${s.b.en}”, then “${s.c.en} — ?”. Choose the word.`
      ),
      ...wordOptions(s.ans, s.wrong),
      reviewTopics: []
    };
  },
  // 3 — syllogism / classification ("all A are B; x is A; what is x?")
  () => {
    const sets = [
      { p: L('Barcha itlar — hayvon. Rex — it.', 'Все собаки — животные. Рекс — собака.', 'All dogs are animals. Rex is a dog.'), q: L('Rex nima?', 'Кто Рекс?', 'What is Rex?'), ans: L('Hayvon', 'Животное', 'An animal'), wrong: [L('Oʻsimlik', 'Растение', 'A plant'), L('Mashina', 'Машина', 'A car'), L('Qush', 'Птица', 'A bird')] },
      { p: L('Barcha atirgullar — gul. Bu — atirgul.', 'Все розы — цветы. Это роза.', 'All roses are flowers. This is a rose.'), q: L('Bu nima?', 'Что это?', 'What is this?'), ans: L('Gul', 'Цветок', 'A flower'), wrong: [L('Daraxt', 'Дерево', 'A tree'), L('Meva', 'Фрукт', 'A fruit'), L('Hayvon', 'Животное', 'An animal')] },
      { p: L('Barcha baliqlar suvda yashaydi. Laqqa — baliq.', 'Все рыбы живут в воде. Сом — рыба.', 'All fish live in water. A catfish is a fish.'), q: L('Laqqa qayerda yashaydi?', 'Где живёт сом?', 'Where does a catfish live?'), ans: L('Suvda', 'В воде', 'In water'), wrong: [L('Havoda', 'В воздухе', 'In the air'), L('Daraxtda', 'На дереве', 'In a tree'), L('Choʻlda', 'В пустыне', 'In a desert')] },
      { p: L('Hamma qushlar uchadi. Chumchuq — qush.', 'Все птицы летают. Воробей — птица.', 'All birds fly. A sparrow is a bird.'), q: L('Chumchuq nima qila oladi?', 'Что умеет воробей?', 'What can a sparrow do?'), ans: L('Ucha oladi', 'Умеет летать', 'It can fly'), wrong: [L('Suza oladi', 'Умеет плавать', 'It can swim'), L('Gapira oladi', 'Умеет говорить', 'It can talk'), L('Yoza oladi', 'Умеет писать', 'It can write')] }
    ];
    const s = pickOne(sets);
    return {
      id: 'syllogism',
      prompt: L(`${s.p.uz} ${s.q.uz}`, `${s.p.ru} ${s.q.ru}`, `${s.p.en} ${s.q.en}`),
      ...wordOptions(s.ans, s.wrong),
      reviewTopics: []
    };
  },
  // 4 — if–then reasoning
  () => {
    const sets = [
      { p: L('Agar yomgʻir yogʻsa, Dilnoza soyabon oladi. Bugun yomgʻir yogʻdi.', 'Если идёт дождь, Дилноза берёт зонт. Сегодня идёт дождь.', 'If it rains, Dilnoza takes an umbrella. Today it is raining.'), q: L('Dilnoza nima qiladi?', 'Что сделает Дилноза?', 'What does Dilnoza do?'), ans: L('Soyabon oladi', 'Берёт зонт', 'Takes an umbrella'), wrong: [L('Uyda qoladi', 'Остаётся дома', 'Stays home'), L('Uxlaydi', 'Спит', 'Sleeps'), CANT] },
      { p: L('Agar dars boʻlsa, Aziz maktabga boradi. Bugun dars bor.', 'Если есть урок, Азиз идёт в школу. Сегодня урок есть.', 'If there is a lesson, Aziz goes to school. Today there is a lesson.'), q: L('Aziz nima qiladi?', 'Что сделает Азиз?', 'What does Aziz do?'), ans: L('Maktabga boradi', 'Идёт в школу', 'Goes to school'), wrong: [L('Uyda qoladi', 'Остаётся дома', 'Stays home'), L('Oʻynaydi', 'Играет', 'Plays'), CANT] },
      { p: L('Agar muzqaymoq issiqda qolsa, u eriydi. Muzqaymoq issiqda qoldi.', 'Если мороженое оставить в тепле, оно тает. Мороженое осталось в тепле.', 'If ice cream is left in the heat, it melts. The ice cream was left in the heat.'), q: L('Nima boʻladi?', 'Что произойдёт?', 'What happens?'), ans: L('Eriydi', 'Тает', 'It melts'), wrong: [L('Muzlaydi', 'Замерзает', 'It freezes'), L('Kattalashadi', 'Растёт', 'It grows'), CANT] },
      { p: L('Agar chiroq oʻchsa, xona qorongʻi boʻladi. Chiroq oʻchdi.', 'Если выключить свет, в комнате темно. Свет выключили.', 'If the light goes off, the room gets dark. The light went off.'), q: L('Xona qanday boʻladi?', 'Какой станет комната?', 'What is the room like?'), ans: L('Qorongʻi', 'Тёмная', 'Dark'), wrong: [L('Yorugʻ', 'Светлая', 'Bright'), L('Issiq', 'Тёплая', 'Warm'), CANT] }
    ];
    const s = pickOne(sets);
    return {
      id: 'ifthen',
      prompt: L(`${s.p.uz} ${s.q.uz}`, `${s.p.ru} ${s.q.ru}`, `${s.p.en} ${s.q.en}`),
      ...wordOptions(s.ans, s.wrong),
      reviewTopics: []
    };
  },
  // 5 — transitive ordering (height / age / speed), no numbers
  () => {
    const sets = [
      { p: L('Aziz Bobordan baland, Bobur Karimdan baland.', 'Азиз выше Бобура, а Бобур выше Карима.', 'Aziz is taller than Bobur, and Bobur is taller than Karim.'), most: L('Kim eng baland?', 'Кто самый высокий?', 'Who is the tallest?'), a: L('Aziz', 'Азиз', 'Aziz'), least: L('Kim eng past?', 'Кто самый низкий?', 'Who is the shortest?'), c: L('Karim', 'Карим', 'Karim'), mid: L('Bobur', 'Бобур', 'Bobur') },
      { p: L('Ot quyondan tez, quyon toshbaqadan tez.', 'Конь быстрее зайца, а заяц быстрее черепахи.', 'A horse is faster than a rabbit, and a rabbit is faster than a tortoise.'), most: L('Kim eng tez?', 'Кто самый быстрый?', 'Who is the fastest?'), a: L('Ot', 'Конь', 'The horse'), least: L('Kim eng sekin?', 'Кто самый медленный?', 'Who is the slowest?'), c: L('Toshbaqa', 'Черепаха', 'The tortoise'), mid: L('Quyon', 'Заяц', 'The rabbit') },
      { p: L('Buvi onadan katta, ona esa qizdan katta.', 'Бабушка старше мамы, а мама старше дочки.', 'Grandma is older than mum, and mum is older than the girl.'), most: L('Kim eng katta?', 'Кто старший?', 'Who is the oldest?'), a: L('Buvi', 'Бабушка', 'Grandma'), least: L('Kim eng kichik?', 'Кто младший?', 'Who is the youngest?'), c: L('Qiz', 'Дочка', 'The girl'), mid: L('Ona', 'Мама', 'Mum') }
    ];
    const s = pickOne(sets);
    const askMost = Math.random() < 0.5;
    return {
      id: 'order',
      prompt: L(`${s.p.uz} ${askMost ? s.most.uz : s.least.uz}`, `${s.p.ru} ${askMost ? s.most.ru : s.least.ru}`, `${s.p.en} ${askMost ? s.most.en : s.least.en}`),
      ...wordOptions(askMost ? s.a : s.c, [askMost ? s.c : s.a, s.mid, CANT]),
      reviewTopics: []
    };
  },
  // 6 — natural sequence: what comes next
  () => {
    const sets = [
      { seq: [L('bahor', 'весна', 'spring'), L('yoz', 'лето', 'summer'), L('kuz', 'осень', 'autumn')], next: L('qish', 'зима', 'winter'), wrong: [L('bahor', 'весна', 'spring'), L('yoz', 'лето', 'summer'), L('kun', 'день', 'day')] },
      { seq: [L('urugʻ', 'семя', 'a seed'), L('nihol', 'росток', 'a sprout'), L('daraxt', 'дерево', 'a tree')], next: L('meva', 'плод', 'fruit'), wrong: [L('urugʻ', 'семя', 'a seed'), L('tosh', 'камень', 'a stone'), L('suv', 'вода', 'water')] },
      { seq: [L('ertalab', 'утро', 'morning'), L('tush', 'полдень', 'noon'), L('kech', 'вечер', 'evening')], next: L('tun', 'ночь', 'night'), wrong: [L('ertalab', 'утро', 'morning'), L('yoz', 'лето', 'summer'), L('kun', 'день', 'day')] },
      { seq: [L('chaqaloq', 'малыш', 'a baby'), L('bola', 'ребёнок', 'a child'), L('oʻsmir', 'подросток', 'a teen')], next: L('kattalar', 'взрослый', 'an adult'), wrong: [L('chaqaloq', 'малыш', 'a baby'), L('qush', 'птица', 'a bird'), L('urugʻ', 'семя', 'a seed')] }
    ];
    const s = pickOne(sets);
    return {
      id: 'sequence',
      prompt: L(
        `Tartibni davom ettir: ${s.seq.map((x) => x.uz).join(' → ')} → ? Keyin nima keladi?`,
        `Продолжи ряд: ${s.seq.map((x) => x.ru).join(' → ')} → ? Что дальше?`,
        `Continue the order: ${s.seq.map((x) => x.en).join(' → ')} → ? What comes next?`
      ),
      ...wordOptions(s.next, s.wrong),
      reviewTopics: []
    };
  },
  // 7 — critical thinking: which statement SUPPORTS the claim
  () => {
    const sets = [
      {
        claim: L('«Kitob oʻqish foydali, shuning uchun har kuni kitob oʻqish kerak.»', '«Читать книги полезно, поэтому нужно читать каждый день.»', '“Reading books is useful, so we should read every day.”'),
        ans: L('Kitob bilimni oshiradi.', 'Книги дают знания.', 'Books give us knowledge.'),
        wrong: [L('Baʼzi kitoblar qimmat.', 'Некоторые книги дорогие.', 'Some books are expensive.'), L('Kitob ogʻir boʻladi.', 'Книги бывают тяжёлыми.', 'Books can be heavy.'), L('Kitobning rangi koʻk.', 'Книга синего цвета.', 'The book is blue.')]
      },
      {
        claim: L('«Sabzavot yeyish foydali, shuning uchun koʻp sabzavot yeyish kerak.»', '«Есть овощи полезно, поэтому нужно есть больше овощей.»', '“Eating vegetables is healthy, so we should eat more vegetables.”'),
        ans: L('Sabzavot organizmga vitamin beradi.', 'Овощи дают организму витамины.', 'Vegetables give the body vitamins.'),
        wrong: [L('Baʼzilar sabzavotni yoqtirmaydi.', 'Некоторые не любят овощи.', 'Some people dislike vegetables.'), L('Sabzavot arzon.', 'Овощи дешёвые.', 'Vegetables are cheap.'), L('Sabzavot yashil boʻladi.', 'Овощи бывают зелёными.', 'Vegetables can be green.')]
      },
      {
        claim: L('«Erta uxlash foydali, shuning uchun erta yotish kerak.»', '«Ложиться рано полезно, поэтому нужно рано спать.»', '“Sleeping early is good, so we should go to bed early.”'),
        ans: L('Erta uxlagan bola tetik boʻladi.', 'Кто рано спит, тот бодрый.', 'A child who sleeps early feels fresh.'),
        wrong: [L('Kechqurun televizor qiziq.', 'Вечером телевизор интересный.', 'TV is fun in the evening.'), L('Baʼzi bolalar kech yotadi.', 'Некоторые ложатся поздно.', 'Some children sleep late.'), L('Yostiq yumshoq boʻladi.', 'Подушка мягкая.', 'The pillow is soft.')]
      }
    ];
    const s = pickOne(sets);
    return {
      id: 'support',
      prompt: L(`${s.claim.uz} Qaysi gap bu fikrni quvvatlaydi?`, `${s.claim.ru} Какое утверждение поддерживает это мнение?`, `${s.claim.en} Which statement supports this view?`),
      ...wordOptions(s.ans, s.wrong),
      reviewTopics: []
    };
  },
  // 8 — cause → effect (best reason)
  () => {
    const sets = [
      { fact: L('Yer hoʻl boʻlib qoldi.', 'Земля стала мокрой.', 'The ground got wet.'), ans: L('Yomgʻir yogʻdi.', 'Прошёл дождь.', 'It rained.'), wrong: [L('Quyosh chiqdi.', 'Взошло солнце.', 'The sun came out.'), L('Shamol esdi.', 'Подул ветер.', 'The wind blew.'), L('Qushlar uchdi.', 'Улетели птицы.', 'Birds flew away.')] },
      { fact: L('Muzqaymoq erib ketdi.', 'Мороженое растаяло.', 'The ice cream melted.'), ans: L('Havo issiq edi.', 'Было жарко.', 'The weather was hot.'), wrong: [L('Havo sovuq edi.', 'Было холодно.', 'It was cold.'), L('Qorongʻi edi.', 'Было темно.', 'It was dark.'), L('Shovqin bor edi.', 'Был шум.', 'It was noisy.')] },
      { fact: L('Gul soʻlib qoldi.', 'Цветок завял.', 'The flower wilted.'), ans: L('Unga suv berilmadi.', 'Его не полили.', 'It was not watered.'), wrong: [L('U yangi edi.', 'Он был новый.', 'It was new.'), L('U koʻk edi.', 'Он был синий.', 'It was blue.'), L('U katta edi.', 'Он был большой.', 'It was big.')] }
    ];
    const s = pickOne(sets);
    return {
      id: 'cause',
      prompt: L(`${s.fact.uz} Eng mos sabab qaysi?`, `${s.fact.ru} Какая причина подходит лучше всего?`, `${s.fact.en} Which reason fits best?`),
      ...wordOptions(s.ans, s.wrong),
      reviewTopics: []
    };
  },
  // 9 — classification: which one belongs to the named group
  () => {
    const sets = [
      { q: L('Qaysi biri meva?', 'Что из этого фрукт?', 'Which one is a fruit?'), ans: L('Banan', 'Банан', 'A banana'), wrong: [L('Sabzi', 'Морковь', 'A carrot'), L('Kartoshka', 'Картошка', 'A potato'), L('Piyoz', 'Лук', 'An onion')] },
      { q: L('Qaysi biri hayvon?', 'Кто из этого животное?', 'Which one is an animal?'), ans: L('Quyon', 'Заяц', 'A rabbit'), wrong: [L('Stol', 'Стол', 'A table'), L('Kitob', 'Книга', 'A book'), L('Daraxt', 'Дерево', 'A tree')] },
      { q: L('Qaysi biri transport vositasi?', 'Что из этого транспорт?', 'Which one is a vehicle?'), ans: L('Avtobus', 'Автобус', 'A bus'), wrong: [L('Olma', 'Яблоко', 'An apple'), L('Stol', 'Стол', 'A table'), L('Gul', 'Цветок', 'A flower')] },
      { q: L('Qaysi biri kasb egasi?', 'Кто из этого профессия?', 'Which one is a profession?'), ans: L('Shifokor', 'Врач', 'A doctor'), wrong: [L('Olma', 'Яблоко', 'An apple'), L('Quyon', 'Заяц', 'A rabbit'), L('Stakan', 'Стакан', 'A cup')] }
    ];
    const s = pickOne(sets);
    return {
      id: 'belongs',
      prompt: s.q,
      ...wordOptions(s.ans, s.wrong),
      reviewTopics: []
    };
  },
  // 10 — position deduction (who is in the middle)
  () => {
    const sets = [
      { p: L('Qatorda Aziz eng oldinda, Karim eng orqada, Bobur ular oʻrtasida.', 'В ряду Азиз впереди, Карим сзади, Бобур между ними.', 'In a line Aziz is at the front, Karim at the back, Bobur between them.'), q: L('Kim oʻrtada turibdi?', 'Кто стоит посередине?', 'Who is in the middle?'), a: L('Bobur', 'Бобур', 'Bobur'), wrong: [L('Aziz', 'Азиз', 'Aziz'), L('Karim', 'Карим', 'Karim'), CANT] },
      { p: L('Uch uy bor: qizil uy chapda, koʻk uy oʻngda, sariq uy ular orasida.', 'Три дома: красный слева, синий справа, жёлтый между ними.', 'Three houses: the red one on the left, the blue one on the right, the yellow one between them.'), q: L('Qaysi uy oʻrtada?', 'Какой дом посередине?', 'Which house is in the middle?'), a: L('Sariq uy', 'Жёлтый дом', 'The yellow house'), wrong: [L('Qizil uy', 'Красный дом', 'The red house'), L('Koʻk uy', 'Синий дом', 'The blue house'), CANT] }
    ];
    const s = pickOne(sets);
    return {
      id: 'position',
      prompt: L(`${s.p.uz} ${s.q.uz}`, `${s.p.ru} ${s.q.ru}`, `${s.p.en} ${s.q.en}`),
      ...wordOptions(s.a, s.wrong),
      reviewTopics: []
    };
  },
  // 11 — relation pairing (belongs-with / place)
  () => {
    const sets = [
      { a: L('Oʻqituvchi', 'Учитель', 'A teacher'), ans: L('maktab', 'школа', 'a school'), wrong: [L('shifoxona', 'больница', 'a hospital'), L('doʻkon', 'магазин', 'a shop'), L('oshxona', 'кухня', 'a kitchen')] },
      { a: L('Shifokor', 'Врач', 'A doctor'), ans: L('shifoxona', 'больница', 'a hospital'), wrong: [L('maktab', 'школа', 'a school'), L('bogʻcha', 'детсад', 'a kindergarten'), L('doʻkon', 'магазин', 'a shop')] },
      { a: L('Baliq', 'Рыба', 'A fish'), ans: L('suv', 'вода', 'water'), wrong: [L('havo', 'воздух', 'air'), L('olov', 'огонь', 'fire'), L('tosh', 'камень', 'a stone')] },
      { a: L('Qush', 'Птица', 'A bird'), ans: L('havo', 'воздух', 'the air'), wrong: [L('suv', 'вода', 'water'), L('tuproq', 'земля', 'soil'), L('olov', 'огонь', 'fire')] }
    ];
    const s = pickOne(sets);
    return {
      id: 'relation',
      prompt: L(`«${s.a.uz}» qayer bilan bogʻliq?`, `С чем связан(а) «${s.a.ru}»?`, `What goes with “${s.a.en}”?`),
      ...wordOptions(s.ans, s.wrong),
      reviewTopics: []
    };
  },
  // 12 — negation deduction ("not this, so which?")
  () => {
    const sets = [
      { p: L('Savatda olma, nok va banan bor. Anvar meva oldi, lekin u olma ham, banan ham emas.', 'В корзине яблоко, груша и банан. Анвар взял фрукт, но это не яблоко и не банан.', 'A basket has an apple, a pear and a banana. Anvar took a fruit, but it is not the apple or the banana.'), q: L('Anvar qaysi mevani oldi?', 'Какой фрукт взял Анвар?', 'Which fruit did Anvar take?'), a: L('Nok', 'Груша', 'The pear'), wrong: [L('Olma', 'Яблоко', 'The apple'), L('Banan', 'Банан', 'The banana'), CANT] },
      { p: L('Uchta shar bor: qizil, koʻk va yashil. Dilnoza shar oldi, u qizil ham, koʻk ham emas.', 'Три шара: красный, синий и зелёный. Дилноза взяла шар, но не красный и не синий.', 'There are three balloons: red, blue and green. Dilnoza took one that is not red or blue.'), q: L('U qaysi sharni oldi?', 'Какой шар она взяла?', 'Which balloon did she take?'), a: L('Yashil', 'Зелёный', 'The green one'), wrong: [L('Qizil', 'Красный', 'The red one'), L('Koʻk', 'Синий', 'The blue one'), CANT] }
    ];
    const s = pickOne(sets);
    return {
      id: 'negation',
      prompt: L(`${s.p.uz} ${s.q.uz}`, `${s.p.ru} ${s.q.ru}`, `${s.p.en} ${s.q.en}`),
      ...wordOptions(s.a, s.wrong),
      reviewTopics: []
    };
  }
];

/** Build a fresh test: a random subset of the logic-generator bank, shuffled,
 *  each question with reshuffled options. */
export function buildG1Fikr2Exam(): ExamQuestion[] {
  return shuffle(GENERATORS)
    .slice(0, FIKR2_COUNT)
    .map((gen, i) => {
      const q = gen();
      return { ...q, id: `q${i + 1}-${q.id}` };
    });
}

export const FIKR2_EXAM_CONFIG: ExamConfig = {
  title: FIKR2_TITLE,
  intro: FIKR2_INTRO,
  minutes: FIKR2_MINUTES,
  count: FIKR2_COUNT,
  build: buildG1Fikr2Exam,
  logoSrc: '/prezident-logo.png',
  topicKey: G1_FIKR2_EXAM_KEY
};
