'use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

type Pt = { x: number; y: number };
type Stroke = Pt[];
export type SketchMode = 'cursor' | 'pen' | 'eraser';

const L: Record<string, Record<SketchMode, string>> = {
  uz: { cursor: 'Kursor', pen: 'Qalam', eraser: 'Oʻchirgich' },
  ru: { cursor: 'Курсор', pen: 'Ручка', eraser: 'Ластик' },
  en: { cursor: 'Cursor', pen: 'Pen', eraser: 'Eraser' }
};

const PEN_COLOR = '#1FA7E0';
const PEN_WIDTH = 3;
const ERASE_RADIUS = 16;

/** distance from p to segment a–b */
function segDist(p: Pt, a: Pt, b: Pt): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  let t = len2 ? ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}

function hits(stroke: Stroke, p: Pt): boolean {
  if (stroke.length === 1) return Math.hypot(stroke[0].x - p.x, stroke[0].y - p.y) <= ERASE_RADIUS;
  for (let i = 1; i < stroke.length; i++) if (segDist(p, stroke[i - 1], stroke[i]) <= ERASE_RADIUS) return true;
  return false;
}

/**
 * Whole-page drawing layer for the grade-11 test. The canvas covers the entire
 * `container` (question, answers AND the notebook below), scrolls with the
 * content, and keeps a separate drawing for every `pageKey` (= question), so
 * switching questions swaps the drawing. Toolbar: cursor / pen / eraser
 * (eraser removes whole strokes it touches).
 */
export default function QuestionSketchpad({
  containerRef,
  pageKey,
  locale
}: {
  containerRef: RefObject<HTMLElement | null>;
  pageKey: string | number;
  locale: string;
}) {
  const t = L[locale] ?? L.uz;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pages = useRef(new Map<string | number, Stroke[]>());
  const current = useRef<Stroke | null>(null);
  const size = useRef({ w: 0, h: 0, dpr: 1 });
  const keyRef = useRef(pageKey);
  keyRef.current = pageKey;
  const [mode, setMode] = useState<SketchMode>('cursor');
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const strokes = useCallback((): Stroke[] => {
    let list = pages.current.get(keyRef.current);
    if (!list) {
      list = [];
      pages.current.set(keyRef.current, list);
    }
    return list;
  }, []);

  const redraw = useCallback(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const { w, h, dpr } = size.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = PEN_COLOR;
    ctx.fillStyle = PEN_COLOR;
    ctx.lineWidth = PEN_WIDTH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const list = current.current ? [...strokes(), current.current] : strokes();
    for (const s of list) {
      if (!s.length) continue; // eraser drag in progress
      if (s.length === 1) {
        ctx.beginPath();
        ctx.arc(s[0].x, s[0].y, PEN_WIDTH / 2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      // smooth with quadratic curves through segment midpoints
      ctx.beginPath();
      ctx.moveTo(s[0].x, s[0].y);
      for (let i = 1; i < s.length - 1; i++) {
        const mx = (s[i].x + s[i + 1].x) / 2;
        const my = (s[i].y + s[i + 1].y) / 2;
        ctx.quadraticCurveTo(s[i].x, s[i].y, mx, my);
      }
      const last = s[s.length - 1];
      ctx.lineTo(last.x, last.y);
      ctx.stroke();
    }
  }, [strokes]);

  // keep the canvas exactly as big as the page content
  const resize = useCallback(() => {
    const el = containerRef.current;
    const c = canvasRef.current;
    if (!el || !c) return;
    const w = el.clientWidth;
    const h = el.offsetHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const s = size.current;
    if (w !== s.w || h !== s.h || dpr !== s.dpr) {
      size.current = { w, h, dpr };
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
    }
    redraw();
  }, [containerRef, redraw]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => resize());
    ro.observe(el);
    window.addEventListener('resize', resize);
    resize();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [containerRef, resize]);

  // new question → show that question's own drawing
  useEffect(() => {
    current.current = null;
    redraw();
  }, [pageKey, redraw]);

  function pt(e: React.PointerEvent): Pt {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function erase(p: Pt) {
    const list = strokes();
    const keep = list.filter((s) => !hits(s, p));
    if (keep.length !== list.length) {
      pages.current.set(keyRef.current, keep);
      redraw();
    }
  }

  function finishStroke() {
    if (current.current) {
      strokes().push(current.current);
      current.current = null;
      redraw();
    }
  }

  const active = mode !== 'cursor';

  return (
    <>
      {/* clipped wrapper so the canvas never makes the page taller */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[55] overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`absolute left-0 top-0 ${active ? 'pointer-events-auto' : 'pointer-events-none'} ${
            mode === 'pen' ? 'cursor-crosshair' : mode === 'eraser' ? 'cursor-cell' : ''
          }`}
          style={{ touchAction: active ? 'none' : 'auto' }}
          onPointerDown={(e) => {
            if (!active || !e.isPrimary) return;
            e.preventDefault();
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            const p = pt(e);
            if (modeRef.current === 'eraser') {
              current.current = [];
              erase(p);
            } else {
              current.current = [p];
              redraw();
            }
          }}
          onPointerMove={(e) => {
            if (!active || !current.current || !e.isPrimary) return;
            const p = pt(e);
            if (modeRef.current === 'eraser') return erase(p);
            const s = current.current;
            const last = s[s.length - 1];
            if (Math.abs(last.x - p.x) + Math.abs(last.y - p.y) < 1.5) return;
            s.push(p);
            redraw();
          }}
          onPointerUp={() => {
            if (modeRef.current === 'eraser') current.current = null;
            else finishStroke();
          }}
          onPointerCancel={() => {
            if (modeRef.current === 'eraser') current.current = null;
            else finishStroke();
          }}
        />
      </div>

      {/* cursor / pen / eraser toolbar (bottom-left) */}
      <div
        className="fixed left-3 z-[60] flex items-center gap-1 rounded-full border border-ink/10 bg-white/95 p-1 shadow-card backdrop-blur"
        style={{ bottom: 'calc(var(--app-bottom) + 12px)' }}
      >
        {(['cursor', 'pen', 'eraser'] as SketchMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            aria-label={t[m]}
            title={t[m]}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
              mode === m ? 'bg-brand-blue/15 text-brand-blue ring-2 ring-brand-blue' : 'text-ink/65 hover:bg-ink/5'
            }`}
          >
            {m === 'cursor' ? <CursorIcon /> : m === 'pen' ? <PenIcon /> : <EraserIcon />}
          </button>
        ))}
      </div>
    </>
  );
}

/* Inline SVG icons (emoji glyphs render as blank boxes on some devices). */
function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden>
      <path d="M5 3l15 9-6.5 1.5L10 20 5 3z" />
    </svg>
  );
}

function EraserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 21h10" />
      <path d="M5 13l6-6 7 7-4 4H9l-4-4z" />
    </svg>
  );
}
