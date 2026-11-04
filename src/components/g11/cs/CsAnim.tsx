'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { CsAnim } from './types';

/* ------------------------------------------------------------------ timing */

/** how many ticks an animation has and how long one tick lasts */
export function animTicks(a: CsAnim): { n: number; ms: number } {
  switch (a.type) {
    case 'flow':
      return { n: a.items.length * a.stations.length, ms: 800 };
    case 'bits': {
      const chars = a.text ? [...a.text].length : 1;
      return { n: chars * 10, ms: 260 };
    }
    case 'rle':
      return { n: a.rows.length * 2 + 1, ms: 700 };
    case 'cipher':
      return a.mode === 'caesar' ? { n: [...a.plain].length + 1, ms: 600 } : { n: 6, ms: 1100 };
    case 'form':
      return { n: a.fields.length, ms: 1000 };
    case 'cards':
      return { n: a.items.length, ms: 900 };
    case 'compare':
      return { n: Math.max(a.left.items.length, a.right.items.length) + 1, ms: 800 };
    case 'loop':
      return { n: 26, ms: 280 };
    case 'net':
      return { n: a.together ? Math.max(...a.packets.map((p) => p.path.length)) : a.packets.reduce((s, p) => s + p.path.length, 0), ms: 650 };
    case 'sheet':
      return { n: a.steps.length * 2, ms: 900 };
    case 'db':
      return { n: a.query ? 3 : 1, ms: 1100 };
    case 'tree':
      return { n: a.path.length, ms: 1000 };
    case 'gantt':
      return { n: a.tasks.length + 1, ms: 750 };
    case 'code':
      return { n: a.trace.length, ms: 1000 };
    case 'cycle':
      return { n: a.stages.length, ms: 900 };
    case 'picture':
      return a.mode === 'flipbook' ? { n: 16, ms: Math.round(1000 / (a.fps ?? 4)) } : a.mode === 'morph' || a.mode === 'mask' ? { n: 7, ms: 700 } : { n: 6, ms: 900 };
    case 'merge':
      return { n: (a.keep ?? a.rows.map((_, i) => i)).length + 1, ms: 1500 };
    case 'defrag':
      return { n: defragStates(a.blocks).length, ms: 650 };
    case 'chart':
      return { n: a.values.length + 1, ms: 700 };
    case 'sort':
      return { n: 3, ms: 900 };
    case 'erd':
      return { n: a.entities.length + a.rels.length, ms: 800 };
    case 'timeline':
      return { n: a.tracks.reduce((x, tr) => x + tr.clips.length, 0) + 4, ms: 700 };
    case 'access':
      return a.mode === 'sequential' ? { n: a.keys.indexOf(a.target) + 2, ms: 550 } : { n: 4, ms: 900 };
  }
}

/** swap-by-swap states of a defragmentation (files in order of first appearance, free space at the end) */
export function defragStates(blocks: string): string[] {
  const order = [...new Set([...blocks].filter((c) => c !== '.'))];
  const target = [...order.flatMap((c) => [...blocks].filter((x) => x === c)), ...[...blocks].filter((x) => x === '.')];
  const arr = [...blocks];
  const states = [arr.join('')];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target[i]) continue;
    const j = arr.findIndex((x, k) => k > i && x === target[i]);
    if (j < 0) continue;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    states.push(arr.join(''));
  }
  return states;
}

export const animMs = (a: CsAnim) => {
  const { n, ms } = animTicks(a);
  return n * ms + 300;
};

/** current tick (0 … n); restarts when runId changes; `still` shows the final picture at once */
function useTick(a: CsAnim, runId: number, still: boolean) {
  const { n, ms } = animTicks(a);
  const [t, setT] = useState(still ? n : 0);
  useEffect(() => {
    if (still) {
      setT(n);
      return;
    }
    setT(0);
    let k = 0;
    const id = setInterval(() => {
      k += 1;
      setT(k);
      if (k >= n) clearInterval(id);
    }, ms);
    return () => clearInterval(id);
  }, [runId, n, ms, still]);
  return t;
}

/* ------------------------------------------------------------------ frame */

export default function CsAnimView({ anim, runId, title, still = false }: { anim: CsAnim; runId: number; title?: string; still?: boolean }) {
  const t = useTick(anim, runId, still);
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card">
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-[#f1f5f9] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        {title && <span className="ml-2 truncate text-[13px] font-black text-ink/60">{title}</span>}
      </div>
      <div className="min-h-[250px] p-3 sm:p-4">
        <Body a={anim} t={t} />
      </div>
      <style>{`@keyframes csPop{0%{transform:scale(.6);opacity:0}100%{transform:scale(1);opacity:1}}.cs-pop{animation:csPop .35s ease-out both}
@keyframes csFlip{0%{transform:rotateX(90deg)}100%{transform:rotateX(0)}}.cs-flip{animation:csFlip .3s ease-out both}
@keyframes csDash{to{stroke-dashoffset:-12}}.cs-dash{stroke-dasharray:4 4;animation:csDash .6s linear infinite}`}</style>
    </div>
  );
}

function Body({ a, t }: { a: CsAnim; t: number }) {
  switch (a.type) {
    case 'flow':
      return <Flow a={a} t={t} />;
    case 'bits':
      return <Bits a={a} t={t} />;
    case 'rle':
      return <Rle a={a} t={t} />;
    case 'cipher':
      return a.mode === 'caesar' ? <Caesar a={a} t={t} /> : <Keys a={a} t={t} />;
    case 'form':
      return <Form a={a} t={t} />;
    case 'cards':
      return <Cards a={a} t={t} />;
    case 'compare':
      return <Compare a={a} t={t} />;
    case 'loop':
      return <Loop a={a} t={t} />;
    case 'net':
      return <Net a={a} t={t} />;
    case 'sheet':
      return <Sheet a={a} t={t} />;
    case 'db':
      return <Db a={a} t={t} />;
    case 'tree':
      return <Tree a={a} t={t} />;
    case 'gantt':
      return <Gantt a={a} t={t} />;
    case 'code':
      return <Code a={a} t={t} />;
    case 'cycle':
      return <Cycle a={a} t={t} />;
    case 'picture':
      return <Picture a={a} t={t} />;
    case 'defrag':
      return <Defrag a={a} t={t} />;
    case 'chart':
      return <Chart a={a} t={t} />;
    case 'sort':
      return <SortRows a={a} t={t} />;
    case 'erd':
      return <Erd a={a} t={t} />;
    case 'timeline':
      return <Timeline a={a} t={t} />;
    case 'merge':
      return <Merge a={a} t={t} />;
    case 'access':
      return <Access a={a} t={t} />;
  }
}

