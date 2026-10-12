import { createClient } from '@supabase/supabase-js';

export type PromoCode = {
  code: string;
  months: number;
  billedMonths: number;
  active: boolean;
  label?: string;
};

export const DEFAULT_PROMO_CODES: PromoCode[] = [
  { code: '55-maktab', months: 2, billedMonths: 1, active: true, label: '2 months for the price of 1' }
];

const promoCatalog = new Map<string, PromoCode>();
for (const promo of DEFAULT_PROMO_CODES) {
  const normalized = normalizePromoCode(promo.code);
  promoCatalog.set(normalized, { ...promo, code: normalized });
}

export function normalizePromoCode(raw?: string | null): string {
  return (raw ?? '').trim().toLowerCase().replace(/\s+/g, '-');
}

function supabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });
}

export async function getPromoCatalog(): Promise<PromoCode[]> {
  const sb = supabaseClient();
  if (sb) {
    const { data, error } = await sb.from('promo_codes').select('*').eq('active', true);
    if (!error && data) {
      return data.map((row: any) => ({
        code: normalizePromoCode(row.code),
        months: Number(row.months ?? 2),
        billedMonths: Number(row.billed_months ?? 1),
        active: !!row.active,
        label: row.label ?? undefined
      }));
    }
  }
  return Array.from(promoCatalog.values()).filter((entry) => entry.active);
}

export async function getPromoOffer(rawCode?: string | null): Promise<PromoCode | null> {
  const code = normalizePromoCode(rawCode);
  if (!code) return null;
  const catalog = await getPromoCatalog();
  const match = catalog.find((entry) => entry.code === code && entry.active);
  return match ? { ...match } : null;
}

export async function upsertPromoCode(input: { code: string; months?: number; billedMonths?: number; active?: boolean; label?: string }): Promise<PromoCode> {
  const normalized = normalizePromoCode(input.code);
  if (!normalized) throw new Error('Promo code is required');
  const months = Math.max(1, Number(input.months ?? 2));
  const billedMonths = Math.max(1, Number(input.billedMonths ?? 1));
  const promo: PromoCode = {
    code: normalized,
    months,
    billedMonths,
    active: input.active ?? true,
    label: input.label ?? `${months} months for the price of ${billedMonths}`
  };

  const sb = supabaseClient();
  if (sb) {
    const { data, error } = await sb
      .from('promo_codes')
      .upsert({
        code: normalized,
        months,
        billed_months: billedMonths,
        active: promo.active,
        label: promo.label ?? null
      }, { onConflict: 'code' })
      .select('*')
      .single();
    if (!error && data) {
      return {
        code: normalizePromoCode(data.code),
        months: Number(data.months ?? months),
        billedMonths: Number(data.billed_months ?? billedMonths),
        active: !!data.active,
        label: data.label ?? undefined
      };
    }
  }

  promoCatalog.set(normalized, promo);
  return { ...promo };
}

export async function formatPromoSummary(code: string): Promise<string> {
  const offer = await getPromoOffer(code);
  if (!offer) return 'Promo code is invalid.';
  const monthsLabel = offer.months > 1 ? `${offer.months} months` : '1 month';
  return `You’ll get access to ${monthsLabel} for the price of ${offer.billedMonths} month.`;
}
