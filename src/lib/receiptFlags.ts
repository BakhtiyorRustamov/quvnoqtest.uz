/**
 * Master switch for the automated receipt checking.
 *
 * Nothing in src/lib/receipt.ts is deleted — the whole plausibility scorer,
 * the EXIF walker, the dHash and the duplicate lookup all stay in the tree and
 * can be re-enabled by flipping one environment variable. This exists because
 * a false refusal costs a paying customer, and the heuristics were tuned on
 * synthetic images rather than real Uzbek bank receipts.
 *
 *   RECEIPT_CHECK=off   (default) accept any uploaded file, no scoring,
 *                       no duplicate lookup, no format restriction
 *   RECEIPT_CHECK=flag  run the scorer for the record but never refuse:
 *                       low scores are stored and reported, not blocked
 *   RECEIPT_CHECK=on    the original behaviour — refuse below REJECT_BELOW
 *                       and refuse duplicates
 *
 * `RECEIPT_ALLOW_DUPLICATES` overrides duplicate handling on its own, in case
 * the scorer should come back but duplicate blocking should not. Note that
 * blocking duplicates also depends on the unique index on payments.receipt_sha256
 * in the database; see supabase/schema.sql.
 */

export type ReceiptCheckMode = 'off' | 'flag' | 'on';

function readMode(): ReceiptCheckMode {
  const raw = (process.env.RECEIPT_CHECK ?? 'off').trim().toLowerCase();
  if (raw === 'on' || raw === 'true' || raw === '1') return 'on';
  if (raw === 'flag' || raw === 'review') return 'flag';
  return 'off';
}

export const RECEIPT_CHECK_MODE: ReceiptCheckMode = readMode();

/** Should a low-scoring upload be refused outright? */
export const RECEIPT_CHECK_ENFORCED = RECEIPT_CHECK_MODE === 'on';

/** Should the scorer run at all? (`flag` runs it for the record only.) */
export const RECEIPT_CHECK_SCORES = RECEIPT_CHECK_MODE !== 'off';

/** Should a repeat of an already-seen receipt image be refused? */
export const RECEIPT_BLOCK_DUPLICATES =
  (process.env.RECEIPT_ALLOW_DUPLICATES ?? '').trim().toLowerCase() === 'true'
    ? false
    : RECEIPT_CHECK_ENFORCED;
