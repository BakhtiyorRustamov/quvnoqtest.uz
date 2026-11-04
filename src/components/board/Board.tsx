'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Caveat } from 'next/font/google';
import type { DrawOp, LabColor } from '@/lib/lab/plan';

const caveat = Caveat({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-hand'
});

/**
 * Board engine (v2). Resolves ids to coordinates and draws ops as SVG; the ops
 * of the current step are "hand-drawn" one after another with a marker pen.
 *
 *  - scenes: a step with `clear` starts a fresh board; earlier scenes vanish
 *  - text-like items (text, formula, card, list, table) are nudged so they
 *    never sit on top of each other
 *  - camera: on narrow screens the view follows what is being drawn, zooms out
 *    for the overview at the end, and the student can pinch / drag / use the
 *    +/− buttons; any manual zoom pauses the camera until the next step
 */

export const INK: Record<LabColor, string> = {
  ink: '#1f2937',
  blue: '#2563eb',
  red: '#dc2626',
  green: '#16a34a',
  orange: '#ea580c',
  purple: '#7c3aed'
};
const TINT: Record<LabColor, string> = {
  ink: '#f1f3f6',
  blue: '#e6efff',
  red: '#fdeaea',
  green: '#e3f6ea',
  orange: '#fff0e3',
  purple: '#f0eaff'
};
const HAND = "var(--font-hand), 'Comic Sans MS', 'Segoe Print', 'Chalkboard SE', cursive";
const T = { fontFamily: HAND, fontWeight: 700 } as const;
export const OP_MS = 750; // default time to draw one op

/** Draw time per op: dots and labels are quick, curves take longer. */
export function opMs(op: DrawOp): number {
  switch (op.t) {
    case 'point':
    case 'pointOn':
    case 'dot':
    case 'icon':
      return 380;
    case 'title':
    case 'text':
      return 600;
    case 'curve':
    case 'bars':
      return 1000;
    default:
      return 700;
  }
}
/** Start offset of every op in a step, and the step's total draw time. */
export function timeline(ops: DrawOp[]) {
  const at: number[] = [];
  let t = 0;
  for (const op of ops) {
    at.push(t);
    t += opMs(op);
  }
  return { at, total: t };
}
export const stepMs = (ops: DrawOp[]) => timeline(ops).total;
const W = 100;
const H = 70;

export type BoardStep = { draw: DrawOp[]; clear?: boolean };
export type BoardScript = { title?: string; steps: BoardStep[] };

type Pt = { x: number; y: number };
type Rect = { x: number; y: number; w: number; h: number };
type Ax = Rect & { xmin: number; xmax: number; ymin: number; ymax: number };
type Geo = {
  pts: Record<string, Pt>;
  circles: Record<string, { c: Pt; r: number }>;
  boxes: Record<string, Rect>;
  axes: Record<string, Ax>;
};

/** Axis units -> board units. */
const map = (a: Ax, x: number, y: number): Pt => ({
  x: a.x + ((x - a.xmin) / (a.xmax - a.xmin)) * a.w,
  y: a.y + a.h - ((y - a.ymin) / (a.ymax - a.ymin)) * a.h
});

/* ------------------------------ text metrics ------------------------------ */

const CHAR = 0.43; // average Caveat glyph width, in font-size units
const textSize = (s?: string) => (s === 's' ? 3.8 : s === 'l' ? 6.4 : 4.8);

function tableDims(rows: string[][]) {
  const fs = 3.6;
  const cols = Math.max(...rows.map((r) => r.length));
  const cw = Array.from({ length: cols }, (_, c) => Math.max(...rows.map((r) => (r[c] ?? '').length)) * fs * 0.45 + 3);
  return {
    fs,
    cw,
    rh: 5.6,
    w: cw.reduce((a, b) => a + b, 0),
    h: 5.6 * rows.length
  };
}

/** Approximate box of a text-like op (used for overlap nudging and the camera). */
function textBox(op: DrawOp): Rect | null {
  switch (op.t) {
    case 'title':
      return { x: 4.5, y: 3, w: op.text.length * 7 * CHAR, h: 8 };
    case 'text': {
      const fs = textSize(op.size);
      const w = op.text.length * fs * CHAR;
      return {
        x: op.anchor === 'middle' ? op.x - w / 2 : op.x,
        y: op.y - fs * 0.85,
        w,
        h: fs * 1.1
      };
    }
    case 'formula':
      return {
        x: op.x - 2,
        y: op.y - 5,
        w: op.text.length * 5.2 * CHAR + 4,
        h: 7.2
      };
    case 'box':
      return { x: op.x, y: op.y, w: op.w, h: op.h };
    case 'list':
      return {
        x: op.x,
        y: op.y - 4.2,
        w: Math.max(...op.items.map((i) => i.length + 2)) * 4.4 * CHAR,
        h: op.items.length * 7
      };
    case 'table': {
      const d = tableDims(op.rows);
      return { x: op.x, y: op.y, w: d.w, h: d.h };
    }
    default:
      return null;
  }
}

const overlaps = (a: Rect, b: Rect, pad = 0.8) => a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad;

function shiftY(op: DrawOp, dy: number): DrawOp {
  if (!dy || op.t === 'title') return op;
  if ('y' in op && typeof op.y === 'number' && op.t !== 'dot') return { ...op, y: op.y + dy } as DrawOp;
  return op;
}

/** First step of the scene that `step` belongs to. */
const sceneStart = (steps: BoardStep[], step: number) => {
  for (let i = step; i > 0; i--) if (steps[i]?.clear) return i;
  return 0;
};

/**
 * Lay out the visible scene: resolve ids, and nudge text-like items down (or
 * up, near the bottom edge) until they no longer overlap earlier ones.
 */
function layout(steps: BoardStep[], from: number, to: number) {
  const geo: Geo = { pts: {}, circles: {}, boxes: {}, axes: {} };
  const placed: Rect[] = [];
  const out: DrawOp[][] = [];
  for (let si = from; si <= to; si++) {
    const ops: DrawOp[] = [];
    for (const raw of steps[si]?.draw ?? []) {
      let op = raw;
      const box0 = textBox(op);
      if (box0) {
        let dy = 0;
        for (let k = 0; k < 8; k++) {
          const b = { ...box0, y: box0.y + dy };
          const hit = placed.find((p) => overlaps(b, p));
          if (!hit) break;
          const down = hit.y + hit.h + 1 - box0.y;
          dy = box0.y + down + box0.h <= H - 1 ? down : hit.y - 1 - box0.h - box0.y;
        }
        op = shiftY(op, dy);
        placed.push({ ...box0, y: box0.y + dy });
      }
      if (op.t === 'point') geo.pts[op.id] = { x: op.x, y: op.y };
      else if (op.t === 'circle') {
        const c = geo.pts[op.center];
        if (c) geo.circles[op.id] = { c, r: op.r };
      } else if (op.t === 'pointOn') {
        const ci = geo.circles[op.circle];
        if (ci) {
          const a = (op.angle * Math.PI) / 180;
          geo.pts[op.id] = {
            x: ci.c.x + ci.r * Math.cos(a),
            y: ci.c.y - ci.r * Math.sin(a)
          };
        }
      } else if (op.t === 'box') geo.boxes[op.id] = { x: op.x, y: op.y, w: op.w, h: op.h };
      else if (op.t === 'axes') geo.axes[op.id] = op;
      else if (op.t === 'dot' && op.id && geo.axes[op.axes]) geo.pts[op.id] = map(geo.axes[op.axes], op.x, op.y);
      ops.push(op);
    }
    out.push(ops);
  }
  return { geo, ops: out };
}

