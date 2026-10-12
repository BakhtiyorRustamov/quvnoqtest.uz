"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getPicture } from "./pictures";

/**
 * FreeDraw — a blank drawing canvas (Tasviriy sanʼat). The child draws freely
 * with a colour palette, three brush sizes, an eraser, undo and clear. When an
 * `example` picture is given it is shown faintly above the canvas as a model to
 * copy. Purely creative and UNGRADED: "Done" completes the item.
 *
 * Props: {
 *   example?: string,        // picture key shown as a faint model
 *   palette?: string[],
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { draw: "Rasm chiz", model: "Namuna", undo: "Orqaga", clear: "Tozalash", done: "Chizdim ✓", next: "Yana", eraser: "oʻchirgʻich" },
  ru: { draw: "Нарисуй", model: "Образец", undo: "Назад", clear: "Очистить", done: "Я нарисовал ✓", next: "Ещё", eraser: "ластик" },
  en: { draw: "Draw a picture", model: "Model", undo: "Undo", clear: "Clear", done: "I drew it ✓", next: "Again", eraser: "eraser" }
};

const DEFAULT_PALETTE = ["#e4443a", "#f39a1f", "#f7d13a", "#5bbf5b", "#1fa7e0", "#8a4bd0", "#9c5b2e", "#333333"];
const SIZES = [3, 7, 14];
const W = 320, H = 240, ERASER = "#ffffff";

export default function FreeDraw({
  example,
  palette = DEFAULT_PALETTE,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  const pic = example ? getPicture(example) : undefined;
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const strokes = useRef([]);          // committed strokes for undo
  const cur = useRef(null);            // stroke in progress
  const [color, setColor] = useState(palette[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [erasing, setErasing] = useState(false);
  const [done, setDone] = useState(false);
  const [, force] = useState(0);       // repaint trigger for undo/clear

  const redraw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const all = cur.current ? [...strokes.current, cur.current] : strokes.current;
    for (const s of all) {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      s.points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      if (s.points.length === 1) { ctx.lineTo(s.points[0].x + 0.1, s.points[0].y + 0.1); }
      ctx.stroke();
    }
  }, []);

  useEffect(() => { redraw(); }, [redraw]);

  function pos(e) {
    const cv = canvasRef.current;
    const r = cv.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  }
  function start(e) {
    if (done) return;
    e.preventDefault();
    drawing.current = true;
    cur.current = { color: erasing ? ERASER : color, size: erasing ? Math.max(size, 14) : size, points: [pos(e)] };
    redraw();
  }
  function move(e) {
    if (!drawing.current || done) return;
    e.preventDefault();
    cur.current.points.push(pos(e));
    redraw();
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    if (cur.current) strokes.current.push(cur.current);
    cur.current = null;
    redraw();
  }
  function undo() {
    if (done) return;
    strokes.current.pop();
    redraw();
    force((n) => n + 1);
  }
  function clear() {
    if (done) return;
    strokes.current = [];
    redraw();
    force((n) => n + 1);
  }
  function finish() {
    if (done) return;
    setDone(true);
    if (typeof onAttempt === "function") onAttempt(true, { drew: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  return (
    <div style={S.wrap}>
      {pic && (
        <div style={S.modelBox}>
          <span style={S.modelLbl}>{t.model}</span>
          <svg viewBox={pic.viewBox} style={S.modelSvg} aria-hidden>
            {pic.regions.map((r) =>
              "circle" in r
                ? <circle key={r.id} cx={r.circle.cx} cy={r.circle.cy} r={r.circle.r} fill="none" stroke="#c4b8a4" strokeWidth={2} />
                : <path key={r.id} d={r.d} fill="none" stroke="#c4b8a4" strokeWidth={2} strokeLinejoin="round" />
            )}
            {pic.details?.map((d, i) => <path key={`d${i}`} d={d} fill="none" stroke="#d8ccb6" strokeWidth={1.6} strokeLinecap="round" />)}
          </svg>
        </div>
      )}

      {/* palette + brush sizes */}
      <div style={S.tools}>
        {palette.map((c) => {
          const on = c === color && !erasing;
          return (
            <button key={c} type="button" onClick={() => { setColor(c); setErasing(false); }} aria-label={c}
              style={{ ...S.swatch, background: c, borderColor: on ? "#111" : "rgba(0,0,0,0.18)", transform: on ? "scale(1.12)" : "none" }} />
          );
        })}
        <button type="button" onClick={() => setErasing(true)} aria-label={t.eraser}
          style={{ ...S.swatch, background: "#fff", borderColor: erasing ? "#111" : "rgba(0,0,0,0.18)", transform: erasing ? "scale(1.12)" : "none", display: "grid", placeItems: "center" }}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden><path d="M9 6 L19 6 L19 18 L9 18 L4 12 Z" fill="none" stroke="#9a9a9a" strokeWidth="2" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <div style={S.sizes}>
        {SIZES.map((s) => (
          <button key={s} type="button" onClick={() => setSize(s)} aria-label={`brush ${s}`}
            style={{ ...S.sizeBtn, borderColor: size === s ? "#111" : "rgba(0,0,0,0.15)", background: size === s ? "#fff4e6" : "#fff" }}>
            <span style={{ width: s + 2, height: s + 2, borderRadius: "50%", background: erasing ? "#bbb" : color, display: "block" }} />
          </button>
        ))}
      </div>

      {/* canvas */}
      <div style={S.stage}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={S.canvas}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          onPointerCancel={end}
        />
      </div>

      {/* actions */}
      <div style={S.actions}>
        <button type="button" onClick={undo} disabled={done} style={S.ghost}>{t.undo}</button>
        <button type="button" onClick={clear} disabled={done} style={S.ghost}>{t.clear}</button>
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
  modelBox: { position: "relative", width: 120, margin: "0 auto 10px", background: "#fffef9", border: "2px solid #ece1c8", borderRadius: 14, padding: 6 },
  modelLbl: { position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 800, color: "#a9997e", background: "#fff", padding: "0 6px", borderRadius: 8 },
  modelSvg: { width: "100%", height: "auto", display: "block" },
  tools: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7, marginBottom: 8 },
  swatch: { width: 32, height: 32, borderRadius: "50%", border: "2px solid", cursor: "pointer", padding: 0, transition: "transform .1s" },
  sizes: { display: "flex", justifyContent: "center", gap: 8, marginBottom: 10 },
  sizeBtn: { width: 40, height: 32, borderRadius: 10, border: "2px solid", cursor: "pointer", display: "grid", placeItems: "center" },
  stage: { background: "#ffffff", border: "2px solid #ece1c8", borderRadius: 16, padding: 6, boxShadow: "inset 0 2px 10px rgba(0,0,0,0.04)" },
  canvas: { width: "100%", height: "auto", display: "block", borderRadius: 10, touchAction: "none", cursor: "crosshair", aspectRatio: "4 / 3" },
  actions: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 12 },
  ghost: { border: "2px solid #d9ccb2", background: "#fff", color: "#7a6c53", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 800, padding: "9px 16px", borderRadius: 999 },
  done: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  doneOn: { background: "#8bbf9c", boxShadow: "0 5px 0 #6fa382", cursor: "default" },
  next: { display: "block", margin: "12px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
