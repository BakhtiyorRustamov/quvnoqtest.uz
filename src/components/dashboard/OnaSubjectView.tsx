'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import AIMascotButton from '@/components/ui/AIMascotButton';
import CollapsibleGrid from './CollapsibleGrid';
import TopicRecommendation from './TopicRecommendation';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';
import { G1_ONA_TOPICS, G1_ONA_REVIEWS, getOnaTopic, isBuiltTopic } from '@/content';
import { G1_ONA_PART2_START } from '@/content/g1-ona/topics';
import { ONA_DTM_TITLE } from '@/content/g1-ona/dtm-exam';
import { pick } from '@/lib/i18n-config';
import { SUBJECTS } from '@/content/taxonomy';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Grade-1 Ona tili subject view — same shape as the Math SubjectView
 * (notebook "what I've learned" + pen tool on top, then the "Mavzular" list),
 * but for the native-language subject. Lessons 1–5 are real, playable lessons;
 * the rest are "Coming soon" dummy tiles.
 */
export default function OnaSubjectView() {
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

  const completedKeys = new Set(progress.filter((p) => p.status === 'completed').map((p) => p.topicKey));
  const scoreOf = (key: string) => progress.find((p) => p.topicKey === key)?.score;
  const learned = G1_ONA_TOPICS.filter((tp) => completedKeys.has(tp.key));

  /* ---------------- pen drawing (same as Math view) ---------------- */
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
    const canvas = canvasRef.current!;
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    // Normalize by the ratio between the backing store and the on-screen size so
    // strokes land under the finger even if the canvas was sized before a layout
    // shift (the cause of the mobile "draws a few cm too low" offset).
    const scaleX = r.width ? canvas.width / dpr / r.width : 1;
    const scaleY = r.height ? canvas.height / dpr / r.height : 1;
    return { x: (e.clientX - r.left) * scaleX, y: (e.clientY - r.top) * scaleY };
  }

  const renderTile = (tp: (typeof G1_ONA_TOPICS)[number], i: number) => {
    const delay = Math.min(i * 0.02, 0.4);
    const isBuilt = isBuiltTopic(tp.key);
    if (isBuilt) {
      return (
        <motion.div key={tp.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
          <Link
            href={`/lesson/${tp.key}`}
            className="card h-full flex items-center gap-2 px-3 py-2.5 hover:-translate-y-0.5 transition-transform"
          >
            <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm bg-brand-blue">
              {tp.n}
            </span>
            <span className="flex-1 font-extrabold text-ink text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
            <span className="shrink-0 text-brand-orange font-black" aria-hidden>
              ▶
            </span>
          </Link>
        </motion.div>
      );
    }
    // dummy "coming soon" tile
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
        <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm bg-ink/30">
          {tp.n}
        </span>
        <span className="flex-1 font-extrabold text-ink/70 text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
        <span className="shrink-0 text-base" aria-hidden>
          🔒
        </span>
      </motion.div>
    );
  };

  // Review "game" lesson tile — purple, like the math games; sits at a fixed
  // position and never moves to "Hozircha oʻrganganlarim".
  const GAME_ICONS: Record<string, string> = { 'g1-ona-review-1': '🧩', 'g1-ona-review-2': '🐘' };
  const renderReviewTile = (r: (typeof G1_ONA_REVIEWS)[number], i: number) => {
    const delay = Math.min(i * 0.02, 0.4);
    return (
      <motion.div key={r.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
        <Link
          href={`/lesson/${r.key}`}
          className="h-full flex items-center gap-2 px-3 py-2.5 rounded-2xl border-2 border-brand-purple/60 bg-gradient-to-br from-brand-purple/15 to-brand-magenta/15 hover:-translate-y-0.5 transition-transform"
        >
          <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-base bg-brand-purple/20" aria-hidden>
            {GAME_ICONS[r.key] ?? '🏁'}
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
  };

  // Mavzular excludes completed lessons — those live only in the notebook above.
  // Part 1 interleaves the review games at their fixed "after" positions
  // (they stay even when the surrounding lessons are completed), same as math.
  const reviewsByAfter = new Map(G1_ONA_REVIEWS.map((r) => [r.after, r]));
  const part1: ReactNode[] = [];
  for (const tp of G1_ONA_TOPICS.filter((x) => x.n < G1_ONA_PART2_START)) {
    if (!completedKeys.has(tp.key)) part1.push(renderTile(tp, part1.length));
    const r = reviewsByAfter.get(tp.n);
    if (r) part1.push(renderReviewTile(r, part1.length));
  }
  const notLearned = G1_ONA_TOPICS.filter((tp) => !completedKeys.has(tp.key));
  const part2 = notLearned.filter((tp) => tp.n >= G1_ONA_PART2_START);

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · {pick(SUBJECTS['ona-tili-savod'].name, locale)}
          </h1>
        </div>

        {/* ------- notebook: "Hozirgacha o'rganganlarim" ------- */}
        <section className="mt-5 relative">
          <h2 className="font-black text-ink/70 text-lg mb-2">📒 {t('dashboard.learnedTitle')}</h2>
          <div className="relative rounded-2xl border border-ink/10 shadow-card overflow-hidden">
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

        {/* ------- Mavzular ------- */}
        <section className="mt-8">
          <h2 className="font-black text-ink/70 text-lg mb-3">📚 {t('dashboard.topicsTitle')}</h2>

          <div className="mb-2">
            <h3 className="font-black text-ink/55 text-sm uppercase tracking-wide">{t('dashboard.part1')}</h3>
          </div>
          <CollapsibleGrid>{part1}</CollapsibleGrid>

          <div className="mt-6 mb-2">
            <h3 className="font-black text-ink/55 text-sm uppercase tracking-wide">{t('dashboard.part2')}</h3>
          </div>
          <CollapsibleGrid>{part2.map(renderTile)}</CollapsibleGrid>
        </section>

        {/* DTM-style Ona tili practice exam — 20 questions, 30-minute timer.
            Words/items and order re-randomize every attempt. */}
        <section className="mt-8">
          <Link
            href="/exam/g1-ona-dtm"
            className="block rounded-3xl border-2 border-brand-blue/60 bg-gradient-to-br from-brand-blue/15 to-brand-green/15 px-5 py-5 hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card">🎓</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">{pick(ONA_DTM_TITLE, locale)}</span>
                <span className="block font-bold text-ink/50 text-[13px]">
                  {pick(
                    {
                      uz: '20 ta savol · 30 daqiqa · har safar boshqa test',
                      ru: '20 вопросов · 30 минут · каждый раз другой тест',
                      en: '20 questions · 30 minutes · a different test each time'
                    },
                    locale
                  )}
                </span>
              </div>
              <span className="shrink-0 text-brand-blue font-black text-xl" aria-hidden>
                ▶
              </span>
            </div>
          </Link>
        </section>

        {/* personalized "focused review" — practise low-score Ona tili topics */}
        <TopicRecommendation
          progress={progress.filter((p) => p.subjectKey === 'g1-ona')}
          name={user?.name ?? null}
          isPaid={user?.isPaid ?? false}
          locale={locale}
          getTopicMeta={getOnaTopic}
          startHref="/lesson/g1-ona-01"
        />
      </div>

      <AIMascotButton />
    </main>
  );
}
