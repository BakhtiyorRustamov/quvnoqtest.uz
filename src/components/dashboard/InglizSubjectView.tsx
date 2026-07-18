'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import AIMascotButton from '@/components/ui/AIMascotButton';
import TopicRecommendation from './TopicRecommendation';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';
import { isBuiltTopic, G1_INGLIZ_UNITS, G1_INGLIZ_LESSONS } from '@/content';
import { getInglizLesson } from '@/content/g1-ingliz/structure';
import { pick } from '@/lib/i18n-config';
import { SUBJECTS } from '@/content/taxonomy';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Grade-1 "Ingliz tili" (English) subject view. Mirrors the Matematika layout —
 * a sky-blue "what I've learned" notebook strip (spiral + pen tool) on top,
 * then a continue card and the course map: 10 UNIT cards (Hello, units 1–8 and
 * a review unit), each holding its SIX lesson parts. Only the Hello unit is
 * playable in v1 — the rest are "coming soon" dummy buttons.
 */
const BLUE = '#1fa7e0';

export default function InglizSubjectView() {
  const t = useTranslations();
  const locale = useLocale();
  const { user, ensureUser } = useUser();
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    ensureUser(1);
  }, [ensureUser]);

  useEffect(() => {
    api<{ progress: ProgressRow[] }>('/api/progress').then(({ data }) => setProgress(data?.progress ?? []));
  }, []);

  const s = (uz: string, ru: string, en: string) => pick({ uz, ru, en }, locale);
  const completedKeys = new Set(progress.filter((p) => p.status === 'completed').map((p) => p.topicKey));
  const scoreOf = (key: string) => progress.find((p) => p.topicKey === key)?.score;
  const learned = G1_INGLIZ_LESSONS.filter((l) => completedKeys.has(l.key));
  const firstBuilt = G1_INGLIZ_LESSONS.find((l) => isBuiltTopic(l.key)) ?? G1_INGLIZ_LESSONS[0];
  const nextLesson = G1_INGLIZ_LESSONS.find((l) => isBuiltTopic(l.key) && !completedKeys.has(l.key)) ?? firstBuilt;

  /* ---------------- pen drawing (same as Matematika, blue ink) ---------------- */
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokes = useRef<Array<Array<{ x: number; y: number }>>>([]);
  const current = useRef<Array<{ x: number; y: number }> | null>(null);
  const [penMode, setPenMode] = useState(false);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#1587bd';
    ctx.lineWidth = 3.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const paths = current.current ? [...strokes.current, current.current] : strokes.current;
    for (const path of paths) {
      if (path.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
      ctx.stroke();
    }
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(redraw);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [redraw]);

  function pt(e: React.PointerEvent): { x: number; y: number } {
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const scaleX = r.width ? canvas.width / dpr / r.width : 1;
    const scaleY = r.height ? canvas.height / dpr / r.height : 1;
    return { x: (e.clientX - r.left) * scaleX, y: (e.clientY - r.top) * scaleY };
  }

  /** the six strand icons shown on part buttons (vocab → CLIL) */
  const PART_ICONS = ['🗣️', '🧩', '📖', '💬', '🐾', '🔬'];

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · {pick(SUBJECTS['ingliz-tili'].name, locale)}
          </h1>
        </div>

        {/* what this subject is */}
        <section
          className="card p-5 mt-5 text-[15px] leading-relaxed font-semibold text-ink/80"
          style={{ borderColor: 'rgba(31,167,224,0.3)' }}
        >
          {s(
            'Ingliz tili — dunyo bolalari bilan doʻstlashish tili! Bu yerda salomlashamiz, ranglar, sonlar va soʻzlarni tinglab oʻrganamiz. Har bir boʻlimda oltita qiziqarli dars bor: yangi soʻzlar, gap qurish, hikoya, suhbat, tovushlar va kashfiyot.',
            'Английский — язык дружбы с детьми всего мира! Здесь мы здороваемся, слушаем и учим цвета, числа и слова. В каждом разделе шесть весёлых уроков: новые слова, фразы, история, беседа, звуки и открытие.',
            'English is the language of making friends around the world! Here we say hello, listen and learn colors, numbers and words. Every unit has six fun parts: new words, sentences, a story, talk time, sounds and a discovery lesson.'
          )}
        </section>

        {/* ------- blue notebook: "Hozirgacha o'rganganlarim" ------- */}
        <section className="mt-6 relative">
          <h2 className="font-black text-ink/70 text-lg mb-2">🇬🇧 {t('dashboard.learnedTitle')}</h2>
          <div className="relative rounded-2xl shadow-card overflow-hidden" style={{ border: '1px solid rgba(31,167,224,0.25)' }}>
            {/* spiral binding (blue-tinted) */}
            <div
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-9 z-10"
              style={{
                background:
                  'radial-gradient(circle at 14px 17px, #fff 0 4px, #6fc2e8 4px 6.5px, transparent 6.5px), linear-gradient(#d9eefa,#d9eefa)',
                backgroundSize: '100% 34px, 100% 100%'
              }}
            />
            <div ref={wrapRef} className="notebook relative pl-[72px] pr-4 pt-[10px] pb-[78px] min-h-[170px]">
              <div className="relative z-[5] flex flex-wrap gap-2.5 items-start" style={{ minHeight: 'calc(var(--line-h) * 2)' }}>
                {learned.length === 0 && (
                  <span className="font-bold text-ink/45 pt-1">{t('dashboard.emptyLearned')}</span>
                )}
                {learned.map((l) => (
                  <Link
                    key={l.key}
                    href={`/lesson/${l.key}`}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-extrabold text-ink transition-colors"
                    style={{ background: 'rgba(31,167,224,0.14)', border: '2px solid rgba(31,167,224,0.5)' }}
                    title={t('dashboard.replay')}
                  >
                    ✅ {pick(l.title, locale)}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white text-brand-purple border border-brand-purple/30">
                      ⭐ {scoreOf(l.key) ?? 0}/10
                    </span>
                  </Link>
                ))}
              </div>

              {/* drawing canvas overlay (pen mode) */}
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-[8] ${penMode ? 'cursor-pencil' : 'pointer-events-none'}`}
                style={{ touchAction: penMode ? 'none' : 'auto' }}
                onPointerDown={(e) => {
                  if (!penMode) return;
                  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                  current.current = [pt(e)];
                  redraw();
                }}
                onPointerMove={(e) => {
                  if (!penMode || !current.current) return;
                  current.current.push(pt(e));
                  redraw();
                }}
                onPointerUp={() => {
                  if (current.current) {
                    strokes.current.push(current.current);
                    current.current = null;
                    redraw();
                  }
                }}
              />

              {/* pen toolbar */}
              <div className="absolute bottom-2.5 left-[72px] right-3 z-[12] flex items-center gap-2">
                <button
                  onClick={() => setPenMode(true)}
                  aria-pressed={penMode}
                  className="btn-ghost text-sm px-3.5 py-2"
                  style={penMode ? { boxShadow: `0 0 0 2px ${BLUE} inset`, background: 'rgba(31,167,224,0.1)' } : undefined}
                >
                  ✏️ {t('dashboard.pen')}
                </button>
                <button
                  onClick={() => setPenMode(false)}
                  aria-pressed={!penMode}
                  className="btn-ghost text-sm px-3.5 py-2"
                  style={!penMode ? { boxShadow: `0 0 0 2px ${BLUE} inset`, background: 'rgba(31,167,224,0.1)' } : undefined}
                >
                  🖱️ {t('dashboard.cursor')}
                </button>
                <button
                  onClick={() => {
                    strokes.current = [];
                    current.current = null;
                    redraw();
                  }}
                  className="btn-ghost text-sm px-3.5 py-2 ml-auto"
                >
                  🧽 {t('dashboard.clearDrawing')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* recommendation / continue */}
        <section className="mt-6">
          <Link
            href={`/lesson/${nextLesson.key}`}
            className="block rounded-3xl px-5 py-5 hover:-translate-y-0.5 transition-transform"
            style={{ border: '2px solid rgba(31,167,224,0.6)', background: 'linear-gradient(135deg, rgba(31,167,224,0.15), rgba(124,92,255,0.12))' }}
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card" aria-hidden>🤖</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">
                  {learned.length ? s('Davom etish', 'Продолжить', 'Continue') : s('Birinchi darsdan boshlash', 'Начать с первого урока', 'Start with lesson 1')}
                </span>
                <span className="block font-bold text-ink/55 text-[13px]">{pick(nextLesson.title, locale)}</span>
              </div>
              <span className="shrink-0 font-black text-xl" style={{ color: BLUE }} aria-hidden>▶</span>
            </div>
          </Link>
        </section>

        {/* ------- Units (Mavzular) ------- */}
        <section className="mt-8">
          <h2 className="font-black text-ink/70 text-lg mb-3">📚 {t('dashboard.topicsTitle')}</h2>
          <div className="flex flex-col gap-4">
            {G1_INGLIZ_UNITS.map((unit, ui) => {
              const unitBuilt = unit.lessons.some((l) => isBuiltTopic(l.key));
              return (
                <motion.div
                  key={unit.unitN}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(ui * 0.04, 0.4) }}
                  className="rounded-3xl overflow-hidden shadow-card"
                  style={{ border: `2px solid ${unitBuilt ? 'rgba(31,167,224,0.55)' : 'rgba(28,37,64,0.12)'}` }}
                >
                  {/* unit header */}
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      background: unitBuilt
                        ? 'linear-gradient(135deg, rgba(31,167,224,0.18), rgba(124,92,255,0.12))'
                        : 'rgba(28,37,64,0.04)'
                    }}
                  >
                    <span
                      className="shrink-0 w-10 h-10 rounded-full grid place-items-center font-black text-white text-base shadow"
                      style={{ background: unitBuilt ? BLUE : 'rgba(28,37,64,0.3)' }}
                    >
                      {unit.badge}
                    </span>
                    <span className="flex-1 font-black text-ink text-[17px]">
                      {unit.emoji} {pick(unit.title, locale)}
                    </span>
                    {!unitBuilt && <span className="text-base" aria-hidden>🔒</span>}
                  </div>

                  {/* six lesson parts */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-white">
                    {unit.lessons.map((l, pi) => {
                      const built = isBuiltTopic(l.key);
                      const done = completedKeys.has(l.key);
                      if (built) {
                        return (
                          <Link
                            key={l.key}
                            href={`/lesson/${l.key}`}
                            className="card h-full flex items-center gap-2 px-3 py-2.5 hover:-translate-y-0.5 transition-transform"
                          >
                            <span
                              className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm"
                              style={{ background: done ? 'var(--brand-green)' : BLUE }}
                            >
                              {done ? '✓' : PART_ICONS[pi]}
                            </span>
                            <span className="flex-1 font-extrabold text-ink text-[12.5px] leading-snug">{pick(l.title, locale)}</span>
                            <span className="shrink-0 font-black" style={{ color: BLUE }} aria-hidden>▶</span>
                          </Link>
                        );
                      }
                      return (
                        <div
                          key={l.key}
                          title={t('common.comingSoon')}
                          aria-label={t('common.comingSoon')}
                          className="card h-full flex items-center gap-2 px-3 py-2.5 opacity-70 cursor-default"
                        >
                          <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm bg-ink/25">
                            {PART_ICONS[pi]}
                          </span>
                          <span className="flex-1 font-extrabold text-ink/60 text-[12.5px] leading-snug">{pick(l.title, locale)}</span>
                          <span className="shrink-0 text-base" aria-hidden>🔒</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* dummy practice-test card (coming soon) */}
        <section className="mt-8">
          <div
            aria-label={t('common.comingSoon')}
            className="block rounded-3xl px-5 py-5 opacity-80 cursor-default"
            style={{ border: '2px solid rgba(31,167,224,0.5)', background: 'linear-gradient(135deg, rgba(31,167,224,0.15), rgba(124,92,255,0.1))' }}
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card" aria-hidden>📝</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">
                  {s('Ingliz tili sinovi', 'Тест по английскому', 'English quiz')}
                </span>
                <span className="block font-bold text-ink/50 text-[13px]">
                  {s('Tez orada', 'Скоро', 'Coming soon')}
                </span>
              </div>
              <span className="shrink-0 text-base" aria-hidden>🔒</span>
            </div>
          </div>
        </section>

        {/* more coming hint */}
        <section className="card p-5 mt-8 text-center">
          <div className="text-3xl" aria-hidden>🔜</div>
          <p className="font-bold text-ink/70 mt-1">
            {s(
              '«Salom!» boʻlimining barcha 6 darsi ochiq! Qolgan boʻlimlar tez orada qoʻshiladi.',
              'Все 6 уроков раздела «Привет!» открыты! Остальные разделы скоро появятся.',
              'All 6 lessons of the Hello unit are open! More units are coming soon.'
            )}
          </p>
        </section>
      

        {/* personalized focused-review recommendation (same as maths) */}
        <TopicRecommendation
          progress={progress}
          name={user?.name ?? null}
          isPaid={user?.isPaid ?? false}
          locale={locale}
          getTopicMeta={getInglizLesson}
          startHref="/lesson/g1-ingliz-01"
        />
      </div>

      <AIMascotButton />
    </main>
  );
}
