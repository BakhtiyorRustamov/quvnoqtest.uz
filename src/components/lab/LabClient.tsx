'use client';

import VoiceAsk from './VoiceAsk';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AZURE_VOICES, GEMINI_VOICES, type CheckProblem, type LabPlan } from '@/lib/lab/plan';
import Board, { stepMs } from './Board';

type Status = {
  groq: boolean;
  hf: boolean;
  google: boolean;
  uzTts: boolean;
  azure: boolean;
  geminiTts?: string[];
  models: { id: string; provider: 'groq' | 'hf' | 'google' }[];
};
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
  topic: string;
  book: string;
  excerpts?: { id: string; page: number; heading: string }[];
  check?: {
    state: 'running' | 'done' | 'error';
    by: string;
    problems?: CheckProblem[];
    error?: string;
    ms?: number;
  };
};
type Book = { id: string; title: string; sections: string };
type Answer = {
  key: string;
  model: string;
  state: 'running' | 'done' | 'error';
  answer?: string | null;
  notFound?: boolean;
  error?: string;
  ms?: number;
  excerpts?: { id: string; page: number; heading: string; text: string }[];
};
type Voice = 'browser' | 'azure' | 'gemini' | 'mms' | 'none';
type ServerVoice = 'azure' | 'gemini' | 'mms';
const isServer = (v: Voice): v is ServerVoice => v === 'azure' || v === 'gemini' || v === 'mms';

