"use client";
import React, { useState, useEffect } from "react";

/**
 * PlaceValueBlocks — build a target number from tens-rods and ones-cubes (grades 1–3).
 * Props: { target, lang='uz', embedded=false, onAttempt, onCorrect, onNext }  (target optional → generated)
 * embedded: hides the grade pill and "next" button (the quiz shell provides them).
 */
const STRINGS = {
  uz: {
    grade: "Razryadlar · 1–3-sinf",
    title: (n) => `${n} sonini yasa`,
    instr: "O'nlik va birlik bloklarini qo'sh",
    tens: "O'nliklar",
    ones: "Birliklar",
    addTen: "+10",
    addOne: "+1",
    correct: "Barakalla!",
    tooMany: "Ko'p bo'ldi — birozini olib tashla",
    tooFew: "Yana qo'shish kerak",
    next: "Yangi son",
    now: "Hozir",
  },
  ru: {
    grade: "Разряды · 1–3 класс",
    title: (n) => `Собери число ${n}`,
    instr: "Добавляй десятки и единицы",
    tens: "Десятки",
    ones: "Единицы",
    addTen: "+10",
    addOne: "+1",
    correct: "Молодец!",
    tooMany: "Слишком много — убери немного",
    tooFew: "Нужно ещё добавить",
    next: "Новое число",
    now: "Сейчас",
  },
  en: {
    grade: "Place value · Grades 1–3",
    title: (n) => `Build the number ${n}`,
    instr: "Add tens and ones",
    tens: "Tens",
    ones: "Ones",
    addTen: "+10",
    addOne: "+1",
    correct: "Well done!",
    tooMany: "Too many — remove some",
    tooFew: "Add some more",
    next: "New number",
    now: "Now",
  },
};

function gen() {
  return 11 + Math.floor(Math.random() * 89); // 11..99
}

export default function PlaceValueBlocks({ target: tIn, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [target, setTarget] = useState(() => (typeof tIn === "number" ? tIn : gen()));
  const [tens, setTens] = useState(0);
  const [ones, setOnes] = useState(0);
  const [solved, setSolved] = useState(false);
  const value = tens * 10 + ones;

  useEffect(() => {
    if (value === target && !solved) {
      setSolved(true);
      if (typeof onAttempt === "function") onAttempt(true, { target, value });
      if (typeof onCorrect === "function") onCorrect();
    } else if (value !== target && solved) {
      setSolved(false);
    }
  }, [value, target]); // eslint-disable-line

  function step(setter, max, delta) {
    setter((v) => Math.max(0, Math.min(max, v + delta)));
  }
  function next() {
    setTarget(gen());
    setTens(0);
    setOnes(0);
    setSolved(false);
    if (typeof onNext === "function") onNext();
  }

  const rods = Array.from({ length: tens }, (_, i) => i);
  const cubes = Array.from({ length: ones }, (_, i) => i);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.head}>
        {!embedded ? <span style={S.pill}>{t.grade}</span> : <span />}
        <span style={{ ...S.now, ...(solved ? S.nowOk : {}) }}>{t.now}: {value}</span>
      </div>
      <h2 style={S.title}>{t.title(target)}</h2>
      <p style={S.instr}>{t.instr}</p>

      <div style={S.stage}>
        <div style={S.col}>
          <span style={S.colLabel}>{t.tens}</span>
          <div style={S.rodRow}>
            {rods.map((i) => (
              <svg key={i} width="20" height="74" viewBox="0 0 20 74" className="blk">
                <rect x="1" y="1" width="18" height="72" rx="3" fill="var(--sky)" stroke="#1f6fa0" strokeWidth="1.5" />
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
                  <line key={s} x1="1" y1={1 + s * 7.2} x2="19" y2={1 + s * 7.2} stroke="#1f6fa0" strokeWidth="0.8" opacity="0.6" />
                ))}
              </svg>
            ))}
            {tens === 0 && <span style={S.empty}>—</span>}
          </div>
          <div style={S.btnRow}>
            <button onClick={() => step(setTens, 9, 1)} style={S.add}>{t.addTen}</button>
            <button onClick={() => step(setTens, 9, -1)} style={S.rem}>−</button>
          </div>
        </div>

        <div style={S.col}>
          <span style={S.colLabel}>{t.ones}</span>
          <div style={S.cubeGrid}>
            {cubes.map((i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 18 18" className="blk">
                <rect x="1" y="1" width="16" height="16" rx="3" fill="var(--gold)" stroke="#cfa01f" strokeWidth="1.5" />
              </svg>
            ))}
            {ones === 0 && <span style={S.empty}>—</span>}
          </div>
          <div style={S.btnRow}>
            <button onClick={() => step(setOnes, 9, 1)} style={S.add}>{t.addOne}</button>
            <button onClick={() => step(setOnes, 9, -1)} style={S.rem}>−</button>
          </div>
        </div>
      </div>

      <div style={S.status} aria-live="polite">
        {solved && <span style={S.ok}>🎉 {t.correct}</span>}
        {!solved && value > target && <span style={S.bad}>{t.tooMany}</span>}
        {!solved && value < target && value > 0 && <span style={S.hint}>{t.tooFew}</span>}
      </div>

      {!embedded && <button onClick={next} style={S.next}>{t.next} →</button>}
    </div>
  );
}

