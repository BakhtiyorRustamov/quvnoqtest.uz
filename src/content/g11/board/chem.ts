import type { DrawOp } from '@/lib/lab/plan';
import { rect } from './phys';

type Col = 'ink' | 'blue' | 'green' | 'red' | 'orange' | 'purple';

/**
 * A row of orbital cells (kvant yacheykalar) with electron arrows, e.g.
 * cells('c2p', 30, 30, ['↑', '↑', ''], '2p') — one cell per orbital, left to right.
 */
export function cells(id: string, x: number, y: number, fill: string[], label?: string, color: Col = 'blue', size = 6): DrawOp[] {
  const out: DrawOp[] = [];
  fill.forEach((e, i) => {
    out.push(...rect(`${id}${i}`, x + i * size, y, size, size, color));
    if (e) out.push({ t: 'text', x: x + i * size + size / 2, y: y + size * 0.78, text: e, anchor: 'middle', size: 's', color: 'red' });
  });
  if (label) out.push({ t: 'text', x: x + (fill.length * size) / 2, y: y + size + 4, text: label, anchor: 'middle', size: 's' });
  return out;
}

/** A labelled box (block diagrams, ions, lattice nodes). */
export function block(id: string, x: number, y: number, w: number, label: string, color: Col = 'ink', h = 9): DrawOp[] {
  return [...rect(id, x, y, w, h, color), { t: 'text', x: x + w / 2, y: y + h * 0.66, text: label, anchor: 'middle', size: 's' }];
}
