import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-art-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/**
 * Grade-1 "Tasviriy sanʼat" (Visual arts) — Mundarija (R.R. Ismailova, 2023).
 * A flat sequence of drawing/colouring lessons. Most lessons are a single
 * creative task (draw / colour); a few open with basic questions. NO audio and
 * NO emojis — visuals are pure SVG art.
 */
export const G1_ART_TOPICS: TopicMeta[] = [
  T(1, 'Tasviriy sanʼat nima?', 'Что такое изобразительное искусство?', 'What is visual art?'),
  T(2, 'Oʻlkamiz boyliklari', 'Богатства нашего края', 'The riches of our land'),
  T(3, 'Kuzgi yaproqlar', 'Осенние листья', 'Autumn leaves'),
  T(4, 'Kuzgi yaproqlarning toʻkilishi', 'Листопад', 'Falling autumn leaves'),
  T(5, 'Shtamplar bilan ishlaymiz', 'Работаем со штампами', 'Working with stamps'),
  T(6, 'Kuzgi oʻrmon', 'Осенний лес', 'The autumn forest'),
  T(7, 'Kamalak', 'Радуга', 'The rainbow'),
  T(8, 'Sovun pufakchalari', 'Мыльные пузыри', 'Soap bubbles'),
  T(9, 'Hosil yigʻim-terimi', 'Сбор урожая', 'Harvest time'),
  T(10, 'Sabzavotlar', 'Овощи', 'Vegetables'),
  T(11, 'Uzum', 'Виноград', 'Grapes'),
  T(12, 'Olma', 'Яблоко', 'The apple'),
  T(13, 'Qor parchasi', 'Снежинка', 'The snowflake'),
  T(14, 'Sumalaklar manzarasi', 'Сосульки', 'Icicles'),
  T(15, 'Qoʻlqop', 'Варежки', 'Mittens'),
  T(16, 'Qor — sachratish usuli', 'Снег — приём разбрызгивания', 'Snow — splatter technique'),
  T(17, 'Samolyot', 'Самолёт', 'The airplane'),
  T(18, 'Vatan himoyachilari', 'Защитники Родины', 'Defenders of the homeland'),
  T(19, 'Oʻrmon jonivorlari. Quyoncha', 'Лесные звери. Зайчик', 'Forest animals. The bunny'),
  T(20, 'Ajoyib hayvonlar', 'Удивительные животные', 'Wonderful animals'),
  T(21, 'Gul solingan guldon', 'Ваза с цветами', 'A vase of flowers'),
  T(22, 'Guldondagi gul — sachratish', 'Цветы в вазе — разбрызгивание', 'Flowers in a vase — splatter'),
  T(23, 'Nastarin guli novdasi', 'Ветка сирени', 'A lilac branch'),
  T(24, 'Bahor gullari', 'Весенние цветы', 'Spring flowers'),
  T(25, 'Mimoza', 'Мимоза', 'Mimosa'),
  T(26, 'Bahor manzarasi', 'Весенний пейзаж', 'A spring scene'),
  T(27, 'Bahorni chizamiz', 'Рисуем весну', 'Drawing spring'),
  T(28, 'Olma daraxti', 'Яблоня', 'The apple tree'),
  T(29, 'Rang-barang kapalaklar', 'Разноцветные бабочки', 'Colourful butterflies'),
  T(30, 'Kapalaklar rasmini chizamiz', 'Рисуем бабочек', 'Drawing butterflies'),
  T(31, 'Sponj yordamida chizamiz', 'Рисуем губкой', 'Painting with a sponge'),
  T(32, 'Gʻijimlangan qogʻoz yordamida', 'Рисуем смятой бумагой', 'Painting with crumpled paper'),
  T(33, 'Qogʻoz rasmini chizamiz', 'Рисуем узор на бумаге', 'A paper pattern'),
  T(34, 'Monotipiya. Kapalak', 'Монотипия. Бабочка', 'Monotype. Butterfly'),
  T(35, 'Monotipiya', 'Монотипия', 'Monotype'),
  T(36, 'Biz nimalarni oʻrgandik', 'Чему мы научились', 'What we have learned')
];

export function getArtTopic(key: string): TopicMeta | undefined {
  return G1_ART_TOPICS.find((t) => t.key === key);
}
