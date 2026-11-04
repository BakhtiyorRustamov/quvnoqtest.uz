import type { DrawOp } from '@/lib/lab/plan';

/** A point in space (x; y; z). */
export type V3 = [number, number, number];

/**
 * Oblique ("kabinet") projection used for the 3D drawings on the board:
 * Oy goes right, Oz goes up, Ox comes towards the viewer (down-left).
 * o = where the origin sits on the board, s = board units per 1.
 */
export function proj(p: V3, o: [number, number] = [34, 50], s = 7): { x: number; y: number } {
  return { x: +(o[0] + s * p[1] - s * 0.55 * p[0]).toFixed(2), y: +(o[1] - s * p[2] + s * 0.45 * p[0]).toFixed(2) };
}

/** A board point at a space point. */
export function pt(id: string, p: V3, label?: string, o?: [number, number], s?: number, hide?: boolean): DrawOp {
  const q = proj(p, o, s);
  return { t: 'point', id, x: q.x, y: q.y, label, hide };
}

/** The three coordinate axes with arrows and x, y, z labels. ids get the prefix (default 'ax'). */
export function axes3(len: V3 = [4, 5, 4], o?: [number, number], s?: number, pre = 'ax'): DrawOp[] {
  const xe = proj([len[0], 0, 0], o, s);
  return [
    pt(`${pre}O`, [0, 0, 0], 'O', o, s),
    pt(`${pre}X`, [len[0], 0, 0], undefined, o, s, true),
    // the x label sits beside the arrowhead (a point label would be hidden under it)
    { t: 'text', x: +(xe.x - 5).toFixed(2), y: +(xe.y + 0.5).toFixed(2), text: 'x', size: 's' },
    pt(`${pre}Y`, [0, len[1], 0], 'y', o, s, true),
    pt(`${pre}Z`, [0, 0, len[2]], 'z', o, s, true),
    { t: 'line', from: `${pre}O`, to: `${pre}X`, arrow: true },
    { t: 'line', from: `${pre}O`, to: `${pre}Y`, arrow: true },
    { t: 'line', from: `${pre}O`, to: `${pre}Z`, arrow: true }
  ];
}

/** Dashed "box" lines that show where (x; y; z) sits: down to Oxy and across to the axes. */
export function boxTo(id: string, p: V3, o?: [number, number], s?: number): DrawOp[] {
  const [x, y, z] = p;
  return [
    pt(`${id}x`, [x, 0, 0], undefined, o, s, true),
    pt(`${id}y`, [0, y, 0], undefined, o, s, true),
    pt(`${id}1`, [x, y, 0], undefined, o, s, true),
    { t: 'line', from: `${id}x`, to: `${id}1`, dashed: true },
    { t: 'line', from: `${id}y`, to: `${id}1`, dashed: true },
    { t: 'line', from: `${id}1`, to: id, dashed: true }
  ];
}

/**
 * A box a × b × c (along x, y, z) drawn with hidden edges dashed. The corner at the
 * origin is the hidden back corner. Vertex ids: `${pre}000`, `${pre}100`, … (x y z as 0/1).
 * labels: e.g. { '000': 'A', '111': 'C₁' }.
 */
export function cuboid(pre: string, size: V3, o?: [number, number], s?: number, labels: Record<string, string> = {}, color?: 'ink' | 'blue' | 'green' | 'red' | 'orange' | 'purple'): DrawOp[] {
  const [a, b, c] = size;
  const keys = ['000', '100', '010', '110', '001', '101', '011', '111'];
  const ops: DrawOp[] = keys.map((k) => pt(`${pre}${k}`, [+k[0] * a, +k[1] * b, +k[2] * c], labels[k], o, s, !labels[k]));
  const edges: [string, string][] = [
    ['000', '100'], ['000', '010'], ['000', '001'],
    ['100', '110'], ['100', '101'], ['010', '110'], ['010', '011'], ['001', '101'], ['001', '011'],
    ['110', '111'], ['101', '111'], ['011', '111']
  ];
  edges.forEach(([p, q], i) => ops.push({ t: 'line', from: `${pre}${p}`, to: `${pre}${q}`, dashed: i < 3, color }));
  return ops;
}

/** An ellipse (a circle seen at an angle); the back (upper) half can be dashed. */
export function ellipse(cx: number, cy: number, rx: number, ry: number, opts: { dashedBack?: boolean; color?: 'ink' | 'blue' | 'green' | 'red' | 'orange' | 'purple' } = {}): DrawOp {
  return { t: 'ellipse', cx, cy, rx, ry, dashedBack: opts.dashedBack, color: opts.color };
}