/** Area an op covers (for the camera). */
function areaOf(op: DrawOp, g: Geo): Rect | null {
  const t = textBox(op);
  if (t) return t;
  const around = (p: Pt | undefined, r = 4) => (p ? { x: p.x - r, y: p.y - r, w: 2 * r, h: 2 * r } : null);
  switch (op.t) {
    case 'point':
    case 'pointOn':
      return around(g.pts[op.id]);
    case 'circle': {
      const c = g.circles[op.id];
      return c
        ? {
            x: c.c.x - c.r - 2,
            y: c.c.y - c.r - 2,
            w: 2 * c.r + 4,
            h: 2 * c.r + 4
          }
        : null;
    }
    case 'ellipse':
      return {
        x: op.cx - op.rx - 2,
        y: op.cy - op.ry - 2,
        w: 2 * op.rx + 4,
        h: 2 * op.ry + 4
      };
    case 'line':
    case 'arrow': {
      const a =
        g.pts[op.from] ??
        (g.boxes[op.from] && {
          x: g.boxes[op.from].x + g.boxes[op.from].w / 2,
          y: g.boxes[op.from].y + g.boxes[op.from].h / 2
        });
      const b =
        g.pts[op.to] ??
        (g.boxes[op.to] && {
          x: g.boxes[op.to].x + g.boxes[op.to].w / 2,
          y: g.boxes[op.to].y + g.boxes[op.to].h / 2
        });
      if (!a || !b) return null;
      return {
        x: Math.min(a.x, b.x) - 3,
        y: Math.min(a.y, b.y) - 3,
        w: Math.abs(a.x - b.x) + 6,
        h: Math.abs(a.y - b.y) + 6
      };
    }
    case 'polygon': {
      const ps = op.points.map((id) => g.pts[id]).filter(Boolean);
      if (!ps.length) return null;
      const xs = ps.map((p) => p.x);
      const ys = ps.map((p) => p.y);
      return {
        x: Math.min(...xs) - 4,
        y: Math.min(...ys) - 4,
        w: Math.max(...xs) - Math.min(...xs) + 8,
        h: Math.max(...ys) - Math.min(...ys) + 8
      };
    }
    case 'axes':
      return { x: op.x - 4, y: op.y - 4, w: op.w + 8, h: op.h + 8 };
    case 'curve':
    case 'dot': {
      const a = g.axes[op.axes];
      return a ? { x: a.x - 3, y: a.y - 3, w: a.w + 6, h: a.h + 6 } : null;
    }
    case 'bars':
      return { x: op.x - 2, y: op.y - 3, w: op.w + 4, h: op.h + 4 };
    case 'icon': {
      const s = op.size === 's' ? 4 : op.size === 'l' ? 8 : 6;
      return { x: op.x - s, y: op.y - s, w: 2 * s, h: 2 * s };
    }
    default:
      return null;
  }
}

/** Camera rectangle (board aspect) around some areas, never closer than ~2.2× zoom. */
function frame(areas: Rect[]): Rect {
  if (!areas.length) return { x: 0, y: 0, w: W, h: H };
  const x0 = Math.min(...areas.map((a) => a.x)) - 3;
  const y0 = Math.min(...areas.map((a) => a.y)) - 3;
  const x1 = Math.max(...areas.map((a) => a.x + a.w)) + 3;
  const y1 = Math.max(...areas.map((a) => a.y + a.h)) + 3;
  let w = Math.max(x1 - x0, ((y1 - y0) * W) / H, 46);
  w = Math.min(w, W);
  const h = (w * H) / W;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return {
    x: Math.min(Math.max(cx - w / 2, 0), W - w),
    y: Math.min(Math.max(cy - h / 2, 0), H - h),
    w,
    h
  };
}

/* --------------------------------- helpers -------------------------------- */

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

function niceStep(range: number): number {
  const p = 10 ** Math.floor(Math.log10(range / 6));
  return [1, 2, 5, 10].map((m) => m * p).find((s) => range / s <= 7) ?? p * 10;
}

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
    case 'ellipse':
      return { x: op.cx + op.rx, y: op.cy };
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
    case 'text': {
      const b = textBox(op);
      return b ? { x: b.x + b.w, y: op.y } : null;
    }
    case 'formula':
    case 'list':
    case 'table':
    case 'icon':
      return { x: op.x, y: op.y };
  }
}

/* ------------------------------ superscripts ------------------------------ */

const SUP_MAP: Record<string, string> = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
  '⁺': '+',
  '⁻': '−',
  '⁼': '=',
  '⁽': '(',
  '⁾': ')',
  ⁿ: 'n',
  ᵖ: 'p',
  ⁱ: 'i',
  ˣ: 'x',
  ᵏ: 'k',
  ᵗ: 't',
  ᵐ: 'm',
  ᵃ: 'a',
  ᵇ: 'b',
  ᶜ: 'c',
  ᵉ: 'e',
  ʸ: 'y'
};
const SUB_MAP: Record<string, string> = {
  '₀': '0',
  '₁': '1',
  '₂': '2',
  '₃': '3',
  '₄': '4',
  '₅': '5',
  '₆': '6',
  '₇': '7',
  '₈': '8',
  '₉': '9',
  '₊': '+',
  '₋': '−',
  ₐ: 'a',
  ₖ: 'k',
  ₙ: 'n',
  ₓ: 'x',
  ₑ: 'e',
  ₘ: 'm',
  ₚ: 'p',
  ₜ: 't',
  ₗ: 'l',
  ₛ: 's',
  ₕ: 'h',
  ᵢ: 'i'
};
const SUP_CHARS = Object.keys(SUP_MAP).join('');
const SUB_CHARS = Object.keys(SUB_MAP).join('');
const SUP_RE = new RegExp(`\\^\\{([^}]*)\\}|([${SUP_CHARS}]+)|([${SUB_CHARS}]+)|(.)\u0304`, 'g');
const RICH_TEST = new RegExp(`[\\^${SUP_CHARS}${SUB_CHARS}\u0304]`);

