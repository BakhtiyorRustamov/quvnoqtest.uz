'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Caveat } from 'next/font/google';
import type { DrawOp, LabColor, LabPlan } from '@/lib/lab/plan';

const caveat = Caveat({ subsets: ['latin', 'cyrillic'], weight: ['600', '700'], variable: '--font-hand' });

/** Board engine for the /lab explainer: resolves ids to coordinates and draws
 *  ops as SVG. Ops of the step being played are "hand-drawn" one after another
 *  (stroke reveal / text fade), with a marker that moves to each op. */

const INK: Record<LabColor, string> = {
  ink: '#1f2937',
  blue: '#2563eb',
  red: '#dc2626',
  green: '#16a34a',
  orange: '#ea580c',
  purple: '#7c3aed'
};
const HAND = "var(--font-hand), 'Comic Sans MS', 'Segoe Print', 'Chalkboard SE', cursive";
export const OP_MS = 750; // time to draw one op

type Pt = { x: number; y: number };
type Geo = { pts: Record<string, Pt>; circles: Record<string, { c: Pt; r: number }> };

/** Resolve every point/circle id in the whole plan (plans are already validated). */
function resolve(plan: LabPlan): Geo {
  const geo: Geo = { pts: {}, circles: {} };
  for (const s of plan.steps)
    for (const op of s.draw) {
      if (op.t === 'point') geo.pts[op.id] = { x: op.x, y: op.y };
      else if (op.t === 'circle') {
        const c = geo.pts[op.center];
        if (c) geo.circles[op.id] = { c, r: op.r };
      } else if (op.t === 'pointOn') {
        const ci = geo.circles[op.circle];
        if (ci) {
          const a = (op.angle * Math.PI) / 180;
          geo.pts[op.id] = { x: ci.c.x + ci.r * Math.cos(a), y: ci.c.y - ci.r * Math.sin(a) };
        }
      }
    }
  return geo;
}

/** Where the marker goes for an op. */
function anchor(op: DrawOp, g: Geo): Pt | null {
  switch (op.t) {
    case 'title':
      return { x: 6, y: 8 };
    case 'point':
    case 'pointOn':
      return g.pts[op.id] ?? null;
    case 'circle': {
      const c = g.circles[op.id];
      return c ? { x: c.c.x + c.r, y: c.c.y } : null;
    }
    case 'line':
      return g.pts[op.to] ?? null;
    case 'text':
    case 'formula':
      return { x: op.x, y: op.y };
  }
}

function Op({ op, g, delay, animate }: { op: DrawOp; g: Geo; delay: number; animate: boolean }) {
  const style = animate ? ({ animationDelay: `${delay}ms`, animationDuration: `${OP_MS}ms` } as const) : undefined;
  const draw = animate ? 'lab-draw' : '';
  const fade = animate ? 'lab-fade' : '';
  switch (op.t) {
    case 'title':
      return (
        <text x={5} y={9} className={fade} style={{ ...style, fontFamily: HAND, fontWeight: 700 }} fontSize={7} fill={INK.ink}>
          {op.text}
        </text>
      );
    case 'point':
    case 'pointOn': {
      const p = g.pts[op.id];
      if (!p) return null;
      return (
        <g className={fade} style={style}>
          <circle cx={p.x} cy={p.y} r={0.9} fill={INK.ink} />
          {op.label && (
            <text x={p.x + 1.4} y={p.y - 1.4} fontSize={4.4} fill={INK.ink} style={{ fontFamily: HAND, fontWeight: 700 }}>
              {op.label}
            </text>
          )}
        </g>
      );
    }
    case 'circle': {
      const c = g.circles[op.id];
      if (!c) return null;
      // drawn as a path starting at angle 0 so the reveal looks like a pen going round
      const d = `M ${c.c.x + c.r} ${c.c.y} a ${c.r} ${c.r} 0 1 0 ${-2 * c.r} 0 a ${c.r} ${c.r} 0 1 0 ${2 * c.r} 0`;
      return <path d={d} pathLength={1} className={draw} style={style} fill="none" stroke={INK[op.color ?? 'ink']} strokeWidth={0.55} strokeLinecap="round" strokeDasharray={animate ? 1 : undefined} />;
    }
    case 'line': {
      const a = g.pts[op.from];
      const b = g.pts[op.to];
      if (!a || !b) return null;
      const col = INK[op.color ?? 'ink'];
      const busy = (x: number, y: number) => Object.values(g.pts).some((p) => Math.hypot(p.x - x, p.y - y) < 4);
      const tt = busy((a.x + b.x) / 2, (a.y + b.y) / 2) ? 0.27 : 0.5;
      const mx = a.x + (b.x - a.x) * tt;
      const my = a.y + (b.y - a.y) * tt;
      // label sits a little off the segment, on its normal
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const nx = -(b.y - a.y) / len;
      const ny = (b.x - a.x) / len;
      const s = ny > 0 ? -1 : 1; // prefer above
      return (
        <g>
          <path
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            pathLength={1}
            className={draw}
            style={style}
            stroke={col}
            strokeWidth={0.55}
            strokeLinecap="round"
            strokeDasharray={op.dashed ? '0.03 0.03' : animate ? 1 : undefined}
            markerEnd={op.arrow ? `url(#arrow-${op.color ?? 'ink'})` : undefined}
          />
          {op.label && (
            <text x={mx + nx * 2.6 * s} y={my + ny * 2.6 * s + 1.2} textAnchor="middle" fontSize={4.4} fill={col} className={fade} style={{ ...style, fontFamily: HAND, fontWeight: 700 }}>
              {op.label}
            </text>
          )}
        </g>
      );
    }
    case 'text': {
      const fs = op.size === 's' ? 3.8 : op.size === 'l' ? 6.4 : 4.8;
      return (
        <text x={op.x} y={op.y} fontSize={fs} fill={INK[op.color ?? 'ink']} className={fade} style={{ ...style, fontFamily: HAND, fontWeight: 700 }}>
          {op.text}
        </text>
      );
    }
    case 'formula':
      return <Formula op={op} className={fade} style={style} />;
  }
}

