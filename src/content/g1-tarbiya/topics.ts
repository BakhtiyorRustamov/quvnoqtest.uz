import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-tarbiya-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/**
 * Grade-1 "Tarbiya" (Character education) — Mundarija, mirrored to the pupil's
 * book table of contents. Four boʻlim: Mening Vatanim – Oʻzbekiston (1-7),
 * Men va doʻstlarim (8-11), Men va fazilatlarim (12-16), Bizning madaniyatimiz
 * (17-21). Each lesson mixes a few closed questions with open-ended reflection.
 */
export const G1_TARBIYA_TOPICS: TopicMeta[] = [
  T(1, 'Men yashaydigan Oʻzbekiston', 'Узбекистан, где я живу', 'The Uzbekistan I live in'),
  T(2, 'Men kimman?', 'Кто я?', 'Who am I?'),
  T(3, 'Maktabga sayohat', 'Путешествие по школе', 'A tour of the school'),
  T(4, 'Maktabim – ikkinchi uyim', 'Моя школа — мой второй дом', 'My school is my second home'),
  T(5, 'Uydan maktabgacha yoʻl', 'Дорога из дома в школу', 'The way from home to school'),
  T(6, 'Biz ahil jamoamiz', 'Мы — дружный коллектив', 'We are a friendly community'),
  T(7, 'Mustahkamlash', 'Закрепление', 'Consolidation'),
  T(8, 'Soʻzlashish odobi', 'Культура общения', 'Polite speech'),
  T(9, 'Oʻzaro yordam', 'Взаимопомощь', 'Helping each other'),
  T(10, 'Minnatdorlik', 'Благодарность', 'Gratitude'),
  T(11, 'Mustahkamlash', 'Закрепление', 'Consolidation'),
  T(12, 'Ishonch nima?', 'Что такое доверие?', 'What is trust?'),
  T(13, 'Men mustaqil boʻlaman', 'Я стану самостоятельным', 'I will be independent'),
  T(14, 'Halollik', 'Честность', 'Honesty'),
  T(15, 'Asrab-avaylaymiz', 'Бережём и охраняем', 'We cherish and protect'),
  T(16, 'Mustahkamlash', 'Закрепление', 'Consolidation'),
  T(17, 'Mening xatti-harakatlarim', 'Мои поступки', 'My actions'),
  T(18, 'Mehmondorchilik odobi', 'Правила гостеприимства', 'The etiquette of hospitality'),
  T(19, 'Bagʻrikeng yurtim', 'Мой толерантный край', 'My tolerant homeland'),
  T(20, 'Mustahkamlash', 'Закрепление', 'Consolidation'),
  T(21, 'Yakuniy dars', 'Итоговый урок', 'Final lesson')
];

export function getTarbiyaTopic(key: string): TopicMeta | undefined {
  return G1_TARBIYA_TOPICS.find((t) => t.key === key);
}
