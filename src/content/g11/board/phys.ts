import type { DrawOp } from '@/lib/lab/plan';

/** Small drawing helpers for the fizika board lessons (board: 100 × 70, y down). */

type Col = 'ink' | 'blue' | 'green' | 'red' | 'orange' | 'purple';

/** A vector drawn as an arrow from (x1, y1) to (x2, y2); ids `${id}a`, `${id}b`. */
export function vec(id: string, x1: number, y1: number, x2: number, y2: number, color: Col = 'red', label?: string): DrawOp[] {
  return [
    { t: 'point', id: `${id}a`, x: x1, y: y1, hide: true },
    { t: 'point', id: `${id}b`, x: x2, y: y2, hide: true },
    { t: 'line', from: `${id}a`, to: `${id}b`, color, arrow: true, label }
  ];
}

/** A plain segment (wire, rail, plate…) from (x1, y1) to (x2, y2). */
export function seg(id: string, x1: number, y1: number, x2: number, y2: number, color: Col = 'ink', dashed?: boolean): DrawOp[] {
  return [
    { t: 'point', id: `${id}a`, x: x1, y: y1, hide: true },
    { t: 'point', id: `${id}b`, x: x2, y: y2, hide: true },
    { t: 'line', from: `${id}a`, to: `${id}b`, color, dashed }
  ];
}

/** A rectangle outline (not a `box`: the board pushes text out of boxes). */
export function rect(id: string, x: number, y: number, w: number, h: number, color: Col = 'ink'): DrawOp[] {
  const p = (k: string, px: number, py: number): DrawOp => ({ t: 'point', id: `${id}${k}`, x: px, y: py, hide: true });
  return [p('1', x, y), p('2', x + w, y), p('3', x + w, y + h), p('4', x, y + h), { t: 'polygon', points: [`${id}1`, `${id}2`, `${id}3`, `${id}4`], color }];
}

/** A bar magnet lying horizontally: left half N (red), right half S (blue). */
export function barMagnet(id: string, x: number, y: number, w = 30, h = 8, flip = false): DrawOp[] {
  const half = w / 2;
  const [l, r] = flip ? (['S', 'N'] as const) : (['N', 'S'] as const);
  return [
    ...rect(`${id}l`, x, y, half, h, l === 'N' ? 'red' : 'blue'),
    ...rect(`${id}r`, x + half, y, half, h, r === 'N' ? 'red' : 'blue'),
    { t: 'text', x: x + half / 2, y: y + h / 2 + 1.6, text: l, anchor: 'middle', color: l === 'N' ? 'red' : 'blue' },
    { t: 'text', x: x + half * 1.5, y: y + h / 2 + 1.6, text: r, anchor: 'middle', color: r === 'N' ? 'red' : 'blue' }
  ];
}

/** A grid of ⊗ (into the board) or ⊙ (out of the board) marks for a uniform field. */
export function fieldMarks(x0: number, y0: number, cols: number, rows: number, step: number, into = true, color: Col = 'blue'): DrawOp[] {
  const out: DrawOp[] = [];
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) out.push({ t: 'text', x: x0 + i * step, y: y0 + j * step, text: into ? '×' : '•', anchor: 'middle', color, size: 's' });
  return out;
}

/** Parallel field lines (uniform field) pointing right, between x0 and x1. */
export function fieldLines(id: string, x0: number, x1: number, ys: number[], color: Col = 'blue'): DrawOp[] {
  return ys.flatMap((y, i) => vec(`${id}${i}`, x0, y, x1, y, color));
}

/** A battery / current source symbol at (x, y): long and short plates, vertical. */
export function battery(id: string, x: number, y: number): DrawOp[] {
  return [...seg(`${id}p`, x, y - 4, x, y + 4), ...seg(`${id}m`, x + 2, y - 2, x + 2, y + 2), { t: 'text', x: x - 3, y: y - 5, text: '+', size: 's' }];
}

/** A coil seen from the side: n narrow loops starting at x, centred on y. */
export function coil(x: number, y: number, n = 5, step = 3, ry = 7, color: Col = 'orange'): DrawOp[] {
  return Array.from({ length: n }, (_, i) => ({ t: 'ellipse', cx: x + i * step, cy: y, rx: 1.4, ry, color }) as DrawOp);
}

/** A meter (galvanometer G, ammeter A, voltmeter V): a small circle with a letter. */
export function meter(x: number, y: number, letter = 'G', r = 4): DrawOp[] {
  return [
    { t: 'ellipse', cx: x, cy: y, rx: r, ry: r, color: 'ink' },
    { t: 'text', x, y: y + 1.6, text: letter, anchor: 'middle', size: 's' }
  ];
}

/** Sample y = f(t) on [a, b] for a `curve` (rounded to 3 decimals). */
export function wave(f: (t: number) => number, a: number, b: number, n = 48): [number, number][] {
  const r = (v: number) => Math.round(v * 1000) / 1000;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = a + ((b - a) * i) / n;
    return [r(t), r(f(t))] as [number, number];
  });
}

/** A capacitor with horizontal plates centred on (x, y), for a vertical wire. */
export function capacitor(id: string, x: number, y: number, w = 10, gap = 3, color: Col = 'ink'): DrawOp[] {
  return [...seg(`${id}t`, x - w / 2, y - gap / 2, x + w / 2, y - gap / 2, color), ...seg(`${id}b`, x - w / 2, y + gap / 2, x + w / 2, y + gap / 2, color)];
}

/** A vertical coil (loops stacked downwards from y), for a vertical wire at x. */
export function vcoil(x: number, y: number, n = 5, step = 3, rx = 3.5, color: Col = 'orange'): DrawOp[] {
  return Array.from({ length: n }, (_, i) => ({ t: 'ellipse', cx: x, cy: y + i * step, rx, ry: 1.3, color }) as DrawOp);
}
