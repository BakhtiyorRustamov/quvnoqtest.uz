import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Telegram bot helpers: Mini-App initData validation (per Telegram spec),
 * message sending, and the signed parent-session cookie value.
 */

export function botToken(): string | null {
  return process.env.TELEGRAM_BOT_TOKEN || null;
}
export function telegramConfigured(): boolean {
  return !!botToken();
}

export type TgUser = { id: number; first_name?: string; last_name?: string; username?: string; language_code?: string };

/**
 * Validates a Telegram Mini App `initData` string.
 * secret = HMAC_SHA256(key="WebAppData", data=botToken)
 * hash   = HMAC_SHA256(key=secret, data=data_check_string)
 * Returns the Telegram user on success, null otherwise.
 */
export function validateInitData(initData: string): TgUser | null {
  const token = botToken();
  if (!token || !initData || initData.length > 4096) return null;
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return null;
  params.delete('hash');
  const pairs = [...params.entries()].map(([k, v]) => `${k}=${v}`).sort();
  const dataCheck = pairs.join('\n');
  const secret = createHmac('sha256', 'WebAppData').update(token).digest();
  const expected = createHmac('sha256', secret).update(dataCheck).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(hash, 'utf8');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  // reject stale auth payloads (48h)
  const authDate = Number(params.get('auth_date') || 0);
  if (!authDate || Date.now() / 1000 - authDate > 48 * 3600) return null;
  try {
    const user = JSON.parse(params.get('user') || 'null') as TgUser | null;
    return user && typeof user.id === 'number' ? user : null;
  } catch {
    return null;
  }
}

/** Sends a plain-text (HTML-mode) message; never throws. Returns success. */
export async function sendTelegramMessage(chatId: number | string, text: string): Promise<boolean> {
  const token = botToken();
  if (!token) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true })
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ------------------- signed parent-session cookie value ------------------- */

const PARENT_COOKIE_NAME = 'qt_parent';
export { PARENT_COOKIE_NAME };

function sessionSecret(): string {
  return process.env.SESSION_SECRET || 'qt-dev-secret-change-me';
}

export function signParentSession(parentId: string): string {
  const sig = createHmac('sha256', sessionSecret()).update(`parent:${parentId}`).digest('base64url');
  return `${parentId}.${sig}`;
}

export function verifyParentSession(raw: string | undefined): string | null {
  if (!raw) return null;
  const i = raw.lastIndexOf('.');
  if (i <= 0) return null;
  const parentId = raw.slice(0, i);
  const sig = raw.slice(i + 1);
  const expected = createHmac('sha256', sessionSecret()).update(`parent:${parentId}`).digest('base64url');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(sig, 'utf8');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return parentId;
}
