import { NextRequest, NextResponse } from 'next/server';
import { labAllowed } from '@/lib/lab/server';
import { geminiSpeak, wav } from '@/lib/lab/geminiTts';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Gemini voice for the lab voice test (Google AI Studio; the free tier has
 * small daily limits). The audio goes straight back and is never stored.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const body = await req.json().catch(() => ({}));
  const text = String(body.text ?? '').trim().slice(0, 800);
  if (!text) return NextResponse.json({ error: 'empty text' }, { status: 400 });
  const r = await geminiSpeak({ text, voice: body.voice, model: body.model, style: body.style });
  if (!r.ok) return NextResponse.json({ error: r.error, ms: r.ms }, { status: r.error.includes('not set') ? 501 : 502 });
  return new NextResponse(new Uint8Array(wav(r.pcm, r.rate)), {
    headers: { 'content-type': 'audio/wav', 'cache-control': 'no-store', 'x-tts-ms': String(r.ms), 'x-tts-model': r.model }
  });
}
