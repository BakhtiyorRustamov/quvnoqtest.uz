"use client";
import React, { useState } from "react";

/**
 * RaceToAnswer — a gamified addition drill: each correct answer moves your racer
 * one step toward the finish line (grades 1–3).
 * Props: { steps=6, maxSum=10, lang='uz', onAttempt, onCorrect, onNext }
 *   onCorrect() fires when the race is WON.
 */
const STRINGS = {
  uz: {
    grade: "Poyga · 1–3-sinf",
    title: "Marraga yet!",
    instr: "To'g'ri javob — bir qadam oldinga",
    win: "Marra! 🏁 Sen yutding!",
    wrong: "Yana urinib ko'r",
    restart: "Qaytadan poyga",
    step: "Qadam",
  },
};

function newQ(maxSum) {
  const a = 1 + Math.floor(Math.random() * Math.min(9, maxSum - 1));
  const b = 1 + Math.floor(Math.random() * Math.max(1, Math.min(9, maxSum - a)));
  return { a, b };
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function choicesFor(ans, maxSum) {
  const pool = new Set([ans]);
  [ans + 1, ans - 1, ans + 2, ans - 2].forEach((c) => {
    if (pool.size < 4 && c >= 0 && c <= maxSum + 2 && c !== ans) pool.add(c);
  });
  let n = ans + 3;
  while (pool.size < 4) {
    if (n >= 0) pool.add(n);
    n++;
  }
  return shuffle([...pool]);
}

export default function RaceToAnswer({ steps = 6, maxSum = 10, lang = "uz", onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [pos, setPos] = useState(0);
  const [q, setQ] = useState(() => newQ(maxSum));
  const [choices, setChoices] = useState(() => choicesFor(q.a + q.b, maxSum));
  const [status, setStatus] = useState("idle");
  const [selected, setSelected] = useState(null);
  const won = pos >= steps;
  const ans = q.a + q.b;

  function choose(v) {
    if (won) return;
    setSelected(v);
    const ok = v === ans;
    if (typeof onAttempt === "function") onAttempt(ok, { a: q.a, b: q.b, chosen: v, answer: ans, pos });
    if (ok) {
      const np = pos + 1;
      setPos(np);
      if (np >= steps) {
        setStatus("won");
        if (typeof onCorrect === "function") onCorrect();
      } else {
        const nq = newQ(maxSum);
        setQ(nq);
        setChoices(choicesFor(nq.a + nq.b, maxSum));
        setStatus("idle");
        setSelected(null);
      }
    } else {
      setStatus("wrong");
    }
  }
  function restart() {
    setPos(0);
    const nq = newQ(maxSum);
    setQ(nq);
    setChoices(choicesFor(nq.a + nq.b, maxSum));
    setStatus("idle");
    setSelected(null);
    if (typeof onNext === "function") onNext();
  }

  const pct = (pos / steps) * 100;

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.head}>
        <span style={S.pill}>{t.grade}</span>
        <span style={S.stepChip}>{t.step}: {Math.min(pos, steps)}/{steps}</span>
      </div>
      <h2 style={S.title}>{t.title}</h2>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.track}>
        <div style={S.lane}>
          <span style={{ ...S.racer, left: `calc(${pct}% - 16px)` }}>
            <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden="true">
              <rect x="2" y="6" width="26" height="8" rx="4" fill="var(--primary)" />
              <path d="M9 6 h10 l3 -4 h-9 z" fill="var(--sky)" />
              <circle cx="9" cy="15" r="3.4" fill="var(--ink)" />
              <circle cx="22" cy="15" r="3.4" fill="var(--ink)" />
            </svg>
          </span>
          <span style={S.flag}>🏁</span>
        </div>
      </div>

      {!won ? (
        <>
          <h3 style={S.q}>{q.a} + {q.b} = ?</h3>
          <div style={S.choices}>
            {choices.map((c) => {
              const isSel = selected === c;
              const wrongBtn = isSel && status === "wrong";
              return (
                <button key={c} onClick={() => choose(c)} aria-label={String(c)} style={{ ...S.choice, ...(wrongBtn ? S.choiceBad : {}) }}>
                  {c}
                </button>
              );
            })}
          </div>
          <div style={S.status} aria-live="polite">
            {status === "wrong" && <span style={S.bad}>{t.wrong}</span>}
          </div>
        </>
      ) : (
        <div style={S.winBox} aria-live="polite">
          <span style={S.ok}>{t.win}</span>
        </div>
      )}

      <button onClick={restart} style={S.next}>{t.restart} ↻</button>
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
  stepChip: { fontSize: 14, fontWeight: 700, background: "#fff", border: "2px solid var(--line)", borderRadius: 999, padding: "4px 12px" },
  title: { margin: "12px 0 2px", fontSize: 26, fontWeight: 700 },
  instr: { margin: "0 0 12px", fontSize: 14, color: "var(--mist)", fontWeight: 500 },
  track: { background: "#fff", border: "2px solid var(--line)", borderRadius: 16, padding: "14px 12px", marginBottom: 14 },
  lane: { position: "relative", height: 36, borderRadius: 10, background: "repeating-linear-gradient(90deg,#eef3f6 0 18px,#e4ebef 18px 36px)", display: "flex", alignItems: "center" },
  racer: { position: "absolute", transition: "left .5s cubic-bezier(.34,1.4,.6,1)", display: "flex", alignItems: "center" },
  flag: { position: "absolute", right: 2, fontSize: 22 },
  q: { textAlign: "center", margin: "0 0 12px", fontSize: 30, fontWeight: 700 },
  choices: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 4 },
  choice: { border: "2px solid var(--line)", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 24, fontWeight: 700, color: "var(--ink)", padding: "14px 0", borderRadius: 16, minHeight: 56, boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  choiceBad: { background: "#fdeceb", borderColor: "var(--primary2)", color: "var(--primary2)" },
  status: { minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" },
  winBox: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: 60, margin: "4px 0 8px" },
  ok: { fontSize: 22, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 15, fontWeight: 600, color: "var(--primary2)" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 var(--primary2)" },
};
