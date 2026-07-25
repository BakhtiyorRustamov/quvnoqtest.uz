import { redirect } from 'next/navigation';
import { isAdmin, adminConfigured } from '@/lib/admin';
import AdminApp from '@/components/admin/AdminApp';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!adminConfigured()) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md bg-white border border-slate-200 rounded-2xl p-7 text-sm text-slate-700 leading-relaxed">
          <h1 className="text-lg font-bold text-slate-900 mb-2">Admin panel not configured</h1>
          <p>
            Set <code className="bg-slate-100 px-1.5 py-0.5 rounded">ADMIN_PASSWORD_HASH</code> (and the Supabase
            variables) in your environment, then reload.
          </p>
          <p className="mt-3">
            Generate the hash with:
            <br />
            <code className="bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block">
              node scripts/hash-admin-password.mjs &quot;your-password&quot;
            </code>
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAdmin())) redirect('/admin/login');

  return <AdminApp />;
}
