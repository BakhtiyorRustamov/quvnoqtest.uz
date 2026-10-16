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

/** Free Groq chat models worth comparing for plan writing. */
export const GROQ_MODELS = [
  'openai/gpt-oss-120b',
  'llama-3.3-70b-versatile',
  'moonshotai/kimi-k2-instruct',
  'qwen/qwen3-32b',
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'openai/gpt-oss-20b'
] as const;

/** Hugging Face router models (only work if the HF account has inference credits). */
export const HF_MODELS = ['google/gemma-3-27b-it', 'Qwen/Qwen2.5-72B-Instruct', 'meta-llama/Llama-3.3-70B-Instruct'] as const;
