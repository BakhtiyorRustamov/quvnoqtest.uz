/**
 * Tiny SVG builders for test figures (geometry drawings, physics graphs and schemes).
 * Output is a plain SVG string, rendered under the question text. Figures are schematic
 * ("chizma masshtabsiz"): values live in the text and the labels.
 */
const INK = '#1E3A5F';
const BLUE = '#1FA7E0';
const ORANGE = '#F39A1F';
const GREEN = '#5B9A1F';
const f = (n: number) => Math.round(n * 10) / 10;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export function svg(w: number, h: number, body: string): string {
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${Math.min(w, 340)}px" xmlns="http://www.w3.org/2000/svg" font-family="inherit" font-weight="700"><defs><marker id="qa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="${INK}"/></marker></defs>${body}</svg>`;
}
export const line = (x1: number, y1: number, x2: number, y2: number, o: { c?: string; w?: number; dash?: boolean; arrow?: boolean } = {}) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${o.c ?? INK}" stroke-width="${o.w ?? 2}"${o.dash ? ' stroke-dasharray="5 4"' : ''}${o.arrow ? ' marker-end="url(#qa)"' : ''} stroke-linecap="round"/>`;
export const poly = (pts: [number, number][], o: { c?: string; fill?: string; closed?: boolean; dash?: boolean } = {}) =>
  `<${o.closed === false ? 'polyline' : 'polygon'} points="${pts.map(([x, y]) => `${f(x)},${f(y)}`).join(' ')}" fill="${o.fill ?? 'none'}" stroke="${o.c ?? INK}" stroke-width="2"${o.dash ? ' stroke-dasharray="5 4"' : ''} stroke-linejoin="round"/>`;
export const circle = (cx: number, cy: number, r: number, o: { c?: string; fill?: string; dash?: boolean } = {}) =>
  `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${o.fill ?? 'none'}" stroke="${o.c ?? INK}" stroke-width="2"${o.dash ? ' stroke-dasharray="5 4"' : ''}/>`;
export const ellipse = (cx: number, cy: number, rx: number, ry: number, o: { c?: string; dash?: boolean; half?: 'top' | 'bottom' } = {}) => {
  if (!o.half) return `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="${o.c ?? INK}" stroke-width="2"${o.dash ? ' stroke-dasharray="5 4"' : ''}/>`;
  const sweep = o.half === 'bottom' ? 0 : 1;
  return `<path d="M${f(cx - rx)} ${f(cy)} A${f(rx)} ${f(ry)} 0 0 ${sweep} ${f(cx + rx)} ${f(cy)}" fill="none" stroke="${o.c ?? INK}" stroke-width="2"${o.dash ? ' stroke-dasharray="5 4"' : ''}/>`;
};
export const text = (x: number, y: number, s: string, o: { c?: string; size?: number; anchor?: 'start' | 'middle' | 'end' } = {}) =>
  `<text x="${f(x)}" y="${f(y)}" fill="${o.c ?? INK}" font-size="${o.size ?? 13}" text-anchor="${o.anchor ?? 'middle'}" dominant-baseline="middle">${esc(s)}</text>`;
export const dot = (x: number, y: number, c = INK) => `<circle cx="${f(x)}" cy="${f(y)}" r="3" fill="${c}"/>`;
export const path = (d: string, o: { c?: string; fill?: string; w?: number; dash?: boolean } = {}) =>
  `<path d="${d}" fill="${o.fill ?? 'none'}" stroke="${o.c ?? INK}" stroke-width="${o.w ?? 2}"${o.dash ? ' stroke-dasharray="5 4"' : ''} stroke-linejoin="round"/>`;
/** right-angle mark at corner (x,y) between unit directions u and v */
export function rightMark(x: number, y: number, u: [number, number], v: [number, number], s = 10) {
  return poly([[x + u[0] * s, y + u[1] * s], [x + (u[0] + v[0]) * s, y + (u[1] + v[1]) * s], [x + v[0] * s, y + v[1] * s]], { closed: false });
}
const unit = (ax: number, ay: number, bx: number, by: number): [number, number] => {
  const l = Math.hypot(bx - ax, by - ay) || 1;
  return [(bx - ax) / l, (by - ay) / l];
};
/** label at the midpoint of a segment, pushed outward by `off` px (perpendicular, left side) */
export function midLabel(ax: number, ay: number, bx: number, by: number, s: string, off = 12, c = BLUE) {
  const [ux, uy] = unit(ax, ay, bx, by);
  return text((ax + bx) / 2 - uy * off, (ay + by) / 2 + ux * off, s, { c });
}
export const C = { INK, BLUE, ORANGE, GREEN };

/* ----------------------------- geometry figures ----------------------------- */

/** two intersecting lines with adjacent angles α (smaller) and β */
export function adjacentAngles(small: number): string {
  const a = (small * Math.PI) / 180;
  const cx = 150, cy = 100, L = 110;
  return svg(300, 200,
    line(cx - L, cy, cx + L, cy) +
      line(cx - Math.cos(a) * 90, cy + Math.sin(a) * 90, cx + Math.cos(a) * 90, cy - Math.sin(a) * 90) +
      path(`M${cx + 30} ${cy} A30 30 0 0 0 ${cx + 30 * Math.cos(a)} ${cy - 30 * Math.sin(a)}`, { c: BLUE }) +
      path(`M${cx + 22 * Math.cos(a)} ${cy - 22 * Math.sin(a)} A22 22 0 0 0 ${cx - 22} ${cy}`, { c: ORANGE }) +
      text(cx + 48 * Math.cos(a / 2), cy - 48 * Math.sin(a / 2), 'α', { c: BLUE }) +
      text(cx + 40 * Math.cos((a + Math.PI) / 2), cy - 40 * Math.sin((a + Math.PI) / 2), 'β', { c: ORANGE }));
}
export function regularPolygon(n: number): string {
  const pts: [number, number][] = Array.from({ length: n }, (_, i) => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [150 + 80 * Math.cos(t), 100 + 80 * Math.sin(t)];
  });
  return svg(300, 200, poly(pts) + pts.map(([x, y]) => dot(x, y)).join(''));
}
/** isosceles triangle ABC (AB = BC) with median BD */
export function isoMedian(bd: string): string {
  const A: [number, number] = [50, 170], Cc: [number, number] = [250, 170], B: [number, number] = [150, 30], D: [number, number] = [150, 170];
  return svg(300, 200,
    poly([A, B, Cc]) + line(B[0], B[1], D[0], D[1], { c: BLUE }) + rightMark(150, 170, [0, -1], [1, 0]) +
      text(A[0] - 10, A[1] + 8, 'A') + text(B[0], B[1] - 12, 'B') + text(Cc[0] + 10, Cc[1] + 8, 'C') + text(D[0], D[1] + 14, 'D') +
      text(162, 100, bd, { c: BLUE, anchor: 'start' }));
}
/** right triangle with legs a (vertical), b (horizontal); optional altitude to hypotenuse */
export function rightTriangle(a: string, b: string, o: { c?: string; altitude?: boolean } = {}): string {
  const P: [number, number] = [60, 170], Q: [number, number] = [60, 40], Rr: [number, number] = [250, 170];
  let body = poly([P, Q, Rr]) + rightMark(60, 170, [0, -1], [1, 0], 12) + midLabel(P[0], P[1], Q[0], Q[1], a, -16) + midLabel(P[0], P[1], Rr[0], Rr[1], b, -14);
  if (o.c) body += midLabel(Q[0], Q[1], Rr[0], Rr[1], o.c, -14, ORANGE);
  if (o.altitude) {
    const [ux, uy] = unit(Q[0], Q[1], Rr[0], Rr[1]);
    const t = (P[0] - Q[0]) * ux + (P[1] - Q[1]) * uy;
    const H: [number, number] = [Q[0] + ux * t, Q[1] + uy * t];
    body += line(P[0], P[1], H[0], H[1], { c: ORANGE, dash: true }) + text((P[0] + H[0]) / 2 + 8, (P[1] + H[1]) / 2 + 2, 'h', { c: ORANGE });
  }
  return svg(300, 200, body);
}
/** circle split into three arcs p:q:r with the inscribed triangle */
export function arcTriangle(p: number, q: number, r: number): string {
  const s = p + q + r;
  const t0 = -Math.PI / 2;
  const ang = [t0, t0 + (2 * Math.PI * p) / s, t0 + (2 * Math.PI * (p + q)) / s];
  const pts = ang.map((t) => [150 + 80 * Math.cos(t), 100 + 80 * Math.sin(t)] as [number, number]);
  const mids = [ (ang[0] + ang[1]) / 2, (ang[1] + ang[2]) / 2, (ang[2] + ang[0] + 2 * Math.PI) / 2 ];
  const labs = [p, q, r];
  return svg(300, 200, circle(150, 100, 80) + poly(pts, { c: BLUE }) + pts.map(([x, y]) => dot(x, y)).join('') + mids.map((t, i) => text(150 + 96 * Math.cos(t), 100 + 96 * Math.sin(t), `${labs[i]}k`, { c: ORANGE, size: 12 })).join(''));
}
export function trapezoid(a: string, b: string, h: string): string {
  return svg(300, 200,
    poly([[40, 165], [260, 165], [200, 45], [100, 45]]) + line(130, 45, 130, 165, { c: ORANGE, dash: true }) + rightMark(130, 165, [0, -1], [1, 0], 8) +
      text(150, 32, a, { c: BLUE }) + text(150, 182, b, { c: BLUE }) + text(140, 105, h, { c: ORANGE, anchor: 'start' }));
}
export function chord(R: string, d: string): string {
  const cx = 150, cy = 105, r = 85;
  const y = cy + 45;
  const hx = Math.sqrt(r * r - 45 * 45);
  return svg(300, 210,
    circle(cx, cy, r) + dot(cx, cy) + line(cx - hx, y, cx + hx, y, { c: BLUE }) + line(cx, cy, cx, y, { c: ORANGE, dash: true }) + line(cx, cy, cx + hx, y) +
      rightMark(cx, y, [0, -1], [1, 0], 8) + text(cx - 8, cy - 8, 'O') + text(cx - 12, (cy + y) / 2, d, { c: ORANGE, anchor: 'end' }) + midLabel(cx, cy, cx + hx, y, R, -12, INK));
}
/** segment AB above a plane, perpendiculars AA₁, BB₁ and a division point */
export function segmentPlane(p: string, q: string, m: number, n: number): string {
  const A: [number, number] = [90, 60], B: [number, number] = [230, 25];
  const A1: [number, number] = [90, 150], B1: [number, number] = [230, 150];
  const k = m / (m + n);
  const M: [number, number] = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
  return svg(300, 200,
    poly([[30, 130], [250, 130], [290, 175], [70, 175]], { c: '#8EA3B5' }) + line(A[0], A[1], B[0], B[1]) +
      line(A[0], A[1], A1[0], A1[1], { c: BLUE, dash: true }) + line(B[0], B[1], B1[0], B1[1], { c: BLUE, dash: true }) + line(M[0], M[1], M[0], 150, { c: ORANGE, dash: true }) +
      dot(A[0], A[1]) + dot(B[0], B[1]) + dot(M[0], M[1], ORANGE) + text(A[0] - 12, A[1] - 6, 'A') + text(B[0] + 12, B[1] - 4, 'B') + text(M[0], M[1] - 12, 'M', { c: ORANGE }) +
      text(A[0] - 14, 105, p, { c: BLUE, anchor: 'end' }) + text(B[0] + 8, 90, q, { c: BLUE, anchor: 'start' }) + text(270, 188, 'α', { c: '#8EA3B5' }));
}
export function vectors(theta: number): string {
  const a = (theta * Math.PI) / 180;
  const O: [number, number] = [theta > 90 ? 130 : 70, 160];
  return svg(300, 200,
    line(O[0], O[1], O[0] + (theta > 90 ? 140 : 190), O[1], { arrow: true, c: BLUE }) + line(O[0], O[1], O[0] + 120 * Math.cos(a), O[1] - 120 * Math.sin(a), { arrow: true, c: ORANGE }) +
      path(`M${O[0] + 34} ${O[1]} A34 34 0 0 0 ${O[0] + 34 * Math.cos(a)} ${O[1] - 34 * Math.sin(a)}`) +
      text(O[0] + (theta > 90 ? 150 : 200), O[1] + 14, 'a', { c: BLUE, size: 15 }) + text(O[0] + 132 * Math.cos(a), O[1] - 132 * Math.sin(a), 'b', { c: ORANGE, size: 15 }) +
      text(O[0] + 52 * Math.cos(a / 2), O[1] - 52 * Math.sin(a / 2), `${theta}°`, { size: 12 }));
}
export function cone(r: string, h: string, l?: string): string {
  return svg(300, 210,
    ellipse(150, 170, 80, 20, { half: 'bottom' }) + ellipse(150, 170, 80, 20, { half: 'top', dash: true }) + line(70, 170, 150, 30) + line(230, 170, 150, 30) +
      line(150, 30, 150, 170, { c: ORANGE, dash: true }) + line(150, 170, 230, 170, { c: BLUE, dash: true }) + rightMark(150, 170, [0, -1], [1, 0], 8) +
      text(158, 100, h, { c: ORANGE, anchor: 'start' }) + text(190, 183, r, { c: BLUE }) + (l ? midLabel(70, 170, 150, 30, l, 14, INK) : ''));
}
export function cylinder(r: string, h: string, square?: boolean): string {
  let body =
    ellipse(150, 40, 70, 18) + ellipse(150, 170, 70, 18, { half: 'bottom' }) + ellipse(150, 170, 70, 18, { half: 'top', dash: true }) + line(80, 40, 80, 170) + line(220, 40, 220, 170) +
    line(150, 40, 220, 40, { c: BLUE, dash: true }) + text(185, 30, r, { c: BLUE }) + line(232, 40, 232, 170, { c: ORANGE }) + text(240, 105, h, { c: ORANGE, anchor: 'start' });
  if (square) body += poly([[101, 27], [199, 27], [199, 53], [101, 53]], { c: GREEN }) + line(101, 53, 101, 183, { c: GREEN, dash: true }) + line(199, 53, 199, 183, { c: GREEN, dash: true });
  return svg(300, 200, body);
}
export function sphere(r: string): string {
  return svg(300, 200, circle(150, 100, 80) + ellipse(150, 100, 80, 20, { half: 'bottom' }) + ellipse(150, 100, 80, 20, { half: 'top', dash: true }) + dot(150, 100) + line(150, 100, 230, 100, { c: BLUE }) + text(190, 90, r, { c: BLUE }));
}
export function box(a: string, b: string, c: string, diag = false): string {
  const F = [[60, 80], [200, 80], [200, 170], [60, 170]] as [number, number][];
  const d = [50, -40];
  const Bk = F.map(([x, y]) => [x + d[0], y + d[1]] as [number, number]);
  return svg(300, 200,
    poly(F) + line(Bk[0][0], Bk[0][1], Bk[1][0], Bk[1][1]) + line(Bk[1][0], Bk[1][1], Bk[2][0], Bk[2][1]) + line(F[0][0], F[0][1], Bk[0][0], Bk[0][1]) + line(F[1][0], F[1][1], Bk[1][0], Bk[1][1]) + line(F[2][0], F[2][1], Bk[2][0], Bk[2][1]) +
      line(F[3][0], F[3][1], Bk[3][0], Bk[3][1], { dash: true }) + line(Bk[3][0], Bk[3][1], Bk[0][0], Bk[0][1], { dash: true }) + line(Bk[3][0], Bk[3][1], Bk[2][0], Bk[2][1], { dash: true }) +
      (diag ? line(F[3][0], F[3][1], Bk[1][0], Bk[1][1], { c: ORANGE }) : '') +
      text(130, 185, a, { c: BLUE }) + text(212, 135, b, { c: BLUE, anchor: 'start' }) + text(235, 145, '', {}) + text(222, 64, c, { c: BLUE, anchor: 'start' }));
}
export function rhombus(d1: string, d2: string): string {
  return svg(300, 200,
    poly([[150, 20], [260, 100], [150, 180], [40, 100]]) + line(150, 20, 150, 180, { c: ORANGE, dash: true }) + line(40, 100, 260, 100, { c: BLUE, dash: true }) + rightMark(150, 100, [0, -1], [1, 0], 8) +
      text(160, 55, d1, { c: ORANGE, anchor: 'start' }) + text(205, 90, d2, { c: BLUE }));
}
/** right triangle on axes O(0;0), A(p;0), B(0;q) with its incircle */
export function axesTriangle(p: number, q: number): string {
  const s = 150 / Math.max(p, q);
  const O: [number, number] = [50, 170];
  const A: [number, number] = [O[0] + p * s, O[1]], B: [number, number] = [O[0], O[1] - q * s];
  const c = Math.hypot(p, q);
  const r = ((p + q - c) / 2) * s;
  return svg(300, 200,
    line(30, O[1], 285, O[1], { arrow: true, c: '#8EA3B5' }) + line(O[0], 190, O[0], 12, { arrow: true, c: '#8EA3B5' }) + poly([O, A, B]) + circle(O[0] + r, O[1] - r, r, { c: BLUE }) +
      text(O[0] - 10, O[1] + 12, 'O') + text(A[0], O[1] + 14, `A(${p}; 0)`, { size: 12 }) + text(O[0] + 8, B[1], `B(0; ${q})`, { size: 12, anchor: 'start' }) + text(287, O[1] + 12, 'x', { size: 12 }) + text(O[0] - 10, 16, 'y', { size: 12 }));
}
export function pyramid(a: string, h: string): string {
  const S: [number, number] = [150, 25];
  const P = [[70, 150], [200, 150], [240, 110], [110, 110]] as [number, number][];
  const Oc: [number, number] = [155, 130];
  return svg(300, 200,
    line(P[0][0], P[0][1], P[1][0], P[1][1]) + line(P[1][0], P[1][1], P[2][0], P[2][1]) + line(P[2][0], P[2][1], P[3][0], P[3][1], { dash: true }) + line(P[3][0], P[3][1], P[0][0], P[0][1], { dash: true }) +
      P.map(([x, y], i) => line(S[0], S[1], x, y, { dash: i === 3 })).join('') + line(S[0], S[1], Oc[0], Oc[1], { c: ORANGE, dash: true }) +
      text(135, 168, a, { c: BLUE }) + text(Oc[0] + 8, 80, h, { c: ORANGE, anchor: 'start' }) + text(S[0], S[1] - 10, 'S'));
}
/** riverside plot fenced on three sides */
export function riverPlot(): string {
  return svg(300, 180,
    path('M10 30 Q75 15 150 30 T290 30', { c: BLUE, w: 3 }) + text(150, 14, 'daryo', { c: BLUE, size: 12 }) + poly([[70, 40], [70, 150], [230, 150], [230, 40]], { closed: false, c: ORANGE }) +
      text(58, 95, 'x', { c: ORANGE }) + text(242, 95, 'x', { c: ORANGE }) + text(150, 166, 'L − 2x', { c: ORANGE }));
}

