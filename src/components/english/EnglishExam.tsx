'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { pickVoiceFor, voicesReady, type SpeechItem } from '@/lib/browserVoice';
import type { AnySection, Block, Chart, EQ, ExamKind, MapSpec, ObjectiveSection, Seg, SectionKind, SpeakingSection, WritingSection } from '@/content/g11/english/types';
import { multilevelListening, multilevelReading, multilevelSpeaking, multilevelWriting, mlLevel, mlScaled } from '@/content/g11/english/multilevel';
import { chartAsText, ieltsBand, ieltsListening, ieltsOverall, ieltsReading, ieltsSpeaking, ieltsWriting } from '@/content/g11/english/ielts';

/* ------------------------------------------------------------------ texts */
const S: Record<string, Record<string, string>> = {
  uz: {
    title: 'Ingliz tili', choose: 'Imtihonni tanlang', full: 'Toʻliq imtihon', fullHint: 'Listening → Reading → Writing → Speaking ketma-ket', or: 'yoki alohida boʻlim',
    listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking', regen: 'Har safar yangi variant tuziladi',
    start: 'Boshlash', next: 'Keyingi qism', prev: 'Oldingi qism', submit: 'Yakunlash', play: '▶ Tinglash', playing: '🔊 Eshittirilmoqda…', plays: 'Qolgan tinglashlar',
    played: 'Yozuv tugadi', answer: 'Javob', choosePh: 'Tanlang', results: 'Natija', correct: 'toʻgʻri', back: 'Imtihonlar', again: 'Qaytadan', nextSection: 'Keyingi boʻlim',
    words: 'soʻz', check: 'SI bilan tekshirish', checking: 'SI tekshirmoqda…', aiNote: 'Baho sunʼiy intellekt (SI) tomonidan berildi — u xato qilishi mumkin.', paid: 'SI tekshiruvi faqat obuna boʻlgan foydalanuvchilar uchun.', aiErr: 'Tekshirib boʻlmadi. Keyinroq urinib koʻring.',
    prep: 'Tayyorlanish', speak: 'Gapiring', stop: 'Tugatish', mic: 'Mikrofonga ruxsat bering.', recording: '● Yozib olinmoqda', listen: 'Savolni tinglang…', transcribing: 'Matnga aylantirilmoqda…', partDone: 'Qism yakunlandi',
    voice: 'Ovoz', noVoice: 'Bu qurilmada ingliz ovozi topilmadi — matn ekranda koʻrsatiladi.', est: 'Taxminiy natija (rasmiy imtihon Rasch modeli/ekspertlar bilan baholanadi)', overall: 'Umumiy', yours: 'Sizning javobingiz', key: 'Toʻgʻri javob', script: 'Audio matni', time: 'Vaqt', secDone: 'yakunlandi', resultsAtEnd: 'Natijalar imtihon oxirida koʻrsatiladi.', skip: 'Davom etish', micLevel: 'Ovoz darajasi', loading: 'SI yangi variant tayyorlamoqda…', loadingHint: 'Matnlar va savollar har safar yangidan yoziladi (10–40 soniya).'
  },
  ru: {
    title: 'Английский', choose: 'Выберите экзамен', full: 'Полный экзамен', fullHint: 'Listening → Reading → Writing → Speaking подряд', or: 'или отдельный раздел',
    listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking', regen: 'Каждый раз составляется новый вариант',
    start: 'Начать', next: 'Следующая часть', prev: 'Предыдущая часть', submit: 'Завершить', play: '▶ Слушать', playing: '🔊 Воспроизводится…', plays: 'Осталось прослушиваний',
    played: 'Запись закончилась', answer: 'Ответ', choosePh: 'Выберите', results: 'Результат', correct: 'верно', back: 'Экзамены', again: 'Заново', nextSection: 'Следующий раздел',
    words: 'слов', check: 'Проверить с ИИ', checking: 'ИИ проверяет…', aiNote: 'Оценку выставил искусственный интеллект (ИИ) — возможны ошибки.', paid: 'Проверка ИИ доступна только по подписке.', aiErr: 'Не удалось проверить. Попробуйте позже.',
    prep: 'Подготовка', speak: 'Говорите', stop: 'Закончить', mic: 'Разрешите доступ к микрофону.', recording: '● Идёт запись', listen: 'Слушайте вопрос…', transcribing: 'Распознаём речь…', partDone: 'Часть завершена',
    voice: 'Голос', noVoice: 'На устройстве нет английского голоса — текст показан на экране.', est: 'Примерный результат (официальный экзамен оценивается по модели Раша/экспертами)', overall: 'Итог', yours: 'Ваш ответ', key: 'Верный ответ', script: 'Текст аудио', time: 'Время', secDone: 'завершено', resultsAtEnd: 'Результаты покажем в конце экзамена.', skip: 'Продолжить', micLevel: 'Уровень звука', loading: 'ИИ готовит новый вариант…', loadingHint: 'Тексты и вопросы каждый раз пишутся заново (10–40 секунд).'
  },
  en: {
    title: 'English', choose: 'Choose an exam', full: 'Full exam', fullHint: 'Listening → Reading → Writing → Speaking in a row', or: 'or one section',
    listening: 'Listening', reading: 'Reading', writing: 'Writing', speaking: 'Speaking', regen: 'A new variant is generated every time',
    start: 'Start', next: 'Next part', prev: 'Previous part', submit: 'Finish', play: '▶ Listen', playing: '🔊 Playing…', plays: 'Plays left',
    played: 'Recording finished', answer: 'Answer', choosePh: 'Choose', results: 'Result', correct: 'correct', back: 'Exams', again: 'Try again', nextSection: 'Next section',
    words: 'words', check: 'Check with AI', checking: 'AI is checking…', aiNote: 'Scored by artificial intelligence (AI) — it can make mistakes.', paid: 'The AI check is for subscribers only.', aiErr: 'Could not check. Try again later.',
    prep: 'Preparation', speak: 'Speak', stop: 'Finish', mic: 'Please allow the microphone.', recording: '● Recording', listen: 'Listen to the question…', transcribing: 'Transcribing…', partDone: 'Part finished',
    voice: 'Voice', noVoice: 'No English voice on this device — the text is shown on screen.', est: 'Estimated result (the official exam uses the Rasch model/examiners)', overall: 'Overall', yours: 'Your answer', key: 'Correct answer', script: 'Audio script', time: 'Time', secDone: 'finished', resultsAtEnd: 'Results are shown at the end of the exam.', skip: 'Continue', micLevel: 'Sound level', loading: 'AI is preparing a new variant…', loadingHint: 'Texts and questions are written fresh every time (10–40 seconds).'
  }
};
const EXAMS: { id: ExamKind; name: string; sub: string; color: string }[] = [
  { id: 'multilevel', name: 'Multilevel (CEFR)', sub: 'Milliy sertifikat · B1 / B2 / C1', color: '#2B6CB0' },
  { id: 'ielts', name: 'IELTS Academic', sub: 'Band 0–9', color: '#C2298A' }
];
const ORDER: SectionKind[] = ['listening', 'reading', 'writing', 'speaking'];
const LETTERS = 'ABCDEFGHIJ';

