import 'server-only';
import { sbAdmin } from './supabaseAdmin';
import { signedReceiptUrl } from './payments';

/**
 * Read models and mutations for the admin panel.
 *
 * The panel's job is reconciliation, not per-receipt policing: the top-level
 * question is "does the money on my cards match what the app handed out this
 * month?". Everything else exists to answer that, or to fix an individual
 * account once the answer is no.
 */

export type MonthBucket = {
  month: string; // 'YYYY-MM'
  humoCount: number;
  humoSum: number;
  visaCount: number;
  visaSum: number;
  totalCount: number;
  totalSum: number;
  flagged: number;
  rejected: number;
};

export type Dashboard = {
  months: MonthBucket[];
  totals: { users: number; paidNow: number; flaggedOpen: number; payments30d: number; revenue30d: number };
  anomalies: {
    repeatPayers: { publicId: string; name: string | null; count: number }[];
    sharedIps: { ip: string; users: number }[];
    lowScores: number;
  };
};

const MONTHS_BACK = 12;

export async function getDashboard(): Promise<Dashboard> {
  const sb = sbAdmin();
  const since = new Date();
  since.setMonth(since.getMonth() - MONTHS_BACK);

  const { data: payments } = await sb
    .from('payments')
    .select('id, user_id, amount, card_target, status, check_score, ip, created_at')
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: false })
    .limit(20000);

  const rows = payments ?? [];
  const byMonth = new Map<string, MonthBucket>();

  for (const p of rows) {
    const month = String(p.created_at).slice(0, 7);
    let b = byMonth.get(month);
    if (!b) {
      b = {
        month,
        humoCount: 0,
        humoSum: 0,
        visaCount: 0,
        visaSum: 0,
        totalCount: 0,
        totalSum: 0,
        flagged: 0,
        rejected: 0
      };
      byMonth.set(month, b);
    }
    // Rejected payments are excluded from the expected-money totals: the point
    // of the table is what SHOULD be on the cards.
    if (p.status === 'rejected') {
      b.rejected++;
      continue;
    }
    const amount = Number(p.amount) || 0;
    if (p.card_target === 'humo') {
      b.humoCount++;
      b.humoSum += amount;
    } else {
      b.visaCount++;
      b.visaSum += amount;
    }
    b.totalCount++;
    b.totalSum += amount;
    if (p.status === 'needs_review') b.flagged++;
  }

  const nowIso = new Date().toISOString();
  const d30 = new Date(Date.now() - 30 * 86400_000).toISOString();

  const [{ count: users }, { count: paidNow }, { count: flaggedOpen }] = await Promise.all([
    sb.from('users').select('id', { count: 'exact', head: true }),
    sb.from('users').select('id', { count: 'exact', head: true }).gt('paid_until', nowIso),
    sb.from('payments').select('id', { count: 'exact', head: true }).eq('status', 'needs_review')
  ]);

  const recent = rows.filter((p) => p.created_at >= d30 && p.status !== 'rejected');

  // Anomalies — the signals worth looking at when the totals disagree.
  const perUser = new Map<string, number>();
  const perIp = new Map<string, Set<string>>();
  for (const p of recent) {
    perUser.set(p.user_id, (perUser.get(p.user_id) ?? 0) + 1);
    if (p.ip) {
      if (!perIp.has(p.ip)) perIp.set(p.ip, new Set());
      perIp.get(p.ip)!.add(p.user_id);
    }
  }

  const repeatIds = [...perUser.entries()].filter(([, c]) => c > 1).sort((a, b) => b[1] - a[1]).slice(0, 10);
  let repeatPayers: Dashboard['anomalies']['repeatPayers'] = [];
  if (repeatIds.length) {
    const { data: us } = await sb
      .from('users')
      .select('id, public_id, name')
      .in('id', repeatIds.map(([id]) => id));
    const map = new Map((us ?? []).map((u) => [u.id, u]));
    repeatPayers = repeatIds.map(([id, count]) => ({
      publicId: map.get(id)?.public_id ?? id.slice(0, 8),
      name: map.get(id)?.name ?? null,
      count
    }));
  }

  return {
    months: [...byMonth.values()].sort((a, b) => b.month.localeCompare(a.month)),
    totals: {
      users: users ?? 0,
      paidNow: paidNow ?? 0,
      flaggedOpen: flaggedOpen ?? 0,
      payments30d: recent.length,
      revenue30d: recent.reduce((s, p) => s + (Number(p.amount) || 0), 0)
    },
    anomalies: {
      repeatPayers,
      sharedIps: [...perIp.entries()]
        .filter(([, set]) => set.size > 1)
        .map(([ip, set]) => ({ ip, users: set.size }))
        .sort((a, b) => b.users - a.users)
        .slice(0, 10),
      lowScores: recent.filter((p) => (p.check_score ?? 100) < 55).length
    }
  };
}

