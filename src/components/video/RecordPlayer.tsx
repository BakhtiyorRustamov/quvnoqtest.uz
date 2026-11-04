'use client';

import { useEffect, useRef, useState } from 'react';
import Board from '@/components/board/Board';
import type { AiBoardLesson } from '@/lib/aiBoard';
import MoviyDaftarLogo from '@/components/brand/MoviyDaftarLogo';

/**
 * Video recorder stage (used only by scripts/video/make-video.mjs through /record).
 * Plays a fixed timeline: logo intro → the question being typed into the SI chat →
 * cursor clicks "Mufassal" → each board part (shown for its voice length) →
 * cursor clicks the reply button → logo outro. Timestamps of every part go to
 * window.__marks so the script can lay the Gemini voice under the video.
 */
type Rec = { question: string; lesson: AiBoardLesson; durations: number[] };
declare global {
  interface Window {
    __REC?: Rec;
    __marks?: { step: number; t: number }[];
    __t0wall?: number;
    __done?: boolean;
  }
}

const ORANGE = '#f59e0b';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Logo({ big = false }: { big?: boolean }) {
  if (!big) return <MoviyDaftarLogo size="sm" />;
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <MoviyDaftarLogo size="lg" stacked />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="QuvnoqTest.uz" className="w-[52%] opacity-90" draggable={false} />
    </div>
  );
}

