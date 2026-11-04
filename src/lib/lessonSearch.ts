import 'server-only';
import { G11_SUBJECTS } from '@/content/g11/subjects';
import { g11LessonsFor, g11LessonHref, g11LessonLabel } from '@/content/g11/lessons';

/**
 * Tiny keyword search over the site's prepared lessons (senior track), so every AI answer —
 * brief or detailed — can point the student to lessons that already explain the topic.
 */
export type LessonHit = { title: string; subject: string; label: string; href: string };
type Entry = LessonHit & { words: string[] };

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ʻʼ‘’'`]/g, '')
    .replace(/[^a-zа-яё0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3);
const STOP = new Set(['va', 'bilan', 'uchun', 'nima', 'qanday', 'qilib', 'haqida', 'nega', 'mavzu', 'dars', 'the', 'and', 'what', 'how', 'это', 'как', 'что']);
// a cheap stem: the first 5 letters (Uzbek suffixes hang off the end)
const stem = (w: string) => w.slice(0, 5);

let INDEX: Entry[] | null = null;
function index(): Entry[] {
  if (INDEX) return INDEX;
  INDEX = [];
  for (const s of G11_SUBJECTS) {
    for (const l of g11LessonsFor(s.slug)) {
      if (!l.board) continue; // only lessons that really have content
      const title = l.title.uz;
      INDEX.push({ title, subject: s.name.uz, label: g11LessonLabel(l), href: g11LessonHref(s.slug, l.n), words: [...norm(title), ...norm(s.name.uz)].map(stem) });
    }
  }
  return INDEX;
}

export function searchLessons(query: string, limit = 3): LessonHit[] {
  const q = [...new Set(norm(query).filter((w) => !STOP.has(w)).map(stem))];
  if (!q.length) return [];
  return index()
    .map((e) => ({ e, score: q.filter((w) => e.words.includes(w)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ e }) => ({ title: e.title, subject: e.subject, label: e.label, href: e.href }));
}

/** a line for the AI's system prompt */
export const lessonsForPrompt = (hits: LessonHit[]) =>
  hits.length ? `\nThe site has these lessons on the topic (mention them briefly if relevant): ${hits.map((h) => `${h.subject} — ${h.title}`).join('; ')}.` : '';