const FILE_COLORS = ['#0ea5e9', '#f97316', '#22c55e', '#8b5cf6', '#ef4444', '#eab308'];
function Defrag({ a, t }: { a: Extract<CsAnim, { type: 'defrag' }>; t: number }) {
  const states = defragStates(a.blocks);
  const cur = states[Math.min(Math.max(t, 0), states.length - 1)];
  const order = [...new Set([...a.blocks].filter((c) => c !== '.'))];
  const color = (c: string) => (c === '.' ? '#ffffff' : FILE_COLORS[order.indexOf(c) % FILE_COLORS.length]);
  const pieces = (str: string) => order.reduce((n, c) => n + str.split(new RegExp(`[^${c}]+`)).filter(Boolean).length, 0);
  const done = t >= states.length - 1;
  return (
    <div className="space-y-3">
      <div className="mx-auto grid max-w-[480px] gap-1" style={{ gridTemplateColumns: 'repeat(8, minmax(0, 1fr))' }}>
        {[...cur].map((c, i) => (
          <span key={i} className="grid aspect-square place-items-center rounded-md border border-ink/15 font-mono text-sm font-black text-white transition-colors duration-300" style={{ background: color(c) }}>
            {c === '.' ? '' : c}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2 text-[12.5px] font-bold text-ink/70">
        {order.map((c) => (
          <span key={c} className="flex items-center gap-1">
            <span className="h-3 w-3 rounded" style={{ background: color(c) }} />
            {a.files?.[c] ?? `Fayl ${c}`}
          </span>
        ))}
      </div>
      <p className={`text-center text-[14px] font-black ${done ? 'cs-pop text-[#15803d]' : 'text-ink/60'}`}>
        {done ? `Har bir fayl bir joyda — oʻqish tezlashdi (${pieces(a.blocks)} ➜ ${pieces(cur)} boʻlak)` : `Boʻlaklar: ${pieces(cur)}`}
      </p>
    </div>
  );
}

const Chip = ({ children, tone = 'blue', pop = false, sans = false }: { children: ReactNode; tone?: 'blue' | 'green' | 'red' | 'orange' | 'gray' | 'purple'; pop?: boolean; sans?: boolean }) => {
  const c = { blue: 'bg-[#e0f2fe] text-[#0369a1]', green: 'bg-[#dcfce7] text-[#15803d]', red: 'bg-[#fee2e2] text-[#b91c1c]', orange: 'bg-[#ffedd5] text-[#c2410c]', gray: 'bg-ink/[0.06] text-ink/70', purple: 'bg-[#ede9fe] text-[#6d28d9]' }[tone];
  return <span className={`inline-block rounded-lg px-2 py-0.5 text-[13px] font-bold leading-snug ${sans ? '' : 'font-mono'} ${c} ${pop ? 'cs-pop' : ''}`}>{children}</span>;
};

/* ------------------------------------------------------------------ flow */

function Flow({ a, t }: { a: Extract<CsAnim, { type: 'flow' }>; t: number }) {
  const S = a.stations.length;
  // tick k: item floor(k/S) reaches station k%S
  const reached = (item: number, st: number) => item * S + st < t;
  const active = t > 0 && t <= a.items.length * S ? (t - 1) % S : -1;
  if (S === 2) {
    // two stations: one row per item, so each pair stays side by side
    return (
      <div className="mx-auto max-w-[560px]">
        <div className="mb-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
          {[0, 1].map((i) => (
            <div key={i} className={`flex items-center justify-center gap-1.5 ${i === 1 ? 'col-start-3' : ''}`}>
              <span className="text-2xl" aria-hidden>
                {a.stations[i].icon}
              </span>
              <span className="text-[13px] font-black text-ink">{a.stations[i].label}</span>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          {a.items.map((it, k) => (
            <div key={k} className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 transition ${reached(k, 0) ? 'opacity-100' : 'opacity-0'}`}>
              <div className="rounded-xl border border-ink/10 bg-ink/[0.03] px-2 py-1.5 text-center text-[13.5px] font-bold text-ink">{it.texts[0]}</div>
              <span className={reached(k, 1) ? 'text-[#0ea5e9]' : 'text-ink/20'} aria-hidden>
                ➜
              </span>
              <div className={`rounded-xl px-2 py-1.5 text-center text-[13.5px] font-black transition ${reached(k, 1) ? 'cs-pop bg-[#dcfce7] text-[#15803d]' : 'text-transparent'}`}>{it.texts[1]}</div>
            </div>
          ))}
        </div>
        {a.result && t >= a.items.length * S && <p className="cs-pop mt-3 text-center text-[14.5px] font-black text-[#15803d]">{a.result}</p>}
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-stretch">
        {a.stations.map((st, i) => (
          <div key={i} className="flex min-w-0 flex-1 items-stretch">
            {i > 0 && (
              <span className={`flex w-4 shrink-0 items-center justify-center text-sm sm:w-6 ${i === active ? 'text-[#0ea5e9]' : 'text-ink/25'}`} aria-hidden>
                ➜
              </span>
            )}
            <div className={`flex min-w-0 flex-1 flex-col items-center rounded-xl border-2 p-1.5 text-center transition sm:p-2 ${i === active ? 'border-[#0ea5e9] bg-[#f0f9ff]' : 'border-ink/10'}`}>
              <span className="text-2xl sm:text-3xl" aria-hidden>
                {st.icon}
              </span>
              <span className="mt-1 text-[12px] font-black leading-tight text-ink sm:text-[12.5px]">{st.label}</span>
              <div className="mt-2 flex w-full flex-col items-center gap-1">
                {a.items.map((it, k) =>
                  reached(k, i) ? (
                    <Chip key={k} tone={i === S - 1 ? 'green' : i === 0 ? 'gray' : 'blue'} pop sans>
                      {it.texts[i]}
                    </Chip>
                  ) : null
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {a.result && t >= a.items.length * S && <p className="cs-pop mt-3 text-center text-[14.5px] font-black text-[#15803d]">{a.result}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ bits */

function Bits({ a, t }: { a: Extract<CsAnim, { type: 'bits' }>; t: number }) {
  const items = a.text !== undefined ? [...a.text].map((c) => ({ label: `'${c}'`, code: c.codePointAt(0) ?? 0 })) : [{ label: String(a.number ?? 0), code: a.number ?? 0 }];
  const place = [128, 64, 32, 16, 8, 4, 2, 1];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[repeat(8,minmax(0,1fr))] gap-1 pl-[88px] text-center font-mono text-[10.5px] font-bold text-ink/40 sm:pl-[110px]">
        {place.map((p) => (
          <span key={p}>{p}</span>
        ))}
      </div>
      {items.map((it, r) => {
        const base = r * 10;
        const shown = Math.max(0, Math.min(8, t - base - 1));
        const bits = it.code.toString(2).padStart(8, '0').slice(-8);
        return (
          <div key={r} className={`flex items-center gap-2 transition ${t > base ? 'opacity-100' : 'opacity-25'}`}>
            <div className="w-[80px] shrink-0 text-right sm:w-[102px]">
              <span className="text-2xl font-black text-ink">{it.label}</span>
              {t > base && a.text !== undefined && <span className="cs-pop ml-1 font-mono text-[13px] font-black text-[#0369a1]">= {it.code}</span>}
            </div>
            <div className="grid flex-1 grid-cols-[repeat(8,minmax(0,1fr))] gap-1">
              {[...bits].map((b, i) => (
                <span
                  key={i}
                  className={`grid h-9 place-items-center rounded-md font-mono text-lg font-black ${i < shown ? `cs-flip ${b === '1' ? 'bg-[#0ea5e9] text-white' : 'bg-ink/[0.07] text-ink/50'}` : 'bg-ink/[0.03] text-transparent'}`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      {t >= items.length * 10 && <p className="cs-pop text-center text-[13.5px] font-bold text-ink/60">1 bayt = 8 bit · 1 = yoniq, 0 = oʻchiq</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ rle */

const PX: Record<string, string> = { W: '#ffffff', B: '#1f2937', R: '#ef4444', G: '#22c55e', Y: '#facc15', U: '#3b82f6' };
const runs = (row: string) => {
  const out: { c: string; n: number }[] = [];
  for (const c of row) {
    const last = out[out.length - 1];
    if (last && last.c === c) last.n += 1;
    else out.push({ c, n: 1 });
  }
  return out;
};

function Rle({ a, t }: { a: Extract<CsAnim, { type: 'rle' }>; t: number }) {
  const before = a.rows.reduce((s, r) => s + r.length, 0);
  const after = a.rows.reduce((s, r) => s + runs(r).length * 2, 0);
  return (
    <div className="space-y-1.5">
      {a.rows.map((row, r) => {
        const done = t > r * 2 + 1;
        return (
          <div key={r} className="flex items-center gap-2">
            <div className="flex">
              {[...row].map((c, i) => (
                <span key={i} className="h-5 w-5 border border-ink/15 sm:h-6 sm:w-6" style={{ background: PX[c] ?? '#ccc' }} />
              ))}
            </div>
            <span className={`text-ink/30 transition ${t > r * 2 ? 'opacity-100' : 'opacity-0'}`}>➜</span>
            <div className="flex flex-wrap gap-1">
              {done &&
                runs(row).map((g, i) => (
                  <Chip key={i} tone="purple" pop>
                    {g.n}
                    {g.c}
                  </Chip>
                ))}
            </div>
          </div>
        );
      })}
      {t >= a.rows.length * 2 + 1 && (
        <p className="cs-pop pt-2 text-center text-[14px] font-black text-ink">
          {before} ta qiymat ➜ <span className="text-[#15803d]">{after} ta qiymat</span> (siqildi)
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ cipher */

const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const caesar = (s: string, k: number) =>
  [...s.toUpperCase()].map((c) => (ABC.includes(c) ? ABC[(ABC.indexOf(c) + ((k % 26) + 26)) % 26] : c)).join('');

function Caesar({ a, t }: { a: Extract<CsAnim, { type: 'cipher'; mode: 'caesar' }>; t: number }) {
  const plain = [...a.plain.toUpperCase()];
  const enc = [...caesar(a.plain, a.shift)];
  const cur = Math.min(t - 1, plain.length - 1);
  const curIdx = cur >= 0 ? ABC.indexOf(plain[cur]) : -1;
  return (
    <div className="space-y-3">
      <div className="mx-auto grid max-w-[460px] grid-cols-[repeat(13,minmax(0,1fr))] gap-x-[3px] gap-y-2 font-mono text-[12px] font-black">
        {[...ABC].map((c, i) => (
          <div key={c} className="flex flex-col items-center gap-[2px]">
            <span className={`grid h-6 w-full place-items-center rounded ${i === curIdx ? 'bg-[#0ea5e9] text-white' : 'bg-ink/[0.05] text-ink/60'}`}>{c}</span>
            <span className={`grid h-6 w-full place-items-center rounded ${curIdx >= 0 && i === (curIdx + a.shift) % 26 ? 'bg-[#22c55e] text-white' : 'text-ink/40'}`}>{ABC[(i + a.shift) % 26]}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-[13px] font-bold text-ink/50">kalit: har bir harf {a.shift} ta oʻngga suriladi</p>
      <div className="flex flex-col items-center gap-1 font-mono">
        <div className="flex gap-1">
          {plain.map((c, i) => (
            <span key={i} className={`grid h-9 w-8 place-items-center rounded-lg text-lg font-black ${i === cur ? 'bg-[#e0f2fe] text-[#0369a1]' : 'bg-ink/[0.05] text-ink'}`}>
              {c}
            </span>
          ))}
        </div>
        <span className="text-ink/30">⬇</span>
        <div className="flex gap-1">
          {enc.map((c, i) => (
            <span key={i} className={`grid h-9 w-8 place-items-center rounded-lg text-lg font-black ${i < t ? 'cs-flip bg-[#dcfce7] text-[#15803d]' : 'bg-ink/[0.03] text-transparent'}`}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Keys({ a, t }: { a: Extract<CsAnim, { type: 'cipher'; mode: 'symmetric' | 'asymmetric' }>; t: number }) {
  const sym = a.mode === 'symmetric';
  const steps = sym
    ? ['Ikkalasida bitta umumiy kalit 🔑', 'Yuboruvchi xabarni kalit bilan shifrlaydi', 'Tarmoqda faqat shifrlangan matn ketadi', 'Oʻgʻri ushlasa ham oʻqiy olmaydi', 'Qabul qiluvchi oʻsha kalit bilan ochadi', 'Xabar oʻqildi ✓']
    : ['Qabul qiluvchida ikki kalit: ochiq 🔓 va yopiq 🗝️', 'Ochiq kalit hammaga yuboriladi', 'Yuboruvchi ochiq kalit bilan shifrlaydi', 'Tarmoqda faqat shifrlangan matn ketadi', 'Faqat yopiq kalit ocha oladi', 'Xabar oʻqildi ✓'];
  const pos = t <= 1 ? 0 : t === 2 ? (sym ? 0 : 2) : t === 3 || t === 4 ? 1 : 2;
  const showCipher = t >= 3 && t <= 5;
  const carried = !sym && t === 2 ? '🔓' : showCipher ? '📦' : t >= 6 ? '✉️' : '✉️';
  return (
    <div className="space-y-3">
      <div className="relative flex items-center justify-between px-2">
        <div className="flex flex-col items-center">
          <span className="text-4xl">👩‍💻</span>
          <span className="text-[12px] font-black text-ink/60">Yuboruvchi</span>
          <span className="text-[13px]">{sym ? '🔑' : t >= 2 ? '🔓' : ''}</span>
        </div>
        <div className="relative mx-2 h-12 flex-1">
          <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink/20" />
          <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl transition-all duration-700" style={{ left: `${10 + pos * 40}%` }}>
            {carried}
          </span>
          {t === 4 && <span className="cs-pop absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🕵️</span>}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-4xl">🧑‍💻</span>
          <span className="text-[12px] font-black text-ink/60">Qabul qiluvchi</span>
          <span className="text-[13px]">{sym ? '🔑' : '🔓 🗝️'}</span>
        </div>
      </div>
      <div className="flex justify-center font-mono text-[15px] font-black">
        {showCipher ? <Chip tone="purple">{[...a.secret].join('')}</Chip> : <Chip tone="green">{a.message}</Chip>}
      </div>
      <ol className="space-y-1">
        {steps.slice(0, Math.max(1, t)).map((s, i) => (
          <li key={i} className={`cs-pop text-[14px] font-semibold ${i === t - 1 ? 'text-ink' : 'text-ink/45'}`}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ form */

function Form({ a, t }: { a: Extract<CsAnim, { type: 'form' }>; t: number }) {
  return (
    <div className="mx-auto max-w-md">
      <p className="mb-2 text-center text-[15px] font-black text-ink">{a.title}</p>
      <div className="space-y-2">
        {a.fields.map((f, i) => {
          const done = i < t;
          return (
            <div key={i} className={`rounded-xl border-2 px-3 py-2 transition ${done ? (f.ok ? 'border-[#22c55e] bg-[#f0fdf4]' : 'border-[#ef4444] bg-[#fef2f2]') : i === t ? 'border-[#0ea5e9]' : 'border-ink/10'}`}>
              <div className="flex items-center gap-2">
                <span className="w-[32%] shrink-0 text-[13px] font-black text-ink/60">{f.label}</span>
                <span className="min-w-0 flex-1 break-words font-mono text-[14px] font-bold text-ink sm:text-[15px]">{f.value || '—'}</span>
                <span className="text-lg">{done ? (f.ok ? '✅' : '❌') : i === t ? '⏳' : ''}</span>
              </div>
              {done && (
                <p className={`cs-pop mt-0.5 text-[12.5px] font-bold ${f.ok ? 'text-[#15803d]' : 'text-[#b91c1c]'}`}>
                  {f.check}: {f.note}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ cards / compare */

function Cards({ a, t }: { a: Extract<CsAnim, { type: 'cards' }>; t: number }) {
  const cols = a.cols ?? (a.items.length > 4 ? 3 : 2);
  return (
    <div className={`grid gap-2 ${cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
      {a.items.map((c, i) => (
        <div key={i} className={`rounded-xl border border-ink/10 p-2.5 transition duration-500 ${i < t ? 'cs-pop bg-white' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              {c.icon}
            </span>
            <span className="text-[14.5px] font-black leading-tight text-ink">{c.title}</span>
          </div>
          <p className="mt-1 text-[13px] font-semibold leading-snug text-ink/65">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

function Compare({ a, t }: { a: Extract<CsAnim, { type: 'compare' }>; t: number }) {
  const Col = ({ c, tone }: { c: typeof a.left; tone: string }) => (
    <div className="rounded-xl border-2 p-2.5" style={{ borderColor: tone }}>
      <p className="flex items-center gap-1.5 text-[15px] font-black text-ink">
        <span className="text-2xl">{c.icon}</span>
        {c.title}
      </p>
      <ul className="mt-2 space-y-1.5">
        {c.items.map((x, i) => (
          <li key={i} className={`text-[13.5px] font-semibold leading-snug text-ink/75 ${i < t ? 'cs-pop' : 'opacity-0'}`}>
            • {x}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="grid grid-cols-2 gap-2">
      <Col c={a.left} tone="#0ea5e9" />
      <Col c={a.right} tone="#f97316" />
    </div>
  );
}

/* ------------------------------------------------------------------ loop */

function simulate(a: Extract<CsAnim, { type: 'loop' }>, n: number) {
  const vals: number[] = [a.start];
  const on: boolean[] = [];
  for (let i = 0; i < n; i++) {
    const v = vals[i];
    if (a.monitorOnly) {
      on.push(false);
      vals.push(Math.round((a.start + Math.sin(i / 2.2) * (a.up * 3) + (i % 3) * a.down * 0.3) * 10) / 10);
    } else {
      const heat = v < a.setpoint;
      on.push(heat);
      vals.push(Math.round((v + (heat ? a.up : -a.down)) * 10) / 10);
    }
  }
  return { vals, on };
}

function Loop({ a, t }: { a: Extract<CsAnim, { type: 'loop' }>; t: number }) {
  const N = 26;
  const { vals, on } = simulate(a, N);
  const lo = Math.min(...vals, a.setpoint) - 1;
  const hi = Math.max(...vals, a.setpoint) + 1;
  const X = (i: number) => 4 + (i / N) * 92;
  const Y = (v: number) => 46 - ((v - lo) / (hi - lo)) * 40;
  const cur = vals[Math.min(t, N)];
  const isOn = !a.monitorOnly && cur < a.setpoint;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-center gap-2 text-[13px] font-black">
        <span className="rounded-lg bg-[#e0f2fe] px-2 py-1 text-[#0369a1]">📡 {a.sensor}: {String(cur).replace('.', ',')} {a.unit}</span>
        <span className="text-ink/30">➜</span>
        <span className="rounded-lg bg-ink/[0.06] px-2 py-1 text-ink">🖥️ {a.monitorOnly ? 'yozib boradi' : `${String(cur).replace('.', ',')} < ${a.setpoint}?`}</span>
        {!a.monitorOnly && (
          <>
            <span className="text-ink/30">➜</span>
            <span className={`rounded-lg px-2 py-1 ${isOn ? 'bg-[#fee2e2] text-[#b91c1c]' : 'bg-ink/[0.06] text-ink/50'}`}>⚙️ {a.actuator}: {isOn ? 'YONIQ' : 'OʻCHIQ'}</span>
          </>
        )}
      </div>
      <svg viewBox="0 0 100 50" className="mx-auto w-full max-w-[620px]">
        {!a.monitorOnly && <line x1={4} x2={96} y1={Y(a.setpoint)} y2={Y(a.setpoint)} stroke="#f97316" strokeWidth={0.5} strokeDasharray="2 1.5" />}
        {!a.monitorOnly && (
          <text x={5} y={Y(a.setpoint) - 1.2} fontSize={3} textAnchor="start" fill="#c2410c" fontWeight={700}>
            kerakli: {a.setpoint} {a.unit}
          </text>
        )}
        <polyline fill="none" stroke="#0ea5e9" strokeWidth={0.9} points={vals.slice(0, Math.min(t, N) + 1).map((v, i) => `${X(i)},${Y(v)}`).join(' ')} />
        {vals.slice(0, Math.min(t, N) + 1).map((v, i) => (
          <circle key={i} cx={X(i)} cy={Y(v)} r={0.7} fill={on[i - 1] ? '#ef4444' : '#0ea5e9'} />
        ))}
        <line x1={4} x2={96} y1={47} y2={47} stroke="#cbd5e1" strokeWidth={0.4} />
        <text x={96} y={49.5} fontSize={2.6} textAnchor="end" fill="#64748b">
          vaqt ➜
        </text>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ net */

function Net({ a, t }: { a: Extract<CsAnim, { type: 'net' }>; t: number }) {
  const pos = Object.fromEntries(a.nodes.map((n) => [n.id, n]));
  // one packet at a time (or all together); a packet stays on its last node until the next one starts
  const dots: { k: number; x: number; y: number; color: string; label: string }[] = [];
  let acc = 0;
  const last = a.packets.length - 1;
  a.packets.forEach((p, k) => {
    const start = a.together ? 0 : acc;
    acc += p.path.length;
    const local = t - start;
    if (local < 1) return;
    if (!a.together && k < last && t > acc) return; // the next packet has started
    const n = pos[p.path[Math.min(p.path.length - 1, local - 1)]];
    if (n) dots.push({ k, x: n.x, y: n.y, color: p.color ?? ['#ef4444', '#22c55e', '#8b5cf6', '#f59e0b'][k % 4], label: p.label });
  });
  // broadcast / spreading: nodes a packet has already reached are marked
  const reached = new Set<string>();
  if (a.together) a.packets.forEach((p) => p.path.slice(0, Math.max(0, Math.min(t, p.path.length))).forEach((id) => reached.add(id)));
  const reachColor = a.packets[0]?.color ?? '#ef4444';
  const log = a.together || a.packets.length < 2 ? [] : a.packets.filter((_, k) => a.packets.slice(0, k).reduce((s2, q) => s2 + q.path.length, 0) < t);
  const name = (id: string) => pos[id]?.label ?? id;
  return (
    <div>
    <svg viewBox={`0 -7 100 ${Math.max(30, ...a.nodes.map((n) => n.y + 12)) + 7}`} className="mx-auto w-full max-w-[620px]">
      {a.links.map(([x, y], i) => (
        <line key={i} x1={pos[x]?.x} y1={pos[x]?.y} x2={pos[y]?.x} y2={pos[y]?.y} stroke="#94a3b8" strokeWidth={0.6} className="cs-dash" />
      ))}
      {a.nodes.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={5.2} fill={reached.has(n.id) ? '#fee2e2' : '#f8fafc'} stroke={reached.has(n.id) ? reachColor : '#cbd5e1'} strokeWidth={reached.has(n.id) ? 0.9 : 0.5} style={{ transition: 'fill .4s, stroke .4s' }} />
          <text x={n.x} y={n.y + 1.9} fontSize={5.5} textAnchor="middle">
            {n.icon}
          </text>
          <text x={n.x < 16 ? Math.max(0.5, n.x - 5.5) : n.x > 84 ? Math.min(99.5, n.x + 5.5) : n.x} y={n.y + 9.2} fontSize={3.3} textAnchor={n.x < 16 ? 'start' : n.x > 84 ? 'end' : 'middle'} fill="#334155" fontWeight={700}>
            {n.label}
          </text>
        </g>
      ))}
      {dots.map((d) => {
        const w = Math.max(6, d.label.length * 1.6 + 2);
        // keep the label inside the picture
        const x = Math.min(99 - w, Math.max(1, d.x - w / 2));
        const y = d.y - 8 - dots.filter((o) => o.k < d.k && o.x === d.x && o.y === d.y).length * 5;
        return (
          <g key={d.k} style={{ transform: `translate(${x}px, ${y}px)`, transition: 'transform .55s ease' }}>
            <rect x={0} y={-2.8} width={w} height={4.2} rx={1.2} fill={d.color} />
            <text x={w / 2} y={0.3} fontSize={2.7} fill="#fff" fontWeight={800} textAnchor="middle">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
      {log.length > 0 && (
        <ol className="mx-auto mt-1 max-w-[620px] space-y-1">
          {log.map((p, i) => (
            <li key={i} className={`cs-pop flex items-center gap-2 text-[13px] font-semibold ${i === log.length - 1 ? 'text-ink' : 'text-ink/50'}`}>
              <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[12px] font-black text-white" style={{ background: p.color ?? '#0ea5e9' }}>
                {p.label}
              </span>
              <span className="truncate">
                {p.path.map(name).join(' ➜ ')}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ sheet */

const cellRe = /^([A-Z])(\d+)$/;
function Sheet({ a, t }: { a: Extract<CsAnim, { type: 'sheet' }>; t: number }) {
  const step = Math.min(a.steps.length - 1, Math.floor((t - 1) / 2));
  const cur = t > 0 ? a.steps[step] : null;
  const computed: Record<string, string | number> = {};
  a.steps.forEach((s, i) => {
    if (t >= i * 2 + 2) computed[s.cell] = s.result;
  });
  const letters = a.cols.map((_, i) => String.fromCharCode(65 + i));
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 rounded-lg border border-ink/10 bg-[#f8fafc] px-2 py-1.5 font-mono text-[13px]">
        <span className="font-black text-ink/50">{cur ? cur.cell : ''}</span>
        <span className="text-ink/30">fx</span>
        <span className="truncate font-bold text-[#0369a1]">{cur ? cur.formula : ''}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-[12.5px]">
          <thead>
            <tr>
              <th className="w-6 border border-ink/10 bg-ink/[0.04]" />
              {letters.map((l, i) => (
                <th key={l} className="border border-ink/10 bg-ink/[0.04] px-1 text-ink/50">
                  {l}
                  <span className="block font-sans text-[11px] font-black text-ink/70">{a.cols[i]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {a.rows.map((r, ri) => (
              <tr key={ri}>
                <td className="border border-ink/10 bg-ink/[0.04] text-center text-ink/50">{ri + 2}</td>
                {letters.map((l, ci) => {
                  const ref = `${l}${ri + 2}`;
                  const isRef = cur && t % 2 === 1 ? cur.refs.includes(ref) : cur?.refs.includes(ref) && t % 2 === 0 && step === Math.floor((t - 1) / 2);
                  const isCell = cur?.cell === ref;
                  const v = computed[ref] ?? r[ci] ?? '';
                  return (
                    <td
                      key={l}
                      className={`border border-ink/10 px-1.5 py-1 font-bold ${typeof v === 'string' && v !== '' && isNaN(Number(v)) && !isCell ? 'text-left font-sans' : 'text-right'} ${isCell && computed[ref] !== undefined ? 'cs-pop bg-[#dcfce7] text-[#15803d]' : isRef ? 'bg-[#e0f2fe] text-[#0369a1]' : 'text-ink'}`}
                    >
                      {v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export const parseCell = (c: string) => {
  const m = cellRe.exec(c);
  return m ? { col: m[1].charCodeAt(0) - 65, row: Number(m[2]) } : null;
};

/* ------------------------------------------------------------------ db */

function Db({ a, t }: { a: Extract<CsAnim, { type: 'db' }>; t: number }) {
  return (
    <div className="space-y-2">
      {a.query && t >= 2 && <p className="cs-pop text-center font-mono text-[13px] font-black text-[#6d28d9]">🔎 {a.query.label}</p>}
      <div className="flex flex-wrap justify-center gap-3">
        {a.tables.map((tb) => {
          const linkedCols = (a.links ?? []).flatMap((l) => [l.from, l.to]).filter(([n]) => n === tb.name).map(([, c]) => c);
          return (
            <div key={tb.name} className="min-w-0 max-w-full overflow-x-auto rounded-xl border border-ink/15">
              <p className="bg-[#ede9fe] px-2 py-1 text-[13px] font-black text-[#6d28d9]">🗂️ {tb.name}</p>
              <table className="border-collapse text-[12.5px]">
                <thead>
                  <tr>
                    {tb.cols.map((c) => (
                      <th key={c} className="border-b border-ink/10 px-2 py-1 text-left font-black text-ink/70">
                        {tb.key === c ? '🔑 ' : linkedCols.includes(c) ? '🔗 ' : ''}
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tb.rows.map((r, ri) => {
                    const q = a.query && a.query.table === tb.name;
                    const kept = !q || t < 3 || a.query!.keep.includes(ri);
                    const hit = q && t >= 2 && a.query!.keep.includes(ri);
                    return (
                      <tr key={ri} className={`transition duration-500 ${kept ? '' : 'opacity-15'} ${hit ? 'bg-[#dcfce7]' : ''}`}>
                        {r.map((v, ci) => (
                          <td key={ci} className="border-b border-ink/5 px-2 py-0.5 font-semibold text-ink">
                            {v}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      {(a.links ?? []).length > 0 && t >= 1 && (
        <p className="cs-pop text-center text-[12.5px] font-bold text-ink/55">
          {a.links!.map((l) => `${l.from[0]}.${l.from[1]} ➜ ${l.to[0]}.${l.to[1]}`).join(' · ')}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ tree */

function Tree({ a, t }: { a: Extract<CsAnim, { type: 'tree' }>; t: number }) {
  // levels by depth; x by order in level
  const depth: Record<string, number> = {};
  const get = (id: string): number => {
    if (depth[id] !== undefined) return depth[id];
    const n = a.nodes.find((x) => x.id === id);
    depth[id] = n?.parent ? get(n.parent) + 1 : 0;
    return depth[id];
  };
  a.nodes.forEach((n) => get(n.id));
  const levels: string[][] = [];
  a.nodes.forEach((n) => (levels[depth[n.id]] ??= []).push(n.id));
  // x: leaves spread evenly in depth-first order, each parent centred over its children
  const kids = (id: string) => a.nodes.filter((n) => n.parent === id).map((n) => n.id);
  const leaves: string[] = [];
  const walk = (id: string) => (kids(id).length ? kids(id).forEach(walk) : leaves.push(id));
  a.nodes.filter((n) => !n.parent).forEach((n) => walk(n.id));
  const X: Record<string, number> = {};
  const place = (id: string): number => {
    const k = kids(id);
    X[id] = k.length ? k.map(place).reduce((x, y) => x + y, 0) / k.length : ((leaves.indexOf(id) + 0.5) / leaves.length) * 100;
    return X[id];
  };
  a.nodes.filter((n) => !n.parent).forEach((n) => place(n.id));
  const P: Record<string, { x: number; y: number }> = {};
  a.nodes.forEach((n) => (P[n.id] = { x: X[n.id], y: 7 + depth[n.id] * (52 / Math.max(1, levels.length - 1)) }));
  const lit = new Set(a.path.slice(0, t));
  return (
    <svg viewBox="0 0 100 66" className="mx-auto w-full max-w-[560px]">
      {a.nodes
        .filter((n) => n.parent)
        .map((n) => {
          const p = P[n.parent!];
          const c = P[n.id];
          const on = lit.has(n.id) && lit.has(n.parent!);
          return (
            <g key={`e${n.id}`}>
              <line x1={p.x} y1={p.y + 3} x2={c.x} y2={c.y - 3} stroke={on ? '#22c55e' : '#cbd5e1'} strokeWidth={on ? 0.9 : 0.5} />
              {n.edge && (
                <text x={(p.x + c.x) / 2} y={(p.y + c.y) / 2} fontSize={2.8} textAnchor="middle" fill={on ? '#15803d' : '#94a3b8'} fontWeight={800}>
                  {n.edge}
                </text>
              )}
            </g>
          );
        })}
      {a.nodes.map((n) => {
        const c = P[n.id];
        const on = lit.has(n.id);
        const w = Math.min(30, 100 / Math.max(1, leaves.length) - 2, Math.max(14, n.label.length * 1.55 + 4));
        return (
          <g key={n.id}>
            <rect x={c.x - w / 2} y={c.y - 3.2} width={w} height={6.4} rx={1.6} fill={on ? '#dcfce7' : '#f8fafc'} stroke={on ? '#22c55e' : '#cbd5e1'} strokeWidth={0.4} />
            <text x={c.x} y={c.y + 1} fontSize={Math.min(2.7, (w - 1.5) / (n.label.length * 0.55))} textAnchor="middle" fill="#1f2937" fontWeight={700}>
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ gantt */

function Gantt({ a, t }: { a: Extract<CsAnim, { type: 'gantt' }>; t: number }) {
  const end = Math.max(...a.tasks.map((x) => x.start + x.dur));
  const showCrit = t > a.tasks.length;
  return (
    <div className="space-y-1">
      {a.tasks.map((x, i) => (
        <div key={x.id} className="flex items-center gap-2">
          <span className="w-[34%] shrink-0 truncate text-[12.5px] font-bold text-ink">{x.label}</span>
          <div className="relative h-6 flex-1 rounded bg-ink/[0.04]">
            <div
              className="absolute top-0.5 h-5 rounded transition-all duration-700"
              style={{
                left: `${(x.start / end) * 100}%`,
                width: i < t ? `${(x.dur / end) * 100}%` : '0%',
                background: showCrit && x.critical ? '#ef4444' : '#0ea5e9'
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-between pl-[36%] font-mono text-[10.5px] text-ink/40">
        <span>0</span>
        <span>
          {end} {a.unit}
        </span>
      </div>
      {showCrit && <p className="cs-pop text-center text-[13px] font-black text-[#b91c1c]">Qizil — kritik yoʻl: ular kechiksa, butun loyiha kechikadi</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ code */

function Code({ a, t }: { a: Extract<CsAnim, { type: 'code' }>; t: number }) {
  const done = a.trace.slice(0, t);
  const cur = done[done.length - 1];
  const vars = Object.assign({}, ...done.map((d) => d.vars ?? {}));
  const out = done.map((d) => d.out).filter((x): x is string => !!x);
  return (
    <div className="grid gap-2 sm:grid-cols-[1.4fr_1fr]">
      <pre className="overflow-x-auto rounded-xl bg-[#0f172a] p-2 font-mono text-[12.5px] leading-6 text-[#e2e8f0]">
        {a.lines.map((l, i) => (
          <div key={i} className={`flex rounded px-1 ${cur && cur.line === i + 1 ? 'bg-[#334155]' : ''}`}>
            <span className="w-6 shrink-0 select-none text-right text-[#64748b]">{i + 1}</span>
            <span className="ml-2 whitespace-pre">{l}</span>
          </div>
        ))}
      </pre>
      <div className="space-y-2">
        <div className="rounded-xl border border-ink/10 p-2">
          <p className="text-[11.5px] font-black uppercase tracking-wide text-ink/45">Oʻzgaruvchilar</p>
          {Object.keys(vars).length === 0 ? (
            <p className="text-[12.5px] text-ink/30">—</p>
          ) : (
            Object.entries(vars).map(([k, v]) => (
              <p key={k} className="font-mono text-[13px] font-bold text-ink">
                {k} = <span className="text-[#0369a1]">{String(v)}</span>
              </p>
            ))
          )}
        </div>
        {done.some((d) => d.page !== undefined) && (
          <div className="overflow-hidden rounded-xl border border-ink/15">
            <p className="flex items-center gap-1 bg-ink/[0.05] px-2 py-1 text-[11px] font-black text-ink/50">
              <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span className="h-2 w-2 rounded-full bg-[#eab308]" />
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" /> Sahifa
            </p>
            <p key={done.filter((d) => d.page !== undefined).length} className="cs-pop whitespace-pre-wrap p-2 text-[14px] font-bold text-ink">
              {[...done].reverse().find((d) => d.page !== undefined)?.page}
            </p>
          </div>
        )}
        {(out.length > 0 || !a.trace.some((d) => d.page !== undefined)) && (
        <div className="rounded-xl bg-[#f8fafc] p-2">
          <p className="text-[11.5px] font-black uppercase tracking-wide text-ink/45">Natija</p>
          {out.map((o, i) => (
            <p key={i} className={`cs-pop font-mono text-[13px] font-bold ${o.startsWith('⛔') ? 'text-[#b91c1c]' : 'text-[#15803d]'}`}>
              {o}
            </p>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ merge */

function Merge({ a, t }: { a: Extract<CsAnim, { type: 'merge' }>; t: number }) {
  const keep = a.keep ?? a.rows.map((_, i) => i);
  const made = Math.max(0, Math.min(t - 1, keep.length));
  const curRow = t >= 1 && made > 0 ? keep[made - 1] : -1;
  const parts = a.template.split(/(«[^»]+»)/g);
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr>
              {a.cols.map((c) => (
                <th key={c} className="border border-ink/10 bg-ink/[0.04] px-1.5 py-1 text-left font-black text-ink/70">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {a.rows.map((r, i) => {
              const out = !keep.includes(i);
              return (
                <tr key={i} className={`transition-colors ${i === curRow ? 'bg-[#fef9c3]' : ''} ${out && t >= 1 ? 'opacity-30 line-through' : ''}`}>
                  {r.map((v, j) => (
                    <td key={j} className="border border-ink/10 px-1.5 py-1 font-bold text-ink">
                      {v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {a.filter && t >= 1 && <p className="cs-pop text-[12.5px] font-black text-[#7c3aed]">Filtr: {a.filter}</p>}
      <div className="relative">
        {made > 1 && <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border border-ink/10 bg-white" />}
        <div className="relative rounded-xl border border-ink/15 bg-white p-3 text-[13.5px] font-semibold leading-6 text-ink shadow-card">
          {parts.map((p, i) => {
            if (!p.startsWith('«')) return <span key={i} className="whitespace-pre-wrap">{p}</span>;
            const col = a.cols.indexOf(p.slice(1, -1));
            const val = curRow >= 0 && col >= 0 ? a.rows[curRow][col] : null;
            return val ? (
              <span key={`${i}-${curRow}`} className="cs-pop rounded bg-[#dcfce7] px-1 font-black text-[#15803d]">
                {val}
              </span>
            ) : (
              <span key={i} className="rounded bg-[#fef08a] px-1 font-mono text-[12.5px] font-black text-[#854d0e]">
                {p}
              </span>
            );
          })}
        </div>
      </div>
      <p className="text-center text-[13px] font-black text-ink/60">
        {made === 0 ? 'Master hujjat: «maydonlar» manba fayldan toʻldiriladi' : `Tayyor xatlar: ${made} / ${keep.length}`}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ cycle */

function Cycle({ a, t }: { a: Extract<CsAnim, { type: 'cycle' }>; t: number }) {
  const n = a.stages.length;
  const cur = Math.min(t, n) - 1;
  return (
    <div className="relative mx-auto aspect-square max-w-[300px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0">
        <circle cx={50} cy={50} r={36} fill="none" stroke="#e2e8f0" strokeWidth={1.5} className="cs-dash" />
      </svg>
      {a.center && <p className="absolute inset-0 grid place-items-center px-[30%] text-center text-[13px] font-black text-ink/60">{a.center}</p>}
      {a.stages.map((s, i) => {
        const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(ang) * 36;
        const y = 50 + Math.sin(ang) * 36;
        const on = i === cur;
        const seen = i <= cur;
        return (
          <div
            key={i}
            className={`absolute flex w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl border-2 bg-white p-1 text-center transition ${on ? 'scale-110 border-[#0ea5e9] shadow-card' : seen ? 'border-[#22c55e]' : 'border-ink/10 opacity-60'}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-[11px] font-black leading-tight text-ink">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ picture */

function Picture({ a, t }: { a: Extract<CsAnim, { type: 'picture' }>; t: number }) {
  if (a.mode === 'raster-vector') {
    const zoom = t >= 3;
    const N = zoom ? 12 : 24;
    const cells: ReactNode[] = [];
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const dx = x + 0.5 - N / 2;
        const dy = y + 0.5 - N / 2;
        if (Math.hypot(dx, dy) < N * 0.38) cells.push(<rect key={`${x}-${y}`} x={(x / N) * 40} y={(y / N) * 40} width={40 / N + 0.05} height={40 / N + 0.05} fill="#0ea5e9" />);
      }
    return (
      <div className="grid grid-cols-2 gap-3 text-center">
        <div>
          <svg viewBox="0 0 40 40" className="mx-auto w-full max-w-[200px] rounded-lg border border-ink/10 transition-transform duration-700">
            {cells}
          </svg>
          <p className="mt-1 text-[13.5px] font-black text-ink">Rastr (piksellar)</p>
          {zoom && <p className="cs-pop text-[12.5px] font-bold text-[#b91c1c]">kattalashtirsa — zinapoya, xira</p>}
        </div>
        <div>
          <svg viewBox="0 0 40 40" className="mx-auto w-full max-w-[200px] rounded-lg border border-ink/10">
            <circle cx={20} cy={20} r={zoom ? 15.2 : 9.1} fill="#f97316" style={{ transition: 'r .7s' }} />
          </svg>
          <p className="mt-1 text-[13.5px] font-black text-ink">Vektor (formula)</p>
          {zoom && <p className="cs-pop text-[12.5px] font-bold text-[#15803d]">kattalashtirsa ham — silliq</p>}
        </div>
      </div>
    );
  }
  if (a.mode === 'tween') {
    const frames = 6;
    const k = Math.min(t, frames);
    return (
      <div className="space-y-2">
        <svg viewBox="0 0 100 40" className="w-full">
          {Array.from({ length: frames }, (_, i) => {
            const x = 10 + (i / (frames - 1)) * 80;
            const y = 30 - Math.sin((i / (frames - 1)) * Math.PI) * 20;
            const key = i === 0 || i === frames - 1;
            const show = key || i < k;
            return show ? <circle key={i} cx={x} cy={y} r={4} fill={key ? '#f97316' : '#0ea5e9'} opacity={key ? 1 : 0.45} className="cs-pop" /> : null;
          })}
        </svg>
        <div className="flex justify-center gap-1">
          {Array.from({ length: frames }, (_, i) => (
            <span key={i} className={`grid h-8 w-10 place-items-center rounded border text-[11px] font-black ${i === 0 || i === frames - 1 ? 'border-[#f97316] bg-[#ffedd5] text-[#c2410c]' : i < k ? 'border-[#0ea5e9] bg-[#e0f2fe] text-[#0369a1]' : 'border-ink/10 text-ink/30'}`}>
              {i + 1}
            </span>
          ))}
        </div>
        <p className="text-center text-[13px] font-bold text-ink/60">🟧 kalit kadrlar (siz chizasiz) · 🟦 oraliq kadrlar (dastur hisoblaydi)</p>
      </div>
    );
  }
  if (a.mode === 'morph') {
    const k = Math.min(t, 6) / 6;
    const mix = (c1: number[], c2: number[]) => `rgb(${c1.map((v, i) => Math.round(v + (c2[i] - v) * k)).join(',')})`;
    return (
      <div className="space-y-2">
        <svg viewBox="0 0 100 40" className="w-full">
          {Array.from({ length: 7 }, (_, i) => {
            const f = i / 6;
            const on = i <= Math.min(t, 6);
            const key = i === 0 || i === 6;
            const r = 10 * f;
            return on ? (
              <rect key={i} x={4 + i * 13.3 - 0} y={14} width={10} height={10} rx={r / 2} fill={`rgb(${Math.round(239 + (14 - 239) * f)},${Math.round(68 + (165 - 68) * f)},${Math.round(68 + (233 - 68) * f)})`} stroke={key ? '#0f172a' : 'none'} strokeWidth={0.6} className="cs-pop" />
            ) : null;
          })}
        </svg>
        <div className="mx-auto grid h-24 w-24 place-items-center">
          <div className="h-20 w-20 transition-all duration-500" style={{ borderRadius: `${k * 50}%`, background: mix([239, 68, 68], [14, 165, 233]) }} />
        </div>
        <p className="text-center text-[13px] font-bold text-ink/60">🟥 1-kalit kadr ➜ dastur oraliq shakllarni hisoblaydi ➜ 🔵 2-kalit kadr</p>
      </div>
    );
  }
  if (a.mode === 'mask') {
    const k = Math.min(t, 6);
    const cx = 18 + k * 11;
    return (
      <div className="space-y-2">
        <svg viewBox="0 0 100 50" className="w-full rounded-xl">
          <defs>
            <clipPath id="cs-mask-clip">
              <ellipse cx={cx} cy={25} rx={14} ry={11} />
            </clipPath>
          </defs>
          <rect width={100} height={50} fill="#0f172a" />
          <g clipPath="url(#cs-mask-clip)">
            <rect width={100} height={50} fill="#38bdf8" />
            <rect y={34} width={100} height={16} fill="#fde68a" />
            {[12, 30, 48, 66, 84].map((x, i) => (
              <g key={i}>
                <ellipse cx={x} cy={22 + (i % 2) * 6} rx={5} ry={3} fill={['#f97316', '#a855f7', '#22c55e', '#ef4444', '#eab308'][i]} />
                <path d={`M${x - 5},${22 + (i % 2) * 6} l-3,-2.5 v5 z`} fill={['#f97316', '#a855f7', '#22c55e', '#ef4444', '#eab308'][i]} />
              </g>
            ))}
          </g>
          <ellipse cx={cx} cy={25} rx={14} ry={11} fill="none" stroke="#fff" strokeWidth={0.6} strokeDasharray="2 1.5" />
        </svg>
        <p className="text-center text-[13px] font-bold text-ink/60">Niqob qatlami: faqat oval ichi koʻrinadi · niqob tvin bilan harakatlanyapti</p>
      </div>
    );
  }
  if (a.mode === 'flipbook') {
    const frames = 8;
    const f = t % frames;
    const pos = (i: number) => ({ x: 12 + i * 11, y: 40 - Math.abs(Math.sin((i / (frames - 1)) * Math.PI)) * 26 });
    const p = pos(f);
    return (
      <div className="space-y-2">
        <svg viewBox="0 0 100 50" className="w-full rounded-xl bg-[#f8fafc]">
          <line x1={4} y1={45} x2={96} y2={45} stroke="#94a3b8" strokeWidth={0.8} />
          {Array.from({ length: frames }, (_, i) => (
            <circle key={i} cx={pos(i).x} cy={pos(i).y} r={3.2} fill="#94a3b8" opacity={0.18} />
          ))}
          <circle cx={p.x} cy={p.y} r={4} fill="#f97316" />
        </svg>
        <div className="flex justify-center gap-1">
          {Array.from({ length: frames }, (_, i) => (
            <span key={i} className={`grid h-8 w-8 place-items-center rounded border text-[11px] font-black ${i === f ? 'border-[#f97316] bg-[#ffedd5] text-[#c2410c]' : 'border-ink/10 text-ink/30'}`}>
              {i + 1}
            </span>
          ))}
        </div>
        <p className="text-center text-[13px] font-bold text-ink/60">
          {frames} kadr · {a.fps ?? 4} fps ➜ bir aylanish {String(frames / (a.fps ?? 4)).replace('.', ',')} soniya
        </p>
      </div>
    );
  }
  // layers
  const split = t >= 2;
  const L = [
    { c: '#bae6fd', l: 'Fon' },
    { c: '#bbf7d0', l: 'Daraxt' },
    { c: '#fed7aa', l: 'Matn' }
  ];
  return (
    <div className="relative mx-auto h-[220px] max-w-[320px]">
      {L.map((x, i) => (
        <div
          key={i}
          className="absolute left-1/2 flex h-[110px] w-[200px] items-start justify-start rounded-xl px-4 py-2 border-2 border-white text-[14px] font-black text-ink shadow-card transition-all duration-700"
          style={{ background: x.c, transform: `translate(-50%, 0) translate(${split ? (i - 1) * 40 : 0}px, ${split ? i * 36 : 40}px) skewX(${split ? -12 : 0}deg)`, zIndex: i }}
        >
          {x.l}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ chart */

const PALETTE = ['#0ea5e9', '#f97316', '#22c55e', '#8b5cf6', '#ef4444', '#eab308', '#14b8a6'];
const fmtNum = (v: number) => String(v).replace('.', ',');

function Chart({ a, t }: { a: Extract<CsAnim, { type: 'chart' }>; t: number }) {
  const n = a.values.length;
  const max = Math.max(...a.values) * 1.15 || 1;
  if (a.kind === 'pie') {
    const total = a.values.reduce((x, y) => x + y, 0) || 1;
    let acc = 0;
    const arcs = a.values.map((v, i) => {
      const s0 = (acc / total) * Math.PI * 2;
      acc += v;
      const s1 = (acc / total) * Math.PI * 2;
      const p = (ang: number, r = 30) => `${50 + Math.sin(ang) * r},${36 - Math.cos(ang) * r}`;
      const large = s1 - s0 > Math.PI ? 1 : 0;
      const mid = (s0 + s1) / 2;
      return { d: `M50,36 L${p(s0)} A30,30 0 ${large} 1 ${p(s1)} Z`, mid, i, v };
    });
    return (
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
        <svg viewBox="0 0 100 72" className="w-full max-w-[300px]">
          {arcs.map((x) =>
            x.i < t ? (
              <g key={x.i} className="cs-pop" style={{ transformOrigin: '50px 36px' }}>
                <path d={x.d} fill={PALETTE[x.i % PALETTE.length]} stroke="#fff" strokeWidth={0.6} />
                <text x={50 + Math.sin(x.mid) * 19} y={37 - Math.cos(x.mid) * 19} fontSize={4} textAnchor="middle" fill="#fff" fontWeight={800}>
                  {Math.round((x.v / total) * 100)}%
                </text>
              </g>
            ) : null
          )}
        </svg>
        <ul className="space-y-1">
          {a.labels.map((l, i) => (
            <li key={i} className={`flex items-center gap-1.5 text-[13px] font-bold text-ink transition ${i < t ? 'opacity-100' : 'opacity-20'}`}>
              <span className="h-3 w-3 rounded" style={{ background: PALETTE[i % PALETTE.length] }} />
              {l}: {fmtNum(a.values[i])}
              {a.unit ? ` ${a.unit}` : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const W = 100;
  const H = 56;
  const left = 8;
  const bottom = 48;
  const step = (W - left - 2) / n;
  const Y = (v: number) => bottom - (v / max) * 40;
  const X = (i: number) => left + step * (i + 0.5);
  return (
    <div>
      {a.title && <p className="mb-1 text-center text-[13.5px] font-black text-ink">{a.title}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-[620px]">
        <line x1={left} x2={W - 1} y1={bottom} y2={bottom} stroke="#cbd5e1" strokeWidth={0.4} />
        <line x1={left} x2={left} y1={6} y2={bottom} stroke="#cbd5e1" strokeWidth={0.4} />
        {a.kind === 'line' && (
          <polyline fill="none" stroke="#0ea5e9" strokeWidth={0.8} points={a.values.slice(0, t).map((v, i) => `${X(i)},${Y(v)}`).join(' ')} />
        )}
        {a.values.map((v, i) => (
          <g key={i}>
            {a.kind === 'bar' ? (
              <rect x={X(i) - step * 0.32} width={step * 0.64} y={i < t ? Y(v) : bottom} height={i < t ? bottom - Y(v) : 0} rx={0.8} fill={PALETTE[i % PALETTE.length]} style={{ transition: 'all .6s ease' }} />
            ) : (
              i < t && <circle cx={X(i)} cy={Y(v)} r={1.1} fill="#0369a1" className="cs-pop" />
            )}
            {i < t && (
              <text x={X(i)} y={Y(v) - 1.8} fontSize={2.8} textAnchor="middle" fill="#1f2937" fontWeight={800}>
                {fmtNum(v)}
              </text>
            )}
            <text x={X(i)} y={bottom + 4} fontSize={2.7} textAnchor="middle" fill="#475569" fontWeight={700}>
              {a.labels[i]}
            </text>
          </g>
        ))}
        {a.unit && (
          <text x={left - 1} y={4.5} fontSize={2.6} textAnchor="start" fill="#64748b" fontWeight={700}>
            {a.unit}
          </text>
        )}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ sort */

function SortRows({ a, t }: { a: Extract<CsAnim, { type: 'sort' }>; t: number }) {
  const order = a.rows.map((_, i) => i);
  const sorted = [...order].sort((i, j) => {
    const x = a.rows[i][a.by];
    const y = a.rows[j][a.by];
    const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'uz');
    return a.desc ? -c : c;
  });
  const done = t >= 2;
  const rank = (i: number) => (done ? sorted.indexOf(i) : i);
  const ROW = 34;
  return (
    <div className="mx-auto max-w-[520px]">
      <div className="grid gap-1 px-1 pb-1 text-[12px] font-black text-ink/55" style={{ gridTemplateColumns: `repeat(${a.cols.length}, minmax(0, 1fr))` }}>
        {a.cols.map((c, i) => (
          <span key={i} className={i === a.by && t >= 1 ? 'text-[#0369a1]' : ''}>
            {c} {i === a.by && t >= 1 ? (a.desc ? '▼' : '▲') : ''}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height: a.rows.length * ROW }}>
        {a.rows.map((r, i) => (
          <div
            key={i}
            className="absolute inset-x-0 grid items-center gap-1 rounded-lg border border-ink/10 bg-white px-1 text-[13.5px] font-bold text-ink shadow-sm"
            style={{ gridTemplateColumns: `repeat(${a.cols.length}, minmax(0, 1fr))`, height: ROW - 4, transform: `translateY(${rank(i) * ROW}px)`, transition: 'transform .8s ease' }}
          >
            {r.map((v, k) => (
              <span key={k} className={`truncate ${k === a.by && t >= 1 ? 'rounded bg-[#e0f2fe] px-1 text-[#0369a1]' : ''}`}>
                {typeof v === 'number' ? fmtNum(v) : v}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ erd */

function Erd({ a, t }: { a: Extract<CsAnim, { type: 'erd' }>; t: number }) {
  const BW = 28;
  const box = (e: (typeof a.entities)[number]) => ({ x: e.x, y: e.y, w: BW, h: 7 + e.fields.length * 4.2 });
  const byId = Object.fromEntries(a.entities.map((e) => [e.id, e]));
  const H = Math.max(...a.entities.map((e) => box(e).y + box(e).h)) + 3;
  return (
    <svg viewBox={`0 0 100 ${H}`} className="mx-auto w-full max-w-[620px]">
      {a.rels.map((r, i) => {
        if (i + a.entities.length >= t) return null;
        const A = box(byId[r.from]);
        const B = box(byId[r.to]);
        const ax = A.x + A.w / 2;
        const ay = A.y + A.h / 2;
        const bx = B.x + B.w / 2;
        const by = B.y + B.h / 2;
        // points on the box edges
        const edge = (bx0: typeof A, tx: number, ty: number) => {
          const cx = bx0.x + bx0.w / 2;
          const cy = bx0.y + bx0.h / 2;
          const dx = tx - cx;
          const dy = ty - cy;
          const k = Math.min(Math.abs(bx0.w / 2 / (dx || 1e-6)), Math.abs(bx0.h / 2 / (dy || 1e-6)));
          return { x: cx + dx * k, y: cy + dy * k };
        };
        const p = edge(A, bx, by);
        const q = edge(B, ax, ay);
        const [l, rr] = r.kind === '1-1' ? ['1', '1'] : r.kind === '1-M' ? ['1', '∞'] : ['∞', '∞'];
        const lab = (pt: { x: number; y: number }, other: { x: number; y: number }, txt: string) => {
          const dx = other.x - pt.x;
          const dy = other.y - pt.y;
          const d = Math.hypot(dx, dy) || 1;
          return (
            <text x={pt.x + (dx / d) * 6 + (dy / d) * 2.6} y={pt.y + (dy / d) * 6 - (dx / d) * 2.6 + 1.2} fontSize={txt === '∞' ? 5 : 3.6} textAnchor="middle" fill="#b91c1c" fontWeight={900}>
              {txt}
            </text>
          );
        };
        return (
          <g key={i} className="cs-pop">
            <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#f97316" strokeWidth={0.7} />
            {lab(p, q, l)}
            {lab(q, p, rr)}
          </g>
        );
      })}
      {a.entities.map((e, i) => {
        const b = box(e);
        return (
          <g key={e.id} style={{ opacity: i < t ? 1 : 0, transition: 'opacity .4s' }}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={1.5} fill="#fff" stroke="#8b5cf6" strokeWidth={0.5} />
            <rect x={b.x} y={b.y} width={b.w} height={5.5} rx={1.5} fill="#ede9fe" />
            <text x={b.x + b.w / 2} y={b.y + 4} fontSize={3.1} textAnchor="middle" fill="#6d28d9" fontWeight={900}>
              {e.name}
            </text>
            {e.fields.map((f, k) => (
              <text key={f} x={b.x + 1.6} y={b.y + 9.6 + k * 4.2} fontSize={2.7} fill="#1f2937" fontWeight={e.key === f ? 900 : 600}>
                {e.key === f ? '🔑 ' : e.fk?.includes(f) ? '🔗 ' : ''}
                {f}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ access */

function Access({ a, t }: { a: Extract<CsAnim, { type: 'access' }>; t: number }) {
  const ti = a.keys.indexOf(a.target);
  let cur = -1;
  let found = false;
  let note = '';
  if (a.mode === 'sequential') {
    cur = Math.min(t - 1, ti);
    found = t - 1 >= ti;
    note = found ? `${ti + 1} ta yozuv oʻqildi` : cur >= 0 ? `${cur + 1}-yozuv: ${a.keys[cur]} ≠ ${a.target}` : 'Boshidan oʻqiymiz…';
  } else if (a.mode === 'direct') {
    note = t <= 1 ? `xesh(${a.target}) hisoblanmoqda…` : `xesh(${a.target}) = ${ti + 1}-manzil`;
    cur = t >= 2 ? ti : -1;
    found = t >= 3;
    if (found) note += ' — bitta oʻqish!';
  } else {
    const block = Math.floor(ti / 4);
    note = t <= 1 ? 'Indeksdan qidirilmoqda…' : `Indeks: ${a.target} ➜ ${block + 1}-blok`;
    cur = t >= 2 ? (t >= 3 ? ti : block * 4) : -1;
    found = t >= 3;
  }
  return (
    <div className="space-y-3">
      {a.mode === 'indexed' && (
        <div className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: Math.ceil(a.keys.length / 4) }, (_, b) => (
            <span key={b} className={`rounded-md border px-2 py-0.5 font-mono text-[12px] font-bold ${t >= 1 && b === Math.floor(ti / 4) ? 'border-[#8b5cf6] bg-[#ede9fe] text-[#6d28d9]' : 'border-ink/15 text-ink/50'}`}>
              {a.keys[b * 4]}…: {b + 1}-blok
            </span>
          ))}
        </div>
      )}
      <div className="mx-auto grid max-w-[560px] grid-cols-4 gap-1.5 sm:grid-cols-8">
        {a.keys.map((k, i) => (
          <span
            key={k}
            className={`grid h-10 place-items-center rounded-lg border-2 font-mono text-[12.5px] font-black transition ${
              i === cur && found ? 'border-[#22c55e] bg-[#dcfce7] text-[#15803d]' : i === cur ? 'border-[#0ea5e9] bg-[#e0f2fe] text-[#0369a1]' : a.mode === 'sequential' && i < cur ? 'border-ink/10 bg-ink/[0.04] text-ink/30' : 'border-ink/10 text-ink/70'
            }`}
          >
            {k}
          </span>
        ))}
      </div>
      <p className={`text-center text-[14px] font-black ${found ? 'cs-pop text-[#15803d]' : 'text-ink/60'}`}>{found ? `✅ ${a.target} topildi · ${note}` : note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ timeline */

function Timeline({ a, t }: { a: Extract<CsAnim, { type: 'timeline' }>; t: number }) {
  const all = a.tracks.flatMap((tr, ti) => tr.clips.map((c, ci) => ({ ti, ci })));
  const shown = (ti: number, ci: number) => all.findIndex((x) => x.ti === ti && x.ci === ci) < t;
  const play = Math.max(0, t - all.length);
  const head = Math.min(1, play / 4);
  return (
    <div className="space-y-1.5">
      <div className="relative ml-[74px] h-4 font-mono text-[10px] text-ink/40">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`absolute whitespace-nowrap ${i === 4 ? '-translate-x-full' : i === 0 ? '' : '-translate-x-1/2'}`} style={{ left: `${(i / 4) * 100}%` }}>
            {Math.round((a.total * i) / 4)}{a.unit ?? 's'}
          </span>
        ))}
      </div>
      <div className="relative">
        {a.tracks.map((tr, ti) => (
          <div key={ti} className="mb-1 flex items-center gap-1.5">
            <span className="w-[68px] shrink-0 truncate text-[11.5px] font-black text-ink/60">
              {tr.icon} {tr.label}
            </span>
            <div className="relative h-9 flex-1 rounded-md bg-ink/[0.05]">
              {tr.clips.map((c, ci) =>
                shown(ti, ci) ? (
                  <div
                    key={ci}
                    className="cs-pop absolute top-0.5 flex h-8 items-center justify-center overflow-hidden rounded-md px-1 text-[11px] font-black text-white"
                    style={{
                      left: `${(c.start / a.total) * 100}%`,
                      width: `${(c.dur / a.total) * 100}%`,
                      background: c.color ?? PALETTE[(ti * 3 + ci) % PALETTE.length],
                      maskImage: c.fadeIn || c.fadeOut ? `linear-gradient(90deg, ${c.fadeIn ? 'transparent, #000 25%' : '#000'}, ${c.fadeOut ? '#000 75%, transparent' : '#000'})` : undefined
                    }}
                  >
                    <span className="truncate">{c.label}</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ))}
        {play > 0 && (
          <div className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-[#ef4444] transition-all duration-700" style={{ left: `calc(74px + (100% - 74px) * ${head})` }}>
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#ef4444]" />
          </div>
        )}
      </div>
      {play >= 4 && <p className="cs-pop text-center text-[13.5px] font-black text-[#15803d]">{a.done ?? '▶ Tayyor — eksport qilish mumkin'}</p>}
    </div>
  );
}