const TOPICS = [
  'Funksiya limiti',
  'Oʻzgarishning oʻrtacha tezligi',
  'Uzilish nuqtasi',
  'Aylana, radius va diametr',
  'Pifagor teoremasi',
  'y = x² funksiyaning grafigi',
  'Oddiy va murakkab foiz (bank omonati)',
  'Amudaryo va Sirdaryo: Orol dengizi muammosi',
  'Fotosintez qanday ishlaydi',
  'Amir Temur davlatining tashkil topishi'
];
const LANG_TAG: Record<string, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US'
};
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export default function LabClient() {
  const [status, setStatus] = useState<Status | null>(null);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [lang, setLang] = useState('uz');
  const [model, setModel] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [openRaw, setOpenRaw] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [book, setBook] = useState('');
  const [qaBook, setQaBook] = useState('');
  // textbook Q&A
  const [question, setQuestion] = useState('Funksiyaning limiti nima? Misol bilan tushuntiring.');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [openEx, setOpenEx] = useState<string | null>(null);

  // player
  const [plan, setPlan] = useState<LabPlan | null>(null);
  const [planFrom, setPlanFrom] = useState('');
  const [step, setStep] = useState(-1);
  const [runId, setRunId] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [voice, setVoice] = useState<Voice>('browser');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState('');
  const [azVoice, setAzVoice] = useState(AZURE_VOICES.uz[0]);
  const [gmModel, setGmModel] = useState('');
  const [gmVoice, setGmVoice] = useState('Achird');
  const [gmStyle, setGmStyle] = useState('warm, clear and friendly, like a kind school teacher, at a calm pace');
  const [hfExtra, setHfExtra] = useState<string[]>([]);
  // lesson audio (prepared lessons)
  type AudioRow = {
    slug: string;
    n: number;
    title: string;
    section?: string;
    steps: number;
    provider?: 'gemini' | 'azure';
    voice: string | null;
    main: string;
    easy: string;
    recut?: { main: boolean; easy: boolean };
  };
  const [audioRows, setAudioRows] = useState<AudioRow[] | null>(null);
  const [audioBusy, setAudioBusy] = useState<string | null>(null);
  // lesson-audio jobs wait here and run one at a time (each keeps the voice it was queued with)
  type AudioJob = {
    key: string;
    row: AudioRow;
    track: 'main' | 'easy';
    recut: boolean;
    voice: string;
    model: string;
    style: string;
  };
  const [audioQueue, setAudioQueue] = useState<AudioJob[]>([]);
  const [audioLog, setAudioLog] = useState<string[]>([]);
  const [hfInput, setHfInput] = useState('');
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
        if (s.geminiTts?.[0]) setGmModel(s.geminiTts[0]);
        if (s.azure) setVoice('azure');
        else if (s.uzTts) setVoice('mms');
      })
      .catch(() => setStatus(null));
    fetch('/api/lab/books')
      .then((r) => r.json())
      .then((d: { books?: Book[] }) => {
        setBooks(d.books ?? []);
        if (d.books?.[0]) {
          setBook(d.books[0].id);
          setQaBook(d.books[0].id);
        }
      })
      .catch(() => {});
    const load = () => setVoices(window.speechSynthesis?.getVoices() ?? []);
    load();
    window.speechSynthesis?.addEventListener?.('voiceschanged', load);
    return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', load);
  }, []);

  // pick the best browser voice for the language when the list or language changes
  useEffect(() => {
    if (!voices.length) return;
    const pre = lang === 'uz' ? ['uz', 'tr', 'ru'] : [lang];
    const of = (p: string) => voices.filter((v) => v.lang.toLowerCase().startsWith(p));
    const best = pre.map((p) => of(p).find((v) => /natural/i.test(v.name)) ?? of(p)[0]).find(Boolean);
    setVoiceName(best?.name ?? '');
  }, [voices, lang]);
  useEffect(() => setAzVoice((AZURE_VOICES[lang] ?? AZURE_VOICES.uz)[0]), [lang]);

  /* --------------------------- plan generation --------------------------- */

  const runOne = useCallback(
    async (provider: string, id: string) => {
      const key = `${provider}|${id}|${Date.now()}`;
      setResults((r) => [{ key, model: id, provider, state: 'running', topic, book }, ...r]);
      const t0 = Date.now();
      try {
        const res = await fetch('/api/lab/plan', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            topic,
            lang,
            model: id,
            provider,
            book: book || undefined
          })
        });
        const data = await res.json();
        const r: Partial<Result> = res.ok
          ? { state: 'done', ...data, model: id, provider }
          : {
              state: 'error',
              error: data.error ?? `HTTP ${res.status}`,
              ms: data.ms ?? Date.now() - t0,
              raw: data.raw,
              excerpts: data.excerpts
            };
        setResults((all) => all.map((x) => (x.key === key ? { ...x, ...r } : x)));
        if (res.ok && data.plan && !plan) showPlan(data.plan, id);
      } catch (e) {
        setResults((all) =>
          all.map((x) =>
            x.key === key
              ? {
                  ...x,
                  state: 'error',
                  error: (e as Error).message,
                  ms: Date.now() - t0
                }
              : x
          )
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topic, lang, plan, book]
  );

  const allModels = (): Status['models'] => [...(status?.models ?? []), ...hfExtra.map((id) => ({ id, provider: 'hf' as const }))];
  const modelList = () =>
    status ? allModels().filter((m) => (m.provider === 'groq' ? status.groq : m.provider === 'google' ? status.google : status.hf)) : [];
  const splitModel = (v: string) => {
    const [p, ...rest] = v.split('|');
    return { provider: p, id: rest.join('|') };
  };

  /** Second opinion: the model selected in the dropdown reviews a result's lesson. */
  async function checkFacts(r: Result) {
    if (!r.plan || !model) return;
    const m = splitModel(model);
    const set = (c: Result['check']) => setResults((all) => all.map((x) => (x.key === r.key ? { ...x, check: c } : x)));
    set({ state: 'running', by: m.id });
    try {
      const res = await fetch('/api/lab/check', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          plan: r.plan,
          topic: r.topic,
          book: r.book || undefined,
          model: m.id,
          provider: m.provider
        })
      });
      const d = await res.json();
      set(
        res.ok
          ? { state: 'done', by: m.id, problems: d.problems, ms: d.ms }
          : {
              state: 'error',
              by: m.id,
              error: d.error ?? `HTTP ${res.status}`
            }
      );
    } catch (e) {
      set({ state: 'error', by: m.id, error: (e as Error).message });
    }
    setOpenRaw(r.key);
  }

  async function ask(provider: string, id: string) {
    const key = `${provider}|${id}|${Date.now()}`;
    setAnswers((a) => [{ key, model: id, state: 'running' }, ...a]);
    const t0 = Date.now();
    try {
      const res = await fetch('/api/lab/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question,
          lang,
          book: qaBook,
          model: id,
          provider
        })
      });
      const d = await res.json();
      const upd: Partial<Answer> = res.ok
        ? { state: 'done', ...d }
        : {
            state: 'error',
            error: d.error ?? `HTTP ${res.status}`,
            ms: d.ms ?? Date.now() - t0,
            excerpts: d.excerpts
          };
      setAnswers((all) => all.map((x) => (x.key === key ? { ...x, ...upd } : x)));
    } catch (e) {
      setAnswers((all) => all.map((x) => (x.key === key ? { ...x, state: 'error', error: (e as Error).message } : x)));
    }
  }

  async function compareAll() {
    if (!status) return;
    // Groq limits are per model, so models run in parallel; HF only if a token exists
    await Promise.allSettled(modelList().map((m) => runOne(m.provider, m.id)));
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

  /** Fetch server-made audio (Azure or MMS) for a text; kept only in memory as a blob URL. */
  async function serverAudio(kind: ServerVoice, text: string): Promise<{ url: string; ms: number }> {
    const t0 = Date.now();
    const res = await fetch(kind === 'azure' ? '/api/lab/tts-azure' : kind === 'gemini' ? '/api/lab/tts-gemini' : '/api/lab/tts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(kind === 'gemini' ? { text, model: gmModel, voice: gmVoice, style: gmStyle } : { text, speed, voice: azVoice })
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
      if (!isServer(voice) || i >= plan.steps.length) return null;
      pending[i] ??= serverAudio(voice, plan.steps[i].say);
      return pending[i];
    };
    get(from);
    for (let i = from; i < plan.steps.length; i++) {
      if (stopRef.current) break;
      const s = plan.steps[i];
      let speech: Promise<void>;
      if (isServer(voice)) {
        get(i + 1)?.catch(() => {});
        try {
          const a = await get(i)!;
          if (stopRef.current) break;
          addLog(`step ${i + 1}: ${voice} audio ready in ${a.ms} ms`);
          setStep(i);
          setRunId((n) => n + 1);
          speech = playUrl(a.url).then(() => URL.revokeObjectURL(a.url));
        } catch (e) {
          addLog(`step ${i + 1}: ${voice} failed — ${(e as Error).message}`);
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
      await Promise.all([speech, sleep(stepMs(s.draw) + 400)]);
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
    } else if (isServer(kind)) {
      const name = kind === 'azure' ? azVoice : kind === 'gemini' ? `Gemini ${gmVoice} (${gmModel})` : 'MMS';
      try {
        addLog(`${name}: requesting…`);
        const a = await serverAudio(kind, testText);
        addLog(`${name}: audio ready in ${a.ms} ms`);
        await playUrl(a.url);
        URL.revokeObjectURL(a.url);
      } catch (e) {
        addLog(`${name} failed — ${(e as Error).message}`);
      }
    }
  }

  async function loadAudioRows() {
    const r = await fetch('/api/lab/lesson-audio');
    const d = await r.json().catch(() => ({}));
    if (r.ok) setAudioRows(d.lessons);
    else setAudioLog((l) => [`status: ${d.error ?? r.status}`, ...l]);
  }

  /** Add a lesson track to the queue (or take it out again if it is still waiting). */
  function queueLesson(row: AudioRow, track: 'main' | 'easy', recut = false) {
    const key = `${row.slug} ${row.n} ${track}${recut ? ' recut' : ''}`;
    if (audioBusy === key) return;
    setAudioQueue((q) =>
      q.some((j) => j.key === key)
        ? q.filter((j) => j.key !== key)
        : [
            ...q,
            {
              key,
              row,
              track,
              recut,
              voice: gmVoice,
              model: gmModel,
              style: gmStyle
            }
          ]
    );
  }

  // run the queue: the next job starts when the previous one has finished
  useEffect(() => {
    if (audioBusy || !audioQueue.length) return;
    const [job, ...rest] = audioQueue;
    setAudioQueue(rest);
    void voiceLesson(job);
  }, [audioBusy, audioQueue]); // eslint-disable-line react-hooks/exhaustive-deps

  async function voiceLesson(job: AudioJob) {
    const { row, track, recut, voice, model, style } = job;
    const tag = `${row.slug} ${row.n} ${track}`;
    const t = () => new Date().toLocaleTimeString();
    setAudioBusy(job.key);
    setAudioLog((l) => [
      `${t()}  ${tag}: ${recut ? 're-cutting the saved recording (no Gemini request)…' : row.provider === 'azure' ? 'Azure: one request per step (about 3 s each)…' : `one Gemini request (${voice}, ${model || 'default model'})…`}`,
      ...l
    ]);
    try {
      const r = await fetch('/api/lab/lesson-audio', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          slug: row.slug,
          n: row.n,
          track,
          voice,
          model,
          style,
          recut
        })
      });
      const d = await r.json().catch(() => ({}));
      const lines = r.ok
        ? [
            `${t()}  ${tag}: saved ${d.clips?.length} clips in ${Math.round((d.ttsMs ?? 0) / 1000)} s — cut by ${d.cutBy}`,
            ...(d.clips ?? []).map((sec: number, i: number) => `      ${i + 1}. ${sec} s${d.heard?.[i] ? `  «${d.heard[i]}…»` : ''}`)
          ]
        : [`${t()}  ${tag}: failed — ${d.error ?? r.status}`];
      setAudioLog((l) => [...lines, ...l]);
    } catch (e) {
      setAudioLog((l) => [`${tag}: ${(e as Error).message}`, ...l]);
    }
    await loadAudioRows();
    setAudioBusy(null);
  }

  /** Button text for a lesson track: running / place in the queue / normal. */
  const jobLabel = (key: string, normal: string) => {
    if (audioBusy === key) return '… voicing';
    const at = audioQueue.findIndex((j) => j.key === key);
    return at >= 0 ? `Queued #${at + 1} ✕` : normal;
  };

  /* --------------------------------- UI --------------------------------- */

  const Dot = ({ ok }: { ok: boolean }) => <span className={`inline-block h-2.5 w-2.5 rounded-full ${ok ? 'bg-brand-green' : 'bg-error'}`} />;
  const cur = plan && step >= 0 ? plan.steps[step] : null;

  /** Section 5 table for one group of lessons. */
  const renderAudioTable = (rows: AudioRow[]) => (
    <table className="w-full min-w-[620px] text-left text-sm">
      <thead className="text-xs uppercase text-ink/45">
        <tr>
          <th className="py-1.5">Lesson</th>
          <th>Steps</th>
          <th>Voice</th>
          <th>Main</th>
          <th>Tushunmadim</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={`${row.slug}-${row.n}`} className="border-t border-ink/10 font-semibold text-ink">
            <td className="py-2 pr-2">
              <div className="font-black">
                {row.slug} · {row.n}
              </div>
              <div className="text-xs text-ink/50">{row.title}</div>
            </td>
            <td>{row.steps}</td>
            <td>{row.voice ?? (row.provider === 'azure' ? 'Azure' : '—')}</td>
            {(['main', 'easy'] as const).map((tr) => (
              <td key={tr} className="py-2">
                <span className={row[tr] === 'ok' ? 'text-brand-green' : row[tr] === 'outdated' ? 'text-brand-orange' : 'text-ink/40'}>
                  {row[tr] === 'ok' ? '✓ ready' : row[tr]}
                </span>
                <button
                  className="ml-2 rounded-xl border-2 border-ink/15 bg-white px-3.5 py-2 text-sm font-black hover:border-brand-blue disabled:opacity-40"
                  disabled={audioBusy === `${row.slug} ${row.n} ${tr}` || (row.provider === 'azure' ? !status?.azure : !status?.google)}
                  title={row.provider === 'azure' ? 'Azure neural voices, one request per step' : 'One Gemini request'}
                  onClick={() => queueLesson(row, tr)}
                >
                  {jobLabel(`${row.slug} ${row.n} ${tr}`, row[tr] === 'ok' ? 'Redo' : 'Voice it')}
                </button>
                {row.recut?.[tr] && (
                  <button
                    className="ml-1.5 rounded-xl border-2 border-ink/15 bg-white px-3.5 py-2 text-sm font-black hover:border-brand-blue disabled:opacity-40"
                    disabled={audioBusy === `${row.slug} ${row.n} ${tr} recut`}
                    title="Cut the saved recording again — no Gemini request"
                    onClick={() => queueLesson(row, tr, true)}
                  >
                    {jobLabel(`${row.slug} ${row.n} ${tr} recut`, 'Re-cut')}
                  </button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-6">
        <h1 className="text-3xl font-black text-ink">🧪 Board explainer lab</h1>
        <p className="mt-1 text-sm font-semibold text-ink/60">
          Test page (admin only). Free tools only: Groq models write the lesson plan, the board draws it, and a voice reads it (browser voices, Microsoft neural
          voices on the free Azure tier, or MMS). Nothing is saved.
        </p>

        {/* status */}
        <div className="card mt-4 flex flex-wrap gap-x-6 gap-y-2 p-4 text-sm font-bold text-ink">
          {status ? (
            <>
              <span className="flex items-center gap-2">
                <Dot ok={status.groq} /> Groq key {status.groq ? '' : '(add GROQ_API_KEY)'}
              </span>
              <span className="flex items-center gap-2">
                <Dot ok={status.google} /> Google key (free Gemma) {status.google ? '' : '(add GOOGLE_AI_API_KEY)'}
              </span>
              <span className="flex items-center gap-2">
                <Dot ok={status.hf} /> Hugging Face token {status.hf ? '(router needs credits)' : ''}
              </span>
              <span className="flex items-center gap-2">
                <Dot ok={status.azure} /> Microsoft voices {status.azure ? '' : '(add AZURE_SPEECH_KEY + AZURE_SPEECH_REGION)'}
              </span>
              {status.uzTts && (
                <span className="flex items-center gap-2">
                  <Dot ok /> MMS Uzbek voice
                </span>
              )}
              <span className="flex items-center gap-2">
                <Dot ok={voices.length > 0} /> Browser voices: {voices.length}
              </span>
            </>
          ) : (
            <span>Loading status…</span>
          )}
        </div>

        {/* plan generation */}
        <section className="card mt-4 p-4">
          <h2 className="text-lg font-black text-ink">1 · Lesson plan</h2>
          <label className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold text-ink">
            📖 Source
            <select
              value={book}
              onChange={(e) => setBook(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-ink/15 bg-white px-3 py-2 font-bold"
            >
              <option value="">Model knowledge only (no textbook)</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  Textbook: {b.title} — {b.sections}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              list="lab-topics"
              maxLength={300}
              className="min-w-0 rounded-xl border border-ink/15 bg-white px-3 py-2 font-semibold text-ink outline-none focus:border-brand-blue"
            />
            <datalist id="lab-topics">
              {TOPICS.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-xl border border-ink/15 bg-white px-3 py-2 font-bold">
              <option value="uz">Oʻzbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
            <select value={model} onChange={(e) => setModel(e.target.value)} className="min-w-0 rounded-xl border border-ink/15 bg-white px-3 py-2 font-bold">
              {allModels().map((m) => (
                <option key={`${m.provider}|${m.id}`} value={`${m.provider}|${m.id}`}>
                  {m.provider === 'groq' ? 'Groq' : m.provider === 'google' ? 'Google' : 'HF'} · {m.id}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="btn-blue px-5 py-2 text-sm disabled:opacity-50"
              disabled={!model || !topic.trim()}
              onClick={() => {
                const m = splitModel(model);
                runOne(m.provider, m.id);
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

          <form
            className="mt-2 flex flex-wrap items-center gap-2 text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              const id = hfInput.trim();
              if (/^[\w.-]+\/[\w.-]+(:[\w.-]+)?$/.test(id) && !allModels().some((m) => m.provider === 'hf' && m.id === id)) {
                setHfExtra((x) => [...x, id]);
                setModel(`hf|${id}`);
              }
              setHfInput('');
            }}
          >
            <span className="font-bold text-ink/55">🤗 Add a Hugging Face model:</span>
            <input
              value={hfInput}
              onChange={(e) => setHfInput(e.target.value)}
              placeholder="e.g. google/gemma-3-27b-it"
              className="min-w-0 flex-1 rounded-lg border border-ink/15 bg-white px-2 py-1.5 font-semibold outline-none focus:border-brand-blue"
            />
            <button type="submit" className="btn-ghost px-3 py-1.5 text-xs" disabled={!hfInput.trim()}>
              Add
            </button>
            {status && !status.hf && <span className="text-xs font-bold text-error">needs HF_TOKEN</span>}
          </form>

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
                    <FragmentRow
                      key={r.key}
                      r={r}
                      open={openRaw === r.key}
                      onRaw={() => setOpenRaw(openRaw === r.key ? null : r.key)}
                      onShow={() => r.plan && showPlan(r.plan, r.model)}
                      onCheck={() => checkFacts(r)}
                      checker={model ? splitModel(model).id : ''}
                    />
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs font-semibold text-ink/45">
                “Check facts” asks the model selected above to review that lesson{book ? ' against the textbook' : ''}.
              </p>
            </div>
          )}
        </section>

        {/* board */}
        <section className="card mt-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-black text-ink">2 · Board {planFrom && <span className="text-sm font-bold text-ink/45">— {planFrom}</span>}</h2>
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <select value={voice} onChange={(e) => setVoice(e.target.value as Voice)} className="rounded-lg border border-ink/15 bg-white px-2 py-1.5">
                <option value="gemini" disabled={!status?.google}>
                  Voice: Gemini (Google, free tier)
                </option>
                <option value="azure" disabled={!status?.azure}>
                  Voice: Microsoft (Azure)
                </option>
                <option value="browser">Voice: browser</option>
                <option value="mms" disabled={!status?.uzTts}>
                  Voice: MMS Uzbek (free Space)
                </option>
                <option value="none">Voice: off</option>
              </select>
              <label className="flex items-center gap-1">
                Speed
                <input type="range" min={0.6} max={1.4} step={0.05} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
                <span className="w-9 tabular-nums">{speed.toFixed(2)}</span>
              </label>
            </div>
          </div>
          {voice === 'gemini' && (
            <GeminiVoicePicker
              models={status?.geminiTts ?? []}
              model={gmModel}
              setModel={setGmModel}
              voice={gmVoice}
              setVoice={setGmVoice}
              style={gmStyle}
              setStyle={setGmStyle}
            />
          )}
          {voice === 'azure' && (
            <select
              value={azVoice}
              onChange={(e) => setAzVoice(e.target.value)}
              className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-sm font-semibold"
            >
              {Object.values(AZURE_VOICES)
                .flat()
                .map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
            </select>
          )}
          {voice === 'browser' && (
            <select
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-sm font-semibold"
            >
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
                <span className="mr-2 font-black text-brand-blue">
                  {step + 1}/{plan!.steps.length}
                </span>
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
            <button
              className="btn-ghost px-4 py-2 text-sm disabled:opacity-50"
              disabled={!plan || playing || step <= 0}
              onClick={() => {
                setStep(step - 1);
                setRunId((n) => n + 1);
              }}
            >
              ‹ Prev
            </button>
            <button
              className="btn-ghost px-4 py-2 text-sm disabled:opacity-50"
              disabled={!plan || playing || step >= (plan?.steps.length ?? 0) - 1}
              onClick={() => {
                setStep(step + 1);
                setRunId((n) => n + 1);
              }}
            >
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
          <p className="mt-1 text-xs font-semibold text-ink/50">Gemini and Microsoft use the voice settings chosen in section 2.</p>
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
            <button className="btn-blue px-4 py-2 text-sm disabled:opacity-50" disabled={!status?.azure} onClick={() => testVoice('azure')}>
              🔊 Microsoft voice
            </button>
            <button
              className="btn-blue px-4 py-2 text-sm disabled:opacity-50"
              disabled={!status?.google}
              onClick={() => testVoice('gemini')}
              title={`Gemini ${gmVoice}`}
            >
              🔊 Gemini voice
            </button>
            <button className="btn-blue px-4 py-2 text-sm disabled:opacity-50" disabled={!status?.uzTts} onClick={() => testVoice('mms')}>
              🔊 MMS Uzbek
            </button>
            <button className="btn-ghost px-4 py-2 text-sm" onClick={stop}>
              ■ Stop
            </button>
          </div>
          {log.length > 0 && <pre className="mt-3 max-h-48 overflow-auto rounded-xl bg-ink/[0.05] p-3 text-xs font-semibold text-ink/70">{log.join('\n')}</pre>}
        </section>

        {/* textbook Q&A */}
        <section className="card mt-4 p-4">
          <h2 className="text-lg font-black text-ink">4 · Textbook Q&amp;A (RAG)</h2>
          <p className="mt-1 text-sm font-semibold text-ink/55">
            The question is matched to textbook passages, and the model may answer only from them, with page numbers.
          </p>
          {books.length === 0 ? (
            <p className="mt-2 text-sm font-bold text-error">No textbook loaded.</p>
          ) : (
            <>
              <select
                value={qaBook}
                onChange={(e) => setQaBook(e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm font-bold"
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} — {b.sections}
                  </option>
                ))}
              </select>
              <VoiceAsk onUse={setQuestion} />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={2}
                maxLength={400}
                className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-2 font-semibold text-ink outline-none focus:border-brand-blue"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  className="btn-blue px-5 py-2 text-sm disabled:opacity-50"
                  disabled={!model || !question.trim() || !qaBook}
                  onClick={() => {
                    const m = splitModel(model);
                    ask(m.provider, m.id);
                  }}
                >
                  Ask ({model ? splitModel(model).id : '—'})
                </button>
                <button
                  className="btn-ghost px-5 py-2 text-sm disabled:opacity-50"
                  disabled={!status || !question.trim() || !qaBook}
                  onClick={() => modelList().forEach((m) => ask(m.provider, m.id))}
                >
                  Ask all models
                </button>
                {answers.length > 0 && (
                  <button className="btn-ghost px-4 py-2 text-sm" onClick={() => setAnswers([])}>
                    Clear
                  </button>
                )}
              </div>
              <div className="mt-3 space-y-3">
                {answers.map((a) => (
                  <div key={a.key} className="rounded-xl border border-ink/10 bg-white p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-black text-ink/50">
                      <span>{a.model}</span>
                      <span className="tabular-nums">{a.state === 'running' ? 'thinking…' : a.ms ? `${(a.ms / 1000).toFixed(1)} s` : ''}</span>
                    </div>
                    {a.state === 'error' && <p className="mt-1 text-sm font-bold text-error">{a.error}</p>}
                    {a.notFound && (
                      <p className="mt-1 text-sm font-bold text-brand-orange">No matching passage in the loaded pages, so the model was not asked.</p>
                    )}
                    {a.answer && <p className="mt-1 whitespace-pre-line text-[15px] font-semibold leading-relaxed text-ink">{a.answer}</p>}
                    {!!a.excerpts?.length && (
                      <div className="mt-2">
                        <button className="text-xs font-black text-brand-blue" onClick={() => setOpenEx(openEx === a.key ? null : a.key)}>
                          📖 Used pages: {[...new Set(a.excerpts.map((e) => e.page))].join(', ')} {openEx === a.key ? '▲' : '▼'}
                        </button>
                        {openEx === a.key && (
                          <div className="mt-2 space-y-2">
                            {a.excerpts.map((e) => (
                              <div key={e.id} className="rounded-lg bg-ink/[0.04] p-2 text-xs font-semibold text-ink/70">
                                <div className="font-black text-ink/80">
                                  {e.page}-bet · {e.heading}
                                </div>
                                <div className="mt-1 whitespace-pre-line">{e.text}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* prepared lesson audio */}
        <section className="card mt-4 p-4">
          <h2 className="text-lg font-black text-ink">5 · Lesson audio (Gemini)</h2>
          <p className="mt-1 text-sm font-semibold text-ink/55">
            Voices a prepared lesson with one Gemini request per track and saves one clip per step to Supabase Storage. Uses the voice picked here (shared with
            section 2) and the model and style from section 2 — keep the same voice for both tracks of a lesson. The free tier allows only a few requests a day.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button className="btn-ghost px-5 py-2.5 text-base" onClick={loadAudioRows}>
              {audioRows ? '↻ Refresh' : 'Show lessons'}
            </button>
            <label className="flex items-center gap-2 text-base font-black text-ink">
              Voice
              <select
                value={gmVoice}
                onChange={(e) => setGmVoice(e.target.value)}
                className="rounded-xl border-2 border-ink/15 bg-white px-3 py-2 text-base font-bold text-ink disabled:opacity-50"
              >
                {GEMINI_VOICES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="btn-ghost px-4 py-2.5 text-base disabled:opacity-50"
              disabled={!status?.google}
              onClick={() => testVoice('gemini')}
              title={`Hear a sample of ${gmVoice}`}
            >
              ▶ Hear it
            </button>
          </div>
          <p className="mt-2 text-sm font-semibold text-ink/55">
            Click several tracks to queue them — they are voiced one after another, each with the voice chosen when you clicked. Click a queued one again to
            take it out.
            {audioQueue.length > 0 && (
              <>
                {' '}
                <b className="text-ink">{audioQueue.length} waiting.</b>{' '}
                <button className="font-black text-brand-blue underline" onClick={() => setAudioQueue([])}>
                  Clear queue
                </button>
              </>
            )}
          </p>
          {audioRows && (
            <div className="mt-3 space-y-2">
              {groupAudioRows(audioRows).map(({ slug, sections, done, total }) => (
                <details key={slug} className="rounded-xl border-2 border-ink/10 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-base font-black text-ink">
                    <span>{slug}</span>
                    <span className={`text-sm ${done === total ? 'text-brand-green' : 'text-ink/50'}`}>
                      {done} / {total} tracks ready
                    </span>
                  </summary>
                  <div className="space-y-2 px-3 pb-3">
                    {sections.map((sec) => (
                      <details key={sec.name || '-'} className="rounded-lg border border-ink/10" open={sections.length === 1}>
                        <summary className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm font-black text-ink">
                          <span>{sec.name || 'Darslar'}</span>
                          <span className={sec.done === sec.total ? 'text-brand-green' : 'text-ink/50'}>
                            {sec.done} / {sec.total}
                          </span>
                        </summary>
                        <div className="overflow-x-auto px-2 pb-2">{renderAudioTable(sec.rows)}</div>
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          )}
          {audioLog.length > 0 && (
            <pre className="mt-3 max-h-48 overflow-auto rounded-xl bg-ink/[0.05] p-3 text-xs font-semibold text-ink/70">{audioLog.join('\n')}</pre>
          )}
        </section>
      </div>
    </main>
  );
}

/** Section 5: lessons grouped by subject, then by chapter / textbook part. "done" counts ready tracks (main + easy). */
function groupAudioRows<R extends { slug: string; section?: string; main: string; easy: string }>(rows: R[]) {
  const out: {
    slug: string;
    done: number;
    total: number;
    sections: { name: string; done: number; total: number; rows: R[] }[];
  }[] = [];
  for (const r of rows) {
    let subj = out.find((x) => x.slug === r.slug);
    if (!subj) out.push((subj = { slug: r.slug, done: 0, total: 0, sections: [] }));
    const name = r.section ?? '';
    let sec = subj.sections.find((x) => x.name === name);
    if (!sec) subj.sections.push((sec = { name, done: 0, total: 0, rows: [] }));
    sec.rows.push(r);
    const ok = (r.main === 'ok' ? 1 : 0) + (r.easy === 'ok' ? 1 : 0);
    sec.done += ok;
    sec.total += 2;
    subj.done += ok;
    subj.total += 2;
  }
  return out;
}

function FragmentRow({
  r,
  open,
  onRaw,
  onShow,
  onCheck,
  checker
}: {
  r: Result;
  open: boolean;
  onRaw: () => void;
  onShow: () => void;
  onCheck: () => void;
  checker: string;
}) {
  const issues = r.issues?.length ?? 0;
  const c = r.check;
  const errs = c?.problems?.filter((p) => p.severity === 'error').length ?? 0;
  return (
    <>
      <tr className="border-t border-ink/10 align-top font-semibold text-ink">
        <td className="py-2 pr-2">
          <div className="font-black">{r.model}</div>
          <div className="text-xs text-ink/45">{r.provider}</div>
        </td>
        <td className="py-2 tabular-nums">{r.state === 'running' ? '…' : r.ms != null ? `${(r.ms / 1000).toFixed(1)} s` : ''}</td>
        <td className="py-2 tabular-nums">{r.usage ? `${r.usage.input ?? '?'} / ${r.usage.output ?? '?'}` : ''}</td>
        <td className="py-2">
          {r.plan ? r.plan.steps.length : ''}
          {r.book && (
            <div className="text-xs text-ink/45">
              📖 {r.plan?.sources?.length ? `p. ${r.plan.sources.join(', ')}` : r.excerpts?.length ? `${r.excerpts.length} passages` : 'no match'}
            </div>
          )}
        </td>
        <td className="py-2">
          {r.state === 'error' ? (
            <span className="text-error">{r.error}</span>
          ) : r.parseError ? (
            <span className="text-error">JSON: {r.parseError}</span>
          ) : r.state === 'done' ? (
            <span className={issues ? 'text-brand-orange' : 'text-brand-green'}>{issues ? `${issues} fixed/dropped` : 'clean ✓'}</span>
          ) : null}
          {c && (
            <div
              className={`text-xs font-black ${c.state === 'running' ? 'text-ink/45' : c.state === 'error' ? 'text-error' : errs ? 'text-error' : c.problems?.length ? 'text-brand-orange' : 'text-brand-green'}`}
            >
              {c.state === 'running'
                ? `checking (${c.by})…`
                : c.state === 'error'
                  ? `check failed: ${c.error}`
                  : c.problems?.length
                    ? `⚠ ${c.problems.length} problem${c.problems.length > 1 ? 's' : ''} found`
                    : '✓ no factual problems found'}
            </div>
          )}
        </td>
        <td className="whitespace-nowrap py-2 text-right">
          {r.plan && (
            <button className="mr-1 rounded-lg bg-brand-blue px-3 py-1 text-xs font-black text-white" onClick={onShow}>
              Show
            </button>
          )}
          {r.plan && (
            <button
              className="mr-1 rounded-lg border border-brand-purple/40 px-3 py-1 text-xs font-black text-brand-purple disabled:opacity-50"
              disabled={!checker || c?.state === 'running'}
              title={`Review with ${checker}`}
              onClick={onCheck}
            >
              Check facts
            </button>
          )}
          {(r.raw || issues > 0 || c?.problems?.length) && (
            <button className="rounded-lg border border-ink/15 px-3 py-1 text-xs font-black" onClick={onRaw}>
              {open ? 'Hide' : 'Raw'}
            </button>
          )}
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={6} className="pb-3">
            {!!c?.problems?.length && (
              <div className="mb-2 rounded-xl border border-error/20 bg-error/[0.04] p-3">
                <div className="mb-1 text-xs font-black text-ink/55">
                  Fact check by {c.by}
                  {c.ms ? ` · ${(c.ms / 1000).toFixed(1)} s` : ''}
                </div>
                <ul className="space-y-1.5 text-sm font-semibold text-ink">
                  {c.problems.map((p, k) => (
                    <li key={k}>
                      <span className={p.severity === 'error' ? 'font-black text-error' : 'font-black text-brand-orange'}>
                        {p.step ? `Step ${p.step}` : 'Lesson'}:
                      </span>{' '}
                      {p.quote && <q className="italic text-ink/70">{p.quote}</q>} — {p.problem}
                      {p.fix && <span className="text-brand-green"> → {p.fix}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!!r.excerpts?.length && (
              <div className="mb-2 text-xs font-semibold text-ink/55">
                📖 Passages given to the model: {r.excerpts.map((e) => `${e.page}-bet (${e.heading})`).join('; ')}
              </div>
            )}
            {issues > 0 && (
              <ul className="mb-2 list-disc pl-5 text-xs font-semibold text-brand-orange">
                {r.issues!.map((i, k) => (
                  <li key={k}>{i}</li>
                ))}
              </ul>
            )}
            {r.raw && <pre className="max-h-72 overflow-auto rounded-xl bg-ink/[0.05] p-3 text-xs text-ink/75">{r.raw}</pre>}
          </td>
        </tr>
      )}
    </>
  );
}

function GeminiVoicePicker(p: {
  models: string[];
  model: string;
  setModel: (v: string) => void;
  voice: string;
  setVoice: (v: string) => void;
  style: string;
  setStyle: (v: string) => void;
}) {
  return (
    <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
      <select
        value={p.model}
        onChange={(e) => p.setModel(e.target.value)}
        className="rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-sm font-semibold"
      >
        {p.models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={p.voice}
        onChange={(e) => p.setVoice(e.target.value)}
        className="rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-sm font-semibold"
      >
        {GEMINI_VOICES.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
      <input
        value={p.style}
        onChange={(e) => p.setStyle(e.target.value)}
        maxLength={160}
        title="How the voice should sound (in English)"
        className="rounded-lg border border-ink/15 bg-white px-2 py-1.5 text-sm font-semibold sm:col-span-2"
      />
    </div>
  );
}
