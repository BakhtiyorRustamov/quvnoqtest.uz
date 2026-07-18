"use client";
import React, { useState } from "react";

/**
 * SoundPosition — a word shown as a row of sound-boxes (kataklar); the child taps
 * the box where the TARGET sound sits (beginning / middle / end). This is the
 * Alifbe "tovush qaysi katakda?" task: colour the box that holds the [o] sound in
 * "olma", the [i] sound in "kit", and so on. First-graders learn that a word is a
 * chain of sounds and that a letter marks a sound's place in that chain.
 *
 * Props: { word?, emoji?, sound, cells?, count?, answer, lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - sound: the target sound as a short string (shown in a chip), e.g. "o".
 *   - cells: OPTIONAL array of the word's sounds/letters, one per box (e.g.
 *            ["o","l","m","a"]). If omitted, `count` blank boxes are drawn.
 *   - answer: 0-based index of the box that holds the target sound.
 *   - onAttempt(ok) fires per tap; onCorrect() when the right box is tapped.
 */
const STR = {
  uz: { instr: "tovushi qaysi katakchada?", done: "Barakalla! Toʻgʻri katak!", retry: "Bu emas — yana qara", next: "Yana" },
  ru: { instr: "звук — в какой клетке?", done: "Молодец! Верная клетка!", retry: "Не эта — посмотри ещё", next: "Ещё" },
  en: { instr: "which box has the sound?", done: "Great! Right box!", retry: "Not this one — look again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function SoundPosition({
  word,
  emoji,
  sound = "",
  cells,
  count,
  answer = 0,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STR[lang] || STR.uz;
  const n = Array.isArray(cells) && cells.length ? cells.length : Math.max(1, count || 3);
  const boxes = Array.from({ length: n }, (_, i) => (Array.isArray(cells) ? cells[i] : ""));
  const [solved, setSolved] = useState(false);
  const [shakeI, setShakeI] = useState(null);

  function tap(i) {
    if (solved) return;
    const ok = i === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { box: i });
    if (ok) {
      setSolved(true);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShakeI(i);
      setTimeout(() => setShakeI(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.head}>
        <span style={S.chip} aria-hidden>{sound}</span>
        <span style={S.instr}>{t.instr}</span>
      </div>

      <div style={S.wordRow}>
        {emoji && <span style={S.emoji} aria-hidden>{emoji}</span>}
        {word && <span style={S.word}>{L(word, lang)}</span>}
      </div>

      <div style={S.boxes}>
        {boxes.map((c, i) => {
          const on = solved && i === answer;
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={solved}
              aria-label={`${i + 1}`}
              className={shakeI === i ? "spShake" : ""}
              style={{ ...S.box, ...(on ? S.boxOn : {}), cursor: solved ? "default" : "pointer" }}
            >
              <span style={{ ...S.boxLetter, ...(on ? { color: "#fff" } : {}) }}>{c || ""}</span>
              {on && <span style={S.tick} aria-hidden>●</span>}
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shakeI != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes spShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.spShake{animation:spShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  head: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 },
  chip: { display: "inline-grid", placeItems: "center", minWidth: 34, height: 34, padding: "0 10px", borderRadius: 999, background: "#f4693b", color: "#fff", fontSize: 18, fontWeight: 900, boxShadow: "0 3px 0 #c94f2a" },
  instr: { fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  wordRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 },
  emoji: { fontSize: 46, lineHeight: 1 },
  word: { fontSize: 26, fontWeight: 900, color: "#33302b", letterSpacing: 0.5 },
  boxes: { display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" },
  box: { position: "relative", width: 58, height: 58, borderRadius: 14, border: "3px solid #f2c6b6", background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 4px 0 rgba(180,90,60,.14)", transition: "transform .12s, border-color .15s, background .15s" },
  boxOn: { border: "3px solid #f4693b", background: "#f4693b", boxShadow: "0 4px 0 #c94f2a", transform: "translateY(-2px)" },
  boxLetter: { fontSize: 24, fontWeight: 900, color: "#6b7280" },
  tick: { position: "absolute", top: 4, right: 6, fontSize: 12, color: "#fff" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 16 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#f4693b", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #c94f2a" },
};
