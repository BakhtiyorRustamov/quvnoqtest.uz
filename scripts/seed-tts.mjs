/**
 * One-time TTS seed (FR-TTS-3/4) — DUAL PROVIDER.
 *
 * Synthesizes the RECALL block (the quiz "topic explanation") for every built
 * lesson and caches the clip as a static .wav. The app only ever serves these
 * cached files — it NEVER calls a TTS API at runtime, so there is no key or
 * credential in the shipped app and no per-play cost.
 *
 *   Read-aloud is UZBEK ONLY (Russian/English clips are not generated — those
 *   locales have no read-aloud button).
 *
 * ── Provider routing (by subject) ──────────────────────────────────────────
 *   • Math  (g1-math…) → Azure AI Speech (uz-UZ voice). Already generated; we
 *     KEEP those clips to save money and NEVER overwrite them (see rules below).
 *   • Ona tili (g1-ona…) → Google Gemini TTS (model gemini-3.1-flash-tts-preview,
 *     voice "Charon"). Gemini reads the Uzbek text more clearly than Azure's
 *     Uzbek voice. Accessed via Vertex AI using gcloud ADC (no key), or via a
 *     GEMINI_API_KEY if you set one.
 *
 * ── When are clips (re)generated? ──────────────────────────────────────────
 *   Math  (Azure):  ONLY missing clips are generated. Existing Math clips are
 *                   never re-synthesized (protects $), unless you explicitly set
 *                   TTS_FORCE_MATH=1.
 *   Ona   (Google): a clip is (re)generated when it is missing, OR was made with
 *                   a non-Google provider (i.e. the old Azure clips), OR its
 *                   text/voice changed. So the first `npm run seed:tts` after
 *                   this change auto-replaces every Azure Ona clip with Google
 *                   and fills the missing ones; later runs skip them. Set
 *                   TTS_FORCE_ONA=1 to re-make every Ona clip even if already
 *                   Google. (Legacy TTS_FORCE=1 is treated as TTS_FORCE_ONA — it
 *                   never forces Math.)
 *   Optional: TTS_ONLY=ona | math restricts the run to one subject.
 *
 * ── Auth / config (read from .env — loaded automatically below) ─────────────
 *   Azure (Math):
 *     AZURE_SPEECH_KEY        resource key
 *     AZURE_SPEECH_ENDPOINT   e.g. https://<resource>.cognitiveservices.azure.com/
 *     AZURE_SPEECH_REGION     e.g. eastus  (preferred over endpoint if set)
 *     AZURE_SPEECH_VOICE      default uz-UZ-SardorNeural
 *   Gemini (Ona) — authenticates via the gcloud CLI (Application Default
 *   Credentials) through Vertex AI, so NO key is stored in .env. One-time setup:
 *       gcloud auth login                        # sign in as nazokatzakirova.r@gmail.com
 *       gcloud config set account nazokatzakirova.r@gmail.com
 *       gcloud auth application-default login     # sign in AGAIN → writes ADC
 *       gcloud services enable aiplatform.googleapis.com --project <PROJECT>
 *       gcloud auth application-default set-quota-project <PROJECT>
 *     Config (.env; project is required for the Vertex/ADC path):
 *       GOOGLE_CLOUD_PROJECT    your GCP project id (required unless GEMINI_API_KEY set)
 *       GEMINI_TTS_MODEL        default gemini-3.1-flash-tts-preview
 *       GEMINI_TTS_VOICE        default Charon  (other Gemini voices: Puck, Kore, Enceladus…)
 *       GEMINI_TTS_LOCATION     Vertex region, default global (else us-central1)
 *       GEMINI_API_KEY          optional — if set, uses the Gemini API (key) instead of Vertex
 *
 * Usage:  npm run seed:tts            (everything)
 *         npm run seed:tts -- --only ingliz   (English subject only)
 * Output: public/audio/tts/<topicId>.<uz|en>.wav, public/audio/tts/en/<key>.wav + manifest.json
 */
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = join(root, 'src', 'content');
const outDir = join(root, 'public', 'audio', 'tts');
mkdirSync(outDir, { recursive: true });
// Read-along (karaoke) reading passages live in a subfolder with a per-passage
// timings sidecar (see the passage pass near the bottom of this file).
const passagesDir = join(outDir, 'passages');
mkdirSync(passagesDir, { recursive: true });
// Ingliz tili question clips (word pronunciations / dialog lines / sentences)
// live in their own subfolder: public/audio/tts/en/<key>.wav
const enDir = join(outDir, 'en');
mkdirSync(enDir, { recursive: true });

