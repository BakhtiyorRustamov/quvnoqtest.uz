import 'server-only';
import { groqKey } from './server';

/**
 * "Listen" to the narration with speech recognition (Groq Whisper, free tier)
 * to find where each paragraph really starts. We already know the exact text,
 * so the recognised words only need to be roughly right: they are aligned to
 * the script and the first words of every paragraph give us its start time.
 */

export type AsrWord = { word: string; start: number; end: number };

export const WHISPER_MODELS = ['whisper-large-v3-turbo', 'whisper-large-v3'];

export async function transcribeWords(wavFile: Buffer, language = 'uz'): Promise<{ ok: true; words: AsrWord[]; model: string } | { ok: false; error: string }> {
  const key = groqKey();
  if (!key) return { ok: false, error: 'GROQ_API_KEY not set' };
  let last = '';
  for (const model of WHISPER_MODELS) {
    const form = new FormData();
    form.append('file', new Blob([new Uint8Array(wavFile)], { type: 'audio/wav' }), 'narration.wav');
    form.append('model', model);
    form.append('language', language);
    form.append('response_format', 'verbose_json');
    form.append('timestamp_granularities[]', 'word');
    form.append('temperature', '0');
    try {
      const r = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}` },
        body: form,
        signal: AbortSignal.timeout(90_000)
      });
      const t = await r.text();
      if (!r.ok) {
        last = `${model}: ${r.status} ${t.slice(0, 200)}`;
        continue;
      }
      const d = JSON.parse(t) as { words?: AsrWord[] };
      if (d.words?.length) return { ok: true, words: d.words, model };
      last = `${model}: no word timestamps`;
    } catch (e) {
      last = `${model}: ${(e as Error).message}`;
    }
  }
  return { ok: false, error: `speech recognition failed — ${last}` };
}

/** lower-case letters/digits only; all Uzbek apostrophe variants removed */
export function norm(w: string): string {
  return w
    .toLowerCase()
    .replace(/[ʻʼ'‘’`´]/g, '')
    .replace(/[^\p{L}\p{N}]/gu, '');
}

const tokens = (t: string) => t.split(/\s+/).map(norm).filter(Boolean);

function similarity(a: string, b: string): number {
  if (a === b) return 1;
  const m = a.length;
  const n = b.length;
  if (!m || !n) return 0;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return 1 - prev[n] / Math.max(m, n);
}

/**
 * Align the script to the recognised words and return, for every boundary
 * between paragraph k and k+1, the time (seconds) where the cut should go —
 * or null when the words around that boundary were not recognised.
 */
export function boundaryTimes(texts: string[], words: AsrWord[]): (number | null)[] {
  const script: { w: string; p: number }[] = [];
  texts.forEach((t, p) => tokens(t).forEach((w) => script.push({ w, p })));
  const heard = words.map((w) => ({ ...w, n: norm(w.word) })).filter((w) => w.n);
  const A = script.length;
  const B = heard.length;
  if (!A || !B) return texts.slice(1).map(() => null);

  // Needleman–Wunsch: matching similar words scores, skipping a word costs a little
  const GAP = -0.4;
  const score = (i: number, j: number) => {
    const s = similarity(script[i].w, heard[j].n);
    return s >= 0.6 ? 2 * s : -1;
  };
  const W = B + 1;
  const dp = new Float32Array((A + 1) * W);
  const mv = new Uint8Array((A + 1) * W); // 1 diag, 2 up (skip script), 3 left (skip heard)
  for (let i = 1; i <= A; i++) {
    dp[i * W] = i * GAP;
    mv[i * W] = 2;
  }
  for (let j = 1; j <= B; j++) {
    dp[j] = j * GAP;
    mv[j] = 3;
  }
  for (let i = 1; i <= A; i++) {
    for (let j = 1; j <= B; j++) {
      const d = dp[(i - 1) * W + j - 1] + score(i - 1, j - 1);
      const u = dp[(i - 1) * W + j] + GAP;
      const l = dp[i * W + j - 1] + GAP;
      if (d >= u && d >= l) {
        dp[i * W + j] = d;
        mv[i * W + j] = 1;
      } else if (u >= l) {
        dp[i * W + j] = u;
        mv[i * W + j] = 2;
      } else {
        dp[i * W + j] = l;
        mv[i * W + j] = 3;
      }
    }
  }
  const match = new Int32Array(A).fill(-1);
  for (let i = A, j = B; i > 0 || j > 0; ) {
    const m = mv[i * W + j];
    if (m === 1) {
      if (score(i - 1, j - 1) > 0) match[i - 1] = j - 1;
      i--;
      j--;
    } else if (m === 2) i--;
    else j--;
  }

  const out: (number | null)[] = [];
  for (let k = 1; k < texts.length; k++) {
    const idx = script.map((s, i) => (s.p === k ? i : -1)).filter((i) => i >= 0);
    const prevIdx = script.map((s, i) => (s.p === k - 1 ? i : -1)).filter((i) => i >= 0);
    // first recognised word among the first 4 of paragraph k; last among the last 4 of paragraph k-1
    const startJ = idx.slice(0, 4).map((i) => match[i]).find((j) => j >= 0);
    const endJ = prevIdx.slice(-4).reverse().map((i) => match[i]).find((j) => j >= 0);
    const start = startJ !== undefined ? heard[startJ].start : null;
    const end = endJ !== undefined ? heard[endJ].end : null;
    if (start !== null && end !== null && end <= start + 0.05) out.push((start + end) / 2);
    else out.push(start ?? end ?? null);
  }
  return out;
}

/** First few words heard in each clip (for checking in /lab). */
export function heardPerClip(words: AsrWord[], clipBounds: [number, number][]): string[] {
  return clipBounds.map(([a, b]) =>
    words
      .filter((w) => w.start >= a - 0.05 && w.start < b)
      .slice(0, 5)
      .map((w) => w.word.trim())
      .join(' ')
  );
}
