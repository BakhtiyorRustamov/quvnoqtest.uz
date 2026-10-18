import { NextRequest, NextResponse } from 'next/server';
import { azureSpeech, labAllowed } from '@/lib/lab/server';
import { AZURE_VOICES } from '@/lib/lab/plan';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const ALL = new Set(Object.values(AZURE_VOICES).flat());

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/**
 * Microsoft neural voice (Azure AI Speech, free F0 tier = 0.5 M characters a
 * month). The MP3 is streamed back to the browser and never stored.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const az = azureSpeech();
  if (!az) return NextResponse.json({ error: 'AZURE_SPEECH_KEY / AZURE_SPEECH_REGION not set' }, { status: 501 });
  const body = await req.json().catch(() => ({}));
  const text = String(body.text ?? '').trim().slice(0, 800);
  const voice = ALL.has(body.voice) ? String(body.voice) : AZURE_VOICES.uz[0];
  if (!text) return NextResponse.json({ error: 'empty text' }, { status: 400 });
  const rate = Math.round((Math.min(1.5, Math.max(0.6, Number(body.speed) || 1)) - 1) * 100);
  const lang = voice.slice(0, 5);
  const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${voice}"><prosody rate="${rate >= 0 ? '+' : ''}${rate}%">${esc(text)}</prosody></voice></speak>`;

  const t0 = Date.now();
  try {
    const res = await fetch(`https://${az.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': az.key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'quvnoqtest-lab'
      },
      body: ssml,
      signal: AbortSignal.timeout(25_000)
    });
    if (!res.ok) {
      const err = await res.text().catch(() => '');
      return NextResponse.json({ error: `azure ${res.status}: ${err.slice(0, 300)}`, ms: Date.now() - t0 }, { status: 502 });
    }
    const audio = await res.arrayBuffer();
    return new NextResponse(audio, {
      headers: { 'content-type': 'audio/mpeg', 'cache-control': 'no-store', 'x-tts-ms': String(Date.now() - t0) }
    });
  } catch (e) {
    return NextResponse.json({ error: `azure unreachable: ${(e as Error).message}`, ms: Date.now() - t0 }, { status: 502 });
  }
}
