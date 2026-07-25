'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import type { Dashboard, PaymentRow, UserRow } from '@/lib/adminData';

/**
 * Admin panel.
 *
 * Built around reconciliation rather than per-receipt review: the Money tab
 * answers "does what the app gave away match what landed on the cards this
 * month", and the other tabs exist to fix individual accounts when it doesn't.
 */

type Tab = 'money' | 'receipts' | 'users' | 'promos' | 'audit';

const TABS: { key: Tab; label: string }[] = [
  { key: 'money', label: 'Money' },
  { key: 'receipts', label: 'Receipts' },
  { key: 'users', label: 'Users' },
  { key: 'promos', label: 'Promo codes' },
  { key: 'audit', label: 'Audit log' }
];

const fmt = (n: number) => n.toLocaleString('ru-RU').replace(/,/g, ' ');
const date = (s: string | null) => (s ? new Date(s).toLocaleDateString('en-GB') : '—');
const dateTime = (s: string) => new Date(s).toLocaleString('en-GB', { hour12: false });

async function post(action: string, payload: Record<string, unknown> = {}) {
  const res = await fetch('/api/admin/action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload })
  });
  return { ok: res.ok, data: await res.json().catch(() => ({})) };
}

export default function AdminApp() {
  const [tab, setTab] = useState<Tab>('money');

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <header className="flex items-center gap-3 flex-wrap">
        <h1 className="text-xl font-bold text-slate-900">QuvnoqTest admin</h1>
        <button
          onClick={async () => {
            await fetch('/api/admin/login', { method: 'DELETE' });
            location.href = '/admin/login';
          }}
          className="ml-auto text-sm text-slate-500 hover:text-slate-900"
        >
          Sign out
        </button>
      </header>

      <nav className="flex gap-1 mt-5 border-b border-slate-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3.5 py-2 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition ${
              tab === t.key
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {tab === 'money' && <MoneyTab />}
        {tab === 'receipts' && <ReceiptsTab />}
        {tab === 'users' && <UsersTab />}
        {tab === 'promos' && <PromosTab />}
        {tab === 'audit' && <AuditTab />}
      </div>
    </div>
  );
}

/* ============================== Money / reconciliation ===================== */

