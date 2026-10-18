import { NextRequest, NextResponse } from 'next/server';
import { HF_MODELS, googleKey, googleModels, groqKey, groqModels, hfToken, labAllowed } from '@/lib/lab/server';
import { checkPlan, extractJson, planSystemPrompt, planUserPrompt } from '@/lib/lab/plan';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Generate a board-lesson plan with one model and report how it went:
 * time, tokens, whether the JSON was valid, and what the checker had to drop.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const topic = String(body.topic ?? '').trim();
  const lang = ['uz', 'ru', 'en'].includes(body.lang) ? body.lang : 'uz';
  const model = String(body.model ?? '');
  const provider = body.provider === 'hf' ? 'hf' : body.provider === 'google' ? 'google' : 'groq';
  if (!topic) return NextResponse.json({ error: 'empty topic' }, { status: 400 });

  let url: string;
  let key: string | null;
  if (provider === 'groq') {
    if (!(await groqModels()).includes(model)) return NextResponse.json({ error: 'unknown model' }, { status: 400 });
    url = 'https://api.groq.com/openai/v1/chat/completions';
    key = groqKey();
  } else if (provider === 'google') {
    if (!(await googleModels()).includes(model)) return NextResponse.json({ error: 'unknown model' }, { status: 400 });
    url = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions';
    key = googleKey();
  } else {
    if (!(HF_MODELS as readonly string[]).includes(model)) return NextResponse.json({ error: 'unknown model' }, { status: 400 });
    url = 'https://router.huggingface.co/v1/chat/completions';
    key = hfToken();
  }
  if (!key) return NextResponse.json({ error: `${provider} key not set` }, { status: 501 });

  // Gemma on Google AI Studio has no system role and no JSON mode, so the
  // instructions go into the user message and the reply is parsed leniently.
  const isGemma = provider === 'google';
  const payload: Record<string, unknown> = {
    model,
    messages: isGemma
      ? [{ role: 'user', content: `${planSystemPrompt(lang)}\n\n${planUserPrompt(topic)}` }]
      : [
          { role: 'system', content: planSystemPrompt(lang) },
          { role: 'user', content: planUserPrompt(topic) }
        ],
    temperature: 0.4,
    max_tokens: 3000
  };
  if (!isGemma) payload.response_format = { type: 'json_object' };
  if (model.startsWith('openai/gpt-oss')) payload.reasoning_effort = 'low';

  const t0 = Date.now();
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(55_000)
    });
  } catch (e) {
    return NextResponse.json({ error: `request failed: ${(e as Error).message}`, ms: Date.now() - t0 }, { status: 502 });
  }
  const ms = Date.now() - t0;
  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json({ error: `${provider} ${res.status}: ${text.slice(0, 400)}`, ms }, { status: 502 });
  }

  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'provider returned non-JSON', ms }, { status: 502 });
  }
  const raw: string = data.choices?.[0]?.message?.content ?? '';
  const usage = { input: data.usage?.prompt_tokens ?? 0, output: data.usage?.completion_tokens ?? 0 };

  let parsed: unknown = null;
  let parseError: string | null = null;
  try {
    parsed = extractJson(raw);
  } catch (e) {
    parseError = (e as Error).message;
  }
  const { plan, issues } = parsed ? checkPlan(parsed) : { plan: null, issues: [] as string[] };

  return NextResponse.json({ model, provider, ms, usage, raw, parseError, issues, plan });
}
