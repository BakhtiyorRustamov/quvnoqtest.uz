'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SignInPage() {
const t = useTranslations();
const router = useRouter();
const [identifier, setIdentifier] = useState('');
const [loading, setLoading] = useState(false);
const [candidates, setCandidates] = useState<any[] | null>(null);
const [error, setError] = useState<string | null>(null);

async function submit(id?: string) {
setLoading(true);
setError(null);
setCandidates(null);
try {
const res = await fetch('/api/signin', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ identifier: id ?? identifier })
});
const data = await res.json();
if (!res.ok) {
setError(data?.error || 'unknown');
} else if (data?.candidates) {
setCandidates(data.candidates);
} else if (data?.ok && data?.user) {
// signed in — redirect to dashboard
window.location.href = '/dashboard';
} else {
setError('unexpected');
}
} catch (e) {
setError(String(e));
} finally {
setLoading(false);
}
}

return (
<main className="max-w-md mx-auto p-6">
<h1 className="text-2xl font-bold mb-4">{t('signin.title')}</h1>
<p className="mb-4 text-sm text-muted-foreground">{t('signin.placeholder')}</p>
  <div className="flex gap-2">
    <input
      className="flex-1 rounded-xl border px-3 py-2"
      placeholder={t('signin.placeholder')}
      value={identifier}
      onChange={(e) => setIdentifier(e.target.value)}
    />
    <button className="btn-blue px-4" onClick={() => submit()} disabled={loading}>
      {t('signin.submit')}
    </button>
  </div>

  {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

  {candidates && (
    <div className="mt-4">
      <h2 className="font-semibold">{t('signin.chooseAccount')}</h2>
      <ul className="mt-2 space-y-2">
        {candidates.map((c, i) => (
          <li key={i}>
            <button
              className="w-full text-left rounded-lg border p-3"
              onClick={() => submit(c.publicId)}
            >
              <div className="font-bold">{c.publicId} {c.name ? `— ${c.name}` : ''}</div>
              <div className="text-sm text-muted-foreground">{c.email ?? c.phone}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )}
</main>
);
}
