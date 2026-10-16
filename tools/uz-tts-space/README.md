---
title: uz-tts
emoji: 🗣️
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
pinned: false
license: cc-by-nc-4.0
---

# Free Uzbek TTS for quvnoqtest.uz /lab

Meta MMS-TTS Uzbek (`facebook/mms-tts-uzb-script_cyrillic`) behind a tiny FastAPI.
Latin Uzbek text is converted to Cyrillic first (`translit.py`), and digits are read as words.
Nothing is stored. Each `POST /tts` returns a WAV.

## Setup (free)
1. huggingface.co → **New Space** → name `uz-tts`, SDK **Docker** (Blank), hardware **CPU basic (free)**, Public or Private.
2. Upload these 5 files: `README.md`, `Dockerfile`, `requirements.txt`, `app.py`, `translit.py`.
3. Wait for the build (about 5–8 min). Then open `https://<user>-uz-tts.hf.space/`. It should show `{"ok":true,...}`.
4. In Vercel → Project → Settings → Environment Variables, add
   `UZ_TTS_URL = https://<user>-uz-tts.hf.space`, then redeploy.
   If the Space is **Private**, also add `HF_TOKEN` (a read token).

Notes: a free Space sleeps after ~48 h idle, so the first request then takes ~30–60 s to wake.
The MMS license is CC-BY-NC 4.0 (non-commercial), so it's fine for testing; check it before production use.

## API
`POST /tts` `{"text": "Salom, bugun aylanani oʻrganamiz.", "speed": 1.0}` → `audio/wav`
