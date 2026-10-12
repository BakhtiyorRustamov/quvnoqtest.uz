import type { Metadata } from 'next';

/**
 * The admin area must never be indexed. `robots` here emits the meta tag; the
 * middleware adds the matching `X-Robots-Tag` header for non-HTML responses.
 */
export const metadata: Metadata = {
  title: 'QuvnoqTest — admin',
  robots: { index: false, follow: false, nocache: true }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50">{children}</div>;
}
