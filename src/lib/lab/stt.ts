import 'server-only';
import { googleKey, googleListenModels, groqKey } from './server';
import { WHISPER_MODELS } from './align';

/** Words Whisper should spell the textbook way (Whisper's `prompt` biases spelling). */
export const STT_HINT =
  "Matematika darsi. Funksiya, argument, orttirma, urinma, kesuvchi, hosila, limit, uzluksizlik, uzilish nuqtasi, oʻrtacha tezlik, oniy tezlik, grafik, nisbat, Δx, Δy.";

export type SttResult = { ok: true; text: string; model: string; ms: number } | { ok: false; error: string; ms: number };

/** Groq Whisper (free tier). */
export async function whisperText(wavFile: Buffer, language = 'uz'): Promise<SttResult> {
  const t0 = Date.now();
  const key = groqKey();
  if (!key) return { ok: false, error: 'GROQ_API_KEY not set', ms: 0 };
  let last = '';
  for (const model of WHISPER_MODELS) {
    const form = new FormData();
    form.append('file', new Blob([new Uint8Array(wavFile)], { type: 'audio/wav' }), 'question.wav');
    form.append('model', model);
    form.append('language', language);
    form.append('prompt', STT_HINT);
    form.append('response_format', 'json');
    form.append('temperature', '0');
    try {
      const r = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}` },
        body: form,
        signal: AbortSignal.timeout(40_000)
      });
      const t = await r.text();
      if (r.ok) return { ok: true, text: String(JSON.parse(t).text ?? '').trim(), model, ms: Date.now() - t0 };
      last = `${model}: ${r.status} ${t.slice(0, 200)}`;
    } catch (e) {
      last = `${model}: ${(e as Error).message}`;
    }
  }
  return { ok: false, error: last, ms: Date.now() - t0 };
}

/** Gemini Flash listening to the audio (free tier, smaller daily quota). */
export async function geminiText(wavFile: Buffer): Promise<SttResult> {
  const t0 = Date.now();
  const key = googleKey();
  if (!key) return { ok: false, error: 'GOOGLE_AI_API_KEY not set', ms: 0 };
  const prompt = `Transcribe this audio exactly as spoken. The speaker is a school student, usually speaking Uzbek (sometimes with Russian words). Write Uzbek in the Latin alphabet with oʻ and gʻ. Write numbers as digits and math symbols as they are said. Return only the transcript — no comments, no quotes. Context: ${STT_HINT}`;
  let last = '';
  for (const model of (await googleListenModels()).slice(0, 2)) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'audio/wav', data: wavFile.toString('base64') } }] }],
          generationConfig: { temperature: 0, maxOutputTokens: 2000 }
        }),
        signal: AbortSignal.timeout(40_000)
      });
      const t = await r.text();
      if (r.ok) {
        const d = JSON.parse(t);
        const text = (d.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? '').join('').trim();
        return { ok: true, text, model, ms: Date.now() - t0 };
      }
      last = `${model}: ${r.status} ${t.slice(0, 200)}`;
    } catch (e) {
      last = `${model}: ${(e as Error).message}`;
    }
  }
  return { ok: false, error: last, ms: Date.now() - t0 };
}
