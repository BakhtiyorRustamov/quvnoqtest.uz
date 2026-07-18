import type { L10n } from '@/lib/i18n-config';

/**
 * Grade-1 "Oʻqish savodxonligi" (reading literacy) — course map.
 *
 * The textbook is split into TWO PARTS (qism). Each part has FOUR SECTIONS
 * (boʻlim), and each section holds 7–10 short lessons (dars) built around a
 * poem / short text, ending with a section-review lesson. Only lesson 1 is a
 * real, playable lesson right now (a free demo lesson); the rest are "coming
 * soon" placeholders shown as dummy buttons on the subject dashboard.
 */

export type OqishLesson = {
  key: string;
  /** global 1..34 index (kept for progress lookups / ordering) */
  n: number;
  /** 1-based part number (qism) */
  partN: number;
  /** 1-based section number within the part (boʻlim) */
  sectionN: number;
  /** 1-based lesson number within the section (dars) — how the book numbers it */
  lessonN: number;
  title: L10n;
  built: boolean;
};
export type OqishSection = { title: L10n; lessons: OqishLesson[] };
export type OqishPart = { title: L10n; sections: OqishSection[] };

const L = (uz: string, ru: string, en: string): L10n => ({ uz, ru, en });

/** Section themes (part → 4 sections). Lesson counts vary 7–10 per section. */
const PLAN: { part: L10n; sections: { title: L10n; count: number }[] }[] = [
  {
    part: L('I qism', 'Часть I', 'Part I'),
    // Counts follow the source textbook's Part 1: reviews fall on lessons
    // 08, 15, 24 and 34 (section themes: Vatan / winter / books / spring-Navroʻz).
    sections: [
      { title: L('Aziz Vatanim', 'Дорогая Родина', 'My dear Homeland'), count: 8 },
      { title: L('Oppoq qish faslida', 'Белоснежной зимой', 'In the snow-white winter'), count: 7 },
      { title: L('Kitob — bilim chirogʻi', 'Книга — светоч знаний', 'Books — the lamp of knowledge'), count: 9 },
      { title: L('Bahor va Navroʻz shodliklari', 'Радости весны и Навруза', 'Joys of spring and Navruz'), count: 10 }
    ]
  },
  {
    part: L('II qism', 'Часть II', 'Part II'),
    // Part II (volume 2). All four boʻlim titles & counts confirmed from the
    // book's MUNDARIJA (contents): boʻlim V–VIII. Counts: 10, 6, 10, 4.
    sections: [
      { title: L('U — kim, bu — nima?', 'Кто это, что это?', 'Who is it, what is this?'), count: 10 },
      { title: L('Xalq ogʻzaki ijodi — behisob xislat koni', 'Устное народное творчество — кладезь достоинств', 'Folk oral art — a treasury of virtues'), count: 6 },
      { title: L('Goʻzal xulq, orastalik', 'Красивый нрав и опрятность', 'Good character and tidiness'), count: 10 },
      { title: L('Yoz — oʻtadi soz', 'Лето — проходит славно', 'Summer passes sweetly'), count: 4 }
    ]
  }
];

