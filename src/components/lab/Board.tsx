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
type Rect = { x: number; y: number; w: number; h: number };
type Ax = Rect & { xmin: number; xmax: number; ymin: number; ymax: number };
type Geo = { pts: Record<string, Pt>; circles: Record<string, { c: Pt; r: number }>; boxes: Record<string, Rect>; axes: Record<string, Ax> };
const EMPTY: Geo = { pts: {}, circles: {}, boxes: {}, axes: {} };

/** Axis units -> board units. */
const map = (a: Ax, x: number, y: number): Pt => ({
  x: a.x + ((x - a.xmin) / (a.xmax - a.xmin)) * a.w,
  y: a.y + a.h - ((y - a.ymin) / (a.ymax - a.ymin)) * a.h
});

/** Resolve every id in the whole plan (plans are already validated). */
function resolve(plan: LabPlan): Geo {
  const geo: Geo = { pts: {}, circles: {}, boxes: {}, axes: {} };
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
      } else if (op.t === 'box') geo.boxes[op.id] = { x: op.x, y: op.y, w: op.w, h: op.h };
      else if (op.t === 'axes') geo.axes[op.id] = op;
      else if (op.t === 'dot' && op.id && geo.axes[op.axes]) geo.pts[op.id] = map(geo.axes[op.axes], op.x, op.y);
    }
  return geo;
}

/** Centre of a box or point id, and how far an arrow must stop short of it along (dx,dy). */
function endOf(id: string, g: Geo, dx: number, dy: number): Pt | null {
  const b = g.boxes[id];
  if (b) {
    const c = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
    const t = Math.min(dx ? b.w / 2 / Math.abs(dx) : Infinity, dy ? b.h / 2 / Math.abs(dy) : Infinity);
    return { x: c.x + dx * (t + 1), y: c.y + dy * (t + 1) };
  }
  const p = g.pts[id];
  return p ? { x: p.x + dx * 1.6, y: p.y + dy * 1.6 } : null;
}
function centre(id: string, g: Geo): Pt | null {
  const b = g.boxes[id];
  return b ? { x: b.x + b.w / 2, y: b.y + b.h / 2 } : (g.pts[id] ?? null);
}
function arrowEnds(from: string, to: string, g: Geo): [Pt, Pt] | null {
  const a = centre(from, g);
  const b = centre(to, g);
  if (!a || !b) return null;
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const dx = (b.x - a.x) / len;
  const dy = (b.y - a.y) / len;
  const p = endOf(from, g, dx, dy);
  const q = endOf(to, g, -dx, -dy);
  return p && q ? [p, q] : null;
}

/** Greedy word wrap by an approximate character budget. */
function wrap(text: string, perLine: number): string[] {
  const lines: string[] = [];
  let cur = '';
  for (const w of text.split(/\s+/)) {
    if (cur && (cur + ' ' + w).length > perLine) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? `${cur} ${w}` : w;
  }
  if (cur) lines.push(cur);
  return lines;
}

/** 1, 2 or 5 × 10^k tick step giving about 6–10 ticks. */
function niceStep(range: number): number {
  const raw = range / 8;
  const p = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 5, 10].map((m) => m * p).find((s) => range / s <= 10) ?? p * 10;
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
    case 'polygon':
      return g.pts[op.points[op.points.length - 1]] ?? null;
    case 'arrow':
      return arrowEnds(op.from, op.to, g)?.[1] ?? null;
    case 'box':
      return { x: op.x + op.w, y: op.y + op.h / 2 };
    case 'bars':
    case 'axes':
      return { x: op.x + op.w, y: op.y + op.h };
    case 'curve': {
      const a = g.axes[op.axes];
      const last = op.points[op.points.length - 1];
      return a ? map(a, last[0], last[1]) : null;
    }
    case 'dot': {
      const a = g.axes[op.axes];
      return a ? map(a, op.x, op.y) : null;
    }
    case 'text':
    case 'formula':
    case 'list':
    case 'table':
    case 'icon':
      return { x: op.x, y: op.y };
  }
}

