"use client";
import React, { useState } from "react";

/**
 * ComparePick — a multi-round "which one?" comparison. Each round shows two big
 * picture cards and a question ("Which is bigger?"); the child taps the correct
 * animal. Built for the Ingliz tili "Animals" grammar strand (adjectives:
 * big/small, tall/short, long/short — "Elephants are big").
 *
 * Props: {
 *   rounds: [ { prompt?: L10n, a: {emoji, label?}, b: {emoji, label?}, answer: 'a'|'b' } ],
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 * onAttempt(ok) fires on the FIRST tap (scores it); onCorrect() after the last
 * round is solved.
 */
const STR = {
  uz: { instr: "Toʻgʻri hayvonni bos!", done: "Barakalla! 🎉", retry: "Yana urinib koʻr", next: "Yana" },
  ru: { instr: "Нажми верное животное!", done: "Молодец! 🎉", retry: "Попробуй ещё раз", next: "Ещё" },
  en: { instr: "Tap the correct one!", done: "Great! 🎉", retry: "Try again", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function ComparePick({ rounds = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [round, setRound] = useState(0);
  const [solvedRound, setSolvedRound] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [shake, setShake] = useState(null);
  const [scored, setScored] = useState(false);
  const cur = rounds[Math.min(round, rounds.length - 1)] || { a: {}, b: {} };

  function tap(side) {
    if (solvedRound || allDone) return;
    const ok = side === cur.answer;
    if (!scored) { setScored(true); if (typeof onAttempt === "function") onAttempt(ok, { round, side }); }
    if (!ok) { setShake(side); setTimeout(() => setShake(null), 460); return; }
    setSolvedRound(true);
    setTimeout(() => {
      if (round + 1 < rounds.length) { setRound(round + 1); setSolvedRound(false); }
      else { setAllDone(true); if (typeof onCorrect === "function") onCorrect(); }
    }, 650);
  }

  function card(side) {
    const data = side === "a" ? cur.a : cur.b;
    const win = solvedRound && side === cur.answer;
    return (
      <button
        type="button"
        onClick={() => tap(side)}
        disabled={allDone || solvedRound}
        className={shake === side ? "cpShake" : ""}
        style={{ ...S.card, ...(win ? S.cardWin : {}), cursor: allDone || solvedRound ? "default" : "pointer" }}
      >
        <span style={S.emoji} aria-hidden>{data.emoji}</span>
        {data.label && <span style={S.label}>{L(data.label, lang)}</span>}
      </button>
    );
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{L(cur.prompt, lang) || t.instr}</p>
      {rounds.length > 1 && (
        <div style={S.dots} aria-hidden>
          {rounds.map((_, i) => (
            <span key={i} style={{ ...S.dot, background: i < round || allDone ? "#46c06a" : i === round ? "#1fa7e0" : "rgba(0,0,0,0.15)" }} />
          ))}
        </div>
      )}
      <div style={S.row} key={round}>
        {card("a")}
        <span style={S.vs} aria-hidden>vs</span>
        {card("b")}
      </div>
      <div style={S.status} aria-live="polite">
        {allDone ? <span style={S.ok}>{t.done}</span> : shake != null ? <span style={S.bad}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && allDone && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes cpShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.cpShake{animation:cpShake .44s}
@keyframes cpPop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}
button:focus-visible{outline:3px solid #1fa7e0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#1c2540", textAlign: "center" },
  instr: { margin: "0 0 10px", fontSize: 16, fontWeight: 800, color: "#1c2540" },
  dots: { display: "flex", justifyContent: "center", gap: 6, marginBottom: 10 },
  dot: { width: 9, height: 9, borderRadius: "50%" },
  row: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, animation: "cpPop .3s ease both" },
  card: { flex: 1, maxWidth: 180, minHeight: 130, borderRadius: 20, border: "3px solid #cfe3f5", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: "12px 8px", boxShadow: "0 6px 0 rgba(31,167,224,.15)", fontFamily: "inherit" },
  cardWin: { border: "3px solid #46c06a", background: "#eefcf2", boxShadow: "0 6px 0 #b8ecc6" },
  emoji: { fontSize: 62, lineHeight: 1 },
  label: { fontSize: 15, fontWeight: 800, color: "#1c2540" },
  vs: { fontSize: 15, fontWeight: 900, color: "#9aa6bf" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 18, fontWeight: 800, color: "#46c06a" },
  bad: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#1fa7e0", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #1685b8" },
};