/* ------------------------------- graphs ------------------------------- */
type Axes = { x0: number; y0: number; sx: number; sy: number };
function axes(xmax: number, ymax: number, xl: string, yl: string, xt: number[], yt: number[], ymin = 0): { body: string; ax: Axes } {
  const W = 300, H = 200, L = 40, B = 170, T = 20, Rm = 280;
  const sx = (Rm - L) / xmax;
  const sy = (B - T) / (ymax - ymin);
  const y0 = B + ymin * sy;
  let body = line(L, B + 4, L, T - 8, { arrow: true, w: 1.6 }) + line(L - 4, y0, Rm + 10, y0, { arrow: true, w: 1.6 });
  body += text(Rm + 12, y0 + 14, xl, { size: 11, anchor: 'end' }) + text(L + 6, T - 10, yl, { size: 11, anchor: 'start' });
  for (const v of xt) body += line(L + v * sx, y0 - 3, L + v * sx, y0 + 3, { w: 1.2 }) + text(L + v * sx, y0 + 13, String(v), { size: 10 });
  for (const v of yt) body += line(L - 3, y0 - v * sy, L + 3, y0 - v * sy, { w: 1.2 }) + text(L - 6, y0 - v * sy, String(v), { size: 10, anchor: 'end' }) + line(L, y0 - v * sy, Rm, y0 - v * sy, { c: '#E3E8EE', w: 1 });
  void W;
  void H;
  return { body, ax: { x0: L, y0, sx, sy } };
}
/** v(t) graph: constant v1 until t1, then linear to v2 at t2, then constant */
export function velocityGraph(t1: number, t2: number, v1: number, v2: number): string {
  const tmax = t2 + 10;
  const vmax = Math.max(v1, v2) + 10;
  const { body, ax } = axes(tmax, vmax, 't, s', 'v, m/s', Array.from({ length: Math.floor(tmax / 10) }, (_, i) => (i + 1) * 10), Array.from({ length: Math.floor(vmax / 10) }, (_, i) => (i + 1) * 10));
  const X = (t: number) => ax.x0 + t * ax.sx;
  const Y = (v: number) => ax.y0 - v * ax.sy;
  return svg(300, 200,
    body + poly([[X(0), Y(v1)], [X(t1), Y(v1)], [X(t2), Y(v2)], [X(tmax - 2), Y(v2)]], { closed: false, c: BLUE }) +
      line(X(t1), Y(v1), X(t1), ax.y0, { dash: true, w: 1.2 }) + line(X(t2), Y(v2), X(t2), ax.y0, { dash: true, w: 1.2 }) +
      text(X(t1), Y(v1) - 10, 'B', { c: ORANGE }) + text(X(t2), Y(v2) - 10, 'C', { c: ORANGE }));
}
export function parabolaGraph(h: number, k: number, c0: number): string {
  const m = Math.sqrt(k);
  const xs = [h - m - 1, h + m + 1];
  const W = 300, H = 210;
  const xmin = Math.min(xs[0], -1), xmax = Math.max(xs[1], 1);
  const ymin = Math.min(c0, 0) - 2, ymax = k + 2;
  const sx = 240 / (xmax - xmin), sy = 170 / (ymax - ymin);
  const X = (x: number) => 30 + (x - xmin) * sx;
  const Y = (y: number) => 20 + (ymax - y) * sy;
  let d = '';
  for (let i = 0; i <= 60; i++) {
    const x = xs[0] + ((xs[1] - xs[0]) * i) / 60;
    const y = -((x - h) ** 2) + k;
    d += `${i ? 'L' : 'M'}${f(X(x))} ${f(Y(y))}`;
  }
  return svg(W, H,
    line(20, Y(0), 285, Y(0), { arrow: true, w: 1.6 }) + line(X(0), 200, X(0), 10, { arrow: true, w: 1.6 }) + path(d, { c: BLUE }) +
      dot(X(h), Y(k), ORANGE) + text(X(h) + 6, Y(k) - 10, 'B', { c: ORANGE, anchor: 'start' }) + dot(X(0), Y(c0)) + text(X(0) - 8, Y(c0), 'A', { anchor: 'end' }) +
      dot(X(h - m), Y(0)) + dot(X(h + m), Y(0)) + text(X(h - m), Y(0) + 14, 'x₁', { size: 12 }) + text(X(h + m), Y(0) + 14, 'x₂', { size: 12 }) + text(286, Y(0) + 12, 'x', { size: 12 }) + text(X(0) + 8, 14, 'y', { size: 12, anchor: 'start' }));
}
/** y = a·x² and y = b·x with the enclosed region shaded */
export function areaGraph(a: number, b: number): string {
  const x1 = b / a;
  const ymax = b * x1;
  const sx = 200 / (x1 * 1.25), sy = 160 / (ymax * 1.15);
  const X = (x: number) => 50 + x * sx;
  const Y = (y: number) => 180 - y * sy;
  let curve = '';
  let region = `M${X(0)} ${Y(0)}`;
  for (let i = 0; i <= 40; i++) {
    const x = (x1 * 1.18 * i) / 40 - x1 * 0.12;
    curve += `${i ? 'L' : 'M'}${f(X(x))} ${f(Y(a * x * x))}`;
  }
  for (let i = 0; i <= 30; i++) {
    const x = (x1 * i) / 30;
    region += ` L${f(X(x))} ${f(Y(a * x * x))}`;
  }
  region += ' Z';
  return svg(300, 200,
    line(30, Y(0), 290, Y(0), { arrow: true, w: 1.6 }) + line(X(0), 195, X(0), 8, { arrow: true, w: 1.6 }) + path(region, { fill: 'rgba(31,167,224,0.18)', c: 'none' }) +
      path(curve, { c: BLUE }) + line(X(-x1 * 0.1), Y(-b * x1 * 0.1), X(x1 * 1.15), Y(b * x1 * 1.15), { c: ORANGE }) + text(X(x1 * 1.15) - 4, Y(b * x1 * 1.15) + 14, `y = ${b}x`, { c: ORANGE, size: 12, anchor: 'end' }) +
      text(X(x1 * 0.55), Y(a * (x1 * 0.55) ** 2) + 14, `y = ${a === 1 ? '' : a}x²`, { c: BLUE, size: 12, anchor: 'start' }));
}

