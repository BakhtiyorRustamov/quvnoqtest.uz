import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-alifbe-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/**
 * Grade-1 "Alifbe" (literacy primer) — Mundarija. 64 built lessons, aligned to
 * the printed primer: 1–4 = intro concepts, 5 = O, 6 = T, then each letter A→Ng
 * has an intro lesson + a reading/practice lesson (e.g. A = 7 & 8, Ng = 59 & 60).
 */
export const G1_ALIFBE_TOPICS: TopicMeta[] = [
  T(1, 'Vatanim — Oʻzbekiston', 'Моя Родина — Узбекистан', 'My homeland — Uzbekistan'),
  T(2, 'Maktabga xush kelibsiz! Soʻz va gap', 'Добро пожаловать в школу! Слово и предложение', 'Welcome to school! Word and sentence'),
  T(3, 'Oilam va boʻgʻinlar', 'Моя семья и слоги', 'My family and syllables'),
  T(4, 'Tovushlar sirlari: unli va undosh', 'Секреты звуков: гласные и согласные', 'Sound secrets: vowels and consonants'),
  T(5, '«O o» — birinchi harfimiz', '«O o» — наша первая буква', '“O o” — our first letter'),
  T(6, '«T t» harfi', 'Буква «T t»', 'The letter “T t”'),
  T(7, '«A a» harfi', 'Буква «A a»', 'The letter “A a”'),
  T(8, '«A a» — oʻqish mashqi', 'Буква «A a» — чтение', 'Letter “A a” — reading'),
  T(9, '«N n» harfi', 'Буква «N n»', 'The letter “N n”'),
  T(10, '«N n» — oʻqish mashqi', 'Буква «N n» — чтение', 'Letter “N n” — reading'),
  T(11, '«I i» harfi', 'Буква «I i»', 'The letter “I i”'),
  T(12, '«I i» — oʻqish mashqi', 'Буква «I i» — чтение', 'Letter “I i” — reading'),
  T(13, '«L l» harfi', 'Буква «L l»', 'The letter “L l”'),
  T(14, '«L l» — oʻqish mashqi', 'Буква «L l» — чтение', 'Letter “L l” — reading'),
  T(15, '«M m» harfi', 'Буква «M m»', 'The letter “M m”'),
  T(16, '«M m» — oʻqish mashqi', 'Буква «M m» — чтение', 'Letter “M m” — reading'),
  T(17, '«U u» harfi', 'Буква «U u»', 'The letter “U u”'),
  T(18, '«U u» — oʻqish mashqi', 'Буква «U u» — чтение', 'Letter “U u” — reading'),
  T(19, '«D d» harfi', 'Буква «D d»', 'The letter “D d”'),
  T(20, '«D d» — oʻqish mashqi', 'Буква «D d» — чтение', 'Letter “D d” — reading'),
  T(21, '«K k» harfi', 'Буква «K k»', 'The letter “K k”'),
  T(22, '«K k» — oʻqish mashqi', 'Буква «K k» — чтение', 'Letter “K k” — reading'),
  T(23, '«Oʻ oʻ» harfi', 'Буква «Oʻ oʻ»', 'The letter “Oʻ oʻ”'),
  T(24, '«Oʻ oʻ» — oʻqish mashqi', 'Буква «Oʻ oʻ» — чтение', 'Letter “Oʻ oʻ” — reading'),
  T(25, '«B b» harfi', 'Буква «B b»', 'The letter “B b”'),
  T(26, '«B b» — oʻqish mashqi', 'Буква «B b» — чтение', 'Letter “B b” — reading'),
  T(27, '«E e» harfi', 'Буква «E e»', 'The letter “E e”'),
  T(28, '«E e» — oʻqish mashqi', 'Буква «E e» — чтение', 'Letter “E e” — reading'),
  T(29, '«Y y» harfi', 'Буква «Y y»', 'The letter “Y y”'),
  T(30, '«Y y» — oʻqish mashqi', 'Буква «Y y» — чтение', 'Letter “Y y” — reading'),
  T(31, '«R r» harfi', 'Буква «R r»', 'The letter “R r”'),
  T(32, '«R r» — oʻqish mashqi', 'Буква «R r» — чтение', 'Letter “R r” — reading'),
  T(33, '«Q q» harfi', 'Буква «Q q»', 'The letter “Q q”'),
  T(34, '«Q q» — oʻqish mashqi', 'Буква «Q q» — чтение', 'Letter “Q q” — reading'),
  T(35, '«S s» harfi', 'Буква «S s»', 'The letter “S s”'),
  T(36, '«S s» — oʻqish mashqi', 'Буква «S s» — чтение', 'Letter “S s” — reading'),
  T(37, '«Z z» harfi', 'Буква «Z z»', 'The letter “Z z”'),
  T(38, '«Z z» — oʻqish mashqi', 'Буква «Z z» — чтение', 'Letter “Z z” — reading'),
  T(39, '«V v» harfi', 'Буква «V v»', 'The letter “V v”'),
  T(40, '«V v» — oʻqish mashqi', 'Буква «V v» — чтение', 'Letter “V v” — reading'),
  T(41, '«P p» harfi', 'Буква «P p»', 'The letter “P p”'),
  T(42, '«P p» — oʻqish mashqi', 'Буква «P p» — чтение', 'Letter “P p” — reading'),
  T(43, '«G g» harfi', 'Буква «G g»', 'The letter “G g”'),
  T(44, '«G g» — oʻqish mashqi', 'Буква «G g» — чтение', 'Letter “G g” — reading'),
  T(45, '«Gʻ gʻ» harfi', 'Буква «Gʻ gʻ»', 'The letter “Gʻ gʻ”'),
  T(46, '«Gʻ gʻ» — oʻqish mashqi', 'Буква «Gʻ gʻ» — чтение', 'Letter “Gʻ gʻ” — reading'),
  T(47, '«H h» harfi', 'Буква «H h»', 'The letter “H h”'),
  T(48, '«H h» — oʻqish mashqi', 'Буква «H h» — чтение', 'Letter “H h” — reading'),
  T(49, '«Sh sh» harfi', 'Буква «Sh sh»', 'The letter “Sh sh”'),
  T(50, '«Sh sh» — oʻqish mashqi', 'Буква «Sh sh» — чтение', 'Letter “Sh sh” — reading'),
  T(51, '«F f» harfi', 'Буква «F f»', 'The letter “F f”'),
  T(52, '«F f» — oʻqish mashqi', 'Буква «F f» — чтение', 'Letter “F f” — reading'),
  T(53, '«Ch ch» harfi', 'Буква «Ch ch»', 'The letter “Ch ch”'),
  T(54, '«Ch ch» — oʻqish mashqi', 'Буква «Ch ch» — чтение', 'Letter “Ch ch” — reading'),
  T(55, '«J j» harfi', 'Буква «J j»', 'The letter “J j”'),
  T(56, '«J j» — oʻqish mashqi', 'Буква «J j» — чтение', 'Letter “J j” — reading'),
  T(57, '«X x» harfi', 'Буква «X x»', 'The letter “X x”'),
  T(58, '«X x» — oʻqish mashqi', 'Буква «X x» — чтение', 'Letter “X x” — reading'),
  T(59, '«Ng ng» harfi', 'Буква «Ng ng»', 'The letter “Ng ng”'),
  T(60, '«Ng ng» — oʻqish mashqi', 'Буква «Ng ng» — чтение', 'Letter “Ng ng” — reading'),
  T(61, '«ʼ» — tutuq belgisi', '«ʼ» — разделительный знак', '“ʼ” — the glottal sign'),
  T(62, 'Tutuq belgisi — oʻqish mashqi', 'Разделительный знак — чтение', 'The glottal sign — reading'),
  T(63, 'Alifbo — takrorlash', 'Алфавит — повторение', 'The alphabet — review'),
  T(64, 'Oʻlkamizda qish', 'Зима в нашем краю', 'Winter in our land')
];

export function getAlifbeTopic(key: string): TopicMeta | undefined {
  return G1_ALIFBE_TOPICS.find((t) => t.key === key);
}
