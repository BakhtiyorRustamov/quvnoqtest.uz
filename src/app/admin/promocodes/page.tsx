import { redirect } from 'next/navigation';
import { adminConfigured, isAdmin } from '@/lib/admin';
import PromoAdminClient from './PromoAdminClient';

export const dynamic = 'force-dynamic';

export default async function PromoAdminPage() {
  if (!adminConfigured() || !(await isAdmin())) {
    redirect('/admin/login');
  }
  return <PromoAdminClient />;
}
