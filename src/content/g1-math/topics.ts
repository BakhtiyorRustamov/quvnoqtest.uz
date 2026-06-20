import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-math-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/**
 * Grade-1 Mathematics, part 1 — all 41 topics (Mundarija).
 * Topic 1 is the fully built lesson; topics 2–41 are "Coming soon" pages.
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
  T(41, 'Sonli ifodalar', 'Числовые выражения', 'Number expressions')
];

export function getTopic(key: string): TopicMeta | undefined {
  return G1_MATH_TOPICS.find((t) => t.key === key);
}
