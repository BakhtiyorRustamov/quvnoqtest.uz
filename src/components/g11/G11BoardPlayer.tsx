'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Board, { stepMs } from '@/components/board/Board';
import { useSound } from '@/components/providers/SoundProvider';
import { hapticSelect } from '@/lib/tg';
import { lessonAudioPrefix, narrationKey, type AudioManifest, type BoardLesson } from '@/content/g11/board/types';
import { lessonUi } from '@/content/g11/lessonUi';
import DialogueScene from './DialogueScene';
import CsAnimView, { animMs } from './cs/CsAnim';

const SUPA = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const audioBase = (slug: string, n: number) => `${SUPA}/storage/v1/object/public/lesson-audio/${lessonAudioPrefix(slug, n)}`;

type Track = 'main' | 'easy';

/**
 * Step-by-step board lesson. Each step draws on the board (camera follows on
 * phones), shows the narration as a caption, plays its audio if the lesson
 * has been voiced, then waits for the student to press the reply button that
 * appears on the board under the drawing. "Soddaroq" shows a simpler
 * version of the same step. At the end every board is shown as one picture.
 */
export default function G11BoardPlayer({
  lesson,
  slug,
  color,
  onFinish,
  onQuiz
}: {
  lesson: BoardLesson;
  slug: string;
  color: string;
  onFinish?: () => void;
  /** shown as a button under the finished lesson; opens the practice questions */
  onQuiz?: () => void;
}) {
  const { play, muted } = useSound();
  // narration follows the app-wide sound toggle in the top bar
  const voice = !muted;
  const [phase, setPhase] = useState<'intro' | 'play' | 'done'>('intro');
  const [step, setStep] = useState(-1);
  // the step shown before the current one (the board moves between parts)
  const [fromStep, setFromStep] = useState(-1);
  // narration of the current step, started once the board begins drawing
  const pendingAudio = useRef<(() => void) | null>(null);
  const [runId, setRunId] = useState(0);
  const [track, setTrack] = useState<Track>('main');
  const [ready, setReady] = useState(false);
  const [files, setFiles] = useState<Record<Track, string[] | null>>({ main: null, easy: null });
  const audio = useRef<HTMLAudioElement | null>(null);
  const blobs = useRef(new Map<string, Promise<string>>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hush = useRef<(() => void) | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  // dialogue scenes: how many lines are visible and which one is being read
  const [shown, setShown] = useState(0);
  const [active, setActive] = useState(-1);
  // every lesson (Uzbek, Russian, English) plays Gemini audio prepared from its exact text;
  // a lesson without audio asks the server to voice it when the student starts it
  const easyLang = lesson.easyLang ?? lesson.lang ?? 'uz';
  const ui = lessonUi(lesson.lang);
  const [preparing, setPreparing] = useState(false);
  const asked = useRef<Record<Track, boolean>>({ main: false, easy: false });
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);

  /** read the manifest; audio counts only if it was made from exactly this narration text */
  const loadManifest = useCallback(async () => {
    if (!SUPA) return null;
    const m = await fetch(`${audioBase(slug, lesson.n)}/manifest.json?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? (r.json() as Promise<AudioManifest>) : null))
      .catch(() => null);
    const next: Record<Track, string[] | null> = {
      main: m?.main?.key === narrationKey(lesson, 'main') && m.main.files.length === lesson.steps.length ? m.main.files : null,
      easy: m?.easy?.key === narrationKey(lesson, 'easy') && m.easy.files.length === lesson.steps.length ? m.easy.files : null
    };
    setFiles(next);
    return next;
  }, [slug, lesson]);

  useEffect(() => {
    void loadManifest();
  }, [loadManifest]);

  useEffect(
    () => () => {
      if (poll.current) clearInterval(poll.current);
    },
    []
  );

  /** no audio for this track yet: ask the server to voice it (once), then check back until it is there */
  function ensureTrack(t: Track) {
    if (!SUPA || files[t] || asked.current[t]) return;
    asked.current[t] = true;
    fetch('/api/lesson-audio', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ slug, n: lesson.n, track: t }) })
      .then((r) => r.json())
      .then((r: { status?: string }) => {
        if (r.status === 'ready') return void loadManifest();
        if (r.status !== 'started' && r.status !== 'pending') return;
        if (t === 'main') setPreparing(true);
        let tries = 0;
        if (poll.current) clearInterval(poll.current);
        poll.current = setInterval(async () => {
          tries++;
          const got = await loadManifest();
          if (got?.[t] || tries > 30) {
            if (poll.current) clearInterval(poll.current);
            poll.current = null;
            if (t === 'main') setPreparing(false);
          }
        }, 12_000);
      })
      .catch(() => {});
  }

  const recorded = !!files.main;
  const hasAudio = recorded;

  /** Audio is fetched as a blob (connect-src allows Supabase; media plays from blob:). */
  const blobUrl = useCallback(
    (t: Track, i: number) => {
      const name = files[t]?.[i];
      if (!name) return null;
      const url = `${audioBase(slug, lesson.n)}/${name}`;
      if (!blobs.current.has(url)) {
        blobs.current.set(
          url,
          fetch(url)
            .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
            .then((b) => URL.createObjectURL(b))
        );
      }
      return blobs.current.get(url)!;
    },
    [files, slug, lesson.n]
  );

  const stopAudio = () => {
    if (audio.current) {
      audio.current.pause();
      audio.current.ontimeupdate = null;
      audio.current.onended = null;
    }
    hush.current?.();
    hush.current = null;
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  /** play a recorded clip; `onTime(fraction)` follows the playback, `onDone` when it ends or fails */
  function playClip(t: Track, i: number, onTime?: (f: number) => void, onDone?: () => void) {
    const p = blobUrl(t, i);
    if (!p) return false;
    p.then((u) => {
      const a = audio.current ?? new Audio();
      audio.current = a;
      a.src = u;
      a.ontimeupdate = onTime ? () => a.duration && onTime(a.currentTime / a.duration) : null;
      a.onended = () => onDone?.();
      a.play().catch(() => onDone?.());
    }).catch(() => onDone?.());
    blobUrl(t, i + 1)?.catch(() => {}); // prefetch the next step
    return true;
  }

  useEffect(
    () => () => {
      stopAudio();
      if (timer.current) clearTimeout(timer.current);
      blobs.current.forEach((p) => p.then((u) => URL.revokeObjectURL(u)).catch(() => {}));
    },
    []
  );

  /** narration of one step: its recorded clip, if the track has been voiced */
  function speakStep(t: Track, i: number) {
    playClip(t, i);
  }

  function show(i: number, t: Track, prev: number = step) {
    stopAudio();
    if (timer.current) clearTimeout(timer.current);
    setFromStep(prev);
    setStep(i);
    setTrack(t);
    setRunId((r) => r + 1);
    setReady(false);
    pendingAudio.current = null;
    if (t === 'easy') ensureTrack('easy');
    const st = lesson.steps[i];

    // a dialogue (English / Russian lessons) instead of the board
    if (st.scene) {
      const lines = st.scene.lines;
      if (t === 'easy') {
        // all lines with their Uzbek translation, plus the explanation
        setShown(lines.length);
        setActive(-1);
        timer.current = setTimeout(() => setReady(true), 900);
        if (voice) playClip('easy', i);
        return;
      }
      setShown(0);
      setActive(-1);
      const finish = () => {
        setShown(lines.length);
        setActive(-1);
        setReady(true);
      };
      // character weights: which line is being read at a given moment of the clip
      const intro = st.say ? st.say.length + 20 : 0;
      const w = lines.map((l) => l.text.length + 25);
      const total = intro + w.reduce((a, b) => a + b, 0);
      const lineAt = (f: number) => {
        let acc = intro;
        for (let k = 0; k < w.length; k++) {
          acc += w[k];
          if (f * total < acc) return k;
        }
        return w.length - 1;
      };
      const timed = () => {
        let at = st.say ? 900 : 300;
        lines.forEach((l, k) => {
          timers.current.push(
            setTimeout(() => {
              setShown(k + 1);
              setActive(k);
            }, at)
          );
          at += 700 + l.text.length * 45;
        });
        timers.current.push(setTimeout(finish, at));
      };
      if (voice && recorded) {
        const ok = playClip(
          'main',
          i,
          (f) => {
            if (f * total < intro) return;
            const k = lineAt(f);
            setShown(k + 1);
            setActive(k);
          },
          finish
        );
        if (!ok) timed();
      } else timed();
      return;
    }

    // an animation (Informatika) or an empty board: no drawing to wait for
    if (st.anim || !st.draw.length) {
      const ms = st.anim ? (t === 'easy' ? 900 : Math.max(1500, animMs(st.anim))) : 900;
      timer.current = setTimeout(() => setReady(true), ms);
      if (voice) speakStep(t, i);
      return;
    }

    // the main track waits for the board (onDrawn); the simpler replay may show its buttons sooner
    if (t === 'easy') timer.current = setTimeout(() => setReady(true), Math.min(stepMs(st.draw) + 400, 1800));
    if (voice) {
      blobUrl(t, i)?.catch(() => {}); // starts downloading now
      blobUrl(t, i + 1)?.catch(() => {}); // prefetch the next step
      pendingAudio.current = () => speakStep(t, i);
    }
  }

  function start() {
    play('click');
    hapticSelect();
    ensureTrack('main');
    setPhase('play');
    show(0, 'main', -1);
  }

  function next() {
    play('click');
    hapticSelect();
    if (step >= lesson.steps.length - 1) {
      stopAudio();
      setPhase('done');
      onFinish?.();
      return;
    }
    show(step + 1, 'main');
  }

  // muting from the top bar stops the narration straight away
  useEffect(() => {
    if (muted) stopAudio();
  }, [muted]);

  const cur = step >= 0 ? lesson.steps[step] : null;
  const total = lesson.steps.length;
  // lessons told only with dialogues / animations have nothing on the board
  const noBoard = !!lesson.cast || lesson.steps.every((s) => !s.draw.length);
  // steps not drawn on the board show their reply buttons under the caption
  const offBoard = !!cur && (!!cur.scene || !!cur.anim || !cur.draw.length);

  return (
    <section className="mt-5">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5" aria-label={`${Math.max(step + 1, 0)} / ${total}`}>
          {lesson.steps.map((_, i) => (
            <span key={i} className="h-2 rounded-full transition-all" style={{ width: i === step && phase === 'play' ? 22 : 10, background: i <= step || phase === 'done' ? color : 'rgba(31,41,55,.15)' }} />
          ))}
        </div>
      </div>

      {/* on wide screens the board grows to show two parts side by side, and
          shrinks back to the column for the final picture */}
      <div
        className={`relative left-1/2 -translate-x-1/2 transition-[width] duration-700 ease-in-out ${phase === 'done' ? 'w-full' : 'w-full lg:w-[min(1150px,calc(100vw-48px))]'}`}
        lang={lesson.lang ?? 'uz'}
      >
        {phase === 'play' && cur?.scene ? (
          <div className="mx-auto max-w-2xl">
            <DialogueScene scene={cur.scene} cast={lesson.cast ?? {}} shown={shown} active={active} showUz={track === 'easy'} />
          </div>
        ) : phase === 'play' && cur?.anim ? (
          <div className="mx-auto max-w-2xl">
            <CsAnimView anim={cur.anim} runId={runId} title={cur.animTitle} still={track === 'easy'} />
          </div>
        ) : phase === 'done' && noBoard ? null : phase === 'intro' && noBoard ? (
          <div className="mx-auto grid min-h-[260px] max-w-2xl place-items-center rounded-2xl border border-ink/10 bg-gradient-to-br from-[#e0f2fe] to-[#ede9fe] shadow-card">
            <span className="text-6xl opacity-40" aria-hidden>
              {lesson.cast ? '💬' : '💻'}
            </span>
          </div>
        ) : (
        <Board
          plan={lesson}
          grid
          camera={lesson.cast ? 'off' : 'auto'}
          step={phase === 'intro' ? -1 : step}
          fromStep={fromStep}
          runId={runId}
          overview={phase === 'done'}
          onDrawStart={() => {
            const f = pendingAudio.current;
            pendingAudio.current = null;
            f?.();
          }}
          onDrawn={() => setReady(true)}
          action={
            phase === 'play' && cur && !offBoard
              ? {
                  label: cur.next,
                  color,
                  show: ready,
                  onClick: next,
                  alt:
                    track === 'main'
                      ? {
                          label: ui.simpler,
                          onClick: () => {
                            play('pop');
                            show(step, 'easy');
                          }
                        }
                      : undefined
                }
              : undefined
          }
        />
        )}
        {phase === 'intro' && (
          <div className="absolute inset-0 grid place-items-center rounded-2xl bg-white/70 backdrop-blur-[2px]">
            <div className="px-4 text-center">
              <p className="text-sm font-extrabold text-ink/55">
                {total} {ui.steps} · {lesson.cast ? ui.dialogues : noBoard ? ui.animations : ui.onBoard}
                {hasAudio ? ` · ${ui.voiced}` : ''}
              </p>
              <button type="button" onClick={start} className="mt-3 rounded-full px-8 py-3.5 text-lg font-black text-white shadow-card" style={{ background: color }}>
                {ui.start}
              </button>
            </div>
          </div>
        )}
      </div>

      {preparing && !recorded && phase !== 'intro' && (
        <p className="mt-2 text-center text-[13px] font-bold text-ink/50">{ui.preparing}</p>
      )}

      {phase === 'play' && cur && (
        <div className="mt-3">
          {(track === 'easy' || cur.say) && (
          <div
            className={`rounded-2xl px-4 py-3 text-[16.5px] font-semibold leading-relaxed text-ink ${track === 'easy' ? 'border border-brand-orange/30 bg-brand-orange/[0.07]' : 'bg-ink/[0.04]'}`}
            aria-live="polite"
            lang={track === 'easy' ? easyLang : (lesson.lang ?? 'uz')}
          >
            {track === 'easy' && <span className="mr-1.5 font-black text-brand-orange">{ui.simplerTag}</span>}
            {track === 'easy' ? cur.easy : cur.say}
          </div>
          )}
          <div className={`mt-3 flex flex-wrap items-center justify-center gap-2 transition-opacity duration-300 ${ready ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
            {step > 0 && (
              <button type="button" onClick={() => show(step - 1, 'main')} className="rounded-full px-3 py-2 text-sm font-black text-ink/55" aria-label={ui.backAria}>
                {ui.back}
              </button>
            )}
            {offBoard && track === 'main' && (
              <button
                type="button"
                onClick={() => {
                  play('pop');
                  show(step, 'easy');
                }}
                className="rounded-full border border-brand-orange/40 bg-white px-4 py-2 text-sm font-black text-brand-orange"
              >
                {ui.simpler}
              </button>
            )}
            {offBoard && (
              <button type="button" onClick={next} className="rounded-full px-6 py-2.5 font-black text-white shadow-[0_4px_0_rgba(0,0,0,.22)] active:translate-y-px" style={{ background: color }}>
                {cur.next}
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div className="mt-4">
          <div className="card p-5">
            <h3 className="text-lg font-black text-ink">{ui.remember}</h3>
            <ul className="mt-2 space-y-2">
              {lesson.summary.map((s, i) => (
                <li key={i} className="flex gap-2 text-[16px] font-semibold leading-snug text-ink/85">
                  <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-black text-white" style={{ background: color }}>
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {onQuiz && (
              <button
                type="button"
                onClick={() => {
                  play('click');
                  hapticSelect();
                  onQuiz();
                }}
                className="rounded-full px-6 py-3 font-black text-white shadow-[0_4px_0_rgba(0,0,0,.22)] active:translate-y-px"
                style={{ background: color }}
              >
                {ui.toPractice}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                play('click');
                setPhase('play');
                show(0, 'main', -1);
              }}
              className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-black text-ink"
            >
              {ui.replay}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
