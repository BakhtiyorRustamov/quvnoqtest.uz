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
  return !!process.env.ANTHROPIC_API_KEY;
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

export async function callClaude(opts: {
  system: string;
  turns: AiTurn[];
  maxTokens: number;
}): Promise<{ reply: string; inputTokens: number; outputTokens: number }> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
      max_tokens: opts.maxTokens,
      system: opts.system,
      messages: opts.turns
    })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`anthropic ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const reply = (data.content ?? [])
    .filter((b: any) => b.type === 'text')
    .map((b: any) => b.text)
    .join('');
  return {
    reply,
    inputTokens: data.usage?.input_tokens ?? 0,
    outputTokens: data.usage?.output_tokens ?? 0
  };
}