// ---- load .env (this is a plain node script; Next does not load it for us) --
function loadEnv() {
  const envPath = join(root, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const key = m[1];
    let val = m[2];
    if (/^".*"$/.test(val) || /^'.*'$/.test(val)) val = val.slice(1, -1); // strip quotes
    if (process.env[key] === undefined) process.env[key] = val;
  }
}
loadEnv();

const ONLY_LOCALE = 'uz'; // read-aloud is Uzbek only

// Azure (Math) config
const AZ_KEY = process.env.AZURE_SPEECH_KEY;
const AZ_ENDPOINT = process.env.AZURE_SPEECH_ENDPOINT;
const AZ_REGION = process.env.AZURE_SPEECH_REGION;
const AZ_VOICE = process.env.AZURE_SPEECH_VOICE || 'uz-UZ-SardorNeural';

// Gemini (Ona) config — Gemini TTS via Vertex AI. Auth is a service-account KEY
// FILE that lives in the project root and is auto-detected here (the same setup
// that worked before): drop `gcloud-tts.json` in the repo root and this script
// finds it, points GOOGLE_APPLICATION_CREDENTIALS at it, and reads the project id
// FROM the key — so you don't need to set the project anywhere. (Alternatively set
// GEMINI_API_KEY to use the Gemini API key path, or GOOGLE_CLOUD_PROJECT for ADC.)
const GEMINI_MODEL = process.env.GEMINI_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
const GEMINI_VOICE = process.env.GEMINI_TTS_VOICE || 'Charon';
/** Per-subject Gemini voice override (else GEMINI_VOICE). Alifbe uses "Puck" so the primer is read by a different narrator (oqish stays on the default). Changing a
 *  voice here changes each clip's identity hash, so those clips auto-regenerate
 *  on the next seed run. */
const SUBJECT_VOICE = { 'g1-alifbe': process.env.GEMINI_TTS_VOICE_ALIFBE || 'Puck', 'g1-informatika': process.env.GEMINI_TTS_VOICE_INFORMATIKA || 'Puck', 'g1-tarbiya': process.env.GEMINI_TTS_VOICE_TARBIYA || 'Algenib' };
/** Per-subject Gemini delivery style (natural-language prompt). Tarbiya is a
 * values/story subject, so it is narrated like a kind grandfather storyteller. */
const SUBJECT_STYLE = { 'g1-tarbiya': process.env.GEMINI_TTS_STYLE_TARBIYA || 'Adopt the tone of an elderly grandfather telling a story' };

/** ── Ingliz tili (English) voice cast ──────────────────────────────────────
 *  Question clips carry a `voice` ROLE ('girl'|'boy'|'teacher'|'man'); the role
 *  maps to a Gemini prebuilt voice here. The recall/intro clip uses `teacher`.
 *  Delivery is steered per-role with a natural-language style prompt (Gemini
 *  TTS is styled by prompt) tuned for a six-year-old learning English. */
const EN_VOICES = {
  girl: process.env.GEMINI_TTS_VOICE_EN_GIRL || 'Leda',
  boy: process.env.GEMINI_TTS_VOICE_EN_BOY || 'Puck',
  teacher: process.env.GEMINI_TTS_VOICE_EN_TEACHER || 'Kore',
  man: process.env.GEMINI_TTS_VOICE_EN_MAN || 'Charon'
};
const EN_STYLES = {
  girl: 'Speak as a cheerful young girl, slowly and clearly, for a child learning English',
  boy: 'Speak as an upbeat young boy, slowly and clearly, for a child learning English',
  teacher: 'Speak as a warm, friendly teacher, slowly and very clearly, for a six-year-old learning English',
  man: 'Speak as a kind, calm man, slowly and very clearly, for a six-year-old learning English'
};
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || undefined;
const G_LOCATION = process.env.GEMINI_TTS_LOCATION || 'global';

/** Find a Google service-account key file (project root or GOOGLE_APPLICATION_CREDENTIALS). */
function findKeyFile() {
  const named = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    join(root, 'gcloud-tts.json'),
    join(root, 'gcloud-tts.json.json'),
    join(root, 'service-account.json')
  ].filter(Boolean);
  for (const p of named) if (existsSync(p)) return p;
  // any *service-account*.json / *gcloud*.json in the root
  for (const ent of readdirSync(root)) {
    if (/\.json$/i.test(ent) && /(service-account|gcloud|tts)/i.test(ent) && existsSync(join(root, ent))) {
      return join(root, ent);
    }
  }
  return null;
}

const KEY_FILE = GEMINI_API_KEY ? null : findKeyFile();
let G_PROJECT = process.env.GOOGLE_CLOUD_PROJECT || process.env.GOOGLE_TTS_PROJECT || undefined;
if (KEY_FILE) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = KEY_FILE; // so the auth library uses it
  if (!G_PROJECT) {
    try {
      G_PROJECT = JSON.parse(readFileSync(KEY_FILE, 'utf8')).project_id || G_PROJECT;
    } catch {
      /* not JSON / unreadable — leave project undefined; preflight will report it */
    }
  }
}

