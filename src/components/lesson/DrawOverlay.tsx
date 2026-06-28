'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Full-page pen/cursor overlay for the quiz (FR-QZ pen tool). In pen mode a
 * transparent canvas covers the whole viewport so the child can scribble/work
 * anywhere on the page; in cursor mode the canvas ignores pointer events so the
 * quiz stays fully interactive. The floating toolbar switches between the two.
 */
export default function DrawOverlay() {
  const t = useTranslations('dashboard');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokes = useRef<Array<Array<{ x: number; y: number }>>>([]);
  const current = useRef<Array<{ x: number; y: number }> | null>(null);
  const [penMode, setPenMode] = useState(false);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#1FA7E0';
    ctx.lineWidth = 3.6;
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
    const onResize = () => redraw();
    window.addEventListener('resize', onResize);
    redraw();
    return () => window.removeEventListener('resize', onResize);
  }, [redraw]);

  function pt(e: React.PointerEvent): { x: number; y: number } {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`fixed inset-0 z-[55] ${penMode ? 'cursor-crosshair' : 'pointer-events-none'}`}
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

      {/* small icon-only pen/cursor/eraser toolbar, bottom-left */}
      <div className="fixed bottom-3 left-3 z-[60] flex items-center gap-1 rounded-full border border-ink/10 bg-white/95 p-1 shadow-card backdrop-blur">
        <button
          onClick={() => setPenMode(true)}
          aria-pressed={penMode}
          aria-label={t('pen')}
          title={t('pen')}
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${penMode ? 'bg-brand-blue/15 text-brand-blue ring-2 ring-brand-blue' : 'text-ink/65 hover:bg-ink/5'}`}
        >
          <PenIcon />
        </button>
        <button
          onClick={() => setPenMode(false)}
          aria-pressed={!penMode}
          aria-label={t('cursor')}
          title={t('cursor')}
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${!penMode ? 'bg-brand-blue/15 text-brand-blue ring-2 ring-brand-blue' : 'text-ink/65 hover:bg-ink/5'}`}
        >
          <CursorIcon />
        </button>
        <button
          onClick={() => {
            strokes.current = [];
            current.current = null;
            redraw();
          }}
          aria-label={t('clearDrawing')}
          title={t('clearDrawing')}
          className="grid h-9 w-9 place-items-center rounded-full text-ink/65 transition-colors hover:bg-ink/5"
        >
          <EraserIcon />
        </button>
      </div>
    </>
  );
}

/* Inline SVG icons (emoji glyphs render as blank boxes on some devices). */
function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M5 3l15 9-6.5 1.5L10 20 5 3z" />
    </svg>
  );
}

function EraserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 21h10" />
      <path d="M5 13l6-6 7 7-4 4H9l-4-4z" />
    </svg>
  );
}
