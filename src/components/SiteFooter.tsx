import Link from 'next/link'
import { SECTION_LABEL, SECTION_ORDER } from '@/lib/sections'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-ink">Rockefeller.press</p>
            <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-muted">
              Independent reporting and analysis — American journalism for readers who still believe in the paragraph.
            </p>
          </div>
          <div>
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-muted">Sections</p>
            <ul className="mt-3 space-y-2 font-body text-sm">
              {SECTION_ORDER.map((id) => (
                <li key={id}>
                  <Link href={`/section/${id}`} className="text-ink underline-offset-4 hover:underline">
                    {SECTION_LABEL[id]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-muted">Contact</p>
            <p className="mt-3 font-body text-sm text-muted">
              letters@rockefeller.press
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-label text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {year} Rockefeller.press. All rights reserved.</p>
          <p>
            <Link href="/api/rss" className="underline-offset-4 hover:underline">
              RSS
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