/** The real, built lesson titles keyed by lesson key (everything else = placeholder). */
const BUILT_TITLES: Record<string, L10n> = {
  'g1-oqish-01': L('Oʻqishni bilsang oʻzing', 'Если умеешь читать сам', 'When you can read yourself'),
  'g1-oqish-02': L('Vatan — eng aziz makon', 'Родина — самое дорогое место', 'Homeland — the dearest place'),
  'g1-oqish-03': L('Oʻzbekiston — ozod yurtimiz', 'Узбекистан — свободная страна', 'Uzbekistan — our free land'),
  'g1-oqish-04': L('Vatan himoyachilari', 'Защитники Родины', 'Defenders of the Homeland'),
  'g1-oqish-05': L('Yurt qalqonlari', 'Щиты страны', 'Shields of the land'),
  'g1-oqish-06': L('Oʻzbekiston — jonajon yurtim', 'Узбекистан — мой родной край', 'Uzbekistan — my dear land'),
  'g1-oqish-07': L('Men — shu yurtning boʻlagi', 'Я — частичка этой страны', 'I am a part of this land'),
  'g1-oqish-08': L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review'),
  'g1-oqish-09': L('Qish keldi oʻlkamga', 'Зима пришла в наш край', 'Winter has come to our land'),
  'g1-oqish-10': L('Kumushrang qish', 'Серебристая зима', 'The silvery winter'),
  'g1-oqish-11': L('Mehribon qizaloq', 'Добрая девочка', 'The kind little girl'),
  'g1-oqish-12': L('Laylak qor yoqqanda', 'Когда падает пушистый снег', 'When fluffy snow falls'),
  'g1-oqish-13': L('Qor toʻpi voqeasi', 'История со снежком', 'The snowball incident'),
  'g1-oqish-14': L('Yelim voqeasi', 'История с клеем', 'The glue incident'),
  'g1-oqish-15': L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review'),
  'g1-oqish-16': L('Kitob — bilim quyoshi', 'Книга — солнце знаний', 'The book — a sun of knowledge'),
  'g1-oqish-17': L('Oilaviy mutolaa', 'Семейное чтение', 'Family reading'),
  'g1-oqish-18': L('Aql — boshda', 'Ум — в голове', 'Wisdom lives in the head'),
  'g1-oqish-19': L('Eng yaxshi sovgʻa — kitob', 'Лучший подарок — книга', 'The best gift is a book'),
  'g1-oqish-20': L('Kitobsevar bobom', 'Дедушка, влюблённый в книги', 'My book-loving grandfather'),
  'g1-oqish-21': L('Kitob — dono maslahatchi', 'Книга — мудрый советчик', 'The book — a wise adviser'),
  'g1-oqish-22': L('Kutubxona — nur maskani', 'Библиотека — дом света', 'The library — a house of light'),
  'g1-oqish-23': L('Kitobni asrab-avaylaymiz', 'Бережём книгу', 'We take care of our books'),
  'g1-oqish-24': L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review'),
  'g1-oqish-25': L('Salom senga, gulbahor', 'Здравствуй, весна!', 'Hello to you, spring!'),
  'g1-oqish-26': L('Koʻklam — yashnaydi olam', 'Весна — расцветает мир', 'Spring — the world blossoms'),
  'g1-oqish-27': L('Onajonim, mehribonim', 'Мамочка, милая моя', 'My dear, kind mother'),
  'g1-oqish-28': L('Uchib keladi qushlar', 'Прилетают птицы', 'The birds fly back'),
  'g1-oqish-29': L('Koʻklamni boshlab kelding', 'Ты открыл весну', 'You brought the spring'),
  'g1-oqish-30': L('Bahorning taomi', 'Блюдо весны', 'The dish of spring'),
  'g1-oqish-31': L('Sumalak — sehrli taom', 'Сумаляк — волшебное блюдо', 'Sumalak — a magical dish'),
  'g1-oqish-32': L('Butun borliq seni der', 'Весь мир зовёт тебя', 'The whole world calls you'),
  'g1-oqish-33': L('Kulib keldi Navroʻzim', 'Пришёл, смеясь, мой Навруз', 'My Navruz came smiling'),
  'g1-oqish-34': L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review'),
  'g1-oqish-35': L('Ajdodlar — bizning faxrimiz', 'Предки — наша гордость', 'Ancestors — our pride'),
  'g1-oqish-36': L('Olamga mashhur Sohibqiron', 'Всемирно известный Сохибкиран', 'The world-famous Sohibqiron'),
  'g1-oqish-37': L('Xabar qanday yetadi?', 'Как доходит весть?', 'How does a message travel?'),
  'g1-oqish-38': L('Yulduzlar siri', 'Тайна звёзд', 'The secret of the stars'),
  'g1-oqish-39': L('Yulduzlarni oʻrgangan bobo', 'Дед, изучавший звёзды', 'The grandfather who studied the stars'),
  'g1-oqish-40': L('Koinotga parvozlar', 'Полёты в космос', 'Flights to space'),
  'g1-oqish-41': L('Zahiriddin Muhammad Bobur', 'Захириддин Мухаммад Бабур', 'Zahiriddin Muhammad Bobur'),
  'g1-oqish-42': L('Suv tomchisining sayohati', 'Путешествие капельки воды', 'The journey of a water drop'),
  'g1-oqish-43': L('Ajoyib soʻzlar', 'Удивительные слова', 'Wonderful words'),
  'g1-oqish-44': L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review'),
  'g1-oqish-45': L('Ertaklar — yaxshilikka yetaklar', 'Сказки ведут к добру', 'Tales lead us to kindness'),
  'g1-oqish-46': L('Ertaklardan ol saboq', 'Возьми урок из сказки', 'Take a lesson from tales'),
  'g1-oqish-47': L('Zukko boʻlgin, bolajon', 'Будь смекалистым, малыш', 'Be clever, little one'),
  'g1-oqish-48': L('Rivoyatda ibrat bor', 'В предании — назидание', 'A legend holds a lesson'),
  'g1-oqish-49': L('Qoʻshiqqa boʻlamiz joʻr', 'Подпоём песне', "Let's join the song"),
  'g1-oqish-50': L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review'),
  'g1-oqish-51': L('Odobning boshi — til', 'Начало вежливости — речь', 'Manners begin with speech'),
  'g1-oqish-52': L('Kiyinish odobi', 'Культура одежды', 'The etiquette of dressing'),
  'g1-oqish-53': L('Odobli bola', 'Воспитанный ребёнок', 'A well-mannered child'),
  'g1-oqish-54': L('Rostgoʻylik — inson koʻrki', 'Правдивость — украшение человека', 'Truthfulness adorns a person'),
  'g1-oqish-55': L('Orastalik qanday soz', 'Как прекрасна опрятность', 'How fine is tidiness'),
  'g1-oqish-56': L('Yomon odatlardan saqlaning', 'Избегайте дурных привычек', 'Avoid bad habits'),
  'g1-oqish-57': L('Maqtanchoq boʻlmang', 'Не будьте хвастливыми', "Don't be boastful"),
  'g1-oqish-58': L('Vaqtdan unumli foydalaning', 'Цените время', 'Use your time wisely'),
  'g1-oqish-59': L('Yaxshilik qilish — odob-axloqdandir', 'Творить добро — часть нравственности', 'Doing good is part of good character'),
  'g1-oqish-60': L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review'),
  'g1-oqish-61': L('Yoz — naqadar soz', 'Лето — как прекрасно', 'Summer — how fine it is'),
  'g1-oqish-62': L('Mevalar gʻarq pishgan mahalda', 'Когда плоды поспевают', 'When the fruit ripens'),
  'g1-oqish-63': L('Quvnoq oʻtsin goʻzal yoz', 'Пусть весело пройдёт лето', 'May the fine summer pass merrily'),
  'g1-oqish-64': L('Oʻtilganlarni mustahkamlash', 'Закрепление пройденного', 'Reviewing what we learned')
};