/**
 * Board text with exponents and indices drawn as real raised / lowered,
 * smaller characters in the board font (the handwriting font has no ⁴ ⁵ ⁿ ⁻
 * or ₀ glyphs). Understands Unicode superscripts (x⁴, xⁿ⁻¹), subscripts (x₀)
 * and ^{…} for anything else (x^{1/2}).
 */
function rich(text: string, fs: number): React.ReactNode {
  // Caveat draws the Uzbek ʻ on top of O / G (Oʻ looked like O): use a real opening quote after a thin space
  text = text.replace(/([OoGg])[ʻ‘'`]/g, '$1\u2009‘');
  // precomposed Ā / ā / ē … → letter + combining macron, drawn as a bar below
  if (/[\u0100-\u0113\u012a\u012b\u014c\u014d\u016a\u016b\u0232\u0233]/.test(text)) text = text.normalize('NFD');
  if (!RICH_TEST.test(text)) return text;
  const up = fs * 0.36;
  const down = fs * 0.22;
  const small = +(fs * 0.7).toFixed(3);
  const out: React.ReactNode[] = [];
  let last = 0;
  let shift = 0; // current baseline offset (negative = raised)
  let k = 0;
  const move = (to: number) => {
    const dy = to - shift;
    shift = to;
    return dy ? +dy.toFixed(3) : undefined;
  };
  for (const m of text.matchAll(SUP_RE)) {
    const before = text.slice(last, m.index);
    if (before)
      out.push(
        <tspan key={k++} dy={move(0)}>
          {before}
        </tspan>
      );
    if (m[4]) {
      // x̄ — the handwriting font cannot place a combining macron: draw the letter, then a bar over it
      out.push(
        <tspan key={k++} dy={move(0)}>
          {m[4]}
        </tspan>
      );
      out.push(
        <tspan key={k++} dx={+(-fs * 0.44).toFixed(3)} dy={move(-fs * (/[A-ZĀ-ſ]/.test(m[4]) ? 0.24 : 0.06))}>
          ¯
        </tspan>
      );
      out.push(
        <tspan key={k++} dx={+(fs * 0.1).toFixed(3)} dy={move(0)}>
          {'\u200b'}
        </tspan>
      );
    } else if (m[3])
      out.push(
        <tspan key={k++} dy={move(down)} fontSize={small}>
          {[...m[3]].map((c) => SUB_MAP[c]).join('')}
        </tspan>
      );
    else {
      const sup = m[1] ?? [...m[2]].map((c) => SUP_MAP[c] ?? c).join('');
      out.push(
        <tspan key={k++} dy={move(-up)} fontSize={small}>
          {sup}
        </tspan>
      );
    }
    last = (m.index ?? 0) + m[0].length;
  }
  const rest = text.slice(last);
  if (rest)
    out.push(
      <tspan key={k++} dy={move(0)}>
        {rest}
      </tspan>
    );
  return out;
}

/* ---------------------------------- ops ----------------------------------- */

function Op({ op, g, delay, animate, ns = '' }: { op: DrawOp; g: Geo; delay: number; animate: boolean; ns?: string }) {
  const dur = opMs(op);
  const style = animate ? ({ animationDelay: `${delay}ms`, animationDuration: `${dur}ms` } as const) : undefined;
  const later = (f: number) => (style ? { ...style, animationDelay: `${delay + dur * f}ms` } : undefined);
  const draw = animate ? 'lab-draw' : '';
  const fade = animate ? 'lab-fade' : '';
  switch (op.t) {
    case 'title':
      return (
        <text x={5} y={9} className={fade} style={{ ...style, ...T }} fontSize={7} fill={INK.ink}>
          {rich(op.text, 7)}
        </text>
      );
    case 'point':
    case 'pointOn': {
      const p = g.pts[op.id];
      if (!p) return null;
      return (
        <g className={fade} style={style}>
          {!(op.t === 'point' && op.hide) && <circle cx={p.x} cy={p.y} r={0.9} fill={INK.ink} />}
          {op.label && (
            <text x={p.x + 1.4} y={p.y - 1.4} fontSize={4.4} fill={INK.ink} style={T}>
              {rich(op.label, 4.4)}
            </text>
          )}
        </g>
      );
    }
    case 'circle': {
      const c = g.circles[op.id];
      if (!c) return null;
      const d = `M ${c.c.x + c.r} ${c.c.y} a ${c.r} ${c.r} 0 1 0 ${-2 * c.r} 0 a ${c.r} ${c.r} 0 1 0 ${2 * c.r} 0`;
      return (
        <path
          d={d}
          pathLength={1}
          className={draw}
          style={style}
          fill="none"
          stroke={INK[op.color ?? 'ink']}
          strokeWidth={0.55}
          strokeLinecap="round"
          strokeDasharray={animate ? 1 : undefined}
        />
      );
    }
    case 'ellipse': {
      const { cx, cy, rx, ry } = op;
      const col = INK[op.color ?? 'ink'];
      // front = lower half (solid); back = upper half (dashed when hidden)
      const front = `M ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`;
      const back = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`;
      return (
        <g>
          <path
            d={front}
            pathLength={1}
            className={draw}
            style={style}
            fill="none"
            stroke={col}
            strokeWidth={0.55}
            strokeLinecap="round"
            strokeDasharray={animate ? 1 : undefined}
          />
          <path
            d={back}
            pathLength={1}
            className={op.dashedBack ? fade : draw}
            style={style}
            fill="none"
            stroke={col}
            strokeWidth={0.55}
            strokeLinecap="round"
            strokeDasharray={op.dashedBack ? '0.025 0.025' : animate ? 1 : undefined}
          />
        </g>
      );
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
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const nx = -(b.y - a.y) / len;
      const ny = (b.x - a.x) / len;
      const s = ny > 0 ? -1 : 1;
      return (
        <g>
          <path
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            pathLength={1}
            className={op.dashed ? fade : draw}
            style={style}
            stroke={col}
            strokeWidth={0.55}
            strokeLinecap="round"
            strokeDasharray={op.dashed ? '0.025 0.025' : animate ? 1 : undefined}
            markerEnd={op.arrow ? `url(#arrow-${op.color ?? 'ink'})` : undefined}
          />
          {op.label && (
            <text
              x={mx + nx * 2.6 * s}
              y={my + ny * 2.6 * s + 1.2}
              textAnchor="middle"
              fontSize={4.2}
              fill={col}
              className={fade}
              style={{ ...later(0.5), ...T }}
            >
              {op.label}
            </text>
          )}
        </g>
      );
    }
    case 'text': {
      const fs = textSize(op.size);
      return (
        <text x={op.x} y={op.y} fontSize={fs} textAnchor={op.anchor ?? 'start'} fill={INK[op.color ?? 'ink']} className={fade} style={{ ...style, ...T }}>
          {rich(op.text, fs)}
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
          {op.fill && <path d={d} fill={INK[col]} fillOpacity={0.12} className={fade} style={later(0.6)} />}
          <path
            d={d}
            pathLength={1}
            className={draw}
            style={style}
            fill="none"
            stroke={INK[col]}
            strokeWidth={0.55}
            strokeLinejoin="round"
            strokeDasharray={animate ? 1 : undefined}
          />
        </g>
      );
    }
    case 'box': {
      // borderless soft card
      const col = op.color ?? 'blue';
      let fs = 3.8;
      let lines = wrap(op.text, Math.max(4, Math.floor((op.w - 2) / (fs * CHAR))));
      if (lines.length * fs * 1.15 > op.h - 1) {
        fs = 3.1;
        lines = wrap(op.text, Math.max(4, Math.floor((op.w - 2) / (fs * CHAR))));
      }
      const lh = fs * 1.15;
      const top = op.y + op.h / 2 - ((lines.length - 1) * lh) / 2 + fs * 0.35;
      return (
        <g>
          <rect x={op.x} y={op.y} width={op.w} height={op.h} rx={2} fill={TINT[col]} className={fade} style={style} />
          <rect x={op.x} y={op.y + op.h - 0.6} width={op.w} height={0.6} rx={0.3} fill={INK[col]} opacity={0.35} className={fade} style={style} />
          <text textAnchor="middle" fontSize={fs} fill={INK.ink} className={fade} style={{ ...later(0.35), ...T }}>
            {lines.map((l, i) => (
              <tspan key={i} x={op.x + op.w / 2} y={top + i * lh}>
                {rich(l, fs)}
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
          <path
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            pathLength={1}
            className={draw}
            style={style}
            stroke={INK[col]}
            strokeWidth={0.55}
            strokeLinecap="round"
            strokeDasharray={animate ? 1 : undefined}
            markerEnd={`url(#arrow-${col})`}
          />
          {op.label && (
            <text
              x={(a.x + b.x) / 2 + nx * 2.4 * s}
              y={(a.y + b.y) / 2 + ny * 2.4 * s + 1}
              textAnchor="middle"
              fontSize={3.4}
              fill={INK[col]}
              className={fade}
              style={{ ...later(0.5), ...T }}
            >
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
            <text
              key={i}
              x={op.x}
              y={op.y + i * 7}
              fontSize={4.4}
              fill={INK[op.color ?? 'ink']}
              className={fade}
              style={{ ...later(i / op.items.length), ...T }}
            >
              • {rich(it, 4.4)}
            </text>
          ))}
        </g>
      );
    case 'table': {
      const d = tableDims(op.rows);
      const xs = d.cw.map((_, c) => op.x + d.cw.slice(0, c).reduce((a, b) => a + b, 0));
      return (
        <g className={fade} style={style}>
          <rect x={op.x} y={op.y} width={d.w} height={d.rh} rx={0.8} fill="#e6efff" />
          {op.rows.slice(1).map((_, r) => (
            <line key={`r${r}`} x1={op.x} x2={op.x + d.w} y1={op.y + d.rh * (r + 1)} y2={op.y + d.rh * (r + 1)} stroke="#cbd5e1" strokeWidth={0.25} />
          ))}
          {xs.slice(1).map((x, c) => (
            <line key={`c${c}`} x1={x} x2={x} y1={op.y} y2={op.y + d.h} stroke="#cbd5e1" strokeWidth={0.25} />
          ))}
          {op.rows.map((row, r) =>
            row.map((cell, c) => (
              <text
                key={`${r}-${c}`}
                x={xs[c] + d.cw[c] / 2}
                y={op.y + d.rh * r + d.rh * 0.68}
                textAnchor="middle"
                fontSize={d.fs}
                fill={r === 0 ? INK.blue : INK.ink}
                style={T}
              >
                {rich(cell, d.fs)}
              </text>
            ))
          )}
        </g>
      );
    }
    case 'bars': {
      const n = op.items.length;
      const max = Math.max(...op.items.map((i) => i.value), 0) || 1;
      const area = op.h - 5;
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
            const d = later(i / n);
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
            <clipPath id={`clip-${ns}${a.id}`}>
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
                {String(v).replace('.', ',')}
              </text>
            )
          )}
          {yt.map((v) =>
            v === 0 ? null : (
              <text key={`ty${v}`} x={o.x - 1} y={map(a, 0, v).y + 0.8} textAnchor="end" fontSize={2.4} fill="#6b7280">
                {String(v).replace('.', ',')}
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
      const P = op.points.map(([x, y]) => map(a, x, y));
      const f = (n: number) => n.toFixed(2);
      const d = [`M ${f(P[0].x)} ${f(P[0].y)}`];
      for (let i = 0; i < P.length - 1; i++) {
        const p0 = P[i - 1] ?? P[i];
        const p1 = P[i];
        const p2 = P[i + 1];
        const p3 = P[i + 2] ?? p2;
        d.push(
          `C ${f(p1.x + (p2.x - p0.x) / 6)} ${f(p1.y + (p2.y - p0.y) / 6)} ${f(p2.x - (p3.x - p1.x) / 6)} ${f(p2.y - (p3.y - p1.y) / 6)} ${f(p2.x)} ${f(p2.y)}`
        );
      }
      return (
        <g clipPath={`url(#clip-${ns}${op.axes})`}>
          <path
            d={d.join(' ')}
            pathLength={1}
            className={op.dashed ? fade : draw}
            style={style}
            fill="none"
            stroke={INK[op.color ?? 'red']}
            strokeWidth={0.6}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={op.dashed ? '0.02 0.02' : animate ? 1 : undefined}
          />
        </g>
      );
    }
    case 'dot': {
      const a = g.axes[op.axes];
      if (!a) return null;
      const p = map(a, op.x, op.y);
      const col = INK[op.color ?? 'red'];
      return (
        <g className={fade} style={style}>
          {op.open ? <circle cx={p.x} cy={p.y} r={1.1} fill="#fff" stroke={col} strokeWidth={0.45} /> : <circle cx={p.x} cy={p.y} r={0.95} fill={col} />}
          {op.label && (
            <text x={p.x + 1.6} y={p.y - 1.5} fontSize={3.6} fill={INK.ink} style={T}>
              {op.label}
            </text>
          )}
        </g>
      );
    }
  }
}

function Formula({ op, className, style }: { op: Extract<DrawOp, { t: 'formula' }>; className: string; style?: React.CSSProperties }) {
  const ref = useRef<SVGTextElement | null>(null);
  const [w, setW] = useState(op.text.length * 5.2 * CHAR + 4);
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
      <rect x={op.x - 2} y={op.y - 5} width={w} height={7.2} rx={1.6} fill="#fff6d2" />
      <text ref={ref} x={op.x} y={op.y} fontSize={5.2} fill={INK.ink} style={T}>
        {rich(op.text, 5.2)}
      </text>
    </g>
  );
}

/* ------------------------------ action button ----------------------------- */

/** Reply button drawn on the board once the step's drawing is finished,
 *  with an optional secondary button beside it (e.g. "Soddaroq"). */
export type BoardAction = {
  label: string;
  color: string;
  show: boolean;
  onClick: () => void;
  alt?: { label: string; onClick: () => void };
};

/** Button size in board units; `k` > 1 enlarges it on small screens so it
 *  stays a comfortable tap target (~34px tall at full-board zoom). */
type BtnSize = { h: number; fs: number; gap: number; pad: number };
const btnSize = (k: number): BtnSize => ({
  h: 7 * k,
  fs: 3 * k,
  gap: 2 * k,
  pad: 8 * k
});
const btnScale = (boardPx: number) => (boardPx ? Math.min(Math.max(34 / ((7 * boardPx) / 100), 1), 1.8) : 1);
type LabelW = { main?: number; alt?: number };
/** Widths of the main / secondary pills and of the whole group. */
function groupWidths(action: BoardAction, m: LabelW, b: BtnSize) {
  const w = (label: string, measured?: number) => (measured ?? label.length * b.fs * 0.6) + b.pad;
  const main = w(action.label, m.main);
  const alt = action.alt ? w(action.alt.label, m.alt) : 0;
  return { main, alt, total: main + (alt ? alt + b.gap : 0) };
}

/**
 * Where the reply button goes: right under the last thing drawn if there is
 * room, otherwise beside it / under everything, otherwise the first free spot
 * scanning from the bottom-right corner. `null` = the board is full; the
 * button then goes in a strip at the bottom of the board.
 */
function placeAction(ops: DrawOp[][], g: Geo, w: number, h: number): Rect | null {
  const areas = ops
    .flat()
    .map((op) => areaOf(op, g))
    .filter((a): a is Rect => !!a);
  const cur = ops[ops.length - 1] ?? [];
  const last =
    [...cur]
      .reverse()
      .map((op) => areaOf(op, g))
      .find((a): a is Rect => !!a) ?? null;
  const fits = (r: Rect) => r.x >= 2 && r.x + r.w <= W - 2 && r.y >= 11 && r.y + r.h <= H - 1.5 && !areas.some((a) => overlaps(r, a, 1));
  const cx = (x: number) => Math.min(Math.max(x, 2), W - 2 - w);
  const bottom = Math.max(11, ...areas.map((a) => a.y + a.h));
  const cands: Rect[] = [];
  if (last) {
    cands.push({ x: cx(last.x), y: last.y + last.h + 2.2, w, h });
    cands.push({
      x: cx(last.x + last.w / 2 - w / 2),
      y: last.y + last.h + 2.2,
      w,
      h
    });
    cands.push({
      x: last.x + last.w + 3,
      y: last.y + last.h / 2 - h / 2,
      w,
      h
    });
  }
  cands.push({ x: cx(last ? last.x : 6), y: bottom + 2.2, w, h });
  for (const c of cands) if (fits(c)) return c;
  for (let y = H - 1.5 - h; y >= 11; y -= 1) for (let x = W - 2 - w; x >= 2; x -= 1.5) if (fits({ x, y, w, h })) return { x, y, w, h };
  return null;
}

function Pill({
  x,
  y,
  w,
  label,
  primary,
  color,
  show,
  onClick,
  textRef,
  b
}: {
  b: BtnSize;
  x: number;
  y: number;
  w: number;
  label: string;
  primary: boolean;
  color: string;
  show: boolean;
  onClick: () => void;
  textRef: React.Ref<SVGTextElement>;
}) {
  const fire = () => show && onClick();
  const accent = primary ? color : '#f59e0b';
  return (
    <g
      className="lab-btn"
      role="button"
      tabIndex={show ? 0 : -1}
      aria-label={label}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={fire}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fire();
        }
      }}
    >
      <rect x={x} y={y + 0.7 * (b.h / 7)} width={w} height={b.h} rx={b.h / 2} fill={primary ? color : accent} />
      <rect x={x} y={y + 0.7 * (b.h / 7)} width={w} height={b.h} rx={b.h / 2} fill="#000" opacity={primary ? 0.22 : 0.12} />
      <g className="lab-btn-face">
        <rect
          x={x}
          y={y}
          width={w}
          height={b.h}
          rx={b.h / 2}
          fill={primary ? color : '#fff'}
          stroke={primary ? undefined : accent}
          strokeOpacity={0.55}
          strokeWidth={primary ? undefined : 0.45}
        />
        <text
          ref={textRef}
          x={x + w / 2}
          y={y + b.h / 2 + b.fs * 0.36}
          textAnchor="middle"
          fontSize={b.fs}
          fontWeight={900}
          fill={primary ? '#fff' : '#ea8a00'}
          style={{ fontFamily: 'inherit' }}
        >
          {label}
        </text>
      </g>
    </g>
  );
}

function ActionButton({
  action,
  rect,
  widths,
  b,
  onMeasure,
  hidden = false
}: {
  action: BoardAction;
  rect: Rect;
  widths: { main: number; alt: number };
  b: BtnSize;
  onMeasure: (w: LabelW) => void;
  hidden?: boolean;
}) {
  const mainRef = useRef<SVGTextElement | null>(null);
  const altRef = useRef<SVGTextElement | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      try {
        const main = mainRef.current?.getBBox().width;
        const alt = altRef.current?.getBBox().width;
        if (main) onMeasure({ main, alt: alt || undefined });
      } catch {
        /* not rendered yet */
      }
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
  }, [action.label, action.alt?.label, onMeasure, b.fs]);
  // still rendered (off-board) when hidden so the labels can be measured
  if (hidden)
    return (
      <g aria-hidden>
        <text ref={mainRef} x={-200} y={-200} fontSize={b.fs} fontWeight={900} style={{ fontFamily: 'inherit' }}>
          {action.label}
        </text>
        {action.alt && (
          <text ref={altRef} x={-200} y={-200} fontSize={b.fs} fontWeight={900} style={{ fontFamily: 'inherit' }}>
            {action.alt.label}
          </text>
        )}
      </g>
    );
  return (
    <g
      key={action.label}
      className={action.show ? 'lab-pop' : ''}
      style={{
        opacity: action.show ? undefined : 0,
        pointerEvents: action.show ? 'auto' : 'none'
      }}
      aria-hidden={!action.show}
    >
      {action.alt && (
        <Pill
          x={rect.x}
          y={rect.y}
          w={widths.alt}
          label={action.alt.label}
          primary={false}
          color={action.color}
          show={action.show}
          onClick={action.alt.onClick}
          textRef={altRef}
          b={b}
        />
      )}
      <Pill
        x={rect.x + (action.alt ? widths.alt + b.gap : 0)}
        y={rect.y}
        w={widths.main}
        label={action.label}
        primary
        color={action.color}
        show={action.show}
        onClick={action.onClick}
        textRef={mainRef}
        b={b}
      />
    </g>
  );
}

