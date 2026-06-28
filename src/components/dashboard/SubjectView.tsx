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
import { G1_MATH_TOPICS, G1_MATH_REVIEWS, isBuiltTopic } from '@/content';
import { G1_MATH_PART2_START, G1_MATH_PART3_START } from '@/content/g1-math/topics';
import { pick } from '@/lib/i18n-config';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Subject view (FR-DSH-6): notebook-styled "what I've learned" (spiral + ruled
 * lines + pen tool) on top, then the "Mavzular" list. Free tier: locked topics
 * route to Upgrade; paid: to the dummy topic pages.
 */
export default function SubjectView() {
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

  const isPaid = user?.isPaid ?? false;
  const completedKeys = new Set(progress.filter((p) => p.status === 'completed').map((p) => p.topicKey));
  const scoreOf = (key: string) => progress.find((p) => p.topicKey === key)?.score;
  const learned = G1_MATH_TOPICS.filter((tp) => completedKeys.has(tp.key));
  const notLearned = G1_MATH_TOPICS.filter((tp) => !completedKeys.has(tp.key));

  /* ---------------- pen drawing (FR-DSH-6a) ---------------- */
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
    ctx.strokeStyle = '#1FA7E0';
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
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · Matematika
          </h1>
        </div>

        {/* ------- notebook: "Hozirgacha o'rganganlarim" ------- */}
        <section className="mt-5 relative">
          <h2 className="font-black text-ink/70 text-lg mb-2">📒 {t('dashboard.learnedTitle')}</h2>
          <div className="relative rounded-2xl border border-ink/10 shadow-card overflow-hidden">
            {/* spiral binding */}
            <div
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-9 z-10"
              style={{
                background:
                  'radial-gradient(circle at 14px 17px, #fff 0 4px, #8E9AA6 4px 6.5px, transparent 6.5px), linear-gradient(#EDF1F4,#EDF1F4)',
                backgroundSize: '100% 34px, 100% 100%'
              }}
            />
            <div ref={wrapRef} className="notebook relative pl-[72px] pr-4 pt-[10px] pb-[78px] min-h-[170px]">
              {/* completed lessons as adjacent buttons */}
              <div className="relative z-[5] flex flex-wrap gap-2.5 items-start" style={{ minHeight: 'calc(var(--line-h) * 2)' }}>
                {learned.length === 0 && (
                  <span className="font-bold text-ink/45 pt-1">{t('dashboard.emptyLearned')}</span>
                )}
                {learned.map((tp) => (
                  <Link
                    key={tp.key}
                    href={`/lesson/${tp.key}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-green/15 border-2 border-brand-green/50 px-3 py-1.5 font-extrabold text-ink hover:bg-brand-green/25 transition-colors"
                    title={t('dashboard.replay')}
                  >
                    ✅ {tp.n}. {pick(tp.title, locale)}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white text-brand-purple border border-brand-purple/30">
                      ⭐ {scoreOf(tp.key) ?? 0}/10
                    </span>
                  </Link>
                ))}
              </div>

              {/* drawing canvas overlay (pen mode) — extra blank lines below to draw in */}
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

              {/* pen toolbar (bottom of the notebook section) */}
              <div className="absolute bottom-2.5 left-[72px] right-3 z-[12] flex items-center gap-2">
                <button
                  onClick={() => setPenMode(true)}
                  aria-pressed={penMode}
                  className={`btn-ghost text-sm px-3.5 py-2 ${penMode ? 'ring-2 ring-brand-blue bg-brand-blue/10' : ''}`}
                >
                  ✏️ {t('dashboard.pen')}
                </button>
                <button
                  onClick={() => setPenMode(false)}
                  aria-pressed={!penMode}
                  className={`btn-ghost text-sm px-3.5 py-2 ${!penMode ? 'ring-2 ring-brand-blue bg-brand-blue/10' : ''}`}
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

        {/* ------- Mavzular (lessons not opened yet) — split into Part 1 & Part 2 ------- */}
        <section className="mt-8">
          <h2 className="font-black text-ink/70 text-lg mb-3">📚 {t('dashboard.topicsTitle')}</h2>

          {(() => {
            // Interleave lessons (which leave this list once learned) with the
            // review "game" lessons, which sit at fixed positions and never move
            // to "Hozircha oʻrganganlarim" — they always stay here in Mavzular.
            const reviewsByAfter = new Map(G1_MATH_REVIEWS.map((r) => [r.after, r]));
            type Entry =
              | { kind: 'lesson'; tp: (typeof G1_MATH_TOPICS)[number] }
              | { kind: 'review'; r: (typeof G1_MATH_REVIEWS)[number] };

            // Build the interleaved entry list for a slice of topics.
            const buildEntries = (topics: typeof G1_MATH_TOPICS, withReviews: boolean): Entry[] => {
              const entries: Entry[] = [];
              for (const tp of topics) {
                if (!completedKeys.has(tp.key)) entries.push({ kind: 'lesson', tp });
                const r = withReviews ? reviewsByAfter.get(tp.n) : undefined;
                if (r) entries.push({ kind: 'review', r });
              }
              return entries;
            };

            const renderEntry = (e: Entry, i: number) => {
              const delay = Math.min(i * 0.02, 0.4);
              if (e.kind === 'lesson') {
                const tp = e.tp;
                const isBuilt = isBuiltTopic(tp.key);
                const openable = isBuilt || isPaid;
                const href = isBuilt ? `/lesson/${tp.key}` : isPaid ? `/topic/${tp.key}` : '/upgrade';
                return (
                  <motion.div key={tp.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
                    <Link
                      href={href}
                      title={openable ? undefined : t('dashboard.lockedHint')}
                      className={`card h-full flex items-center gap-2 px-3 py-2.5 hover:-translate-y-0.5 transition-transform ${openable ? '' : 'opacity-75'}`}
                    >
                      <span className={`shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm ${openable ? 'bg-brand-blue' : 'bg-ink/30'}`}>
                        {tp.n}
                      </span>
                      <span className="flex-1 font-extrabold text-ink text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
                      <span className={`shrink-0 ${openable ? 'text-brand-orange font-black' : 'text-base'}`} aria-hidden>
                        {openable ? '▶' : '🔒'}
                      </span>
                    </Link>
                  </motion.div>
                );
              }
              const r = e.r;
              if (r.built) {
                return (
                  <motion.div key={r.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
                    <Link
                      href={`/lesson/${r.key}`}
                      className="h-full flex items-center gap-2 px-3 py-2.5 rounded-2xl border-2 border-brand-purple/60 bg-gradient-to-br from-brand-purple/15 to-brand-magenta/15 hover:-translate-y-0.5 transition-transform"
                    >
                      <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-base bg-brand-purple/20" aria-hidden>
                        🏁
                      </span>
                      <span className="flex-1 leading-snug">
                        <span className="block font-black text-brand-purple text-[12.5px]">{pick(r.title, locale)}</span>
                        <span className="block font-bold text-ink/45 text-[10.5px]">{t('dashboard.review')}</span>
                      </span>
                      <span className="shrink-0 text-brand-orange font-black" aria-hidden>
                        ▶
                      </span>
                    </Link>
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={r.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay }}
                  aria-label={t('dashboard.review')}
                  className="h-full flex items-center gap-2 px-3 py-2.5 rounded-2xl border-2 border-dashed border-brand-purple/50 bg-gradient-to-br from-brand-purple/10 to-brand-magenta/10 cursor-default"
                >
                  <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-base bg-brand-purple/15" aria-hidden>
                    🔁
                  </span>
                  <span className="flex-1 leading-snug">
                    <span className="block font-black text-brand-purple text-[12.5px]">{t('dashboard.review')}</span>
                    <span className="block font-bold text-ink/45 text-[10.5px]">{t('common.comingSoon')}</span>
                  </span>
                </motion.div>
              );
            };

            const part1 = buildEntries(G1_MATH_TOPICS.filter((tp) => tp.n < G1_MATH_PART2_START), true);
            const part2 = buildEntries(G1_MATH_TOPICS.filter((tp) => tp.n >= G1_MATH_PART2_START && tp.n < G1_MATH_PART3_START), false);
            const part3 = buildEntries(G1_MATH_TOPICS.filter((tp) => tp.n >= G1_MATH_PART3_START), false);

            return (
              <>
                <h3 className="font-black text-ink/55 text-sm uppercase tracking-wide mb-2">{t('dashboard.part1')}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">{part1.map(renderEntry)}</div>

                <h3 className="font-black text-ink/55 text-sm uppercase tracking-wide mt-6 mb-2">{t('dashboard.part2')}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">{part2.map(renderEntry)}</div>

                <h3 className="font-black text-ink/55 text-sm uppercase tracking-wide mt-6 mb-2">{t('dashboard.part3')}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">{part3.map(renderEntry)}</div>
              </>
            );
          })()}
        </section>

        {/* personalized "focused review" — practise low-score topics + subscribe */}
        <TopicRecommendation
          progress={progress}
          name={user?.name ?? null}
          isPaid={user?.isPaid ?? false}
          locale={locale}
        />
      </div>

      {/* subject mascot doubles as the AI assistant entry (FR-MAS-1) */}
      <AIMascotButton />
    </main>
  );
}
