"use client";
import React, { useRef, useState } from "react";
import { getCraftArt } from "./craftArt";

/**
 * CraftSteps — the hands-on card for Texnologiya (Technology/crafts). It lists
 * the materials and numbered steps for making something out of paper, plastilin
 * or natural materials, then the child makes it in real life and taps
 * "I made it ✓" to finish. Optionally they can upload/take a photo of the
 * finished craft (resized to 150×150 in-browser, nothing sent to a backend),
 * which also completes it with a checkmark + celebration. UNGRADED.
 *
 * Props: {
 *   materials?: ({uz,ru,en}|string)[],
 *   steps: ({uz,ru,en}|string)[],
 *   photo?: boolean = true,     // show the optional photo button
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { mats: "Kerakli ashyolar", steps: "Bosqichlar", done: "Tayyor ✓", photo: "Rasmini yuklash / suratga olish", again: "Boshqa rasm", celebrate: "Ajoyib ish!", next: "Yana" },
  ru: { mats: "Что понадобится", steps: "Этапы", done: "Готово ✓", photo: "Загрузить / сфотографировать", again: "Другое фото", celebrate: "Отличная работа!", next: "Ещё" },
  en: { mats: "What you need", steps: "Steps", done: "I made it ✓", photo: "Upload / take a photo", again: "Another photo", celebrate: "Wonderful work!", next: "Again" }
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");
const BOX = 150;

export default function CraftSteps({
  materials = [],
  steps = [],
  art,
  photo = true,
  lang = "uz",
  embedded = false,
  onAttempt,
  onCorrect,
  onNext
}) {
  const t = STR[lang] || STR.uz;
  const stepArt = art ? getCraftArt(art) : undefined;
  const inputRef = useRef(null);
  const [thumb, setThumb] = useState(null);
  const [done, setDone] = useState(false);

  function complete(extra) {
    if (done) return;
    setDone(true);
    if (typeof onAttempt === "function") onAttempt(true, extra || { made: true });
    if (typeof onCorrect === "function") onCorrect();
  }

  function onPick(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const cv = document.createElement("canvas");
        cv.width = BOX; cv.height = BOX;
        const ctx = cv.getContext("2d");
        ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, BOX, BOX);
        const scale = Math.min(BOX / img.width, BOX / img.height);
        const w = img.width * scale, h = img.height * scale;
        ctx.drawImage(img, (BOX - w) / 2, (BOX - h) / 2, w, h);
        setThumb(cv.toDataURL("image/jpeg", 0.85));
        complete({ photo: true });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>

      {materials.length > 0 && (
        <div style={S.matBox}>
          <div style={S.matLbl}>{t.mats}</div>
          <div style={S.matList}>
            {materials.map((m, i) => <span key={i} style={S.matPill}>{L(m, lang)}</span>)}
          </div>
        </div>
      )}

      <div style={S.stepsBox}>
        <div style={S.stepsLbl}>{t.steps}</div>
        <ol style={S.ol}>
          {steps.map((st, i) => (
            <li key={i} style={S.li}>
              <div style={S.stepHead}>
                <span style={S.num}>{i + 1}</span>
                <span style={S.stepTxt}>{L(st, lang)}</span>
              </div>
              {stepArt && stepArt[i] && (
                <div style={{ ...S.artBox, animationDelay: `${0.1 + i * 0.18}s` }} className="cs-art-in" aria-hidden>
                  <svg viewBox="0 0 100 100" style={S.artSvg}>
                    <g stroke="#2b2b2b" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      {stepArt[i]}
                    </g>
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {thumb && (
        <div style={S.thumbWrap} className="cs-pop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumb} alt="" width={BOX} height={BOX} style={S.thumb} />
          <span style={S.badge} aria-hidden>
            <svg viewBox="0 0 24 24" width="24" height="24"><path d="M20 6 L9 17 L4 12" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </div>
      )}

      {done && <div style={S.celebrate} className="cs-pop">{t.celebrate}</div>}

      <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={onPick} style={{ display: "none" }} />

      <div style={S.actions}>
        {!done && (
          <button type="button" onClick={() => complete()} style={S.done}>{t.done}</button>
        )}
        {photo && (
          <button type="button" onClick={() => inputRef.current?.click()} style={{ ...S.photo, ...(done ? S.photoAgain : {}) }}>
            {done ? t.again : t.photo}
          </button>
        )}
      </div>

      {!embedded && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `
.cs-pop { animation: csPop .4s cubic-bezier(.2,1.3,.5,1) both; }
@keyframes csPop { from { opacity:0; transform: scale(.6);} to { opacity:1; transform:none; } }
.cs-art-in { animation: csArtIn .55s cubic-bezier(.2,1.1,.4,1) both; }
@keyframes csArtIn { from { opacity:0; transform: scale(.72) translateY(10px);} to { opacity:1; transform:none; } }
@media (prefers-reduced-motion: reduce) { .cs-art-in, .cs-pop { animation: none !important; } }
`;

const NAVY = "#1E3A5F";
const S = {
  wrap: { maxWidth: 440, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#2a3340" },
  matBox: { background: "#eef3f9", border: "2px solid #d4e0ee", borderRadius: 14, padding: "10px 14px", marginBottom: 12 },
  matLbl: { fontSize: 12.5, fontWeight: 900, color: NAVY, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 },
  matList: { display: "flex", flexWrap: "wrap", gap: 6 },
  matPill: { background: "#fff", border: "1.5px solid #cdd9e8", borderRadius: 999, padding: "4px 11px", fontSize: 13.5, fontWeight: 700, color: "#3a4656" },
  stepsBox: { background: "#fff", border: "2px solid #e6eaf0", borderRadius: 14, padding: "12px 14px" },
  stepsLbl: { fontSize: 12.5, fontWeight: 900, color: NAVY, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 },
  ol: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 20 },
  li: { display: "flex", flexDirection: "column", gap: 10 },
  stepHead: { display: "flex", gap: 10, alignItems: "flex-start" },
  num: { flexShrink: 0, width: 26, height: 26, borderRadius: "50%", background: NAVY, color: "#fff", fontWeight: 900, fontSize: 14, display: "grid", placeItems: "center", marginTop: 1 },
  artBox: { width: "100%", maxWidth: 280, aspectRatio: "1 / 1", margin: "2px auto 0", borderRadius: 16, background: "#f7faff", border: "1.5px solid #dde6f1", display: "grid", placeItems: "center", padding: 12, boxSizing: "border-box" },
  artSvg: { width: "100%", height: "100%", display: "block", overflow: "visible" },
  stepTxt: { flex: 1, fontSize: 16, fontWeight: 700, lineHeight: 1.4, color: "#2a3340" },
  thumbWrap: { position: "relative", width: 150, height: 150, margin: "16px auto 0", borderRadius: 16, overflow: "hidden", border: "3px solid #2f9e54", boxShadow: "0 8px 20px -8px rgba(47,158,84,.5)" },
  thumb: { display: "block", width: 150, height: 150, objectFit: "cover" },
  badge: { position: "absolute", right: -6, bottom: -6, width: 38, height: 38, borderRadius: "50%", background: "#2f9e54", display: "grid", placeItems: "center", boxShadow: "0 3px 8px rgba(0,0,0,.25)" },
  celebrate: { textAlign: "center", marginTop: 14, fontSize: 20, fontWeight: 900, color: "#2f9e54" },
  actions: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 16 },
  done: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#2f9e54", padding: "11px 26px", borderRadius: 999, boxShadow: "0 5px 0 #237a41" },
  photo: { border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14.5, fontWeight: 800, color: "#fff", background: NAVY, padding: "11px 20px", borderRadius: 999, boxShadow: "0 5px 0 #14283f" },
  photoAgain: { background: "#c8a24a", boxShadow: "0 5px 0 #a9863a", fontSize: 13, padding: "9px 16px" },
  next: { display: "block", margin: "14px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
