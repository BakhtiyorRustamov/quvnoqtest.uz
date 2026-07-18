import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-tex-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/**
 * Grade-1 "Texnologiya" (Technology / hands-on crafts) — Mundarija
 * (R.R. Ismailova, 2023). A hands-on subject: each lesson lists materials and
 * steps for making something from paper, plastilin or natural materials, and
 * the child marks it done (optionally with a photo of their finished work).
 * NO audio and NO emojis. Lesson 13 (New-Year tree) is swapped for a neutral
 * winter craft (paper snowflake).
 */
export const G1_TEX_TOPICS: TopicMeta[] = [
  T(1, 'Tabiiy olam va inson mehnati mahsuli', 'Природа и творения человека', 'Nature and things people make'),
  T(2, 'Texnologiya darsida ishlash qoidalari', 'Правила работы на уроке технологии', 'Rules for the technology lesson'),
  T(3, 'Kapalak qurti', 'Гусеница', 'A caterpillar'),
  T(4, 'Kamalak', 'Радуга', 'A rainbow'),
  T(5, 'Olma', 'Яблоко', 'An apple'),
  T(6, 'Quyoncha', 'Зайчик', 'A bunny'),
  T(7, 'Guldon', 'Ваза', 'A vase'),
  T(8, 'Fotosurat uchun ramka', 'Рамка для фото', 'A photo frame'),
  T(9, 'Olma koʻtargan tipratikan', 'Ёжик с яблоком', 'A hedgehog carrying an apple'),
  T(10, 'Xonaqizi', 'Божья коровка', 'A ladybug'),
  T(11, 'Kashtandan oʻyinchoqlar', 'Игрушки из каштанов', 'Toys from chestnuts'),
  T(12, 'Qirqib, yelimlaymiz', 'Вырезаем и клеим', 'Cut and glue'),
  T(13, 'Qogʻozdan qor parchasi', 'Снежинка из бумаги', 'A paper snowflake'),
  T(14, 'Bulutcha', 'Облачко', 'A little cloud'),
  T(15, 'Baliqchalar', 'Рыбки', 'Little fish'),
  T(16, 'Rang-barang uycha', 'Разноцветный домик', 'A colourful house'),
  T(17, 'Akvarium', 'Аквариум', 'An aquarium'),
  T(18, 'Joʻja', 'Цыплёнок', 'A chick'),
  T(19, 'Oqqush', 'Лебедь', 'A swan'),
  T(20, 'Kemacha', 'Кораблик', 'A little boat'),
  T(21, 'Quvnoq hasharotlar', 'Весёлые насекомые', 'Cheerful insects'),
  T(22, 'Plastilindan yeguliklar', 'Еда из пластилина', 'Foods from plastilin'),
  T(23, '8-mart sovgʻasi', 'Подарок к 8 Марта', 'An 8th of March gift'),
  T(24, 'Erkin mavzu', 'Свободная тема', 'Free topic'),
  T(25, '"Domino" oʻyini', 'Игра «Домино»', 'The "Domino" game'),
  T(26, 'Bahorgi bogʻ', 'Весенний сад', 'A spring garden'),
  T(27, 'Rang-barang lolalar', 'Разноцветные тюльпаны', 'Colourful tulips'),
  T(28, 'Naqsh', 'Узор', 'A pattern'),
  T(29, 'Erkin mavzu', 'Свободная тема', 'Free topic'),
  T(30, 'Dengiz jonivorlari', 'Морские животные', 'Sea animals')
];

export function getTexTopic(key: string): TopicMeta | undefined {
  return G1_TEX_TOPICS.find((t) => t.key === key);
}