/**
 * An upright cylinder: top base centred at (cx, top), height h and radius rx in board units.
 * Point ids for reuse: `${pre}t0` / `${pre}b0` (right edge, top / bottom), `${pre}t12` / `${pre}b12` (left edge).
 */
export function cylinder(pre: string, cx: number, top: number, rx: number, h: number, color: 'ink' | 'blue' | 'green' | 'red' | 'orange' | 'purple' = 'ink'): DrawOp[] {
  const ry = +(rx * 0.32).toFixed(2);
  return [
    ellipse(cx, top, rx, ry, { color }),
    ellipse(cx, top + h, rx, ry, { dashedBack: true, color }),
    { t: 'point', id: `${pre}t0`, x: cx + rx, y: top, hide: true },
    { t: 'point', id: `${pre}b0`, x: cx + rx, y: top + h, hide: true },
    { t: 'point', id: `${pre}t12`, x: cx - rx, y: top, hide: true },
    { t: 'point', id: `${pre}b12`, x: cx - rx, y: top + h, hide: true },
    { t: 'line', from: `${pre}t0`, to: `${pre}b0`, color },
    { t: 'line', from: `${pre}t12`, to: `${pre}b12`, color }
  ];
}

type Col = 'ink' | 'blue' | 'green' | 'red' | 'orange' | 'purple';

/**
 * An upright cone: base centred at (cx, base) with radius rx (board units), apex h units above.
 * Point ids: `${pre}S` (apex), `${pre}O` (base centre), `${pre}R` / `${pre}L` (right / left end of the base).
 */
export function cone(pre: string, cx: number, base: number, rx: number, h: number, color: Col = 'ink'): DrawOp[] {
  const ry = +(rx * 0.32).toFixed(2);
  return [
    ellipse(cx, base, rx, ry, { dashedBack: true, color }),
    { t: 'point', id: `${pre}S`, x: cx, y: base - h, hide: true },
    { t: 'point', id: `${pre}O`, x: cx, y: base, hide: true },
    { t: 'point', id: `${pre}R`, x: cx + rx, y: base, hide: true },
    { t: 'point', id: `${pre}L`, x: cx - rx, y: base, hide: true },
    { t: 'line', from: `${pre}S`, to: `${pre}R`, color },
    { t: 'line', from: `${pre}S`, to: `${pre}L`, color }
  ];
}

/**
 * An upright truncated cone: lower base at (cx, base) radius r1, upper base h higher with radius r2.
 * Point ids: `${pre}O1`, `${pre}O2` (centres), `${pre}R1`, `${pre}L1`, `${pre}R2`, `${pre}L2`.
 */
export function frustumCone(pre: string, cx: number, base: number, r1: number, r2: number, h: number, color: Col = 'ink'): DrawOp[] {
  const top = base - h;
  return [
    ellipse(cx, base, r1, +(r1 * 0.32).toFixed(2), { dashedBack: true, color }),
    ellipse(cx, top, r2, +(r2 * 0.32).toFixed(2), { color }),
    { t: 'point', id: `${pre}O1`, x: cx, y: base, hide: true },
    { t: 'point', id: `${pre}O2`, x: cx, y: top, hide: true },
    { t: 'point', id: `${pre}R1`, x: cx + r1, y: base, hide: true },
    { t: 'point', id: `${pre}L1`, x: cx - r1, y: base, hide: true },
    { t: 'point', id: `${pre}R2`, x: cx + r2, y: top, hide: true },
    { t: 'point', id: `${pre}L2`, x: cx - r2, y: top, hide: true },
    { t: 'line', from: `${pre}R1`, to: `${pre}R2`, color },
    { t: 'line', from: `${pre}L1`, to: `${pre}L2`, color }
  ];
}

/** A circular sector (e.g. the net of a cone's lateral surface) as a polygon: centre (cx, cy), radius r, from angle a0 to a1 (degrees, 0 = right, counter-clockwise). */
export function sector(pre: string, cx: number, cy: number, r: number, a0: number, a1: number, color: Col = 'ink'): DrawOp[] {
  const n = Math.max(6, Math.round(Math.abs(a1 - a0) / 12));
  const ops: DrawOp[] = [{ t: 'point', id: `${pre}c`, x: cx, y: cy, hide: true }];
  const ids = [`${pre}c`];
  for (let i = 0; i <= n; i++) {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    ops.push({ t: 'point', id: `${pre}${i}`, x: +(cx + r * Math.cos(a)).toFixed(2), y: +(cy - r * Math.sin(a)).toFixed(2), hide: true });
    ids.push(`${pre}${i}`);
  }
  ops.push({ t: 'polygon', points: ids, color });
  return ops;
}
