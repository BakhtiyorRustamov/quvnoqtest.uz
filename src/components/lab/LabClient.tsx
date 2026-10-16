'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { LabPlan } from '@/lib/lab/plan';
import Board, { OP_MS } from './Board';

type Status = { groq: boolean; hf: boolean; uzTts: boolean; models: { id: string; provider: 'groq' | 'hf' }[] };
type Result = {
  key: string;
  model: string;
  provider: string;
  state: 'running' | 'done' | 'error';
  ms?: number;
  usage?: { input?: number; output?: number };
  raw?: string;
  parseError?: string | null;
  issues?: string[];
  plan?: LabPlan | null;
  error?: string;
};
type Voice = 'browser' | 'mms' | 'none';

const TOPICS = [
  'Aylana, radius va diametr',
  'Pifagor teoremasi',
  'Uchburchakning yuzi',
  'Toʻgʻri burchakli uchburchakda sinus va kosinus',
  'Vektorlarni qoʻshish (uchburchak qoidasi)'
];
const LANG_TAG: Record<string, string> = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function LabClient() {
  const [status, setStatus] = useState<Status | null>(null);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [lang, setLang] = useState('uz');
  const [model, setModel] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [openRaw, setOpenRaw] = useState<string | null>(null);

  // player
  const [plan, setPlan] = useState<LabPlan | null>(null);
  const [planFrom, setPlanFrom] = useState('');
  const [step, setStep] = useState(-1);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [voice, setVoice] = useState<Voice>('browser');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState('');
  const [speed, setSpeed] = useState(1);
  const [log, setLog] = useState<string[]>([]);
  const stopRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // voice test
  const [testText, setTestText] = useState('Salom! Bugun aylana va uning radiusi haqida gaplashamiz. Diametr 10 santimetr boʻlsa, radius necha boʻladi?');

  const addLog = (s: string) => setLog((l) => [`${new Date().toLocaleTimeString()}  ${s}`, ...l].slice(0, 40));

  useEffect(() => {
    fetch('/api/lab/status')
      .then((r) => r.json())
      .then((s: Status) => {
        setStatus(s);
        setModel(s.models[0] ? `${s.models[0].provider}|${s.models[0].id}` : '');
        if (s.uzTts) setVoice('mms');
      })
      .catch(() => setStatus(null));
    const load = () => setVoices(window.speechSynthesis?.getVoices() ?? []);
    load();
    window.speechSynthesis?.addEventListener?.('voiceschanged', load);
    return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', load);
  }, []);

  // pick the best browser voice for the language when the list or language changes
  useEffect(() => {
    if (!voices.length) return;
    const pre = lang === 'uz' ? ['uz', 'tr', 'ru'] : [lang];
    const best = pre.map((p) => voices.find((v) => v.lang.toLowerCase().startsWith(p))).find(Boolean);
    setVoiceName(best?.name ?? '');
  }, [voices, lang]);

  /* --------------------------- plan generation --------------------------- */

  const runOne = useCallback(
    async (provider: string, id: string) => {
      const key = `${provider}|${id}|${Date.now()}`;
      setResults((r) => [{ key, model: id, provider, state: 'running' }, ...r]);
      const t0 = Date.now();
      try {
        const res = await fetch('/api/lab/plan', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ topic, lang, model: id, provider })
        });
        const data = await res.json();
        const r: Partial<Result> = res.ok
          ? { state: 'done', ...data }
          : { state: 'error', error: data.error ?? `HTTP ${res.status}`, ms: data.ms ?? Date.now() - t0, raw: data.raw };
        setResults((all) => all.map((x) => (x.key === key ? { ...x, ...r } : x)));
        if (res.ok && data.plan && !plan) showPlan(data.plan, id);
      } catch (e) {
        setResults((all) => all.map((x) => (x.key === key ? { ...x, state: 'error', error: (e as Error).message, ms: Date.now() - t0 } : x)));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topic, lang, plan]
  );

  async function compareAll() {
    if (!status) return;
    // Groq limits are per model, so models run in parallel; HF only if a token exists
    const list = status.models.filter((m) => (m.provider === 'groq' ? status.groq : status.hf));
    await Promise.allSettled(list.map((m) => runOne(m.provider, m.id)));
  }

  /* -------------------------------- player -------------------------------- */

  function showPlan(p: LabPlan, from: string) {
    stop();
    setPlan(p);
    setPlanFrom(from);
    setStep(p.steps.length - 1);
    setRunId((n) => n + 1);
  }

  function stop() {
    stopRef.current = true;
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    setPlaying(false);
  }

  /** Fetch MMS audio for a text (kept only in memory as a blob URL). */
  async function mmsAudio(text: string): Promise<{ url: string; ms: number }> {
    const t0 = Date.now();
    const res = await fetch('/api/lab/tts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text, speed })
    });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `HTTP ${res.status}`);
    const blob = await res.blob();
    return { url: URL.createObjectURL(blob), ms: Date.now() - t0 };
  }

  function speakBrowser(text: string): Promise<void> {
    return new Promise((resolve) => {
      const synth = window.speechSynthesis;
      if (!synth) return resolve();
      const u = new SpeechSynthesisUtterance(text);
      const v = voices.find((x) => x.name === voiceName);
      if (v) u.voice = v;
      u.lang = v?.lang ?? LANG_TAG[lang];
      u.rate = speed;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      synth.speak(u);
    });
  }

  function playUrl(url: string): Promise<void> {
    return new Promise((resolve) => {
      const a = audioRef.current ?? new Audio();
      audioRef.current = a;
      a.src = url;
      a.onended = () => resolve();
      a.onerror = () => resolve();
      a.play().catch(() => resolve());
    });
  }

  async function play(from = 0) {
    if (!plan) return;
    stop();
    await sleep(30);
    stopRef.current = false;
    setPlaying(true);
    // prefetch MMS audio one step ahead so there is no gap between steps
    const pending: (Promise<{ url: string; ms: number }> | null)[] = plan.steps.map(() => null);
    const get = (i: number) => {
      if (voice !== 'mms' || i >= plan.steps.length) return null;
      pending[i] ??= mmsAudio(plan.steps[i].say);
      return pending[i];
    };
    get(from);
    for (let i = from; i < plan.steps.length; i++) {
      if (stopRef.current) break;
      const s = plan.steps[i];
      let speech: Promise<void>;
      if (voice === 'mms') {
        get(i + 1)?.catch(() => {});
        try {
          const a = await get(i)!;
          if (stopRef.current) break;
          addLog(`step ${i + 1}: MMS audio ready in ${a.ms} ms`);
          setStep(i);
          setRunId((n) => n + 1);
          speech = playUrl(a.url).then(() => URL.revokeObjectURL(a.url));
        } catch (e) {
          addLog(`step ${i + 1}: MMS failed — ${(e as Error).message}`);
          setStep(i);
          setRunId((n) => n + 1);
          speech = sleep(2500);
        }
      } else {
        setStep(i);
        setRunId((n) => n + 1);
        speech = voice === 'browser' ? speakBrowser(s.say) : sleep(Math.max(2000, s.say.length * 55));
      }
      // the step ends when both the voice and the drawing are finished
      await Promise.all([speech, sleep(s.draw.length * OP_MS + 400)]);
    }
    setPlaying(false);
  }

  async function testVoice(kind: Voice) {
    stop();
    stopRef.current = false;
    if (kind === 'browser') {
      const t0 = Date.now();
      await speakBrowser(testText);
      addLog(`browser voice "${voiceName || 'default'}" finished after ${Date.now() - t0} ms`);
    } else {
      try {
        addLog('MMS: requesting…');
        const a = await mmsAudio(testText);
        addLog(`MMS: audio ready in ${a.ms} ms (free Space; first call after sleep can take ~1 min)`);
        await playUrl(a.url);
        URL.revokeObjectURL(a.url);
      } catch (e) {
        addLog(`MMS failed — ${(e as Error).message}`);
      }
    }
  }

  /* --------------------------------- UI --------------------------------- */

  const Dot = ({ ok }: { ok: boolean }) => <span className={`inline-block h-2.5 w-2.5 rounded-full ${ok ? 'bg-brand-green' : 'bg-error'}`} />;
  const cur = plan && step >= 0 ? plan.steps[step] : null;

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <h1 className="text-3xl font-black text-ink">🧪 Board explainer lab</h1>
        <p className="mt-1 text-sm font-semibold text-ink/60">
          Test page (admin only). Free tools only: Groq models write the lesson plan, the board draws it, and a browser voice or the free MMS
          Uzbek voice reads it. Nothing is saved.
        </p>

        {/* status */}
        <div className="card mt-4 flex flex-wrap gap-x-6 gap-y-2 p-4 text-sm font-bold text-ink">
          {status ? (
            <>
              <span className="flex items-center gap-2"><Dot ok={status.groq} /> Groq key {status.groq ? '' : '(add GROQ_API_KEY)'}</span>
              <span className="flex items-center gap-2"><Dot ok={status.hf} /> Hugging Face token {status.hf ? '(router needs credits)' : ''}</span>
              <span className="flex items-center gap-2"><Dot ok={status.uzTts} /> MMS Uzbek voice {status.uzTts ? '' : '(add UZ_TTS_URL)'}</span>
              <span className="flex items-center gap-2"><Dot ok={voices.length > 0} /> Browser voices: {voices.length}</span>
            </>
          ) : (
            <span>Loading status…</span>
          )}
        </div>

        {/* plan generation */}
        <section className="card mt-4 p-4">
          <h2 className="text-lg font-black text-ink">1 · Lesson plan</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              list="lab-topics"
              maxLength={300}
              className="min-w-0 rounded-xl border border-ink/15 bg-white px-3 py-2 font-semibold text-ink outline-none focus:border-brand-blue"
            />
            <datalist id="lab-topics">{TOPICS.map((t) => <option key={t} value={t} />)}</datalist>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-xl border border-ink/15 bg-white px-3 py-2 font-bold">
              <option value="uz">Oʻzbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
            <select value={model} onChange={(e) => setModel(e.target.value)} className="min-w-0 rounded-xl border border-ink/15 bg-white px-3 py-2 font-bold">
              {status?.models.map((m) => (
                <option key={`${m.provider}|${m.id}`} value={`${m.provider}|${m.id}`}>
                  {m.provider === 'groq' ? 'Groq' : 'HF'} · {m.id}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="btn-blue px-5 py-2 text-sm disabled:opacity-50"
              disabled={!model || !topic.trim()}
              onClick={() => {
                const [p, ...rest] = model.split('|');
                runOne(p, rest.join('|'));
              }}
            >
              Generate
            </button>
            <button className="btn-ghost px-5 py-2 text-sm disabled:opacity-50" disabled={!status || !topic.trim()} onClick={compareAll}>
              Compare all models
            </button>
            {results.length > 0 && (
              <button className="btn-ghost px-4 py-2 text-sm" onClick={() => setResults([])}>
                Clear
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase text-ink/45">
                  <tr>
                    <th className="py-1.5">Model</th>
                    <th>Time</th>
                    <th>Tokens in/out</th>
                    <th>Steps</th>
                    <th>Issues</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <FragmentRow key={r.key} r={r} open={openRaw === r.key} onRaw={() => setOpenRaw(openRaw === r.key ? null : r.key)} onShow={() => r.plan && showPlan(r.plan, r.model)} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* board */}
        <section className="card mt-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-black text-ink">2 · Board {planFrom && <span className="text-sm font-bold text-ink/45">— {planFrom}</span>}</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <select value={voice} onChange={(e) => setVoice(e.target.value as Voice)} className="rounded-lg border border-ink/15 bg-white px-2 py-1.5">
                <option value="browser">Voice: browser</option>
                <option value="mms" disabled={!status?.uzTts}>Voice: MMS Uzbek (free Space)</option>
                <option value="none">Voice: off</option>
              </select>
              <label className="flex items-center gap-1">
                Speed
                <input type="range" min={0.6} max={1.4} step={0.05} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
                <span className="w-9 tabular-nums">{speed.toFixed(2)}</span>
              </label>
            </div>
          </div>
          {voice === 'browser' && (
            <select value={voiceName} onChange={(e) => setVoiceName(e.target.value)} className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-sm font-semibold">
              <option value="">(default voice)</option>
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.lang} · {v.name}
                  {v.localService ? '' : ' (online)'}
                </option>
              ))}
            </select>
          )}

          <div className="mt-3">
            <Board plan={plan} step={step} runId={runId} />
          </div>
          <div className="mt-3 min-h-[3.5rem] rounded-xl bg-ink/[0.04] px-4 py-3 text-[16px] font-semibold text-ink">
            {cur ? (
              <>
                <span className="mr-2 font-black text-brand-blue">{step + 1}/{plan!.steps.length}</span>
                {cur.say}
              </>
            ) : (
              <span className="text-ink/45">Generate a plan, then press Play.</span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-primary px-6 py-2 text-sm disabled:opacity-50" disabled={!plan || playing} onClick={() => play(0)}>
              ▶ Play from start
            </button>
            <button className="btn-ghost px-4 py-2 text-sm disabled:opacity-50" disabled={!playing} onClick={stop}>
              ■ Stop
            </button>
            <button className="btn-ghost px-4 py-2 text-sm disabled:opacity-50" disabled={!plan || playing || step <= 0} onClick={() => { setStep(step - 1); setRunId((n) => n + 1); }}>
              ‹ Prev
            </button>
            <button className="btn-ghost px-4 py-2 text-sm disabled:opacity-50" disabled={!plan || playing || step >= (plan?.steps.length ?? 0) - 1} onClick={() => { setStep(step + 1); setRunId((n) => n + 1); }}>
              Next ›
            </button>
            <button className="btn-ghost px-4 py-2 text-sm disabled:opacity-50" disabled={!plan || playing || step < 0} onClick={() => play(Math.max(0, step))}>
              ▶ Play from this step
            </button>
          </div>
        </section>

        {/* voice test */}
        <section className="card mt-4 p-4">
          <h2 className="text-lg font-black text-ink">3 · Voice test</h2>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={3}
            maxLength={600}
            className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 font-semibold text-ink outline-none focus:border-brand-blue"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            <button className="btn-blue px-4 py-2 text-sm" onClick={() => testVoice('browser')}>
              🔊 Browser voice
            </button>
            <button className="btn-blue px-4 py-2 text-sm disabled:opacity-50" disabled={!status?.uzTts} onClick={() => testVoice('mms')}>
              🔊 MMS Uzbek
            </button>
            <button className="btn-ghost px-4 py-2 text-sm" onClick={stop}>
              ■ Stop
            </button>
          </div>
          {log.length > 0 && (
            <pre className="mt-3 max-h-48 overflow-auto rounded-xl bg-ink/[0.05] p-3 text-xs font-semibold text-ink/70">{log.join('\n')}</pre>
          )}
        </section>
      </div>
    </main>
  );
}

