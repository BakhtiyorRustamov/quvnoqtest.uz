"use client";
import React, { useState } from "react";
import ShapeArt from "../lesson/ShapeArt";

/**
 * PositionGrid — spatial-position widget (top / bottom / left / right / corners).
 * Renders shapes on a real 2D grid so the child can answer "tap the one on top",
 * "tap the bottom-right corner", etc. Grading: the tapped cell id is compared to
 * `answer`. Follows the shared widget contract.
 *
 * Props:
 *   cells:   [{ id, kind, color, scale?, r, c }]   r = row (0=top), c = col (0=left)
 *   rows,cols (optional — inferred from cells if omitted)
 *   answer:  id of the correct cell
 *   prompt:  optional fallback prompt (shown only when NOT embedded)
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 */
const STRINGS = {
  uz: { tap: "Soʻralgan shaklni bos", correct: "Barakalla!", tryAgain: "Yana urinib koʻr", next: "Keyingisi" },
  ru: { tap: "Нажми нужную фигуру", correct: "Молодец!", tryAgain: "Попробуй ещё раз", next: "Дальше" },
  en: { tap: "Tap the asked shape", correct: "Well done!", tryAgain: "Try again", next: "Next" },
};

const SAMPLE = {
  prompt: { uz: "Eng tepadagi shaklni bos", ru: "Нажми верхнюю фигуру", en: "Tap the top shape" },
  cells: [
    { id: "top", kind: "star", color: "magenta", r: 0, c: 0 },
    { id: "mid", kind: "circle", color: "blue", r: 1, c: 0 },
    { id: "bot", kind: "square", color: "orange", r: 2, c: 0 },
  ],
  answer: "top",
};

export default function PositionGrid({
  cells = SAMPLE.cells,
  rows,
  cols,
  answer = SAMPLE.answer,
  prompt,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext,
}) {
  const t = STRINGS[lang] || STRINGS.uz;
  const [status, setStatus] = useState("idle");
  const [picked, setPicked] = useState(null);

  const nRows = rows || Math.max(...cells.map((c) => c.r)) + 1;
  const nCols = cols || Math.max(...cells.map((c) => c.c)) + 1;
  const at = (r, c) => cells.find((x) => x.r === r && x.c === c);

  const pr = prompt && typeof prompt === "object" ? prompt[lang] || prompt.uz : prompt;

  function choose(id) {
    if (status === "correct") return;
    setPicked(id);
    const ok = id === answer;
    if (typeof onAttempt === "function") onAttempt(ok, { chosen: id, answer });
    if (ok) {
      setStatus("correct");
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setStatus("wrong");
    }
  }
  function next() {
    setStatus("idle");
    setPicked(null);
    if (typeof onNext === "function") onNext();
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {!embedded && pr && <h2 style={S.title}>{pr}</h2>}
      <p style={S.tap}>{t.tap}</p>
      <div
        style={{
          ...S.grid,
          gridTemplateColumns: `repeat(${nCols}, 1fr)`,
          gridTemplateRows: `repeat(${nRows}, 1fr)`,
        }}
      >
        {Array.from({ length: nRows }).map((_, r) =>
          Array.from({ length: nCols }).map((__, c) => {
            const cell = at(r, c);
            if (!cell) return <span key={`${r}-${c}`} style={S.empty} aria-hidden />;
            const isCorrect = status !== "idle" && cell.id === answer;
            const isWrong = picked === cell.id && status === "wrong";
            return (
              <button
                key={cell.id}
                onClick={() => choose(cell.id)}
                disabled={status === "correct"}
                className={isWrong ? "pg-shake" : ""}
                style={{
                  ...S.cell,
                  ...(isCorrect ? S.cellOk : {}),
                  ...(isWrong ? S.cellBad : {}),
                }}
                aria-label={cell.id}
              >
                <ShapeArt art={{ kind: cell.kind, color: cell.color, scale: cell.scale }} size={64} />
              </button>
            );
          })
        )}
      </div>
      <div style={S.status} aria-live="polite">
        {status === "correct" && <span style={S.ok}>🎉 {t.correct}</span>}
        {status === "wrong" && <span style={S.bad}>{t.tryAgain}</span>}
      </div>
      {!embedded && (
        <button onClick={next} style={S.next}>
          {t.next} →
        </button>
      )}
    </div>
  );
}

const CSS = `
@keyframes pgShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
.pg-shake{animation:pgShake .4s ease}
@media (prefers-reduced-motion: reduce){.pg-shake{animation:none}}
`;

const S = {
  wrap: { position: "relative", maxWidth: 460, margin: "0 auto", padding: "16px", fontFamily: "inherit", color: "#33302b" },
  title: { margin: "2px 0 10px", fontSize: 24, fontWeight: 800, textAlign: "center" },
  tap: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: "#9aa0a6" },
  grid: { display: "grid", gap: 12, justifyItems: "center", alignItems: "center", maxWidth: 320, margin: "0 auto" },
  empty: { width: 64, height: 64, display: "block" },
  cell: { border: "2px solid rgba(0,0,0,0.08)", background: "#fff", cursor: "pointer", padding: 8, borderRadius: 18, minWidth: 80, minHeight: 80, display: "grid", placeItems: "center", boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  cellOk: { borderColor: "#8DC63F", boxShadow: "0 0 0 4px rgba(141,198,63,.35)" },
  cellBad: { borderColor: "#E14B4B", boxShadow: "0 0 0 4px rgba(225,75,75,.25)" },
  status: { minHeight: 30, display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0 2px" },
  ok: { fontSize: 18, fontWeight: 800, color: "#6EA02C" },
  bad: { fontSize: 14, fontWeight: 700, color: "#E14B4B" },
  next: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 700, color: "#fff", background: "#F39A1F", padding: "11px 24px", borderRadius: 999, boxShadow: "0 5px 0 #C97C12" },
};
