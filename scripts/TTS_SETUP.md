# Read-aloud TTS — provider setup (`npm run seed:tts`)

Read-aloud clips are **pre-generated** and cached as static `.wav` files under
`public/audio/tts/`. The app only ever plays these files — it never calls a TTS
API at runtime, so there is no key in the shipped app and no per-play cost.

## Who synthesizes what

| Subject             | Provider                              | Voice (default)              | Auth                         |
| ------------------- | ------------------------------------- | ---------------------------- | ---------------------------- |
| Math (`g1-math…`)   | Azure AI Speech                       | `uz-UZ-SardorNeural` (male)  | `.env` key                   |
| Ona tili (`g1-ona…`)| Google **Gemini TTS** (Vertex AI)     | model `gemini-3.1-flash-tts-preview`, voice **Charon** | **gcloud ADC (no key)** |
| Oʻqish (`g1-oqish…`)| Google **Gemini TTS** (Vertex AI)     | voice **Charon** (same as Ona) | same as Ona                |

Gemini has no official Uzbek voice, but it reads Uzbek text more clearly than
Azure's Uzbek voice, so Ona tili uses Gemini with the Uzbek text.

## Google / Gemini setup (one time, on your machine)

Gemini TTS is reached through **Vertex AI**. The seed script authenticates with a
**service-account key file** named `gcloud-tts.json` in the **project root**
(`C:\Users\user\q`) — the script auto-detects it, points the auth library at it,
and reads the project id **from the key**, so you don't set the project anywhere.
This is the same setup that worked before. Use the correct account
(`nazokatzakirova.r@gmail.com`) and its project (e.g. `quvnoqtest-tts-01`).

Run these from inside `C:\Users\user\q` (replace `PROJECT_ID`):

```bash
gcloud config set account nazokatzakirova.r@gmail.com
gcloud config set project PROJECT_ID

# enable the APIs (Vertex AI is the one Gemini-TTS needs; TTS API is harmless to add)
gcloud services enable aiplatform.googleapis.com texttospeech.googleapis.com

# create a service account and grant the Vertex role (this was the permission that unblocked it last time)
gcloud iam service-accounts create tts-service --display-name="QuvnoqTest TTS"
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:tts-service@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

# create + download the key STRAIGHT INTO the project root as gcloud-tts.json
gcloud iam service-accounts keys create gcloud-tts.json \
  --iam-account=tts-service@PROJECT_ID.iam.gserviceaccount.com

# install deps (adds @google/genai)
npm install
```

`gcloud-tts.json` is already git-ignored — keep it private. Make sure billing is
linked to the project (Vertex requires it, even under free credit).

> Alternatives to the key file:
> • ADC: run `gcloud auth application-default login` and set `GOOGLE_CLOUD_PROJECT=PROJECT_ID` in `.env`.
> • API key: set `GEMINI_API_KEY=…` in `.env` (uses the Gemini API path, no project needed).
> The key file in the project root is the recommended path and needs nothing in `.env`.

When you run the seed, the first log line shows what it resolved, e.g.
`Gemini auth: key file gcloud-tts.json · project: PROJECT_ID · location: global`.
If it says `Gemini auth: NONE ✗`, the key file wasn't found — check it's named
exactly `gcloud-tts.json` and sits in `C:\Users\user\q`.

## Running the seed

```bash
npm run seed:tts
```

- **Math** clips already exist (Azure) → **kept, never re-synthesized** (saves money).
- **Ona tili** clips → generated with Gemini/Charon. Any Ona clip that is missing
  or was previously made with a non-Gemini provider (the old Azure ones) is
  (re)generated; the 30 old Azure Ona clips are replaced and the missing ones
  created. Re-running afterward skips them (now Gemini + unchanged).

To force a full Ona re-render (e.g. after changing the voice):

```bash
TTS_FORCE_ONA=1 npm run seed:tts     # or plain: TTS_FORCE=1 (alias, never touches Math)
```

### Flags

| Env var            | Effect                                                                  |
| ------------------ | ----------------------------------------------------------------------- |
| `TTS_FORCE_ONA=1`  | Re-make **every** Ona clip even if it's already a matching Gemini clip. |
| `TTS_FORCE_MATH=1` | Re-make Math clips (costs Azure money — off by default).                |
| `TTS_FORCE=1`      | Legacy alias for `TTS_FORCE_ONA` — **never** forces Math.               |
| `TTS_ONLY=ona`     | Process Ona tili only (skip Math). `TTS_ONLY=math` for Math.            |

A plain `npm run seed:tts` does exactly: **keep Math (Sardor/Azure), (re)generate Ona + Oʻqish with Gemini/Charon.**

## Read-along (karaoke) passages — Oʻqish

Besides the `recall` clip per lesson, the seed also builds **read-along audio for
reading passages**. Any `karaoke_reading` item whose props carry
`audio: "<topicId>-<itemId>"` (e.g. `"g1-oqish-19-q1"`) is synthesized **one line
at a time** (voice Charon), and the clips are glued into
`public/audio/tts/passages/<key>.uz.wav` with a per-line timings sidecar
`<key>.uz.json`. The app highlights the text line-by-line from that sidecar as it
plays — no word-timepoints needed, and because each line's duration is measured
exactly there is no drift. Uzbek only. A passage is re-synthesized only when its
lines change (or with `TTS_FORCE_ONA=1`). Keep each line short (one poetic line /
one sentence) for natural highlighting.

## Voice / model overrides (`.env`)

```
GEMINI_TTS_MODEL=gemini-3.1-flash-tts-preview   # change if this preview id isn't available to you
GEMINI_TTS_VOICE=Charon                          # other Gemini voices: Puck, Kore, Enceladus, Fenrir…
GEMINI_TTS_LOCATION=global                        # Vertex region; try us-central1 if global fails
GEMINI_TTS_STYLE=Read aloud in a warm, welcoming tone  # delivery style for read-along passages
```

**Read-along voice sounds flat / different from the AI-Studio playground?** Gemini
TTS is styled by a natural-language instruction (the playground's "Style
instructions" field). The seed sends `GEMINI_TTS_STYLE` with every passage line
so it matches — change it to steer tone/pace (e.g. "Read slowly and clearly for a
young child, warmly"). Passages re-synthesize when the style changes. Note the
read-along is built line-by-line (for exact highlight timing), so its phrasing is
a little more segmented than the playground's single continuous read.

If the first run errors with something like *"no audio in Gemini response (check
model name / voice / access)"* or a 404 on the model, the preview model id or
region isn't enabled for your project — set `GEMINI_TTS_MODEL` to a TTS model you
have access to (e.g. `gemini-2.5-flash-preview-tts`) and/or `GEMINI_TTS_LOCATION=us-central1`.
