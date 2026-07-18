import type { L10n } from '@/lib/i18n-config';

/**
 * Grade-1 "Ingliz tili" (English) — course map.
 *
 * The course mirrors the pupil's book: an opening HELLO unit, eight numbered
 * units, and a closing REVIEW unit — 10 units in all. EVERY unit is built from
 * the same SIX lesson parts (the book's six strands):
 *   1 Vocabulary — new words        4 Talk time — a tiny spoken dialog
 *   2 Grammar — sentence patterns   5 Animal sounds — pronunciation fun
 *   3 Story — a value story         6 Discover (CLIL) — English meets art/science…
 *
 * Lesson keys are g1-ingliz-01 … g1-ingliz-60 (unit u, part p → n=(u-1)*6+p).
 * Only the Hello unit (01–06) is playable right now; the rest are "coming
 * soon" dummy buttons on the subject page.
 */

export type InglizLesson = {
  key: string;
  /** global 1..60 index (progress lookups / ordering) */
  n: number;
  /** 1-based unit number (1 = Hello … 10 = Review) */
  unitN: number;
  /** 1-based part number within the unit (1..6) */
  partN: number;
  title: L10n;
  built: boolean;
};
export type InglizUnit = {
  unitN: number;
  /** the label bubble on the unit card ("Hello!", "1", … "★") */
  badge: string;
  emoji: string;
  title: L10n;
  lessons: InglizLesson[];
};

const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });

/** The six strand names — used for every not-yet-authored part. */
const PART_NAMES: L10n[] = [
  L('Yangi soʻzlar', 'Новые слова', 'New words'),
  L('Gap qurish', 'Строим фразы', 'Making sentences'),
  L('Hikoya vaqti', 'Время истории', 'Story time'),
  L('Suhbat vaqti', 'Время беседы', 'Talk time'),
  L('Hayvon tovushlari', 'Звуки животных', 'Animal sounds'),
  L('Kashfiyot darsi', 'Урок-открытие', 'Discovery lesson')
];

/** Units (titles paraphrased from the book's contents, not copied). */
const UNITS: { badge: string; emoji: string; title: L10n }[] = [
  { badge: '👋', emoji: '🤖', title: L('Salom!', 'Привет!', 'Hello!') },
  { badge: '1', emoji: '🏫', title: L('Maktabim', 'Моя школа', 'My school') },
  { badge: '2', emoji: '🧸', title: L('Oʻyinchoqlarim', 'Мои игрушки', 'My toys') },
  { badge: '3', emoji: '👨‍👩‍👧‍👦', title: L('Oilam', 'Моя семья', 'My family') },
  { badge: '4', emoji: '🏠', title: L('Uyim', 'Мой дом', 'My home') },
  { badge: '5', emoji: '🙌', title: L('Tanam', 'Моё тело', 'My body') },
  { badge: '6', emoji: '🍎', title: L('Taomlar', 'Еда', 'Food') },
  { badge: '7', emoji: '⚽', title: L('Harakatlar', 'Действия', 'Actions') },
  { badge: '8', emoji: '🦁', title: L('Hayvonlar', 'Животные', 'Animals') },
  { badge: '★', emoji: '🏆', title: L('Takrorlash (7–8)', 'Повторение (7–8)', 'Review (Units 7–8)') }
];

