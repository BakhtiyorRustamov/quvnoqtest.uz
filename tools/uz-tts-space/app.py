"""Free Uzbek TTS server for the quvnoqtest.uz /lab page.

Runs Meta's MMS-TTS Uzbek model (facebook/mms-tts-uzb-script_cyrillic) on a free
Hugging Face Space (CPU basic). Nothing is stored: each request returns a WAV.
"""
import io
import os
import time
import wave

import numpy as np
import torch
from fastapi import FastAPI, Header, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from transformers import AutoTokenizer, VitsModel

from translit import to_cyrillic

MODEL_ID = os.environ.get("TTS_MODEL", "facebook/mms-tts-uzb-script_cyrillic")
SECRET = os.environ.get("TTS_SECRET", "")  # optional shared secret

torch.set_num_threads(max(1, os.cpu_count() or 1))
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = VitsModel.from_pretrained(MODEL_ID).eval()
RATE = model.config.sampling_rate

app = FastAPI(title="uz-tts")


class TtsIn(BaseModel):
    text: str
    speed: float = 1.0


@app.get("/")
def health():
    return {"ok": True, "model": MODEL_ID, "rate": RATE}


@app.post("/tts")
def tts(body: TtsIn, x_tts_secret: str = Header(default="")):
    if SECRET and x_tts_secret != SECRET:
        raise HTTPException(401, "bad secret")
    text = body.text.strip()[:600]
    if not text:
        raise HTTPException(400, "empty text")
    t0 = time.time()
    cyr = to_cyrillic(text)
    inputs = tokenizer(cyr, return_tensors="pt")
    if inputs["input_ids"].shape[-1] == 0:
        raise HTTPException(400, "nothing to read")
    model.speaking_rate = 1.0 / max(0.5, min(2.0, body.speed or 1.0))
    with torch.no_grad():
        audio = model(**inputs).waveform[0].cpu().numpy()
    pcm = (np.clip(audio, -1, 1) * 32767).astype(np.int16)
    buf = io.BytesIO()
    with wave.open(buf, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(pcm.tobytes())
    ms = int((time.time() - t0) * 1000)
    return Response(buf.getvalue(), media_type="audio/wav", headers={"x-tts-ms": str(ms)})
