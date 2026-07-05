import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { ProgressRow, UserRecord } from '@/lib/store/types';
import type { TgUser } from '@/lib/telegram';

/**
 * Parent-side data access (Supabase only): Telegram parents and their linked
 * children. In cookie/demo mode these helpers are unavailable and the parents
 * page falls back to per-device localStorage.
 */

export function parentsConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

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

export type ParentRecord = { id: string; telegramId: number; name: string | null; locale: string };

function rowToParent(r: any): ParentRecord {
  return { id: r.id, telegramId: r.telegram_id, name: r.name, locale: r.locale ?? 'uz' };
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

function rowToProgress(r: any): ProgressRow {
  return {
    subjectKey: r.subject_key,
    topicKey: r.topic_key,
    status: r.status,
    score: r.score,
    completedAt: r.completed_at
  };
}

/** Creates or refreshes the parent record for a validated Telegram user. */
export async function upsertTelegramParent(tg: TgUser): Promise<ParentRecord> {
  const name = [tg.first_name, tg.last_name].filter(Boolean).join(' ') || tg.username || null;
  const locale = ['uz', 'ru', 'en'].includes(tg.language_code ?? '') ? (tg.language_code as string) : 'uz';
  const { data, error } = await sb()
    .from('parents')
    .upsert(
      { telegram_id: tg.id, name, username: tg.username ?? null, locale },
      { onConflict: 'telegram_id' }
    )
    .select('*')
    .single();
  if (error) throw error;
  return rowToParent(data);
}

export async function getParent(parentId: string): Promise<ParentRecord | null> {
  const { data } = await sb().from('parents').select('*').eq('id', parentId).maybeSingle();
  return data ? rowToParent(data) : null;
}

export async function linkChild(parentId: string, childUserId: string): Promise<void> {
  await sb()
    .from('parent_children')
    .upsert({ parent_id: parentId, child_user_id: childUserId }, { onConflict: 'parent_id,child_user_id' });
}

export async function unlinkChild(parentId: string, childPublicId: string): Promise<void> {
  const { data: child } = await sb().from('users').select('id').eq('public_id', childPublicId).maybeSingle();
  if (!child) return;
  await sb().from('parent_children').delete().eq('parent_id', parentId).eq('child_user_id', child.id);
}

export type ChildWithProgress = { user: UserRecord; progress: ProgressRow[] };

/** All children linked to a parent, each with full progress rows. */
export async function listChildren(parentId: string): Promise<ChildWithProgress[]> {
  const { data: links } = await sb().from('parent_children').select('child_user_id').eq('parent_id', parentId);
  const ids = (links ?? []).map((l: any) => l.child_user_id);
  if (!ids.length) return [];
  const { data: users } = await sb().from('users').select('*').in('id', ids);
  const { data: prog } = await sb().from('progress').select('*').in('user_id', ids);
  return (users ?? []).map((u: any) => ({
    user: rowToUser(u),
    progress: (prog ?? []).filter((p: any) => p.user_id === u.id).map(rowToProgress)
  }));
}

/** Every parent with their children — used by the notification cron. */
export async function listAllParentsWithChildren(): Promise<
  { parent: ParentRecord; children: ChildWithProgress[] }[]
> {
  const { data: parents } = await sb().from('parents').select('*');
  if (!parents?.length) return [];
  const out: { parent: ParentRecord; children: ChildWithProgress[] }[] = [];
  for (const p of parents) {
    out.push({ parent: rowToParent(p), children: await listChildren(p.id) });
  }
  return out;
}