function buildParts(): OqishPart[] {
  let n = 0;
  return PLAN.map((p, pi) => ({
    title: p.part,
    sections: p.sections.map((sec, si) => ({
      title: sec.title,
      lessons: Array.from({ length: sec.count }, (_, i) => {
        n += 1;
        const key = `g1-oqish-${String(n).padStart(2, '0')}`;
        const isReview = i === sec.count - 1;
        const title =
          BUILT_TITLES[key] ??
          (isReview
            ? L('Boʻlim yuzasidan takrorlash', 'Повторение по разделу', 'Section review')
            : L(`${i + 1}-dars`, `Урок ${i + 1}`, `Lesson ${i + 1}`));
        return { key, n, partN: pi + 1, sectionN: si + 1, lessonN: i + 1, title, built: key in BUILT_TITLES };
      })
    }))
  }));
}

export const G1_OQISH_PARTS: OqishPart[] = buildParts();

/** Flat list of every lesson (for progress lookups / counts). */
export const G1_OQISH_LESSONS: OqishLesson[] = G1_OQISH_PARTS.flatMap((p) => p.sections.flatMap((s) => s.lessons));

export function getOqishLesson(key: string): OqishLesson | undefined {
  return G1_OQISH_LESSONS.find((l) => l.key === key);
}
