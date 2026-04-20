import Link from 'next/link'
import type { ArticleMeta } from '@/types/article'
import { SECTION_LABEL } from '@/lib/sections'
import { FadeInCard } from '@/components/FadeInCard'
import { GrainImage } from '@/components/GrainImage'
import { formatShortDate } from '@/lib/format'

export function SectionRail({
  sectionId,
  label,
  articles,
}: {
  sectionId: ArticleMeta['section']
  label: string
  articles: ArticleMeta[]
}) {
  if (articles.length === 0) return null

  return (
    <section aria-labelledby={`rail-${sectionId}`} className="mt-14 border-t border-line pt-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 id={`rail-${sectionId}`} className="font-display text-2xl font-semibold tracking-tight text-ink">
          {label}
        </h2>
        <Link
          href={`/section/${sectionId}`}
          className="font-label text-xs uppercase tracking-[0.18em] text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {articles.map((article) => (
          <FadeInCard key={article.slug}>
            <article>
              <Link href={`/articles/${article.slug}`} className="group block">
                {article.heroImage ? (
                  <GrainImage
                    src={article.heroImage.src}
                    alt={article.heroImage.alt}
                    width={640}
                    height={400}
                    className="mb-4 aspect-[16/10]"
                  />
                ) : null}
                <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-gold-dim">
                  {SECTION_LABEL[article.section]}
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:underline group-hover:decoration-gold group-hover:decoration-1 group-hover:underline-offset-4">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-3 font-body text-sm italic leading-relaxed text-muted">{article.deck}</p>
                <p className="mt-3 font-label text-xs text-muted">
                  {article.author.name} · <time dateTime={article.publishedAt}>{formatShortDate(article.publishedAt)}</time>
                </p>
              </Link>
            </article>
          </FadeInCard>
        ))}
      </div>
    </section>
  )
}