// Force flags — force never touches Math unless TTS_FORCE_MATH is set explicitly.
const FORCE_ONA = process.env.TTS_FORCE_ONA === '1' || process.env.TTS_FORCE === '1';
const FORCE_MATH = process.env.TTS_FORCE_MATH === '1';
// ── Scope flags ─────────────────────────────────────────────────────────────
// Restrict what a run generates so you can test ONE lesson without
// re-synthesizing everything. Accepted as CLI args OR env vars, e.g.:
//   npm run seed:tts -- --topic g1-oqish-19            (only that lesson)
//   npm run seed:passages -- --topic g1-oqish-19       (only its read-along)
//   npm run seed:tts -- --only oqish                   (only Oʻqish)
const ARGV = process.argv.slice(2);
function argVal(name) {
  const eq = ARGV.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.slice(name.length + 3);
  const i = ARGV.indexOf(`--${name}`);
  return i >= 0 && ARGV[i + 1] && !ARGV[i + 1].startsWith('--') ? ARGV[i + 1] : undefined;
}
function argFlag(name) {
  return ARGV.includes(`--${name}`) || process.env[`TTS_${name.replace(/-/g, '_').toUpperCase()}`] === '1';
}

const SUBJECT_ALIASES = { ona: 'g1-ona', oqish: 'g1-oqish', math: 'g1-math', tabiiy: 'g1-tabiiy', alifbe: 'g1-alifbe', informatika: 'g1-informatika', ingliz: 'g1-ingliz', tarbiya: 'g1-tarbiya' };
const onlyRaw = argVal('only') || process.env.TTS_ONLY;
const ONLY_SUBJECT = onlyRaw ? Object.entries(SUBJECT_ALIASES).find(([k]) => onlyRaw.includes(k))?.[1] ?? null : null;

// --topic g1-oqish-19  (comma-separated ok) → restrict to these lesson topicIds
const TOPIC_FILTER = (argVal('topic') || process.env.TTS_TOPIC || '').split(',').map((s) => s.trim()).filter(Boolean);
const inTopicFilter = (id) => TOPIC_FILTER.length === 0 || TOPIC_FILTER.includes(id);

// --passages-only = only read-along (karaoke) clips; --recall-only = only recall
const PASSAGES_ONLY = argFlag('passages-only');
const RECALL_ONLY = argFlag('recall-only');

// xml:lang for the Azure SSML is the voice's locale prefix, e.g. uz-UZ-MadinaNeural → uz-UZ
function voiceLocale(voice) {
  const m = voice.match(/^([a-z]{2,3}-[A-Z]{2})/);
  return m ? m[1] : 'uz-UZ';
}
const AZ_XML_LANG = voiceLocale(AZ_VOICE);

// ---- text helpers (shared) ---------------------------------------------------
// The TTS voices read letters, not digits or math symbols. Instead of STRIPPING
// "10 + 3 = 13" (which makes the voice skip it), we VERBALIZE it into spoken
// words — "oʻn qoʻshish uch teng oʻn uch" — so the audio speaks the numbers and
// operators while the on-screen text keeps its clean digit form.

const NUM = {
  uz: {
    ones: ['nol', 'bir', 'ikki', 'uch', 'toʻrt', 'besh', 'olti', 'yetti', 'sakkiz', 'toʻqqiz'],
    tens: ['', 'oʻn', 'yigirma', 'oʻttiz', 'qirq', 'ellik', 'oltmish', 'yetmish', 'sakson', 'toʻqson']
  },
  ru: {
    ones: ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
    teens: ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'],
    tens: ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
    hundreds: ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']
  },
  en: {
    ones: ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    teens: ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'],
    tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
  }
};

function numToWords(n, lang) {
  const T = NUM[lang] || NUM.uz;
  if (n < 0) return String(n);
  if (n < 10) return T.ones[n];
  if (n < 20) {
    if (lang === 'uz') return n === 10 ? 'oʻn' : `oʻn ${T.ones[n - 10]}`;
    return T.teens[n - 10];
  }
  if (n < 100) {
    const t = Math.floor(n / 10), u = n % 10;
    return T.tens[t] + (u ? ' ' + T.ones[u] : '');
  }
  if (n < 1000) {
    const h = Math.floor(n / 100), rem = n % 100;
    let head;
    if (lang === 'uz') head = (h > 1 ? T.ones[h] + ' ' : '') + 'yuz';
    else if (lang === 'ru') head = T.hundreds[h];
    else head = T.ones[h] + ' hundred';
    return head + (rem ? ' ' + numToWords(rem, lang) : '');
  }
  return String(n);
}