const CSS = `
:root{--paper:#fbf6ea;--ink:#33302b;--line:#ece1c8;--primary:#ff7a4d;--primary2:#ef663a;--sky:#2f9fe0;--grass:#46c06a;--gold:#ffce3a;--mist:#9aa0a6;}
.blk{animation:pvPop .22s ease;}
@keyframes pvPop{0%{transform:scale(.4);opacity:0}100%{transform:scale(1);opacity:1}}
button:focus-visible{outline:3px solid var(--sky);outline-offset:2px;}
@media (prefers-reduced-motion: reduce){.blk{animation:none;}*{transition:none!important;}}
`;

const S = {
  wrap: { position: "relative", maxWidth: 560, margin: "0 auto", padding: "20px 20px 24px", borderRadius: 24, border: "2px solid var(--line)", boxShadow: "0 18px 40px -22px rgba(80,60,20,.5)", backgroundColor: "var(--paper)", backgroundImage: "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize: "27px 27px", fontFamily: "inherit", color: "var(--ink)" },
  head: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  pill: { fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--ink)", padding: "5px 12px", borderRadius: 999 },
  now: { fontSize: 16, fontWeight: 700, background: "#fff", border: "2px solid var(--line)", borderRadius: 999, padding: "4px 14px" },
  nowOk: { background: "var(--grass)", borderColor: "var(--grass)", color: "#fff" },
  title: { margin: "12px 0 2px", fontSize: 26, fontWeight: 700 },
  instr: { margin: "0 0 14px", fontSize: 14, color: "var(--mist)", fontWeight: 500 },
  stage: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 8 },
  col: { background: "#fff", borderRadius: 16, border: "2px solid var(--line)", padding: "10px 10px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  colLabel: { fontSize: 13, fontWeight: 600, color: "var(--mist)" },
  rodRow: { display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", alignItems: "flex-end", minHeight: 78, width: "100%" },
  cubeGrid: { display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", alignContent: "flex-start", minHeight: 78, width: "100%" },
  empty: { color: "var(--mist)", fontSize: 22, alignSelf: "center" },
  btnRow: { display: "flex", gap: 6 },
  add: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "8px 14px", borderRadius: 999, boxShadow: "0 4px 0 var(--primary2)" },
  rem: { border: "2px solid var(--line)", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "var(--ink)", background: "#fff", width: 38, borderRadius: 999 },
  status: { minHeight: 32, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" },
  ok: { fontSize: 19, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 15, fontWeight: 600, color: "var(--primary2)" },
  hint: { fontSize: 13, color: "var(--mist)", fontWeight: 500 },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "var(--primary)", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 var(--primary2)" },
};
