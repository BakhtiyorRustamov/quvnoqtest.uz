'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import AIMascotButton from '@/components/ui/AIMascotButton';
import CollapsibleGrid from './CollapsibleGrid';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';
import { isBuiltTopic } from '@/content';
import { G1_ART_TOPICS } from '@/content/g1-art/topics';
import { pick } from '@/lib/i18n-config';
import { SUBJECTS } from '@/content/taxonomy';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Grade-1 "Tasviriy sanʼat" (Visual arts) subject view. Art-red theme with a
 * real drawing strip on top (children sketch with a red pencil), then the flat
 * lesson list from the pupil's book. This subject has NO audio and uses NO
 * emojis — every accent is an inline SVG or a plain glyph.
 */
const RED = '#e14b4b';
const INK = '#b23b3b';

/** small inline icons (no emojis anywhere in this subject) */
const IconPalette = ({ c = RED }: { c?: string }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-1 1.5-2.1-.3-1.1.5-2 1.7-2H18a3 3 0 0 0 3-3 8 8 0 0 0-9-8.9Z" />
    <circle cx="7.5" cy="11" r="1.2" fill={c} stroke="none" /><circle cx="12" cy="7.5" r="1.2" fill={c} stroke="none" /><circle cx="16" cy="10" r="1.2" fill={c} stroke="none" />
  </svg>
);
const IconLock = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export default function ArtSubjectView() {
  const t = useTranslations();
  const locale = useLocale();
  const { ensureUser } = useUser();
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => { ensureUser(1); }, [ensureUser]);
  useEffect(() => {
    api<{ progress: ProgressRow[] }>('/api/progress').then(({ data }) => setProgress(data?.progress ?? []));
  }, []);

  const s = (uz: string, ru: string, en: string) => pick({ uz, ru, en }, locale);
  const completedKeys = new Set(progress.filter((p) => p.status === 'completed').map((p) => p.topicKey));
  const scoreOf = (key: string) => progress.find((p) => p.topicKey === key)?.score;
  const learned = G1_ART_TOPICS.filter((tp) => completedKeys.has(tp.key));
  const firstBuilt = G1_ART_TOPICS.find((tp) => isBuiltTopic(tp.key)) ?? G1_ART_TOPICS[0];
  const nextLesson = G1_ART_TOPICS.find((tp) => isBuiltTopic(tp.key) && !completedKeys.has(tp.key)) ?? firstBuilt;

  /* ---------------- pencil drawing (red ink) ---------------- */
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokes = useRef<Array<Array<{ x: number; y: number }>>>([]);
  const current = useRef<Array<{ x: number; y: number }> | null>(null);
  const [penMode, setPenMode] = useState(true);

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
    ctx.strokeStyle = '#d34c3e';
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

  const renderEntry = (tp: (typeof G1_ART_TOPICS)[number], i: number) => {
    const delay = Math.min(i * 0.02, 0.4);
    const built = isBuiltTopic(tp.key);
    const done = completedKeys.has(tp.key);
    if (built) {
      return (
        <motion.div key={tp.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
          <Link href={`/lesson/${tp.key}`} className="card h-full flex items-center gap-2 px-3 py-2.5 hover:-translate-y-0.5 transition-transform">
            <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm" style={{ background: done ? 'var(--brand-green)' : RED }}>
              {done ? '✓' : tp.n}
            </span>
            <span className="flex-1 font-extrabold text-ink text-[12.5px] leading-snug">{pick(tp.title, locale)}</span>
            <span className="shrink-0 font-black" style={{ color: RED }} aria-hidden>▶</span>
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
        <span className="shrink-0" aria-hidden><IconLock /></span>
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · {pick(SUBJECTS['tasviriy-sanat'].name, locale)}
          </h1>
        </div>

        {/* what this subject is */}
        <section className="card p-5 mt-5 text-[15px] leading-relaxed font-semibold text-ink/80" style={{ borderColor: 'rgba(225,75,75,0.3)' }}>
          {s(
            'Tasviriy sanʼat — ranglar va chizishlar olami! Bu yerda barglar, kamalak, mevalar, qor parchasi va kapalaklar chizamiz, rasmlarni boʻyaymiz hamda turli usullarni sinab koʻramiz. Har darsda oʻzing chizasan va boʻyaysan.',
            'Изобразительное искусство — мир красок и рисования! Здесь мы рисуем листья, радугу, фрукты, снежинку и бабочек, раскрашиваем картинки и пробуем разные приёмы. На каждом уроке ты рисуешь и раскрашиваешь сам.',
            'Visual arts — a world of colours and drawing! Here we draw leaves, rainbows, fruit, snowflakes and butterflies, colour pictures and try different techniques. In every lesson you draw and colour yourself.'
          )}
        </section>

        {/* ------- red sketchbook: "Hozirgacha o'rganganlarim" + free draw ------- */}
        <section className="mt-6 relative">
          <h2 className="font-black text-ink/70 text-lg mb-2 flex items-center gap-2"><IconPalette /> {t('dashboard.learnedTitle')}</h2>
          <div className="relative rounded-2xl shadow-card overflow-hidden" style={{ border: '1px solid rgba(225,75,75,0.25)' }}>
            <div
              aria-hidden
              className="absolute left-0 top-0 bottom-0 w-9 z-10"
              style={{
                background: 'radial-gradient(circle at 14px 17px, #fff 0 4px, #ec8a80 4px 6.5px, transparent 6.5px), linear-gradient(#f7cfc9,#f7cfc9)',
                backgroundSize: '100% 34px, 100% 100%'
              }}
            />
            <div ref={wrapRef} className="notebook relative pl-[72px] pr-4 pt-[10px] pb-[78px] min-h-[190px]" style={{ background: '#fffdf9' }}>
              <div className="relative z-[5] flex flex-wrap gap-2.5 items-start" style={{ minHeight: 'calc(var(--line-h) * 2)' }}>
                {learned.length === 0 && <span className="font-bold text-ink/45 pt-1">{t('dashboard.emptyLearned')}</span>}
                {learned.map((tp) => (
                  <Link
                    key={tp.key}
                    href={`/lesson/${tp.key}`}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-extrabold text-ink transition-colors"
                    style={{ background: 'rgba(225,75,75,0.14)', border: '2px solid rgba(225,75,75,0.5)' }}
                    title={t('dashboard.replay')}
                  >
                    <span aria-hidden style={{ color: '#2f9e54' }}>✓</span> {tp.n}. {pick(tp.title, locale)}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white border" style={{ color: INK, borderColor: 'rgba(225,75,75,0.3)' }}>
                      <span aria-hidden>★</span> {scoreOf(tp.key) ?? 0}/10
                    </span>
                  </Link>
                ))}
              </div>

              <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-[8] ${penMode ? 'cursor-pencil' : 'pointer-events-none'}`}
                style={{ touchAction: penMode ? 'none' : 'auto' }}
                onPointerDown={(e) => { if (!penMode) return; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); current.current = [pt(e)]; redraw(); }}
                onPointerMove={(e) => { if (!penMode || !current.current) return; current.current.push(pt(e)); redraw(); }}
                onPointerUp={() => { if (current.current) { strokes.current.push(current.current); current.current = null; redraw(); } }}
              />

              <div className="absolute bottom-2.5 left-[72px] right-3 z-[12] flex items-center gap-2">
                <button onClick={() => setPenMode(true)} aria-pressed={penMode} className="btn-ghost text-sm px-3.5 py-2" style={penMode ? { boxShadow: `0 0 0 2px ${RED} inset`, background: 'rgba(225,75,75,0.1)' } : undefined}>
                  {s('Chizish', 'Рисовать', 'Draw')}
                </button>
                <button onClick={() => setPenMode(false)} aria-pressed={!penMode} className="btn-ghost text-sm px-3.5 py-2" style={!penMode ? { boxShadow: `0 0 0 2px ${RED} inset`, background: 'rgba(225,75,75,0.1)' } : undefined}>
                  {s('Kursor', 'Курсор', 'Cursor')}
                </button>
                <button onClick={() => { strokes.current = []; current.current = null; redraw(); }} className="btn-ghost text-sm px-3.5 py-2 ml-auto">
                  {t('dashboard.clearDrawing')}
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
            style={{ border: '2px solid rgba(225,75,75,0.6)', background: 'linear-gradient(135deg, rgba(225,75,75,0.15), rgba(244,154,31,0.12))' }}
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center shadow-card" aria-hidden><IconPalette c={RED} /></span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">
                  {learned.length ? s('Davom etish', 'Продолжить', 'Continue') : s('Birinchi darsdan boshlash', 'Начать с первого урока', 'Start with lesson 1')}
                </span>
                <span className="block font-bold text-ink/55 text-[13px]">
                  {nextLesson.n}-dars · {pick(nextLesson.title, locale)}
                </span>
              </div>
              <span className="shrink-0 font-black text-xl" style={{ color: RED }} aria-hidden>▶</span>
            </div>
          </Link>
        </section>

        {/* ------- Mavzular ------- */}
        <section className="mt-8">
          <h2 className="font-black text-ink/70 text-lg mb-3">{t('dashboard.topicsTitle')}</h2>
          <CollapsibleGrid>{G1_ART_TOPICS.map((tp, i) => renderEntry(tp, i))}</CollapsibleGrid>
        </section>

        {/* more coming hint */}
        <section className="card p-5 mt-8 text-center">
          <p className="font-bold text-ink/70">
            {s(
              'Barcha 36 ta dars bepul ochiq! Tasavvur qil va yarat!',
              'Все 36 уроков доступны бесплатно! Представляй и твори!',
              'All 36 lessons are free! Imagine and create!'
            )}
          </p>
        </section>
      

      </div>

      <AIMascotButton />
    </main>
  );
}
