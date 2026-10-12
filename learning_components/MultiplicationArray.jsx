"use client";
import React, { useState, useRef, useEffect } from "react";

/**
 * MultiplicationArray — a×b shown as a dot array with a skip-count reveal (grades 2–4).
 * Props: { a, b, lang='uz', onAttempt, onCorrect, onNext }  (a,b optional → generated)
 */
const STRINGS = {
  uz: {
    grade: "Ko'paytirish · 2–4-sinf",
    q: (a, b) => `${a} × ${b} = ?`,
    choose: "Javobni tanla",
    show: "Qatorlab sana",
    correct: "Barakalla!",
    tryAgain: "Yana urinib ko'r",
    next: "Yangi misol",
  },
};

function gen() {
  const a = 2 + Math.floor(Math.random() * 5); // 2..6 rows
  const b = 2 + Math.floor(Math.random() * 8); // 2..9 cols
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
function choicesFor(ans, a, b) {
  const pool = new Set([ans]);
  [ans + 1, ans - 1, ans + b, ans - b, ans + a, a * (b + 1)].forEach((c) => {
    if (pool.size < 4 && c > 0 && c !== ans) pool.add(c);
  });
  let n = ans + 2;
  while (pool.size < 4) {
    if (n > 0) pool.add(n);
    n++;
  }
  return shuffle([...pool]);
}

export default function MultiplicationArray({ a: aIn, b: bIn, lang = "uz", onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [{ a, b }, setAB] = useState(() =>
    typeof aIn === "number" && typeof bIn === "number" ? { a: aIn, b: bIn } : gen()
  );
  const ans = a * b;
  const [choices, setChoices] = useState(() => choicesFor(a * b, a, b));
  const [status, setStatus] = useState("idle");
  const [selected, setSelected] = useState(null);
  const [lit, setLit] = useState(0); // rows lit during reveal
  const iv = useRef(null);
  useEffect(() => () => clearInterval(iv.current), []);

  function show() {
    clearInterval(iv.current);
    setLit(0);
    let r = 0;
    iv.current = setInterval(() => {
      r += 1;
      setLit(r);
      if (r >= a) clearInterval(iv.current);
    }, 450);
  }
  function choose(v) {
    if (status === "correct") return;
    setSelected(v);
    const ok = v === ans;
    if (typeof onAttempt === "function") onAttempt(ok, { a, b, chosen: v, answer: ans });
    if (ok) {
      setStatus("correct");
      setLit(a);
      if (typeof onCorrect === "function") onCorrect();
    } else setStatus("wrong");
  }
  function next() {
    clearInterval(iv.current);
    const np = gen();
    setAB(np);
    setChoices(choicesFor(np.a * np.b, np.a, np.b));
    setStatus("idle");
    setSelected(null);
    setLit(0);
    if (typeof onNext === "function") onNext();
  }

  const rows = Array.from({ length: a }, (_, i) => i);
  const cols = Array.from({ length: b }, (_, i) => i);
  const running = lit > 0 ? lit * b : null;

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.head}>
        <span style={S.pill}>{t.grade}</span>
      </div>
      <h2 style={S.title}>{t.q(a, b)}</h2>

      <div style={S.arrayCard}>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${b}, 22px)`, gap: 6, justifyContent: "center" }}>
          {rows.map((r) =>
            cols.map((c) => (
              <span
                key={`${r}-${c}`}
                style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: r < lit ? "var(--mult)" : "#e9e2d2",
                  transition: "background .2s ease",
                }}
              />
            ))
          )}
        </div>
        {running !== null && <div style={S.running}>{running}</div>}
      </div>

      <button onClick={show} style={S.show}>{t.show}</button>

      <p style={S.choose}>{t.choose}</p>
      <div style={S.choices}>
        {choices.map((c) => {
          const isSel = selected === c;
          const correctBtn = status !== "idle" && c === ans;
          const wrongBtn = isSel && status === "wrong";
          return (
            <button
              key={c}
              onClick={() => choose(c)}
              disabled={status === "correct"}
              aria-label={String(c)}
              style={{ ...S.choice, ...(correctBtn ? S.choiceOk : {}), ...(wrongBtn ? S.choiceBad : {}) }}
            >
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
:root{--paper:#fbf6ea;--ink:#33302b;--line:#ece1c8;--primary:#ff7a4d;--primary2:#ef663a;--sky:#2f9fe0;--grass:#46c06a;--gold:#ffce3a;--mist:#9aa0a6;--mult:#ff7a4d;}
button:focus-visible{outline:3px solid var(--sky);outline-offset:2px;}
@media (prefers-reduced-motion: reduce){*{transition:none!important;}}
`;

const S = {
  wrap: { position: "relative", maxWidth: 560, margin: "0 auto", padding: "20px 20px 24px", borderRadius: 24, border: "2px solid var(--line)", boxShadow: "0 18px 40px -22px rgba(80,60,20,.5)", backgroundColor: "var(--paper)", backgroundImage: "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize: "27px 27px", fontFamily: "'Fredoka', ui-rounded, 'Segoe UI', system-ui, sans-serif", color: "var(--ink)" },
  head: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  pill: { fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--ink)", padding: "5px 12px", borderRadius: 999 },
  title: { margin: "12px 0 14px", fontSize: 28, fontWeight: 700, textAlign: "center" },
  arrayCard: { background: "#fff", borderRadius: 16, border: "2px solid var(--line)", padding: "16px 12px", position: "relative", marginBottom: 12 },
  running: { position: "absolute", top: 8, right: 12, fontSize: 20, fontWeight: 700, color: "var(--mult)" },
  show: { display: "block", margin: "0 auto 14px", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "var(--ink)", background: "var(--gold)", padding: "9px 18px", borderRadius: 999, boxShadow: "0 4px 0 #e0ae1f" },
  choose: { textAlign: "center", margin: "0 0 10px", fontSize: 16, fontWeight: 600 },
  choices: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 6 },
  choice: { border: "2px solid var(--line)", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 24, fontWeight: 700, color: "var(--ink)", padding: "14px 0", borderRadius: 16, minHeight: 56, boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  choiceOk: { background: "var(--grass)", borderColor: "var(--grass)", color: "#fff", boxShadow: "0 4px 0 #2f9b50" },
  choiceBad: { background: "#fdeceb", borderColor: "var(--primary2)", color: "var(--primary2)" },
  status: { minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" },
  ok: { fontSize: 19, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 15, fontWeight: 600, color: "var(--primary2)" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 var(--primary2)" },
};
