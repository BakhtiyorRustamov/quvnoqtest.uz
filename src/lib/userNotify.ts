import 'server-only';
import { sbAdmin } from './supabaseAdmin';
import { sendTelegramMessage, botToken } from './telegram';
import { esc } from './adminNotify';

/**
 * Tells a user their receipt was not confirmed.
 *
 * Three channels, best-effort and independent: an in-app banner (always
 * works, because it is just a row), a Telegram message to any linked parent,
 * and — if they claimed an email — nothing yet, since the app has no
 * transactional email beyond magic links. The banner is the reliable one.
 */
export async function notifyUserRejected(userId: string, note: string | null): Promise<void> {
  const sb = sbAdmin();

  const title = 'Chek tasdiqlanmadi';
  const body =
    note ??
    'Yuborgan chekingiz tasdiqlanmadi. Iltimos, toʻgʻri chek skrinshotini qayta yuboring yoki biz bilan bogʻlaning.';

  try {
    await sb.from('user_notices').insert({ user_id: userId, kind: 'payment_rejected', title, body });
  } catch {
    /* the notice is best-effort */
  }

  if (!botToken()) return;

  try {
    const { data: links } = await sb
      .from('parent_children')
      .select('parent_id')
      .eq('child_user_id', userId);
    if (!links?.length) return;

    const { data: parents } = await sb
      .from('parents')
      .select('telegram_id')
      .in('id', links.map((l) => l.parent_id));

    for (const p of parents ?? []) {
      if (p.telegram_id) {
        await sendTelegramMessage(
          p.telegram_id,
          `⚠️ <b>${esc(title)}</b>\n\n${esc(body)}`
        );
      }
    }
  } catch {
    /* notification failures must not roll back the admin action */
  }
}

/** Undismissed notices for the in-app banner. */
export async function getOpenNotices(userId: string) {
  const { data } = await sbAdmin()
    .from('user_notices')
    .select('id, kind, title, body, created_at')
    .eq('user_id', userId)
    .is('dismissed_at', null)
    .order('created_at', { ascending: false })
    .limit(3);
  return data ?? [];
}