/** Built lesson titles (Hello unit) — paraphrased strand themes. */
const BUILT_TITLES: Record<string, L10n> = {
  'g1-ingliz-01': L('Salomlashamiz va ranglarni oʻrganamiz', 'Здороваемся и учим цвета', 'Saying hello & learning colors'),
  'g1-ingliz-02': L('Ismim, yoshim va sonlar (1–10)', 'Имя, возраст и числа (1–10)', 'My name, my age & numbers 1–10'),
  'g1-ingliz-03': L('Qiziquvchan boʻl! (hikoya)', 'Будь любознательным! (история)', 'Be curious! (story)'),
  'g1-ingliz-04': L('Qara! Bu — kaltakesak!', 'Смотри! Это ящерица!', 'Look! It’s a lizard!'),
  'g1-ingliz-05': L('«P» tovushi: pushti panda', 'Звук «p»: розовая панда', 'The “p” sound: a pink panda'),
  'g1-ingliz-06': L('Sanʼat: ranglarni aralashtiramiz', 'Искусство: смешиваем цвета', 'Art: mixing colors'),
  'g1-ingliz-07': L('Sinf jihozlari', 'Школьные предметы', 'Classroom things'),
  'g1-ingliz-08': L('Nechta? Sanaymiz', 'Сколько? Считаем', 'How many? Counting'),
  'g1-ingliz-09': L('Doʻst orttiramiz (hikoya)', 'Заводим друзей (история)', 'Making friends (story)'),
  'g1-ingliz-10': L('Tanishamiz: mening ismim...', 'Знакомимся: меня зовут...', 'Introducing myself'),
  'g1-ingliz-11': L('«b» tovushi: kitobli ayiq', 'Звук «b»: медведь с книгой', 'The b sound: a bear with a book'),
  'g1-ingliz-12': L('Fan: nimadan yasalgan?', 'Наука: из чего сделано?', 'Science: what material?'),
  'g1-ingliz-13': L('Mening oʻyinchoqlarim', 'Мои игрушки', 'My toys'),
  'g1-ingliz-14': L('Bu nima? — Bu...', 'Что это? — Это...', 'What is this? It is a...'),
  'g1-ingliz-15': L('Rahmat ayt (hikoya)', 'Скажи спасибо (история)', 'Say thank you (story)'),
  'g1-ingliz-16': L('Tugʻilgan kun muborak!', 'С днём рождения!', 'Happy birthday!'),
  'g1-ingliz-17': L('«t» tovushi: toshbaqa', 'Звук «t»: черепаха', 'The t sound: a turtle'),
  'g1-ingliz-18': L('Fan: elektrmi yoki yoʻq?', 'Наука: электрическое или нет?', 'Science: is it electric?'),
  'g1-ingliz-19': L('Mening oilam', 'Моя семья', 'My family'),
  'g1-ingliz-20': L('Bu kim? — Bu mening...', 'Кто это? — Это мой(я)...', 'Who is this? This is my...'),
  'g1-ingliz-21': L('Oilangni sev (hikoya)', 'Люби свою семью (история)', 'Love your family (story)'),
  'g1-ingliz-22': L('Salom, buvi! Yaxshimisiz?', 'Привет, бабушка! Как дела?', 'Hello, Grandma. How are you?'),
  'g1-ingliz-23': L('«d» tovushi: delfin', 'Звук «d»: дельфин', 'The d sound: a dolphin'),
  'g1-ingliz-24': L('Geografiya: qaysi qitʼa?', 'География: какой континент?', 'Geography: which continent?'),
  'g1-ingliz-25': L('Mening uyim', 'Мой дом', 'My home'),
  'g1-ingliz-26': L('Qayerdasan? — Men ...daman', 'Где ты? — Я в...', 'Where are you? I am in the...'),
  'g1-ingliz-27': L('Narsalarga eʼtiborli boʻl (hikoya)', 'Береги вещи (история)', 'Take care of things (story)'),
  'g1-ingliz-28': L('Narsalarni asra!', 'Береги вещи!', 'Take care of things!'),
  'g1-ingliz-29': L('«a» tovushi: chumoli', 'Звук «a»: муравей', 'The a sound: an ant'),
  'g1-ingliz-30': L('Matematika: qaysi shakl?', 'Математика: какая фигура?', 'Math: which shape?'),
  'g1-ingliz-31': L('Mening tanam', 'Моё тело', 'My body'),
  'g1-ingliz-32': L('Menda ... bor', 'У меня есть...', 'I have...'),
  'g1-ingliz-33': L('Toza boʻl (hikoya)', 'Будь чистым (история)', 'Be clean (story)'),
  'g1-ingliz-34': L('Oyoqlaringni yuv!', 'Помой ноги!', 'Wash your feet, please!'),
  'g1-ingliz-35': L('«i» tovushi: iguana', 'Звук «i»: игуана', 'The i sound: an iguana'),
  'g1-ingliz-36': L('Fan: besh sezgi', 'Наука: пять чувств', 'Science: the five senses'),
  'g1-ingliz-37': L('Mening taomlarim', 'Моя еда', 'Food'),
  'g1-ingliz-38': L('Menga ... yoqadi', 'Мне нравится...', 'I like...'),
  'g1-ingliz-39': L('Sabr qil (hikoya)', 'Будь терпеливым (история)', 'Be patient (story)'),
  'g1-ingliz-40': L('Menga ... bering', 'Можно мне...', 'Can I have..., please?'),
  'g1-ingliz-41': L('«e» tovushi: fil', 'Звук «e»: слон', 'The e sound: an elephant'),
  'g1-ingliz-42': L('Fan: oʻsimlik yoki hayvon?', 'Наука: растение или животное?', 'Science: plant or animal food?'),
  'g1-ingliz-43': L('Harakatlarim', 'Мои действия', 'Actions'),
  'g1-ingliz-44': L('Men ... ola man', 'Я умею...', 'I can...'),
  'g1-ingliz-45': L('Doʻstingga yordam ber (hikoya)', 'Помоги друзьям (история)', 'Help your friends (story)'),
  'g1-ingliz-46': L('Sen uddalaysan!', 'У тебя получится!', 'You can do it!'),
  'g1-ingliz-47': L('«u» tovushi: soyabon', 'Звук «u»: зонт', 'The u sound: an umbrella'),
  'g1-ingliz-48': L('Matematika: qoʻshish va ayirish', 'Математика: плюс и минус', 'Math: plus and minus'),
  'g1-ingliz-49': L('Yovvoyi hayvonlar', 'Дикие животные', 'Animals'),
  'g1-ingliz-50': L('Fillar katta', 'Слоны большие', 'Elephants are big'),
  'g1-ingliz-51': L('Hayvonlarni hurmat qil (hikoya)', 'Уважай животных (история)', 'Respect animals (story)'),
  'g1-ingliz-52': L('U kichkina. Hayvonlarni asra!', 'Он маленький. Береги животных!', 'It is small. Respect animals!'),
  'g1-ingliz-53': L('«o» tovushi: sakkizoyoq', 'Звук «o»: осьминог', 'The o sound: an octopus'),
  'g1-ingliz-54': L('Fan: hayvonlar qanday harakatlanadi?', 'Наука: как двигаются животные?', 'Science: how do animals move?'),
  'g1-ingliz-55': L('Takrorlash: harakatlar', 'Повторение: действия', 'Review: actions'),
  'g1-ingliz-56': L('Takrorlash: hayvonlar', 'Повторение: животные', 'Review: animals'),
  'g1-ingliz-57': L('Takrorlash: I can', 'Повторение: I can', 'Review: I can...'),
  'g1-ingliz-58': L('Takrorlash: katta va kichik', 'Повторение: большой и маленький', 'Review: big and small'),
  'g1-ingliz-59': L('Takrorlash: tovushlar', 'Повторение: звуки', 'Review: my sounds'),
  'g1-ingliz-60': L('Yakuniy oʻyin', 'Финальная игра', 'Final review game')
};

