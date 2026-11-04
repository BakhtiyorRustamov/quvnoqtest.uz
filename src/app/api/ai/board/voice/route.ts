import { NextRequest, NextResponse } from 'next/server';
import { getStore, isDisabled } from '@/lib/store';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { geminiSpeak, wav } from '@/lib/lab/geminiTts';
import { speakUz } from '@/lib/lab/speakUz';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const STYLE: Record<string, string> = {
  uz: 'warm, clear and friendly, like a kind Uzbek school teacher explaining at the board, calm pace, natural Uzbek pronunciation',
  ru: 'warm, clear and friendly, like a kind school teacher explaining at the board, calm pace',
  en: 'warm, clear and friendly, like a kind school teacher explaining at the board, calm pace'
};

/** Gemini voice for one part of a "Mufassal" board explanation → audio/wav. */
export async function POST(req: NextRequest) {
  const videoKey = !!process.env.VIDEO_SECRET && req.headers.get('x-video-key') === process.env.VIDEO_SECRET;
  const user = videoKey ? null : await getStore().getCurrent();
  if (!videoKey && !user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (user && isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!videoKey && !(await rateLimitStrict(`aivoice:${clientIp(req)}`, 120, 3600))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const lang = ['uz', 'ru', 'en'].includes(body.lang) ? body.lang : 'uz';
  const raw = String(body.text ?? '').trim().slice(0, 600);
  if (!raw) return NextResponse.json({ error: 'empty' }, { status: 400 });
  const text = lang === 'uz' ? speakUz(raw) : raw;
  const r = await geminiSpeak({ text, voice: process.env.AI_BOARD_VOICE || undefined, style: STYLE[lang], timeoutMs: 40_000 });
  if (!r.ok) {
    console.error('[ai-board-voice]', r.error);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
  return new NextResponse(new Uint8Array(wav(r.pcm, r.rate)), { headers: { 'content-type': 'audio/wav', 'cache-control': 'private, max-age=3600' } });
}
