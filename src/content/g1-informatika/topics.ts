import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-informatika-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/**
 * Grade-1 "Informatika" — Mundarija. Unit 1 senses (1–9), "Ketma-ketlik"
 * (sequence, 10–16), "Tomonlar va yoʻnalishlar" (directions, 17–25) and
 * "Samaradorlik" (efficiency, 26–30). All 30 lessons are built.
 */
export const G1_INFORMATIKA_TOPICS: TopicMeta[] = [
  T(1, 'Bizning sezgi aʼzolarimiz', 'Наши органы чувств', 'Our sense organs'),
  T(2, 'Biz nimalarni koʻramiz?', 'Что мы видим?', 'What do we see?'),
  T(3, 'Rang va shakl', 'Цвет и форма', 'Colour and shape'),
  T(4, 'Biz nimalarni eshitamiz?', 'Что мы слышим?', 'What do we hear?'),
  T(5, 'Biz nimalarni hidlaymiz?', 'Что мы нюхаем?', 'What do we smell?'),
  T(6, 'Turli xil taʼmlar', 'Разные вкусы', 'Different tastes'),
  T(7, 'Biz nimalarni his qilamiz?', 'Что мы чувствуем?', 'What do we feel?'),
  T(8, 'Buyumlarga taʼrif beramiz', 'Описываем предметы', 'We describe objects'),
  T(9, 'Bizning dunyoqarashimiz', 'Наш взгляд на мир', 'Our view of the world'),
  T(10, 'Ketma-ketlik', 'Последовательность', 'Sequence'),
  T(11, 'Oldin – keyin', 'Раньше – позже', 'Before – after'),
  T(12, 'Edi – boʻldi', 'Было – стало', 'Was – became'),
  T(13, 'Oʻsish va kamayish tartibi', 'Порядок возрастания и убывания', 'Increasing and decreasing order'),
  T(14, 'Amallarning ketma-ketligi', 'Последовательность действий', 'Sequence of actions'),
  T(15, 'Tabiatdagi takrorlanish hodisalari', 'Повторяющиеся явления в природе', 'Repeating events in nature'),
  T(16, 'Bizning sogʻlom turmush tarzimiz', 'Наш здоровый образ жизни', 'Our healthy lifestyle'),
  T(17, 'Tepa – past', 'Вверху – внизу', 'Top – bottom'),
  T(18, 'Oldinda – orqada', 'Впереди – сзади', 'In front – behind'),
  T(19, 'Chapda – oʻngda', 'Слева – справа', 'Left – right'),
  T(20, 'Uzoq – yaqin', 'Далеко – близко', 'Far – near'),
  T(21, 'Yoʻl va yoʻnalish', 'Дорога и направление', 'Path and direction'),
  T(22, 'Uzun – qisqa', 'Длинный – короткий', 'Long – short'),
  T(23, 'Xavfsiz hudud', 'Безопасная зона', 'Safe zone'),
  T(24, 'Labirint', 'Лабиринт', 'Maze'),
  T(25, 'Maktabdan uyga qaytish yoʻli', 'Дорога из школы домой', 'The route home from school'),
  T(26, 'Narsalarni qismlarga ajratish', 'Разбиение на части', 'Breaking things into parts'),
  T(27, 'Turli qismlardan yaxlit narsani yigʻish', 'Сборка целого из частей', 'Assembling a whole from parts'),
  T(28, 'Taqqoslash', 'Сравнение', 'Comparison'),
  T(29, 'Qarama-qarshi belgilar', 'Противоположные признаки', 'Opposite features'),
  T(30, 'Tasdiq – inkor', 'Утверждение – отрицание', 'Affirmation – negation'),
  T(31, 'Rost va yolgʻon', 'Правда и ложь', 'True and false'),
  T(32, 'Eng keraklisi', 'Самое нужное', 'The most necessary'),
  T(33, 'Samarali natija', 'Эффективный результат', 'An effective result')
];

export function getInformatikaTopic(key: string): TopicMeta | undefined {
  return G1_INFORMATIKA_TOPICS.find((t) => t.key === key);
}
