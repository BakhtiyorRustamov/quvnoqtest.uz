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

/** Azure AI Speech (free F0 tier: 0.5 M characters/month of neural voices). */
export function azureSpeech(): { key: string; region: string } | null {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  return key && region ? { key, region } : null;
}
