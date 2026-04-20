import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Subscribe',
  description: 'Support Rockefeller.press and receive dispatches from the desk.',
}

export default function SubscribePage() {
  return (
    <div className="mx-auto max-w-measure px-4 py-16 sm:px-0">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Subscribe</h1>
      <p className="mt-6 font-body text-lg leading-relaxed text-muted">
        Membership and billing will connect here. For now, add this site to your reader or follow the{' '}
        <a href="/api/rss" className="underline decoration-gold/50 underline-offset-4 hover:decoration-gold">
          RSS feed
        </a>
        .
      </p>
    </div>
  )
}
