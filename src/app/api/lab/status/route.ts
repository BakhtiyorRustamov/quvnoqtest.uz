import { NextResponse } from 'next/server';
import { HF_MODELS, azureSpeech, googleKey, googleModels, googleTtsModels, groqKey, groqModels, hfToken, labAllowed, uzTtsUrl } from '@/lib/lab/server';

export const dynamic = 'force-dynamic';

/** Which lab backends are configured (never returns the keys themselves). */
export async function GET() {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({
    groq: !!groqKey(),
    hf: !!hfToken(),
    google: !!googleKey(),
    uzTts: !!uzTtsUrl(),
    azure: !!azureSpeech(),
    geminiTts: await googleTtsModels(),
    models: [
      ...(await groqModels()).map((m) => ({ id: m, provider: 'groq' as const })),
      ...(await googleModels()).map((m) => ({ id: m, provider: 'google' as const })),
      ...HF_MODELS.map((m) => ({ id: m, provider: 'hf' as const }))
    ]
  });
}
