'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/client';

type PromoServerRecord = {
  code: string;
  months: number;
  billedMonths: number;
  active: boolean;
  label?: string;
};

export default function PromoAdminClient() {
  const [codes, setCodes] = useState<PromoServerRecord[]>([]);
  const [code, setCode] = useState('55-maktab');
  const [months, setMonths] = useState(2);
  const [billedMonths, setBilledMonths] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data } = await api<{ codes: PromoServerRecord[] }>('/api/admin/promocodes');
      setCodes(data?.codes ?? []);
    })();
  }, []);

  async function savePromo() {
    setLoading(true);
    setStatus('');
    const { ok, data } = await api<{ promo?: PromoServerRecord; error?: string }>('/api/admin/promocodes', {
      method: 'POST',
      json: { code, months, billedMonths }
    });
    setLoading(false);
    if (ok && data?.promo) {
      setCodes((prev) => {
        const next = prev.filter((item) => item.code !== data.promo!.code);
        return [...next, data.promo!];
      });
      setStatus(`Saved promo code: ${data.promo.code}`);
      return;
    }
    setStatus(data?.error ?? 'Unable to save promo code');
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black">Promo codes</h1>
        <p className="mt-2 text-sm text-slate-600">Create a keyword that gives users 2 months for the price of 1.</p>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Promo code keyword</span>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              placeholder="55-maktab"
            />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Total months</span>
              <input
                type="number"
                min={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value) || 2)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Billed months</span>
              <input
                type="number"
                min={1}
                value={billedMonths}
                onChange={(e) => setBilledMonths(Number(e.target.value) || 1)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2"
              />
            </label>
          </div>

          <button onClick={savePromo} disabled={loading} className="rounded-xl bg-violet-600 px-4 py-2 font-bold text-white disabled:opacity-60">
            {loading ? 'Saving…' : 'Create promo code'}
          </button>

          {status && <p className="text-sm font-medium text-emerald-700">{status}</p>}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-bold">Active promo codes</h2>
          <ul className="mt-3 space-y-2">
            {codes.length === 0 && <li className="text-sm text-slate-500">No active codes yet.</li>}
            {codes.map((item) => (
              <li key={item.code} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <span className="font-bold uppercase">{item.code}</span> · {item.months} months for the price of {item.billedMonths}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