/** which parts the AI writes fresh each time (null = built-in / procedural) */
const GEN: Record<string, (string | null)[]> = {
  'multilevel-listening': ['ml-l1', 'ml-l2', 'ml-l3', null, 'ml-l5', 'ml-l6'],
  'multilevel-reading': ['ml-r1', 'ml-r2', 'ml-r3', 'ml-r4', 'ml-r5'],
  'ielts-listening': ['ie-l1', 'ie-l2', 'ie-l3', 'ie-l4'],
  'ielts-reading': ['ie-r1', 'ie-r2', 'ie-r3']
};
async function gen<T>(key: string): Promise<T | null> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 55000);
  try {
    const r = await fetch('/api/ai/english-gen', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ key }), signal: ctl.signal });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
/** a section with AI-written parts where possible; any part the AI fails on keeps the built-in version */
async function buildFresh(exam: ExamKind, kind: SectionKind, onPart: () => void): Promise<AnySection> {
  const sec = build(exam, kind);
  if (sec.kind === 'listening' || sec.kind === 'reading') {
    // only the first part is waited for; later parts are written in the background (see loadRest)
    const keys = GEN[`${exam}-${kind}`] ?? [];
    const first = keys.findIndex((k) => k);
    if (first >= 0) {
      const r = await gen<{ block: Block }>(keys[first]!);
      if (r?.block) sec.blocks[first] = { ...r.block, title: sec.blocks[first].title };
      onPart();
    }
    renumber(sec);
    return sec;
  }
  if (sec.kind === 'writing') {
    const r = await gen<{ data: { t1?: string; t2: string } }>(exam === 'ielts' ? 'ie-w' : 'ml-w');
    onPart();
    if (r?.data) {
      const t2 = sec.tasks[1];
      t2.prompt = exam === 'ielts' ? t2.prompt.replace(/\n\n[^\n]+\n\nGive reasons/, `\n\n${r.data.t2}\n\nGive reasons`) : `${r.data.t2}\n\nWrite at least 250 words in an appropriate style and format.`;
      if (exam === 'multilevel' && r.data.t1) sec.tasks[0].prompt = `${r.data.t1}\n\nWrite about 150 words in an appropriate format and style.`;
    }
    return sec;
  }
  const r = await gen<{ data: Record<string, unknown> }>(exam === 'ielts' ? 'ie-s' : 'ml-s');
  onPart();
  const d = r?.data as Record<string, string & string[]> | undefined;
  if (d) {
    const p = (sec as SpeakingSection).parts;
    if (exam === 'ielts') {
      p[0] = { ...p[0], instr: p[0].instr.replace(/\(.*?\)/, `(${d.topic})`), questions: d.p1 };
      p[1] = { ...p[1], card: d.card };
      p[2] = { ...p[2], questions: d.p3 };
    } else {
      p[0] = { ...p[0], questions: d.p11 };
      p[1] = { ...p[1], card: d.pics, questions: d.p12 };
      p[2] = { ...p[2], card: d.card };
      p[3] = { ...p[3], card: d.table };
    }
  }
  return sec;
}

function renumber(sec: ObjectiveSection) {
  let n = 0;
  sec.blocks.forEach((b) => b.qs.forEach((q) => (q.n = ++n)));
}

