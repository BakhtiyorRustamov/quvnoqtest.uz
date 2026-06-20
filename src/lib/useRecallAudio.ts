'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type RecallAudioState = 'idle' | 'loading' | 'playing' | 'error';

const SPEECH_LANG: Record<string, string> = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };

/**
 * Plays the cached TTS clip for the recall block (FR-TTS-1/4). Never calls the
 * TTS API from the client — clips are pre-seeded files. Falls back to the
 * browser's speech synthesis where a matching voice exists; otherwise reports
 * 'error' so the UI can show a friendly note (NFR-6).
 */
export function useRecallAudio(topicId: string, locale: string, text: string) {
  const [state, setState] = useState<RecallAudioState>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setState('idle');
  }, []);

  useEffect(() => stop, [stop, locale]);

  const toggle = useCallback(async () => {
    if (state === 'playing' || state === 'loading') {
      stop();
      return;
    }
    setState('loading');
    const src = `/audio/tts/${topicId}.${locale}.wav`;
    try {
      const audio = new Audio(src);
      audioRef.current = audio;
      audio.onended = () => setState('idle');
      audio.onerror = () => {}; // play() below rejects; handled in catch
      await audio.play();
      setState('playing');
      return;
    } catch {
      /* cached clip missing — try the browser voice */
    }
    try {
      if (!('speechSynthesis' in window)) throw new Error('no tts');
      const voices = window.speechSynthesis.getVoices();
      const lang = SPEECH_LANG[locale] ?? 'uz-UZ';
      const hasVoice = voices.some((v) => v.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
      if (!hasVoice) throw new Error('no voice');
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.95;
      u.onend = () => setState('idle');
      u.onerror = () => setState('error');
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      setState('playing');
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 2600);
    }
  }, [state, stop, topicId, locale, text]);

  return { state, toggle, stop };
}
