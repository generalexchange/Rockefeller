import Link from 'next/link'
import type { ArticleMeta } from '@/types/article'
import { SECTION_LABEL } from '@/lib/sections'
import { formatShortDate, formatTime } from '@/lib/format'

export function StoryCard({ article, className = '' }: { article: ArticleMeta; className?: string }) {
  return (
    <article className={className}>
      <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-gold-dim">{SECTION_LABEL[article.section]}</p>
      <h2 className="font-display mt-2 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
        <Link href={`/articles/${article.slug}`} className="headline-link text-ink">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 font-body text-base italic leading-relaxed text-muted">{article.deck}</p>
      <p className="mt-3 font-label text-xs text-muted">
        <span>{article.author.name}</span>
        {' · '}
        <time dateTime={article.publishedAt}>
          {formatShortDate(article.publishedAt)} · {formatTime(article.publishedAt)}
        </time>
      </p>
    </article>
  )
}
