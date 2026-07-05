import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-ona-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/** Numbered placeholder title for not-yet-authored topics (6–40). */
const P = (n: number): TopicMeta => ({
  n,
  key: `g1-ona-${String(n).padStart(2, '0')}`,
  title: { uz: `${n}-mavzu`, ru: `Тема ${n}`, en: `Lesson ${n}` }
});

/** First topic number of Part 2 (used by the subject view to split the lists). */
export const G1_ONA_PART2_START = 33;

/**
 * Grade-1 Ona tili (Mundarija).
 * Part 1 = topics 1–32: fully built lessons (authored from the textbook).
 * Part 2 = topics 33–56: "Coming soon" placeholder pages until authored.
 */
export const G1_ONA_TOPICS: TopicMeta[] = [
  T(1, 'Ona tili bilan tanishamiz', 'Знакомимся с родным языком', 'Getting to know our mother tongue'),
  T(2, 'Gap va matn quramiz', 'Строим предложение и текст', 'Building a sentence and a text'),
  T(3, 'Til va nutq sirlari', 'Секреты языка и речи', 'The secrets of language and speech'),
  T(4, 'Tovush va harf bilan oʻynaymiz', 'Играем со звуком и буквой', 'Playing with sound and letter'),
  T(5, 'Harflar olamiga sayohat', 'Путешествие в мир букв', 'A journey into the world of letters'),
  T(6, 'Alifbo — harflar saltanati', 'Алфавит — царство букв', 'The alphabet — a kingdom of letters'),
  T(7, 'Bilimlar bellashuvi (takrorlash)', 'Состязание знаний (повторение)', 'Knowledge contest (review)'),
  T(8, 'Unlilar — olti doʻst', 'Гласные — шесть друзей', 'Vowels — the six friends'),
  T(9, 'A va O — egizak unlilar', 'A и O — гласные-близнецы', 'A and O — twin vowels'),
  T(10, 'I va U — jajji unlilar', 'I и U — маленькие гласные', 'I and U — the little vowels'),
  T(11, 'Oʻ va E — nozik unlilar', 'Oʻ и E — тонкие гласные', 'Oʻ and E — the fine vowels'),
  T(12, 'Unlilar bellashuvi (takrorlash)', 'Состязание гласных (повторение)', 'Vowels contest (review)'),
  T(13, 'Undoshlar — 24 tovush', 'Согласные — 24 звука', 'Consonants — 24 sounds'),
  T(14, 'X va H — chalkash tovushlar', 'X и H — похожие звуки', 'X and H — the easily-mixed sounds'),
  T(15, 'J harfining ikki qiyofasi', 'Две стороны буквы J', 'The two faces of the letter J'),
  T(16, 'Q va Gʻ tovushlari', 'Звуки Q и Gʻ', 'The sounds Q and Gʻ'),
  T(17, 'ng, sh, ch — uch birikma', 'ng, sh, ch — три сочетания', 'ng, sh, ch — three combinations'),
  T(18, 'Tutuq belgisi sirlari', 'Секреты знака тутук (ʼ)', 'Secrets of the tutuq sign (ʼ)'),
  T(19, 'Aytilishi boshqa, yozilishi boshqa', 'Слышим одно, пишем другое', 'Said one way, spelled another'),
  T(20, 'Soʻz oxiridagi undoshlar', 'Согласные в конце слова', 'Consonants at the end of a word'),
  T(21, 'Undoshlar bellashuvi (takrorlash)', 'Состязание согласных (повторение)', 'Consonants contest (review)'),
  T(22, 'Boʻgʻin — soʻz boʻlaklari', 'Слог — части слова', 'Syllables — the chunks of a word'),
  T(23, 'Soʻzni boʻgʻinlarga boʻlamiz', 'Делим слово на слоги', 'Splitting a word into syllables'),
  T(24, 'Boʻgʻinni satrga koʻchiramiz', 'Переносим слог на строку', 'Moving a syllable to the next line'),
  T(25, 'Birikmalarni ajratmaymiz', 'Не разрываем сочетания', 'Keeping combinations together'),
  T(26, 'Boʻgʻinlar bellashuvi (takrorlash)', 'Состязание слогов (повторение)', 'Syllables contest (review)'),
  T(27, 'Soʻzlar — nutq gʻishtlari', 'Слова — кирпичики речи', 'Words — the bricks of speech'),
  T(28, 'Gap — tugal fikr', 'Предложение — законченная мысль', 'A sentence — a complete thought'),
  T(29, 'Gapni soʻzlardan quramiz', 'Строим предложение из слов', 'Building a sentence from words'),
  T(30, 'Gap oxiridagi belgilar', 'Знаки в конце предложения', 'Marks at the end of a sentence'),
  T(31, 'Tinish belgilari — nuqta, soʻroq, undov', 'Знаки препинания — точка, вопрос, восклицание', 'Punctuation — full stop, question, exclamation'),
  T(32, 'Matn — gaplardan tuziladi', 'Текст — строится из предложений', 'A text — built from sentences'),
  T(33, 'Soʻzlar shaxs va narsani ataydi', 'Слова называют лицо и предмет', 'Words name persons and things'),
  T(34, 'Bitta narsa, koʻp narsa', 'Один предмет, много предметов', 'One thing, many things'),
  T(35, 'Bitta odam, koʻp odam', 'Один человек, много людей', 'One person, many people'),
  T(36, 'Shaxs va narsani ajratamiz', 'Различаем лицо и предмет', 'Telling persons and things apart'),
  T(37, 'Toʻrt savol — shaxs va narsa', 'Четыре вопроса — лицо и предмет', 'Four questions — persons and things'),
  T(38, 'Shaxs-narsa bellashuvi (takrorlash)', 'Состязание лиц и предметов (повторение)', 'Persons-and-things contest (review)'),
  T(39, 'Ismlar bosh harf bilan', 'Имена — с заглавной буквы', 'Names begin with a capital letter'),
  T(40, 'Ism, sharif, familiya', 'Имя, отчество, фамилия', 'Name, patronymic, surname'),
  ...Array.from({ length: 16 }, (_, i) => P(i + 41))
];

export function getOnaTopic(key: string): TopicMeta | undefined {
  return G1_ONA_TOPICS.find((t) => t.key === key);
}
