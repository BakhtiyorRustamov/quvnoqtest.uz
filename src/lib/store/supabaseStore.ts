import 'server-only';
import { cookies } from 'next/headers';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { randomBytes, randomUUID } from 'node:crypto';
import {
  type QTStore,
  type UserRecord,
  type ProgressRow,
  makePublicId,
  namesMatch
} from './types';

const DEVICE_COOKIE = 'qt_device';
const MAX_AGE = 60 * 60 * 24 * 365;

let client: SupabaseClient | null = null;
function sb(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  }
  return client;
}

function rowToUser(r: any): UserRecord {
  return {
    id: r.id,
    publicId: r.public_id,
    grade: r.grade,
    locale: r.locale,
    name: r.name,
    phone: r.phone,
    email: r.email,
    paidUntil: r.paid_until,
    createdAt: r.created_at
  };
}

async function deviceToken(): Promise<string | undefined> {
  return (await cookies()).get(DEVICE_COOKIE)?.value;
}

async function setDeviceToken(token: string): Promise<void> {
  (await cookies()).set(DEVICE_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE
  });
}

async function currentUser(): Promise<UserRecord | null> {
  const token = await deviceToken();
  if (!token) return null;
  const { data } = await sb().from('users').select('*').eq('device_token', token).maybeSingle();
  return data ? rowToUser(data) : null;
}

