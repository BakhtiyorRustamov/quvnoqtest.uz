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
  isPaid: boolean;
  createdAt: string;
};

type Ctx = {
  user: ClientUser | null;
  loading: boolean;
  refresh: () => Promise<ClientUser | null>;
  /** Silent registration — creates the record if missing (SRS §6.6.1). */
  ensureUser: (grade?: number, locale?: string) => Promise<ClientUser | null>;
  update: (patch: Partial<Pick<ClientUser, 'grade' | 'locale' | 'name' | 'phone'>>) => Promise<ClientUser | null>;
  pay: () => Promise<ClientUser | null>;
};

const UserCtx = createContext<Ctx>({
  user: null,
  loading: true,
  refresh: async () => null,
  ensureUser: async () => null,
  update: async () => null,
  pay: async () => null
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const inflight = useRef<Promise<ClientUser | null> | null>(null);

  const refresh = useCallback(async () => {
    const { data } = await api<{ user: ClientUser | null }>('/api/me');
    setUser(data?.user ?? null);
    setLoading(false);
    return data?.user ?? null;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const ensureUser = useCallback(
    async (grade?: number, locale?: string) => {
      if (user) return user;
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

  const update = useCallback(async (patch: Partial<Pick<ClientUser, 'grade' | 'locale' | 'name' | 'phone'>>) => {
    const { data, ok } = await api<{ user: ClientUser }>('/api/me', { method: 'PATCH', json: patch });
    if (ok && data?.user) setUser(data.user);
    return ok ? data.user : null;
  }, []);

  const pay = useCallback(async () => {
    const { data, ok } = await api<{ user: ClientUser }>('/api/pay', { method: 'POST' });
    if (ok && data?.user) setUser(data.user);
    return ok ? data.user : null;
  }, []);

  return (
    <UserCtx.Provider value={{ user, loading, refresh, ensureUser, update, pay }}>
      {children}
    </UserCtx.Provider>
  );
}

export function useUser() {
  return useContext(UserCtx);
}
