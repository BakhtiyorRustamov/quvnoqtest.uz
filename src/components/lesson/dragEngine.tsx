'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Tiny pointer-based drag engine — works identically with touch and mouse
 * (FR-QZ-11). Draggables bind `bind(id)`; drop targets carry `data-zone`.
 */
export type DragInfo = { id: string; x: number; y: number; w: number; h: number };

export function zoneAt(x: number, y: number): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    const z = (el as HTMLElement).dataset?.zone;
    if (z) return z;
  }
  return null;
}

export function useDrag(onDrop: (id: string, zone: string | null) => void) {
  const [drag, setDrag] = useState<DragInfo | null>(null);
  const [hot, setHot] = useState<string | null>(null);
  const ref = useRef<DragInfo | null>(null);

  const move = useCallback((e: React.PointerEvent) => {
    if (!ref.current) return;
    const info = { ...ref.current, x: e.clientX, y: e.clientY };
    ref.current = info;
    setDrag(info);
    setHot(zoneAt(e.clientX, e.clientY));
  }, []);

  const end = useCallback(
    (e: React.PointerEvent) => {
      if (!ref.current) return;
      const { id } = ref.current;
      const zone = zoneAt(e.clientX, e.clientY);
      ref.current = null;
      setDrag(null);
      setHot(null);
      onDrop(id, zone);
    },
    [onDrop]
  );

  const bind = useCallback(
    (id: string) => ({
      onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
        e.preventDefault();
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const info = { id, x: e.clientX, y: e.clientY, w: r.width, h: r.height };
        ref.current = info;
        setDrag(info);
      },
      onPointerMove: move,
      onPointerUp: end,
      onPointerCancel: end
    }),
    [move, end]
  );

  return { drag, hot, bind };
}

/** Floating clone that follows the finger/cursor while dragging. */
export function DragGhost({ drag, children }: { drag: DragInfo | null; children: React.ReactNode }) {
  if (!drag) return null;
  return (
    <div
      className="fixed z-[80] pointer-events-none drop-shadow-xl"
      style={{ left: drag.x, top: drag.y, transform: 'translate(-50%, -65%) scale(1.15)' }}
      aria-hidden
    >
      {children}
    </div>
  );
}

/** Bouncing finger cue (visual hint for tap/drag items, FR-QZ-5). */
export function FingerCue({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`pointer-events-none select-none text-3xl animate-bounce inline-block ${className}`}>
      👆
    </span>
  );
}