export type PaymentRow = {
  id: string;
  createdAt: string;
  status: string;
  cardTarget: string;
  amount: number;
  score: number;
  reasons: string[];
  receiptUrl: string | null;
  adminNote: string | null;
  user: { id: string; publicId: string; name: string | null; phone: string | null; email: string | null; grade: number };
};

export async function listPayments(opts: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<PaymentRow[]> {
  const sb = sbAdmin();
  let q = sb
    .from('payments')
    .select(
      'id, created_at, status, card_target, amount, check_score, check_reasons, receipt_path, admin_note, user_id'
    )
    .order('created_at', { ascending: false })
    .range(opts.offset ?? 0, (opts.offset ?? 0) + (opts.limit ?? 50) - 1);

  if (opts.status && opts.status !== 'all') q = q.eq('status', opts.status);

  const { data } = await q;
  const rows = data ?? [];
  if (!rows.length) return [];

  const { data: users } = await sb
    .from('users')
    .select('id, public_id, name, phone, email, grade')
    .in('id', [...new Set(rows.map((r) => r.user_id))]);
  const umap = new Map((users ?? []).map((u) => [u.id, u]));

  return Promise.all(
    rows.map(async (r) => {
      const u = umap.get(r.user_id);
      const reasons = (r.check_reasons as { reasons?: string[] } | null)?.reasons ?? [];
      return {
        id: r.id,
        createdAt: r.created_at,
        status: r.status,
        cardTarget: r.card_target,
        amount: Number(r.amount) || 0,
        score: r.check_score ?? 0,
        reasons,
        // Signed for 10 minutes so a whole review session works from one load.
        receiptUrl: r.receipt_path ? await signedReceiptUrl(r.receipt_path, 600) : null,
        adminNote: r.admin_note,
        user: {
          id: r.user_id,
          publicId: u?.public_id ?? r.user_id.slice(0, 8),
          name: u?.name ?? null,
          phone: u?.phone ?? null,
          email: u?.email ?? null,
          grade: u?.grade ?? 0
        }
      };
    })
  );
}

export type UserRow = {
  id: string;
  publicId: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  grade: number;
  locale: string;
  paidUntil: string | null;
  isPaid: boolean;
  disabledAt: string | null;
  strikes: number;
  createdAt: string;
  paymentCount: number;
  paidSum: number;
};

export async function listUsers(opts: { search?: string; limit?: number; offset?: number }): Promise<UserRow[]> {
  const sb = sbAdmin();
  let q = sb
    .from('users')
    .select('id, public_id, name, phone, email, grade, locale, paid_until, disabled_at, strikes, created_at')
    .order('created_at', { ascending: false })
    .range(opts.offset ?? 0, (opts.offset ?? 0) + (opts.limit ?? 100) - 1);

  const search = opts.search?.trim();
  if (search) {
    // PostgREST `or` takes a comma-separated filter list; commas and parens in
    // user input would break out of it, so they are stripped first.
    const safe = search.replace(/[,()*\\]/g, '').slice(0, 60);
    if (safe) q = q.or(`public_id.ilike.%${safe}%,name.ilike.%${safe}%,phone.ilike.%${safe}%,email.ilike.%${safe}%`);
  }

  const { data } = await q;
  const rows = data ?? [];
  if (!rows.length) return [];

  const { data: pays } = await sb
    .from('payments')
    .select('user_id, amount, status')
    .in('user_id', rows.map((r) => r.id));

  const counts = new Map<string, { n: number; sum: number }>();
  for (const p of pays ?? []) {
    if (p.status === 'rejected') continue;
    const c = counts.get(p.user_id) ?? { n: 0, sum: 0 };
    c.n++;
    c.sum += Number(p.amount) || 0;
    counts.set(p.user_id, c);
  }

  const now = Date.now();
  return rows.map((r) => ({
    id: r.id,
    publicId: r.public_id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    grade: r.grade,
    locale: r.locale,
    paidUntil: r.paid_until,
    isPaid: !!r.paid_until && new Date(r.paid_until).getTime() > now,
    disabledAt: r.disabled_at,
    strikes: r.strikes ?? 0,
    createdAt: r.created_at,
    paymentCount: counts.get(r.id)?.n ?? 0,
    paidSum: counts.get(r.id)?.sum ?? 0
  }));
}

export async function listPromoCodes() {
  const { data } = await sbAdmin()
    .from('promo_codes')
    .select('code, days, max_uses, used_count, note, expires_at, disabled_at, created_at')
    .order('created_at', { ascending: false })
    .limit(100);
  return data ?? [];
}

export async function listAudit(limit = 100) {
  const { data } = await sbAdmin()
    .from('admin_audit_log')
    .select('id, action, target_type, target_id, detail, ip, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);
  return data ?? [];
}
