import 'server-only';
import { sbAdmin, supabaseConfigured } from './supabaseAdmin';
import { adminChatId, sendDailyDigest } from './adminNotify';

/**
 * Builds and sends the owner's daily summary. Piggy-backs on the existing
 * 04:00 UTC (09:00 Tashkent) cron rather than adding a second schedule.
 *
 * Covers the previous 24 hours: how many subscriptions were sold, split by
 * card, so the numbers can be checked against the two banking apps.
 */
export async function sendAdminDigest(): Promise<boolean> {
  if (!supabaseConfigured() || !adminChatId()) return false;

  const sb = sbAdmin();
  const since = new Date(Date.now() - 86400_000).toISOString();

  const [{ data: payments }, { count: newUsers }] = await Promise.all([
    sb.from('payments').select('amount, card_target, status, check_score').gte('created_at', since),
    sb.from('users').select('id', { count: 'exact', head: true }).gte('created_at', since)
  ]);

  const rows = payments ?? [];
  const live = rows.filter((p) => p.status !== 'rejected');

  const sum = (card: string) =>
    live.filter((p) => p.card_target === card).reduce((s, p) => s + (Number(p.amount) || 0), 0);
  const count = (card: string) => live.filter((p) => p.card_target === card).length;

  // Nothing happened — stay quiet rather than sending an empty report daily.
  if (live.length === 0 && (newUsers ?? 0) === 0) return false;

  return sendDailyDigest({
    date: new Date().toLocaleDateString('en-GB'),
    payments: live.length,
    humoCount: count('humo'),
    humoSum: sum('humo'),
    visaCount: count('visa_uzum'),
    visaSum: sum('visa_uzum'),
    flagged: live.filter((p) => p.status === 'needs_review').length,
    duplicatesBlocked: 0, // blocked duplicates never create a row; alerted live instead
    newUsers: newUsers ?? 0
  });
}
