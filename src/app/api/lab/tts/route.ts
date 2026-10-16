import { NextRequest, NextResponse } from 'next/server';
import { hfToken, labAllowed, uzTtsUrl } from '@/lib/lab/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Uzbek speech from the self-hosted MMS-TTS Space (free CPU Space on Hugging
 * Face, see tools/uz-tts-space). The audio is streamed straight back to the
 * browser and never stored on the server.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const base = uzTtsUrl();
  if (!base) return NextResponse.json({ error: 'UZ_TTS_URL not set' }, { status: 501 });
  const body = await req.json().catch(() => ({}));
  const text = String(body.text ?? '').trim().slice(0, 600);
  if (!text) return NextResponse.json({ error: 'empty text' }, { status: 400 });

  const headers: Record<string, string> = { 'content-type': 'application/json' };
  const token = hfToken(); // only needed if the Space is private
  if (token) headers.authorization = `Bearer ${token}`;
  if (process.env.UZ_TTS_SECRET) headers['x-tts-secret'] = process.env.UZ_TTS_SECRET;

  const t0 = Date.now();
  try {
    const res = await fetch(`${base}/tts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ text, speed: Number(body.speed) || 1 }),
      signal: AbortSignal.timeout(55_000)
    });
    if (!res.ok) {
      const err = await res.text().catch(() => '');
      return NextResponse.json({ error: `space ${res.status}: ${err.slice(0, 300)}`, ms: Date.now() - t0 }, { status: 502 });
    }
    const audio = await res.arrayBuffer();
    return new NextResponse(audio, {
      headers: {
        'content-type': res.headers.get('content-type') || 'audio/wav',
        'cache-control': 'no-store',
        'x-tts-ms': String(Date.now() - t0)
      }
    });
  } catch (e) {
    return NextResponse.json({ error: `space unreachable: ${(e as Error).message}`, ms: Date.now() - t0 }, { status: 502 });
  }
}
