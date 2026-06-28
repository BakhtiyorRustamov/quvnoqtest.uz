"use client";
import React, { useState } from "react";

/**
 * FractionBar — shade parts of a bar to match a target fraction (grades 3–6).
 * Props: { p, q, lang='uz', onAttempt, onCorrect, onNext }  (p/q optional → generated)
 */
const STRINGS = {
  uz: {
    grade: "Kasrlar · 3–6-sinf",
    title: "Kasrni belgila",
    instr: (p, q) => `Chiziqning ${p}/${q} qismini bo'ya — bo'lakcha ustiga bos`,
    check: "Tekshir",
    correct: "Barakalla!",
    tryAgain: "Hozircha mos emas — qaytadan sanab ko'r",
    next: "Yangi misol",
    shaded: "bo'yaldi",
  },
};

function gen() {
  const q = 2 + Math.floor(Math.random() * 7); // 2..8
  const p = 1 + Math.floor(Math.random() * (q - 1)); // 1..q-1
  return { p, q };
}

export default function FractionBar({ p: pIn, q: qIn, lang = "uz", onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [{ p, q }, setPQ] = useState(() =>
    typeof pIn === "number" && typeof qIn === "number" ? { p: pIn, q: qIn } : gen()
  );
  const [shaded, setShaded] = useState(() => new Set());
  const [status, setStatus] = useState("idle");
  const count = shaded.size;

  function toggle(i) {
    if (status === "correct") return;
    setStatus("idle");
    setShaded((prev) => {
      const n = new Set(prev);
      n.has(i) ? n.delete(i) : n.add(i);
      return n;
    });
  }
  function check() {
    const ok = count === p;
    if (typeof onAttempt === "function") onAttempt(ok, { p, q, shaded: count });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else setStatus("wrong");
  }
  function next() {
    setPQ(gen());
    setShaded(new Set());
    setStatus("idle");
    if (typeof onNext === "function") onNext();
  }

  const segs = Array.from({ length: q }, (_, i) => i);
  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.head}>
        <span style={S.pill}>{t.grade}</span>
        <span style={S.target}>{p}/{q}</span>
      </div>
      <h2 style={S.title}>{t.title}</h2>
      <p style={S.instr}>{t.instr(p, q)}</p>

      <div style={S.bar}>
        {segs.map((i) => {
          const on = shaded.has(i);
          return (
            <button
              key={i}
              onClick={() => toggle(i)}
              aria-label={`${i + 1}`}
              style={{
                ...S.seg,
                ...(on ? S.segOn : {}),
                borderRight: i === q - 1 ? "none" : "2px solid var(--line)",
              }}
            />
          );
        })}
      </div>

      <div style={S.row}>
        <span style={{ ...S.chip, ...(status === "correct" ? S.chipOk : {}) }}>
          {count}/{q} {t.shaded}
        </span>
        {status !== "correct" && (
          <button onClick={check} style={S.check}>
            {t.check}
          </button>
        )}
      </div>

      <div style={S.status} aria-live="polite">
        {status === "correct" && <span style={S.ok}>🎉 {t.correct}</span>}
        {status === "wrong" && <span style={S.bad}>{t.tryAgain}</span>}
      </div>

      <button onClick={next} style={S.next}>
        {t.next} →
      </button>
    </div>
  );
}

const CSS = `
:root{--paper:#fbf6ea;--ink:#33302b;--line:#ece1c8;--primary:#ff7a4d;--primary2:#ef663a;--sky:#2f9fe0;--grass:#46c06a;--gold:#ffce3a;--mist:#9aa0a6;--frac:#7a5cff;}
button:focus-visible{outline:3px solid var(--sky);outline-offset:2px;}
@media (prefers-reduced-motion: reduce){*{transition:none!important;}}
`;

const S = {
  wrap: {
    position: "relative", maxWidth: 560, margin: "0 auto", padding: "20px 20px 24px",
    borderRadius: 24, border: "2px solid var(--line)", boxShadow: "0 18px 40px -22px rgba(80,60,20,.5)",
    backgroundColor: "var(--paper)",
    backgroundImage: "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)",
    backgroundSize: "27px 27px",
    fontFamily: "'Fredoka', ui-rounded, 'Segoe UI', system-ui, sans-serif", color: "var(--ink)",
  },
  head: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  pill: { fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--ink)", padding: "5px 12px", borderRadius: 999 },
  target: { fontSize: 28, fontWeight: 700, color: "var(--frac)" },
  title: { margin: "12px 0 2px", fontSize: 26, fontWeight: 700 },
  instr: { margin: "0 0 16px", fontSize: 14, color: "var(--mist)", fontWeight: 500 },
  bar: {
    display: "flex", height: 64, borderRadius: 14, overflow: "hidden",
    border: "2px solid var(--ink)", background: "#fff", marginBottom: 16,
  },
  seg: { flex: 1, border: "none", background: "transparent", cursor: "pointer", transition: "background .15s ease", padding: 0 },
  segOn: { background: "var(--frac)" },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 6 },
  chip: { fontSize: 15, fontWeight: 700, background: "#fff", border: "2px solid var(--line)", borderRadius: 999, padding: "5px 14px" },
  chipOk: { background: "var(--grass)", borderColor: "var(--grass)", color: "#fff" },
  check: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 600, color: "var(--ink)", background: "var(--gold)", padding: "9px 20px", borderRadius: 999, boxShadow: "0 4px 0 #e0ae1f" },
  status: { minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" },
  ok: { fontSize: 19, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 15, fontWeight: 600, color: "var(--primary2)" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 var(--primary2)" },
};
