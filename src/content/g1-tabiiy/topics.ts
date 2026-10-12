import type { TopicMeta } from '@/content/types';

const T = (n: number, uz: string, ru: string, en: string): TopicMeta => ({
  n,
  key: `g1-tabiiy-${String(n).padStart(2, '0')}`,
  title: { uz, ru, en }
});

/** Numbered placeholder title for not-yet-authored topics (6–28). */
const P = (n: number): TopicMeta => ({
  n,
  key: `g1-tabiiy-${String(n).padStart(2, '0')}`,
  title: { uz: `${n}-mavzu`, ru: `Тема ${n}`, en: `Lesson ${n}` }
});

/** First topic number of Part 2 (used by the subject view to split the lists). */
export const G1_TABIIY_PART2_START = 15;

/**
 * Grade-1 Tabiiy fanlar (Natural science) — Mundarija.
 * Part 1 = topics 1–14; Part 2 = topics 15–28.
 * Topics 1–5 are fully built lessons (authored from the textbook, original
 * wording); the rest are "Coming soon" placeholder pages until authored.
 */
export const G1_TABIIY_TOPICS: TopicMeta[] = [
  T(1, 'Men va besh sezgim', 'Я и мои пять чувств', 'Me and my five senses'),
  T(2, 'Atrofimdagi obyektlar olami', 'Мир предметов вокруг меня', 'The world of objects around me'),
  T(3, 'Narsalar nimadan yasalgan?', 'Из чего сделаны предметы?', 'What are things made of?'),
  T(4, 'Yashil doʻstlar: oʻsimliklar', 'Зелёные друзья: растения', 'Green friends: plants'),
  T(5, 'Hayvonlar dunyosiga sayohat', 'Путешествие в мир животных', 'A journey into the animal world'),
  T(6, 'Oʻrmon va oʻtloq sirlari', 'Тайны леса и луга', 'Secrets of the forest and meadow'),
  T(7, 'Hayvonot bogʻiga tashrif', 'Визит в зоопарк', 'A visit to the zoo'),
  T(8, 'Kuz — hosil fasli', 'Осень — пора урожая', 'Autumn — the harvest season'),
  T(9, 'Vaqt va hafta kunlari', 'Время и дни недели', 'Time and the days of the week'),
  T(10, 'Toʻrt fasl olami', 'Мир четырёх сезонов', 'The world of four seasons'),
  T(11, 'Jonivorlar qishga tayyorlanadi', 'Как животные готовятся к зиме', 'How animals get ready for winter'),
  T(12, 'Qor va sovuq hodisalari', 'Снежные и морозные явления', 'Snow and cold weather events'),
  T(13, 'Suv qanday oʻzgaradi?', 'Как изменяется вода?', 'How does water change?'),
  T(14, 'Tabiatdagi oʻzgarishlar', 'Изменения в природе', 'Changes in nature'),
  // ---- Part 2 (15–28) ----
  T(15, 'Qogʻoz qanday paydo boʻladi?', 'Как появляется бумага?', 'How is paper made?'),
  T(16, 'Idish-tovoqlar olami', 'Мир посуды', 'The world of dishes'),
  T(17, 'Non qanday yetib keladi?', 'Как хлеб попадает к нам?', 'How does bread reach us?'),
  T(18, 'Uydagi yordamchilar', 'Домашние помощники', 'Helpers around the home'),
  T(19, 'Xavfsiz uy qoidalari', 'Правила безопасного дома', 'Safe-home rules'),
  T(20, 'Transport olami', 'Мир транспорта', 'The world of transport'),
  T(21, 'Yoʻlda xavfsizlik va svetofor', 'Безопасность на дороге и светофор', 'Road safety and the traffic light'),
  T(22, 'Jamoat transportida xavfsizlik', 'Безопасность в общественном транспорте', 'Safety on public transport'),
  T(23, 'Takrorlash: atrofimizdagi olam', 'Повторение: мир вокруг нас', 'Review: the world around us'),
  T(24, 'Telefon va favqulodda yordam', 'Телефон и экстренная помощь', 'The phone and emergency help'),
  P(25), P(26), P(27), P(28)
];

export function getTabiiyTopic(key: string): TopicMeta | undefined {
  return G1_TABIIY_TOPICS.find((t) => t.key === key);
}
