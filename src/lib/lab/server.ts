import 'server-only';
import { isAdmin } from '@/lib/admin';

/**
 * /lab is an internal experiment page. Its API routes spend free-tier quota
 * (Groq requests, Space CPU), so they only answer the site admin (signed in at
 * /admin) — or anyone while running locally with `npm run dev`.
 */
export async function labAllowed(): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') return true;
  try {
    return await isAdmin();
  } catch {
    return false;
  }
}

/** Groq key: GROQ_API_KEY, or the AI tutor's key when the tutor is on Groq. */
export function groqKey(): string | null {
  if (process.env.GROQ_API_KEY) return process.env.GROQ_API_KEY;
  if (process.env.AI_API_KEY && /groq\.com/.test(process.env.AI_BASE_URL ?? '')) return process.env.AI_API_KEY;
  return null;
}

/** Hugging Face token (any of the common variable names). */
export function hfToken(): string | null {
  return (
    process.env.HF_TOKEN ||
    process.env.HUGGINGFACE_API_KEY ||
    process.env.HUGGINGFACE_TOKEN ||
    process.env.HF_API_TOKEN ||
    process.env.HUGGING_FACE_TOKEN ||
    null
  );
}

/** URL of the self-hosted Uzbek TTS Space, e.g. https://<user>-uz-tts.hf.space */
export function uzTtsUrl(): string | null {
  return process.env.UZ_TTS_URL ? process.env.UZ_TTS_URL.replace(/\/+$/, '') : null;
}

/** Fallback list, used only if Groq's model list can't be fetched. */
export const GROQ_FALLBACK = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];

// Groq retires models often (Llama 3.3, Qwen3, Kimi K2 and Llama 4 Scout were all
// shut down on the free tier in 2026), so the list is read live from the API.
const NOT_CHAT = /whisper|tts|orpheus|playai|guard|compound|distil|embed|allam/i;
let groqCache: { at: number; ids: string[] } | null = null;

/** Chat models this Groq key can use right now (cached for 10 minutes). */
export async function groqModels(): Promise<string[]> {
  const key = groqKey();
  if (!key) return [];
  if (groqCache && Date.now() - groqCache.at < 600_000) return groqCache.ids;
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(8000),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { data?: { id: string; active?: boolean }[] };
    const ids = (data.data ?? [])
      .filter((m) => m.active !== false && !NOT_CHAT.test(m.id))
      .map((m) => m.id)
      .sort((a, b) => (a.startsWith('openai/gpt-oss') ? -1 : 0) - (b.startsWith('openai/gpt-oss') ? -1 : 0) || a.localeCompare(b));
    groqCache = { at: Date.now(), ids: ids.length ? ids : GROQ_FALLBACK };
  } catch {
    groqCache = { at: Date.now() - 540_000, ids: GROQ_FALLBACK }; // retry in a minute
  }
  return groqCache.ids;
}

/** Hugging Face router models (only work if the HF account has inference credits). */
export const HF_MODELS = ['google/gemma-3-27b-it', 'Qwen/Qwen2.5-72B-Instruct', 'meta-llama/Llama-3.3-70B-Instruct'] as const;

/** Any Hugging Face model id ("owner/name", optionally ":provider") may be tried from the lab. */
export const isHfModelId = (id: string) => /^[\w.-]+\/[\w.-]+(:[\w.-]+)?$/.test(id) && id.length <= 120;

/** Google AI Studio key (free Gemma text models and the free-tier Gemini voices). */
export function googleKey(): string | null {
  return process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || null;
}

export const GOOGLE_FALLBACK = ['gemma-4-31b-it', 'gemma-4-26b-a4b-it'];
export const GOOGLE_TTS_FALLBACK = ['gemini-3.8-flash-tts', 'gemini-3.8-flash-lite-tts'];
/** Gemini Flash models that can listen to audio (speech-to-text test); Flash-Lite first, it has the larger free quota. */
export const GOOGLE_LISTEN_FALLBACK = ['gemini-flash-lite-latest', 'gemini-flash-latest'];
let googleCache: { at: number; text: string[]; tts: string[]; listen: string[] } | null = null;

/** Models this Google AI Studio key lists (cached 10 min): Gemma for text, *-tts for voice, Flash for listening. Other Gemini models are skipped on purpose. */
async function googleList(): Promise<{ text: string[]; tts: string[]; listen: string[] }> {
  const key = googleKey();
  if (!key) return { text: [], tts: [], listen: [] };
  if (googleCache && Date.now() - googleCache.at < 600_000) return googleCache;
  try {
    const names: string[] = [];
    let page = '';
    for (let i = 0; i < 5; i++) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?pageSize=200${page ? `&pageToken=${page}` : ''}`, {
        headers: { 'x-goog-api-key': key },
        signal: AbortSignal.timeout(8000),
        cache: 'no-store'
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { models?: { name: string }[]; nextPageToken?: string };
      names.push(...(data.models ?? []).map((m) => m.name.replace(/^models\//, '')));
      if (!data.nextPageToken) break;
      page = data.nextPageToken;
    }
    const byNewest = (a: string, b: string) => b.localeCompare(a, undefined, { numeric: true });
    const text = names.filter((n) => /^gemma/i.test(n) && !/embed|nano/i.test(n)).sort(byNewest);
    const tts = names.filter((n) => /tts/i.test(n)).sort(byNewest);
    const flash = names.filter((n) => /^gemini-[\d.]+-flash(-lite)?$/i.test(n)).sort(byNewest);
    const listen = [...flash.filter((n) => /lite/i.test(n)), ...flash.filter((n) => !/lite/i.test(n))];
    googleCache = {
      at: Date.now(),
      text: text.length ? text : GOOGLE_FALLBACK,
      tts: tts.length ? tts : GOOGLE_TTS_FALLBACK,
      listen: listen.length ? listen : GOOGLE_LISTEN_FALLBACK
    };
  } catch {
    googleCache = { at: Date.now() - 540_000, text: GOOGLE_FALLBACK, tts: GOOGLE_TTS_FALLBACK, listen: GOOGLE_LISTEN_FALLBACK };
  }
  return googleCache;
}
export const googleModels = async () => (await googleList()).text;
export const googleTtsModels = async () => (await googleList()).tts;
export const googleListenModels = async () => (await googleList()).listen;

/** Azure AI Speech (free F0 tier: 0.5 M characters/month of neural voices). */
export function azureSpeech(): { key: string; region: string } | null {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  return key && region ? { key, region } : null;
}