function buildLessons(): { units: InglizUnit[]; all: InglizLesson[] } {
  const units: InglizUnit[] = [];
  const all: InglizLesson[] = [];
  UNITS.forEach((u, ui) => {
    const unitN = ui + 1;
    const lessons: InglizLesson[] = [];
    for (let p = 1; p <= 6; p++) {
      const n = (unitN - 1) * 6 + p;
      const key = `g1-ingliz-${String(n).padStart(2, '0')}`;
      const built = !!BUILT_TITLES[key];
      lessons.push({
        key,
        n,
        unitN,
        partN: p,
        title: BUILT_TITLES[key] ?? PART_NAMES[p - 1],
        built
      });
    }
    units.push({ unitN, badge: u.badge, emoji: u.emoji, title: u.title, lessons });
    all.push(...lessons);
  });
  return { units, all };
}

const built = buildLessons();

/** Unit cards for the subject page (10 units × 6 parts). */
export const G1_INGLIZ_UNITS: InglizUnit[] = built.units;
/** Flat 60-lesson list (progress totals / ordering). */
export const G1_INGLIZ_LESSONS: InglizLesson[] = built.all;

export function getInglizLesson(key: string): InglizLesson | undefined {
  return G1_INGLIZ_LESSONS.find((l) => l.key === key);
}
