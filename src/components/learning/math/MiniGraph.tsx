'use client';

/**
 * Small coordinate-plane renderer shared by the math widgets (GraphTap,
 * GraphChoose). Everything is in axis units; curves are smoothed with a
 * Catmull-Rom spline so a handful of points gives a clean line.
 */

export type GraphSpec = {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  /** each curve is a list of [x, y] points in order */
  curves?: { points: [number, number][]; color?: string; dashed?: boolean }[];
  /** hollow points (removed values) */
  holes?: [number, number][];
  /** filled points */
  dots?: [number, number][];
  /** dashed vertical guide lines at these x values */
  vlines?: number[];
  xlabel?: string;
  ylabel?: string;
};

const PAD = 7;
export const GW = 100;
export const GH = 70;

export function graphMap(g: GraphSpec) {
  const sx = (x: number) => PAD + ((x - g.xmin) / (g.xmax - g.xmin)) * (GW - 2 * PAD);
  const sy = (y: number) => GH - PAD - ((y - g.ymin) / (g.ymax - g.ymin)) * (GH - 2 * PAD);
  const ix = (px: number) => g.xmin + ((px - PAD) / (GW - 2 * PAD)) * (g.xmax - g.xmin);
  const iy = (py: number) => g.ymin + ((GH - PAD - py) / (GH - 2 * PAD)) * (g.ymax - g.ymin);
  return { sx, sy, ix, iy };
}

function niceStep(range: number) {
  const p = 10 ** Math.floor(Math.log10(range / 6));
  return [1, 2, 5, 10].map((m) => m * p).find((s) => range / s <= 7) ?? p * 10;
}

function smooth(pts: { x: number; y: number }[]) {
  const f = (n: number) => n.toFixed(2);
  const d = [`M ${f(pts[0].x)} ${f(pts[0].y)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d.push(`C ${f(p1.x + (p2.x - p0.x) / 6)} ${f(p1.y + (p2.y - p0.y) / 6)} ${f(p2.x - (p3.x - p1.x) / 6)} ${f(p2.y - (p3.y - p1.y) / 6)} ${f(p2.x)} ${f(p2.y)}`);
  }
  return d.join(' ');
}

export default function MiniGraph({ g, children, id }: { g: GraphSpec; children?: React.ReactNode; id: string }) {
  const { sx, sy } = graphMap(g);
  const sxStep = niceStep(g.xmax - g.xmin);
  const syStep = niceStep(g.ymax - g.ymin);
  const xs: number[] = [];
  for (let v = Math.ceil(g.xmin / sxStep) * sxStep; v <= g.xmax + 1e-9; v += sxStep) xs.push(+v.toFixed(6));
  const ys: number[] = [];
  for (let v = Math.ceil(g.ymin / syStep) * syStep; v <= g.ymax + 1e-9; v += syStep) ys.push(+v.toFixed(6));
  const ox = sx(Math.min(Math.max(0, g.xmin), g.xmax));
  const oy = sy(Math.min(Math.max(0, g.ymin), g.ymax));
  const lbl = (v: number) => String(v).replace('.', ',');
  return (
    <>
      <defs>
        <clipPath id={`mg-${id}`}>
          <rect x={PAD} y={PAD - 2} width={GW - 2 * PAD} height={GH - 2 * PAD + 2} />
        </clipPath>
        <marker id={`mga-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#1f2937" />
        </marker>
      </defs>
      {xs.map((v) => (
        <line key={`gx${v}`} x1={sx(v)} x2={sx(v)} y1={PAD} y2={GH - PAD} stroke="#e5ecf5" strokeWidth={0.25} />
      ))}
      {ys.map((v) => (
        <line key={`gy${v}`} x1={PAD} x2={GW - PAD} y1={sy(v)} y2={sy(v)} stroke="#e5ecf5" strokeWidth={0.25} />
      ))}
      <line x1={PAD} x2={GW - PAD + 2} y1={oy} y2={oy} stroke="#1f2937" strokeWidth={0.45} markerEnd={`url(#mga-${id})`} />
      <line x1={ox} x2={ox} y1={GH - PAD} y2={PAD - 3} stroke="#1f2937" strokeWidth={0.45} markerEnd={`url(#mga-${id})`} />
      {xs.map((v) =>
        v === 0 ? null : (
          <text key={`tx${v}`} x={sx(v)} y={oy + 3.6} textAnchor="middle" fontSize={2.9} fill="#64748b">
            {lbl(v)}
          </text>
        )
      )}
      {ys.map((v) =>
        v === 0 ? null : (
          <text key={`ty${v}`} x={ox - 1.2} y={sy(v) + 1} textAnchor="end" fontSize={2.9} fill="#64748b">
            {lbl(v)}
          </text>
        )
      )}
      {g.xlabel && (
        <text x={GW - PAD + 1} y={oy - 1.8} textAnchor="end" fontSize={3.6} fontWeight={700} fill="#1f2937">
          {g.xlabel}
        </text>
      )}
      {g.ylabel && (
        <text x={ox + 1.8} y={PAD - 1} fontSize={3.6} fontWeight={700} fill="#1f2937">
          {g.ylabel}
        </text>
      )}
      {(g.vlines ?? []).map((v) => (
        <line key={`v${v}`} x1={sx(v)} x2={sx(v)} y1={PAD} y2={GH - PAD} stroke="#ec4899" strokeWidth={0.4} strokeDasharray="1.2 1" />
      ))}
      <g clipPath={`url(#mg-${id})`}>
        {(g.curves ?? []).map((c, i) => (
          <path
            key={i}
            d={smooth(c.points.map(([x, y]) => ({ x: sx(x), y: sy(y) })))}
            fill="none"
            stroke={c.color ?? '#db2777'}
            strokeWidth={0.8}
            strokeLinecap="round"
            strokeDasharray={c.dashed ? '1.5 1.2' : undefined}
          />
        ))}
      </g>
      {(g.dots ?? []).map(([x, y], i) => (
        <circle key={`d${i}`} cx={sx(x)} cy={sy(y)} r={1.2} fill="#db2777" />
      ))}
      {(g.holes ?? []).map(([x, y], i) => (
        <circle key={`h${i}`} cx={sx(x)} cy={sy(y)} r={1.3} fill="#fff" stroke="#db2777" strokeWidth={0.5} />
      ))}
      {children}
    </>
  );
}
