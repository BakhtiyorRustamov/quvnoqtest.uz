import Link from 'next/link';

/** Round in-page "back" button (just an arrow). Stays visible inside Telegram,
 *  where the top bar's back image is replaced by Telegram's own Back button. */
export default function ArrowBack({ href, label, className = '' }: { href: string; label: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`btn-ghost grid h-12 w-12 place-items-center !p-0 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M19 12H5" />
        <path d="M11 6l-6 6 6 6" />
      </svg>
    </Link>
  );
}