function build(exam: ExamKind, kind: SectionKind): AnySection {
  if (exam === 'ielts') return kind === 'listening' ? ieltsListening() : kind === 'reading' ? ieltsReading() : kind === 'writing' ? ieltsWriting() : ieltsSpeaking();
  return kind === 'listening' ? multilevelListening() : kind === 'reading' ? multilevelReading() : kind === 'writing' ? multilevelWriting() : multilevelSpeaking();
}
const norm = (s: string) => s.toLowerCase().replace(/[’'`]/g, "'").replace(/[.,!?£$%]/g, '').replace(/\s+/g, ' ').trim();
const isRight = (q: EQ, a: string | undefined) => {
  if (a === undefined || a === '') return false;
  if (q.k === 'mcq') return Number(a) === q.a;
  if (q.k === 'match') return a === q.a;
  return q.a.some((x) => norm(x) === norm(a) || norm(x).replace(/\s/g, '') === norm(a).replace(/\s/g, ''));
};

/** result of one finished section, kept for the full-exam summary */
type SecResult = { kind: SectionKind; label: string; score: number | null; detail: string; review?: React.ReactNode };

/* ------------------------------------------------------------------ voices */
const GENDER: Record<Seg['v'], 'm' | 'f'> = { N: 'f', F: 'f', F2: 'f', M: 'm', M2: 'm' };
const RATE: Record<Seg['v'], number> = { N: 0.95, F: 0.95, F2: 1.02, M: 0.93, M2: 1.0 };
const toItems = (segs: Seg[]): SpeechItem[] => segs.map((s) => ({ text: s.t, accent: 'en-GB', gender: GENDER[s.v], rate: RATE[s.v] }));
/** utterances must stay referenced, or Chrome garbage-collects them and never fires onend */
const alive: SpeechSynthesisUtterance[] = [];
/**
 * Speak lines one sentence at a time. Robust against the browser bugs that made the test hang:
 * lost onend events, Chrome's silent pause after ~15 s, and voices that never start —
 * every sentence has a watchdog, so the sequence always finishes.
 */
function speakLines(items: SpeechItem[], opts: { onEnd?: () => void } = {}): () => void {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
  const chunks = items.flatMap((it) =>
    it.text
      .split(/(?<=[.!?…])\s+(?=[A-Z"'(])/)
      .map((x) => x.trim())
      .filter(Boolean)
      .map((text) => ({ ...it, text }))
  );
  let stopped = false;
  let i = 0;
  let watchdog: ReturnType<typeof setTimeout> | null = null;
  const words = (x: string) => x.split(/\s+/).length;
  const finish = () => {
    if (stopped) return;
    stopped = true;
    clearInterval(keep);
    if (watchdog) clearTimeout(watchdog);
    opts.onEnd?.();
  };
  const next = () => {
    if (stopped) return;
    if (watchdog) clearTimeout(watchdog);
    if (i >= chunks.length) return finish();
    const c = chunks[i++];
    if (!synth) {
      watchdog = setTimeout(next, 600 + words(c.text) * 330); // no speech: give reading time
      return;
    }
    const u = new SpeechSynthesisUtterance(c.text);
    const voice = pickVoiceFor(c.accent, c.gender);
    u.lang = voice?.lang ?? c.accent;
    if (voice) u.voice = voice;
    u.rate = c.rate ?? 0.95;
    u.pitch = c.gender === 'f' ? 1.1 : c.gender === 'm' ? 0.92 : 1;
    let moved = false;
    const go = () => {
      if (moved) return;
      moved = true;
      next();
    };
    u.onend = go;
    u.onerror = go;
    alive.push(u);
    if (alive.length > 50) alive.splice(0, alive.length - 50);
    watchdog = setTimeout(() => {
      synth.cancel();
      go();
    }, 4000 + words(c.text) * 700);
    synth.speak(u);
  };
  // Chrome pauses long speech queues silently; nudge it
  const keep = setInterval(() => synth?.resume(), 4000);
  synth?.cancel();
  setTimeout(next, 120); // speaking right after cancel() is dropped by some browsers
  return () => {
    stopped = true;
    clearInterval(keep);
    if (watchdog) clearTimeout(watchdog);
    synth?.cancel();
  };
}

/** iOS / Safari only allow speech after a tap: call this inside the click handler */
function unlockSpeech() {
  try {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);
  } catch {
    /* no speech support */
  }
}
function useEnglishVoice() {
  const [name, setName] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return setName(null);
    voicesReady(3000).then(() => {
      const vs = window.speechSynthesis.getVoices();
      const gb = vs.find((v) => /en[-_]GB/i.test(v.lang) && /google/i.test(v.name)) ?? vs.find((v) => /en[-_]GB/i.test(v.lang)) ?? vs.find((v) => /^en/i.test(v.lang));
      setName(gb ? `${gb.name} (${gb.lang})` : null);
    });
  }, []);
  return name;
}

/* ================================================================== root */
export default function EnglishExam() {
  const locale = useLocale();
  const t = S[locale] ?? S.uz;
  const [exam, setExam] = useState<ExamKind | null>(null);
  const [queue, setQueue] = useState<SectionKind[]>([]);
  const [idx, setIdx] = useState(0);
  const [section, setSection] = useState<AnySection | null>(null);
  const [results, setResults] = useState<SecResult[]>([]);
  const [run, setRun] = useState(0);
  const [loading, setLoading] = useState<{ done: number; total: number } | null>(null);
  const runRef = useRef(0);
  const visited = useRef<Set<number>>(new Set([0]));

  const load = async (ex: ExamKind, kind: SectionKind) => {
    const total = 1;
    const myRun = ++runRef.current;
    visited.current = new Set([0]);
    setSection(null);
    setLoading({ done: 0, total });
    const sec = await buildFresh(ex, kind, () => setLoading((l) => (l ? { ...l, done: l.done + 1 } : l)));
    setLoading(null);
    if (myRun !== runRef.current) return;
    setSection(sec);
    setRun((r) => r + 1);
    window.scrollTo({ top: 0 });
    // the remaining parts: one at a time (API rate limits), each replaces the built-in part unless already opened
    const keys = GEN[`${ex}-${kind}`] ?? [];
    const first = keys.findIndex((k) => k);
    for (let i = first + 1; i < keys.length; i++) {
      const k = keys[i];
      if (!k) continue;
      const r = await gen<{ block: Block }>(k);
      if (myRun !== runRef.current) return;
      if (!r?.block || visited.current.has(i)) continue;
      setSection((cur) => {
        if (!cur || (cur.kind !== 'listening' && cur.kind !== 'reading') || visited.current.has(i)) return cur;
        const blocks = cur.blocks.map((b, j) => (j === i ? { ...r.block, title: b.title } : b));
        const next = { ...cur, blocks };
        renumber(next);
        return next;
      });
    }
  };
  const begin = (ex: ExamKind, q: SectionKind[]) => {
    unlockSpeech();
    setExam(ex);
    setQueue(q);
    setIdx(0);
    setResults([]);
    void load(ex, q[0]);
  };
  const onDone = useCallback((r: SecResult) => setResults((x) => [...x, r]), []);
  const nextSection = () => {
    unlockSpeech();
    const i = idx + 1;
    setIdx(i);
    void load(exam!, queue[i]);
  };
  const home = () => {
    window.speechSynthesis?.cancel();
    runRef.current++;
    setExam(null);
    setSection(null);
    setLoading(null);
  };
  const finishedThis = results.length > idx;
  const allDone = queue.length > 0 && results.length === queue.length;

  return (
    <main className="min-h-screen pb-24">
      <BackBar backHref="/dashboard/g11-ingliz-tili" showLang title={exam ? EXAMS.find((e) => e.id === exam)!.name : t.title} />
      <div className="mx-auto max-w-2xl px-4">
        {!section && !loading && <Hub t={t} onStart={begin} />}
        {loading && (
          <div className="mt-16 text-center">
            <div className="text-lg font-black text-ink">{t.loading}</div>
            <div className="mx-auto mt-4 h-3 w-64 overflow-hidden rounded-full bg-ink/10">
              <div className="h-full rounded-full bg-brand-blue transition-all" style={{ width: `${Math.max(8, (loading.done / loading.total) * 100)}%` }} />
            </div>
            <p className="mt-3 text-xs font-bold text-ink/50">{t.loadingHint}</p>
          </div>
        )}
        {section && exam && (
          <div key={run}>
            <div className="mt-3 flex items-center justify-between text-sm font-bold text-ink/60">
              <button onClick={home} className="underline">← {t.back}</button>
              {queue.length > 1 && <span>{idx + 1} / {queue.length} · {t[queue[idx]]}</span>}
            </div>
            {section.kind === 'listening' || section.kind === 'reading' ? (
              <Objective t={t} exam={exam} sec={section} onDone={onDone} visited={visited.current} quiet={queue.length > 1} />
            ) : section.kind === 'writing' ? (
              <Writing t={t} exam={exam} sec={section} onDone={onDone} quiet={queue.length > 1} />
            ) : (
              <Speaking t={t} exam={exam} sec={section as SpeakingSection} onDone={onDone} quiet={queue.length > 1} />
            )}
            {finishedThis && !allDone && (
              <button onClick={nextSection} className="btn-primary mt-6 w-full py-3">{t.nextSection}: {t[queue[idx + 1]]} →</button>
            )}
            {allDone && queue.length > 1 && (
              <>
                <Summary t={t} exam={exam} results={results} />
                <div className="mt-4 space-y-4">
                  {results.map((r) => (
                    <div key={r.kind}>
                      <h3 className="mb-2 font-black text-ink/70">{r.label}</h3>
                      {r.review}
                    </div>
                  ))}
                </div>
              </>
            )}
            {allDone && (
              <button onClick={() => begin(exam, queue)} className="btn-ghost mt-4 w-full py-3">{t.again}</button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function Hub({ t, onStart }: { t: Record<string, string>; onStart: (e: ExamKind, q: SectionKind[]) => void }) {
  const voice = useEnglishVoice();
  return (
    <div className="mt-6 space-y-6">
      <p className="text-center font-black text-ink/70">{t.choose}</p>
      {EXAMS.map((e) => (
        <div key={e.id} className="card p-5" style={{ borderTop: `6px solid ${e.color}` }}>
          <div className="text-xl font-black text-ink">{e.name}</div>
          <div className="text-sm font-bold text-ink/55">{e.sub}</div>
          <button onClick={() => onStart(e.id, ORDER)} className="btn-primary mt-4 flex w-full flex-col items-center py-3" style={{ background: e.color }}>
            {t.full}
            <span className="block text-xs font-bold opacity-80">{t.fullHint}</span>
          </button>
          <div className="mt-3 text-center text-xs font-bold text-ink/45">{t.or}</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {ORDER.map((k) => (
              <button key={k} onClick={() => onStart(e.id, [k])} className="btn-ghost py-2.5 text-sm">{t[k]}</button>
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-xs font-bold text-ink/50">{t.regen}</p>
      <p className="text-center text-xs font-semibold text-ink/40">
        {t.voice}: {voice === undefined ? '…' : voice ?? t.noVoice}
      </p>
    </div>
  );
}

/* ============================================================ timer */
function useCountdown(seconds: number, onEnd: () => void, active = true) {
  const [left, setLeft] = useState(seconds);
  const cb = useRef(onEnd);
  cb.current = onEnd;
  useEffect(() => {
    if (!active) return;
    if (left <= 0) return cb.current();
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left, active]);
  return left;
}
const mmss = (s: number) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, '0')}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

/* ============================================================ listening + reading */
function Objective({ t, exam, sec, onDone, visited, quiet }: { t: Record<string, string>; exam: ExamKind; sec: ObjectiveSection; onDone: (r: SecResult) => void; visited: Set<number>; quiet: boolean }) {
  const [part, setPartRaw] = useState(0);
  const setPart = (i: number) => {
    visited.add(i); // a part the student has seen is never swapped for a newer AI version
    setPartRaw(i);
  };
  const [ans, setAns] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);
  const all = sec.blocks.flatMap((b) => b.qs);
  const finish = () => {
    if (done) return;
    window.speechSynthesis?.cancel();
    sec.blocks.forEach((_, i) => visited.add(i));
    setDone(true);
    const raw = all.filter((q) => isRight(q, ans[q.n])).length;
    const score = exam === 'ielts' ? ieltsBand(sec.kind, raw) : mlScaled(raw, all.length);
    onDone({ kind: sec.kind, label: t[sec.kind], score, detail: `${raw}/${all.length} ${t.correct}`, review: <ObjectiveReview t={t} exam={exam} sec={sec} ans={ans} /> });
    window.scrollTo({ top: 0 });
  };
  const left = useCountdown(sec.minutes * 60, finish, !done);
  const b = sec.blocks[part];
  const set = (n: number, v: string) => setAns((a) => ({ ...a, [n]: v }));

  if (done) return quiet ? <SectionDone t={t} label={t[sec.kind]} /> : <ObjectiveReview t={t} exam={exam} sec={sec} ans={ans} />;

  return (
    <div className="mt-3">
      <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between bg-[var(--bg,#fff)]/95 px-4 py-2 backdrop-blur">
        <div className="flex gap-1 overflow-x-auto">
          {sec.blocks.map((bl, i) => (
            <button key={i} onClick={() => setPart(i)} className={`rounded-full px-3 py-1 text-xs font-black ${i === part ? 'bg-brand-blue text-white' : 'bg-ink/5 text-ink/70'}`}>{bl.title.replace('Reading Passage', 'Passage')}</button>
          ))}
        </div>
        <span className="ml-2 shrink-0 font-black text-brand-blue">⏱ {mmss(left)}</span>
      </div>
      <BlockView key={part} t={t} b={b} ans={ans} set={set} listening={sec.kind === 'listening'} />
      <div className="mt-5 flex gap-2">
        {part > 0 && <button onClick={() => setPart(part - 1)} className="btn-ghost flex-1 py-2.5 text-sm">← {t.prev}</button>}
        {part < sec.blocks.length - 1 ? (
          <button onClick={() => setPart(part + 1)} className="btn-primary flex-1 py-2.5 text-sm">{t.next} →</button>
        ) : (
          <button onClick={finish} className="btn-primary flex-1 py-2.5 text-sm">{t.submit}</button>
        )}
      </div>
    </div>
  );
}

function BlockView({ t, b, ans, set, listening }: { t: Record<string, string>; b: Block; ans: Record<number, string>; set: (n: number, v: string) => void; listening: boolean }) {
  const letters = b.map ? b.map.spots.map((s) => s.label) : (b.options ?? []).map((_, i) => LETTERS[i]);
  return (
    <div className="mt-3">
      <h2 className="text-lg font-black text-ink">{b.title}</h2>
      <p className="mt-1 whitespace-pre-line text-[15px] font-semibold text-ink/70">{b.instr}</p>
      {listening && <Player t={t} b={b} />}
      {b.map && <MapView m={b.map} />}
      {b.text && <div className="card mt-3 max-h-[60vh] overflow-y-auto whitespace-pre-line p-4 text-[16px] leading-relaxed text-ink/90">{b.text}</div>}
      {b.options && (
        <ul className="card mt-3 space-y-1 p-3 text-[15px] font-semibold text-ink/80">
          {b.options.map((o, i) => <li key={i}><b>{LETTERS[i]})</b> {o}</li>)}
        </ul>
      )}
      <div className="mt-3 space-y-3">
        {b.qs.map((q) => (
          <div key={q.n} className="card p-3">
            <div className="font-bold text-ink">{q.n}. {q.k === 'mcq' && q.q.startsWith('Question') ? '' : q.q}</div>
            {q.k === 'mcq' && (
              <div className="mt-2 grid gap-1.5">
                {q.opts.map((o, i) => (
                  <label key={i} className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2 text-[15px] font-semibold ${ans[q.n] === String(i) ? 'border-brand-blue bg-brand-blue/10' : 'border-ink/10'}`}>
                    <input type="radio" name={`q${q.n}`} checked={ans[q.n] === String(i)} onChange={() => set(q.n, String(i))} className="mt-1" />
                    <span><b>{LETTERS[i]})</b> {o}</span>
                  </label>
                ))}
              </div>
            )}
            {q.k === 'gap' && (
              <input value={ans[q.n] ?? ''} onChange={(e) => set(q.n, e.target.value)} placeholder={t.answer} spellCheck={false} autoCapitalize="off" autoCorrect="off" className="mt-2 w-full rounded-xl border-2 border-ink/15 bg-white px-3 py-2 text-lg font-black text-ink outline-none focus:border-brand-blue" />
            )}
            {q.k === 'match' && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {letters.map((L) => (
                  <button key={L} onClick={() => set(q.n, L)} className={`h-10 w-10 rounded-full text-sm font-black ${ans[q.n] === L ? 'bg-brand-blue text-white' : 'bg-ink/5 text-ink/70'}`}>{L}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


function ObjectiveReview({ t, exam, sec, ans }: { t: Record<string, string>; exam: ExamKind; sec: ObjectiveSection; ans: Record<number, string> }) {
  const all = sec.blocks.flatMap((b) => b.qs);
  const raw = all.filter((q) => isRight(q, ans[q.n])).length;
  return (
      <div className="mt-4">
        <ScoreCard t={t} exam={exam} label={t[sec.kind]} score={exam === 'ielts' ? ieltsBand(sec.kind, raw) : mlScaled(raw, all.length)} detail={`${raw}/${all.length} ${t.correct}`} />
        <div className="mt-4 space-y-2">
          {sec.blocks.map((bl, bi) => (
            <details key={bi} className="card p-3">
              <summary className="cursor-pointer font-black text-ink">{bl.title} — {bl.qs.filter((q) => isRight(q, ans[q.n])).length}/{bl.qs.length}</summary>
              <ul className="mt-2 space-y-1 text-[15px] font-semibold">
                {bl.qs.map((q) => {
                  const ok = isRight(q, ans[q.n]);
                  const mine = ans[q.n];
                  const show = (v: string | undefined) => (v === undefined || v === '' ? '—' : q.k === 'mcq' ? `${LETTERS[Number(v)]}) ${q.opts[Number(v)]}` : v);
                  const key = q.k === 'mcq' ? `${LETTERS[q.a]}) ${q.opts[q.a]}` : q.k === 'match' ? q.a : q.a[0];
                  return (
                    <li key={q.n} className={ok ? 'text-brand-green' : 'text-error'}>
                      {ok ? '✓' : '✗'} {q.n}. {t.yours}: {show(mine)}{!ok && <span className="text-ink/60"> · {t.key}: <b className="text-brand-green">{key}</b></span>}
                    </li>
                  );
                })}
              </ul>
              {sec.kind === 'listening' && (
                <details className="mt-2 text-sm text-ink/60">
                  <summary className="cursor-pointer font-bold">{t.script}</summary>
                  <p className="mt-1 whitespace-pre-line">{(bl.audio ?? bl.audioPerQ?.flat() ?? []).map((s) => s.t).join('\n')}</p>
                </details>
              )}
            </details>
          ))}
        </div>
      </div>
    );
}
function SectionDone({ t, label }: { t: Record<string, string>; label: string }) {
  return (
    <div className="card mt-6 p-6 text-center">
      <div className="text-4xl">✅</div>
      <div className="mt-2 text-lg font-black text-ink">{label} — {t.secDone}</div>
      <p className="mt-1 text-sm font-bold text-ink/55">{t.resultsAtEnd}</p>
    </div>
  );
}

/** plays the block's recording with browser voices, limited number of times (like the real exam) */
function Player({ t, b }: { t: Record<string, string>; b: Block }) {
  const max = b.repeat ?? 1;
  const [used, setUsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef<() => void>(() => {});
  useEffect(() => () => stopRef.current(), []);
  const segs: Seg[] = b.audio ?? (b.audioPerQ ?? []).flatMap((a, i) => [{ v: 'N' as const, t: `Question ${b.qs[i].n}.` }, ...a, ...a]);
  const play = () => {
    unlockSpeech();
    setPlaying(true);
    setUsed((u) => u + 1);
    stopRef.current = speakLines(toItems(segs), { onEnd: () => setPlaying(false) });
  };
  // per-question recordings are already said twice inside one play
  const limit = b.audioPerQ ? 1 : max;
  return (
    <div className="card mt-3 flex items-center justify-between gap-3 p-3">
      <button onClick={play} disabled={playing || used >= limit} className="btn-primary px-4 py-2 text-sm disabled:opacity-50">{playing ? t.playing : t.play}</button>
      <span className="text-sm font-bold text-ink/55">{used >= limit && !playing ? t.played : `${t.plays}: ${limit - used}`}</span>
    </div>
  );
}

function MapView({ m }: { m: MapSpec }) {
  return (
    <svg viewBox="0 0 560 320" className="card mt-3 w-full bg-white p-2" role="img" aria-label={m.title}>
      <rect x="40" y="20" width="420" height="280" rx="14" fill="#F3F7EE" stroke="#9BB58A" />
      <text x="250" y="16" textAnchor="middle" fontSize="13" fontWeight="800" fill="#334">{m.title}</text>
      {m.landmarks.map((l) => (
        <g key={l.label}>
          <rect x={l.x} y={l.y} width={l.w} height={l.h} rx="8" fill="#DDEBFF" stroke="#7DA2D6" />
          <text x={l.x + l.w / 2} y={l.y + l.h / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#245">{l.label}</text>
        </g>
      ))}
      {m.spots.map((s) => (
        <g key={s.label}>
          <rect x={s.x} y={s.y} width="80" height="56" rx="8" fill="#fff" stroke="#556" strokeWidth="1.5" />
          <text x={s.x + 40} y={s.y + 34} textAnchor="middle" fontSize="20" fontWeight="900" fill="#223">{s.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================ writing */
type AiW = { words: number; ta: number; cc: number; lr: number; gra: number; score: number; level?: string; comment: string; tips: string[]; errors: string[] };
async function postAi<T>(url: string, body: unknown): Promise<{ ok: true; result: T } | { ok: false; paid?: boolean }> {
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    if (r.status === 402) return { ok: false, paid: true };
    if (!r.ok) return { ok: false };
    return { ok: true, result: (await r.json()).result as T };
  } catch {
    return { ok: false };
  }
}

function Writing({ t, exam, sec, onDone, quiet }: { t: Record<string, string>; exam: ExamKind; sec: WritingSection; onDone: (r: SecResult) => void; quiet: boolean }) {
  const [texts, setTexts] = useState<string[]>(sec.tasks.map(() => ''));
  const [res, setRes] = useState<(AiW | null)[]>(sec.tasks.map(() => null));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const left = useCountdown(sec.minutes * 60, () => submit(), !done);
  const submit = async () => {
    if (done || busy) return;
    setBusy(true);
    setErr(null);
    const out: (AiW | null)[] = [];
    for (let i = 0; i < sec.tasks.length; i++) {
      const task = sec.tasks[i];
      if (!texts[i].trim()) {
        out.push(null);
        continue;
      }
      const r = await postAi<AiW>('/api/ai/english-writing', { exam, task: task.prompt, chart: task.chart ? chartAsText(task.chart) : '', text: texts[i] });
      if (!r.ok) {
        setErr(r.paid ? t.paid : t.aiErr);
        setBusy(false);
        return;
      }
      out.push(r.result);
    }
    setRes(out);
    setBusy(false);
    setDone(true);
    const w = sec.tasks.map((x) => x.weight);
    const scores = out.map((r) => r?.score ?? 0);
    const total = scores.reduce((a, s, i) => a + s * w[i], 0) / w.reduce((a, b) => a + b, 0);
    const score = exam === 'ielts' ? Math.floor(total * 2 + 0.5) / 2 : Math.round(total * 10) / 10;
    onDone({
      kind: 'writing',
      label: t.writing,
      score,
      detail: out.map((r, i) => `${sec.tasks[i].title}: ${r ? r.score : '—'}`).join(' · '),
      review: (
        <div className="space-y-3">
          {out.map((r, i) => (
            <div key={i} className="card p-3">
              <div className="font-black text-ink">{t.writing} · {sec.tasks[i].title}</div>
              <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm text-ink/60">{texts[i] || '—'}</p>
              {r && !quiet && <AiBox t={t} exam={exam} score={r.score} level={r.level} crit={[['Task', r.ta], ['Coherence', r.cc], ['Vocabulary', r.lr], ['Grammar', r.gra]]} comment={r.comment} tips={r.tips} errors={r.errors} />}
            </div>
          ))}
        </div>
      )
    });
  };
  if (done && quiet) return <SectionDone t={t} label={t.writing} />;
  return (
    <div className="mt-3 space-y-5">
      {!done && <div className="text-right font-black text-brand-blue">⏱ {mmss(left)}</div>}
      {sec.tasks.map((task, i) => {
        const words = texts[i].trim() ? texts[i].trim().split(/\s+/).length : 0;
        const r = res[i];
        return (
          <div key={task.id} className="card p-4">
            <h2 className="text-lg font-black text-ink">{task.title}</h2>
            <p className="mt-1 whitespace-pre-line text-[15px] font-semibold text-ink/80">{task.prompt}</p>
            {task.chart && <ChartView c={task.chart} />}
            <textarea value={texts[i]} disabled={done} onChange={(e) => setTexts((x) => x.map((v, k) => (k === i ? e.target.value : v)))} rows={12} spellCheck={false} autoCorrect="off" autoCapitalize="off" className="mt-3 w-full rounded-xl border-2 border-ink/15 bg-white px-3 py-2 text-[16px] leading-relaxed text-ink outline-none focus:border-brand-blue" />
            <div className={`text-sm font-bold ${words < task.minWords ? 'text-error' : 'text-brand-green'}`}>{words} {t.words} (min {task.minWords})</div>
            {r && <AiBox t={t} exam={exam} score={r.score} level={r.level} crit={exam === 'ielts' ? [['Task', r.ta], ['Coherence', r.cc], ['Vocabulary', r.lr], ['Grammar', r.gra]] : [['Task', r.ta], ['Organisation', r.cc], ['Vocabulary', r.lr], ['Grammar', r.gra]]} comment={r.comment} tips={r.tips} errors={r.errors} />}
          </div>
        );
      })}
      {!done && (
        <button onClick={submit} disabled={busy} className="btn-primary w-full py-3 disabled:opacity-50">{busy ? t.checking : `${t.submit} · ${t.check}`}</button>
      )}
      {err && <p className="text-center font-bold text-error">{err}</p>}
      <p className="text-center text-xs font-bold text-ink/45">ⓘ {t.aiNote}</p>
    </div>
  );
}

function AiBox({ t, exam, score, level, crit, comment, tips, errors }: { t: Record<string, string>; exam: ExamKind; score: number; level?: string; crit: [string, number][]; comment: string; tips: string[]; errors?: string[] }) {
  return (
    <div className="mt-3 rounded-xl bg-brand-blue/[0.07] px-3.5 py-3">
      <div className="font-black text-brand-blue">
        SI: {exam === 'ielts' ? `Band ${score}` : `${score} / 75`}
        {level ? ` · ${level}` : ''}
      </div>
      <div className="mt-1 text-sm font-bold text-ink/70">{crit.map(([k, v]) => `${k} ${v}`).join(' · ')} {exam === 'ielts' ? '(0–9)' : '(0–5)'}</div>
      <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-ink/80">{comment}</p>
      {tips.length > 0 && <ul className="mt-1 list-disc pl-5 text-sm font-semibold text-ink/70">{tips.map((x, k) => <li key={k}>{x}</li>)}</ul>}
      {errors && errors.length > 0 && <ul className="mt-1 list-disc pl-5 text-sm font-semibold text-error/80">{errors.map((x, k) => <li key={k}>{x}</li>)}</ul>}
      <p className="mt-2 text-xs font-bold text-ink/45">ⓘ {t.aiNote}</p>
    </div>
  );
}

const COLORS = ['#2B6CB0', '#E14B4B', '#12A6A0', '#F39A1F', '#8E44AD'];
function ChartView({ c }: { c: Chart }) {
  const W = 560, H = 300, x0 = 50, y0 = 250, w = 470, h = 210;
  if (c.type === 'pie') {
    const vals = c.series[0].values;
    let a0 = -Math.PI / 2;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full rounded-xl bg-white">
        <text x={W / 2} y="18" textAnchor="middle" fontSize="13" fontWeight="800" fill="#223">{c.title}</text>
        {vals.map((v, i) => {
          const a1 = a0 + (v / 100) * Math.PI * 2;
          const [cx, cy, r] = [190, 160, 115];
          const p = `M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z`;
          const mid = (a0 + a1) / 2;
          a0 = a1;
          return (
            <g key={i}>
              <path d={p} fill={COLORS[i % 5]} stroke="#fff" strokeWidth="2" />
              <text x={cx + r * 0.65 * Math.cos(mid)} y={cy + r * 0.65 * Math.sin(mid) + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">{v}%</text>
              <rect x="350" y={70 + i * 26} width="14" height="14" fill={COLORS[i % 5]} />
              <text x="372" y={82 + i * 26} fontSize="13" fontWeight="700" fill="#223">{c.categories[i]}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  const max = Math.max(...c.series.flatMap((s) => s.values));
  const top = Math.ceil(max / 10) * 10 || 10;
  const Y = (v: number) => y0 - (v / top) * h;
  const n = c.categories.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 20}`} className="mt-3 w-full rounded-xl bg-white">
      <text x={W / 2} y="18" textAnchor="middle" fontSize="13" fontWeight="800" fill="#223">{c.title}</text>
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line x1={x0} x2={x0 + w} y1={Y(top * f)} y2={Y(top * f)} stroke="#E3E6EA" />
          <text x={x0 - 6} y={Y(top * f) + 4} textAnchor="end" fontSize="11" fill="#556">{Math.round(top * f)}</text>
        </g>
      ))}
      <text x="12" y={y0 - h / 2} fontSize="11" fill="#556" transform={`rotate(-90 12 ${y0 - h / 2})`} textAnchor="middle">{c.unit}</text>
      {c.categories.map((cat, i) => (
        <text key={cat} x={x0 + (w / n) * (i + 0.5)} y={y0 + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill="#334">{cat}</text>
      ))}
      {c.series.map((s, si) =>
        c.type === 'bar' ? (
          s.values.map((v, i) => {
            const bw = (w / n) * 0.7 / c.series.length;
            const x = x0 + (w / n) * i + (w / n) * 0.15 + bw * si;
            return <rect key={`${si}-${i}`} x={x} y={Y(v)} width={bw - 2} height={y0 - Y(v)} fill={COLORS[si]} />;
          })
        ) : (
          <polyline key={si} fill="none" stroke={COLORS[si]} strokeWidth="3" points={s.values.map((v, i) => `${x0 + (w / n) * (i + 0.5)},${Y(v)}`).join(' ')} />
        )
      )}
      {c.series.map((s, si) => (
        <g key={s.name}>
          <rect x={x0 + si * 150} y={y0 + 30} width="14" height="14" fill={COLORS[si]} />
          <text x={x0 + si * 150 + 20} y={y0 + 42} fontSize="12" fontWeight="700" fill="#223">{s.name}</text>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================ speaking */
type Turn = { part: string; q: string; a: string; sec: number };
type AiS = { fc: number; lr: number; gra: number; p: number; score: number; level?: string; comment: string; tips: string[] };

function Speaking({ t, exam, sec, onDone, quiet }: { t: Record<string, string>; exam: ExamKind; sec: SpeakingSection; onDone: (r: SecResult) => void; quiet: boolean }) {
  const steps = sec.parts.flatMap((p, pi) => p.questions.map((q, qi) => ({ pi, qi, q })));
  const [step, setStep] = useState(-1);
  const [phase, setPhase] = useState<'idle' | 'ask' | 'prep' | 'rec' | 'stt' | 'end'>('idle');
  const [left, setLeft] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [res, setRes] = useState<AiS | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const rec = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopSpeech = useRef<() => void>(() => {});

  useEffect(
    () => () => {
      stopSpeech.current();
      if (timer.current) clearInterval(timer.current);
      stream.current?.getTracks().forEach((x) => x.stop());
      if (meter.current) cancelAnimationFrame(meter.current.raf);
    },
    []
  );
  const countdown = (sec: number, then: () => void) => {
    if (timer.current) clearInterval(timer.current);
    setLeft(sec);
    let s = sec;
    timer.current = setInterval(() => {
      s -= 1;
      setLeft(s);
      if (s <= 0) {
        clearInterval(timer.current!);
        then();
      }
    }, 1000);
  };

  const begin = async () => {
    unlockSpeech();
    setErr(null);
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setErr(t.mic);
      return;
    }
    ask(0);
  };
  const afterAsk = useRef<() => void>(() => {});
  const ask = (i: number) => {
    const s = steps[i];
    const p = sec.parts[s.pi];
    setStep(i);
    setPhase('ask');
    const lines: Seg[] = [];
    if (s.qi === 0) lines.push({ v: 'N', t: `${p.title.replace('1.1', 'one point one').replace('1.2', 'one point two')}. ${p.instr}` });
    lines.push({ v: 'N', t: s.q });
    let went = false;
    afterAsk.current = () => {
      if (went) return;
      went = true;
      stopSpeech.current();
      const prep = s.qi === 0 ? p.prepSec : Math.min(5, p.prepSec);
      setTotal(prep);
      setPhase('prep');
      countdown(prep, () => record(i));
    };
    stopSpeech.current = speakLines(toItems(lines), { onEnd: () => afterAsk.current() });
  };
  const [total, setTotal] = useState(1);
  const [level, setLevel] = useState(0);
  const meter = useRef<{ ctx: AudioContext; raf: number } | null>(null);
  const startMeter = () => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      const an = ctx.createAnalyser();
      an.fftSize = 512;
      ctx.createMediaStreamSource(stream.current!).connect(an);
      const buf = new Uint8Array(an.fftSize);
      let last = 0;
      const tick = (ts: number) => {
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for (const v of buf) sum += (v - 128) * (v - 128);
        if (ts - last > 80) {
          last = ts;
          setLevel(Math.min(1, Math.sqrt(sum / buf.length) / 40));
        }
        meter.current!.raf = requestAnimationFrame(tick);
      };
      meter.current = { ctx, raf: requestAnimationFrame(tick) };
    } catch {
      /* no Web Audio: the countdown still shows */
    }
  };
  const stopMeter = () => {
    if (!meter.current) return;
    cancelAnimationFrame(meter.current.raf);
    meter.current.ctx.close().catch(() => {});
    meter.current = null;
    setLevel(0);
  };
  const record = (i: number) => {
    const p = sec.parts[steps[i].pi];
    chunks.current = [];
    const mr = new MediaRecorder(stream.current!);
    mr.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
    mr.onstop = () => transcribe(i, new Blob(chunks.current, { type: mr.mimeType || 'audio/webm' }));
    rec.current = mr;
    started.current = Date.now();
    mr.start();
    setTotal(p.speakSec);
    setPhase('rec');
    startMeter();
    countdown(p.speakSec, () => stopRec());
  };
  const stopRec = () => {
    if (timer.current) clearInterval(timer.current);
    stopMeter();
    if (rec.current?.state === 'recording') rec.current.stop();
  };
  const transcribe = async (i: number, blob: Blob) => {
    setPhase('stt');
    const secs = (Date.now() - started.current) / 1000;
    let text = '';
    try {
      const f = new FormData();
      f.append('audio', blob, /mp4|m4a|aac/.test(blob.type) ? 'answer.mp4' : /ogg/.test(blob.type) ? 'answer.ogg' : 'answer.webm');
      f.append('lang', 'en');
      const r = await fetch('/api/ai/stt', { method: 'POST', body: f });
      if (r.ok) text = (await r.json()).text ?? '';
    } catch {
      /* keep empty */
    }
    const s = steps[i];
    const turn = { part: sec.parts[s.pi].title, q: s.q, a: text, sec: secs };
    setTurns((x) => [...x, turn]);
    if (i + 1 < steps.length) ask(i + 1);
    else finish([...turnsRef.current, turn]);
  };
  const turnsRef = useRef(turns);
  turnsRef.current = turns;
  const finish = async (all: Turn[]) => {
    setPhase('end');
    stream.current?.getTracks().forEach((x) => x.stop());
    const r = await postAi<AiS>('/api/ai/english-speaking', { exam, items: all });
    if (!r.ok) {
      setErr(r.paid ? t.paid : t.aiErr);
      onDone({ kind: 'speaking', label: t.speaking, score: null, detail: '—' });
      return;
    }
    setRes(r.result);
    onDone({
      kind: 'speaking',
      label: t.speaking,
      score: r.result.score,
      detail: r.result.level ?? '',
      review: (
        <div className="card p-3">
          <div className="font-black text-ink">{t.speaking}</div>
          <AiBox t={t} exam={exam} score={r.result.score} level={r.result.level} crit={[['Fluency', r.result.fc], ['Vocabulary', r.result.lr], ['Grammar', r.result.gra], ['Pronunciation', r.result.p]]} comment={r.result.comment} tips={r.result.tips} />
          <details className="mt-2 text-sm">
            <summary className="cursor-pointer font-black">{t.script}</summary>
            {all.map((x, i) => <p key={i} className="mt-2"><b>{x.q}</b><br />{x.a || '—'}</p>)}
          </details>
        </div>
      )
    });
  };

  const cur = step >= 0 ? steps[step] : null;
  const part = cur ? sec.parts[cur.pi] : null;
  return (
    <div className="mt-4 space-y-4">
      {phase === 'idle' && (
        <div className="card p-4">
          <ul className="space-y-1 text-[15px] font-semibold text-ink/75">
            {sec.parts.map((p) => <li key={p.title}><b>{p.title}</b> — {p.instr}</li>)}
          </ul>
          <button onClick={begin} className="btn-primary mt-4 w-full py-3">🎤 {t.start}</button>
          <p className="mt-2 text-center text-xs font-bold text-ink/45">ⓘ {t.aiNote}</p>
        </div>
      )}
      {part && phase !== 'idle' && phase !== 'end' && (
        <div className="card p-4">
          <div className="text-sm font-black text-brand-blue">{part.title}</div>
          <p className="mt-1 text-[15px] font-semibold text-ink/70">{part.instr}</p>
          {part.card && <div className="mt-3 whitespace-pre-line rounded-xl border-2 border-dashed border-ink/20 p-3 text-[16px] font-bold text-ink">{part.card}</div>}
          <p className="mt-3 text-lg font-black text-ink">{cur!.q}</p>
          <div className="mt-3 text-center font-black">
            {phase === 'ask' && (
              <div>
                <span className="text-ink/60">🔊 {t.listen}</span>
                <button onClick={() => afterAsk.current()} className="btn-ghost mt-2 block w-full py-2 text-sm">{t.skip} →</button>
              </div>
            )}
            {(phase === 'prep' || phase === 'rec') && (
              <div className="mx-auto mt-1 h-2 w-full overflow-hidden rounded-full bg-ink/10">
                <div className={`h-full rounded-full transition-all duration-1000 ${phase === 'rec' ? 'bg-error' : 'bg-brand-blue'}`} style={{ width: `${(left / Math.max(1, total)) * 100}%` }} />
              </div>
            )}
            {phase === 'prep' && (
              <div className="mt-2">
                <span className="text-brand-blue">{t.prep}: {left} s</span>
                <button onClick={() => { if (timer.current) clearInterval(timer.current); record(step); }} className="btn-ghost mt-2 block w-full py-2 text-sm">🎤 {t.speak}</button>
              </div>
            )}
            {phase === 'rec' && (
              <div className="mt-2">
                <span className="text-error">{t.recording} · {left} s</span>
                <div className="mt-2 flex h-10 items-end justify-center gap-1" aria-label={t.micLevel}>
                  {Array.from({ length: 16 }, (_, k) => {
                    const h = Math.max(0.08, Math.min(1, level * (1.4 - Math.abs(k - 7.5) / 8) + (k % 3) * 0.02));
                    return <span key={k} className="w-2 rounded-full bg-error/80 transition-all duration-75" style={{ height: `${h * 100}%` }} />;
                  })}
                </div>
                <button onClick={stopRec} className="btn-ghost mt-2 block w-full py-2 text-sm">{t.stop}</button>
              </div>
            )}
            {phase === 'stt' && <span className="text-ink/60">{t.transcribing}</span>}
          </div>
        </div>
      )}
      {phase === 'end' && !res && !err && <p className="text-center font-bold text-ink/60">{t.checking}</p>}
      {err && <p className="text-center font-bold text-error">{err}</p>}
      {res && !quiet && <AiBox t={t} exam={exam} score={res.score} level={res.level} crit={[['Fluency', res.fc], ['Vocabulary', res.lr], ['Grammar', res.gra], ['Pronunciation', res.p]]} comment={res.comment} tips={res.tips} />}
      {phase === 'end' && quiet && res && <SectionDone t={t} label={t.speaking} />}
      {phase === 'end' && !quiet && turns.length > 0 && (
        <details className="card p-3 text-sm">
          <summary className="cursor-pointer font-black">{t.script}</summary>
          {turns.map((x, i) => <p key={i} className="mt-2"><b>{x.q}</b><br />{x.a || '—'}</p>)}
        </details>
      )}
    </div>
  );
}

/* ============================================================ results */
function ScoreCard({ t, exam, label, score, detail }: { t: Record<string, string>; exam: ExamKind; label: string; score: number | null; detail: string }) {
  return (
    <div className="card p-5 text-center">
      <div className="text-sm font-black text-ink/55">{t.results} · {label}</div>
      <div className="mt-1 text-4xl font-black text-brand-blue">{score === null ? '—' : exam === 'ielts' ? `Band ${score}` : `${score} / 75`}</div>
      {exam === 'multilevel' && score !== null && <div className="font-black text-ink/70">{mlLevel(score)}</div>}
      <div className="mt-1 text-sm font-bold text-ink/55">{detail}</div>
      <div className="mt-2 text-xs font-semibold text-ink/40">{t.est}</div>
    </div>
  );
}
function Summary({ t, exam, results }: { t: Record<string, string>; exam: ExamKind; results: SecResult[] }) {
  const got = results.filter((r) => r.score !== null).map((r) => r.score as number);
  const overall = exam === 'ielts' ? ieltsOverall(got) : Math.round((got.reduce((a, b) => a + b, 0) / Math.max(1, got.length)) * 10) / 10;
  return (
    <div className="card mt-6 p-5">
      <div className="text-center text-sm font-black text-ink/55">{t.overall}</div>
      <div className="text-center text-4xl font-black text-brand-blue">{exam === 'ielts' ? `Band ${overall}` : `${overall} / 75 · ${mlLevel(overall)}`}</div>
      <ul className="mt-3 space-y-1 text-[15px] font-bold text-ink/75">
        {results.map((r) => <li key={r.kind}>{r.label}: {r.score === null ? '—' : exam === 'ielts' ? `Band ${r.score}` : `${r.score} / 75`} <span className="text-ink/45">({r.detail})</span></li>)}
      </ul>
      <div className="mt-2 text-center text-xs font-semibold text-ink/40">{t.est}</div>
    </div>
  );
}
