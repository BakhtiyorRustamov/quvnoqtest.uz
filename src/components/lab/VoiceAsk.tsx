'use client';

import { useEffect, useRef, useState } from 'react';

type Stt = { ok: true; text: string; model: string; ms: number } | { ok: false; error: string; ms: number } | null;
type Result = { whisper: Stt; gemini: Stt; seconds: number };

const MAX_SEC = 30;
const RATE = 16000;

/** Recorded audio (any browser format) → 16 kHz mono 16-bit WAV, which both Whisper and Gemini accept. */
async function toWav(blob: Blob): Promise<Blob> {
  const ctx = new AudioContext();
  const decoded = await ctx.decodeAudioData(await blob.arrayBuffer());
  void ctx.close();
  const off = new OfflineAudioContext(1, Math.ceil(decoded.duration * RATE), RATE);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start();
  const mono = (await off.startRendering()).getChannelData(0);
  const out = new DataView(new ArrayBuffer(44 + mono.length * 2));
  const str = (o: number, s: string) => [...s].forEach((c, i) => out.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF');
  out.setUint32(4, 36 + mono.length * 2, true);
  str(8, 'WAVEfmt ');
  out.setUint32(16, 16, true);
  out.setUint16(20, 1, true);
  out.setUint16(22, 1, true);
  out.setUint32(24, RATE, true);
  out.setUint32(28, RATE * 2, true);
  out.setUint16(32, 2, true);
  out.setUint16(34, 16, true);
  str(36, 'data');
  out.setUint32(40, mono.length * 2, true);
  for (let i = 0; i < mono.length; i++) out.setInt16(44 + i * 2, Math.max(-1, Math.min(1, mono[i])) * 0x7fff, true);
  return new Blob([out.buffer], { type: 'audio/wav' });
}

/**
 * Lab test for voice questions: record up to 30 s, transcribe with Groq
 * Whisper and Gemini side by side, and put the chosen text into the question
 * box (the student would see and fix it before sending).
 */
export default function VoiceAsk({ onUse }: { onUse: (text: string) => void }) {
  const [state, setState] = useState<'idle' | 'recording' | 'working'>('idle');
  const [sec, setSec] = useState(0);
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState('');
  const [replay, setReplay] = useState<string | null>(null);
  const rec = useRef<MediaRecorder | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
      rec.current?.stream.getTracks().forEach((t) => t.stop());
    },
    []
  );
  useEffect(() => () => void (replay && URL.revokeObjectURL(replay)), [replay]);

  async function start() {
    setErr('');
    setRes(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const chunks: Blob[] = [];
      const r = new MediaRecorder(stream);
      r.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      r.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        if (timer.current) clearInterval(timer.current);
        setState('working');
        try {
          const wav = await toWav(new Blob(chunks, { type: r.mimeType }));
          setReplay(URL.createObjectURL(wav));
          const t = await fetch('/api/lab/stt?engines=whisper,gemini', { method: 'POST', headers: { 'content-type': 'audio/wav' }, body: wav });
          const d = await t.json().catch(() => ({}));
          if (!t.ok) throw new Error(d.error ?? `HTTP ${t.status}`);
          setRes(d);
        } catch (e) {
          setErr((e as Error).message);
        }
        setState('idle');
      };
      rec.current = r;
      r.start();
      setSec(0);
      setState('recording');
      const t0 = Date.now();
      timer.current = setInterval(() => {
        const s = Math.floor((Date.now() - t0) / 1000);
        setSec(s);
        if (s >= MAX_SEC && r.state === 'recording') r.stop();
      }, 250);
    } catch (e) {
      setErr(`microphone: ${(e as Error).message}`);
    }
  }

  const stop = () => rec.current?.state === 'recording' && rec.current.stop();

  const Row = ({ name, r }: { name: string; r: Stt }) =>
    r && (
      <div className="mt-2 rounded-xl border border-ink/10 bg-white p-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-black text-ink/50">
          <span className="text-ink">{name}</span>
          <span>{r.ok ? `${r.model} · ${(r.ms / 1000).toFixed(1)} s` : `failed · ${(r.ms / 1000).toFixed(1)} s`}</span>
          {r.ok && r.text && (
            <button className="ml-auto rounded-lg border border-ink/15 px-2 py-0.5 text-xs font-black text-ink" onClick={() => onUse(r.text)}>
              Use this
            </button>
          )}
        </div>
        <p className={`mt-1 text-sm font-semibold ${r.ok ? 'text-ink' : 'text-error'}`}>{r.ok ? r.text || '(nothing heard)' : r.error}</p>
      </div>
    );

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-2">
        {state === 'recording' ? (
          <button className="rounded-xl bg-error px-3 py-1.5 text-sm font-black text-white" onClick={stop}>
            ■ Stop · {sec}/{MAX_SEC} s
          </button>
        ) : (
          <button className="rounded-xl border border-ink/15 bg-white px-3 py-1.5 text-sm font-black text-ink disabled:opacity-40" disabled={state === 'working'} onClick={start}>
            {state === 'working' ? 'Listening…' : '🎤 Ask by voice'}
          </button>
        )}
        {replay && state === 'idle' && <audio src={replay} controls className="h-8" />}
        <span className="text-xs font-semibold text-ink/45">Whisper (Groq) and Gemini both transcribe it; nothing is saved.</span>
      </div>
      {err && <p className="mt-2 text-sm font-bold text-error">{err}</p>}
      {res && (
        <>
          <Row name="Whisper" r={res.whisper} />
          <Row name="Gemini" r={res.gemini} />
        </>
      )}
    </div>
  );
}