export function supabaseStore(): QTStore {
  return {
    mode: 'supabase',

    getCurrent: currentUser,

    async ensureUser(init) {
      const existing = await currentUser();
      if (existing) return existing;
      const token = randomBytes(24).toString('base64url');
      const row = {
        id: randomUUID(),
        public_id: makePublicId(),
        grade: init.grade,
        locale: init.locale,
        device_token: token
      };
      const { data, error } = await sb().from('users').insert(row).select('*').single();
      if (error) throw error;
      await setDeviceToken(token);
      return rowToUser(data);
    },

    async updateUser(patch) {
      const u = await currentUser();
      if (!u) return null;
      const row: Record<string, unknown> = {};
      if (patch.grade !== undefined) row.grade = patch.grade;
      if (patch.locale !== undefined) row.locale = patch.locale;
      if (patch.name !== undefined) row.name = patch.name;
      if (patch.phone !== undefined) row.phone = patch.phone;
      const { data, error } = await sb().from('users').update(row).eq('id', u.id).select('*').single();
      if (error) throw error;
      return rowToUser(data);
    },

    async setPaid(days) {
      const u = await currentUser();
      if (!u) return null;
      const paidUntil = new Date(Date.now() + days * 86400_000).toISOString();
      const { data, error } = await sb()
        .from('users')
        .update({ paid_until: paidUntil })
        .eq('id', u.id)
        .select('*')
        .single();
      if (error) throw error;
      return rowToUser(data);
    },

    async listProgress() {
      const u = await currentUser();
      if (!u) return [];
      const { data } = await sb().from('progress').select('*').eq('user_id', u.id);
      return (data ?? []).map(
        (r: any): ProgressRow => ({
          subjectKey: r.subject_key,
          topicKey: r.topic_key,
          status: r.status,
          score: r.score,
          completedAt: r.completed_at
        })
      );
    },

    async saveProgress({ subjectKey, topicKey, score, answers }) {
      const u = await currentUser();
      if (!u) return;
      const { data: prev } = await sb()
        .from('progress')
        .select('id, score')
        .eq('user_id', u.id)
        .eq('topic_key', topicKey)
        .maybeSingle();
      if (prev) {
        await sb()
          .from('progress')
          .update({
            status: 'completed',
            score: Math.max(prev.score ?? 0, score),
            completed_at: new Date().toISOString()
          })
          .eq('id', prev.id);
      } else {
        await sb().from('progress').insert({
          user_id: u.id,
          subject_key: subjectKey,
          topic_key: topicKey,
          status: 'completed',
          score,
          completed_at: new Date().toISOString()
        });
      }
      await sb().from('quiz_attempts').insert({
        user_id: u.id,
        topic_key: topicKey,
        answers,
        score
      });
    },

    async getAiUsage(date) {
      const u = await currentUser();
      if (!u) return { messages: 0, tokens: 0 };
      const { data } = await sb()
        .from('ai_usage')
        .select('*')
        .eq('user_id', u.id)
        .eq('usage_date', date)
        .maybeSingle();
      return { messages: data?.message_count ?? 0, tokens: data?.tokens_used ?? 0 };
    },

    async addAiUsage(date, messages, tokens) {
      const u = await currentUser();
      if (!u) return;
      const cur = await this.getAiUsage(date);
      await sb().from('ai_usage').upsert(
        {
          user_id: u.id,
          usage_date: date,
          message_count: cur.messages + messages,
          tokens_used: cur.tokens + tokens
        },
        { onConflict: 'user_id,usage_date' }
      );
    },

    async createMagicLink(email) {
      const u = await currentUser();
      const token = randomBytes(24).toString('base64url');
      const { error } = await sb().from('magic_links').insert({
        token,
        email,
        user_id: u?.id ?? null,
        expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      });
      if (error) throw error;
      return { token };
    },

    /**
     * Claim/merge rule (SRS §6.6.2, recommended option): if the email already
     * has a canonical account, keep it and migrate this device's progress into
     * it; otherwise attach the email to the device's silent record. Never
     * destroys progress.
     */
    async claimMagicLink(token) {
      const { data: link } = await sb()
        .from('magic_links')
        .select('*')
        .eq('token', token)
        .is('consumed_at', null)
        .maybeSingle();
      if (!link || new Date(link.expires_at).getTime() < Date.now()) return false;

      const { data: canonicalRow } = await sb()
        .from('users')
        .select('*')
        .eq('email', link.email)
        .maybeSingle();

      const deviceUser = await currentUser();
      let newToken = await deviceToken();
      if (!newToken) {
        newToken = randomBytes(24).toString('base64url');
      }

      if (canonicalRow) {
        // migrate device progress into canonical account (keep best score)
        if (deviceUser && deviceUser.id !== canonicalRow.id) {
          const { data: devProg } = await sb().from('progress').select('*').eq('user_id', deviceUser.id);
          for (const r of devProg ?? []) {
            const { data: exist } = await sb()
              .from('progress')
              .select('id, score')
              .eq('user_id', canonicalRow.id)
              .eq('topic_key', r.topic_key)
              .maybeSingle();
            if (!exist) {
              await sb().from('progress').insert({
                user_id: canonicalRow.id,
                subject_key: r.subject_key,
                topic_key: r.topic_key,
                status: r.status,
                score: r.score,
                completed_at: r.completed_at
              });
            } else if ((exist.score ?? 0) < (r.score ?? 0)) {
              await sb().from('progress').update({ score: r.score }).eq('id', exist.id);
            }
          }
        }
        await sb().from('users').update({ device_token: newToken }).eq('id', canonicalRow.id);
      } else if (link.user_id) {
        await sb().from('users').update({ email: link.email, device_token: newToken }).eq('id', link.user_id);
      } else if (deviceUser) {
        await sb().from('users').update({ email: link.email }).eq('id', deviceUser.id);
      } else {
        // brand-new visitor following a link with no prior record
        await sb().from('users').insert({
          id: randomUUID(),
          public_id: makePublicId(),
          grade: 1,
          locale: 'uz',
          email: link.email,
          device_token: newToken
        });
      }

      await setDeviceToken(newToken);
      await sb().from('magic_links').update({ consumed_at: new Date().toISOString() }).eq('token', token);
      return true;
    },

    async findChild(publicId, name) {
      const { data } = await sb().from('users').select('*').eq('public_id', publicId).maybeSingle();
      if (!data) return null;
      const user = rowToUser(data);
      if (!namesMatch(user.name, name)) return null;
      const { data: prog } = await sb().from('progress').select('*').eq('user_id', user.id);
      const progress = (prog ?? []).map(
        (r: any): ProgressRow => ({
          subjectKey: r.subject_key,
          topicKey: r.topic_key,
          status: r.status,
          score: r.score,
          completedAt: r.completed_at
        })
      );
      return { user, progress };
    }
  };
}
