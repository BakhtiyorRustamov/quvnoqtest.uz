'use client';

export async function api<T = any>(
  path: string,
  init?: RequestInit & { json?: unknown }
): Promise<{ ok: boolean; status: number; data: T }> {
  const { json, ...rest } = init ?? {};
  const res = await fetch(path, {
    ...rest,
    headers: { 'Content-Type': 'application/json', ...(rest.headers ?? {}) },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
    cache: 'no-store'
  });
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    /* empty body */
  }
  return { ok: res.ok, status: res.status, data };
}

export function setLocaleCookie(locale: string) {
  document.cookie = `qt_locale=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}