/* ------------------------------ physics schemes ------------------------------ */
function resistor(x: number, y: number, label: string, vertical = false): string {
  return vertical
    ? `<rect x="${x - 7}" y="${y - 18}" width="14" height="36" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(x + 12, y, label, { c: BLUE, size: 12, anchor: 'start' })
    : `<rect x="${x - 18}" y="${y - 7}" width="36" height="14" fill="#fff" stroke="${INK}" stroke-width="2"/>` + text(x, y - 16, label, { c: BLUE, size: 12 });
}
function battery(x: number, y: number, label: string): string {
  return line(x - 4, y - 14, x - 4, y + 14, { w: 2.5 }) + line(x + 4, y - 8, x + 4, y + 8, { w: 4 }) + text(x, y + 26, label, { c: ORANGE, size: 12 });
}
/** R1 in series with two equal parallel resistors, source U */
export function mixedCircuit(r1: string, r2: string, u: string): string {
  const body =
    line(40, 50, 100, 50) + resistor(120, 50, r1) + line(138, 50, 190, 50) + line(190, 30, 190, 70) + line(190, 30, 210, 30) + line(190, 70, 210, 70) +
    resistor(228, 30, r2) + resistor(228, 70, r2) + line(246, 30, 266, 30) + line(246, 70, 266, 70) + line(266, 30, 266, 70) + line(266, 50, 280, 50) +
    line(280, 50, 280, 150) + line(280, 150, 154, 150) + battery(150, 150, u) + line(146, 150, 40, 150) + line(40, 150, 40, 50) + dot(190, 50) + dot(266, 50);
  return svg(300, 190, body);
}
function coil(x: number, y: number, label: string): string {
  let d = `M${x - 20} ${y}`;
  for (let i = 0; i < 4; i++) d += ` a5 6 0 0 1 10 0`;
  return path(d) + text(x, y - 16, label, { c: BLUE, size: 12 });
}
function capacitor(x: number, y: number, label: string): string {
  return `<rect x="${x - 6}" y="${y - 14}" width="12" height="28" fill="#fff" stroke="none"/>` + line(x - 4, y - 12, x - 4, y + 12, { w: 2.5 }) + line(x + 4, y - 12, x + 4, y + 12, { w: 2.5 }) + text(x, y - 22, label, { c: BLUE, size: 12 });
}
export function rlcCircuit(r: string, l: string, c: string, u: string): string {
  return svg(300, 170,
    line(30, 50, 270, 50) + resistor(80, 50, r) + coil(155, 50, l) + capacitor(225, 50, c) + line(270, 50, 270, 130) + line(270, 130, 30, 130) + line(30, 130, 30, 50) +
      circle(150, 130, 14, { fill: '#fff' }) + text(150, 131, '∼', { size: 16 }) + text(150, 156, u, { c: ORANGE, size: 12 }));
}
/** converging (F > 0) lens with object at distance d */
export function lensScheme(dLabel: string, F: string, diverging = false): string {
  const lx = 170, ay = 110;
  const lens = diverging
    ? line(lx, 30, lx, 190, { c: BLUE }) + path(`M${lx - 8} 22 L${lx} 30 L${lx + 8} 22 M${lx - 8} 198 L${lx} 190 L${lx + 8} 198`, { c: BLUE })
    : line(lx, 30, lx, 190, { c: BLUE }) + path(`M${lx - 8} 38 L${lx} 30 L${lx + 8} 38 M${lx - 8} 182 L${lx} 190 L${lx + 8} 182`, { c: BLUE });
  return svg(300, 210,
    line(10, ay, 290, ay, { w: 1.4, dash: true }) + lens + line(60, ay, 60, 62, { c: ORANGE, arrow: true }) + dot(120, ay) + dot(220, ay) + text(120, ay + 14, 'F', { size: 12 }) + text(220, ay + 14, 'F', { size: 12 }) +
      line(60, ay + 30, lx, ay + 30, { w: 1.2 }) + text(115, ay + 42, dLabel, { c: ORANGE, size: 12 }) + text(lx + 10, 40, F, { c: BLUE, size: 12, anchor: 'start' }));
}
/** Atwood machine: fixed pulley, two masses */
export function atwood(m1: string, m2: string): string {
  return svg(300, 210,
    line(90, 15, 210, 15, { w: 3 }) + line(150, 15, 150, 50) + circle(150, 60, 22) + dot(150, 60) + line(128, 60, 128, 150) + line(172, 60, 172, 110) +
      `<rect x="108" y="150" width="40" height="40" fill="rgba(243,154,31,0.2)" stroke="${INK}" stroke-width="2"/>` + `<rect x="157" y="110" width="30" height="30" fill="rgba(31,167,224,0.2)" stroke="${INK}" stroke-width="2"/>` +
      text(128, 170, m1, { size: 12 }) + text(172, 125, m2, { size: 12 }));
}
export function verticalThrow(v: string): string {
  return svg(300, 200, line(20, 180, 280, 180, { w: 3, c: '#8EA3B5' }) + circle(150, 165, 10, { fill: 'rgba(243,154,31,0.3)' }) + line(150, 150, 150, 40, { arrow: true, c: ORANGE }) + text(162, 95, v, { c: ORANGE, anchor: 'start' }) + line(120, 30, 180, 30, { dash: true, w: 1.2 }) + text(190, 30, 'h max', { size: 12, anchor: 'start' }));
}
