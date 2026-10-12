"use client";
import React, { useMemo, useState } from "react";

/**
 * SpotDifference — two emoji scenes shown side by side; they are identical
 * except at a few cells. The child taps every changed cell in the RIGHT scene.
 * This is the Informatika "rasmlar orasidagi farqlarni toping" task and, in
 * computing terms, it trains careful comparison / spotting a diff — the same
 * attention a programmer uses to find what changed between two versions.
 *
 * Props: { rows?, cols?, left, right, leftLabel?, rightLabel?, lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - left, right: equal-length arrays of emoji (row-major); a cell differs
 *     when left[i] !== right[i].
 *   - onAttempt(ok) fires on the first tap (scores it); onCorrect() when every
 *     difference in the right scene has been found.
 */
const STR = {
  uz: { instr: "Ikki rasmni solishtir — oʻng rasmdagi farqlarni bosib top!", left: "Chap rasm", right: "Oʻng rasm", done: "Barakalla! Barcha farq topildi!", same: "Bu katak bir xil — yana qara", left1: "farq", found: "topildi", next: "Yana" },
  ru: { instr: "Сравни две картинки — нажми различия на правой!", left: "Слева", right: "Справа", done: "Молодец! Все различия найдены!", same: "Эта клетка одинаковая — смотри ещё", left1: "различий", found: "найдено", next: "Ещё" },
  en: { instr: "Compare the two scenes — tap the differences on the right!", left: "Left", right: "Right", done: "Great! You found every difference!", same: "This cell is the same — look again", left1: "differences", found: "found", next: "Again" },
};

export default function SpotDifference({ rows = 3, cols = 3, left = [], right = [], leftLabel, rightLabel, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const diffs = useMemo(() => {
    const s = new Set();
    for (let i = 0; i < right.length; i++) if (left[i] !== right[i]) s.add(i);
    return s;
  }, [left, right]);
  const total = diffs.size;
  const [found, setFound] = useState(() => new Set());
  const [scored, setScored] = useState(false);
  const [wrong, setWrong] = useState(null);
  const solved = total > 0 && found.size >= total;

  function tap(i) {
    if (solved || found.has(i)) return;
    const ok = diffs.has(i);
    if (!scored) { setScored(true); if (typeof onAttempt === "function") onAttempt(ok, { index: i }); }
    if (ok) {
      setFound((prev) => {
        const next = new Set(prev); next.add(i);
        if (next.size >= total && typeof onCorrect === "function") onCorrect();
        return next;
      });
    } else {
      setWrong(i); setTimeout(() => setWrong(null), 460);
    }
  }

  const grid = { display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 5 };

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.scenes}>
        <div style={S.pane}>
          <div style={S.cap}>{leftLabel ? (leftLabel[lang] ?? leftLabel.uz) : t.left}</div>
          <div style={grid}>
            {left.map((e, i) => (
              <div key={i} style={S.cellStatic} aria-hidden>{e}</div>
            ))}
          </div>
        </div>
        <div style={S.pane}>
          <div style={S.cap}>{rightLabel ? (rightLabel[lang] ?? rightLabel.uz) : t.right}</div>
          <div style={grid}>
            {right.map((e, i) => {
              const isFound = found.has(i);
              return (
                <button key={i} onClick={() => tap(i)} disabled={solved || isFound}
                  className={wrong === i ? "sdShake" : ""}
                  style={{ ...S.cell, ...(isFound ? S.cellFound : {}), cursor: solved || isFound ? "default" : "pointer" }}>
                  {e}
                  {isFound && <span style={S.ring} aria-hidden />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div style={S.count}>{found.size} / {total} {t.found}</div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span>
          : wrong != null ? <span style={S.retry}>{t.same}</span>
          : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes sdShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.sdShake{animation:sdShake .44s}
button:focus-visible{outline:3px solid #12a6a0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#243b3a", textAlign: "center" },
  instr: { margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#7a9a98" },
  scenes: { display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" },
  pane: { background: "#f2fbfa", border: "2.5px solid #d3efec", borderRadius: 14, padding: "8px 8px 10px" },
  cap: { fontSize: 12, fontWeight: 800, color: "#0d8f89", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".04em" },
  cellStatic: { width: 46, height: 46, borderRadius: 10, background: "#fff", border: "2px solid #e4f1ef", display: "grid", placeItems: "center", fontSize: 26 },
  cell: { position: "relative", width: 46, height: 46, borderRadius: 10, background: "#fff", border: "2px solid #cfe7e5", display: "grid", placeItems: "center", fontSize: 26, fontFamily: "inherit", padding: 0 },
  cellFound: { background: "#eafcf1", border: "2.5px solid #46c06a" },
  ring: { position: "absolute", inset: -3, borderRadius: 12, border: "3px solid #46c06a", pointerEvents: "none" },
  count: { marginTop: 12, fontSize: 14, fontWeight: 800, color: "#0d8f89" },
  status: { minHeight: 24, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#12a6a0", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #0d8f89" },
};
