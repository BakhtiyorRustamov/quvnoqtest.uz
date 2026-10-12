"use client";
import React, { useMemo, useState } from "react";

/**
 * LetterSequence — the interactive version of the textbook task "Harflarni
 * toʻgʻri ketma-ketlikda oʻqing" (read the letters in the correct sequence).
 * Letters sit along a winding line; the child taps them IN ORDER, following the
 * line, to spell a hidden phrase (e.g. "Kitob — aql qayrogʻi"). Each correct tap
 * lights the letter green and appends it to the answer strip; an out-of-order
 * tap shakes. When the whole phrase is assembled it reveals the words and their
 * meaning. Self-grading.
 *
 * Props: {
 *   letters: string[],        // letters IN READING ORDER, e.g. ["K","i","t","o","b",...]
 *                             //   (multi-char units like "gʻ" are one tile)
 *   words?: number[],         // letter counts per word for spacing, e.g. [5,3,7]
 *   phrase?: string,          // full phrase shown when solved (else derived from words)
 *   meaning?: {uz,ru,en},     // what it means, shown after solving
 *   decoys?: number,          // how many distractor number tiles to scatter in (default ~4)
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 *
 * The letters are NOT pre-connected and no letter is pre-highlighted: the child
 * must find the order themselves. A green line is drawn PROGRESSIVELY, joining
 * each letter to the next only as it is correctly tapped (like tracing the
 * hidden sentence). Random number tiles are sprinkled in as distractors — tapping
 * one shakes and is ignored.
 */
const STR = {
  uz: { instr: "Harflarni toʻgʻri ketma-ketlikda bos", done: "Barakalla! 🎉", retry: "Bu toʻgʻri kelmadi — boshqa harfni sinab koʻr", meaning: "Maʼnosi", next: "Yana" },
  ru: { instr: "Нажимай буквы в правильном порядке", done: "Молодец! 🎉", retry: "Не подходит — попробуй другую букву", meaning: "Значение", next: "Ещё" },
  en: { instr: "Tap the letters in the correct order", done: "Great! 🎉", retry: "Not this one — try another letter", meaning: "Meaning", next: "Again" }
};

const DEMO = {
  letters: ["K", "i", "t", "o", "b", "a", "q", "l", "q", "a", "y", "r", "o", "gʻ", "i"],
  words: [5, 3, 7],
  phrase: "Kitob — aql qayrogʻi",
  meaning: { uz: "Kitob — aqlni oʻtkirlaydigan qayroq (charxtosh).", ru: "Книга — точило ума.", en: "A book is the whetstone of the mind." }
};

function pickL(v, lang) {
  if (v == null) return "";
  return typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}

/** Join letters into a spaced phrase using per-word letter counts. */
function joinWords(letters, words) {
  if (!words || !words.length) return letters.join("");
  const out = [];
  let k = 0;
  for (const n of words) {
    out.push(letters.slice(k, k + n).join(""));
    k += n;
  }
  return out.join(" ");
}

