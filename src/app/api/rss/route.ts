import { getAllArticles } from '@/lib/articles'
import { SECTION_LABEL } from '@/lib/sections'
import { absoluteUrl } from '@/lib/format'

export const dynamic = 'force-static'

function escapeXml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export function GET() {
  const articles = getAllArticles()
  const items = articles
    .map((a) => {
      const url = absoluteUrl(`/articles/${a.slug}`)
      const pub = new Date(a.publishedAt).toUTCString()
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escapeXml(a.deck)}</description>
      <category>${escapeXml(SECTION_LABEL[a.section])}</category>
    </item>`
    })
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Rockefeller.press</title>
    <link>${absoluteUrl('/')}</link>
    <description>American journalism — reporting and analysis.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
