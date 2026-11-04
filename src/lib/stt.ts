import 'server-only';
import { groqKey } from '@/lib/lab/server';
import { uzLatin } from '@/lib/uzLatin';

/** large-v3 recognises Uzbek better; turbo is the fallback when it is busy. */
const MODELS = ['whisper-large-v3', 'whisper-large-v3-turbo'];

export const sttConfigured = () => !!groqKey();

/**
 * Groq Whisper speech-to-text for the AI tutor. `hint` is what is on the
 * student's screen (the test question, the tutor's last message…): Whisper
 * uses it to spell the right words. Uzbek output is cleaned to Latin script.
 */
export async function transcribe(audio: Blob, opts: { lang: string; hint?: string }): Promise<{ ok: true; text: string; model: string } | { ok: false; error: string }> {
  const key = groqKey();
  if (!key) return { ok: false, error: 'not_configured' };
  const ext = /mp4|m4a|aac/.test(audio.type) ? 'm4a' : /ogg/.test(audio.type) ? 'ogg' : /wav/.test(audio.type) ? 'wav' : 'webm';
  // Whisper reads ~224 tokens of prompt; keep the end, closest to the question
  const prompt = (opts.hint ?? '').replace(/\s+/g, ' ').trim().slice(-400);
  let last = '';
  for (const model of MODELS) {
    const form = new FormData();
    form.append('file', audio, `question.${ext}`);
    form.append('model', model);
    form.append('language', opts.lang);
    if (prompt) form.append('prompt', prompt);
    form.append('response_format', 'json');
    form.append('temperature', '0');
    try {
      const r = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}` },
        body: form,
        signal: AbortSignal.timeout(30_000)
      });
      const t = await r.text();
      if (r.ok) {
        const raw = String(JSON.parse(t).text ?? '').trim();
        return { ok: true, text: opts.lang === 'uz' ? uzLatin(raw) : raw, model };
      }
      last = `${model}: ${r.status} ${t.slice(0, 200)}`;
    } catch (e) {
      last = `${model}: ${(e as Error).message}`;
    }
  }
  return { ok: false, error: last };
}
