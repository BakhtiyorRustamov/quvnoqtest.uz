"use client";
import React, { useState } from "react";

/**
 * SyllableClap — count the syllables (boʻgʻinlar) in a word by clapping. The
 * child taps the big word card once per syllable ("Ol-ma" → two claps), watches a
 * 👏 appear for each tap, then presses Check. This is the Alifbe "soʻzni
 * boʻgʻinlarga boʻlish" task made physical: kids clap the beats of a word the way
 * teachers do at the board, so counting syllables becomes a rhythm, not a rule.
 *
 * Props: { word, emoji?, syllables, lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - syllables: the correct number of syllables (also the number of claps).
 *   - onAttempt(ok) fires on Check; onCorrect() when the clap count matches.
 */
const STR = {
  uz: { instr: "Soʻzni bosib, boʻgʻinlab qarsak chal!", claps: "qarsak", check: "Tekshirish", reset: "Qaytadan", done: "Barakalla! Toʻgʻri boʻgʻin!", retry: "Yana bir bor sanab qarsak chal", next: "Yana" },
  ru: { instr: "Нажимай на слово и хлопай по слогам!", claps: "хлопки", check: "Проверить", reset: "Заново", done: "Молодец! Верные слоги!", retry: "Посчитай и хлопни ещё раз", next: "Ещё" },
  en: { instr: "Tap the word and clap each syllable!", claps: "claps", check: "Check", reset: "Restart", done: "Great! Right syllables!", retry: "Count and clap once more", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function SyllableClap({
  word,
  emoji,
  syllables = 1,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STR[lang] || STR.uz;
  const [claps, setClaps] = useState(0);
  const [bump, setBump] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | wrong | correct
  const solved = status === "correct";

  function clap() {
    if (solved) return;
    setStatus("idle");
    setClaps((c) => Math.min(c + 1, 8));
    setBump(true);
    setTimeout(() => setBump(false), 160);
  }
  function reset() {
    if (solved) return;
    setClaps(0);
    setStatus("idle");
  }
  function check() {
    if (solved || claps === 0) return;
    const ok = claps === syllables;
    if (typeof onAttempt === "function") onAttempt(ok, { claps, syllables });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setStatus("wrong");
      setTimeout(() => { setStatus("idle"); setClaps(0); }, 1000);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      <button
        onClick={clap}
        disabled={solved}
        className={bump ? "scBump" : ""}
        style={{ ...S.wordCard, cursor: solved ? "default" : "pointer" }}
      >
        {emoji && <span style={S.emoji} aria-hidden>{emoji}</span>}
        <span style={S.word}>{L(word, lang)}</span>
      </button>

      <div style={S.clapsRow} aria-hidden>
        {Array.from({ length: claps }, (_, i) => (
          <span key={i} style={S.clapEmoji}>👏</span>
        ))}
        {claps === 0 && <span style={S.clapGhost}>👏</span>}
      </div>
      <div style={S.count} aria-live="polite">
        {claps} {t.claps}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : status === "wrong" ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>

      {!solved && (
        <div style={S.btnRow}>
          <button onClick={reset} disabled={claps === 0} style={{ ...S.reset, ...(claps === 0 ? S.off : {}) }}>{t.reset}</button>
          <button onClick={check} disabled={claps === 0} style={{ ...S.check, ...(claps === 0 ? S.off : {}) }}>{t.check}</button>
        </div>
      )}
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes scBump{0%,100%{transform:scale(1)}45%{transform:scale(1.05)}}.scBump{animation:scBump .16s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  wordCard: { display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 30px", borderRadius: 22, border: "3px solid #f2c6b6", background: "#fff", fontFamily: "inherit", boxShadow: "0 6px 0 rgba(180,90,60,.16)" },
  emoji: { fontSize: 46, lineHeight: 1 },
  word: { fontSize: 34, fontWeight: 900, color: "#33302b", letterSpacing: 1 },
  clapsRow: { minHeight: 44, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 16 },
  clapEmoji: { fontSize: 32, lineHeight: 1 },
  clapGhost: { fontSize: 32, lineHeight: 1, opacity: 0.25 },
  count: { marginTop: 4, fontSize: 15, fontWeight: 800, color: "#f4693b" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  btnRow: { display: "flex", gap: 10, justifyContent: "center", marginTop: 6 },
  reset: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#8a5a3a", background: "#f7e7de", padding: "10px 20px", borderRadius: 999, boxShadow: "0 4px 0 #e2c6b6" },
  check: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#f4693b", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #c94f2a" },
  off: { opacity: 0.5, cursor: "not-allowed", boxShadow: "0 4px 0 rgba(0,0,0,.12)" },
  next: { display: "block", margin: "10px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
