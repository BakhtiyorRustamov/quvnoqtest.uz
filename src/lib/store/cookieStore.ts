import 'server-only';
import { cookies } from 'next/headers';
import { createHmac, randomUUID, randomBytes } from 'node:crypto';
import {
  type QTStore,
  type UserRecord,
  type ProgressRow,
  type AiUsage,
  makePublicId
} from './types';

/**
 * Zero-config fallback store: the whole user record + progress lives in ONE
 * signed, HTTP-only cookie. Good for local dev and demo deployments without a
 * database. Per-device only (magic links work on the same device).
 *
 * Next 15+/16: `cookies()` is async — all access is awaited here.
 */

const COOKIE = 'qt_sess';
const MAX_AGE = 60 * 60 * 24 * 365;

type SessData = {
  u: UserRecord;
  /** progress by topicKey */
  p: Record<string, ProgressRow>;
  /** AI usage for one Tashkent day */
  ai: { date: string; m: number; t: number };
  /** pending magic link (same-device claim) */
  ml?: { token: string; email: string; exp: number };
};

function secret(): string {
  return process.env.SESSION_SECRET || 'qt-dev-secret-change-me';
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

function encode(data: SessData): string {
  const payload = Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function decode(raw: string | undefined): SessData | null {
  if (!raw) return null;
  const i = raw.lastIndexOf('.');
  if (i < 0) return null;
  const payload = raw.slice(0, i);
  const sig = raw.slice(i + 1);
  if (sign(payload) !== sig) return null;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as SessData;
  } catch {
    return null;
  }
}

async function read(): Promise<SessData | null> {
  return decode((await cookies()).get(COOKIE)?.value);
}

async function write(data: SessData): Promise<void> {
  (await cookies()).set(COOKIE, encode(data), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE
  });
}

export function cookieStore(): QTStore {
  return {
    mode: 'cookie',

    async getCurrent() {
      return (await read())?.u ?? null;
    },

    async ensureUser(init) {
      const existing = await read();
      if (existing) return existing.u;
      const now = new Date().toISOString();
      const u: UserRecord = {
        id: randomUUID(),
        publicId: makePublicId(),
        grade: init.grade,
        locale: init.locale,
        name: null,
        phone: null,
        email: null,
        paidUntil: null,
        createdAt: now
      };
      await write({ u, p: {}, ai: { date: '', m: 0, t: 0 } });
      return u;
    },

    async updateUser(patch) {
      const s = await read();
      if (!s) return null;
      s.u = { ...s.u, ...patch };
      await write(s);
      return s.u;
    },

    async setPaid(days) {
      const s = await read();
      if (!s) return null;
      s.u.paidUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      await write(s);
      return s.u;
    },

    async listProgress() {
      const s = await read();
      return s ? Object.values(s.p) : [];
    },

    async saveProgress({ subjectKey, topicKey, score, answers }) {
      const s = await read();
      if (!s) return;
      const prev = s.p[topicKey];
      s.p[topicKey] = {
        subjectKey,
        topicKey,
        status: 'completed',
        score: prev ? Math.max(prev.score, score) : score,
        completedAt: new Date().toISOString(),
        answers
      };
      await write(s);
    },

    async getAiUsage(date): Promise<AiUsage> {
      const s = await read();
      if (!s || s.ai.date !== date) return { messages: 0, tokens: 0 };
      return { messages: s.ai.m, tokens: s.ai.t };
    },

    async addAiUsage(date, messages, tokens) {
      const s = await read();
      if (!s) return;
      if (s.ai.date !== date) s.ai = { date, m: 0, t: 0 };
      s.ai.m += messages;
      s.ai.t += tokens;
      await write(s);
    },

    async createMagicLink(email) {
      const s = await read();
      if (!s) return null;
      const token = randomBytes(24).toString('base64url');
      s.ml = { token, email, exp: Date.now() + 30 * 60 * 1000 };
      await write(s);
      return { token };
    },

    async claimMagicLink(token) {
      const s = await read();
      if (!s?.ml || s.ml.token !== token || s.ml.exp < Date.now()) return false;
      s.u.email = s.ml.email;
      delete s.ml;
      await write(s);
      return true;
    }
  };
}