function MoneyTab() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/admin/data?view=dashboard')
      .then((r) => r.json())
      .then((d) => (d.dashboard ? setData(d.dashboard) : setError(true)))
      .catch(() => setError(true));
  }, []);

  if (error) return <Empty>Could not load dashboard.</Empty>;
  if (!data) return <Empty>Loading…</Empty>;

  const { totals, months, anomalies } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Stat label="Users" value={fmt(totals.users)} />
        <Stat label="Active subscriptions" value={fmt(totals.paidNow)} />
        <Stat label="Payments (30d)" value={fmt(totals.payments30d)} />
        <Stat label="Revenue (30d)" value={`${fmt(totals.revenue30d)} so'm`} accent />
        <Stat label="Flagged, unreviewed" value={fmt(totals.flaggedOpen)} warn={totals.flaggedOpen > 0} />
      </div>

      <Card
        title="Expected money by card"
        subtitle="Compare each row with the balance in your Humo and Uzum apps. Rejected payments are excluded."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <Th>Month</Th>
                <Th right>Humo ×</Th>
                <Th right>Humo so&apos;m</Th>
                <Th right>Visa ×</Th>
                <Th right>Visa so&apos;m</Th>
                <Th right>Total</Th>
                <Th right>Flagged</Th>
              </tr>
            </thead>
            <tbody>
              {months.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400">
                    No payments yet.
                  </td>
                </tr>
              )}
              {months.map((m) => (
                <tr key={m.month} className="border-b border-slate-100 last:border-0">
                  <Td className="font-semibold text-slate-900">{m.month}</Td>
                  <Td right>{m.humoCount}</Td>
                  <Td right>{fmt(m.humoSum)}</Td>
                  <Td right>{m.visaCount}</Td>
                  <Td right>{fmt(m.visaSum)}</Td>
                  <Td right className="font-bold text-slate-900">
                    {fmt(m.totalSum)}
                  </Td>
                  <Td right className={m.flagged ? 'text-amber-600 font-semibold' : 'text-slate-400'}>
                    {m.flagged || '—'}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Worth a look" subtitle="Only meaningful when the totals above disagree with your cards.">
        <div className="grid md:grid-cols-3 gap-5 text-sm">
          <div>
            <div className="font-semibold text-slate-700 mb-2">Paid more than once (30d)</div>
            {anomalies.repeatPayers.length === 0 ? (
              <p className="text-slate-400">None.</p>
            ) : (
              <ul className="space-y-1">
                {anomalies.repeatPayers.map((r) => (
                  <li key={r.publicId} className="flex justify-between gap-2">
                    <span className="text-slate-600 truncate">
                      {r.publicId} {r.name && <span className="text-slate-400">· {r.name}</span>}
                    </span>
                    <span className="font-semibold text-slate-900">{r.count}×</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="font-semibold text-slate-700 mb-2">Several accounts, one IP</div>
            {anomalies.sharedIps.length === 0 ? (
              <p className="text-slate-400">None.</p>
            ) : (
              <ul className="space-y-1">
                {anomalies.sharedIps.map((s) => (
                  <li key={s.ip} className="flex justify-between gap-2">
                    <span className="text-slate-600 font-mono text-xs truncate">{s.ip}</span>
                    <span className="font-semibold text-slate-900">{s.users}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs text-slate-400 mt-2">
              Normal for one family or a school Wi-Fi; suspicious in bulk.
            </p>
          </div>
          <div>
            <div className="font-semibold text-slate-700 mb-2">Low-scoring receipts (30d)</div>
            <p className="text-2xl font-bold text-slate-900">{anomalies.lowScores}</p>
            <p className="text-xs text-slate-400 mt-1">Passed the check but scored under 55.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ================================= Receipts ================================ */

const STATUS_FILTERS = [
  { key: 'needs_review', label: 'Flagged' },
  { key: 'auto_approved', label: 'Auto-approved' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' }
];

function ReceiptsTab() {
  const [status, setStatus] = useState('needs_review');
  const [rows, setRows] = useState<PaymentRow[] | null>(null);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    setRows(null);
    fetch(`/api/admin/data?view=payments&status=${status}&limit=100`)
      .then((r) => r.json())
      .then((d) => {
        setRows(d.payments ?? []);
        setIndex(0);
      })
      .catch(() => setRows([]));
  }, [status]);

  useEffect(load, [load]);

  const current = rows?.[index] ?? null;

  const act = useCallback(
    async (kind: 'approve' | 'reject', extra: Record<string, unknown> = {}) => {
      if (!current || busy) return;
      setBusy(true);
      await post(kind === 'approve' ? 'payment.approve' : 'payment.reject', {
        paymentId: current.id,
        ...extra
      });
      setBusy(false);
      setRows((prev) => (prev ? prev.filter((p) => p.id !== current.id) : prev));
      setIndex((i) => Math.max(0, Math.min(i, (rows?.length ?? 1) - 2)));
    },
    [current, busy, rows]
  );

  // Keyboard review: A approve, R reject, ←/→ move. Makes a queue of twenty
  // receipts about ninety seconds of work instead of several minutes.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'a' || e.key === 'A') act('approve');
      else if (e.key === 'r' || e.key === 'R') act('reject');
      else if (e.key === 'ArrowRight') setIndex((i) => Math.min((rows?.length ?? 1) - 1, i + 1));
      else if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [act, rows]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatus(f.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              status === f.key ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-400">
          Keys: <Kbd>A</Kbd> approve · <Kbd>R</Kbd> reject · <Kbd>←</Kbd> <Kbd>→</Kbd> browse
        </span>
      </div>

      {rows === null && <Empty>Loading…</Empty>}
      {rows?.length === 0 && <Empty>Nothing here. 🎉</Empty>}

      {current && (
        <div className="grid md:grid-cols-[minmax(0,1fr)_320px] gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-3">
            {current.receiptUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.receiptUrl}
                alt="receipt"
                className="w-full max-h-[70vh] object-contain rounded-xl bg-slate-50"
              />
            ) : (
              <Empty>Receipt image missing.</Empty>
            )}
            <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-400">
              <span>
                {index + 1} / {rows?.length}
              </span>
              <span>{dateTime(current.createdAt)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Card title="Payment">
              <dl className="text-sm space-y-1.5">
                <Row k="User" v={`${current.user.publicId}${current.user.name ? ` · ${current.user.name}` : ''}`} />
                <Row k="Grade" v={String(current.user.grade)} />
                <Row k="Phone" v={current.user.phone ?? '—'} />
                <Row k="Email" v={current.user.email ?? '—'} />
                <Row k="Card" v={current.cardTarget === 'humo' ? 'Humo' : 'Visa (Uzum)'} />
                <Row k="Amount" v={`${fmt(current.amount)} so'm`} />
                <Row
                  k="Auto score"
                  v={
                    <span
                      className={
                        current.score >= 55 ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'
                      }
                    >
                      {current.score}/100
                    </span>
                  }
                />
                <Row k="Status" v={current.status} />
              </dl>
              {current.reasons.length > 0 && (
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{current.reasons.join(', ')}</p>
              )}
            </Card>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => act('approve')}
                disabled={busy}
                className="rounded-xl bg-emerald-600 text-white font-semibold py-2.5 disabled:opacity-40"
              >
                Approve
              </button>
              <button
                onClick={() => act('reject')}
                disabled={busy}
                className="rounded-xl bg-red-600 text-white font-semibold py-2.5 disabled:opacity-40"
              >
                Reject
              </button>
            </div>
            <button
              onClick={() => act('reject', { revoke: true })}
              disabled={busy}
              className="w-full rounded-xl border border-red-300 text-red-700 font-semibold py-2 text-sm disabled:opacity-40"
            >
              Reject + revoke access
            </button>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plain reject notifies the user and leaves their current access alone. The second button also rolls
              their subscription back to what it was before this payment. Strikes are only set manually, from the
              Users tab.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================== Users ================================== */

function UsersTab() {
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<UserRow[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback((search: string) => {
    setRows(null);
    fetch(`/api/admin/data?view=users&limit=100&q=${encodeURIComponent(search)}`)
      .then((r) => r.json())
      .then((d) => setRows(d.users ?? []))
      .catch(() => setRows([]));
  }, []);

  useEffect(() => {
    const id = setTimeout(() => load(q), 250);
    return () => clearTimeout(id);
  }, [q, load]);

  async function run(action: string, payload: Record<string, unknown>) {
    await post(action, payload);
    load(q);
  }

  return (
    <div className="space-y-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by ID, name, phone or email…"
        className="w-full max-w-md rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-slate-900"
      />

      {rows === null && <Empty>Loading…</Empty>}
      {rows?.length === 0 && <Empty>No users found.</Empty>}

      {rows && rows.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Contact</Th>
                <Th right>Gr.</Th>
                <Th>Paid until</Th>
                <Th right>Payments</Th>
                <Th right>Paid</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <Fragment key={u.id}>
                  <tr className="border-b border-slate-100 last:border-0">
                    <Td className="font-mono text-xs">{u.publicId}</Td>
                    <Td>
                      {u.name ?? <span className="text-slate-300">—</span>}
                      {u.disabledAt && <span className="ml-1.5 text-xs text-red-600 font-semibold">disabled</span>}
                      {u.strikes > 0 && (
                        <span className="ml-1.5 text-xs text-amber-600 font-semibold">{u.strikes}⚑</span>
                      )}
                    </Td>
                    <Td className="text-xs text-slate-500">{u.phone ?? u.email ?? '—'}</Td>
                    <Td right>{u.grade}</Td>
                    <Td>
                      <span className={u.isPaid ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                        {date(u.paidUntil)}
                      </span>
                    </Td>
                    <Td right>{u.paymentCount}</Td>
                    <Td right>{fmt(u.paidSum)}</Td>
                    <Td right>
                      <button
                        onClick={() => setOpenId(openId === u.id ? null : u.id)}
                        className="text-slate-400 hover:text-slate-900 px-2"
                      >
                        {openId === u.id ? '▲' : '▼'}
                      </button>
                    </Td>
                  </tr>
                  {openId === u.id && (
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <td colSpan={8} className="px-3 py-3">
                        <UserTools user={u} run={run} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UserTools({
  user,
  run
}: {
  user: UserRow;
  run: (action: string, payload: Record<string, unknown>) => Promise<void>;
}) {
  const [days, setDays] = useState(30);
  const [until, setUntil] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div className="flex flex-wrap items-end gap-4 text-sm">
      <div>
        <label className="block text-xs text-slate-500 mb-1">Add days</label>
        <div className="flex gap-1.5">
          <input
            type="number"
            min={1}
            max={3650}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-20 rounded-lg border border-slate-300 px-2 py-1.5"
          />
          <button
            onClick={() => run('user.extend', { userId: user.id, days })}
            className="rounded-lg bg-slate-900 text-white px-3 py-1.5 font-semibold"
          >
            Extend
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-500 mb-1">Set expiry date</label>
        <div className="flex gap-1.5">
          <input
            type="date"
            value={until}
            onChange={(e) => setUntil(e.target.value)}
            className="rounded-lg border border-slate-300 px-2 py-1.5"
          />
          <button
            onClick={() => until && run('user.setExpiry', { userId: user.id, until: new Date(until).toISOString() })}
            className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold"
          >
            Set
          </button>
          <button
            onClick={() => run('user.setExpiry', { userId: user.id, until: null })}
            className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-500"
            title="Remove all paid access"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-[220px]">
        <label className="block text-xs text-slate-500 mb-1">
          {user.disabledAt ? 'Account is disabled' : 'Shut down account'}
        </label>
        <div className="flex gap-1.5">
          {user.disabledAt ? (
            <button
              onClick={() => run('user.enable', { userId: user.id })}
              className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 font-semibold"
            >
              Re-enable
            </button>
          ) : (
            <>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (optional)"
                className="flex-1 min-w-0 rounded-lg border border-slate-300 px-2 py-1.5"
              />
              <button
                onClick={() => run('user.disable', { userId: user.id, reason })}
                className="rounded-lg bg-red-600 text-white px-3 py-1.5 font-semibold whitespace-nowrap"
              >
                Disable
              </button>
            </>
          )}
          {user.strikes > 0 && (
            <button
              onClick={() => run('user.resetStrikes', { userId: user.id })}
              className="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-500"
            >
              Clear strikes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================= Promos ================================== */

type Promo = {
  code: string;
  days: number;
  max_uses: number;
  used_count: number;
  note: string | null;
  expires_at: string | null;
  disabled_at: string | null;
};

function PromosTab() {
  const [rows, setRows] = useState<Promo[] | null>(null);
  const [days, setDays] = useState(30);
  const [maxUses, setMaxUses] = useState(1);
  const [note, setNote] = useState('');
  const [created, setCreated] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch('/api/admin/data?view=promos')
      .then((r) => r.json())
      .then((d) => setRows(d.promos ?? []))
      .catch(() => setRows([]));
  }, []);

  useEffect(load, [load]);

  async function create() {
    const { data } = await post('promo.create', { days, maxUses, note });
    if (data.code) setCreated(data.code);
    load();
  }

  return (
    <div className="space-y-4">
      <Card title="New code" subtitle="For teachers, testers, refunds and giveaways.">
        <div className="flex flex-wrap items-end gap-3 text-sm">
          <Field label="Days">
            <input
              type="number"
              min={1}
              max={3650}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-24 rounded-lg border border-slate-300 px-2 py-1.5"
            />
          </Field>
          <Field label="Max uses">
            <input
              type="number"
              min={1}
              max={1000}
              value={maxUses}
              onChange={(e) => setMaxUses(Number(e.target.value))}
              className="w-24 rounded-lg border border-slate-300 px-2 py-1.5"
            />
          </Field>
          <Field label="Note">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. School 42 teachers"
              className="w-56 rounded-lg border border-slate-300 px-2 py-1.5"
            />
          </Field>
          <button onClick={create} className="rounded-lg bg-slate-900 text-white px-4 py-2 font-semibold">
            Generate
          </button>
        </div>
        {created && (
          <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm">
            Created: <code className="font-bold tracking-wider">{created}</code>
          </div>
        )}
      </Card>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 border-b border-slate-200">
              <Th>Code</Th>
              <Th right>Days</Th>
              <Th right>Used</Th>
              <Th>Note</Th>
              <Th>Status</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {rows?.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400">
                  No codes yet.
                </td>
              </tr>
            )}
            {rows?.map((p) => (
              <tr key={p.code} className="border-b border-slate-100 last:border-0">
                <Td className="font-mono font-semibold">{p.code}</Td>
                <Td right>{p.days}</Td>
                <Td right>
                  {p.used_count}/{p.max_uses}
                </Td>
                <Td className="text-slate-500">{p.note ?? '—'}</Td>
                <Td>
                  {p.disabled_at ? (
                    <span className="text-slate-400">disabled</span>
                  ) : p.used_count >= p.max_uses ? (
                    <span className="text-slate-400">used up</span>
                  ) : (
                    <span className="text-emerald-600 font-semibold">active</span>
                  )}
                </Td>
                <Td right>
                  {!p.disabled_at && (
                    <button
                      onClick={async () => {
                        await post('promo.disable', { code: p.code });
                        load();
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Disable
                    </button>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================================== Audit ================================== */

type AuditRow = {
  id: string;
  action: string;
  target_type: string | null;
  target_id: string | null;
  detail: Record<string, unknown>;
  ip: string | null;
  created_at: string;
};

function AuditTab() {
  const [rows, setRows] = useState<AuditRow[] | null>(null);

  useEffect(() => {
    fetch('/api/admin/data?view=audit&limit=150')
      .then((r) => r.json())
      .then((d) => setRows(d.audit ?? []))
      .catch(() => setRows([]));
  }, []);

  if (!rows) return <Empty>Loading…</Empty>;
  if (!rows.length) return <Empty>No admin actions recorded yet.</Empty>;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 border-b border-slate-200">
            <Th>When</Th>
            <Th>Action</Th>
            <Th>Target</Th>
            <Th>Detail</Th>
            <Th>IP</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-slate-100 last:border-0">
              <Td className="whitespace-nowrap text-slate-500">{dateTime(r.created_at)}</Td>
              <Td className="font-semibold">{r.action}</Td>
              <Td className="font-mono text-xs text-slate-500">
                {r.target_id ? `${r.target_type}:${r.target_id.slice(0, 8)}` : '—'}
              </Td>
              <Td className="text-xs text-slate-500">
                {Object.keys(r.detail ?? {}).length ? JSON.stringify(r.detail) : '—'}
              </Td>
              <Td className="font-mono text-xs text-slate-400">{r.ip ?? '—'}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================================ primitives =============================== */

function Stat({ label, value, accent, warn }: { label: string; value: string; accent?: boolean; warn?: boolean }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div
        className={`text-xl font-bold mt-0.5 ${
          warn ? 'text-amber-600' : accent ? 'text-emerald-600' : 'text-slate-900'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-4">
      <h2 className="font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5 mb-3">{subtitle}</p>}
      <div className={subtitle ? '' : 'mt-3'}>{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-slate-900 text-right truncate">{v}</dd>
    </div>
  );
}

function Th({ children, right }: { children?: React.ReactNode; right?: boolean }) {
  return <th className={`px-3 py-2 font-medium text-xs ${right ? 'text-right' : ''}`}>{children}</th>;
}

function Td({
  children,
  right,
  className = ''
}: {
  children?: React.ReactNode;
  right?: boolean;
  className?: string;
}) {
  return <td className={`px-3 py-2 ${right ? 'text-right' : ''} ${className}`}>{children}</td>;
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block min-w-[1.4rem] text-center rounded border border-slate-300 bg-white px-1 py-0.5 text-[10px] font-semibold text-slate-600">
      {children}
    </kbd>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="bg-white border border-slate-200 rounded-2xl py-10 text-center text-slate-400">{children}</div>;
}
