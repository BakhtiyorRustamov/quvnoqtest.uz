/**
 * Textbook passages for the /lab RAG test, and a small keyword search over them.
 *
 * Uzbek words take long suffix chains (limit → limitini, limitga, limitlarni),
 * so words are compared by their first 5 letters. Each matching stem is weighted
 * by how rare it is across the book (IDF), and headings count double. That is
 * enough for a few chapters; a larger library would move to embeddings
 * (e.g. Supabase pgvector) with the same interface.
 */

export type BookPassage = { id: string; section: string; page: number; heading: string; text: string };
export type BookInfo = { id: string; title: string; sections: string };

export const BOOKS: BookInfo[] = [
  { id: 'math11-1', title: 'Matematika 11-sinf, I qism (Algebra va analiz asoslari)', sections: '1–2 va 3–4-mavzular (3–15-betlar)' }
];

const STOP = new Set(
  'va bu da ga ni ning bilan uchun deb esa ham yoki agar boʻlsa qanday nima necha qaysi shu bir ikki uning ular biz siz men nega ekan toping hisoblang tushuntir tushuntiring haqida mavzu'
    .split(' ')
);

/** Lower-case, one apostrophe style, letters/digits only. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ʻʼ'‘’`´]/g, '')
    .replace(/[²]/g, '2')
    .replace(/[^a-z0-9а-яёўқғҳ\s]/gi, ' ');
}

function stems(s: string): string[] {
  return normalize(s)
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP.has(w))
    .map((w) => (w.length > 5 ? w.slice(0, 5) : w));
}

export type Hit = BookPassage & { score: number };

/** Best passages for a query, within a character budget (keeps model prompts small). */
export function searchBook(passages: BookPassage[], query: string, maxChars = 3500, maxHits = 4): Hit[] {
  const q = [...new Set(stems(query))];
  if (!q.length) return [];
  const docs = passages.map((p) => ({ p, body: stems(p.text), head: new Set(stems(p.heading)) }));
  const df = new Map<string, number>();
  for (const d of docs) for (const s of new Set(d.body)) df.set(s, (df.get(s) ?? 0) + 1);
  const N = docs.length;

  const scored = docs
    .map(({ p, body, head }) => {
      let score = 0;
      for (const s of q) {
        const tf = body.filter((b) => b === s).length;
        if (!tf && !head.has(s)) continue;
        const idf = Math.log(1 + N / (df.get(s) ?? 1));
        score += idf * (Math.min(tf, 5) / 2 + (head.has(s) ? 2 : 0));
      }
      return { ...p, score };
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score);

  const out: Hit[] = [];
  let used = 0;
  for (const h of scored) {
    if (out.length >= maxHits) break;
    if (out.length && h.score < scored[0].score * 0.25) break; // weak matches only add noise
    if (used + h.text.length > maxChars && out.length) continue;
    out.push(h);
    used += h.text.length;
  }
  return out;
}

/** Passages formatted for a prompt, each tagged with its page. */
export function excerptBlock(hits: Hit[]): string {
  return hits.map((h) => `[${h.page}-bet, ${h.section}-mavzu — ${h.heading}]\n${h.text}`).join('\n\n');
}
