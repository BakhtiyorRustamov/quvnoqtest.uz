/**
 * One-time TTS seed (FR-TTS-3/4) — Google Cloud Text-to-Speech, Gemini-TTS.
 *
 * Synthesizes the RECALL block (the quiz "topic explanation") for every built
 * lesson and caches the clip as a static file. The app only ever serves these
 * cached files — it NEVER calls the TTS API at runtime, so there is no API key
 * or credential in the shipped app and no per-play cost.
 *
 *   Read-aloud is UZBEK ONLY (Russian/English clips are not generated — those
 *   locales have no read-aloud button).
 *
 *   Primary : model gemini-3.1-flash-tts-preview · voice Charon · en-US
 *   Fallback: model gemini-2.5-flash-tts         · voice Charon · tr-TR
 *             (used automatically if the preview model is unavailable)
 *
 * Auth: the Google service-account JSON the user downloaded (gcloud-tts.json).
 *   A short-lived OAuth token is minted from it at seed time only.
 *
 * Usage:  npm run seed:tts
 *   Optional env overrides:
 *     GCLOUD_TTS_KEY / GOOGLE_APPLICATION_CREDENTIALS  path to the SA json
 *     GEMINI_TTS_MODEL  GEMINI_TTS_VOICE  GEMINI_TTS_LANG
 *
 * Output: public/audio/tts/<topicId>.uz.wav + manifest.json
 *         (cache key = sha256 of locale+voice+model+lang+text → unchanged
 *          clips are skipped; nothing is synthesized twice)
 */
import { createHash, createSign } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const contentRoot = join(root, 'src', 'content');
const outDir = join(root, 'public', 'audio', 'tts');
mkdirSync(outDir, { recursive: true });

// ---- locate the service-account key -------------------------------------
const KEY_CANDIDATES = [
  process.env.GCLOUD_TTS_KEY,
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  join(root, 'gcloud-tts.json'),
  join(root, 'gcloud-tts.json.json')
].filter(Boolean);
const keyPath = KEY_CANDIDATES.find((p) => existsSync(p));
if (!keyPath) {
  console.error('✋ Service-account key not found. Looked for gcloud-tts.json (or set GCLOUD_TTS_KEY).');
  process.exit(1);
}
const SA = JSON.parse(readFileSync(keyPath, 'utf8'));

const MODEL = process.env.GEMINI_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
const FALLBACK_MODEL = 'gemini-2.5-flash-tts';
const VOICE = process.env.GEMINI_TTS_VOICE || 'Charon';
const LANG = process.env.GEMINI_TTS_LANG || 'en-US';
const FALLBACK_LANG = 'tr-TR';
const ONLY_LOCALE = 'uz'; // read-aloud is Uzbek only

// Warm, child-friendly delivery. No digits/symbols in the spoken text itself.
const STYLE_PROMPT =
  'You are a warm, friendly teacher reading to a six year old child. Read the following Uzbek text slowly, gently and clearly.';

// ---- helpers ------------------------------------------------------------
const b64url = (buf) =>
  Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Strip anything that makes Gemini-TTS switch languages: digits, math signs
 * and other symbols. Keep letters (incl. Uzbek oʻ/gʻ), spaces, period, comma.
 */
function ttsSafe(s) {
  return s
    .replace(/[‒–—―-]/g, ' ') // any dash → space
    .replace(/[0-9]/g, ' ')
    .replace(/[^\p{L}\s.,]/gu, ' ') // keep letters, whitespace, . and ,
    .replace(/\s+([.,])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({
      iss: SA.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: SA.token_uri,
      iat: now,
      exp: now + 3600
    })
  );
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = b64url(signer.sign(SA.private_key));
  const assertion = `${header}.${claim}.${signature}`;

  const res = await fetch(SA.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`token exchange failed (${res.status}): ${JSON.stringify(data).slice(0, 300)}`);
  }
  return data.access_token;
}

