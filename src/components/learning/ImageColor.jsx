"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * ImageColor — colour a real outline picture (Tasviriy sanʼat). A transparent
 * PNG outline from /public/art is laid ON TOP of a paint canvas with
 * `mix-blend-mode: multiply`, so the child paints freely underneath while the
 * black lines stay crisp. Palette + 3 brush sizes + eraser + undo/clear.
 * Purely creative and UNGRADED: "Done" completes the item.
 *
 * Props: {
 *   sheet: string,            // file in /public/art (without extension), e.g. "harvest"
 *   palette?: string[],
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { hint: "Rang tanla va rasmni boʻya", undo: "Orqaga", clear: "Tozalash", done: "Boʻyadim ✓", next: "Yana", eraser: "oʻchirgʻich" },
  ru: { hint: "Выбери цвет и раскрась картинку", undo: "Назад", clear: "Очистить", done: "Я раскрасил ✓", next: "Ещё", eraser: "ластик" },
  en: { hint: "Pick a colour and colour the picture", undo: "Undo", clear: "Clear", done: "I coloured it ✓", next: "Again", eraser: "eraser" }
};
const DEFAULT_PALETTE = ["#e4443a", "#f39a1f", "#f7d13a", "#5bbf5b", "#1fa7e0", "#8a4bd0", "#9c5b2e", "#f28ec2", "#333333"];
const SIZES = [8, 16, 30];
const W = 480, H = 360;

export default function ImageColor({
  sheet,
  palette = DEFAULT_PALETTE,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const strokes = useRef([]);
  const cur = useRef(null);
  const [color, setColor] = useState(palette[0]);
  const [size, setSize] = useState(SIZES[1]);
  const [erasing, setErasing] = useState(false);
  const [done, setDone] = useState(false);
  const [, force] = useState(0);

  const redraw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const all = cur.current ? [...strokes.current, cur.current] : strokes.current;
    for (const s of all) {
      ctx.globalCompositeOperation = s.erase ? "destination-out" : "source-over";
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      s.points.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      if (s.points.length === 1) ctx.lineTo(s.points[0].x + 0.1, s.points[0].y + 0.1);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
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
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drawing.current = true;
    cur.current = { color, size: erasing ? Math.max(size, 24) : size, erase: erasing, points: [pos(e)] };
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
  function undo() { if (done) return; strokes.current.pop(); redraw(); force((n) => n + 1); }
  function clear() { if (done) return; strokes.current = []; redraw(); force((n) => n + 1); }
  function finish() {
    if (done) return;
    setDone(true);
    if (typeof onAttempt === "function") onAttempt(true, { colored: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  return (
    <div style={S.wrap}>
      <div style={S.hint}>{t.hint}</div>

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
        {SIZES.map((sz) => (
          <button key={sz} type="button" onClick={() => setSize(sz)} aria-label={`brush ${sz}`}
            style={{ ...S.sizeBtn, borderColor: size === sz ? "#111" : "rgba(0,0,0,0.15)", background: size === sz ? "#fff4e6" : "#fff" }}>
            <span style={{ width: sz / 1.6 + 4, height: sz / 1.6 + 4, borderRadius: "50%", background: erasing ? "#bbb" : color, display: "block" }} />
          </button>
        ))}
      </div>

      {/* colour sheet: paint canvas + outline overlay (multiply) */}
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/art/${sheet}.png`} alt="" aria-hidden draggable={false} style={S.overlay} />
      </div>

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
  wrap: { maxWidth: 440, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  hint: { textAlign: "center", fontWeight: 800, fontSize: 15, color: "#6b6157", marginBottom: 10 },
  tools: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 7, marginBottom: 8 },
  swatch: { width: 32, height: 32, borderRadius: "50%", border: "2px solid", cursor: "pointer", padding: 0, transition: "transform .1s" },
  sizes: { display: "flex", justifyContent: "center", gap: 8, marginBottom: 10 },
  sizeBtn: { width: 42, height: 32, borderRadius: 10, border: "2px solid", cursor: "pointer", display: "grid", placeItems: "center" },
  stage: { position: "relative", width: "100%", aspectRatio: "4 / 3", background: "#ffffff", border: "2px solid #ece1c8", borderRadius: 16, overflow: "hidden", boxShadow: "inset 0 2px 10px rgba(0,0,0,0.04)" },
  canvas: { position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", touchAction: "none", cursor: "crosshair" },
  overlay: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply", pointerEvents: "none", userSelect: "none" },
  actions: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 12 },
  ghost: { border: "2px solid #d9ccb2", background: "#fff", color: "#7a6c53", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 800, padding: "9px 16px", borderRadius: 999 },
  done: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  doneOn: { background: "#8bbf9c", boxShadow: "0 5px 0 #6fa382", cursor: "default" },
  next: { display: "block", margin: "12px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