const OPS = {
  uz: { '+': 'qoʻshish', '−': 'ayirish', '=': 'teng', '×': 'koʻpaytirish', '÷': 'boʻlish', '<': 'kichik', '>': 'katta', '%': 'foiz' },
  ru: { '+': 'плюс', '−': 'минус', '=': 'равно', '×': 'умножить', '÷': 'разделить', '<': 'меньше', '>': 'больше', '%': 'процент' },
  en: { '+': 'plus', '−': 'minus', '=': 'equals', '×': 'times', '÷': 'divided by', '<': 'less than', '>': 'greater than', '%': 'percent' }
};

const UNITS = {
  uz: { cm: 'santimetr', sm: 'santimetr', dm: 'detsimetr', mm: 'millimetr', km: 'kilometr', kg: 'kilogramm' },
  ru: { cm: 'сантиметр', sm: 'сантиметр', dm: 'дециметр', mm: 'миллиметр', km: 'километр', kg: 'килограмм' },
  en: { cm: 'centimetre', sm: 'centimetre', dm: 'decimetre', mm: 'millimetre', km: 'kilometre', kg: 'kilogram' }
};
const UNIT_RE = /\b(cm|sm|dm|mm|km|kg)\b/gi;

/** Convert digits + math symbols to spoken words, then keep only speakable text. */
function verbalize(s, lang) {
  const op = OPS[lang] || OPS.uz;
  const unit = UNITS[lang] || UNITS.uz;
  return s
    .replace(/\(\s*(?:cm|sm|dm|mm|km|kg)\s*\)/gi, ' ')
    .replace(UNIT_RE, (m) => ` ${unit[m.toLowerCase()]} `)
    .replace(/(\d)\s*[-–−]\s*(\d)/g, `$1 ${op['−']} $2`)
    .replace(/(\d)\s*÷\s*(\d)/g, `$1 ${op['÷']} $2`)
    .replace(/(\d)\s*[*×]\s*(\d)/g, `$1 ${op['×']} $2`)
    .replace(/\s*\+\s*/g, ` ${op['+']} `)
    .replace(/\s*=\s*/g, ` ${op['=']} `)
    .replace(/\s*<\s*/g, ` ${op['<']} `)
    .replace(/\s*>\s*/g, ` ${op['>']} `)
    .replace(/\s*%\s*/g, ` ${op['%']} `)
    .replace(/[‒–—―:-]/g, ' , ')
    .replace(/\d+/g, (m) => numToWords(parseInt(m, 10), lang))
    .replace(/[^\p{L}\s.,]/gu, ' ')
    .replace(/\s+([.,])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---- Azure (Math) provider ---------------------------------------------------
const AZ_RATE = process.env.AZURE_SPEECH_RATE || '+4%';
const AZ_PITCH = process.env.AZURE_SPEECH_PITCH || '+12%';

function azureSsml(text) {
  const body = xmlEscape(text)
    .replace(/\. /g, '.<break strength="weak"/> ')
    .replace(/, /g, ',<break strength="x-weak"/> ');
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${AZ_XML_LANG}">`
    + `<voice name="${AZ_VOICE}"><prosody rate="${AZ_RATE}" pitch="${AZ_PITCH}">${body}</prosody></voice></speak>`;
}

function azureConfig() {
  if (!AZ_KEY || (!AZ_REGION && !AZ_ENDPOINT)) {
    throw new Error('Missing Azure Speech config (AZURE_SPEECH_KEY and AZURE_SPEECH_REGION or AZURE_SPEECH_ENDPOINT).');
  }
  const cfg = AZ_REGION
    ? sdk.SpeechConfig.fromSubscription(AZ_KEY, AZ_REGION)
    : sdk.SpeechConfig.fromEndpoint(new URL(AZ_ENDPOINT), AZ_KEY);
  cfg.speechSynthesisVoiceName = AZ_VOICE;
  cfg.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;
  return cfg;
}

function azureSynth(text) {
  return new Promise((resolve, reject) => {
    const synthesizer = new sdk.SpeechSynthesizer(azureConfig(), null);
    synthesizer.speakSsmlAsync(
      azureSsml(text),
      (result) => {
        try {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) resolve(Buffer.from(result.audioData));
          else reject(new Error(result.errorDetails || `synthesis failed (reason ${result.reason})`));
        } finally {
          synthesizer.close();
        }
      },
      (err) => {
        synthesizer.close();
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    );
  });
}

// ---- Gemini (Ona) provider — @google/genai, Vertex ADC (gcloud) or API key ---
let genAI = null;
async function getGenAI() {
  if (genAI) return genAI;
  let mod;
  try {
    mod = await import('@google/genai');
  } catch {
    throw new Error("Package '@google/genai' is not installed. Run: npm install");
  }
  const { GoogleGenAI } = mod;
  if (GEMINI_API_KEY) {
    genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY }); // Gemini API (key) mode
  } else {
    if (!G_PROJECT) {
      throw new Error(
        'No Google project/credentials found for Gemini TTS (Vertex).\n' +
          '   Fix (matches the setup that worked before): create a service-account key and\n' +
          '   save it as gcloud-tts.json in the project root:\n' +
          '     gcloud iam service-accounts keys create gcloud-tts.json \\\n' +
          '       --iam-account=tts-service@<PROJECT>.iam.gserviceaccount.com\n' +
          '   (the script auto-detects it and reads the project id from it), OR set\n' +
          '   GOOGLE_CLOUD_PROJECT in .env, OR set GEMINI_API_KEY to use the API-key path.'
      );
    }
    genAI = new GoogleGenAI({ vertexai: true, project: G_PROJECT, location: G_LOCATION });
  }
  return genAI;
}

