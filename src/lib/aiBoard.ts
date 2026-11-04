import 'server-only';
import { chat } from '@/lib/lab/llm';
import { googleKey, groqKey, groqModels } from '@/lib/lab/server';
import { BOARD_TOOLS_DOC, LAB_LANG, checkPlan, extractJson, type DrawOp } from '@/lib/lab/plan';

/**
 * "Explain on the board" for the AI tutor: one question → a short, silent
 * 3-part board lesson (everyday hook → explanation → worked example) and one
 * follow-up question that opens the chat underneath.
 */

export type AiBoardStep = { say: string; next: string; draw: DrawOp[]; clear: true };
export type AiBoardLesson = { title: string; steps: AiBoardStep[]; followUp: string };

/** Board generation needs Groq (it runs on Groq's free models). */
export const aiBoardConfigured = () => !!groqKey() || !!googleKey();

/**
 * Models to try, in order: Qwen 3.8 27B first, GPT-OSS 120B as the fallback.
 * Groq's model ids change, so the Qwen id is looked up in the live list
 * (override with AI_BOARD_MODEL / AI_BOARD_FALLBACK).
 */
export async function aiBoardModels(): Promise<string[]> {
  const live = await groqModels();
  const pick = (re: RegExp[]) => re.map((r) => live.find((id) => r.test(id))).find(Boolean);
  const primary = process.env.AI_BOARD_MODEL || pick([/qwen.?3\.8.*27b/i, /qwen.?3[.\d]*-?27b/i, /qwen.?3/i]);
  const fallback = process.env.AI_BOARD_FALLBACK || 'openai/gpt-oss-120b';
  return [...new Set([primary, fallback].filter((m): m is string => !!m && live.includes(m)))];
}

const NEXT_DEFAULT: Record<string, string[]> = {
  uz: ['Xoʻsh, keyin-chi?', 'Qanday qilib?', 'Tushundim!', 'Davom etamiz!', 'Yana-chi?', 'Zoʻr!'],
  ru: ['А дальше?', 'Как это?', 'Понятно!', 'Продолжим!', 'А ещё?', 'Здорово!'],
  en: ['And then?', 'How so?', 'Got it!', 'Go on!', 'What else?', 'Great!']
};
/** Most parts one board explanation may have. */
export const MAX_BOARD_STEPS = 6;

function systemPrompt(lang: string, grade: number): string {
  return `You are "Quvnoq", the friendly teacher inside MoviyDaftar.uz (formerly QuvnoqTest.uz) (a learning app for schoolchildren in Uzbekistan). You explain ONE student question on a whiteboard in 3 to 6 short parts (use more parts only when the question really needs them: multi-step problems, several ideas). The student is in grade ${grade}.
Reply with ONE JSON object only (no markdown, nothing after it), in this exact shape:
{ "title": string, "steps": [ { "say": string, "next": string, "draw": [ DrawOp, ... ] }, 3 to 6 items ], "followUp": string }

${BOARD_TOOLS_DOC}

THE PARTS — each part is drawn on a fresh, empty board:
1. Everyday hook: a familiar situation from a child's everyday life (home, school, bazaar, phone, sport, cooking) that shows the idea. Draw that situation itself: at least one "icon" of the real object plus boxes/text with its numbers. No formula and no abstract diagram yet.
2. Explanation: the idea or rule itself, clearly, with the key formula, diagram or picture.
3. Worked example: solve the student's actual question (or a very close example) step by step on the board.\n4–6 (only if needed): further steps of the solution, a second idea, or a short check / summary.

RULES:
- Every part starts with a {"t":"title","text":"…"} op: a short heading for that part (2–4 words, no "Step 1" numbering). Then 2–6 more ops that show exactly what "say" says.
- "say": 2–3 short, warm, simple sentences shown under the board and also read aloud by a voice, so write them as natural speech. Digits and symbols are fine.
- "next": the reply button the student taps to go on: 1–4 lively, curious words, different in each part, no emoji (e.g. "Xoʻsh, keyin-chi?", "Qanday hisoblanadi?", "Tushundim!").
- "followUp": ONE short question that checks the student understood this explanation and can be answered in one line.
- Use real, correct facts and correct maths; numbers on the board, in "say" and in the example must agree.
- If the question comes with a test question as context, explain the idea behind it and walk through it; do not just name the correct option.
- Only school subjects and learning. Keep everything safe and suitable for children. If the message is not a learning question, still return the JSON, with a friendly 3-part mini lesson on how to ask a school question.
- Write "title", "say", "next", "followUp" and all board text in ${LAB_LANG[lang] ?? LAB_LANG.uz}.`;
}

