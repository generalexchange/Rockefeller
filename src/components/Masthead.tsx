import { formatLongDate } from '@/lib/format'

const ESTABLISHED_YEAR = 2026
const TAGLINE = 'PUBLIC AFFAIRS & CULTURE'

export function Masthead() {
  const now = new Date()
  const dateLine = formatLongDate(now.toISOString())

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-5 text-center sm:px-6">
        <p className="font-label text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted sm:text-xs">
          Est. {ESTABLISHED_YEAR} · American Journal of {TAGLINE}
        </p>
        <h1 className="font-display mt-4 text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
          <span className="block">Rockefeller.press</span>
        </h1>
        <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-1 font-label text-xs uppercase tracking-[0.18em] text-muted">
          <time dateTime={now.toISOString()}>{dateLine}</time>
          <span aria-hidden className="text-gold">
            ·
          </span>
          <span>Morning Edition</span>
        </div>
        <div className="mx-auto mt-4 h-px max-w-xs bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
      <div className="h-px w-full bg-line" />
    </header>
  )
}