/** Wrap raw little-endian PCM (Gemini returns 16-bit mono) in a RIFF/WAV header. */
function pcmToWav(pcm, sampleRate = 24000, channels = 1, bits = 16) {
  const blockAlign = (channels * bits) / 8;
  const byteRate = sampleRate * blockAlign;
  const h = Buffer.alloc(44);
  h.write('RIFF', 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write('WAVE', 8);
  h.write('fmt ', 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); // PCM
  h.writeUInt16LE(channels, 22);
  h.writeUInt32LE(sampleRate, 24);
  h.writeUInt32LE(byteRate, 28);
  h.writeUInt16LE(blockAlign, 32);
  h.writeUInt16LE(bits, 34);
  h.write('data', 36);
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

/** Synthesize one clip and return the RAW PCM (needed to concatenate passages).
 *  `style` is an optional natural-language delivery instruction (Gemini TTS is
 *  styled by prompt, e.g. "Read aloud in a warm, welcoming tone"); it steers the
 *  voice and is NOT spoken. */
async function geminiSynthPcm(text, style, voice = GEMINI_VOICE) {
  const ai = await getGenAI();
  const basePrompt = style ? `${style}:\n\n${text}` : text;
  const mkReq = (promptText) => ({
    model: GEMINI_MODEL,
    contents: [{ role: 'user', parts: [{ text: promptText }] }],
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } }
    }
  });
  // Retry on 429 / RESOURCE_EXHAUSTED (per-minute quota) AND on an empty
  // "no audio" response. The empty case happens intermittently for short lines:
  // Gemini occasionally returns a text part instead of audio. Re-issuing with an
  // explicit "read aloud" instruction (and dropping the style prefix) reliably
  // yields audio, so short prompts like "Be gentle, please." no longer fail.
  let audio;
  for (let attempt = 0; ; attempt++) {
    const promptText = attempt === 0 ? basePrompt : `Read this text aloud, clearly and naturally. Say only the words:\n\n${text}`;
    try {
      const resp = await ai.models.generateContent(mkReq(promptText));
      const parts = resp?.candidates?.[0]?.content?.parts || [];
      audio = parts.find((p) => p.inlineData?.data);
      if (audio) break;
      if (attempt < 4) {
        const wait = 1500 * (attempt + 1); // 1.5s, 3s, 4.5s, 6s
        console.warn(`   ↻ empty audio response — retrying in ${wait / 1000}s (${attempt + 1}/4)…`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw new Error('no audio in Gemini response (check model name / voice / access)');
    } catch (e) {
      const msg = String(e?.message || e);
      if (/\b429\b|RESOURCE_EXHAUSTED|quota/i.test(msg) && attempt < 5) {
        const wait = Math.min(60000, 2000 * 2 ** attempt); // 2s, 4s, 8s, 16s, 32s
        console.warn(`   ⏳ quota hit — waiting ${wait / 1000}s then retry (${attempt + 1}/5)…`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw e;
    }
  }
  const mime = audio.inlineData.mimeType || '';
  const rateM = mime.match(/rate=(\d+)/);
  const rate = rateM ? parseInt(rateM[1], 10) : 24000;
  const pcm = Buffer.from(audio.inlineData.data, 'base64');
  return { pcm, rate };
}

async function geminiSynth(text, voice = GEMINI_VOICE, style) {
  const { pcm, rate } = await geminiSynthPcm(text, style, voice);
  return pcmToWav(pcm, rate, 1, 16);
}

/** A buffer of digital silence (16-bit mono) of the given length in seconds. */
function silencePcm(rate, seconds) {
  return Buffer.alloc(Math.max(0, Math.round(rate * seconds)) * 2);
}

// ---- lesson discovery --------------------------------------------------------
function findLessons(dir) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...findLessons(p));
    else if (/^topic\d+\.json$/.test(ent.name)) out.push(p);
  }
  return out;
}

