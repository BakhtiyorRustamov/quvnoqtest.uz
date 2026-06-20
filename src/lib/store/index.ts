import 'server-only';
import { cookieStore } from './cookieStore';
import { supabaseStore } from './supabaseStore';
import type { QTStore } from './types';

export * from './types';

export function hasSupabase(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Returns the active store for this request. */
export function getStore(): QTStore {
  return hasSupabase() ? supabaseStore() : cookieStore();
}
