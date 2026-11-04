import { NextRequest, NextResponse } from 'next/server';
import { labAllowed } from '@/lib/lab/server';
import { geminiText, whisperText } from '@/lib/lab/stt';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_BYTES = 2_500_000; // ≈ 75 s of 16 kHz mono WAV

/**
 * Speech-to-text test: the browser sends a short WAV recording, and it is
 * transcribed by Groq Whisper and/or Gemini Flash side by side. The audio is
 * only passed through — nothing is stored.
 */
export async function POST(req: NextRequest) {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const buf = Buffer.from(await req.arrayBuffer());
  if (buf.length < 1000) return NextResponse.json({ error: 'empty recording' }, { status: 400 });
  if (buf.length > MAX_BYTES) return NextResponse.json({ error: 'recording too long' }, { status: 413 });
  if (buf.subarray(0, 4).toString() !== 'RIFF') return NextResponse.json({ error: 'expected a WAV file' }, { status: 400 });
  const engines = (req.nextUrl.searchParams.get('engines') ?? 'whisper,gemini').split(',');
  const [whisper, gemini] = await Promise.all([
    engines.includes('whisper') ? whisperText(buf) : null,
    engines.includes('gemini') ? geminiText(buf) : null
  ]);
  return NextResponse.json({ whisper, gemini, seconds: Math.round(((buf.length - 44) / 32000) * 10) / 10 });
}