/* --------------------------------- camera --------------------------------- */

const FULL: Rect = { x: 0, y: 0, w: W, h: H };
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Smoothly animates a viewBox towards `target`. */
function useAnimatedView(target: Rect, ms = 900) {
  const [view, setView] = useState<Rect>(target);
  const cur = useRef(view);
  cur.current = view;
  useEffect(() => {
    const from = cur.current;
    if (from.x === target.x && from.y === target.y && from.w === target.w && from.h === target.h) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const k = ease(Math.min(1, (now - t0) / ms));
      setView({
        x: from.x + (target.x - from.x) * k,
        y: from.y + (target.y - from.y) * k,
        w: from.w + (target.w - from.w) * k,
        h: from.h + (target.h - from.h) * k
      });
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target.x, target.y, target.w, target.h, ms]);
  return [view, setView] as const;
}

/** Keep a manual view inside `b` (same aspect as `b`). */
const clampTo = (v: Rect, b: Rect): Rect => {
  const a = b.w / b.h;
  const w = Math.min(Math.max(v.w, 14), b.w);
  const h = w / a;
  return {
    x: Math.min(Math.max(v.x, b.x), b.x + b.w - w),
    y: Math.min(Math.max(v.y, b.y), b.y + b.h - h),
    w,
    h
  };
};

