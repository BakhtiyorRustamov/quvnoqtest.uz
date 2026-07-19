'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import AIMascotButton from '@/components/ui/AIMascotButton';
import TopicRecommendation from './TopicRecommendation';
import CollapsibleGrid from './CollapsibleGrid';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';
import { isBuiltTopic } from '@/content';
import { G1_ALIFBE_TOPICS } from '@/content/g1-alifbe/topics';
import { getAlifbeTopic } from '@/content/g1-alifbe/topics';
import { pick } from '@/lib/i18n-config';
import { SUBJECTS } from '@/content/taxonomy';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Grade-1 "Alifbe" (literacy primer) subject view. Mirrors the Matematika /
 * Tabiiy layout — a coral "what I've learned" notebook strip (spiral + ruled
 * lines + pen tool) on top, then the "Mavzular" list. Lessons 1–5 are real,
 * playable lessons; 6–10 are "coming soon" dummy buttons.
 */
export default function AlifbeSubjectView() {
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
  const learned = G1_ALIFBE_TOPICS.filter((tp) => completedKeys.has(tp.key));
  const firstBuilt = G1_ALIFBE_TOPICS.find((tp) => isBuiltTopic(tp.key)) ?? G1_ALIFBE_TOPICS[0];
  const nextLesson =
    G1_ALIFBE_TOPICS.find((tp) => isBuiltTopic(tp.key) && !completedKeys.has(tp.key)) ?? firstBuilt;

  /* ---------------- pen drawing (same as Matematika, coral ink) ---------------- */
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
    ctx.strokeStyle = '#e8553e';
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

  const renderEntry = (tp: (typeof G1_ALIFBE_TOPICS)[number], i: number) => {
    const delay = Math.min(i * 0.02, 0.4);
    const built = isBuiltTopic(tp.key);
    const done = completedKeys.has(tp.key);
    if (built) {
      return (
        <motion.div key={tp.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
          <Link
            href={`/lesson/${tp.key}`}
            className="card h-full flex items-center gap-2 px-3 py-2.5 hover:-translate-y-0.5 transition-transform"
          >
            <span
              className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm"
              style={{ background: done ? 'var(--brand-green)' : '#f4693b' }}
            >
              {done ? '✓' : tp.n}
            </span>
            <span className="flex-1 font-extrabold text-ink text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
            <span className="shrink-0 text-brand-orange font-black" aria-hidden>▶</span>
          </Link>
        </motion.div>
      );
    }
    return (
      <motion.div
        key={tp.key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        title={t('common.comingSoon')}
        aria-label={t('common.comingSoon')}
        className="card h-full flex items-center gap-2 px-3 py-2.5 opacity-70 cursor-default"
      >
        <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm bg-ink/30">{tp.n}</span>
        <span className="flex-1 font-extrabold text-ink/70 text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
        <span className="shrink-0 text-base" aria-hidden>🔒</span>
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · {pick(SUBJECTS.alifbe.name, locale)}
          </h1>
        </div>

        {/* what this subject is */}
        <section
          className="card p-5 mt-5 text-[15px] leading-relaxed font-semibold text-ink/80"
          style={{ borderColor: 'rgba(244,105,59,0.3)' }}
        >
          {s(
            'Alifbe — oʻqish va yozishning birinchi qadamlari. Bu yerda tovushlar va harflar bilan tanishamiz, soʻzlarni boʻgʻinlarga boʻlamiz, unli va undoshlarni farqlaymiz. Har bir darsda tinglaymiz, oʻynab oʻqiymiz va yangi harflarni oʻrganamiz.',
            'Алифбе — первые шаги в чтении и письме. Здесь мы знакомимся со звуками и буквами, делим слова на слоги, различаем гласные и согласные. На каждом уроке слушаем, играем и учим новые буквы.',
            'The Alphabet primer — the first steps of reading and writing. Here we meet sounds and letters, split words into syllables, and tell vowels from consonants. In every lesson we listen, play and learn new letters.'
          )}
        </section>

        {/* ------- coral notebook: "Hozirgacha o'rganganlarim" ------- */}
        <section className="mt-6 relative">
          <h2 className="font-black text-ink/70 text-lg mb-2">🔤 {t('dashboard.learnedTitle')}</h2>
          <div className="relative rounded-2xl shadow-card overflow-hidden" style={{ border: '1px solid rgba(244,105,59,0.25)' }}>
            {/* spiral binding (coral-tinted) */}
            <div
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-9 z-10"
              style={{
                background:
                  'radial-gradient(circle at 14px 17px, #fff 0 4px, #ef9077 4px 6.5px, transparent 6.5px), linear-gradient(#fbe0d6,#fbe0d6)',
                backgroundSize: '100% 34px, 100% 100%'
              }}
            />
            <div ref={wrapRef} className="notebook notebook-coral relative pl-[72px] pr-4 pt-[10px] pb-[78px] min-h-[170px]">
              <div className="relative z-[5] flex flex-wrap gap-2.5 items-start" style={{ minHeight: 'calc(var(--line-h) * 2)' }}>
                {learned.length === 0 && (
                  <span className="font-bold text-ink/45 pt-1">{t('dashboard.emptyLearned')}</span>
                )}
                {learned.map((tp) => (
                  <Link
                    key={tp.key}
                    href={`/lesson/${tp.key}`}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-extrabold text-ink transition-colors"
                    style={{ background: 'rgba(244,105,59,0.16)', border: '2px solid rgba(244,105,59,0.55)' }}
                    title={t('dashboard.replay')}
                  >
                    ✅ {tp.n}. {pick(tp.title, locale)}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white text-brand-purple border border-brand-purple/30">
                      ⭐ {scoreOf(tp.key) ?? 0}/10
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
                  style={penMode ? { boxShadow: '0 0 0 2px #f4693b inset', background: 'rgba(244,105,59,0.1)' } : undefined}
                >
                  ✏️ {t('dashboard.pen')}
                </button>
                <button
                  onClick={() => setPenMode(false)}
                  aria-pressed={!penMode}
                  className="btn-ghost text-sm px-3.5 py-2"
                  style={!penMode ? { boxShadow: '0 0 0 2px #f4693b inset', background: 'rgba(244,105,59,0.1)' } : undefined}
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
            style={{ border: '2px solid rgba(244,105,59,0.6)', background: 'linear-gradient(135deg, rgba(244,105,59,0.15), rgba(243,154,31,0.15))' }}
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card" aria-hidden>🔤</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">
                  {learned.length ? s('Davom etish', 'Продолжить', 'Continue') : s('Birinchi darsdan boshlash', 'Начать с первого урока', 'Start with lesson 1')}
                </span>
                <span className="block font-bold text-ink/55 text-[13px]">
                  {nextLesson.n}-dars · {pick(nextLesson.title, locale)}
                </span>
              </div>
              <span className="shrink-0 font-black text-xl" style={{ color: '#f4693b' }} aria-hidden>▶</span>
            </div>
          </Link>
        </section>

        {/* ------- Mavzular ------- */}
        <section className="mt-8">
          <h2 className="font-black text-ink/70 text-lg mb-3">📚 {t('dashboard.topicsTitle')}</h2>
          <CollapsibleGrid>{G1_ALIFBE_TOPICS.map(renderEntry)}</CollapsibleGrid>
        </section>

        {/* dummy practice-test card (coming soon) — mirrors Matematika's exam card */}
        <section className="mt-8">
          <div
            aria-label={t('common.comingSoon')}
            className="block rounded-3xl px-5 py-5 opacity-80 cursor-default"
            style={{ border: '2px solid rgba(244,105,59,0.5)', background: 'linear-gradient(135deg, rgba(244,105,59,0.15), rgba(243,154,31,0.1))' }}
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card" aria-hidden>📝</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">
                  {s('Alifbe sinovi', 'Тест по алифбе', 'Alphabet primer quiz')}
                </span>
                <span className="block font-bold text-ink/50 text-[13px]">
                  {s('Tez orada', 'Скоро', 'Coming soon')}
                </span>
              </div>
              <span className="shrink-0 text-base" aria-hidden>🔒</span>
            </div>
          </div>
        </section>

      

        {/* personalized focused-review recommendation (same as maths) */}
        <TopicRecommendation
          progress={progress}
          name={user?.name ?? null}
          isPaid={user?.isPaid ?? false}
          locale={locale}
          subjectName={pick(SUBJECTS.alifbe.name, locale)}
          getTopicMeta={getAlifbeTopic}
          startHref="/lesson/g1-alifbe-01"
        />
      </div>

      <AIMascotButton />
    </main>
  );
}