/** Subject key for a lesson → decides the TTS provider. */
function subjectOf(lesson) {
  const k = lesson.subjectKey;
  if (k === 'g1-ona' || k === 'g1-math' || k === 'g1-oqish' || k === 'g1-tabiiy' || k === 'g1-alifbe' || k === 'g1-informatika' || k === 'g1-ingliz' || k === 'g1-tarbiya') return k;
  const id = String(lesson.topicId || '');
  if (id.startsWith('g1-ona')) return 'g1-ona';
  if (id.startsWith('g1-oqish')) return 'g1-oqish';
  if (id.startsWith('g1-tabiiy')) return 'g1-tabiiy';
  if (id.startsWith('g1-alifbe')) return 'g1-alifbe';
  if (id.startsWith('g1-informatika')) return 'g1-informatika';
  if (id.startsWith('g1-tarbiya')) return 'g1-tarbiya';
  if (id.startsWith('g1-ingliz')) return 'g1-ingliz';
  return 'g1-math';
}
/** Subjects read by Gemini (natural Uzbek voice). Everything else → Azure. */
const GEMINI_SUBJECTS = new Set(['g1-ona', 'g1-oqish', 'g1-tabiiy', 'g1-alifbe', 'g1-informatika', 'g1-ingliz', 'g1-tarbiya']);