/* ------------------------------ grid lessons ------------------------------ */
/*
 * With `grid`, every scene (a step with `clear` starts one) gets its own tile
 * on one big canvas laid out like the final picture: two tiles per row
 * (6 scenes → 3 rows × 2). The camera shows the current tile (on wide boards:
 * the current row, so the part drawn before stays beside it); when a new
 * scene starts it zooms out, moves to the next empty tile and zooms back in.
 * At the end (`overview`) it zooms out to the whole picture.
 */

const MOVE_OUT_MS = 700;
const MOVE_HOLD_MS = 250;
const MOVE_IN_MS = 850;
/** How long the camera takes to reach the next part (drawing waits for it). */
export const SCENE_MOVE_MS = MOVE_OUT_MS + MOVE_HOLD_MS + MOVE_IN_MS;
/** Boards at least this wide show a whole row (two parts side by side). */
const WIDE_PX = 900;

const sceneStarts = (steps: BoardStep[]) => steps.map((s, i) => (i === 0 || s.clear ? i : -1)).filter((i) => i >= 0);

function gridOf(n: number) {
  const cols = n < 2 ? 1 : 2;
  const rows = Math.ceil(n / cols);
  return { cols, rows, cw: cols * W, ch: rows * H };
}
/** Top-left corner of scene `k`'s tile (a lone last tile is centred). */
function tileAt(k: number, n: number): Pt {
  const { cols } = gridOf(n);
  const lone = n % cols !== 0 && k === n - 1;
  return {
    x: lone ? (cols * W - W) / 2 : (k % cols) * W,
    y: Math.floor(k / cols) * H
  };
}
/** Smallest view of the given aspect around `rs`, kept on the canvas where it fits. */
function fit(rs: Rect[], aspect: number, cw: number, ch: number): Rect {
  const x0 = Math.min(...rs.map((r) => r.x));
  const y0 = Math.min(...rs.map((r) => r.y));
  const x1 = Math.max(...rs.map((r) => r.x + r.w));
  const y1 = Math.max(...rs.map((r) => r.y + r.h));
  const w = Math.max(x1 - x0, (y1 - y0) * aspect);
  const h = w / aspect;
  const place = (c: number, size: number, total: number) => (size >= total ? total / 2 - size / 2 : Math.min(Math.max(c - size / 2, 0), total - size));
  return {
    x: place((x0 + x1) / 2, w, cw),
    y: place((y0 + y1) / 2, h, ch),
    w,
    h
  };
}

