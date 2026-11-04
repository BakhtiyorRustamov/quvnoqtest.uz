import { NextRequest, NextResponse } from 'next/server';
import { getStore, isDisabled } from '@/lib/store';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { sttConfigured, transcribe } from '@/lib/stt';

export const dynamic = 'force-dynamic';
export const maxDuration = 40;

const MAX_BYTES = 3_000_000; // up to ~2 min answers in the English speaking test // 30 s of compressed speech is ~50–250 KB; this is plenty

/**
 * Voice question → text (Groq Whisper). The audio is only passed through,
 * never stored. Own per-student hourly cap, separate from the message quota.
 */
export async function POST(req: NextRequest) {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!sttConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  if (!(await rateLimitStrict(`stt:${user.publicId}`, 40, 3600)) || !(await rateLimitStrict(`stt-ip:${clientIp(req)}`, 80, 3600))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const form = await req.formData().catch(() => null);
  const audio = form?.get('audio');
  if (!(audio instanceof Blob) || audio.size < 800) return NextResponse.json({ error: 'empty' }, { status: 400 });
  if (audio.size > MAX_BYTES) return NextResponse.json({ error: 'too_long' }, { status: 413 });
  const hint = String(form?.get('hint') ?? '').slice(0, 1200);
  // the English speaking test asks for English recognition whatever the interface language
  const lang = form?.get('lang') === 'en' ? 'en' : ['uz', 'ru', 'en'].includes(user.locale) ? user.locale : 'uz';

  const r = await transcribe(audio, { lang, hint });
  if (!r.ok) {
    console.error('[stt] failed', r.error);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
  return NextResponse.json({ text: r.text });
}
