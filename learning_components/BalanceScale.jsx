"use client";
import React, { useState } from "react";

/**
 * BalanceScale — compare two numbers by choosing >, <, or =; the scale tilts (grades 1–5).
 * Props: { x, y, lang='uz', onAttempt, onCorrect, onNext }  (x,y optional → generated)
 */
const STRINGS = {
  uz: {
    grade: "Taqqoslash · 1–5-sinf",
    title: "Qaysi belgi to'g'ri?",
    correct: "Barakalla!",
    tryAgain: "Yana urinib ko'r",
    next: "Yangi misol",
  },
};

function gen() {
  const x = 1 + Math.floor(Math.random() * 20);
  let y = 1 + Math.floor(Math.random() * 20);
  if (Math.random() < 0.18) y = x; // sometimes equal
  return { x, y };
}

export default function BalanceScale({ x: xIn, y: yIn, lang = "uz", onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [{ x, y }, setXY] = useState(() =>
    typeof xIn === "number" && typeof yIn === "number" ? { x: xIn, y: yIn } : gen()
  );
  const [status, setStatus] = useState("idle");
  const [picked, setPicked] = useState(null);
  const answer = x > y ? ">" : x < y ? "<" : "=";
  const revealed = status !== "idle"; // tilt only after an answer

  function choose(sign) {
    if (status === "correct") return;
    setPicked(sign);
    const ok = sign === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { x, y, chosen: sign, answer });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else setStatus("wrong");
  }
  function next() {
    setXY(gen());
    setStatus("idle");
    setPicked(null);
    if (typeof onNext === "function") onNext();
  }

  // tilt: heavier side goes down. left heavier → angle negative (right up)
  const angle = !revealed ? 0 : x > y ? -9 : x < y ? 9 : 0;
  const signs = [">", "=", "<"];

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.head}>
        <span style={S.pill}>{t.grade}</span>
      </div>
      <h2 style={S.title}>{t.title}</h2>

      <div style={S.scaleCard}>
        <svg viewBox="0 0 300 160" width="100%" height="160">
          {/* post */}
          <rect x="146" y="40" width="8" height="96" rx="3" fill="var(--ink)" />
          <rect x="120" y="132" width="60" height="10" rx="5" fill="var(--ink)" />
          {/* beam + pans rotate together */}
          <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "150px 44px", transition: "transform .6s cubic-bezier(.34,1.4,.6,1)" }}>
            <rect x="40" y="40" width="220" height="8" rx="4" fill="var(--sky)" />
            <line x1="60" y1="44" x2="60" y2="74" stroke="var(--mist)" strokeWidth="2" />
            <line x1="240" y1="44" x2="240" y2="74" stroke="var(--mist)" strokeWidth="2" />
            {/* left pan */}
            <g>
              <path d="M30 74 h60 l-8 16 h-44 z" fill="#fff" stroke="var(--ink)" strokeWidth="2" />
              <text x="60" y="88" textAnchor="middle" style={S.panNum}>{x}</text>
            </g>
            {/* right pan */}
            <g>
              <path d="M210 74 h60 l-8 16 h-44 z" fill="#fff" stroke="var(--ink)" strokeWidth="2" />
              <text x="240" y="88" textAnchor="middle" style={S.panNum}>{y}</text>
            </g>
          </g>
        </svg>
      </div>

      <div style={S.expr}>
        <span style={S.exprNum}>{x}</span>
        <span style={{ ...S.exprSign, ...(revealed ? S.exprSignShown : {}) }}>{revealed ? answer : "?"}</span>
        <span style={S.exprNum}>{y}</span>
      </div>

      <div style={S.choices}>
        {signs.map((s) => {
          const isPick = picked === s;
          const correctBtn = status !== "idle" && s === answer;
          const wrongBtn = isPick && status === "wrong";
          return (
            <button key={s} onClick={() => choose(s)} disabled={status === "correct"} aria-label={s} style={{ ...S.choice, ...(correctBtn ? S.choiceOk : {}), ...(wrongBtn ? S.choiceBad : {}) }}>
              {s}
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">
        {status === "correct" && <span style={S.ok}>🎉 {t.correct}</span>}
        {status === "wrong" && <span style={S.bad}>{t.tryAgain}</span>}
      </div>

      <button onClick={next} style={S.next}>{t.next} →</button>
    </div>
  );
}

const CSS = `
:root{--paper:#fbf6ea;--ink:#33302b;--line:#ece1c8;--primary:#ff7a4d;--primary2:#ef663a;--sky:#2f9fe0;--grass:#46c06a;--gold:#ffce3a;--mist:#9aa0a6;}
button:focus-visible{outline:3px solid var(--sky);outline-offset:2px;}
@media (prefers-reduced-motion: reduce){*{transition:none!important;}}
`;

const S = {
  wrap: { position: "relative", maxWidth: 560, margin: "0 auto", padding: "20px 20px 24px", borderRadius: 24, border: "2px solid var(--line)", boxShadow: "0 18px 40px -22px rgba(80,60,20,.5)", backgroundColor: "var(--paper)", backgroundImage: "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize: "27px 27px", fontFamily: "'Fredoka', ui-rounded, 'Segoe UI', system-ui, sans-serif", color: "var(--ink)" },
  head: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  pill: { fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--ink)", padding: "5px 12px", borderRadius: 999 },
  title: { margin: "12px 0 8px", fontSize: 26, fontWeight: 700, textAlign: "center" },
  scaleCard: { background: "#fff", borderRadius: 16, border: "2px solid var(--line)", padding: "8px", marginBottom: 12 },
  panNum: { fontSize: 18, fontWeight: 700, fontFamily: "'Fredoka', system-ui, sans-serif", fill: "var(--ink)" },
  expr: { display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginBottom: 14 },
  exprNum: { fontSize: 30, fontWeight: 700 },
  exprSign: { fontSize: 30, fontWeight: 700, width: 44, height: 44, display: "grid", placeItems: "center", borderRadius: 12, border: "2px dashed var(--mist)", color: "var(--mist)" },
  exprSignShown: { borderStyle: "solid", borderColor: "var(--grass)", color: "var(--grass)", background: "#f1faf2" },
  choices: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 6 },
  choice: { border: "2px solid var(--line)", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 28, fontWeight: 700, color: "var(--ink)", padding: "12px 0", borderRadius: 16, minHeight: 56, boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  choiceOk: { background: "var(--grass)", borderColor: "var(--grass)", color: "#fff", boxShadow: "0 4px 0 #2f9b50" },
  choiceBad: { background: "#fdeceb", borderColor: "var(--primary2)", color: "var(--primary2)" },
  status: { minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" },
  ok: { fontSize: 19, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 15, fontWeight: 600, color: "var(--primary2)" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 var(--primary2)" },
};
