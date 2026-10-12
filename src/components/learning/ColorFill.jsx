"use client";
import React, { useMemo, useState } from "react";
import { getPicture } from "./pictures";

/**
 * ColorFill — a tap-to-colour picture (Tasviriy sanʼat). The child picks a
 * colour from the palette, then taps regions of the SVG outline to fill them.
 * A white swatch acts as an eraser; "Reset" clears everything. Purely creative
 * and UNGRADED: tapping "Done" completes the item (onAttempt(true)+onCorrect).
 *
 * Props: {
 *   picture: string,                 // key in pictures.ts
 *   palette?: string[],              // hex colours (defaults to a gouache set)
 *   showSample?: boolean,            // start pre-filled with the picture palette
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { pick: "Rang tanla, soʻng rasmni boʻya", reset: "Tozalash", done: "Boʻyadim ✓", next: "Yana", eraser: "oʻchirgʻich" },
  ru: { pick: "Выбери цвет и раскрась рисунок", reset: "Очистить", done: "Я раскрасил ✓", next: "Ещё", eraser: "ластик" },
  en: { pick: "Pick a colour, then colour the picture", reset: "Reset", done: "I coloured it ✓", next: "Again", eraser: "eraser" }
};

const DEFAULT_PALETTE = [
  "#e4443a", "#f39a1f", "#f7d13a", "#5bbf5b", "#1fa7e0",
  "#8a4bd0", "#9c5b2e", "#f28ec2", "#333333", "#ffffff"
];

export default function ColorFill({
  picture,
  palette = DEFAULT_PALETTE,
  showSample = false,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  const pic = getPicture(picture);
  const [color, setColor] = useState(palette.find((c) => c !== "#ffffff") || palette[0]);
  const [fills, setFills] = useState(() => (showSample && pic?.palette ? { ...pic.palette } : {}));
  const [done, setDone] = useState(false);

  const stroke = pic?.stroke || "#2b2b2b";
  const strokeWidth = pic?.strokeWidth ?? 2.5;

  const regionEls = useMemo(() => {
    if (!pic) return null;
    return pic.regions.map((r) => {
      const fill = fills[r.id] || "#ffffff";
      const common = {
        key: r.id,
        fill,
        stroke,
        strokeWidth,
        strokeLinejoin: "round",
        strokeLinecap: "round",
        style: { cursor: done ? "default" : "pointer", transition: "fill .12s" },
        onClick: () => {
          if (done) return;
          setFills((f) => ({ ...f, [r.id]: color }));
        }
      };
      return "circle" in r
        ? <circle {...common} cx={r.circle.cx} cy={r.circle.cy} r={r.circle.r} />
        : <path {...common} d={r.d} />;
    });
  }, [pic, fills, color, done, stroke, strokeWidth]);

  function finish() {
    if (done) return;
    setDone(true);
    if (typeof onAttempt === "function") onAttempt(true, { colored: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  if (!pic) return null;

  return (
    <div style={S.wrap}>
      <div style={S.pickLbl}>{t.pick}</div>

      {/* palette */}
      <div style={S.palette}>
        {palette.map((c) => {
          const on = c === color;
          const isWhite = c.toLowerCase() === "#ffffff";
          return (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              aria-label={isWhite ? t.eraser : c}
              title={isWhite ? t.eraser : c}
              style={{
                ...S.swatch,
                background: c,
                borderColor: on ? "#111" : "rgba(0,0,0,0.18)",
                boxShadow: on ? "0 0 0 3px rgba(0,0,0,0.12)" : "0 1px 2px rgba(0,0,0,0.15)",
                transform: on ? "scale(1.12)" : "none"
              }}
            >
              {isWhite && (
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                  <path d="M9 6 L19 6 L19 18 L9 18 L4 12 Z" fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* canvas */}
      <div style={S.stage}>
        <svg viewBox={pic.viewBox} style={S.svg} role="img">
          {regionEls}
          {pic.details?.map((d, i) => (
            <path key={`d${i}`} d={d} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </svg>
      </div>

      {/* actions */}
      <div style={S.actions}>
        <button type="button" onClick={() => !done && setFills({})} disabled={done} style={S.reset}>{t.reset}</button>
        <button type="button" onClick={finish} disabled={done} style={{ ...S.done, ...(done ? S.doneOn : {}) }}>{t.done}</button>
      </div>

      {!embedded && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const S = {
  wrap: { maxWidth: 420, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  pickLbl: { textAlign: "center", fontWeight: 800, fontSize: 15, color: "#6b6157", marginBottom: 10 },
  palette: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 12 },
  swatch: { width: 34, height: 34, borderRadius: "50%", border: "2px solid", cursor: "pointer", padding: 0, display: "grid", placeItems: "center", transition: "transform .1s" },
  eraserMark: { fontSize: 15, color: "#888", fontWeight: 900 },
  stage: { background: "#fffef9", border: "2px solid #ece1c8", borderRadius: 18, padding: 10, boxShadow: "inset 0 2px 10px rgba(0,0,0,0.04)" },
  svg: { width: "100%", height: "auto", display: "block", touchAction: "manipulation" },
  actions: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 14 },
  reset: { border: "2px solid #d9ccb2", background: "#fff", color: "#7a6c53", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 800, padding: "10px 18px", borderRadius: 999 },
  done: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  doneOn: { background: "#8bbf9c", boxShadow: "0 5px 0 #6fa382", cursor: "default" },
  next: { display: "block", margin: "12px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
