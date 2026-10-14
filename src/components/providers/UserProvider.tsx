'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/client';

export type ClientUser = {
  id: string;
  publicId: string;
  grade: number;
  locale: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  paidUntil: string | null;
  /** Effective access: a paid subscription on an account that is not disabled. */
  isPaid: boolean;
  isDisabled?: boolean;
  createdAt: string;
};

export type Notice = {
  id: string;
  kind: string;
  title: string;
  body: string | null;
  created_at: string;
};

type Ctx = {
  user: ClientUser | null;
  loading: boolean;
  refresh: () => Promise<ClientUser | null>;
  /** Silent registration — creates the record if missing (SRS §6.6.1). */
  ensureUser: (grade?: number, locale?: string) => Promise<ClientUser | null>;
  update: (patch: Partial<Pick<ClientUser, 'grade' | 'locale' | 'name' | 'phone' | 'email'>>) => Promise<ClientUser | null>;
  /** Uploads a payment receipt; an applied promo may extend the paid period by 60 days instead of 30. */
  submitReceipt: (file: File, card: string, promoCode?: string) => Promise<SubmitReceiptResult>;
  /** Validates an admin-issued promo code without granting access early. */
  redeemPromo: (code: string) => Promise<{ ok: boolean; error?: string; days?: number; message?: string }>;
  /** Admin messages for this user (e.g. a rejected receipt). */
  notices: Notice[];
  dismissNotice: (id: string) => void;
};

export type SubmitReceiptResult = {
  ok: boolean;
  /** error code from the API, e.g. 'not_a_receipt' | 'duplicate' | 'rate_limited' */
  error?: string;
  score?: number;
};

const UserCtx = createContext<Ctx>({
  user: null,
  loading: true,
  refresh: async () => null,
  ensureUser: async () => null,
  update: async () => null,
  submitReceipt: async () => ({ ok: false, error: 'not_ready' }),
  redeemPromo: async () => ({ ok: false, error: 'not_ready' }),
  notices: [],
  dismissNotice: () => {}
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const inflight = useRef<Promise<ClientUser | null> | null>(null);
  // the first /api/me load — ensureUser waits for it so a returning user is
  // never re-registered (that caused a grade-1 flash + extra refreshes)
  const firstLoad = useRef<Promise<ClientUser | null> | null>(null);

  const refresh = useCallback(async () => {
    const { data } = await api<{ user: ClientUser | null; notices?: Notice[] }>('/api/me');
    setUser(data?.user ?? null);
    setNotices(data?.notices ?? []);
    setLoading(false);
    return data?.user ?? null;
  }, []);

  useEffect(() => {
    if (!firstLoad.current) firstLoad.current = refresh();
  }, [refresh]);

  const ensureUser = useCallback(
    async (grade?: number, locale?: string) => {
      if (user) return user;
      const existing = firstLoad.current ? await firstLoad.current : null;
      if (existing) return existing;
      if (!inflight.current) {
        inflight.current = (async () => {
          const lc = locale ?? document.cookie.match(/qt_locale=(\w+)/)?.[1] ?? 'uz';
          const { data } = await api<{ user: ClientUser }>('/api/register', {
            method: 'POST',
            json: { grade: grade ?? 1, locale: lc }
          });
          setUser(data?.user ?? null);
          setLoading(false);
          inflight.current = null;
          return data?.user ?? null;
        })();
      }
      return inflight.current;
    },
    [user]
  );

  const update = useCallback(async (patch: Partial<Pick<ClientUser, 'grade' | 'locale' | 'name' | 'phone' | 'email'>>) => {
    const { data, ok } = await api<{ user: ClientUser }>('/api/me', { method: 'PATCH', json: patch });
    if (ok && data?.user) setUser(data.user);
    return ok ? data.user : null;
  }, []);

  /**
   * Uploads the receipt as multipart/form-data — not JSON — so the image is
   * streamed rather than base64-inflated by a third.
   */
  const submitReceipt = useCallback(async (file: File, card: string, promoCode?: string): Promise<SubmitReceiptResult> => {
    const body = new FormData();
    body.append('receipt', file);
    body.append('card', card);
    if (promoCode) body.append('promo', promoCode);

    const res = await fetch('/api/payments', { method: 'POST', body, cache: 'no-store' });
    let data: { user?: ClientUser; error?: string; score?: number } = {};
    try {
      data = await res.json();
    } catch {
      /* empty body */
    }
    if (res.ok && data.user) {
      setUser(data.user);
      return { ok: true };
    }
    return { ok: false, error: data.error ?? 'server_error', score: data.score };
  }, []);

  const redeemPromo = useCallback(async (code: string) => {
    const { data, ok } = await api<{ user?: ClientUser; days?: number; error?: string; message?: string }>('/api/promo', {
      method: 'POST',
      json: { code }
    });
    if (ok && data?.days) {
      return { ok: true, days: data.days };
    }
    if (ok && data?.user) {
      return { ok: true, days: data.days ?? 30 };
    }
    return { ok: false, error: data?.error ?? 'invalid_code' };
  }, []);

  const dismissNotice = useCallback((id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    fetch('/api/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    }).catch(() => {});
  }, []);

  return (
    <UserCtx.Provider
      value={{
        user,
        loading,
        refresh,
        ensureUser,
        update,
        submitReceipt,
        redeemPromo,
        notices,
        dismissNotice
      }}
    >
      {children}
    </UserCtx.Provider>
  );
}

export function useUser() {
  return useContext(UserCtx);
}