// ---- run ---------------------------------------------------------------------
const manifestPath = join(outDir, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

const lessonPaths = findLessons(contentRoot).sort();
console.log(
  `🔊 TTS seed · ${lessonPaths.length} lesson(s) · Math→Azure(${AZ_VOICE}) · Ona→Gemini(${GEMINI_MODEL}/${GEMINI_VOICE}) · ${ONLY_LOCALE} only`
);
const geminiAuth = GEMINI_API_KEY
  ? 'API key'
  : KEY_FILE
    ? `key file ${KEY_FILE.replace(root + '/', '').replace(root + '\\', '')}`
    : G_PROJECT
      ? 'ADC (gcloud)'
      : 'NONE ✗';
console.log(`   Gemini auth: ${geminiAuth} · project: ${G_PROJECT || '(unset)'} · location: ${G_LOCATION}`);
if (ONLY_SUBJECT) console.log(`   (restricted to subject ${ONLY_SUBJECT})`);
if (TOPIC_FILTER.length) console.log(`   (restricted to topic(s): ${TOPIC_FILTER.join(', ')})`);
if (PASSAGES_ONLY) console.log('   (read-along passages only — recall clips skipped)');
if (RECALL_ONLY) console.log('   (recall clips only — read-along passages skipped)');

let made = 0, kept = 0, failed = 0;

for (const lpath of lessonPaths) {
  const lesson = JSON.parse(readFileSync(lpath, 'utf8'));
  const subject0 = lesson?.topicId ? subjectOf(lesson) : null;
  // Ingliz tili: the intro/recall clip is ENGLISH (played for every UI lang).
  const loc = subject0 === 'g1-ingliz' ? 'en' : ONLY_LOCALE;
  if (!lesson?.topicId || !lesson?.recall?.[loc]) continue; // skip non-lesson json
  if (lesson.skipRecall) continue; // recall screen is hidden → no recall clip needed
  if (PASSAGES_ONLY || !inTopicFilter(lesson.topicId)) continue;

  const subject = subject0;
  if (ONLY_SUBJECT && subject !== ONLY_SUBJECT) continue;

  const provider = GEMINI_SUBJECTS.has(subject) ? 'gemini' : 'azure';
  const voice =
    subject === 'g1-ingliz' ? EN_VOICES.teacher : provider === 'gemini' ? (SUBJECT_VOICE[subject] || GEMINI_VOICE) : AZ_VOICE;
  const style = subject === 'g1-ingliz' ? EN_STYLES.teacher : (SUBJECT_STYLE[subject] || undefined);

  const raw = lesson.ttsText?.[loc] || `${lesson.title[loc]}. ${lesson.recall[loc]}`;
  const text = verbalize(raw, loc);
  if (raw.length > 300) console.warn(`⚠️  ${lesson.topicId}: explanation is ${raw.length} chars (>300) — consider shortening.`);

  const file = `${lesson.topicId}.${loc}.wav`;
  // Model is part of the identity → changing the Gemini model (e.g. 2.5 → 3.1)
  // invalidates the cache so every Ona/Oʻqish clip is re-synthesized.
  const model = provider === 'gemini' ? GEMINI_MODEL : 'azure';
  const hash = createHash('sha256').update(`${loc}|${provider}|${voice}|${model}|${style || ''}|${text}`).digest('hex');
  const exists = existsSync(join(outDir, file));
  const m = manifest[file];

  // ---- decide whether to (re)generate ----
  let need;
  if (provider === 'azure') {
    // Math: fill missing only; never overwrite unless explicitly forced.
    need = !exists || (FORCE_MATH && m?.hash !== hash) || (FORCE_MATH && !m);
  } else {
    // Ona/Gemini: (re)generate if missing, not-yet-Gemini, or text/voice changed;
    // FORCE_ONA re-makes even a matching Gemini clip.
    need = !exists || m?.provider !== 'gemini' || m?.hash !== hash || FORCE_ONA;
  }

  if (!need) {
    kept++;
    continue;
  }

  const why = !exists ? 'missing' : m?.provider && m.provider !== provider ? `was ${m.provider}` : 'changed/forced';
  try {
    console.log(`🎙  ${file} · ${provider}(${voice}) · ${why}…`);
    const wav = provider === 'gemini' ? await geminiSynth(text, voice, style) : await azureSynth(text);
    writeFileSync(join(outDir, file), wav);
    manifest[file] = { hash, provider, voice, bytes: wav.length, at: new Date().toISOString() };
    console.log(`   ✓ ${(wav.length / 1024).toFixed(0)} KB`);
    made++;
  } catch (e) {
    console.error(`   ✗ ${file}: ${e.message}`);
    failed++;
    process.exitCode = 1;
  }
}

// ---- reading-passage karaoke pass (Oʻqish savodxonligi) ---------------------
// For every `karaoke_reading` item that carries an `audio` key, synthesize EACH
// line as its own Gemini clip (voice Charon reads Uzbek naturally), measure its
// exact duration, glue the clips into one .wav with a short pause between lines,
// and write a timings sidecar so the app can highlight line-by-line with zero
// drift. Empty "" lines (poem stanza gaps) become zero-duration segments so the
// sidecar stays index-aligned with the component's `lines` array.
const PASSAGE_GAP = 0.15; // seconds of silence between lines (small → less choppy)
// Style instruction sent WITH each passage line. Gemini TTS is styled via a
// natural-language prompt (not a separate field), so without this the voice is
// flatter than the AI-Studio playground. Matches the playground's default.
const PASSAGE_STYLE = process.env.GEMINI_TTS_STYLE ?? 'Read aloud in a warm, welcoming tone';
let pMade = 0, pKept = 0, pFailed = 0;

async function synthPassage(topicId, key, lines, voice = GEMINI_VOICE) {
  const clean = lines.map((l) => String(l ?? '').trim());
  const hash = createHash('sha256').update(`passage|gemini|${GEMINI_MODEL}|${voice}|${PASSAGE_STYLE}|${PASSAGE_GAP}|w2|${JSON.stringify(clean)}`).digest('hex');
  const wavName = `${key}.uz.wav`;
  const jsonName = `${key}.uz.json`;
  const manKey = `passages/${wavName}`;
  const exists = existsSync(join(passagesDir, wavName)) && existsSync(join(passagesDir, jsonName));
  const m = manifest[manKey];
  if (exists && m?.hash === hash && !FORCE_ONA) {
    pKept++;
    return;
  }

  console.log(`🎙  passages/${wavName} · gemini(${voice}) · ${clean.filter(Boolean).length} line(s)…`);
  const chunks = [];
  const segs = [];
  let rate = 24000;
  let cursor = 0;
  for (const line of clean) {
    if (!line) {
      segs.push({ t: +cursor.toFixed(3), d: 0 }); // stanza gap — no audio
      continue;
    }
    const { pcm, rate: r } = await geminiSynthPcm(line, PASSAGE_STYLE, voice);
    rate = r;
    const dur = pcm.length / (r * 2); // 16-bit mono → 2 bytes/sample
    // Distribute the line's EXACT duration across its words by length, giving a
    // word-by-word highlight anchored to the exact line boundary (drift stays
    // sub-word and resets every line). Word offsets are relative to line start.
    const wordsArr = line.split(/\s+/).filter(Boolean);
    const totalLen = wordsArr.reduce((s, w) => s + w.length, 0) || 1;
    let wt = 0;
    const words = wordsArr.map((w) => {
      const wd = dur * (w.length / totalLen);
      const seg = { t: +wt.toFixed(3), d: +wd.toFixed(3) };
      wt += wd;
      return seg;
    });
    segs.push({ t: +cursor.toFixed(3), d: +(dur + PASSAGE_GAP).toFixed(3), words });
    chunks.push(pcm, silencePcm(r, PASSAGE_GAP));
    cursor += dur + PASSAGE_GAP;
  }
  const wav = pcmToWav(Buffer.concat(chunks), rate, 1, 16);
  writeFileSync(join(passagesDir, wavName), wav);
  writeFileSync(
    join(passagesDir, jsonName),
    JSON.stringify({ file: wavName, dur: +cursor.toFixed(3), voice, provider: 'gemini', lines: segs }, null, 2)
  );
  manifest[manKey] = { hash, provider: 'gemini', voice, bytes: wav.length, dur: +cursor.toFixed(3), at: new Date().toISOString() };
  console.log(`   ✓ ${(wav.length / 1024).toFixed(0)} KB · ${cursor.toFixed(1)}s`);
  pMade++;
}

for (const lpath of lessonPaths) {
  const lesson = JSON.parse(readFileSync(lpath, 'utf8'));
  if (!Array.isArray(lesson?.items)) continue;
  if (RECALL_ONLY || !inTopicFilter(lesson.topicId)) continue;
  if (ONLY_SUBJECT && subjectOf(lesson) !== ONLY_SUBJECT) continue;
  for (const item of lesson.items) {
    const w = item?.widget;
    if (!w || w.type !== 'karaoke_reading') continue;
    const key = w.props?.audio;
    const lines = w.props?.lines;
    if (!key || !Array.isArray(lines) || !lines.length) continue;
    try {
      const pvoice = SUBJECT_VOICE[subjectOf(lesson)] || GEMINI_VOICE;
      await synthPassage(lesson.topicId, key, lines, pvoice);
    } catch (e) {
      console.error(`   ✗ passage ${key}: ${e.message}`);
      pFailed++;
      process.exitCode = 1;
    }
  }
}

// ---- Ingliz tili (English) question-clip pass --------------------------------
// Lessons under g1-ingliz carry `audio: { key, text, voice?, style? }` specs —
// on the item itself AND nested inside widget props (dialog_listen lines,
// color_mix rounds …). Every spec becomes ONE cached English clip:
//   public/audio/tts/en/<key>.wav
// `voice` is a ROLE (girl|boy|teacher|man) resolved through EN_VOICES, so the
// same dialog naturally alternates between a child and an adult voice.
const FORCE_INGLIZ = process.env.TTS_FORCE_INGLIZ === '1';
let eMade = 0, eKept = 0, eFailed = 0;

/** Recursively collect every `audio: {key, text}` object in a lesson's items. */
function collectEnAudio(node, out) {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    for (const v of node) collectEnAudio(v, out);
    return out;
  }
  const a = node.audio;
  if (a && typeof a === 'object' && typeof a.key === 'string' && typeof a.text === 'string') out.push(a);
  for (const [k, v] of Object.entries(node)) {
    if (k === 'audio') continue;
    collectEnAudio(v, out);
  }
  return out;
}

