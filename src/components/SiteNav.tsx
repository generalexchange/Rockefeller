import Link from 'next/link'
import { SECTION_LABEL, SECTION_ORDER } from '@/lib/sections'

const EXTRA = [{ href: '/subscribe', label: 'Subscribe' }]

export function SiteNav() {
  return (
    <nav
      aria-label="Primary"
      className="border-b border-line bg-paper font-label text-sm uppercase tracking-[0.14em] text-ink"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-1 gap-y-2 px-4 py-3 sm:gap-x-2">
        <Link
          href="/"
          className="rounded px-3 py-2 text-muted transition-colors hover:text-ink"
        >
          Home
        </Link>
        {SECTION_ORDER.map((id) => (
          <Link
            key={id}
            href={`/section/${id}`}
            className="rounded px-3 py-2 text-muted transition-colors hover:text-ink"
          >
            {SECTION_LABEL[id]}
          </Link>
        ))}
        {EXTRA.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="ml-1 rounded border border-line px-3 py-2 text-ink transition-colors hover:border-gold/50 hover:text-ink"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
