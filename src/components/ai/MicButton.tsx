'use client';

import { useEffect, useRef, useState } from 'react';

const MAX_SEC = 30;
const SILENCE_MS = 1500; // stop this long after the student stops talking
const SPEAK_RMS = 0.035; // louder than this = talking
const QUIET_RMS = 0.018; // quieter than this = silence

const S: Record<string, Record<string, string>> = {
  uz: { start: 'Ovoz bilan soʻrash', stop: 'Toʻxtatish', listening: 'Gapiring…', working: 'Matnga aylantirilmoqda…', denied: 'Mikrofonga ruxsat berilmadi.', error: 'Ovozni tanib boʻlmadi. Qaytadan urinib koʻring.', limit: 'Ovozli savollar limiti tugadi. Birozdan keyin urinib koʻring.', none: 'Hech narsa eshitilmadi.' },
  ru: { start: 'Спросить голосом', stop: 'Остановить', listening: 'Говорите…', working: 'Распознаю…', denied: 'Нет доступа к микрофону.', error: 'Не удалось распознать голос. Попробуйте ещё раз.', limit: 'Лимит голосовых вопросов исчерпан. Попробуйте чуть позже.', none: 'Ничего не слышно.' },
  en: { start: 'Ask by voice', stop: 'Stop', listening: 'Speak…', working: 'Turning speech into text…', denied: 'Microphone access was not allowed.', error: 'Could not recognise the voice. Please try again.', limit: 'Voice question limit reached. Try again a bit later.', none: 'Nothing was heard.' }
};

/** The phone's own compressed format (Groq Whisper accepts webm / ogg / m4a). */
function pickMime(): string {
  if (typeof MediaRecorder === 'undefined') return '';
  return ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'].find((m) => MediaRecorder.isTypeSupported?.(m)) ?? '';
}

/**
 * Voice question button: tap to talk, tap again (or just stop talking) to
 * finish. The recording goes to Groq Whisper with `hint` (what is on the
 * screen) and the text is handed to `onText`; nothing is sent to the tutor
 * until the student taps one of the answer buttons.
 */
export default function MicButton({
  locale,
  hint,
  disabled,
  onText,
  onError,
  ensureUser,
  onStatus,
  size = 'md'
}: {
  locale: string;
  hint: () => string;
  disabled?: boolean;
  onText: (text: string) => void;
  onError: (msg: string | null) => void;
  /** create the guest student first if the server says there is none */
  ensureUser?: () => Promise<unknown>;
  /** "Speak… 27s" / "Turning speech into text…" while busy, null when idle (shown in the input) */
  onStatus?: (text: string | null) => void;
  size?: 'sm' | 'md';
}) {
  const t = S[locale] ?? S.uz;
  const [state, setState] = useState<'idle' | 'recording' | 'working'>('idle');
  const [sec, setSec] = useState(0);
  const [level, setLevel] = useState(0);
  const stopAll = useRef<() => void>(() => {});
  const finishRef = useRef<() => void>(() => {});
  const statusRef = useRef(onStatus);
  statusRef.current = onStatus;

  useEffect(() => () => stopAll.current(), []);
  useEffect(() => {
    statusRef.current?.(state === 'recording' ? `${t.listening} ${MAX_SEC - sec}s` : state === 'working' ? t.working : null);
  }, [state, sec, t]);

  async function start() {
    onError(null);
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 } });
    } catch {
      onError(t.denied);
      return;
    }
    const mime = pickMime();
    const mr = new MediaRecorder(stream, { ...(mime && { mimeType: mime }), audioBitsPerSecond: 24000 });
    const chunks: Blob[] = [];
    mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);

    // loudness meter: drives the ring and the auto-stop on silence
    const ctx = new AudioContext();
    const an = ctx.createAnalyser();
    an.fftSize = 1024;
    ctx.createMediaStreamSource(stream).connect(an);
    const buf = new Float32Array(an.fftSize);
    let heard = false;
    let quietSince = 0;
    const t0 = Date.now();
    const tick = setInterval(() => {
      an.getFloatTimeDomainData(buf);
      const rms = Math.sqrt(buf.reduce((a, v) => a + v * v, 0) / buf.length);
      setLevel(Math.min(1, rms * 8));
      const now = Date.now();
      setSec(Math.floor((now - t0) / 1000));
      if (rms > SPEAK_RMS) {
        heard = true;
        quietSince = 0;
      } else if (heard && rms < QUIET_RMS) {
        quietSince ||= now;
        if (now - quietSince > SILENCE_MS) finish();
      }
      if (now - t0 > MAX_SEC * 1000) finish();
    }, 100);

    let finished = false;
    const cleanup = () => {
      clearInterval(tick);
      stream.getTracks().forEach((tr) => tr.stop());
      void ctx.close().catch(() => {});
    };
    function finish() {
      if (finished) return;
      finished = true;
      cleanup();
      if (mr.state !== 'inactive') mr.stop();
    }
    stopAll.current = () => {
      finished = true;
      mr.onstop = null;
      cleanup();
      if (mr.state !== 'inactive') mr.stop();
    };
    mr.onstop = () => {
      setLevel(0);
      if (!heard) {
        setState('idle');
        onError(t.none);
        return;
      }
      void send(new Blob(chunks, { type: mr.mimeType || mime || 'audio/webm' }));
    };
    finishRef.current = finish;
    mr.start(250);
    setSec(0);
    setState('recording');
  }

  async function send(audio: Blob) {
    setState('working');
    const post = () => {
      const form = new FormData();
      form.append('audio', audio, 'question');
      form.append('hint', hint().slice(0, 1200));
      return fetch('/api/ai/stt', { method: 'POST', body: form, credentials: 'same-origin' });
    };
    try {
      let r = await post();
      if (r.status === 401 && ensureUser) {
        await ensureUser();
        r = await post();
      }
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.text) onText(String(d.text));
      else onError(r.status === 429 ? t.limit : d.text === '' ? t.none : t.error);
    } catch {
      onError(t.error);
    }
    setState('idle');
  }

  const px = size === 'sm' ? 36 : 46;
  const recording = state === 'recording';
  return (
    <button
        type="button"
        onClick={() => (recording ? finishRef.current() : void start())}
        disabled={disabled || state === 'working'}
        aria-label={recording ? t.stop : t.start}
        title={recording ? t.stop : t.start}
        className={`relative grid shrink-0 place-items-center rounded-full border-2 transition disabled:opacity-40 ${recording ? 'border-error bg-error text-white' : 'border-ink/15 bg-white text-ink/70 hover:text-ink'}`}
        style={{ width: px, height: px, boxShadow: recording ? `0 0 0 ${3 + level * 9}px rgba(239,68,68,.22)` : undefined }}
      >
        {state === 'working' ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/20 border-t-ink/70" aria-hidden />
        ) : recording ? (
          <span className="h-3.5 w-3.5 rounded-[3px] bg-white" aria-hidden />
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
          </svg>
        )}
    </button>
  );
}