function Cursor({ x, y, down }: { x: number; y: number; down: boolean }) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-50" style={{ transform: `translate(${x}px, ${y}px)`, transition: 'transform 700ms cubic-bezier(.4,.1,.2,1)' }}>
      {down && <span className="absolute -left-5 -top-5 h-10 w-10 animate-ping rounded-full bg-amber-400/60" />}
      <svg width="34" height="40" viewBox="0 0 24 28" style={{ transform: down ? 'scale(.86)' : 'scale(1)', transition: 'transform 120ms' }}>
        <path d="M2 2 L2 22 L7.5 17 L11 25 L14.5 23.5 L11 15.8 L18.5 15.5 Z" fill="#111827" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function RecordPlayer() {
  const [rec, setRec] = useState<Rec | null>(null);
  const [phase, setPhase] = useState<'wait' | 'intro' | 'ask' | 'board' | 'outro'>('wait');
  const [typed, setTyped] = useState('');
  const [step, setStep] = useState(0);
  const [runId, setRunId] = useState(1);
  const [drawn, setDrawn] = useState(false);
  const [cur, setCur] = useState({ x: 520, y: 1200, down: false });
  const stage = useRef<HTMLDivElement | null>(null);
  const btn = useRef<HTMLButtonElement | null>(null);
  const drawnRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (window.__REC) {
        clearInterval(t);
        setRec(window.__REC);
      }
    }, 100);
    return () => clearInterval(t);
  }, []);

  /** move the cursor onto an element (relative to the stage) and click */
  async function clickOn(el: Element | null) {
    if (!el || !stage.current) return;
    const s = stage.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setCur({ x: r.left - s.left + r.width * 0.55, y: r.top - s.top + r.height * 0.45, down: false });
    await sleep(800);
    setCur((c) => ({ ...c, down: true }));
    await sleep(380);
    setCur((c) => ({ ...c, down: false }));
  }

  useEffect(() => {
    if (!rec) return;
    let live = true;
    (async () => {
      window.__marks = [];
      window.__t0wall = Date.now();
      const t0 = performance.now();
      const mark = (s: number) => window.__marks!.push({ step: s, t: Math.round(performance.now() - t0) });
      setPhase('intro');
      await sleep(2600);
      setPhase('ask');
      await sleep(500);
      const q = rec.question;
      const per = Math.max(18, Math.min(55, 3200 / q.length));
      for (let i = 1; i <= q.length && live; i++) {
        setTyped(q.slice(0, i));
        await sleep(per);
      }
      await sleep(400);
      await clickOn(btn.current);
      await sleep(350);
      for (let i = 0; i < rec.lesson.steps.length && live; i++) {
        drawnRef.current = false;
        setDrawn(false);
        setStep(i);
        setRunId((r) => r + 1);
        setPhase('board');
        mark(i);
        const started = performance.now();
        const need = (rec.durations[i] ?? 4) * 1000 + 700;
        // wait for both the voice and the drawing
        while (live && (performance.now() - started < need || !drawnRef.current)) await sleep(80);
        if (i < rec.lesson.steps.length - 1) {
          const buttons = stage.current?.querySelectorAll('.lab-btn');
          await clickOn(buttons?.[buttons.length - 1] ?? null);
          await sleep(200);
        }
      }
      await sleep(600);
      mark(-1);
      setPhase('outro');
      await sleep(3600);
      window.__done = true;
    })();
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rec]);

  const lesson = rec?.lesson;
  const s = lesson?.steps[step];

  return (
    <div ref={stage} className="relative mx-auto flex h-[1024px] w-[576px] flex-col overflow-hidden bg-[#fff8ee] font-round">
      {phase === 'intro' || phase === 'outro' ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-10 text-center">
          <Logo big />
          {phase === 'intro' ? (
            <p className="text-[30px] font-black leading-tight text-ink">SI ustoz doskada tushuntiradi</p>
          ) : (
            <>
              <p className="text-[30px] font-black leading-tight text-ink">Savolingizni bering — SI ustoz tushuntiradi!</p>
              <p className="rounded-full bg-[#f39a1f] px-8 py-4 text-[36px] font-black text-white">moviydaftar.uz</p>
              <p className="px-4 text-[22px] font-bold leading-snug text-ink/60">Barcha fanlardan namunaviy milliy sertifikat testlari, tushunarli darslar va interaktiv mashqlar</p>
            </>
          )}
        </div>
      ) : (
        <>
          <header className="flex items-center justify-between px-6 pt-6">
            <Logo />
            <span className="rounded-full bg-white px-4 py-2 text-[18px] font-black text-ink/70 shadow">SI ustoz</span>
          </header>
          <div className="px-5 pt-5">
            {phase === 'ask' ? (
              <div className="rounded-3xl bg-white p-5 shadow-lg">
                <div className="min-h-[110px] rounded-2xl border-2 border-ink/10 px-4 py-3 text-[26px] font-bold text-ink">
                  {typed}
                  <span className="ml-0.5 inline-block h-8 w-[3px] translate-y-1 animate-pulse bg-ink" />
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <button ref={btn} className="rounded-full border-[3px] border-amber-400 bg-white px-6 py-3 text-[22px] font-black text-amber-500">
                    Mufassal
                  </button>
                  <span className="rounded-full bg-[#2563eb] px-6 py-3 text-[22px] font-black text-white">Muxtasar</span>
                </div>
              </div>
            ) : (
              <div className="ml-auto max-w-[90%] rounded-3xl rounded-br-md bg-[#2563eb] px-5 py-3 text-[22px] font-bold leading-snug text-white">{rec?.question}</div>
            )}
          </div>
          {phase === 'board' && lesson && s && (
            <div className="flex flex-1 flex-col justify-center px-3 pb-16">
              <Board
                plan={lesson}
                grid
                step={step}
                fromStep={step - 1}
                runId={runId}
                onDrawn={() => {
                  drawnRef.current = true;
                  setDrawn(true);
                }}
                action={step < lesson.steps.length - 1 ? { label: s.next, color: ORANGE, show: drawn, onClick: () => {} } : undefined}
              />
              <div className="mt-4 rounded-3xl bg-white px-5 py-4 text-[24px] font-bold leading-snug text-ink shadow">{s.say}</div>
            </div>
          )}
          <footer className="absolute inset-x-0 bottom-5 text-center text-[20px] font-black text-ink/45">moviydaftar.uz</footer>
        </>
      )}
      <Cursor {...cur} />
    </div>
  );
}