function wavFromPcm(pcm, sampleRate = 24000) {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

async function synth({ token, model, lang, text }) {
  const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-goog-user-project': SA.project_id,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: { prompt: STYLE_PROMPT, text },
      voice: { languageCode: lang, name: VOICE, model_name: model },
      audioConfig: { audioEncoding: 'LINEAR16' }
    })
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    const err = new Error(`HTTP ${res.status}: ${body.slice(0, 400)}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  if (!data.audioContent) throw new Error('no audioContent in response');
  let buf = Buffer.from(data.audioContent, 'base64');
  if (buf.subarray(0, 4).toString('ascii') !== 'RIFF') buf = wavFromPcm(buf, 24000);
  return buf;
}

// ---- run ----------------------------------------------------------------
const manifestPath = join(outDir, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

/** Recursively collect every lesson JSON (topicNN.json) anywhere under src/content. */
function findLessons(dir) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...findLessons(p));
    else if (/^topic\d+\.json$/.test(ent.name)) out.push(p);
  }
  return out;
}
const lessonPaths = findLessons(contentRoot).sort();
console.log(`🔊 Gemini-TTS seed · ${lessonPaths.length} lesson(s) · voice ${VOICE} · ${ONLY_LOCALE} only`);

let token;
try {
  token = await getAccessToken();
} catch (e) {
  console.error(`✗ could not authenticate with the service account: ${e.message}`);
  process.exit(1);
}

let model = MODEL;
let lang = LANG;

for (const lpath of lessonPaths) {
  const lesson = JSON.parse(readFileSync(lpath, 'utf8'));
  if (!lesson?.topicId || !lesson?.recall?.[ONLY_LOCALE]) continue; // skip any non-lesson json
  const raw = `${lesson.title[ONLY_LOCALE]}. ${lesson.recall[ONLY_LOCALE]}`;
  const text = ttsSafe(raw);
  if (text.length > 300) {
    console.warn(`⚠️  ${lesson.topicId}: explanation is ${text.length} chars (>300) — consider shortening.`);
  }
  const file = `${lesson.topicId}.${ONLY_LOCALE}.wav`;
  const hash = createHash('sha256').update(`${ONLY_LOCALE}|${VOICE}|${model}|${lang}|${text}`).digest('hex');
  // Keep existing clips: only generate MISSING ones. To regenerate a clip,
  // delete its .wav (or set TTS_FORCE=1 to re-make everything that changed).
  const force = process.env.TTS_FORCE === '1';
  if (existsSync(join(outDir, file)) && (!force || manifest[file]?.hash === hash)) {
    console.log(`↪︎ ${file} — kept (exists), skipping`);
    continue;
  }
  try {
    console.log(`🎙  ${file} (${model}, ${lang}, voice ${VOICE})…`);
    const wav = await synth({ token, model, lang, text });
    writeFileSync(join(outDir, file), wav);
    manifest[file] = { hash, model, voice: VOICE, lang, bytes: wav.length, at: new Date().toISOString() };
    console.log(`   ✓ ${(wav.length / 1024).toFixed(0)} KB`);
  } catch (e) {
    // Preview model unavailable → fall back to gemini-2.5-flash-tts in Turkish.
    if ((e.status === 404 || e.status === 400 || e.status === 403) && model !== FALLBACK_MODEL) {
      console.warn(`⚠️  model "${model}" / ${lang} unavailable (${e.status}) — falling back to ${FALLBACK_MODEL} / ${FALLBACK_LANG}`);
      model = FALLBACK_MODEL;
      lang = FALLBACK_LANG;
      const hash2 = createHash('sha256').update(`${ONLY_LOCALE}|${VOICE}|${model}|${lang}|${text}`).digest('hex');
      try {
        const wav = await synth({ token, model, lang, text });
        writeFileSync(join(outDir, file), wav);
        manifest[file] = { hash: hash2, model, voice: VOICE, lang, bytes: wav.length, at: new Date().toISOString() };
        console.log(`   ✓ ${(wav.length / 1024).toFixed(0)} KB (fallback)`);
      } catch (e2) {
        console.error(`   ✗ ${file}: ${e2.message}`);
        process.exitCode = 1;
      }
    } else {
      console.error(`   ✗ ${file}: ${e.message}`);
      process.exitCode = 1;
    }
  }
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('✅ TTS seed finished. Clips are cached — the app never synthesizes at runtime.');
