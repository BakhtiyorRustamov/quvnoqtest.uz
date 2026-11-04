import 'server-only';
import { googleKey, googleModels, groqKey, groqModels, hfToken, isHfModelId } from './server';

export type Provider = 'groq' | 'google' | 'hf';
export type ChatResult =
  | { ok: true; raw: string; ms: number; usage: { input: number; output: number } }
  | { ok: false; error: string; ms: number; status: number };

export const asProvider = (v: unknown): Provider => (v === 'hf' ? 'hf' : v === 'google' ? 'google' : 'groq');

/**
 * One chat call to a lab model: Groq and Hugging Face through their
 * OpenAI-compatible endpoints, Gemma through Google's native API (below).
 */
export async function chat(opts: { provider: Provider; model: string; system: string; user: string; json?: boolean; maxTokens?: number; temperature?: number; extra?: Record<string, unknown> }): Promise<ChatResult> {
  const { provider, model, system, user } = opts;
  if (provider === 'google') return gemma(opts);
  let url: string;
  let key: string | null;
  let allowed: readonly string[];
  if (provider === 'groq') {
    url = 'https://api.groq.com/openai/v1/chat/completions';
    key = groqKey();
    allowed = await groqModels();
  } else {
    url = 'https://router.huggingface.co/v1/chat/completions';
    key = hfToken();
    allowed = isHfModelId(model) ? [model] : [];
  }
  if (!key) return { ok: false, error: `${provider} key not set`, ms: 0, status: 501 };
  if (!allowed.includes(model)) return { ok: false, error: 'unknown model', ms: 0, status: 400 };

  const payload: Record<string, unknown> = {
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ],
    temperature: opts.temperature ?? 0.3,
    max_tokens: opts.maxTokens ?? 3000,
    ...opts.extra
  };
  if (opts.json && provider === 'groq') payload.response_format = { type: 'json_object' };
  if (model.startsWith('openai/gpt-oss')) payload.reasoning_effort = 'low';

  const t0 = Date.now();
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(provider === 'hf' ? 120_000 : 55_000)
    });
  } catch (e) {
    const msg = (e as Error).name === 'TimeoutError' ? `no answer after ${Math.round((Date.now() - t0) / 1000)} s` : (e as Error).message;
    return { ok: false, error: `request failed: ${msg}`, ms: Date.now() - t0, status: 502 };
  }
  const ms = Date.now() - t0;
  const text = await res.text();
  if (!res.ok) return { ok: false, error: `${provider} ${res.status}: ${text.slice(0, 400)}`, ms, status: 502 };
  try {
    const data = JSON.parse(text);
    return {
      ok: true,
      raw: data.choices?.[0]?.message?.content ?? '',
      ms,
      usage: { input: data.usage?.prompt_tokens ?? 0, output: data.usage?.completion_tokens ?? 0 }
    };
  } catch {
    return { ok: false, error: 'provider returned non-JSON', ms, status: 502 };
  }
}

/**
 * Gemma through Google's native generateContent API (more reliable for Gemma
 * than the OpenAI-compatible endpoint). Instructions go into the user turn,
 * since Gemma has no separate system role. Free-tier Gemma can be slow.
 */
async function gemma(opts: { model: string; system: string; user: string; maxTokens?: number }): Promise<ChatResult> {
  const key = googleKey();
  if (!key) return { ok: false, error: 'google key not set', ms: 0, status: 501 };
  if (!(await googleModels()).includes(opts.model)) return { ok: false, error: 'unknown model', ms: 0, status: 400 };
  const t0 = Date.now();
  let res: Response;
  try {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(opts.model)}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: `${opts.system}\n\n${opts.user}` }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: opts.maxTokens ?? 3000 }
      }),
      signal: AbortSignal.timeout(170_000)
    });
  } catch (e) {
    const msg = (e as Error).name === 'TimeoutError' ? `no answer after ${Math.round((Date.now() - t0) / 1000)} s` : (e as Error).message;
    return { ok: false, error: `request failed: ${msg}`, ms: Date.now() - t0, status: 502 };
  }
  const ms = Date.now() - t0;
  const text = await res.text();
  if (!res.ok) return { ok: false, error: `google ${res.status}: ${text.slice(0, 400)}`, ms, status: 502 };
  try {
    const data = JSON.parse(text);
    const parts: { text?: string; thought?: boolean }[] = data.candidates?.[0]?.content?.parts ?? [];
    const raw = parts.filter((p) => !p.thought).map((p) => p.text ?? '').join('');
    if (!raw) return { ok: false, error: `google returned no text (finish: ${data.candidates?.[0]?.finishReason ?? data.promptFeedback?.blockReason ?? 'unknown'})`, ms, status: 502 };
    return { ok: true, raw, ms, usage: { input: data.usageMetadata?.promptTokenCount ?? 0, output: data.usageMetadata?.candidatesTokenCount ?? 0 } };
  } catch {
    return { ok: false, error: 'google returned non-JSON', ms, status: 502 };
  }
}