for (const lpath of lessonPaths) {
  const lesson = JSON.parse(readFileSync(lpath, 'utf8'));
  if (!lesson?.topicId || subjectOf(lesson) !== 'g1-ingliz') continue;
  if (PASSAGES_ONLY || !inTopicFilter(lesson.topicId)) continue;
  if (ONLY_SUBJECT && ONLY_SUBJECT !== 'g1-ingliz') continue;

  const specs = collectEnAudio(lesson.items, []);
  for (const spec of specs) {
    const role = spec.voice && EN_VOICES[spec.voice] ? spec.voice : 'teacher';
    const voice = EN_VOICES[role];
    const style = spec.style || EN_STYLES[role];
    const text = spec.text; // English is spoken as written (numbers are words already)
    const file = `${spec.key}.wav`;
    const manKey = `en/${file}`;
    const hash = createHash('sha256').update(`en|gemini|${voice}|${GEMINI_MODEL}|${style}|${text}`).digest('hex');
    const exists = existsSync(join(enDir, file));
    const m = manifest[manKey];
    if (exists && m?.hash === hash && !FORCE_INGLIZ) {
      eKept++;
      continue;
    }
    try {
      console.log(`🎙  en/${file} · gemini(${voice} · ${role}) · ${!exists ? 'missing' : 'changed/forced'}…`);
      const wav = await geminiSynth(text, voice, style);
      writeFileSync(join(enDir, file), wav);
      manifest[manKey] = { hash, provider: 'gemini', voice, role, bytes: wav.length, at: new Date().toISOString() };
      console.log(`   ✓ ${(wav.length / 1024).toFixed(0)} KB`);
      eMade++;
    } catch (e) {
      console.error(`   ✗ en/${file}: ${e.message}`);
      eFailed++;
      process.exitCode = 1;
    }
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(
  `✅ TTS seed finished · recall: ${made} made / ${kept} kept / ${failed} failed · ` +
    `passages: ${pMade} made / ${pKept} kept / ${pFailed} failed · ` +
    `english: ${eMade} made / ${eKept} kept / ${eFailed} failed. Clips are cached — the app never synthesizes at runtime.`
);
// (end of seed script)
