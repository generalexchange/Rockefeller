import type { ArticleMeta } from '@/types/article'
import { absoluteUrl } from '@/lib/format'

export function ArticleJsonLd({ meta }: { meta: ArticleMeta }) {
  const url = absoluteUrl(`/articles/${meta.slug}`)
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: meta.title,
    description: meta.deck,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt ?? meta.publishedAt,
    author: {
      '@type': 'Person',
      name: meta.author.name,
      jobTitle: meta.author.role,
      url: absoluteUrl(`/authors/${meta.author.slug}`),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rockefeller.press',
      url: absoluteUrl('/'),
    },
    mainEntityOfPage: url,
    articleSection: meta.section,
    keywords: meta.tags.join(', '),
  }
  if (meta.heroImage) {
    data.image = [absoluteUrl(meta.heroImage.src)]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
