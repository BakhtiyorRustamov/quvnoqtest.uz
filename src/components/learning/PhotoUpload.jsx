"use client";
import React, { useRef, useState } from "react";

/**
 * PhotoUpload — the child draws on real paper, then uploads a photo or takes one
 * with the camera to finish the lesson (Tasviriy sanʼat technique lessons). The
 * image is accepted as-is, drawn to a small 150×150 preview (nothing is sent to
 * a backend), then a checkmark + celebration appears and the item completes.
 * UNGRADED: any image marks the lesson done.
 *
 * Props: { lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 */
const STR = {
  uz: { hint: "Rasmingni chizib boʻlgach, suratga ol yoki yukla", btn: "Rasmni yuklash / suratga olish", again: "Boshqa rasm", done: "Ajoyib ish!", next: "Yana" },
  ru: { hint: "Нарисовав рисунок, сфотографируй или загрузи его", btn: "Загрузить / сфотографировать", again: "Другое фото", done: "Отличная работа!", next: "Ещё" },
  en: { hint: "When your drawing is ready, take a photo or upload it", btn: "Upload / take a photo", again: "Another photo", done: "Wonderful work!", next: "Again" }
};
const BOX = 150;

export default function PhotoUpload({ lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const inputRef = useRef(null);
  const [thumb, setThumb] = useState(null);
  const [done, setDone] = useState(false);

  function onPick(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-picking the same file
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // draw into a small square canvas (contain, white background)
        const cv = document.createElement("canvas");
        cv.width = BOX; cv.height = BOX;
        const ctx = cv.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, BOX, BOX);
        const scale = Math.min(BOX / img.width, BOX / img.height);
        const w = img.width * scale, h = img.height * scale;
        ctx.drawImage(img, (BOX - w) / 2, (BOX - h) / 2, w, h);
        setThumb(cv.toDataURL("image/jpeg", 0.85));
        if (!done) {
          setDone(true);
          if (typeof onAttempt === "function") onAttempt(true, { photo: true });
          if (typeof onCorrect === "function") onCorrect();
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <div style={S.hint}>{t.hint}</div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onPick}
        style={{ display: "none" }}
      />

      <div style={S.stage}>
        {thumb ? (
          <div style={S.frame} className="pu-pop">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt="" width={BOX} height={BOX} style={S.thumb} />
            <span style={S.badge} aria-hidden>
              <svg viewBox="0 0 24 24" width="26" height="26"><path d="M20 6 L9 17 L4 12" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
        ) : (
          <div style={S.placeholder} aria-hidden>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#c9b79a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6 L9.5 3.5 L14.5 3.5 L16 6" />
            </svg>
          </div>
        )}
      </div>

      {done && <div style={S.doneMsg} className="pu-pop">{t.done}</div>}

      <button type="button" onClick={() => inputRef.current?.click()} style={{ ...S.btn, ...(done ? S.btnAgain : {}) }}>
        {done ? t.again : t.btn}
      </button>

      {!embedded && done && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `
.pu-pop { animation: puPop .4s cubic-bezier(.2,1.3,.5,1) both; }
@keyframes puPop { from { opacity:0; transform: scale(.6); } to { opacity:1; transform: none; } }
`;

const S = {
  wrap: { maxWidth: 380, margin: "0 auto", padding: "4px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  hint: { fontWeight: 800, fontSize: 15, color: "#6b6157", marginBottom: 14 },
  stage: { display: "grid", placeItems: "center", minHeight: 170 },
  frame: { position: "relative", width: 150, height: 150, borderRadius: 16, overflow: "hidden", border: "3px solid #2f9e54", boxShadow: "0 8px 20px -8px rgba(47,158,84,.5)" },
  thumb: { display: "block", width: 150, height: 150, objectFit: "cover" },
  badge: { position: "absolute", right: -6, bottom: -6, width: 40, height: 40, borderRadius: "50%", background: "#2f9e54", display: "grid", placeItems: "center", boxShadow: "0 3px 8px rgba(0,0,0,.25)" },
  placeholder: { width: 150, height: 150, borderRadius: 16, border: "3px dashed #e0d3ba", background: "#fffdf7", display: "grid", placeItems: "center" },
  doneMsg: { marginTop: 14, fontSize: 20, fontWeight: 900, color: "#2f9e54" },
  btn: { marginTop: 16, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#1fa7e0", padding: "12px 24px", borderRadius: 999, boxShadow: "0 5px 0 #1a86b4" },
  btnAgain: { background: "#c8a24a", boxShadow: "0 5px 0 #a9863a", fontSize: 14, padding: "9px 18px" },
  next: { display: "block", margin: "14px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
