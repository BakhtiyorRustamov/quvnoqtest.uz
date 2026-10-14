'use client';

/**
 * Grade 11 per-device memory (localStorage): finished test attempts (for the
 * 🗓️ past-reviews page and the best result on the dashboard tiles) and the
 * lessons flagged "!" because a question they cover was answered wrongly.
 * Every access is wrapped — storage can be blocked or empty (private mode,
 * some webviews) and the app must still work.
 */

export type G11Attempt = {
  /** epoch ms when the test was finished */
  at: number;
  score: number;
  total: number;
  /** chosen option per question (null = unanswered) */
  answers: (number | null)[];
};

const HISTORY = (slug: string) => `qt_g11_hist_${slug}`;
const FLAGS = (slug: string) => `qt_g11_flags_${slug}`;
const MAX_ATTEMPTS = 30;
export const G11_STORE_EVENT = 'qt-g11-store';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(G11_STORE_EVENT));
  } catch {
    /* storage unavailable — nothing persists, the page still works */
  }
}

export function getAttempts(slug: string): G11Attempt[] {
  const list = read<G11Attempt[]>(HISTORY(slug), []);
  return Array.isArray(list) ? list : [];
}

export function addAttempt(slug: string, attempt: G11Attempt) {
  write(HISTORY(slug), [attempt, ...getAttempts(slug)].slice(0, MAX_ATTEMPTS));
}

export function bestAttempt(slug: string): G11Attempt | null {
  return getAttempts(slug).reduce<G11Attempt | null>((b, a) => (!b || a.score > b.score ? a : b), null);
}

export function getFlags(slug: string): number[] {
  const list = read<number[]>(FLAGS(slug), []);
  return Array.isArray(list) ? list : [];
}

export function addFlags(slug: string, lessons: number[]) {
  write(FLAGS(slug), Array.from(new Set([...getFlags(slug), ...lessons])).sort((a, b) => a - b));
}

export function clearFlag(slug: string, lesson: number) {
  const cur = getFlags(slug);
  if (cur.includes(lesson)) write(FLAGS(slug), cur.filter((n) => n !== lesson));
}

import { useEffect, useState } from 'react';

/** Re-renders the caller whenever the grade-11 store changes (this tab or another). */
export function useG11StoreVersion(): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    const bump = () => setV((x) => x + 1);
    bump(); // first client render: read storage after hydration
    window.addEventListener(G11_STORE_EVENT, bump);
    window.addEventListener('storage', bump);
    return () => {
      window.removeEventListener(G11_STORE_EVENT, bump);
      window.removeEventListener('storage', bump);
    };
  }, []);
  return v;
}
