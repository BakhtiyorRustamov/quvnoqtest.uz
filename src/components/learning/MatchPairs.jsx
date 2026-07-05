"use client";
import React, { useState, useRef } from "react";

/**
 * MatchPairs — tap-to-connect matching for NUMBERS / expressions (grades 1–4).
 * Tap a card on the left, then its match on the right; correct pairs lock in
 * with a color, wrong taps flash. When every pair is connected the round is won.
 *
 * Props: { pairs: [{left, right}], lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - left/right are short strings (e.g. "5 + 3" ↔ "8").
 *   - onAttempt(correct) fires on each connection try (the shell keeps the first
 *     attempt for scoring); onCorrect() fires when all pairs are matched.
 */
const STRINGS = {
  uz: { instr: "Avval chapdan, keyin mos juftini oʻngdan bos", correct: "Barakalla! Hammasi mos!", retry: "Mos kelmadi — yana urin", next: "Yana" },
  ru: { instr: "Сначала слева, потом пару справа", correct: "Молодец! Все пары верны!", retry: "Не подходит — попробуй ещё", next: "Ещё" },
  en: { instr: "Tap left, then its match on the right", correct: "Great! All matched!", retry: "Not a match — try again", next: "Again" },
};

const PAIR_COLORS = ["#1fa7e0", "#f39a1f", "#46c06a", "#d63384", "#7c5cff", "#e8553e"];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchPairs({ pairs = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const lefts = pairs.map((p, i) => ({ id: i, text: p.left }));
  const [rights] = useState(() => shuffle(pairs.map((p, i) => ({ id: i, text: p.right }))));
  const [sel, setSel] = useState(null); // selected left id
  const [matched, setMatched] = useState({}); // id -> color
  const [badRight, setBadRight] = useState(null);
  const done = Object.keys(matched).length;
  const won = pairs.length > 0 && done === pairs.length;

  function pickLeft(id) {
    if (matched[id] != null || won) return;
    setSel(id);
    setBadRight(null);
  }
  function pickRight(rid) {
    if (won || sel === null || Object.values(matchedRightIds()).includes(rid)) return;
    const ok = rid === sel;
    if (typeof onAttempt === "function") onAttempt(ok, { left: sel, right: rid });
    if (ok) {
      const color = PAIR_COLORS[done % PAIR_COLORS.length];
      const nm = { ...matched, [sel]: color };
      setMatched(nm);
      setSel(null);
      if (Object.keys(nm).length === pairs.length && typeof onCorrect === "function") onCorrect();
    } else {
      setBadRight(rid);
      setSel(null);
      setTimeout(() => setBadRight(null), 480);
    }
  }
  // which right ids are already locked (right id === its matched left id)
  function matchedRightIds() {
    return matched; // keys are left ids; right id equals left id when matched
  }
  const rightLocked = (rid) => matched[rid] != null;

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        <div style={S.col}>
          {lefts.map((l) => {
            const c = matched[l.id];
            const isSel = sel === l.id;
            return (
              <button
                key={l.id}
                onClick={() => pickLeft(l.id)}
                disabled={c != null}
                style={{ ...S.card, ...(c != null ? { ...S.locked, borderColor: c, color: c } : {}), ...(isSel ? S.sel : {}) }}
              >
                {l.text}
                {c != null && <span style={{ ...S.dot, background: c }} />}
              </button>
            );
          })}
        </div>
        <div style={S.col}>
          {rights.map((r) => {
            const c = matched[r.id];
            const isBad = badRight === r.id;
            return (
              <button
                key={r.id}
                onClick={() => pickRight(r.id)}
                disabled={c != null}
                style={{ ...S.card, ...(c != null ? { ...S.locked, borderColor: c, color: c } : {}), ...(isBad ? S.bad : {}) }}
              >
                {c != null && <span style={{ ...S.dot, background: c }} />}
                {r.text}
              </button>
            );
          })}
        </div>
      </div>
      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.correct}</span> : badRight != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.nextBtn}>{t.next} →</button>
      )}
      {/* extra graph-paper row at the bottom, half-covered with a gradient fade */}
      <div aria-hidden style={S.fadeRow} />
    </div>
  );
}

const CSS = `
@keyframes mpShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px;}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important;}}
`;
const S = {
  wrap: { position: "relative", maxWidth: 520, margin: "0 auto", padding: "16px 14px 52px", borderRadius: 24, border: "2px solid #ece1c8", boxShadow: "0 18px 40px -22px rgba(80,60,20,.5)", backgroundColor: "#fbf6ea", backgroundImage: "linear-gradient(#ece1c8 1px,transparent 1px),linear-gradient(90deg,#ece1c8 1px,transparent 1px)", backgroundSize: "27px 27px", fontFamily: "inherit", color: "#33302b" },
  fadeRow: { position: "absolute", left: 2, right: 2, bottom: 2, height: 40, borderRadius: "0 0 22px 22px", background: "linear-gradient(to bottom, rgba(251,246,234,0) 0%, #fbf6ea 75%)", pointerEvents: "none" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  col: { display: "grid", gap: 10 },
  card: { position: "relative", border: "2px solid #ece1c8", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 20, fontWeight: 800, color: "#33302b", padding: "14px 10px", borderRadius: 16, minHeight: 54, boxShadow: "0 4px 0 rgba(0,0,0,.06)", transition: "transform .12s, border-color .15s" },
  sel: { borderColor: "#2f9fe0", boxShadow: "0 0 0 3px rgba(47,159,224,.25), 0 4px 0 rgba(0,0,0,.06)", transform: "translateY(-2px)" },
  locked: { background: "#fff", cursor: "default", boxShadow: "none" },
  bad: { animation: "mpShake .4s", borderColor: "#e8553e", background: "#fdeceb", color: "#e8553e" },
  dot: { position: "absolute", top: 8, right: 8, width: 12, height: 12, borderRadius: 999 },
  status: { minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 18, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  nextBtn: { display: "block", margin: "10px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "10px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