/* --------------------------------- board ---------------------------------- */

/**
 * @param step        index of the step being shown; earlier steps of the same
 *                    scene are drawn instantly, the current one is animated.
 * @param runId       changes whenever playback (re)starts so the animation replays.
 * @param overview    show the whole board (e.g. at the end of a lesson).
 * @param camera      'auto' = follow the drawing on narrow screens only.
 * @param action      reply button drawn on the board under the finished drawing.
 * @param grid        lay the scenes out as tiles of one big picture (see above).
 * @param fromStep    the step shown before this one (decides the camera move).
 * @param onDrawStart called when the step's drawing starts (after any camera move).
 * @param onDrawn     called when the step's drawing has finished.
 */
export default function Board({
  plan,
  step,
  runId,
  overview = false,
  camera = 'auto',
  action,
  grid = false,
  fromStep = -1,
  onDrawStart,
  onDrawn
}: {
  plan: BoardScript | null;
  step: number;
  runId: number;
  overview?: boolean;
  camera?: 'auto' | 'on' | 'off';
  action?: BoardAction;
  grid?: boolean;
  fromStep?: number;
  onDrawStart?: () => void;
  onDrawn?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [narrow, setNarrow] = useState(false);
  const [boardPx, setBoardPx] = useState(0);
  const [manual, setManual] = useState<Rect | null>(null);
  const [pen, setPen] = useState<Pt | null>(null);
  const cbs = useRef({ onDrawStart, onDrawn });
  cbs.current = { onDrawStart, onDrawn };

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      setNarrow(e.contentRect.width < 640);
      setBoardPx(e.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const steps = plan?.steps ?? [];
  const starts = useMemo(() => sceneStarts(plan?.steps ?? []), [plan]);
  const sceneOf = (i: number) => starts.reduce((k, s, j) => (s <= i ? j : k), 0);
  const nScenes = Math.max(starts.length, 1);
  const tiled = grid && starts.length > 1;
  const scene = step >= 0 ? sceneOf(step) : 0;
  const G = tiled ? gridOf(nScenes) : { cols: 1, rows: 1, cw: W, ch: H };
  const canvas: Rect = { x: 0, y: 0, w: G.cw, h: G.ch };
  const wide = tiled && boardPx >= WIDE_PX;
  const off = tiled ? tileAt(scene, nScenes) : { x: 0, y: 0 };
  const baseOf = (k: number): Rect => {
    if (!tiled) return FULL;
    if (wide) return { x: 0, y: Math.floor(k / 2) * H, w: 2 * W, h: H };
    const t = tileAt(k, nScenes);
    return { x: t.x, y: t.y, w: W, h: H };
  };
  const base = baseOf(scene);
  const bounds = overview ? canvas : base;
  const asp = bounds.w / bounds.h;

  const from = step >= 0 ? sceneStart(steps, step) : 0;
  const { geo: g, ops } = useMemo(
    () =>
      plan && step >= 0
        ? layout(plan.steps, from, step)
        : {
            geo: { pts: {}, circles: {}, boxes: {}, axes: {} } as Geo,
            ops: [] as DrawOp[][]
          },
    [plan, from, step]
  );
  const current = ops[ops.length - 1] ?? null;

  // finished scenes before the current one, drawn in their tiles
  const doneScenes = useMemo(() => {
    if (!plan || !tiled) return [];
    return starts.slice(0, scene).map((s, k) => ({
      k,
      o: tileAt(k, starts.length),
      ...layout(plan.steps, s, starts[k + 1] - 1)
    }));
  }, [plan, tiled, starts, scene]);

  // camera move to another part: zoom out over both, then into the new one
  const fromScene = fromStep >= 0 && step >= 0 ? sceneOf(fromStep) : null;
  const fromBase = tiled && !overview && fromScene !== null && fromScene !== scene ? baseOf(fromScene) : null;
  const moveNeeded = !!fromBase && (fromBase.x !== base.x || fromBase.y !== base.y);
  const lead = moveNeeded ? SCENE_MOVE_MS : 0;
  const [phase, setPhase] = useState<Rect | null>(null);
  useLayoutEffect(() => {
    if (!moveNeeded || !fromBase) return setPhase(null);
    setPhase(fit([fromBase, base], base.w / base.h, G.cw, G.ch));
    const t = setTimeout(() => setPhase(null), MOVE_OUT_MS + MOVE_HOLD_MS);
    return () => clearTimeout(t);
  }, [step, runId]); // eslint-disable-line react-hooks/exhaustive-deps

  const [labelW, setLabelW] = useState<LabelW>({});
  useEffect(() => setLabelW({}), [action?.label, action?.alt?.label]);
  const bsize = btnSize(btnScale((boardPx * W) / base.w));
  const widths = action ? groupWidths(action, labelW, bsize) : { main: 0, alt: 0, total: 0 };
  const btnRect = useMemo(
    () => (action && current && !overview ? placeAction(ops, g, widths.total, bsize.h) : null),
    [widths.total, bsize.h, ops, g, current, overview] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // a new step (or replay) hands control back to the camera
  useEffect(() => setManual(null), [step, runId, overview]);

  const follow = camera === 'on' || (camera === 'auto' && narrow);
  const auto = useMemo<Rect>(() => {
    if (!follow || overview || !current) return base;
    // keep the scene title in view on the step that writes it (its box is text-sized, so the camera can still zoom)
    const areas = current.map((op) => areaOf(op, g)).filter((a): a is Rect => !!a);
    // once the drawing is done, make sure the reply button is in view too
    if (action?.show && btnRect) areas.push(btnRect);
    const f = frame(areas);
    return { ...f, x: f.x + off.x, y: f.y + off.y };
  }, [follow, overview, current, g, action?.show, btnRect, base.x, base.y, base.w, off.x, off.y]); // eslint-disable-line react-hooks/exhaustive-deps
  const target = overview ? canvas : (manual ?? phase ?? auto);
  const [view, setView] = useAnimatedView(target, manual ? 1 : phase ? MOVE_OUT_MS : moveNeeded ? MOVE_IN_MS : 900);

  useEffect(() => {
    if (!current || overview) return setPen(null);
    const { at, total } = timeline(current);
    const timers = current.map((op, i) => setTimeout(() => setPen(anchor(op, g)), lead + at[i]));
    const started = setTimeout(() => cbs.current.onDrawStart?.(), lead);
    const done = setTimeout(
      () => {
        setPen(null);
        cbs.current.onDrawn?.();
      },
      lead + total + 300
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(started);
      clearTimeout(done);
    };
  }, [current, g, runId, overview]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---- pinch / drag / buttons ---- */
  const pointers = useRef(new Map<number, Pt>());
  const gesture = useRef<{ view: Rect; dist: number; mid: Pt } | null>(null);
  const toBoard = (clientX: number, clientY: number, v: Rect): Pt => {
    const r = svgRef.current!.getBoundingClientRect();
    return {
      x: v.x + ((clientX - r.left) / r.width) * v.w,
      y: v.y + ((clientY - r.top) / r.height) * v.h
    };
  };
  const zoomBy = (k: number, at?: Pt) => {
    const c = at ?? { x: view.x + view.w / 2, y: view.y + view.h / 2 };
    const w = view.w * k;
    const next = clampTo(
      {
        x: c.x - ((c.x - view.x) / view.w) * w,
        y: c.y - ((c.y - view.y) / view.h) * (w / asp),
        w,
        h: w / asp
      },
      bounds
    );
    setManual(next);
    setView(next);
  };
  const onDown = (e: React.PointerEvent) => {
    if (!follow) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const ps = [...pointers.current.values()];
    gesture.current = {
      view,
      dist: ps.length > 1 ? Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y) : 0,
      mid: ps.length > 1 ? { x: (ps[0].x + ps[1].x) / 2, y: (ps[0].y + ps[1].y) / 2 } : ps[0]
    };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!follow || !pointers.current.has(e.pointerId) || !gesture.current || !svgRef.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const ps = [...pointers.current.values()];
    const g0 = gesture.current;
    const r = svgRef.current.getBoundingClientRect();
    if (ps.length > 1 && g0.dist > 0) {
      const dist = Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y);
      const k = g0.dist / dist;
      const anchorPt = toBoard(g0.mid.x, g0.mid.y, g0.view);
      const w = g0.view.w * k;
      const next = clampTo(
        {
          x: anchorPt.x - ((anchorPt.x - g0.view.x) / g0.view.w) * w,
          y: anchorPt.y - ((anchorPt.y - g0.view.y) / g0.view.h) * (w / asp),
          w,
          h: w / asp
        },
        bounds
      );
      setManual(next);
      setView(next);
    } else if (ps.length === 1 && g0.view.w < bounds.w - 0.5) {
      const dx = ((ps[0].x - g0.mid.x) / r.width) * g0.view.w;
      const dy = ((ps[0].y - g0.mid.y) / r.height) * g0.view.h;
      const next = clampTo({ ...g0.view, x: g0.view.x - dx, y: g0.view.y - dy }, bounds);
      setManual(next);
      setView(next);
    }
  };
  const onUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    const ps = [...pointers.current.values()];
    gesture.current = ps.length ? { view, dist: 0, mid: ps[0] } : null;
  };

  const zoomed = view.w < bounds.w - 0.5;
  const ns = tiled ? `s${scene}-` : '';

  return (
    <div ref={wrapRef} className={`${caveat.variable} relative w-full overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card`}>
      <style>{`
        .lab-draw{stroke-dashoffset:1;animation-name:labDraw;animation-fill-mode:forwards;animation-timing-function:ease-in-out}
        .lab-fade{opacity:0;animation-name:labFade;animation-fill-mode:forwards;animation-timing-function:ease-out}
        .lab-grow{transform:scaleY(0);transform-box:fill-box;transform-origin:bottom;animation-name:labGrow;animation-fill-mode:forwards;animation-timing-function:ease-out}
        @keyframes labGrow{to{transform:scaleY(1)}}
        @keyframes labDraw{to{stroke-dashoffset:0}}
        @keyframes labFade{from{opacity:0;transform:translateY(0.6px)}to{opacity:1;transform:none}}
        .lab-btn{cursor:pointer;outline:none}
        .lab-pop{animation:labPop .35s ease-out both;transform-box:fill-box;transform-origin:center}
        @keyframes labPop{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}
        .lab-btn-face{transition:transform .08s}
        .lab-btn:active .lab-btn-face{transform:translateY(0.6px)}
        .lab-btn:focus-visible .lab-btn-face rect{stroke:#1f2937;stroke-width:.5}
      `}</style>
      <svg
        ref={svgRef}
        viewBox={`${view.x.toFixed(3)} ${view.y.toFixed(3)} ${view.w.toFixed(3)} ${view.h.toFixed(3)}`}
        className="block w-full select-none"
        style={{ touchAction: follow ? 'none' : undefined }}
        role="img"
        aria-label={plan?.title ?? 'board'}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <defs>
          <pattern id="lab-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#edf2f8" strokeWidth="0.25" />
          </pattern>
          {(Object.keys(INK) as LabColor[]).map((c) => (
            <marker key={c} id={`arrow-${c}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={INK[c]} />
            </marker>
          ))}
        </defs>
        <rect x={-G.cw} y={-G.ch} width={G.cw * 3} height={G.ch * 3} fill="url(#lab-grid)" />
        {doneScenes.map(({ k, o, geo, ops: sOps }) => (
          <g key={`done-${k}`} transform={`translate(${o.x} ${o.y})`}>
            {sOps.flat().map((op, oi) => (
              <Op key={oi} op={op} g={geo} delay={0} animate={false} ns={`s${k}-`} />
            ))}
          </g>
        ))}
        <g transform={`translate(${off.x} ${off.y})`}>
          {ops.map((sOps, k) => {
            const si = from + k;
            const { at } = timeline(sOps);
            return sOps.map((op, oi) => (
              <Op key={`${si}-${oi}-${si === step ? runId : 'done'}`} op={op} g={g} delay={at[oi] + lead} animate={si === step && !overview} ns={ns} />
            ));
          })}
          {action && current && !overview && (
            <ActionButton
              action={action}
              rect={btnRect ?? { x: -200, y: -200, w: 1, h: bsize.h }}
              widths={widths}
              b={bsize}
              onMeasure={setLabelW}
              hidden={!btnRect}
            />
          )}
          {pen && !overview && (
            <g
              style={{
                transform: `translate(${pen.x}px, ${pen.y}px)`,
                transition: `transform ${OP_MS * 0.5}ms ease-in-out`
              }}
            >
              <g transform="rotate(-35)">
                <rect x={-1.1} y={-12} width={2.2} height={9} rx={0.8} fill="#2563eb" />
                <rect x={-1.1} y={-13.6} width={2.2} height={2} rx={0.6} fill="#1e3a8a" />
                <path d="M -1.1 -3 L 1.1 -3 L 0 0 Z" fill="#1f2937" />
              </g>
            </g>
          )}
        </g>
        {overview &&
          tiled &&
          starts.map((_, k) => {
            const o = tileAt(k, starts.length);
            return (
              <g key={`n${k}`}>
                <circle cx={o.x + W - 5} cy={o.y + 5} r={2.8} fill="#f59e0b" opacity={0.85} />
                <text x={o.x + W - 5} y={o.y + 6} textAnchor="middle" fontSize={2.9} fontWeight={900} fill="#fff" style={{ fontFamily: 'inherit' }}>
                  {k + 1}
                </text>
              </g>
            );
          })}
      </svg>
      {action && current && !overview && !btnRect && (
        <div
          className={`flex flex-wrap justify-end gap-2 px-3 pb-3 pt-1 transition-opacity duration-300 ${action.show ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          style={{
            backgroundImage: 'linear-gradient(#edf2f8 1px, transparent 1px), linear-gradient(90deg, #edf2f8 1px, transparent 1px)',
            backgroundSize: '5% 5%'
          }}
        >
          {action.alt && (
            <button
              type="button"
              onClick={() => action.show && action.alt?.onClick()}
              tabIndex={action.show ? 0 : -1}
              className="rounded-full border-2 border-brand-orange/40 bg-white px-4 py-2 font-black text-brand-orange shadow-[0_4px_0_rgba(0,0,0,.08)] active:translate-y-px"
            >
              {action.alt.label}
            </button>
          )}
          <button
            type="button"
            onClick={() => action.show && action.onClick()}
            tabIndex={action.show ? 0 : -1}
            className="rounded-full px-5 py-2.5 font-black text-white shadow-[0_4px_0_rgba(0,0,0,.22)] active:translate-y-px"
            style={{ background: action.color }}
          >
            {action.label}
          </button>
        </div>
      )}
      {follow && (
        <div className="flex justify-end gap-1 border-t border-ink/5 bg-white px-2 py-1">
          {[
            { k: 'in', label: '+', on: () => zoomBy(0.75) },
            { k: 'out', label: '−', on: () => zoomBy(1 / 0.75) },
            {
              k: 'all',
              label: '⤢',
              on: () => setManual(zoomed ? bounds : null)
            }
          ].map((b) => (
            <button
              key={b.k}
              type="button"
              onClick={b.on}
              aria-label={b.k === 'all' ? 'Butun doska' : b.k === 'in' ? 'Yaqinlashtirish' : 'Uzoqlashtirish'}
              className="grid h-8 w-8 place-items-center rounded-full bg-ink/[0.05] text-lg font-black text-ink"
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