/** Tiny deterministic RNG (mulberry32) so decoy placement is stable per render. */
function seededRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function LetterSequence({
  letters,
  words,
  phrase,
  meaning,
  decoys,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  if (!letters || !letters.length) {
    letters = DEMO.letters;
    words = words ?? DEMO.words;
    phrase = phrase ?? DEMO.phrase;
    meaning = meaning ?? DEMO.meaning;
  }
  const n = letters.length;

  // Layout: letters follow a winding path; number-tile distractors are scattered
  // off the path. No line is drawn up front — the child finds the order.
  const geo = useMemo(() => {
    const W = Math.max(340, 44 + (n - 1) * 44);
    const H = 190;
    const midY = 96;
    const amp = 46;
    const padX = 30;
    const pts = letters.map((ch, i) => {
      const x = padX + (i * (W - padX * 2)) / Math.max(1, n - 1);
      const y = midY + amp * Math.sin(i * 1.15 + 0.3);
      return { x, y, ch, i };
    });
    // Scatter distractor number tiles in the empty space, away from every letter.
    const seed = letters.join("").split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
    const rnd = seededRng(seed);
    const nDecoy = Math.max(3, Math.min(6, decoys ?? Math.round(n / 2)));
    const dec = [];
    let tries = 0;
    while (dec.length < nDecoy && tries < 400) {
      tries++;
      const x = padX + rnd() * (W - padX * 2);
      const y = 24 + rnd() * (H - 48);
      const far = (q) => Math.hypot(q.x - x, q.y - y) > 40;
      if (pts.every(far) && dec.every(far)) {
        dec.push({ x, y, num: 1 + Math.floor(rnd() * 9), id: "d" + dec.length });
      }
    }
    return { W, H, pts, dec };
  }, [letters, n, decoys]);

  const [count, setCount] = useState(0); // how many letters solved (prefix length)
  const [shake, setShake] = useState(null);
  const solved = count >= n;

  function tap(p) {
    if (solved) return;
    const ok = p.i === count; // must tap the next letter in order
    if (typeof onAttempt === "function") onAttempt(ok, { letter: p.ch, at: p.i });
    if (ok) {
      const nc = count + 1;
      setCount(nc);
      if (nc >= n && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(p.i);
      setTimeout(() => setShake(null), 420);
    }
  }

  function tapDecoy(d) {
    if (solved) return;
    if (typeof onAttempt === "function") onAttempt(false, { decoy: d.num });
    setShake(d.id);
    setTimeout(() => setShake(null), 420);
  }

  // Progress line: joins the letters tapped SO FAR, drawn as the child clicks.
  const progPath = geo.pts.slice(0, Math.max(1, count)).map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  const answerLetters = letters.slice(0, count);
  const answerText = joinWords(answerLetters, words);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.stage}>
        <svg viewBox={`0 0 ${geo.W} ${geo.H}`} width="100%" style={{ maxHeight: 230 }}>
          {count > 1 && <path d={progPath} fill="none" stroke="#46c06a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}

          {/* distractor number tiles */}
          {geo.dec.map((d) => (
            <g
              key={d.id}
              onClick={() => tapDecoy(d)}
              className={shake === d.id ? "lsShake" : ""}
              style={{ cursor: solved ? "default" : "pointer" }}
            >
              <circle cx={d.x} cy={d.y} r="14" fill="#f6f5f1" stroke="#e3ddcf" strokeWidth="2" />
              <text x={d.x} y={d.y} textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="800" fill="#b7b0a0" style={{ pointerEvents: "none", userSelect: "none" }}>{d.num}</text>
            </g>
          ))}

          {/* letters — no letter is pre-highlighted */}
          {geo.pts.map((p) => {
            const on = p.i < count;
            return (
              <g
                key={p.i}
                onClick={() => tap(p)}
                className={shake === p.i ? "lsShake" : ""}
                style={{ cursor: solved ? "default" : "pointer" }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="15"
                  fill={on ? "#eefcf2" : "#fff"}
                  stroke={on ? "#46c06a" : "#e3d9c2"}
                  strokeWidth={on ? 3 : 2}
                />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="17"
                  fontWeight="800"
                  fill={on ? "#2f9e54" : "#1f3a5f"}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {p.ch}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* answer strip */}
      <div style={S.answer}>
        {answerText ? <span>{answerText}</span> : <span style={{ color: "#c3bca6" }}>…</span>}
        {!solved && <span style={S.caret}>▮</span>}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? (
          <div style={S.okBox}>
            <div style={S.okPhrase}>🎉 {phrase || answerText}</div>
            {meaning && <div style={S.meaning}>{t.meaning}: {pickL(meaning, lang)}</div>}
          </div>
        ) : shake != null ? (
          <span style={S.retry}>{t.retry}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes lsShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}.lsShake{animation:lsShake .4s}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 6px", fontSize: 14.5, fontWeight: 800, color: "#7a3e12" },
  stage: { background: "linear-gradient(#fffdf6,#fbf4e4)", border: "2px solid #ecdcb8", borderRadius: 16, padding: "8px 6px", boxShadow: "0 10px 24px -18px rgba(90,60,20,.5)" },
  answer: { minHeight: 40, marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 22, fontWeight: 900, letterSpacing: ".02em", color: "#1f3a5f" },
  caret: { color: "#2f6fed", animation: "none", fontWeight: 400 },
  status: { minHeight: 30, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8, textAlign: "center" },
  okBox: { display: "flex", flexDirection: "column", gap: 3, alignItems: "center" },
  okPhrase: { fontSize: 19, fontWeight: 900, color: "#46c06a" },
  meaning: { fontSize: 14, fontWeight: 700, color: "#7a6f57" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
