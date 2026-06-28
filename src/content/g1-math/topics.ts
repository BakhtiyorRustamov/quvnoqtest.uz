import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-math-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/** Numbered placeholder title for not-yet-authored Part-2 topics (43–74). */
const P = (n: number): TopicMeta => ({
  n,
  key: `g1-math-${String(n).padStart(2, '0')}`,
  title: { uz: `${n}-dars`, ru: `Урок ${n}`, en: `Lesson ${n}` }
});

/** First topic number of Part 2 (used by the dashboard to split the lists). */
export const G1_MATH_PART2_START = 42;
/** First topic number of Part 3. */
export const G1_MATH_PART3_START = 75;

/**
 * Grade-1 Mathematics (Mundarija).
 * Part 1 — topics 1–41. Part 2 — topics 42–74. Part 3 — topics 75–111.
 * Topics 1 and 42 are fully built lessons; the rest are "Coming soon" pages
 * (43–74 use numbered placeholder titles until authored).
 */
export const G1_MATH_TOPICS: TopicMeta[] = [
  T(1, 'Shakl, rang va oʻlcham olami', 'Мир форм, цветов и размеров', 'The world of shapes, colors and sizes'),
  T(2, 'Oʻxshashlik va tafovut', 'Сходство и отличие', 'Likeness and difference'),
  T(3, 'Buyumlarning oʻrni', 'Где находятся предметы', 'Where objects are'),
  T(4, 'Buyumlarni sanaymiz', 'Считаем предметы', 'Counting things'),
  T(5, 'Tekis va hajmdor shakllar', 'Плоские и объёмные тела', 'Flat and 3D shapes'),
  T(6, 'Voqealar tartibi', 'Порядок событий', 'Order of events'),
  T(7, 'Buyumlar toʻplami', 'Наборы предметов', 'Sets of objects'),
  T(8, 'Toʻplamlarni solishtirish', 'Сравниваем наборы', 'Comparing sets'),
  T(9, 'Birdan oʻngacha sonlar', 'Числа от одного до десяти', 'Numbers one to ten'),
  T(10, 'Sonning qoʻshnilari', 'Соседи числа', 'Number neighbors'),
  T(11, 'Sonlarni qoʻshamiz', 'Складываем числа', 'Adding numbers'),
  T(12, 'Sonlarni ayiramiz', 'Вычитаем числа', 'Subtracting numbers'),
  T(13, 'Sonlarni solishtirish', 'Сравниваем числа', 'Bigger, smaller, equal'),
  T(14, 'Bir soni va raqami', 'Число один', 'The number one'),
  T(15, 'Ikki soni va raqami', 'Число два', 'The number two'),
  T(16, 'Uch soni va raqami', 'Число три', 'The number three'),
  T(17, 'Toʻrt soni va raqami', 'Число четыре', 'The number four'),
  T(18, 'Besh soni va raqami', 'Число пять', 'The number five'),
  T(19, 'Birdan beshgacha sonlar', 'Числа от одного до пяти', 'Numbers one to five'),
  T(20, 'Beshgacha qoʻshish va ayirish', 'Сложение и вычитание до пяти', 'Adding and subtracting to five'),
  T(21, 'Olti soni va raqami', 'Число шесть', 'The number six'),
  T(22, 'Yetti soni va raqami', 'Число семь', 'The number seven'),
  T(23, 'Sakkiz soni va raqami', 'Число восемь', 'The number eight'),
  T(24, 'Toʻqqiz soni va raqami', 'Число девять', 'The number nine'),
  T(25, 'Nol soni va raqami', 'Число ноль', 'The number zero'),
  T(26, 'Oʻn soni va raqami', 'Число десять', 'The number ten'),
  T(27, 'Birdan oʻngacha sonlarni solishtirish', 'Числа 1–10: сравнение', 'Numbers 1–10: comparing'),
  T(28, 'Natural sonlar olami', 'Натуральные числа', 'Natural (counting) numbers'),
  T(29, 'Juft va toq sonlar', 'Чётные и нечётные числа', 'Even and odd numbers'),
  T(30, 'Nuqta, toʻgʻri va egri chiziqlar', 'Точка, прямые и кривые линии', 'Points, straight and curved lines'),
  T(31, 'Kesma va siniq chiziq', 'Отрезок и ломаная линия', 'Segment and broken line'),
  T(32, 'Qoʻshishning qismlari', 'Части сложения', 'Parts of addition'),
  T(33, 'Ayirishning qismlari', 'Части вычитания', 'Parts of subtraction'),
  T(34, 'Nomaʼlum qoʻshiluvchi', 'Неизвестное слагаемое', 'The unknown addend'),
  T(35, 'Nomaʼlum kamayuvchi', 'Неизвестное уменьшаемое', 'The unknown minuend'),
  T(36, 'Nomaʼlum ayriluvchi', 'Неизвестное вычитаемое', 'The unknown subtrahend'),
  T(37, 'Qoʻshish va ayirish bogʻligʻi', 'Связь сложения и вычитания', 'Addition and subtraction together'),
  T(38, 'Oʻrin almashtirish xossasi', 'Переместительное свойство', 'Swapping the addends'),
  T(39, 'Qoʻshish jadvali', 'Таблица сложения', 'The addition table'),
  T(40, 'Solishtirish xossasi', 'Свойство сравнения', 'The comparison rule'),
  T(41, 'Sonli ifodalar', 'Числовые выражения', 'Number expressions'),
  // ---- Part 2 (42–74) ----
  T(42, 'Oʻn birdan yigirmagacha sonlar', 'Числа от 11 до 20', 'Numbers from 11 to 20'),
  T(43, 'Sonlarni xona boʻyicha yozamiz', 'Записываем числа по разрядам', 'Writing numbers by place value'),
  T(44, '11 va 12 sonlarining tarkibi', 'Состав чисел 11 и 12', 'Making 11 and 12'),
  T(45, '13 va 14 sonlarining tarkibi', 'Состав чисел 13 и 14', 'Making 13 and 14'), T(46, '15 va 16 sonlarining tarkibi', 'Состав чисел 15 и 16', 'Making 15 and 16'), T(47, '17 va 18 sonlarining tarkibi', 'Состав чисел 17 и 18', 'Making 17 and 18'), T(48, '19, 20 va juft-toq sonlar', 'Числа 19, 20 и чёт-нечет', '19, 20 and even & odd'), T(49, 'Sonlarni taqqoslaymiz', 'Сравниваем числа', 'Comparing numbers'), T(50, 'Qavslar: amallar tartibi', 'Скобки: порядок действий', 'Brackets: order of operations'),
  T(51, 'Qavslar bilan ishlaymiz', 'Работаем со скобками', 'Working with brackets'), T(52, 'Oʻnlikdan oʻtib qoʻshish', 'Сложение с переходом через десяток', 'Adding across the ten'), T(53, 'Oʻnlikdan oʻtib qoʻshish — mashq', 'Сложение через десяток — практика', 'Adding across the ten — practice'), T(54, 'Oʻnlikdan oʻtib qoʻshishni mustahkamlaymiz', 'Закрепляем сложение через десяток', 'More adding across the ten'), T(55, 'Sonlarni ayiramiz', 'Вычитаем числа', 'Subtracting numbers'), T(56, 'Sonlarni boʻlaklab ayiramiz', 'Вычитаем числа по частям', 'Subtracting in parts'), T(57, 'Oʻnlikdan ayirish usuli', 'Способ вычитания из десятка', 'Subtracting through the ten'), T(58, 'Yaxlit sonlar', 'Круглые числа', 'Round numbers'), T(59, '21 dan 100 gacha sonlar', 'Числа от 21 до 100', 'Numbers from 21 to 100'), T(60, '21–100: sonlarni oʻqish va yozish', '21–100: чтение и запись чисел', '21–100: reading and writing numbers'),
  T(61, '21–100: oʻnlik va birliklar', '21–100: десятки и единицы', '21–100: tens and ones'), T(62, 'Ikki xonali sonlarni taqqoslaymiz', 'Сравниваем двузначные числа', 'Comparing two-digit numbers'), T(63, 'Ikki xonali sonlarni qoʻshamiz', 'Складываем двузначные числа', 'Adding two-digit numbers'), T(64, 'Ikki xonali sonlarni qoʻshish — mashq', 'Сложение двузначных — практика', 'Adding two-digit numbers — practice'), T(65, 'Ikki xonali qoʻshish: xona birliklari', 'Сложение двузначных по разрядам', 'Two-digit addition by place value'), T(66, 'Ikki xonali sonlarni ayiramiz', 'Вычитаем двузначные числа', 'Subtracting two-digit numbers'), T(67, 'Ikki xonali ayirish: xona birliklari', 'Вычитание двузначных по разрядам', 'Two-digit subtraction by place value'), T(68, 'Ayirish va tengsizliklar', 'Вычитание и неравенства', 'Subtraction and inequalities'), T(69, 'Qoʻshish va ayirish bogʻlanishi', 'Связь сложения и вычитания', 'Addition and subtraction together'), T(70, 'Koʻp komponentli qoʻshish', 'Сложение нескольких чисел', 'Adding several numbers'),
  T(71, 'Qoʻshishning guruhlash xossasi', 'Сочетательное свойство сложения', 'The grouping property of addition'), T(72, 'Tarkibli ifodalar', 'Составные выражения', 'Compound expressions'), T(73, 'Qavsli tarkibli ifodalar', 'Составные выражения со скобками', 'Compound expressions with brackets'), P(74),
  T(75, 'Masala nimalardan iborat?', 'Из чего состоит задача', 'Parts of a word problem'), T(76, 'Masalani yechish algoritmi', 'Алгоритм решения задачи', 'How to solve a problem'), T(77, 'Sodda masalalar', 'Простые задачи', 'Simple word problems'), T(78, 'Masala sharti qanday beriladi', 'Способы записи условия', 'Ways to show a problem'), T(79, 'Masalalarni yechamiz', 'Решаем задачи', 'Solving word problems'), T(80, 'Butunni topamiz', 'Находим целое', 'Finding the whole'), T(81, 'Butunni topamiz — mashq', 'Находим целое — практика', 'Finding the whole — practice'), T(82, 'Butunni topamiz: 10 gacha toʻldirish', 'Целое: дополнение до 10', 'Finding the whole: fill to 10'), T(83, 'Qismni topamiz', 'Находим часть', 'Finding the parts'), T(84, 'Qismni topamiz — mashq', 'Находим часть — практика', 'Finding the parts — practice'),
  T(85, 'Masalalarni yechamiz — takrorlash', 'Решаем задачи — повторение', 'Solving problems — review'), T(86, 'Orttirish va kamaytirish masalalari', 'Задачи на увеличение и уменьшение', 'More and fewer problems'), T(87, 'Ortiq va kam: ifodalar tuzamiz', 'Больше и меньше: составляем выражения', 'More and fewer: writing expressions'), T(88, 'Shart boʻyicha sonni yasaymiz', 'Собираем число по условию', 'Building a number from the condition'), T(89, 'Qancha ortiq, qancha kam?', 'Насколько больше, насколько меньше?', 'How much more, how much fewer?'), T(90, 'Taqqoslashga doir masalalar', 'Задачи на сравнение', 'Comparison problems'), T(91, 'Taqqoslash: sayyoralar olami', 'Сравнение: мир планет', 'Comparison: the planets'), T(92, 'Taqqoslash: kerakli sonni topamiz', 'Сравнение: находим нужное число', 'Comparison: finding the number'), T(93, 'Taqqoslash: yoshlar va ifodalar', 'Сравнение: возраст и выражения', 'Comparison: ages and expressions'), T(94, 'Murakkab masalalarni yechamiz', 'Решаем сложные задачи', 'Solving complex problems'),
  T(95, 'Yetishmayotgan maʼlumotni toʻldiramiz', 'Дополняем недостающие данные', 'Completing missing data'), T(96, 'Nostandart masalalar: variantlar', 'Нестандартные задачи: варианты', 'Logic problems: counting the ways'), T(97, 'Ikki amalli masalalarni yechamiz', 'Решаем задачи в два действия', 'Solving two-step problems'), T(98, 'Murakkab va mantiqiy masalalar', 'Сложные и логические задачи', 'Complex and logic problems'), T(99, 'Uzunlik. Santimetr', 'Длина. Сантиметр', 'Length. The centimetre'),
  T(100, 'Kesma uzunligini oʻlchaymiz', 'Измеряем длину отрезка', "Measuring a segment's length"),
  T(101, 'Detsimetr bilan tanishamiz', 'Знакомимся с дециметром', 'Meet the decimetre'),
  T(102, 'Detsimetrni santimetrga aylantiramiz', 'Переводим дециметры в сантиметры', 'Turning decimetres into centimetres'),
  T(103, 'Masalalarni birga yechamiz', 'Решаем задачи вместе', 'Solving problems together'),
  T(104, 'Massa va kilogramm', 'Масса и килограмм', 'Mass and the kilogram'),
  T(105, 'Kilogramm bilan masalalar', 'Задачи с килограммами', 'Problems with kilograms'),
  P(106), P(107), P(108), P(109), P(110), P(111)
];

export function getTopic(key: string): TopicMeta | undefined {
  return G1_MATH_TOPICS.find((t) => t.key === key);
}
