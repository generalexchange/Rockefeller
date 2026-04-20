import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-measure px-4 py-24 text-center sm:px-0">
      <h1 className="font-display text-3xl font-semibold text-ink">Page not found</h1>
      <p className="mt-4 font-body text-muted">The story you requested is not in this edition.</p>
      <Link href="/" className="mt-8 inline-block font-label text-sm uppercase tracking-[0.18em] text-gold-dim underline-offset-4 hover:underline">
        Return to the front page
      </Link>
    </div>
  )
}