/** Formula in a yellow box sized to the rendered text. */
function Formula({ op, className, style }: { op: Extract<DrawOp, { t: 'formula' }>; className: string; style?: React.CSSProperties }) {
  const ref = useRef<SVGTextElement | null>(null);
  const [w, setW] = useState(op.text.length * 1.9 + 4);
  useLayoutEffect(() => {
    const measure = () => {
      try {
        const bw = ref.current?.getBBox().width;
        if (bw) setW(bw + 4);
      } catch {
        /* not rendered yet */
      }
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
  }, [op.text]);
  return (
    <g className={className} style={style}>
      <rect x={op.x - 2} y={op.y - 5} width={w} height={7.2} rx={1.4} fill="#fff7d6" stroke="#d6a700" strokeWidth={0.35} />
      <text ref={ref} x={op.x} y={op.y} fontSize={5.2} fill={INK.ink} style={{ fontFamily: HAND, fontWeight: 700 }}>
        {op.text}
      </text>
    </g>
  );
}

/**
 * @param step  index of the step being shown; steps before it are drawn
 *              instantly, the current one is animated. -1 = empty board.
 * @param runId changes whenever playback (re)starts so the animation replays.
 */
export default function Board({ plan, step, runId }: { plan: LabPlan | null; step: number; runId: number }) {
  const g = useMemo(() => (plan ? resolve(plan) : { pts: {}, circles: {} }), [plan]);
  const [pen, setPen] = useState<Pt | null>(null);

  const current = plan && step >= 0 ? plan.steps[step] : null;
  useEffect(() => {
    if (!current) return setPen(null);
    const timers = current.draw.map((op, i) => setTimeout(() => setPen(anchor(op, g)), i * OP_MS));
    const done = setTimeout(() => setPen(null), current.draw.length * OP_MS + 300);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [current, g, runId]);

  return (
    <div className={`${caveat.variable} relative w-full overflow-hidden rounded-2xl border-[6px] border-[#8b5e34] bg-white shadow-card`}>
      <style>{`
        .lab-draw{stroke-dashoffset:1;animation-name:labDraw;animation-fill-mode:forwards;animation-timing-function:ease-in-out}
        .lab-fade{opacity:0;animation-name:labFade;animation-fill-mode:forwards;animation-timing-function:ease-out}
        @keyframes labDraw{to{stroke-dashoffset:0}}
        @keyframes labFade{from{opacity:0;transform:translateY(0.6px)}to{opacity:1;transform:none}}
      `}</style>
      <svg viewBox="0 0 100 70" className="block w-full" role="img" aria-label={plan?.title ?? 'board'}>
        <defs>
          <pattern id="lab-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#e5edf7" strokeWidth="0.25" />
          </pattern>
          {(Object.keys(INK) as LabColor[]).map((c) => (
            <marker key={c} id={`arrow-${c}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={INK[c]} />
            </marker>
          ))}
        </defs>
        <rect width="100" height="70" fill="url(#lab-grid)" />
        {plan &&
          plan.steps.slice(0, step + 1).map((s, si) =>
            s.draw.map((op, oi) => (
              <Op key={`${si}-${oi}-${si === step ? runId : 'done'}`} op={op} g={g} delay={oi * OP_MS} animate={si === step} />
            ))
          )}
        {pen && (
          <g style={{ transform: `translate(${pen.x}px, ${pen.y}px)`, transition: `transform ${OP_MS * 0.5}ms ease-in-out` }}>
            {/* marker pen, tip at (0,0) */}
            <g transform="rotate(-35)">
              <rect x={-1.1} y={-12} width={2.2} height={9} rx={0.8} fill="#2563eb" />
              <rect x={-1.1} y={-13.6} width={2.2} height={2} rx={0.6} fill="#1e3a8a" />
              <path d="M -1.1 -3 L 1.1 -3 L 0 0 Z" fill="#1f2937" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
