import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Shared service-role Supabase client for server-side route handlers.
 *
 * The service-role key bypasses RLS, so this module must never be imported
 * from a Client Component — `server-only` enforces that at build time.
 */

let client: SupabaseClient | null = null;

export function supabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function sbAdmin(): SupabaseClient {
  if (!supabaseConfigured()) {
    throw new Error('Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)');
  }
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false }
    });
  }
  return client;
}

export const RECEIPTS_BUCKET = 'receipts';
