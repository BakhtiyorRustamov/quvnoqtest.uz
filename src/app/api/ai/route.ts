import { NextRequest, NextResponse } from 'next/server';
import { getStore, isPaid } from '@/lib/store';
import { tashkentToday } from '@/lib/tashkent';
import { AI_LIMITS, FREE_AI_KEY, aiConfigured, callClaude, estimateTokens, systemPrompt, type AiTurn } from '@/lib/ai';

export async function GET() {
  const store = getStore();
  const user = await store.getCurrent();
  const paid = isPaid(user);
  // Paid users are metered daily (Tashkent reset); free users get a single
  // non-resetting free-trial bucket.
  const freeTrial = !!user && !paid;
  const key = freeTrial ? FREE_AI_KEY : tashkentToday();
  const usage = user ? await store.getAiUsage(key) : { messages: 0, tokens: 0 };
  return NextResponse.json({
    configured: aiConfigured(),
    isPaid: paid,
    freeTrial,
    usage,
    limits: AI_LIMITS
  });
}

/**
 * AI tutor (FR-AI-1…8): pre-send gated limits.
 * Paid → daily quota with Tashkent reset. Free → one free-trial session.
 */
export async function POST(req: NextRequest) {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (!aiConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  const paid = isPaid(user);

  const body = await req.json().catch(() => ({}));
  const message = String(body.message ?? '').trim().slice(0, 1000);
  if (!message) return NextResponse.json({ error: 'empty' }, { status: 400 });
  const history: AiTurn[] = Array.isArray(body.history)
    ? body.history
        .slice(-4)
        .filter((t: any) => (t?.role === 'user' || t?.role === 'assistant') && typeof t?.content === 'string')
        .map((t: any) => ({ role: t.role, content: String(t.content).slice(0, 600) }))
    : [];

  const date = paid ? tashkentToday() : FREE_AI_KEY;
  const usage = await store.getAiUsage(date);

  // ---- PRE-send gating (FR-AI-5): block BEFORE calling the model ----
  if (usage.messages >= AI_LIMITS.messages) {
    return NextResponse.json({ error: 'limit_messages', usage, limits: AI_LIMITS }, { status: 429 });
  }
  const system = systemPrompt(user.grade, user.locale);
  const turns: AiTurn[] = [...history, { role: 'user', content: message }];
  const estIn = estimateTokens(system + turns.map((t) => t.content).join(' ')) + 30;
  const remaining = AI_LIMITS.tokens - usage.tokens;
  const MIN_REPLY = 48;
  if (remaining - estIn < MIN_REPLY) {
    return NextResponse.json({ error: 'limit_tokens', usage, limits: AI_LIMITS }, { status: 429 });
  }
  const maxTokens = Math.max(MIN_REPLY, Math.min(300, remaining - estIn));

  try {
    const { reply, inputTokens, outputTokens } = await callClaude({ system, turns, maxTokens });
    const used = inputTokens + outputTokens;
    await store.addAiUsage(date, 1, used);
    // NFR-9 observability: token usage log line for cost monitoring
    console.log(
      JSON.stringify({ evt: 'ai_usage', user: user.publicId, date, in: inputTokens, out: outputTokens })
    );
    const newUsage = { messages: usage.messages + 1, tokens: usage.tokens + used };
    return NextResponse.json({ reply, usage: newUsage, limits: AI_LIMITS });
  } catch (e) {
    console.error('[ai] call failed', e);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}
