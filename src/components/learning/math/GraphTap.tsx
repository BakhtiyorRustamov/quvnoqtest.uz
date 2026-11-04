'use client';

import { useId, useRef, useState } from 'react';
import MiniGraph, { GH, GW, graphMap, type GraphSpec } from './MiniGraph';
import { Feedback } from './NumberAnswer';
import { ms } from './strings';

/**
 * GraphTap — tap a place on a graph (e.g. "where is the removed point?",
 * "where does the curve rise fastest?"). Correct when the tap lands within
 * `radius` (axis units) of the target; `only: 'x'` checks the x value only.
 *
 * Props: { graph: GraphSpec, target: [x, y], radius?: number, only?: 'x',
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function GraphTap({
  graph,
  target,
  radius = 0.6,
  only,
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  graph: GraphSpec;
  target: [number, number];
  radius?: number;
  only?: 'x';
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ms(lang);
  const id = useId().replace(/:/g, '');
  const svg = useRef<SVGSVGElement | null>(null);
  const [taps, setTaps] = useState<{ x: number; y: number; ok: boolean }[]>([]);
  const [state, setState] = useState<'idle' | 'wrong' | 'right' | 'shown'>('idle');
  const { sx, sy, ix, iy } = graphMap(graph);
  const done = state === 'right' || state === 'shown';

  function tap(e: React.PointerEvent<SVGSVGElement>) {
    if (done || !svg.current) return;
    const r = svg.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * GW;
    const py = ((e.clientY - r.top) / r.height) * GH;
    const x = ix(px);
    const y = iy(py);
    // distance measured in axis units, scaled so both axes count fairly
    const kx = (graph.xmax - graph.xmin) / 10;
    const ky = (graph.ymax - graph.ymin) / 10;
    const d = only === 'x' ? Math.abs(x - target[0]) / kx : Math.hypot((x - target[0]) / kx, (y - target[1]) / ky);
    const ok = d <= radius;
    onAttempt?.(ok);
    setTaps((ts) => [...ts, { x: px, y: py, ok }]);
    if (ok) {
      setState('right');
      onCorrect?.();
    } else setState('wrong');
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-2">
      <p className="text-sm font-bold text-ink/55">{t.tap}</p>
      <svg ref={svg} viewBox={`0 0 ${GW} ${GH}`} className="w-full touch-none select-none rounded-2xl border border-ink/10 bg-white" onPointerDown={tap}>
        <MiniGraph g={graph} id={id}>
          {taps.map((p, i) =>
            p.ok ? (
              <circle key={i} cx={p.x} cy={p.y} r={2.4} fill="none" stroke="#16a34a" strokeWidth={0.7} />
            ) : (
              <g key={i} stroke="#dc2626" strokeWidth={0.6} strokeLinecap="round">
                <line x1={p.x - 1.2} y1={p.y - 1.2} x2={p.x + 1.2} y2={p.y + 1.2} />
                <line x1={p.x + 1.2} y1={p.y - 1.2} x2={p.x - 1.2} y2={p.y + 1.2} />
              </g>
            )
          )}
          {state === 'shown' && <circle cx={sx(target[0])} cy={sy(target[1])} r={2.6} fill="none" stroke="#2563eb" strokeWidth={0.8} />}
        </MiniGraph>
      </svg>
      <Feedback state={state} t={t} />
      {state === 'wrong' && taps.filter((p) => !p.ok).length >= 2 && (
        <button
          type="button"
          className="text-sm font-black text-brand-blue underline"
          onClick={() => {
            setState('shown');
            onCorrect?.();
          }}
        >
          {t.show}
        </button>
      )}
    </div>
  );
}