const T = { fontFamily: HAND, fontWeight: 700 } as const;
const TINT: Record<LabColor, string> = {
  ink: '#f3f4f6',
  blue: '#e8f0ff',
  red: '#fdecec',
  green: '#e7f7ec',
  orange: '#fff1e6',
  purple: '#f2ecff'
};

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

    case 'polygon': {
      const pts = op.points.map((id) => g.pts[id]).filter(Boolean);
      if (pts.length < 3) return null;
      const d = `M ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')} Z`;
      const col = op.color ?? 'ink';
      return (
        <g>
          {op.fill && <path d={d} fill={INK[col]} fillOpacity={0.12} className={fade} style={style && { ...style, animationDelay: `${delay + OP_MS * 0.6}ms` }} />}
          <path d={d} pathLength={1} className={draw} style={style} fill="none" stroke={INK[col]} strokeWidth={0.55} strokeLinejoin="round" strokeDasharray={animate ? 1 : undefined} />
        </g>
      );
    }
    case 'box': {
      const col = op.color ?? 'blue';
      let fs = 3.8;
      let lines = wrap(op.text, Math.max(4, Math.floor((op.w - 2) / (fs * 0.42))));
      if (lines.length * fs * 1.15 > op.h - 1) {
        fs = 3.1;
        lines = wrap(op.text, Math.max(4, Math.floor((op.w - 2) / (fs * 0.42))));
      }
      const lh = fs * 1.15;
      const top = op.y + op.h / 2 - ((lines.length - 1) * lh) / 2 + fs * 0.35;
      return (
        <g>
          <rect x={op.x} y={op.y} width={op.w} height={op.h} rx={1.8} fill={TINT[col]} className={fade} style={style} />
          <rect x={op.x} y={op.y} width={op.w} height={op.h} rx={1.8} pathLength={1} fill="none" stroke={INK[col]} strokeWidth={0.5} className={draw} style={style} strokeDasharray={animate ? 1 : undefined} />
          <text textAnchor="middle" fontSize={fs} fill={INK.ink} className={fade} style={{ ...style, ...T, ...(style && { animationDelay: `${delay + OP_MS * 0.4}ms` }) }}>
            {lines.map((l, i) => (
              <tspan key={i} x={op.x + op.w / 2} y={top + i * lh}>
                {l}
              </tspan>
            ))}
          </text>
        </g>
      );
    }
    case 'arrow': {
      const ends = arrowEnds(op.from, op.to, g);
      if (!ends) return null;
      const [a, b] = ends;
      const col = op.color ?? 'ink';
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const nx = -(b.y - a.y) / len;
      const ny = (b.x - a.x) / len;
      const s = ny > 0 ? -1 : 1;
      return (
        <g>
          <path d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} pathLength={1} className={draw} style={style} stroke={INK[col]} strokeWidth={0.55} strokeLinecap="round" strokeDasharray={animate ? 1 : undefined} markerEnd={`url(#arrow-${col})`} />
          {op.label && (
            <text x={(a.x + b.x) / 2 + nx * 2.4 * s} y={(a.y + b.y) / 2 + ny * 2.4 * s + 1} textAnchor="middle" fontSize={3.4} fill={INK[col]} className={fade} style={{ ...style, ...T }}>
              {op.label}
            </text>
          )}
        </g>
      );
    }
    case 'list':
      return (
        <g>
          {op.items.map((it, i) => (
            <text key={i} x={op.x} y={op.y + i * 7} fontSize={4.4} fill={INK[op.color ?? 'ink']} className={fade} style={{ ...style, ...T, ...(style && { animationDelay: `${delay + (i * OP_MS) / op.items.length}ms` }) }}>
              • {it}
            </text>
          ))}
        </g>
      );
    case 'table': {
      const fs = 3.6;
      const cols = Math.max(...op.rows.map((r) => r.length));
      const cw = Array.from({ length: cols }, (_, c) => Math.max(...op.rows.map((r) => (r[c] ?? '').length)) * fs * 0.45 + 3);
      const rh = 5.6;
      const W = cw.reduce((a, b) => a + b, 0);
      const H = rh * op.rows.length;
      const xs = cw.map((_, c) => op.x + cw.slice(0, c).reduce((a, b) => a + b, 0));
      return (
        <g className={fade} style={style}>
          <rect x={op.x} y={op.y} width={W} height={rh} fill="#eef4ff" />
          <rect x={op.x} y={op.y} width={W} height={H} fill="none" stroke={INK.ink} strokeWidth={0.35} />
          {op.rows.slice(1).map((_, r) => (
            <line key={`r${r}`} x1={op.x} x2={op.x + W} y1={op.y + rh * (r + 1)} y2={op.y + rh * (r + 1)} stroke={INK.ink} strokeWidth={0.25} />
          ))}
          {xs.slice(1).map((x, c) => (
            <line key={`c${c}`} x1={x} x2={x} y1={op.y} y2={op.y + H} stroke={INK.ink} strokeWidth={0.25} />
          ))}
          {op.rows.map((row, r) =>
            row.map((cell, c) => (
              <text key={`${r}-${c}`} x={xs[c] + cw[c] / 2} y={op.y + rh * r + rh * 0.68} textAnchor="middle" fontSize={fs} fill={r === 0 ? INK.blue : INK.ink} style={T}>
                {cell}
              </text>
            ))
          )}
        </g>
      );
    }
    case 'bars': {
      const n = op.items.length;
      const max = Math.max(...op.items.map((i) => i.value), 0) || 1;
      const area = op.h - 5; // room for labels under the baseline
      const base = op.y + area;
      const slot = op.w / n;
      const bw = slot * 0.62;
      const col = INK[op.color ?? 'blue'];
      return (
        <g>
          <line x1={op.x} x2={op.x + op.w} y1={base} y2={base} stroke={INK.ink} strokeWidth={0.4} className={fade} style={style} />
          {op.items.map((it, i) => {
            const bh = (Math.max(0, it.value) / max) * (area - 4);
            const x = op.x + slot * i + (slot - bw) / 2;
            const d = style && { ...style, animationDelay: `${delay + (i * OP_MS) / n}ms` };
            return (
              <g key={i}>
                <rect x={x} y={base - bh} width={bw} height={bh} rx={0.6} fill={col} fillOpacity={0.85} className={animate ? 'lab-grow' : ''} style={d} />
                <text x={x + bw / 2} y={base - bh - 1} textAnchor="middle" fontSize={3} fill={INK.ink} className={fade} style={{ ...d, ...T }}>
                  {Number(it.value.toFixed(2))}
                </text>
                <text x={x + bw / 2} y={base + 3.8} textAnchor="middle" fontSize={3} fill={INK.ink} className={fade} style={{ ...d, ...T }}>
                  {it.label}
                </text>
              </g>
            );
          })}
        </g>
      );
    }
    case 'icon': {
      const fs = op.size === 's' ? 6 : op.size === 'l' ? 13 : 9;
      return (
        <text x={op.x} y={op.y} fontSize={fs} textAnchor="middle" dominantBaseline="central" className={fade} style={style}>
          {op.emoji}
        </text>
      );
    }
    case 'axes': {
      const a = op;
      const step = niceStep(a.xmax - a.xmin);
      const stepY = niceStep(a.ymax - a.ymin);
      const o = map(a, Math.min(Math.max(0, a.xmin), a.xmax), Math.min(Math.max(0, a.ymin), a.ymax));
      const xt: number[] = [];
      for (let v = Math.ceil(a.xmin / step) * step; v <= a.xmax + 1e-9; v += step) xt.push(+v.toFixed(6));
      const yt: number[] = [];
      for (let v = Math.ceil(a.ymin / stepY) * stepY; v <= a.ymax + 1e-9; v += stepY) yt.push(+v.toFixed(6));
      return (
        <g className={fade} style={style}>
          <defs>
            <clipPath id={`clip-${a.id}`}>
              <rect x={a.x} y={a.y} width={a.w} height={a.h} />
            </clipPath>
          </defs>
          {xt.map((v) => {
            const p = map(a, v, 0);
            return <line key={`gx${v}`} x1={p.x} x2={p.x} y1={a.y} y2={a.y + a.h} stroke="#dbe4f0" strokeWidth={0.2} />;
          })}
          {yt.map((v) => {
            const p = map(a, 0, v);
            return <line key={`gy${v}`} x1={a.x} x2={a.x + a.w} y1={p.y} y2={p.y} stroke="#dbe4f0" strokeWidth={0.2} />;
          })}
          <line x1={a.x} x2={a.x + a.w + 1.5} y1={o.y} y2={o.y} stroke={INK.ink} strokeWidth={0.4} markerEnd="url(#arrow-ink)" />
          <line x1={o.x} x2={o.x} y1={a.y + a.h} y2={a.y - 1.5} stroke={INK.ink} strokeWidth={0.4} markerEnd="url(#arrow-ink)" />
          {xt.map((v) =>
            v === 0 ? null : (
              <text key={`tx${v}`} x={map(a, v, 0).x} y={o.y + 3.2} textAnchor="middle" fontSize={2.4} fill="#6b7280">
                {v}
              </text>
            )
          )}
          {yt.map((v) =>
            v === 0 ? null : (
              <text key={`ty${v}`} x={o.x - 1} y={map(a, 0, v).y + 0.8} textAnchor="end" fontSize={2.4} fill="#6b7280">
                {v}
              </text>
            )
          )}
          {a.xlabel && (
            <text x={a.x + a.w + 1} y={o.y - 1.5} textAnchor="end" fontSize={3.6} fill={INK.ink} style={T}>
              {a.xlabel}
            </text>
          )}
          {a.ylabel && (
            <text x={o.x + 1.5} y={a.y + 1} fontSize={3.6} fill={INK.ink} style={T}>
              {a.ylabel}
            </text>
          )}
        </g>
      );
    }
    case 'curve': {
      const a = g.axes[op.axes];
      if (!a) return null;
      // Catmull-Rom spline through the points, so a few points still give a smooth curve
      const P = op.points.map(([x, y]) => map(a, x, y));
      const f = (n: number) => n.toFixed(2);
      const d = [`M ${f(P[0].x)} ${f(P[0].y)}`];
      for (let i = 0; i < P.length - 1; i++) {
        const p0 = P[i - 1] ?? P[i];
        const p1 = P[i];
        const p2 = P[i + 1];
        const p3 = P[i + 2] ?? p2;
        d.push(`C ${f(p1.x + (p2.x - p0.x) / 6)} ${f(p1.y + (p2.y - p0.y) / 6)} ${f(p2.x - (p3.x - p1.x) / 6)} ${f(p2.y - (p3.y - p1.y) / 6)} ${f(p2.x)} ${f(p2.y)}`);
      }
      return (
        <g clipPath={`url(#clip-${op.axes})`}>
          <path d={d.join(' ')} pathLength={1} className={draw} style={style} fill="none" stroke={INK[op.color ?? 'red']} strokeWidth={0.6} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={animate ? 1 : undefined} />
        </g>
      );
    }
    case 'dot': {
      const a = g.axes[op.axes];
      if (!a) return null;
      const p = map(a, op.x, op.y);
      return (
        <g className={fade} style={style}>
          <circle cx={p.x} cy={p.y} r={0.9} fill={INK.red} />
          {op.label && (
            <text x={p.x + 1.4} y={p.y - 1.4} fontSize={3.6} fill={INK.ink} style={T}>
              {op.label}
            </text>
          )}
        </g>
      );
    }
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
  const g = useMemo(() => (plan ? resolve(plan) : EMPTY), [plan]);
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
        .lab-grow{transform:scaleY(0);transform-box:fill-box;transform-origin:bottom;animation-name:labGrow;animation-fill-mode:forwards;animation-timing-function:ease-out}
        @keyframes labGrow{to{transform:scaleY(1)}}
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
