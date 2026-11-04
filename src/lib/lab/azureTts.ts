import 'server-only';
import { azureSpeech } from './server';

/** Default Azure neural voices for recorded lessons (narrator and "Tushunmadim"). */
export const AZURE_DEFAULT: Record<string, string> = {
  ru: 'ru-RU-DmitryNeural',
  en: 'en-GB-RyanNeural',
  uz: 'uz-UZ-SardorNeural'
};

export const xmlEsc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

/** One spoken part of a clip: text in a voice, followed by a short pause. */
export type SsmlPart = { voice: string; text: string; pauseMs?: number };

export function ssml(parts: SsmlPart[], rate = -6): string {
  const r = `${rate >= 0 ? '+' : ''}${rate}%`;
  const body = parts
    .filter((p) => p.text.trim())
    .map((p) => `<voice name="${p.voice}"><prosody rate="${r}">${xmlEsc(p.text.replace(/[«»]/g, '"'))}</prosody><break time="${p.pauseMs ?? 450}ms"/></voice>`)
    .join('');
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">${body}</speak>`;
}

/** Azure AI Speech (free F0 tier: 0.5 M characters a month, 20 requests a minute). Returns an MP3. */
export async function azureSpeak(doc: string): Promise<{ ok: true; mp3: Buffer; ms: number } | { ok: false; error: string; status?: number }> {
  const az = azureSpeech();
  if (!az) return { ok: false, error: 'AZURE_SPEECH_KEY / AZURE_SPEECH_REGION not set' };
  const t0 = Date.now();
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`https://${az.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': az.key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent': 'quvnoqtest-lab'
        },
        body: doc,
        signal: AbortSignal.timeout(60_000)
      });
      if (res.status === 429) {
        // free tier: 20 requests a minute — wait and retry
        await new Promise((r) => setTimeout(r, 6000 * (attempt + 1)));
        continue;
      }
      if (!res.ok) return { ok: false, error: `azure ${res.status}: ${(await res.text().catch(() => '')).slice(0, 300)}`, status: res.status };
      return { ok: true, mp3: Buffer.from(await res.arrayBuffer()), ms: Date.now() - t0 };
    } catch (e) {
      if (attempt === 2) return { ok: false, error: `azure unreachable: ${(e as Error).message}` };
    }
  }
  return { ok: false, error: 'azure: too many requests, try again in a minute', status: 429 };
}
