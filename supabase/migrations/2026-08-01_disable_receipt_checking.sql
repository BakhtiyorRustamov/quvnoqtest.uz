-- Disable the automated receipt checking (reversible).
--
-- Run this in the Supabase SQL editor:
--   Dashboard → SQL Editor → New query → paste → Run
--
-- Nothing is dropped that carries data. Two things are relaxed:
--   1. the receipts storage bucket stops restricting file types, so a PDF or
--      any other file can be uploaded as a receipt;
--   2. the unique index on receipt_sha256 is dropped, so the same receipt
--      image may be submitted more than once.
--
-- The application-side switch is RECEIPT_CHECK in .env (default 'off').
-- To reverse this file, run the "ROLL BACK" block at the bottom.

-- 1. accept any file type in the receipts bucket ---------------------------
update storage.buckets
   set allowed_mime_types = null,
       file_size_limit    = 8388608   -- 8 MB, unchanged; matches MAX_UPLOAD_BYTES
 where id = 'receipts';

-- 2. allow the same receipt image to be reused -----------------------------
drop index if exists payments_sha256_uniq;
-- Keep a NON-unique index so admin lookups by fingerprint still work and so
-- re-enabling the constraint later is a one-liner.
create index if not exists payments_sha256_idx
  on payments (receipt_sha256) where receipt_sha256 is not null;

-- ---------------------------------------------------------------------------
-- ROLL BACK (re-enable checking on the database side)
-- ---------------------------------------------------------------------------
-- update storage.buckets
--    set allowed_mime_types = array['image/jpeg','image/png','image/webp','image/heic','image/heif']
--  where id = 'receipts';
--
-- drop index if exists payments_sha256_idx;
-- create unique index if not exists payments_sha256_uniq
--   on payments (receipt_sha256) where receipt_sha256 is not null;
-- (and set RECEIPT_CHECK=on in the environment)
