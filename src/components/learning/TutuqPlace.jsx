"use client";
import React, { useState } from "react";

/**
 * TutuqPlace — the child taps the exact spot inside a word where the tutuq
 * belgisi (ʼ) belongs (san·at → san'at). The primer's headline task for the ʼ
 * sign: it carries no sound of its own, so the only way to master it is to know
 * WHERE it sits between two letters. Tap the right junction and the ʼ drops in.
 *
 * Props: { emoji?, label?, letters, gap, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - letters: the word WITHOUT the sign, as an array e.g. ["s","a","n","a","t"].
 *   - gap: how many letters come before the ʼ (san|'|at → gap = 3; a|'|lo → 1).
 *   - onAttempt(ok) per tap; onCorrect() when the sign lands in the right spot.
 */
const STR = {
  uz: { instr: "Tutuq belgisi (ʼ) qayerga qoʻyiladi? Toʻgʻri joyni bos!", done: "Barakalla! Tutuq belgisi oʻz joyida!", retry: "Bu yer emas — yana oʻyla", next: "Yana" },
  ru: { instr: "Куда ставится знак ʼ? Нажми верное место!", done: "Молодец! Знак ʼ на своём месте!", retry: "Не сюда — подумай ещё", next: "Ещё" },
  en: { instr: "Where does the ʼ sign go? Tap the right spot!", done: "Great! The ʼ sign is in place!", retry: "Not here — think again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function TutuqPlace({ emoji, label, letters = [], gap = 1, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [solved, setSolved] = useState(false);
  const [shake, setShake] = useState(null);

  function tap(slot) {
    if (solved) return;
    const ok = slot === gap;
    if (typeof onAttempt === "function") onAttempt(ok, { slot });
    if (ok) { setSolved(true); if (typeof onCorrect === "function") onCorrect(); }
    else { setShake(slot); setTimeout(() => setShake(null), 460); }
  }

  // build interleaved letters + junction slots (slots at 1..len-1)
  const nodes = [];
  letters.forEach((ch, i) => {
    if (i > 0) {
      const slot = i;
      const isHit = solved && slot === gap;
      nodes.push(
        isHit
          ? <span key={"m" + i} style={S.mark}>ʼ</span>
          : (!solved && (
            <button key={"s" + i} onClick={() => tap(slot)}
              className={shake === slot ? "tpShake" : ""}
              style={{ ...S.slot, ...(shake === slot ? S.slotBad : {}) }} aria-label="joy">
              <span style={S.caret}>ʼ</span>
            </button>
          ))
      );
    }
    nodes.push(<span key={"l" + i} style={S.letter}>{ch}</span>);
  });

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      {emoji && <div style={S.emoji} aria-hidden>{emoji}</div>}
      {label && <div style={S.label}>{L(label, lang)}</div>}
      <div style={S.word}>{nodes}</div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes tpShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.tpShake{animation:tpShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 460, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  emoji: { fontSize: 54, lineHeight: 1, marginBottom: 4 },
  label: { fontSize: 14, fontWeight: 800, color: "#6b7280", marginBottom: 8 },
  word: { display: "flex", justifyContent: "center", alignItems: "center", gap: 2, marginBottom: 18, flexWrap: "wrap" },
  letter: { minWidth: 40, height: 58, borderRadius: 12, border: "3px solid #eadfd0", background: "#fff", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 900, color: "#33302b", padding: "0 4px" },
  slot: { width: 26, height: 58, margin: "0 1px", borderRadius: 9, border: "3px dashed #f4693b", background: "#fff8f4", display: "grid", placeItems: "center", cursor: "pointer", padding: 0 },
  slotBad: { borderColor: "#e8553e", background: "#fdeceb" },
  caret: { fontSize: 20, fontWeight: 900, color: "#f0b9a6" },
  mark: { width: 26, height: 58, display: "grid", placeItems: "center", fontSize: 30, fontWeight: 900, color: "#46c06a" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
