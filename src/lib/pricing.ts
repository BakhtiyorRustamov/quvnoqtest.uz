/**
 * Subscription pricing and payee card details.
 *
 * Plain module (no `server-only`): the checkout page needs these in the
 * browser and the payment route needs them on the server, and having one
 * source of truth avoids the two drifting apart.
 */

export const PRICE_UZS = 15000;
export const SUBSCRIPTION_DAYS = 30;

export const CARDS = [
  { key: 'humo', label: 'Humo', number: '9860 1801 0145 7083', emoji: '🟢' },
  { key: 'visa_uzum', label: 'Visa (Uzum)', number: '4916 9903 0204 2152', emoji: '🔵' }
] as const;

export const CARD_HOLDER = 'Bakhtiyor Rustamov';

export type CardTarget = (typeof CARDS)[number]['key'];

export function isCardTarget(v: unknown): v is CardTarget {
  return typeof v === 'string' && CARDS.some((c) => c.key === v);
}

/** Largest accepted receipt upload (also enforced by the storage bucket). */
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
