import { NextRequest, NextResponse } from 'next/server';
import { getStore, isDisabled } from '@/lib/store';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { aiConfigured, callAi } from '@/lib/ai';
import { PROMPTS, SPECS, parseJson } from '@/lib/englishGen';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Fresh English exam material from the AI (one part per call), validated before it is returned.
 * Free practice for every signed-in student, with its own daily cap (not the tutor quota).
 * 422 → the client uses its built-in bank for that part.
 */
export async function POST(req: NextRequest) {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!aiConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  const body = await req.json().catch(() => ({}));
  const key = String(body.key ?? '');
  const spec = SPECS[key];
  const pspec = PROMPTS[key];
  if (!spec && !pspec) return NextResponse.json({ error: 'unknown' }, { status: 400 });
  if (!(await rateLimitStrict(`enggen:${user.publicId}`, 200, 86400)) || !(await rateLimitStrict(`enggen-ip:${clientIp(req)}`, 300, 3600))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }
  let lastReply = '';
  const seed = Math.random().toString(36).slice(2, 8); // nudges the model towards a new topic each time
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { reply } = await callAi({
        system: 'You are an experienced writer of English language exam materials. You follow the requested JSON format exactly.',
        turns: [{ role: 'user', content: `${(spec ?? pspec).prompt}\n\n(variation seed: ${seed}${attempt ? '-b' : ''})` }],
        maxTokens: spec?.maxTokens ?? 900
      });
      lastReply = reply;
      const o = parseJson(reply);
      const out = o && (spec ? spec.build(o) : pspec.build(o));
      if (out) return NextResponse.json(spec ? { block: out } : { data: out });
    } catch (e) {
      console.error('[eng-gen]', key, (e as Error).message);
      lastReply = `ERROR: ${(e as Error).message}`;
      // Groq per-minute token limit: wait a little before the second try
      if (/\b429\b/.test((e as Error).message)) await new Promise((r) => setTimeout(r, 4000));
    }
  }
  return NextResponse.json({ error: 'invalid', ...(process.env.NODE_ENV === 'development' && { reply: lastReply.slice(0, 12000) }) }, { status: 422 });
}
