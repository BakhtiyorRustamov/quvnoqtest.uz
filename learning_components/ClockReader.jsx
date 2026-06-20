"use client";
import React, { useState } from "react";

/**
 * ClockReader — read an analog clock face and choose the time (grades 2–4).
 * Props: { h, m, lang='uz', onAttempt, onCorrect, onNext }  (h,m optional → generated; m ∈ {0,30})
 */
const STRINGS = {
  uz: {
    grade: "Soat · 2–4-sinf",
    title: "Soat nechi?",
    choose: "To'g'ri vaqtni tanla",
    correct: "Barakalla!",
    tryAgain: "Yana urinib ko'r",
    next: "Yangi soat",
  },
};

function fmt(h, m) {
  return `${h}:${m === 0 ? "00" : "30"}`;
}
function gen() {
  const h = 1 + Math.floor(Math.random() * 12);
  const m = Math.random() < 0.5 ? 0 : 30;
  return { h, m };
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function choicesFor(h, m) {
  const correct = fmt(h, m);
  const set = new Set([correct]);
  let guard = 0;
  while (set.size < 4 && guard < 50) {
    const g = gen();
    set.add(fmt(g.h, g.m));
    guard++;
  }
  return shuffle([...set]);
}

export default function ClockReader({ h: hIn, m: mIn, lang = "uz", onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [{ h, m }, setHM] = useState(() =>
    typeof hIn === "number" && typeof mIn === "number" ? { h: hIn, m: mIn } : gen()
  );
  const [choices, setChoices] = useState(() => choicesFor(h, m));
  const [status, setStatus] = useState("idle");
  const [selected, setSelected] = useState(null);
  const answer = fmt(h, m);

  function choose(v) {
    if (status === "correct") return;
    setSelected(v);
    const ok = v === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { h, m, chosen: v, answer });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else setStatus("wrong");
  }
  function next() {
    const g = gen();
    setHM(g);
    setChoices(choicesFor(g.h, g.m));
    setStatus("idle");
    setSelected(null);
    if (typeof onNext === "function") onNext();
  }

  const cx = 90, cy = 90, R = 78;
  const hourAngle = ((h % 12) + m / 60) * 30 - 90;
  const minAngle = m * 6 - 90;
  const hx = cx + 42 * Math.cos((hourAngle * Math.PI) / 180);
  const hy = cy + 42 * Math.sin((hourAngle * Math.PI) / 180);
  const mx = cx + 64 * Math.cos((minAngle * Math.PI) / 180);
  const my = cy + 64 * Math.sin((minAngle * Math.PI) / 180);
  const nums = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.head}>
        <span style={S.pill}>{t.grade}</span>
      </div>
      <h2 style={S.title}>{t.title}</h2>

      <div style={S.clockCard}>
        <svg viewBox="0 0 180 180" width="190" height="190" role="img" aria-label={t.title}>
          <circle cx={cx} cy={cy} r={R} fill="#fff" stroke="var(--ink)" strokeWidth="4" />
          {nums.map((n) => {
            const ang = (n * 30 - 90) * (Math.PI / 180);
            return (
              <text key={n} x={cx + (R - 16) * Math.cos(ang)} y={cy + (R - 16) * Math.sin(ang) + 5} textAnchor="middle" style={S.num}>
                {n}
              </text>
            );
          })}
          {nums.map((n) => {
            const ang = (n * 30 - 90) * (Math.PI / 180);
            return <circle key={"t" + n} cx={cx + (R - 4) * Math.cos(ang)} cy={cy + (R - 4) * Math.sin(ang)} r="1.6" fill="var(--mist)" />;
          })}
          <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={mx} y2={my} stroke="var(--sky)" strokeWidth="4" strokeLinecap="round" />
          <circle cx={cx} cy={cy} r="5" fill="var(--primary)" />
        </svg>
      </div>

      <p style={S.choose}>{t.choose}</p>
      <div style={S.choices}>
        {choices.map((c) => {
          const isSel = selected === c;
          const correctBtn = status !== "idle" && c === answer;
          const wrongBtn = isSel && status === "wrong";
          return (
            <button key={c} onClick={() => choose(c)} disabled={status === "correct"} style={{ ...S.choice, ...(correctBtn ? S.choiceOk : {}), ...(wrongBtn ? S.choiceBad : {}) }}>
              {c}
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
  title: { margin: "12px 0 12px", fontSize: 28, fontWeight: 700, textAlign: "center" },
  clockCard: { display: "flex", justifyContent: "center", marginBottom: 14 },
  num: { fontSize: 15, fontWeight: 700, fontFamily: "'Fredoka', system-ui, sans-serif", fill: "var(--ink)" },
  choose: { textAlign: "center", margin: "0 0 10px", fontSize: 16, fontWeight: 600 },
  choices: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 6 },
  choice: { border: "2px solid var(--line)", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 20, fontWeight: 700, color: "var(--ink)", padding: "14px 0", borderRadius: 16, minHeight: 56, boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  choiceOk: { background: "var(--grass)", borderColor: "var(--grass)", color: "#fff", boxShadow: "0 4px 0 #2f9b50" },
  choiceBad: { background: "#fdeceb", borderColor: "var(--primary2)", color: "var(--primary2)" },
  status: { minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" },
  ok: { fontSize: 19, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 15, fontWeight: 600, color: "var(--primary2)" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 var(--primary2)" },
};
