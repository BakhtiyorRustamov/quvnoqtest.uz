import 'server-only';
import { googleKey, googleTtsModels } from './server';
import { GEMINI_VOICES } from './plan';

export const DEFAULT_STYLE = 'warm, clear and friendly, like a kind school teacher, at a calm pace';

/** 16-bit mono PCM → WAV. */
export function wav(pcm: Buffer, rate = 24000): Buffer {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVEfmt ', 8);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(1, 22);
  h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write('data', 36);
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

/** Pull 16-bit PCM and the sample rate out of a WAV file (any chunk order). */
export function readWav(buf: Buffer): { pcm: Buffer; rate: number } {
  if (buf.subarray(0, 4).toString() !== 'RIFF') return { pcm: buf, rate: 24000 };
  let rate = 24000;
  let off = 12;
  while (off + 8 <= buf.length) {
    const id = buf.subarray(off, off + 4).toString();
    const size = buf.readUInt32LE(off + 4);
    if (id === 'fmt ') rate = buf.readUInt32LE(off + 12);
    if (id === 'data') return { pcm: buf.subarray(off + 8, Math.min(buf.length, off + 8 + size)), rate };
    off += 8 + size + (size % 2);
  }
  return { pcm: buf.subarray(44), rate };
}

type Content = { type?: string; data?: string };
type Step = { type?: string; content?: Content[] };
export type TtsResult = { ok: true; pcm: Buffer; rate: number; model: string; voice: string; ms: number } | { ok: false; error: string; ms: number };

/**
 * One Gemini text-to-speech request (Interactions API, falling back to
 * generateContent for older TTS models). Returns raw 16-bit mono PCM.
 */
export async function geminiSpeak(opts: { text: string; voice?: string; model?: string; style?: string; timeoutMs?: number }): Promise<TtsResult> {
  const t0 = Date.now();
  const key = googleKey();
  if (!key) return { ok: false, error: 'GOOGLE_AI_API_KEY not set', ms: 0 };
  const models = await googleTtsModels();
  const model = opts.model && models.includes(opts.model) ? opts.model : models[0];
  const voice = opts.voice && GEMINI_VOICES.includes(opts.voice) ? opts.voice : 'Achird';
  const style = opts.style?.trim() || DEFAULT_STYLE;
  const headers = { 'content-type': 'application/json', 'x-goog-api-key': key };
  const timeout = opts.timeoutMs ?? 50_000;
  try {
    const r1 = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        input: [{ type: 'user_input', content: [{ type: 'text', text: opts.text, annotations: [{ type: 'speech_metadata', style }] }] }],
        response_format: { type: 'audio' },
        generation_config: { speech_config: [{ voice }] }
      }),
      signal: AbortSignal.timeout(timeout)
    });
    const t1 = await r1.text();
    if (r1.ok) {
      const d = JSON.parse(t1) as { steps?: Step[] };
      const audio = (d.steps ?? [])
        .filter((s) => s.type === 'model_output')
        .flatMap((s) => s.content ?? [])
        .filter((c) => c.type === 'audio' && c.data)
        .pop();
      if (audio?.data) {
        const { pcm, rate } = readWav(Buffer.from(audio.data, 'base64'));
        return { ok: true, pcm, rate, model, voice, ms: Date.now() - t0 };
      }
    }
    const r2 = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Say in a ${style} voice: ${opts.text}` }] }],
        generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } }
      }),
      signal: AbortSignal.timeout(timeout)
    });
    const t2 = await r2.text();
    if (r2.ok) {
      const d = JSON.parse(t2);
      const part = (d.candidates?.[0]?.content?.parts ?? []).find((p: { inlineData?: { data?: string } }) => p.inlineData?.data);
      if (part) {
        const rate = Number(/rate=(\d+)/.exec(part.inlineData.mimeType ?? '')?.[1]) || 24000;
        return { ok: true, pcm: Buffer.from(part.inlineData.data, 'base64'), rate, model, voice, ms: Date.now() - t0 };
      }
    }
    return { ok: false, error: `gemini voice failed (${model}): ${(r1.ok ? t2 : t1).slice(0, 400)}`, ms: Date.now() - t0 };
  } catch (e) {
    return { ok: false, error: `gemini voice: ${(e as Error).message}`, ms: Date.now() - t0 };
  }
}
