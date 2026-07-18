"use client";
import React, { useState } from "react";

/**
 * TrafficLight — an inline SVG traffic light with one lamp lit; the child decides
 * whether to STOP or GO. Thematic for street-safety lessons: red/yellow → stop,
 * green → go. Data-driven: `lit` sets which lamp glows, `answer` is the correct
 * action.
 *
 * Props: { lit: 'red'|'yellow'|'green', answer: 'stop'|'go', lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 */
const STR = {
  uz: { instr: "Chiroqqa qara — nima qilish kerak?", stop: "Toʻxta", go: "Yur", done: "Barakalla! Toʻgʻri!", retry: "Yana oʻyla", next: "Yana" },
  ru: { instr: "Посмотри на светофор — что делать?", stop: "Стой", go: "Иди", done: "Молодец! Верно!", retry: "Подумай ещё", next: "Ещё" },
  en: { instr: "Look at the light — what should you do?", stop: "Stop", go: "Go", done: "Great! Correct!", retry: "Think again", next: "Again" },
};
const LAMP = { red: "#e14b4b", yellow: "#f2c200", green: "#46c06a" };

export default function TrafficLight({ lit = "red", answer = "stop", lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const [solved, setSolved] = useState(false);
  const [shake, setShake] = useState(null);
  const dim = (c) => (lit === c ? LAMP[c] : "#2c2c2c");
  const glow = (c) => (lit === c ? `drop-shadow(0 0 8px ${LAMP[c]})` : "none");

  function choose(val) {
    if (solved) return;
    const ok = val === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { chosen: val });
    if (ok) {
      setSolved(true);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(val);
      setTimeout(() => setShake(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.stage}>
        <svg viewBox="0 0 80 190" width="86" height="200" aria-hidden>
          <rect x="10" y="4" width="60" height="182" rx="14" fill="#1e2530" />
          <circle cx="40" cy="42" r="20" fill={dim("red")} style={{ filter: glow("red") }} />
          <circle cx="40" cy="95" r="20" fill={dim("yellow")} style={{ filter: glow("yellow") }} />
          <circle cx="40" cy="148" r="20" fill={dim("green")} style={{ filter: glow("green") }} />
        </svg>
      </div>
      <div style={S.row}>
        <button
          onClick={() => choose("stop")}
          disabled={solved}
          className={shake === "stop" ? "tlShake" : ""}
          style={{ ...S.btn, ...S.stopBtn, ...(solved && answer === "stop" ? S.win : {}) }}
        >
          🛑 {t.stop}
        </button>
        <button
          onClick={() => choose("go")}
          disabled={solved}
          className={shake === "go" ? "tlShake" : ""}
          style={{ ...S.btn, ...S.goBtn, ...(solved && answer === "go" ? S.win : {}) }}
        >
          🚶 {t.go}
        </button>
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes tlShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.tlShake{animation:tlShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}`;
const S = {
  wrap: { maxWidth: 440, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { textAlign: "center", margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  stage: { display: "flex", justifyContent: "center", margin: "4px 0 14px" },
  row: { display: "flex", gap: 14, justifyContent: "center" },
  btn: { flex: "1 1 0", maxWidth: 180, minHeight: 64, borderRadius: 18, border: "3px solid", cursor: "pointer", fontFamily: "inherit", fontSize: 19, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 5px 0 rgba(0,0,0,.12)" },
  stopBtn: { background: "#fdeceb", borderColor: "#e14b4b", color: "#c53a3a" },
  goBtn: { background: "#eefcf2", borderColor: "#46c06a", color: "#2f9e54" },
  win: { transform: "translateY(-2px)" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
