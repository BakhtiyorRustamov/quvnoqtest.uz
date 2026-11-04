import { NextRequest, NextResponse } from 'next/server';
import { getStore, isActive, isDisabled } from '@/lib/store';
import { tashkentToday } from '@/lib/tashkent';
import { clientIp } from '@/lib/rateLimit';
import { rateLimitStrict } from '@/lib/rateLimitDb';
import { AI_LIMITS, FREE_AI_KEY, aiConfigured, callAi } from '@/lib/ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Rough token cost of one essay check, for pre-send gating. */
const ESSAY_TOKENS = 2500;

const SYSTEM = `Sen Oʻzbekiston Milliy sertifikat imtihonining «Ona tili va adabiyot» fanidan yozma ishlarni (insho) baholovchi tajribali ekspertsan.
Oʻquvchining inshosini quyidagi 4 mezon boʻyicha baholaysan (har biri 0–2,5 ball, jami 0–10):
1) mazmun — mavzuga mosligi, fikrning dalillanganligi, vaziyatga baho berilgani;
2) tuzilish — kirish, asosiy qism, xulosa; fikrlarning izchil bayoni;
3) til — soʻz boyligi, grammatik va uslubiy toʻgʻrilik;
4) imlo — imlo va punktuatsiya xatolari (har 2–3 xato uchun ball kamaytiriladi).
Agar insho mavzuga umuman aloqasiz, 40 soʻzdan qisqa yoki maʼnosiz boʻlsa — jami 0–2 ball.
Talab qilingan hajm — 150–200 soʻz (soʻzlar soni sizga beriladi): 150 dan kam boʻlsa «mazmun» va «tuzilish» ballarini kamaytiring (100 dan kam boʻlsa jami 5 balldan oshmasin), 250 dan ortiq boʻlsa «tuzilish»dan 0,5 ball ayiring; izohda hajm haqida ham ayting.
Javobni FAQAT JSON koʻrinishida ber, boshqa hech narsa yozma:
{"mazmun":n,"tuzilish":n,"til":n,"imlo":n,"jami":n,"izoh":"2–4 gapdan iborat qisqa umumiy fikr (oʻzbek tilida, lotin yozuvida)","xatolar":["xato → toʻgʻri", "..." (koʻpi bilan 5 ta)]}`;

const SYSTEM_RU = `Ты — опытный эксперт, проверяющий сочинения по предмету «Русский язык и литература» на экзамене национального сертификата Узбекистана.
Оцени сочинение ученика по 4 критериям (каждый 0–2,5 балла, всего 0–10):
1) содержание (ключ «mazmun») — соответствие теме, аргументированность, оценка ситуации;
2) композиция (ключ «tuzilish») — вступление, основная часть, заключение, логичность;
3) речь (ключ «til») — богатство словаря, грамматическая и стилистическая правильность;
4) грамотность (ключ «imlo») — орфографические и пунктуационные ошибки.
Если сочинение не по теме, короче 40 слов или бессмысленно — всего 0–2 балла.
Требуемый объём — 150–200 слов (число слов тебе сообщается): если меньше 150, снизь баллы за содержание и композицию (меньше 100 — всего не более 5 баллов); если больше 250, сними 0,5 балла за композицию; упомяни объём в отзыве.
Ответь ТОЛЬКО в формате JSON, ничего больше:
{"mazmun":n,"tuzilish":n,"til":n,"imlo":n,"jami":n,"izoh":"краткий общий отзыв из 2–4 предложений на русском языке","xatolar":["ошибка → исправление", "..." (не более 5)]}`;

const SYSTEM_KAA = SYSTEM.replace('«Ona tili va adabiyot» fanidan', '«Ana tili hám ádebiyat» (qoraqalpoq tili) fanidan').replace(
  '(oʻzbek tilida, lotin yozuvida)',
  '(QORAQALPOQ tilida, qoraqalpoq lotin yozuvida)'
) + '\nInsho qoraqalpoq tilida yozilgan: imlo va grammatikani qoraqalpoq adabiy tili meʼyorlari boʻyicha baholang.';

/**
 * AI check of the «Ona tili va adabiyot» essay (Milliy sertifikat task 45):
 * same user, rate limit and quota rules as /api/ai (one check = one message + its tokens).
 */
export async function POST(req: NextRequest) {
  const store = getStore();
  const user = await store.getCurrent();
  if (!user) return NextResponse.json({ error: 'no_user' }, { status: 401 });
  if (isDisabled(user)) return NextResponse.json({ error: 'account_disabled' }, { status: 403 });
  if (!aiConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  if (!(await rateLimitStrict(`aiessay:${clientIp(req)}`, 10, 3600))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const topic = String(body.topic ?? '').trim().slice(0, 600);
  const essay = String(body.essay ?? '').trim().slice(0, 4000);
  const words = essay ? essay.split(/\s+/).length : 0;
  if (!essay) return NextResponse.json({ error: 'empty' }, { status: 400 });

  const paid = isActive(user);
  const date = paid ? tashkentToday() : FREE_AI_KEY;
  const usage = await store.getAiUsage(date);
  if (usage.messages >= AI_LIMITS.messages) return NextResponse.json({ error: 'limit_messages', usage, limits: AI_LIMITS }, { status: 429 });
  if (AI_LIMITS.tokens - usage.tokens < ESSAY_TOKENS) return NextResponse.json({ error: 'limit_tokens', usage, limits: AI_LIMITS }, { status: 429 });

  try {
    const { reply, inputTokens, outputTokens } = await callAi({
      system: body.lang === 'ru' ? SYSTEM_RU : body.lang === 'kaa' ? SYSTEM_KAA : SYSTEM,
      turns: [{ role: 'user', content: body.lang === 'ru' ? `Тема: ${topic}\nЧисло слов: ${words}\n\nСочинение ученика:\n${essay}` : `Mavzu (vaziyat): ${topic}\nSoʻzlar soni: ${words}\n\nOʻquvchi inshosi:\n${essay}` }],
      maxTokens: 700
    });
    const used = inputTokens + outputTokens;
    await store.addAiUsage(date, 1, used);
    console.log(JSON.stringify({ evt: 'ai_essay', user: user.publicId, date, in: inputTokens, out: outputTokens }));
    const m = reply.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('no json');
    const r = JSON.parse(m[0]);
    const n = (v: unknown, max: number) => Math.max(0, Math.min(max, Math.round(Number(v) * 2) / 2 || 0));
    const crit = { mazmun: n(r.mazmun, 2.5), tuzilish: n(r.tuzilish, 2.5), til: n(r.til, 2.5), imlo: n(r.imlo, 2.5) };
    const sum = crit.mazmun + crit.tuzilish + crit.til + crit.imlo;
    const cap = words < 40 ? 2 : words < 100 ? 5 : words < 150 ? 8 : 10;
    const result = {
      words,
      score: Math.min(cap, n(r.jami ?? sum, 10) || sum),
      ...crit,
      comment: String(r.izoh ?? '').slice(0, 800),
      errors: Array.isArray(r.xatolar) ? r.xatolar.slice(0, 5).map((x: unknown) => String(x).slice(0, 120)) : []
    };
    return NextResponse.json({ result, usage: { messages: usage.messages + 1, tokens: usage.tokens + used }, limits: AI_LIMITS });
  } catch (e) {
    console.error('[ai-essay] failed', (e as Error).message);
    return NextResponse.json({ error: 'upstream' }, { status: 502 });
  }
}
