/**
 * Free narration with the device's own text-to-speech (Web Speech API).
 * Used for Russian and English lessons: Edge has natural Microsoft voices,
 * Chrome has Google voices, iPhones have Apple voices. If the device has no
 * voice for the language, lessons simply stay silent (captions still show).
 */

const BCP: Record<string, string> = { ru: 'ru-RU', en: 'en-US', uz: 'uz-UZ' };

function rank(v: SpeechSynthesisVoice): number {
  const n = v.name.toLowerCase();
  let s = 0;
  if (/natural|online|neural/.test(n)) s += 40; // Edge's free neural voices
  else if (/google/.test(n)) s += 25;
  else if (/enhanced|premium|siri/.test(n)) s += 20;
  if (!v.localService) s += 5;
  if (/dmitry|dmitri|yuri|pavel|guy|andrew|brian/.test(n)) s += 3; // a calm male voice when there is a choice
  return s;
}

export function pickVoice(lang: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const want = (BCP[lang] ?? lang).toLowerCase();
  const prefix = want.split('-')[0];
  const all = window.speechSynthesis.getVoices();
  const list = all.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
  if (!list.length) return null;
  return [...list].sort((a, b) => rank(b) - rank(a) || Number(b.lang.toLowerCase() === want) - Number(a.lang.toLowerCase() === want))[0];
}

/** Resolves once the voice list is loaded (Chrome loads it asynchronously). */
export function voicesReady(timeoutMs = 2500): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return resolve();
    if (window.speechSynthesis.getVoices().length) return resolve();
    const done = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', done);
      resolve();
    };
    window.speechSynthesis.addEventListener('voiceschanged', done);
    setTimeout(done, timeoutMs);
  });
}

/**
 * Speak a text sentence by sentence (Chrome stops long utterances after ~15 s,
 * so a paragraph is queued as short pieces). Returns a stop function.
 */
export function speak(text: string, lang: string, opts: { rate?: number; onEnd?: () => void } = {}): () => void {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
  if (!synth) return () => {};
  synth.cancel();
  const voice = pickVoice(lang);
  const parts = text
    .replace(/[«»"]/g, '')
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  let stopped = false;
  parts.forEach((p, i) => {
    const u = new SpeechSynthesisUtterance(p);
    u.lang = voice?.lang ?? BCP[lang] ?? lang;
    if (voice) u.voice = voice;
    u.rate = opts.rate ?? 0.95;
    if (i === parts.length - 1) u.onend = () => !stopped && opts.onEnd?.();
    synth.speak(u);
  });
  return () => {
    stopped = true;
    synth.cancel();
  };
}

const FEMALE = /female|zira|aria|jenny|ava|emma|sonia|libby|samantha|karen|serena|hazel|susan|moira|tessa|fiona|victoria|svetlana|dariya|milena|katya|irina|madina/i;
const MALE = /male|guy|andrew|brian|ryan|thomas|daniel|david|mark|alex|george|fred|oliver|dmitry|pavel|yuri|sardor/i;

/** Best voice for a speaker: language/accent first, then the wished gender. */
export function pickVoiceFor(accent: string, gender?: 'm' | 'f'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const want = accent.toLowerCase();
  const prefix = want.split('-')[0];
  const list = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
  if (!list.length) return null;
  const score = (v: SpeechSynthesisVoice) => {
    let s = rank(v);
    if (v.lang.toLowerCase().replace('_', '-') === want) s += 30;
    if (gender === 'f' && FEMALE.test(v.name) && !/\bmale\b/i.test(v.name.replace(/female/i, ''))) s += 25;
    if (gender === 'm' && MALE.test(v.name) && !/female/i.test(v.name)) s += 25;
    return s;
  };
  return [...list].sort((a, b) => score(b) - score(a))[0];
}

export type SpeechItem = { text: string; accent: string; gender?: 'm' | 'f'; rate?: number };

/**
 * Speak several lines one after another, each with its own voice (a dialogue).
 * Pitch is nudged by gender so two speakers sound different even when the
 * device has a single voice. Returns a stop function.
 */
export function speakSeq(items: SpeechItem[], opts: { onItem?: (i: number) => void; onEnd?: () => void } = {}): () => void {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
  if (!synth) return () => {};
  synth.cancel();
  let stopped = false;
  items.forEach((it, i) => {
    const voice = pickVoiceFor(it.accent, it.gender);
    const parts = it.text
      .replace(/[«»"]/g, '')
      .split(/(?<=[.!?…])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    parts.forEach((p, k) => {
      const u = new SpeechSynthesisUtterance(p);
      u.lang = voice?.lang ?? it.accent;
      if (voice) u.voice = voice;
      u.rate = it.rate ?? 0.95;
      u.pitch = it.gender === 'f' ? 1.12 : it.gender === 'm' ? 0.9 : 1;
      if (k === 0) u.onstart = () => !stopped && opts.onItem?.(i);
      if (i === items.length - 1 && k === parts.length - 1) u.onend = () => !stopped && opts.onEnd?.();
      synth.speak(u);
    });
  });
  return () => {
    stopped = true;
    synth.cancel();
  };
}