function FragmentRow({ r, open, onRaw, onShow }: { r: Result; open: boolean; onRaw: () => void; onShow: () => void }) {
  const issues = r.issues?.length ?? 0;
  return (
    <>
      <tr className="border-t border-ink/10 align-top font-semibold text-ink">
        <td className="py-2 pr-2">
          <div className="font-black">{r.model}</div>
          <div className="text-xs text-ink/45">{r.provider}</div>
        </td>
        <td className="py-2 tabular-nums">{r.state === 'running' ? '…' : r.ms != null ? `${(r.ms / 1000).toFixed(1)} s` : ''}</td>
        <td className="py-2 tabular-nums">{r.usage ? `${r.usage.input ?? '?'} / ${r.usage.output ?? '?'}` : ''}</td>
        <td className="py-2">{r.plan ? r.plan.steps.length : ''}</td>
        <td className="py-2">
          {r.state === 'error' ? (
            <span className="text-error">{r.error}</span>
          ) : r.parseError ? (
            <span className="text-error">JSON: {r.parseError}</span>
          ) : r.state === 'done' ? (
            <span className={issues ? 'text-brand-orange' : 'text-brand-green'}>{issues ? `${issues} fixed/dropped` : 'clean ✓'}</span>
          ) : null}
        </td>
        <td className="whitespace-nowrap py-2 text-right">
          {r.plan && (
            <button className="mr-1 rounded-lg bg-brand-blue px-3 py-1 text-xs font-black text-white" onClick={onShow}>
              Show
            </button>
          )}
          {(r.raw || issues > 0) && (
            <button className="rounded-lg border border-ink/15 px-3 py-1 text-xs font-black" onClick={onRaw}>
              {open ? 'Hide' : 'Raw'}
            </button>
          )}
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={6} className="pb-3">
            {issues > 0 && <ul className="mb-2 list-disc pl-5 text-xs font-semibold text-brand-orange">{r.issues!.map((i, k) => <li key={k}>{i}</li>)}</ul>}
            {r.raw && <pre className="max-h-72 overflow-auto rounded-xl bg-ink/[0.05] p-3 text-xs text-ink/75">{r.raw}</pre>}
          </td>
        </tr>
      )}
    </>
  );
}
