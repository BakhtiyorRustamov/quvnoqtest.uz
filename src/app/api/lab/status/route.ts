import { NextResponse } from 'next/server';
import { GROQ_MODELS, HF_MODELS, groqKey, hfToken, labAllowed, uzTtsUrl } from '@/lib/lab/server';

export const dynamic = 'force-dynamic';

/** Which lab backends are configured (never returns the keys themselves). */
export async function GET() {
  if (!(await labAllowed())) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  return NextResponse.json({
    groq: !!groqKey(),
    hf: !!hfToken(),
    uzTts: !!uzTtsUrl(),
    models: [
      ...GROQ_MODELS.map((m) => ({ id: m, provider: 'groq' as const })),
      ...HF_MODELS.map((m) => ({ id: m, provider: 'hf' as const }))
    ]
  });
}
