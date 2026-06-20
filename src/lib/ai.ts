import 'server-only';

export const AI_LIMITS = { messages: 5, tokens: 1000 } as const;

/**
 * Free-tier users get ONE free AI session (free trial). It's tracked under this
 * fixed key instead of a calendar date, so — unlike the paid daily quota — it
 * never resets: once the allowance is spent the free trial is over.
 */
export const FREE_AI_KEY = 'free-trial';

const LANG_NAME: Record<string, string> = {
  uz: 'Uzbek (Latin script)',
  ru: 'Russian',
  en: 'English'
};

export function aiConfigured(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

export function systemPrompt(grade: number, locale: string): string {
  return [
    `You are "Quvnoq", the friendly AI tutor inside QuvnoqTest.uz, a quiz-learning app for schoolchildren in Uzbekistan.`,
    `The student is in grade ${grade} (age ≈ ${5 + grade}–${7 + grade}).`,
    `Always reply in ${LANG_NAME[locale] ?? LANG_NAME.uz}.`,
    `Rules: be warm, patient and encouraging; use very simple words a child of this age understands; keep every answer under 80 words; prefer tiny examples with familiar objects (apples, balls, toys); never give answers to graded tests directly — guide step by step; only discuss school subjects and learning; if asked about anything inappropriate or unrelated, gently steer back to learning. Use at most one emoji per answer.`
  ].join('\n');
}

export type AiTurn = { role: 'user' | 'assistant'; content: string };

/** Rough token estimate used for PRE-send gating (FR-AI-5). Conservative: ~3 chars/token. */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 3);
}

/**
 * AI tutor backed by Google Gemini Flash Lite (Generative Language API).
 * Model is configurable via GEMINI_MODEL; defaults to gemini-2.0-flash-lite.
 */
export async function callAi(opts: {
  system: string;
  turns: AiTurn[];
  maxTokens: number;
}): Promise<{ reply: string; inputTokens: number; outputTokens: number }> {
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash-lite';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const contents = opts.turns.map((t) => ({
    role: t.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: t.content }]
  }));
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': process.env.GEMINI_API_KEY!,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: opts.system }] },
      contents,
      generationConfig: { maxOutputTokens: opts.maxTokens, temperature: 0.7 }
    })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`gemini ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const reply = (data.candidates?.[0]?.content?.parts ?? [])
    .map((p: any) => p.text ?? '')
    .join('');
  return {
    reply,
    inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
    outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0
  };
}