/** Turn a model reply into a lesson (throws if unusable). */
function buildLesson(raw: string, lang: string): AiBoardLesson {
  const json = extractJson(raw) as Record<string, unknown>;
  const { plan } = checkPlan(json);
  if (!plan || plan.steps.length < 2) throw new Error('too few parts');
  const rawSteps = (Array.isArray(json.steps) ? json.steps : []) as Record<string, unknown>[];
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
  const steps = plan.steps.slice(0, MAX_BOARD_STEPS).map((s, i) => ({
    say: s.say,
    next: str(rawSteps[i]?.next, 32) || (NEXT_DEFAULT[lang] ?? NEXT_DEFAULT.uz)[i],
    draw: s.draw.length ? s.draw : [{ t: 'title', text: plan.title } as DrawOp],
    clear: true as const
  }));
  if (steps.every((s) => s.draw.length <= 1)) throw new Error('empty drawings');
  return { title: plan.title, steps, followUp: str(json.followUp, 240) };
}

/** Gemini (paid key) text model for the board; Groq models are the fallback. */
const GEMINI_BOARD_MODEL = () => process.env.AI_BOARD_GEMINI || 'gemini-flash-latest';
async function geminiBoard(system: string, user: string, model: string): Promise<{ ok: true; raw: string; tokens: number } | { ok: false; error: string }> {
  const key = googleKey();
  if (!key) return { ok: false, error: 'no google key' };
  try {
    const send = (thinking: boolean) =>
      fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.4, maxOutputTokens: 8000, ...(thinking ? { thinkingConfig: { thinkingBudget: 0 } } : {}) }
        }),
        signal: AbortSignal.timeout(45_000)
      });
    let res = await send(true);
    // some models reject thinkingBudget 0 — ask again without it
    if (res.status === 400) res = await send(false);
    const text = await res.text();
    if (!res.ok) return { ok: false, error: `${model} ${res.status}: ${text.slice(0, 200)}` };
    const d = JSON.parse(text);
    const raw = (d.candidates?.[0]?.content?.parts ?? []).map((p: { text?: string }) => p.text ?? '').join('');
    if (!raw) return { ok: false, error: 'gemini: empty' };
    return { ok: true, raw, tokens: d.usageMetadata?.totalTokenCount ?? 0 };
  } catch (e) {
    return { ok: false, error: `gemini: ${(e as Error).message}` };
  }
}

export async function makeAiBoard(opts: { question: string; context?: string; lang: string; grade: number; voice?: boolean }) {
  const models = await aiBoardModels();
  const user = [
    opts.context ? `Test question context (what the student got wrong):\n${opts.context.slice(0, 900)}\n` : '',
    `Student's question: ${opts.question.slice(0, 500)}`,
    opts.voice
      ? `(The student spoke this question; automatic speech recognition may have misheard some words. Work out the intended school question. If you had to guess a lot, start part 1's "say" with one short sentence saying what you understood.)`
      : ''
  ].join('\n');
  const system = systemPrompt(opts.lang, opts.grade);
  let tokens = 0;
  const errors: string[] = [];
  for (const gm of [GEMINI_BOARD_MODEL(), 'gemini-flash-lite-latest']) {
    const g = await geminiBoard(system, user, gm);
    if (!g.ok) {
      errors.push(g.error);
      continue;
    }
    tokens += g.tokens;
    try {
      return { lesson: buildLesson(g.raw, opts.lang), model: gm, tokens, errors };
    } catch (e) {
      errors.push(`${gm}: ${(e as Error).message}`);
    }
  }
  for (const model of models) {
    const r = await chat({
      provider: 'groq',
      model,
      system,
      user,
      json: true,
      maxTokens: 2600,
      temperature: 0.4,
      // Qwen 3 thinks out loud by default; the board needs the answer only
      extra: /qwen/i.test(model) ? { reasoning_effort: 'none' } : undefined
    });
    if (!r.ok) {
      errors.push(`${model}: ${r.error}`);
      continue;
    }
    tokens += r.usage.input + r.usage.output;
    try {
      return { lesson: buildLesson(r.raw, opts.lang), model, tokens, errors };
    } catch (e) {
      errors.push(`${model}: ${(e as Error).message}`);
    }
  }
  throw Object.assign(new Error(errors.join(' | ') || 'no board model available'), { tokens });
}
